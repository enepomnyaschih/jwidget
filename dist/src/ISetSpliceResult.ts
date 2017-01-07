/**
 * [[JW.AbstractSet.splice]] method result.
 *
 * @param T Item type.
 */
interface ISetSpliceResult<T> {
	removedItems: T[];
	addedItems: T[];
}

export default ISetSpliceResult;
