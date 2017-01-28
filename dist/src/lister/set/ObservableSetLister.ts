import {default as ObservableSet, SetItemsEventParams, SetSpliceEventParams} from '../../ObservableSet';
import IClass from '../../IClass';
import ICollectionListerConfig from '../ICollectionListerConfig';
import SetLister from './SetLister';

/**
 * [[JW.AbstractCollection.Lister|Lister]] implementation for [[JW.ObservableSet]].
 */
export default class ObservableSetLister<T extends IClass> extends SetLister<T> {
	/**
	 * @inheritdoc
	 */
	constructor(source: ObservableSet<T>, config: ICollectionListerConfig<T>) {
		super(source, config);
		this.own(source.spliceEvent.bind(this._onSplice, this));
		this.own(source.clearEvent.bind(this._onClear, this));
	}

	private _onSplice(params: SetSpliceEventParams<T>) {
		var spliceResult = params.spliceResult;
		this.target.trySplice(spliceResult.removedItems, spliceResult.addedItems);
	}

	private _onClear(params: SetItemsEventParams<T>) {
		this.target.tryRemoveAll(params.items);
	}
}
