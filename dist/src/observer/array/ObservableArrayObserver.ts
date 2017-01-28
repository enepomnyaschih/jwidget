import {default as ObservableArray, ArrayItemsEventParams, ArrayReplaceEventParams, ArraySpliceEventParams} from '../../ObservableArray';
import ArrayObserver from './ArrayObserver';
import ICollectionObserverConfig from '../ICollectionObserverConfig';

/**
 * [[JW.AbstractCollection.Observer|Observer]] implementation for [[JW.ObservableArray]].
 */
export default class ObservableArrayObserver<T> extends ArrayObserver<T> {
	/**
	 * @inheritdoc
	 */
	constructor(source: ObservableArray<T>, config: ICollectionObserverConfig<T>) {
		super(source, config);
		this.own(source.spliceEvent.bind(this._onSplice, this));
		this.own(source.replaceEvent.bind(this._onReplace, this));
		this.own(source.clearEvent.bind(this._onClear, this));
		if (this._change) {
			this.own(source.changeEvent.bind(this._onChange, this));
		}
	}

	private _onSplice(params: ArraySpliceEventParams<T>) {
		var spliceResult = params.spliceResult;
		var oldItems = spliceResult.oldItems;
		var removedItems = spliceResult.getRemovedItems();

		if (this._clearItems && (3 * removedItems.length > 2 * oldItems.length)) {
			// if there is an effective clearing function, just reset the controller
			this._clearItems.call(this._scope, oldItems);
			this._addItems(this.source.getItems());
		} else {
			// else, splice the elements
			this._removeItems(removedItems);
			this._addItems(spliceResult.getAddedItems());
		}
	}

	private _onReplace(params: ArrayReplaceEventParams<T>) {
		if (this._removeItem) {
			this._removeItem.call(this._scope, params.oldItem);
		}
		if (this._addItem) {
			this._addItem.call(this._scope, params.newItem);
		}
	}

	private _onClear(params: ArrayItemsEventParams<T>) {
		this._doClearItems(params.items);
	}
}
