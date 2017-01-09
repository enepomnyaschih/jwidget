import Dictionary from '../../Dictionary';

/**
 * [[JW.AbstractMap.Inserter]] configuration.
 *
 * @param T Collection item type.
 */
interface IMapInserterConfig<T> {
	/**
	 * Function to call on item adding to specific position in map.
	 */
	addItem?: (item: T, key: string) => void;

	/**
	 * Function to call on item removing from specific position in map.
	 */
	removeItem?: (item: T, key: string) => void;

	/**
	 * Function to call on map cleanup.
	 * By default, calls [[removeItem]] for all map items.
	 */
	clearItems?: (items: Dictionary<T>) => void;

	/**
	 * [[addItem]], [[removeItem]] and
	 * [[clearItems]] call scope.
	 * Defaults to synchronizer itself.
	 */
	scope?: any;
}

export default IMapInserterConfig;
