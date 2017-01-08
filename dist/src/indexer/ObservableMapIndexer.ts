import {default as ObservableMap, ItemsEventParams, SpliceEventParams} from '../ObservableMap';
import ICollectionIndexerConfig from './ICollectionIndexerConfig';
import MapIndexer from './MapIndexer';
import * as MapUtils from '../MapUtils';

/**
 * [[JW.AbstractCollection.Indexer|Indexer]] implementation for [[JW.ObservableMap]].
 */
export default class ObservableMapIndexer<T> extends MapIndexer<T> {
	/**
	 * @inheritdoc
	 */
	constructor(source: ObservableMap<T>, config: ICollectionIndexerConfig<T>) {
		super(source, config);
		this.own(source.spliceEvent.bind(this._onSplice, this));
		this.own(source.clearEvent.bind(this._onClear, this));
	}

	private _onSplice(params: SpliceEventParams<T>) {
		var spliceResult = params.spliceResult;
		this.target.trySplice(
			this._keys(MapUtils.toArray(spliceResult.removedItems)),
			this._index(MapUtils.toArray(spliceResult.addedItems)));
	}

	private _onClear(params: ItemsEventParams<T>) {
		this.target.tryRemoveAll(
			this._keys(MapUtils.toArray(params.items)));
	}
}
