import {apply, cmp, cmpCaseSensitive, iidForcibly, Dictionary, Proxy} from '../../core/Core';
import {IClass} from '../../core/IClass';
import {array} from '../../core/globals';
import * as ArrayUtils from './array';
import * as Maps from '../interfaces/IMap';

/**
 * Returns first item in collection. If collection is empty, returns undefined.
 */
export function getFirst<T>(map: Dictionary<T>): T {
	return map[getFirstKey(map)];
}

/**
 * Returns key of first collection item. If collection is empty, returns undefined.
 */
export function getFirstKey<T>(map: Dictionary<T>): string {
	for (var key in map) {
		return key;
	}
}

/**
 * Returns count of items in collection.
 */
export function getLength<T>(map: Dictionary<T>): number {
	var length = 0;
	for (var key in map) {
		++length;
	}
	return length;
}

/**
 * Checks collection for emptiness.
 */
export function isEmpty<T>(map: Dictionary<T>): boolean {
	for (var key in map) {
		return false;
	}
	return true;
}

/**
 * Returns item by key. If item with such key doesn't exist, returns undefined.
 */
export function get<T>(map: Dictionary<T>, key: string): T {
	return map[key];
}

/**
 * Returns array of keys of all collection items.
 */
export function getKeys<T>(map: Dictionary<T>): string[] {
	var keys = array<string>();
	for (var key in map) {
		keys.push(key);
	}
	return keys;
}

/**
 * Checks existance of item with specified key in collection.
 */
export function containsKey<T>(map: Dictionary<T>, key: string): boolean {
	return map[key] !== undefined;
}

/**
 * Checks item for existance in collection.
 */
export function containsItem<T>(map: Dictionary<T>, item: T): boolean {
	return !every(map, function (v) {
		return item !== v;
	});
}

/**
 * Returns key of item in collection. If such item doesn't exist, returns undefined.
 */
export function keyOf<T>(map: Dictionary<T>, item: T): string {
	return find(map, function (v) {
		return item === v;
	});
}

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
export function every<T>(map: Dictionary<T>, callback: (item: T, key: string) => boolean, scope?: any): boolean {
	scope = scope || map;
	for (var key in map) {
		if (callback.call(scope, map[key], key) === false) {
			return false;
		}
	}
	return true;
}

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
export function some<T>(map: Dictionary<T>, callback: (item: T, key: string) => boolean, scope?: any): boolean {
	return !every(map, function (item, key) {
		return callback.call(this, item, key) === false;
	}, scope);
}

/**
 * Iterates collection items. Calls specified function for all items.
 *
 * @param callback Callback function.
 * @param scope **callback** call scope. Defaults to collection itself.
 */
