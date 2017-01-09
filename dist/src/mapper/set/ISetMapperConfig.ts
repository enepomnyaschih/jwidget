import IClass from '../../IClass';
import ICollectionMapperConfig from '../ICollectionMapperConfig';
import ISet from '../../ISet';

/**
 * @inheritdoc
 */
interface ISetMapperConfig<T extends IClass, U extends IClass> extends ICollectionMapperConfig<T, U> {
	/**
	 * @inheritdoc
	 */
	target?: ISet<U>;
}

export default ISetMapperConfig;
