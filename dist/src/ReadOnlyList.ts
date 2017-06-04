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

import Dictionary from './Dictionary';
import Listenable from './Listenable';
import IList from './IList';
import IMap from './IMap';
import ReadOnlyCollection from './ReadOnlyCollection';
import Reducer from './Reducer';

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
 * * [[filter]], [[filter]] - Filters collection by criteria.
 * Builds new collection of the same type, consisting of items matching the criteria.
 * * [[count]], [[$count]] - Counts the items matching criteria.
 * * [[map]], [[map]] - Maps collection items.
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
 * * [[toSet]], [[toSet]] - Builds new set consisting of collection items.
 * * [[asArray]], [[$asArray]] - Represents collection as array.
 * * [[asDictionary]], [[asMap]] - Represents collection as map.
 * * [[asSet]], [[asSet]] - Represents collection as set.
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
interface ReadOnlyList<T> extends ReadOnlyCollection<T> {
	/**
	 * Returns the last collection item. If collection is empty, returns undefined.
	 */
	readonly last: T;

	/**
	 * Returns index of last collection item. If collection is empty, returns undefined.
	 */
	readonly lastIndex: number;

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
	 * Returns a full copy of this collection.
	 */
	clone(): IList<T>;

	/**
	 * Returns item by index. If item with such index doesn't exist, returns undefined.
	 */
	get(index: number): T;

	/**
	 * @inheritdoc
	 */
	every(callback: (item: T, index: number) => boolean, scope?: any): boolean;

	/**
	 * @inheritdoc
	 */
	some(callback: (item: T, index: number) => boolean, scope?: any): boolean;

	/**
	 * @inheritdoc
	 */
	each(callback: (item: T, index: number) => any, scope?: any): void;

	/**
	 * @inheritdoc
	 */
	forEach(callback: (item: T, index: number) => any, scope?: any): void;

	/**
	 * Finds item matching criteria.
	 *
	 * Returns key of first item for which callback returns !== false.
	 *
	 * Algorithms iterates items sequentially, and stops after first item matching the criteria.
	 *
	 * @param callback Criteria callback.
	 * @param scope **callback** call scope. Defaults to collection itself.
	 * @returns Found item key or undefined.
	 */
	findIndex(callback: (item: T, index: number) => boolean, scope?: any): number;

	/**
	 * @inheritdoc
	 */
	find(callback: (item: T, index: number) => boolean, scope: any): T;

	/**
	 * @inheritdoc
	 */
	toSorted(callback?: (item: T, index: number) => any, scope?: any, order?: number): T[];

	/**
	 * @inheritdoc
	 */
	$toSorted(callback?: (item: T, index: number) => any, scope?: any, order?: number): IList<T>;

	/**
	 * @inheritdoc
	 */
	toSortedComparing(compare?: (t1: T, t2: T, k1: number, k2: number) => number, scope?: any, order?: number): T[];

	/**
	 * @inheritdoc
	 */
	$toSortedComparing(compare?: (t1: T, t2: T, k1: number, k2: number) => number, scope?: any, order?: number): IList<T>;

	/**
	 * @inheritdoc
	 */
	getSortingIndices(callback?: (item: T, index: number) => any, scope?: any, order?: number): number[];

	/**
	 * Returns keys of sorted items.
	 *
	 * Builds array of item keys, sorted by result of callback call for each item.
	 *
	 * @param callback Indexer function. Must return a comparable value, compatible with
	 * [[cmp]]. Returns item itself by default.
	 * @param scope **callback** call scope. Defaults to collection itself.
	 * @param order Sorting order. Positive number for ascending sorting, negative for descending sorting.
	 * @returns Sorted item keys array.
	 */
	$getSortingIndices(callback?: (item: T, index: number) => any, scope?: any, order?: number): IList<number>;

	/**
	 * @inheritdoc
	 */
	getSortingIndicesComparing(compare?: (t1: T, t2: T, k1: number, k2: number) => number, scope?: any, order?: number): number[];

	/**
	 * Returns keys of sorted items.
	 *
	 * Builds array of item keys, sorted by comparer.
	 *
	 * @param compare Comparer function. Should return positive value if t1 > t2;
	 * negative value if t1 < t2; 0 if t1 == t2.
	 * Defaults to [[cmp]]
	 * @param scope **comparer** call scope. Defaults to collection itself.
	 * @param order Sorting order. Positive number for ascending sorting, negative for descending sorting.
	 * @returns Sorted item keys array.
	 */
	$getSortingIndicesComparing(compare?: (t1: T, t2: T, k1: number, k2: number) => number, scope?: any, order?: number): IList<number>;

	/**
	 * @inheritdoc
	 */
	index(callback: (item: T, index: number) => string, scope?: any): Dictionary<T>;

	/**
	 * @inheritdoc
	 */
	$index(callback: (item: T, index: number) => string, scope?: any): IMap<T>;

	/**
	 * @inheritdoc
	 */
	filter(callback: (item: T, index: number) => boolean, scope?: any): IList<T>;

	/**
	 * @inheritdoc
	 */
	count(callback: (item: T, index: number) => boolean, scope?: any): number;

	/**
	 * @inheritdoc
	 */
	map<U>(callback: (item: T, index: number) => U, scope?: any, getKey?: (item: U) => string): IList<U>;

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

	reduce<U>(reducer: Reducer<T, U>): U;
	reduce<U>(callback: (accumulator: U, item: T, index: number) => U, initial: U): U;

	max(callback?: (item: T, index: number) => any, scope?: any, order?: number): T;

	maxIndex(callback?: (item: T, index: number) => any, scope?: any, order?: number): number;

	maxComparing(compare?: (t1: T, t2: T, i1: number, i2: number) => any, scope?: any, order?: number): T;

	maxIndexComparing(compare?: (t1: T, t2: T, i1: number, i2: number) => any, scope?: any, order?: number): number;

	min(callback?: (item: T, index: number) => any, scope?: any, order?: number): T;

	minIndex(callback?: (item: T, index: number) => any, scope?: any, order?: number): number;

	minComparing(compare?: (t1: T, t2: T, i1: number, i2: number) => any, scope?: any, order?: number): T;

	minIndexComparing(compare?: (t1: T, t2: T, i1: number, i2: number) => any, scope?: any, order?: number): number;
}

export default ReadOnlyList;
