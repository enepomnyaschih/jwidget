import {default as ObservableMap, ItemsEventParams, SpliceEventParams} from '../../ObservableMap';
import IClass from '../../IClass';
import ICollectionOrdererConfig from '../ICollectionOrdererConfig';
import MapOrderer from './MapOrderer';
import * as MapUtils from '../../MapUtils';

/**
 * [[JW.AbstractCollection.Orderer|Orderer]] implementation for [[JW.ObservableMap]].
 */
export default class ObservableMapOrderer<T extends IClass> extends MapOrderer<T> {
	/**
	 * @inheritdoc
	 */
	constructor(source: ObservableMap<T>, config: ICollectionOrdererConfig<T>) {
		super(source, config);
		this.own(source.spliceEvent.bind(this._onSplice, this));
		this.own(source.clearEvent.bind(this._onClear, this));
	}

	private _onSplice(params: SpliceEventParams<T>) {
		var spliceResult = params.spliceResult;
		this._splice(
			MapUtils.toSet(spliceResult.removedItems),
			MapUtils.toSet(spliceResult.addedItems));
	}

	private _onClear(params: ItemsEventParams<T>) {
		this.target.removeItems(
			MapUtils.toArray(params.items));
	}
}
