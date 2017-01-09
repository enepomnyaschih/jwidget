import AbstractCollectionSorterComparing from '../AbstractCollectionSorterComparing';
import IArray from '../../IArray';
import IArraySorterComparing from './IArraySorterComparing';
import ICollectionSorterComparingConfig from '../ICollectionSorterComparingConfig';

/**
 * [[JW.AbstractCollection.SorterComparing|SorterComparing]] implementation for [[JW.Array]].
 */
export default class ArraySorterComparing<T> extends AbstractCollectionSorterComparing<T> implements IArraySorterComparing<T> {
	/**
	 * @inheritdoc
	 */
	public source: IArray<T>;

	/**
	 * @inheritdoc
	 */
	constructor(source: IArray<T>, config: ICollectionSorterComparingConfig<T>) {
		super(source, config);
	}
}
