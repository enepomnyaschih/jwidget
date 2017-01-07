import IClass from '../IClass';
import ICollectionOrderer from './ICollectionOrderer';
import ISet from '../ISet';

/**
 * [[JW.AbstractCollection.Orderer|Orderer]] implementation for [[JW.Set]].
 */
interface ISetOrderer<T extends IClass> extends ICollectionOrderer<T> {
	/**
	 * @inheritdoc
	 */
	source: ISet<T>;
}

export default ISetOrderer;
