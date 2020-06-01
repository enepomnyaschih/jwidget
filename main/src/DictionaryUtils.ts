/*
MIT License

Copyright (c) 2020 Egor Nepomnyaschih

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

import Dictionary from './Dictionary';
import IMap from './IMap';
import {apply, cmp} from './index';
import {cmpPrimitives, identity, initReduceState, VidMap, VidSet} from './internal';
import Reducer from './Reducer';
import Some from './Some';

/**
 * Returns some item in dictionary.
 *
 * @param dict Dictionary.
 * @returns Some item. If dictionary is empty, returns undefined.
 */
export function getFirst<T>(dict: Dictionary<T>): T {
	return dict[getFirstKey(dict)];
}

/**
 * Returns key of some item in dictionary.
 *
 * @param dict Dictionary.
 * @returns Key of some item. If dictionary is empty, returns undefined.
 */
export function getFirstKey<T>(dict: Dictionary<T>): string {
	for (let key in dict) {
		return key;
	}
	return undefined;
}

/**
 * Returns count of items in dictionary.
 *
 * @param dict Dictionary.
 * @returns Count of items in dictionary.
 */
export function getLength<T>(dict: Dictionary<T>): number {
	let length = 0;
	for (let _key in dict) {
		++length;
	}
	return length;
}

/**
 * Checks if dictionary is empty.
 *
 * @param dict Dictionary.
 * @returns Dictionary has no keys/items.
 */
export function isEmpty<T>(dict: Dictionary<T>) {
	for (let _key in dict) {
		return false;
	}
	return true;
}

/**
 * Checks if the item exists in dictionary.
 *
 * @param dict Dictionary.
 * @param item Item to find.
 * @returns Item exists in dictionary.
 */
export function contains<T>(dict: Dictionary<T>, item: T): boolean {
	return !every(dict, function (v) {
		return item !== v;
	});
}

/**
 * Returns key of item in dictionary.
 *
 * @param dict Dictionary.
 * @param item Item to find.
 * @returns Key of item. If item doesn't exist, returns undefined.
 */
export function keyOf<T>(dict: Dictionary<T>, item: T): string {
	return findKey(dict, function (v) {
		return item === v;
	});
}

/**
 * Finds item matching criteria.
 *
 * Returns the first item for which callback returns truthy value.
 *
 * Algorithms iterates items consequently, and stops after first item matching the criteria.
 *
 * @param dict Dictionary.
 * @param callback Criteria callback.
 * @param scope `callback` call scope. Defaults to dictionary itself.
 * @returns Found item or undefined.
 */
export function find<T>(dict: Dictionary<T>, callback: (item: T, key: string) => any, scope?: any): T {
	let result: T = undefined;
	every(dict, function (item, key) {
		if (callback.call(scope, item, key)) {
			result = item;
			return false;
		}
		return true;
	});
	return result;
}

/**
 * Finds item matching criteria.
 *
 * Returns key of first item for which callback returns truthy value.
 *
 * Algorithms iterates items consequently, and stops after the first item matching the criteria.
 *
 * @param dict Dictionary.
 * @param callback Criteria callback.
 * @param scope `callback` call scope. Defaults to dictionary itself.
 * @returns Found item key or undefined.
 */
export function findKey<T>(dict: Dictionary<T>, callback: (item: T, key: string) => any, scope?: any): string {
	let result: string = undefined;
	every(dict, function (item, key) {
		if (callback.call(scope, item, key)) {
			result = key;
			return false;
		}
		return true;
	});
	return result;
}

/**
 * Returns the dictionary item which callback returns the highest (or lowest) value for.
 *
 * @param dict Dictionary.
 * @param callback Returns a comparable value, compatible with `cmp`. Returns item itself by default.
 * @param scope `callback` call scope. Defaults to dictionary itself.
 * @param order Pass positive order to find the highest value, and negative to find the lowest one.
 * @returns Maximum dictionary item.
 */
export function max<T>(dict: Dictionary<T>, callback?: (item: T, key: string) => any, scope?: any, order: number = 1): T {
	return dict[maxKey(dict, callback, scope, order)];
}

