import {default as ObservableMap, ItemsEventParams, ReindexEventParams, SpliceEventParams} from '../ObservableMap';
import IMapFiltererConfig from './IMapFiltererConfig';
import MapFilterer from './MapFilterer';
import * as MapUtils from '../MapUtils';

/**
 * [[JW.AbstractCollection.Filterer|Filterer]] implementation for [[JW.ObservableMap]].
 */
export default class ObservableMapFilterer<T> extends MapFilterer<T> {
	/**
	 * @inheritdoc
	 */
	constructor(source: ObservableMap<T>, config: IMapFiltererConfig<T>) {
		super(source, config);
		this.own(source.spliceEvent.bind(this._onSplice, this));
		this.own(source.reindexEvent.bind(this._onReindex, this));
		this.own(source.clearEvent.bind(this._onClear, this));
	}

	private _onSplice(params: SpliceEventParams<T>) {
		var spliceResult = params.spliceResult;
		this.target.trySplice(
			Object.keys(spliceResult.removedItems),
			MapUtils.filter(spliceResult.addedItems, this._filterItem, this._scope));
	}

	private _onReindex(params: ReindexEventParams<T>) {
		this.target.tryReindex(params.keyMap);
	}

	private _onClear(params: ItemsEventParams<T>) {
		this.target.tryRemoveAll(Object.keys(params.items));
	}
}
