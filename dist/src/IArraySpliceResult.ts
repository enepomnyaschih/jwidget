import IIndexCount from './IIndexCount';
import IIndexItems from './IIndexItems';

/**
 * [[JW.AbstractArray.splice|splice]] method result.
 *
 * @param T Item type.
 */
interface IArraySpliceResult<T> {
	/**
	 * Old array contents.
	 */
	oldItems: T[];

	/**
	 * Removed item segments.
	 */
	removedItemsList: IIndexItems<T>[];

	/**
	 * @param addedItemsList Added item segments.
	 */
	addedItemsList: IIndexItems<T>[];

	/**
	 * Returns plain array of removed items.
	 */
	getRemovedItems(): T[];

	/**
	 * Returns plain array of added items.
	 */
	getAddedItems(): T[];

	/**
	 * Converts removed item segments to "index-count" pairs.
	 */
	getRemoveParamsList(): IIndexCount[];

	/**
	 * Checks if [[JW.AbstractArray.splice|splice]] method call didn't change the array.
	 * @returns Array hasn't been changed.
	 */
	isEmpty(): boolean;
}

export default IArraySpliceResult;
