import ICollection from '../ICollection';

/**
 * [[JW.AbstractCollection.Mapper]] configuration.
 *
 * @param T Source collection item type.
 * @param U Target collection item type.
 */
interface ICollectionMapperConfig<T, U> {
	/**
	 * Mapping function. Creates an item of target collection by item of source collection.
	 */
	createItem: (data: T) => U;

	/**
	 * Item destructor. Destroys an item of target collection.
	 */
	destroyItem?: (item: U, data: T) => void;

	/**
	 * [[createItem]] and [[destroyItem]] call scope.
	 * Defaults to synchronizer itself.
	 */
	scope?: any;

	/**
	 * Target collection. By default, created automatically.
	 */
	target?: ICollection<U>;
}

export default ICollectionMapperConfig;