/**
 * Returns key of the dictionary item which callback returns the highest (or lowest) value for.
 *
 * @param dict Dictionary.
 * @param callback Returns a comparable value, compatible with `cmp`. Returns item itself by default.
 * @param scope `callback` call scope. Defaults to dictionary itself.
 * @param order Pass positive order to find the highest value, and negative to find the lowest one.
 * @returns Item key.
 */
export function maxKey<T>(dict: Dictionary<T>, callback?: (item: T, key: string) => any, scope?: any, order: number = 1): string {
	callback = callback || identity;
	scope = scope || dict;
	let result: string;
	let max: any;
	for (let key in dict) {
		const item: any = callback.call(scope, dict[key], key);
		if ((result === undefined) || (order > 0 && max < item) || (order < 0 && max > item)) {
			result = key;
			max = item;
		}
	}
	return result;
}

/**
 * Returns the highest (or lowest) dictionary item in terms of the specified comparer function.
 *
 * @param dict Dictionary.
 * @param compare Comparer function. Should return positive value if t1 > t2;
 * negative value if t1 < t2; 0 if t1 == t2. Defaults to `cmp`.
 * @param scope `compare` call scope. Defaults to dictionary itself.
 * @param order Pass positive order to find the highest value, and negative to find the lowest one.
 * @returns Dictionary item.
 */
export function maxComparing<T>(dict: Dictionary<T>, compare?: (t1: T, t2: T, k1: string, k2: string) => number, scope?: any, order: number = 1): T {
	return dict[maxKeyComparing(dict, compare, scope, order)];
}

/**
 * Returns key of the highest (or lowest) dictionary item in terms of the specified comparer function.
 *
 * @param dict Dictionary.
 * @param compare Comparer function. Should return positive value if t1 > t2;
 * negative value if t1 < t2; 0 if t1 == t2. Defaults to `cmp`.
 * @param scope `compare` call scope. Defaults to dictionary itself.
 * @param order Pass positive order to find the highest value, and negative to find the lowest one.
 * @returns Item key.
 */
export function maxKeyComparing<T>(dict: Dictionary<T>, compare?: (t1: T, t2: T, k1: string, k2: string) => number, scope?: any, order: number = 1): string {
	compare = compare || cmpPrimitives;
	scope = scope || dict;
	let result: string = undefined;
	for (let key in dict) {
		if (result === undefined || order * compare.call(scope, dict[result], dict[key], result, key) < 0) {
			result = key;
		}
	}
	return result;
}

/**
 * Returns the dictionary item which callback returns the lowest (or highest) value for.
 *
 * @param dict Dictionary.
 * @param callback Returns a comparable value, compatible with `cmp`. Returns item itself by default.
 * @param scope `callback` call scope. Defaults to dictionary itself.
 * @param order Pass positive order to find the lowest value, and negative to find the highest one.
 * @returns Dictionary item.
 */
export function min<T>(dict: Dictionary<T>, callback?: (item: T, key: string) => any, scope?: any, order: number = 1): T {
	return max(dict, callback, scope, -order);
}

/**
 * Returns index of the dictionary item which callback returns the lowest (or highest) value for.
 *
 * @param dict Dictionary.
 * @param callback Returns a comparable value, compatible with `cmp`. Returns item itself by default.
 * @param scope `callback` call scope. Defaults to dictionary itself.
 * @param order Pass positive order to find the lowest value, and negative to find the highest one.
 * @returns Item key.
 */
export function minKey<T>(dict: Dictionary<T>, callback?: (item: T, key: string) => any, scope?: any, order: number = 1): string {
	return maxKey(dict, callback, scope, -order);
}

/**
 * Returns the lowest (or highest) dictionary item in terms of the specified comparer function.
 *
 * @param dict Dictionary.
 * @param compare Comparer function. Should return positive value if t1 > t2;
 * negative value if t1 < t2; 0 if t1 == t2. Defaults to `cmp`.
 * @param scope `compare` call scope. Defaults to dictionary itself.
 * @param order Pass positive order to find the lowest value, and negative to find the highest one.
 * @returns Dictionary item.
 */
