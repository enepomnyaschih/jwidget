import IClass from '../../IClass';
import ICollectionIndexer from '../ICollectionIndexer';
import ISet from '../../ISet';

/**
 * [[JW.AbstractCollection.Indexer|Indexer]] implementation for [[JW.Set]].
 */
interface ISetIndexer<T extends IClass> extends ICollectionIndexer<T> {
	/**
	 * @inheritdoc
	 */
	source: ISet<T>;
}

export default ISetIndexer;
