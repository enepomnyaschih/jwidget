/*
	jWidget Lib source file.

	Copyright (C) 2015 Egor Nepomnyaschih

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

/**
 * @class
 *
 * `<K, T> extends JW.AbstractCollection<T>`
 *
 * Abstract collection of items of type T with keys of type K.
 *
 * There are 2 indexed collection types:
 *
 * - JW.AbstractArray (key is number)
 * - JW.AbstractMap (key is string)
 *
 * Please keep in mind the next rule whenever you work with jWidget indexed collections:
 * in all methods and callbacks which take item and key arguments, item goes first and key goes last.
 *
 * # Indexed collection methods
 *
 * **Difference compared to JW.AbstractCollection is in bold.**
 *
 * Content retrieving:
 *
 * - {@link #getLength} - Returns count of items in collection. For observable collections, `length` property may come
 * in handy if you want to track collection length dynamically.
 * - {@link #isEmpty} - Checks collection for emptiness.
 * - **{@link #get} - Returns collection item by key.**
 * - {@link #getFirst} - Returns first item in collection
 * - **{@link #getFirstKey} - Returns key of first item in collection.**
 * - **{@link #getKeys}, #$getKeys - Returns array of all item keys.**
 * - {@link #containsItem} - Does collection contain the item?
 * - **{@link #containsKey} - Does collection contain the key?**
 * - **{@link #keyOf} - Returns item key. If item is not found, returns `undefined`.**
 *
 * Iteration algorhitms (**callback functions are overridden and take extra arguments - item keys**):
 *
 * - {@link #every} - Checks all items by criteria.
 * Returns `true` if all items match the criteria.
 * - {@link #some} - Checks each item by criteria.
 * Returns `true` if some items matches the criteria.
 * - {@link #each} - Iterates items.
 * - {@link #search} - Finds item by criteria.
 * Returns first item matching the criteria.
 * - **{@link #find} - Finds item by criteria.
 * Returns index of first item matching the criteria.**
 * - {@link #filter}, #$filter, #$$filter - Filters collection by criteria.
 * Builds new collection of the same type, consisting of items matching the criteria.
 * - {@link #count}, #$count, #$$count - Counts the items matching criteria.
 * - {@link #map}, #$map, #$$mapValues, #$$mapObjects - Maps collection items.
 * Builds new collection of the same type, consisting of results of mapping function call for each collection item.
 * - {@link #toSorted}, #$toSorted, #toSortedComparing, #$toSortedComparing, #$$toSortedComparing -
 * Builds array consisting of collection items sorted by indexer or comparer.
 * - **{@link #getSortingKeys}, #$getSortingKeys, #getSortingKeysComparing, #$getSortingKeysComparing -
 * Returns indexes of collection items sorted by indexer or comparer.**
 * - {@link #index}, #$index, #$$index - Indexes collection.
 * Builds new map by rule: key is the result of indexer function call, value is the corresponding item.
 * - {@link #toArray}, #$toArray, #$$toArray - Builds new array consisting of collection items.
 * - **{@link #toMap}, #$toMap - Builds new map consisting of collection items.**
 * - {@link #toSet}, #$toSet, #$$toSet - Builds new set consisting of collection items.
 * - {@link #asArray}, #$asArray - Represents collection as array.
 * - **{@link #asMap}, #$asMap - Represents collection as map.**
 * - {@link #asSet}, #$asSet - Represents collection as set.
 *
 * Collection modification:
 *
 * - **{@link #set}, #trySet - Replaces an item by key.**
 * - **{@link #remove}, #tryRemove - Removes an item by key.**
 * - {@link #removeItem} - Removes first occurency of an item in collection.
 * - {@link #removeItems} - Removes all occurencies of items in collection.
 * - {@link #clear}, #$clear, #tryClear - Clears collection.
 *
 * Synchronizers creation:
 *
 * - {@link #createMapper} - Creates item mapper. Extended version of #$$mapValues and #$$mapObjects methods.
 * - {@link #createFilterer} - Creates filterer. Extended version of #$$filter method.
 * - {@link #createCounter} - Creates matching item counter. Extended version of #$$count method.
 * - {@link #createLister} - Creates converter to set. Extended version of #$$toSet method.
 * - {@link #createIndexer} - Creates converter to map (indexer). Extended version of #$$index method.
 * - {@link #createOrderer} - Creates converter to array (orderer). Extended version of #$$toArray method.
 * - {@link #createSorterComparing} - Creates converter to array (sorter by comparer). Extended version of #$$toSortedComparing method.
 * - {@link #createObserver} - Creates observer.
 *
 * Similar collection creation (for algorithms and synchronizers implementation):
 *
 * - {@link #createEmpty} - Creates empty collection of the same type.
 * - {@link #createEmptyArray} - Creates empty array of the same observability type.
 * - {@link #createEmptyMap} - Creates empty map of the same observability type.
 * - {@link #createEmptySet} - Creates empty set of the same observability type.
 *
 * All the same algorithms are also available for native JavaScript collections:
 *
 * - Array, see JW.Array static methods.
 * - Object as map, see JW.Map static methods.
 *
 * @extends JW.AbstractCollection
 * @abstract
 */
