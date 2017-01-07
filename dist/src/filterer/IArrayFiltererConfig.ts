import IArray from '../IArray';
import ICollectionFiltererConfig from './ICollectionFiltererConfig';

/**
 * @inheritdoc
 */
interface IArrayFiltererConfig<T> extends ICollectionFiltererConfig<T> {
	/**
	 * @inheritdoc
	 */
	target?: IArray<T>;
}

export default IArrayFiltererConfig;
