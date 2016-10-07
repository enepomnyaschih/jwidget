import {apply, cmp, iidString, Dictionary} from '../../core/Core';
import {IClass} from '../../core/IClass';
import {array} from '../../core/globals';
import * as ArrayUtils from './Array';
import * as Sets from '../interfaces/ISet';

/**
 * Returns count of items in collection.
 */
export function getLength<T extends IClass>(set: Dictionary<T>): number {
	var length = 0;
	for (var key in set) {
		++length;
	}
	return length;
}

/**
 * Checks collection for emptiness.
 */
export function isEmpty<T extends IClass>(set: Dictionary<T>): boolean {
	for (var key in set) {
		return false;
	}
	return true;
}

/**
 * Returns first item in collection. If collection is empty, returns undefined.
 */
export function getFirst<T extends IClass>(set: Dictionary<T>): T {
	for (var key in set) {
		return set[key];
	}
}

/**
 * Checks item for existance in collection.
 */
export function contains<T extends IClass>(set: Dictionary<T>, item: T): boolean {
	return set.hasOwnProperty(String(item._iid));
}

/**
 * Checks item for existance in collection.
 */
export function containsItem<T extends IClass>(set: Dictionary<T>, item: T): boolean {
	return set.hasOwnProperty(String(item._iid));
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
export function every<T extends IClass>(set: Dictionary<T>, callback: (item: T) => boolean, scope?: any): boolean {
	scope = scope || set;
	for (var iid in set) {
		if (callback.call(scope, set[iid]) === false) {
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
export function some<T extends IClass>(set: Dictionary<T>, callback: (item: T) => boolean, scope?: any): boolean {
	return !every(set, function (item) {
		return callback.call(this, item) === false;
	}, scope);
}

/**
 * Iterates collection items. Calls specified function for all items.
 *
 * @param callback Callback function.
 * @param scope **callback** call scope. Defaults to collection itself.
 */
export function each<T extends IClass>(set: Dictionary<T>, callback: (item: T) => void, scope?: any) {
	every(set, function (item) {
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
export function search<T extends IClass>(set: Dictionary<T>, callback: (item: T) => boolean, scope?: any): T {
	var result: T;
	every(set, function (item) {
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
export function toSorted<T extends IClass>(set: Dictionary<T>, callback?: (item: T) => any, scope?: any, order?: number): T[] {
	callback = callback || function (x) { return x; };
	order = order || 1;
	var pairs = [];
	every(set, function (item) {
		pairs.push([item, callback.call(this, item)]);
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
export function toSortedComparing<T extends IClass>(set: Dictionary<T>, compare?: (t1: T, t2: T) => any, scope?: any, order?: number): T[] {
	compare = compare || cmp;
	scope = scope || set;
	order = order || 1;
	var items = toArray(set);
	items.sort(function (x, y) {
		return order * compare.call(scope, x, y);
	});
	return items;
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
export function index<T extends IClass>(set: Dictionary<T>, callback: (item: T) => string, scope?: any): Dictionary<T> {
	var result: Dictionary<T> = {};
	every(set, function (item) {
		var key = callback.call(this, item);
		if (key != null) {
			result[key] = item;
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
export function filter<T extends IClass>(set: Dictionary<T>, callback: (item: T) => boolean, scope?: any): Dictionary<T> {
	var result: Dictionary<T> = {};
	every(set, function (item) {
		if (callback.call(this, item) !== false) {
			result[item._iid] = item;
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
export function count<T extends IClass>(set: Dictionary<T>, callback: (item: T) => boolean, scope?: any): number {
	var result = 0;
	every(set, function (item) {
		if (callback.call(this, item) !== false) {
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
export function map<T extends IClass, U extends IClass>(set: Dictionary<T>, callback: (item: T) => U, scope?: any): Dictionary<U> {
	var result: Dictionary<U> = {};
	every(set, function (item) {
		tryAdd(result, callback.call(this, item));
		return true;
	}, scope);
	return result;
}

/**
 * Converts collection to array.
 *
 * Builds new array consisting of collection items.
 */
export function toArray<T extends IClass>(set: Dictionary<T>): T[] {
	var result = array<T>(getLength(set));
	var index = 0;
	every(set, function (item) {
		result[index++] = item;
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
export function toSet<T extends IClass>(set: Dictionary<T>): Dictionary<T> {
	return apply<T>({}, set);
}

/**
 * Adds an item to set if one is absent.
 * @returns Item is added successfully. False if item is already present.
 */
export function add<T extends IClass>(set: Dictionary<T>, item: T): boolean {
	return tryAdd(set, item) !== undefined;
}

/**
 * Adds an item to set if one is absent.
 * @returns Item is added successfully. If collection is not modified, returns undefined.
 * In other words, this method may return true or undefined.
 */
export function tryAdd<T extends IClass>(set: Dictionary<T>, item: T): boolean {
	var iid = String(item._iid);
	if (set.hasOwnProperty(iid)) {
		return;
	}
	set[iid] = item;
	return true;
}

/**
 * Adds multiple items to set, ones that are absent.
 * @returns The added items.
 */
export function addAll<T extends IClass>(set: Dictionary<T>, items: T[]): T[] {
	var result = tryAddAll(set, items);
	return (result !== undefined) ? result : [];
}

/**
 * Adds multiple items to set, ones that are absent.
 * @returns The added items.
 * If collection is not modified, returns undefined.
 */
export function tryAddAll<T extends IClass>(set: Dictionary<T>, items: T[]): T[] {
	var addedItems: T[] = [];
	for (var i = 0, l = items.length; i < l; ++i) {
		var item = items[i];
		if (tryAdd(set, item)) {
			addedItems.push(item);
		}
	}
	if (addedItems.length !== 0) {
		return addedItems;
	}
}

/**
 * Removes an item from set if one is present.
 * @returns Item is removed successfully. Returns false if item is already absent.
 */
export function remove<T extends IClass>(set: Dictionary<T>, item: T): boolean {
	return tryRemove(set, item) !== undefined;
}

/**
 * Removes an item from set if one is present.
 * @returns Item is removed successfully. If collection is not modified, returns undefined.
 * In other words, this method may return true or undefined.
 */
export function tryRemove<T extends IClass>(set: Dictionary<T>, item: T): boolean {
	var iid = String(item._iid);
	if (!set.hasOwnProperty(iid)) {
		return;
	}
	delete set[iid];
	return true;
}

/**
 * Removes first occurrence of an item in collection.
 */
export function removeItem<T extends IClass>(set: Dictionary<T>, item: T) {
	tryRemove(set, item);
}

/**
 * Removes multiple items from set, ones that are present.
 * @returns The removed items.
 */
export function removeAll<T extends IClass>(set: Dictionary<T>, items: T[]): T[] {
	var result = tryRemoveAll(set, items);
	return (result !== undefined) ? result : [];
}

/**
 * Removes multiple items from set, ones that are present.
 * @returns The removed items.
 * If collection is not modified, returns undefined.
 */
export function tryRemoveAll<T extends IClass>(set: Dictionary<T>, items: T[]): T[] {
	var removedItems: T[] = [];
	for (var i = 0, l = items.length; i < l; ++i) {
		var item = items[i];
		if (tryRemove(set, item)) {
			removedItems.push(item);
		}
	}
	if (removedItems.length !== 0) {
		return removedItems;
	}
}

/**
 * Removes all occurrences of items in collection.
 */
export function removeItems<T extends IClass>(set: Dictionary<T>, items: T[]) {
	tryRemoveAll(set, items);
}

/**
 * Clears collection.
 * @returns Old collection contents. Never returns null or undefined.
 */
export function clear<T extends IClass>(set: Dictionary<T>): T[] {
	var result = tryClear(set);
	return (result !== undefined) ? result : [];
}

/**
 * Clears collection.
 * @returns Old collection contents. If not modified - undefined.
 */
export function tryClear<T extends IClass>(set: Dictionary<T>): T[] {
	var items = toArray(set);
	if (!items.length) {
		return;
	}
	tryRemoveAll(set, items);
	return items;
}

/**
 * Removes and adds multiple items in set. Universal optimized granular operation of removal/insertion.
 * @param removedItems Items to remove.
 * @param addedItems Items to add.
 * @returns Splice result. Never returns null or undefined.
 */
export function splice<T extends IClass>(set: Dictionary<T>, removedItems: T[], addedItems: T[]): Sets.SpliceResult<T> {
	var spliceResult = trySplice(set, removedItems, addedItems);
	return (spliceResult !== undefined) ? spliceResult : { addedItems: [], removedItems: [] };
}

/**
 * Removes and adds multiple items in set. Universal optimized granular operation of removal/insertion.
 * @param removedItems Items to remove.
 * @param addedItems Items to add.
 * @returns Splice result.
 * If collection is not modified, returns undefined.
 */
export function trySplice<T extends IClass>(set: Dictionary<T>, removedItems: T[], addedItems: T[]): Sets.SpliceResult<T> {
	var addedItemSet = ArrayUtils.toSet(addedItems);
	removedItems = ArrayUtils.filter(removedItems, function (item) { return !addedItemSet.hasOwnProperty(String(item._iid)); });
	removedItems = tryRemoveAll(set, removedItems);
	addedItems = tryAddAll(set, addedItems);
	if ((removedItems !== undefined) || (addedItems !== undefined)) {
		return { removedItems: removedItems || [], addedItems: addedItems || [] };
	}
}

/**
 * Detects [[splice]] method arguments to adjust set contents to **newItems**.
 * Determines which items should be removed and which ones should be added.
 * @param newItems New set contents.
 * @returns [[splice]] method arguments. If no method call required, returns undefined.
 */
export function detectSplice<T extends IClass>(oldItems: Dictionary<T>, newItemArray: T[]): Sets.SpliceParams<T> {
	var removedItems: T[] = [];
	var addedItems: T[] = [];
	var newItems: Dictionary<T> = ArrayUtils.index<T>(newItemArray, iidString);
	for (var key in oldItems) {
		if (!newItems.hasOwnProperty(key)) {
			removedItems.push(oldItems[key]);
		}
	}
	for (var key in newItems) {
		if (!oldItems.hasOwnProperty(key)) {
			addedItems.push(newItems[key]);
		}
	}
	if ((removedItems.length !== 0) || (addedItems.length !== 0)) {
		return { removedItems: removedItems, addedItems: addedItems };
	}
}

/**
 * Adjusts set contents to **newItems** using [[detectSplice]] and
 * [[splice]] methods.
 * @param newItems New set contents.
 */
export function performSplice<T extends IClass>(set: Dictionary<T>, newItems: T[]) {
	var spliceParams = detectSplice(set, newItems);
	if (spliceParams !== undefined) {
		trySplice(set, spliceParams.removedItems, spliceParams.addedItems);
	}
}

/**
 * Checks for equality (===) to array, item by item.
 */
export function equal<T extends IClass>(x: Dictionary<T>, y: T[]): boolean {
	if (getLength(x) !== y.length) {
		return false;
	}
	for (var i = 0, l = y.length; i < l; ++i) {
		if (!x.hasOwnProperty(String(y[i]._iid))) {
			return false;
		}
	}
	return true;
}

/**
 * Creates a new set containing a single item.
 */
export function single<T extends IClass>(item: T): Dictionary<T> {
	var result: Dictionary<T> = {};
	result[item._iid] = item;
	return result;
}
