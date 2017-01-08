import {default as ObservableMap, ItemsEventParams, SpliceEventParams} from '../ObservableMap';
import ICollectionSorterComparingConfig from './ICollectionSorterComparingConfig';
import MapSorterComparing from './MapSorterComparing';
import * as MapUtils from '../MapUtils';

/**
 * [[JW.AbstractCollection.SorterComparing|SorterComparing]] implementation for [[JW.ObservableMap]].
 */
export default class SorterComparing<T> extends MapSorterComparing<T> {
	/**
	 * @inheritdoc
	 */
	constructor(source: ObservableMap<T>, config: ICollectionSorterComparingConfig<T>) {
		super(source, config);
		this.own(source.spliceEvent.bind(this._onSplice, this));
		this.own(source.clearEvent.bind(this._onClear, this));
	}

	private _onSplice(params: SpliceEventParams<T>) {
		var spliceResult = params.spliceResult;
		this._splice(
			MapUtils.toArray(spliceResult.removedItems),
			MapUtils.toArray(spliceResult.addedItems));
	}

	private _onClear(params: ItemsEventParams<T>) {
		this._splice(MapUtils.toArray(params.items), []);
	}
}
