/*
MIT License

Copyright (c) 2020 Egor Nepomnyaschih

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

import * as ArrayUtils from '../ArrayUtils';
import BindableArray from '../BindableArray';
import Class from "../Class";
import DestroyableReadonlyBindableArray from '../DestroyableReadonlyBindableArray';
import IBindableArray from '../IBindableArray';
import IndexCount from '../IndexCount';
import IndexItems from '../IndexItems';
import {filter} from "../IterableUtils";
import ReadonlyBindableArray from '../ReadonlyBindableArray';

/**
 * Array filterer. Builds a new array consisting of values the callback function returns a truthy value for, and
 * starts continuous synchronization. Preserves item order.
 */
class ArrayFilterer<T> extends Class {

	private _targetCreated: boolean;
	private _filtered: number[] = [];

	/**
	 * Target array.
	 */
	readonly target: IBindableArray<T>;

	/**
	 * @param source Source array.
	 * @param test Filtering criteria.
	 * @param config Filterer configuration.
	 */
	constructor(readonly source: ReadonlyBindableArray<T>, private test: (value: T) => boolean,
				config: ArrayFilterer.Config<T> = {}) {
		super();
		this._targetCreated = config.target == null;
		this.target = this._targetCreated ? new BindableArray<T>(this.source.silent) : config.target;
		this._splice([], [new IndexItems(0, this.source.native)]);
		this.own(source.onSplice.listen(this._onSplice, this));
		this.own(source.onReplace.listen(this._onReplace, this));
		this.own(source.onMove.listen(this._onMove, this));
		this.own(source.onClear.listen(this._onClear, this));
		this.own(source.onReorder.listen(this._onReorder, this));
	}

	/**
	 * Changes filterer configuration and refilters the target collection.
	 * @param config Options to modify.
	 */
	reconfigure(config: ArrayFilterer.Reconfig<T>) {
		this.test = config.test ?? this.test;
		this.refilter();
	}

	/**
	 * Refilters the target collection item at the specified position in the source collection.
	 * Call this method when collection item properties change the way that it must be refiltered.
	 */
	refilterAt(sourceIndex: number) {
		const item = this.source.get(sourceIndex);
		const good = this.test(item);
		const targetIndex = this._countFiltered(0, sourceIndex);
		if (this._filtered[sourceIndex] === 0) {
			if (good) {
				this._filtered[sourceIndex] = 1;
				this.target.add(item, targetIndex);
			}
		} else {
			if (!good) {
				this._filtered[sourceIndex] = 0;
				this.target.remove(targetIndex);
			}
		}
	}

	/**
	 * Refilters the target collection. Call this method when collection item properties change the way that
	 * they must be refiltered.
	 */
	refilter() {
		const newFiltered = this.source.native.map(item => this.test(item) ? 1 : 0);

		const segmentsToRemove: IBindableArray.IndexCount[] = [];
		let removeParams: IndexCount = null;

		function flushRemove() {
			if (removeParams !== null) {
				segmentsToRemove.push(removeParams);
				removeParams = null;
			}
		}

		let targetIndex = 0;
		this.source.every((_, index) => {
			if (this._filtered[index] === 0) {
				return true;
			}
			if (newFiltered[index] === 0) {
				if (removeParams === null) {
					removeParams = new IndexCount(targetIndex, 0);
				}
				++removeParams.count;
				this._filtered[index] = 0;
			} else {
				flushRemove();
			}
			++targetIndex;
			return true;
		});

		flushRemove();

		const segmentsToAdd: IBindableArray.IndexItems<T>[] = [];
		let addParams: IBindableArray.IndexItems<T> = null;

		function flushAdd() {
			if (addParams !== null) {
				segmentsToAdd.push(addParams);
				addParams = null;
			}
		}

		targetIndex = 0;
		this.source.every((item, index) => {
			if (this._filtered[index] === 1) {
				flushAdd();
				++targetIndex;
				return true;
			}
			if (newFiltered[index] === 1) {
				if (addParams === null) {
					addParams = new IndexItems<T>(targetIndex, []);
				}
				(<T[]>addParams.items).push(item);
				this._filtered[index] = 1;
				++targetIndex;
			} else {
				flushAdd();
			}
			return true;
		});

		flushAdd();

		this._filtered = newFiltered;
		this.target.trySplice(segmentsToRemove, segmentsToAdd);
	}

	protected destroyObject() {
		this.target.clear();
		if (this._targetCreated) {
			this.target.destroy();
		}
		this.test = null;
		super.destroyObject();
	}

	private _countFiltered(index: number, count: number): number {
		let result = 0;
		for (let i = 0; i < count; ++i) {
			result += this._filtered[index + i];
		}
		return result;
	}

