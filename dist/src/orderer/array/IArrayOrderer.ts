import IArray from '../../IArray';
import IClass from '../../IClass';
import ICollectionOrderer from '../ICollectionOrderer';

/**
 * [[JW.AbstractCollection.Orderer|Orderer]] implementation for [[JW.Array]].
 */
interface IArrayOrderer<T extends IClass> extends ICollectionOrderer<T> {
	/**
	 * @inheritdoc
	 */
	source: IArray<T>;
}

export default IArrayOrderer;
