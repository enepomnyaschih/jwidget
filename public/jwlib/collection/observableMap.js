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
 * Has several events and an observable property #length.
 *
 * See structurized list of methods in JW.AbstractMap.
 *
 * @extends JW.AbstractMap
 *
 * @constructor
 * @param {Object} [items] Initial contents. By default, created collection is empty.
 * @param {boolean} [adapter] Create map as adapter of `items`. Defaults to false, so `items` is copied.
 */
JW.ObservableMap = function(json, adapter) {
	JW.ObservableMap._super.call(this, json, adapter);
	this.length = new JW.Property(this.getLength());
	this.spliceEvent = new JW.Event();
	this.reindexEvent = new JW.Event();
	this.clearEvent = new JW.Event();
	this.changeEvent = new JW.Event();
};

JW.extend(JW.ObservableMap, JW.AbstractMap, {
	/**
	 * @property {JW.Property} length `<Number>` Collection length. **Don't modify manually!**
	 */
	/**
	 * @event spliceEvent
	 * Items are removed from map, items are added to map and items are updated in map. Triggered in result
	 * of calling #set, #trySet, #setAll, #trySetAll, #remove, #tryRemove, #removeItem, #removeAll, #tryRemoveAll,
	 * {@link #removeItems}, #splice, #trySplice, #performSplice.
	 * @param {JW.ObservableMap.SpliceEventParams} params `<T>` Parameters.
	 */
	/**
	 * @event reindexEvent
	 * Keys of items are changed in map. Triggered in result
	 * of calling #setKey, #trySetKey, #reindex, #tryReindex, #performReindex.
	 * @param {JW.ObservableMap.ReindexEventParams} params `<T>` Parameters.
	 */
	/**
	 * @event clearEvent
	 * Map is cleared. Triggered in result of calling #clear, #$clear, #tryClear.
	 * @param {JW.ObservableMap.ItemsEventParams} params `<T>` Parameters.
	 */
	/**
	 * @event changeEvent
	 * Map is changed. Triggered right after one
	 * of events #spliceEvent, #reindexEvent, #clearEvent.
	 * @param {JW.ObservableMap.EventParams} params `<T>` Parameters.
	 */

	// override
	destroyObject: function() {
		this.changeEvent.destroy();
		this.clearEvent.destroy();
		this.reindexEvent.destroy();
		this.spliceEvent.destroy();
		this.length.destroy();
		this._super();
	},

	// override
	trySet: function(item, key) {
		var result = this._trySet(item, key);
		if (result === undefined) {
			return;
		}
		var removedItems = {};
		var removedItem = result.get();
		if (removedItem !== undefined) {
			removedItems[key] = removedItem;
		}
		var addedItems = {};
		addedItems[key] = item;
		var spliceResult = new JW.AbstractMap.SpliceResult(removedItems, addedItems);
		this.length.set(this.getLength());
		this.spliceEvent.trigger(new JW.ObservableMap.SpliceEventParams(this, spliceResult));
		this.changeEvent.trigger(new JW.ObservableMap.EventParams(this));
		if ((removedItem !== undefined) && this._ownsItems) {
			removedItem.destroy();
		}
		return result;
	},

	// override
	setAll: function(items) {
		this.trySetAll(items);
	},

	// override
	trySetKey: function(oldKey, newKey) {
		var item = this._super(oldKey, newKey);
		if (item === undefined) {
			return;
		}
		this.reindexEvent.trigger(new JW.ObservableMap.ReindexEventParams(this, JW.Map.single(oldKey, newKey)));
		this.changeEvent.trigger(new JW.ObservableMap.EventParams(this));
		return item;
	},

	// override
	tryRemove: function(key) {
		var item = this._tryRemove(key);
		if (item === undefined) {
			return;
		}
		var spliceResult = new JW.AbstractMap.SpliceResult(JW.Map.single(key, item), {});
		this.length.set(this.getLength());
		this.spliceEvent.trigger(new JW.ObservableMap.SpliceEventParams(this, spliceResult));
		this.changeEvent.trigger(new JW.ObservableMap.EventParams(this));
		if (this._ownsItems) {
			item.destroy();
		}
		return item;
	},

	// override
	removeAll: function(keys) {
		this.tryRemoveAll(keys);
	},

	// override
	trySplice: function(removedKeys, updatedItems) {
		var spliceResult = this._trySplice(removedKeys, updatedItems);
		if (spliceResult === undefined) {
			return;
		}
		this.length.set(this.getLength());
		this.spliceEvent.trigger(new JW.ObservableMap.SpliceEventParams(this, spliceResult));
		this.changeEvent.trigger(new JW.ObservableMap.EventParams(this));
		if (this._ownsItems) {
			JW.Array.backEvery(JW.Map.toArray(spliceResult.removedItems), JW.destroy);
		}
		return spliceResult;
	},

	// override
	tryClear: function() {
		var items = this._tryClear();
		if (items === undefined) {
			return;
		}
		this.length.set(0);
		this.clearEvent.trigger(new JW.ObservableMap.ItemsEventParams(this, items));
		this.changeEvent.trigger(new JW.ObservableMap.EventParams(this));
		if (this._ownsItems) {
			JW.Array.backEvery(JW.Map.toArray(items), JW.destroy);
		}
		return items;
	},

	// override
	tryReindex: function(keyMap) {
		var result = this._super(keyMap);
		if (result === undefined) {
			return;
		}
		this.reindexEvent.trigger(new JW.ObservableMap.ReindexEventParams(this, result));
		this.changeEvent.trigger(new JW.ObservableMap.EventParams(this));
		return result;
	},

	/**
	 * `<U>` Creates empty collection of the same type.
	 * @returns {JW.ObservableMap} `<U>` Collection.
	 */
	createEmpty: function() {
		return new JW.ObservableMap();
	},

	/**
	 * `<U>` Creates empty array of the same observability level.
	 * @returns {JW.ObservableArray} `<U>` Array.
	 */
	createEmptyArray: function() {
		return new JW.ObservableArray();
	},

	/**
	 * `<U>` Creates empty map of the same observability level.
	 * @returns {JW.ObservableMap} `<U>` Map.
	 */
	createEmptyMap: function() {
		return new JW.ObservableMap();
	},

	/**
	 * `<U>` Creates empty set of the same observability level.
	 * @returns {JW.ObservableSet} `<U>` Set.
	 */
	createEmptySet: function() {
		return new JW.ObservableSet();
	},

	/**
	 * `<U>` Creates collection item mapper.
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} config Configuration (see synchronizer's Config options).
	 * @returns {JW.ObservableMap.Mapper}
	 * `<T, U>` Synchronizer.
	 */
	createMapper: function(config) {
		return new JW.ObservableMap.Mapper(this, config);
	},

	/**
	 * Creates collection filterer.
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} config Configuration (see synchronizer's Config options).
	 * @returns {JW.ObservableMap.Filterer}
	 * `<T>` Synchronizer.
	 */
	createFilterer: function(config) {
		return new JW.ObservableMap.Filterer(this, config);
	},

	/**
	 * Creates matching item counter.
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} config Configuration (see synchronizer's Config options).
	 * @returns {JW.ObservableMap.Counter}
	 * `<T>` Synchronizer.
	 */
	createCounter: function(config) {
		return new JW.ObservableMap.Counter(this, config);
	},

	/**
	 * Creates collection observer.
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} config Configuration (see synchronizer's Config options).
	 * @returns {JW.ObservableMap.Observer}
	 * `<T>` Synchronizer.
	 */
	createObserver: function(config) {
		return new JW.ObservableMap.Observer(this, config);
	},

	/**
	 * Creates collection converter to array (orderer).
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} [config] Configuration (see synchronizer's Config options).
	 * @returns {JW.ObservableMap.Orderer}
	 * `<T>` Synchronizer.
	 */
	createOrderer: function(config) {
		return new JW.ObservableMap.Orderer(this, config);
	},

	/**
	 * Creates collection converter to array (sorter by comparer).
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} config Configuration (see synchronizer's Config options).
	 * @returns {JW.ObservableMap.SorterComparing}
	 * `<T>` Synchronizer.
	 */
	createSorterComparing: function(config) {
		return new JW.ObservableMap.SorterComparing(this, config);
	},

	/**
	 * Creates collection converter to map (indexer).
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} config Configuration (see synchronizer's Config options).
	 * @returns {JW.ObservableMap.Indexer}
	 * `<T>` Synchronizer.
	 */
	createIndexer: function(config) {
		return new JW.ObservableMap.Indexer(this, config);
	},

	/**
	 * Creates collection converter to set.
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} [config] Configuration (see synchronizer's Config options).
	 * @returns {JW.ObservableMap.Lister}
	 * `<T>` Synchronizer.
	 */
	createLister: function(config) {
		return new JW.ObservableMap.Lister(this, config);
	},

	/**
	 * Creates view synchronizer with map.
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} config Configuration (see synchronizer's Config options).
	 * @returns {JW.ObservableMap.Inserter}
	 * `<T>` Synchronizer.
	 */
	createInserter: function(config) {
		return new JW.ObservableMap.Inserter(this, config);
	}
});

