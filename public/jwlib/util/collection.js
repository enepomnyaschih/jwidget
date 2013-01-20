﻿/*
	JW ordered collection.
	
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

// TODO: tests for bulk changes, "change" event and "lengthchange" event

JW.Collection = function(base) {
	JW.Collection._super.call(this);
	this.base = [];
	this.addEvent = new JW.Event();
	this.removeEvent = new JW.Event();
	this.replaceEvent = new JW.Event();
	this.moveEvent = new JW.Event();
	this.clearEvent = new JW.Event();
	this.reorderEvent = new JW.Event();
	this.filterEvent = new JW.Event();
	this.resetEvent = new JW.Event();
	this.changeEvent = new JW.Event();
	this.lengthChangeEvent = new JW.Event();
	this.bulkCount = 0;
	this.bulkDirty = false;
	this.bulkLength = 0;
	if (base) {
		this.addAll(base);
	}
};

JW.extend(JW.Collection/*<T extends JW.Class>*/, JW.Class, {
	/*
	Fields
	Array<T> base;
	JW.Event<JW.Collection.ItemRangeEventParams<T>> addEvent;
	JW.Event<JW.Collection.ItemRangeEventParams<T>> removeEvent;
	JW.Event<JW.Collection.ReplaceEventParams<T>> replaceEvent;
	JW.Event<JW.Collection.MoveEventParams<T>> moveEvent;
	JW.Event<JW.Collection.ItemsEventParams<T>> clearEvent;
	JW.Event<JW.Collection.EventParams<T>> reorderEvent;
	JW.Event<JW.Collection.EventParams<T>> filterEvent;
	JW.Event<JW.Collection.EventParams<T>> resetEvent;
	JW.Event<JW.Collection.EventParams<T>> changeEvent;
	JW.Event<JW.Collection.LengthChangeEventParams<T>> lengthChangeEvent;
	Integer bulkCount;
	Boolean bulkDirty;
	Integer bulkLength;
	*/
	
	destroy: function() {
		this.clear();
		this.lengthChangeEvent.destroy();
		this.changeEvent.destroy();
		this.resetEvent.destroy();
		this.filterEvent.destroy();
		this.reorderEvent.destroy();
		this.clearEvent.destroy();
		this.moveEvent.destroy();
		this.replaceEvent.destroy();
		this.removeEvent.destroy();
		this.addEvent.destroy();
		this._super();
	},
	
	getLength: function() {
		return this.base.length;
	},
	
	isEmpty: function() {
		return this.base.length === 0;
	},
	
	get: function(index) {
		return this.base[index];
	},
	
	add: function(item, index) {
		if (index === undefined) {
			index = this.getLength();
		}
		this.base.splice(index, 0, item);
		this.addEvent.trigger(new JW.Collection.ItemRangeEventParams(this, [ item ], index));
		this._triggerChange();
	},
	
	addAll: function(items, index) {
		if (items.length === 0) {
			return;
		}
		if (index === undefined) {
			index = this.getLength();
		}
		JW.Array.addAll(this.base, items, index);
		this.addEvent.trigger(new JW.Collection.ItemRangeEventParams(this, items, index));
		this._triggerChange();
	},
	
	remove: function(index, count) {
		var items = this.base.splice(index, JW.def(count, 1));
		this.removeEvent.trigger(new JW.Collection.ItemRangeEventParams(this, items, index));
		this._triggerChange();
		return (count === undefined) ? items[0] : items;
	},
	
	set: function(item, index) {
		var oldItem = this.base[index];
		if (oldItem === item) {
			return;
		}
		this.base[index] = item;
		this.replaceEvent.trigger(new JW.Collection.ReplaceEventParams(this, index, oldItem, item));
		this._triggerChange();
		return oldItem;
	},
	
	move: function(fromIndex, toIndex) {
		if (fromIndex === toIndex) {
			return;
		};
		var item = this.base[fromIndex];
		this.base.splice(fromIndex, 1);
		this.base.splice(toIndex, 0, item);
		this.moveEvent.trigger(new JW.Collection.MoveEventParams(this, fromIndex, toIndex, item));
		this._triggerChange();
		return item;
	},
	
	clear: function() {
		if (this.isEmpty()) {
			return [];
		}
		var items = JW.Array.clear(this.base);
		this.clearEvent.trigger(new JW.Collection.ItemsEventParams(this, items));
		this._triggerChange();
		return items;
	},
	
	triggerReorder: function() {
		this.reorderEvent.trigger(new JW.Collection.EventParams(this));
		this._triggerChange();
	},
	
	triggerFilter: function() {
		this.filterEvent.trigger(new JW.Collection.EventParams(this));
		this._triggerChange();
	},
	
	triggerReset: function() {
		this.resetEvent.trigger(new JW.Collection.EventParams(this));
		this._triggerChange();
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
		return new JW.Collection();
	},
	
	pushItem: function(value) {
		this.add(value);
	},
	
	_triggerChange: function() {
		if (this.bulkCount !== 0) {
			this.bulkDirty = true;
			return;
		}
		this.changeEvent.trigger(new JW.Collection.EventParams(this));
		var length = this.getLength();
		if (this.bulkLength !== length) {
			this.lengthChangeEvent.trigger(new JW.Collection.LengthChangeEventParams(this, this.bulkLength, length));
			this.bulkLength = length;
		}
	}
});

