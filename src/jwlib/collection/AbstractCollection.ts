import {array} from '../core/globals';
import {Dictionary} from '../core/Core';
import {Class} from '../core/Class';
import {Destroyable} from '../core/Destroyable';
import {Property} from '../property/Property';
import {AbstractArray} from './AbstractArray';
import {AbstractMap} from './AbstractMap';
import {AbstractSet} from './AbstractSet';
import {Array} from './Array';
import {Map} from './Map';
import {Set} from './Set';

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
export abstract class AbstractCollection<T> extends Class {
	protected _ownsItems: Boolean = false;

	protected destroyObject(): void {
		this.tryClear();
		super.destroyObject();
	}

	/**
	 * Makes this collection an owner of its items, which means that its items are alive as long as they are present in
	 * this collection. The item is destroyed when it leaves the
	 * collection, and all items are destroyed on the collection destruction.
	 * @returns this
	 */
	ownItems(): AbstractCollection<T> {
		this._ownsItems = true;
		return this;
	}

	/**
	 * Returns count of items in collection.
	 */
	abstract getLength(): number;

	/**
	 * Checks collection for emptiness.
	 */
	abstract isEmpty(): boolean;

	/**
	 * Returns first item in collection. If collection is empty, returns undefined.
	 */
	abstract getFirst(): T;

	/**
	 * Checks item for existance in collection.
	 */
	abstract containsItem(item: T): boolean;

	/**
	 * Removes first occurrence of an item in collection.
	 */
	abstract removeItem(item: T);

	/**
	 * Removes all occurrences of items in collection.
	 * **Known issue:** *Works only if T extends JW.Class!*
	 */
	abstract removeItems(items: T[]);

	/**
	 * Clears collection.
	 * @returns Old collection contents. If not modified - undefined.
	 */
	abstract tryClear(): any;

	/**
	 * Clears collection.
	 * @returns Old collection contents. Never returns null or undefined.
	 */
	abstract clear(): any;

	/**
	 * Clears collection.
	 * @returns Old collection contents. Never returns null or undefined.
	 */
	abstract $clear(): AbstractCollection<T>;

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
	abstract every(callback: (item: T) => boolean, scope?: any): boolean;

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
	some(callback: (item: T) => boolean, scope?: any): boolean {
		return !this.every(function (item) {
			return callback.call(this, item) === false;
		}, scope);
	}

	/**
	 * Iterates collection items. Calls specified function for all items.
	 *
	 * @param callback Callback function.
	 * @param scope **callback** call scope. Defaults to collection itself.
	 */
	each(callback: (item: T) => any, scope?: any) {
		this.every(function (item) {
			callback.call(this, item);
			return true;
		}, scope);
	}

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
	search(callback: (item: T) => boolean, scope?: any): T {
		var result: T;
		this.every(function (item) {
			if (callback.call(this, item) !== false) {
				result = item;
				return false;
			}
			return true;
		}, scope);
		return result;
	}

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
	abstract toSorted(callback?: (item: T) => any, scope?: any, order?: number): T[];

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
	$toSorted(callback?: (item: T) => any, scope?: any, order?: number): Array<T> {
		return new Array<T>(this.toSorted(callback, scope, order), true);
	}

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
	abstract toSortedComparing(compare?: (t1: T, t2: T) => number, scope?: any, order?: number): T[];

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
	$toSortedComparing(compare?: (t1: T, t2: T) => number, scope?: any, order?: number): Array<T> {
		return new Array<T>(this.toSortedComparing(compare, scope, order), true);
	}

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
	$$toSortedComparing(compare?: (t1: T, t2: T) => number, scope?: any, order?: number): AbstractArray<T> {
		return this.$toSortedComparing(compare, scope, order);
	}

	/**
	 * Indexes collection.
	 *
	 * Builds new map by rule: key is the result of indexer function call, value is the corresponding item.
	 *
	 * @param callback Indexer function.
	 * @param scope **callback** call scope. Defaults to collection itself.
	 * @returns Collection index.
	 */
	index(callback: (item: T) => string, scope?: any): Dictionary<T> {
		var result: Dictionary<T> = {};
		this.every(function (item) {
			var key: string = callback.call(this, item);
			if (key != null) {
				result[key] = item;
			}
			return true;
		}, scope);
		return result;
	}

	/**
	 * Indexes collection.
	 *
	 * Builds new map by rule: key is the result of indexer function call, value is the corresponding item.
	 *
	 * @param callback Indexer function.
	 * @param scope **callback** call scope. Defaults to collection itself.
	 * @returns Collection index.
	 */
	$index(callback: (item: T) => string, scope?: any): Map<T> {
		return new Map<T>(this.index(callback, scope), true);
	}

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
	$$index(callback: (item: T) => string, scope?: any): AbstractMap<T> {
		return this.$index(callback, scope);
	}

	/**
	 * Converts collection to array.
	 *
	 * Builds new array consisting of collection items.
	 */
	toArray(): T[] {
		var result: T[] = array<T>(this.getLength());
		var index: number = 0;
		this.every(function (item) {
			result[index++] = item;
			return true;
		});
		return result;
	}

	/**
	 * Converts collection to array.
	 *
	 * Builds new array consisting of collection items.
	 */
	$toArray(): Array<T> {
		return new Array(this.toArray(), true);
	}

	/**
	 * Converts collection to array.
	 *
	 * Builds new array consisting of collection items.
	 * If this collection is observable, starts continuous synchronization,
	 * i.e. creates [[JW.AbstractCollection.Orderer]] implicitly.
	 */
	$$toArray(): AbstractArray<T> {
		return this.$toArray();
	}

	/**
	 * Converts collection to set.
	 *
	 * Builds new set consisting of collection items.
	 * Requires T to extend JW.Class.
	 */
	toSet(): Dictionary<T> {
		var result: Dictionary<any> = {};
		this.every(function (item) {
			Set.add(result, item);
			return true;
		});
		return result;
	}

	/**
	 * Converts collection to set.
	 *
	 * Builds new set consisting of collection items.
	 * Requires T to extend JW.Class.
	 */
	$toSet(): Set<any> {
		return new Set<any>(this.toSet(), true);
	}

	/**
	 * Converts collection to set.
	 *
	 * Builds new set consisting of collection items.
	 * If this collection is observable, starts continuous synchronization,
	 * i.e. creates [[JW.AbstractCollection.Lister]] implicitly.
	 * Requires T to extend JW.Class.
	 */
	$$toSet(): AbstractSet<any> {
		return this.$toSet();
	}

	/**
	 * Represents collection as array.
	 *
	 * If this collection is array, returns it immediately.
	 * Else, executes [[toArray]] method.
	 * This method works usually faster than [[toArray]],
	 * but please make sure that the returned array
	 * won't be modified externally, because it can cause strange unexpected bugs.
	 */
	asArray(): T[] {
		return this.toArray();
	}

