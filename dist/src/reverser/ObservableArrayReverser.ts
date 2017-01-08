import {default as ObservableArray, MoveEventParams, ReorderEventParams, ReplaceEventParams, SpliceEventParams} from '../ObservableArray';
import ArrayReverser from './ArrayReverser';
import IArrayReverserConfig from './IArrayReverserConfig';
import IndexCount from '../IndexCount';
import IndexItems from '../IndexItems';

/**
 * [[JW.AbstractArray.Reverser|Reverser]] implementation for [[JW.ObservableArray]].
 */
export default class ObservableArrayReverser<T> extends ArrayReverser<T> {
	/**
	 * @inheritdoc
	 */
	constructor(source: ObservableArray<T>, config?: IArrayReverserConfig<T>) {
		super(source, config);
		this.own(source.spliceEvent.bind(this._onSplice, this));
		this.own(source.replaceEvent.bind(this._onReplace, this));
		this.own(source.moveEvent.bind(this._onMove, this));
		this.own(source.clearEvent.bind(this._onClear, this));
		this.own(source.reorderEvent.bind(this._onReorder, this));
	}

	private _onSplice(params: SpliceEventParams<T>) {
		var spliceResult = params.spliceResult;
		var oldLength = this.target.getLength();
		var newLength = oldLength;

		var removeParamsList = spliceResult.removedItemsList.map((indexItems) => {
			var length = indexItems.items.length;
			var index = oldLength - indexItems.index - length;
			newLength -= length;
			return new IndexCount(index, length);
		});
		removeParamsList.reverse();

		var addedItemsList = spliceResult.addedItemsList.concat();
		addedItemsList.reverse();

		addedItemsList.forEach((indexItems) => {
			newLength += indexItems.items.length;
		});

		var addParamsList = addedItemsList.map((indexItems) => {
			var items = indexItems.items;
			var length = items.length;
			var index = newLength - indexItems.index - length;
			return new IndexItems<T>(index, this._reverse(items));
		});

		this.target.trySplice(removeParamsList, addParamsList);
	}

	private _onReplace(params: ReplaceEventParams<T>) {
		this.target.trySet(params.newItem, this.target.getLength() - params.index - 1);
	}

	private _onMove(params: MoveEventParams<T>) {
		this.target.tryMove(
			this.target.getLength() - params.fromIndex - 1,
			this.target.getLength() - params.toIndex - 1);
	}

	private _onClear() {
		this.target.tryClear();
	}

	private _onReorder(params: ReorderEventParams<T>) {
		var indexArray = params.indexArray;
		var length = indexArray.length;
		var indexes = new Array<number>(indexArray.length);
		for (var i = 0; i < length; ++i) {
			indexes[length - i - 1] = length - indexArray[i] - 1;
		}
		this.target.tryReorder(indexes);
	}
}
