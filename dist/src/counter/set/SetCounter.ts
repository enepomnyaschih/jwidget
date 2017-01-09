import AbstractCollectionCounter from '../AbstractCollectionCounter';
import IClass from '../../IClass';
import ICollectionCounterConfig from '../ICollectionCounterConfig';
import ISet from '../../ISet';
import ISetCounter from './ISetCounter';

/**
 * [[JW.AbstractCollection.Counter|Counter]] implementation for [[JW.Set]].
 */
export default class SetCounter<T extends IClass> extends AbstractCollectionCounter<T> implements ISetCounter<T> {
	/**
	 * @inheritdoc
	 */
	public source: ISet<T>;

	/**
	 * @inheritdoc
	 */
	constructor(source: ISet<T>, config: ICollectionCounterConfig<T>) {
		super(source, config);
	}
}
