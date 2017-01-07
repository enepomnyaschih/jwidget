import IArray from '../IArray';
import IClass from '../IClass';

/**
 * [[JW.AbstractCollection.Orderer]] configuration.
 *
 * @param T Collection item type.
 */
interface ICollectionOrdererConfig<T extends IClass> {
	/**
	 * Target array. By default, created automatically.
	 */
	target?: IArray<T>;
}

export default ICollectionOrdererConfig;
