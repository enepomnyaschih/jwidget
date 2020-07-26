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
import DestroyableReadonlyBindableArray from '../DestroyableReadonlyBindableArray';
import Dictionary from '../Dictionary';
import IBindableArray from '../IBindableArray';
import {def} from '../index';
import IndexCount from '../IndexCount';
import IndexItems from '../IndexItems';
import BindableArray from '../BindableArray';
import ReadonlyBindableArray from '../ReadonlyBindableArray';
import AbstractFilterer from './AbstractFilterer';

/**
 * AbstractFilterer implementation for arrays.
 */
class ArrayFilterer<T> extends AbstractFilterer<T> {
	private _filtered: number[] = [];

	/**
	 * Source array.
	 */
	readonly source: ReadonlyBindableArray<T>;

	/**
	 * @inheritDoc
	 */
	readonly target: IBindableArray<T>;

	/**
	 * @param source Source array.
	 * @param test Filtering criteria.
	 * @param config Filterer configuration.
	 */
	constructor(source: ReadonlyBindableArray<T>, test: (item: T) => any, config: ArrayFilterer.FullConfig<T> = {}) {
		super(test, config);
		this.target = config.target ?? this.own(new BindableArray<T>(this.source.getKey, this.source.silent));
		this._splice([], [new IndexItems(0, this.source.items)]);
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
		this._test = def(config.test, this._test);
		this._scope = def(config.scope, this._scope);
		this.refilter();
	}

