/*
MIT License

Copyright (c) 2020 Egor Nepomnyaschih

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

/**
 * @class
 *
 * `<T extends JW.Class> extends JW.AbstractSet<T>`
 *
 * Has several events and an observable property #length.
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
	this.length = new JW.Property(this.getLength());
	this.spliceEvent = new JW.Event();
	this.clearEvent = new JW.Event();
	this.changeEvent = new JW.Event();
};

JW.extend(JW.ObservableSet, JW.AbstractSet, {
	/**
	 * @property {JW.Property} length `<Number>` Collection length. **Don't modify manually!**
	 */
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

	// override
	destroyObject: function() {
		this.changeEvent.destroy();
		this.clearEvent.destroy();
		this.spliceEvent.destroy();
		this.length.destroy();
		this._super();
	},

	// override
	tryClear: function() {
		var items = this._tryClear();
		if (items === undefined) {
			return;
		}
		this.length.set(0);
		this.clearEvent.trigger(new JW.ObservableSet.ItemsEventParams(this, items));
		this.changeEvent.trigger(new JW.ObservableSet.EventParams(this));
		if (this._ownsItems) {
			JW.Array.backEvery(items, JW.destroy);
		}
		return items;
	},

	// override
	trySplice: function(removedItems, addedItems) {
		var spliceResult = this._trySplice(removedItems, addedItems);
		if (spliceResult === undefined) {
			return;
		}
		this.length.set(this.getLength());
		this.spliceEvent.trigger(new JW.ObservableSet.SpliceEventParams(this, spliceResult));
		this.changeEvent.trigger(new JW.ObservableSet.EventParams(this));
		if (this._ownsItems) {
			JW.Array.backEvery(spliceResult.removedItems, JW.destroy);
		}
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
	 * Creates matching item counter.
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} config Configuration (see synchronizer's Config options).
	 * @returns {JW.ObservableSet.Counter}
	 * `<T>` Synchronizer.
	 */
	createCounter: function(config) {
		return new JW.ObservableSet.Counter(this, config);
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
	 * @param {Object} [config] Configuration (see synchronizer's Config options).
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
	 * @param {Object} [config] Configuration (see synchronizer's Config options).
	 * @returns {JW.ObservableSet.Lister}
	 * `<T>` Synchronizer.
	 */
	createLister: function(config) {
		return new JW.ObservableSet.Lister(this, config);
	}
});

JW.apply(JW.ObservableSet.prototype, JW.ObservableCollection);

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
