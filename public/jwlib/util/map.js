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
	
	----
	
	This is an adapter of array that triggers events about modifications.
	Events are taken from ActionScript's CollectionEventKind (with small
	reasonable changes).
*/

JW.Map/*<T extends JW.Class>*/ = JW.Class.extend({
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
	
	size      : 0,
	bulkCount : 0,
	bulkSize  : 0,
	
	init: function() {
		this._super();
		this.base = {};
		this.addEvent = new JW.Event();
		this.removeEvent = new JW.Event();
		this.changeEvent = new JW.Event();
		this.sizeChangeEvent = new JW.Event();
	},
	
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
	
	isEmpty: function() {
		return this.size === 0;
	},
	
	get: function(key) {
		return this.base[key];
	},
	
	set: function(item, key) {
		var oldItem = this.base[key];
		if (oldItem === item) {
			return;
		}
		if (oldItem) {
			this.remove(key);
		}
		this.base[key] = item;
		++this.size;
		this.addEvent.trigger(new JW.Map.ItemEventParams(this, item, key));
		this._triggerChange();
	},
	
	remove: function(key) {
		var item = this.base[key];
		if (!item) {
			return;
		}
		delete this.base[key];
		--this.size;
		this.removeEvent.trigger(new JW.Map.ItemEventParams(this, item, key));
		this._triggerChange();
	},
	
	clear: function() {
		var base = JW.apply({}, this.base);
		for (var key in base) {
			this.remove(key);
		}
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
	
	pushItem: function(params) {
		this.set(params[0], params[1]);
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

JW.Map.EventParams/*<T extends JW.Class>*/ = JW.EventParams.extend({
	/*
	Fields
	JW.Map<T> sender;
	*/
});

JW.Map.ItemEventParams/*<T extends JW.Class>*/ = JW.Map.EventParams/*<T>*/.extend({
	/*
	Fields
	T item;
	String key;
	*/
	
	init: function(sender, item, key) {
		this._super(sender);
		this.item = item;
		this.key = key;
	}
});

JW.Map.SizeChangeEventParams/*<T extends JW.Class>*/ = JW.Map.EventParams/*<T>*/.extend({
	/*
	Fields
	Integer oldSize;
	Integer newSize;
	*/
	
	init: function(sender, oldSize, newSize) {
		this._super(sender);
		this.oldSize = oldSize;
		this.newSize = newSize;
	}
});
