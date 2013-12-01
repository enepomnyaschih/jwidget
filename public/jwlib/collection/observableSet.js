﻿/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
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
 *
 * @extends JW.AbstractSet
 *
 * @constructor
 * @param {Array} [items] `<T>` Initial contents. By default, created collection is empty.
 * @param {boolean} [adapter] Create set as adapter of `items` (`items` should be Object for this, not Array).
 * Defaults to false, so `items` is copied.
 */
JW.ObservableSet = function(json, adapter) {
	JW.ObservableSet._super.call(this, json, adapter);
	this.spliceEvent = new JW.Event();
	this.clearEvent = new JW.Event();
	this.changeEvent = new JW.Event();
	this.lengthChangeEvent = new JW.Event();
	this._lastLength = this.getLength();
};

JW.extend(JW.ObservableSet, JW.AbstractSet, {
	/**
	 * @event spliceEvent
	 * Items are removed from set, items are added to set. Triggered in result
	 * of calling #add, #tryAdd, #addAll, #$addAll, #tryAddAll, #remove, #tryRemove, #removeItem, #removeAll, #$removeAll,
	 * {@link #tryRemoveAll}, #removeItems, #splice, #trySplice, #performSplice.
	 * @param {JW.ObservableSet.SpliceEventParams} params `<T>` Parameters.
	 */
	/**
	 * @event clearEvent
	 * Set is cleared. Triggered in result of calling #clear, #$clear, #tryClear.
	 * @param {JW.ObservableSet.ItemsEventParams} params `<T>` Parameters.
	 */
	/**
	 * @event changeEvent
	 * Set is changed. Triggered right after one
	 * of events #spliceEvent, #clearEvent.
	 * @param {JW.ObservableSet.EventParams} params `<T>` Parameters.
	 */
	/**
	 * @event lengthChangeEvent
	 * Set length is changed. Triggered right after #changeEvent if set length has changed.
	 * @param {JW.ObservableSet.LengthChangeEventParams} params `<T>` Parameters.
	 */
	
	// override
	destroy: function() {
		this.lengthChangeEvent.destroy();
		this.changeEvent.destroy();
		this.clearEvent.destroy();
		this.spliceEvent.destroy();
		this._super();
	},
	
	// override
	tryClear: function() {
		var items = this._super();
		if (items === undefined) {
			return;
		}
		this.clearEvent.trigger(new JW.ObservableSet.ItemsEventParams(this, items));
		this._triggerChange();
		return items;
	},
	
	// override
	trySplice: function(removedItems, addedItems) {
		var spliceResult = this._super(removedItems, addedItems);
		if (spliceResult === undefined) {
			return;
		}
		this.spliceEvent.trigger(new JW.ObservableSet.SpliceEventParams(this, spliceResult));
		this._triggerChange();
		return spliceResult;
	},
	
	/**
	 * `<U>` Creates empty collection of the same type.
	 * @returns {JW.ObservableSet} `<U>` Collection.
	 */
	createEmpty: function() {
		return new JW.ObservableSet();
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
	 * @returns {JW.ObservableSet.Mapper}
	 * `<T, U>` Synchronizer.
	 */
	createMapper: function(config) {
		return new JW.ObservableSet.Mapper(this, config);
	},
	
	/**
	 * Creates collection filterer.
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} config Configuration (see synchronizer's Config options).
	 * @returns {JW.ObservableSet.Filterer}
	 * `<T>` Synchronizer.
	 */
	createFilterer: function(config) {
		return new JW.ObservableSet.Filterer(this, config);
	},
	
	/**
	 * Creates collection observer.
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} config Configuration (see synchronizer's Config options).
	 * @returns {JW.ObservableSet.Observer}
	 * `<T>` Synchronizer.
	 */
	createObserver: function(config) {
		return new JW.ObservableSet.Observer(this, config);
	},
	
	/**
	 * Creates collection converter to array (orderer).
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} config Configuration (see synchronizer's Config options).
	 * @returns {JW.ObservableSet.Orderer}
	 * `<T>` Synchronizer.
	 */
	createOrderer: function(config) {
		return new JW.ObservableSet.Orderer(this, config);
	},
	
	/**
	 * Creates collection converter to array (sorter by comparer).
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} config Configuration (see synchronizer's Config options).
	 * @returns {JW.ObservableSet.SorterComparing}
	 * `<T>` Synchronizer.
	 */
	createSorterComparing: function(config) {
		return new JW.ObservableSet.SorterComparing(this, config);
	},
	
	/**
	 * Creates collection converter to map (indexer).
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} config Configuration (see synchronizer's Config options).
	 * @returns {JW.ObservableSet.Indexer}
	 * `<T>` Synchronizer.
	 */
	createIndexer: function(config) {
		return new JW.ObservableSet.Indexer(this, config);
	},
	
	/**
	 * Creates collection converter to set.
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} config Configuration (see synchronizer's Config options).
	 * @returns {JW.ObservableSet.Lister}
	 * `<T>` Synchronizer.
	 */
	createLister: function(config) {
		return new JW.ObservableSet.Lister(this, config);
	},
	
	_triggerChange: function() {
		this.changeEvent.trigger(new JW.ObservableSet.EventParams(this));
		var newLength = this.getLength();
		if (this._lastLength !== newLength) {
			this.lengthChangeEvent.trigger(new JW.ObservableSet.LengthChangeEventParams(this, this._lastLength, newLength));
			this._lastLength = newLength;
		}
	}
});

/**
 * @class
 * `<T>` JW.ObservableSet event parameters.
 * @extends JW.EventParams
 *
 * @constructor
 * @param {JW.ObservableSet} sender `<T>` Event sender.
 */
JW.ObservableSet.EventParams = function(sender) {
	JW.ObservableSet.EventParams._super.call(this, sender);
};

JW.extend(JW.ObservableSet.EventParams, JW.EventParams, {
	/**
	 * @property {JW.ObservableSet} sender `<T>` Event sender.
	 */
});

/**
 * @class
 *
 * `<T> extends JW.ObservableSet.EventParams<T>`
 *
 * Parameters of JW.ObservableSet#spliceEvent.
 *
 * @extends JW.ObservableSet.EventParams
 *
 * @constructor
 * @param {JW.ObservableSet} sender `<T>` Event sender.
 * @param {JW.AbstractSet.SpliceResult} spliceResult `<T>` Result of JW.AbstractSet#splice method.
 */
JW.ObservableSet.SpliceEventParams = function(sender, spliceResult) {
	JW.ObservableSet.SpliceEventParams._super.call(this, sender);
	this.spliceResult = spliceResult;
};

JW.extend(JW.ObservableSet.SpliceEventParams, JW.ObservableSet.EventParams, {
	/**
	 * @property {JW.AbstractSet.SpliceResult} spliceResult `<T>` Result of JW.AbstractSet#splice method.
	 */
});

/**
 * @class
 *
 * `<T> extends JW.ObservableSet.EventParams<T>`
 *
 * Parameters of JW.ObservableSet event which bring its old contents.
 *
 * @extends JW.ObservableSet.EventParams
 *
 * @constructor
 * @param {JW.ObservableSet} sender `<T>` Event sender.
 * @param {Array} items `<T>` Old set contents.
 */
JW.ObservableSet.ItemsEventParams = function(sender, items) {
	JW.ObservableSet.ItemsEventParams._super.call(this, sender);
	this.items = items;
};

JW.extend(JW.ObservableSet.ItemsEventParams, JW.ObservableSet.EventParams, {
	/**
	 * @property {Array} items `<T>` Old set contents.
	 */
});

/**
 * @class
 *
 * `<T> extends JW.ObservableSet.EventParams<T>`
 *
 * Parameters of JW.ObservableSet#lengthChangeEvent.
 *
 * @extends JW.ObservableSet.EventParams
 *
 * @constructor
 * @param {JW.ObservableSet} sender `<T>` Event sender.
 * @param {number} oldLength Old collection length.
 * @param {number} newLength New collection length.
 */
JW.ObservableSet.LengthChangeEventParams = function(sender, oldLength, newLength) {
	JW.ObservableSet.LengthChangeEventParams._super.call(this, sender);
	this.oldLength = oldLength;
	this.newLength = newLength;
};

JW.extend(JW.ObservableSet.LengthChangeEventParams, JW.ObservableSet.EventParams, {
	/**
	 * @property {number} oldLength Old collection length.
	 */
	/**
	 * @property {number} newLength New collection length.
	 */
});
