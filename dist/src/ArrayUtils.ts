/*
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
import IList from './IList';
import {cmp, def} from './index';
import IndexCount from './IndexCount';
import IndexItems from './IndexItems';
import {identity, initReduceState, VidMap, VidSet} from './internal';
import ListSpliceResult from './ListSpliceResult';
import Reducer from './Reducer';
import Some from './Some';

/**
 * Returns the last array item.
 *
 * @param arr Array.
 * @returns Last array item or undefined. If array is empty, returns undefined.
 */
export function getLast<T>(arr: T[]): T {
	return arr[arr.length - 1];
}

/**
 * Checks if array is empty.
 *
 * @param arr Array.
 * @returns Array has zero length.
 */
export function isEmpty<T>(arr: T[]): boolean {
	return arr.length === 0;
}

/**
 * Checks if the item exists in array, i.e. if `arr.indexOf(item)` doesn't return -1.
 *
 * @param arr Array.
 * @param item Item to find.
 * @returns Item exists in array.
 */
export function contains<T>(arr: T[], item: T): boolean {
	return arr.indexOf(item) !== -1;
}

/**
 * Finds an item matching criteria.
 *
 * Returns the first item for which callback returns truthy value.
 *
 * Algorithms iterates items consequently, and stops after the first item matching the criteria.
 *
 * @param arr Array.
 * @param callback Criteria callback.
 * @param scope `callback` call scope. Defaults to array itself.
 * @returns The found item or undefined.
 */
export function find<T>(arr: T[], callback: (item: T, index: number) => any, scope?: any): T {
	return arr[findIndex(arr, callback, scope)];
}

/**
 * Finds an item matching criteria.
 *
 * Returns index of the first item for which callback returns truthy value.
 *
 * Algorithms iterates items consequently, and stops after the first item matching the criteria.
 *
 * @param arr Array.
 * @param callback Criteria callback.
 * @param scope `callback` call scope. Defaults to array itself.
 * @returns Index of the found item or undefined.
 */
export function findIndex<T>(arr: T[], callback: (item: T, index: number) => any, scope?: any): number {
	scope = scope || arr;
	let result: number;
	arr.every(function (item, index) {
		if (callback.call(scope, item, index)) {
			result = index;
			return false;
		}
		return true;
	});
	return result;
}

/**
 * Determines index of the first item which is more (or less if `order` < 0) than the specified value by `compare` function,
 * using binary search. Array must be sorted by `compare` function.
 * Can be used for item insertion easily.
 * If you want to use this method for item removal, you must look at previous item and compare it to `value` first.
 *
 * @param arr Sorted array.
 * @param compare Comparer function. Should return positive value if t1 > t2;
 * negative value if t1 < t2; 0 if t1 == t2.
 * Defaults to `cmp`.
 * @param scope `comparer` call scope. Defaults to array itself.
 * @param order Sorting order. Positive number if array is sorted ascending, negative if descending.
 * @returns Item index.
 */
