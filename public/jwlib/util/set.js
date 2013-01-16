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

JW.Set = function() {
	JW.Set._super.call(this);
	this.base = {};
	this.size = 0;
	this.addEvent = new JW.Event();
	this.removeEvent = new JW.Event();
	this.changeEvent = new JW.Event();
	this.sizeChangeEvent = new JW.Event();
	this.bulkCount = 0;
	this.bulkDirty = false;
	this.bulkSize = 0;
};

JW.extend(JW.Set/*<T extends JW.Class>*/, JW.Class, {
	/*
	Fields
	Map<T> base;
	Integer size;
	JW.Event<JW.Set.ItemEventParams<T>> addEvent;
	JW.Event<JW.Set.ItemEventParams<T>> removeEvent;
	JW.Event<JW.Set.EventParams<T>> changeEvent;
	JW.Event<JW.Set.SizeChangeEventParams<T>> sizeChangeEvent;
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
	
	isEmpty: function() {
		return this.size === 0;
	},
	
	contains: function(item) {
		return this.base.hasOwnProperty(item._iid);
	},
	
	add: function(item) {
		if (this.base[item._iid]) {
			return;
		}
		this.base[item._iid] = item;
		++this.size;
		this.addEvent.trigger(new JW.Set.ItemEventParams(this, item));
		this._triggerChange();
	},
	
	remove: function(item) {
		if (!this.base[item._iid]) {
			return;
		}
		delete this.base[item._iid];
		--this.size;
		this.removeEvent.trigger(new JW.Map.ItemEventParams(this, item));
		this._triggerChange();
	},
	
	clear: function() {
		var base = JW.apply({}, this.base);
		for (var key in base) {
			this.remove(base[key]);
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
		return new JW.Set();
	},
	
	pushItem: function(params) {
		this.add(params[0]);
	},
	
	_triggerChange: function() {
		if (this.bulkCount !== 0) {
			this.bulkDirty = true;
			return;
		}
		this.changeEvent.trigger(new JW.Set.EventParams(this));
		if (this.bulkSize !== this.size) {
			this.sizeChangeEvent.trigger(new JW.Set.SizeChangeEventParams(this, this.bulkSize, this.size));
			this.bulkSize = this.size;
		}
	}
});

JW.applyIf(JW.Set.prototype, JW.Alg.SimpleMethods, JW.Alg.BuildMethods);

JW.Set.EventParams = function(sender) {
	JW.Set.EventParams._super.call(this, sender);
};

JW.extend(JW.Set.EventParams/*<T extends JW.Class>*/, JW.EventParams, {
	/*
	Fields
	JW.Set<T> sender;
	*/
});

JW.Set.ItemEventParams = function(sender, item) {
	JW.Set.ItemEventParams._super.call(this, sender);
	this.item = item;
};

JW.extend(JW.Set.ItemEventParams/*<T extends JW.Class>*/, JW.Set.EventParams/*<T>*/, {
	/*
	Fields
	T item;
	*/
});

JW.Set.SizeChangeEventParams = function(sender, oldSize, newSize) {
	JW.Set.SizeChangeEventParams._super.call(this, sender);
	this.oldSize = oldSize;
	this.newSize = newSize;
};

JW.extend(JW.Set.SizeChangeEventParams/*<T extends JW.Class>*/, JW.Set.EventParams/*<T>*/, {
	/*
	Fields
	Integer oldSize;
	Integer newSize;
	*/
});
