import ICollectionMapper from './ICollectionMapper';
import IMap from '../IMap';

/**
 * [[JW.AbstractCollection.Mapper|Mapper]] implementation for [[JW.Map]].
 */
interface IMapMapper<T, U> extends ICollectionMapper<T, U> {
	/**
	 * @inheritdoc
	 */
	source: IMap<T>;

	/**
	 * @inheritdoc
	 */
	target: IMap<U>;
}

export default IMapMapper;
