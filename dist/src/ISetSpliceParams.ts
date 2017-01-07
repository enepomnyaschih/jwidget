/**
 * [[JW.AbstractSet.splice]] method arguments.
 * Returned by [[JW.AbstractSet.detectSplice]] method.
 *
 * @param T Item type.
 */
interface ISetSpliceParams<T> {
	/**
	 * Items to remove.
	 */
	removedItems: T[];

	/**
	 * Items to add.
	 */
	addedItems: T[];
}

export default ISetSpliceParams;
