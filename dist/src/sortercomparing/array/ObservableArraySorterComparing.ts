import {default as ObservableArray, ArrayItemsEventParams, ArrayReplaceEventParams, ArraySpliceEventParams} from '../../ObservableArray';
import ArraySorterComparing from './ArraySorterComparing';
import ICollectionSorterComparingConfig from '../ICollectionSorterComparingConfig';

/**
 * [[JW.AbstractCollection.SorterComparing|SorterComparing]] implementation for [[JW.ObservableArray]].
 */
export default class ObservableArraySorterComparing<T> extends ArraySorterComparing<T> {
	/**
	 * @inheritdoc
	 */
	constructor(source: ObservableArray<T>, config: ICollectionSorterComparingConfig<T>) {
		super(source, config);
		this.own(source.spliceEvent.bind(this._onSplice, this));
		this.own(source.replaceEvent.bind(this._onReplace, this));
		this.own(source.clearEvent.bind(this._onClear, this));
	}

	private _onSplice(params: ArraySpliceEventParams<T>) {
		var spliceResult = params.spliceResult;
		this._splice(spliceResult.getRemovedItems(), spliceResult.getAddedItems());
	}

	private _onReplace(params: ArrayReplaceEventParams<T>) {
		this._splice([params.oldItem], [params.newItem]);
	}

	private _onClear(params: ArrayItemsEventParams<T>) {
		this._splice(params.items, []);
	}
}
