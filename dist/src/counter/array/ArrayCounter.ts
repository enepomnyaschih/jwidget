import AbstractCollectionCounter from '../AbstractCollectionCounter';
import IArray from '../../IArray';
import IArrayCounter from './IArrayCounter';
import ICollectionCounterConfig from '../ICollectionCounterConfig';

/**
 * [[JW.AbstractCollection.Counter|Counter]] implementation for [[JW.Array]].
 */
export default class ArrayCounter<T> extends AbstractCollectionCounter<T> implements IArrayCounter<T> {
	/**
	 * @inheritdoc
	 */
	public source: IArray<T>;

	/**
	 * @inheritdoc
	 */
	constructor(source: IArray<T>, config: ICollectionCounterConfig<T>) {
		super(source, config);
	}
}
