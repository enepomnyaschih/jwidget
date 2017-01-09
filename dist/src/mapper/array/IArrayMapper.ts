import IArray from '../../IArray';
import ICollectionMapper from '../ICollectionMapper';

/**
 * [[JW.AbstractCollection.Mapper|Mapper]] implementation for [[JW.Array]].
 */
interface IArrayMapper<T, U> extends ICollectionMapper<T, U> {
	/**
	 * @inheritdoc
	 */
	source: IArray<T>;

	/**
	 * @inheritdoc
	 */
	target: IArray<U>;
}

export default IArrayMapper;
