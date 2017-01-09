import AbstractCollectionOrderer from '../AbstractCollectionOrderer';
import IClass from '../../IClass';
import ICollectionOrdererConfig from '../ICollectionOrdererConfig';
import ISet from '../../ISet';
import ISetOrderer from './ISetOrderer';

/**
 * [[JW.AbstractCollection.Orderer|Orderer]] implementation for [[JW.Set]].
 */
export default class SetOrderer<T extends IClass> extends AbstractCollectionOrderer<T> implements ISetOrderer<T> {
	/**
	 * @inheritdoc
	 */
	public source: ISet<T>;

	/**
	 * @inheritdoc
	 */
	constructor(source: ISet<T>, config: ICollectionOrdererConfig<T>) {
		super(source, config);
	}
}