JW.applyIf(JW.Collection.prototype, JW.Alg.SimpleMethods, JW.Alg.BuildMethods);

JW.Collection.EventParams = function(sender) {
	JW.Collection.EventParams._super.call(this, sender);
};

JW.extend(JW.Collection.EventParams/*<T extends JW.Class>*/, JW.EventParams, {
	/*
	Fields
	JW.Collection<T> sender;
	*/
});

JW.Collection.ItemRangeEventParams = function(sender, items, index) {
	JW.Collection.ItemRangeEventParams._super.call(this, sender);
	this.items = items;
	this.index = index;
};

JW.extend(JW.Collection.ItemRangeEventParams/*<T extends JW.Class>*/, JW.Collection.EventParams/*<T>*/, {
	/*
	Fields
	Array<T> items;
	Integer index;
	*/
});

JW.Collection.ItemsEventParams = function(sender, items) {
	JW.Collection.ItemsEventParams._super.call(this, sender);
	this.items = items;
};

JW.extend(JW.Collection.ItemsEventParams/*<T extends JW.Class>*/, JW.Collection.EventParams/*<T>*/, {
	/*
	Fields
	Array<T> items;
	*/
});

JW.Collection.LengthChangeEventParams = function(sender, oldLength, newLength) {
	JW.Collection.LengthChangeEventParams._super.call(this, sender);
	this.oldLength = oldLength;
	this.newLength = newLength;
};

JW.extend(JW.Collection.LengthChangeEventParams/*<T extends JW.Class>*/, JW.Collection.EventParams/*<T>*/, {
	/*
	Fields
	Integer oldLength;
	Integer newLength;
	*/
});

JW.Collection.MoveEventParams = function(sender, fromIndex, toIndex, item) {
	JW.Collection.MoveEventParams._super.call(this, sender);
	this.fromIndex = fromIndex;
	this.toIndex = toIndex;
	this.item = item;
};

JW.extend(JW.Collection.MoveEventParams/*<T extends JW.Class>*/, JW.Collection.EventParams/*<T>*/, {
	/*
	Fields
	Integer fromIndex;
	Integer toIndex;
	T item;
	*/
});

JW.Collection.ReplaceEventParams = function(sender, index, oldItem, newItem) {
	JW.Collection.ReplaceEventParams._super.call(this, sender);
	this.index = index;
	this.oldItem = oldItem;
	this.newItem = newItem;
};

JW.extend(JW.Collection.ReplaceEventParams/*<T extends JW.Class>*/, JW.Collection.EventParams/*<T>*/, {
	/*
	Fields
	Integer index;
	T oldItem;
	T newItem;
	*/
});
