import IClass from '../../IClass';
import ICollectionSorterComparing from '../ICollectionSorterComparing';
import ISet from '../../ISet';

/**
 * [[JW.AbstractCollection.SorterComparing|SorterComparing]] implementation for [[JW.Set]].
 */
interface ISetSorterComparing<T extends IClass> extends ICollectionSorterComparing<T> {
	/**
	 * @inheritdoc
	 */
	source: ISet<T>;
}

export default ISetSorterComparing;
