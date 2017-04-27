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

import ICollection from './ICollection';
import Listenable from './Listenable';

/**
 * Set is unordered collection optimized for items adding, removal and search. Unlike
 * array and map, set can contain only [[IClass]] instances. Internal set representation is
 * map from [[IClass._iid]] to items themselves.
 *
 * # Set methods
 *
 * **Difference compared to [[ICollection]] is in bold.**
 *
 * Content retrieving:
 *
 * * [[length]] - Collection length property.
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
 * * [[each]], [[forEach]] - Iterates items through.
 * * [[search]] - Finds item by criteria.
 * Returns first item matching the criteria.
 * * [[filter]], [[filter]] - Filters collection by criteria.
 * Builds new collection of the same type, consisting of items matching the criteria.
 * * [[count]], [[$count]] - Counts the items matching criteria.
 * * [[map]], [[map]] - Maps collection items.
 * Builds new collection of the same type, consisting of results of mapping function call for each collection item.
 * * [[toSorted]], [[$toSorted]], [[toSortedComparing]], [[$toSortedComparing]] -
 * Builds array consisting of collection items sorted by indexer or comparer.
 * * [[index]], [[$index]] - Indexes collection.
 * Builds new map by rule: key is the result of indexer function call, value is the corresponding item.
 * * [[toArray]], [[$toArray]] -
 * Builds new array consisting of collection items.
 * * [[toSet]], [[toSet]] -
 * Builds new set consisting of collection items.
 * * [[asArray]], [[$asArray]] - Represents collection as array.
 * * [[asSet]], [[asSet]] - Represents collection as set.
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
 * see [[SetUtils]] functions.
 */
interface ISet<T> extends ICollection<T> {
	/**
	 * All set items. Please note that this is a getter - the internal representation of `Set` is different.
	 */
	readonly items: T[];

	/**
	 * Items are removed from set, items are added to set.
	 * Triggered in result of calling:
	 *
	 * * [[add]]
	 * * [[tryAdd]]
	 * * [[addAll]]
	 * * [[$addAll]]
	 * * [[tryAddAll]]
	 * * [[remove]]
	 * * [[tryRemove]]
	 * * [[removeItem]]
	 * * [[removeAll]]
	 * * [[$removeAll]]
	 * * [[tryRemoveAll]]
	 * * [[removeItems]]
	 * * [[splice]]
	 * * [[trySplice]]
	 * * [[performSplice]]
	 */
	readonly spliceEvent: Listenable<ISet.SpliceEventParams<T>>;

	/**
	 * Set is cleared. Triggered in result of calling:
	 *
	 * * [[clear]]
	 * * [[$clear]]
	 * * [[tryClear]]
	 */
	readonly clearEvent: Listenable<ISet.ItemsEventParams<T>>;

	/**
	 * Set is changed. Triggered right after any another event.
	 */
	readonly changeEvent: Listenable<ISet.EventParams<T>>;

	/**
	 * @inheritdoc
	 */
	contains(item: T): boolean;

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
	filter(callback: (item: T) => boolean, scope?: any): ISet<T>;

	/**
	 * @inheritdoc
	 */
	count(callback: (item: T) => boolean, scope?: any): number;

	/**
	 * @inheritdoc
	 */
	map<U>(callback: (item: T) => U, scope?: any, getKey?: (item: U) => string): ISet<U>;

	/**
	 * @inheritdoc
	 */
	toSet(): ISet<T>;

	/**
	 * @inheritdoc
	 */
	asSet(): ISet<T>;

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
	 * @hidden
	 */
	_tryClear(): T[];

	/**
	 * Removes and adds multiple items in set. Universal optimized granular operation of removal/insertion.
	 * @param removedItems Items to remove.
	 * @param addedItems Items to add.
	 * @returns Splice result. Never returns null or undefined.
	 */
	splice(removedItems: T[], addedItems: T[]): ISet.SpliceResult<T>;

	/**
	 * Removes and adds multiple items in set. Universal optimized granular operation of removal/insertion.
	 * @param removedItems Items to remove.
	 * @param addedItems Items to add.
	 * @returns Splice result.
	 * If collection is not modified, returns undefined.
	 */
	trySplice(removedItems: T[], addedItems: T[]): ISet.SpliceResult<T>;

	/**
	 * @hidden
	 */
	_trySplice(removedItems: T[], addedItems: T[]): ISet.SpliceResult<T>;

	/**
	 * Detects [[splice]] method arguments to adjust set contents to **newItems**.
	 * Determines which items should be removed and which ones should be added.
	 * @param newItems New set contents.
	 * @returns [[splice]] method arguments. If no method call required, returns undefined.
	 */
	detectSplice(newItems: T[]): ISet.SpliceParams<T>;

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
}

export default ISet;

namespace ISet {
	/**
	 * `ISet` event parameters.
	 */
	export interface EventParams<T> extends ICollection.EventParams<T> {
		/**
		 * Event sender.
		 */
		readonly sender: ISet<T>;
	}

	/**
	 * Parameters of `spliceEvent`.
	 */
	export interface SpliceEventParams<T> extends EventParams<T> {
		/**
		 * Result of `splice` method.
		 */
		readonly spliceResult: SpliceResult<T>;
	}

	/**
	 * Parameters of `clearEvent`.
	 */
	export interface ItemsEventParams<T> extends EventParams<T> {
		/**
		 * Old set contents.
		 */
		readonly items: T[];
	}

	/**
	 * [[JW.Set.splice]] method arguments.
	 * Returned by [[JW.Set.detectSplice]] method.
	 *
	 * @param T Item type.
	 */
	export interface SpliceParams<T> {
		/**
		 * Items to remove.
		 */
		readonly removedItems: T[];

		/**
		 * Items to add.
		 */
		readonly addedItems: T[];
	}

	/**
	 * [[JW.Set.splice]] method result.
	 *
	 * @param T Item type.
	 */
	export interface SpliceResult<T> {
		readonly removedItems: T[];
		readonly addedItems: T[];
	}
}
