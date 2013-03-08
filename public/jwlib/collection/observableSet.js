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

JW.ObservableSet = function(items) {
	JW.ObservableSet._super.call(this);
	this.set = new JW.Set();
	this.addEvent = new JW.Event();
	this.removeEvent = new JW.Event();
	this.changeEvent = new JW.Event();
	this.sizeChangeEvent = new JW.Event();
	this.bulkCount = 0;
	this.bulkDirty = false;
	this.bulkSize = 0;
	if (items) {
		this._addAll(items);
	}
};

JW.extend(JW.ObservableSet/*<T extends JW.Class>*/, JW.Class, {
	/*
	Fields
	JW.Set<T> set;
	JW.Event<JW.ObservableSet.ItemEventParams<T>> addEvent;
	JW.Event<JW.ObservableSet.ItemEventParams<T>> removeEvent;
	JW.Event<JW.ObservableSet.EventParams<T>> changeEvent;
	JW.Event<JW.ObservableSet.SizeChangeEventParams<T>> sizeChangeEvent;
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
		if (this._add(item)) {
			this._triggerChange();
			return true;
		}
		return false;
	},
	
	addAll: function(items) {
		if (this._addAll(items)) {
			this._triggerChange();
			return true;
		}
		return false;
	},
	
	remove: function(item) {
		if (this._remove(item)) {
			this._triggerChange();
			return true;
		}
		return false;
	},
	
	removeAll: function(items) {
		var changed = false;
		for (var i = 0, l = items.length; i < l; ++i) {
			changed = this._remove(items[i]) || changed;
		}
		if (changed) {
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
		return JW.Set.every(this.set.json, callback, scope);
	},
	
	createEmpty: function() {
		return new JW.ObservableSet();
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
	
	_add: function(item) {
		if (this.set.json[item._iid]) {
			return false;
		}
		this.set.add(item);
		this.addEvent.trigger(new JW.ObservableSet.ItemEventParams(this, item));
		return true;
	},
	
	_addAll: function(items) {
		var changed = false;
		for (var i = 0, l = items.length; i < l; ++i) {
			changed = this._add(items[i]) || changed;
		}
		return changed;
	},
	
	_remove: function(item) {
		if (!this.set.json[item._iid]) {
			return false;
		}
		this.set.remove(item);
		this.removeEvent.trigger(new JW.ObservableSet.ItemEventParams(this, item));
		return true;
	},
	
	_clear: function() {
		if (this.set.size === 0) {
			return false;
		}
		var json = JW.Set.clone(this.set.json);
		for (var key in json) {
			this._remove(json[key]);
		}
		return true;
	},
	
	_triggerChange: function() {
		if (this.bulkCount !== 0) {
			this.bulkDirty = true;
			return;
		}
		this.changeEvent.trigger(new JW.ObservableSet.EventParams(this));
		if (this.bulkSize !== this.set.size) {
			this.sizeChangeEvent.trigger(new JW.ObservableSet.SizeChangeEventParams(this, this.bulkSize, this.set.size));
			this.bulkSize = this.set.size;
		}
	}
});

JW.ObservableSet.prototype.getLength = JW.ObservableSet.prototype.getSize;
JW.ObservableSet.prototype.pushItem = JW.ObservableSet.prototype.add;

JW.applyIf(JW.ObservableSet.prototype, JW.Alg.BuildMethods);

JW.ObservableSet.EventParams = function(sender) {
	JW.ObservableSet.EventParams._super.call(this, sender);
};

JW.extend(JW.ObservableSet.EventParams/*<T extends JW.Class>*/, JW.EventParams, {
	/*
	Fields
	JW.ObservableSet<T> sender;
	*/
});

JW.ObservableSet.ItemEventParams = function(sender, item) {
	JW.ObservableSet.ItemEventParams._super.call(this, sender);
	this.item = item;
};

JW.extend(JW.ObservableSet.ItemEventParams/*<T extends JW.Class>*/, JW.ObservableSet.EventParams/*<T>*/, {
	/*
	Fields
	T item;
	*/
});

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
