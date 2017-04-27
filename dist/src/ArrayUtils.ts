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

import {cmp, def, isArray} from './index';
import {VidMap, VidSet} from './internal';
import Dictionary from './Dictionary';
import IList from './IList';
import IndexCount from './IndexCount';
import IndexItems from './IndexItems';
import ListSpliceResult from './ListSpliceResult';
import Some from './Some';

/**
 * Returns the last collection item. If collection is empty, returns undefined.
 */
export function getLast<T>(arr: T[]): T {
	return arr[arr.length - 1];
}

/**
 * Checks collection for emptiness.
 */
export function isEmpty<T>(arr: T[]): boolean {
	return arr.length === 0;
}

/**
 * Checks item for existance in collection.
 */
export function containsItem<T>(arr: T[], item: T): boolean {
	return arr.indexOf(item) !== -1;
}

/**
 * Returns index of item in collection. If such item doesn't exist, returns undefined.
 */
export function keyOf<T>(arr: T[], item: T): number {
	return find(arr, function (v) {
		return item === v;
	});
}

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
export function find<T>(arr: T[], callback: (item: T, index: number) => boolean, scope?: any): number {
	let result: number;
	arr.every(function (item, index) {
		if (callback.call(scope, item, index) !== false) {
			result = index;
			return false;
		}
		return true;
	});
	return result;
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
export function search<T>(arr: T[], callback: (item: T, index: number) => boolean, scope?: any): T {
	let result: T;
	arr.every(function (item, index) {
		if (callback.call(scope, item, index) !== false) {
			result = item;
			return false;
		}
		return true;
	});
	return result;
}

/**
 * Counts the items matching criteria.
 *
 * Returns the number of items for which callback returns !== false.
 *
 * @param callback Criteria callback.
 * @param scope **callback** call scope. Defaults to collection itself.
 * @returns Number of items.
 */
export function count<T>(arr: T[], callback: (item: T, index: number) => boolean, scope?: any): number {
	let result = 0;
	arr.every(function (item, index) {
		if (callback.call(scope, item, index) !== false) {
			++result;
		}
		return true;
	});
	return result;
}

/**
 * Returns keys of sorted items.
 *
 * Builds array of item keys, sorted by result of callback call for each item.
 *
 * @param callback Indexer export function. Must return a comparable value, compatible with
 * [[JW.cmp]]. Returns item itself by default.
 * @param scope **callback** call scope. Defaults to collection itself.
 * @param order Sorting order. Positive number for ascending sorting, negative for descending sorting.
 * @returns Sorted item keys array.
 */
export function getSortingKeys<T>(arr: T[], callback?: (item: T, index: number) => any, scope?: any, order?: number): number[]{
	callback = callback || function (x) { return x; };
	order = order || 1;
	const pairs: any[] = [];
	arr.every(function (item, key) {
		pairs.push([key, callback.call(scope, item, key)]);
		return true;
	});
	pairs.sort(function (x, y) {
		return order * cmp(x[1], y[1]);
	});
	return pairs.map(function (pair) {
		return pair[0];
	});
}

/**
 * Returns keys of sorted items.
 *
 * Builds array of item keys, sorted by comparer.
 *
 * @param compare Comparer export function. Should return positive value if t1 > t2;
 * negative value if t1 < t2; 0 if t1 == t2.
 * Defaults to [[JW.cmp]]
 * @param scope **comparer** call scope. Defaults to collection itself.
 * @param order Sorting order. Positive number for ascending sorting, negative for descending sorting.
 * @returns Sorted item keys array.
 */
export function getSortingKeysComparing<T>(arr: T[], compare?: (t1: T, t2: T, i1: number, i2: number) => any, scope?: any, order?: number): number[]{
	compare = compare || cmp;
	order = order || 1;
	const pairs: any[] = [];
	arr.every(function (item, key) {
		pairs.push([key, item]);
		return true;
	});
	pairs.sort(function (x, y) {
		return order * compare.call(scope, x[1], y[1], x[0], y[0]);
	});
	return pairs.map(function (pair) {
		return pair[0];
	});
}

/**
 * Converts collection to sorted array.
 *
 * Builds array consisting of collection items sorted by result of callback call for each item.
 *
 * @param callback Indexer export function. Must return a comparable value, compatible with
 * [[JW.cmp]]. Returns item itself by default.
 * @param scope **callback** call scope. Defaults to collection itself.
 * @param order Sorting order. Positive number for ascending sorting, negative for descending sorting.
 * @returns Sorted array.
 */
export function toSorted<T>(arr: T[], callback?: (item: T, index: number) => any, scope?: any, order?: number): T[]{
	return getSortingKeys(arr, callback, scope, order).map(function (index): T {
		return arr[index];
	});
}

/**
 * Converts collection to sorted array.
 *
 * Builds array consisting of collection items sorted by comparer.
 *
 * @param compare Comparer export function. Should return positive value if t1 > t2;
 * negative value if t1 < t2; 0 if t1 == t2.
 * Defaults to [[JW.cmp]]
 * @param scope **comparer** call scope. Defaults to collection itself.
 * @param order Sorting order. Positive number for ascending sorting, negative for descending sorting.
 * @returns Sorted array.
 */
export function toSortedComparing<T>(arr: T[], compare?: (t1: T, t2: T, i1: number, i2: number) => any, scope?: any, order?: number): T[]{
	return getSortingKeysComparing(arr, compare, scope, order).map(function (index): T {
		return arr[index];
	});
}

/**
 * Indexes collection.
 *
 * Builds new map by rule: key is the result of indexer export function call, value is the corresponding item.
 *
 * @param callback Indexer export function.
 * @param scope **callback** call scope. Defaults to collection itself.
 * @returns Collection index.
 */
export function index<T>(arr: T[], callback: (item: T, index: number) => any, scope?: any): Dictionary<T> {
	const result: Dictionary<T> = {};
	arr.every(function (item, index) {
		const key = callback.call(scope, item, index);
		if (key != null) {
			result[key] = item;
		}
		return true;
	});
	return result;
}

/**
 * Converts collection to map.
 *
 * Builds new map consisting of collection items.
 */
export function toDictionary<T>(arr: T[]): Dictionary<T> {
	const result:Dictionary<T> = {};
	arr.every(function (v, k) {
		result[k] = v;
		return true;
	});
	return result;
}

/**
 * Inserts an item to array.
 *
 * @param item Item to insert.
 * @param index Index of an item before which to insert new one.
 * By default, appends the item to the end of collection.
 */
export function add<T>(arr: T[], item: T, index?: number) {
	tryAdd(arr, item, index);
}

/**
 * Inserts an item to array.
 *
 * @param item Item to insert.
 * @param index Index of an item before which to insert new one.
 * By default, appends the item to the end of collection.
 * @returns Always returns true.
 */
export function tryAdd<T>(arr: T[], item: T, index?: number): boolean {
	arr.splice(def(index, arr.length), 0, item);
	return true;
}

/**
 * Inserts item range to array.
 *
 * @param items Items to insert.
 * @param index Index of an item before which to insert new ones.
 * By default, appends the items to the end of collection.
 */
export function addAll<T>(arr: T[], items: T[], index?: number) {
	tryAddAll(arr, items, index);
}

/**
 * Inserts item range to array.
 *
 * @param items Items to insert.
 * @param index Index of an item before which to insert new ones.
 * By default, appends the items to the end of collection.
 * @returns Always returns true.
 */
export function tryAddAll<T>(arr: T[], items: T[], index?: number): boolean {
	if (items.length === 0) {
		return undefined;
	}
	if (index === undefined) {
		var l = arr.length;
		arr.length += items.length;
		for (var i = 0; i < items.length; ++i) {
			arr[i + l] = items[i];
		}
	} else {
		var tail = arr.splice(index, arr.length - index);
		tryAddAll(arr, items);
		tryAddAll(arr, tail);
	}
	return true;
}

/**
 * Replaces item at specified position.
 * If array doesn't contain such index, it will demolish the application.
 *
 * @returns The replaced item.
 */
export function set<T>(arr: T[], item: T, index: number): T {
	var result = trySet(arr, item, index);
	return (result !== undefined) ? result.value : arr[index];
}

/**
 * Replaces item at specified position.
 * If array doesn't contain such index, it will demolish the application.
 *
 * @returns The replaced item. If collection is not modified, returns undefined.
 */
export function trySet<T>(arr: T[], item: T, index: number): Some<T> {
	var oldItem = arr[index];
	if (item !== oldItem) {
		arr[index] = item;
		return { value: oldItem };
	}
	return undefined;
}

/**
 * Removes item at specified position.
 * If array doesn't contain such index, it will demolish the application.
 *
 * @returns The removed item.
 */
export function remove<T>(arr: T[], index: number): T {
	return tryRemove(arr, index);
}

/**
 * Removes item at specified position.
 * If array doesn't contain such index, it will demolish the application.
 *
 * @returns The removed item. If collection is not modified, returns undefined.
 */
export function tryRemove<T>(arr: T[], index: number): T {
	return arr.splice(index, 1)[0];
}

/**
 * Removes item range from array.
 *
 * @param index Index of first item to remove.
 * @param count Count of items to remove.
 * @returns The removed items.
 */
export function removeAll<T>(arr: T[], index: number, count: number): T[]{
	var result = tryRemoveAll(arr, index, count);
	return result || [];
}

/**
 * Removes item range from array.
 *
 * @param index Index of first item to remove.
 * @param count Count of items to remove.
 * @returns The removed items. If collection is not modified, returns undefined.
 */
export function tryRemoveAll<T>(arr: T[], index: number, count: number): T[]{
	if (count !== 0) {
		return arr.splice(index, count);
	}
	return undefined;
}

/**
 * Removes first occurrence of an item in collection.
 */
export function removeItem<T>(arr: T[], item: T): number {
	var key = keyOf(arr, item);
	if (key !== undefined) {
		tryRemove(arr, key);
	}
	return key;
}

/**
 * Removes all occurrences of items in collection.
 * **Known issue:** *Works only if T extends JW.Class!*
 */
export function removeItems<T>(arr: T[], items: T[], getKey?: (item: T) => string) {
	const itemSet = new VidSet<T>(getKey);
	items.forEach(itemSet.add, itemSet);
	const newItems = arr.filter(function (item: T): boolean {
		return !itemSet.contains(item);
	});
	performSplice(arr, newItems);
}

/**
 * Moves an item inside array.
 *
 * @param fromIndex Item index to move.
 * @param toIndex Index to move to.
 * @returns The moved item.
 */
export function move<T>(arr: T[], fromIndex: number, toIndex: number): T {
	tryMove(arr, fromIndex, toIndex);
	return arr[toIndex];
}

/**
 * Moves an item inside array.
 *
 * @param fromIndex Item index to move.
 * @param toIndex Index to move to.
 * @returns The moved item. If collection is not modified, returns undefined.
 */
export function tryMove<T>(arr: T[], fromIndex: number, toIndex: number): T {
	if (fromIndex === toIndex) {
		return undefined;
	}
	var item = arr[fromIndex];
	arr.splice(fromIndex, 1);
	arr.splice(toIndex, 0, item);
	return item;
}

/**
 * Clears collection.
 * @returns Old collection contents. Never returns null or undefined.
 */
export function clear<T>(arr: T[]): T[]{
	var result = tryClear(arr);
	return (result !== undefined) ? result : [];
}

/**
 * Clears collection.
 * @returns Old collection contents. If not modified - undefined.
 */
export function tryClear<T>(arr: T[]): T[]{
	if (arr.length !== 0) {
		return arr.splice(0, arr.length);
	}
	return undefined;
}

/**
 * Removes and inserts item ranges. Universal optimized granular operation of removal/insertion.
 *
 * @param removeParamsList Array of segments to remove sorted by index asc. Segments are removed in backward order.
 * @param addParamsList Array of segments to insert sorted by index asc. Segments are inserted in forward order.
 * @returns Splice result. Never returns null or undefined.
 */
export function splice<T>(arr: T[],
		removeParamsList: IList.IndexCount[],
		addParamsList: IList.IndexItems<T>[]): IList.SpliceResult<T> {
	var result = trySplice(arr, removeParamsList, addParamsList);
	return (result !== undefined) ? result :
		new ListSpliceResult<T>(arr.concat(), <IList.IndexItems<T>[]>[], <IList.IndexItems<T>[]>[]);
}

/**
 * Removes and inserts item ranges. Universal optimized granular operation of removal/insertion.
 *
 * @param removeParamsList Array of segments to remove sorted by index asc. Segments are removed in backward order.
 * @param addParamsList Array of segments to insert sorted by index asc. Segments are inserted in forward order.
 * @returns Splice result. If collection is not modified, returns undefined.
 */
export function trySplice<T>(arr: T[],
		removeParamsList: IList.IndexCount[],
		addParamsList: IList.IndexItems<T>[]): IList.SpliceResult<T> {
	var optimizedRemoveParamsList: IList.IndexCount[] = [];
	var rlast: IndexCount = null;
	var rparams: IList.IndexCount;
	for (var i = 0, l = removeParamsList.length; i < l; ++i) {
		rparams = removeParamsList[i];
		if (rlast && (rparams.index === rlast.index + rlast.count)) {
			rlast.count += rparams.count;
		} else {
			rlast = rparams.clone();
			optimizedRemoveParamsList.push(rlast);
		}
	}

	var optimizedAddParamsList = [];
	var alast: IList.IndexItems<T> = null;
	var aparams: IList.IndexItems<T>;
	for (var i = 0, l = addParamsList.length; i < l; ++i) {
		aparams = addParamsList[i];
		if (alast && (aparams.index === alast.index + alast.items.length)) {
			tryAddAll(alast.items, aparams.items);
		} else {
			alast = aparams.clone();
			optimizedAddParamsList.push(alast);
		}
	}

	var oldItems = arr.concat();
	var removedItemsList = [];
	for (var i = optimizedRemoveParamsList.length - 1; i >= 0; --i) {
		rparams = optimizedRemoveParamsList[i];
		var index = rparams.index;
		var items = tryRemoveAll(arr, index, rparams.count);
		if (items === undefined) {
			continue;
		}
		removedItemsList.push(new IndexItems<T>(index, items));
	}
	var addedItemsList = [];
	for (var i = 0, l = optimizedAddParamsList.length; i < l; ++i) {
		aparams = optimizedAddParamsList[i];
		if (tryAddAll(arr, aparams.items, aparams.index) === undefined) {
			continue;
		}
		addedItemsList.push(aparams);
	}
	if ((removedItemsList.length !== 0) || (addedItemsList.length !== 0)) {
		removedItemsList.reverse();
		return new ListSpliceResult<T>(oldItems, removedItemsList, addedItemsList);
	}
	return undefined;
}

/**
 * Reorders array items.
 *
 * @param indexArray Index array. Item with index `i` will be moved to index `indexArray[i]`.
 * Must contain all indexes from 0 to (length - 1).
 */
export function reorder<T>(arr: T[], indexArray: number[]) {
	tryReorder(arr, indexArray);
}

/**
 * Reorders array items.
 *
 * @param indexArray Index array. Item with index `i` will be moved to index `indexArray[i]`.
 * Must contain all indexes from 0 to (length - 1).
 * @returns Old array contents. If collection is not modified, returns undefined.
 */
export function tryReorder<T>(arr: T[], indexArray: number[]): T[]{
	var length = arr.length;
	if (isIdentity(indexArray)) {
		return undefined;
	}
	var oldItems = arr.concat();
	for (var i = 0; i < length; ++i) {
		arr[indexArray[i]] = oldItems[i];
	}
	return oldItems;
}

/**
 * Detects [[splice]] method arguments to adjust array contents to **newItems**.
 * Determines which item ranges should be removed and which ones should be inserted.
 * All items must have unique **getKey** export function result.
 * If items don't have unique key, probably [[detectFilter]] method may help,
 * because it doesn't require item uniquiness.
 *
 * @param newItems New array contents.
 * @param getKey Function which returns unique key of an item in this collection.
 * Defaults to [[getKey]].
 * If collection consists of instances of JW.Class, then you are in a good shape.
 * @param scope **getKey** call scope. Defaults to collection itself.
 * @returns [[splice]] method arguments. If no method call required, returns undefined.
 */
export function detectSplice<T>(oldItems: T[], newItems: T[],
		getKey?: (item: T) => string): IList.SpliceParams<T> {
	var removeParamsList: IList.IndexCount[] = [];
	var addParamsList: IList.IndexItems<T>[] = [];
	var oldIndexMap = new VidMap<T, number>(getKey);
	for (var i = 0, l = oldItems.length; i < l; ++i) {
		oldIndexMap.put(oldItems[i], i);
	}
	var nextOldIndex = 0;
	var offset = 0;
	var newItemBuffer: T[] = [];

	function buffer(item: T) {
		newItemBuffer.push(item);
	}

	function flush() {
		if (newItemBuffer.length === 0) {
			return;
		}
		addParamsList.push(new IndexItems<T>(offset + nextOldIndex, newItemBuffer));
		offset += newItemBuffer.length;
		newItemBuffer = [];
	}

	function testRemove(oldIndex: number) {
		if (oldIndex > nextOldIndex) {
			var count = oldIndex - nextOldIndex;
			removeParamsList.push(new IndexCount(nextOldIndex, count));
			offset -= count;
		}
	}

	for (var newIndex = 0, l = newItems.length; newIndex < l; ++newIndex) {
		var item = newItems[newIndex];
		var oldIndex = oldIndexMap.get(item);
		if ((oldIndex === undefined) || (oldIndex < nextOldIndex)) {
			buffer(item);
		} else {
			flush();
			testRemove(oldIndex);
			nextOldIndex = oldIndex + 1;
		}
	}
	flush();
	testRemove(oldItems.length);
	if ((removeParamsList.length !== 0) || (addParamsList.length !== 0)) {
		return { removeParamsList: removeParamsList, addParamsList: addParamsList };
	}
	return undefined;
}

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
export function detectFilter<T>(oldItems: T[], newItems: T[]): IList.IndexCount[] {
	var removeParamsList: IList.IndexCount[] = [];
	var oldIndex = 0;
	var oldLength = oldItems.length;
	var newLength = newItems.length;
	for (var newIndex = 0; newIndex <= newLength; ++newIndex) {
		var newItem = newItems[newIndex];
		var count = 0;
		while ((oldIndex + count < oldLength) && (oldItems[oldIndex + count] !== newItem)) {
			++count;
		}
		if (count !== 0) {
			removeParamsList.push(new IndexCount(oldIndex, count));
		}
		oldIndex += count + 1;
	}
	if (removeParamsList.length !== 0) {
		return removeParamsList;
	}
	return undefined;
}

/**
 * Detects [[reorder]] method arguments to adjust array contents to **newItems**.
 * Determines where to move all items.
 * If **newItems** contents differ from collection contents,
 * you should pray to Gods that application still works well.
 *
 * @param newItems New array contents.
 * @param getKey Function which returns unique key of an item in this collection.
 * Defaults to [[getKey]].
 * If collection consists of instances of JW.Class, then it's all right.
 * @param scope **getKey** call scope. Defaults to collection itself.
 * @returns **indexArray** argument of [[reorder]] method.
 * If no method call required, returns undefined.
 */
export function detectReorder<T>(oldItems: T[], newItems: T[], getKey?: (item: T) => string): number[] {
	var indexArray: number[] = [];
	var newIndexMap = new VidMap<T, number>(getKey);
	for (var i = 0, l = newItems.length; i < l; ++i) {
		newIndexMap.put(newItems[i], i);
	}
	for (var i = 0, l = oldItems.length; i < l; ++i) {
		indexArray.push(newIndexMap.get(oldItems[i]));
	}
	if (!isIdentity(indexArray)) {
		return indexArray;
	}
	return undefined;
}

/**
 * Detects [[reorder]] method arguments to sort array contents by result of
 * **callback** call for each item.
 *
 * @param callback Indexer export function. Must return a comparable value, compatible with
 * [[JW.cmp]]. Returns item itself by default.
 * @param scope **callback** call scope. Defaults to collection itself.
 * @param order Sorting order. Positive number for ascending sorting, negative for descending sorting.
 * @returns **indexArray** argument of [[reorder]] method.
 * If no method call required, returns undefined.
 */
export function detectSort<T>(arr: T[], callback?: (item: T, index: number) => any, scope?: any, order?: number): number[]{
	var keys = getSortingKeys(arr, callback, scope, order);
	if (!isIdentity(keys)) {
		return invert(keys);
	}
	return undefined;
}

/**
 * Detects [[reorder]] method arguments to sort array contents by comparer.
 *
 * @param compare Comparer export function. Should return positive value if t1 > t2;
 * negative value if t1 < t2; 0 if t1 == t2.
 * Defaults to [[JW.cmp]]
 * @param scope **comparer** call scope. Defaults to collection itself.
 * @param order Sorting order. Positive number for ascending sorting, negative for descending sorting.
 * @returns **indexArray** argument of [[reorder]] method.
 * If no method call required, returns undefined.
 */
export function detectSortComparing<T>(arr: T[], compare?: (t1: T, t2: T, i1: number, i2: number) => number, scope?: any, order?: number): number[] {
	var keys = getSortingKeysComparing(arr, compare, scope, order);
	if (!isIdentity(keys)) {
		return invert(keys);
	}
	return undefined;
}

/**
 * Adjusts array contents to **newItems** using [[detectSplice]] and
 * [[splice]] methods.
 * All items must have unique **getKey** export function result.
 * If items don't have unique key, probably [[detectFilter]] method may help,
 * because it doesn't require item uniquiness.
 *
 * @param newItems New array contents.
 * @param getKey Function which returns unique key of an item in this collection.
 * Defaults to [[getKey]].
 * If collection consists of instances of JW.Class, then you are in a good shape.
 * @param scope **getKey** call scope. Defaults to collection itself.
 */
export function performSplice<T>(arr: T[], newItems: T[], getKey?: (item: T) => string) {
	var params = detectSplice(arr, newItems, getKey);
	if (params !== undefined) {
		trySplice(arr, params.removeParamsList, params.addParamsList);
	}
}

/**
 * Adjusts array contents to **newItems** using [[detectFilter]] and
 * [[splice]] methods.
 * Only removes items.
 * Doesn't assume items insertion - try [[detectSplice]] if that's the case.
 * In advantage to [[detectSplice]], doesn't require item uniquiness.
 *
 * @param newItems New array contents.
 */
export function performFilter<T>(arr: T[], newItems: T[]) {
	var params = detectFilter(arr, newItems);
	if (params !== undefined) {
		trySplice(arr, params, []);
	}
}

/**
 * Adjusts array contents to **newItems** using [[detectReorder]] and
 * [[reorder]] methods.
 *
 * @param newItems New array contents.
 * @param getKey Function which returns unique key of an item in this collection.
 * Defaults to [[getKey]].
 * If collection consists of instances of JW.Class, then it's all right.
 * @param scope **getKey** call scope. Defaults to collection itself.
 */
export function performReorder<T>(arr: T[], newItems: T[], getKey?: (item: T) => string) {
	var indexArray = detectReorder(arr, newItems, getKey);
	if (indexArray !== undefined) {
		tryReorder(arr, indexArray);
	}
}

/**
 * Sorts array by result of **callback** export function call for each item.
 *
 * @param callback Indexer export function. Must return a comparable value, compatible with
 * [[JW.cmp]]. Returns item itself by default.
 * @param scope **callback** call scope. Defaults to collection itself.
 * @param order Sorting order. Positive number for ascending sorting, negative for descending sorting.
 */
export function sort<T>(arr: T[], callback?: (item: T, index: number) => any, scope?: any, order?: number) {
	var indexArray = detectSort(arr, callback, scope, order);
	if (indexArray !== undefined) {
		tryReorder(arr, indexArray);
	}
}

/**
 * Sorts array by comparer.
 *
 * @param compare Comparer export function. Should return positive value if t1 > t2;
 * negative value if t1 < t2; 0 if t1 == t2.
 * Defaults to [[JW.cmp]]
 * @param scope **comparer** call scope. Defaults to collection itself.
 * @param order Sorting order. Positive number for ascending sorting, negative for descending sorting.
 */
export function sortComparing<T>(arr: T[], compare?: (t1: T, t2: T, i1: number, i2: number) => number, scope?: any, order?: number) {
	var indexArray = detectSortComparing(arr, compare, scope, order);
	if (indexArray !== undefined) {
		tryReorder(arr, indexArray);
	}
}

/**
 * Checks for equality (===) to another array, item by item.
 *
 * @param arr Another array.
 * @returns Arrays are equal.
 */
export function equal<T>(x: T[], y: T[]): boolean {
	if (x === y) {
		return true;
	}
	if (x.length !== y.length) {
		return false;
	}
	for (var i = 0, l = x.length; i < l; ++i) {
		if (x[i] !== y[i]) {
			return false;
		}
	}
	return true;
}

/**
 * Collapses multi-dimentional array.
 *
 * @param depth Dimentions to collapse.
 * @returns Collapsed array.
 */
export function collapse(arr: any[], depth?: number): any[]{
	var result = [];
	for (var i = 0, l = arr.length; i < l; ++i) {
		if (!isArray(arr[i])) {
			result.push(arr[i]);
			continue;
		}
		if (depth == null) {
			tryAddAll(result, collapse(arr[i]));
			continue;
		}
		if (depth) {
			tryAddAll(result, collapse(arr[i], depth - 1));
			continue;
		}
		result.push(arr[i]);
	}
	return result;
}

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
export function backEvery<T>(arr: T[], callback: (item: T, index: number) => boolean, scope?: any): boolean {
	for (var i = arr.length - 1; i >= 0; --i) {
		if (callback.call(scope || arr, arr[i], i) === false) {
			return false;
		}
	}
	return true;
}

/**
 * Creates a new array of length n containing all numbers from 0 to (n - 1) in random order.
 */
export function shuffle(n: number): number[] {
	var result = new Array<number>(n);
	for (var i = 0; i < n; ++i) {
		result[i] = i;
	}
	for (var i = 0; i < n; ++i) {
		var j = i + Math.floor(Math.random() * (n - i));
		var t = result[i];
		result[i] = result[j];
		result[j] = t;
	}
	return result;
}

/**
 * Checks if every item in array is equal to its index: array[i] === i.
 */
export function isIdentity(array: number[]): boolean {
	for (var i = 0, l = array.length; i < l; ++i) {
		if (array[i] !== i) {
			return false;
		}
	}
	return true;
}

/**
 * Builds a new array by the rule: result[array[i]] === i.
 */
export function invert(arr: number[]): number[] {
	var l = arr.length;
	var result = new Array<number>(l);
	for (var i = 0; i < l; ++i) {
		result[arr[i]] = i;
	}
	return result;
}

/**
 * Builds array consisting of subarray items in the same order.
 * Current array is not modified.
 *
 * @returns Merged array.
 */
export function merge<T>(arrays: T[][]): T[] {
	var result: T[] = [];
	for (var i = 0, l = arrays.length; i < l; ++i) {
		result.push.apply(result, arrays[i]);
	}
	return result;
}

/**
 * Computes sum of array item lengthes.
 */
export function countMerged(arrays: any[][]): number {
	var result = 0;
	for (var i = 0, l = arrays.length; i < l; ++i) {
		result += arrays[i].length;
	}
	return result;
}

/**
 * Reverses item order in array. Modifies the array itself.
 */
export function reverse<T>(arr: T[]) {
	arr.reverse();
}

/**
 * Builds a new array containing items of this array in reversed order.
 * Current array is not modified.
 *
 * @returns Reversed array.
 */
export function toReversed<T>(arr: T[]): T[] {
	var result = arr.concat();
	result.reverse();
	return result;
}

/**
 * Removes last array item. Does nothing if array is empty.
 *
 * @returns The removed item or undefined.
 */
export function pop<T>(arr: T[]): T {
	return arr.pop();
}

/**
 * Determines index of first item which is more (or less if **order** < 0) than specified value by **compare** export function,
 * using binary search. Array must be sorted by **compare** export function.
 * Can be used for item insertion easily.
 * If you want to use this method for item removal, you must look at previous item and compare it to **value** first.
 *
 * @param compare Comparer export function. Should return positive value if t1 > t2;
 * negative value if t1 < t2; 0 if t1 == t2.
 * Defaults to [[JW.cmp]]
 * @param scope **comparer** call scope. Defaults to collection itself.
 * @param order Sorting order. Positive number for ascending sorting, negative for descending sorting.
 * @returns Item index.
 */
export function binarySearch<T>(arr: T[], value: T, compare?: (t1: T, t2: T) => number, scope?: any, order?: number): number {
	compare = compare || function (x, y) { return (x < y) ? -1 : (x > y) ? 1 : 0 };
	scope = scope || arr;
	order = order || 1;
	var length = arr.length;
	var len2 = length >> 1;
	var step = 1;
	while (step <= len2) {
		step <<= 1;
	}
	var index = 0;
	while (step) {
		if ((index + step <= length) && (order * compare.call(scope, value, arr[index + step - 1]) >= 0)) {
			index += step;
		}
		step >>= 1;
	}
	return index;
}