export function minComparing<T>(dict: Dictionary<T>, compare?: (t1: T, t2: T, k1: string, k2: string) => number, scope?: any, order: number = 1): T {
	return maxComparing(dict, compare, scope, -order);
}

/**
 * Returns index of the lowest (or highest) dictionary item in terms of the specified comparer function.
 *
 * @param dict Dictionary.
 * @param compare Comparer function. Should return positive value if t1 > t2;
 * negative value if t1 < t2; 0 if t1 == t2. Defaults to `cmp`.
 * @param scope `compare` call scope. Defaults to dictionary itself.
 * @param order Pass positive order to find the lowest value, and negative to find the highest one.
 * @returns Item key.
 */
export function minKeyComparing<T>(dict: Dictionary<T>, compare?: (t1: T, t2: T, k1: string, k2: string) => number, scope?: any, order: number = 1): string {
	return maxKeyComparing(dict, compare, scope, -order);
}

/**
 * Replaces item with specified key. If dictionary doesn't contain such key, new item is added.
 *
 * @param dict Dictionary.
 * @param key Key.
 * @param item Item.
 * @returns The replaced item.
 */
export function put<T>(dict: Dictionary<T>, key: string, item: T): T {
	const result = tryPut(dict, key, item);
	return (result !== undefined) ? result.value : dict[key];
}

/**
 * Adds or replaces a bunch of items.
 *
 * @param dict Dictionary.
 * @param items Items with corresponding keys.
 */
export function putAll<T>(dict: Dictionary<T>, items: Dictionary<T>) {
	for (let key in items) {
		dict[key] = items[key];
	}
}

/**
 * Low-performance alternative to `putAll` with verbose result set.
 *
 * @param dict Dictionary.
 * @param items Items with corresponding keys.
 * @returns Result of internal `splice` method call. Nevers returns null or undefined.
 */
export function putAllVerbose<T>(dict: Dictionary<T>, items: Dictionary<T>): IMap.SpliceResult<T> {
	const spliceResult = tryPutAll(dict, items);
	return (spliceResult !== undefined) ? spliceResult : { removedItems: {}, addedItems: {} };
}

/**
 * Removes item with specified key if it exists in dictionary.
 *
 * @param dict Dictionary.
 * @param key Key of item to remove.
 * @returns The removed dictionary item.
 */
export function remove<T>(dict: Dictionary<T>, key: string): T {
	return tryRemove(dict, key);
}

/**
 * Removes a bunch of items from dictionary.
 *
 * @param dict Dictionary.
 * @param keys Keys of items to remove.
 */
export function removeAll<T>(dict: Dictionary<T>, keys: string[]) {
	for (let i = 0, l = keys.length; i < l; ++i) {
		delete dict[keys[i]];
	}
}

/**
 * Low-performance alternative to `removeAll` with verbose result set.
 *
 * @param dict Dictionary.
 * @param keys Keys of items to remove.
 * @returns The removed items. Never returns null or undefined.
 */
export function removeAllVerbose<T>(dict: Dictionary<T>, keys: string[]): Dictionary<T> {
	const items = tryRemoveAll(dict, keys);
	return (items !== undefined) ? items : {};
}

/**
 * Removes an item from the dictionary.
 *
 * @param dict Dictionary.
 * @param item Item to remove.
 * @returns Item key in the dictionary.
 */
export function removeItem<T>(dict: Dictionary<T>, item: T): string {
	const key = keyOf(dict, item);
	if (key !== undefined) {
		tryRemove(dict, key);
	}
	return key;
}

/**
 * Removes all occurrences of items in dictionary.
 *
 * @param dict Dictionary.
 * @param items Items to remove.
 * @param getKey Function which returns unique key of an item in this dictionary.
 * By default, identifies primitive values and `Identifiable` objects.
 */
export function removeItems<T>(dict: Dictionary<T>, items: T[], getKey?: (item: T) => any) {
	const itemSet = VidSet.fromArray<T>(items, getKey);
	const newItems = filter(dict, function (item) {
		return !itemSet.contains(item);
	});
	tryClear(dict);
	tryPutAll(dict, newItems);
}

