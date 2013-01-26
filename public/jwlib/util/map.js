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

JW.Map = function(base) {
	JW.Map._super.call(this);
	this.base = {};
	this.size = 0;
	this.addEvent = new JW.Event();
	this.removeEvent = new JW.Event();
	this.changeEvent = new JW.Event();
	this.sizeChangeEvent = new JW.Event();
	this.bulkCount = 0;
	this.bulkDirty = false;
	this.bulkSize = 0;
	if (base) {
		this.setAll(base);
	}
};

JW.extend(JW.Map/*<T extends Any>*/, JW.Class, {
	/*
	Fields
	Map<T> base;
	Integer size;
	JW.Event<JW.Map.ItemEventParams<T>> addEvent;
	JW.Event<JW.Map.ItemEventParams<T>> removeEvent;
	JW.Event<JW.Map.EventParams<T>> changeEvent;
	JW.Event<JW.Map.SizeChangeEventParams<T>> sizeChangeEvent;
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
	
	getLength: function() {
		return this.size;
	},
	
	getSize: function() {
		return this.size;
	},
	
	isEmpty: function() {
		return this.size === 0;
	},
	
	get: function(key) {
		return this.base[key];
	},
	
	set: function(item, key) {
		if (this._set(item, key)) {
			this._triggerChange();
			return true;
		}
		return false;
	},
	
	setAll: function(map) {
		var changed = false;
		for (var key in map) {
			changed = this._set(map[key], key) || changed;
		}
		if (changed) {
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
	
	clear: function() {
		if (this.size === 0) {
			return false;
		}
		var base = JW.apply({}, this.base);
		for (var key in base) {
			this._remove(key);
		}
		this._triggerChange();
		return true;
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
		return JW.every(this.base, callback, scope);
	},
	
	createEmpty: function() {
		return new JW.Map();
	},
	
	pushItem: function(value, key) {
		this.set(value, key);
	},
	
	_set: function(item, key) {
		if (item === undefined) {
			return false;
		}
		var oldItem = this.base[key];
		if (oldItem === item) {
			return false;
		}
		this._remove(key);
		this.base[key] = item;
		++this.size;
		this.addEvent.trigger(new JW.Map.ItemEventParams(this, item, key));
		return true;
	},
	
	_remove: function(key) {
		if (!this.base.hasOwnProperty(key)) {
			return undefined;
		}
		var item = this.base[key];
		delete this.base[key];
		--this.size;
		this.removeEvent.trigger(new JW.Map.ItemEventParams(this, item, key));
		return item;
	},
	
	_triggerChange: function() {
		if (this.bulkCount !== 0) {
			this.bulkDirty = true;
			return;
		}
		this.changeEvent.trigger(new JW.Map.EventParams(this));
		if (this.bulkSize !== this.size) {
			this.sizeChangeEvent.trigger(new JW.Map.SizeChangeEventParams(this, this.bulkSize, this.size));
			this.bulkSize = this.size;
		}
	}
});

JW.applyIf(JW.Map.prototype, JW.Alg.SimpleMethods, JW.Alg.BuildMethods);

JW.Map.EventParams = function(sender) {
	JW.Map.EventParams._super.call(this, sender);
};

JW.extend(JW.Map.EventParams/*<T extends Any>*/, JW.EventParams, {
	/*
	Fields
	JW.Map<T> sender;
	*/
});

JW.Map.ItemEventParams = function(sender, item, key) {
	JW.Map.ItemEventParams._super.call(this, sender);
	this.item = item;
	this.key = key;
};

JW.extend(JW.Map.ItemEventParams/*<T extends Any>*/, JW.Map.EventParams/*<T>*/, {
	/*
	Fields
	T item;
	String key;
	*/
});

JW.Map.SizeChangeEventParams = function(sender, oldSize, newSize) {
	JW.Map.SizeChangeEventParams._super.call(this, sender);
	this.oldSize = oldSize;
	this.newSize = newSize;
};

JW.extend(JW.Map.SizeChangeEventParams/*<T extends Any>*/, JW.Map.EventParams/*<T>*/, {
	/*
	Fields
	Integer oldSize;
	Integer newSize;
	*/
});
