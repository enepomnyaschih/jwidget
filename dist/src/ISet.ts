import Dictionary from './Dictionary';
import IArray from './IArray';
import IClass from './IClass';
import ICollection from './ICollection';
import ISetSpliceParams from './ISetSpliceParams';
import ISetSpliceResult from './ISetSpliceResult';

/**
 * Set is unordered collection optimized for items adding, removal and search. Unlike
 * array and map, set can contain only [[JW.Class]] instances. Internal set representation is
 * map from [[iid]] to items themselves.
 *
 * # Set methods
 *
 * **Difference compared to [[JW.AbstractCollection]] is in bold.**
 *
 * Content retrieving:
 *
 * * [[getLength]] - Returns count of items in collection.
 * For observable collections, **length** property may come
 * in handy if you want to track collection length dynamically.
 * * [[isEmpty]] - Checks collection for emptiness.
 * * [[getFirst]] - Returns first item in collection.
 * * [[containsItem]] - Does collection contain the item?
 * - **[[getJson]] - Returns internal representation of set.**
 *
 * Iteration algorithms:
 *
 * * [[every]] - Checks all items by criteria.
 * Returns true if all items match the criteria.
 * * [[some]] - Checks each item by criteria.
 * Returns true if some item matches the criteria.
 * * [[each]] - Iterates items through.
 * * [[search]] - Finds item by criteria.
 * Returns first item matching the criteria.
 * * [[filter]], [[$filter]], [[$$filter]] - Filters collection by criteria.
 * Builds new collection of the same type, consisting of items matching the criteria.
 * * [[count]], [[$count]], [[$$count]] - Counts the items matching criteria.
 * * [[map]], [[$map]], [[$$mapValues]], [[$$mapObjects]] - Maps collection items.
 * Builds new collection of the same type, consisting of results of mapping function call for each collection item.
 * * [[toSorted]], [[$toSorted]],
 * [[toSortedComparing]], [[$toSortedComparing]],
 * [[$$toSortedComparing]] -
 * Builds array consisting of collection items sorted by indexer or comparer.
 * * [[index]], [[$index]], [[$$index]] - Indexes collection.
 * Builds new map by rule: key is the result of indexer function call, value is the corresponding item.
 * * [[toArray]], [[$toArray]], [[$$toArray]] -
 * Builds new array consisting of collection items.
 * * [[toSet]], [[$toSet]], [[$$toSet]] -
 * Builds new set consisting of collection items.
 * * [[asArray]], [[$asArray]] - Represents collection as array.
 * * [[asSet]], [[$asSet]] - Represents collection as set.
 *
 * Collection modification:
 *
 * - **[[add]], [[tryAdd]] - Adds item to set.**
 * - **[[addAll]], [[$addAll]],
 * [[tryAddAll]] - Adds multiple items to set.**
 * - **[[remove]], [[tryRemove]] - Removes item from set.**
 * - **[[removeAll]], [[$removeAll]],
 * [[tryRemoveAll]] - Removes multiple items from set.**
 * * [[removeItem]] - Removes first occurency of an item in collection.
 * * [[removeItems]] - Removes all occurencies of items in collection.
 * * [[clear]], [[$clear]], [[tryClear]] - Clears collection.
 * - **[[splice]], [[trySplice]] - Removes and adds multiple items.**
 * - **[[performSplice]] - Adjusts contents using [[splice]] method.**
 *
 * Synchronizers creation:
 *
 * * [[createMapper]] - Creates item mapper.
 * Extended version of [[$$mapValues]] and [[$$mapObjects]] methods.
 * * [[createFilterer]] - Creates filterer.
 * Extended version of [[$$filter]] method.
 * * [[createCounter]] - Creates matching item counter.
 * Extended version of [[$$count]] method.
 * * [[createLister]] - Creates converter to set.
 * Extended version of [[$$toSet]] method.
 * * [[createIndexer]] - Creates converter to map (indexer).
 * Extended version of [[$$index]] method.
 * * [[createOrderer]] - Creates converter to array (orderer).
 * Extended version of [[$$toArray]] method.
 * * [[createSorterComparing]] - Creates converter to array (sorter by comparer).
 * Extended version of [[$$toSortedComparing]] method.
 * * [[createObserver]] - Creates observer.
 *
 * Similar collection creation (for algorithms and synchronizers implementation):
 *
 * * [[createEmpty]] - Creates empty collection of the same type.
 * * [[createEmptyArray]] - Creates empty array of the same observability type.
 * * [[createEmptyMap]] - Creates empty map of the same observability type.
 * * [[createEmptySet]] - Creates empty set of the same observability type.
 *
 * Other methods:
 *
 * - **[[detectSplice]] - Detects [[splice]] method arguments to adjust contents.**
 * - **[[equal]] - Checks for equality to array.**
 *
 * All the same algorithms are also available for native JavaScript Object as set,
 * see [[JW.Set]] static methods.
 *
 * @param T Collection item type.
 */
interface ISet<T extends IClass> extends ICollection<T> {
	/**
	 * @inheritdoc
	 */
	ownItems(): ISet<T>;

	/**
	 * Returns item map - internal collection representation.
	 *
	 * **Caution: doesn't make a copy - please don't modify.**
	 */
	getJson(): Dictionary<T>;

	/**
	 * @inheritdoc
	 */
	getLength(): number;

	/**
	 * @inheritdoc
	 */
	isEmpty(): boolean;

