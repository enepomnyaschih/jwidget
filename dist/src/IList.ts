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
import ICollection from './ICollection';
import IIndexedCollection from './IIndexedCollection';
import Some from './Some';

/**
 * Array is ordered collection. Each item of array has an index. Index of first item is 0,
 * index of each next one is higher by 1.
 *
 * # Array methods
 *
 * **Difference compared to [[IIndexedCollection]] is in bold.**
 *
 * Content retrieving:
 *
 * * [[length]] - Collection length property.
 * * [[isEmpty]] - Checks collection for emptiness.
 * * [[get]] - Returns collection item by index.
 * * [[getFirst]] - Returns first item in collection.
 * * **[[getLast]] - Returns last item in collection.**
 * * [[getFirstKey]] - Returns index of first item in collection.
 * * **[[getLastKey]] - Returns index of last item in collection.**
 * * [[getKeys]], [[$getKeys]] - Returns array of all item indexes.
 * * [[containsItem]] - Does collection contain the item?
 * * [[containsKey]] - Does collection contain the index?
 * * [[keyOf]] - Returns item index. If item is not found, returns undefined.
 * * **[[indexOf]] - Returns item index. If item is not found, return -1.**
 * * **[[getItems]] - Returns internal representation of array.**
 * * **[[binarySearch]] - Finds the index by binary search.**
 *
 * Iteration algorithms:
 *
 * * [[every]] - Checks all items by criteria.
 * Returns true if all items match the criteria.
 * * [[some]] - Checks each item by criteria.
 * Returns true if some item matches the criteria.
 * * [[each]], [[forEach]] - Iterates items.
 * * [[search]] - Finds item by criteria.
 * Returns first item matching the criteria.
 * * [[find]] - Finds item by criteria.
 * Returns index of first item matching the criteria.
 * * [[filter]], [[$filter]] - Filters collection by criteria.
 * Builds new collection of the same type, consisting of items matching the criteria.
 * * [[count]], [[$count]] - Counts the items matching criteria.
 * * [[map]], [[$map]] - Maps collection items.
 * Builds new collection of the same type, consisting of results of mapping function call for each collection item.
 * * [[toSorted]], [[$toSorted]], [[toSortedComparing]], [[$toSortedComparing]] -
 * Builds array consisting of collection items sorted by indexer or comparer.
 * * [[getSortingKeys]], [[$getSortingKeys]],
 * [[getSortingKeysComparing]], [[$getSortingKeysComparing]] -
 * Returns indexes of collection items sorted by indexer or comparer.
 * * [[index]], [[$index]] - Indexes collection.
 * Builds new map by rule: key is the result of indexer function call, value is the corresponding item.
 * * [[toArray]], [[$toArray]] - Builds new array consisting of collection items.
 * * [[toDictionary]], [[toMap]] - Builds new map consisting of collection items.
 * * [[toSet]], [[$toSet]] - Builds new set consisting of collection items.
 * * [[asArray]], [[$asArray]] - Represents collection as array.
 * * [[asDictionary]], [[asMap]] - Represents collection as map.
 * * [[asSet]], [[$asSet]] - Represents collection as set.
 * * **[[backEvery]] - Checks all items by criteria in backward order.**
 * * **[[merge]], [[$merge]] - *suitable if array consists of JW.List instances only.*
 * Builds array consisting of items of subarrays in the same order.**
 * * **[[toReversed]], [[$toReversed]] - Builds array consisting of collection items in reverse order.**
 *
 * Collection modification:
 *
 * * **[[add]], [[tryAdd]] - Inserts an item.**
 * * **[[addAll]], [[tryAddAll]] - Inserts item range.**
 * * [[set]], [[trySet]] - Replaces an item by index.
 * * [[remove]], [[tryRemove]] - Removes an item by index.
 * * **[[removeAll]], [[$removeAll]],
 * [[tryRemoveAll]] - Removes item range.**
 * * [[removeItem]] - Removes first occurency of an item in collection.
 * * [[removeItems]] - Removes all occurencies of items in collection.
 * * **[[pop]] - Removes last item.**
 * * **[[move]], [[tryMove]] - Moves item.**
 * * [[clear]], [[$clear]],
 * [[tryClear]] - Clears collection.
 * * **[[splice]], [[trySplice]] - Removes/inserts item ranges.**
 * * **[[reorder]], [[tryReorder]] - Reorders items.**
 * * **[[sort]], [[sortComparing]] - Sorts array.**
 * * **[[reverse]] - Reverses item order in array.**
 * * **[[performSplice]] - Adjusts contents using [[splice]]. method.**
 * * **[[performFilter]] - Filters contents using [[splice]]. method.**
 * * **[[performReorder]] - Adjusts contents using [[reorder]]. method.**
 *
 * Similar collection creation (for algorithms and synchronizers implementation):
 *
 * * [[createEmpty]] - Creates empty collection of the same type.
 * * [[createEmptyArray]] - Creates empty array of the same observability level.
 * * [[createEmptyMap]] - Creates empty map of the same observability level.
 * * [[createEmptySet]] - Creates empty set of the same observability level.
 *
 * Other methods:
 *
 * * **[[detectSplice]] - Detects [[splice]] method arguments to adjust contents.**
 * * **[[detectFilter]] - Detects removeParamsList argument of [[splice]] method to filter contents.**
 * * **[[detectReorder]] - Detects [[reorder]] method arguments to adjust contents.**
 * * **[[detectSort]] - Detects [[reorder]] method arguments to sort by indexer.**
 * * **[[detectSortComparing]] - Detects [[reorder]] method arguments to sort by comparer.**
 * * **[[collapse]] - Collapses multi-dimensional array.**
 * * **[[equal]] - Checks for equality to another array.**
 *
 * All the same algorithms are also available for native JavaScript Array,
 * see [[ArrayUtils]] functions.
 *
 * @param T Array item type.
 */
