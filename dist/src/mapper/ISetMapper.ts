import IClass from '../IClass';
import ICollectionMapper from './ICollectionMapper';
import ISet from '../ISet';

/**
 * [[JW.AbstractCollection.Mapper|Mapper]] implementation for [[JW.Set]].
 */
interface ISetMapper<T extends IClass, U extends IClass> extends ICollectionMapper<T, U> {
	/**
	 * @inheritdoc
	 */
	source: ISet<T>;

	/**
	 * @inheritdoc
	 */
	target: ISet<U>;
}

export default ISetMapper;
