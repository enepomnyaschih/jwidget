import Dictionary from './Dictionary';

/**
 * [[JW.AbstractMap.splice]] method arguments.
 * Returned by [[JW.AbstractMap.detectSplice]] method.
 *
 * @param T Item type.
 */
interface IMapSpliceParams<T> {
	/**
	 * Keys of items to remove.
	 */
	removedKeys: string[];

	/**
	 * Items to add/replace.
	 */
	updatedItems: Dictionary<T>;
}

export default IMapSpliceParams;
