import IArray from '../../IArray';
import ICollectionObserver from '../ICollectionObserver';

/**
 * [[JW.AbstractCollection.Observer|Observer]] implementation for [[JW.Array]].
 */
interface IArrayObserver<T> extends ICollectionObserver {
	/**
	 * @inheritdoc
	 */
	source: IArray<T>;
}

export default IArrayObserver;
