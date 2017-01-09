import AbstractCollectionLister from '../AbstractCollectionLister';
import IArray from '../../IArray';
import IArrayLister from './IArrayLister';
import IClass from '../../IClass';
import ICollectionListerConfig from '../ICollectionListerConfig';

/**
 * [[JW.AbstractCollection.Lister|Lister]] implementation for [[JW.Array]].
 */
export default class ArrayLister<T extends IClass> extends AbstractCollectionLister<T> implements IArrayLister<T> {
	/**
	 * @inheritdoc
	 */
	public source: IArray<T>;

	/**
	 * @inheritdoc
	 */
	constructor(source: IArray<T>, config: ICollectionListerConfig<T>) {
		super(source, config);
	}
}
