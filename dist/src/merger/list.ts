/*!
	jWidget 2
	Copyright (C) 2017  Egor Nepomnyaschih
	enepomnyaschih@gmail.com
	https://github.com/enepomnyaschih/jwidget

	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU Lesser General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU Lesser General Public License for more details.

	You should have received a copy of the GNU Lesser General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

import {iidStr, SILENT, ADAPTER} from '../index';
import {mapDestroyableList} from '../mapper/list';
import Class from '../Class';
import IList from '../IList';
import IndexCount from '../IndexCount';
import IndexItems from '../IndexItems';
import List from '../List';
import * as ArrayUtils from '../ArrayUtils';

/**
 * Arrays merger. Builds array consisting of all source collections items in the same order.
 * If any of the original collections is observable, starts continuous synchronization.
 *
 *     var source = new JW.ObservableArray([
 *         new JW.Array([1, 2, 3]),
 *         new JW.ObservableArray(),
 *         new JW.Array([4])
 *     ]);
 *     var merger = source.createMerger();
 *     var target = merger.target;
 *     assert(target.equal([1, 2, 3, 4]));
 *
 *     source.add(new JW.Array([5, 6]));
 *     assert(target.equal([1, 2, 3, 4, 5, 6]));
 *
 *     source.get(1).addAll([7, 8, 9]);
 *     assert(target.equal([1, 2, 3, 7, 8, 9, 4, 5, 6]));
 *
 *     merger.destroy();
 *
 * Use [[JW.List.createMerger|createMerger]] method to create the synchronizer.
 * The method will select which synchronizer implementation fits better (simple or observable).
 *
 * You can pass target array in config option:
 *
 *     var source = new JW.Array();
 *     var target = new JW.Array();
 *     var merger = source.createMerger({
 *         target: target
 *     });
 *
 * In simple cases, [[JW.List.$$merge|$$merge]] shorthand can be used instead. It returns the target array right away:
 *
 *     var source = new JW.ObservableArray([
 *         new JW.Array([1, 2, 3]),
 *         new JW.ObservableArray(),
 *         new JW.Array([4])
 *     ]);
 *     var target = source.$$merge();
 *     assert(target.equal([1, 2, 3, 4]));
 *
 *     source.add(new JW.Array([5, 6]));
 *     assert(target.equal([1, 2, 3, 4, 5, 6]));
 *
 *     source.get(1).addAll([7, 8, 9]);
 *     assert(target.equal([1, 2, 3, 7, 8, 9, 4, 5, 6]));
 *
 *     target.destroy();
 *
 * Synchronizer rules:
 *
 * - Target array is stored in [[target]] property.
 * - Target array must be empty before initialization.
 * - You can't modify target array manually and/or create other synchronizers with the same target array.
 * - All items of source arrays are added to [[target]]
 * immediately on synchronizer initialization.
 * - All items are removed from [[target]] on synchronizer destruction.
 * - You can pass target array in [[Merger.Config.target|target]] config option.
 * In this case, you are responsible for its destruction (though items will be removed
 * automatically on synchronizer destruction anyway).
 * - If [[Merger.Config.target|target]]
 * is not passed, it will be created automatically. Synchronizer will select
 * appropriate [[target]] implementation (simple or observable). In this
 * case, [[target]] will be destroyed automatically on synchronizer destruction.
 *
 * @param T Array item type.
 */
class ListMerger<T> extends Class {
	private _targetCreated: boolean;
	private _bunches: IList<Bunch<T>>;

	/**
	 * Target array.
	 */
	readonly target: IList<T>;

	/**
	 * Creates synchronizer.
	 * [[JW.List.createMerger|createMerger]] method is preferred instead.
	 *
	 * @param source Source array.
	 * @param config Configuration.
	 */
	constructor(readonly source: IList<IList<T>>, config: ListMerger.Config<T> = {}) {
		super();
		this._targetCreated = config.target == null;
		this.target = this._targetCreated ? this._createTarget(source, config.getKey) : config.target;
		this._bunches = mapDestroyableList<IList<T>, Bunch<T>>(source,
			(bunch) => new Bunch<T>(this.source, this.target, bunch), null, iidStr);
		this.target.tryAddAll(this._getAllItems());
		this.own(source.spliceEvent.listen(this._onSplice, this));
		this.own(source.replaceEvent.listen(this._onReplace, this));
		this.own(source.moveEvent.listen(this._onMove, this));
		this.own(source.clearEvent.listen(this._onClear, this));
		this.own(source.reorderEvent.listen(this._onReorder, this));
	}