interface IList<T> extends IIndexedCollection<number, T> {
	/**
	 * Returns the last collection item. If collection is empty, returns undefined.
	 */
	readonly last: T;

	/**
	 * Returns index of last collection item. If collection is empty, returns undefined.
	 */
	readonly lastKey: number;

	/**
	 * Item array - internal collection representation.
	 *
	 * **Caution: doesn't make a copy - please don't modify.**
	 */
	readonly items: T[];

	/**
	 * Items are removed from array and items are added to array. Triggered in result
	 * of calling:
	 *
	 * * [[add]]
	 * * [[tryAdd]]
	 * * [[addAll]]
	 * * [[tryAddAll]]
	 * * [[remove]]
	 * * [[tryRemove]]
	 * * [[removeItem]]
	 * * [[pop]]
	 * * [[removeAll]]
	 * * [[tryRemoveAll]]
	 * * [[removeItems]]
	 * * [[splice]]
	 * * [[trySplice]]
	 * * [[performSplice]]
	 */
	readonly spliceEvent: Listenable<IList.SpliceEventParams<T>>;

	/**
	 * Item is replaced in array. Triggered in result of calling:
	 *
	 * * [[set]]
	 * * [[trySet]]
	 */
	readonly replaceEvent: Listenable<IList.ReplaceEventParams<T>>;

	/**
	 * Item is moved in array. Triggered in result of calling:
	 *
	 * * [[move]]
	 * * [[tryMove]]
	 */
	readonly moveEvent: Listenable<IList.MoveEventParams<T>>;

	/**
	 * Array is cleared. Triggered in result of calling:
	 * * [[clear]]
	 * * [[$clear]]
	 * * [[tryClear]]
	 */
	readonly clearEvent: Listenable<IList.ItemsEventParams<T>>;

	/**
	 * Items are reordered in array. Triggered in result of calling:
	 *
	 * * [[reorder]]
	 * * [[tryReorder]]
	 * * [[performReorder]]
	 * * [[sort]]
	 * * [[sortComparing]]
	 */
	readonly reorderEvent: Listenable<IList.ReorderEventParams<T>>;

	/**
	 * Array is changed. Triggered right after any another event.
	 */
	readonly changeEvent: Listenable<IList.EventParams<T>>;

	/**
	 * Function which returns unique key of an item in this collection.
	 * Function is used in [[detectSplice]],
	 * [[performSplice]],
	 * [[detectReorder]],
	 * [[performReorder]] algorithms.
	 * Defaults to [[iid]], so
	 * if collection contains instances of JW.Class, you are in a good shape.
	 */
	getKey: (item: T) => any;

	/**
	 * @inheritdoc
	 */
	get(index: number): T;

	/**
	 * Returns array of indexes of all collection items, i.e. array `[0, 1, ... , length - 1]`.
	 */
	getKeys(): number[];

	/**
	 * @inheritdoc
	 */
	containsItem(item: T): boolean;

	/**
	 * @inheritdoc
	 */
	every(callback: (item: T, index: number) => boolean, scope?: any): boolean;