/**
 * Changes item key in dictionary. If dictionary doesn't contain `oldKey` or contains `newKey`, it causes an error.
 *
 * @param dict Dictionary.
 * @param oldKey Old item key.
 * @param newKey New item key.
 * @returns The moved item.
 */
export function setKey<T>(dict: Dictionary<T>, oldKey: string, newKey: string): T {
	const item = trySetKey(dict, oldKey, newKey);
	return (item !== undefined) ? item : dict[newKey];
}

/**
 * Clears dictionary.
 *
 * @param dict Dictionary.
 * @returns Old dictionary contents. Never returns null or undefined.
 */
export function clear<T>(dict: Dictionary<T>): Dictionary<T> {
	const result = tryClear(dict);
	return (result !== undefined) ? result : {};
}

/**
 * Removes and adds bunches of items in dictionary. Universal optimized granular operation of removal/insertion.
 *
 * @param dict Dictionary.
 * @param removedKeys Keys of items to remove.
 * @param updatedItems Items to add/replace.
 * @returns Splice result. Never returns null or undefined.
 */
export function splice<T>(dict: Dictionary<T>, removedKeys: string[], updatedItems: Dictionary<T>): IMap.SpliceResult<T> {
	const spliceResult = trySplice(dict, removedKeys, updatedItems);
	return (spliceResult !== undefined) ? spliceResult : { removedItems: {}, addedItems: {} };
}

/**
 * Changes item keys in dictionary.
 *
 * @param dict Dictionary.
 * @param keyMap Key mapping. Item with key `x` will gain key `keyMap[x]`.
 * It is enough to pass only changed keys, but unchanged keys or unexisting keys are acceptable as well.
 * @returns Map of changed keys. Never returns null or undefined.
 */
export function reindex<T>(dict: Dictionary<T>, keyMap: Dictionary<string>): Dictionary<string> {
	const result = tryReindex(dict, keyMap);
	return (result !== undefined) ? result : {};
}

/**
 * Returns a shallow copy of the dictionary.
 *
 * @param dict Dictionary.
 * @returns Shallow copy of dictionary.
 */
export function clone<T>(dict: Dictionary<T>): Dictionary<T> {
	const result: Dictionary<T> = {};
	for (let key in dict) {
		result[key] = dict[key];
	}
	return result;
}

/**
 * Matches all items against criteria.
 *
 * Returns true if callback returns truthy value for all dictionary items.
 *
 * Algorithms iterates items consequently, and stops after the first item not matching the criteria.
 *
 * @param dict Dictionary.
 * @param callback Criteria callback.
 * @param scope `callback` call scope. Defaults to dictionary itself.
 */
export function every<T>(dict: Dictionary<T>, callback: (item: T, key: string) => any, scope?: any): boolean {
	scope = scope || dict;
	for (let key in dict) {
		if (!callback.call(scope, dict[key], key)) {
			return false;
		}
	}
	return true;
}

/**
 * Matches each item against criteria.
 *
 * Returns true if callback returns truthy value for some dictionary item.
 *
 * Algorithms iterates items consequently, and stops after the first item matching the criteria.
 *
 * @param dict Dictionary.
 * @param callback Criteria callback.
 * @param scope `callback` call scope. Defaults to dictionary itself.
 */
export function some<T>(dict: Dictionary<T>, callback: (item: T, key: string) => any, scope?: any): boolean {
	return !every(dict, function (item, key) {
		return !callback.call(scope, item, key);
	});
}

/**
 * Iterates dictionary items. Calls specified function for all items.
 *
 * @param dict Dictionary.
 * @param callback Callback function.
 * @param scope `callback` call scope. Defaults to dictionary itself.
 */
export function forEach<T>(dict: Dictionary<T>, callback: (item: T, key: string) => any, scope?: any) {
	every(dict, function (item, key) {
		callback.call(scope, item, key);
		return true;
	});
}

/**
 * Filters dictionary by criteria.
 *
 * Builds new dictionary, consisting of items for which callback returns thuthy value.
 *
 * @param dict Dictionary.
 * @param callback Criteria callback.
 * @param scope `callback` call scope. Defaults to dictionary itself.
 * @returns Filtered dictionary.
 */
