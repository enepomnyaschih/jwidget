import Destroyable from './Destroyable';
import Dictionary from './Dictionary';
import IArray from './IArray';
import IClass from './IClass';
import ICollectionCounter from './counter/ICollectionCounter';
import ICollectionCounterConfig from './counter/ICollectionCounterConfig';
import ICollectionFilterer from './filterer/ICollectionFilterer';
import ICollectionFiltererConfig from './filterer/ICollectionFiltererConfig';
import ICollectionIndexer from './indexer/ICollectionIndexer';
import ICollectionIndexerConfig from './indexer/ICollectionIndexerConfig';
import ICollectionLister from './lister/ICollectionLister';
import ICollectionListerConfig from './lister/ICollectionListerConfig';
import ICollectionMapper from './mapper/ICollectionMapper';
import ICollectionMapperConfig from './mapper/ICollectionMapperConfig';
import ICollectionObserver from './observer/ICollectionObserver';
import ICollectionObserverConfig from './observer/ICollectionObserverConfig';
import ICollectionOrderer from './orderer/ICollectionOrderer';
import ICollectionOrdererConfig from './orderer/ICollectionOrdererConfig';
import ICollectionSorterComparing from './sortercomparing/ICollectionSorterComparing';
import ICollectionSorterComparingConfig from './sortercomparing/ICollectionSorterComparingConfig';
import IMap from './IMap';
import ISet from './ISet';
import Property from './Property';

