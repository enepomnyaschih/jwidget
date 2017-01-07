import IIndexCount from './IIndexCount';
import IIndexItems from './IIndexItems';

/**
 * [[JW.AbstractArray.splice|splice]] method arguments.
 * Returned by [[JW.AbstractArray.detectSplice|detectSplice]] method.
 *
 * @param T Item type.
 */
interface IArraySpliceParams<T> {
	/**
	 * Segments to remove.
	 */
	removeParamsList: IIndexCount[];

	/**
	 * Segments to add.
	 */
	addParamsList: IIndexItems<T>[];
}

export default IArraySpliceParams;
