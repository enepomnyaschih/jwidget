/*
	JW array extension.

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
 * `<T> extends JW.AbstractArray<T>`
 *
 * See structurized list of methods in JW.AbstractArray.
 * Static methods duplicate API of JW.AbstractArray, but take native Array as first argument.
 *
 * @extends JW.AbstractArray
 *
 * @constructor
 * @param {Array} [items] `<T>` Initial contents. By default, created collection is empty.
 * @param {boolean} [adapter] Create array as adapter of `items`. Defaults to false, so `items` is copied.
 */
JW.Array = function(items, adapter) {
	JW.Array._super.call(this, items, adapter);
};

JW.extend(JW.Array, JW.AbstractArray, {
	/**
	 * `<U>` Creates empty collection of the same type.
	 * @returns {JW.Array} `<U>` Collection.
	 */
	createEmpty: function() {
		return new JW.Array();
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
	 * @param {Array} array `<T>` Array.
	 * @returns {number} Count of items in collection.
	 */
	/**
	 * @method isEmpty
	 * `<T>` Checks collection for emptiness.
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @returns {boolean} Collection doesn't contain any items.
	 */
	/**
	 * @method getFirst
	 * `<T>` Returns first item in collection. If collection is empty, returns `undefined`.
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @returns {T} Item.
	 */
	/**
	 * @method getFirstKey
	 * `<T>` Returns index of first collection item. If collection is empty, returns `undefined`.
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @returns {number} Index.
	 */
	/**
	 * @method getLast
	 * `<T>` Returns the last collection item. If collection is empty, returns `undefined`.
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @returns {T} Item.
	 */
	/**
	 * @method getLastKey
	 * `<T>` Returns index of last collection item. If collection is empty, returns `undefined`.
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @returns {number} Index.
	 */
	/**
	 * @method get
	 * `<T>` Returns item by index. If item with such index doesn't exist, returns `undefined`.
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @param {number} index Index.
	 * @returns {T} Item.
	 */
	/**
	 * @method containsKey
	 * `<T>` Checks existance of item with specified index in collection.
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @param {number} index Index.
	 * @returns {boolean} Collection contains item with specified index.
	 */
	/**
	 * @method containsItem
	 * `<T>` Checks item existance in collection.
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @param {T} item Item.
	 * @returns {boolean} Collection contains specified item.
	 */
	/**
	 * @method keyOf
	 * `<T>` Returns index of item in collection. If such item doesn't exist, returns `undefined`.
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @param {T} item Item.
	 * @returns {number} Item index.
	 */
	/**
	 * @method getKeys
	 * `<T>` Returns array of indexes of all collection items, i.e. array `[0, 1, ... , length - 1]`.
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @returns {Array} `<number>` Indexes array.
	 */
	/**
	 * @method $getKeys
	 * `<T>` Returns array of indexes of all collection items, i.e. array `[0, 1, ... , length - 1]`.
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @returns {JW.Array} `<number>` Indexes array.
	 */
	/**
	 * @method removeItem
	 * `<T>` Removes first occurency of an item in collection.
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @param {T} item Item.
	 * @returns {void}
	 */
	/**
	 * @method removeItems
	 * `<T extends JW.Class>` Removes all occurencies of items in collection.
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @param {Array} items `<T>` Items.
	 * @returns {void}
	 */
	/**
	 * @method tryClear
	 * `<T>` Clears collection.
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @returns {Array} `<T>` Old collection contents. If not modified - `undefined`.
	 */
	/**
	 * @method clear
	 * `<T>` Clears collection.
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @returns {Array} `<T>` Old collection contents.
	 */
	/**
	 * @method $clear
	 * `<T>` Clears collection.
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @returns {JW.Array} `<T>` Old collection contents.
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
	 * @param {Array} array `<T>` Array.
	 * @param {Function} f
	 *
	 * `f(item: T, index: number): boolean`
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
	 * @param {Array} array `<T>` Array.
	 * @param {Function} f
	 *
	 * `f(item: T, index: number): boolean`
	 *
	 * Criteria.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {boolean} Result.
	 */
	/**
	 * @method each
	 * `<T>` Iterates collection items. Calls specified function for all items.
	 *
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @param {Function} f
	 *
	 * `f(item: T, index: number): void`
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
	 * Returns index of first item for which `f` returns !== `false`.
	 *
	 * Algorithms iterates items sequentially, and stops after first item matching the criteria.
	 *
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @param {Function} f
	 *
	 * `f(item: T, index: number): boolean`
	 *
	 * Criteria.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {number} Found item index or `undefined`.
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
	 * @param {Array} array `<T>` Array.
	 * @param {Function} f
	 *
	 * `f(item: T, index: number): boolean`
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
	 * @param {Array} array `<T>` Array.
	 * @param {Function} [f]
	 *
	 * `f(item: T, index: number): number/string`
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
	 * @param {Array} array `<T>` Array.
	 * @param {Function} [f]
	 *
	 * `f(item: T, index: number): number/string`
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
	 * @param {Array} array `<T>` Array.
	 * @param {Function} [compare]
	 *
	 * `f(t1: T, t2: T, i1: number, i2: number): number`
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
	 * @param {Array} array `<T>` Array.
	 * @param {Function} [compare]
	 *
	 * `f(t1: T, t2: T, i1: number, i2: number): number`
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
	 * `<T>` Returns indexes of sorted items.
	 *
	 * Builds array of item indexes, sorted by result of `f` call for each item.
	 *
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @param {Function} [f]
	 *
	 * `f(item: T, index: number): number/string`
	 *
	 * Indexer function. Returns `item` by default.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @param {1/-1} [order] Sorting order.
	 * @returns {Array} `<number>` Sorted item indexes array.
	 */
	/**
	 * @method $getSortingKeys
	 *
	 * `<T>` Returns indexes of sorted items.
	 *
	 * Builds array of item indexes, sorted by result of `f` call for each item.
	 *
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @param {Function} [f]
	 *
	 * `f(item: T, index: number): number/string`
	 *
	 * Indexer function. Returns `item` by default.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @param {1/-1} [order] Sorting order.
	 * @returns {JW.Array} `<number>` Sorted item indexes array.
	 */
	/**
	 * @method getSortingKeysComparing
	 *
	 * `<T>` Returns indexes of sorted items.
	 *
	 * Builds array of item indexes, sorted by comparer.
	 *
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @param {Function} [compare]
	 *
	 * `f(t1: T, t2: T, i1: number, i2: number): number`
	 *
	 * Comparer function. Returns positive value if t1 > t2; nagative value if t1 < t2; 0 if t1 == t2.
	 * Defaults to `JW.cmp(t1, t2)`.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @param {1/-1} [order] Sorting order.
	 * @returns {Array} `<number>` Sorted item indexes array.
	 */
	/**
	 * @method $getSortingKeysComparing
	 *
	 * `<T>` Returns indexes of sorted items.
	 *
	 * Builds array of item indexes, sorted by comparer.
	 *
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @param {Function} [compare]
	 *
	 * `f(t1: T, t2: T, i1: number, i2: number): number`
	 *
	 * Comparer function. Returns positive value if t1 > t2; nagative value if t1 < t2; 0 if t1 == t2.
	 * Defaults to `JW.cmp(t1, t2)`.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @param {1/-1} [order] Sorting order.
	 * @returns {JW.Array} `<number>` Sorted item indexes array.
	 */
	/**
	 * @method index
	 *
	 * `<T>` Indexes collection.
	 *
	 * Builds new map by rule: key is the result of indexer function call, value is the corresponding item.
	 *
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @param {Function} f
	 *
	 * `f(item: T, index: number): string`
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
	 * @param {Array} array `<T>` Array.
	 * @param {Function} f
	 *
	 * `f(item: T, index: number): string`
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
	 * @param {Array} array `<T>` Array.
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
	 * @param {Array} array `<T>` Array.
	 * @returns {JW.Array} `<T>` Items array.
	 */
	/**
	 * @method toMap
	 *
	 * Converts collection to map.
	 *
	 * Builds new map consisting of collection items.
	 *
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @returns {Object} `<T>` Items map.
	 */
	/**
	 * @method $toMap
	 *
	 * Converts collection to map.
	 *
	 * Builds new map consisting of collection items.
	 *
	 * @static
	 * @param {Array} array `<T>` Array.
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
	 * @param {Array} array `<T>` Array.
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
	 * @param {Array} array `<T>` Array.
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
	 * @param {Array} array `<T>` Array.
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
	 * @param {Array} array `<T>` Array.
	 * @returns {JW.Array} `<T>` Items array.
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
	 * @param {Array} array `<T>` Array.
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
	 * @param {Array} array `<T>` Array.
	 * @returns {JW.Map} `<T>` Items map.
	 */
	/**
	 * @method asSet
	 *
	 * `<T>` Represents collection as set.
	 *
	 * If this collection is set, returns it immediately. Else, executes {@link #static-method-toSet} method.
	 * This method works probably faster than {@link #static-method-toSet}, but please make sure that the returned set
	 * won't be modified externally, because it can cause strange unexpected bugs.
	 *
	 * @static
	 * @param {Array} array `<T>` Array.
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
	 * @param {Array} array `<T>` Array.
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
	 * @param {Array} array `<T>` Array.
	 * @param {Function} f
	 *
	 * `f(item: T, index: number): boolean`
	 *
	 * Criteria.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {Array} `<T>` Filtered collection.
	 */
	/**
	 * @method $filter
	 *
	 * `<T>` Filters collection by criteria.
	 *
	 * Builds new collection of the same type, consisting of items for which `f` returns !== `false`.
	 *
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @param {Function} f
	 *
	 * `f(item: T, index: number): boolean`
	 *
	 * Criteria.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {JW.Array} `<T>` Filtered collection.
	 */
	/**
	 * @method count
	 *
	 * `<T>` Counts the items matching criteria.
	 *
	 * Returns the number of items for which `f` returns !== `false`.
	 *
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @param {Function} f
	 *
	 * `f(item: T, index: number): boolean`
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
	 * @param {Array} array `<T>` Array.
	 * @param {Function} f
	 *
	 * `f(item: T, index: number): U`
	 *
	 * Mapping function.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {Array} `<U>` Mapped collection.
	 */
	/**
	 * @method $map
	 *
	 * `<T, U>` Maps collection items.
	 *
	 * Builds new collection of the same type, consisting of results of `f` call for each collection item.
	 *
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @param {Function} f
	 *
	 * `f(item: T, index: number): U`
	 *
	 * Mapping function.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {JW.Array} `<U>` Mapped collection.
	 */
	/**
	 * @method merge
	 * For `Array<Array>` only.
	 * Builds array consisting of subarray items in the same order.
	 * Original array is not modified.
	 * @static
	 * @param {Array} array Array.
	 * @returns {Array} Merged array.
	 */
	/**
	 * @method $merge
	 * For `Array<Array>` only.
	 * Builds array consisting of subarray items in the same order.
	 * Original array is not modified.
	 * @static
	 * @param {Array} array Array.
	 * @returns {JW.Array} Merged array.
	 */
	/**
	 * @method reverse
	 * `<T>` Reverses item order in array. Modifies the array itself.
	 * @static
	 * @param {Array} array `<T>` array Array.
	 */
	/**
	 * @method toReversed
	 * `<T>` Builds a new array containing items of original array in reversed order.
	 * Original array is not modified.
	 * @static
	 * @param {Array} array `<T>` array Array.
	 * @returns {Array} `<T>` Reversed array.
	 */
	/**
	 * @method $toReversed
	 * `<T>` Builds a new array containing items of original array in reversed order.
	 * Original array is not modified.
	 * @static
	 * @param {Array} array `<T>` array Array.
	 * @returns {JW.Array} `<T>` Reversed array.
	 */
	/**
	 * @method add
	 * `<T>` Inserts an item to array.
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @param {T} item Item.
	 * @param {number} [index] Index of an item before which to insert new one. By default, appends the item.
	 * @returns {void}
	 */
	/**
	 * @method tryAdd
	 * `<T>` Inserts an item to array.
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @param {T} item Item.
	 * @param {number} [index] Index of an item before which to insert new one. By default, appends the item.
	 * @returns {boolean} true.
	 */
	/**
	 * @method addAll
	 * `<T>` Inserts item range to array.
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @param {Array} items `<T>` Items.
	 * @param {number} [index] Index of an item before which to insert new ones. By default, appends the items.
	 * @returns {void}
	 */
	/**
	 * @method tryAddAll
	 * `<T>` Inserts item range to array.
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @param {Array} items `<T>` Items.
	 * @param {number} [index] Index of an item before which to insert new ones. By default, appends the items.
	 * @returns {boolean} true. If not modified - `undefined`.
	 */
	/**
	 * @method set
	 * `<T>` Replaces item with specified index. If array doesn't contain such index, it will break the application.
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @param {T} item Item.
	 * @param {number} index Index.
	 * @returns {T} The replaced item.
	 */
	/**
	 * @method trySet
	 * `<T>` Replaces item with specified index. If array doesn't contain such index, it will break the application.
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @param {T} item Item.
	 * @param {number} index Index.
	 * @returns {JW.Proxy} `<T>` Proxy of the replaced item. If not modified - `undefined`.
	 */
	/**
	 * @method remove
	 * `<T>` Removes item with specified index. If array doesn't contain such index, it will break the application.
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @param {number} index Index.
	 * @returns {T} The removed item.
	 */
	/**
	 * @method tryRemove
	 * `<T>` Removes item with specified index. If array doesn't contain such index, it will break the application.
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @param {number} index Index.
	 * @returns {T} The removed item. If not modified - `undefined`.
	 */
	/**
	 * @method removeAll
	 * `<T>` Removes item range from array.
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @param {number} index Index of first item to remove.
	 * @param {number} count Count of items to remove.
	 * @returns {Array} `<T>` The removed items.
	 */
	/**
	 * @method $removeAll
	 * `<T>` Removes item range from array.
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @param {number} index Index of first item to remove.
	 * @param {number} count Count of items to remove.
	 * @returns {JW.Array} `<T>` The removed items.
	 */
	/**
	 * @method tryRemoveAll
	 * `<T>` Removes item range from array.
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @param {number} index Index of first item to remove.
	 * @param {number} count Count of items to remove.
	 * @returns {Array} `<T>` The removed items. If not modified - `undefined`.
	 */
	/**
	 * @method move
	 * `<T>` Moves an item inside array.
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @param {number} fromIndex Item index to move.
	 * @param {number} toIndex Index to move to.
	 * @returns {T} The moved item.
	 */
	/**
	 * @method tryMove
	 * `<T>` Moves an item inside array.
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @param {number} fromIndex Item index to move.
	 * @param {number} toIndex Index to move to.
	 * @returns {T} The moved item. If not modified - `undefined`.
	 */
	/**
	 * @method splice
	 * `<T>` Removes and inserts item ranges. Universal optimized granular operation of removal/insertion.
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @param {Array} removeParamsList `<JW.AbstractArray.IndexCount>`
	 * Array of segments to remove sorted by index asc. Segments are removed in backward order.
	 * @param {Array} addParamsList `<JW.AbstractArray.IndexItems<T>>`
	 * Array of segments to insert sorted by index asc. Segments are inserted in forward order.
	 * @returns {JW.AbstractArray.SpliceResult} `<T>` Result.
	 */
	/**
	 * @method trySplice
	 * `<T>` Removes and inserts item ranges. Universal optimized granular operation of removal/insertion.
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @param {Array} removeParamsList `<JW.AbstractArray.IndexCount>`
	 * Array of segments to remove sorted by index asc. Segments are removed in backward order.
	 * @param {Array} addParamsList `<JW.AbstractArray.IndexItems<T>>`
	 * Array of segments to insert sorted by index asc. Segments are inserted in forward order.
	 * @returns {JW.AbstractArray.SpliceResult} `<T>` Result. If not modified - `undefined`.
	 */
	/**
	 * @method reorder
	 * `<T>` Reorders array items.
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @param {Array} indexArray `<number>` Index array. Item with index `i` will be moved to index `indexArray[i]`.
	 * Must contain all indexes from 0 to (length - 1).
	 * @returns {void}
	 */
	/**
	 * @method tryReorder
	 * `<T>` Reorders array items.
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @param {Array} indexArray `<number>` Index array. Item with index `i` will be moved to index `indexArray[i]`.
	 * Must contain all indexes from 0 to (length - 1).
	 * @returns {Array} `<T>` Old array contents. If not modified - undefined.
	 */
	/**
	 * @method detectSplice
	 * `<T>` Detects {@link #static-method-splice} method arguments to adjust array contents to `newItems`.
	 * Determines which item ranges should be removed and which ones should be inserted.
	 * All items must have unique `getKey` function result.
	 * If items don't have unique key, probably {@link #static-method-detectFilter} method will help.
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @param {Array} newItems `<T>` New array contents.
	 * @param {Function} [getKey]
	 * Function which returns unique key of an item in this collection.
	 * Defaults to JW.iid.
	 * If collection consists of instances of JW.Class, then it's all right.
	 * @param {Object} [scope] `getKey` call scope. Defaults to `this`.
	 * @returns {JW.AbstractArray.SpliceParams}
	 * `<T>` {@link #static-method-splice} method arguments. If no method call required - `undefined`.
	 */
	/**
	 * @method detectFilter
	 * Detects `removeParamsList` arguments of {@link #static-method-splice} to adjust array contents to `newItems`.
	 * Determines which item ranges should be removed.
	 * Doesn't assume items insertion - try {@link #static-method-detectSplice} if that's the case.
	 * In advantage to {@link #static-method-detectSplice}, doesn't require item uniquiness.
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @param {Array} newItems `<T>` New array contents.
	 * @returns {Array}
	 * `<JW.AbstractArray.IndexCount>` `removeParamsList` argument of {@link #static-method-splice} method.
	 * If no method call required - `undefined`.
	 */
	/**
	 * @method detectReorder
	 * `<T>` Detects {@link #static-method-reorder} method arguments to adjust array contents to `newItems`.
	 * Determines where to move all items.
	 * If `newItems` contents differ from `this` contents, the array will be broken.
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @param {Array} newItems `<T>` New array contents.
	 * @param {Function} [getKey]
	 * Function which returns unique key of an item in this collection.
	 * Defaults to JW.iid.
	 * If collection consists of instances of JW.Class, then it's all right.
	 * @param {Object} [scope] `getKey` call scope. Defaults to `this`.
	 * @returns {Array}
	 * `<number>` `indexArray` argument of {@link #static-method-reorder} method.
	 * If no method call required - `undefined`.
	 */
	/**
	 * @method detectSort
	 * `<T>` Detects {@link #static-method-reorder} method arguments to sort array contents by result of `f` call for each item.
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @param {Function} [f]
	 *
	 * `f(item: T, index: number): number/string`
	 *
	 * Indexer function. Returns `item` by default.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @param {1/-1} [order] Sorting order.
	 * @returns {Array}
	 * `<number>` `indexArray` argument of {@link #static-method-reorder} method.
	 * If no method call required - `undefined`.
	 */
	/**
	 * @method detectSortComparing
	 * `<T>` Detects {@link #static-method-reorder} method arguments to sort array contents by comparer.
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @param {Function} [compare]
	 *
	 * `f(t1: T, t2: T, i1: number, i2: number): number`
	 *
	 * Comparer function. Returns positive value if t1 > t2; nagative value if t1 < t2; 0 if t1 == t2.
	 * Defaults to `JW.cmp(t1, t2)`.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @param {1/-1} [order] Sorting order.
	 * @returns {Array}
	 * `<number>` `indexArray` argument of {@link #static-method-reorder} method.
	 * If no method call required - `undefined`.
	 */
	/**
	 * @method performSplice
	 * `<T>` Adjusts array contents to `newItems` using {@link #static-method-detectSplice} and {@link #static-method-splice} methods.
	 * All items must have unique `getKey` function result.
	 * If items don't have unique key, probably {@link #static-method-detectFilter} method will help.
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @param {Array} newItems `<T>` New array contents.
	 * @param {Function} [getKey]
	 * Function which returns unique key of an item in this collection.
	 * Defaults to JW.iid.
	 * If collection consists of instances of JW.Class, then it's all right.
	 * @param {Object} [scope] `getKey` call scope. Defaults to `this`.
	 * @returns {void}
	 */
	/**
	 * @method performFilter
	 * `<T>` Adjusts array contents to `newItems` using {@link #static-method-detectFilter} and {@link #static-method-splice} methods.
	 * Only removes items. Doesn't assume items insertion - try {@link #static-method-detectSplice} if that's the case.
	 * In advantage to {@link #static-method-detectSplice}, doesn't require item uniquiness.
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @param {Array} newItems `<T>` New array contents.
	 * @returns {void}
	 */
	/**
	 * @method performReorder
	 * `<T>` Adjusts array contents to `newItems` using {@link #static-method-detectReorder} and {@link #static-method-reorder} methods.
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @param {Array} newItems `<T>` New array contents.
	 * @param {Function} [getKey]
	 * Function which returns unique key of an item in this collection.
	 * Defaults to JW.iid.
	 * If collection consists of instances of JW.Class, then it's all right.
	 * @param {Object} [scope] `getKey` call scope. Defaults to `this`.
	 * @returns {void}
	 */
	/**
	 * @method sort
	 * `<T>` Sorts array by result of `f` function call for each item.
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @param {Function} [f]
	 *
	 * `f(item: T, index: number): number/string`
	 *
	 * Indexer function. Returns `item` by default.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @param {1/-1} [order] Sorting order.
	 * @returns {void}
	 */
	/**
	 * @method sortComparing
	 * `<T>` Sorts array by comparer.
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @param {Function} [compare]
	 *
	 * `f(t1: T, t2: T, i1: number, i2: number): number`
	 *
	 * Comparer function. Returns positive value if t1 > t2; nagative value if t1 < t2; 0 if t1 == t2.
	 * Defaults to `JW.cmp(t1, t2)`.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @param {1/-1} [order] Sorting order.
	 * @returns {void}
	 */
	/**
	 * @method equal
	 * `<T>` Checks 2 arrays for equality (===), item by item.
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @param {Array} arr `<T>` Another array.
	 * @returns {boolean} Arrays are equal.
	 */
	/**
	 * @method collapse
	 * `<T>` Collapses multi-dimentional array.
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @param {number} depth Dimentions to collapse.
	 * @returns {Array} Collapsed array.
	 */
	/**
	 * @method indexOf
	 * `<T>` Returns item index in this collection. If item doesn't exist, returns -1.
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @param {T} item Item.
	 * @returns {number} Item index or -1.
	 */
	/**
	 * @method backEvery
	 *
	 * `<T>` Checks all items by criteria in backward order.
	 *
	 * Returns true if function `f` returns !== `false` for all collection items.
	 *
	 * Algorithms iterates items sequentially, and stops after first item not matching the criteria.
	 *
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @param {Function} f
	 *
	 * `f(item: T, index: number): boolean`
	 *
	 * Criteria.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {boolean} Result.
	 */
	/**
	 * @method pop
	 * `<T>` Removes last array item. Does nothing if array is empty.
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @returns {T} The removed item or `undefined`.
	 */
	/**
	 * @method binarySearch
	 * `<T>` Determines index of first item which is more (or less if `order` == -1) than specified value by `compare` function,
	 * using binary search. Array must be sorted by `compare` function.
	 * Can be used for item insertion easily.
	 * If you want to use this method for item removal, you must look at previous item and compare it to `value` first.
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @param {T} value Value.
	 * @param {Function} [compare]
	 *
	 * `f(t1: T, t2: T): number`
	 *
	 * Comparer function. Returns positive value if t1 > t2; negative value if t1 < t2; 0 if t1 == t2.
	 * Defaults to `JW.cmp(t1, t2)`.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @param {1/-1} [order] Sorting order.
	 * @returns {number} Item index.
	 */
});