	/**
	 * Represents collection as array.
	 *
	 * If this collection is array, returns it immediately.
	 * Else, executes [[toArray]] method.
	 * This method works usually faster than [[toArray]],
	 * but please make sure that the returned array
	 * won't be modified externally, because it can cause strange unexpected bugs.
	 */
	$asArray(): AbstractArray<T> {
		return new Array<T>(this.asArray(), true);
	}

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
	asSet(): Dictionary<T> {
		return this.toSet();
	}

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
	$asSet(): AbstractSet<any> {
		return new Set<any>(this.asSet(), true);
	}

	/**
	 * Filters collection by criteria.
	 *
	 * Builds new collection of the same type, consisting of items for which callback returns !== false.
	 *
	 * @param callback Criteria callback.
	 * @param scope **callback** call scope. Defaults to collection itself.
	 * @returns Filtered collection.
	 */
	abstract filter(callback: (item: T) => boolean, scope?: any): any;

	/**
	 * Filters collection by criteria.
	 *
	 * Builds new collection of the same type, consisting of items for which callback returns !== false.
	 *
	 * @param callback Criteria callback.
	 * @param scope **callback** call scope. Defaults to collection itself.
	 * @returns Filtered collection.
	 */
	abstract $filter(callback: (item: T) => boolean, scope?: any): AbstractCollection<T>;

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
	abstract $$filter(callback: (item: T) => boolean, scope?: any): AbstractCollection<T>;

	/**
	 * Counts the items matching criteria.
	 *
	 * Returns the number of items for which callback returns !== false.
	 *
	 * @param callback Criteria callback.
	 * @param scope **callback** call scope. Defaults to collection itself.
	 * @returns Number of items.
	 */
	abstract count(callback: (item: T) => boolean, scope?: any): number;

	/**
	 * Counts the items matching criteria.
	 *
	 * Returns the number of items for which callback returns !== false.
	 *
	 * @param callback Criteria callback.
	 * @param scope **callback** call scope. Defaults to collection itself.
	 * @returns Number of items.
	 */
	$count(callback: (item: T) => boolean, scope?: any): Property<number> {
		return new Property<number>(this.count(callback, scope));
	}

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
	$$count(callback: (item: T) => boolean, scope?: any): Property<number> {
		return this.$count(callback, scope);
	}

	/**
	 * Maps collection items.
	 *
	 * Builds new collection of the same type, containing results of callback call for each collection item.
	 *
	 * @param callback Mapping function.
	 * @param scope **callback** call scope. Defaults to collection itself.
	 * @returns Mapped collection.
	 */
	abstract map<U>(callback: (item: T) => U, scope?: any): any;

	/**
	 * Maps collection items.
	 *
	 * Builds new collection of the same type, containing results of callback call for each collection item.
	 *
	 * @param callback Mapping function.
	 * @param scope **callback** call scope. Defaults to collection itself.
	 * @returns Mapped collection.
	 */
	abstract $map<U>(callback: (item: T) => U, scope?: any): AbstractCollection<U>;

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
	abstract $$mapValues<U>(callback: (item: T) => U, scope?: any): AbstractCollection<U>;

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
	abstract $$mapObjects<U extends Destroyable>(callback: (item: T) => U, scope?: any): AbstractCollection<U>;

	/**
	 * Creates empty collection of the same type.
	 */
	abstract createEmpty<U>(): AbstractCollection<U>;

	/**
	 * Creates empty array of the same observability level.
	 */
	abstract createEmptyArray<U>(): AbstractArray<U>;

	/**
	 * Creates empty map of the same observability level.
	 */
	abstract createEmptyMap<U>(): AbstractMap<U>;

	/**
	 * Creates empty set of the same observability level.
	 */
	abstract createEmptySet<U extends Class>(): AbstractSet<U>;

	/**
	 * Creates collection item mapper.
	 * Selects appropriate synchronizer implementation automatically.
	 * Extended version of [[$$mapValues]] and [[$$mapObjects]] methods.
	 * @param config Configuration.
	 */
	abstract createMapper<U>(config: AbstractCollection.Mapper.Config<T, U>): AbstractCollection.Mapper<T, U>;

	/**
	 * Creates collection filterer.
	 * Selects appropriate synchronizer implementation automatically.
	 * Extended version of [[$$filter]] method.
	 * @param config Configuration.
	 */
	abstract createFilterer(config: AbstractCollection.Filterer.Config<T>): AbstractCollection.Filterer<T>;

	/**
	 * Creates matching item counter.
	 * Selects appropriate synchronizer implementation automatically.
	 * Extended version of [[$$count]] method.
	 * @param config Configuration.
	 */
	abstract createCounter(config: AbstractCollection.Counter.Config<T>): AbstractCollection.Counter<T>;

	/**
	 * Creates collection observer.
	 * Selects appropriate synchronizer implementation automatically.
	 * @param config Configuration.
	 */
	abstract createObserver(config?: AbstractCollection.Observer.Config<T>): AbstractCollection.Observer<T>;

	/**
	 * Creates collection converter to array (orderer).
	 * Selects appropriate synchronizer implementation automatically.
	 * Extended version of [[$$toArray]] method.
	 * @param config Configuration.
	 */
	abstract createOrderer(config?: AbstractCollection.Orderer.Config<any>): AbstractCollection.Orderer<any>;

	/**
	 * Creates collection converter to array (sorter by comparer).
	 * Selects appropriate synchronizer implementation automatically.
	 * Extended version of [[$$toSortedComparing]] method.
	 * @param config Configuration.
	 */
	abstract createSorterComparing(config?: AbstractCollection.SorterComparing.Config<T>): AbstractCollection.SorterComparing<T>;

	/**
	 * Creates collection converter to map (indexer).
	 * Selects appropriate synchronizer implementation automatically.
	 * Extended version of [[$$index]] method.
	 * @param config Configuration.
	 */
	abstract createIndexer(config: AbstractCollection.Indexer.Config<T>): AbstractCollection.Indexer<T>;

	/**
	 * Creates collection converter to set.
	 * Selects appropriate synchronizer implementation automatically.
	 * Extended version of [[$$toSet]] method.
	 * @param config Configuration.
	 */
	abstract createLister(config?: AbstractCollection.Lister.Config<any>): AbstractCollection.Lister<any>;
}

