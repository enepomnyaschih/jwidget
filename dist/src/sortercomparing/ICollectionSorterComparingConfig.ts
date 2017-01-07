import IArray from '../IArray';

/**
 * [[JW.AbstractCollection.SorterComparing]] configuration.
 *
 * @param T Collection item type.
 */
interface ICollectionSorterComparingConfig<T> {
	/**
	 * Item comparing callback.
	 */
	compare: (x: T, y: T) => number;

	/**
	 * [[compare]] call scope.
	 * Defaults to synchronizer itself.
	 */
	scope?: any;

	/**
	 * Target array. By default, created automatically.
	 */
	target?: IArray<T>;

	/**
	 * Sorting order. Positive number for ascending sorting, negative for descending sorting.
	 * Defaults to 1.
	 */
	order?: number;
}

export default ICollectionSorterComparingConfig;
