import Dictionary from './Dictionary';

/**
 * [[JW.AbstractMap.splice]] method result.
 *
 * @param T Item type.
 */
interface IMapSpliceResult<T> {
	removedItems: Dictionary<T>;
	addedItems: Dictionary<T>;
}

export default IMapSpliceResult;
