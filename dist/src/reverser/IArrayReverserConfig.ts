import IArray from '../IArray';

/**
 * [[JW.AbstractArray.Reverser]] configuration.
 *
 * @param T Collection item type.
 */
interface IArrayReverserConfig<T> {
	/**
	 * Target array. By default, created automatically.
	 */
	target?: IArray<T>;
}

export default IArrayReverserConfig;
