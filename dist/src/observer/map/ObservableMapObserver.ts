import {default as ObservableMap, ItemsEventParams, SpliceEventParams} from '../../ObservableMap';
import ICollectionObserverConfig from '../ICollectionObserverConfig';
import MapObserver from './MapObserver';
import * as MapUtils from '../../MapUtils';

/**
 * [[JW.AbstractCollection.Observer|Observer]] implementation for [[JW.ObservableMap]].
 */
export default class ObservableMapObserver<T> extends MapObserver<T> {
	/**
	 * @inheritdoc
	 */
	constructor(source: ObservableMap<T>, config: ICollectionObserverConfig<T>) {
		super(source, config);
		this.own(source.spliceEvent.bind(this._onSplice, this));
		this.own(source.clearEvent.bind(this._onClear, this));
		if (this._change) {
			this.own(source.changeEvent.bind(this._onChange, this));
		}
	}

	private _onSplice(params: SpliceEventParams<T>) {
		var spliceResult = params.spliceResult;
		this._removeItems(MapUtils.toArray(spliceResult.removedItems));
		this._addItems(MapUtils.toArray(spliceResult.addedItems));
	}

	private _onClear(params: ItemsEventParams<T>) {
		this._doClearItems(MapUtils.toArray(params.items));
	}
}
