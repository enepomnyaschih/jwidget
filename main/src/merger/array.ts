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
import Class from '../Class';
import DestroyableReadonlyBindableArray from '../DestroyableReadonlyBindableArray';
import IBindableArray from '../IBindableArray';
import {ADAPTER, destroy, SILENT} from '../index';
import IndexCount from '../IndexCount';
import IndexItems from '../IndexItems';
import {mapArray} from '../mapper/array';
import ReadonlyBindableArray from '../ReadonlyBindableArray';

/**
 * Array merger.
 */
class ArrayMerger<T> extends Class {
	private _targetCreated: boolean;
	private _bunches: DestroyableReadonlyBindableArray<Bunch<T>>;
	private _target: IBindableArray<T>;

	/**
	 * @param source Source array.
	 * @param config Merger configuration.
	 */
	constructor(readonly source: ReadonlyBindableArray<ReadonlyBindableArray<T>>, config: ArrayMerger.Config<T> = {}) {
		super();
		this._targetCreated = config.target == null;
		this._target = this._targetCreated ? this._createTarget(source) : config.target;
		this._bunches = mapArray<ReadonlyBindableArray<T>, Bunch<T>>(source,
				bunch => new Bunch<T>(this.source, this._target, bunch), {destroy});
		this._target.addAll(this._getAllItems());
		this.own(source.onSplice.listen(this._onSplice, this));
		this.own(source.onReplace.listen(this._onReplace, this));
		this.own(source.onMove.listen(this._onMove, this));
		this.own(source.onClear.listen(this._onClear, this));
		this.own(source.onReorder.listen(this._onReorder, this));
	}

	protected destroyObject() {
		this._target.clear();
		this._bunches.destroy();
		if (this._targetCreated) {
			this._target.destroy();
		}
		this._bunches = null;
		super.destroyObject();
	}

	get target(): ReadonlyBindableArray<T> {
		return this._target;
	}

	private _createTarget(source: ReadonlyBindableArray<ReadonlyBindableArray<T>>): IBindableArray<T> {
		return new BindableArray<T>(source.silent && source.every(item => item.silent));
	}

	private _getAllItems(): T[] {
		return this._merge(this.source.native);
	}

	private _merge(bunches: readonly ReadonlyBindableArray<T>[]): T[] {
		const items = new Array<T>(this._count(bunches));
		let iItems = 0;
		for (let i = 0, l = bunches.length; i < l; ++i) {
			const bunch = bunches[i].native;
			for (let j = 0, m = bunch.length; j < m; ++j) {
				items[iItems++] = bunch[j];
			}
		}
		return items;
	}

	private _count(bunches: readonly ReadonlyBindableArray<T>[], index?: number, length?: number): number {
		if (index === undefined) {
			index = 0;
		}
		if (length === undefined) {
			length = bunches.length - index;
		}
		let count = 0;
		for (let i = 0; i < length; ++i) {
			count += bunches[index + i].length.get();
		}
		return count;
	}

	private _getIndexes(bunches: readonly ReadonlyBindableArray<T>[]): number[] {
		let currentIndex = 0;
		const indexes = bunches.map(bunch => {
			const index = currentIndex;
			currentIndex += bunch.length.get();
			return index;
		});
		indexes.push(currentIndex);
		return indexes;
	}

	private _onSplice(spliceResult: IBindableArray.SpliceResult<ReadonlyBindableArray<T>>) {
		const indexes = this._getIndexes(spliceResult.oldContents);
		const segmentsToRemove = spliceResult.removedSegments.map(
			indexItems => new IndexCount(indexes[indexItems.index], this._count(indexItems.items)));
		ArrayUtils.backForEach(spliceResult.removedSegments, indexItems => {
			indexes.splice(indexItems.index, indexItems.items.length);
			const count = this._count(indexItems.items);
			for (let i = indexItems.index; i < indexes.length; ++i) {
				indexes[i] -= count;
			}
		});
		const segmentsToAdd = spliceResult.addedSegments.map(
			indexItems => new IndexItems<T>(indexes[indexItems.index], this._merge(indexItems.items)));
		this._target.trySplice(segmentsToRemove, segmentsToAdd);
	}

	private _onReplace(message: IBindableArray.ReplaceMessage<ReadonlyBindableArray<T>>) {
		const index = this._count(this.source.native, 0, message.index);
		this._target.trySplice(
			[new IndexCount(index, message.oldValue.length.get())],
			[new IndexItems<T>(index, message.newValue.native)]);
	}

	private _onMove(message: IBindableArray.MoveMessage<ReadonlyBindableArray<T>>) {
		const count = message.value.length.get();
		const indexes = new Array<number>(this._target.length.get());
		let currentIndex = 0;

		function shiftBunch(bunchLength: number, shift: number) {
			for (var j = 0; j < bunchLength; ++j) {
				indexes[currentIndex] = currentIndex + shift;
				++currentIndex;
			}
		}

		for (let i = 0, l = Math.min(message.fromIndex, message.toIndex); i < l; ++i) {
			shiftBunch(this.source.get(i).length.get(), 0);
		}
		if (message.fromIndex <= message.toIndex) {
			// [1], [2], [3], [4], [5]		[2] move to 3
			// [1], [3], [4], [2], [5]
			shiftBunch(count, this._count(this.source.native, message.fromIndex, message.toIndex - message.fromIndex));
			for (let i = message.fromIndex; i < message.toIndex; ++i) {
				shiftBunch(this.source.get(i).length.get(), -count);
			}
		} else {
			// [1], [2], [3], [4], [5]		[4] move to 1
			// [1], [4], [2], [3], [5]
			for (let i = message.toIndex + 1; i <= message.fromIndex; ++i) {
				shiftBunch(this.source.get(i).length.get(), count);
			}
			shiftBunch(count, -this._count(this.source.native, message.toIndex + 1, message.fromIndex - message.toIndex));
		}
		for (let i = Math.max(message.fromIndex, message.toIndex) + 1, l = this.source.length.get(); i < l; ++i) {
			shiftBunch(this.source.get(i).length.get(), 0);
		}

		this._target.tryReorder(indexes);
	}