	/**
	 * @inheritdoc
	 */
	toSorted(callback?: (item: T, key: number) => any, scope?: any, order?: number): T[];

	/**
	 * @inheritdoc
	 */
	toSortedComparing(compare?: (t1: T, t2: T, k1: number, k2: number) => number, scope?: any, order?: number): T[];

	/**
	 * @inheritdoc
	 */
	getSortingKeys(callback?: (item: T, key: number) => any, scope?: any, order?: number): number[];

	/**
	 * @inheritdoc
	 */
	getSortingKeysComparing(compare?: (t1: T, t2: T, k1: number, k2: number) => number, scope?: any, order?: number): number[];

	/**
	 * @inheritdoc
	 */
	filter(callback: (item: T, index: number) => boolean, scope?: any): T[];

	/**
	 * @inheritdoc
	 */
	$filter(callback: (item: T, index: number) => boolean, scope?: any): IList<T>;

	/**
	 * @inheritdoc
	 */
	count(callback: (item: T, index: number) => boolean, scope?: any): number;

	/**
	 * @inheritdoc
	 */
	map<U>(callback: (item: T, index: number) => U, scope?: any): U[];

	/**
	 * @inheritdoc
	 */
	$map<U>(callback: (item: T, index: number) => U, scope?: any): IList<U>;

	/**
	 * @inheritdoc
	 */
	toArray(): T[];

	/**
	 * @inheritdoc
	 */
	asArray(): T[];

	/**
	 * @inheritdoc
	 */
	asList(): IList<T>;

	/**
	 * Inserts an item to array.
	 *
	 * @param item Item to insert.
	 * @param index Index of an item before which to insert new one.
	 * By default, appends the item to the end of collection.
	 */
	add(item: T, index?: number): void;

	/**
	 * Inserts an item to array.
	 *
	 * @param item Item to insert.
	 * @param index Index of an item before which to insert new one.
	 * By default, appends the item to the end of collection.
	 * @returns Always returns true.
	 */
	tryAdd(item: T, index?: number): boolean;

	/**
	 * Inserts item range to array.
	 *
	 * @param items Items to insert.
	 * @param index Index of an item before which to insert new ones.
	 * By default, appends the items to the end of collection.
	 */
	addAll(items: T[], index?: number): void;

	/**
	 * Inserts item range to array.
	 *
	 * @param items Items to insert.
	 * @param index Index of an item before which to insert new ones.
	 * By default, appends the items to the end of collection.
	 * @returns Always returns true.
	 */
	tryAddAll(items: T[], index?: number): boolean;

	/**
	 * Replaces item at specified position.
	 * If array doesn't contain such index, it will demolish the application.
	 *
	 * @returns The replaced item. If collection is not modified, returns undefined.
	 */
	trySet(item: T, index: number): Some<T>;

	/**
	 * Removes item at specified position.
	 * If array doesn't contain such index, it will demolish the application.
	 *
	 * @returns The removed item. If collection is not modified, returns undefined.
	 */
	tryRemove(index: number): T;

	/**
	 * Removes item range from array.
	 *
	 * @param index Index of first item to remove.
	 * @param count Count of items to remove.
	 * @returns The removed items.
	 */
	removeAll(index: number, count: number): T[];

	/**
	 * Removes item range from array.
	 *
	 * @param index Index of first item to remove.
	 * @param count Count of items to remove.
	 * @returns The removed items.
	 */
	$removeAll(index: number, count: number): IList<T>;

	/**
	 * Removes item range from array.
	 *
	 * @param index Index of first item to remove.
	 * @param count Count of items to remove.
	 * @returns The removed items. If collection is not modified, returns undefined.
	 */
	tryRemoveAll(index: number, count: number): T[];

	/**
	 * @inheritdoc
	 */
	removeItems(items: T[]): void;

	/**
	 * Moves an item inside array.
	 *
	 * @param fromIndex Item index to move.
	 * @param toIndex Index to move to.
	 * @returns The moved item.
	 */
	move(fromIndex: number, toIndex: number): T;

	/**
	 * Moves an item inside array.
	 *
	 * @param fromIndex Item index to move.
	 * @param toIndex Index to move to.
	 * @returns The moved item. If collection is not modified, returns undefined.
	 */
	tryMove(fromIndex: number, toIndex: number): T;

	/**
	 * @inheritdoc
	 */
	clear(): T[];

	/**
	 * @inheritdoc
	 */
	$clear(): IList<T>;

