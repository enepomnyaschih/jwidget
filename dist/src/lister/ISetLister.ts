import IClass from '../IClass';
import ICollectionLister from './ICollectionLister';
import ISet from '../ISet';

/**
 * [[JW.AbstractCollection.Lister|Lister]] implementation for [[JW.Set]].
 */
interface ISetLister<T extends IClass> extends ICollectionLister<T> {
	/**
	 * @inheritdoc
	 */
	source: ISet<T>;
}

export default ISetLister;