	/**
	 * @inheritdoc
	 */
	destroyObject() {
		this.target.clear();
		this._bunches.destroy();
		if (this._targetCreated) {
			this.target.destroy();
		}
		this._bunches = null;
		super.destroyObject();
	}

	private _createTarget(source: IList<IList<T>>, getKey: (item: T) => string): IList<T> {
		return new List<T>(getKey, source.silent && source.every((item) => item.silent));
	}

	private _getAllItems(): T[] {
		return this._merge(this.source.items);
	}

	private _merge(bunches: IList<T>[]): T[] {
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

	private _count(bunches: IList<T>[], index?: number, length?: number): number {
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

	private _getIndexes(bunches: IList<T>[]): number[] {
		var currentIndex = 0;
		var indexes = bunches.map(function (bunch) {
			var index = currentIndex;
			currentIndex += bunch.length.get();
			return index;
		}, this);
		indexes.push(currentIndex);
		return indexes;
	}

	private _onSplice(params: IList.SpliceEventParams<IList<T>>) {
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
		this.target.trySplice(removeParamsList, addParamsList);
	}

	private _onReplace(params: IList.ReplaceEventParams<IList<T>>) {
		var index = this._count(this.source.items, 0, params.index);
		this.target.trySplice(
			[new IndexCount(index, params.oldItem.length.get())],
			[new IndexItems<T>(index, params.newItem.items)]);
	}

	private _onMove(params: IList.MoveEventParams<IList<T>>) {
		var count = params.item.length.get();
		var indexes = new Array<number>(this.target.length.get());
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

		this.target.tryReorder(indexes);
	}

	private _onClear() {
		this.target.clear();
	}

	private _onReorder(params: IList.ReorderEventParams<IList<T>>) {
		var oldIndexes = this._getIndexes(params.items);
		var newIndexes = this._getIndexes(this.source.items);
		var indexes = new Array<number>(this.target.length.get());
		for (var i = 0, l = params.items.length; i < l; ++i) {
			var bunch = params.items[i];
			var oldIndex = oldIndexes[i];
			var newIndex = newIndexes[params.indexArray[i]];
			for (var j = 0, m = bunch.length.get(); j < m; ++j) {
				indexes[oldIndex + j] = newIndex + j;
			}
		}
		this.target.tryReorder(indexes);
	}
}

export default ListMerger;

namespace ListMerger {
	/**
	 * [[JW.List.Merger]] configuration.
	 *
	 * @param T Collection item type.
	 */
	export interface Config<T> {
		/**
		 * Target array. By default, created automatically.
		 */
		readonly target?: IList<T>;

		/**
		 * Identifies an item in the auto-created target collection for optimization of some algorithms.
		 */
		readonly getKey?: (item: T) => string;
	}
}

export function mergeLists<T>(source: IList<IList<T>>, getKey?: (item: T) => string): IList<T> {
	if (source.silent && source.every((item) => item.silent)) {
		return $mergeNoSync(source, getKey);
	}
	const result = new List<T>(getKey);
	return result.owning(new ListMerger<T>(source, {
		target: result
	}));
}

export function mergeNoSync<T>(source: IList<IList<T>>): T[] {
	return ArrayUtils.merge(source.items.map((item) => item.items));
}

export function $mergeNoSync<T>(source: IList<IList<T>>, getKey?: (item: T) => string): IList<T> {
	return new List(mergeNoSync(source), getKey, SILENT & ADAPTER);
}

class Bunch<T> extends Class {
	private source: IList<IList<T>>;
	private target: IList<T>;
	private bunch: IList<T>;

	constructor(source: IList<IList<T>>, target: IList<T>, bunch: IList<T>) {
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
		this.target.tryPut(this._getIndex() + params.index, params.newItem);
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
