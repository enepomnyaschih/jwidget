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
import Class from '../Class';
import DestroyableReadonlyList from '../DestroyableReadonlyList';
import IList from '../IList';
import {ADAPTER, destroy, iidStr, SILENT} from '../index';
import IndexCount from '../IndexCount';
import IndexItems from '../IndexItems';
import List from '../List';
import {mapList} from '../mapper/list';
import ReadonlyList from '../ReadonlyList';

/**
 * List merger.
 * @param T List item type.
 */
class ListMerger<T> extends Class {
	private _targetCreated: boolean;
	private _bunches: DestroyableReadonlyList<Bunch<T>>;
	private _target: IList<T>;

	/**
	 * @param source Source list.
	 * @param config Merger configuration.
	 */
	constructor(readonly source: ReadonlyList<ReadonlyList<T>>, config: ListMerger.Config<T> = {}) {
		super();
		this._targetCreated = config.target == null;
		this._target = this._targetCreated ? this._createTarget(source, config.getKey) : config.target;
		this._bunches = mapList<ReadonlyList<T>, Bunch<T>>(source, (bunch) => new Bunch<T>(this.source, this._target, bunch), {
			destroy,
			getKey: iidStr
		});
		this._target.addAll(this._getAllItems());
		this.own(source.spliceEvent.listen(this._onSplice, this));
		this.own(source.replaceEvent.listen(this._onReplace, this));
		this.own(source.moveEvent.listen(this._onMove, this));
		this.own(source.clearEvent.listen(this._onClear, this));
		this.own(source.reorderEvent.listen(this._onReorder, this));
	}

	/**
	 * @inheritDoc
	 */
	protected destroyObject() {
		this._target.clear();
		this._bunches.destroy();
		if (this._targetCreated) {
			this._target.destroy();
		}
		this._bunches = null;
		super.destroyObject();
	}

	get target(): ReadonlyList<T> {
		return this._target;
	}

	private _createTarget(source: ReadonlyList<ReadonlyList<T>>, getKey: (item: T) => any): IList<T> {
		return new List<T>(getKey, source.silent && source.every((item) => item.silent));
	}

	private _getAllItems(): T[] {
		return this._merge(this.source.items);
	}

	private _merge(bunches: ReadonlyList<T>[]): T[] {
		var items = new Array<T>(this._count(bunches));
		var iItems = 0;
		for (var i = 0, l = bunches.length; i < l; ++i) {
			var bunch = bunches[i].items;
			for (var j = 0, m = bunch.length; j < m; ++j) {
				items[iItems++] = bunch[j];
			}
		}
		return items;
	}

	private _count(bunches: ReadonlyList<T>[], index?: number, length?: number): number {
		if (index === undefined) {
			index = 0;
		}
		if (length === undefined) {
			length = bunches.length - index;
		}
		var count = 0;
		for (var i = 0; i < length; ++i) {
			count += bunches[index + i].length.get();
		}
		return count;
	}

	private _getIndexes(bunches: ReadonlyList<T>[]): number[] {
		var currentIndex = 0;
		var indexes = bunches.map(function (bunch) {
			var index = currentIndex;
			currentIndex += bunch.length.get();
			return index;
		}, this);
		indexes.push(currentIndex);
		return indexes;
	}

	private _onSplice(params: IList.SpliceEventParams<ReadonlyList<T>>) {
		var spliceResult = params.spliceResult;
		var indexes = this._getIndexes(spliceResult.oldItems);
		var removeParamsList = spliceResult.removedItemsList.map((indexItems) => {
			return new IndexCount(indexes[indexItems.index], this._count(indexItems.items));
		}, this);
		ArrayUtils.backEvery(spliceResult.removedItemsList, (indexItems) => {
			indexes.splice(indexItems.index, indexItems.items.length);
			var count = this._count(indexItems.items);
			for (var i = indexItems.index; i < indexes.length; ++i) {
				indexes[i] -= count;
			}
			return true;
		}, this);
		var addParamsList = spliceResult.addedItemsList.map((indexItems) => {
			return new IndexItems<T>(indexes[indexItems.index], this._merge(indexItems.items));
		}, this);
		this._target.trySplice(removeParamsList, addParamsList);
	}

	private _onReplace(params: IList.ReplaceEventParams<ReadonlyList<T>>) {
		var index = this._count(this.source.items, 0, params.index);
		this._target.trySplice(
			[new IndexCount(index, params.oldItem.length.get())],
			[new IndexItems<T>(index, params.newItem.items)]);
	}

	private _onMove(params: IList.MoveEventParams<ReadonlyList<T>>) {
		var count = params.item.length.get();
		var indexes = new Array<number>(this._target.length.get());
		var currentIndex = 0;

		function shiftBunch(bunchLength: number, shift: number) {
			for (var j = 0; j < bunchLength; ++j) {
				indexes[currentIndex] = currentIndex + shift;
				++currentIndex;
			}
		}

		for (var i = 0, l = Math.min(params.fromIndex, params.toIndex); i < l; ++i) {
			shiftBunch(this.source.get(i).length.get(), 0);
		}
		if (params.fromIndex <= params.toIndex) {
			// [1], [2], [3], [4], [5]		[2] move to 3
			// [1], [3], [4], [2], [5]
			shiftBunch(count, this._count(this.source.items, params.fromIndex, params.toIndex - params.fromIndex));
			for (var i = params.fromIndex; i < params.toIndex; ++i) {
				shiftBunch(this.source.get(i).length.get(), -count);
			}
		} else {
			// [1], [2], [3], [4], [5]		[4] move to 1
			// [1], [4], [2], [3], [5]
			for (var i = params.toIndex + 1; i <= params.fromIndex; ++i) {
				shiftBunch(this.source.get(i).length.get(), count);
			}
			shiftBunch(count, -this._count(this.source.items, params.toIndex + 1, params.fromIndex - params.toIndex));
		}
		for (var i = Math.max(params.fromIndex, params.toIndex) + 1, l = this.source.length.get(); i < l; ++i) {
			shiftBunch(this.source.get(i).length.get(), 0);
		}

		this._target.tryReorder(indexes);
	}