	private _onClear() {
		this._target.clear();
	}

	private _onReorder(message: IBindableArray.ReorderMessage<ReadonlyBindableArray<T>>) {
		const oldIndexes = this._getIndexes(message.oldContents);
		const newIndexes = this._getIndexes(this.source.native);
		const indexes = new Array<number>(this._target.length.get());
		for (let i = 0, l = message.oldContents.length; i < l; ++i) {
			const bunch = message.oldContents[i];
			const oldIndex = oldIndexes[i];
			const newIndex = newIndexes[message.indexMapping[i]];
			for (let j = 0, m = bunch.length.get(); j < m; ++j) {
				indexes[oldIndex + j] = newIndex + j;
			}
		}
		this._target.tryReorder(indexes);
	}
}

export default ArrayMerger;

namespace ArrayMerger {
	/**
	 * ArrayMerger configuration.
	 */
	export interface Config<T> {
		/**
		 * Target array. By default, created automatically.
		 */
		readonly target?: IBindableArray<T>;
	}
}

/**
 * Merges arrays and starts synchronization.
 * @param source Source array.
 * @returns Merged array.
 */
export function mergeArrays<T>(source: ReadonlyBindableArray<ReadonlyBindableArray<T>>): DestroyableReadonlyBindableArray<T> {
	if (source.silent && source.every(item => item.silent)) {
		return mergeNoSync(source);
	}
	const target = new BindableArray<T>();
	return target.owning(new ArrayMerger<T>(source, {target}));
}

/**
 * Merges arrays without synchronization.
 * @param source Source array.
 * @returns Merged array.
 */
export function mergeNoSync<T>(source: ReadonlyBindableArray<ReadonlyBindableArray<T>>): IBindableArray<T> {
	return new BindableArray(ArrayUtils.merge(source.native.map(item => item.native)), SILENT & ADAPTER);
}

class Bunch<T> extends Class {
	private source: ReadonlyBindableArray<ReadonlyBindableArray<T>>;
	private target: IBindableArray<T>;
	private bunch: ReadonlyBindableArray<T>;

	constructor(source: ReadonlyBindableArray<ReadonlyBindableArray<T>>, target: IBindableArray<T>, bunch: ReadonlyBindableArray<T>) {
		super();
		this.source = source;
		this.target = target;
		this.bunch = bunch;
		this.own(bunch.onSplice.listen(this._onSplice, this));
		this.own(bunch.onReplace.listen(this._onReplace, this));
		this.own(bunch.onMove.listen(this._onMove, this));
		this.own(bunch.onClear.listen(this._onClear, this));
		this.own(bunch.onReorder.listen(this._onReorder, this));
	}

	private _getIndex(): number {
		const bunches = this.source.native;
		let index = 0;
		for (let i = 0, l = bunches.length; i < l; ++i) {
			const bunch = bunches[i];
			if (bunch === this.bunch) {
				return index;
			}
			index += bunch.length.get();
		}
		console.warn("ArrayMerger object is corrupted.");
		return 0;
	}

	private _onSplice(spliceResult: IBindableArray.SpliceResult<T>) {
		const index = this._getIndex();
		const segmentsToRemove = spliceResult.removedSegments.map(
			indexItems => new IndexCount(indexItems.index + index, indexItems.items.length));
		const segmentsToAdd = spliceResult.addedSegments.map(
			indexItems => new IndexItems<T>(indexItems.index + index, indexItems.items.concat()));
		this.target.trySplice(segmentsToRemove, segmentsToAdd);
	}

	private _onReplace(message: IBindableArray.ReplaceMessage<T>) {
		this.target.trySet(this._getIndex() + message.index, message.newValue);
	}

	private _onMove(message: IBindableArray.MoveMessage<T>) {
		var index = this._getIndex();
		this.target.tryMove(index + message.fromIndex, index + message.toIndex);
	}

	private _onClear(oldContents: readonly T[]) {
		this.target.tryRemoveAll(this._getIndex(), oldContents.length);
	}

	private _onReorder(message: IBindableArray.ReorderMessage<T>) {
		const index = this._getIndex();
		const bunchIndexArray = message.indexMapping;
		const bunchLength = bunchIndexArray.length;
		const targetLength = this.target.length.get();
		const targetIndexArray = new Array<number>(targetLength);
		for (let i = 0; i < index; ++i) {
			targetIndexArray[i] = i;
		}
		for (let i = 0; i < bunchLength; ++i) {
			targetIndexArray[index + i] = index + bunchIndexArray[i];
		}
		for (let i = index + bunchLength; i < targetLength; ++i) {
			targetIndexArray[i] = i;
		}
		this.target.tryReorder(targetIndexArray);
	}
}
