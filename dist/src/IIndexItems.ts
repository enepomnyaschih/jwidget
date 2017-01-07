import IIndexCount from './IIndexCount';

/**
 * "Index-items" pair. Used in [[JW.AbstractArray.splice|splice]] method arguments
 * to specify item segments to insert, and in [[JW.AbstractArray.SpliceResult|SpliceResult]]
 * class to specify removed and added item segments.
 *
 * @param T Item type.
 */
interface IIndexItems<T> {
	index: number;
	items: T[];

	/**
	 * Converts to "index-count" pair.
	 */
	toIndexCount(): IIndexCount;

	/**
	 * Clones pair.
	 */
	clone(): IIndexItems<T>;
}

export default IIndexItems;