export module AbstractCollection {
	/**
	 * Counter for collection items which match the specified filter.
	 * Builds new JW.Property&lt;number&gt;, containing the number of items for which callback
	 * function returns !== false.
	 * If original collection is observable, starts continuous synchronization.
	 *
	 *     var source = new JW.ObservableArray<number>([1, 2, 3]);
	 *     var counter = source.createCounter({
	 *         filterItem: function(x) { return x % 2 === 1; }
	 *     });
	 *     var target = counter.target;
	 *     assert.strictEqual(target.get(), 2); // two odd numbers: 1, 3
	 *
	 *     source.addAll([4, 7, 1, 6]);
	 *     assert.strictEqual(target.get(), 4); // four odd numbers: 1, 3, 7, 1
	 *
	 *     counter.destroy();
	 *
	 * Use [[JW.AbstractCollection.createCounter|createCounter]] method to create the synchronizer.
	 * The method selects a synchronizer implementation which fits better (simple or observable).
	 *
	 * You can pass target property in config option:
	 *
	 *     var source = new JW.ObservableSet();
	 *     var target = new JW.Property<number>(0);
	 *     var counter = source.createCounter({
	 *         target: target,
	 *         filterItem: this._filterItem,
	 *         scope: this
	 *     });
	 *
	 * In simple cases, [[JW.AbstractCollection.$$count|$$count]] shorthand can be used instead.
	 * It returns the target property right away:
	 *
	 *     var source = new JW.ObservableArray<number>([1, 2, 3]);
	 *     var target = source.$$count(function(x) { return x % 2 === 1; });
	 *     assert.strictEqual(target.get(), 2); // two odd numbers: 1, 3
	 *
	 *     source.addAll([4, 7, 1, 6]);
	 *     assert.strictEqual(target.get(), 4); // four odd numbers: 1, 3, 7, 1
	 *
	 *     target.destroy();
	 *
	 * You may use [[JW.AbstractCollection.Filterer|Filterer]] instead
	 * of counter, but counter works much faster because it doesn't create a filtered collection.
	 *
	 *     var source = new JW.ObservableArray();
	 *
	 *     // via filterer
	 *     var filterer = source.createFilterer({
	 *         filterItem: this._filterItem,
	 *         scope: this
	 *     });
	 *     var count = filterer.target.length; // JW.Property<number>
	 *
	 *     // via counter, works faster
	 *     var counter = source.createCounter({
	 *         filterItem: this._filterItem,
	 *         scope: this
	 *     });
	 *     var count = counter.target; // JW.Property<number>
	 *
	 * Counter works correctly for observable collections only.
	 *
	 * @param T Collection item type.
	 */
	export abstract class Counter<T> extends Class {
		private _targetCreated: boolean;

		/**
		 * @hidden
		 */
		protected _filterItem: (item: T) => boolean;

		/**
		 * @hidden
		 */
		protected _scope: any;

		/**
		 * Target property.
		 */
		target: Property<number>;

		/**
		 * Creates synchronizer.
		 * [[JW.AbstractCollection.createCounter|createCounter]] method is preferred instead.
		 *
		 * @param source Source collection.
		 * @param config Configuration.
		 */
		constructor(public source: AbstractCollection<T>, config: Counter.Config<T>) {
			super();
			this._filterItem = config.filterItem;
			this._scope = config.scope || this;
			this._targetCreated = config.target == null;
			this.target = this._targetCreated ? new Property<number>(0) : config.target;
			this.target.set(source.count(this._filterItem, this._scope));
		}

		/**
		 * @inheritdoc
		 */
		protected destroyObject() {
			this.target.set(0);
			if (this._targetCreated) {
				this.target.destroy();
			}
			this.source = null;
			this._filterItem = null;
			this.target = null;
			this._scope = null;
			super.destroyObject();
		}

		/**
		 * Changes counter configuration and recounts matching items.
		 * @param config Options to modify.
		 */
		reconfigure(config: Counter.Reconfig<T>) {
			this._filterItem = config.filterItem || this._filterItem;
			this._scope = config.scope || this._scope;
			this.recount();
		}

		/**
		 * Recounts matching items. Call this method when collection item properties change the way that
		 * they must be refiltered.
		 */
		recount() {
			this.target.set(this.source.count(this._filterItem, this._scope));
		}
	}

	export module Counter {
		/**
		 * [[Counter]] configuration.
		 *
		 * @param T Collection item type.
		 */
		export interface Config<T> {
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

		/**
		 * [[Counter]]'s [[Counter.reconfigure|reconfigure]] method options.
		 * All options are optional. If skipped, an option stays the same.
		 *
		 * @param T Collection item type.
		 */
		export interface Reconfig<T> {
			/**
			 * Filtering criteria.
			 */
			filterItem?: (item: T) => boolean;

			/**
			 * [[filterItem]] call scope.
			 */
			scope?: any;
		}
	}

	/**
	 * Collection filterer.
	 * Builds new collection of the same type, consisting of items for which callback
	 * function returns !== false.
	 * If original collection is observable, starts continuous synchronization.
	 * Keeps item order in array.
	 *
	 *     var source = new JW.ObservableArray<number>([1, 2, 3]);
	 *     var filterer = source.createFilterer({
	 *         filterItem: function(x) { return x % 2 === 1; }
	 *     });
	 *     var target = filterer.target;
	 *     assert.ok(target.equal([1, 3]));
	 *
	 *     source.addAll([4, 7, 1, 6]);
	 *     assert.ok(target.equal([1, 3, 7, 1]));
	 *
	 *     source.move(2, 6); // move "3" item to the end
	 *     assert.ok(target.equal([1, 7, 1, 3]));
	 *
	 *     filterer.destroy();
	 *
	 * Use [[JW.AbstractCollection.createFilterer|createFilterer]] method to create the synchronizer.
	 * The method selects a synchronizer implementation which fits better (simple or observable).
	 *
	 * You can pass target collection in config option:
	 *
	 *     var source = new JW.ObservableSet();
	 *     var target = new JW.Set();
	 *     var filterer = source.createFilterer({
	 *         target: target,
	 *         filterItem: this._filterItem,
	 *         scope: this
	 *     });
	 *
	 * In simple cases, [[JW.AbstractCollection.$$filter|$$filter]] shorthand can be used instead.
	 * It returns the target collection right away:
	 *
	 *     var source = new JW.ObservableArray<number>([1, 2, 3]);
	 *     var target = source.$$filter(function(x) { return x % 2 === 1; });
	 *     assert.ok(target.equal([1, 3]));
	 *
	 *     source.addAll([4, 7, 1, 6]);
	 *     assert.ok(target.equal([1, 3, 7, 1]));
	 *
	 *     source.move(2, 6); // move "3" item to the end
	 *     assert.ok(target.equal([1, 7, 1, 3]));
	 *
	 *     target.destroy();
	 *
	 * Synchronizer rules:
	 *
	 * - Target collection is stored in [[target]] property.
	 * - Filtered items are added to [[target]] immediately on synchronizer initialization.
	 * - All items are removed from [[target]] on synchronizer destruction.
	 * - You can pass target collection in
	 * [[Filterer.Config.target|target]] config option.
	 * In this case, you are responsible for its destruction (though items will be removed
	 * automatically on synchronizer destruction anyway).
	 * - If [[Filterer.Config.target|target]]
	 * is not passed, it will be created automatically. Synchronizer will select
	 * appropriate [[target]] implementation (simple or observable). In this
	 * case, [[target]] will be destroyed automatically on synchronizer destruction.
	 *
	 * **Additional rules for different collection types**
	 *
	 * [[JW.AbstractArray]]:
	 *
	 * - Target collection must be empty before initialization.
	 * - A target collection can be synchronized with one source collection only.
	 *
	 * [[JW.AbstractMap]]:
	 *
	 * - A target collection can be synchronized with multiple source collections, if keys of all items are different.
	 * - You can add items to target collection manually, if their keys differ from source collection keys.
	 *
	 * [[JW.AbstractSet]]:
	 *
	 * - A target collection can be synchronized with multiple source collections, if all items are different.
	 * - You can add items to target collection manually, if they differ from source collection items.
	 *
	 * @param T Collection item type.
	 */
	export abstract class Filterer<T> extends Class {
		private _targetCreated: boolean;

