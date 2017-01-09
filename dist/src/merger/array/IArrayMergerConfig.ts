import IArray from '../../IArray';

/**
 * [[JW.AbstractArray.Merger]] configuration.
 *
 * @param T Collection item type.
 */
interface IArrayMergerConfig<T> {
	/**
	 * Target array. By default, created automatically.
	 */
	target?: IArray<T>;
}

export default IArrayMergerConfig;
