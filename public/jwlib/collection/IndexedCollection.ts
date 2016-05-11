/// <reference path="../jwlib.ref.ts" />

module JW {
	/**
	 * Abstract collection of items of type T with keys of type K.
	 *
	 * There are 2 indexed collection types:
	 *
	 * * [[JW.AbstractArray]] (key is number)
	 * * [[JW.AbstractMap]] (key is string)
	 *
	 * Please keep the next rule in mind whenever you work with jWidget indexed collections:
	 * in arguments, item always goes first and key goes last.
	 *
	 * # Indexed collection methods
	 *
	 * **Difference compared to [[JW.AbstractCollection]] is in bold.**
	 *
	 * Content retrieving:
	 *
	 * * [[getLength]] - Returns count of items in collection.
	 * For observable collections, **length** property may come
	 * in handy if you want to track collection length dynamically.
	 * * [[isEmpty]] - Checks collection for emptiness.
	 * * **[[get]] - Returns collection item by key.**
	 * * [[getFirst]] - Returns first item in collection
	 * * **[[getFirstKey]] - Returns key of first item in collection.**
	 * * **[[getKeys]], [[$getKeys]] - Returns array of all item keys.**
	 * * [[containsItem]] - Does collection contain the item?
	 * * **[[containsKey]] - Does collection contain the key?**
	 * * **[[keyOf]] - Returns item key. If item is not found, returns undefined.**
	 *
	 * Iteration algorithms (**callback functions are overridden and take extra arguments - item keys**):
	 *
	 * * [[every]] - Checks all items by criteria.
	 * Returns true if all items match the criteria.
	 * * [[some]] - Checks each item by criteria.
	 * Returns true if some item matches the criteria.
	 * * [[each]] - Iterates items through.
	 * * [[search]] - Finds item by criteria.
	 * Returns first item matching the criteria.
	 * * **[[find]] - Finds item by criteria.
	 * Returns key of first item matching the criteria.**
	 * * [[filter]], [[$filter]],
	 * [[$$filter]] - Filters collection by criteria.
	 * Builds new collection of the same type, consisting of items matching the criteria.
	 * * [[count]], [[$count]],
	 * [[$$count]] - Counts the items matching criteria.
	 * * [[map]], [[$map]],
	 * [[$$mapValues]], [[$$mapObjects]] - Maps collection items.
	 * Builds new collection of the same type, consisting of results of mapping function call for each collection item.
	 * * [[toSorted]], [[$toSorted]],
	 * [[toSortedComparing]], [[$toSortedComparing]],
	 * [[$$toSortedComparing]] -
	 * Builds array consisting of collection items sorted by indexer or comparer.
	 * * **[[getSortingKeys]], [[$getSortingKeys]],
	 * [[getSortingKeysComparing]],
	 * [[$getSortingKeysComparing]] -
	 * Returns indexes of collection items sorted by indexer or comparer.**
	 * * [[index]], [[$index]],
	 * [[$$index]] - Indexes collection.
	 * Builds new map by rule: key is the result of indexer function call, value is the corresponding item.
	 * * [[toArray]], [[$toArray]],
	 * [[$$toArray]] - Builds new array consisting of collection items.
	 * * **[[toMap]], [[$toMap]] - Builds new map consisting of collection items.**
	 * * [[toSet]], [[$toSet]],
	 * [[$$toSet]] - Builds new set consisting of collection items.
	 * * [[asArray]], [[$asArray]] - Represents collection as array.
	 * * **[[asMap]], [[$asMap]] - Represents collection as map.**
	 * * [[asSet]], [[$asSet]] - Represents collection as set.
	 *
	 * Collection modification:
	 *
	 * * **[[set]], [[trySet]] - Replaces an item by key.**
	 * * **[[remove]], [[tryRemove]] - Removes an item by key.**
	 * * [[removeItem]] - Removes first occurency of an item in collection.
	 * * [[removeItems]] - Removes all occurencies of items in collection.
	 * * [[clear]], [[$clear]], [[tryClear]] - Clears collection.
	 *
	 * Synchronizers creation:
	 *
	 * * [[createMapper]] - Creates item mapper.
	 * Extended version of [[$$mapValues]] and [[$$mapObjects]] methods.
	 * * [[createFilterer]] - Creates filterer.
	 * Extended version of [[$$filter]] method.
	 * * [[createCounter]] - Creates matching item counter.
	 * Extended version of [[$$count]] method.
	 * * [[createLister]] - Creates converter to set.
	 * Extended version of [[$$toSet]] method.
	 * * [[createIndexer]] - Creates converter to map (indexer).
	 * Extended version of [[$$index]] method.
	 * * [[createOrderer]] - Creates converter to array (orderer).
	 * Extended version of [[$$toArray]] method.
	 * * [[createSorterComparing]] - Creates converter to array (sorter by comparer).
	 * Extended version of [[$$toSortedComparing]] method.
	 * * [[createObserver]] - Creates observer.
	 *
	 * Similar collection creation (for algorithms and synchronizers implementation):
	 *
	 * * [[createEmpty]] - Creates empty collection of the same type.
	 * * [[createEmptyArray]] - Creates empty array of the same observability type.
	 * * [[createEmptyMap]] - Creates empty map of the same observability type.
	 * * [[createEmptySet]] - Creates empty set of the same observability type.
	 *
	 * All the same algorithms are also available for native JavaScript collections:
	 *
	 * * Array, see [[JW.Array]] static methods.
	 * * Object as map, see [[JW.Map]] static methods.
	 *
	 * @param K Collection item key type.
	 * @param T Collection item type.
	 */
	export abstract class IndexedCollection<K, T> extends AbstractCollection<T> {
		/**
		 * @inheritdoc
		 */
		ownItems(): IndexedCollection<K, T> {
			super.ownItems();
			return this;
		}

