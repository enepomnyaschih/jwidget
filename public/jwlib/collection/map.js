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
 * `<T> extends JW.AbstractMap<T>`
 *
 * See structurized list of methods in JW.AbstractMap.
 * Static methods duplicate API of JW.AbstractMap, but take native Object as first argument.
 *
 * @extends JW.AbstractMap
 *
 * @constructor
 * @param {Object} [items] `<T>` Initial contents. By default, created collection is empty.
 * @param {boolean} [adapter] Create map as adapter of `items`. Defaults to false, so `items` is copied.
 */
JW.Map = function(json, adapter) {
	JW.Map._super.call(this, json, adapter);
};

JW.extend(JW.Map, JW.AbstractMap, {
	/**
	 * `<U>` Creates empty collection of the same type.
	 * @returns {JW.Map} `<U>` Collection.
	 */
	createEmpty: function() {
		return new JW.Map();
	},

	/**
	 * `<U>` Creates empty array of the same observability level.
	 * @returns {JW.Array} `<U>` Array.
	 */
	createEmptyArray: function() {
		return new JW.Array();
	},

	/**
	 * `<U>` Creates empty map of the same observability level.
	 * @returns {JW.Map} `<U>` Map.
	 */
	createEmptyMap: function() {
		return new JW.Map();
	},

	/**
	 * `<U>` Creates empty set of the same observability level.
	 * @returns {JW.Set} `<U>` Set.
	 */
	createEmptySet: function() {
		return new JW.Set();
	}

	/**
	 * @method getLength
	 * `<T>` Returns count of items in collection.
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @returns {number} Count of items in collection.
	 */
	/**
	 * @method isEmpty
	 * `<T>` Checks collection for emptiness.
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @returns {boolean} Collection doesn't contain any items.
	 */
	/**
	 * @method getFirst
	 * `<T>` Returns first item in collection. If collection is empty, returns `undefined`.
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @returns {T} Item.
	 */
	/**
	 * @method getFirstKey
	 * `<T>` Returns key of first collection item. If collection is empty, returns `undefined`.
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @returns {string} Key.
	 */
	/**
	 * @method get
	 * `<T>` Returns item by key. If item with such key doesn't exist, returns `undefined`.
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @param {string} key Key.
	 * @returns {T} Item.
	 */
	/**
	 * @method getKeys
	 * `<T>` Returns array of keys of all collection items.
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @returns {Array} `<string>` Keys array.
	 */
	/**
	 * @method $getKeys
	 * `<T>` Returns array of keys of all collection items.
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @returns {JW.Array} `<string>` Keys array.
	 */
	/**
	 * @method containsKey
	 * `<T>` Checks existance of item with specified index in collection.
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @param {string} key Key.
	 * @returns {boolean} Collection contains item with specified key.
	 */
	/**
	 * @method containsItem
	 * `<T>` Checks item existance in collection.
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @param {T} item Item.
	 * @returns {boolean} Collection contains specified item.
	 */
	/**
	 * @method keyOf
	 * `<T>` Returns index of item in collection. If such item doesn't exist, returns `undefined`.
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @param {T} item Item.
	 * @returns {string} Item key.
	 */
	/**
	 * @method removeItem
	 * `<T>` Removes first occurency of an item in collection.
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @param {T} item Item.
	 * @returns {void}
	 */
	/**
	 * @method removeItems
	 * `<T extends JW.Class>` Removes all occurencies of items in collection.
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @param {Array} items `<T>` Item.
	 * @returns {void}
	 */
	/**
	 * @method tryClear
	 * `<T>` Clears collection.
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @returns {Object} `<T>` Old collection contents. If not modified - `undefined`.
	 */
	/**
	 * @method clear
	 * `<T>` Clears collection.
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @returns {Object} `<T>` Old collection contents.
	 */
	/**
	 * @method $clear
	 * `<T>` Clears collection.
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @returns {JW.Map} `<T>` Old collection contents.
	 */
	/**
	 * @method every
	 *
	 * `<T>` Checks all items by criteria.
	 *
	 * Returns true if function `f` returns !== `false` for all collection items.
	 *
	 * Algorithms iterates items sequentially, and stops after first item not matching the criteria.
	 *
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @param {Function} f
	 *
	 * `f(item: T, key: string): boolean`
	 *
	 * Criteria.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {boolean} Result.
	 */
	/**
	 * @method some
	 *
	 * `<T>` Checks each item by criteria.
	 *
	 * Returns true if function `f` returns !== `false` for some collection item.
	 *
	 * Algorithms iterates items sequentially, and stops after first item matching the criteria.
	 *
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @param {Function} f
	 *
	 * `f(item: T, key: string): boolean`
	 *
	 * Criteria.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {boolean} Result.
	 */
	/**
	 * @method each
	 *
	 * `<T>` Iterates collection items. Calls specified function for all items.
	 *
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @param {Function} f
	 *
	 * `f(item: T, key: string): void`
	 *
	 * Function.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {void}
	 */
	/**
	 * @method find
	 *
	 * `<T>` Finds item by criteria.
	 *
	 * Returns key of first item for which `f` returns !== `false`.
	 *
	 * Algorithms iterates items sequentially, and stops after first item matching the criteria.
	 *
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @param {Function} f
	 *
	 * `f(item: T, key: string): boolean`
	 *
	 * Criteria.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {string} Found item key or `undefined`.
	 */
	/**
	 * @method search
	 *
	 * `<T>` Finds item by criteria.
	 *
	 * Returns first item for which `f` returns !== `false`.
	 *
	 * Algorithms iterates items sequentially, and stops after first item matching the criteria.
	 *
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @param {Function} f
	 *
	 * `f(item: T, key: string): boolean`
	 *
	 * Criteria.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {T} Found item or `undefined`.
	 */
	/**
	 * @method toSorted
	 *
	 * `<T>` Converts collection to sorted array.
	 *
	 * Builds array consisting of collection items sorted by result of `f` call for each item.
	 *
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @param {Function} [f]
	 *
	 * `f(item: T, key: string): number/string`
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
	 * `<T>` Converts collection to sorted array.
	 *
	 * Builds array consisting of collection items sorted by result of `f` call for each item.
	 *
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @param {Function} [f]
	 *
	 * `f(item: T, key: string): number/string`
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
	 * `<T>` Converts collection to sorted array.
	 *
	 * Builds array consisting of collection items sorted by comparer.
	 *
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @param {Function} [compare]
	 *
	 * `f(t1: T, t2: T, k1: string, k2: string): number`
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
	 * `<T>` Converts collection to sorted array.
	 *
	 * Builds array consisting of collection items sorted by comparer.
	 *
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @param {Function} [compare]
	 *
	 * `f(t1: T, t2: T, k1: string, k2: string): number`
	 *
	 * Comparer function. Returns positive value if t1 > t2; nagative value if t1 < t2; 0 if t1 == t2.
	 * Defaults to `JW.cmp(t1, t2)`.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @param {1/-1} [order] Sorting order.
	 * @returns {JW.Array} `<T>` Sorted array.
	 */
	/**
	 * @method getSortingKeys
	 *
	 * `<T>` Returns keys of sorted items.
	 *
	 * Builds array of item keys, sorted by result of `f` call for each item.
	 *
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @param {Function} [f]
	 *
	 * `f(item: T, key: string): number/string`
	 *
	 * Indexer function. Returns `item` by default.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @param {1/-1} [order] Sorting order.
	 * @returns {Array} `<string>` Sorted item keys array.
	 */
	/**
	 * @method $getSortingKeys
	 *
	 * `<T>` Returns keys of sorted items.
	 *
	 * Builds array of item keys, sorted by result of `f` call for each item.
	 *
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @param {Function} [f]
	 *
	 * `f(item: T, key: string): number/string`
	 *
	 * Indexer function. Returns `item` by default.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @param {1/-1} [order] Sorting order.
	 * @returns {JW.Array} `<string>` Sorted item keys array.
	 */
	/**
	 * @method getSortingKeysComparing
	 *
	 * `<T>` Returns keys of sorted items.
	 *
	 * Builds array of item keys, sorted by comparer.
	 *
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @param {Function} [compare]
	 *
	 * `f(t1: T, t2: T, k1: string, k2: string): number`
	 *
	 * Comparer function. Returns positive value if t1 > t2; nagative value if t1 < t2; 0 if t1 == t2.
	 * Defaults to `JW.cmp(t1, t2)`.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @param {1/-1} [order] Sorting order.
	 * @returns {Array} `<string>` Sorted item keys array.
	 */
	/**
	 * @method $getSortingKeysComparing
	 *
	 * `<T>` Returns keys of sorted items.
	 *
	 * Builds array of item keys, sorted by comparer.
	 *
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @param {Function} [compare]
	 *
	 * `f(t1: T, t2: T, k1: string, k2: string): number`
	 *
	 * Comparer function. Returns positive value if t1 > t2; nagative value if t1 < t2; 0 if t1 == t2.
	 * Defaults to `JW.cmp(t1, t2)`.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @param {1/-1} [order] Sorting order.
	 * @returns {JW.Array} `<string>` Sorted item keys array.
	 */
	/**
	 * @method index
	 *
	 * `<T>` Indexes collection.
	 *
	 * Builds new map by rule: key is the result of indexer function call, value is the corresponding item.
	 *
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @param {Function} f
	 *
	 * `f(item: T, key: string): string`
	 *
	 * Indexer function.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {Object} `<T>` Collection index.
	 */
	/**
	 * @method $index
	 *
	 * `<T>` Indexes collection.
	 *
	 * Builds new map by rule: key is the result of indexer function call, value is the corresponding item.
	 *
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @param {Function} f
	 *
	 * `f(item: T, key: string): string`
	 *
	 * Indexer function.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {JW.Map} `<T>` Collection index.
	 */
	/**
	 * @method toArray
	 *
	 * `<T>` Converts collection to array.
	 *
	 * Builds new array consisting of collection items.
	 *
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @returns {Array} `<T>` Items array.
	 */
	/**
	 * @method $toArray
	 *
	 * `<T>` Converts collection to array.
	 *
	 * Builds new array consisting of collection items.
	 *
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @returns {JW.Array} `<T>` Items array.
	 */
	/**
	 * @method toMap
	 *
	 * `<T>` Converts collection to map.
	 *
	 * Builds new map consisting of collection items.
	 *
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @returns {Object} `<T>` Items map.
	 */
	/**
	 * @method $toMap
	 *
	 * `<T>` Converts collection to map.
	 *
	 * Builds new map consisting of collection items.
	 *
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @returns {JW.Map} `<T>` Items map.
	 */
	/**
	 * @method toSet
	 *
	 * `<T>` Converts collection to set.
	 *
	 * Builds new set consisting of collection items.
	 *
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @returns {Object} `<T>` Items set.
	 */
	/**
	 * @method $toSet
	 *
	 * `<T>` Converts collection to set.
	 *
	 * Builds new set consisting of collection items.
	 *
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @returns {JW.Set} `<T>` Items set.
	 */
	/**
	 * @method asArray
	 *
	 * `<T>` Represents collection as array.
	 *
	 * If this collection is array, returns it immediately. Else, executes {@link #static-method-toArray} method.
	 * This method works probably faster than {@link #static-method-toArray}, but please make sure that the returned array
	 * won't be modified externally, because it can cause strange unexpected bugs.
	 *
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @returns {Array} `<T>` Items array.
	 */
	/**
	 * @method $asArray
	 *
	 * `<T>` Represents collection as array.
	 *
	 * If this collection is array, returns it immediately. Else, executes {@link #static-method-toArray} method.
	 * This method works probably faster than {@link #static-method-toArray}, but please make sure that the returned array
	 * won't be modified externally, because it can cause strange unexpected bugs.
	 *
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @returns {JW.Array} `<T>` Items array
	 */
	/**
	 * @method asMap
	 *
	 * `<T>` Represents collection as map.
	 *
	 * If this collection is map, returns it immediately. Else, executes {@link #static-method-toMap} method.
	 * This method works probably faster than {@link #static-method-toMap}, but please make sure that the returned map
	 * won't be modified externally, because it can cause strange unexpected bugs.
	 *
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @returns {Object} `<T>` Items map.
	 */
	/**
	 * @method $asMap
	 *
	 * `<T>` Represents collection as map.
	 *
	 * If this collection is map, returns it immediately. Else, executes {@link #static-method-toMap} method.
	 * This method works probably faster than {@link #static-method-toMap}, but please make sure that the returned map
	 * won't be modified externally, because it can cause strange unexpected bugs.
	 *
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @returns {JW.Map} `<T>` Items map.
	 */
	/**
	 * @method asSet
	 *
	 * `<T>` Represents collection as set.
	 *
	 * If this collection is set, returns it immediately. Else, executes {@link #static-method-toSet}method.
	 * This method works probably faster than {@link #static-method-toSet}, but please make sure that the returned set
	 * won't be modified externally, because it can cause strange unexpected bugs.
	 *
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @returns {Object} `<T>` Items set.
	 */
	/**
	 * @method $asSet
	 *
	 * `<T>` Represents collection as set.
	 *
	 * If this collection is set, returns it immediately. Else, executes {@link #static-method-toSet} method.
	 * This method works probably faster than {@link #static-method-toSet}, but please make sure that the returned set
	 * won't be modified externally, because it can cause strange unexpected bugs.
	 *
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @returns {JW.Set} `<T>` Items set.
	 */
	/**
	 * @method filter
	 *
	 * `<T>` Filters collection by criteria.
	 *
	 * Builds new collection of the same type, consisting of items for which `f` returns !== `false`.
	 *
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @param {Function} f
	 *
	 * `f(item: T, key: string): boolean`
	 *
	 * Criteria.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {Object} `<T>` Filtered collection.
	 */
	/**
	 * @method $filter
	 *
	 * `<T>` Filters collection by criteria.
	 *
	 * Builds new collection of the same type, consisting of items for which `f` returns !== `false`.
	 *
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @param {Function} f
	 *
	 * `f(item: T, key: string): boolean`
	 *
	 * Criteria.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {JW.Map} `<T>` Filtered collection.
	 */
	/**
	 * @method count
	 *
	 * `<T>` Counts the items matching criteria.
	 *
	 * Returns the number of items for which `f` returns !== `false`.
	 *
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @param {Function} f
	 *
	 * `f(item: T, key: string): boolean`
	 *
	 * Criteria.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {number} Number of items.
	 */
	/**
	 * @method map
	 *
	 * `<T, U>` Maps collection items.
	 *
	 * Builds new collection of the same type, consisting of results of `f` call for each collection item.
	 *
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @param {Function} f
	 *
	 * `f(item: T, key: string): U`
	 *
	 * Mapping function.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {Object} `<U>` Mapped collection.
	 */
	/**
	 * @method $map
	 *
	 * `<T, U>` Maps collection items.
	 *
	 * Builds new collection of the same type, consisting of results of `f` call for each collection item.
	 *
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @param {Function} f
	 *
	 * `f(item: T, key: string): U`
	 *
	 * Mapping function.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {JW.Map} `<U>` Mapped collection.
	 */
	/**
	 * @method set
	 * `<T>` Replaces item with specified key. If map doesn't contain such key, it will be added.
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @param {T} item Item.
	 * @param {string} key Key.
	 * @returns {T} The replaced item.
	 */
	/**
	 * @method trySet
	 * `<T>` Replaces item with specified key. If map doesn't contain such key, it will be added.
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @param {T} item Item.
	 * @param {string} key Key.
	 * @returns {JW.Proxy} `<T>` Proxy of the replaced item. If not modified - `undefined`.
	 */
	/**
	 * @method setAll
	 * `<T>` Adds or replaces a bunch of items. As of jWidget 1.3, doesn't return anything for sake of performance.
	 * For old behaviour, use method {@link #static-method-setAllVerbose}.
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @param {Object} items Items.
	 */
	/**
	 * @method setAllVerbose
	 * `<T>` Adds or replaces a bunch of items. Returns verbose result set.
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @param {Object} items Items.
	 * @returns {JW.AbstractMap.SpliceResult} `<T>` Result of {@link #static-method-splice} method.
	 */
	/**
	 * @method trySetAll
	 * `<T>` Adds or replaces a bunch of items.
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @param {Object} items Items.
	 * @returns {JW.AbstractMap.SpliceResult} `<T>` Result of {@link #static-method-splice} method. If not modified - `undefined`.
	 */
	/**
	 * @method setKey
	 * `<T>` Changes item key in map. If collection doesn't contain `oldKey` or contains `newKey`, it will cause an error.
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @param {string} oldKey Old key of item.
	 * @param {string} newKey New key of item.
	 * @returns {T} Item.
	 */
	/**
	 * @method trySetKey
	 * `<T>` Changes item key in map. If collection doesn't contain `oldKey` or contains `newKey`, it will cause an error.
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @param {string} oldKey Old key of item.
	 * @param {string} newKey New key of item.
	 * @returns {T} Item. If not modified - `undefined`.
	 */
	/**
	 * @method remove
	 * `<T>` Removes item with specified key if it exists in map.
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @param {K} key Key.
	 * @returns {T} Old collection item or `undefined`.
	 */
	/**
	 * @method tryRemove
	 * `<T>` Removes item with specified key if it exists in map.
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @param {K} key Key.
	 * @returns {T} Old collection item. If not modified - `undefined`.
	 */
	/**
	 * @method removeAll
	 * `<T>` Removes a bunch of items from map. As of jWidget 1.3, doesn't return anything for sake of performance.
	 * For old behaviour, use method {@link #removeAllVerbose}.
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @param {Array} keys `<string>` Item keys.
	 */
	/**
	 * @method removeAllVerbose
	 * `<T>` Removes a bunch of items from map. Returns verbose result set.
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @param {Array} keys `<string>` Item keys.
	 * @returns {Object} `<T>` The removed items.
	 */
	/**
	 * @method $removeAllVerbose
	 * `<T>` Removes a bunch of items from map. Returns verbose result set.
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @param {Array} keys `<string>` Item keys.
	 * @returns {JW.Map} `<T>` The removed items.
	 */
	/**
	 * @method tryRemoveAll
	 * `<T>` Removes a bunch of items from map.
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @param {Array} keys `<string>` Item keys.
	 * @returns {Object} `<T>` The removed items. If not modified - `undefined`.
	 */
	/**
	 * @method splice
	 * `<T>` Removes and adds bunches of items in map. Universal optimized granular operation of removal/insertion.
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @param {Array} removedKeys `<string>` Keys of items to remove.
	 * @param {Object} updatedItems `<T>` Items to add/replace.
	 * @returns {JW.AbstractMap.SpliceResult} `<T>` Result.
	 */
	/**
	 * @method trySplice
	 * `<T>` Removes and adds bunches of items in map. Universal optimized granular operation of removal/insertion.
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @param {Array} removedKeys `<string>` Keys of items to remove.
	 * @param {Object} updatedItems `<T>` Items to add/replace.
	 * @returns {JW.AbstractMap.SpliceResult} `<T>` Result. If not modified - `undefined`.
	 */
	/**
	 * @method reindex
	 * `<T>` Changes item keys in map.
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @param {Object} keyMap `<string>` Key map. Item with key `k` will gain key `keyMap[k]`.
	 * It is neccessary to pass only changed keys, but unchanged keys or unexisting keys are acceptable as well.
	 * @returns {Object} `<T>` Map of changed keys.
	 */
	/**
	 * @method tryReindex
	 * `<T>` Changes item keys in map.
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @param {Object} keyMap `<string>` Key map. Item with key `k` will gain key `keyMap[k]`.
	 * It is neccessary to pass only changed keys, but unchanged keys or unexisting keys are acceptable as well.
	 * @returns {Object} `<T>` Map of changed keys. If not modified - `undefined`.
	 */
	/**
	 * @method detectSplice
	 * `<T>` Detects {@link #static-method-splice} method arguments to adjust map contents to `newItems`.
	 * Determines which item bunches should be removed and which ones should be inserted/replaced, and their keys.
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @param {Object} newItems `<T>` New map contents.
	 * @returns {JW.AbstractMap.SpliceParams}
	 * `<T>` {@link #static-method-splice} method arguments. If no method call required - `undefined`.
	 */
	/**
	 * @method detectReindex
	 * `<T>` Detects {@link #static-method-reindex} method arguments to adjust map contents to `newItems`.
	 * Determines which keys should be assigned to all items.
	 * If `newItems` contents differ from `this` contents, the map will be broken.
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @param {Object} newItems `<T>` New map contents.
	 * @param {Function} [getKey]
	 * Function which returns unique key of an item in this collection.
	 * Defaults to JW.iid.
	 * If collection consists of instances of JW.Class, then it's all right.
	 * @param {Object} [scope] `getKey` call scope. Defaults to `this`.
	 * @returns {Object}
	 * `<string>` `keyMap` argument of {@link #static-method-reindex} method.
	 * If no method call required - `undefined`.
	 */
	/**
	 * @method performSplice
	 * `<T>` Adjusts map contents to `newItems` using {@link #static-method-detectSplice} and {@link #static-method-splice} methods.
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @param {Object} newItems `<T>` New map contents.
	 * @returns {void}
	 */
	/**
	 * @method performReindex
	 * `<T>` Adjusts map contents to `newItems` using {@link #static-method-detectReindex} and {@link #static-method-reindex} methods.
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @param {Object} newItems `<T>` New map contents.
	 * @param {Function} [getKey]
	 * Function which returns unique key of an item in this collection.
	 * Defaults to JW.iid.
	 * If collection consists of instances of JW.Class, then it's all right.
	 * @param {Object} [scope] `getKey` call scope. Defaults to `this`.
	 * @returns {void}
	 */
	/**
	 * @method equal
	 * `<T>` Checks two maps for equality (===), item by item.
	 * @static
	 * @param {Object} map1 `<T>` Map.
	 * @param {Object} map2 `<T>` Another map.
	 * @returns {boolean} Maps are equal.
	 */
	/**
	 * @method getInverted
	 * Returns an inverted map. Keys are converted to values, and values are
	 * converted to keys. `this` must be `JW.AbstractMap<string>`.
	 * @static
	 * @returns {JW.AbstractMap} `<string>` The inverted map.
	 */
});