JW.apply(JW.ObservableMap.prototype, JW.ObservableCollection);

/**
 * @class
 * `<T>` JW.ObservableMap event parameters.
 * @extends JW.EventParams
 *
 * @constructor
 * @param {JW.ObservableMap} sender `<T>` Event sender.
 */
JW.ObservableMap.EventParams = function(sender) {
	JW.ObservableMap.EventParams._super.call(this, sender);
};

JW.extend(JW.ObservableMap.EventParams, JW.EventParams, {
	/**
	 * @property {JW.ObservableMap} sender `<T>` Event sender.
	 */
});

/**
 * @class
 *
 * `<T> extends JW.ObservableMap.EventParams<T>`
 *
 * Parameters of JW.ObservableMap#spliceEvent.
 *
 * @extends JW.ObservableMap.EventParams
 *
 * @constructor
 * @param {JW.ObservableMap} sender `<T>` Event sender.
 * @param {JW.AbstractMap.SpliceResult} spliceResult `<T>` Result of JW.AbstractMap#splice method.
 */
JW.ObservableMap.SpliceEventParams = function(sender, spliceResult) {
	JW.ObservableMap.SpliceEventParams._super.call(this, sender);
	this.spliceResult = spliceResult;
};

JW.extend(JW.ObservableMap.SpliceEventParams, JW.ObservableMap.EventParams, {
	/**
	 * @property {JW.AbstractMap.SpliceResult} spliceResult `<T>` Result of JW.AbstractMap#splice method.
	 */
});

