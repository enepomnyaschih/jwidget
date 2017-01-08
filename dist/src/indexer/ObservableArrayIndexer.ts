import {default as ObservableArray, ItemsEventParams, ReplaceEventParams, SpliceEventParams} from '../ObservableArray';
import ArrayIndexer from './ArrayIndexer';
import ICollectionIndexerConfig from './ICollectionIndexerConfig';

/**
 * [[JW.AbstractCollection.Indexer|Indexer]] implementation for [[JW.ObservableArray]].
 */
export default class ObservableArrayIndexer<T> extends ArrayIndexer<T> {
	/**
	 * @inheritdoc
	 */
	constructor(source: ObservableArray<T>, config: ICollectionIndexerConfig<T>) {
		super(source, config);
		this.own(source.spliceEvent.bind(this._onSplice, this));
		this.own(source.replaceEvent.bind(this._onReplace, this));
		this.own(source.clearEvent.bind(this._onClear, this));
	}

	private _onSplice(params: SpliceEventParams<T>) {
		var spliceResult = params.spliceResult;
		this.target.trySplice(
			this._keys(spliceResult.getRemovedItems()),
			this._index(spliceResult.getAddedItems()));
	}

	private _onReplace(params: ReplaceEventParams<T>) {
		this.target.trySplice(
			this._keys([params.oldItem]),
			this._index([params.newItem]));
	}

	private _onClear(params: ItemsEventParams<T>) {
		this.target.tryRemoveAll(
			this._keys(params.items));
	}
}
