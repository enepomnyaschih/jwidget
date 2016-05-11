/// <reference path="../jwlib.ref.ts" />

module JW {
	/**
	 * Simple implementation of [[JW.AbstractArray]].
	 *
	 * @param T Collection item type.
	 */
	export class Array<T> extends AbstractArray<T> {
		/**
		 * @inheritdoc
		 */
		constructor(items?: T[], adapter?: boolean) {
			super(items, adapter);
		}

		/**
		 * @inheritdoc
		 */
		ownItems(): Array<T> {
			super.ownItems();
			return this;
		}

		/**
		 * @inheritdoc
		 */
		createEmpty<U>(): Array<U> {
			return new Array<U>();
		}

		/**
		 * @inheritdoc
		 */
		createEmptyArray<U>(): Array<U> {
			return new Array<U>();
		}

		/**
		 * @inheritdoc
		 */
		createEmptyMap<U>(): Map<U> {
			return new Map<U>();
		}

		/**
		 * @inheritdoc
		 */
		createEmptySet<U extends Class>(): Set<U> {
			return new Set<U>();
		}

		/**
		 * Returns first item in collection. If collection is empty, returns undefined.
		 */
		static getFirst<T>(arr: T[]): T {
			return arr[0];
		}

		/**
		 * Returns index of first collection item. If collection is empty, returns undefined.
		 */
		static getFirstKey<T>(arr: T[]): number {
			if (arr.length !== 0) {
				return 0;
			}
		}

		/**
		 * Returns the last collection item. If collection is empty, returns undefined.
		 */
		static getLast<T>(arr: T[]): T {
			return arr[arr.length - 1];
		}

		/**
		 * Returns index of last collection item. If collection is empty, returns undefined.
		 */
		static getLastKey<T>(arr: T[]): number {
			var l = arr.length;
			if (l !== 0) {
				return l - 1;
			}
		}

		/**
		 * Returns count of items in collection.
		 */
		static getLength<T>(arr: T[]): number {
			return arr.length;
		}

		/**
		 * Checks collection for emptiness.
		 */
		static isEmpty<T>(arr: T[]): boolean {
			return arr.length === 0;
		}

		/**
		 * Returns item by index. If item with such index doesn't exist, returns undefined.
		 */
		static get<T>(arr: T[], index: number): T {
			return arr[index];
		}

		/**
		 * Returns array of indexes of all collection items, i.e. array `[0, 1, ... , length - 1]`.
		 */
		static getKeys<T>(arr: T[]): number[]{
			var result = new _JW.A(arr.length);
			for (var i = 0, l = arr.length; i < l; ++i) {
				result[i] = i;
			}
			return result;
		}

		/**
		 * Returns array of indexes of all collection items, i.e. array `[0, 1, ... , length - 1]`.
		 */
		static $getKeys<T>(arr: T[]): Array<number> {
			return new Array<number>(Array.getKeys(arr), true);
		}

		/**
		 * Checks existance of item with specified index in collection.
		 */
		static containsKey<T>(arr: T[], index: number): boolean {
			return arr[index] !== undefined;
		}

		/**
		 * Checks item for existance in collection.
		 */
		static containsItem<T>(arr: T[], item: T): boolean {
			return !Array.every(arr, function (v) {
				return item !== v;
			});
		}