	/**
	 * @inheritdoc
	 */
	getFirst(): T;

	/**
	 * @inheritdoc
	 */
	containsItem(item: T): boolean;

	/**
	 * Shorthand to [[containsItem]].
	 */
	contains(item: T): boolean;

	/**
	 * @inheritdoc
	 */
	every(callback: (item: T) => boolean, scope?: any): boolean;

	/**
	 * @inheritdoc
	 */
	toSorted(callback?: (item: T) => any, scope?: any, order?: number): T[];

	/**
	 * @inheritdoc
	 */
	toSortedComparing(compare?: (t1: T, t2: T) => number, scope?: any, order?: number): T[];

	/**
	 * @inheritdoc
	 */
	filter(callback: (item: T) => boolean, scope?: any): Dictionary<T>;

	/**
	 * @inheritdoc
	 */
	$filter(callback: (item: T) => boolean, scope?: any): ISet<T>;

	/**
	 * @inheritdoc
	 */
	count(callback: (item: T) => boolean, scope?: any): number;

	/**
	 * @inheritdoc
	 */
	map<U extends IClass>(callback: (item: T) => U, scope?: any): Dictionary<U>;

	/**
	 * @inheritdoc
	 */
	$map<U extends IClass>(callback: (item: T) => U, scope?: any): ISet<U>;

	/**
	 * @inheritdoc
	 */
	toSet(): Dictionary<T>;

	/**
	 * @inheritdoc
	 */
	$toSet(): ISet<T>;

	/**
	 * @inheritdoc
	 */
	asSet(): Dictionary<T>;

	/**
	 * @inheritdoc
	 */
	$asSet(): ISet<T>;

	/**
	 * Adds an item to set if one is absent.
	 * @returns Item is added successfully. False if item is already present.
	 */
	add(item: T): boolean;

	/**
	 * Adds an item to set if one is absent.
	 * @returns Item is added successfully. If collection is not modified, returns undefined.
	 * In other words, this method may return true or undefined.
	 */
	tryAdd(item: T): boolean;

	/**
	 * Adds multiple items to set, ones that are absent.
	 * @returns The added items.
	 */
	addAll(items: T[]): T[];

	/**
	 * Adds multiple items to set, ones that are absent.
	 * @returns The added items.
	 */
	$addAll(items: T[]): IArray<T>;

	/**
	 * Adds multiple items to set, ones that are absent.
	 * @returns The added items.
	 * If collection is not modified, returns undefined.
	 */
	tryAddAll(items: T[]): T[];

	/**
	 * Removes an item from set if one is present.
	 * @returns Item is removed successfully. Returns false if item is already absent.
	 */
	remove(item: T): boolean;

	/**
	 * Removes an item from set if one is present.
	 * @returns Item is removed successfully. If collection is not modified, returns undefined.
	 * In other words, this method may return true or undefined.
	 */
	tryRemove(item: T): boolean;

	/**
	 * @inheritdoc
	 */
	removeItem(item: T): void;

	/**
	 * Removes multiple items from set, ones that are present.
	 * @returns The removed items.
	 */
	removeAll(items: T[]): T[];

	/**
	 * Removes multiple items from set, ones that are present.
	 * @returns The removed items.
	 */
	$removeAll(items: T[]): IArray<T>;

	/**
	 * Removes multiple items from set, ones that are present.
	 * @returns The removed items.
	 * If collection is not modified, returns undefined.
	 */
	tryRemoveAll(items: T[]): T[];

	/**
	 * @inheritdoc
	 */
	removeItems(items: T[]): void;

	/**
	 * @inheritdoc
	 */
	clear(): T[];

	/**
	 * @inheritdoc
	 */
	$clear(): IArray<T>;

	/**
	 * @inheritdoc
	 */
	tryClear(): T[];

	_tryClear(): T[];

	/**
	 * Removes and adds multiple items in set. Universal optimized granular operation of removal/insertion.
	 * @param removedItems Items to remove.
	 * @param addedItems Items to add.
	 * @returns Splice result. Never returns null or undefined.
	 */
	splice(removedItems: T[], addedItems: T[]): ISetSpliceResult<T>;

	/**
	 * Removes and adds multiple items in set. Universal optimized granular operation of removal/insertion.
	 * @param removedItems Items to remove.
	 * @param addedItems Items to add.
	 * @returns Splice result.
	 * If collection is not modified, returns undefined.
	 */
	trySplice(removedItems: T[], addedItems: T[]): ISetSpliceResult<T>;

	_trySplice(removedItems: T[], addedItems: T[]): ISetSpliceResult<T>;

	/**
	 * Detects [[splice]] method arguments to adjust set contents to **newItems**.
	 * Determines which items should be removed and which ones should be added.
	 * @param newItems New set contents.
	 * @returns [[splice]] method arguments. If no method call required, returns undefined.
	 */
	detectSplice(newItems: T[]): ISetSpliceParams<T>;

	/**
	 * Adjusts set contents to **newItems** using [[detectSplice]] and
	 * [[splice]] methods.
	 * @param newItems New set contents.
	 */
	performSplice(newItems: T[]): void;

	/**
	 * Checks for equality (===) to array, item by item.
	 */
	equal(array: T[]): boolean;

	/**
	 * @inheritdoc
	 */
	createEmpty<U extends IClass>(): ISet<U>;
}

export default ISet;
