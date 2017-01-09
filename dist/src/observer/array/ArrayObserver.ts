import AbstractCollectionObserver from '../AbstractCollectionObserver';
import IArray from '../../IArray';
import IArrayObserver from './IArrayObserver';
import ICollectionObserverConfig from '../ICollectionObserverConfig';

/**
 * [[JW.AbstractCollection.Observer|Observer]] implementation for [[JW.Array]].
 */
export default class ArrayObserver<T> extends AbstractCollectionObserver<T> implements IArrayObserver<T> {
	/**
	 * @inheritdoc
	 */
	source: IArray<T>;

	/**
	 * @inheritdoc
	 */
	constructor(source: IArray<T>, config: ICollectionObserverConfig<T>) {
		super(source, config);
	}
}
