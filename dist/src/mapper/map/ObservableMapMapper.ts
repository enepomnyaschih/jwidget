import {default as ObservableMap, MapItemsEventParams, MapReindexEventParams, MapSpliceEventParams} from '../../ObservableMap';
import IMapMapperConfig from './IMapMapperConfig';
import MapMapper from './MapMapper';
import * as MapUtils from '../../MapUtils';

/**
 * [[JW.AbstractCollection.Mapper|Mapper]] implementation for [[JW.ObservableMap]].
 */
export default class ObservableMapMapper<T, U> extends MapMapper<T, U> {
	/**
	 * @inheritdoc
	 */
	constructor(source: ObservableMap<T>, config: IMapMapperConfig<T, U>) {
		super(source, config);
		this.own(source.spliceEvent.bind(this._onSplice, this));
		this.own(source.reindexEvent.bind(this._onReindex, this));
		this.own(source.clearEvent.bind(this._onClear, this));
	}

	private _onSplice(params: MapSpliceEventParams<T>) {
		var sourceResult = params.spliceResult;
		var removedDatas = sourceResult.removedItems;
		var addedDatas = sourceResult.addedItems;
		var targetResult = this.target.trySplice(
			MapUtils.getRemovedKeys(removedDatas, addedDatas),
			this._createItems(addedDatas));
		if (targetResult !== undefined) {
			this._destroyItems(targetResult.removedItems, removedDatas);
		}
	}

	private _onReindex(params: MapReindexEventParams<T>) {
		this.target.tryReindex(params.keyMap);
	}

	private _onClear(params: MapItemsEventParams<T>) {
		var datas = params.items;
		this._destroyItems(this.target.tryRemoveAll(Object.keys(datas)), datas);
	}
}
