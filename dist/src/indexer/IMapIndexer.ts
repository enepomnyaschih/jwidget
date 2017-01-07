import ICollectionIndexer from './ICollectionIndexer';
import IMap from '../IMap';

/**
 * [[JW.AbstractCollection.Indexer|Indexer]] implementation for [[JW.Map]].
 */
interface IMapIndexer<T> extends ICollectionIndexer<T> {
	/**
	 * @inheritdoc
	 */
	source: IMap<T>;
}

export default IMapIndexer;
