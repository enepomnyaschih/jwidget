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
 * `<T> extends JW.IndexedCollection<number, T>`
 *
 * Array is ordered collection. Each item of array has an index. Index of first item is 0,
 * index of each next one is higher by 1.
 *
 * # Array methods
 *
 * **Difference compared to JW.IndexedCollection is in bold.**
 *
 * Content retrieving:
 *
 * - {@link #getLength} - Returns count of items in collection. For observable collections, `length` property may come
 * in handy if you want to track collection length dynamically.
 * - {@link #isEmpty} - Checks collection for emptiness.
 * - {@link #get} - Returns collection item by index.
 * - {@link #getFirst} - Returns first item in collection.
 * - **{@link #getLast} - Returns last item in collection.**
 * - {@link #getFirstKey} - Returns index of first item in collection.
 * - **{@link #getLastKey} - Returns index of last item in collection.**
 * - {@link #getKeys}, #$getKeys - Returns array of all item indexes.
 * - {@link #containsItem} - Does collection contain the item?
 * - {@link #containsKey} - Does collection contain the index?
 * - {@link #keyOf} - Returns item index. If item is not found, returns `undefined`.
 * - **{@link #indexOf} - Returns item index. If item is not found, return -1.**
 * - **{@link #getItems} - Returns internal representation of array.**
 * - **{@link #binarySearch} - Finds the index by binary search.**
 *
 * Iteration algorhitms:
 *
 * - {@link #every} - Checks all items by criteria.
 * Returns `true` if all items match the criteria.
 * - {@link #some} - Checks each item by criteria.
 * Returns `true` if some items matches the criteria.
 * - {@link #each} - Iterates items.
 * - {@link #search} - Finds item by criteria.
 * Returns first item matching the criteria.
 * - {@link #find} - Finds item by criteria.
 * Returns index of first item matching the criteria.
 * - {@link #filter}, #$filter, #$$filter - Filters collection by criteria.
 * Builds new collection of the same type, consisting of items matching the criteria.
 * - {@link #count}, #$count, #$$count - Counts the items matching criteria.
 * - {@link #map}, #$map, #$$mapValues, #$$mapObjects - Maps collection items.
 * Builds new collection of the same type, consisting of results of mapping function call for each collection item.
 * - {@link #toSorted}, #$toSorted, #toSortedComparing, #$toSortedComparing, #$$toSortedComparing -
 * Builds array consisting of collection items sorted by indexer or comparer.
 * - {@link #getSortingKeys}, #$getSortingKeys, #getSortingKeysComparing, #$getSortingKeysComparing -
 * Returns indexes of collection items sorted by indexer or comparer.
 * - {@link #index}, #$index, #$$index - Indexes collection.
 * Builds new map by rule: key is the result of indexer function call, value is the corresponding item.
 * - {@link #toArray}, #$toArray, #$$toArray - Builds new array consisting of collection items.
 * - {@link #toMap}, #$toMap - Builds new map consisting of collection items.
 * - {@link #toSet}, #$toSet, #$$toSet - Builds new set consisting of collection items.
 * - {@link #asArray}, #$asArray - Represents collection as array.
 * - {@link #asMap}, #$asMap - Represents collection as map.
 * - {@link #asSet}, #$asSet - Represents collection as set.
 * - **{@link #backEvery} - Checks all items by criteria in backward order.**
 * - **{@link #merge}, #$merge, #$$merge - (for `JW.AbstractArray<? extends JW.AbstractArray>` only)
 * Builds array consisting of items of subarrays in the same order.**
 * - **{@link #toReversed}, #$toReversed, #$$toReversed -
 * Builds array consisting of collection items in reverse order.**
 *
 * Collection modification:
 *
 * - **{@link #add}, #tryAdd - Inserts an item.**
 * - **{@link #addAll}, #tryAddAll - Inserts item range.**
 * - {@link #set}, #trySet - Replaces an item by index.
 * - {@link #remove}, #tryRemove - Removes an item by index.
 * - **{@link #removeAll}, #$removeAll, #tryRemoveAll - Removes item range.**
 * - {@link #removeItem} - Removes first occurency of an item in collection.
 * - {@link #removeItems} - Removes all occurencies of items in collection.
 * - **{@link #pop} - Removes last item.**
 * - **{@link #move}, #tryMove - Moves item.**
 * - {@link #clear}, #$clear, #tryClear - Clears collection.
 * - **{@link #splice}, #trySplice - Removes/inserts item ranges.**
 * - **{@link #reorder}, #tryReorder - Reorders items.**
 * - **{@link #sort}, #sortComparing - Sorts array.**
 * - **{@link #reverse} - Reverses item order in array.**
 * - **{@link #performSplice} - Adjusts contents using #splice method.**
 * - **{@link #performFilter} - Filters contents using #splice method.**
 * - **{@link #performReorder} - Adjusts contents using #reorder method.**
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
 * - **{@link #createInserter} - Creates view synchronizer with array.**
 * - **{@link #createMerger} - Creates arrays merger. Extended version of #$$merge method.**
 * - **{@link #createReverser} - Creates array reverser. Extended version of #$$toReversed method.**
 *
 * Similar collection creation (for algorithms and synchronizers implementation):
 *
 * - {@link #createEmpty} - Creates empty collection of the same type.
 * - {@link #createEmptyArray} - Creates empty array of the same observability level.
 * - {@link #createEmptyMap} - Creates empty map of the same observability level.
 * - {@link #createEmptySet} - Creates empty set of the same observability level.
 *
 * Other methods:
 *
 * - **{@link #detectSplice} - Detects #splice method arguments to adjust contents.**
 * - **{@link #detectFilter} - Detects `removeParamsList` argument of #splice method to filter contents.**
 * - **{@link #detectReorder} - Detects #reorder method arguments to adjust contents.**
 * - **{@link #detectSort} - Detects #reorder method arguments to sort by indexer.**
 * - **{@link #detectSortComparing} - Detects #reorder method arguments to sort by comparer.**
 * - **{@link #collapse} - Collapses multi-dimensional array.**
 * - **{@link #equal} - Checks for equality to another array.**
 *
 * All the same algorithms are also available for native JavaScript Array, see JW.Array static methods.
 *
 * @extends JW.IndexedCollection
 * @abstract
 */
JW.AbstractArray = function(items, adapter) {
	JW.AbstractArray._super.call(this);
	this.items = adapter ? items : items ? items.concat() : [];
	this.getKey = null;
};

JW.extend(JW.AbstractArray, JW.IndexedCollection, {
	/**
	 * @property {Function} getKey
	 *
	 * `getKey(item: T): number/string`
	 *
	 * Function which returns unique key of an item in this collection.
	 * Function is used by #detectSplice, #performSplice, #detectReorder, #performReorder algorithms.
	 * Defaults to JW.iid.
	 * If collection consists of instances of JW.Class, then it's all right.
	 */
	/**
	 * @method getFirstKey
	 * Returns index of first collection item. If collection is empty, returns `undefined`.
	 * @returns {number} Index.
	 */
	/**
	 * @method containsKey
	 * Checks existance of item with specified index in collection.
	 * @param {number} index Index.
	 * @returns {boolean} Collection contains item with specified index.
	 */
	/**
	 * @method keyOf
	 * Returns index of item in collection. If such item doesn't exist, returns `undefined`.
	 * @param {T} item Item.
	 * @returns {number} Item index.
	 */

	/**
	 * Returns item array - internal collection representation.
	 *
	 * **Caution: doesn't make a copy.**
	 *
	 * @returns {Array} `<T>` Item array.
	 */
	getItems: function() {
		return this.items;
	},

	/**
	 * Returns the last collection item. If collection is empty, returns `undefined`.
	 * @returns {T} Item.
	 */
	getLast: function() {
		return this.items[this.items.length - 1];
	},

	/**
	 * Returns index of last collection item. If collection is empty, returns `undefined`.
	 * @returns {number} Index.
	 */
	getLastKey: function() {
		var l = this.items.length;
		if (l !== 0) {
			return l - 1;
		}
	},

	getLength: function() {
		return this.items.length;
	},

	isEmpty: function() {
		return this.items.length === 0;
	},

	/**
	 * @method get
	 * Returns item by index. If item with such index doesn't exist, returns `undefined`.
	 * @param {number} index Index.
	 * @returns {T} Item.
	 */
	get: function(index) {
		return this.items[index];
	},

	/**
	 * @method $getKeys
	 * Returns array of indexes of all collection items, i.e. array `[0, 1, ... , length - 1]`.
	 * @returns {JW.Array} `<number>` Indexes array.
	 */
	/**
	 * Returns array of indexes of all collection items, i.e. array `[0, 1, ... , length - 1]`.
	 * @returns {Array} `<number>` Indexes array.
	 */
	getKeys: function() {
		var items = this.items;
		var result = new Array(items.length);
		for (var i = 0, l = items.length; i < l; ++i) {
			result[i] = i;
		}
		return result;
	},

	/**
	 * Checks all items by criteria.
	 *
	 * Returns true if function `f` returns !== `false` for all collection items.
	 *
	 * Algorithms iterates items sequentially, and stops after first item not matching the criteria.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T, index: number): boolean`
	 *
	 * Criteria.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {boolean} Result.
	 */
	every: function(callback, scope) {
		return JW.Array.every(this.items, callback, scope || this);
	},

	/**
	 * @method some
	 *
	 * Checks each item by criteria.
	 *
	 * Returns true if function `f` returns !== `false` for some collection item.
	 *
	 * Algorithms iterates items sequentially, and stops after first item matching the criteria.
	 *
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
	 *
	 * Iterates collection items. Calls specified function for all items.
	 *
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
	 * Finds item by criteria.
	 *
	 * Returns index of first item for which `f` returns !== `false`.
	 *
	 * Algorithms iterates items sequentially, and stops after first item matching the criteria.
	 *
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
	 * Finds item by criteria.
	 *
	 * Returns first item for which `f` returns !== `false`.
	 *
	 * Algorithms iterates items sequentially, and stops after first item matching the criteria.
	 *
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
	 * Converts collection to sorted array.
	 *
	 * Builds array consisting of collection items sorted by result of `f` call for each item.
	 *
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
	 * Converts collection to sorted array.
	 *
	 * Builds array consisting of collection items sorted by result of `f` call for each item.
	 *
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
	 * Converts collection to sorted array.
	 *
	 * Builds array consisting of collection items sorted by comparer.
	 *
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
	 * Converts collection to sorted array.
	 *
	 * Builds array consisting of collection items sorted by comparer.
	 *
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
	 * Returns indexes of sorted items.
	 *
	 * Builds array of item indexes, sorted by result of `f` call for each item.
	 *
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
	 * Returns indexes of sorted items.
	 *
	 * Builds array of item indexes, sorted by result of `f` call for each item.
	 *
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
	 * Returns indexes of sorted items.
	 *
	 * Builds array of item indexes, sorted by comparer.
	 *
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
	 * Returns indexes of sorted items.
	 *
	 * Builds array of item indexes, sorted by comparer.
	 *
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
	 * Indexes collection.
	 *
	 * Builds new map by rule: key is the result of indexer function call, value is the corresponding item.
	 *
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
	 * Indexes collection.
	 *
	 * Builds new map by rule: key is the result of indexer function call, value is the corresponding item.
	 *
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
	 * Filters collection by criteria.
	 *
	 * Builds new collection of the same type, consisting of items for which `f` returns !== `false`.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T, index: number): boolean`
	 *
	 * Criteria.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {Array} `<T>` Filtered collection.
	 */
	filter: function(callback, scope) {
		return JW.Array.filter(this.items, callback, scope || this);
	},

	/**
	 * Filters collection by criteria.
	 *
	 * Builds new collection of the same type, consisting of items for which `f` returns !== `false`.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T, index: number): boolean`
	 *
	 * Criteria.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {JW.Array} `<T>` Filtered collection.
	 */
	$filter: JW.AbstractCollection._create$Array("filter"),

	count: function(callback, scope) {
		return JW.Array.count(this.items, callback, scope || this);
	},

	/**
	 * `<U>` Maps collection items.
	 *
	 * Builds new collection of the same type, consisting of results of `f` call for each collection item.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T, index: number): U`
	 *
	 * Mapping function.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {Array} `<U>` Mapped collection.
	 */
	map: function(callback, scope) {
		return JW.Array.map(this.items, callback, scope || this);
	},

	/**
	 * `<U>` Maps collection items.
	 *
	 * Builds new collection of the same type, consisting of results of `f` call for each collection item.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T, index: number): U`
	 *
	 * Mapping function.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {JW.Array} `<U>` Mapped collection.
	 */
	$map: JW.AbstractCollection._create$Array("map"),

	toArray: function() {
		return this.items.concat();
	},

	asArray: function() {
		return this.items;
	},

	$asArray: function() {
		return this;
	},

	/**
	 * Inserts an item to array.
	 * @param {T} item Item.
	 * @param {number} [index] Index of an item before which to insert new one. By default, appends the item.
	 * @returns {void}
	 */
	add: function(item, index) {
		this.tryAdd(item, index);
	},

	/**
	 * Inserts an item to array.
	 * @param {T} item Item.
	 * @param {number} [index] Index of an item before which to insert new one. By default, appends the item.
	 * @returns {boolean} true.
	 */
	tryAdd: function(item, index) {
		return this.tryAddAll([item], index);
	},

	/**
	 * Inserts item range to array.
	 * @param {Array} items `<T>` Items.
	 * @param {number} [index] Index of an item before which to insert new ones. By default, appends the items.
	 * @returns {void}
	 */
	addAll: function(items, index) {
		this.tryAddAll(items, index);
	},

	/**
	 * Inserts item range to array.
	 * @param {Array} items `<T>` Items.
	 * @param {number} [index] Index of an item before which to insert new ones. By default, appends the items.
	 * @returns {boolean} true. If not modified - `undefined`.
	 */
	tryAddAll: function(items, index) {
		if (index === undefined) {
			index = this.items.length;
		}
		if (this.trySplice([], [new JW.AbstractArray.IndexItems(index, items)])) {
			return true;
		}
	},

	/**
	 * @method set
	 * Replaces item with specified index. If array doesn't contain such index, it will break the application.
	 * @param {T} item Item.
	 * @param {number} index Index.
	 * @returns {T} The replaced item.
	 */
	/**
	 * Replaces item with specified index. If array doesn't contain such index, it will break the application.
	 * @param {T} item Item.
	 * @param {number} index Index.
	 * @returns {JW.Proxy} `<T>` Proxy of the replaced item. If not modified - `undefined`.
	 */
	trySet: function(item, index) {
		var oldProxy = this._trySet(item, index);
		if ((oldProxy !== undefined) && this._ownsItems) {
			oldProxy.get().destroy();
		}
		return oldProxy;
	},

	_trySet: function(item, index) {
		return JW.Array.trySet(this.items, item, index);
	},

	/**
	 * @method remove
	 * Removes item with specified index. If array doesn't contain such index, it will break the application.
	 * @param {number} index Index.
	 * @returns {T} The removed item.
	 */
	/**
	 * Removes item with specified index. If array doesn't contain such index, it will break the application.
	 * @param {number} index Index.
	 * @returns {T} The removed item. If not modified - `undefined`.
	 */
	tryRemove: function(index) {
		var result = this.tryRemoveAll(index, 1);
		if (result !== undefined) {
			return result[0];
		}
	},

	/**
	 * Removes item range from array.
	 * @param {number} index Index of first item to remove.
	 * @param {number} count Count of items to remove.
	 * @returns {Array} `<T>` The removed items.
	 */
	removeAll: function(index, count) {
		var result = this.tryRemoveAll(index, count);
		return result || [];
	},

	/**
	 * Removes item range from array.
	 * @param {number} index Index of first item to remove.
	 * @param {number} count Count of items to remove.
	 * @returns {JW.Array} `<T>` The removed items.
	 */
	$removeAll: JW.AbstractCollection._create$Array("removeAll"),

	/**
	 * Removes item range from array.
	 * @param {number} index Index of first item to remove.
	 * @param {number} count Count of items to remove.
	 * @returns {Array} `<T>` The removed items. If not modified - `undefined`.
	 */
	tryRemoveAll: function(index, count) {
		var result = this.trySplice([new JW.AbstractArray.IndexCount(index, count)], []);
		if (result !== undefined) {
			return result.removedItemsList[0].items;
		}
	},

	removeItems: function(items) {
		var itemSet = new JW.Set(items);
		var newItems = this.filter(function(item) { return !itemSet.contains(item); });
		this.performFilter(newItems);
	},

	/**
	 * Moves an item inside array.
	 * @param {number} fromIndex Item index to move.
	 * @param {number} toIndex Index to move to.
	 * @returns {T} The moved item.
	 */
	move: function(fromIndex, toIndex) {
		this.tryMove(fromIndex, toIndex);
		return this.get(toIndex);
	},

	/**
	 * Moves an item inside array.
	 * @param {number} fromIndex Item index to move.
	 * @param {number} toIndex Index to move to.
	 * @returns {T} The moved item. If not modified - `undefined`.
	 */
	tryMove: function(fromIndex, toIndex) {
		return JW.Array.tryMove(this.items, fromIndex, toIndex);
	},

	/**
	 * Clears collection.
	 * @returns {Array} `<T>` Old collection contents.
	 */
	clear: function() {
		var result = this.tryClear();
		return (result !== undefined) ? result : [];
	},

	/**
	 * Clears collection.
	 * @returns {JW.Array} `<T>` Old collection contents.
	 */
	$clear: JW.AbstractCollection._create$Array("clear"),

	/**
	 * Clears collection.
	 * @returns {Array} `<T>` Old collection contents. If not modified - `undefined`.
	 */
	tryClear: function() {
		var items = this._tryClear(this.items);
		if ((items !== undefined) && this._ownsItems) {
			JW.Array.backEvery(items, JW.destroy);
		}
		return items;
	},

	_tryClear: function() {
		return JW.Array.tryClear(this.items);
	},

	/**
	 * Removes and inserts item ranges. Universal optimized granular operation of removal/insertion.
	 * @param {Array} removeParamsList `<JW.AbstractArray.IndexCount>`
	 * Array of segments to remove sorted by index asc. Segments are removed in backward order.
	 * @param {Array} addParamsList `<JW.AbstractArray.IndexItems<T>>`
	 * Array of segments to insert sorted by index asc. Segments are inserted in forward order.
	 * @returns {JW.AbstractArray.SpliceResult} `<T>` Result.
	 */
	splice: function(removeParamsList, addParamsList) {
		var result = this.trySplice(removeParamsList, addParamsList);
		return (result !== undefined) ? result : new JW.AbstractArray.SpliceResult(this.items.concat(), [], []);
	},

	/**
	 * Removes and inserts item ranges. Universal optimized granular operation of removal/insertion.
	 * @param {Array} removeParamsList `<JW.AbstractArray.IndexCount>`
	 * Array of segments to remove sorted by index asc. Segments are removed in backward order.
	 * @param {Array} addParamsList `<JW.AbstractArray.IndexItems<T>>`
	 * Array of segments to insert sorted by index asc. Segments are inserted in forward order.
	 * @returns {JW.AbstractArray.SpliceResult} `<T>` Result. If not modified - `undefined`.
	 */
	trySplice: function(removeParamsList, addParamsList) {
		var spliceResult = this._trySplice(removeParamsList, addParamsList);
		if ((spliceResult !== undefined) && this._ownsItems) {
			JW.Array.backEvery(spliceResult.getRemovedItems(), JW.destroy);
		}
		return spliceResult;
	},

	_trySplice: function(removeParamsList, addParamsList) {
		return JW.Array.trySplice(this.items, removeParamsList, addParamsList);
	},

	/**
	 * Reorders array items.
	 * @param {Array} indexArray `<number>` Index array. Item with index `i` will be moved to index `indexArray[i]`.
	 * Must contain all indexes from 0 to (length - 1).
	 * @returns {void}
	 */
	reorder: function(indexArray) {
		this.tryReorder(indexArray);
	},

	/**
	 * Reorders array items.
	 * @param {Array} indexArray `<number>` Index array. Item with index `i` will be moved to index `indexArray[i]`.
	 * Must contain all indexes from 0 to (length - 1).
	 * @returns {Array} `<T>` Old array contents. If not modified - undefined.
	 */
	tryReorder: function(indexArray) {
		return JW.Array.tryReorder(this.items, indexArray);
	},

	/**
	 * Detects #splice method arguments to adjust array contents to `newItems`.
	 * Determines which item ranges should be removed and which ones should be inserted.
	 * All items must have unique `getKey` function result.
	 * If items don't have unique key, probably #detectFilter method will help.
	 * @param {Array} newItems `<T>` New array contents.
	 * @param {Function} [getKey]
	 * Function which returns unique key of an item in this collection.
	 * Defaults to #getKey.
	 * If collection consists of instances of JW.Class, then it's all right.
	 * @param {Object} [scope] `getKey` call scope. Defaults to `this`.
	 * @returns {JW.AbstractArray.SpliceParams}
	 * `<T>` #splice method arguments. If no method call required - `undefined`.
	 */
	detectSplice: function(newItems, getKey, scope) {
		return JW.Array.detectSplice(this.items, newItems, getKey || this.getKey, scope || this);
	},

	/**
	 * Detects `removeParamsList` arguments of #splice to adjust array contents to `newItems`.
	 * Determines which item ranges should be removed.
	 * Doesn't assume items insertion - try #detectSplice if that's the case.
	 * In advantage to #detectSplice, doesn't require item uniquiness.
	 * @param {Array} newItems `<T>` New array contents.
	 * @returns {Array}
	 * `<JW.AbstractArray.IndexCount>` `removeParamsList` argument of #splice method.
	 * If no method call required - `undefined`.
	 */
	detectFilter: function(newItems) {
		return JW.Array.detectFilter(this.items, newItems);
	},

	/**
	 * Detects #reorder method arguments to adjust array contents to `newItems`.
	 * Determines where to move all items.
	 * If `newItems` contents differ from `this` contents, the array will be broken.
	 * @param {Array} newItems `<T>` New array contents.
	 * @param {Function} [getKey]
	 * Function which returns unique key of an item in this collection.
	 * Defaults to #getKey.
	 * If collection consists of instances of JW.Class, then it's all right.
	 * @param {Object} [scope] `getKey` call scope. Defaults to `this`.
	 * @returns {Array}
	 * `<number>` `indexArray` argument of #reorder method.
	 * If no method call required - `undefined`.
	 */
	detectReorder: function(newItems, getKey, scope) {
		return JW.Array.detectReorder(this.items, newItems, getKey || this.getKey, scope || this);
	},

	/**
	 * Detects #reorder method arguments to sort array contents by result of `f` call for each item.
	 * @param {Function} [f]
	 *
	 * `f(item: T, index: number): number/string`
	 *
	 * Indexer function. Returns `item` by default.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @param {1/-1} [order] Sorting order.
	 * @returns {Array}
	 * `<number>` `indexArray` argument of #reorder method.
	 * If no method call required - `undefined`.
	 */
	detectSort: function(callback, scope, order) {
		return JW.Array.detectSort(this.items, callback, scope || this, order);
	},

	/**
	 * Detects #reorder method arguments to sort array contents by comparer.
	 *
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
	 * `<number>` `indexArray` argument of #reorder method.
	 * If no method call required - `undefined`.
	 */
	detectSortComparing: function(compare, scope, order) {
		return JW.Array.detectSortComparing(this.items, compare, scope || this, order);
	},

	/**
	 * Adjusts array contents to `newItems` using #detectSplice and #splice methods.
	 * All items must have unique `getKey` function result.
	 * If items don't have unique key, probably #detectFilter method will help.
	 * @param {Array} newItems `<T>` New array contents.
	 * @param {Function} [getKey]
	 * Function which returns unique key of an item in this collection.
	 * Defaults to #getKey.
	 * If collection consists of instances of JW.Class, then it's all right.
	 * @param {Object} [scope] `getKey` call scope. Defaults to `this`.
	 * @returns {void}
	 */
	performSplice: function(newItems, getKey, scope) {
		var params = this.detectSplice(newItems, getKey || this.getKey, scope || this);
		if (params !== undefined) {
			this.trySplice(params.removeParamsList, params.addParamsList);
		}
	},

	/**
	 * Adjusts array contents to `newItems` using #detectFilter and #splice methods.
	 * Only removes items. Doesn't assume items insertion - try #detectSplice if that's the case.
	 * In advantage to #detectSplice, doesn't require item uniquiness.
	 * @param {Array} newItems `<T>` New array contents.
	 * @returns {void}
	 */
	performFilter: function(newItems) {
		var params = this.detectFilter(newItems);
		if (params !== undefined) {
			this.trySplice(params, []);
		}
	},

	/**
	 * Adjusts array contents to `newItems` using #detectReorder and #reorder methods.
	 * @param {Array} newItems `<T>` New array contents.
	 * @param {Function} [getKey]
	 * Function which returns unique key of an item in this collection.
	 * Defaults to #getKey.
	 * If collection consists of instances of JW.Class, then it's all right.
	 * @param {Object} [scope] `getKey` call scope. Defaults to `this`.
	 * @returns {void}
	 */
	performReorder: function(newItems, getKey, scope) {
		var indexArray = this.detectReorder(newItems, getKey || this.getKey, scope || this);
		if (indexArray !== undefined) {
			this.tryReorder(indexArray);
		}
	},

	/**
	 * Sorts array by result of `f` function call for each item.
	 *
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
	sort: function(callback, scope, order) {
		var indexArray = this.detectSort(callback, scope, order);
		if (indexArray !== undefined) {
			this.tryReorder(indexArray);
		}
	},

	/**
	 * Sorts array by comparer.
	 *
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
	sortComparing: function(compare, scope, order) {
		var indexArray = this.detectSortComparing(compare, scope, order);
		if (indexArray !== undefined) {
			this.tryReorder(indexArray);
		}
	},

	/**
	 * For `JW.AbstractArray<? extends JW.AbstractArray>` only.
	 * Builds array consisting of subarray items in the same order.
	 * Current array is not modified.
	 * @returns {Array} Merged array.
	 */
	merge: function() {
		return JW.Array.merge(this.map(JW.byMethod("getItems")));
	},

	/**
	 * For `JW.AbstractArray<? extends JW.AbstractArray>` only.
	 * Builds array consisting of subarray items in the same order.
	 * Current array is not modified.
	 * @returns {JW.Array} Merged array.
	 */
	$merge: JW.AbstractCollection._create$Array("merge"),

	/**
	 * For `JW.AbstractArray<? extends JW.AbstractArray>` only.
	 * Builds array consisting of subarray items in the same order.
	 * Current array is not modified.
	 * If this collection is observable, starts continuous synchronization,
	 * i.e. creates JW.AbstractArray.Merger implicitly.
	 * @returns {JW.AbstractArray} Merged array.
	 */
	$$merge: function() {
		var result = this._createMergerTarget();
		result.own(this.createMerger({
			target: result
		}));
		return result;
	},

	/**
	 * Reverses item order in array. Modifies the array itself.
	 * @returns {void}
	 */
	reverse: function() {
		this.items.reverse();
	},

	/**
	 * Builds a new array containing items of this array in reversed order.
	 * Current array is not modified.
	 * @returns {Array} `<T>` Reversed array.
	 */
	toReversed: function() {
		return JW.Array.toReversed(this.items);
	},

	/**
	 * Builds a new array containing items of this array in reversed order.
	 * Current array is not modified.
	 * @returns {JW.Array} `<T>` Reversed array.
	 */
	$toReversed: JW.AbstractCollection._create$Array("toReversed"),

	/**
	 * Builds a new array containing items of this array in reversed order.
	 * Current array is not modified.
	 * If this collection is observable, starts continuous synchronization,
	 * i.e. creates JW.AbstractArray.Reverser implicitly.
	 * @returns {JW.AbstractArray} `<T>` Reversed array.
	 */
	$$toReversed: function() {
		return this.$toReversed();
	},

	/**
	 * `<U>` Creates collection item mapper.
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} config Configuration (see synchronizer's Config options).
	 * @returns {JW.AbstractArray.Mapper}
	 * `<T, U>` Synchronizer.
	 */
	createMapper: function(config) {
		return new JW.AbstractArray.Mapper(this, config);
	},

	/**
	 * Creates collection filterer.
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} config Configuration (see synchronizer's Config options).
	 * @returns {JW.AbstractArray.Filterer}
	 * `<T>` Synchronizer.
	 */
	createFilterer: function(config) {
		return new JW.AbstractArray.Filterer(this, config);
	},

	/**
	 * Creates matching item counter.
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} config Configuration (see synchronizer's Config options).
	 * @returns {JW.AbstractArray.Counter}
	 * `<T>` Synchronizer.
	 */
	createCounter: function(config) {
		return new JW.AbstractArray.Counter(this, config);
	},

	/**
	 * Creates collection observer.
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} config Configuration (see synchronizer's Config options).
	 * @returns {JW.AbstractArray.Observer}
	 * `<T>` Synchronizer.
	 */
	createObserver: function(config) {
		return new JW.AbstractArray.Observer(this, config);
	},

	/**
	 * Creates collection converter to array (orderer).
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} [config] Configuration (see synchronizer's Config options).
	 * @returns {JW.AbstractArray.Orderer}
	 * `<T>` Synchronizer.
	 */
	createOrderer: function(config) {
		return new JW.AbstractArray.Orderer(this, config);
	},

	/**
	 * Creates collection converter to array (sorter by comparer).
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} config Configuration (see synchronizer's Config options).
	 * @returns {JW.AbstractArray.SorterComparing}
	 * `<T>` Synchronizer.
	 */
	createSorterComparing: function(config) {
		return new JW.AbstractArray.SorterComparing(this, config);
	},

	/**
	 * Creates collection converter to map (indexer).
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} config Configuration (see synchronizer's Config options).
	 * @returns {JW.AbstractArray.Indexer}
	 * `<T>` Synchronizer.
	 */
	createIndexer: function(config) {
		return new JW.AbstractArray.Indexer(this, config);
	},

	/**
	 * Creates collection converter to set.
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} [config] Configuration (see synchronizer's Config options).
	 * @returns {JW.AbstractArray.Lister}
	 * `<T>` Synchronizer.
	 */
	createLister: function(config) {
		return new JW.AbstractArray.Lister(this, config);
	},

	/**
	 * Creates view synchronizer with array.
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} config Configuration (see synchronizer's Config options).
	 * @returns {JW.AbstractArray.Inserter}
	 * `<T>` Synchronizer.
	 */
	createInserter: function(config) {
		return new JW.AbstractArray.Inserter(this, config);
	},

	/**
	 * Creates arrays merger.
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} [config] Configuration (see synchronizer's Config options).
	 * @returns {JW.AbstractArray.Merger}
	 * `<T>` Synchronizer.
	 */
	createMerger: function(config) {
		return new JW.AbstractArray.Merger(this, config);
	},

	createMergerBunch: function(merger) {
		return new JW.AbstractArray.Merger.Bunch(merger, this);
	},

	/**
	 * Creates array reverser.
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} [config] Configuration (see synchronizer's Config options).
	 * @returns {JW.AbstractArray.Reverser}
	 * `<T>` Synchronizer.
	 */
	createReverser: function(config) {
		return new JW.AbstractArray.Reverser(this, config);
	},

	createSplitter: function(config) {
		return new JW.AbstractArray.Splitter(this, config);
	},

	/**
	 * Checks for equality (===) to another array, item by item.
	 * @param {Array} arr `<T>` Another array.
	 * @returns {boolean} Arrays are equal.
	 */
	equal: function(arr) {
		return JW.Array.equal(this.items, arr);
	},

	/**
	 * Collapses multi-dimentional array.
	 * @param {number} depth Dimentions to collapse.
	 * @returns {Array} Collapsed array.
	 */
	collapse: function(depth) {
		return JW.Array.collapse(this.items, depth);
	},

	/**
	 * Returns item index in this collection. If item doesn't exist, returns -1.
	 * @param {T} item Item.
	 * @returns {number} Item index or -1.
	 */
	indexOf: function(item) {
		return JW.Array.indexOf(this.items, item);
	},

	/**
	 * Checks all items by criteria in backward order.
	 *
	 * Returns true if function `f` returns !== `false` for all collection items.
	 *
	 * Algorithms iterates items sequentially, and stops after first item not matching the criteria.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T, index: number): boolean`
	 *
	 * Criteria.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {boolean} Result.
	 */
	backEvery: function(callback, scope) {
		return JW.Array.backEvery(this.items, callback, scope);
	},

	// deprecated
	top: function() {
		return JW.Array.top(this.items);
	},

	/**
	 * Removes last array item. Does nothing if array is empty.
	 * @returns {T} The removed item or `undefined`.
	 */
	pop: function() {
		if (this.items.length !== 0) {
			return this.tryRemove(this.items.length - 1);
		}
	},

	/**
	 * Determines index of first item which is more (or less if `order` == -1) than specified value by `compare` function,
	 * using binary search. Array must be sorted by `compare` function.
	 * Can be used for item insertion easily.
	 * If you want to use this method for item removal, you must look at previous item and compare it to `value` first.
	 * @param {T} value Value.
	 * @param {Function} [compare]
	 *
	 * `f(t1: T, t2: T): number`
	 *
	 * Comparer function. Returns positive value if t1 > t2; nagative value if t1 < t2; 0 if t1 == t2.
	 * Defaults to `JW.cmp(t1, t2)`.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @param {1/-1} [order] Sorting order.
	 * @returns {number} Item index.
	 */
	binarySearch: function(value, compare, scope, order) {
		return JW.Array.binarySearch(this.items, value, compare, scope, order);
	},

	_callStatic: function(algorithm, args) {
		return JW.Array[algorithm].apply(JW.Array, [this.items].concat(args || []));
	},

	_createMergerTarget: function() {
		return this.some(function(bunch) { return bunch instanceof JW.ObservableArray; }) ?
			new JW.ObservableArray() : new JW.Array();
	}

	/**
	 * @method createEmpty
	 * `<U>` Creates empty collection of the same type.
	 * @returns {JW.AbstractArray} `<U>` Collection.
	 */
});

/**
 * @class
 * "Index-count" pair. Used in JW.AbstractArray#splice method arguments to specify item segments to remove.
 * @extends JW.Class
 *
 * @constructor
 * @param {number} index Index.
 * @param {number} count Count.
 */
JW.AbstractArray.IndexCount = function(index, count) {
	JW.AbstractArray.IndexCount._super.call(this);
	this.index = index;
	this.count = count;
};

JW.extend(JW.AbstractArray.IndexCount, JW.Class, {
	/**
	 * @property {number} index Index.
	 */
	/**
	 * @property {number} count Count.
	 */

	/**
	 * Clones pair.
	 * @returns {JW.AbstractArray.IndexCount}
	 */
	clone: function() {
		return new JW.AbstractArray.IndexCount(this.index, this.count);
	}
});

/**
 * @class
 * `<T>` "Index-items" pair. Used in JW.AbstractArray#splice method arguments to specify item segments to insert,
 * and in JW.AbstractArray.SpliceResult class to specify removed and added item segments.
 * @extends JW.Class
 *
 * @constructor
 * @param {number} index Index.
 * @param {Array} items `<T>` Items.
 */
JW.AbstractArray.IndexItems = function(index, items) {
	JW.AbstractArray.IndexItems._super.call(this);
	this.index = index;
	this.items = items;
};

JW.extend(JW.AbstractArray.IndexItems, JW.Class, {
	/**
	 * @property {number} index Index.
	 */
	/**
	 * @property {Array} items `<T>` Items.
	 */

	/**
	 * Converts to "index-count" pair.
	 * @returns {JW.AbstractArray.IndexCount} "Index-count" pair.
	 */
	toIndexCount: function() {
		return new JW.AbstractArray.IndexCount(this.index, this.items.length);
	},

	/**
	 * Clones pair.
	 * @returns {JW.AbstractArray.IndexItems}
	 */
	clone: function() {
		return new JW.AbstractArray.IndexItems(this.index, this.items.concat());
	}
});

/**
 * @class
 * `<T>` JW.AbstractArray#splice method arguments. Returned by JW.AbstractArray#detectSplice method.
 * @extends JW.Class
 *
 * @constructor
 * @param {Array} removeParamsList `<JW.AbstractArray.IndexCount>` Segments to remove.
 * @param {Array} addParamsList `<JW.AbstractArray.IndexItems<T>>` Segments to add.
 */
JW.AbstractArray.SpliceParams = function(removeParamsList, addParamsList) {
	JW.AbstractArray.SpliceParams._super.call(this);
	this.removeParamsList = removeParamsList;
	this.addParamsList = addParamsList;
};

JW.extend(JW.AbstractArray.SpliceParams/*<T>*/, JW.Class, {
	/**
	 * @property {Array} removeParamsList `<JW.AbstractArray.IndexCount>` Segments to remove.
	 */
	/**
	 * @property {Array} addParamsList `<JW.AbstractArray.IndexItems<T>>` Segments to add.
	 */
});

/**
 * @class
 * `<T>` JW.AbstractArray#splice method result.
 * @extends JW.Class
 *
 * @constructor
 * @param {Array} oldItems `<T>` Old array contents.
 * @param {Array} removedItemsList `<JW.AbstractArray.IndexItems<T>>` Removed item segments.
 * @param {Array} addedItemsList `<JW.AbstractArray.IndexItems<T>>` Added item segments.
 */
JW.AbstractArray.SpliceResult = function(oldItems, removedItemsList, addedItemsList) {
	JW.AbstractArray.SpliceResult._super.call(this);
	this.oldItems = oldItems;
	this.removedItemsList = removedItemsList;
	this.addedItemsList = addedItemsList;
	this.removedItems = null;
	this.addedItems = null;
	this.removeParamsList = null;
};

JW.extend(JW.AbstractArray.SpliceResult, JW.Class, {
	/**
	 * @property {Array} oldItems `<T>` Old array contents.
	 */
	/**
	 * @property {Array} removedItemsList `<JW.AbstractArray.IndexItems<T>>` Removed item segments.
	 */
	/**
	 * @property {Array} addedItemsList `<JW.AbstractArray.IndexItems<T>>` Added item segments.
	 */
	/*
	Array<T> removedItems;
	Array<T> addedItems;
	Array<JW.AbstractArray.IndexCount<T>> removeParamsList;
	*/

	/**
	 * Returns plain array of removed items.
	 * @returns {Array} `<T>` Removed items array.
	 */
	getRemovedItems: function() {
		if (!this.removedItems) {
			this.removedItems = JW.Array.merge(JW.Array.map(this.removedItemsList, JW.byField("items")));
		}
		return this.removedItems;
	},

	/**
	 * Returns plain array of added items.
	 * @returns {Array} `<T>` Added items array.
	 */
	getAddedItems: function() {
		if (!this.addedItems) {
			this.addedItems = JW.Array.merge(JW.Array.map(this.addedItemsList, JW.byField("items")));
		}
		return this.addedItems;
	},

	/**
	 * Converts removed item segments to "index-count" pairs.
	 * @returns {Array} `<JW.AbstractArray.IndexCount<T>>` Segments to remove.
	 */
	getRemoveParamsList: function() {
		if (!this.removeParamsList) {
			this.removeParamsList = JW.Array.map(this.removedItemsList, JW.byMethod("toIndexCount"));
		}
		return this.removeParamsList;
	},

	/**
	 * Checks that JW.AbstractArray#splice method call didn't change the array.
	 * @returns {boolean} Array hasn't been changed.
	 */
	isEmpty: function() {
		return (this.removedItemsList.length === 0) && (this.addedItemsList.length === 0);
	}
});
