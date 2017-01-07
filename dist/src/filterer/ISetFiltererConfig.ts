import IClass from '../IClass';
import ICollectionFiltererConfig from './ICollectionFiltererConfig';
import ISet from '../ISet';

/**
 * @inheritdoc
 */
interface ISetFiltererConfig<T extends IClass> extends ICollectionFiltererConfig<T> {
	/**
	 * @inheritdoc
	 */
	target?: ISet<T>;
}

export default ISetFiltererConfig;
