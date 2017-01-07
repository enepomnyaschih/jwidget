import IArray from '../IArray';
import ICollectionSorterComparing from './ICollectionSorterComparing';

/**
 * [[JW.AbstractCollection.SorterComparing|SorterComparing]] implementation for [[JW.Array]].
 */
interface IArraySorterComparing<T> extends ICollectionSorterComparing<T> {
	/**
	 * @inheritdoc
	 */
	source: IArray<T>;
}

export default IArraySorterComparing;