/**
 * Abstract collection.
 *
 * There are 3 collection types:
 *
 * * [[JW.AbstractArray]],
 * extends [[JW.IndexedCollection]]
 * * [[JW.AbstractMap]],
 * extends [[JW.IndexedCollection]]
 * * [[JW.AbstractSet]]
 *
 * You can convert collections to each other using methods.
 *
 * Each collection has 2 implementations:
 *
 * * Simple collections:
 * [[JW.Array]],
 * [[JW.Map]],
 * [[JW.Set]]
 * * Observable collection:
 * [[JW.ObservableArray]],
 * [[JW.ObservableMap]],
 * [[JW.ObservableSet]]
 *
 * The difference is that observable collection triggers events about its modifications.
 * It lets you to synchronize view with data on fly in accordance to Model-View architecture.
 *
 * Internally, simple collections are very similar to native JavaScript collections.
 * But their API is identical to observable collections' (excepting lack of events).
 * So you can use simple collections as a bridge between native JavaScript collections and
 * jWidget observable collections.
 *
 * The next synchronizers exist to connect observable collections to each other:
 *
 * <table>
 *   <tbody>
 *     <tr>
 *       <td>Synchronizer</td>
 *       <td>Class</td>
 *       <td>Creation methods</td>
 *     </tr>
 *     <tr>
 *       <td>Item mapper</td>
 *       <td>[[JW.AbstractCollection.Mapper]]</td>
 *       <td>[[$$mapValues]], [[$$mapObjects]], [[createMapper]]</td>
 *     </tr>
 *     <tr>
 *       <td>Filterer</td>
 *       <td>[[JW.AbstractCollection.Filterer]]</td>
 *       <td>[[$$filter]], [[createFilterer]]</td>
 *     </tr>
 *     <tr>
 *       <td>Matching item counter</td>
 *       <td>[[JW.AbstractCollection.Counter]]</td>
 *       <td>[[$$count]], [[createCounter]]</td>
 *     </tr>
 *     <tr>
 *       <td>Converter to set</td>
 *       <td>[[JW.AbstractCollection.Lister]]</td>
 *       <td>[[$$toSet]], [[createLister]]</td>
 *     </tr>
 *     <tr>
 *       <td>Converter to map (indexer)</td>
 *       <td>[[JW.AbstractCollection.Indexer]]</td>
 *       <td>[[$$index]], [[createIndexer]]</td>
 *     </tr>
 *     <tr>
 *       <td>Converter to array (orderer)</td>
 *       <td>[[JW.AbstractCollection.Orderer]]</td>
 *       <td>[[$$toArray]], [[createOrderer]]</td>
 *     </tr>
 *     <tr>
 *       <td>Converter to array (sorter by comparer)</td>
 *       <td>[[JW.AbstractCollection.SorterComparing]]</td>
 *       <td>[[$$toSortedComparing]], [[createSorterComparing]]</td>
 *     </tr>
 *     <tr>
 *       <td>Observer</td>
 *       <td>[[JW.AbstractCollection.Observer]]</td>
 *       <td>[[createObserver]]</td>
 *     </tr>
 *     <tr>
 *       <td>View synchronizers</td>
 *       <td>[[JW.abstractarray.Inserter]], [[JW.abstractmap.Inserter]], [[JW.UI.Inserter]]</td>
 *       <td>createInserter</td>
 *     </tr>
 *     <tr>
 *       <td>Arrays merger</td>
 *       <td>[[JW.abstractarray.Merger]]</td>
 *       <td>[[$$merge]], [[createMerger]]</td>
 *     </tr>
 *     <tr>
 *       <td>Array reverser</td>
 *       <td>[[JW.abstractarray.Reverser]]</td>
 *       <td>[[$$toReversed]], [[createReverser]]</td>
 *     </tr>
 *   </tbody>
 * </table>
 *
 * Please keep the next rules in mind whenever you work with jWidget collections.
 *
 * 1) null and undefined items are prohibited in jWidget collections.
 * Use "Null Object" pattern if it is neccessary.
 *
 * 2) The majority of collection modification methods have 2 implementations: **tryMethod** and **method**.
 * These methods perform the same collection modification but return different result.
 * **tryMethod** is introduced for internal use mainly,
 * and *it always returns undefined if collection has not been modified*.
 * For example, [[tryClear]] returns undefined if collection is empty,
 * else it returns old collection contents.
 * **method** returns result in more friendly format.
 * For example, [[clear]] always returns old collection contents.
 * So, if you want to clear collection and destroy all items, [[clear]] method fits better:
 *
 *     JW.Array.each(array.clear(), JW.destroy); // correct
 *     JW.Array.each(array.tryClear(), JW.destroy); // incorrect: 'undefined' exception if array is empty
 *
 * 3) Majority of collection returning methods have 3 implementations: **method**, **$method** and **$$method**.
 * These methods perform the same modification but return the result in different format.
 *
 * * **method** returns native JavaScript collection: Array or Object.
 * * **$method** returns jWidget collection: [[JW.Array]],
 * [[JW.Map]] or [[JW.Set]].
 * * **$$method** returns jWidget collection and starts continuous synchronization with original
 * collection if one is observable. To stop synchronization, destroy the target collection.
 *
 * Please use a method that's more convenient in your specific situation.
 * For example, **$method** is convenient for chaining algorithm method calls.
 * So, previous example can become more readable with [[$clear]] method:
 *
 *     array.$clear().each(JW.destroy);
 *
 * But in the next example [[clear]] is still suitable:
 *
 *     set.addAll(array.clear());
 *
 * Whereas **$$method** is a shorthand for synchronizer creation:
 *
 *     this.set = this.own(array.$$toSet());
 *
 * Which is pretty much the same as:
 *
 *     this.set = this.own(array.createLister()).target;
 *
 * 4) It is better if all items in collection are unique. Some methods like
 * [[performReorder]] require each item to have an unique key.
 * If two items of collection are equal, then their keys are equal as well, so this method won't work correctly.
 *
 * # Collection methods
 *
 * Content retrieving:
 *
 * * [[getLength]] - Returns count of items in collection.
 * For observable collections, **length** property may come
 * in handy if you want to track collection length dynamically.
 * * [[isEmpty]] - Checks collection for emptiness.
 * * [[getFirst]] - Returns first item in collection.
 * * [[containsItem]] - Does collection contain the item?
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
 * * [[removeItem]] - Removes first occurency of an item in collection.
 * * [[removeItems]] - Removes all occurencies of items in collection.
 * * [[clear]], [[$clear]], [[tryClear]] - Clears collection.
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
 * All the same algorithms are also available for native JavaScript collections:
 *
 * * Array, see [[JW.Array]] static methods.
 * * Object as map, see [[JW.Map]] static methods.
 * * Object as set, see [[JW.Set]] static methods.
 *
 * @param T Collection item type.
 */
