import IArray from '../IArray';
import ICollectionCounter from './ICollectionCounter';

/**
 * [[JW.AbstractCollection.Counter|Counter]] implementation for [[JW.Array]].
 */
interface IArrayCounter<T> extends ICollectionCounter<T> {
	/**
	 * @inheritdoc
	 */
	source: IArray<T>;
}

export default IArrayCounter;
