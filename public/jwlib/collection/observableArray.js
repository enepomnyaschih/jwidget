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

// TODO: tests and document bulk changes

JW.ObservableArray = function(items) {
	JW.ObservableArray._super.call(this);
	this.array = [];
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
	if (items) {
		this.addAll(items);
	}
};

JW.extend(JW.ObservableArray/*<T extends Any>*/, JW.Class, {
	/*
	Fields
	Array<T> array;
	JW.Event<JW.ObservableArray.ItemRangeEventParams<T>> addEvent;
	JW.Event<JW.ObservableArray.ItemRangeEventParams<T>> removeEvent;
	JW.Event<JW.ObservableArray.ReplaceEventParams<T>> replaceEvent;
	JW.Event<JW.ObservableArray.MoveEventParams<T>> moveEvent;
	JW.Event<JW.ObservableArray.ItemsEventParams<T>> clearEvent;
	JW.Event<JW.ObservableArray.ItemsEventParams<T>> reorderEvent;
	JW.Event<JW.ObservableArray.ItemsEventParams<T>> filterEvent;
	JW.Event<JW.ObservableArray.ItemsEventParams<T>> resetEvent;
	JW.Event<JW.ObservableArray.EventParams<T>> changeEvent;
	JW.Event<JW.ObservableArray.LengthChangeEventParams<T>> lengthChangeEvent;
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
	
	getSize: function() {
		return this.array.length;
	},
	
	isEmpty: function() {
		return this.array.length === 0;
	},
	
	get: function(index) {
		return this.array[index];
	},
	
	add: function(item, index) {
		if (index === undefined) {
			index = this.getLength();
		}
		this.array.splice(index, 0, item);
		this.addEvent.trigger(new JW.ObservableArray.ItemRangeEventParams(this, [ item ], index));
		this._triggerChange();
	},
	
	addAll: function(items, index) {
		if (items.length === 0) {
			return;
		}
		if (index === undefined) {
			index = this.getLength();
		}
		JW.Array.addAll(this.array, items, index);
		this.addEvent.trigger(new JW.ObservableArray.ItemRangeEventParams(this, items, index));
		this._triggerChange();
	},
	
	remove: function(index, count) {
		var items = this.array.splice(index, JW.def(count, 1));
		this.removeEvent.trigger(new JW.ObservableArray.ItemRangeEventParams(this, items, index));
		this._triggerChange();
		return (count === undefined) ? items[0] : items;
	},
	
	removeItem: function(item) {
		var index = this.indexOf(item);
		if (index !== undefined) {
			this.remove(index);
		}
		return index;
	},
	
	set: function(item, index) {
		var oldItem = this.array[index];
		if (oldItem === item) {
			return oldItem;
		}
		this.array[index] = item;
		this.replaceEvent.trigger(new JW.ObservableArray.ReplaceEventParams(this, index, oldItem, item));
		this._triggerChange();
		return oldItem;
	},
	
	move: function(fromIndex, toIndex) {
		var item = this.array[fromIndex];
		if (fromIndex === toIndex) {
			return item;
		};
		JW.Array.move(this.array, fromIndex, toIndex);
		this.moveEvent.trigger(new JW.ObservableArray.MoveEventParams(this, fromIndex, toIndex, item));
		this._triggerChange();
		return item;
	},
	
	clear: function() {
		if (this.isEmpty()) {
			return [];
		}
		var items = JW.Array.clear(this.array);
		this.clearEvent.trigger(new JW.ObservableArray.ItemsEventParams(this, items));
		this._triggerChange();
		return items;
	},
	
	performReorder: function(callback, scope) {
		this._perform(this.reorderEvent, callback, scope);
	},
	
	performFilter: function(callback, scope) {
		this._perform(this.filterEvent, callback, scope);
	},
	
	performReset: function(callback, scope) {
		this._perform(this.resetEvent, callback, scope);
	},
	
	startBulkChange: function() {
		if (this.bulkCount === 0) {
			this.bulkDirty = false;
		}
		++this.bulkCount;
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
		return JW.Array.every(this.array, callback, scope);
	},
	
	backEvery: function(target, callback, scope) {
		return JW.Array.backEvery(this.array, callback, scope);
	},
	
	createEmpty: function() {
		return new JW.ObservableArray();
	},
	
	createEmptyUnobservable: function() {
		return new JW.Array();
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
	
	getItems: function() {
		return this.array;
	},
	
	createIndexer: function(config) {
		return new JW.ObservableArray.Indexer(this, config);
	},
	
	createObserver: function(config) {
		return new JW.ObservableArray.Observer(this, config);
	},
	
	createInserter: function(config) {
		return new JW.ObservableArray.Inserter(this, config);
	},
	
	createLister: function(config) {
		return new JW.ObservableArray.Lister(this, config);
	},
	
	createMapper: function(config) {
		return new JW.ObservableArray.Mapper(this, config);
	},
	
	createSplitter: function(config) {
		return new JW.ObservableArray.Splitter(this, config);
	},
	
	_triggerChange: function() {
		if (this.bulkCount !== 0) {
			this.bulkDirty = true;
			return;
		}
		this.changeEvent.trigger(new JW.ObservableArray.EventParams(this));
		var length = this.getLength();
		if (this.bulkLength !== length) {
			this.lengthChangeEvent.trigger(new JW.ObservableArray.LengthChangeEventParams(this, this.bulkLength, length));
			this.bulkLength = length;
		}
	},
	
	_perform: function(event, callback, scope) {
		var params = new JW.ObservableArray.ItemsEventParams(this, this.array.concat());
		var items = callback.call(scope || this, this.array);
		if (items && (items !== this.array)) {
			JW.Array.clear(this.array);
			JW.Array.addAll(this.array, items);
		}
		event.trigger(params);
		this._triggerChange();
	}
});

JW.ObservableArray.prototype.getLength = JW.ObservableArray.prototype.getSize;
JW.ObservableArray.prototype.pushItem = JW.ObservableArray.prototype.add;

JW.apply(JW.ObservableArray.prototype, JW.Alg.BuildMethods);

JW.ObservableArray.EventParams = function(sender) {
	JW.ObservableArray.EventParams._super.call(this, sender);
};

JW.extend(JW.ObservableArray.EventParams/*<T extends Any>*/, JW.EventParams, {
	/*
	Fields
	JW.ObservableArray<T> sender;
	*/
});

JW.ObservableArray.ItemRangeEventParams = function(sender, items, index) {
	JW.ObservableArray.ItemRangeEventParams._super.call(this, sender);
	this.items = items;
	this.index = index;
};

JW.extend(JW.ObservableArray.ItemRangeEventParams/*<T extends Any>*/, JW.ObservableArray.EventParams/*<T>*/, {
	/*
	Fields
	Array<T> items;
	Integer index;
	*/
});

JW.ObservableArray.ItemsEventParams = function(sender, items) {
	JW.ObservableArray.ItemsEventParams._super.call(this, sender);
	this.items = items;
};

JW.extend(JW.ObservableArray.ItemsEventParams/*<T extends Any>*/, JW.ObservableArray.EventParams/*<T>*/, {
	/*
	Fields
	Array<T> items;
	*/
});

JW.ObservableArray.LengthChangeEventParams = function(sender, oldLength, newLength) {
	JW.ObservableArray.LengthChangeEventParams._super.call(this, sender);
	this.oldLength = oldLength;
	this.newLength = newLength;
};

JW.extend(JW.ObservableArray.LengthChangeEventParams/*<T extends Any>*/, JW.ObservableArray.EventParams/*<T>*/, {
	/*
	Fields
	Integer oldLength;
	Integer newLength;
	*/
});

JW.ObservableArray.MoveEventParams = function(sender, fromIndex, toIndex, item) {
	JW.ObservableArray.MoveEventParams._super.call(this, sender);
	this.fromIndex = fromIndex;
	this.toIndex = toIndex;
	this.item = item;
};

JW.extend(JW.ObservableArray.MoveEventParams/*<T extends Any>*/, JW.ObservableArray.EventParams/*<T>*/, {
	/*
	Fields
	Integer fromIndex;
	Integer toIndex;
	T item;
	*/
});

JW.ObservableArray.ReplaceEventParams = function(sender, index, oldItem, newItem) {
	JW.ObservableArray.ReplaceEventParams._super.call(this, sender);
	this.index = index;
	this.oldItem = oldItem;
	this.newItem = newItem;
};

JW.extend(JW.ObservableArray.ReplaceEventParams/*<T extends Any>*/, JW.ObservableArray.EventParams/*<T>*/, {
	/*
	Fields
	Integer index;
	T oldItem;
	T newItem;
	*/
});