interface ICollection<T> extends IClass {
	/**
	 * Makes this collection an owner of its items, which means that its items are alive as long as they are present in
	 * this collection. The item is destroyed when it leaves the
	 * collection, and all items are destroyed on the collection destruction.
	 * @returns this
	 */
	ownItems(): ICollection<T>;

	/**
	 * Returns count of items in collection.
	 */
	getLength(): number;

	/**
	 * Checks collection for emptiness.
	 */
	isEmpty(): boolean;

	/**
	 * Returns first item in collection. If collection is empty, returns undefined.
	 */
	getFirst(): T;

	/**
	 * Checks item for existance in collection.
	 */
	containsItem(item: T): boolean;

	/**
	 * Removes first occurrence of an item in collection.
	 */
	removeItem(item: T): void;

	/**
	 * Removes all occurrences of items in collection.
	 * **Known issue:** *Works only if T extends JW.Class!*
	 */
	removeItems(items: T[]): void;

	/**
	 * Clears collection.
	 * @returns Old collection contents. If not modified - undefined.
	 */
	tryClear(): any;

	/**
	 * Clears collection.
	 * @returns Old collection contents. Never returns null or undefined.
	 */
	clear(): any;

	/**
	 * Clears collection.
	 * @returns Old collection contents. Never returns null or undefined.
	 */
	$clear(): ICollection<T>;

	/**
	 * Matches all items against criteria.
	 *
	 * Returns true if callback returns !== false for all collection items.
	 *
	 * Algorithms iterates items sequentially, and stops after first item not matching the criteria.
	 *
	 * @param callback Criteria callback.
	 * @param scope **callback** call scope. Defaults to collection itself.
	 */
	every(callback: (item: T) => boolean, scope?: any): boolean;

	/**
	 * Matches each item against criteria.
	 *
	 * Returns true if callback returns !== false for some collection item.
	 *
	 * Algorithms iterates items sequentially, and stops after first item matching the criteria.
	 *
	 * @param callback Criteria callback.
	 * @param scope **callback** call scope. Defaults to collection itself.
	 */
	some(callback: (item: T) => boolean, scope?: any): boolean;

	/**
	 * Iterates collection items. Calls specified function for all items.
	 *
	 * @param callback Callback function.
	 * @param scope **callback** call scope. Defaults to collection itself.
	 */
	each(callback: (item: T) => any, scope?: any): void;

	/**
	 * Finds item matching criteria.
	 *
	 * Returns first item for which callback returns !== false.
	 *
	 * Algorithms iterates items sequentially, and stops after first item matching the criteria.
	 *
	 * @param callback Criteria callback.
	 * @param scope **callback** call scope. Defaults to collection itself.
	 * @returns Found item or undefined.
	 */
	search(callback: (item: T) => boolean, scope?: any): T;

	/**
	 * Converts collection to sorted array.
	 *
	 * Builds array consisting of collection items sorted by result of callback call for each item.
	 *
	 * @param callback Indexer function. Must return a comparable value, compatible with
	 * [[JW.cmp]]. Returns item itself by default.
	 * @param scope **callback** call scope. Defaults to collection itself.
	 * @param order Sorting order. Positive number for ascending sorting, negative for descending sorting.
	 * @returns Sorted array.
	 */
	toSorted(callback?: (item: T) => any, scope?: any, order?: number): T[];

	/**
	 * Converts collection to sorted array.
	 *
	 * Builds array consisting of collection items sorted by result of callback call for each item.
	 *
	 * @param callback Indexer function. Must return a comparable value, compatible with
	 * [[JW.cmp]]. Returns item itself by default.
	 * @param scope **callback** call scope. Defaults to collection itself.
	 * @param order Sorting order. Positive number for ascending sorting, negative for descending sorting.
	 * @returns Sorted array.
	 */
	$toSorted(callback?: (item: T) => any, scope?: any, order?: number): IArray<T>;

	/**
	 * Converts collection to sorted array.
	 *
	 * Builds array consisting of collection items sorted by comparer.
	 *
	 * @param compare Comparer function. Should return positive value if t1 > t2;
	 * negative value if t1 < t2; 0 if t1 == t2.
	 * Defaults to [[JW.cmp]]
	 * @param scope **comparer** call scope. Defaults to collection itself.
	 * @param order Sorting order. Positive number for ascending sorting, negative for descending sorting.
	 * @returns Sorted array.
	 */
	toSortedComparing(compare?: (t1: T, t2: T) => number, scope?: any, order?: number): T[];