		/**
		 * @hidden
		 */
		protected _filterItem: (item: T) => boolean;

		/**
		 * @hidden
		 */
		protected _scope: any;

		/**
		 * Target collection.
		 */
		target: AbstractCollection<T>;

		/**
		 * Creates synchronizer.
		 * [[JW.AbstractCollection.createFilterer|createFilterer]] method is preferred instead.
		 *
		 * @param source Source collection.
		 * @param config Configuration.
		 */
		constructor(public source: AbstractCollection<T>, config: Filterer.Config<T>) {
			super();
			this._filterItem = config.filterItem;
			this._scope = config.scope || this;
			this._targetCreated = config.target == null;
			this.target = this._targetCreated ? this.source.createEmpty<T>() : config.target;
		}

		/**
		 * @inheritdoc
		 */
		protected destroyObject() {
			if (this._targetCreated) {
				this.target.destroy();
			}
			this.source = null;
			this._filterItem = null;
			this.target = null;
			this._scope = null;
			super.destroyObject();
		}
	}

	export module Filterer {
		/**
		 * [[JW.AbstractCollection.Filterer]] configuration.
		 *
		 * @param T Collection item type.
		 */
		export interface Config<T> {
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
			target?: AbstractCollection<T>;
		}

		/**
		 * [[Filterer]]'s [[Filterer.reconfigure|reconfigure]] method options.
		 * All options are optional. If skipped, an option stays the same.
		 *
		 * @param T Collection item type.
		 */
		export interface Reconfig<T> {
			/**
			 * Filtering criteria.
			 */
			filterItem?: (item: T) => boolean;

			/**
			 * [[filterItem]] call scope.
			 */
			scope?: any;
		}
	}

	/**
	 * Collection indexer.
	 * Builds new map by rule: key is the result of indexer function call, value is the corresponding item.
	 * If original collection is observable, starts continuous synchronization.
	 * Can be used for fast item search by key (for example, by ID).
	 *
	 *     interface Item {
	 *         id: number;
	 *         label: string;
	 *     }
	 *
	 *     var array = new JW.ObservableArray<Item>([{id: 9, label: "The item"}]);
	 *     var indexer = array.createIndexer({
	 *         getKey: function(item) { return String(item.id); },
	 *         scope: this
	 *     });
	 *     var map = indexer.target;
	 *
	 *     // Get an item with ID = 9
	 *     assert.strictEqual(map.get(9).label, "The item");
	 *     assert.strictEqual(map.get(5), undefined);
	 *
	 *     // Target map is automatically synchronized with original observable array
	 *     array.add({id: 5, label: "New item"});
	 *     assert.strictEqual(map.get(5).label, "New item");
	 *
	 *     indexer.destroy();
	 *
	 * **Notice:** All items of source collection must have different (unique) string keys.
	 *
	 * Use [[JW.AbstractCollection.createFilterer|createFilterer]] method to create the synchronizer.
	 * The method selects a synchronizer implementation which fits better (simple or observable).
	 *
	 * You can pass target map in config option:
	 *
	 *     var map = new JW.Map();
	 *     var indexer = collection.createIndexer({
	 *         target: map,
	 *         getKey: function(item) { return String(item.id); },
	 *         scope: this
	 *     });
	 *
	 * In simple cases, [[JW.AbstractCollection.$$index|$$index]] shorthand can be used instead.
	 * It returns the target map right away:
	 *
	 *     var array = new JW.ObservableArray<Item>([{id: 9, label: "The item"}]);
	 *     var map = array.$$index(function(item) { return String(item.id); });
	 *
	 *     // Get an item with ID = 9
	 *     assert.strictEqual(map.get(9).label, "The item");
	 *     assert.strictEqual(map.get(5), undefined);
	 *
	 *     // Target map is automatically synchronized with original observable array
	 *     array.add({id: 5, label: "New item"});
	 *     assert.strictEqual(map.get(5).label, "New item");
	 *
	 *     map.destroy();
	 *
	 * Synchronizer rules:
	 *
	 * - Target map is stored in [[target]] property.
	 * - All items of source collection are added to [[target]] immediately
	 * on synchronizer initialization.
	 * - All items are removed from [[target]] on synchronizer destruction.
	 * - You can pass target map in
	 * [[Indexer.Config.target|target]] config option.
	 * In this case, you are responsible for its destruction (though items will be removed
	 * automatically on synchronizer destruction anyway).
	 * - If [[Indexer.Config.target|target]]
	 * is not passed, it will be created automatically. Synchronizer will select
	 * appropriate [[target]] implementation (simple or observable). In this
	 * case, [[target]] will be destroyed automatically on synchronizer destruction.
	 * - You can index multiple collections into one map, if keys of all items are different.
	 *
	 * @param T Collection item type.
	 */
	export abstract class Indexer<T> extends Class {
		private _targetCreated: boolean;

		/**
		 * @hidden
		 */
		protected _getKey: (item: T) => string;

		/**
		 * @hidden
		 */
		protected _scope: any;

		/**
		 * Target map.
		 */
		target: AbstractMap<T>;

		/**
		 * Creates synchronizer.
		 * [[JW.AbstractCollection.createIndexer|createIndexer]] method is preferred instead.
		 *
		 * @param source Source collection.
		 * @param config Configuration.
		 */
		constructor(public source: AbstractCollection<T>, config: Indexer.Config<T>) {
			super();
			this._getKey = config.getKey;
			this._scope = config.scope || this;
			this._targetCreated = config.target == null;
			this.target = this._targetCreated ? source.createEmptyMap<T>() : config.target;
			this.target.trySetAll(this._index(source.asArray()));
		}

		/**
		 * @inheritdoc
		 */
		protected destroyObject() {
			this.target.tryRemoveAll(this._keys(this.source.asArray()));
			if (this._targetCreated) {
				this.target.destroy();
			}
			this.source = null;
			this._getKey = null;
			this.target = null;
			this._scope = null;
			super.destroyObject();
		}