	/**
	 * @inheritdoc
	 */
	tryClear(): T[];

	/**
	 * Removes and inserts item ranges. Universal optimized granular operation of removal/insertion.
	 *
	 * @param removeParamsList Array of segments to remove sorted by index asc. Segments are removed in backward order.
	 * @param addParamsList Array of segments to insert sorted by index asc. Segments are inserted in forward order.
	 * @returns Splice result. Never returns null or undefined.
	 */
	splice(removeParamsList: IList.IndexCount[], addParamsList: IList.IndexItems<T>[]): IList.SpliceResult<T>;

	/**
	 * Removes and inserts item ranges. Universal optimized granular operation of removal/insertion.
	 *
	 * @param removeParamsList Array of segments to remove sorted by index asc. Segments are removed in backward order.
	 * @param addParamsList Array of segments to insert sorted by index asc. Segments are inserted in forward order.
	 * @returns Splice result. If collection is not modified, returns undefined.
	 */
	trySplice(removeParamsList: IList.IndexCount[], addParamsList: IList.IndexItems<T>[]): IList.SpliceResult<T>;

	/**
	 * Reorders array items.
	 *
	 * @param indexArray Index array. Item with index `i` will be moved to index `indexArray[i]`.
	 * Must contain all indexes from 0 to (length - 1).
	 */
	reorder(indexArray: number[]): void;

	/**
	 * Reorders array items.
	 *
	 * @param indexArray Index array. Item with index `i` will be moved to index `indexArray[i]`.
	 * Must contain all indexes from 0 to (length - 1).
	 * @returns Old array contents. If collection is not modified, returns undefined.
	 */
	tryReorder(indexArray: number[]): T[];

	/**
	 * Detects [[splice]] method arguments to adjust array contents to **newItems**.
	 * Determines which item ranges should be removed and which ones should be inserted.
	 * All items must have unique **getKey** function result.
	 * If items don't have unique key, probably [[detectFilter]] method may help,
	 * because it doesn't require item uniquiness.
	 *
	 * @param newItems New array contents.
	 * @param getKey Function which returns unique key of an item in this collection.
	 * Defaults to [[getKey]].
	 * If collection consists of instances of [[IClass]], then you are in a good shape.
	 * @param scope **getKey** call scope. Defaults to collection itself.
	 * @returns [[splice]] method arguments. If no method call required, returns undefined.
	 */
	detectSplice(newItems: T[], getKey?: (item: T) => any, scope?: any): IList.SpliceParams<T>;

	/**
	 * Detects **removeParamsList** arguments of [[splice]] to adjust array contents to **newItems**.
	 * Determines which item ranges should be removed.
	 * Doesn't assume items insertion - try [[detectSplice]] if that's the case.
	 * In advantage to [[detectSplice]], doesn't require item uniquiness.
	 *
	 * @param newItems New array contents.
	 * @returns **removeParamsList** argument of [[splice]] method.
	 * If no method call required, returns undefined.
	 */
	detectFilter(newItems: T[]): IList.IndexCount[];

	/**
	 * Detects [[reorder]] method arguments to adjust array contents to **newItems**.
	 * Determines where to move all items.
	 * If **newItems** contents differ from collection contents,
	 * you should pray to Gods that application still works well.
	 *
	 * @param newItems New array contents.
	 * @param getKey Function which returns unique key of an item in this collection.
	 * Defaults to [[getKey]].
	 * If collection consists of instances of [[IClass]], then it's all right.
	 * @param scope **getKey** call scope. Defaults to collection itself.
	 * @returns **indexArray** argument of [[reorder]] method.
	 * If no method call required, returns undefined.
	 */
	detectReorder(newItems: T[], getKey?: (item: T) => any, scope?: any): number[];

	/**
	 * Detects [[reorder]] method arguments to sort array contents by result of
	 * **callback** call for each item.
	 *
	 * @param callback Indexer function. Must return a comparable value, compatible with
	 * [[JW.cmp]]. Returns item itself by default.
	 * @param scope **callback** call scope. Defaults to collection itself.
	 * @param order Sorting order. Positive number for ascending sorting, negative for descending sorting.
	 * @returns **indexArray** argument of [[reorder]] method.
	 * If no method call required, returns undefined.
	 */
	detectSort(callback?: (item: T, index: number) => any, scope?: any, order?: number): number[];