export function filter<T>(dict: Dictionary<T>, callback: (item: T, key: string) => any, scope?: any): Dictionary<T> {
	const result: Dictionary<T> = {};
	every(dict, function (item: T, key: string): boolean {
		if (callback.call(scope, item, key)) {
			result[key] = item;
		}
		return true;
	});
	return result;
}

/**
 * Counts the items matching criteria.
 *
 * Returns the number of items for which callback returns thuthy value.
 *
 * @param dict Dictionary.
 * @param callback Criteria callback.
 * @param scope `callback` call scope. Defaults to dictionary itself.
 * @returns Number of items.
 */
export function count<T>(dict: Dictionary<T>, callback: (item: T, key: string) => any, scope?: any): number {
	let result = 0;
	every(dict, function (item: T, key: string): boolean {
		if (callback.call(scope, item, key)) {
			++result;
		}
		return true;
	});
	return result;
}

/**
 * Maps dictionary items.
 *
 * Builds new dictionary, containing results of callback call for each dictionary item.
 *
 * @param dict Dictionary.
 * @param callback Mapping function.
 * @param scope `callback` call scope. Defaults to dictionary itself.
 * @returns Mapped dictionary.
 */
export function map<T, U>(dict: Dictionary<T>, callback: (item: T, key: string) => U, scope?: any): Dictionary<U> {
	const result: Dictionary<U> = {};
	every(dict, function (item: T, key: string): boolean {
		result[key] = callback.call(scope, item, key);
		return true;
	});
	return result;
}

/**
 * Returns keys of sorted items.
 *
 * Builds array of item keys, sorted by the result of callback call for each item.
 *
 * @param dict Dictionary.
 * @param callback Indexer function. Must return a comparable value, compatible with
 * `cmp`. Returns item itself by default.
 * @param scope `callback` call scope. Defaults to dictionary itself.
 * @param order Sorting order. Positive number for ascending sorting, negative for descending sorting.
 * @returns Array of indices.
 */