	/**
	 * Refilters the target collection item at the specified position in the source collection.
	 * Call this method when collection item properties change the way that it must be refiltered.
	 */
	refilterAt(sourceIndex: number) {
		var item = this.source.get(sourceIndex);
		var good = this._test.call(this._scope, item);
		var targetIndex = this._countFiltered(0, sourceIndex);
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
	 * Refilters the target collection item. Call this method when collection item properties change the way that
	 * it must be refiltered.
	 * @param item Item to refilter.
	 */
	refilterItem(item: T) {
		var index = this.source.indexOf(item);
		if (index !== -1) {
			this.refilterAt(index);
		}
	}

	/**
	 * Refilters the target collection. Call this method when collection item properties change the way that
	 * they must be refiltered.
	 */
	refilter() {
		var newFiltered = this.source.items.map((item) => {
			return this._test.call(this._scope, item) ? 1 : 0;
		});

		var removeParams: IndexCount = null;
		var segmentsToRemove: IBindableArray.IndexCount[] = [];

		function flushRemove() {
			if (removeParams !== null) {
				segmentsToRemove.push(removeParams);
				removeParams = null;
			}
		}

		var targetIndex = 0;
		this.source.every((item, index) => {
			item = item;
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

		var addParams: IBindableArray.IndexItems<T> = null;
		var segmentsToAdd: IBindableArray.IndexItems<T>[] = [];

		function flushAdd() {
			if (addParams !== null) {
				segmentsToAdd.push(addParams);
				addParams = null;
			}
		}

		var targetIndex = 0;
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
				addParams.items.push(item);
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

	/**
	 * @inheritDoc
	 */
	protected destroyObject() {
		this.target.clear();
		super.destroyObject();
	}

	private _countFiltered(index: number, count: number): number {
		var result = 0;
		for (var i = 0; i < count; ++i) {
			result += this._filtered[index + i];
		}
		return result;
	}

	private _splice(removedSegments: IBindableArray.IndexItems<T>[], addedSegments: IBindableArray.IndexItems<T>[]) {
		var sourceIndex = 0;
		var targetIndex = 0;
		var segmentsToRemove = removedSegments.map(indexItems => {
			targetIndex += this._countFiltered(sourceIndex, indexItems.index - sourceIndex);
			var count = this._countFiltered(indexItems.index, indexItems.items.length);
			var params = new IndexCount(targetIndex, count);
			sourceIndex = indexItems.index + indexItems.items.length;
			targetIndex += count;
			return params;
		});
		ArrayUtils.trySplice(this._filtered, removedSegments.map(x => x.toIndexCount()), []);

		var sourceIndex = 0;
		var targetIndex = 0;
		var segmentsToAdd = addedSegments.map(indexItems => {
			targetIndex += this._countFiltered(sourceIndex, indexItems.index - sourceIndex);
			var items: T[] = [];
			var filtered = indexItems.items.map((item) => {
				if (!this._test.call(this._scope, item)) {
					return 0;
				}
				items.push(item);
				return 1;
			});
			var params = new IndexItems(targetIndex, items);
			ArrayUtils.tryAddAll(this._filtered, filtered, indexItems.index);
			sourceIndex = indexItems.index + filtered.length;
			targetIndex += items.length;
			return params;
		});

		this.target.trySplice(segmentsToRemove, segmentsToAdd);
	}

	private _onSplice(message: IBindableArray.SpliceMessage<T>) {
		var spliceResult = message.spliceResult;
		this._splice(spliceResult.removedSegments, spliceResult.addedSegments);
	}

	private _onReplace(message: IBindableArray.ReplaceMessage<T>) {
		var oldFiltered = this._filtered[message.index] !== 0;
		var newFiltered = this._test.call(this._scope, message.newItem);
		if (!oldFiltered && !newFiltered) {
			return;
		}
		var index = this._countFiltered(0, message.index);
		this._filtered[message.index] = newFiltered ? 1 : 0;
		if (!newFiltered) {
			this.target.remove(index);
		} else if (!oldFiltered) {
			this.target.add(message.newItem, index);
		} else {
			this.target.trySet(index, message.newItem);
		}
	}

	private _onMove(message: IBindableArray.MoveMessage<T>) {
		if (this._filtered[message.fromIndex] !== 0) {
			var fromIndex: number, toIndex: number;
			if (message.fromIndex < message.toIndex) {
				fromIndex = this._countFiltered(0, message.fromIndex);
				toIndex = fromIndex + this._countFiltered(message.fromIndex + 1, message.toIndex - message.fromIndex);
			} else {
				toIndex = this._countFiltered(0, message.toIndex);
				fromIndex = toIndex + this._countFiltered(message.toIndex, message.fromIndex - message.toIndex);
			}
			this.target.tryMove(fromIndex, toIndex);
		}
		ArrayUtils.tryMove(this._filtered, message.fromIndex, message.toIndex);
	}

	private _onClear() {
		this.target.clear();
	}

	private _onReorder(message: IBindableArray.ReorderMessage<T>) {
		var targetIndex = 0;
		var targetIndexWhichMovesToI: Dictionary<number> = {};
		for (var sourceIndex = 0, l = this._filtered.length; sourceIndex < l; ++sourceIndex) {
			if (this._filtered[sourceIndex] !== 0) {
				targetIndexWhichMovesToI[message.indexArray[sourceIndex]] = targetIndex++;
			}
		}
		ArrayUtils.tryReorder(this._filtered, message.indexArray);

		var targetIndex = 0;
		var indexes = new Array<number>(this.target.length.get());
		for (var sourceIndex = 0, l = this._filtered.length; sourceIndex < l; ++sourceIndex) {
			if (this._filtered[sourceIndex] !== 0) {
				indexes[targetIndexWhichMovesToI[sourceIndex]] = targetIndex++;
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
	export interface FullConfig<T> extends AbstractFilterer.Config {
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
		readonly test?: (item: T) => any;

		/**
		 * New `test` call scope.
		 */
		readonly scope?: any;
	}
}

/**
 * Filters an array and starts synchronization.
 * @param source Source array.
 * @param test Filtering criteria.
 * @param scope Call scope of `test` function.
 * @returns Target array.
 */
export function filterArray<T>(source: ReadonlyBindableArray<T>, test: (item: T) => any,
							   scope?: any): DestroyableReadonlyBindableArray<T> {
	if (source.silent) {
		return source.filter(test, scope);
	}
	const target = new BindableArray<T>(source.getKey);
	return target.owning(new ArrayFilterer<T>(source, test, {target, scope}));
}
