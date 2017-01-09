import {default as ObservableArray, ReplaceEventParams, SpliceEventParams} from '../../ObservableArray';
import ArrayCounter from './ArrayCounter';
import ICollectionCounterConfig from '../ICollectionCounterConfig';
import * as ArrayUtils from '../../ArrayUtils';

/**
 * [[JW.AbstractCollection.Counter|Counter]] implementation for [[JW.ObservableArray]].
 */
export default class ObservableArrayCounter<T> extends ArrayCounter<T> {
	/**
	 * @inheritdoc
	 */
	constructor(source: ObservableArray<T>, config: ICollectionCounterConfig<T>) {
		super(source, config);
		this.own(source.spliceEvent.bind(this._onSplice, this));
		this.own(source.replaceEvent.bind(this._onReplace, this));
		this.own(source.clearEvent.bind(this._onClear, this));
	}

	private _onSplice(params: SpliceEventParams<T>) {
		var spliceResult = params.spliceResult;
		var value = this.target.get();
		spliceResult.removedItemsList.forEach((indexItems) => {
			value -= ArrayUtils.count(indexItems.items, this._filterItem, this._scope);
		});
		spliceResult.addedItemsList.forEach((indexItems) => {
			value += ArrayUtils.count(indexItems.items, this._filterItem, this._scope);
		});
		this.target.set(value);
	}

	private _onReplace(params: ReplaceEventParams<T>) {
		var oldFiltered = this._filterItem.call(this._scope, params.oldItem) !== false;
		var newFiltered = this._filterItem.call(this._scope, params.newItem) !== false;
		if (oldFiltered && !newFiltered) {
			this.target.set(this.target.get() - 1);
		} else if (!oldFiltered && newFiltered) {
			this.target.set(this.target.get() + 1);
		}
	}

	private _onClear() {
		this.target.set(0);
	}
}
