
/**
 * Returns first item in collection. If collection is empty, returns undefined.
 */
export function getFirst<T>(arr: T[]): T {
	return arr[0];
}

/**
 * Returns index of first collection item. If collection is empty, returns undefined.
 */
export function getFirstKey<T>(arr: T[]): number {
	if (arr.length !== 0) {
		return 0;
	}
	return undefined;
}

/**
 * Returns the last collection item. If collection is empty, returns undefined.
 */
export function getLast<T>(arr: T[]): T {
	return arr[arr.length - 1];
}

/**
 * Returns index of last collection item. If collection is empty, returns undefined.
 */
export function getLastKey<T>(arr: T[]): number {
	var l = arr.length;
	if (l !== 0) {
		return l - 1;
	}
	return undefined;
}

/**
 * Returns count of items in collection.
 */
export function getLength<T>(arr: T[]): number {
	return arr.length;
}

/**
 * Checks collection for emptiness.
 */
export function isEmpty<T>(arr: T[]): boolean {
	return arr.length === 0;
}

/**
 * Returns item by index. If item with such index doesn't exist, returns undefined.
 */
export function get<T>(arr: T[], index: number): T {
	return arr[index];
}

/**
 * Returns array of indexes of all collection items, i.e. array `[0, 1, ... , length - 1]`.
 */
export function getKeys<T>(arr: T[]): number[]{
	var result = new Array<number>(arr.length);
	for (var i = 0, l = arr.length; i < l; ++i) {
		result[i] = i;
	}
	return result;
}

/**
 * Checks existance of item with specified index in collection.
 */
export function containsKey<T>(arr: T[], index: number): boolean {
	return arr[index] !== undefined;
}

/**
 * Checks item for existance in collection.
 */
export function containsItem<T>(arr: T[], item: T): boolean {
	return !every(arr, function (v) {
		return item !== v;
	});
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
 * Matches all items against criteria.
 *
 * Returns true if callback returns !== false for all collection items.
 *
 * Algorithms iterates items sequentially, and stops after first item not matching the criteria.
 *
 * @param callback Criteria callback.
 * @param scope **callback** call scope. Defaults to collection itself.
 */
export function every<T>(arr: T[], callback: (item: T, index: number) => boolean, scope?: any): boolean {
	return everyInArray(arr, callback, scope);
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
export function some<T>(arr: T[], callback: (item: T, index: number) => boolean, scope?: any): boolean {
	return !every(arr, function (item, index) {
		return callback.call(this, item, index) === false;
	}, scope);
}

/**
 * Iterates collection items. Calls specified export function for all items.
 *
 * @param callback Callback export function.
 * @param scope **callback** call scope. Defaults to collection itself.
 */
export function each<T>(arr: T[], callback: (item: T, index: number) => any, scope?: any) {
	every(arr, function (item, index) {
		callback.call(this, item, index);
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
export function find<T>(arr: T[], callback: (item: T, index: number) => boolean, scope?: any): number {
	var result: number;
	every(arr, function (item, index) {
		if (callback.call(this, item, index) !== false) {
			result = index;
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
export function search<T>(arr: T[], callback: (item: T, index: number) => boolean, scope?: any): T {
	var result: T;
	every(arr, function (item, index) {
		if (callback.call(this, item, index) !== false) {
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
export function filter<T>(arr: T[], callback: (item: T, index: number) => boolean, scope?: any): T[]{
	return filterArray(arr, callback, scope);
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
	var result = 0;
	every(arr, function (item: T, index: number): boolean {
		if (callback.call(this, item, index) !== false) {
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
 * @param callback Mapping export function.
 * @param scope **callback** call scope. Defaults to collection itself.
 * @returns Mapped collection.
 */
export function map<T, U>(arr: T[], callback: (item: T, index: number) => U, scope?: any): U[]{
	var result = array<U>(arr.length);
	every(arr, function (item: T, index: number): boolean {
		result[index] = callback.call(this, item, index);
		return true;
	}, scope);
	return result;
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
export function index<T>(arr: T[], callback: (item: T, index: number) => string, scope?: any): Dictionary<T> {
	var result: Dictionary<T> = {};
	arr.every(function (item, index) {
		var key = callback.call(scope, item, index);
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
export function toMap<T>(arr: T[]): Dictionary<T> {
	var result: Dictionary<T> = {};
	every(arr, function (v, k) {
		result[k] = v;
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
export function toSet<T extends IClass>(arr: T[]): Dictionary<T> {
	return index(arr, iidForcibly);
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
 * @returns Always returns true.
 */
export function tryAddAll<T>(arr: T[], items: T[], index?: number): boolean {
	if (items.length === 0) {
		return;
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
 * @returns Proxy of the replaced item. If collection is not modified, returns undefined.
 */
export function trySet<T>(arr: T[], item: T, index: number): Proxy<T> {
	var oldItem = arr[index];
	if (item !== oldItem) {
		arr[index] = item;
		return { value: oldItem };
	}
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
}