		/**
		 * @hidden
		 */
		protected _index(items: T[]): Dictionary<T> {
			var index: Dictionary<T> = {};
			for (var i = 0, l = items.length; i < l; ++i) {
				var item = items[i];
				index[this._getKey.call(this._scope, item)] = item;
			}
			return index;
		}

		/**
		 * @hidden
		 */
		protected _keys(items: T[]): string[] {
			var keys: string[] = [];
			for (var i = 0, l = items.length; i < l; ++i) {
				keys.push(this._getKey.call(this._scope, items[i]));
			}
			return keys;
		}
	}

	export module Indexer {
		/**
		 * [[JW.AbstractCollection.Indexer]] configuration.
		 *
		 * @param T Collection item type.
		 */
		export interface Config<T> {
			/**
			 * Indexing function. Determines item key in map.
			 */
			getKey: (item: T) => string;

			/**
			 * [[getKey]] call scope.
			 * Defaults to synchronizer itself.
			 */
			scope?: any;

			/**
			 * Target map. By default, created automatically.
			 */
			target?: AbstractMap<T>;
		}
	}

	/**
	 * Converter to set.
	 * If original collection is observable, starts continuous synchronization.
	 * Can be used for fast item existance detection.
	 *
	 *     // Create two dummy collection items
	 *     var x = new JW.Class();
	 *     var y = new JW.Class();
	 *
	 *     // Initialize collection and synchronizer
	 *     var array = new JW.ObservableArray<JW.Class>([x]);
	 *     var lister = array.createLister();
	 *     var set = lister.target;
	 *
	 *     assert.ok(set.contains(x));
	 *     assert.ok(!set.contains(y));
	 *
	 *     // Target set is automatically synchronized with original observable array
	 *     array.add(y);
	 *     assert.ok(set.contains(y));
	 *
	 *     lister.destroy();
	 *
	 * **Notice:** All items of source collection must be different (i.e. have unique _iid).
	 *
	 * Use [[JW.AbstractCollection.createLister|createLister]] method to create the synchronizer.
	 * The method selects a synchronizer implementation which fits better (simple or observable).
	 *
	 * You can pass target collection in config option:
	 *
	 *     var set = new JW.Set<JW.Class>();
	 *     var lister = collection.createLister({
	 *         target: set
	 *     });
	 *
	 * In simple cases, [[JW.AbstractCollection.$$toSet|$$toSet]] shorthand can be used instead.
	 * It returns the target set right away:
	 *
	 *     // Create two dummy collection items
	 *     var x = new JW.Class();
	 *     var y = new JW.Class();
	 *
	 *     // Initialize collections
	 *     var array = new JW.ObservableArray<JW.Class>([x]);
	 *     var set = array.$$toSet();
	 *
	 *     assert.ok(set.contains(x));
	 *     assert.ok(!set.contains(y));
	 *
	 *     // Target set is automatically synchronized with original observable array
	 *     array.add(y);
	 *     assert.ok(set.contains(y));
	 *
	 *     set.destroy();
	 *
	 * Synchronizer rules:
	 *
	 * - Target set is stored in [[target]] property.
	 * - All items of source collection are added to [[target]] immediately on synchronizer initialization.
	 * - All items are removed from [[target]] on synchronizer destruction.
	 * - You can pass target set in
	 * [[Lister.Config.target|target]] config option.
	 * In this case, you are responsible for its destruction (though items will be removed
	 * automatically on synchronizer destruction anyway).
	 * - If [[Lister.Config.target|target]]
	 * is not passed, it will be created automatically. Synchronizer will select
	 * appropriate [[target]] implementation (simple or observable). In this
	 * case, [[target]] will be destroyed automatically on synchronizer destruction.
	 * - You can convert multiple collections into one set, if all items are different.
	 *
	 * @param T Collection item type.
	 */
	export abstract class Lister<T extends Class> extends Class {
		private _targetCreated: boolean;

		/**
		 * Target set.
		 */
		target: AbstractSet<T>;

		/**
		 * Creates synchronizer.
		 * [[JW.AbstractCollection.createLister|createLister]] method is preferred instead.
		 *
		 * @param source Source collection.
		 * @param config Configuration.
		 */
		constructor(public source: AbstractCollection<T>, config: Lister.Config<T> = {}) {
			super();
			this._targetCreated = config.target == null;
			this.target = this._targetCreated ? source.createEmptySet<T>() : config.target;
			this.target.tryAddAll(source.asArray());
		}

		/**
		 * @inheritdoc
		 */
		protected destroyObject() {
			this.target.tryRemoveAll(this.source.asArray());
			if (this._targetCreated) {
				this.target.destroy();
			}
			this.source = null;
			this.target = null;
			super.destroyObject();
		}
	}

	export module Lister {
		/**
		 * [[JW.AbstractCollection.Lister]] configuration.
		 *
		 * @param T Collection item type.
		 */
		export interface Config<T extends Class> {
			/**
			 * Target set. By default, created automatically.
			 */
			target?: AbstractSet<T>;
		}
	}