export function getSortingKeys<T>(dict: Dictionary<T>, callback?: (item: T, key: string) => any, scope?: any, order?: number): string[] {
	callback = callback || function (x) { return x; };
	order = order || 1;
	const pairs: any[] = [];
	every(dict, function (item, key) {
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
 * @param dict Dictionary.
 * @param compare Comparer function. Must return positive value if t1 > t2;
 * negative value if t1 < t2; 0 if t1 == t2. Defaults to `cmp`.
 * @param scope `comparer` call scope. Defaults to dictionary itself.
 * @param order Sorting order. Positive number for ascending sorting, negative for descending sorting.
 * @returns Array of keys.
 */
export function getSortingKeysComparing<T>(dict: Dictionary<T>, compare?: (t1: T, t2: T, k1: string, k2: string) => number, scope?: any, order?: number): string[] {
	compare = compare || cmp;
	order = order || 1;
	const pairs: any[] = [];
	every(dict, function (item, key) {
		pairs.push([key, item]);
		return true;
	}, scope);
	pairs.sort(function (x, y) {
		return order * compare.call(scope, x[1], y[1], x[0], y[0]);
	});
	return pairs.map(function (pair) {
		return pair[0];
	});
}

/**
 * Builds and returns a new array consisting of dictionary items sorted by the result of
 * callback call for each item.
 *
 * @param dict Dictionary.
 * @param callback Indexer function. Must return a comparable value, compatible with
 * `cmp`. Returns item itself by default.
 * @param scope `callback` call scope. Defaults to array itself.
 * @param order Sorting order. Positive number for ascending sorting, negative for descending sorting.
 * @returns Sorted array.
 */
export function toSorted<T>(dict: Dictionary<T>, callback?: (item: T, key: string) => any, scope?: any, order?: number): T[] {
	return getSortingKeys(dict, callback, scope, order).map(function (key): T {
		return dict[key];
	});
}

/**
 * Builds and returns a new array consisting of dictionary items sorted by comparer.
 *
 * @param dict Dictionary.
 * @param compare Comparer function. Must return positive value if t1 > t2;
 * negative value if t1 < t2; 0 if t1 == t2. Defaults to `cmp`.
 * @param scope `comparer` call scope. Defaults to array itself.
 * @param order Sorting order. Positive number for ascending sorting, negative for descending sorting.
 * @returns Sorted array.
 */
export function toSortedComparing<T>(dict: Dictionary<T>, compare?: (t1: T, t2: T, k1: string, k2: string) => number, scope?: any, order?: number): T[] {
	return getSortingKeysComparing(dict, compare, scope, order).map(function (key): T {
		return dict[key];
	});
}

/**
 * Converts dictionary to array.
 *
 * Builds new array consisting of dictionary items in arbitrary order.
 *
 * @param dict Dictionary.
 * @returns Dictionary items.
 */
export function toArray<T>(dict: Dictionary<T>): T[] {
	const result: T[] = [];
	every(dict, function (item) {
		result.push(item);
		return true;
	});
	return result;
}

/**
 * Indexes dictionary items.
 *
 * Builds new dictionary by rule: key is the result of indexer function call, value is the corresponding item.
 *
 * @param dict Dictionary.
 * @param callback Indexer function.
 * @param scope `callback` call scope. Defaults to array itself.
 * @returns Dictionary index.
 */
export function index<T>(dict: Dictionary<T>, callback: (item: T, key: string) => any, scope?: any): Dictionary<T> {
	const result: Dictionary<T> = {};
	every(dict, function (item, oldKey) {
		const key = callback.call(scope, item, oldKey);
		if (key != null) {
			result[key] = item;
		}
		return true;
	}, scope);
	return result;
}

/**
 * Applies a function against an accumulator and each item in the dictionary (from left to right)
 * to reduce it to a single value.
 *
 * @param dict Dictionary.
 * @param reducer Standard reducer. See `jwidget/Reducer` for examples.
 * @returns Final accumulator value.
 */
export function reduce<T, U>(dict: Dictionary<T>, reducer: Reducer<T, U>): U;

/**
 * Applies a function against an accumulator and each item in the dictionary (from left to right)
 * to reduce it to a single value.
 *
 * @param dict Dictionary.
 * @param callback Function to execute on each item in the dictionary.
 * @param initial Value to use as the first argument to the first call of the callback.
 * @returns Final accumulator value.
 */
export function reduce<T, U>(dict: Dictionary<T>, callback: (accumulator: U, item: T, key: string) => U, initial: U): U;
export function reduce<T, U>(dict: Dictionary<T>,
		reducer: Reducer<T, U> | ((accumulator: U, item: T, key: string) => U), initial?: U): U {
	let {value, callback} = (typeof reducer !== "function") ? initReduceState(reducer) : {
		value: initial,
		callback: reducer
	};
	for (let key in dict) {
		value = callback(value, dict[key], key);
	}
	return value;
}

/**
 * Checks two dictionaries for equality, item by item (===).
 *
 * @param x First dictionary.
 * @param y Second dictionary.
 * @returns Dictionaries are equal.
 */
export function equal<T>(x: Dictionary<T>, y: Dictionary<T>): boolean {
	if (x === y) {
		return true;
	}
	let length = getLength(y);
	for (let key in x) {
		if ((--length < 0) || (x[key] !== y[key])) {
			return false;
		}
	}
	return length === 0;
}

/**
 * Replaces item with specified key. If dictionary doesn't contain such key, new item is added.
 *
 * @param dict Dictionary.
 * @param key Key.
 * @param item Item.
 * @returns The replaced item. If dictionary is not modified, returns undefined.
 */
export function tryPut<T>(dict: Dictionary<T>, key: string, item: T): Some<T> {
	var oldItem = dict[key];
	if (oldItem === item) {
		return undefined;
	}
	dict[key] = item;
	return { value: oldItem };
}

/**
 * Adds or replaces a bunch of items.
 *
 * @param dict Dictionary.
 * @param items Items with corresponding keys.
 * @returns Result of internal `splice` method call. If dictionary is not modified, returns undefined.
 */
export function tryPutAll<T>(dict: Dictionary<T>, items: Dictionary<T>): IMap.SpliceResult<T> {
	const removedItems: Dictionary<T> = {};
	const addedItems: Dictionary<T> = {};
	for (let key in items) {
		const item = items[key];
		const oldItem = tryPut(dict, key, item);
		if (oldItem === undefined) {
			continue;
		}
		const removedItem = oldItem.value;
		if (removedItem !== undefined) {
			removedItems[key] = removedItem;
		}
		addedItems[key] = item;
	}
	if (!isEmpty(removedItems) || !isEmpty(addedItems)) {
		return { removedItems: removedItems, addedItems: addedItems };
	}
	return undefined;
}

/**
 * Removes item with specified key if it exists in dictionary.
 *
 * @param dict Dictionary.
 * @param key Key of item to remove.
 * @returns Old dictionary item. If dictionary is not modified, returns undefined.
 */
export function tryRemove<T>(dict: Dictionary<T>, key: string): T {
	const item = dict[key];
	if (item !== undefined) {
		delete dict[key];
	}
	return item;
}

/**
 * Removes a bunch of items from dictionary.
 *
 * @param dict Dictionary.
 * @param keys Keys of items to remove.
 * @returns The removed items. If dictionary is not modified, returns undefined.
 */
export function tryRemoveAll<T>(dict: Dictionary<T>, keys: string[]): Dictionary<T> {
	const items: Dictionary<T> = {};
	for (let i = 0, l = keys.length; i < l; ++i) {
		const key = keys[i];
		const item = tryRemove(dict, key);
		if (item !== undefined) {
			items[key] = item;
		}
	}
	if (!isEmpty(items)) {
		return items;
	}
	return undefined;
}

/**
 * Changes item key in dictionary. If dictionary doesn't contain `oldKey` or contains `newKey`, it causes an error.
 *
 * @param dict Dictionary.
 * @param oldKey Old item key.
 * @param newKey New item key.
 * @returns The moved item. If dictionary is not modified, returns undefined.
 */
export function trySetKey<T>(dict: Dictionary<T>, oldKey: string, newKey: string): T {
	if (oldKey === newKey) {
		return undefined;
	}
	const item = dict[oldKey];
	delete dict[oldKey];
	dict[newKey] = item;
	return item;
}

/**
 * Clears dictionary.
 *
 * @param dict Dictionary.
 * @returns Old dictionary contents. If not modified, returns undefined.
 */
export function tryClear<T>(dict: Dictionary<T>): Dictionary<T> {
	if (isEmpty(dict)) {
		return undefined;
	}
	const items: Dictionary<T> = apply({}, dict);
	for (let key in items) {
		delete dict[key];
	}
	return items;
}

/**
 * Removes and adds bunches of items in dictionary. Universal optimized granular operation of removal/insertion.
 *
 * @param dict Dictionary.
 * @param removedKeys Keys of items to remove.
 * @param updatedItems Items to add/replace.
 * @returns Splice result. If dictionary is not modified, returns undefined.
 */
export function trySplice<T>(dict: Dictionary<T>, removedKeys: string[], updatedItems: Dictionary<T>): IMap.SpliceResult<T> {
	removedKeys = removedKeys.filter(function (key) {
		return !updatedItems.hasOwnProperty(key);
	});
	const removedItems = tryRemoveAll(dict, removedKeys);
	const spliceResult = tryPutAll(dict, updatedItems);
	if (spliceResult !== undefined) {
		apply(spliceResult.removedItems, removedItems);
		return spliceResult;
	}
	if (removedItems !== undefined) {
		return { removedItems: removedItems, addedItems: {} };
	}
	return undefined;
}

/**
 * Changes item keys in dictionary.
 *
 * @param dict Dictionary.
 * @param keyMap Key mapping. Item with key `x` will gain key `keyMap[x]`.
 * It is neccessary to pass only changed keys, but unchanged keys or unexisting keys are acceptable as well.
 * @returns Map of changed keys. If dictionary is not modified, returns undefined.
 */
export function tryReindex<T>(dict: Dictionary<T>, keyMap: Dictionary<string>): Dictionary<string> {
	const sanitizedKeyMap: Dictionary<string> = {};
	for (let oldKey in keyMap) {
		const newKey = keyMap[oldKey];
		if ((newKey === undefined) || (newKey === oldKey) || (dict[oldKey] === undefined)) {
			continue;
		}
		sanitizedKeyMap[oldKey] = newKey;
	}

	const backKeyMap = getInverted(sanitizedKeyMap);
	const removedKeys: string[] = [];
	const updatedItems: Dictionary<T> = {};
	for (let oldKey in sanitizedKeyMap) {
		const newKey = sanitizedKeyMap[oldKey];
		// JW.assertUndefined(updatedItems[newKey]);
		sanitizedKeyMap[oldKey] = newKey;
		updatedItems[newKey] = dict[oldKey];
		if (backKeyMap[oldKey] === undefined) {
			removedKeys.push(oldKey);
		}
	}

	if (isEmpty(sanitizedKeyMap)) {
		return undefined;
	}
	for (let i = 0, l = removedKeys.length; i < l; ++i) {
		delete dict[removedKeys[i]];
	}
	apply(dict, updatedItems);
	return sanitizedKeyMap;
}

/**
 * Detects `splice` method arguments to adjust dictionary contents to `newItems`.
 * Determines which item bunches should be removed and which ones should be inserted/replaced, and their keys.
 *
 * @param oldItems Old dictionary contents.
 * @param newItems New dictionary contents.
 * @returns `splice` method arguments. If no method call required, returns undefined.
 */
export function detectSplice<T>(oldItems: Dictionary<T>, newItems: Dictionary<T>): IMap.SpliceParams<T> {
	const removedKeys: string[] = [];
	const updatedItems: Dictionary<T> = {};
	for (let key in oldItems) {
		if (!newItems.hasOwnProperty(key)) {
			removedKeys.push(key);
		}
	}
	for (let key in newItems) {
		const item = newItems[key];
		if (item !== oldItems[key]) {
			updatedItems[key] = item;
		}
	}
	if ((removedKeys.length !== 0) || !isEmpty(updatedItems)) {
		return { removedKeys: removedKeys, updatedItems: updatedItems };
	}
	return undefined;
}

/**
 * Detects `reindex` method arguments to adjust dictionary contents to `newItems`.
 * Determines which keys should be assigned to all items.
 * If `newItems` contents differ from current dictionary contents, the dictionary will be broken.
 *
 * @param oldItems Old dictionary contents.
 * @param newItems New dictionary contents.
 * @param getKey Function which returns unique key of an item in this dictionary.
 * By default, identifies primitive values and `Identifiable` objects.
 * @returns `keyMap` argument of `reindex` method. If no method call required, returns undefined.
 */
export function detectReindex<T>(oldItems: Dictionary<T>, newItems: Dictionary<T>, getKey?: (item: T) => any): Dictionary<string> {
	const newItemKeys = new VidMap<T, string>(getKey)
	for (let key in newItems) {
		newItemKeys.put(newItems[key], key);
	}
	const keyMap: Dictionary<string> = {};
	for (let oldKey in oldItems) {
		const newKey = newItemKeys.get(oldItems[oldKey]);
		if (oldKey !== newKey) {
			keyMap[oldKey] = newKey;
		}
	}
	if (!isEmpty(keyMap)) {
		return keyMap;
	}
	return undefined;
}

/**
 * Based on the removed and added items during dictionary splice, returns keys which
 * were effectively removed, not replaced by other items.
 *
 * @param removedItems Removed items.
 * @param addedItems Added items.
 * @returns Effectively removed keys.
 */
export function getRemovedKeys<T>(removedItems: Dictionary<T>, addedItems: Dictionary<T>): string[] {
	const removedKeys: string[] = [];
	for (let key in removedItems) {
		if (!addedItems.hasOwnProperty(key)) {
			removedKeys.push(key);
		}
	}
	return removedKeys;
}

/**
 * Creates a new dictionary by rule: `result[dict[key]] === key`.
 *
 * @param dict Dictionary.
 * @returns The inverted dictionary.
 */
export function getInverted(dict: Dictionary<string>): Dictionary<string> {
	// JW.assertMap(dict, JW.assertString);
	var result: Dictionary<string> = {};
	for (var key in dict) {
		// JW.assertUndefined(result[dict[key]]);
		result[dict[key]] = key;
	}
	return result;
}
