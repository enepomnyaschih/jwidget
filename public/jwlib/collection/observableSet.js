/*
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

JW.ObservableSet = function(items) {
	JW.ObservableSet._super.call(this);
	this.set = new JW.Set();
	this.spliceEvent = new JW.Event();
	this.clearEvent = new JW.Event();
	this.changeEvent = new JW.Event();
	this.sizeChangeEvent = new JW.Event();
	this.getKey = null;
	if (items) {
		this._addAll(items);
	}
	this._lastSize = this.set.size;
};

JW.extend(JW.ObservableSet/*<T extends JW.Class>*/, JW.Class, {
	/*
	Fields
	JW.Set<T> set;
	JW.Event<JW.ObservableSet.SpliceEventParams<T>> spliceEvent;
	JW.Event<JW.ObservableSet.ItemsEventParams<T>> clearEvent;
	JW.Event<JW.ObservableSet.EventParams<T>> changeEvent;
	JW.Event<JW.ObservableSet.SizeChangeEventParams<T>> sizeChangeEvent;
	Integer _lastSize;
	String getKey(T item);
	*/
	
	destroy: function() {
		this.clear();
		this.sizeChangeEvent.destroy();
		this.changeEvent.destroy();
		this.clearEvent.destroy();
		this.spliceEvent.destroy();
		this._super();
	},
	
	getJson: function() {
		return this.set.getJson();
	},
	
	getSize: function() {
		return this.set.size;
	},
	
	isEmpty: function() {
		return this.set.size === 0;
	},
	
	contains: function(item) {
		return this.set.json.hasOwnProperty(item._iid);
	},
	
	add: function(item) {
		if (!this.set.add(item)) {
			return null;
		}
		this.spliceEvent.trigger(new JW.ObservableSet.SpliceEventParams(this, [], [ item ]));
		this._triggerChange();
		return true;
	},
	
	addAll: function(items) {
		items = this.set.addAll(items);
		if (!items) {
			return null;
		}
		this.spliceEvent.trigger(new JW.ObservableSet.SpliceEventParams(this, [], items));
		this._triggerChange();
		return items;
	},
	
	remove: function(item) {
		if (!this.set.remove(item)) {
			return null;
		}
		this.spliceEvent.trigger(new JW.ObservableSet.SpliceEventParams(this, [ item ], []));
		this._triggerChange();
		return true;
	},
	
	removeItem: function(item) {
		return this.remove(item) ? item._iid : null;
	},
	
	removeAll: function(items) {
		items = this.set.removeAll(items);
		if (!items) {
			return null;
		}
		this.spliceEvent.trigger(new JW.ObservableSet.SpliceEventParams(this, items, []));
		this._triggerChange();
		return items;
	},
	
	clear: function() {
		var items = this.set.clear();
		if (!items) {
			return null;
		}
		this.clearEvent.trigger(new JW.ObservableSet.ItemsEventParams(this, items));
		this._triggerChange();
		return items;
	},
	
	splice: function(removedItems, addedItems) {
		var result = this.set.splice(removedItems, addedItems);
		if (!result) {
			return null;
		}
		this.spliceEvent.trigger(new JW.ObservableSet.SpliceEventParams(this, result.removedItems, result.addedItems));
		this._triggerChange();
		return result;
	},
	
	detectSplice: function(newItems) {
		return this.set.detectSplice(newItems);
	},
	
	performSplice: function(newItems) {
		var spliceParams = this.detectSplice(newItems);
		return spliceParams ? this.splice(spliceParams.removedItems, spliceParams.addedItems) : null;
	},
	
	every: function(callback, scope) {
		return JW.Set.every(this.set.json, callback, scope);
	},
	
	createEmpty: function() {
		return new JW.ObservableSet();
	},
	
	createEmptyUnobservable: function() {
		return new JW.Set();
	},
	
	createEmptyArray: function() {
		return new JW.ObservableArray();
	},
	
	createEmptyMap: function() {
		return new JW.ObservableMap();
	},
	
	createEmptySet: function() {
		return new JW.ObservableSet();
	},
	
	createIndexer: function(config) {
		return new JW.ObservableSet.Indexer(this, config);
	},
	
	createMapper: function(config) {
		return new JW.ObservableSet.Mapper(this, config);
	},
	
	createObserver: function(config) {
		return new JW.ObservableSet.Observer(this, config);
	},
	
	_triggerChange: function() {
		this.changeEvent.trigger(new JW.ObservableSet.EventParams(this));
		if (this._lastSize !== this.set.size) {
			this.sizeChangeEvent.trigger(new JW.ObservableSet.SizeChangeEventParams(this, this._lastSize, this.set.size));
			this._lastSize = this.set.size;
		}
	}
});

JW.ObservableSet.prototype.getLength = JW.ObservableSet.prototype.getSize;
JW.ObservableSet.prototype.pushItem = JW.ObservableSet.prototype.add;

JW.applyIf(JW.ObservableSet.prototype, JW.Alg.BuildMethods);

//--------

JW.ObservableSet.EventParams = function(sender) {
	JW.ObservableSet.EventParams._super.call(this, sender);
};

JW.extend(JW.ObservableSet.EventParams/*<T extends JW.Class>*/, JW.EventParams, {
	/*
	Fields
	JW.ObservableSet<T> sender;
	*/
});

//--------

JW.ObservableSet.SpliceEventParams = function(sender, removedItems, addedItems) {
	JW.ObservableSet.SpliceEventParams._super.call(this, sender);
	this.removedItems = removedItems;
	this.addedItems = addedItems;
};

JW.extend(JW.ObservableSet.SpliceEventParams/*<T extends JW.Class>*/, JW.ObservableSet.EventParams/*<T>*/, {
	/*
	Fields
	Array<T> removedItems;
	Array<T> addedItems;
	*/
});

//--------

JW.ObservableSet.ItemsEventParams = function(sender, items) {
	JW.ObservableSet.ItemsEventParams._super.call(this, sender);
	this.items = items;
};

JW.extend(JW.ObservableSet.ItemsEventParams/*<T extends JW.Class>*/, JW.ObservableSet.EventParams/*<T>*/, {
	/*
	Fields
	Array<T> items;
	*/
});

//--------

JW.ObservableSet.SizeChangeEventParams = function(sender, oldSize, newSize) {
	JW.ObservableSet.SizeChangeEventParams._super.call(this, sender);
	this.oldSize = oldSize;
	this.newSize = newSize;
};

JW.extend(JW.ObservableSet.SizeChangeEventParams/*<T extends JW.Class>*/, JW.ObservableSet.EventParams/*<T>*/, {
	/*
	Fields
	Integer oldSize;
	Integer newSize;
	*/
});
