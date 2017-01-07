import AbstractCollectionOrderer from './AbstractCollectionOrderer';
import IArray from '../IArray';
import IArrayOrderer from './IArrayOrderer';
import IClass from '../IClass';
import ICollectionOrdererConfig from './ICollectionOrdererConfig';

/**
 * [[JW.AbstractCollection.Orderer|Orderer]] implementation for [[JW.Array]].
 */
export default class ArrayOrderer<T extends IClass> extends AbstractCollectionOrderer<T> implements IArrayOrderer<T> {
	/**
	 * @inheritdoc
	 */
	public source: IArray<T>;

	/**
	 * @inheritdoc
	 */
	constructor(source: IArray<T>, config: ICollectionOrdererConfig<T>) {
		super(source, config);
	}
}
