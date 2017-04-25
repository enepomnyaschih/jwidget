/*!
	jWidget 2
	Copyright (C) 2017  Egor Nepomnyaschih
	enepomnyaschih@gmail.com
	https://github.com/enepomnyaschih/jwidget

	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU Lesser General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU Lesser General Public License for more details.

	You should have received a copy of the GNU Lesser General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

import Listenable from './Listenable';
import Class from './Class';
import Dictionary from './Dictionary';
import IList from './IList';
import ICollection from './ICollection';
import IMap from './IMap';
import IProperty from './IProperty';
import ISet from './ISet';
import Property from './Property';
import Watchable from './Watchable';
import * as SetUtils from './SetUtils';

/**
 * Abstract collection.
 *
 * There are 3 collection types:
 *
 * * [[List]],
 * extends [[JW.IndexedCollection]]
 * * [[JW.Map]],
 * extends [[JW.IndexedCollection]]
 * * [[JW.Set]]
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
 *       <td>[[JW.List.Inserter]], [[JW.Map.Inserter]], [[JW.UI.Inserter]]</td>
 *       <td>createInserter</td>
 *     </tr>
 *     <tr>
 *       <td>Arrays merger</td>
 *       <td>[[JW.List.Merger]]</td>
 *       <td>[[$$merge]], [[createMerger]]</td>
 *     </tr>
 *     <tr>
 *       <td>Array reverser</td>
 *       <td>[[JW.List.Reverser]]</td>
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
 * * [[length]] - Collection length property.
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
abstract class AbstractCollection<T> extends Class implements ICollection<T> {
	protected _ownsItems: Boolean = false;
	protected _length: IProperty<number>;

	constructor(silent: boolean) {
		super();
		this._length = this.own(new Property(0, silent));
	}

	protected destroyObject(): void {
		this.tryClear();
		super.destroyObject();
	}

	/**
	 * Checks if this collection never triggers events. This knowledge may help you do certain code optimizations.
	 */
	get silent() {
		return this.changeEvent.dummy;
	}

	/**
	 * Collection length property.
	 */
	get length(): Watchable<number> {
		return this._length;
	}

	/**
	 * Checks collection for emptiness.
	 */
	get empty() {
		return this.length.get() === 0;
	}

	/**
	 * Returns first item in collection. If collection is empty, returns undefined.
	 */
	abstract get first(): T;

	/**
	 * Collection is cleared. Triggered in result of calling:
	 *
	 * * [[clear]]
	 * * [[$clear]]
	 * * [[tryClear]]
	 */
	abstract get clearEvent(): Listenable<ICollection.EventParams<T>>;

	/**
	 * Collection is changed. Triggered right after any another event.
	 */
	abstract get changeEvent(): Listenable<ICollection.EventParams<T>>;

	/**
	 * Makes this collection an owner of its items, which means that its items are alive as long as they are present in
	 * this collection. The item is destroyed when it leaves the
	 * collection, and all items are destroyed on the collection destruction.
	 * @returns this
	 */
	ownItems(): this {
		this._ownsItems = true;
		return this;
	}

	/**
	 * Checks item for existance in collection.
	 */
	abstract containsItem(item: T): boolean;

	/**
	 * Removes first occurrence of an item in collection.
	 */
	abstract removeItem(item: T): void;

	/**
	 * Removes all occurrences of items in collection.
	 * **Known issue:** *Works only if T extends JW.Class!*
	 */
	abstract removeItems(items: T[]): void;

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
	abstract $clear(): ICollection<T>;

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
		return !this.every((item) => {
			return callback.call(scope || this, item) === false;
		});
	}

	/**
	 * Alias for [[forEach]].
	 */
	each(callback: (item: T) => any, scope?: any) {
		this.every((item) => {
			callback.call(scope || this, item);
			return true;
		});
	}

	/**
	 * Iterates collection items. Calls specified function for all items.
	 *
	 * @param callback Callback function.
	 * @param scope **callback** call scope. Defaults to collection itself.
	 */
	forEach(callback: (item: T) => any, scope?: any) {
		this.every((item) => {
			callback.call(scope || this, item);
			return true;
		});
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
		let result: T;
		this.every((item) => {
			if (callback.call(scope || this, item) !== false) {
				result = item;
				return false;
			}
			return true;
		});
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
	abstract $toSorted(callback?: (item: T) => any, scope?: any, order?: number): IList<T>;

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
	abstract $toSortedComparing(compare?: (t1: T, t2: T) => number, scope?: any, order?: number): IList<T>;

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
		let result: Dictionary<T> = {};
		this.every((item) => {
			const key: string = callback.call(scope || this, item);
			if (key != null) {
				result[key] = item;
			}
			return true;
		});
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
	abstract $index(callback: (item: T) => string, scope?: any): IMap<T>;

	/**
	 * Converts collection to array.
	 *
	 * Builds new array consisting of collection items.
	 */
	toArray(): T[] {
		const result: T[] = new Array<T>(this.length.get());
		let index: number = 0;
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
	abstract toList(): IList<T>;

	/**
	 * Converts collection to set.
	 *
	 * Builds new set consisting of collection items.
	 * Requires T to extend JW.Class.
	 */
	toSet(): Dictionary<T> {
		const result: Dictionary<any> = {};
		this.every(function (item) {
			SetUtils.add(result, item);
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
	abstract $toSet(): ISet<any>;

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
	abstract asList(): IList<T>;

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
	abstract $asSet(): ISet<any>;

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
	abstract $filter(callback: (item: T) => boolean, scope?: any): ICollection<T>;

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
	$count(callback: (item: T) => boolean, scope?: any): Watchable<number> {
		return new Property<number>(this.count(callback, scope), true);
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
	abstract $map<U>(callback: (item: T) => U, scope?: any): ICollection<U>;
}

export default AbstractCollection;
