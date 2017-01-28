import {default as ObservableArray, ArrayItemsEventParams, ArrayReplaceEventParams, ArraySpliceEventParams} from '../../ObservableArray';
import ArrayLister from './ArrayLister';
import IClass from '../../IClass';
import ICollectionListerConfig from '../ICollectionListerConfig';

/**
 * [[JW.AbstractCollection.Lister|Lister]] implementation for [[JW.ObservableArray]].
 */
export default class ObservableArrayLister<T extends IClass> extends ArrayLister<T> {
	/**
	 * @inheritdoc
	 */
	constructor(source: ObservableArray<T>, config: ICollectionListerConfig<T>) {
		super(source, config);
		this.own(source.spliceEvent.bind(this._onSplice, this));
		this.own(source.replaceEvent.bind(this._onReplace, this));
		this.own(source.clearEvent.bind(this._onClear, this));
	}

	private _onSplice(params: ArraySpliceEventParams<T>) {
		var spliceResult = params.spliceResult;
		this.target.trySplice(spliceResult.getRemovedItems(), spliceResult.getAddedItems());
	}

	private _onReplace(params: ArrayReplaceEventParams<T>) {
		this.target.trySplice([params.oldItem], [params.newItem]);
	}

	private _onClear(params: ArrayItemsEventParams<T>) {
		this.target.tryRemoveAll(params.items);
	}
}
