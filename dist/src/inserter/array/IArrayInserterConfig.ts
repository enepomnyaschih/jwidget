/**
 * [[JW.AbstractArray.Inserter]] configuration.
 *
 * @param T Collection item type.
 */
interface IArrayInserterConfig<T> {
	/**
	 * Function to call on item adding to specific position in array.
	 */
	addItem?: (item: T, index: number) => void;

	/**
	 * Function to call on item removing from specific position in array.
	 */
	removeItem?: (item: T, index: number) => void;

	/**
	 * Function to call on array cleanup.
	 * By default, calls [[removeItem]] for all array items.
	 */
	clearItems?: (items: T[]) => void;

	/**
	 * [[addItem]], [[removeItem]] and [[clearItems]] call scope.
	 * Defaults to synchronizer itself.
	 */
	scope?: any;
}

export default IArrayInserterConfig;