export function each<T>(map: Dictionary<T>, callback: (item: T, key: string) => any, scope?: any) {
	every(map, function (item, key) {
		callback.call(this, item, key);
		return true;
	}, scope);
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
export function find<T>(map: Dictionary<T>, callback: (item: T, key: string) => boolean, scope?: any): string {
	var result: string;
	every(map, function (item, key) {
		if (callback.call(this, item, key) !== false) {
			result = key;
			return false;
		}
		return true;
	}, scope);
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
export function search<T>(map: Dictionary<T>, callback: (item: T, key: string) => boolean, scope?: any): T {
	var result: T;
	every(map, function (item, key) {
		if (callback.call(this, item, key) !== false) {
			result = item;
			return false;
		}
		return true;
	}, scope);
	return result;
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
export function filter<T>(map: Dictionary<T>, callback: (item: T, key: string) => boolean, scope?: any): Dictionary<T> {
	var result: Dictionary<T> = {};
	every(map, function (item: T, key: string): boolean {
		if (callback.call(this, item, key) !== false) {
			result[key] = item;
		}
		return true;
	}, scope);
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
export function count<T>(map: Dictionary<T>, callback: (item: T, key: string) => boolean, scope?: any): number {
	var result = 0;
	every(map, function (item: T, key: string): boolean {
		if (callback.call(this, item, key) !== false) {
			++result;
		}
		return true;
	}, scope);
	return result;
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
export function map<T, U>(map: Dictionary<T>, callback: (item: T, key: string) => U, scope?: any): Dictionary<U> {
	var result: Dictionary<U> = {};
	every(map, function (item: T, key: string): boolean {
		result[key] = callback.call(this, item, key);
		return true;
	}, scope);
	return result;
}

/**
 * Returns keys of sorted items.
 *
 * Builds array of item keys, sorted by result of callback call for each item.
 *
 * @param callback Indexer function. Must return a comparable value, compatible with
 * [[JW.cmp]]. Returns item itself by default.
 * @param scope **callback** call scope. Defaults to collection itself.
 * @param order Sorting order. Positive number for ascending sorting, negative for descending sorting.
 * @returns Sorted item keys array.
 */
export function getSortingKeys<T>(map: Dictionary<T>, callback?: (item: T, key: string) => any, scope?: any, order?: number): string[] {
	callback = callback || function (x) { return x; };
	order = order || 1;
	var pairs = [];
	every(map, function (item, key) {
		pairs.push([key, callback.call(this, item, key)]);
		return true;
	}, scope);
	pairs.sort(function (x, y) {
		return order * cmp(x[1], y[1]);
	});
	return ArrayUtils.map(pairs, function (pair) {
		return pair[0];
	});
}

/**
 * Returns keys of sorted items.
 *
 * Builds array of item keys, sorted by comparer.
 *
 * @param compare Comparer function. Should return positive value if t1 > t2;
 * negative value if t1 < t2; 0 if t1 == t2.
 * Defaults to [[JW.cmp]]
 * @param scope **comparer** call scope. Defaults to collection itself.
 * @param order Sorting order. Positive number for ascending sorting, negative for descending sorting.
 * @returns Sorted item keys array.
 */
export function getSortingKeysComparing<T>(map: Dictionary<T>, compare?: (t1: T, t2: T, k1: string, k2: string) => any, scope?: any, order?: number): string[] {
	compare = compare || cmpCaseSensitive;
	order = order || 1;
	var pairs = [];
	every(map, function (item, key) {
		pairs.push([key, item]);
		return true;
	}, scope);
	pairs.sort(function (x, y) {
		return order * compare.call(scope, x[1], y[1], x[0], y[0]);
	});
	return ArrayUtils.map(pairs, function (pair) {
		return pair[0];
	});
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
export function toSorted<T>(map: Dictionary<T>, callback?: (item: T, key: string) => any, scope?: any, order?: number): T[] {
	return ArrayUtils.map(getSortingKeys(map, callback, scope, order), function (key): T {
		return map[key];
	});
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
export function toSortedComparing<T>(map: Dictionary<T>, compare?: (t1: T, t2: T, k1: string, k2: string) => any, scope?: any, order?: number): T[] {
	return ArrayUtils.map(getSortingKeysComparing(map, compare, scope, order), function (key): T {
		return map[key];
	});
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
export function index<T>(map: Dictionary<T>, callback: (item: T, key: string) => string, scope?: any): Dictionary<T> {
	var result: Dictionary<T> = {};
	every(map, function (item, oldKey) {
		var key = callback.call(this, item, oldKey);
		if (key != null) {
			result[key] = item;
		}
		return true;
	}, scope);
	return result;
}

/**
 * Converts collection to array.
 *
 * Builds new array consisting of collection items.
 */
export function toArray<T>(map: Dictionary<T>): T[] {
	var result: T[] = [];
	every(map, function (item) {
		result.push(item);
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
export function toSet<T extends IClass>(map: Dictionary<T>): Dictionary<T> {
	return index(map, iidForcibly);
}

/**
 * Replaces item with specified key. If map doesn't contain such key, new item is added.
 * @returns The replaced item.
 */
export function set<T>(map: Dictionary<T>, item: T, key: string): T {
	var result = trySet(map, item, key);
	return (result !== undefined) ? result.value : map[key];
}

/**
 * Replaces item with specified key. If map doesn't contain such key, new item is added.
 * @returns Proxy of the replaced item. If collection is not modified, returns undefined.
 */
export function trySet<T>(map: Dictionary<T>, item: T, key: string): Proxy<T> {
	var oldItem = map[key];
	if (oldItem === item) {
		return;
	}
	map[key] = item;
	return { value: oldItem };
}

/**
 * Adds or replaces a bunch of items.
 */
export function setAll<T>(map: Dictionary<T>, items: Dictionary<T>) {
	for (var key in items) {
		map[key] = items[key];
	}
}

/**
 * Low-performance alternative to [[setAll]] with verbose result set.
 * @returns Result of internal [[splice]] method call.
 */
export function setAllVerbose<T>(map: Dictionary<T>, items: Dictionary<T>): Maps.SpliceResult<T> {
	var spliceResult = trySetAll(map, items);
	return (spliceResult !== undefined) ? spliceResult : { removedItems: {}, addedItems: {} };
}

/**
 * Adds or replaces a bunch of items.
 * @returns Result of internal [[splice]] method call.
 * If collection is not modified, returns undefined.
 */
export function trySetAll<T>(map: Dictionary<T>, items: Dictionary<T>): Maps.SpliceResult<T> {
	var removedItems: Dictionary<T> = {};
	var addedItems: Dictionary<T> = {};
	for (var key in items) {
		var item = items[key];
		var oldItem = trySet(map, item, key);
		if (oldItem === undefined) {
			continue;
		}
		var removedItem = oldItem.value;
		if (removedItem !== undefined) {
			removedItems[key] = removedItem;
		}
		addedItems[key] = item;
	}
	if (!isEmpty(removedItems) || !isEmpty(addedItems)) {
		return { removedItems: removedItems, addedItems: addedItems };
	}
}

/**
 * Changes item key in map. If collection doesn't contain oldKey or contains newKey, it causes an error.
 * @returns The moved item.
 */
export function setKey<T>(map: Dictionary<T>, oldKey: string, newKey: string): T {
	var item = trySetKey(map, oldKey, newKey);
	return (item !== undefined) ? item : map[newKey];
}

/**
 * Changes item key in map. If collection doesn't contain oldKey or contains newKey, it causes an error.
 * @returns The moved item.
 * If collection is not modified, returns undefined.
 */
export function trySetKey<T>(map: Dictionary<T>, oldKey: string, newKey: string): T {
	if (oldKey === newKey) {
		return;
	}
	var item = map[oldKey];
	delete map[oldKey];
	map[newKey] = item;
	return item;
}

/**
 * Removes an item from the map.
 * @returns Old item key in the map.
 */
export function removeItem<T>(map: Dictionary<T>, item: T): string {
	var key = keyOf(map, item);
	if (key !== undefined) {
		tryRemove(map, key);
	}
	return key;
}

/**
 * Removes item with specified key if it exists in map.
 * @returns Old collection item.
 */
export function remove<T>(map: Dictionary<T>, key: string): T {
	return tryRemove(map, key);
}

/**
 * Removes item with specified key if it exists in map.
 * @returns Old collection item.
 * If collection is not modified, returns undefined.
 */
export function tryRemove<T>(map: Dictionary<T>, key: string): T {
	var item = map[key];
	if (item !== undefined) {
		delete map[key];
	}
	return item;
}

/**
 * Removes a bunch of items from map.
 */
export function removeAll<T>(map: Dictionary<T>, keys: string[]) {
	for (var i = 0, l = keys.length; i < l; ++i) {
		var key = keys[i];
		delete map[key];
	}
}

/**
 * Low-performance alternative to [[removeAll]] with verbose result set.
 * @returns The removed items.
 */
export function removeAllVerbose<T>(map: Dictionary<T>, keys: string[]): Dictionary<T> {
	var items = tryRemoveAll(map, keys);
	return (items !== undefined) ? items : {};
}

/**
 * Removes a bunch of items from map.
 * @returns The removed items.
 * If collection is not modified, returns undefined.
 */
export function tryRemoveAll<T>(map: Dictionary<T>, keys: string[]): Dictionary<T> {
	var items: Dictionary<T> = {};
	for (var i = 0, l = keys.length; i < l; ++i) {
		var key = keys[i];
		var item = tryRemove(map, key);
		if (item !== undefined) {
			items[key] = item;
		}
	}
	if (!isEmpty(items)) {
		return items;
	}
}

/**
 * Removes all occurrences of items in collection.
 * **Known issue:** *Works only if T extends JW.Class!*
 */
export function removeItems<T extends IClass>(map: Dictionary<T>, items: T[]) {
	var itemSet = ArrayUtils.toSet(items);
	var newItems = filter(map, function (item) {
		return !itemSet.hasOwnProperty(String(item._iid));
	});
	performSplice(map, newItems);
}

/**
 * Clears collection.
 * @returns Old collection contents. Never returns null or undefined.
 */
export function clear<T>(map: Dictionary<T>): Dictionary<T> {
	var result = tryClear(map);
	return (result !== undefined) ? result : {};
}

/**
 * Clears collection.
 * @returns Old collection contents. If not modified - undefined.
 */
export function tryClear<T>(map: Dictionary<T>): Dictionary<T> {
	if (isEmpty(map)) {
		return;
	}
	var items: Dictionary<T> = apply<T>({}, map);
	for (var key in items) {
		delete map[key];
	}
	return items;
}

/**
 * Removes and adds bunches of items in map. Universal optimized granular operation of removal/insertion.
 * @param removedKeys Keys of items to remove.
 * @param updatedItems Items to add/replace.
 * @returns Splice result. Never returns null or undefined.
 */
export function splice<T>(map: Dictionary<T>, removedKeys: string[], updatedItems: Dictionary<T>): Maps.SpliceResult<T> {
	var spliceResult = trySplice(map, removedKeys, updatedItems);
	return (spliceResult !== undefined) ? spliceResult : { removedItems: {}, addedItems: {} };
}

/**
 * Removes and adds bunches of items in map. Universal optimized granular operation of removal/insertion.
 * @param removedKeys Keys of items to remove.
 * @param updatedItems Items to add/replace.
 * @returns Splice result.
 * If collection is not modified, returns undefined.
 */
export function trySplice<T>(map: Dictionary<T>, removedKeys: string[], updatedItems: Dictionary<T>): Maps.SpliceResult<T> {
	removedKeys = ArrayUtils.filter(removedKeys, function (key) {
		return !updatedItems.hasOwnProperty(key);
	});
	var removedItems = tryRemoveAll(map, removedKeys);
	var spliceResult = trySetAll(map, updatedItems);
	if (spliceResult !== undefined) {
		apply(spliceResult.removedItems, removedItems);
		return spliceResult;
	}
	if (removedItems !== undefined) {
		return { removedItems: removedItems, addedItems: {} };
	}
}

/**
 * Changes item keys in map.
 * @param keyMap Key map. Item with key x will gain key keyMap[x].
 * It is neccessary to pass only changed keys, but unchanged keys or unexisting keys are acceptable as well.
 * @returns Map of changed keys. Never returns null or undefined.
 */
export function reindex<T>(map: Dictionary<T>, keyMap: Dictionary<string>): Dictionary<string> {
	var result = tryReindex(map, keyMap);
	return (result !== undefined) ? result : {};
}

/**
 * Changes item keys in map.
 * @param keyMap Key map. Item with key x will gain key keyMap[x].
 * It is neccessary to pass only changed keys, but unchanged keys or unexisting keys are acceptable as well.
 * @returns Map of changed keys.
 * If collection is not modified, returns undefined.
 */
export function tryReindex<T>(map: Dictionary<T>, keyMap: Dictionary<string>): Dictionary<string> {
	var sanitizedKeyMap: Dictionary<string> = {};
	for (var oldKey in keyMap) {
		var newKey = keyMap[oldKey];
		if ((newKey === undefined) || (newKey === oldKey) || (map[oldKey] === undefined)) {
			continue;
		}
		sanitizedKeyMap[oldKey] = newKey;
	}

	var backKeyMap = getInverted(sanitizedKeyMap);
	var removedKeys: string[] = [];
	var updatedItems: Dictionary<T> = {};
	for (var oldKey in sanitizedKeyMap) {
		var newKey = sanitizedKeyMap[oldKey];
		// JW.assertUndefined(updatedItems[newKey]);
		sanitizedKeyMap[oldKey] = newKey;
		updatedItems[newKey] = map[oldKey];
		if (backKeyMap[oldKey] === undefined) {
			removedKeys.push(oldKey);
		}
	}

	if (isEmpty(sanitizedKeyMap)) {
		return;
	}
	for (var i = 0, l = removedKeys.length; i < l; ++i) {
		delete map[removedKeys[i]];
	}
	apply(map, updatedItems);
	return sanitizedKeyMap;
}

/**
 * Detects [[splice]] method arguments to adjust map contents to **newItems**.
 * Determines which item bunches should be removed and which ones should be inserted/replaced, and their keys.
 * @param newItems New map contents.
 * @returns [[splice]] method arguments. If no method call required, returns undefined.
 */
export function detectSplice<T>(oldItems: Dictionary<T>, newItems: Dictionary<T>): Maps.SpliceParams<T> {
	var removedKeys: string[] = [];
	var updatedItems: Dictionary<T> = {};
	for (var key in oldItems) {
		if (!newItems.hasOwnProperty(key)) {
			removedKeys.push(key);
		}
	}
	for (var key in newItems) {
		var item = newItems[key];
		if (item !== oldItems[key]) {
			updatedItems[key] = item;
		}
	}
	if ((removedKeys.length !== 0) || !isEmpty(updatedItems)) {
		return { removedKeys: removedKeys, updatedItems: updatedItems };
	}
}

/**
 * Detects [[reindex]] method arguments to adjust map contents to **newItems**.
 * Determines which keys should be assigned to all items.
 * If **newItems** contents differ from current map contents, the map will be broken.
 * @param newItems New map contents.
 * @param getKey Function which returns unique key of an item in this collection.
 * Defaults to [[getKey]].
 * If collection consists of instances of JW.Class, then you are in a good shape.
 * @param scope **getKey** call scope. Defaults to collection itself.
 * @returns **keyMap** argument of [[reindex]] method.
 * If no method call required, returns undefined.
 */
export function detectReindex<T>(oldItems: Dictionary<T>, newItems: Dictionary<T>, getKey?: (item: T) => any, scope?: any): Dictionary<string> {
	getKey = getKey || iidForcibly;
	scope = scope || oldItems;
	var newItemKeys: Dictionary<string> = {};
	for (var key in newItems) {
		newItemKeys[getKey.call(scope, newItems[key])] = key;
	}
	var keyMap: Dictionary<string> = {};
	for (var oldKey in oldItems) {
		var newKey = newItemKeys[getKey.call(scope, oldItems[oldKey])];
		if (oldKey !== newKey) {
			keyMap[oldKey] = newKey;
		}
	}
	if (!isEmpty(keyMap)) {
		return keyMap;
	}
}

/**
 * Adjusts map contents to **newItems** using [[detectSplice]] and
 * [[splice]] methods.
 * @param newItems New map contents.
 */
export function performSplice<T>(map: Dictionary<T>, newItems: Dictionary<T>) {
	var params = detectSplice(map, newItems);
	if (params !== undefined) {
		trySplice(map, params.removedKeys, params.updatedItems);
	}
}

/**
 * Adjusts map contents to **newItems** using [[detectReindex]] and
 * [[reindex]] methods.
 * @param newItems New map contents.
 * @param getKey Function which returns unique key of an item in this collection.
 * Defaults to [[getKey]].
 * If collection consists of instances of JW.Class, then you are in a good shape.
 * @param scope **getKey** call scope. Defaults to collection itself.
 */
export function performReindex<T>(map: Dictionary<T>, newItems: Dictionary<T>, getKey?: (item: T) => any, scope?: any) {
	var keyMap = detectReindex(map, newItems, getKey, scope);
	if (keyMap !== undefined) {
		tryReindex(map, keyMap);
	}
}

/**
 * Checks for equality (===) to another map, item by item.
 */
export function equal<T>(x: Dictionary<T>, y: Dictionary<T>): boolean {
	if (x === y) {
		return true;
	}
	var length = getLength(y);
	for (var key in x) {
		if ((--length < 0) || (x[key] !== y[key])) {
			return false;
		}
	}
	return length === 0;
}

/**
 * Creates a new map containing a single item.
 */
export function single<T>(key: string, item: T): Dictionary<T> {
	var result: Dictionary<T> = {};
	result[key] = item;
	return result;
}

/**
 * Given all removed and added items during map splice, returns keys which
 * were effectively removed, not replaced by other items.
 */
export function getRemovedKeys<T>(removedItems: Dictionary<T>, addedItems: Dictionary<T>): string[] {
	var removedKeys: string[] = [];
	for (var key in removedItems) {
		if (!addedItems.hasOwnProperty(key)) {
			removedKeys.push(key);
		}
	}
	return removedKeys;
}

/**
 * Creates a new map by rule: result[map[key]] === key.
 */
export function getInverted(map: Dictionary<string>): Dictionary<string> {
	// JW.assertMap(map, JW.assertString);
	var result: Dictionary<string> = {};
	for (var key in map) {
		// JW.assertUndefined(result[map[key]]);
		result[map[key]] = key;
	}
	return result;
}
