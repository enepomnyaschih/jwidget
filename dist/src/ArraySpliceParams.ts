import IArraySpliceParams from './IArraySpliceParams';
import IIndexCount from './IIndexCount';
import IIndexItems from './IIndexItems';

/**
 * [[JW.AbstractArray.splice|splice]] method arguments.
 * Returned by [[JW.AbstractArray.detectSplice|detectSplice]] method.
 *
 * @param T Item type.
 */
export default class ArraySpliceParams<T> implements IArraySpliceParams<T> {
	/**
	 * @param removeParamsList Segments to remove.
	 * @param addParamsList Segments to add.
	 */
	constructor(public removeParamsList: IIndexCount[], public addParamsList: IIndexItems<T>[]) {
	}
}
