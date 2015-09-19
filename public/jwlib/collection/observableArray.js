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
 * `<T> extends JW.AbstractArray<T>`
 *
 * Has several events and an observable property #length.
 *
 * See structurized list of methods in JW.AbstractArray.
 *
 * @extends JW.AbstractArray
 *
 * @constructor
 * @param {Array} [items] `<T>` Initial contents. By default, created collection is empty.
 * @param {boolean} [adapter] Create array as adapter of `items`. Defaults to false, so `items` is copied.
 */
JW.ObservableArray = function(items, adapter) {
	JW.ObservableArray._super.call(this, items, adapter);
	this.length = new JW.Property(this.getLength());
	this.spliceEvent = new JW.Event();
	this.replaceEvent = new JW.Event();
	this.moveEvent = new JW.Event();
	this.clearEvent = new JW.Event();
	this.reorderEvent = new JW.Event();
	this.changeEvent = new JW.Event();
};

JW.extend(JW.ObservableArray, JW.AbstractArray, {
	/**
	 * @property {JW.Property} length `<Number>` Collection length. **Don't modify manually!**
	 */
	/**
	 * @event spliceEvent
	 * Items are removed from array and items are added to array. Triggered in result
	 * of calling #add, #tryAdd, #addAll, #tryAddAll, #remove, #tryRemove, #removeItem, #pop, #removeAll, #tryRemoveAll,
	 * {@link #removeItems}, #splice, #trySplice, #performSplice.
	 * @param {JW.ObservableArray.SpliceEventParams} params `<T>` Parameters.
	 */
	/**
	 * @event replaceEvent
	 * Item is replaced in array. Triggered in result of calling #set, #trySet.
	 * @param {JW.ObservableArray.ReplaceEventParams} params `<T>` Parameters.
	 */
	/**
	 * @event moveEvent
	 * Item is moved in array. Triggered in result of calling #move, #tryMove.
	 * @param {JW.ObservableArray.MoveEventParams} params `<T>` Parameters.
	 */
	/**
	 * @event clearEvent
	 * Array is cleared. Triggered in result of calling #clear, #$clear, #tryClear.
	 * @param {JW.ObservableArray.ItemsEventParams} params `<T>` Parameters.
	 */
	/**
	 * @event reorderEvent
	 * Items are reordered in array. Triggered in result
	 * of calling #reorder, #tryReorder, #performReorder, #sort, #sortComparing.
	 * @param {JW.ObservableArray.ReorderEventParams} params `<T>` Parameters.
	 */
	/**
	 * @event changeEvent
	 * Array is changed. Triggered right after one
	 * of events #spliceEvent, #replaceEvent, #moveEvent, #clearEvent, #reorderEvent.
	 * @param {JW.ObservableArray.EventParams} params `<T>` Parameters.
	 */

	// override
	destroyObject: function() {
		this.changeEvent.destroy();
		this.reorderEvent.destroy();
		this.clearEvent.destroy();
		this.moveEvent.destroy();
		this.replaceEvent.destroy();
		this.spliceEvent.destroy();
		this.length.destroy();
		this._super();
	},

	// override
	trySet: function(item, index) {
		var oldItem = this._trySet(item, index);
		if (oldItem === undefined) {
			return;
		}
		this.replaceEvent.trigger(new JW.ObservableArray.ReplaceEventParams(this, index, oldItem.value, item));
		this.changeEvent.trigger(new JW.ObservableArray.EventParams(this));
		if (this._ownsItems) {
			oldItem.get().destroy();
		}
		return oldItem;
	},

	// override
	tryMove: function(fromIndex, toIndex) {
		var item = this._super(fromIndex, toIndex);
		if (item === undefined) {
			return;
		}
		this.moveEvent.trigger(new JW.ObservableArray.MoveEventParams(this, fromIndex, toIndex, item));
		this.changeEvent.trigger(new JW.ObservableArray.EventParams(this));
		return item;
	},

	// override
	tryClear: function() {
		var oldItems = this._tryClear();
		if (oldItems === undefined) {
			return;
		}
		this.length.set(0);
		this.clearEvent.trigger(new JW.ObservableArray.ItemsEventParams(this, oldItems));
		this.changeEvent.trigger(new JW.ObservableArray.EventParams(this));
		if (this._ownsItems) {
			JW.Array.backEvery(oldItems, JW.destroy);
		}
		return oldItems;
	},

	// override
	trySplice: function(removeParamsList, addParamsList) {
		var result = this._trySplice(removeParamsList, addParamsList);
		if (result === undefined) {
			return;
		}
		this.length.set(this.getLength());
		this.spliceEvent.trigger(new JW.ObservableArray.SpliceEventParams(this, result));
		this.changeEvent.trigger(new JW.ObservableArray.EventParams(this));
		if (this._ownsItems) {
			JW.Array.backEvery(result.getRemovedItems(), JW.destroy);
		}
		return result;
	},

	// override
	tryReorder: function(indexArray) {
		var items = this._super(indexArray);
		if (items === undefined) {
			return;
		}
		this.reorderEvent.trigger(new JW.ObservableArray.ReorderEventParams(this, indexArray, items));
		this.changeEvent.trigger(new JW.ObservableArray.EventParams(this));
		return items;
	},

	// override
	reverse: function() {
		var length = this.getLength();
		var indices = new Array(length);
		for (var i = 0; i < length; ++i) {
			indices[i] = length - i - 1;
		}
		this.reorder(indices);
	},

	// override
	$$toReversed: function() {
		var result = new JW.ObservableArray();
		result.own(this.createReverser({
			target: result
		}));
		return result;
	},

	/**
	 * `<U>` Creates empty collection of the same type.
	 * @returns {JW.ObservableArray} `<U>` Collection.
	 */
	createEmpty: function() {
		return new JW.ObservableArray();
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
	 * @returns {JW.ObservableArray.Mapper}
	 * `<T, U>` Synchronizer.
	 */
	createMapper: function(config) {
		return new JW.ObservableArray.Mapper(this, config);
	},

	/**
	 * Creates collection filterer.
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} config Configuration (see synchronizer's Config options).
	 * @returns {JW.ObservableArray.Filterer}
	 * `<T>` Synchronizer.
	 */
	createFilterer: function(config) {
		return new JW.ObservableArray.Filterer(this, config);
	},

	/**
	 * Creates matching item counter.
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} config Configuration (see synchronizer's Config options).
	 * @returns {JW.ObservableArray.Counter}
	 * `<T>` Synchronizer.
	 */
	createCounter: function(config) {
		return new JW.ObservableArray.Counter(this, config);
	},

	/**
	 * Creates collection observer.
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} config Configuration (see synchronizer's Config options).
	 * @returns {JW.ObservableArray.Observer}
	 * `<T>` Synchronizer.
	 */
	createObserver: function(config) {
		return new JW.ObservableArray.Observer(this, config);
	},

	/**
	 * Creates collection converter to array (orderer).
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} [config] Configuration (see synchronizer's Config options).
	 * @returns {JW.ObservableArray.Orderer}
	 * `<T>` Synchronizer.
	 */
	createOrderer: function(config) {
		return new JW.ObservableArray.Orderer(this, config);
	},

	/**
	 * Creates collection converter to array (sorter by comparer).
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} config Configuration (see synchronizer's Config options).
	 * @returns {JW.ObservableArray.SorterComparing}
	 * `<T>` Synchronizer.
	 */
	createSorterComparing: function(config) {
		return new JW.ObservableArray.SorterComparing(this, config);
	},

	/**
	 * Creates collection converter to map (indexer).
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} config Configuration (see synchronizer's Config options).
	 * @returns {JW.ObservableArray.Indexer}
	 * `<T>` Synchronizer.
	 */
	createIndexer: function(config) {
		return new JW.ObservableArray.Indexer(this, config);
	},

	/**
	 * Creates collection converter to set.
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} [config] Configuration (see synchronizer's Config options).
	 * @returns {JW.ObservableArray.Lister}
	 * `<T>` Synchronizer.
	 */
	createLister: function(config) {
		return new JW.ObservableArray.Lister(this, config);
	},

	/**
	 * Creates view synchronizer with array.
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} config Configuration (see synchronizer's Config options).
	 * @returns {JW.ObservableArray.Inserter}
	 * `<T>` Synchronizer.
	 */
	createInserter: function(config) {
		return new JW.ObservableArray.Inserter(this, config);
	},

	/**
	 * Creates arrays merger.
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} [config] Configuration (see synchronizer's Config options).
	 * @returns {JW.ObservableArray.Merger}
	 * `<T>` Synchronizer.
	 */
	createMerger: function(config) {
		return new JW.ObservableArray.Merger(this, config);
	},

	createMergerBunch: function(merger) {
		return new JW.ObservableArray.Merger.Bunch(merger, this);
	},

	/**
	 * Creates array reverser.
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} [config] Configuration (see synchronizer's Config options).
	 * @returns {JW.ObservableArray.Reverser}
	 * `<T>` Synchronizer.
	 */
	createReverser: function(config) {
		return new JW.ObservableArray.Reverser(this, config);
	},

	createSplitter: function(config) {
		return new JW.ObservableArray.Splitter(this, config);
	},

	_createMergerTarget: function() {
		return new JW.ObservableArray();
	}
});

JW.apply(JW.ObservableArray.prototype, JW.ObservableCollection);

/**
 * @class
 * `<T>` JW.ObservableArray event parameters.
 * @extends JW.EventParams
 *
 * @constructor
 * @param {JW.ObservableArray} sender `<T>` Event sender.
 */
JW.ObservableArray.EventParams = function(sender) {
	JW.ObservableArray.EventParams._super.call(this, sender);
};

JW.extend(JW.ObservableArray.EventParams, JW.EventParams, {
	/**
	 * @property {JW.ObservableArray} sender `<T>` Event sender.
	 */
});

/**
 * @class
 *
 * `<T> extends JW.ObservableArray.EventParams<T>`
 *
 * Parameters of JW.ObservableArray#spliceEvent.
 *
 * @extends JW.ObservableArray.EventParams
 *
 * @constructor
 * @param {JW.ObservableArray} sender `<T>` Event sender.
 * @param {JW.AbstractArray.SpliceResult} spliceResult `<T>` Result of JW.AbstractArray#splice method.
 */
JW.ObservableArray.SpliceEventParams = function(sender, spliceResult) {
	JW.ObservableArray.SpliceEventParams._super.call(this, sender);
	this.spliceResult = spliceResult;
};

JW.extend(JW.ObservableArray.SpliceEventParams/*<T>*/, JW.ObservableArray.EventParams/*<T>*/, {
	/**
	 * @property {JW.AbstractArray.SpliceResult} spliceResult `<T>` Result of JW.AbstractArray#splice method.
	 */
});

/**
 * @class
 *
 * `<T> extends JW.ObservableArray.EventParams<T>`
 *
 * Parameters of JW.ObservableArray#moveEvent.
 *
 * @extends JW.ObservableArray.EventParams
 *
 * @constructor
 * @param {JW.ObservableArray} sender `<T>` Event sender.
 * @param {number} fromIndex Where item is moved from.
 * @param {number} toIndex Where item is moved to.
 * @param {T} item Item.
 */
JW.ObservableArray.MoveEventParams = function(sender, fromIndex, toIndex, item) {
	JW.ObservableArray.MoveEventParams._super.call(this, sender);
	this.fromIndex = fromIndex;
	this.toIndex = toIndex;
	this.item = item;
};

JW.extend(JW.ObservableArray.MoveEventParams, JW.ObservableArray.EventParams, {
	/**
	 * @property {number} fromIndex Where item is moved from.
	 */
	/**
	 * @property {number} toIndex Where item is moved to.
	 */
	/**
	 * @property {T} item Item.
	 */
});

/**
 * @class
 *
 * `<T> extends JW.ObservableArray.EventParams<T>`
 *
 * Parameters of JW.ObservableArray#replaceEvent.
 *
 * @extends JW.ObservableArray.EventParams
 *
 * @constructor
 * @param {JW.ObservableArray} sender `<T>` Event sender.
 * @param {number} index Item index.
 * @param {T} oldItem Old value.
 * @param {T} newItem New value.
 */
JW.ObservableArray.ReplaceEventParams = function(sender, index, oldItem, newItem) {
	JW.ObservableArray.ReplaceEventParams._super.call(this, sender);
	this.index = index;
	this.oldItem = oldItem;
	this.newItem = newItem;
};

JW.extend(JW.ObservableArray.ReplaceEventParams, JW.ObservableArray.EventParams, {
	/**
	 * @property {number} index Item index.
	 */
	/**
	 * @property {T} oldItem Old value.
	 */
	/**
	 * @property {T} newItem New value.
	 */
});

/**
 * @class
 *
 * `<T> extends JW.ObservableArray.EventParams<T>`
 *
 * Parameters of JW.ObservableArray event which bring its old contents.
 *
 * @extends JW.ObservableArray.EventParams
 *
 * @constructor
 * @param {JW.ObservableArray} sender `<T>` Event sender.
 * @param {Array} items `<T>` Old array contents.
 */
JW.ObservableArray.ItemsEventParams = function(sender, items) {
	JW.ObservableArray.ItemsEventParams._super.call(this, sender);
	this.items = items;
};

JW.extend(JW.ObservableArray.ItemsEventParams, JW.ObservableArray.EventParams, {
	/**
	 * @property {Array} items `<T>` Old array contents.
	 */
});

/**
 * @class
 *
 * `<T> extends JW.ObservableArray.ItemsEventParams<T>`
 *
 * Parameters of JW.ObservableArray#reorderEvent.
 *
 * @extends JW.ObservableArray.ItemsEventParams
 *
 * @constructor
 * @param {JW.ObservableArray} sender `<T>` Event sender.
 * @param {Array} indexArray `<number>` Indexes of items in reordered array.
 * @param {Array} items `<T>` Old array contents.
 */
JW.ObservableArray.ReorderEventParams = function(sender, indexArray, items) {
	JW.ObservableArray.ReorderEventParams._super.call(this, sender, items);
	this.indexArray = indexArray;
};

JW.extend(JW.ObservableArray.ReorderEventParams, JW.ObservableArray.ItemsEventParams, {
	/**
	 * @property {Array} indexArray `<number>` Indexes of items in reordered array.
	 */
});