/**
 * @class
 *
 * `<T> extends JW.ObservableMap.EventParams<T>`
 *
 * Parameters of JW.ObservableMap#reindexEvent.
 *
 * @extends JW.ObservableMap.EventParams
 *
 * @constructor
 * @param {JW.ObservableMap} sender `<T>` Event sender.
 * @param {Object} keyMap Map of changed keys.
 */
JW.ObservableMap.ReindexEventParams = function(sender, keyMap) {
	JW.ObservableMap.ReindexEventParams._super.call(this, sender);
	this.keyMap = keyMap;
};

JW.extend(JW.ObservableMap.ReindexEventParams, JW.ObservableMap.EventParams, {
	/**
	 * @property {Object} keyMap Map of changed keys.
	 */
});

/**
 * @class
 *
 * `<T> extends JW.ObservableMap.EventParams<T>`
 *
 * Parameters of JW.ObservableMap event which bring its old contents.
 *
 * @extends JW.ObservableMap.EventParams
 *
 * @constructor
 * @param {JW.ObservableMap} sender `<T>` Event sender.
 * @param {Object} items Old map contents.
 */
JW.ObservableMap.ItemsEventParams = function(sender, items) {
	JW.ObservableMap.ItemsEventParams._super.call(this, sender);
	this.items = items;
};

JW.extend(JW.ObservableMap.ItemsEventParams, JW.ObservableMap.EventParams, {
	/**
	 * @property {Object} items Old map contents.
	 */
});