	private _splice(removedSegments: readonly IBindableArray.IndexItems<T>[],
					addedSegments: readonly IBindableArray.IndexItems<T>[]) {
		let sourceIndex = 0;
		let targetIndex = 0;
		const segmentsToRemove = removedSegments.map(indexItems => {
			targetIndex += this._countFiltered(sourceIndex, indexItems.index - sourceIndex);
			const count = this._countFiltered(indexItems.index, indexItems.items.length);
			const params = new IndexCount(targetIndex, count);
			sourceIndex = indexItems.index + indexItems.items.length;
			targetIndex += count;
			return params;
		});
		ArrayUtils.trySplice(this._filtered, removedSegments.map(x => x.toIndexCount()), []);

		sourceIndex = 0;
		targetIndex = 0;
		const segmentsToAdd = addedSegments.map(indexItems => {
			targetIndex += this._countFiltered(sourceIndex, indexItems.index - sourceIndex);
			const items: T[] = [];
			const filtered = indexItems.items.map(item => {
				if (!this.test(item)) {
					return 0;
				}
				items.push(item);
				return 1;
			});
			const params = new IndexItems(targetIndex, items);
			ArrayUtils.addAll(this._filtered, filtered, indexItems.index);
			sourceIndex = indexItems.index + filtered.length;
			targetIndex += items.length;
			return params;
		});

		this.target.trySplice(segmentsToRemove, segmentsToAdd);
	}

	private _onSplice(spliceResult: IBindableArray.SpliceResult<T>) {
		this._splice(spliceResult.removedSegments, spliceResult.addedSegments);
	}

	private _onReplace(message: IBindableArray.ReplaceMessage<T>) {
		const oldFiltered = this._filtered[message.index] !== 0;
		const newFiltered = this.test(message.newValue);
		if (!oldFiltered && !newFiltered) {
			return;
		}
		const index = this._countFiltered(0, message.index);
		this._filtered[message.index] = newFiltered ? 1 : 0;
		if (!newFiltered) {
			this.target.remove(index);
		} else if (!oldFiltered) {
			this.target.add(message.newValue, index);
		} else {
			this.target.trySet(index, message.newValue);
		}
	}

	private _onMove(message: IBindableArray.MoveMessage<T>) {
		if (this._filtered[message.fromIndex] !== 0) {
			let fromIndex: number, toIndex: number;
			if (message.fromIndex < message.toIndex) {
				fromIndex = this._countFiltered(0, message.fromIndex);
				toIndex = fromIndex + this._countFiltered(message.fromIndex + 1, message.toIndex - message.fromIndex);
			} else {
				toIndex = this._countFiltered(0, message.toIndex);
				fromIndex = toIndex + this._countFiltered(message.toIndex, message.fromIndex - message.toIndex);
			}
			this.target.tryMove(fromIndex, toIndex);
		}
		ArrayUtils.move(this._filtered, message.fromIndex, message.toIndex);
	}

	private _onClear() {
		this.target.clear();
	}

	private _onReorder(message: IBindableArray.ReorderMessage<T>) {
		let targetIndex = 0;
		const targetIndexWhichMovesToI = new Map<number, number>();
		for (let sourceIndex = 0, l = this._filtered.length; sourceIndex < l; ++sourceIndex) {
			if (this._filtered[sourceIndex] !== 0) {
				targetIndexWhichMovesToI.set(message.indexMapping[sourceIndex], targetIndex++);
			}
		}
		ArrayUtils.tryReorder(this._filtered, message.indexMapping);

		targetIndex = 0;
		const indexes = new Array<number>(this.target.length.get());
		for (let sourceIndex = 0, l = this._filtered.length; sourceIndex < l; ++sourceIndex) {
			if (this._filtered[sourceIndex] !== 0) {
				indexes[targetIndexWhichMovesToI.get(sourceIndex)] = targetIndex++;
			}
		}

		this.target.tryReorder(indexes);
	}
}

export default ArrayFilterer;

namespace ArrayFilterer {
	/**
	 * ArrayFilterer configuration.
	 */
	export interface Config<T> {
		/**
		 * Target array.
		 */
		readonly target?: IBindableArray<T>;
	}

	/**
	 * ArrayFilterer.reconfigure method configuration.
	 * All options are optional. If skipped, an option stays the same.
	 */
	export interface Reconfig<T> {
		/**
		 * New filtering criteria.
		 */
		readonly test?: (item: T) => boolean;
	}
}

/**
 * Filters an array and starts synchronization.
 * @param source Source array.
 * @param test Filtering criteria.
 * @returns Target array.
 */
export function startFilteringArray<T>(source: ReadonlyBindableArray<T>,
									   test: (item: T) => boolean): DestroyableReadonlyBindableArray<T> {
	if (source.silent) {
		return new BindableArray(filter(source, test), true);
	}
	const target = new BindableArray<T>();
	return target.owning(new ArrayFilterer<T>(source, test, {target}));
}
