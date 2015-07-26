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
 * `<T extends JW.Class> extends JW.AbstractSet<T>`
 *
 * See structurized list of methods in JW.AbstractSet.
 * Static methods duplicate API of JW.AbstractSet, but take native Object as first argument.
 *
 * @extends JW.AbstractSet
 *
 * @constructor
 * @param {Array} [items] `<T>` Initial contents. By default, created collection is empty.
 * @param {boolean} [adapter] Create set as adapter of `items` (`items` should be Object for this, not Array).
 * Defaults to false, so `items` is copied.
 */
JW.Set = function(json, adapter) {
	JW.Set._super.call(this, json, adapter);
};

JW.extend(JW.Set, JW.AbstractSet, {
	/**
	 * `<U>` Creates empty collection of the same type.
	 * @returns {JW.Set} `<U>` Collection.
	 */
	createEmpty: function() {
		return new JW.Set();
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
	 * `<T extends JW.Class>` Returns count of items in collection.
	 * @static
	 * @param {Object} set `<T>` Set.
	 * @returns {number} Count of items in collection.
	 */
	/**
	 * @method isEmpty
	 * `<T extends JW.Class>` Checks collection for emptiness.
	 * @static
	 * @param {Object} set `<T>` Set.
	 * @returns {boolean} Collection doesn't contain any items.
	 */
	/**
	 * @method getFirst
	 * `<T extends JW.Class>` Returns first item in collection. If collection is empty, returns `undefined`.
	 * @static
	 * @param {Object} set `<T>` Set.
	 * @returns {T} Item.
	 */
	/**
	 * @method containsItem
	 * `<T extends JW.Class>` Checks item existance in collection.
	 * @static
	 * @param {Object} set `<T>` Set.
	 * @param {T} item Item.
	 * @returns {boolean} Collection contains specified item.
	 */
	/**
	 * @method contains
	 * `<T extends JW.Class>` Checks item existance in collection. Shortcut for {@link #static-method-containsItem}.
	 * @static
	 * @param {Object} set `<T>` Set.
	 * @param {T} item Item.
	 * @returns {boolean} Collection contains specified item.
	 */
	/**
	 * @method removeItem
	 * `<T extends JW.Class>` Removes first occurency of an item in collection.
	 * @static
	 * @param {Object} set `<T>` Set.
	 * @param {T} item Item.
	 * @returns {void}
	 */
	/**
	 * @method removeItems
	 * `<T extends JW.Class>` Removes all occurencies of items in collection.
	 * @static
	 * @param {Object} set `<T>` Set.
	 * @param {Array} items `<T>` Items.
	 * @returns {void}
	 */
	/**
	 * @method tryClear
	 * `<T extends JW.Class>` Clears collection.
	 * @static
	 * @param {Object} set `<T>` Set.
	 * @returns {Array} `<T>` Old collection contents. If not modified - `undefined`.
	 */
	/**
	 * @method clear
	 * `<T extends JW.Class>` Clears collection.
	 * @static
	 * @param {Object} set `<T>` Set.
	 * @returns {Array} `<T>` Old collection contents.
	 */
	/**
	 * @method $clear
	 * `<T extends JW.Class>` Clears collection.
	 * @static
	 * @param {Object} set `<T>` Set.
	 * @returns {JW.Array} `<T>` Old collection contents.
	 */
	/**
	 * @method every
	 *
	 * `<T extends JW.Class>` Checks all items by criteria.
	 *
	 * Returns true if function `f` returns !== `false` for all collection items.
	 *
	 * Algorithms iterates items sequentially, and stops after first item not matching the criteria.
	 *
	 * @static
	 * @param {Object} set `<T>` Set.
	 * @param {Function} f
	 *
	 * `f(item: T): boolean`
	 *
	 * Criteria.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {boolean} Result.
	 */
	/**
	 * @method some
	 *
	 * `<T extends JW.Class>` Checks each item by criteria.
	 *
	 * Returns true if function `f` returns !== `false` for some collection item.
	 *
	 * Algorithms iterates items sequentially, and stops after first item matching the criteria.
	 *
	 * @static
	 * @param {Object} set `<T>` Set.
	 * @param {Function} f
	 *
	 * `f(item: T): boolean`
	 *
	 * Criteria.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {boolean} Result.
	 */
	/**
	 * @method each
	 * `<T extends JW.Class>` Iterates collection items. Calls specified function for all items.
	 *
	 * @static
	 * @param {Object} set `<T>` Set.
	 * @param {Function} f
	 *
	 * `f(item: T): void`
	 *
	 * Function.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {void}
	 */
	/**
	 * @method search
	 *
	 * `<T extends JW.Class>` Finds item by criteria.
	 *
	 * Returns first item for which `f` returns !== `false`.
	 *
	 * Algorithms iterates items sequentially, and stops after first item matching the criteria.
	 *
	 * @static
	 * @param {Object} set `<T>` Set.
	 * @param {Function} f
	 *
	 * `f(item: T): boolean`
	 *
	 * Criteria.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {T} Found item or `undefined`.
	 */
	/**
	 * @method toSorted
	 *
	 * `<T extends JW.Class>` Converts collection to sorted array.
	 *
	 * Builds array consisting of collection items sorted by result of `f` call for each item.
	 *
	 * @static
	 * @param {Object} set `<T>` Set.
	 * @param {Function} [f]
	 *
	 * `f(item: T): number/string`
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
	 * `<T extends JW.Class>` Converts collection to sorted array.
	 *
	 * Builds array consisting of collection items sorted by result of `f` call for each item.
	 *
	 * @static
	 * @param {Object} set `<T>` Set.
	 * @param {Function} [f]
	 *
	 * `f(item: T): number/string`
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
	 * `<T extends JW.Class>` Converts collection to sorted array.
	 *
	 * Builds array consisting of collection items sorted by comparer.
	 *
	 * @static
	 * @param {Object} set `<T>` Set.
	 * @param {Function} [compare]
	 *
	 * `f(t1: T, t2: T): number`
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
	 * `<T extends JW.Class>` Converts collection to sorted array.
	 *
	 * Builds array consisting of collection items sorted by comparer.
	 *
	 * @static
	 * @param {Object} set `<T>` Set.
	 * @param {Function} [compare]
	 *
	 * `f(t1: T, t2: T): number`
	 *
	 * Comparer function. Returns positive value if t1 > t2; nagative value if t1 < t2; 0 if t1 == t2.
	 * Defaults to `JW.cmp(t1, t2)`.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @param {1/-1} [order] Sorting order.
	 * @returns {JW.Array} `<T>` Sorted array.
	 */
	/**
	 * @method index
	 *
	 * `<T extends JW.Class>` Indexes collection.
	 *
	 * Builds new map by rule: key is the result of indexer function call, value is the corresponding item.
	 *
	 * @static
	 * @param {Object} set `<T>` Set.
	 * @param {Function} f
	 *
	 * `f(item: T): string`
	 *
	 * Indexer function.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {Object} `<T>` Collection index.
	 */
	/**
	 * @method $index
	 *
	 * `<T extends JW.Class>` Indexes collection.
	 *
	 * Builds new map by rule: key is the result of indexer function call, value is the corresponding item.
	 *
	 * @static
	 * @param {Object} set `<T>` Set.
	 * @param {Function} f
	 *
	 * `f(item: T): string`
	 *
	 * Indexer function.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {JW.Map} `<T>` Collection index.
	 */
	/**
	 * @method toArray
	 *
	 * `<T extends JW.Class>` Converts collection to array.
	 *
	 * Builds new array consisting of collection items.
	 *
	 * @static
	 * @param {Object} set `<T>` Set.
	 * @returns {Array} `<T>` Items array.
	 */
	/**
	 * @method $toArray
	 *
	 * `<T extends JW.Class>` Converts collection to array.
	 *
	 * Builds new array consisting of collection items.
	 *
	 * @static
	 * @param {Object} set `<T>` Set.
	 * @returns {JW.Array} `<T>` Items array.
	 */
	/**
	 * @method toSet
	 *
	 * `<T extends JW.Class>` Converts collection to set.
	 *
	 * Builds new set consisting of collection items.
	 *
	 * @static
	 * @param {Object} set `<T>` Set.
	 * @returns {Object} `<T>` Items set.
	 */
	/**
	 * @method $toSet
	 *
	 * `<T extends JW.Class>` Converts collection to set.
	 *
	 * Builds new set consisting of collection items.
	 *
	 * @static
	 * @param {Object} set `<T>` Set.
	 * @returns {JW.Set} `<T>` Items set.
	 */
	/**
	 * @method asArray
	 *
	 * `<T extends JW.Class>` Represents collection as array.
	 *
	 * If this collection is array, returns it immediately. Else, executes {@link #static-method-toArray} method.
	 * This method works probably faster than {@link #static-method-toArray}, but please make sure that the returned array
	 * won't be modified externally, because it can cause strange unexpected bugs.
	 *
	 * @static
	 * @param {Object} set `<T>` Set.
	 * @returns {Array} `<T>` Items array.
	 */
	/**
	 * @method $asArray
	 *
	 * `<T extends JW.Class>` Represents collection as array.
	 *
	 * If this collection is array, returns it immediately. Else, executes {@link #static-method-toArray} method.
	 * This method works probably faster than {@link #static-method-toArray}, but please make sure that the returned array
	 * won't be modified externally, because it can cause strange unexpected bugs.
	 *
	 * @static
	 * @param {Object} set `<T>` Set.
	 * @returns {JW.Array} `<T>` Items array.
	 */
	/**
	 * @method asSet
	 *
	 * `<T extends JW.Class>` Represents collection as set.
	 *
	 * If this collection is set, returns it immediately. Else, executes {@link #static-method-toSet}method.
	 * This method works probably faster than {@link #static-method-toSet}, but please make sure that the returned set
	 * won't be modified externally, because it can cause strange unexpected bugs.
	 *
	 * @static
	 * @param {Object} set `<T>` Set.
	 * @returns {Object} `<T>` Items set.
	 */
	/**
	 * @method $asSet
	 *
	 * `<T extends JW.Class>` Represents collection as set.
	 *
	 * If this collection is set, returns it immediately. Else, executes {@link #static-method-toSet}method.
	 * This method works probably faster than {@link #static-method-toSet}, but please make sure that the returned set
	 * won't be modified externally, because it can cause strange unexpected bugs.
	 *
	 * @static
	 * @param {Object} set `<T>` Set.
	 * @returns {JW.Set} `<T>` Items set.
	 */
	/**
	 * @method filter
	 *
	 * `<T extends JW.Class>` Filters collection by criteria.
	 *
	 * Builds new collection of the same type, consisting of items for which `f` returns !== `false`.
	 *
	 * @static
	 * @param {Object} set `<T>` Set.
	 * @param {Function} f
	 *
	 * `f(item: T): boolean`
	 *
	 * Criteria.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {Object} `<T>` Filtered collection.
	 */
	/**
	 * @method $filter
	 *
	 * `<T extends JW.Class>` Filters collection by criteria.
	 *
	 * Builds new collection of the same type, consisting of items for which `f` returns !== `false`.
	 *
	 * @static
	 * @param {Object} set `<T>` Set.
	 * @param {Function} f
	 *
	 * `f(item: T): boolean`
	 *
	 * Criteria.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {JW.Set} `<T>` Filtered collection.
	 */
	/**
	 * @method count
	 *
	 * `<T extends JW.Class>` Counts the items matching criteria.
	 *
	 * Returns the number of items for which `f` returns !== `false`.
	 *
	 * @static
	 * @param {Object} set `<T>` Set.
	 * @param {Function} f
	 *
	 * `f(item: T): boolean`
	 *
	 * Criteria.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {number} Number of items.
	 */
	/**
	 * @method map
	 *
	 * `<T extends JW.Class, U extends JW.Class>` Maps collection items.
	 *
	 * Builds new collection of the same type, consisting of results of `f` call for each collection item.
	 *
	 * @static
	 * @param {Object} set `<T>` Set.
	 * @param {Function} f
	 *
	 * `f(item: T): U`
	 *
	 * Mapping function.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {Object} `<U>` Mapped collection.
	 */
	/**
	 * @method $map
	 *
	 * `<T extends JW.Class, U extends JW.Class>` Maps collection items.
	 *
	 * Builds new collection of the same type, consisting of results of `f` call for each collection item.
	 *
	 * @static
	 * @param {Object} set `<T>` Set.
	 * @param {Function} f
	 *
	 * `f(item: T): U`
	 *
	 * Mapping function.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {JW.Set} `<U>` Mapped collection.
	 */
	/**
	 * @method add
	 * `<T extends JW.Class>` Adds item to set if one is absent.
	 * @static
	 * @param {Object} set `<T>` Set.
	 * @param {T} item Item.
	 * @returns {boolean} Item is added successfully.
	 */
	/**
	 * @method tryAdd
	 * `<T extends JW.Class>` Adds item to set if one is absent.
	 * @static
	 * @param {Object} set `<T>` Set.
	 * @param {T} item Item.
	 * @returns {boolean} Item is added successfully. If not modified - `undefined`.
	 */
	/**
	 * @method addAll
	 * `<T extends JW.Class>` Adds multiple items to set, ones that are absent.
	 * @static
	 * @param {Object} set `<T>` Set.
	 * @param {Array} items `<T>` Items.
	 * @returns {Array} `<T>` Added items.
	 */
	/**
	 * @method $addAll
	 * `<T extends JW.Class>` Adds multiple items to set, ones that are absent.
	 * @static
	 * @param {Object} set `<T>` Set.
	 * @param {Array} items `<T>` Items.
	 * @returns {JW.Array} `<T>` Added items.
	 */
	/**
	 * @method tryAddAll
	 * `<T extends JW.Class>` Adds multiple items to set, ones that are absent.
	 * @static
	 * @param {Object} set `<T>` Set.
	 * @param {Array} items `<T>` Items.
	 * @returns {Array} `<T>` Added items. If not modified - `undefined`.
	 */
	/**
	 * @method remove
	 * `<T extends JW.Class>` Removes item from set if one is present.
	 * @static
	 * @param {Object} set `<T>` Set.
	 * @param {T} item Item.
	 * @returns {boolean} Item is removed successfully.
	 */
	/**
	 * @method tryRemove
	 * `<T extends JW.Class>` Removes item from set if one is present.
	 * @static
	 * @param {Object} set `<T>` Set.
	 * @param {T} item Item.
	 * @returns {boolean} Item is removed successfully. If not modified - `undefined`.
	 */
	/**
	 * @method removeAll
	 * `<T extends JW.Class>` Removes multiple items from set, ones that are present.
	 * @static
	 * @param {Object} set `<T>` Set.
	 * @param {Array} items `<T>` Items.
	 * @returns {Array} `<T>` Removed items.
	 */
	/**
	 * @method $removeAll
	 * `<T extends JW.Class>` Removes multiple items from set, ones that are present.
	 * @static
	 * @param {Object} set `<T>` Set.
	 * @param {Array} items `<T>` Items.
	 * @returns {JW.Array} `<T>` Removed items.
	 */
	/**
	 * @method tryRemoveAll
	 * `<T extends JW.Class>` Removes multiple items from set, ones that are present.
	 * @static
	 * @param {Object} set `<T>` Set.
	 * @param {Array} items `<T>` Items.
	 * @returns {Array} `<T>` Removes items. If not modified - `undefined`.
	 */
	/**
	 * @method splice
	 * `<T extends JW.Class>` Removes and adds multiple items in map. Universal optimized granular operation of removal/insertion.
	 * @static
	 * @param {Object} set `<T>` Set.
	 * @param {Array} removedItems `<T>` Items to remove.
	 * @param {Array} addedItems `<T>` Items to add.
	 * @returns {JW.AbstractSet.SpliceResult} `<T>` Result.
	 */
	/**
	 * @method trySplice
	 * `<T extends JW.Class>` Removes and adds multiple items in map. Universal optimized granular operation of removal/insertion.
	 * @static
	 * @param {Object} set `<T>` Set.
	 * @param {Array} removedItems `<T>` Items to remove.
	 * @param {Array} addedItems `<T>` Items to add.
	 * @returns {JW.AbstractSet.SpliceResult} `<T>` Result. If not modified - `undefined`.
	 */
	/**
	 * @method detectSplice
	 * `<T extends JW.Class>` Detects {@link #static-method-splice} method arguments to adjust set contents to `newItems`.
	 * Determines which items should be removed and which ones should be added.
	 * @static
	 * @param {Object} set `<T>` Set.
	 * @param {Object} newItems `<T>` New map contents.
	 * @returns {JW.AbstractMap.SpliceParams}
	 * `<T>` #splice method arguments. If no method call required - `undefined`.
	 */
	/**
	 * @method performSplice
	 * `<T extends JW.Class>` Adjusts map contents to `newItems` using {@link #static-method-detectSplice} and {@link #static-method-splice} methods.
	 * @static
	 * @param {Object} set `<T>` Set.
	 * @param {Object} newItems `<T>` New map contents.
	 * @returns {void}
	 */
	/**
	 * @method equal
	 * `<T extends JW.Class>` Checks for set equality (===) to array, item by item.
	 * @static
	 * @param {Object} set `<T>` Set.
	 * @param {Array} array `<T>` Array.
	 * @returns {boolean} Set is equal to array.
	 */
});
