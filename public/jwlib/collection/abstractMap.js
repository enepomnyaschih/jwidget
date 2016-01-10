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
 * `<T> extends JW.IndexedCollection<string, T>`
 *
 * Map is unordered collection. Each item has its own string key.
 *
 * # Map methods
 *
 * **Difference compared to JW.IndexedCollection is in bold.**
 *
 * Content retrieving:
 *
 * - {@link #getLength} - Returns count of items in collection. For observable collections, `length` property may come
 * in handy if you want to track collection length dynamically.
 * - {@link #isEmpty} - Checks collection for emptiness.
 * - {@link #get} - Returns collection item by key.
 * - {@link #getFirst} - Returns first item in collection.
 * - {@link #getFirstKey} - Returns key of first item in collection.
 * - {@link #getKeys}, #$getKeys - Returns array of all item keys.
 * - {@link #containsItem} - Does collection contain the item?
 * - {@link #containsKey} - Does collection contain the key?
 * - {@link #keyOf} - Returns item key. If item is not found, returns `undefined`.
 * - **{@link #getJson} - Returns internal representation of map.**
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
 *
 * Collection modification:
 *
 * - {@link #set}, #trySet - Adds or replaces an item by key.
 * - **{@link #setAll}, #setAllVerbose, #trySetAll - Adds or replaces a bunch of items.**
 * - {@link #remove}, #tryRemove - Removes an item by key.
 * - **{@link #removeAll}, #removeAllVerbose, #$removeAllVerbose, #tryRemoveAll - Removes a bunch of items.**
 * - {@link #removeItem} - Removes first occurency of an item in collection.
 * - {@link #removeItems} - Removes all occurencies of items in collection.
 * - **{@link #setKey}, #trySetKey - Changes item key.**
 * - {@link #clear}, #$clear, #tryClear - Clears collection.
 * - **{@link #splice}, #trySplice - Removes and adds bunches of items.**
 * - **{@link #reindex}, #tryReindex - Changes item keys.**
 * - **{@link #performSplice} - Adjusts contents using #splice method.**
 * - **{@link #performReindex} - Adjusts contents using #reindex method.**
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
 * - **{@link #createInserter} - Creates view synchronizer with map.**
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
 * - **{@link #detectReindex} - Detects #reindex method arguments to adjust contents.**
 * - **{@link #equal} - Checks for equality to another map.**
 *
 * All the same algorithms are also available for native JavaScript Object as map, see JW.Map static methods.
 *
 * @extends JW.IndexedCollection
 * @abstract
 */
JW.AbstractMap = function(json, adapter) {
	JW.AbstractMap._super.call(this);
	this._adapter = !!adapter;
	this.json = this._adapter ? json : json ? JW.apply({}, json) : {};
	this._length = JW.Map.getLength(this.json);
	this.getKey = null;
};

JW.extend(JW.AbstractMap, JW.IndexedCollection, {
	/**
	 * @property {Function} getKey
	 *
	 * `getKey(item: T): number/string`
	 *
	 * Function which returns unique key of an item in this collection.
	 * Function is used by #detectReindex, #performReindex algorithms.
	 * Defaults to JW.iid.
	 * If collection consists of instances of JW.Class, then it's all right.
	 */
	/**
	 * @method getFirstKey
	 * Returns key of first collection item. If collection is empty, returns `undefined`.
	 * @returns {string} Key.
	 */
	/**
	 * @method containsKey
	 * Checks existance of item with specified index in collection.
	 * @param {string} key Key.
	 * @returns {boolean} Collection contains item with specified key.
	 */
	/**
	 * @method keyOf
	 * Returns index of item in collection. If such item doesn't exist, returns `undefined`.
	 * @param {T} item Item.
	 * @returns {string} Item key.
	 */

	/**
	 * Returns item map - internal collection representation.
	 *
	 * **Caution: doesn't make a copy.**
	 *
	 * @returns {Object} `<T>` Item map.
	 */
	getJson: function() {
		return this.json;
	},

	getLength: function() {
		return this._length;
	},

	isEmpty: function() {
		return this._length === 0;
	},

	/**
	 * @method get
	 * Returns item by key. If item with such key doesn't exist, returns `undefined`.
	 * @param {string} key Key.
	 * @returns {T} Item.
	 */
	get: function(key) {
		return this.json[key];
	},

	/**
	 * @method $getKeys
	 * Returns array of keys of all collection items.
	 * @returns {JW.Array} `<string>` Keys array.
	 */
	/**
	 * Returns array of keys of all collection items.
	 * @returns {Array} `<string>` Keys array.
	 */
	getKeys: function() {
		return JW.Map.getKeys(this.json);
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
	 * `f(item: T, key: string): boolean`
	 *
	 * Criteria.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {boolean} Result.
	 */
	every: function(callback, scope) {
		return JW.Map.every(this.json, callback, scope);
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
	 * Iterates collection items. Calls specified function for all items.
	 *
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
	 * Finds item by criteria.
	 *
	 * Returns key of first item for which `f` returns !== `false`.
	 *
	 * Algorithms iterates items sequentially, and stops after first item matching the criteria.
	 *
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
	 * Finds item by criteria.
	 *
	 * Returns first item for which `f` returns !== `false`.
	 *
	 * Algorithms iterates items sequentially, and stops after first item matching the criteria.
	 *
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
	 * Converts collection to sorted array.
	 *
	 * Builds array consisting of collection items sorted by result of `f` call for each item.
	 *
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
	 * Converts collection to sorted array.
	 *
	 * Builds array consisting of collection items sorted by result of `f` call for each item.
	 *
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
	 * Converts collection to sorted array.
	 *
	 * Builds array consisting of collection items sorted by comparer.
	 *
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
	 * Converts collection to sorted array.
	 *
	 * Builds array consisting of collection items sorted by comparer.
	 *
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
	 * Returns keys of sorted items.
	 *
	 * Builds array of item keys, sorted by result of `f` call for each item.
	 *
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
	 * Returns keys of sorted items.
	 *
	 * Builds array of item keys, sorted by result of `f` call for each item.
	 *
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
	 * Returns keys of sorted items.
	 *
	 * Builds array of item keys, sorted by comparer.
	 *
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
	 * Returns keys of sorted items.
	 *
	 * Builds array of item keys, sorted by comparer.
	 *
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
	 * Indexes collection.
	 *
	 * Builds new map by rule: key is the result of indexer function call, value is the corresponding item.
	 *
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
	 * Indexes collection.
	 *
	 * Builds new map by rule: key is the result of indexer function call, value is the corresponding item.
	 *
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
	 * @method getInverted
	 * Returns an inverted map. Keys are converted to values, and values are
	 * converted to keys. `this` must be `JW.AbstractMap<string>`.
	 * @returns {JW.AbstractMap} `<string>` The inverted map.
	 */

	/**
	 * Filters collection by criteria.
	 *
	 * Builds new collection of the same type, consisting of items for which `f` returns !== `false`.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T, key: string): boolean`
	 *
	 * Criteria.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {Object} `<T>` Filtered collection.
	 */
	filter: function(callback, scope) {
		return JW.Map.filter(this.json, callback, scope);
	},

	/**
	 * Filters collection by criteria.
	 *
	 * Builds new collection of the same type, consisting of items for which `f` returns !== `false`.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T, key: string): boolean`
	 *
	 * Criteria.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {JW.Map} `<T>` Filtered collection.
	 */
	$filter: JW.AbstractCollection._create$Map("filter"),

	count: function(callback, scope) {
		return JW.Map.count(this.json, callback, scope);
	},

	/**
	 * `<U>` Maps collection items.
	 *
	 * Builds new collection of the same type, consisting of results of `f` call for each collection item.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T, key: string): U`
	 *
	 * Mapping function.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {Object} `<U>` Mapped collection.
	 */
	map: function(callback, scope) {
		return JW.Map.map(this.json, callback, scope);
	},

	/**
	 * `<U>` Maps collection items.
	 *
	 * Builds new collection of the same type, consisting of results of `f` call for each collection item.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T, key: string): U`
	 *
	 * Mapping function.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {JW.Map} `<U>` Mapped collection.
	 */
	$map: JW.AbstractCollection._create$Map("map"),

	asMap: function() {
		return this.json;
	},

	$asMap: function() {
		return this;
	},

	/**
	 * @method set
	 * Replaces item with specified key. If map doesn't contain such key, it will be added.
	 * @param {T} item Item.
	 * @param {string} key Key.
	 * @returns {T} The replaced item.
	 */
	/**
	 * Replaces item with specified key. If map doesn't contain such key, it will be added.
	 * @param {T} item Item.
	 * @param {string} key Key.
	 * @returns {JW.Proxy} `<T>` Proxy of the replaced item. If not modified - `undefined`.
	 */
	trySet: function(item, key) {
		var result = this._trySet(item, key);
		if (result === undefined) {
			return;
		}
		var oldItem = result.get();
		if ((oldItem !== undefined) && this._ownsItems) {
			oldItem.destroy();
		}
		return result;
	},

	_trySet: function(item, key) {
		var result = JW.Map.trySet(this.json, item, key);
		if (result === undefined) {
			return;
		}
		if (result.get() === undefined) {
			++this._length;
		}
		return result;
	},

	/**
	 * Adds or replaces a bunch of items. As of jWidget 1.3, doesn't return anything for sake of performance.
	 * For old behaviour, use method {@link #setAllVerbose}.
	 * @param {Object} items Items.
	 */
	setAll: function(items) {
		for (var key in items) {
			this.trySet(items[key], key);
		}
	},

	/**
	 * Adds or replaces a bunch of items. Returns verbose result set.
	 * @param {Object} items Items.
	 * @returns {JW.AbstractMap.SpliceResult} `<T>` Result of #splice method.
	 */
	setAllVerbose: function(items) {
		var spliceResult = this.trySetAll(items);
		return (spliceResult !== undefined) ? spliceResult : new JW.AbstractMap.SpliceResult({}, {});
	},

	/**
	 * Adds or replaces a bunch of items.
	 * @param {Object} items Items.
	 * @returns {JW.AbstractMap.SpliceResult} `<T>` Result of #splice method. If not modified - `undefined`.
	 */
	trySetAll: function(items) {
		return this.trySplice([], items);
	},

	/**
	 * Changes item key in map. If collection doesn't contain `oldKey` or contains `newKey`, it will cause an error.
	 * @param {string} oldKey Old key of item.
	 * @param {string} newKey New key of item.
	 * @returns {T} Item.
	 */
	setKey: function(oldKey, newKey) {
		this.trySetKey(oldKey, newKey);
		return this.json[newKey];
	},

	/**
	 * Changes item key in map. If collection doesn't contain `oldKey` or contains `newKey`, it will cause an error.
	 * @param {string} oldKey Old key of item.
	 * @param {string} newKey New key of item.
	 * @returns {T} Item. If not modified - `undefined`.
	 */
	trySetKey: function(oldKey, newKey) {
		return JW.Map.trySetKey(this.json, oldKey, newKey);
	},

	/**
	 * @method remove
	 * Removes item with specified key if it exists in map.
	 * @param {string} key Key.
	 * @returns {T} Old collection item or `undefined`.
	 */
	/**
	 * Removes item with specified key if it exists in map.
	 * @param {string} key Key.
	 * @returns {T} Old collection item. If not modified - `undefined`.
	 */
	tryRemove: function(key) {
		var item = this._tryRemove(key);
		if ((item !== undefined) && this._ownsItems) {
			item.destroy();
		}
		return item;
	},

	_tryRemove: function(key) {
		var item = JW.Map.tryRemove(this.json, key);
		if (item === undefined) {
			return;
		}
		--this._length;
		return item;
	},

	/**
	 * Removes a bunch of items from map. As of jWidget 1.3, doesn't return anything for sake of performance.
	 * For old behaviour, use method {@link #removeAllVerbose}.
	 * @param {Array} keys `<string>` Item keys.
	 */
	removeAll: function(keys) {
		for (var i = 0, l = keys.length; i < l; ++i) {
			this.tryRemove(keys[i]);
		}
	},

	/**
	 * Removes a bunch of items from map. Returns verbose result set.
	 * @param {Array} keys `<string>` Item keys.
	 * @returns {Object} `<T>` The removed items.
	 */
	removeAllVerbose: function(keys) {
		var items = this.tryRemoveAll(keys);
		return (items !== undefined) ? items : {};
	},

	/**
	 * Removes a bunch of items from map. Returns verbose result set.
	 * @param {Array} keys `<string>` Item keys.
	 * @returns {JW.Map} `<T>` The removed items.
	 */
	$removeAllVerbose: JW.AbstractCollection._create$Map("removeAllVerbose"),

	/**
	 * Removes a bunch of items from map.
	 * @param {Array} keys `<string>` Item keys.
	 * @returns {Object} `<T>` The removed items. If not modified - `undefined`.
	 */
	tryRemoveAll: function(keys) {
		var spliceResult = this.trySplice(keys, {});
		if (spliceResult !== undefined) {
			return spliceResult.removedItems;
		}
	},

	removeItems: function(items) {
		var itemSet = new JW.Set(items);
		var newItems = this.filter(function(item) {
			return !itemSet.contains(item);
		});
		this.performSplice(newItems);
	},

	/**
	 * Clears collection.
	 * @returns {Object} `<T>` Old collection contents.
	 */
	clear: function() {
		var result = this.tryClear();
		return (result !== undefined) ? result : {};
	},

	/**
	 * Clears collection.
	 * @returns {JW.Map} `<T>` Old collection contents.
	 */
	$clear: JW.AbstractCollection._create$Map("clear"),

	/**
	 * Clears collection.
	 * @returns {Object} `<T>` Old collection contents. If not modified - `undefined`.
	 */
	tryClear: function() {
		var items = this._tryClear();
		if ((items !== undefined) && this._ownsItems) {
			JW.Array.backEvery(JW.Map.toArray(items), JW.destroy);
		}
		return items;
	},

	_tryClear: function() {
		if (this._length === 0) {
			return;
		}
		var items;
		this._length = 0;
		if (this._adapter) {
			items = JW.Map.tryClear(this.json);
		} else {
			items = this.json;
			this.json = {};
		}
		return items;
	},

	/**
	 * Removes and adds bunches of items in map. Universal optimized granular operation of removal/insertion.
	 * @param {Array} removedKeys `<string>` Keys of items to remove.
	 * @param {Object} updatedItems `<T>` Items to add/replace.
	 * @returns {JW.AbstractMap.SpliceResult} `<T>` Result.
	 */
	splice: function(removedKeys, updatedItems) {
		var spliceResult = this.trySplice(removedKeys, updatedItems);
		return (spliceResult !== undefined) ? spliceResult : new JW.AbstractMap.SpliceResult({}, {});
	},

	/**
	 * Removes and adds bunches of items in map. Universal optimized granular operation of removal/insertion.
	 * @param {Array} removedKeys `<string>` Keys of items to remove.
	 * @param {Object} updatedItems `<T>` Items to add/replace.
	 * @returns {JW.AbstractMap.SpliceResult} `<T>` Result. If not modified - `undefined`.
	 */
	trySplice: function(removedKeys, updatedItems) {
		var spliceResult = this._trySplice(removedKeys, updatedItems);
		if ((spliceResult !== undefined) && this._ownsItems) {
			JW.Array.backEvery(JW.Map.toArray(spliceResult.removedItems), JW.destroy);
		}
		return spliceResult;
	},

	_trySplice: function(removedKeys, updatedItems) {
		var spliceResult = JW.Map.trySplice(this.json, removedKeys, updatedItems);
		if (spliceResult !== undefined) {
			this._length += JW.Map.getLength(spliceResult.addedItems) - JW.Map.getLength(spliceResult.removedItems);
			return spliceResult;
		}
	},

	/**
	 * Changes item keys in map.
	 * @param {Object} keyMap `<string>` Key map. Item with key `k` will gain key `keyMap[k]`.
	 * It is neccessary to pass only changed keys, but unchanged keys or unexisting keys are acceptable as well.
	 * @returns {Object} `<T>` Map of changed keys.
	 */
	reindex: function(keyMap) {
		var result = this.tryReindex(keyMap);
		return (result !== undefined) ? result : {};
	},

	/**
	 * Changes item keys in map.
	 * @param {Object} keyMap `<string>` Key map. Item with key `k` will gain key `keyMap[k]`.
	 * It is neccessary to pass only changed keys, but unchanged keys or unexisting keys are acceptable as well.
	 * @returns {Object} `<T>` Map of changed keys. If not modified - `undefined`.
	 */
	tryReindex: function(keyMap) {
		return JW.Map.tryReindex(this.json, keyMap);
	},

	/**
	 * Detects #splice method arguments to adjust map contents to `newItems`.
	 * Determines which item bunches should be removed and which ones should be inserted/replaced, and their keys.
	 * @param {Object} newItems `<T>` New map contents.
	 * @returns {JW.AbstractMap.SpliceParams}
	 * `<T>` #splice method arguments. If no method call required - `undefined`.
	 */
	detectSplice: function(newItems) {
		return JW.Map.detectSplice(this.json, newItems);
	},

	/**
	 * Detects #reindex method arguments to adjust map contents to `newItems`.
	 * Determines which keys should be assigned to all items.
	 * If `newItems` contents differ from `this` contents, the map will be broken.
	 * @param {Object} newItems `<T>` New map contents.
	 * @param {Function} [getKey]
	 * Function which returns unique key of an item in this collection.
	 * Defaults to #getKey.
	 * If collection consists of instances of JW.Class, then it's all right.
	 * @param {Object} [scope] `getKey` call scope. Defaults to `this`.
	 * @returns {Object}
	 * `<string>` `keyMap` argument of #reindex method.
	 * If no method call required - `undefined`.
	 */
	detectReindex: function(newItems, getKey, scope) {
		return JW.Map.detectReindex(this.json, newItems, getKey || this.getKey, scope || this);
	},

	/**
	 * Adjusts map contents to `newItems` using #detectSplice and #splice methods.
	 * @param {Object} newItems `<T>` New map contents.
	 * @returns {void}
	 */
	performSplice: function(newItems) {
		var params = this.detectSplice(newItems);
		if (params !== undefined) {
			this.trySplice(params.removedKeys, params.updatedItems);
		}
	},

	/**
	 * Adjusts map contents to `newItems` using #detectReindex and #reindex methods.
	 * @param {Object} newItems `<T>` New map contents.
	 * @param {Function} [getKey]
	 * Function which returns unique key of an item in this collection.
	 * Defaults to #getKey.
	 * If collection consists of instances of JW.Class, then it's all right.
	 * @param {Object} [scope] `getKey` call scope. Defaults to `this`.
	 * @returns {void}
	 */
	performReindex: function(newItems, getKey, scope) {
		var keyMap = this.detectReindex(newItems, getKey, scope);
		if (keyMap !== undefined) {
			this.tryReindex(keyMap);
		}
	},

	getInverted: function() {
		return JW.Map.getInverted(this.json);
	},

	/**
	 * `<U>` Creates collection item mapper.
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} config Configuration (see synchronizer's Config options).
	 * @returns {JW.AbstractMap.Mapper}
	 * `<T, U>` Synchronizer.
	 */
	createMapper: function(config) {
		return new JW.AbstractMap.Mapper(this, config);
	},

	/**
	 * Creates collection filterer.
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} config Configuration (see synchronizer's Config options).
	 * @returns {JW.AbstractMap.Filterer}
	 * `<T>` Synchronizer.
	 */
	createFilterer: function(config) {
		return new JW.AbstractMap.Filterer(this, config);
	},

	/**
	 * Creates matching item counter.
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} config Configuration (see synchronizer's Config options).
	 * @returns {JW.AbstractMap.Counter}
	 * `<T>` Synchronizer.
	 */
	createCounter: function(config) {
		return new JW.AbstractMap.Counter(this, config);
	},

	/**
	 * Creates collection observer.
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} config Configuration (see synchronizer's Config options).
	 * @returns {JW.AbstractMap.Observer}
	 * `<T>` Synchronizer.
	 */
	createObserver: function(config) {
		return new JW.AbstractMap.Observer(this, config);
	},

	/**
	 * Creates collection converter to array (orderer).
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} [config] Configuration (see synchronizer's Config options).
	 * @returns {JW.AbstractMap.Orderer}
	 * `<T>` Synchronizer.
	 */
	createOrderer: function(config) {
		return new JW.AbstractMap.Orderer(this, config);
	},

	/**
	 * Creates collection converter to array (sorter by comparer).
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} config Configuration (see synchronizer's Config options).
	 * @returns {JW.AbstractMap.SorterComparing}
	 * `<T>` Synchronizer.
	 */
	createSorterComparing: function(config) {
		return new JW.AbstractMap.SorterComparing(this, config);
	},

	/**
	 * Creates collection converter to map (indexer).
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} config Configuration (see synchronizer's Config options).
	 * @returns {JW.AbstractMap.Indexer}
	 * `<T>` Synchronizer.
	 */
	createIndexer: function(config) {
		return new JW.AbstractMap.Indexer(this, config);
	},

	/**
	 * Creates collection converter to set.
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} [config] Configuration (see synchronizer's Config options).
	 * @returns {JW.AbstractMap.Lister}
	 * `<T>` Synchronizer.
	 */
	createLister: function(config) {
		return new JW.AbstractMap.Lister(this, config);
	},

	/**
	 * Creates view synchronizer with map.
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} config Configuration (see synchronizer's Config options).
	 * @returns {JW.AbstractMap.Inserter}
	 * `<T>` Synchronizer.
	 */
	createInserter: function(config) {
		return new JW.AbstractMap.Inserter(this, config);
	},

	/**
	 * Checks for equality (===) to another map, item by item.
	 * @param {Object} map `<T>` Another map.
	 * @returns {boolean} Maps are equal.
	 */
	equal: function(map) {
		return JW.Map.equal(this.json, map);
	},

	_callStatic: function(algorithm, args) {
		return JW.Map[algorithm].apply(JW.Map, [this.json].concat(JW.args(args || [])));
	}

	/**
	 * @method createEmpty
	 * `<U>` Creates empty collection of the same type.
	 * @returns {JW.AbstractMap} `<U>` Collection.
	 */
});

/**
 * @class
 * `<T>` JW.AbstractMap#splice method arguments. Returned by JW.AbstractMap#detectSplice method.
 * @extends JW.Class
 *
 * @constructor
 * @param {Array} removedKeys `<string>` Keys to remove.
 * @param {Object} updatedItems `<T>` Items to add/replace.
 */
JW.AbstractMap.SpliceParams = function(removedKeys, updatedItems) {
	JW.AbstractMap.SpliceParams._super.call(this);
	this.removedKeys = removedKeys;
	this.updatedItems = updatedItems;
};

JW.extend(JW.AbstractMap.SpliceParams, JW.Class, {
	/**
	 * @property {Array} removedKeys `<string>` Keys to remove.
	 */
	/**
	 * @property {Object} updatedItems `<T>` Items to add/replace.
	 */
});

/**
 * @class
 * `<T>` JW.AbstractMap#splice method result.
 * @extends JW.Class
 *
 * @constructor
 * @param {Object} removedItems `<T>` Removed items.
 * @param {Object} addedItems `<T>` Added items.
 */
JW.AbstractMap.SpliceResult = function(removedItems, addedItems) {
	JW.AbstractMap.SpliceResult._super.call(this);
	this.removedItems = removedItems;
	this.addedItems = addedItems;
};

JW.extend(JW.AbstractMap.SpliceResult, JW.Class, {
	/**
	 * @property {Object} removedItems `<T>` Removed items.
	 */
	/**
	 * @property {Object} addedItems `<T>` Added items.
	 */
});