		/**
		 * Returns item by key. If item with such key doesn't exist, returns undefined.
		 */
		abstract get(key: K): T;

		/**
		 * @inheritdoc
		 */
		abstract $clear(): IndexedCollection<K, T>;

		/**
		 * Returns key of first collection item. If collection is empty, returns undefined.
		 */
		abstract getFirstKey(): K;

		/**
		 * Returns array of keys of all collection items.
		 */
		abstract getKeys(): K[];

		/**
		 * Returns array of keys of all collection items.
		 */
		$getKeys(): Array<K> {
			return new Array<K>(this.getKeys(), true);
		}

		/**
		 * Checks existance of item with specified key in collection.
		 */
		containsKey(key: K): boolean {
			return this.get(key) !== undefined;
		}

		/**
		 * @inheritdoc
		 */
		containsItem(item: T): boolean {
			return !this.every(function (v: T): boolean {
				return item !== v;
			});
		}

		/**
		 * Returns key of item in collection. If such item doesn't exist, returns undefined.
		 */
		keyOf(item: T): K {
			return this.find(function (v: T): boolean {
				return item === v;
			});
		}

		/**
		 * Replaces item with specified key. If collection doesn't contain such key:
		 *
		 * * Array will be broken.
		 * * Map will add a new item.
		 *
		 * @returns Proxy of the replaced item. If collection is not modified, returns undefined.
		 */
		abstract trySet(item: T, key: K): Proxy<T>;

		/**
		 * Replaces item with specified key. If collection doesn't contain such key:
		 *
		 * * Array will be broken.
		 * * Map will add a new item.
		 *
		 * @returns The replaced item.
		 */
		set(item: T, key: K): T {
			var result = this.trySet(item, key);
			return (result !== undefined) ? result.value : this.get(key);
		}

		/**
		 * Removes item with specified key. If collection doesn't contain such key:
		 *
		 * * Array will be broken.
		 * * Map will add a new item.
		 *
		 * @returns The removed item. If collection is not modified, returns undefined.
		 */
		abstract tryRemove(key: K): T;

		/**
		 * Removes item with specified key. If collection doesn't contain such key:
		 *
		 * * Array will be broken.
		 * * Map will add a new item.
		 *
		 * @returns The removed item.
		 */
		remove(key: K): T {
			return this.tryRemove(key);
		}

		/**
		 * @inheritdoc
		 */
		removeItem(item: T): K {
			var key = this.keyOf(item);
			if (key !== undefined) {
				this.tryRemove(key);
			}
			return key;
		}

		/**
		 * @inheritdoc
		 */
		abstract every(callback: (item: T, key: K) => boolean, scope?: any): boolean;

		/**
		 * @inheritdoc
		 */
		some(callback: (item: T, key: K) => boolean, scope?: any): boolean {
			return !this.every(function (item: T, key: K): boolean {
				return callback.call(this, item, key) === false;
			}, scope);
		}

