import {default as ObservableSet, SetItemsEventParams, SetSpliceEventParams} from '../../ObservableSet';
import IClass from '../../IClass';
import ICollectionIndexerConfig from '../ICollectionIndexerConfig';
import SetIndexer from './SetIndexer';

/**
 * [[JW.AbstractCollection.Indexer|Indexer]] implementation for [[JW.ObservableSet]].
 */
export default class ObservableSetIndexer<T extends IClass> extends SetIndexer<T> {
	/**
	 * @inheritdoc
	 */
	constructor(source: ObservableSet<T>, config: ICollectionIndexerConfig<T>) {
		super(source, config);
		this.own(source.spliceEvent.bind(this._onSplice, this));
		this.own(source.clearEvent.bind(this._onClear, this));
	}

	private _onSplice(params: SetSpliceEventParams<T>) {
		var spliceResult = params.spliceResult;
		this.target.trySplice(
			this._keys(spliceResult.removedItems),
			this._index(spliceResult.addedItems));
	}

	private _onClear(params: SetItemsEventParams<T>) {
		this.target.tryRemoveAll(
			this._keys(params.items));
	}
}