	/**
	 * Converts collection to sorted array.
	 *
	 * Builds array consisting of collection items sorted by comparer.
	 *
	 * @param compare Comparer function. Should return positive value if t1 > t2;
	 * negative value if t1 < t2; 0 if t1 == t2.
	 * Defaults to [[JW.cmp]]
	 * @param scope **comparer** call scope. Defaults to collection itself.
	 * @param order Sorting order. Positive number for ascending sorting, negative for descending sorting.
	 * @returns Sorted array.
	 */
	$toSortedComparing(compare?: (t1: T, t2: T) => number, scope?: any, order?: number): IArray<T>;

	/**
	 * Converts collection to sorted array.
	 *
	 * Builds array consisting of collection items sorted by comparer.
	 * If this collection is observable, starts continuous synchronization,
	 * i.e. creates [[JW.AbstractCollection.SorterComparing]] implicitly.
	 *
	 * @param compare Comparer function. Should return positive value if t1 > t2;
	 * negative value if t1 < t2; 0 if t1 == t2.
	 * Defaults to [[JW.cmp]]
	 * @param scope **comparer** call scope. Defaults to collection itself.
	 * @param order Sorting order. Positive number for ascending sorting, negative for descending sorting.
	 * @returns Sorted array.
	 */
	$$toSortedComparing(compare?: (t1: T, t2: T) => number, scope?: any, order?: number): IArray<T>;

	/**
	 * Indexes collection.
	 *
	 * Builds new map by rule: key is the result of indexer function call, value is the corresponding item.
	 *
	 * @param callback Indexer function.
	 * @param scope **callback** call scope. Defaults to collection itself.
	 * @returns Collection index.
	 */
	index(callback: (item: T) => string, scope?: any): Dictionary<T>;

	/**
	 * Indexes collection.
	 *
	 * Builds new map by rule: key is the result of indexer function call, value is the corresponding item.
	 *
	 * @param callback Indexer function.
	 * @param scope **callback** call scope. Defaults to collection itself.
	 * @returns Collection index.
	 */
	$index(callback: (item: T) => string, scope?: any): IMap<T>;

	/**
	 * Indexes collection.
	 *
	 * Builds new map by rule: key is the result of indexer function call, value is the corresponding item.
	 * If this collection is observable, starts continuous synchronization,
	 * i.e. creates [[JW.AbstractCollection.Indexer]] implicitly.
	 *
	 * @param callback Indexer function.
	 * @param scope **callback** call scope. Defaults to collection itself.
	 * @returns Collection index.
	 */
	$$index(callback: (item: T) => string, scope?: any): IMap<T>;

	/**
	 * Converts collection to array.
	 *
	 * Builds new array consisting of collection items.
	 */
	toArray(): T[];

	/**
	 * Converts collection to array.
	 *
	 * Builds new array consisting of collection items.
	 */
	$toArray(): IArray<T>;

	/**
	 * Converts collection to array.
	 *
	 * Builds new array consisting of collection items.
	 * If this collection is observable, starts continuous synchronization,
	 * i.e. creates [[JW.AbstractCollection.Orderer]] implicitly.
	 */
	$$toArray(): IArray<T>;

	/**
	 * Converts collection to set.
	 *
	 * Builds new set consisting of collection items.
	 * Requires T to extend JW.Class.
	 */
	toSet(): Dictionary<T>;

	/**
	 * Converts collection to set.
	 *
	 * Builds new set consisting of collection items.
	 * Requires T to extend JW.Class.
	 */
	$toSet(): ISet<any>;

	/**
	 * Converts collection to set.
	 *
	 * Builds new set consisting of collection items.
	 * If this collection is observable, starts continuous synchronization,
	 * i.e. creates [[JW.AbstractCollection.Lister]] implicitly.
	 * Requires T to extend JW.Class.
	 */
	$$toSet(): ISet<any>;

