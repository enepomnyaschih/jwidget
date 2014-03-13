/*
	jWidget Lib source file.
	
	Copyright (C) 2014 Egor Nepomnyaschih
	
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
 * `<T>` Abstract collection of items of type T.
 *
 * There are 3 collection types:
 *
 * - JW.AbstractArray, extends JW.IndexedCollection
 * - JW.AbstractMap, extends JW.IndexedCollection
 * - JW.AbstractSet
 *
 * You can convert collections to each other using algorithms.
 *
 * Each collection has 2 implementations:
 *
 * - Simple collections: JW.Array, JW.Map, JW.Set
 * - Observable collection: JW.ObservableArray, JW.ObservableMap, JW.ObservableSet
 *
 * The difference is that observable collection triggers the events about its modifications.
 * It lets you to synchronize view with data on fly in accordance to Model-View architecture.
 * The next synchronizers exist to connect observable collections to each other:
 *
 * - Item mapper: JW.AbstractCollection.Mapper
 * - Filterer: JW.AbstractCollection.Filterer
 * - Converter to set: JW.AbstractCollection.Lister
 * - Converter to map (indexer): JW.AbstractCollection.Indexer
 * - Converter to array (orderer): JW.AbstractCollection.Orderer
 * - Converter to array (sorter by comparer): JW.AbstractCollection.SorterComparing
 * - Observer: JW.AbstractCollection.Observer
 * - View synchronizers: JW.AbstractArray.Inserter, JW.AbstractMap.Inserter
 * - Arrays merger: JW.AbstractArray.Merger
 * - Array reverser: JW.AbstractArray.Reverser
 *
 * Simple collections are very similar to native JavaScript collections.
 * The main aim of them is compatibility: they have the same API as observable collections, but work a bit faster.
 *
 * Please keep in mind the next rules whenever you work with jWidget collections.
 *
 * 1) `null` and `undefined` are denied to be added into jWidget collection.
 * Use "Null Object" pattern if it is neccessary.
 *
 * 2) The majority of collection modification methods have 2 implementations: `tryMethod` and `method`.
 * These methods perform the same modification but return different result.
 * First implementation is introduced for internal use mainly,
 * and <em>it always returns `undefined` if collection has not been modified</em>.
 * For example, #tryClear will return `undefined` if collection is empty,
 * else it will return old collection contents.
 * Second implementation returns result in more friendly format.
 * For example, #clear always returns old collection contents.
 * So, if you want to clear collection and destroy all items, #clear method will fit better:
 *
 *     JW.Array.each(array.{@link JW.AbstractArray#clear clear}(), JW.destroy); // correct
 *     JW.Array.each(array.{@link JW.AbstractArray#clear tryClear}(), JW.destroy); // incorrect: 'undefined' exception if array is empty
 *
 * 3) All methods which return collection have 2 implementations: `method` and `$method`.
 * These methods perform the same modification but return the result in different format.
 * First implementation returns native JavaScript collection: Array or Object.
 * Second implementation returns jWidget adapter: JW.Array, JW.Map or JW.Set.
 * Use one method that's more convenient in your specific situation.
 * For example, `$method` is convenient for chaining algorithm method calls.
 * So, previous example can be changed next way:
 *
 *     array.{@link JW.AbstractArray#$clear $clear}().{@link JW.AbstractArray#each each}(JW.destroy);
 *
 * But in next example `method` is more appropriate:
 *
 *     set.{@link JW.AbstractArray#addAll addAll}(array.{@link JW.AbstractArray#clear clear}());
 *
 * 4) It is better if all items in collection are unique. Some methods like
 * JW.AbstractArray#performReorder require each item to have an unique key.
 * If 2 items of collection are equal, then their keys are equal as well, so this method won't work correctly.
 *
 * # Collection methods
 *
 * Content retrieving:
 *
 * - {@link #getLength} - Returns count of items in collection.
 * - {@link #isEmpty} - Checks collection for emptiness.
 * - {@link #getFirst} - Returns first item in collection.
 * - {@link #containsItem} - Does collection contain the item?
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
 * - {@link #filter}, #$filter - Filters collection by criteria.
 * Builds new collection of the same type, consisting of items matching the criteria.
 * - {@link #map}, #$map - Maps collection items.
 * Builds new collection of the same type, consisting of results of mapping function call for each collection item.
 * - {@link #toSorted}, #$toSorted, #toSortedComparing, #$toSortedComparing -
 * Builds array consisting of collection items sorted by indexer or comparer.
 * - {@link #index}, #$index - Indexes collection.
 * Builds new map by rule: key is the result of indexer function call, value is the corresponding item.
 * - {@link #toArray}, #$toArray - Builds new array consisting of collection items.
 * - {@link #toSet}, #$toSet - Builds new set consisting of collection items.
 * - {@link #asArray}, #$asArray - Represents collection as array.
 * - {@link #asSet}, #$asSet - Represents collection as set.
 *
 * Collection modification:
 *
 * - {@link #removeItem} - Removes first occurency of an item in collection.
 * - {@link #removeItems} - Removes all occurencies of items in collection.
 * - {@link #clear}, #$clear, #tryClear - Clears collection.
 *
 * Synchronizers creation:
 *
 * - {@link #createMapper} - Creates item mapper.
 * - {@link #createFilterer} - Creates filterer.
 * - {@link #createLister} - Creates converter to set.
 * - {@link #createIndexer} - Creates converter to map (indexer).
 * - {@link #createOrderer} - Creates converter to array (orderer).
 * - {@link #createSorterComparing} - Creates converter to array (sorter by comparer).
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
 * - Object as set, see JW.Set static methods.
 *
 * @extends JW.Class
 * @abstract
 */
