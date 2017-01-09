import ICollectionFilterer from '../ICollectionFilterer';
import IMap from '../../IMap';

/**
 * [[JW.AbstractCollection.Filterer|Filterer]] implementation for [[JW.Map]].
 */
interface IMapFilterer<T> extends ICollectionFilterer<T> {
	/**
	 * @inheritdoc
	 */
	source: IMap<T>;

	/**
	 * @inheritdoc
	 */
	target: IMap<T>;
}

export default IMapFilterer;