	/**
	 * Represents collection as array.
	 *
	 * If this collection is array, returns it immediately.
	 * Else, executes [[toArray]] method.
	 * This method works usually faster than [[toArray]],
	 * but please make sure that the returned array
	 * won't be modified externally, because it can cause strange unexpected bugs.
	 */
	asArray(): T[];

	/**
	 * Represents collection as array.
	 *
	 * If this collection is array, returns it immediately.
	 * Else, executes [[toArray]] method.
	 * This method works usually faster than [[toArray]],
	 * but please make sure that the returned array
	 * won't be modified externally, because it can cause strange unexpected bugs.
	 */
	$asArray(): IArray<T>;

	/**
	 * Represents collection as set.
	 *
	 * If this collection is set, returns it immediately.
	 * Else, executes [[toSet]] method.
	 * This method works usually faster than [[toSet]],
	 * but please make sure that the returned set
	 * won't be modified externally, because it can cause strange unexpected bugs.
	 * Requires T to extend JW.Class.
	 */
	asSet(): Dictionary<T>;

	/**
	 * Represents collection as set.
	 *
	 * If this collection is set, returns it immediately.
	 * Else, executes [[toSet]] method.
	 * This method works usually faster than [[toSet]],
	 * but please make sure that the returned set
	 * won't be modified externally, because it can cause strange unexpected bugs.
	 * Requires T to extend JW.Class.
	 */
	$asSet(): ISet<any>;

	/**
	 * Filters collection by criteria.
	 *
	 * Builds new collection of the same type, consisting of items for which callback returns !== false.
	 *
	 * @param callback Criteria callback.
	 * @param scope **callback** call scope. Defaults to collection itself.
	 * @returns Filtered collection.
	 */
	filter(callback: (item: T) => boolean, scope?: any): any;

	/**
	 * Filters collection by criteria.
	 *
	 * Builds new collection of the same type, consisting of items for which callback returns !== false.
	 *
	 * @param callback Criteria callback.
	 * @param scope **callback** call scope. Defaults to collection itself.
	 * @returns Filtered collection.
	 */
	$filter(callback: (item: T) => boolean, scope?: any): ICollection<T>;

	/**
	 * Filters collection by criteria.
	 *
	 * Builds new collection of the same type, consisting of items for which callback returns !== false.
	 * If this collection is observable, starts continuous synchronization,
	 * i.e. creates [[JW.AbstractCollection.Filterer]] implicitly.
	 *
	 * @param callback Criteria callback.
	 * @param scope **callback** call scope. Defaults to collection itself.
	 * @returns Filtered collection.
	 */
	$$filter(callback: (item: T) => boolean, scope?: any): ICollection<T>;

	/**
	 * Counts the items matching criteria.
	 *
	 * Returns the number of items for which callback returns !== false.
	 *
	 * @param callback Criteria callback.
	 * @param scope **callback** call scope. Defaults to collection itself.
	 * @returns Number of items.
	 */
	count(callback: (item: T) => boolean, scope?: any): number;

	/**
	 * Counts the items matching criteria.
	 *
	 * Returns the number of items for which callback returns !== false.
	 *
	 * @param callback Criteria callback.
	 * @param scope **callback** call scope. Defaults to collection itself.
	 * @returns Number of items.
	 */
	$count(callback: (item: T) => boolean, scope?: any): Property<number>;

	/**
	 * Counts the items matching criteria.
	 *
	 * Returns the number of items for which callback returns !== false.
	 * If this collection is observable, starts continuous synchronization,
	 * i.e. creates [[JW.AbstractCollection.Counter]] implicitly.
	 *
	 * @param callback Criteria callback.
	 * @param scope **callback** call scope. Defaults to collection itself.
	 * @returns Number of items.
	 */
	$$count(callback: (item: T) => boolean, scope?: any): Property<number>;

	/**
	 * Maps collection items.
	 *
	 * Builds new collection of the same type, containing results of callback call for each collection item.
	 *
	 * @param callback Mapping function.
	 * @param scope **callback** call scope. Defaults to collection itself.
	 * @returns Mapped collection.
	 */
	map<U>(callback: (item: T) => U, scope?: any): any;

	/**
	 * Maps collection items.
	 *
	 * Builds new collection of the same type, containing results of callback call for each collection item.
	 *
	 * @param callback Mapping function.
	 * @param scope **callback** call scope. Defaults to collection itself.
	 * @returns Mapped collection.
	 */
	$map<U>(callback: (item: T) => U, scope?: any): ICollection<U>;