	/**
	 * Collection item converter.
	 * Builds new collection of the same type, consisting of results of callback function
	 * call for each collection item.
	 * If original collection is observable, starts continuous synchronization.
	 *
	 *     var source = new JW.ObservableArray<number>([1, 2]);
	 *     var mapper = source.createMapper<number>({
	 *         createItem: function(x) { return 2 * x }
	 *     });
	 *     var target = source.target;
	 *
	 *     assert.strictEqual(target.get(0), 2);
	 *     assert.strictEqual(target.get(1), 4);
	 *
	 *     // Target collection is automatically synchronized with original observable collection
	 *     source.add(3);
	 *     assert.strictEqual(target.get(2), 6);
	 *
	 *     mapper.destroy();
	 *
	 * Can be used for data convertion into view.
	 *
	 *     var mapper = dataCollection.createMapper<View>({
	 *         createItem: (data) => { return new View(this, data); },
	 *         destroyItem: JW.destroy,
	 *         scope: this
	 *     });
	 *     var viewCollection = mapper.target;
	 *
	 * Use [[JW.AbstractCollection.createMapper|createMapper]] method to create the synchronizer.
	 * The method selects a synchronizer implementation which fits better (simple or observable).
	 *
	 * You can pass target collection in config option:
	 *
	 *     var viewCollection = new JW.Array<View>();
	 *     var mapper = dataCollection.createMapper<View>({
	 *         target: viewCollection,
	 *         createItem: (data) => { return new View(this, data); },
	 *         destroyItem: JW.destroy,
	 *         scope: this
	 *     });
	 *
	 * In simple cases, [[JW.AbstractCollection.$$mapValues|$$mapValues]]
	 * and [[JW.AbstractCollection.$$mapObjects|$$mapObjects]] shorthands can be used instead.
	 * They return the target collection right away:
	 *
	 *     var viewCollection = dataCollection.$$mapObjects<View>((data) => {
	 *         return new View(this, data);
	 *     }, this);
	 *
	 *     // Once not needed anymore, destroy
	 *     viewCollection.destroy();
	 *
	 * Synchronizer rules:
	 *
	 * - Target collection is stored in [[target]] property.
	 * - All items of source collection are converted and added to [[target]]
	 * immediately on synchronizer initialization.
	 * - All items are removed from [[target]] and destroyed on synchronizer destruction.
	 * - You can pass target map in
	 * [[Mapper.Config.target|target]] config option.
	 * In this case, you are responsible for its destruction (though items will be removed and destroyed
	 * automatically on synchronizer destruction anyway).
	 * - If [[Mapper.Config.target|target]]
	 * is not passed, it will be created automatically. Synchronizer will select
	 * appropriate [[target]] implementation (simple or observable). In this
	 * case, [[target]] will be destroyed automatically on synchronizer destruction.
	 * - The items are not recreated in target collection on source items reordering/reindexing,
	 * but they are reordered/reindexed according to source collection modification.
	 *
	 * **Additional rules for different collection types**
	 *
	 * [[JW.AbstractArray]]:
	 *
	 * - Target collection must be empty before initialization.
	 * - You can't modify target collection manually and/or create other synchronizers with the same target collection.
	 *
	 * [[JW.AbstractMap]]:
	 *
	 * - A target collection can be synchronized with multiple source collections, if keys of all items are different.
	 * - You can add items to target collection manually, if their keys differ from other collection keys.
	 *
	 * [[JW.AbstractSet]]:
	 *
	 * - A target collection can be synchronized with multiple source collections, if all items are different.
	 * - You can add items to target collection manually, if they differ from other collection items.
	 *
	 * @param T Source collection item type.
	 * @param U Target collection item type.
	 */
	export abstract class Mapper<T, U> extends Class {
		private _targetCreated: boolean;

		/**
		 * @hidden
		 */
		protected _createItem: (data: T) => U;

		/**
		 * @hidden
		 */
		protected _destroyItem: (item: U, data: T) => void;

		/**
		 * @hidden
		 */
		protected _scope: any;

		/**
		 * Target collection.
		 */
		target: AbstractCollection<U>;

		/**
		 * Creates synchronizer.
		 * [[JW.AbstractCollection.createMapper|createMapper]] method is preferred instead.
		 *
		 * @param source Source collection.
		 * @param config Configuration.
		 */
		constructor(public source: AbstractCollection<T>, config: Mapper.Config<T, U>) {
			super();
			this._createItem = config.createItem;
			this._destroyItem = config.destroyItem;
			this._scope = config.scope || this;
			this._targetCreated = config.target == null;
			this.target = this._targetCreated ? this.source.createEmpty<U>() : config.target;
		}

		/**
		 * @inheritdoc
		 */
		protected destroyObject() {
			if (this._targetCreated) {
				this.target.destroy();
			}
			this.source = null;
			this._createItem = null;
			this._destroyItem = null;
			this.target = null;
			this._scope = null;
			super.destroyObject();
		}
	}

	export module Mapper {
		/**
		 * [[JW.AbstractCollection.Mapper]] configuration.
		 *
		 * @param T Source collection item type.
		 * @param U Target collection item type.
		 */
		export interface Config<T, U> {
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
			target?: AbstractCollection<U>;
		}
	}

	/**
	 * Collection observer. Listens all collection events and reduces them to 2 granular functions:
	 * item is added and item is removed. In optimization purposes, you can define a third function: collection is cleared
	 * (in case if there is more effective clearing algorithm than iterative items deletion).
	 * Also, you can define a function which is called on each collection modification.
	 * For example, this synchronizer can be used to notify the items if they are added to collection.
	 *
	 *     var observer = collection.createObserver({
	 *         addItem: function(item) { item.setInCollection(true); },
	 *         removeItem: function(item) { item.setInCollection(false); },
	 *         scope: this
	 *     });
	 *
	 * Use [[JW.AbstractCollection.createObserver|createObserver]] method to create the synchronizer.
	 * The method selects a synchronizer implementation which fits better (simple or observable).
	 *
	 * Just another observer use case: if you have an abstract collection on input (and you don't know whether it is
	 * simple or observable), and you want to listen collection change event if it is observable,
	 * then you can do it meeting OOD principles:
	 *
	 *     var observer = collection.createObserver({
	 *         change: function() { console.log("Collection is changed"); }
	 *     });
	 *
	 * Synchronizer rules:
	 *
	 * - Function [[Observer.Config.addItem|addItem]]
	 * is called for all items of source collection on synchronizer initialization.
	 * - Function [[Observer.Config.clearItems|clearItems]]
	 * is called for collection, or function
	 * [[Observer.Config.removeItem|removeItem]] is called for
	 * all items of source collection on synchronizer destruction.
	 * - Functions [[Observer.Config.addItem|addItem]],
	 * [[Observer.Config.removeItem|removeItem]] and
	 * [[Observer.Config.clearItems|clearItems]] are
	 * not called on source collection reordering/reindexing.
	 *
	 * @param T Collection item type.
	 */
	export abstract class Observer<T> extends Class {
		/**
		 * @hidden
		 */
		protected _addItem: (item: T) => void;

		/**
		 * @hidden
		 */
		protected _removeItem: (item: T) => void;

		/**
		 * @hidden
		 */
		protected _clearItems: (items: T[]) => void;

		/**
		 * @hidden
		 */
		protected _change: () => void;

		/**
		 * @hidden
		 */
		protected _scope: any;

		/**
		 * Creates synchronizer.
		 * [[JW.AbstractCollection.createObserver|createObserver]] method is preferred instead.
		 *
		 * @param source Source collection.
		 * @param config Configuration.
		 */
		constructor(public source: AbstractCollection<T>, config: Observer.Config<T>) {
			super();
			config = config || {};
			this._addItem = config.addItem;
			this._removeItem = config.removeItem;
			this._clearItems = config.clearItems;
			this._change = config.change;
			this._scope = config.scope || this;
			this._addItems(source.asArray());
		}

		/**
		 * @inheritdoc
		 */
		protected destroyObject() {
			this._doClearItems(this.source.asArray());
			this.source = null;
			this._addItem = null;
			this._removeItem = null;
			this._clearItems = null;
			this._change = null;
			this._scope = null;
			super.destroyObject();
		}

		/**
		 * @hidden
		 */
		protected _addItems(items: T[]) {
			if (!this._addItem) {
				return;
			}
			for (var i = 0, l = items.length; i < l; ++i) {
				this._addItem.call(this._scope, items[i]);
			}
		}

		/**
		 * @hidden
		 */
		protected _removeItems(items: T[]) {
			if (!this._removeItem) {
				return;
			}
			for (var i = items.length - 1; i >= 0; --i) {
				this._removeItem.call(this._scope, items[i]);
			}
		}

