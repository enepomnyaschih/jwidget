import IClass from '../IClass';
import ISet from '../ISet';

/**
 * [[JW.AbstractCollection.Lister]] configuration.
 *
 * @param T Collection item type.
 */
interface ICollectionListerConfig<T extends IClass> {
	/**
	 * Target set. By default, created automatically.
	 */
	target?: ISet<T>;
}

export default ICollectionListerConfig;