	/**
	 * Detects [[reorder]] method arguments to sort array contents by comparer.
	 *
	 * @param compare Comparer function. Should return positive value if t1 > t2;
	 * negative value if t1 < t2; 0 if t1 == t2.
	 * Defaults to [[cmp]]
	 * @param scope **comparer** call scope. Defaults to collection itself.
	 * @param order Sorting order. Positive number for ascending sorting, negative for descending sorting.
	 * @returns **indexArray** argument of [[reorder]] method.
	 * If no method call required, returns undefined.
	 */
	detectSortComparing(compare?: (t1: T, t2: T, i1: number, i2: number) => number, scope?: any, order?: number): number[];

	/**
	 * Adjusts array contents to **newItems** using [[detectSplice]] and
	 * [[splice]] methods.
	 * All items must have unique **getKey** function result.
	 * If items don't have unique key, probably [[detectFilter]] method may help,
	 * because it doesn't require item uniquiness.
	 *
	 * @param newItems New array contents.
	 * @param getKey Function which returns unique key of an item in this collection.
	 * Defaults to [[getKey]].
	 * If collection consists of instances of [[IClass]], then you are in a good shape.
	 * @param scope **getKey** call scope. Defaults to collection itself.
	 */
	performSplice(newItems: T[], getKey?: (item: T) => any, scope?: any): void;

	/**
	 * Adjusts array contents to **newItems** using [[detectFilter]] and
	 * [[splice]] methods.
	 * Only removes items.
	 * Doesn't assume items insertion - try [[detectSplice]] if that's the case.
	 * In advantage to [[detectSplice]], doesn't require item uniquiness.
	 *
	 * @param newItems New array contents.
	 */
	performFilter(newItems: T[]): void;

	/**
	 * Adjusts array contents to **newItems** using [[detectReorder]] and
	 * [[reorder]] methods.
	 *
	 * @param newItems New array contents.
	 * @param getKey Function which returns unique key of an item in this collection.
	 * Defaults to [[getKey]].
	 * If collection consists of instances of [[IClass]], then it's all right.
	 * @param scope **getKey** call scope. Defaults to collection itself.
	 */
	performReorder(newItems: T[], getKey?: (item: T) => any, scope?: any): void;

	/**
	 * Sorts array by result of **callback** function call for each item.
	 *
	 * @param callback Indexer function. Must return a comparable value, compatible with
	 * [[cmp]]. Returns item itself by default.
	 * @param scope **callback** call scope. Defaults to collection itself.
	 * @param order Sorting order. Positive number for ascending sorting, negative for descending sorting.
	 */
	sort(callback?: (item: T, index: number) => any, scope?: any, order?: number): void;

	/**
	 * Sorts array by comparer.
	 *
	 * @param compare Comparer function. Should return positive value if t1 > t2;
	 * negative value if t1 < t2; 0 if t1 == t2.
	 * Defaults to [[cmp]]
	 * @param scope **comparer** call scope. Defaults to collection itself.
	 * @param order Sorting order. Positive number for ascending sorting, negative for descending sorting.
	 */
	sortComparing(compare?: (t1: T, t2: T, i1: number, i2: number) => number, scope?: any, order?: number): void;

	/**
	 * Reverses item order in array. Modifies the array itself.
	 */
	reverse(): void;

	/**
	 * Builds a new array containing items of this array in reversed order.
	 * Current array is not modified.
	 *
	 * @returns Reversed array.
	 */
	toReversed(): T[];

	/**
	 * Builds a new array containing items of this array in reversed order.
	 * Current array is not modified.
	 *
	 * @returns Reversed array.
	 */
	$toReversed(): IList<T>;

	/**
	 * Checks for equality (===) to another array, item by item.
	 *
	 * @param arr Another array.
	 * @returns Arrays are equal.
	 */
	equal(arr: T[]): boolean;

	/**
	 * Collapses multi-dimentional array.
	 *
	 * @param depth Dimentions to collapse.
	 * @returns Collapsed array.
	 */
	collapse(depth: number): any[];

	/**
	 * Returns item index in this collection.
	 *
	 * @returns Item index. If item doesn't exist, returns -1.
	 */
	indexOf(item: T): number;

	/**
	 * Checks all items against criteria in backward order.
	 *
	 * Returns true if criteria returns !== false for all collection items.
	 *
	 * Algorithms iterates items sequentially, and stops after first item not matching the criteria.
	 *
	 * @param callback Criteria callback.
	 * @param scope **callback** call scope. Defaults to collection itself.
	 */
	backEvery(callback: (item: T, index: number) => boolean, scope?: any): boolean;

