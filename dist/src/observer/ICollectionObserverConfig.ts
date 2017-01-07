/**
 * [[JW.AbstractCollection.Observer]] configuration.
 *
 * @param T Collection item type.
 */
interface ICollectionObserverConfig<T> {
	/**
	 * Item is added to collection.
	 */
	addItem?: (item: T) => void;

	/**
	 * Item is removed from collection.
	 */
	removeItem?: (item: T) => void;

	/**
	 * Collection is cleared. By default, calls [[removeItem]] for all collection items.
	 */
	clearItems?: (items: T[]) => void;

	/**
	 * Collection is changed arbitrarily.
	 */
	change?: () => void;

	/**
	 * [[addItem]], [[removeItem]],
	 * [[clearItems]] and [[change]] call scope.
	 * Defaults to synchronizer itself.
	 */
	scope?: any;
}

export default ICollectionObserverConfig;
