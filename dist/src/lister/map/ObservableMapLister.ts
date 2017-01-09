import {default as ObservableMap, ItemsEventParams, SpliceEventParams} from '../../ObservableMap';
import IClass from '../../IClass';
import ICollectionListerConfig from '../ICollectionListerConfig';
import MapLister from './MapLister';
import * as MapUtils from '../../MapUtils';

/**
 * [[JW.AbstractCollection.Lister|Lister]] implementation for [[JW.ObservableMap]].
 */
export default class ObservableMapLister<T extends IClass> extends MapLister<T> {
	/**
	 * @inheritdoc
	 */
	constructor(source: ObservableMap<T>, config: ICollectionListerConfig<T>) {
		super(source, config);
		this.own(source.spliceEvent.bind(this._onSplice, this));
		this.own(source.clearEvent.bind(this._onClear, this));
	}

	private _onSplice(params: SpliceEventParams<T>) {
		var spliceResult = params.spliceResult;
		this.target.trySplice(
			MapUtils.toArray(spliceResult.removedItems),
			MapUtils.toArray(spliceResult.addedItems));
	}

	private _onClear(params: ItemsEventParams<T>) {
		this.target.tryRemoveAll(
			MapUtils.toArray(params.items));
	}
}
