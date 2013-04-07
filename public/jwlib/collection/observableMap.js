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
	
	----
	
	This is an adapter of array that triggers events about modifications.
	Events are taken from ActionScript's CollectionEventKind (with small
	reasonable changes).
*/

JW.ObservableMap = function(json) {
	JW.ObservableMap._super.call(this);
	this._map = new JW.Map();
	this.addEvent = new JW.Event();
	this.removeEvent = new JW.Event();
	this.changeEvent = new JW.Event();
	this.sizeChangeEvent = new JW.Event();
	this.bulkCount = 0;
	this.bulkDirty = false;
	this.bulkSize = 0;
	if (json) {
		this._setAll(json);
	}
};

JW.extend(JW.ObservableMap/*<T extends Any>*/, JW.Class, {
	/*
	Fields
	JW.Map<T> _map;
	JW.Event<JW.ObservableMap.ItemEventParams<T>> addEvent;
	JW.Event<JW.ObservableMap.ItemEventParams<T>> removeEvent;
	JW.Event<JW.ObservableMap.EventParams<T>> changeEvent;
	JW.Event<JW.ObservableMap.SizeChangeEventParams<T>> sizeChangeEvent;
	Integer bulkCount;
	Boolean bulkDirty;
	Integer bulkSize;
	*/
	
	destroy: function() {
		this.clear();
		this.sizeChangeEvent.destroy();
		this.changeEvent.destroy();
		this.removeEvent.destroy();
		this.addEvent.destroy();
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
		if (this._set(item, key)) {
			this._triggerChange();
			return true;
		}
		return false;
	},
	
	setAll: function(map) {
		if (this._setAll(map)) {
			this._triggerChange();
			return true;
		}
		return false;
	},
	
	remove: function(key) {
		var item = this._remove(key);
		if (item !== undefined) {
			this._triggerChange();
		}
		return item;
	},
	
	removeAll: function(keys) {
		if (this._removeAll(keys)) {
			this._triggerChange();
			return true;
		}
		return false;
	},
	
	clear: function() {
		if (this._clear()) {
			this._triggerChange();
			return true;
		}
		return false;
	},
	
	startBulkChange: function() {
		++this.bulkCount;
		if (this.bulkCount !== 1) {
			return;
		}
		this.bulkDirty = false;
	},
	
	stopBulkChange: function() {
		if (this.bulkCount === 0) {
			return;
		}
		--this.bulkCount;
		if (this.bulkDirty) {
			this._triggerChange();
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
	
	createLister: function(config) {
		return new JW.ObservableMap.Lister(this, config);
	},
	
	createMapper: function(config) {
		return new JW.ObservableMap.Mapper(this, config);
	},
	
	_set: function(item, key) {
		if (item === undefined) {
			return false;
		}
		var oldItem = this._map.json[key];
		if (oldItem === item) {
			return false;
		}
		this._remove(key);
		this._map.set(item, key);
		this.addEvent.trigger(new JW.ObservableMap.ItemEventParams(this, item, key));
		return true;
	},
	
	_setAll: function(map) {
		var changed = false;
		for (var key in map) {
			changed = this._set(map[key], key) || changed;
		}
		return changed;
	},
	
	_remove: function(key) {
		var item = this._map.json[key];
		if (item === undefined) {
			return undefined;
		}
		this._map.remove(key);
		this.removeEvent.trigger(new JW.ObservableMap.ItemEventParams(this, item, key));
		return item;
	},
	
	_removeAll: function(keys) {
		var changed = false;
		for (var i = 0, l = keys.length; i < l; ++i) {
			changed = (this._remove(keys[i]) === undefined) ? changed : true;
		}
		return changed;
	},
	
	_clear: function() {
		if (this._map.size === 0) {
			return false;
		}
		var json = JW.Map.clone(this._map.json);
		for (var key in json) {
			this._remove(key);
		}
		return true;
	},
	
	_triggerChange: function() {
		if (this.bulkCount !== 0) {
			this.bulkDirty = true;
			return;
		}
		this.changeEvent.trigger(new JW.ObservableMap.EventParams(this));
		if (this.bulkSize !== this._map.size) {
			this.sizeChangeEvent.trigger(new JW.ObservableMap.SizeChangeEventParams(this, this.bulkSize, this._map.size));
			this.bulkSize = this._map.size;
		}
	}
});

JW.ObservableMap.prototype.getLength = JW.ObservableMap.prototype.getSize;
JW.ObservableMap.prototype.pushItem = JW.ObservableMap.prototype.set;

JW.applyIf(JW.ObservableMap.prototype, JW.Alg.BuildMethods);

JW.ObservableMap.EventParams = function(sender) {
	JW.ObservableMap.EventParams._super.call(this, sender);
};

JW.extend(JW.ObservableMap.EventParams/*<T extends Any>*/, JW.EventParams, {
	/*
	Fields
	JW.ObservableMap<T> sender;
	*/
});

JW.ObservableMap.ItemEventParams = function(sender, item, key) {
	JW.ObservableMap.ItemEventParams._super.call(this, sender);
	this.item = item;
	this.key = key;
};

JW.extend(JW.ObservableMap.ItemEventParams/*<T extends Any>*/, JW.ObservableMap.EventParams/*<T>*/, {
	/*
	Fields
	T item;
	String key;
	*/
});

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
