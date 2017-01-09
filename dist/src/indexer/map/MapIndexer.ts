import AbstractCollectionIndexer from '../AbstractCollectionIndexer';
import ICollectionIndexerConfig from '../ICollectionIndexerConfig';
import IMap from '../../IMap';
import IMapIndexer from './IMapIndexer';

/**
 * [[JW.AbstractCollection.Indexer|Indexer]] implementation for [[JW.Map]].
 */
export default class MapIndexer<T> extends AbstractCollectionIndexer<T> implements IMapIndexer<T> {
	/**
	 * @inheritdoc
	 */
	public source: IMap<T>;

	/**
	 * @inheritdoc
	 */
	constructor(source: IMap<T>, config: ICollectionIndexerConfig<T>) {
		super(source, config);
	}
}
