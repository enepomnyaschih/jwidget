import IArray from '../../IArray';
import ICollectionMapperConfig from '../ICollectionMapperConfig';

/**
 * @inheritdoc
 */
interface IArrayMapperConfig<T, U> extends ICollectionMapperConfig<T, U> {
	/**
	 * @inheritdoc
	 */
	target?: IArray<U>;
}

export default IArrayMapperConfig;