		/**
		 * @hidden
		 */
		protected _doClearItems(items: T[]) {
			if (items.length === 0) {
				return;
			}
			if (this._clearItems) {
				this._clearItems.call(this._scope, items);
			} else {
				this._removeItems(items);
			}
		}

		/**
		 * @hidden
		 */
		protected _onChange() {
			this._change.call(this._scope);
		}
	}

	export module Observer {
		/**
		 * [[JW.AbstractCollection.Observer]] configuration.
		 *
		 * @param T Collection item type.
		 */
		export interface Config<T> {
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
	}

	/**
	 * Converter to array (orderer). Converts source collection to array.
	 * Adds new items to the end of array.
	 * If original collection is observable, starts continuous synchronization.
	 *
	 *     var map = new JW.ObservableMap<string>({a: "A", b: "B"});
	 *     var orderer = map.createOrderer();
	 *     var array = orderer.target;
	 *
	 *     assert.strictEqual(array.get(0), "A");
	 *     assert.strictEqual(array.get(1), "B");
	 *
	 *     // Target array is automatically synchronized with original observable collection
	 *     map.set("C", "c");
	 *     assert.strictEqual(array.get(2), "C");
	 *
	 *     orderer.destroy();
	 *
	 * **Notice:** All items of source collection must be different.
	 *
	 * Use [[JW.AbstractCollection.createOrderer|createOrderer]] method to create the synchronizer.
	 * The method selects a synchronizer implementation which fits better (simple or observable).
	 *
	 * You can pass target array in config option:
	 *
	 *     var array = new JW.Array();
	 *     var orderer = collection.createOrderer({
	 *         target: array
	 *     });
	 *
	 * In simple cases, [[JW.AbstractCollection.$$toArray|$$toArray]] shorthand can be used instead.
	 * It returns the target array right away:
	 *
	 *     var map = new JW.ObservableMap<string>({a: "A", b: "B"});
	 *     var array = map.$$toArray();
	 *
	 *     assert.strictEqual(array.get(0), "A");
	 *     assert.strictEqual(array.get(1), "B");
	 *
	 *     // Target array is automatically synchronized with original observable collection
	 *     map.set("C", "c");
	 *     assert.strictEqual(array.get(2), "C");
	 *
	 *     array.destroy();
	 *
	 * Synchronizer rules:
	 *
	 * - Target array is stored in [[target]] property.
	 * - All items of source collection are added to [[target]]
	 * immediately on synchronizer initialization.
	 * - All items are removed from [[target]] on synchronizer destruction.
	 * - You can pass target array in [[Orderer.Config.target|target]] config option.
	 * In this case, you are responsible for its destruction (though items will be removed
	 * automatically on synchronizer destruction anyway).
	 * - If [[Orderer.Config.target|target]] is not passed, it will be created automatically. Synchronizer will select
	 * appropriate [[target]] implementation (simple or observable). In this
	 * case, [[target]] will be destroyed automatically on synchronizer destruction.
	 * - You can convert multiple collections into one array, if all items are different.
	 *
	 * @param T Collection item type.
	 */
	export abstract class Orderer<T extends Class> extends Class {
		private _targetCreated: boolean;

		/**
		 * Target array.
		 */
		target: AbstractArray<T>;

		/**
		 * Creates synchronizer.
		 * [[JW.AbstractCollection.createOrderer|createOrderer]] method is preferred instead.
		 *
		 * @param source Source collection.
		 * @param config Configuration.
		 */
		constructor(public source: AbstractCollection<T>, config: Orderer.Config<T> = {}) {
			super();
			this._targetCreated = config.target == null;
			this.target = this._targetCreated ? source.createEmptyArray<T>() : config.target;
			this.target.tryAddAll(source.asArray());
		}

		/**
		 * @inheritdoc
		 */
		protected destroyObject() {
			this.target.removeItems(this.source.asArray());
			if (this._targetCreated) {
				this.target.destroy();
			}
			this.source = null;
			this.target = null;
			super.destroyObject();
		}

		/**
		 * @hidden
		 */
		protected _splice(removedItemsSet: Dictionary<T>, addedItemsSet: Dictionary<T>) {
			var filteredItems = this.target.filter((item) => {
				return !Set.contains(removedItemsSet, item) || Set.contains(addedItemsSet, item);
			});
			var addedItems = Set.$toArray(addedItemsSet).filter((item) => {
				return !Set.contains(removedItemsSet, item);
			});
			this.target.trySplice(
				this.target.detectFilter(filteredItems) || [],
				[new AbstractArray.IndexItems(filteredItems.length, addedItems)]);
		}
	}

	export module Orderer {
		/**
		 * [[JW.AbstractCollection.Orderer]] configuration.
		 *
		 * @param T Collection item type.
		 */
		export interface Config<T extends Class> {
			/**
			 * Target array. By default, created automatically.
			 */
			target?: AbstractArray<T>;
		}
	}

