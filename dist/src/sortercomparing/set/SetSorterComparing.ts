import AbstractCollectionSorterComparing from '../AbstractCollectionSorterComparing';
import IClass from '../../IClass';
import ICollectionSorterComparingConfig from '../ICollectionSorterComparingConfig';
import ISet from '../../ISet';
import ISetSorterComparing from './ISetSorterComparing';

/**
 * [[JW.AbstractCollection.SorterComparing|SorterComparing]] implementation for [[JW.Set]].
 */
export default class SetSorterComparing<T extends IClass> extends AbstractCollectionSorterComparing<T> implements ISetSorterComparing<T> {
	/**
	 * @inheritdoc
	 */
	public source: ISet<T>;

	/**
	 * @inheritdoc
	 */
	constructor(source: ISet<T>, config: ICollectionSorterComparingConfig<T>) {
		super(source, config);
	}
}
