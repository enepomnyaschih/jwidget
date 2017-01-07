import ICollectionCounter from './ICollectionCounter';
import IMap from '../IMap';

/**
 * [[JW.AbstractCollection.Counter|Counter]] implementation for [[JW.Map]].
 */
interface IMapCounter<T> extends ICollectionCounter<T> {
	/**
	 * @inheritdoc
	 */
	source: IMap<T>;
}

export default IMapCounter;
