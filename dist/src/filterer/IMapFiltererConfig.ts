import ICollectionFiltererConfig from './ICollectionFiltererConfig';
import IMap from '../IMap';

/**
 * @inheritdoc
 */
interface IMapFiltererConfig<T> extends ICollectionFiltererConfig<T> {
	/**
	 * @inheritdoc
	 */
	target?: IMap<T>;
}

export default IMapFiltererConfig;