	private _onClear() {
		this._target.clear();
	}

	private _onReorder(params: IList.ReorderEventParams<ReadonlyList<T>>) {
		var oldIndexes = this._getIndexes(params.items);
		var newIndexes = this._getIndexes(this.source.items);
		var indexes = new Array<number>(this._target.length.get());
		for (var i = 0, l = params.items.length; i < l; ++i) {
			var bunch = params.items[i];
			var oldIndex = oldIndexes[i];
			var newIndex = newIndexes[params.indexArray[i]];
			for (var j = 0, m = bunch.length.get(); j < m; ++j) {
				indexes[oldIndex + j] = newIndex + j;
			}
		}
		this._target.tryReorder(indexes);
	}
}

export default ListMerger;

namespace ListMerger {
	/**
	 * ListMerger configuration.
	 * @param T List item type.
	 */
	export interface Config<T> {
		/**
		 * Target list. By default, created automatically.
		 */
		readonly target?: IList<T>;

		/**
		 * Function which identifies an item in the auto-created target list for optimization of some algorithms.
		 */
		readonly getKey?: (item: T) => any;
	}
}

/**
 * Merges lists and starts synchronization.
 * @param source Source list.
 * @param getKey Function which identifies an item in the target list for optimization of some algorithms.
 * @returns Merged list.
 */
export function mergeLists<T>(source: ReadonlyList<ReadonlyList<T>>,
                              getKey?: (item: T) => any): DestroyableReadonlyList<T> {
	if (source.silent && source.every((item) => item.silent)) {
		return mergeNoSync(source, getKey);
	}
	const target = new List<T>(getKey);
	return target.owning(new ListMerger<T>(source, {target}));
}

/**
 * Merges lists without synchronization.
 * @param source Source list.
 * @param getKey Function which identifies an item in the target list for optimization of some algorithms.
 * @returns Merged list.
 */
export function mergeNoSync<T>(source: ReadonlyList<ReadonlyList<T>>, getKey?: (item: T) => any): IList<T> {
	return new List(ArrayUtils.merge(source.items.map((item) => item.items)), getKey, SILENT & ADAPTER);
}

class Bunch<T> extends Class {
	private source: ReadonlyList<ReadonlyList<T>>;
	private target: IList<T>;
	private bunch: ReadonlyList<T>;

	constructor(source: ReadonlyList<ReadonlyList<T>>, target: IList<T>, bunch: ReadonlyList<T>) {
		super();
		this.source = source;
		this.target = target;
		this.bunch = bunch;
		this.own(bunch.spliceEvent.listen(this._onSplice, this));
		this.own(bunch.replaceEvent.listen(this._onReplace, this));
		this.own(bunch.moveEvent.listen(this._onMove, this));
		this.own(bunch.clearEvent.listen(this._onClear, this));
		this.own(bunch.reorderEvent.listen(this._onReorder, this));
	}

	private _getIndex(): number {
		var bunches = this.source.items;
		var index = 0;
		for (var i = 0, l = bunches.length; i < l; ++i) {
			var bunch = bunches[i];
			if (bunch === this.bunch) {
				return index;
			}
			index += bunch.length.get();
		}
		console.warn("JW.ObservableArray.Merger object is corrupted");
		return 0;
	}

	private _onSplice(params: IList.SpliceEventParams<T>) {
		var spliceResult = params.spliceResult;
		var index = this._getIndex();
		var removeParamsList = spliceResult.removedItemsList.map((indexItems) => {
			return new IndexCount(indexItems.index + index, indexItems.items.length);
		});
		var addParamsList = spliceResult.addedItemsList.map((indexItems) => {
			return new IndexItems<T>(indexItems.index + index, indexItems.items.concat());
		});
		this.target.trySplice(removeParamsList, addParamsList);
	}

	private _onReplace(params: IList.ReplaceEventParams<T>) {
		this.target.trySet(this._getIndex() + params.index, params.newItem);
	}

	private _onMove(params: IList.MoveEventParams<T>) {
		var index = this._getIndex();
		this.target.tryMove(index + params.fromIndex, index + params.toIndex);
	}

	private _onClear(params: IList.ItemsEventParams<T>) {
		this.target.tryRemoveAll(this._getIndex(), params.items.length);
	}

	private _onReorder(params: IList.ReorderEventParams<T>) {
		var index = this._getIndex();
		var bunchIndexArray = params.indexArray;
		var bunchLength = bunchIndexArray.length;
		var targetLength = this.target.length.get();
		var targetIndexArray = new Array<number>(targetLength);
		for (var i = 0; i < index; ++i) {
			targetIndexArray[i] = i;
		}
		for (var i = 0; i < bunchLength; ++i) {
			targetIndexArray[index + i] = index + bunchIndexArray[i];
		}
		for (var i = index + bunchLength; i < targetLength; ++i) {
			targetIndexArray[i] = i;
		}
		this.target.tryReorder(targetIndexArray);
	}
}
