import ICollectionObserver from './ICollectionObserver';
import IMap from '../IMap';

/**
 * [[JW.AbstractCollection.Observer|Observer]] implementation for [[JW.Map]].
 */
interface IMapObserver<T> extends ICollectionObserver {
	/**
	 * @inheritdoc
	 */
	source: IMap<T>;
}

export default IMapObserver;
