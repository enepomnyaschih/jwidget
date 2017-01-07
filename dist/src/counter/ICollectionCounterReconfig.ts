/**
 * [[Counter]]'s [[Counter.reconfigure|reconfigure]] method options.
 * All options are optional. If skipped, an option stays the same.
 *
 * @param T Collection item type.
 */
interface ICollectionCounterReconfig<T> {
	/**
	 * Filtering criteria.
	 */
	filterItem?: (item: T) => boolean;

	/**
	 * [[filterItem]] call scope.
	 */
	scope?: any;
}

export default ICollectionCounterReconfig;
