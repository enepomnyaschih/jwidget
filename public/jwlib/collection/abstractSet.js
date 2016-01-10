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
 * `<T extends JW.Class> extends JW.AbstractCollection<T>`
 *
 * Set is unordered collection optimized for items adding, removal and search. Unlike
 * array and map, set can contain only JW.Class instances. Internal set representation is
 * map from item {@link JW.Class#_iid iid} to this item.
 *
 * # Set methods
 *
 * **Difference compared to JW.AbstractCollection is in bold.**
 *
 * Content retrieving:
 *
 * - {@link #getLength} - Returns count of items in collection. For observable collections, `length` property may come
 * in handy if you want to track collection length dynamically.
 * - {@link #isEmpty} - Checks collection for emptiness.
 * - {@link #getFirst} - Returns first item in collection.
 * - {@link #containsItem}, **{@link #contains}** - Does collection contain the item?
 * - **{@link #getJson} - Returns internal representation of set.**
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
 * - {@link #filter}, #$filter, #$$filter - Filters collection by criteria.
 * Builds new collection of the same type, consisting of items matching the criteria.
 * - {@link #count}, #$count, #$$count - Counts the items matching criteria.
 * - {@link #map}, #$map, #$$mapValues, #$$mapObjects - Maps collection items.
 * Builds new collection of the same type, consisting of results of mapping function call for each collection item.
 * - {@link #toSorted}, #$toSorted, #toSortedComparing, #$toSortedComparing, #$$toSortedComparing -
 * Builds array consisting of collection items sorted by indexer or comparer.
 * - {@link #index}, #$index, #$$index - Indexes collection.
 * Builds new map by rule: key is the result of indexer function call, value is the corresponding item.
 * - {@link #toArray}, #$toArray, #$$toArray - Builds new array consisting of collection items.
 * - {@link #toSet}, #$toSet, #$$toSet - Builds new set consisting of collection items.
 * - {@link #asArray}, #$asArray - Represents collection as array.
 * - {@link #asSet}, #$asSet - Represents collection as set.
 *
 * Collection modification:
 *
 * - **{@link #add}, #tryAdd - Adds item to set.**
 * - **{@link #addAll}, #$addAll, #tryAddAll - Adds multiple items to set.**
 * - **{@link #remove}, #tryRemove - Removes item from set.**
 * - **{@link #removeAll}, #$removeAll, #tryRemoveAll - Removes multiple items from set.**
 * - {@link #removeItem} - Removes first occurency of an item in collection.
 * - {@link #removeItems} - Removes all occurencies of items in collection.
 * - {@link #clear}, #$clear, #tryClear - Clears collection.
 * - **{@link #splice}, #trySplice - Removes and adds multiple items.**
 * - **{@link #performSplice} - Adjusts contents using #splice method.**
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
 * Other methods:
 *
 * - **{@link #detectSplice} - Detects #splice method arguments to adjust contents.**
 * - **{@link #equal} - Checks for equality to array.**
 *
 * All the same algorithms are also available for native JavaScript Object as set, see JW.Set static methods.
 *
 * @extends JW.AbstractCollection
 * @abstract
 */
JW.AbstractSet = function(items, adapter) {
	JW.AbstractSet._super.call(this);
	this._adapter = !!adapter;
	this.json = this._adapter ? items : items ? JW.Array.index(items, JW.byField("_iid")) : {};
	this._length = JW.Set.getLength(this.json);
};

JW.extend(JW.AbstractSet, JW.AbstractCollection, {
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

	containsItem: function(item) {
		return this.json.hasOwnProperty(item._iid);
	},

	/**
	 * Checks item existance in collection. Shortcut for #containsItem.
	 * @param {T} item Item.
	 * @returns {boolean} Collection contains specified item.
	 */
	contains: function(item) {
		return this.json.hasOwnProperty(item._iid);
	},

	every: function(callback, scope) {
		return JW.Set.every(this.json, callback, scope);
	},

	/**
	 * Filters collection by criteria.
	 *
	 * Builds new collection of the same type, consisting of items for which `f` returns !== `false`.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T): boolean`
	 *
	 * Criteria.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {Object} `<T>` Filtered collection.
	 */
	filter: function(callback, scope) {
		return JW.Set.filter(this.json, callback, scope);
	},

	/**
	 * Filters collection by criteria.
	 *
	 * Builds new collection of the same type, consisting of items for which `f` returns !== `false`.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T): boolean`
	 *
	 * Criteria.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {JW.Set} `<T>` Filtered collection.
	 */
	$filter: JW.AbstractCollection._create$Set("filter"),

	count: function(callback, scope) {
		return JW.Set.count(this.json, callback, scope);
	},

	/**
	 * `<U>` Maps collection items.
	 *
	 * Builds new collection of the same type, consisting of results of `f` call for each collection item.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T): U`
	 *
	 * Mapping function.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {Object} `<U>` Mapped collection.
	 */
	map: function(callback, scope) {
		return JW.Set.map(this.json, callback, scope);
	},

	/**
	 * `<U>` Maps collection items.
	 *
	 * Builds new collection of the same type, consisting of results of `f` call for each collection item.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T): U`
	 *
	 * Mapping function.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {JW.Set} `<U>` Mapped collection.
	 */
	$map: JW.AbstractCollection._create$Set("map"),

	asSet: function() {
		return this.json;
	},

	$asSet: function() {
		return this;
	},

	/**
	 * Adds item to set if one is absent.
	 * @param {T} item Item.
	 * @returns {boolean} Item is added successfully.
	 */
	add: function(item) {
		return this.tryAdd(item) !== undefined;
	},

	/**
	 * Adds item to set if one is absent.
	 * @param {T} item Item.
	 * @returns {boolean} Item is added successfully. If not modified - `undefined`.
	 */
	tryAdd: function(item) {
		if (this.trySplice([], [item]) !== undefined) {
			return true;
		}
	},

	/**
	 * Adds multiple items to set, ones that are absent.
	 * @param {Array} items `<T>` Items.
	 * @returns {Array} `<T>` Added items.
	 */
	addAll: function(items) {
		var result = this.tryAddAll(items);
		return (result !== undefined) ? result : [];
	},

	/**
	 * Adds multiple items to set, ones that are absent.
	 * @param {Array} items `<T>` Items.
	 * @returns {JW.Array} `<T>` Added items.
	 */
	$addAll: JW.AbstractCollection._create$Array("addAll"),

	/**
	 * Adds multiple items to set, ones that are absent.
	 * @param {Array} items `<T>` Items.
	 * @returns {Array} `<T>` Added items. If not modified - `undefined`.
	 */
	tryAddAll: function(items) {
		var spliceResult = this.trySplice([], items);
		if (spliceResult !== undefined) {
			return spliceResult.addedItems;
		}
	},

	/**
	 * Removes item from set if one is present.
	 * @param {T} item Item.
	 * @returns {boolean} Item is removed successfully.
	 */
	remove: function(item) {
		return this.tryRemove(item) !== undefined;
	},

	/**
	 * Removes item from set if one is present.
	 * @param {T} item Item.
	 * @returns {boolean} Item is removed successfully. If not modified - `undefined`.
	 */
	tryRemove: function(item) {
		if (this.trySplice([item], []) !== undefined) {
			return true;
		}
	},

	removeItem: function(item) {
		this.tryRemove(item);
	},

	/**
	 * Removes multiple items from set, ones that are present.
	 * @param {Array} items `<T>` Items.
	 * @returns {Array} `<T>` Removed items.
	 */
	removeAll: function(items) {
		var result = this.tryRemoveAll(items);
		return (result !== undefined) ? result : [];
	},

	/**
	 * Removes multiple items from set, ones that are present.
	 * @param {Array} items `<T>` Items.
	 * @returns {JW.Array} `<T>` Removed items.
	 */
	$removeAll: JW.AbstractCollection._create$Array("removeAll"),

	/**
	 * Removes multiple items from set, ones that are present.
	 * @param {Array} items `<T>` Items.
	 * @returns {Array} `<T>` Removes items. If not modified - `undefined`.
	 */
	tryRemoveAll: function(items) {
		var spliceResult = this.trySplice(items, []);
		if (spliceResult !== undefined) {
			return spliceResult.removedItems;
		}
	},

	removeItems: function(items) {
		this.tryRemoveAll(items);
	},

	/**
	 * Clears collection.
	 * @returns {Array} `<T>` Old collection contents.
	 */
	clear: function() {
		var items = this.tryClear();
		return (items !== undefined) ? items : [];
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
		var items = this._tryClear();
		if ((items !== undefined) && this._ownsItems) {
			JW.Array.backEvery(items, JW.destroy);
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
			items = JW.Set.tryClear(this.json);
		} else {
			items = this.toArray();
			this.json = {};
		}
		return items;
	},

	/**
	 * Removes and adds multiple items in set. Universal optimized granular operation of removal/insertion.
	 * @param {Array} removedItems `<T>` Items to remove.
	 * @param {Array} addedItems `<T>` Items to add.
	 * @returns {JW.AbstractSet.SpliceResult} `<T>` Result.
	 */
	splice: function(removedItems, addedItems) {
		var spliceResult = this.trySplice(removedItems, addedItems);
		return (spliceResult !== undefined) ? spliceResult : new JW.AbstractSet.SpliceResult([], []);
	},

	/**
	 * Removes and adds multiple items in map. Universal optimized granular operation of removal/insertion.
	 * @param {Array} removedItems `<T>` Items to remove.
	 * @param {Array} addedItems `<T>` Items to add.
	 * @returns {JW.AbstractSet.SpliceResult} `<T>` Result. If not modified - `undefined`.
	 */
	trySplice: function(removedItems, addedItems) {
		var spliceResult = this._trySplice(removedItems, addedItems);
		if ((spliceResult !== undefined) && this._ownsItems) {
			JW.Array.backEvery(spliceResult.removedItems, JW.destroy);
		}
		return spliceResult;
	},

	_trySplice: function(removedItems, addedItems) {
		var spliceResult = JW.Set.trySplice(this.json, removedItems, addedItems);
		if (spliceResult !== undefined) {
			this._length += spliceResult.addedItems.length - spliceResult.removedItems.length;
			return spliceResult;
		}
	},

	/**
	 * Detects #splice method arguments to adjust set contents to `newItems`.
	 * Determines which items should be removed and which ones should be added.
	 * @param {Object} newItems `<T>` New set contents.
	 * @returns {JW.AbstractMap.SpliceParams}
	 * `<T>` #splice method arguments. If no method call required - `undefined`.
	 */
	detectSplice: function(newItems) {
		return JW.Set.detectSplice(this.json, newItems);
	},

	/**
	 * Adjusts set contents to `newItems` using #detectSplice and #splice methods.
	 * @param {Object} newItems `<T>` New set contents.
	 * @returns {void}
	 */
	performSplice: function(newItems) {
		var spliceParams = this.detectSplice(newItems);
		if (spliceParams !== undefined) {
			this.trySplice(spliceParams.removedItems, spliceParams.addedItems);
		}
	},

	/**
	 * `<U>` Creates collection item mapper.
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} config Configuration (see synchronizer's Config options).
	 * @returns {JW.AbstractSet.Mapper}
	 * `<T, U>` Synchronizer.
	 */
	createMapper: function(config) {
		return new JW.AbstractSet.Mapper(this, config);
	},

	/**
	 * Creates collection filterer.
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} config Configuration (see synchronizer's Config options).
	 * @returns {JW.AbstractSet.Filterer}
	 * `<T>` Synchronizer.
	 */
	createFilterer: function(config) {
		return new JW.AbstractSet.Filterer(this, config);
	},

	/**
	 * Creates matching item counter.
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} config Configuration (see synchronizer's Config options).
	 * @returns {JW.AbstractSet.Counter}
	 * `<T>` Synchronizer.
	 */
	createCounter: function(config) {
		return new JW.AbstractSet.Counter(this, config);
	},

	/**
	 * Creates collection observer.
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} config Configuration (see synchronizer's Config options).
	 * @returns {JW.AbstractSet.Observer}
	 * `<T>` Synchronizer.
	 */
	createObserver: function(config) {
		return new JW.AbstractSet.Observer(this, config);
	},

	/**
	 * Creates collection converter to array (orderer).
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} [config] Configuration (see synchronizer's Config options).
	 * @returns {JW.AbstractSet.Orderer}
	 * `<T>` Synchronizer.
	 */
	createOrderer: function(config) {
		return new JW.AbstractSet.Orderer(this, config);
	},

	/**
	 * Creates collection converter to array (sorter by comparer).
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} config Configuration (see synchronizer's Config options).
	 * @returns {JW.AbstractSet.SorterComparing}
	 * `<T>` Synchronizer.
	 */
	createSorterComparing: function(config) {
		return new JW.AbstractSet.SorterComparing(this, config);
	},

	/**
	 * Creates collection converter to map (indexer).
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} config Configuration (see synchronizer's Config options).
	 * @returns {JW.AbstractSet.Indexer}
	 * `<T>` Synchronizer.
	 */
	createIndexer: function(config) {
		return new JW.AbstractSet.Indexer(this, config);
	},

	/**
	 * Creates collection converter to set.
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} [config] Configuration (see synchronizer's Config options).
	 * @returns {JW.AbstractSet.Lister}
	 * `<T>` Synchronizer.
	 */
	createLister: function(config) {
		return new JW.AbstractSet.Lister(this, config);
	},

	/**
	 * Checks for equality (===) to array, item by item.
	 * @param {Array} array `<T>` Array.
	 * @returns {boolean} Set is equal to array.
	 */
	equal: function(array) {
		return JW.Set.equal(this.json, array);
	},

	_callStatic: function(algorithm, args) {
		return JW.Set[algorithm].apply(JW.Set, [this.json].concat(JW.args(args || [])));
	}

	/**
	 * @method createEmpty
	 * `<U>` Creates empty collection of the same type.
	 * @returns {JW.AbstractSet} `<U>` Collection.
	 */
});

/**
 * @class
 * `<T>` JW.AbstractSet#splice method arguments. Returned by JW.AbstractSet#detectSplice method.
 * @extends JW.Class
 *
 * @constructor
 * @param {Array} removedItems `<T>` Items to remove.
 * @param {Array} addedItems `<T>` Items to add.
 */
JW.AbstractSet.SpliceParams = function(removedItems, addedItems) {
	JW.AbstractSet.SpliceParams._super.call(this);
	this.removedItems = removedItems;
	this.addedItems = addedItems;
};

JW.extend(JW.AbstractSet.SpliceParams, JW.Class, {
	/**
	 * @property {Array} removedItems `<T>` Items to remove.
	 */
	/**
	 * @property {Array} addedItems `<T>` Items to add.
	 */
});

/**
 * @class
 * `<T>` JW.AbstractSet#splice method result.
 * @extends JW.Class
 *
 * @constructor
 * @param {Array} removedItems `<T>` Removed items.
 * @param {Array} addedItems `<T>` Added items.
 */
JW.AbstractSet.SpliceResult = function(removedItems, addedItems) {
	JW.AbstractSet.SpliceResult._super.call(this);
	this.removedItems = removedItems;
	this.addedItems = addedItems;
};

JW.extend(JW.AbstractSet.SpliceResult, JW.Class, {
	/**
	 * @property {Array} removedItems `<T>` Removed items.
	 */
	/**
	 * @property {Array} addedItems `<T>` Added items.
	 */
});
