import {default as ObservableMap, MapSpliceEventParams} from '../../ObservableMap';
import ICollectionCounterConfig from '../ICollectionCounterConfig';
import MapCounter from './MapCounter';
import * as MapUtils from '../../MapUtils';

/**
 * [[JW.AbstractCollection.Counter|Counter]] implementation for [[JW.ObservableMap]].
 */
export default class ObservableMapCounter<T> extends MapCounter<T> {
	/**
	 * @inheritdoc
	 */
	constructor(source: ObservableMap<T>, config: ICollectionCounterConfig<T>) {
		super(source, config);
		this.own(source.spliceEvent.bind(this._onSplice, this));
		this.own(source.clearEvent.bind(this._onClear, this));
	}

	private _onSplice(params: MapSpliceEventParams<T>) {
		var spliceResult = params.spliceResult;
		this.target.set(this.target.get() -
			MapUtils.count(spliceResult.removedItems, this._filterItem, this._scope) +
			MapUtils.count(spliceResult.addedItems, this._filterItem, this._scope));
	}

	private _onClear() {
		this.target.set(0);
	}
}
