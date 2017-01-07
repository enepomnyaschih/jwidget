import IArray from '../IArray';
import IClass from '../IClass';
import ICollectionLister from './ICollectionLister';

/**
 * [[JW.AbstractCollection.Lister|Lister]] implementation for [[JW.Array]].
 */
interface IArrayLister<T extends IClass> extends ICollectionLister<T> {
	/**
	 * @inheritdoc
	 */
	source: IArray<T>;
}

export default IArrayLister;