	/**
	 * Removes last array item. Does nothing if array is empty.
	 *
	 * @returns The removed item or undefined.
	 */
	pop(): T;

	/**
	 * Determines index of first item which is more (or less if **order** < 0) than specified value by **compare** function,
	 * using binary search. Array must be sorted by **compare** function.
	 * Can be used for item insertion easily.
	 * If you want to use this method for item removal, you must look at previous item and compare it to **value** first.
	 *
	 * @param compare Comparer function. Should return positive value if t1 > t2;
	 * negative value if t1 < t2; 0 if t1 == t2.
	 * Defaults to [[cmp]]
	 * @param scope **comparer** call scope. Defaults to collection itself.
	 * @param order Sorting order. Positive number for ascending sorting, negative for descending sorting.
	 * @returns Item index.
	 */
	binarySearch(value: T, compare?: (t1: T, t2: T) => number, scope?: any, order?: number): number;
}

export default IList;

namespace IList {
	/**
	 * `IList` event parameters.
	 */
	export interface EventParams<T> extends ICollection.EventParams<T> {
		/**
		 * Event sender.
		 */
		readonly sender: IList<T>;
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
	 * Parameters of `moveEvent`.
	 */
	export interface MoveEventParams<T> extends EventParams<T> {
		/**
		 * Where item is moved from.
		 */
		readonly fromIndex: number;

		/**
		 * Where item is moved to.
		 */
		readonly toIndex: number;

		/**
		 * The moved item.
		 */
		readonly item: T;
	}

	/**
	 * Parameters of `replaceEvent`.
	 */
	export interface ReplaceEventParams<T> extends EventParams<T> {
		/**
		 * Index of the replaced item.
		 */
		readonly index: number;

		/**
		 * Old item.
		 */
		readonly oldItem: T;

		/**
		 * New item.
		 */
		readonly newItem: T;
	}

	/**
	 * Parameters of `clearEvent`.
	 */
	export interface ItemsEventParams<T> extends EventParams<T> {
		/**
		 * Old array contents.
		 */
		readonly items: T[];
	}

	/**
	 * Parameters of `reorderEvent`.
	 */
	export interface ReorderEventParams<T> extends ItemsEventParams<T> {
		/**
		 * Indexes of items in reordered array.
		 */
		readonly indexArray: number[];
	}

	/**
	 * [[JW.List.splice|splice]] method arguments.
	 * Returned by [[JW.List.detectSplice|detectSplice]] method.
	 *
	 * @param T Item type.
	 */
	export interface SpliceParams<T> {
		/**
		 * Segments to remove.
		 */
		readonly removeParamsList: IndexCount[];

		/**
		 * Segments to add.
		 */
		readonly addParamsList: IndexItems<T>[];
	}

	/**
	 * [[JW.List.splice|splice]] method result.
	 *
	 * @param T Item type.
	 */
	export interface SpliceResult<T> {
		/**
		 * Old array contents.
		 */
		readonly oldItems: T[];

		/**
		 * Removed item segments.
		 */
		readonly removedItemsList: IndexItems<T>[];

		/**
		 * @param addedItemsList Added item segments.
		 */
		readonly addedItemsList: IndexItems<T>[];

		/**
		 * Returns plain array of removed items.
		 */
		readonly removedItems: T[];

		/**
		 * Returns plain array of added items.
		 */
		readonly addedItems: T[];

		/**
		 * Converts removed item segments to "index-count" pairs.
		 */
		readonly removeParamsList: IndexCount[];

		/**
		 * Checks if [[JW.List.splice|splice]] method call didn't change the array.
		 * @returns Array hasn't been changed.
		 */
		readonly empty: boolean;
	}

	/**
	 * "Index-count" pair. Used in [[JW.List.splice|splice]] method arguments
	 * to specify item segments to remove.
	 */
	export interface IndexCount {
		readonly index: number;
		readonly count: number;

		/**
		 * Clones pair.
		 */
		clone(): IndexCount;
	}

	/**
	 * "Index-items" pair. Used in [[JW.List.splice|splice]] method arguments
	 * to specify item segments to insert, and in [[JW.List.SpliceResult|SpliceResult]]
	 * class to specify removed and added item segments.
	 *
	 * @param T Item type.
	 */
	export interface IndexItems<T> {
		readonly index: number;
		readonly items: T[];

		/**
		 * Converts to "index-count" pair.
		 */
		toIndexCount(): IndexCount;

		/**
		 * Clones pair.
		 */
		clone(): IndexItems<T>;
	}
}
