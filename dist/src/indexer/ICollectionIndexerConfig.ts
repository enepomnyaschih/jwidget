import IMap from '../IMap';

/**
 * [[JW.AbstractCollection.Indexer]] configuration.
 *
 * @param T Collection item type.
 */
interface ICollectionIndexerConfig<T> {
	/**
	 * Indexing function. Determines item key in map.
	 */
	getKey: (item: T) => any;

	/**
	 * [[getKey]] call scope.
	 * Defaults to synchronizer itself.
	 */
	scope?: any;

	/**
	 * Target map. By default, created automatically.
	 */
	target?: IMap<T>;
}

export default ICollectionIndexerConfig;
