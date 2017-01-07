import ICollectionMapperConfig from './ICollectionMapperConfig';
import IMap from '../IMap';

/**
 * @inheritdoc
 */
interface IMapMapperConfig<T, U> extends ICollectionMapperConfig<T, U> {
	/**
	 * @inheritdoc
	 */
	target?: IMap<U>;
}

export default IMapMapperConfig;
