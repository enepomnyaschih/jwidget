import AbstractCollectionLister from './AbstractCollectionLister';
import IClass from '../IClass';
import ICollectionListerConfig from './ICollectionListerConfig';
import ISet from '../ISet';
import ISetLister from './ISetLister';

/**
 * [[JW.AbstractCollection.Lister|Lister]] implementation for [[JW.Set]].
 */
export default class SetLister<T extends IClass> extends AbstractCollectionLister<T> implements ISetLister<T> {
	/**
	 * @inheritdoc
	 */
	public source: ISet<T>;

	/**
	 * @inheritdoc
	 */
	constructor(source: ISet<T>, config: ICollectionListerConfig<T>) {
		super(source, config);
	}
}
