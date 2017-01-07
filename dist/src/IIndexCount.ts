/**
 * "Index-count" pair. Used in [[JW.AbstractArray.splice|splice]] method arguments
 * to specify item segments to remove.
 */
interface IIndexCount {
	index: number;
	count: number;

	/**
	 * Clones pair.
	 */
	clone(): IIndexCount;
}

export default IIndexCount;
