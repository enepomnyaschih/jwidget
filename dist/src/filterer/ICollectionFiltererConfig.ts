import ICollection from '../ICollection';

/**
 * [[JW.AbstractCollection.Filterer]] configuration.
 *
 * @param T Collection item type.
 */
interface ICollectionFiltererConfig<T> {
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
	 * Target collection. By default, created automatically.
	 */
	target?: ICollection<T>;
}

export default ICollectionFiltererConfig;