		/**
		 * @inheritdoc
		 */
		each(callback: (item: T, key: K) => any, scope?: any) {
			this.every(function (item: T, key: K): boolean {
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
		find(callback: (item: T, key: K) => boolean, scope?: any): K {
			var result: K;
			this.every(function (item: T, key: K): boolean {
				if (callback.call(this, item, key) !== false) {
					result = key;
					return false;
				}
				return true;
			}, scope);
			return result;
		}

		/**
		 * @inheritdoc
		 */
		search(callback: (item: T, key: K) => boolean, scope: any = null): T {
			var result: T;
			this.every(function (item: T, key: K): boolean {
				if (callback.call(this, item, key) !== false) {
					result = item;
					return false;
				}
				return true;
			}, scope);
			return result;
		}

		/**
		 * @inheritdoc
		 */
		abstract toSorted(callback?: (item: T, key: K) => any, scope?: any, order?: number): T[];

		/**
		 * @inheritdoc
		 */
		$toSorted(callback?: (item: T, key: K) => any, scope?: any, order?: number): Array<T> {
			return new Array<T>(this.toSorted(callback, scope, order), true);
		}

		/**
		 * @inheritdoc
		 */
		abstract toSortedComparing(compare?: (t1: T, t2: T, k1: K, k2: K) => number, scope?: any, order?: number): T[];

		/**
		 * @inheritdoc
		 */
		$toSortedComparing(compare?: (t1: T, t2: T, k1: K, k2: K) => number, scope?: any, order?: number): Array<T> {
			return new Array<T>(this.toSortedComparing(compare, scope, order), true);
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
		abstract getSortingKeys(callback?: (item: T, key: K) => any, scope?: any, order?: number): K[];

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
		$getSortingKeys(callback?: (item: T, key: K) => any, scope?: any, order?: number): Array<K> {
			return new Array<K>(this.getSortingKeys(callback, scope, order), true);
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
		abstract getSortingKeysComparing(compare?: (t1: T, t2: T, k1: K, k2: K) => number, scope?: any, order?: number): K[];

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
		$getSortingKeysComparing(compare?: (t1: T, t2: T, k1: K, k2: K) => number, scope?: any, order?: number): Array<K> {
			return new Array<K>(this.getSortingKeysComparing(compare, scope, order), true);
		}

		/**
		 * @inheritdoc
		 */
		index(callback: (item: T, key: K) => string, scope?: any): Dictionary<T> {
			var result: Dictionary<T> = {};
			this.every(function (item, key) {
				var k: string = callback.call(this, item, key);
				if (k != null) {
					result[k] = item;
				}
				return true;
			}, scope);
			return result;
		}

		/**
		 * @inheritdoc
		 */
		$index(callback: (item: T, key: K) => string, scope?: any): Map<T> {
			return new Map<T>(this.index(callback, scope), true);
		}

		/**
		 * Converts collection to map.
		 *
		 * Builds new map consisting of collection items.
		 */
		toMap(): Dictionary<T> {
			var result: Dictionary<T> = {};
			this.every(function (v, k) {
				result[_JW.S(k)] = v;
				return true;
			});
			return result;
		}

		/**
		 * Converts collection to map.
		 *
		 * Builds new map consisting of collection items.
		 */
		$toMap(): Map<T> {
			return new Map<T>(this.toMap(), true);
		}

		/**
		 * Represents collection as map.
		 *
		 * If this collection is map, returns it immediately. Else, executes [[toMap]] method.
		 * This method works usually faster than [[toMap]], but please make sure that the returned map
		 * won't be modified externally, because it can cause strange unexpected bugs.
		 */
		asMap(): Dictionary<T> {
			return this.toMap();
		}

		/**
		 * Represents collection as map.
		 *
		 * If this collection is map, returns it immediately. Else, executes [[toMap]] method.
		 * This method works usually faster than [[toMap]], but please make sure that the returned map
		 * won't be modified externally, because it can cause strange unexpected bugs.
		 */
		$asMap(): AbstractMap<T> {
			return new Map<T>(this.asMap(), true);
		}

		/**
		 * @inheritdoc
		 */
		abstract filter(callback: (item: T, key: K) => boolean, scope?: any): any;

		/**
		 * @inheritdoc
		 */
		abstract $filter(callback: (item: T, key: K) => boolean, scope?: any): IndexedCollection<K, T>;

		/**
		 * @inheritdoc
		 */
		abstract $$filter(callback: (item: T, key: K) => boolean, scope?: any): IndexedCollection<K, T>;

		/**
		 * @inheritdoc
		 */
		abstract count(callback: (item: T, key: K) => boolean, scope?: any): number;

		/**
		 * @inheritdoc
		 */
		$count(callback: (item: T, key: K) => boolean, scope?: any): Property<number> {
			return new Property<number>(this.count(callback, scope));
		}

		/**
		 * @inheritdoc
		 */
		$$count(callback: (item: T, key: K) => boolean, scope?: any): Property<number> {
			return this.$count(callback, scope);
		}

		/**
		 * @inheritdoc
		 */
		abstract map<U>(callback: (item: T, key: K) => U, scope?: any): any;

		/**
		 * @inheritdoc
		 */
		abstract $map<U>(callback: (item: T, key: K) => U, scope?: any): IndexedCollection<K, U>;

		/**
		 * @inheritdoc
		 */
		abstract $$mapValues<U>(callback: (item: T, key: K) => U, scope?: any): IndexedCollection<K, U>;

		/**
		 * @inheritdoc
		 */
		abstract $$mapObjects<U extends Destroyable>(callback: (item: T, key: K) => U, scope?: any): IndexedCollection<K, U>;

		/**
		 * @inheritdoc
		 */
		abstract createEmpty<U>(): IndexedCollection<K, U>;
	}
}
