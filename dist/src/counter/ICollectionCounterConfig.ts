import Property from '../Property';

/**
 * [[Counter]] configuration.
 *
 * @param T Collection item type.
 */
interface ICollectionCounterConfig<T> {
	/**
	 * Filtering criteria.
	 */
	filterItem: (item: T) => boolean;

	/**
	 * [[filterItem]] call scope.
	 * Defaults to synchronizer itself.
	 */
	scope?: any;

	/**
	 * Target property. By default, created automatically.
	 */
	target?: Property<number>;
}

export default ICollectionCounterConfig;
