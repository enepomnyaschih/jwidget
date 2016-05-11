/// <reference path="../jwlib.ref.ts" />

module JW {
	/**
	 * Simple implementation of [[JW.AbstractSet]].
	 *
	 * @param T Collection item type.
	 */
	export class Set<T extends Class> extends AbstractSet<T> {
		/**
		 * @inheritdoc
		 */
		constructor();

		/**
		 * @inheritdoc
		 */
		constructor(items: T[]);

		/**
		 * @inheritdoc
		 */
		constructor(items: Dictionary<T>, adapter: boolean);
		constructor(items?, adapter?: boolean) {
			super(items, adapter);
		}

		/**
		 * @inheritdoc
		 */
		ownItems(): Set<T> {
			super.ownItems();
			return this;
		}

		/**
		 * @inheritdoc
		 */
		createEmpty<U extends Class>(): Set<U> {
			return new Set<U>();
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
		 * Returns count of items in collection.
		 */
		static getLength<T extends Class>(set: Dictionary<T>): number {
			var length = 0;
			for (var key in set) {
				++length;
			}
			return length;
		}

		/**
		 * Checks collection for emptiness.
		 */
		static isEmpty<T extends Class>(set: Dictionary<T>): boolean {
			for (var key in set) {
				return false;
			}
			return true;
		}

		/**
		 * Returns first item in collection. If collection is empty, returns undefined.
		 */
		static getFirst<T extends Class>(set: Dictionary<T>): T {
			for (var key in set) {
				return set[key];
			}
		}

		/**
		 * Checks item for existance in collection.
		 */
		static contains<T extends Class>(set: Dictionary<T>, item: T): boolean {
			return set.hasOwnProperty(_JW.S(item._iid));
		}

		/**
		 * Checks item for existance in collection.
		 */
		static containsItem<T extends Class>(set: Dictionary<T>, item: T): boolean {
			return set.hasOwnProperty(_JW.S(item._iid));
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
		static every<T extends Class>(set: Dictionary<T>, callback: (item: T) => boolean, scope?: any): boolean {
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
		static some<T extends Class>(set: Dictionary<T>, callback: (item: T) => boolean, scope?: any): boolean {
			return !Set.every(set, function (item) {
				return callback.call(this, item) === false;
			}, scope);
		}

		/**
		 * Iterates collection items. Calls specified function for all items.
		 *
		 * @param callback Callback function.
		 * @param scope **callback** call scope. Defaults to collection itself.
		 */
		static each<T extends Class>(set: Dictionary<T>, callback: (item: T) => void, scope?: any) {
			Set.every(set, function (item) {
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
		static search<T extends Class>(set: Dictionary<T>, callback: (item: T) => boolean, scope?: any): T {
			var result: T;
			Set.every(set, function (item) {
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
		static toSorted<T extends Class>(set: Dictionary<T>, callback?: (item: T) => any, scope?: any, order?: number): T[] {
			callback = callback || function (x) { return x; };
			order = order || 1;
			var pairs = [];
			Set.every(set, function (item) {
				pairs.push([item, callback.call(this, item)]);
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
		static $toSorted<T extends Class>(set: Dictionary<T>, callback?: (item: T) => any, scope?: any, order?: number): Array<T> {
			return new Array<T>(Set.toSorted(set, callback, scope, order), true);
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
		static toSortedComparing<T extends Class>(set: Dictionary<T>, compare?: (t1: T, t2: T) => any, scope?: any, order?: number): T[] {
			compare = compare || cmp;
			scope = scope || set;
			order = order || 1;
			var items = Set.toArray(set);
			items.sort(function (x, y) {
				return order * compare.call(scope, x, y);
			});
			return items;
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
		static $toSortedComparing<T extends Class>(set: Dictionary<T>, compare?: (t1: T, t2: T) => any, scope?: any, order?: number): Array<T> {
			return new Array<T>(Set.toSortedComparing(set, compare, scope, order), true);
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
		static index<T extends Class>(set: Dictionary<T>, callback: (item: T) => string, scope?: any): Dictionary<T> {
			var result: Dictionary<T> = {};
			Set.every(set, function (item) {
				var key = callback.call(this, item);
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
		static $index<T extends Class>(set: Dictionary<T>, callback: (item: T) => string, scope?: any): Map<T> {
			return new Map<T>(Set.index(set, callback, scope), true);
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
		static filter<T extends Class>(set: Dictionary<T>, callback: (item: T) => boolean, scope?: any): Dictionary<T> {
			var result: Dictionary<T> = {};
			Set.every(set, function (item) {
				if (callback.call(this, item) !== false) {
					result[item._iid] = item;
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
		static $filter<T extends Class>(set: Dictionary<T>, callback: (item: T) => boolean, scope?: any): Set<T> {
			return new Set<T>(Set.filter(set, callback, scope), true);
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
		static count<T extends Class>(set: Dictionary<T>, callback: (item: T) => boolean, scope?: any): number {
			var result = 0;
			Set.every(set, function (item) {
				if (callback.call(this, item) !== false) {
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
		static $count<T extends Class>(set: Dictionary<T>, callback: (item: T) => boolean, scope?: any): Property<number> {
			return new Property<number>(Set.count(set, callback, scope));
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
		static map<T extends Class, U extends Class>(set: Dictionary<T>, callback: (item: T) => U, scope?: any): Dictionary<U> {
			var result: Dictionary<U> = {};
			Set.every(set, function (item) {
				Set.tryAdd(result, callback.call(this, item));
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
		static $map<T extends Class, U extends Class>(set: Dictionary<T>, callback: (item: T) => U, scope?: any): Set<U> {
			return new Set<U>(Set.map(set, callback, scope), true);
		}

		/**
		 * Converts collection to array.
		 *
		 * Builds new array consisting of collection items.
		 */
		static toArray<T extends Class>(set: Dictionary<T>): T[] {
			var result = new _JW.A<T>(Set.getLength(set));
			var index = 0;
			Set.every(set, function (item) {
				result[index++] = item;
				return true;
			});
			return result;
		}

		/**
		 * Converts collection to array.
		 *
		 * Builds new array consisting of collection items.
		 */
		static $toArray<T extends Class>(set: Dictionary<T>): Array<T> {
			return new Array<T>(Set.toArray(set), true);
		}

		/**
		 * Converts collection to set.
		 *
		 * Builds new set consisting of collection items.
		 * Requires T to extend JW.Class.
		 */
		static toSet<T extends Class>(set: Dictionary<T>): Dictionary<T> {
			var result: Dictionary<T> = {};
			Set.every(set, function (item) {
				Set.add(result, item);
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
		static $toSet<T extends Class>(set: Dictionary<T>): Set<T> {
			return new Set<T>(Set.toSet(set), true);
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
		static asArray<T extends Class>(set: Dictionary<T>): T[] {
			return Set.toArray(set);
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
		static $asArray<T extends Class>(set: Dictionary<T>): Array<T> {
			return Set.$toArray(set);
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
		static asSet<T extends Class>(set: Dictionary<T>): Dictionary<T> {
			return set;
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
		static $asSet<T extends Class>(set: Dictionary<T>): Set<T> {
			return new Set<T>(set, true);
		}

		/**
		 * Adds an item to set if one is absent.
		 * @returns Item is added successfully. False if item is already present.
		 */
		static add<T extends Class>(set: Dictionary<T>, item: T): boolean {
			return Set.tryAdd(set, item) !== undefined;
		}

		/**
		 * Adds an item to set if one is absent.
		 * @returns Item is added successfully. If collection is not modified, returns undefined.
		 * In other words, this method may return true or undefined.
		 */
		static tryAdd<T extends Class>(set: Dictionary<T>, item: T): boolean {
			var iid = _JW.S(item._iid);
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
		static addAll<T extends Class>(set: Dictionary<T>, items: T[]): T[] {
			var result = Set.tryAddAll(set, items);
			return (result !== undefined) ? result : [];
		}

		/**
		 * Adds multiple items to set, ones that are absent.
		 * @returns The added items.
		 */
		static $addAll<T extends Class>(set: Dictionary<T>, items: T[]): Array<T> {
			return new Array<T>(Set.addAll(set, items), true);
		}

		/**
		 * Adds multiple items to set, ones that are absent.
		 * @returns The added items.
		 * If collection is not modified, returns undefined.
		 */
		static tryAddAll<T extends Class>(set: Dictionary<T>, items: T[]): T[] {
			var addedItems: T[] = [];
			for (var i = 0, l = items.length; i < l; ++i) {
				var item = items[i];
				if (Set.tryAdd(set, item)) {
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
		static remove<T extends Class>(set: Dictionary<T>, item: T): boolean {
			return Set.tryRemove(set, item) !== undefined;
		}

		/**
		 * Removes an item from set if one is present.
		 * @returns Item is removed successfully. If collection is not modified, returns undefined.
		 * In other words, this method may return true or undefined.
		 */
		static tryRemove<T extends Class>(set: Dictionary<T>, item: T): boolean {
			var iid = _JW.S(item._iid);
			if (!set.hasOwnProperty(iid)) {
				return;
			}
			delete set[iid];
			return true;
		}

		/**
		 * Removes first occurrence of an item in collection.
		 */
		static removeItem<T extends Class>(set: Dictionary<T>, item: T) {
			Set.tryRemove(set, item);
		}

		/**
		 * Removes multiple items from set, ones that are present.
		 * @returns The removed items.
		 */
		static removeAll<T extends Class>(set: Dictionary<T>, items: T[]): T[] {
			var result = Set.tryRemoveAll(set, items);
			return (result !== undefined) ? result : [];
		}

		/**
		 * Removes multiple items from set, ones that are present.
		 * @returns The removed items.
		 */
		static $removeAll<T extends Class>(set: Dictionary<T>, items: T[]): Array<T> {
			return new Array<T>(Set.removeAll(set, items), true);
		}

		/**
		 * Removes multiple items from set, ones that are present.
		 * @returns The removed items.
		 * If collection is not modified, returns undefined.
		 */
		static tryRemoveAll<T extends Class>(set: Dictionary<T>, items: T[]): T[] {
			var removedItems: T[] = [];
			for (var i = 0, l = items.length; i < l; ++i) {
				var item = items[i];
				if (Set.tryRemove(set, item)) {
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
		static removeItems<T extends Class>(set: Dictionary<T>, items: T[]) {
			Set.tryRemoveAll(set, items);
		}

		/**
		 * Clears collection.
		 * @returns Old collection contents. Never returns null or undefined.
		 */
		static clear<T extends Class>(set: Dictionary<T>): T[] {
			var result = Set.tryClear(set);
			return (result !== undefined) ? result : [];
		}

		/**
		 * Clears collection.
		 * @returns Old collection contents. Never returns null or undefined.
		 */
		static $clear<T extends Class>(set: Dictionary<T>): Array<T> {
			return new Array<T>(Set.clear(set), true);
		}

		/**
		 * Clears collection.
		 * @returns Old collection contents. If not modified - undefined.
		 */
		static tryClear<T extends Class>(set: Dictionary<T>): T[] {
			var items = Set.toArray(set);
			if (!items.length) {
				return;
			}
			Set.tryRemoveAll(set, items);
			return items;
		}

		/**
		 * Removes and adds multiple items in set. Universal optimized granular operation of removal/insertion.
		 * @param removedItems Items to remove.
		 * @param addedItems Items to add.
		 * @returns Splice result. Never returns null or undefined.
		 */
		static splice<T extends Class>(set: Dictionary<T>, removedItems: T[], addedItems: T[]): AbstractSet.SpliceResult<T> {
			var spliceResult = Set.trySplice(set, removedItems, addedItems);
			return (spliceResult !== undefined) ? spliceResult : { addedItems: [], removedItems: [] };
		}

		/**
		 * Removes and adds multiple items in set. Universal optimized granular operation of removal/insertion.
		 * @param removedItems Items to remove.
		 * @param addedItems Items to add.
		 * @returns Splice result.
		 * If collection is not modified, returns undefined.
		 */
		static trySplice<T extends Class>(set: Dictionary<T>, removedItems: T[], addedItems: T[]): AbstractSet.SpliceResult<T> {
			var addedItemSet = new Set<T>(addedItems);
			removedItems = Array.filter(removedItems, function (item) { return !addedItemSet.contains(item); });
			removedItems = Set.tryRemoveAll(set, removedItems);
			addedItems = Set.tryAddAll(set, addedItems);
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
		static detectSplice<T extends Class>(oldItems: Dictionary<T>, newItemArray: T[]): AbstractSet.SpliceParams<T> {
			var removedItems: T[] = [];
			var addedItems: T[] = [];
			var newItems: Dictionary<T> = Array.index(newItemArray, byField<string>("_iid"));
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
		static performSplice<T extends Class>(set: Dictionary<T>, newItems: T[]) {
			var spliceParams = Set.detectSplice(set, newItems);
			if (spliceParams !== undefined) {
				Set.trySplice(set, spliceParams.removedItems, spliceParams.addedItems);
			}
		}

		/**
		 * Checks for equality (===) to array, item by item.
		 */
		static equal<T extends Class>(x: Dictionary<T>, y: T[]): boolean {
			if (Set.getLength(x) !== y.length) {
				return false;
			}
			for (var i = 0, l = y.length; i < l; ++i) {
				if (!x.hasOwnProperty(_JW.S(y[i]._iid))) {
					return false;
				}
			}
			return true;
		}

		/**
		 * Creates a new set containing a single item.
		 */
		static single<T extends Class>(item: T): Dictionary<T> {
			var result: Dictionary<T> = {};
			result[item._iid] = item;
			return result;
		}
	}
}
