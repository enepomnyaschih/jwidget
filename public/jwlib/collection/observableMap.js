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

JW.ObservableMap = function(json) {
	JW.ObservableMap._super.call(this);
	this._map = new JW.Map();
	this.spliceEvent = new JW.Event();
	this.reindexEvent = new JW.Event();
	this.clearEvent = new JW.Event();
	this.changeEvent = new JW.Event();
	this.sizeChangeEvent = new JW.Event();
	this.getKey = null;
	if (json) {
		this._map.setAll(json);
	}
	this._lastSize = this._map.size;
};

JW.extend(JW.ObservableMap/*<T extends Any>*/, JW.Class, {
	/*
	Fields
	JW.Map<T> _map;
	JW.Event<JW.ObservableMap.SpliceEventParams<T>> spliceEvent;
	JW.Event<JW.ObservableMap.ReindexEventParams<T>> reindexEvent;
	JW.Event<JW.ObservableMap.ItemsEventParams<T>> clearEvent;
	JW.Event<JW.ObservableMap.EventParams<T>> changeEvent;
	JW.Event<JW.ObservableMap.SizeChangeEventParams<T>> sizeChangeEvent;
	Integer _lastSize;
	String getKey(T item);
	*/
	
	// override
	destroy: function() {
		this.clear();
		this.sizeChangeEvent.destroy();
		this.changeEvent.destroy();
		this.clearEvent.destroy();
		this.reindexEvent.destroy();
		this.spliceEvent.destroy();
		this._super();
	},
	
	getJson: function() {
		return this._map.getJson();
	},
	
	getSize: function() {
		return this._map.size;
	},
	
	isEmpty: function() {
		return this._map.size === 0;
	},
	
	contains: function(key) {
		return this._map.json.hasOwnProperty(key);
	},
	
	get: function(key) {
		return this._map.json[key];
	},
	
	set: function(item, key) {
		var result = this._map.set(item, key);
		if (!result) {
			return null;
		}
		this.spliceEvent.trigger(new JW.ObservableMap.SpliceEventParams(this,
			JW.Map.single(result.item, key), JW.Map.single(item, key)));
		this._triggerChange();
		return result;
	},
	
	setAll: function(map) {
		var result = this._map.setAll(map);
		if (!result) {
			return null;
		}
		this.spliceEvent.trigger(new JW.ObservableMap.SpliceEventParams(this,
			result.removedItems, result.addedItems));
		this._triggerChange();
		return result;
	},
	
	setKey: function(oldKey, newKey) {
		var result = this._map.setKey(oldKey, newKey);
		if (!result) {
			return null;
		}
		this.reindexEvent.trigger(new JW.ObservableMap.ReindexEventParams(this,
			JW.Map.single(newKey, oldKey)));
		this._triggerChange();
		return result;
	},
	
	remove: function(key) {
		var result = this._map.remove(key);
		if (!result) {
			return null;
		}
		this.spliceEvent.trigger(new JW.ObservableMap.SpliceEventParams(this,
			result.removedItems, result.addedItems));
		this._triggerChange();
		return result;
	},
	
	removeItem: function(item) {
		var key = this.indexOf(item);
		if (key === undefined) {
			return null;
		}
		this.remove(key);
		return key;
	},
	
	removeAll: function(keys) {
		var result = this._map.removeAll(keys);
		if (!result) {
			return null;
		}
		this.spliceEvent.trigger(new JW.ObservableMap.SpliceEventParams(this,
			result.items, {}));
		this._triggerChange();
		return result;
	},
	
	clear: function() {
		var result = this._map.clear();
		if (!result) {
			return null;
		}
		this.clearEvent.trigger(new JW.ObservableMap.ItemsEventParams(this,
			result.items));
		this._triggerChange();
		return result;
	},
	
	splice: function(removedKeys, updatedItems) {
		var result = this._map.splice(removedKeys, updatedItems);
		if (!result) {
			return null;
		}
		this.spliceEvent.trigger(new JW.ObservableMap.SpliceEventParams(this,
			result.removedItems, result.addedItems));
		this._triggerChange();
		return result;
	},
	/*
	getSpliceParams: function(removedKeys, updatedItems) {
		return this._map.getSpliceParams(removedKeys, updatedItems);
	},
	*/
	reindex: function(keyMap) {
		var result = this._map.reindex(keyMap);
		if (!result) {
			return null;
		}
		this.reindexEvent.trigger(new JW.ObservableMap.ReindexEventParams(this,
			result.keyMap));
		this._triggerChange();
		return true;
	},
	
	detectSplice: function(newItems) {
		return this._map.detectSplice(newItems);
	},
	
	detectReindex: function(newItems, getKey, scope) {
		return this._map.detectReindex(newItems, getKey || this.getKey, scope || this);
	},
	
	performSplice: function(newItems) {
		var spliceParams = this.detectSplice(newItems);
		return spliceParams ? this.splice(spliceParams.removedKeys, spliceParams.updatedItems) : null;
	},
	
	performReindex: function(newItems, getKey, scope) {
		var keyMap = this.detectReindex(newItems, getKey, scope);
		return keyMap ? this.reindex(keyMap) : null;
	},
	
	every: function(callback, scope) {
		return JW.Map.every(this._map.json, callback, scope);
	},
	
	createEmpty: function() {
		return new JW.ObservableMap();
	},
	
	createEmptyUnobservable: function() {
		return new JW.Map();
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
	
	createLister: function(config) {
		return new JW.ObservableMap.Lister(this, config);
	},
	
	createMapper: function(config) {
		return new JW.ObservableMap.Mapper(this, config);
	},
	
	createObserver: function(config) {
		return new JW.ObservableMap.Observer(this, config);
	},
	
	_triggerChange: function() {
		this.changeEvent.trigger(new JW.ObservableMap.EventParams(this));
		if (this._lastSize !== this._map.size) {
			this.sizeChangeEvent.trigger(new JW.ObservableMap.SizeChangeEventParams(this, this._lastSize, this._map.size));
			this._lastSize = this._map.size;
		}
	}
});

JW.ObservableMap.prototype.getLength = JW.ObservableMap.prototype.getSize;
JW.ObservableMap.prototype.pushItem = JW.ObservableMap.prototype.set;

JW.applyIf(JW.ObservableMap.prototype, JW.Alg.BuildMethods);

//--------

JW.ObservableMap.EventParams = function(sender) {
	JW.ObservableMap.EventParams._super.call(this, sender);
};

JW.extend(JW.ObservableMap.EventParams/*<T extends Any>*/, JW.EventParams, {
	/*
	Fields
	JW.ObservableMap<T> sender;
	*/
});

//--------

JW.ObservableMap.SpliceEventParams = function(sender, removedItems, addedItems) {
	JW.ObservableMap.SpliceEventParams._super.call(this, sender);
	this.removedItems = removedItems;
	this.addedItems = addedItems;
};

JW.extend(JW.ObservableMap.SpliceEventParams/*<T extends Any>*/, JW.ObservableMap.EventParams/*<T>*/, {
	/*
	Fields
	Map<T> removedItems;
	Map<T> addedItems;
	*/
});

//--------

JW.ObservableMap.ReindexEventParams = function(sender, keyMap) {
	JW.ObservableMap.ReindexEventParams._super.call(this, sender);
	this.keyMap = keyMap;
};

JW.extend(JW.ObservableMap.ReindexEventParams/*<T extends Any>*/, JW.ObservableMap.EventParams/*<T>*/, {
	/*
	Fields
	Map<String> keyMap;
	*/
});

//--------

JW.ObservableMap.ItemsEventParams = function(sender, items) {
	JW.ObservableMap.ItemsEventParams._super.call(this, sender);
	this.items = items;
};

JW.extend(JW.ObservableMap.ItemsEventParams/*<T extends Any>*/, JW.ObservableMap.EventParams/*<T>*/, {
	/*
	Fields
	Map<T> items;
	*/
});

//--------

JW.ObservableMap.SizeChangeEventParams = function(sender, oldSize, newSize) {
	JW.ObservableMap.SizeChangeEventParams._super.call(this, sender);
	this.oldSize = oldSize;
	this.newSize = newSize;
};

JW.extend(JW.ObservableMap.SizeChangeEventParams/*<T extends Any>*/, JW.ObservableMap.EventParams/*<T>*/, {
	/*
	Fields
	Integer oldSize;
	Integer newSize;
	*/
});