		/**
		 * Returns index of item in collection. If such item doesn't exist, returns undefined.
		 */
		static keyOf<T>(arr: T[], item: T): number {
			return Array.find(arr, function (v) {
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
		static every<T>(arr: T[], callback: (item: T, index: number) => boolean, scope?: any): boolean {
			for (var i = 0, l = arr.length; i < l; ++i) {
				if (callback.call(scope || arr, arr[i], i) === false) {
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
		static some<T>(arr: T[], callback: (item: T, index: number) => boolean, scope?: any): boolean {
			return !Array.every(arr, function (item, index) {
				return callback.call(this, item, index) === false;
			}, scope);
		}

		/**
		 * Iterates collection items. Calls specified function for all items.
		 *
		 * @param callback Callback function.
		 * @param scope **callback** call scope. Defaults to collection itself.
		 */
		static each<T>(arr: T[], callback: (item: T, index: number) => any, scope?: any) {
			Array.every(arr, function (item, index) {
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
		static find<T>(arr: T[], callback: (item: T, index: number) => boolean, scope?: any): number {
			var result: number;
			Array.every(arr, function (item, index) {
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
		static search<T>(arr: T[], callback: (item: T, index: number) => boolean, scope?: any): T {
			var result: T;
			Array.every(arr, function (item, index) {
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
		static filter<T>(arr: T[], callback: (item: T, index: number) => boolean, scope?: any): T[]{
			var result: T[] = [];
			Array.every(arr, function (item: T, index: number): boolean {
				if (callback.call(this, item, index) !== false) {
					result.push(item);
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
		static $filter<T>(arr: T[], callback: (item: T, index: number) => boolean, scope?: any): Array<T> {
			return new Array<T>(Array.filter(arr, callback, scope), true);
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
		static count<T>(arr: T[], callback: (item: T, index: number) => boolean, scope?: any): number {
			var result = 0;
			Array.every(arr, function (item: T, index: number): boolean {
				if (callback.call(this, item, index) !== false) {
					++result;
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
		static $count<T>(arr: T[], callback: (item: T, index: number) => boolean, scope?: any): Property<number> {
			return new Property<number>(Array.count(arr, callback, scope));
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
		static map<T, U>(arr: T[], callback: (item: T, index: number) => U, scope?: any): U[]{
			var result: U[] = new _JW.A(arr.length);
			Array.every(arr, function (item: T, index: number): boolean {
				result[index] = callback.call(this, item, index);
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
		static $map<T, U>(arr: T[], callback: (item: T, index: number) => U, scope?: any): Array<U> {
			return new Array<U>(Array.map(arr, callback, scope), true);
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
		static getSortingKeys<T>(arr: T[], callback?: (item: T, index: number) => any, scope?: any, order?: number): number[]{
			callback = callback || function (x) { return x; };
			order = order || 1;
			var pairs = [];
			Array.every(arr, function (item, key) {
				pairs.push([key, callback.call(this, item, key)]);
				return true;
			}, scope);
			pairs.sort(function (x, y) {
				return order * cmp(x[1], y[1]);
			});
			return Array.map(pairs, function (pair) {
				return pair[0];
			});
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
		static $getSortingKeys<T>(arr: T[], callback?: (item: T, index: number) => any, scope?: any, order?: number): Array<number> {
			return new Array<number>(Array.getSortingKeys(arr, callback, scope, order), true);
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
		static getSortingKeysComparing<T>(arr: T[], compare?: (t1: T, t2: T, i1: number, i2: number) => any, scope?: any, order?: number): number[]{
			compare = compare || cmpCaseSensitive;
			order = order || 1;
			var pairs = [];
			Array.every(arr, function (item, key) {
				pairs.push([key, item]);
				return true;
			}, scope);
			pairs.sort(function (x, y) {
				return order * compare.call(scope, x[1], y[1], x[0], y[0]);
			});
			return Array.map(pairs, function (pair) {
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
		static $getSortingKeysComparing<T>(arr: T[], compare?: (t1: T, t2: T, i1: number, i2: number) => any, scope?: any, order?: number): Array<number> {
			return new Array<number>(Array.getSortingKeysComparing(arr, compare, scope, order), true);
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
		static toSorted<T>(arr: T[], callback?: (item: T, index: number) => any, scope?: any, order?: number): T[]{
			return Array.map(Array.getSortingKeys(arr, callback, scope, order), function (index): T {
				return arr[index];
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
		static $toSorted<T>(arr: T[], callback?: (item: T, index: number) => any, scope?: any, order?: number): Array<T> {
			return new Array<T>(Array.toSorted(arr, callback, scope, order), true);
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
		static toSortedComparing<T>(arr: T[], compare?: (t1: T, t2: T, i1: number, i2: number) => any, scope?: any, order?: number): T[]{
			return Array.map(Array.getSortingKeysComparing(arr, compare, scope, order), function (index): T {
				return arr[index];
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
		static $toSortedComparing<T>(arr: T[], compare?: (t1: T, t2: T, i1: number, i2: number) => any, scope?: any, order?: number): Array<T>{
			return new Array<T>(Array.toSortedComparing(arr, compare, scope, order), true);
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
		static index<T>(arr: T[], callback: (item: T, index: number) => string, scope?: any): Dictionary<T> {
			var result:Dictionary<T> = {};
			Array.every(arr, function (item, index) {
				var key = callback.call(this, item, index);
				if (key != null) {
					result[key] = item;
				}
				return true;
			}, scope);
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
		static $index<T>(arr: T[], callback: (item: T, index: number) => string, scope?: any): Map<T> {
			return new Map<T>(Array.index(arr, callback, scope), true);
		}

		/**
		 * Converts collection to array.
		 *
		 * Builds new array consisting of collection items.
		 */
		static toArray<T>(arr: T[]): T[]{
			return arr.concat();
		}

		/**
		 * Converts collection to array.
		 *
		 * Builds new array consisting of collection items.
		 */
		static $toArray<T>(arr: T[]): Array<T> {
			return new Array<T>(arr);
		}

		/**
		 * Converts collection to map.
		 *
		 * Builds new map consisting of collection items.
		 */
		static toMap<T>(arr: T[]): Dictionary<T> {
			var result:Dictionary<T> = {};
			Array.every(arr, function (v, k) {
				result[k] = v;
				return true;
			});
			return result;
		}

		/**
		 * Converts collection to map.
		 *
		 * Builds new map consisting of collection items.
		 */
		static $toMap<T>(arr: T[]): Map<T> {
			return new Map<T>(Array.toMap(arr), true);
		}

		/**
		 * Converts collection to set.
		 *
		 * Builds new set consisting of collection items.
		 * Requires T to extend JW.Class.
		 */
		static toSet<T extends Class>(arr: T[]): Dictionary<T> {
			return Array.index(arr, iidForcibly);
		}

		/**
		 * Converts collection to set.
		 *
		 * Builds new set consisting of collection items.
		 * Requires T to extend JW.Class.
		 */
		static $toSet<T extends Class>(arr: T[]): Set<T> {
			return new Set<T>(arr);
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
		static asArray<T>(arr: T[]): T[]{
			return arr;
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
		static $asArray<T>(arr: T[]): Array<T> {
			return new Array<T>(arr, true);
		}

		/**
		 * Represents collection as map.
		 *
		 * If this collection is map, returns it immediately. Else, executes [[toMap]] method.
		 * This method works usually faster than [[toMap]], but please make sure that the returned map
		 * won't be modified externally, because it can cause strange unexpected bugs.
		 */
		static asMap<T>(arr: T[]): Dictionary<T> {
			return Array.toMap(arr);
		}

		/**
		 * Represents collection as map.
		 *
		 * If this collection is map, returns it immediately. Else, executes [[toMap]] method.
		 * This method works usually faster than [[toMap]], but please make sure that the returned map
		 * won't be modified externally, because it can cause strange unexpected bugs.
		 */
		static $asMap<T>(arr: T[]): Map<T> {
			return Array.$toMap(arr);
		}

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
		static asSet<T extends Class>(arr: T[]): Dictionary<T> {
			return Array.toSet(arr);
		}

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
		static $asSet<T extends Class>(arr: T[]): Set<T> {
			return Array.$toSet(arr);
		}

		/**
		 * Inserts an item to array.
		 *
		 * @param item Item to insert.
		 * @param index Index of an item before which to insert new one.
		 * By default, appends the item to the end of collection.
		 */
		static add<T>(arr: T[], item: T, index?: number) {
			Array.tryAdd(arr, item, index);
		}

		/**
		 * Inserts an item to array.
		 *
		 * @param item Item to insert.
		 * @param index Index of an item before which to insert new one.
		 * By default, appends the item to the end of collection.
		 * @returns Always returns true.
		 */
		static tryAdd<T>(arr: T[], item: T, index?: number): boolean {
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
		static addAll<T>(arr: T[], items: T[], index?: number) {
			Array.tryAddAll(arr, items, index);
		}

		/**
		 * Inserts item range to array.
		 *
		 * @param items Items to insert.
		 * @param index Index of an item before which to insert new ones.
		 * By default, appends the items to the end of collection.
		 * @returns Always returns true.
		 */
		static tryAddAll<T>(arr: T[], items: T[], index?: number): boolean {
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
				Array.tryAddAll(arr, items);
				Array.tryAddAll(arr, tail);
			}
			return true;
		}

		/**
		 * Replaces item at specified position.
		 * If array doesn't contain such index, it will demolish the application.
		 *
		 * @returns The replaced item.
		 */
		static set<T>(arr: T[], item: T, index: number): T {
			var result = Array.trySet(arr, item, index);
			return (result !== undefined) ? result.value : arr[index];
		}

		/**
		 * Replaces item at specified position.
		 * If array doesn't contain such index, it will demolish the application.
		 *
		 * @returns Proxy of the replaced item. If collection is not modified, returns undefined.
		 */
		static trySet<T>(arr: T[], item: T, index: number): Proxy<T> {
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
		static remove<T>(arr: T[], index: number): T {
			return Array.tryRemove(arr, index);
		}

		/**
		 * Removes item at specified position.
		 * If array doesn't contain such index, it will demolish the application.
		 *
		 * @returns The removed item. If collection is not modified, returns undefined.
		 */
		static tryRemove<T>(arr: T[], index: number): T {
			return arr.splice(index, 1)[0];
		}

		/**
		 * Removes item range from array.
		 *
		 * @param index Index of first item to remove.
		 * @param count Count of items to remove.
		 * @returns The removed items.
		 */
		static removeAll<T>(arr: T[], index: number, count: number): T[]{
			var result = Array.tryRemoveAll(arr, index, count);
			return result || [];
		}

		/**
		 * Removes item range from array.
		 *
		 * @param index Index of first item to remove.
		 * @param count Count of items to remove.
		 * @returns The removed items.
		 */
		static $removeAll<T>(arr: T[], index: number, count: number): Array<T> {
			return new Array<T>(Array.removeAll(arr, index, count), true);
		}

		/**
		 * Removes item range from array.
		 *
		 * @param index Index of first item to remove.
		 * @param count Count of items to remove.
		 * @returns The removed items. If collection is not modified, returns undefined.
		 */
		static tryRemoveAll<T>(arr: T[], index: number, count: number): T[]{
			if (count !== 0) {
				return arr.splice(index, count);
			}
		}

		/**
		 * Removes first occurrence of an item in collection.
		 */
		static removeItem<T>(arr: T[], item: T): number {
			var key = Array.keyOf(arr, item);
			if (key !== undefined) {
				Array.tryRemove(arr, key);
			}
			return key;
		}

		/**
		 * Removes all occurrences of items in collection.
		 * **Known issue:** *Works only if T extends JW.Class!*
		 */
		static removeItems<T extends Class>(arr: T[], items: T[]) {
			var itemSet = new Set<T>(items);
			var newItems = Array.filter(arr, function (item: T): boolean {
				return !itemSet.contains(item);
			});
			Array.performSplice(arr, newItems);
		}

		/**
		 * Moves an item inside array.
		 *
		 * @param fromIndex Item index to move.
		 * @param toIndex Index to move to.
		 * @returns The moved item.
		 */
		static move<T>(arr: T[], fromIndex: number, toIndex: number): T {
			Array.tryMove(arr, fromIndex, toIndex);
			return arr[toIndex];
		}

		/**
		 * Moves an item inside array.
		 *
		 * @param fromIndex Item index to move.
		 * @param toIndex Index to move to.
		 * @returns The moved item. If collection is not modified, returns undefined.
		 */
		static tryMove<T>(arr: T[], fromIndex: number, toIndex: number): T {
			if (fromIndex === toIndex) {
				return;
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
		static clear<T>(arr: T[]): T[]{
			var result = Array.tryClear(arr);
			return (result !== undefined) ? result : [];
		}

		/**
		 * Clears collection.
		 * @returns Old collection contents. Never returns null or undefined.
		 */
		static $clear<T>(arr: T[]): Array<T> {
			return new Array<T>(Array.clear(arr), true);
		}

		/**
		 * Clears collection.
		 * @returns Old collection contents. If not modified - undefined.
		 */
		static tryClear<T>(arr: T[]): T[]{
			if (arr.length !== 0) {
				return arr.splice(0, arr.length);
			}
		}

		/**
		 * Removes and inserts item ranges. Universal optimized granular operation of removal/insertion.
		 *
		 * @param removeParamsList Array of segments to remove sorted by index asc. Segments are removed in backward order.
		 * @param addParamsList Array of segments to insert sorted by index asc. Segments are inserted in forward order.
		 * @returns Splice result. Never returns null or undefined.
		 */
		static splice<T>(arr: T[], removeParamsList: AbstractArray.IndexCount[], addParamsList: AbstractArray.IndexItems<T>[]): AbstractArray.SpliceResult<T> {
			var result = Array.trySplice(arr, removeParamsList, addParamsList);
			return (result !== undefined) ? result : new AbstractArray.SpliceResult<T>(arr.concat(), <AbstractArray.IndexItems<T>[]>[], <AbstractArray.IndexItems<T>[]>[]);
		}

		/**
		 * Removes and inserts item ranges. Universal optimized granular operation of removal/insertion.
		 *
		 * @param removeParamsList Array of segments to remove sorted by index asc. Segments are removed in backward order.
		 * @param addParamsList Array of segments to insert sorted by index asc. Segments are inserted in forward order.
		 * @returns Splice result. If collection is not modified, returns undefined.
		 */
		static trySplice<T>(arr: T[], removeParamsList: AbstractArray.IndexCount[], addParamsList: AbstractArray.IndexItems<T>[]): AbstractArray.SpliceResult<T> {
			var optimizedRemoveParamsList: AbstractArray.IndexCount[] = [];
			var rlast: AbstractArray.IndexCount = null;
			var rparams: AbstractArray.IndexCount;
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
			var alast: AbstractArray.IndexItems<T> = null;
			var aparams: AbstractArray.IndexItems<T>;
			for (var i = 0, l = addParamsList.length; i < l; ++i) {
				aparams = addParamsList[i];
				if (alast && (aparams.index === alast.index + alast.items.length)) {
					Array.tryAddAll(alast.items, aparams.items);
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
				var items = Array.tryRemoveAll(arr, index, rparams.count);
				if (items === undefined) {
					continue;
				}
				removedItemsList.push(new AbstractArray.IndexItems<T>(index, items));
			}
			var addedItemsList = [];
			for (var i = 0, l = optimizedAddParamsList.length; i < l; ++i) {
				aparams = optimizedAddParamsList[i];
				if (Array.tryAddAll(arr, aparams.items, aparams.index) === undefined) {
					continue;
				}
				addedItemsList.push(aparams);
			}
			if ((removedItemsList.length !== 0) || (addedItemsList.length !== 0)) {
				removedItemsList.reverse();
				return new AbstractArray.SpliceResult<T>(oldItems, removedItemsList, addedItemsList);
			}
		}

		/**
		 * Reorders array items.
		 *
		 * @param indexArray Index array. Item with index `i` will be moved to index `indexArray[i]`.
		 * Must contain all indexes from 0 to (length - 1).
		 */
		static reorder<T>(arr: T[], indexArray: number[]) {
			Array.tryReorder(arr, indexArray);
		}

		/**
		 * Reorders array items.
		 *
		 * @param indexArray Index array. Item with index `i` will be moved to index `indexArray[i]`.
		 * Must contain all indexes from 0 to (length - 1).
		 * @returns Old array contents. If collection is not modified, returns undefined.
		 */
		static tryReorder<T>(arr: T[], indexArray: number[]): T[]{
			var length = arr.length;
			if (Array.isIdentity(indexArray)) {
				return;
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
		 * All items must have unique **getKey** function result.
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
		static detectSplice<T>(oldItems: T[], newItems: T[], getKey?: (item: T) => any, scope?: any): AbstractArray.SpliceParams<T> {
			getKey = getKey || iidForcibly;
			scope = scope || oldItems;
			var removeParamsList: AbstractArray.IndexCount[] = [];
			var addParamsList: AbstractArray.IndexItems<T>[] = [];
			var oldIndexMap: Dictionary<number> = {};
			for (var i = 0, l = oldItems.length; i < l; ++i) {
				oldIndexMap[getKey.call(scope, oldItems[i])] = i;
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
				addParamsList.push(new AbstractArray.IndexItems<T>(offset + nextOldIndex, newItemBuffer));
				offset += newItemBuffer.length;
				newItemBuffer = [];
			}

			function testRemove(oldIndex: number) {
				if (oldIndex > nextOldIndex) {
					var count = oldIndex - nextOldIndex;
					removeParamsList.push(new AbstractArray.IndexCount(nextOldIndex, count));
					offset -= count;
				}
			}

			for (var newIndex = 0, l = newItems.length; newIndex < l; ++newIndex) {
				var item = newItems[newIndex];
				var key = getKey.call(scope, item);
				var oldIndex = oldIndexMap[key];
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
		static detectFilter<T>(oldItems: T[], newItems: T[]): AbstractArray.IndexCount[] {
			var removeParamsList: AbstractArray.IndexCount[] = [];
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
					removeParamsList.push(new AbstractArray.IndexCount(oldIndex, count));
				}
				oldIndex += count + 1;
			}
			if (removeParamsList.length !== 0) {
				return removeParamsList;
			}
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
		static detectReorder<T>(oldItems: T[], newItems: T[], getKey?: (item: T) => any, scope?: any): number[] {
			getKey = getKey || iidForcibly;
			scope = scope || oldItems;
			var indexArray = [];
			var newIndexMap = {};
			for (var i = 0, l = newItems.length; i < l; ++i) {
				newIndexMap[getKey.call(scope, newItems[i])] = i;
			}
			for (var i = 0, l = oldItems.length; i < l; ++i) {
				indexArray.push(newIndexMap[getKey.call(scope, oldItems[i])]);
			}
			if (!Array.isIdentity(indexArray)) {
				return indexArray;
			}
		}

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
		static detectSort<T>(arr: T[], callback?: (item: T, index: number) => any, scope?: any, order?: number): number[]{
			var keys = Array.getSortingKeys(arr, callback, scope, order);
			if (!Array.isIdentity(keys)) {
				return Array.invert(keys);
			}
		}

		/**
		 * Detects [[reorder]] method arguments to sort array contents by comparer.
		 *
		 * @param compare Comparer function. Should return positive value if t1 > t2;
		 * negative value if t1 < t2; 0 if t1 == t2.
		 * Defaults to [[JW.cmp]]
		 * @param scope **comparer** call scope. Defaults to collection itself.
		 * @param order Sorting order. Positive number for ascending sorting, negative for descending sorting.
		 * @returns **indexArray** argument of [[reorder]] method.
		 * If no method call required, returns undefined.
		 */
		static detectSortComparing<T>(arr: T[], compare?: (t1: T, t2: T, i1: number, i2: number) => number, scope?: any, order?: number): number[] {
			var keys = Array.getSortingKeysComparing(arr, compare, scope, order);
			if (!Array.isIdentity(keys)) {
				return Array.invert(keys);
			}
		}

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
		 * If collection consists of instances of JW.Class, then you are in a good shape.
		 * @param scope **getKey** call scope. Defaults to collection itself.
		 */
		static performSplice<T>(arr: T[], newItems: T[], getKey?: (item: T) => any, scope?: any) {
			var params = Array.detectSplice(arr, newItems, getKey, scope);
			if (params !== undefined) {
				Array.trySplice(arr, params.removeParamsList, params.addParamsList);
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
		static performFilter<T>(arr: T[], newItems: T[]) {
			var params = Array.detectFilter(arr, newItems);
			if (params !== undefined) {
				Array.trySplice(arr, params, []);
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
		static performReorder<T>(arr: T[], newItems: T[], getKey?: (item: T) => any, scope?: any) {
			var indexArray = Array.detectReorder(arr, newItems, getKey, scope);
			if (indexArray !== undefined) {
				Array.tryReorder(arr, indexArray);
			}
		}

		/**
		 * Sorts array by result of **callback** function call for each item.
		 *
		 * @param callback Indexer function. Must return a comparable value, compatible with
		 * [[JW.cmp]]. Returns item itself by default.
		 * @param scope **callback** call scope. Defaults to collection itself.
		 * @param order Sorting order. Positive number for ascending sorting, negative for descending sorting.
		 */
		static sort<T>(arr: T[], callback?: (item: T, index: number) => any, scope?: any, order?: number) {
			var indexArray = Array.detectSort(arr, callback, scope, order);
			if (indexArray !== undefined) {
				Array.tryReorder(arr, indexArray);
			}
		}

		/**
		 * Sorts array by comparer.
		 *
		 * @param compare Comparer function. Should return positive value if t1 > t2;
		 * negative value if t1 < t2; 0 if t1 == t2.
		 * Defaults to [[JW.cmp]]
		 * @param scope **comparer** call scope. Defaults to collection itself.
		 * @param order Sorting order. Positive number for ascending sorting, negative for descending sorting.
		 */
		static sortComparing<T>(arr: T[], compare?: (t1: T, t2: T, i1: number, i2: number) => number, scope?: any, order?: number) {
			var indexArray = Array.detectSortComparing(arr, compare, scope, order);
			if (indexArray !== undefined) {
				Array.tryReorder(arr, indexArray);
			}
		}

		/**
		 * Checks for equality (===) to another array, item by item.
		 *
		 * @param arr Another array.
		 * @returns Arrays are equal.
		 */
		static equal<T>(x: T[], y: T[]): boolean {
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
		static collapse(arr: any[], depth?: number): any[]{
			var result = [];
			for (var i = 0, l = arr.length; i < l; ++i) {
				if (!isArray(arr[i])) {
					result.push(arr[i]);
					continue;
				}
				if (depth == null) {
					Array.tryAddAll(result, Array.collapse(arr[i]));
					continue;
				}
				if (depth) {
					Array.tryAddAll(result, Array.collapse(arr[i], depth - 1));
					continue;
				}
				result.push(arr[i]);
			}
			return result;
		}

		/**
		 * Returns item index in this collection.
		 *
		 * @returns Item index. If item doesn't exist, returns -1.
		 */
		static indexOf<T>(arr: T[], item: T): number {
			if (_JW.A.prototype.indexOf !== undefined) {
				return arr.indexOf(item);
			}
			var key = Array.keyOf(arr, item);
			return (key !== undefined) ? key : -1;
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
		static backEvery<T>(arr: T[], callback: (item: T, index: number) => boolean, scope?: any): boolean {
			for (var i = arr.length - 1; i >= 0; --i) {
				if (callback.call(scope || arr, arr[i], i) === false) {
					return false;
				}
			}
			return true;
		}

		/**
		 * @hidden Use [[JW.cmp]] instead.
		 */
		static cmp<T>(x: T[], y: T[], caseInsensitive?: boolean): number {
			var n = Math.min(x.length, y.length);
			for (var i = 0; i < n; ++i) {
				var result = cmp(x[i], y[i], caseInsensitive);
				if (result) {
					return result;
				}
			}
			return cmp(x.length, y.length);
		}

		/**
		 * Creates a new array of length n containing all numbers from 0 to (n - 1) in random order.
		 */
		static shuffle(n: number): number[] {
			var result = new _JW.A(n);
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
		static isIdentity(array: number[]): boolean {
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
		static invert(array: number[]): number[] {
			var l = array.length;
			var result = new _JW.A(l);
			for (var i = 0; i < l; ++i) {
				result[array[i]] = i;
			}
			return result;
		}

		/**
		 * Builds array consisting of subarray items in the same order.
		 * Current array is not modified.
		 *
		 * @returns Merged array.
		 */
		static merge<T>(arrays: T[][]): T[] {
			var result: T[] = [];
			for (var i = 0, l = arrays.length; i < l; ++i) {
				result.push.apply(result, arrays[i]);
			}
			return result;
		}

		/**
		 * Builds array consisting of subarray items in the same order.
		 * Current array is not modified.
		 *
		 * @returns Merged array.
		 */
		static $merge<T>(arrays: T[][]): Array<T> {
			return new Array<T>(Array.merge(arrays), true);
		}

		/**
		 * Computes sum of array item lengthes.
		 */
		static countMerged(arrays: any[][]): number {
			var result = 0;
			for (var i = 0, l = arrays.length; i < l; ++i) {
				result += arrays[i].length;
			}
			return result;
		}

		/**
		 * Reverses item order in array. Modifies the array itself.
		 */
		static reverse<T>(arr: T[]) {
			arr.reverse();
		}

		/**
		 * Builds a new array containing items of this array in reversed order.
		 * Current array is not modified.
		 *
		 * @returns Reversed array.
		 */
		static toReversed<T>(arr: T[]): T[] {
			var result = arr.concat();
			result.reverse();
			return result;
		}

		/**
		 * Builds a new array containing items of this array in reversed order.
		 * Current array is not modified.
		 *
		 * @returns Reversed array.
		 */
		static $toReversed<T>(arr: T[]): Array<T> {
			return new Array<T>(Array.toReversed(arr), true);
		}

		/**
		 * Removes last array item. Does nothing if array is empty.
		 *
		 * @returns The removed item or undefined.
		 */
		static pop<T>(arr: T[]): T {
			return arr.pop();
		}

		/**
		 * Determines index of first item which is more (or less if **order** < 0) than specified value by **compare** function,
		 * using binary search. Array must be sorted by **compare** function.
		 * Can be used for item insertion easily.
		 * If you want to use this method for item removal, you must look at previous item and compare it to **value** first.
		 *
		 * @param compare Comparer function. Should return positive value if t1 > t2;
		 * negative value if t1 < t2; 0 if t1 == t2.
		 * Defaults to [[JW.cmp]]
		 * @param scope **comparer** call scope. Defaults to collection itself.
		 * @param order Sorting order. Positive number for ascending sorting, negative for descending sorting.
		 * @returns Item index.
		 */
		static binarySearch<T>(arr: T[], value: T, compare?: (t1: T, t2: T) => number, scope?: any, order?: number): number {
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
	}
}