JW.IndexedCollection = function() {
	JW.IndexedCollection._super.call(this);
};

JW.extend(JW.IndexedCollection, JW.AbstractCollection, {
	/**
	 * @method get
	 * Returns item by key. If item with such key doesn't exist, returns `undefined`.
	 * @param {K} key Key.
	 * @returns {T} Item.
	 */
	/**
	 * @method $clear
	 * Clears collection.
	 * @returns {JW.IndexedCollection} `<K, T>` Old collection contents.
	 */

	/**
	 * Returns key of first collection item. If collection is empty, returns `undefined`.
	 * @returns {K} Key.
	 */
	getFirstKey: function() {
		return this._callStatic("getFirstKey");
	},

	/**
	 * @method getKeys
	 * Returns array of keys of all collection items.
	 * @returns {Array} `<K>` Keys array.
	 */
	/**
	 * Returns array of keys of all collection items.
	 * @returns {JW.Array} `<K>` Keys array.
	 */
	$getKeys: JW.AbstractCollection._create$Array("getKeys"),

	/**
	 * Checks existance of item with specified index in collection.
	 * @param {K} key Key.
	 * @returns {boolean} Collection contains item with specified key.
	 */
	containsKey: function(key) {
		return this.get(key) !== undefined;
	},

	containsItem: function(item) {
		return !this.every(function(v) { return item !== v; });
	},

	/**
	 * Returns index of item in collection. If such item doesn't exist, returns `undefined`.
	 * @param {T} item Item.
	 * @returns {K} Item key.
	 */
	keyOf: function(item) {
		return this.find(function(v) { return item === v; });
	},

	/**
	 * @method trySet
	 *
	 * Replaces item with specified key. If collection doesn't contain such key:
	 *
	 * - Array will break.
	 * - Map will add a new item.
	 *
	 * @param {T} item Item.
	 * @param {K} key Key.
	 * @returns {JW.Proxy} `<T>` Proxy of the replaced item. If not modified - `undefined`.
	 */
	/**
	 * Replaces item with specified key. If collection doesn't contain such key:
	 *
	 * - Array will break.
	 * - Map will add a new item.
	 *
	 * @param {T} item Item.
	 * @param {K} key Key.
	 * @returns {T} The replaced item.
	 */
	set: function(item, key) {
		var result = this.trySet(item, key);
		return (result !== undefined) ? result.value : this.get(key);
	},

	/**
	 * @method tryRemove
	 * Removes item with specified key. If collection doesn't contain such key:
	 *
	 * - Array will break.
	 * - Map will add a new item.
	 *
	 * @param {K} key Key.
	 * @returns {T} The removed item. If not modified - `undefined`.
	 */
	/**
	 * Removes item with specified key. If collection doesn't contain such key:
	 *
	 * - Array will break.
	 * - Map will do nothing.
	 *
	 * @param {K} key Key.
	 * @returns {T} The removed item.
	 */
	remove: function(key) {
		return this.tryRemove(key);
	},

	removeItem: function(item) {
		var key = this.keyOf(item);
		if (key !== undefined) {
			this.tryRemove(key);
		}
		return key;
	},

	/**
	 * @method every
	 *
	 * Checks all items by criteria.
	 *
	 * Returns true if function `f` returns !== `false` for all collection items.
	 *
	 * Algorithms iterates items sequentially, and stops after first item not matching the criteria.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T, key: K): boolean`
	 *
	 * Criteria.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {boolean} Result.
	 */
	/**
	 * Checks each item by criteria.
	 *
	 * Returns true if function `f` returns !== `false` for some collection item.
	 *
	 * Algorithms iterates items sequentially, and stops after first item matching the criteria.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T, key: K): boolean`
	 *
	 * Criteria.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {boolean} Result.
	 */
	some: function(callback, scope) {
		return !this.every(function(item, key) {
			return callback.call(this, item, key) === false;
		}, scope);
	},

	/**
	 * Iterates collection items. Calls specified function for all items.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T, key: K): void`
	 *
	 * Function.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {void}
	 */
	each: function(callback, scope) {
		this.every(function(item, key) {
			callback.call(this, item, key);
			return true;
		}, scope);
	},

	/**
	 * Finds item by criteria.
	 *
	 * Returns key of first item for which `f` returns !== `false`.
	 *
	 * Algorithms iterates items sequentially, and stops after first item matching the criteria.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T, key: K): boolean`
	 *
	 * Criteria.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {K} Found item key or `undefined`.
	 */
	find: function(callback, scope) {
		var result;
		this.every(function(item, key) {
			if (callback.call(this, item, key) !== false) {
				result = key;
				return false;
			}
			return true;
		}, scope);
		return result;
	},

	/**
	 * Finds item by criteria.
	 *
	 * Returns first item for which `f` returns !== `false`.
	 *
	 * Algorithms iterates items sequentially, and stops after first item matching the criteria.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T, key: K): boolean`
	 *
	 * Criteria.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {T} Found item or `undefined`.
	 */
	search: function(callback, scope) {
		var result;
		this.every(function(item, key) {
			if (callback.call(this, item, key) !== false) {
				result = item;
				return false;
			}
			return true;
		}, scope);
		return result;
	},

	/**
	 * @method toSorted
	 *
	 * Converts collection to sorted array.
	 *
	 * Builds array consisting of collection items sorted by result of `f` call for each item.
	 *
	 * @param {Function} [f]
	 *
	 * `f(item: T, key: K): number/string`
	 *
	 * Indexer function. Returns `item` by default.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @param {1/-1} [order] Sorting order.
	 * @returns {Array} `<T>` Sorted array.
	 */
	/**
	 * @method $toSorted
	 *
	 * Converts collection to sorted array.
	 *
	 * Builds array consisting of collection items sorted by result of `f` call for each item.
	 *
	 * @param {Function} [f]
	 *
	 * `f(item: T, key: K): number/string`
	 *
	 * Indexer function. Returns `item` by default.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @param {1/-1} [order] Sorting order.
	 * @returns {JW.Array} `<T>` Sorted array.
	 */
	/**
	 * @method toSortedComparing
	 *
	 * Converts collection to sorted array.
	 *
	 * Builds array consisting of collection items sorted by comparer.
	 *
	 * @param {Function} [compare]
	 *
	 * `f(t1: T, t2: T, k1: K, k2: K): number`
	 *
	 * Comparer function. Returns positive value if t1 > t2; nagative value if t1 < t2; 0 if t1 == t2.
	 * Defaults to `JW.cmp(t1, t2)`.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @param {1/-1} [order] Sorting order.
	 * @returns {Array} `<T>` Sorted array.
	 */
	/**
	 * @method $toSortedComparing
	 *
	 * Converts collection to sorted array.
	 *
	 * Builds array consisting of collection items sorted by comparer.
	 *
	 * @param {Function} [compare]
	 *
	 * `f(t1: T, t2: T, k1: K, k2: K): number`
	 *
	 * Comparer function. Returns positive value if t1 > t2; nagative value if t1 < t2; 0 if t1 == t2.
	 * Defaults to `JW.cmp(t1, t2)`.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @param {1/-1} [order] Sorting order.
	 * @returns {JW.Array} `<T>` Sorted array.
	 */

	/**
	 * Returns keys of sorted items.
	 *
	 * Builds array of item keys, sorted by result of `f` call for each item.
	 *
	 * @param {Function} [f]
	 *
	 * `f(item: T, key: K): number/string`
	 *
	 * Indexer function. Returns `item` by default.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @param {1/-1} [order] Sorting order.
	 * @returns {Array} `<K>` Sorted item keys array.
	 */
	getSortingKeys: function(callback, scope, order) {
		return this._callStatic("getSortingKeys", [callback, scope || this, order]);
	},

	/**
	 * Returns keys of sorted items.
	 *
	 * Builds array of item keys, sorted by result of `f` call for each item.
	 *
	 * @param {Function} [f]
	 *
	 * `f(item: T, key: K): number/string`
	 *
	 * Indexer function. Returns `item` by default.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @param {1/-1} [order] Sorting order.
	 * @returns {JW.Array} `<K>` Sorted item keys array.
	 */
	$getSortingKeys: JW.AbstractCollection._create$Array("getSortingKeys"),

	/**
	 * Returns keys of sorted items.
	 *
	 * Builds array of item keys, sorted by comparer.
	 *
	 * @param {Function} [compare]
	 *
	 * `f(t1: T, t2: T, k1: K, k2: K): number`
	 *
	 * Comparer function. Returns positive value if t1 > t2; nagative value if t1 < t2; 0 if t1 == t2.
	 * Defaults to `JW.cmp(t1, t2)`.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @param {1/-1} [order] Sorting order.
	 * @returns {Array} `<K>` Sorted item keys array.
	 */
	getSortingKeysComparing: function(compare, scope, order) {
		return this._callStatic("getSortingKeysComparing", [compare, scope || this, order]);
	},

	/**
	 * Returns keys of sorted items.
	 *
	 * Builds array of item keys, sorted by comparer.
	 *
	 * @param {Function} [compare]
	 *
	 * `f(t1: T, t2: T, k1: K, k2: K): number`
	 *
	 * Comparer function. Returns positive value if t1 > t2; nagative value if t1 < t2; 0 if t1 == t2.
	 * Defaults to `JW.cmp(t1, t2)`.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @param {1/-1} [order] Sorting order.
	 * @returns {JW.Array} `<K>` Sorted item keys array.
	 */
	$getSortingKeysComparing: JW.AbstractCollection._create$Array("getSortingKeysComparing"),

	/**
	 * @method $index
	 *
	 * Indexes collection.
	 *
	 * Builds new map by rule: key is the result of indexer function call, value is the corresponding item.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T, key: K): string`
	 *
	 * Indexer function.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {JW.Map} `<T>` Collection index.
	 */
	/**
	 * Indexes collection.
	 *
	 * Builds new map by rule: key is the result of indexer function call, value is the corresponding item.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T, key: K): string`
	 *
	 * Indexer function.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {Object} `<T>` Collection index.
	 */
	index: function(callback, scope) {
		var result = {};
		this.every(function(item, k) {
			var key = callback.call(this, item, k);
			if (JW.isSet(key)) {
				result[key] = item;
			}
			return true;
		}, scope);
		return result;
	},

	/**
	 * Converts collection to map.
	 *
	 * Builds new map consisting of collection items.
	 *
	 * @returns {Object} `<T>` Items map.
	 */
	toMap: function() {
		var result = {};
		this.every(function(v, k) {
			result[k] = v;
		});
		return result;
	},

	/**
	 * Converts collection to map.
	 *
	 * Builds new map consisting of collection items.
	 *
	 * @returns {JW.Map} `<T>` Items map.
	 */
	$toMap: JW.AbstractCollection._create$Map("toMap"),

	/**
	 * Represents collection as map.
	 *
	 * If this collection is map, returns it immediately. Else, executes #toMap method.
	 * This method works probably faster than #toMap, but please make sure that the returned map
	 * won't be modified externally, because it can cause strange unexpected bugs.
	 *
	 * @returns {Object} `<T>` Items map.
	 */
	asMap: function() {
		return this.toMap();
	},

	/**
	 * Represents collection as map.
	 *
	 * If this collection is map, returns it immediately. Else, executes #toMap method.
	 * This method works probably faster than #toMap, but please make sure that the returned map
	 * won't be modified externally, because it can cause strange unexpected bugs.
	 *
	 * @returns {JW.Map} `<T>` Items map.
	 */
	$asMap: JW.AbstractCollection._create$Map("asMap")

	/**
	 * @method filter
	 *
	 * Filters collection by criteria.
	 *
	 * Builds new collection of the same type, consisting of items for which `f` returns !== `false`.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T, key: K): boolean`
	 *
	 * Criteria.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {Array/Object} `<T>` Filtered collection.
	 */
	/**
	 * @method $filter
	 *
	 * Filters collection by criteria.
	 *
	 * Builds new collection of the same type, consisting of items for which `f` returns !== `false`.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T, key: K): boolean`
	 *
	 * Criteria.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {JW.IndexedCollection} `<K, T>` Filtered collection.
	 */
	/**
	 * @method map
	 *
	 * `<U>` Maps collection items.
	 *
	 * Builds new collection of the same type, consisting of results of `f` call for each collection item.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T, key: K): U`
	 *
	 * Mapping function.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {Array/Object} `<U>` Mapped collection.
	 */
	/**
	 * @method $map
	 *
	 * `<U>` Maps collection items.
	 *
	 * Builds new collection of the same type, consisting of results of `f` call for each collection item.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T, key: K): U`
	 *
	 * Mapping function.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {JW.IndexedCollection} `<K, U>` Mapped collection.
	 */

	/**
	 * @method createEmpty
	 * `<U>` Creates empty collection of the same type.
	 * @returns {JW.IndexedCollection} `<K, U>` Collection.
	 */
});
