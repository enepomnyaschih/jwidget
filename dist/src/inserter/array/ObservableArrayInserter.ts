import {default as ObservableArray, ArrayItemsEventParams, ArrayMoveEventParams, ArrayReorderEventParams, ArrayReplaceEventParams, ArraySpliceEventParams} from '../../ObservableArray';
import ArrayInserter from './ArrayInserter';
import IArrayInserterConfig from './IArrayInserterConfig';

/**
 * [[JW.AbstractArray.Inserter|Inserter]] implementation for [[JW.ObservableArray]].
 */
export default class ObservableArrayInserter<T> extends ArrayInserter<T> {
	/**
	 * @inheritdoc
	 */
	constructor(source: ObservableArray<T>, config?: IArrayInserterConfig<T>) {
		super(source, config);
		this.own(source.spliceEvent.bind(this._onSplice, this));
		this.own(source.replaceEvent.bind(this._onReplace, this));
		this.own(source.moveEvent.bind(this._onMove, this));
		this.own(source.clearEvent.bind(this._onClear, this));
		this.own(source.reorderEvent.bind(this._onReorder, this));
	}

	private _onSplice(params: ArraySpliceEventParams<T>) {
		var spliceResult = params.spliceResult;
		var oldItems = spliceResult.oldItems;
		var removedItems = spliceResult.getRemovedItems();

		// if there is an effective clearing function, just reset the controller
		if (this._clearItems && (3 * removedItems.length > 2 * oldItems.length)) {
			this._clearItems.call(this._scope, oldItems);
			this._addItems(this.source.getItems(), 0);
			return;
		}

		// else, splice the elements
		var removedItemsList = spliceResult.removedItemsList;
		var addedItemsList = spliceResult.addedItemsList;
		for (var i = removedItemsList.length - 1; i >= 0; --i) {
			var removeRarams = removedItemsList[i];
			this._removeItems(removeRarams.items, removeRarams.index);
		}
		for (var i = 0, l = addedItemsList.length; i < l; ++i) {
			var addParams = addedItemsList[i];
			this._addItems(addParams.items, addParams.index);
		}
	}

	private _onReplace(params: ArrayReplaceEventParams<T>) {
		if (this._removeItem) {
			this._removeItem.call(this._scope, params.oldItem, params.index);
		}
		if (this._addItem) {
			this._addItem.call(this._scope, params.newItem, params.index);
		}
	}

	private _onMove(params: ArrayMoveEventParams<T>) {
		if (this._removeItem) {
			this._removeItem.call(this._scope, params.item, params.fromIndex);
		}
		if (this._addItem) {
			this._addItem.call(this._scope, params.item, params.toIndex);
		}
	}

	private _onClear(params: ArrayItemsEventParams<T>) {
		this._doClearItems(params.items);
	}

	private _onReorder(params: ArrayReorderEventParams<T>) {
		this._doClearItems(params.items);
		this._addItems(this.source.getItems(), 0);
	}
}