export function binarySearch<T>(arr: T[], value: T, compare?: (t1: T, t2: T) => number, scope?: any, order?: number): number {
	compare = compare || cmp;
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

/**
 * Returns the array item which callback returns the highest (or lowest) value for.
 *
 * @param arr Array.
 * @param callback Returns a comparable value, compatible with `cmp`. Returns item itself by default.
 * @param scope `callback` call scope. Defaults to array itself.
 * @param order Pass positive order to find the highest value, and negative to find the lowest one.
 * @returns Array item.
 */
export function max<T>(arr: T[], callback?: (item: T, index: number) => any, scope?: any, order: number = 1): T {
	return arr[maxIndex(arr, callback, scope, order)];
}

/**
 * Returns index of the array item which callback returns the highest (or lowest) value for.
 *
 * @param arr Array.
 * @param callback Returns a comparable value, compatible with `cmp`. Returns item itself by default.
 * @param scope `callback` call scope. Defaults to array itself.
 * @param order Pass positive order to find the highest value, and negative to find the lowest one.
 * @returns Item index.
 */
export function maxIndex<T>(arr: T[], callback?: (item: T, index: number) => any, scope?: any, order: number = 1): number {
	if (arr.length === 0) {
		return -1;
	}
	callback = callback || identity;
	scope = scope || arr;
	let result = 0;
	let max: any = callback.call(scope, arr[0]);
	for (let i = 1, l = arr.length; i < l; ++i) {
		const item: any = callback.call(scope, arr[i], i);
		const diff = cmp(item, max);
		if ((order > 0 && diff > 0) || (order < 0 && diff < 0)) {
			result = i;
			max = item;
		}
	}
	return result;
}

/**
 * Returns the highest (or lowest) array item in terms of the specified comparer function.
 *
 * @param arr Array.
 * @param compare Comparer function. Should return positive value if t1 > t2;
 * negative value if t1 < t2; 0 if t1 == t2. Defaults to `cmp`.
 * @param scope `compare` call scope. Defaults to array itself.
 * @param order Pass positive order to find the highest value, and negative to find the lowest one.
 * @returns Array item.
 */
export function maxComparing<T>(arr: T[], compare?: (t1: T, t2: T, i1: number, i2: number) => number, scope?: any, order: number = 1): T {
	return arr[maxIndexComparing(arr, compare, scope, order)];
}

/**
 * Returns index of the highest (or lowest) array item in terms of the specified comparer function.
 *
 * @param arr Array.
 * @param compare Comparer function. Should return positive value if t1 > t2;
 * negative value if t1 < t2; 0 if t1 == t2. Defaults to `cmp`.
 * @param scope `compare` call scope. Defaults to array itself.
 * @param order Pass positive order to find the highest value, and negative to find the lowest one.
 * @returns Item index.
 */
export function maxIndexComparing<T>(arr: T[], compare?: (t1: T, t2: T, i1: number, i2: number) => number, scope?: any, order: number = 1): number {
	if (arr.length === 0) {
		return -1;
	}
	compare = compare || cmp;
	scope = scope || arr;
	let result = 0;
	for (let i = 1, l = arr.length; i < l; ++i) {
		if (order * compare.call(scope, arr[result], arr[i], result, i) < 0) {
			result = i;
		}
	}
	return result;
}

/**
 * Returns the array item which callback returns the lowest (or highest) value for.
 *
 * @param arr Array.
 * @param callback Returns a comparable value, compatible with `cmp`. Returns item itself by default.
 * @param scope `callback` call scope. Defaults to array itself.
 * @param order Pass positive order to find the lowest value, and negative to find the highest one.
 * @returns Array item.
 */
export function min<T>(arr: T[], callback?: (item: T, index: number) => any, scope?: any, order: number = 1): T {
	return max(arr, callback, scope, -order);
}

/**
 * Returns index of the array item which callback returns the lowest (or highest) value for.
 *
 * @param arr Array.
 * @param callback Returns a comparable value, compatible with `cmp`. Returns item itself by default.
 * @param scope `callback` call scope. Defaults to array itself.
 * @param order Pass positive order to find the lowest value, and negative to find the highest one.
 * @returns Item index.
 */
export function minIndex<T>(arr: T[], callback?: (item: T, index: number) => any, scope?: any, order: number = 1): number {
	return maxIndex(arr, callback, scope, -order);
}

/**
 * Returns the lowest (or highest) array item in terms of the specified comparer function.
 *
 * @param arr Array.
 * @param compare Comparer function. Should return positive value if t1 > t2;
 * negative value if t1 < t2; 0 if t1 == t2. Defaults to `cmp`.
 * @param scope `compare` call scope. Defaults to array itself.
 * @param order Pass positive order to find the lowest value, and negative to find the highest one.
 * @returns Array item.
 */
export function minComparing<T>(arr: T[], compare?: (t1: T, t2: T, i1: number, i2: number) => number, scope?: any, order: number = 1): T {
	return maxComparing(arr, compare, scope, -order);
}

/**
 * Returns index of the lowest (or highest) array item in terms of the specified comparer function.
 *
 * @param arr Array.
 * @param compare Comparer function. Should return positive value if t1 > t2;
 * negative value if t1 < t2; 0 if t1 == t2. Defaults to `cmp`.
 * @param scope `compare` call scope. Defaults to array itself.
 * @param order Pass positive order to find the lowest value, and negative to find the highest one.
 * @returns Item index.
 */
export function minIndexComparing<T>(arr: T[], compare?: (t1: T, t2: T, i1: number, i2: number) => number, scope?: any, order: number = 1): number {
	return maxIndexComparing(arr, compare, scope, -order);
}

/**
 * Counts the items matching criteria.
 *
 * Returns count of items which `callback` returns truthy value for.
 *
 * @param arr Array.
 * @param callback Criteria callback.
 * @param scope `callback` call scope. Defaults to array itself.
 * @returns Number of items.
 */
export function count<T>(arr: T[], callback: (item: T, index: number) => any, scope?: any): number {
	scope = scope || arr;
	let result = 0;
	arr.every(function (item, index) {
		if (callback.call(scope, item, index)) {
			++result;
		}
		return true;
	});
	return result;
}

/**
 * Returns indices of sorted items.
 *
 * Builds array of item indices, sorted by the result of callback call for each item.
 *
 * @param arr Array.
 * @param callback Indexer function. Must return a comparable value, compatible with
 * `cmp`. Returns item itself by default.
 * @param scope `callback` call scope. Defaults to array itself.
 * @param order Sorting order. Positive number for ascending sorting, negative for descending sorting.
 * @returns Array of indices.
 */
export function getSortingIndices<T>(arr: T[], callback?: (item: T, index: number) => any, scope?: any, order?: number): number[]{
	callback = callback || identity;
	scope = scope || arr;
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
 * Returns indices of sorted items.
 *
 * Builds array of item indices, sorted by comparer.
 *
 * @param arr Array.
 * @param compare Comparer function. Must return positive value if t1 > t2;
 * negative value if t1 < t2; 0 if t1 == t2. Defaults to `cmp`.
 * @param scope `comparer` call scope. Defaults to array itself.
 * @param order Sorting order. Positive number for ascending sorting, negative for descending sorting.
 * @returns Array of indices.
 */
export function getSortingIndicesComparing<T>(arr: T[], compare?: (t1: T, t2: T, i1: number, i2: number) => number, scope?: any, order?: number): number[] {
	compare = compare || cmp;
	scope = scope || arr;
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
 * Builds and returns a new array consisting of original array items sorted by the result of
 * callback call for each item.
 *
 * @param arr Array.
 * @param callback Indexer function. Must return a comparable value, compatible with
 * `cmp`. Returns item itself by default.
 * @param scope `callback` call scope. Defaults to array itself.
 * @param order Sorting order. Positive number for ascending sorting, negative for descending sorting.
 * @returns Sorted array.
 */
export function toSorted<T>(arr: T[], callback?: (item: T, index: number) => any, scope?: any, order?: number): T[]{
	return getSortingIndices(arr, callback, scope, order).map(function (index): T {
		return arr[index];
	});
}

/**
 * Builds and returns a new array consisting of original array items sorted by comparer.
 *
 * @param arr Array.
 * @param compare Comparer function. Must return positive value if t1 > t2;
 * negative value if t1 < t2; 0 if t1 == t2. Defaults to `cmp`.
 * @param scope `comparer` call scope. Defaults to array itself.
 * @param order Sorting order. Positive number for ascending sorting, negative for descending sorting.
 * @returns Sorted array.
 */
export function toSortedComparing<T>(arr: T[], compare?: (t1: T, t2: T, i1: number, i2: number) => number, scope?: any, order?: number): T[] {
	return getSortingIndicesComparing(arr, compare, scope, order).map(function (index): T {
		return arr[index];
	});
}

/**
 * Builds a new array containing items of this array in reversed order.
 * Current array is not modified.
 *
 * @param arrays Array.
 * @returns Reversed array.
 */
export function toReversed<T>(arr: T[]): T[] {
	var result = arr.concat();
	result.reverse();
	return result;
}

/**
 * Indexes collection.
 *
 * Builds and returns a new map by rule: key is the result of the indexer function call,
 * value is the corresponding item.
 *
 * @param arr Array.
 * @param callback Indexer function.
 * @param scope `callback` call scope. Defaults to array itself.
 * @returns Array index.
 */
export function index<T>(arr: T[], callback: (item: T, index: number) => any, scope?: any): Dictionary<T> {
	scope = scope || arr;
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
 * Applies a function against an accumulator and each item in the array (from left to right)
 * to reduce it to a single value.
 *
 * @param arr Array.
 * @param reducer Standard reducer. See `jwidget/Reducer` for examples.
 * @returns Final accumulator value.
 */
export function reduce<T, U>(arr: T[], reducer: Reducer<T, U>): U;

/**
 * Applies a function against an accumulator and each item in the array (from left to right)
 * to reduce it to a single value.
 *
 * @param arr Array.
 * @param callback Function to execute on each item in the array.
 * @param initial Value to use as the first argument to the first call of the callback.
 * @returns Final accumulator value.
 */
export function reduce<T, U>(arr: T[], callback: (accumulator: U, item: T, index: number) => U, initial: U): U;
export function reduce<T, U>(arr: T[],
		reducer: Reducer<T, U> | ((accumulator: U, item: T, index: number) => U), initial?: U): U {
	let {value, callback} = (typeof reducer !== "function") ? initReduceState(reducer) : {
		value: initial,
		callback: reducer
	};
	return arr.reduce(callback, value);
}

/**
 * Inserts an item to array.
 *
 * @param arr Array.
 * @param item Item to insert.
 * @param index Index of an item to insert the new one before.
 * By default, appends the item to the end of array.
 */
export function add<T>(arr: T[], item: T, index?: number) {
	arr.splice(def(index, arr.length), 0, item);
}

/**
 * Inserts item range to array.
 *
 * @param arr Array.
 * @param items Items to insert.
 * @param index Index of an item to insert the new ones before.
 * By default, appends the items to the end of array.
 */
export function addAll<T>(arr: T[], items: T[], index?: number) {
	tryAddAll(arr, items, index);
}

/**
 * Replaces item at specified index.
 * If array doesn't contain such index, it will demolish the application.
 *
 * @param arr Array.
 * @param index Index of an item to replace.
 * @param item Item to replace with.
 * @returns The replaced item.
 */
export function set<T>(arr: T[], index: number, item: T): T {
	var result = trySet(arr, index, item);
	return (result !== undefined) ? result.value : arr[index];
}

/**
 * Removes item at specified position.
 * If array doesn't contain such index, it will demolish the application.
 *
 * @param arr Array.
 * @param index Index of an item to remove.
 * @returns The removed item.
 */
export function remove<T>(arr: T[], index: number): T {
	return arr.splice(index, 1)[0];
}

/**
 * Removes item range from array.
 *
 * @param arr Array.
 * @param index Index of the first item to remove.
 * @param count Count of items to remove.
 * @returns The removed items.
 */
export function removeAll<T>(arr: T[], index: number, count: number): T[]{
	var result = tryRemoveAll(arr, index, count);
	return result || [];
}

/**
 * Removes the first occurrence of an item in array.
 *
 * @param arr Array.
 * @param item Item to remove.
 * @returns Index of the removed item or -1.
 */
export function removeItem<T>(arr: T[], item: T): number {
	const index = arr.indexOf(item);
	if (index !== -1) {
		remove(arr, index);
	}
	return index;
}

/**
 * Removes all occurrences of items in array.
 *
 * @param arr Array.
 * @param items Items to remove.
 * @param getKey Function which returns unique key of an item in this array.
 * By default, identifies primitive values and `Identifiable` objects.
 */
export function removeItems<T>(arr: T[], items: T[], getKey?: (item: T) => any) {
	const itemSet = VidSet.fromArray<T>(items, getKey);
	const newItems = arr.filter(function (item: T): boolean {
		return !itemSet.contains(item);
	});
	clear(arr);
	addAll(arr, newItems);
}

/**
 * Moves an item inside array.
 *
 * @param arr Array.
 * @param fromIndex Item index to move.
 * @param toIndex Index to move to.
 * @returns The moved item.
 */
export function move<T>(arr: T[], fromIndex: number, toIndex: number): T {
	tryMove(arr, fromIndex, toIndex);
	return arr[toIndex];
}

/**
 * Clears array.
 *
 * @param arr Array.
 * @returns Old array contents. Never returns null or undefined.
 */
export function clear<T>(arr: T[]): T[]{
	var result = tryClear(arr);
	return (result !== undefined) ? result : [];
}

/**
 * Removes and inserts item ranges.
 *
 * @param arr Array.
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
 * Reorders array items.
 *
 * @param arr Array.
 * @param indexArray Index array. Item with index `i` is moved to index `indexArray[i]`.
 * Must contain all indexes from 0 to (length - 1).
 */
export function reorder<T>(arr: T[], indexArray: number[]) {
	tryReorder(arr, indexArray);
}

/**
 * Sorts array by the result of `callback` function call for each item.
 *
 * @param arr Array.
 * @param callback Indexer function. Must return a comparable value, compatible with
 * `cmp`. Returns item itself by default.
 * @param scope `callback` call scope. Defaults to array itself.
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
 * @param arr Array.
 * @param compare Comparer function. Should return positive value if t1 > t2;
 * negative value if t1 < t2; 0 if t1 == t2. Defaults to `cmp`.
 * @param scope `comparer` call scope. Defaults to array itself.
 * @param order Sorting order. Positive number for ascending sorting, negative for descending sorting.
 */
export function sortComparing<T>(arr: T[], compare?: (t1: T, t2: T, i1: number, i2: number) => number, scope?: any, order?: number) {
	var indexArray = detectSortComparing(arr, compare, scope, order);
	if (indexArray !== undefined) {
		tryReorder(arr, indexArray);
	}
}

/**
 * Checks two arrays for equality, item by item (===).
 *
 * @param x First array.
 * @param y Second array.
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
 * Checks all items against criteria in backward order.
 *
 * Returns true if criteria returns truthy value for all collection items.
 *
 * Algorithms iterates items consequently, and stops after the first item not matching the criteria.
 *
 * @param arr Array.
 * @param callback Criteria callback.
 * @param scope `callback` call scope. Defaults to array itself.
 * @returns True if every item matches the criteria.
 */
export function backEvery<T>(arr: T[], callback: (item: T, index: number) => any, scope?: any): boolean {
	scope = scope || arr;
	for (var i = arr.length - 1; i >= 0; --i) {
		if (!callback.call(scope, arr[i], i)) {
			return false;
		}
	}
	return true;
}

/**
 * Checks if every item in array is equal to its index: `array[i] === i`.
 *
 * @param arr Array.
 * @returns Every item is equal to its index.
 */
export function isIdentity(arr: number[]): boolean {
	for (var i = 0, l = arr.length; i < l; ++i) {
		if (arr[i] !== i) {
			return false;
		}
	}
	return true;
}

/**
 * Builds a new array by the rule: `result[array[i]] === i`.
 *
 * @param arr Array.
 * @returns The inverted array.
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
 * Builds a new array consisting of subarray items in the same order.
 *
 * @param arrays Array of subarrays.
 * @returns The merged array.
 */
export function merge<T>(arrays: T[][]): T[] {
	var result: T[] = [];
	for (var i = 0, l = arrays.length; i < l; ++i) {
		result.push.apply(result, arrays[i]);
	}
	return result;
}

/**
 * The same as `addAll`, but returns undefined if the array stays unmodified. Else returns true.
 *
 * @param arr Array.
 * @param items Items to insert.
 * @param index Index of an item to insert the new ones before.
 * By default, appends the items to the end of array.
 * @returns True if array was modified, else undefined.
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
 * Replaces item at specified index.
 * If array doesn't contain such index, it will demolish the application.
 *
 * @param arr Array.
 * @param index Index of an item to replace.
 * @param item Item to replace with.
 * @returns The replaced item. If array is not modified, returns undefined.
 */
export function trySet<T>(arr: T[], index: number, item: T): Some<T> {
	var oldItem = arr[index];
	if (item !== oldItem) {
		arr[index] = item;
		return { value: oldItem };
	}
	return undefined;
}

/**
 * Removes item range from array.
 *
 * @param arr Array.
 * @param index Index of first item to remove.
 * @param count Count of items to remove.
 * @returns The removed items. If array is not modified, returns undefined.
 */
export function tryRemoveAll<T>(arr: T[], index: number, count: number): T[]{
	if (count !== 0) {
		return arr.splice(index, count);
	}
	return undefined;
}

/**
 * Moves an item inside array.
 *
 * @param arr Array.
 * @param fromIndex Item index to move.
 * @param toIndex Index to move to.
 * @returns The moved item. If array is not modified, returns undefined.
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
 * Clears array.
 *
 * @param arr Array.
 * @returns Old array contents. If not modified - undefined.
 */
export function tryClear<T>(arr: T[]): T[]{
	if (arr.length !== 0) {
		return arr.splice(0, arr.length);
	}
	return undefined;
}

/**
 * Removes and inserts item ranges.
 *
 * @param arr Array.
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
 * @param arr Array.
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
 * Detects `splice` method arguments to adjust array contents to `newItems`.
 * Determines item ranges neccessary to be removed and inserted.
 * All items must have unique `getKey` function result.
 * If items don't have unique key, probably `detectFilter` method may help,
 * because it doesn't require item uniquiness.
 *
 * @param oldItems Old array contents.
 * @param newItems New array contents.
 * @param getKey Function which returns unique key of an item in this array.
 * By default, identifies primitive values and `Identifiable` objects.
 * @returns `splice` method arguments. If no method call required, returns undefined.
 */
export function detectSplice<T>(oldItems: T[], newItems: T[],
								getKey?: (item: T) => any): IList.SpliceParams<T> {
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
			const count = oldIndex - nextOldIndex;
			removeParamsList.push(new IndexCount(nextOldIndex, count));
			offset -= count;
		}
	}

	for (let newIndex = 0, l = newItems.length; newIndex < l; ++newIndex) {
		const item = newItems[newIndex];
		const oldIndex = oldIndexMap.get(item);
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
 * Detects `removeParamsList` argument of `splice` method to adjust array contents to `newItems`.
 * Determines item ranges neccessary to be removed.
 * Doesn't assume item insertion - try `detectSplice` if that's the case.
 * In advantage to `detectSplice`, doesn't require item uniquiness.
 *
 * @param oldItems Old array contents.
 * @param newItems New array contents.
 * @returns `removeParamsList` argument of `splice` method.
 * If no method call required, returns undefined.
 */
export function detectFilter<T>(oldItems: T[], newItems: T[]): IList.IndexCount[] {
	const removeParamsList: IList.IndexCount[] = [];
	let oldIndex = 0;
	const oldLength = oldItems.length;
	const newLength = newItems.length;
	for (let newIndex = 0; newIndex <= newLength; ++newIndex) {
		const newItem = newItems[newIndex];
		let count = 0;
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
 * Detects `reorder` method arguments to adjust array contents to `newItems`.
 * Determines indices to move the items to.
 * If `newItems` contents differ from `oldItems` contents,
 * you should pray Gods that application still works well.
 *
 * @param oldItems Old array contents.
 * @param newItems New array contents.
 * @param getKey Function which returns unique key of an item in this array.
 * By default, identifies primitive values and `Identifiable` objects.
 * @returns `indexArray` argument of `reorder` method.
 * If no method call required, returns undefined.
 */
export function detectReorder<T>(oldItems: T[], newItems: T[], getKey?: (item: T) => any): number[] {
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
 * Detects `reorder` method arguments to sort array contents by the result of `callback` call for each item.
 *
 * @param arr Array.
 * @param callback Indexer function. Must return a comparable value, compatible with
 * `cmp`. Returns item itself by default.
 * @param scope `callback` call scope. Defaults to array itself.
 * @param order Sorting order. Positive number for ascending sorting, negative for descending sorting.
 * @returns `indexArray` argument of `reorder` method.
 * If no method call required, returns undefined.
 */
export function detectSort<T>(arr: T[], callback?: (item: T, index: number) => any, scope?: any, order?: number): number[]{
	var keys = getSortingIndices(arr, callback, scope, order);
	if (!isIdentity(keys)) {
		return invert(keys);
	}
	return undefined;
}

/**
 * Detects `reorder` method arguments to sort array contents by comparer.
 *
 * @param arr Array.
 * @param compare Comparer function. Should return positive value if t1 > t2;
 * negative value if t1 < t2; 0 if t1 == t2. Defaults to `cmp`.
 * @param scope `comparer` call scope. Defaults to array itself.
 * @param order Sorting order. Positive number for ascending sorting, negative for descending sorting.
 * @returns `indexArray` argument of `reorder` method.
 * If no method call required, returns undefined.
 */
export function detectSortComparing<T>(arr: T[], compare?: (t1: T, t2: T, i1: number, i2: number) => number, scope?: any, order?: number): number[] {
	var keys = getSortingIndicesComparing(arr, compare, scope, order);
	if (!isIdentity(keys)) {
		return invert(keys);
	}
	return undefined;
}