	/**
	 * Converter to array (sorter by comparer).
	 * Converts source collection to array. Adds new items into such locations that target array is always kept in sorted
	 * state. If original collection is observable, starts continuous synchronization.
	 * Sorting is performed by comparing function defined by user.
	 *
	 *     interface Item {
	 *         id: number;
	 *         title: string;
	 *     }
	 *
	 *     var source = new JW.ObservableArray<Item>([
	 *         {title: "apple", id: 3},
	 *         {title: "Carrot", id: 1},
	 *         {title: "Apple", id: 2}
	 *     ]);
	 *
	 *     // Sort by title case-insensitively, and then by id
	 *     var sorter = source.createSorterComparing({
	 *         compare: function(x, y) {
	 *             return JW.cmp(x.title, y.title, true) || JW.cmp(x.id, y.id);
	 *         },
	 *         scope: this
	 *     });
	 *     var target = sorter.target;
	 *
	 *     assert.strictEqual(target.get(0).id, 2); // Apple
	 *     assert.strictEqual(target.get(1).id, 3); // apple
	 *     assert.strictEqual(target.get(2).id, 1); // Carrot
	 *
	 *     // Target array is automatically synchronized with original observable collection
	 *     source.add({title: "Banana", id: 4});
	 *     assert.strictEqual(target.get(0).id, 2); // Apple
	 *     assert.strictEqual(target.get(1).id, 3); // apple
	 *     assert.strictEqual(target.get(2).id, 4); // Banana
	 *     assert.strictEqual(target.get(3).id, 1); // Carrot
	 *
	 *     sorter.destroy();
	 *
	 * Use [[JW.AbstractCollection.createSorterComparing|createSorterComparing]] method to create the synchronizer.
	 * The method selects a synchronizer implementation which fits better (simple or observable).
	 *
	 * You can pass target array in config option:
	 *
	 *     var array = new JW.Array();
	 *     var sorter = collection.createSorterComparing({
	 *         target: array,
	 *         compare: function(x, y) {
	 *             return JW.cmp(x.title, y.title, true) || JW.cmp(x.id, y.id);
	 *         },
	 *         scope: this
	 *     });
	 *
	 * In simple cases, [[JW.AbstractCollection.$$toSortedComparing|$$toSortedComparing]] shorthand can be used instead.
	 * It returns the target array right away:
	 *
	 *     var source = new JW.ObservableArray<Item>([
	 *         {title: "apple", id: 3},
	 *         {title: "Carrot", id: 1},
	 *         {title: "Apple", id: 2}
	 *     ]);
	 *
	 *     // Sort by title case-insensitively, and then by id
	 *     var target = source.$$toSortedComparing(function(x, y) {
	 *         return JW.cmp(x.title, y.title, true) || JW.cmp(x.id, y.id);
	 *     });
	 *
	 *     assert(target.get(0).id === 2); // Apple
	 *     assert(target.get(1).id === 3); // apple
	 *     assert(target.get(2).id === 1); // Carrot
	 *
	 *     // Target array is automatically synchronized with original observable collection
	 *     source.add({title: "Banana", id: 4});
	 *     assert(target.get(0).id === 2); // Apple
	 *     assert(target.get(1).id === 3); // apple
	 *     assert(target.get(2).id === 4); // Banana
	 *     assert(target.get(3).id === 1); // Carrot
	 *
	 *     target.destroy();
	 *
	 * Synchronizer rules:
	 *
	 * - Target array is stored in [[target]] property.
	 * - All items of source collection are added to [[target]]
	 * immediately on synchronizer initialization.
	 * - All items are removed from [[target]] on synchronizer destruction.
	 * - You can pass target array in
	 * [[SorterComparing.Config.target|target]] config option.
	 * In this case, you are responsible for its destruction (though items will be removed
	 * automatically on synchronizer destruction anyway).
	 * - If [[SorterComparing.Config.target|target]]
	 * is not passed, it will be created automatically. Synchronizer will select
	 * appropriate [[target]] implementation (simple or observable). In this
	 * case, [[target]] will be destroyed automatically on synchronizer destruction.
	 * - You can sort multiple collections into one array.
	 *
	 * @param T Collection item type.
	 */
	export abstract class SorterComparing<T> extends Class {
		private _targetCreated: boolean;

		/**
		 * @hidden
		 */
		protected _compare: (x: T, y: T) => number;

		/**
		 * @hidden
		 */
		protected _scope: any;

		/**
		 * @hidden
		 */
		protected _order: number;

		/**
		 * Target array.
		 */
		target: AbstractArray<T>;

		/**
		 * Creates synchronizer.
		 * [[JW.AbstractCollection.createSorterComparing|createSorterComparing]] method is preferred instead.
		 *
		 * @param source Source collection.
		 * @param config Configuration.
		 */
		constructor(public source: AbstractCollection<T>, config: SorterComparing.Config<T>) {
			super();
			this._compare = config.compare || cmp;
			this._order = config.order || 1;
			this._scope = config.scope || this;
			this._targetCreated = config.target == null;
			this.target = this._targetCreated ? source.createEmptyArray<T>() : config.target;
			this._splice([], source.asArray());
		}

		/**
		 * @inheritdoc
		 */
		protected destroyObject() {
			this._splice(this.source.asArray(), []);
			if (this._targetCreated) {
				this.target.destroy();
			}
			this.source = null;
			this.target = null;
			this._compare = null;
			this._scope = null;
			super.destroyObject();
		}

		/**
		 * Resorts target array forcibly. Call this method on sorting factors modification.
		 */
		resort() {
			this.target.sortComparing(this._compare, this._scope, this._order);
		}

		/**
		 * @hidden
		 */
		protected _splice(removedItems: T[], addedItems: T[]) {
			var removedItemsSorted = Array.toSortedComparing(removedItems, this._compare, this._scope, this._order);
			var addedItemsSorted = Array.toSortedComparing(addedItems, this._compare, this._scope, this._order);
			removedItems = array<T>(removedItems.length);
			addedItems = array<T>(addedItems.length);
			var iRemoved = 0;
			var iAdded = 0;
			var jRemoved = 0;
			var jAdded = 0;
			// ignore out the items which are removed and added at the same time
			while ((iRemoved < removedItemsSorted.length) || (iAdded < addedItemsSorted.length)) {
				var removedItem = removedItemsSorted[iRemoved];
				var addedItem = addedItemsSorted[iAdded];
				var c = cmp(removedItem === undefined, addedItem === undefined) ||
					(this._order * this._compare.call(this._scope, removedItem, addedItem));
				if (c < 0) {
					removedItems[jRemoved++] = removedItem;
					++iRemoved;
				} else if (c > 0) {
					addedItems[jAdded++] = addedItem;
					++iAdded;
				} else {
					++iRemoved;
					++iAdded;
				}
			}
			removedItems.splice(jRemoved, removedItems.length - jRemoved);
			addedItems.splice(jAdded, addedItems.length - jAdded);

			var iAdds = 0;
			var addShift = 0;
			var removeParamsList: AbstractArray.IndexCount[] = [];
			var addParamsList: AbstractArray.IndexItems<T>[] = [];
			var removeParams: AbstractArray.IndexCount = null;
			for (var iTarget = 0, lTarget = this.target.getLength(); iTarget < lTarget; ++iTarget) {
				var value = this.target.get(iTarget);
				if (removedItems[Array.binarySearch(removedItems, value, this._compare, this._scope, this._order) - 1] === value) {
					if (!removeParams) {
						removeParams = new AbstractArray.IndexCount(iTarget, 0);
						removeParamsList.push(removeParams);
					}
					++removeParams.count;
					--addShift;
				} else {
					removeParams = null;
					var addParams = new AbstractArray.IndexItems<T>(iTarget + addShift, []);
					while ((iAdds < addedItems.length) && (this._order * this._compare.call(this._scope, addedItems[iAdds], value) < 0)) {
						addParams.items.push(addedItems[iAdds++]);
						++addShift;
					}
					if (addParams.items.length !== 0) {
						addParamsList.push(addParams);
					}
				}
			}
			if (iAdds < addedItems.length) {
				addParamsList.push(new AbstractArray.IndexItems<T>(iTarget + addShift, addedItems.slice(iAdds)));
			}
			this.target.trySplice(removeParamsList, addParamsList);
		}
	}

	export module SorterComparing {
		/**
		 * [[JW.AbstractCollection.SorterComparing]] configuration.
		 *
		 * @param T Collection item type.
		 */
		export interface Config<T> {
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
			target?: AbstractArray<T>;

			/**
			 * Sorting order. Positive number for ascending sorting, negative for descending sorting.
			 * Defaults to 1.
			 */
			order?: number;
		}
	}
}
