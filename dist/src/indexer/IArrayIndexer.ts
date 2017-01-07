import IArray from '../IArray';
import ICollectionIndexer from './ICollectionIndexer';

/**
 * [[JW.AbstractCollection.Indexer|Indexer]] implementation for [[JW.Array]].
 */
interface IArrayIndexer<T> extends ICollectionIndexer<T> {
	/**
	 * @inheritdoc
	 */
	source: IArray<T>;
}

export default IArrayIndexer;
