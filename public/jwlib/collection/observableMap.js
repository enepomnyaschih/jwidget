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

JW.extend(JW.ObservableMap/*<T>*/, JW.Class, {
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
		var spliceResult = this.splice([], JW.Map.single(item, key));
		if (spliceResult !== undefined) {
			return new JW.Proxy(spliceResult.removedItems[key]);
		}
	},
	
	setAll: function(map) {
		return this.splice([], map);
	},
	
	setKey: function(oldKey, newKey) {
		if (this.reindex(JW.Map.single(newKey, oldKey)) !== undefined) {
			return this._map.get(newKey);
		}
	},
	
	remove: function(key) {
		var spliceResult = this.splice([ key ], {});
		if (spliceResult !== undefined) {
			return spliceResult.removedItems[key];
		}
	},
	
	removeItem: function(item) {
		var key = this.indexOf(item);
		if (key === undefined) {
			return;
		}
		this.remove(key);
		return key;
	},
	
	removeAll: function(keys) {
		var spliceResult = this.splice(keys, {});
		if (spliceResult) {
			return spliceResult.removedItems;
		}
	},
	
	clear: function() {
		var items = this._map.clear();
		if (items === undefined) {
			return;
		}
		this.clearEvent.trigger(new JW.ObservableMap.ItemsEventParams(this, items));
		this._triggerChange();
		return items;
	},
	
	splice: function(removedKeys, updatedItems) {
		var spliceResult = this._map.splice(removedKeys, updatedItems);
		if (spliceResult === undefined) {
			return;
		}
		this.spliceEvent.trigger(new JW.ObservableMap.SpliceEventParams(this, spliceResult));
		this._triggerChange();
		return spliceResult;
	},
	
	reindex: function(keyMap) {
		var resultMap = this._map.reindex(keyMap);
		if (resultMap === undefined) {
			return;
		}
		this.reindexEvent.trigger(new JW.ObservableMap.ReindexEventParams(this, resultMap));
		this._triggerChange();
		return resultMap;
	},
	
	detectSplice: function(newItems) {
		return this._map.detectSplice(newItems);
	},
	
	detectReindex: function(newItems, getKey, scope) {
		return this._map.detectReindex(newItems, getKey || this.getKey, scope || this);
	},
	
	performSplice: function(newItems) {
		var spliceParams = this.detectSplice(newItems);
		if (spliceParams !== undefined) {
			return this.splice(spliceParams.removedKeys, spliceParams.updatedItems);
		}
	},
	
	performReindex: function(newItems, getKey, scope) {
		var keyMap = this.detectReindex(newItems, getKey || this.getKey, scope || this);
		if (keyMap !== undefined) {
			return this.reindex(keyMap);
		}
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
	
	createInserter: function(config) {
		return new JW.ObservableMap.Inserter(this, config);
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

JW.extend(JW.ObservableMap.EventParams/*<T>*/, JW.EventParams, {
	/*
	Fields
	JW.ObservableMap<T> sender;
	*/
});

//--------

JW.ObservableMap.SpliceEventParams = function(sender, spliceResult) {
	JW.ObservableMap.SpliceEventParams._super.call(this, sender);
	this.spliceResult = spliceResult;
};

JW.extend(JW.ObservableMap.SpliceEventParams/*<T>*/, JW.ObservableMap.EventParams/*<T>*/, {
	/*
	Fields
	JW.AbstractMap.SpliceResult<T> spliceResult;
	*/
});

//--------

JW.ObservableMap.ReindexEventParams = function(sender, keyMap) {
	JW.ObservableMap.ReindexEventParams._super.call(this, sender);
	this.keyMap = keyMap;
};

JW.extend(JW.ObservableMap.ReindexEventParams/*<T>*/, JW.ObservableMap.EventParams/*<T>*/, {
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

JW.extend(JW.ObservableMap.ItemsEventParams/*<T>*/, JW.ObservableMap.EventParams/*<T>*/, {
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

JW.extend(JW.ObservableMap.SizeChangeEventParams/*<T>*/, JW.ObservableMap.EventParams/*<T>*/, {
	/*
	Fields
	Integer oldSize;
	Integer newSize;
	*/
});
