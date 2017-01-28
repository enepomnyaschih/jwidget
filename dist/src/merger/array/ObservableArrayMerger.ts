import {default as ObservableArray, ArrayMoveEventParams, ArrayReorderEventParams, ArrayReplaceEventParams, ArraySpliceEventParams} from '../../ObservableArray';
import ArrayMerger from './ArrayMerger';
import IArray from '../../IArray';
import IArrayMergerConfig from './IArrayMergerConfig';
import IndexCount from '../../IndexCount';
import IndexItems from '../../IndexItems';
import * as ArrayUtils from '../../ArrayUtils';

/**
 * [[JW.AbstractArray.Merger|Merger]] implementation for [[JW.ObservableArray]].
 */
export default class ObservableArrayMerger<T> extends ArrayMerger<T> {
	/**
	 * @inheritdoc
	 */
	constructor(source: ObservableArray<IArray<T>>, config?: IArrayMergerConfig<T>) {
		super(source, config);
		this.own(source.spliceEvent.bind(this._onSplice, this));
		this.own(source.replaceEvent.bind(this._onReplace, this));
		this.own(source.moveEvent.bind(this._onMove, this));
		this.own(source.clearEvent.bind(this._onClear, this));
		this.own(source.reorderEvent.bind(this._onReorder, this));
	}

	private _getIndexes(bunches: IArray<T>[]): number[] {
		var currentIndex = 0;
		var indexes = bunches.map(function (bunch) {
			var index = currentIndex;
			currentIndex += bunch.getLength();
			return index;
		}, this);
		indexes.push(currentIndex);
		return indexes;
	}

	private _onSplice(params: ArraySpliceEventParams<IArray<T>>) {
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

	private _onReplace(params: ArrayReplaceEventParams<IArray<T>>) {
		var index = this._count(this.source.getItems(), 0, params.index);
		this.target.trySplice(
			[new IndexCount(index, params.oldItem.getLength())],
			[new IndexItems<T>(index, params.newItem.getItems())]);
	}

	private _onMove(params: ArrayMoveEventParams<IArray<T>>) {
		var count = params.item.getLength();
		var indexes = new Array<number>(this.target.getLength());
		var currentIndex = 0;

		function shiftBunch(bunchLength: number, shift: number) {
			for (var j = 0; j < bunchLength; ++j) {
				indexes[currentIndex] = currentIndex + shift;
				++currentIndex;
			}
		}

		for (var i = 0, l = Math.min(params.fromIndex, params.toIndex); i < l; ++i) {
			shiftBunch(this.source.get(i).getLength(), 0);
		}
		if (params.fromIndex <= params.toIndex) {
			// [1], [2], [3], [4], [5]		[2] move to 3
			// [1], [3], [4], [2], [5]
			shiftBunch(count, this._count(this.source.getItems(), params.fromIndex, params.toIndex - params.fromIndex));
			for (var i = params.fromIndex; i < params.toIndex; ++i) {
				shiftBunch(this.source.get(i).getLength(), -count);
			}
		} else {
			// [1], [2], [3], [4], [5]		[4] move to 1
			// [1], [4], [2], [3], [5]
			for (var i = params.toIndex + 1; i <= params.fromIndex; ++i) {
				shiftBunch(this.source.get(i).getLength(), count);
			}
			shiftBunch(count, -this._count(this.source.getItems(), params.toIndex + 1, params.fromIndex - params.toIndex));
		}
		for (var i = Math.max(params.fromIndex, params.toIndex) + 1, l = this.source.getLength(); i < l; ++i) {
			shiftBunch(this.source.get(i).getLength(), 0);
		}

		this.target.tryReorder(indexes);
	}

	private _onClear() {
		this.target.tryClear();
	}

	private _onReorder(params: ArrayReorderEventParams<IArray<T>>) {
		var oldIndexes = this._getIndexes(params.items);
		var newIndexes = this._getIndexes(this.source.getItems());
		var indexes = new Array<number>(this.target.getLength());
		for (var i = 0, l = params.items.length; i < l; ++i) {
			var bunch = params.items[i];
			var oldIndex = oldIndexes[i];
			var newIndex = newIndexes[params.indexArray[i]];
			for (var j = 0, m = bunch.getLength(); j < m; ++j) {
				indexes[oldIndex + j] = newIndex + j;
			}
		}
		this.target.tryReorder(indexes);
	}
}
