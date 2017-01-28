import {default as ObservableMap, MapItemsEventParams, MapReindexEventParams, MapSpliceEventParams} from '../../ObservableMap';
import IMapInserterConfig from './IMapInserterConfig';
import MapInserter from './MapInserter';

/**
 * [[JW.AbstractMap.Inserter|Inserter]] implementation for [[JW.ObservableMap]].
 */
export default class ObservableMapInserter<T> extends MapInserter<T> {
	/**
	 * @inheritdoc
	 */
	constructor(source: ObservableMap<T>, config?: IMapInserterConfig<T>) {
		super(source, config);
		this.own(source.spliceEvent.bind(this._onSplice, this));
		this.own(source.reindexEvent.bind(this._onReindex, this));
		this.own(source.clearEvent.bind(this._onClear, this));
	}

	private _onSplice(params: MapSpliceEventParams<T>) {
		var spliceResult = params.spliceResult;
		this._removeItems(spliceResult.removedItems);
		this._addItems(spliceResult.addedItems);
	}

	private _onReindex(params: MapReindexEventParams<T>) {
		var keyMap = params.keyMap;
		for (var oldKey in keyMap) {
			var newKey = keyMap[oldKey];
			var item = this.source.get(newKey);
			if (this._removeItem) {
				this._removeItem.call(this._scope, oldKey, item);
			}
			if (this._addItem) {
				this._addItem.call(this._scope, item, newKey);
			}
		}
	}

	private _onClear(params: MapItemsEventParams<T>) {
		this._doClearItems(params.items);
	}
}