	/**
	 * Maps collection items.
	 *
	 * Builds new collection of the same type, containing results of callback call for each collection item.
	 * If this collection is observable, starts continuous synchronization,
	 * i.e. creates [[JW.AbstractCollection.Mapper]] implicitly.
	 * Unlike [[$$mapObjects]] method, doesn't destroy the resulting items after their removal.
	 *
	 * @param callback Mapping function.
	 * @param scope **callback** call scope. Defaults to collection itself.
	 * @returns Mapped collection.
	 */
	$$mapValues<U>(callback: (item: T) => U, scope?: any): ICollection<U>;

	/**
	 * Maps collection items.
	 *
	 * Builds new collection of the same type, containing results of callback call for each collection item.
	 * If this collection is observable, starts continuous synchronization,
	 * i.e. creates [[JW.AbstractCollection.Mapper]] implicitly.
	 * Unlike [[$$mapValues]] method, destroys the resulting items after their removal.
	 *
	 * @param callback Mapping function.
	 * @param scope **callback** call scope. Defaults to collection itself.
	 * @returns Mapped collection.
	 */
	$$mapObjects<U extends Destroyable>(callback: (item: T) => U, scope?: any): ICollection<U>;

	/**
	 * Creates empty collection of the same type.
	 */
	createEmpty<U>(): ICollection<U>;

	/**
	 * Creates empty array of the same observability level.
	 */
	createEmptyArray<U>(): IArray<U>;

	/**
	 * Creates empty map of the same observability level.
	 */
	createEmptyMap<U>(): IMap<U>;

	/**
	 * Creates empty set of the same observability level.
	 */
	createEmptySet<U extends IClass>(): ISet<U>;

	/**
	 * Creates collection item mapper.
	 * Selects appropriate synchronizer implementation automatically.
	 * Extended version of [[$$mapValues]] and [[$$mapObjects]] methods.
	 * @param config Configuration.
	 */
	createMapper<U>(config: ICollectionMapperConfig<T, U>): ICollectionMapper<T, U>;

	/**
	 * Creates collection filterer.
	 * Selects appropriate synchronizer implementation automatically.
	 * Extended version of [[$$filter]] method.
	 * @param config Configuration.
	 */
	createFilterer(config: ICollectionFiltererConfig<T>): ICollectionFilterer<T>;

	/**
	 * Creates matching item counter.
	 * Selects appropriate synchronizer implementation automatically.
	 * Extended version of [[$$count]] method.
	 * @param config Configuration.
	 */
	createCounter(config: ICollectionCounterConfig<T>): ICollectionCounter<T>;

	/**
	 * Creates collection observer.
	 * Selects appropriate synchronizer implementation automatically.
	 * @param config Configuration.
	 */
	createObserver(config?: ICollectionObserverConfig<T>): ICollectionObserver;

	/**
	 * Creates collection converter to array (orderer).
	 * Selects appropriate synchronizer implementation automatically.
	 * Extended version of [[$$toArray]] method.
	 * @param config Configuration.
	 */
	createOrderer(config?: ICollectionOrdererConfig<any>): ICollectionOrderer<any>;

	/**
	 * Creates collection converter to array (sorter by comparer).
	 * Selects appropriate synchronizer implementation automatically.
	 * Extended version of [[$$toSortedComparing]] method.
	 * @param config Configuration.
	 */
	createSorterComparing(config?: ICollectionSorterComparingConfig<T>): ICollectionSorterComparing<T>;

	/**
	 * Creates collection converter to map (indexer).
	 * Selects appropriate synchronizer implementation automatically.
	 * Extended version of [[$$index]] method.
	 * @param config Configuration.
	 */
	createIndexer(config: ICollectionIndexerConfig<T>): ICollectionIndexer<T>;

	/**
	 * Creates collection converter to set.
	 * Selects appropriate synchronizer implementation automatically.
	 * Extended version of [[$$toSet]] method.
	 * @param config Configuration.
	 */
	createLister(config?: ICollectionListerConfig<any>): ICollectionLister<any>;
}

export default ICollection;