JW.AbstractCollection = function() {
	JW.AbstractCollection._super.call(this);
	this.own(new JW.AbstractCollection.Content(this));
};

JW.AbstractCollection._create$Array = function(algorithm) {
	return function() {
		return new JW.Array(this[algorithm].apply(this, arguments), true);
	};
};

JW.AbstractCollection._create$Map = function(algorithm) {
	return function() {
		return new JW.Map(this[algorithm].apply(this, arguments), true);
	};
};

JW.AbstractCollection._create$Set = function(algorithm) {
	return function() {
		return new JW.Set(this[algorithm].apply(this, arguments), true);
	};
};

JW.extend(JW.AbstractCollection, JW.Class, {
	ownItems: function() {
		this.own(new JW.AbstractCollection.ItemOwner(this));
		return this;
	},
	
	/**
	 * @method getLength
	 * Returns count of items in collection.
	 * @returns {number} Count of items in collection.
	 */
	/**
	 * @method isEmpty
	 * Checks collection for emptiness.
	 * @returns {boolean} Collection doesn't contain any items.
	 */
	/**
	 * Returns first item in collection. If collection is empty, returns `undefined`.
	 * @returns {T} Item.
	 */
	getFirst: function() {
		return this._callStatic("getFirst");
	},
	
	/**
	 * @method containsItem
	 * Checks item existance in collection.
	 * @param {T} item Item.
	 * @returns {boolean} Collection contains specified item.
	 */
	/**
	 * @method removeItem
	 * Removes first occurency of an item in collection.
	 * @param {T} item Item.
	 * @returns {void}
	 */
	/**
	 * @method removeItems
	 * Removes all occurencies of items in collection.
	 * Works for `<T extends JW.Class>` only.
	 * @param {Array} items `<T>` Item.
	 * @returns {void}
	 */
	/**
	 * @method tryClear
	 * Clears collection.
	 * @returns {Array/Object} `<T>` Old collection contents. If not modified - `undefined`.
	 */
	/**
	 * @method clear
	 * Clears collection.
	 * @returns {Array/Object} `<T>` Old collection contents.
	 */
	/**
	 * @method $clear
	 * Clears collection.
	 * @returns {JW.AbstractCollection} `<T>` Old collection contents.
	 */
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
	 * `f(item: T): boolean`
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
	 * `f(item: T): boolean`
	 *
	 * Criteria.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {boolean} Result.
	 */
	some: function(callback, scope) {
		return !this.every(function(item) {
			return callback.call(this, item) === false;
		}, scope);
	},
	
	/**
	 * Iterates collection items. Calls specified function for all items.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T): void`
	 *
	 * Function.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {void}
	 */
	each: function(callback, scope) {
		this.every(function(item) {
			callback.call(this, item);
			return true;
		}, scope);
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
	 * `f(item: T): boolean`
	 *
	 * Criteria.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {T} Found item or `undefined`.
	 */
	search: function(callback, scope) {
		var result;
		this.every(function(item) {
			if (callback.call(this, item) !== false) {
				result = item;
				return false;
			}
			return true;
		}, scope);
		return result;
	},
	
	/**
	 * Converts collection to sorted array.
	 *
	 * Builds array consisting of collection items sorted by result of `f` call for each item.
	 *
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
	toSorted: function(callback, scope, order) {
		return this._callStatic("toSorted", [callback, scope || this, order]);
	},
	
	/**
	 * Converts collection to sorted array.
	 *
	 * Builds array consisting of collection items sorted by result of `f` call for each item.
	 *
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
	$toSorted: JW.AbstractCollection._create$Array("toSorted"),
	
	/**
	 * Converts collection to sorted array.
	 *
	 * Builds array consisting of collection items sorted by comparer.
	 *
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
	toSortedComparing: function(compare, scope, order) {
		return this._callStatic("toSortedComparing", [compare, scope || this, order]);
	},
	
	/**
	 * Converts collection to sorted array.
	 *
	 * Builds array consisting of collection items sorted by comparer.
	 *
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
	$toSortedComparing: JW.AbstractCollection._create$Array("toSortedComparing"),
	
	/**
	 * Indexes collection.
	 *
	 * Builds new map by rule: key is the result of indexer function call, value is the corresponding item.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T): string`
	 *
	 * Indexer function.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {Object} `<T>` Collection index.
	 */
	index: function(callback, scope) {
		var result = {};
		this.every(function(item) {
			var key = callback.call(this, item);
			if (JW.isSet(key)) {
				result[key] = item;
			}
			return true;
		}, scope);
		return result;
	},
	
	/**
	 * Indexes collection.
	 *
	 * Builds new map by rule: key is the result of indexer function call, value is the corresponding item.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T): string`
	 *
	 * Indexer function.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {JW.Map} `<T>` Collection index.
	 */
	$index: JW.AbstractCollection._create$Map("index"),
	
	/**
	 * Converts collection to array.
	 *
	 * Builds new array consisting of collection items.
	 *
	 * @returns {Array} `<T>` Items array.
	 */
	toArray: function() {
		var result = new Array(this.getLength());
		var index = 0;
		this.every(function(item) {
			result[index++] = item;
		});
		return result;
	},
	
	/**
	 * Converts collection to array.
	 *
	 * Builds new array consisting of collection items.
	 *
	 * @returns {JW.Array} `<T>` Items array.
	 */
	$toArray: JW.AbstractCollection._create$Array("toArray"),
	
	/**
	 * Converts collection to set.
	 *
	 * Builds new set consisting of collection items.
	 *
	 * @returns {Object} `<T>` Items set.
	 */
	toSet: function() {
		var result = {};
		this.every(function(item) {
			JW.Set.add(result, item);
		});
		return result;
	},
	
	/**
	 * Converts collection to set.
	 *
	 * Builds new set consisting of collection items.
	 *
	 * @returns {JW.Set} `<T>` Items set.
	 */
	$toSet: JW.AbstractCollection._create$Set("toSet"),
	
	/**
	 * Represents collection as array.
	 *
	 * If this collection is array, returns it immediately. Else, executes #toArray method.
	 * This method works probably faster than #toArray, but please make sure that the returned array
	 * won't be modified externally, because it can cause strange unexpected bugs.
	 *
	 * @returns {Array} `<T>` Items array.
	 */
	asArray: function() {
		return this.toArray();
	},
	
	/**
	 * Represents collection as array.
	 *
	 * If this collection is array, returns it immediately. Else, executes #toArray method.
	 * This method works probably faster than #toArray, but please make sure that the returned array
	 * won't be modified externally, because it can cause strange unexpected bugs.
	 *
	 * @returns {JW.Array} `<T>` Items array
	 */
	$asArray: JW.AbstractCollection._create$Array("asArray"),
	
	/**
	 * Represents collection as set.
	 *
	 * If this collection is set, returns it immediately. Else, executes #toSet method.
	 * This method works probably faster than #toSet, but please make sure that the returned set
	 * won't be modified externally, because it can cause strange unexpected bugs.
	 *
	 * @returns {Object} `<T>` Items set.
	 */
	asSet: function() {
		return this.toSet();
	},
	
	/**
	 * Represents collection as set.
	 *
	 * If this collection is set, returns it immediately. Else, executes #toSet method.
	 * This method works probably faster than #toSet, but please make sure that the returned set
	 * won't be modified externally, because it can cause strange unexpected bugs.
	 *
	 * @returns {JW.Set} `<T>` Items set.
	 */
	$asSet: JW.AbstractCollection._create$Set("asSet")
	
	/**
	 * @method filter
	 *
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
	 * `f(item: T): boolean`
	 *
	 * Criteria.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {JW.AbstractCollection} `<T>` Filtered collection.
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
	 * `f(item: T): U`
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
	 * `f(item: T): U`
	 *
	 * Mapping function.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {JW.AbstractCollection} `<U>` Mapped collection.
	 */
	
	/**
	 * @method createEmpty
	 * `<U>` Creates empty collection of the same type.
	 * @returns {JW.AbstractCollection} `<U>` Collection.
	 */
	/**
	 * @method createEmptyArray
	 * `<U>` Creates empty array of the same observability level.
	 * @returns {JW.AbstractArray} `<U>` Array.
	 */
	/**
	 * @method createEmptyMap
	 * `<U>` Creates empty map of the same observability level.
	 * @returns {JW.AbstractMap} `<U>` Map.
	 */
	/**
	 * @method createEmptySet
	 * `<U>` Creates empty set of the same observability level.
	 * @returns {JW.AbstractSet} `<U>` Set.
	 */
	/**
	 * @method createMapper
	 * `<U>` Creates collection item mapper.
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} config Configuration (see synchronizer's Config options).
	 * @returns {JW.AbstractCollection.Mapper}
	 * `<T, U, JW.AbstractCollection<T>, JW.AbstractCollection<U>>` Synchronizer.
	 */
	/**
	 * @method createFilterer
	 * Creates collection filterer.
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} config Configuration (see synchronizer's Config options).
	 * @returns {JW.AbstractCollection.Filterer}
	 * `<T, JW.AbstractCollection<T>>` Synchronizer.
	 */
	/**
	 * @method createObserver
	 * Creates collection observer.
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} config Configuration (see synchronizer's Config options).
	 * @returns {JW.AbstractCollection.Observer}
	 * `<T, JW.AbstractCollection<T>>` Synchronizer.
	 */
	/**
	 * @method createOrderer
	 * Creates collection converter to array (orderer).
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} config Configuration (see synchronizer's Config options).
	 * @returns {JW.AbstractCollection.Orderer}
	 * `<T, JW.AbstractCollection<T>>` Synchronizer.
	 */
	/**
	 * @method createSorterComparing
	 * Creates collection converter to array (sorter by comparer).
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} config Configuration (see synchronizer's Config options).
	 * @returns {JW.AbstractCollection.SorterComparing}
	 * `<T, JW.AbstractCollection<T>>` Synchronizer.
	 */
	/**
	 * @method createIndexer
	 * Creates collection converter to map (indexer).
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} config Configuration (see synchronizer's Config options).
	 * @returns {JW.AbstractCollection.Indexer}
	 * `<T, JW.AbstractCollection<T>>` Synchronizer.
	 */
	/**
	 * @method createLister
	 * Creates collection converter to set.
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} config Configuration (see synchronizer's Config options).
	 * @returns {JW.AbstractCollection.Lister}
	 * `<T, JW.AbstractCollection<T>>` Synchronizer.
	 */
});

JW.AbstractCollection.Content = function(collection) {
	JW.AbstractCollection.Content._super.call(this);
	this.collection = collection;
};

JW.extend(JW.AbstractCollection.Content, JW.Class, {
	destroy: function() {
		this.collection.tryClear();
		this._super();
	}
});
