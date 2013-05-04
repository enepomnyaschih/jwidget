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

JW.ObservableArray = function(items) {
	JW.ObservableArray._super.call(this);
	this.array = [];
	this.getKey = null;
	this.spliceEvent = new JW.Event();
	this.replaceEvent = new JW.Event();
	this.moveEvent = new JW.Event();
	this.clearEvent = new JW.Event();
	this.reorderEvent = new JW.Event();
	this.changeEvent = new JW.Event();
	this.lengthChangeEvent = new JW.Event();
	this._lastLength = 0;
	if (items) {
		this.addAll(items);
	}
};

JW.extend(JW.ObservableArray/*<T extends Any>*/, JW.Class, {
	/*
	Fields
	Array<T> array;
	String getKey(T item);
	JW.Event<JW.ObservableArray.SpliceEventParams<T>> spliceEvent;
	JW.Event<JW.ObservableArray.ReplaceEventParams<T>> replaceEvent;
	JW.Event<JW.ObservableArray.MoveEventParams<T>> moveEvent;
	JW.Event<JW.ObservableArray.ItemsEventParams<T>> clearEvent;
	JW.Event<JW.ObservableArray.ReorderEventParams<T>> reorderEvent;
	JW.Event<JW.ObservableArray.EventParams<T>> changeEvent;
	JW.Event<JW.ObservableArray.LengthChangeEventParams<T>> lengthChangeEvent;
	Integer _lastLength;
	*/
	
	destroy: function() {
		this.clear();
		this.lengthChangeEvent.destroy();
		this.changeEvent.destroy();
		this.reorderEvent.destroy();
		this.clearEvent.destroy();
		this.moveEvent.destroy();
		this.replaceEvent.destroy();
		this.spliceEvent.destroy();
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
		return this.splice([], [ new JW.AbstractArray.IndexItems(index, [ item ]) ]) !== undefined;
	},
	
	addAll: function(items, index) {
		return this.splice([], [ new JW.AbstractArray.IndexItems(index, items) ]) !== undefined;
	},
	
	remove: function(index, count) {
		var result = this.splice([ new JW.AbstractArray.IndexCount(index, JW.defn(count, 1)) ], []);
		if (result) {
			var items = result.removedItemsList[0].items;
			return (count === undefined) ? items[0] : items;
		}
	},
	
	removeItem: function(item) {
		var index = this.indexOf(item);
		if (index !== undefined) {
			this.remove(index);
		}
		return index;
	},
	
	set: function(item, index) {
		if (index === this.array.length) {
			this.add(item);
			return new JW.Proxy();
		}
		var result = JW.Array.set(this.array, item, index);
		if (result === undefined) {
			return;
		}
		this.replaceEvent.trigger(new JW.ObservableArray.ReplaceEventParams(this, index, result.value, item));
		this._triggerChange();
		return oldItem;
	},
	
	move: function(fromIndex, toIndex) {
		var item = JW.Array.move(this.array, fromIndex, toIndex);
		if (item === undefined) {
			return;
		}
		this.moveEvent.trigger(new JW.ObservableArray.MoveEventParams(this, fromIndex, toIndex, item));
		this._triggerChange();
		return item;
	},
	
	clear: function() {
		var items = JW.Array.clear(this.array);
		if (items === undefined) {
			return;
		}
		this.clearEvent.trigger(new JW.ObservableArray.ItemsEventParams(this, items));
		this._triggerChange();
		return items;
	},
	
	splice: function(removeParamsList, addParamsList) {
		var result = JW.Array.splice(this.array, removeParamsList, addParamsList);
		if (result === undefined) {
			return;
		}
		this.spliceEvent.trigger(new JW.ObservableArray.SpliceEventParams(this, result));
		this._triggerChange();
		return result;
	},
	
	reorder: function(indexArray) {
		var items = JW.Array.reorder(this.array, indexArray);
		if (items === undefined) {
			return;
		}
		this.reorderEvent.trigger(new JW.ObservableArray.ReorderEventParams(this, indexArray, items));
		this._triggerChange();
		return items;
	},
	
	detectSplice: function(items, getKey, scope) {
		return JW.Array.detectSplice(this.array, items, getKey || this.getKey, scope || this);
	},
	
	detectReorder: function(items, getKey, scope) {
		return JW.Array.detectReorder(this.array, items, getKey || this.getKey, scope || this);
	},
	
	performSplice: function(items, getKey, scope) {
		var spliceParams = this.detectSplice(items, getKey, scope);
		if (spliceParams !== undefined) {
			return this.splice(spliceParams.removeParamsList, spliceParams.addParamsList);
		}
	},
	
	performReorder: function(items, getKey, scope) {
		var indexArray = this.detectReorder(items, getKey, scope);
		if (indexArray !== undefined) {
			return this.reorder(indexArray);
		}
	},
	
	every: function(callback, scope) {
		return JW.Array.every(this.array, callback, scope);
	},
	
	backEvery: function(target, callback, scope) {
		return JW.Array.backEvery(this.array, callback, scope);
	},
	
	top: function() {
		return JW.Array.top(this.array);
	},
	
	pop: function() {
		var length = this.getLength();
		if (length !== 0) {
			return this.remove(length - 1);
		}
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
		this.changeEvent.trigger(new JW.ObservableArray.EventParams(this));
		var length = this.getLength();
		if (this._lastLength !== length) {
			this.lengthChangeEvent.trigger(new JW.ObservableArray.LengthChangeEventParams(this, this._lastLength, length));
			this._lastLength = length;
		}
	}
});

JW.ObservableArray.prototype.getLength = JW.ObservableArray.prototype.getSize;
JW.ObservableArray.prototype.pushItem = JW.ObservableArray.prototype.add;

JW.apply(JW.ObservableArray.prototype, JW.Alg.BuildMethods);

//--------

JW.ObservableArray.EventParams = function(sender) {
	JW.ObservableArray.EventParams._super.call(this, sender);
};

JW.extend(JW.ObservableArray.EventParams/*<T>*/, JW.EventParams, {
	/*
	Fields
	JW.ObservableArray<T> sender;
	*/
});

//--------

JW.ObservableArray.SpliceEventParams = function(sender, spliceResult) {
	JW.ObservableArray.SpliceEventParams._super.call(this, sender);
	this.spliceResult = spliceResult;
};

JW.extend(JW.ObservableArray.SpliceEventParams/*<T>*/, JW.ObservableArray.EventParams/*<T>*/, {
	/*
	Fields
	JW.AbstractArray.SpliceResult<T> spliceResult;
	*/
});

//--------

JW.ObservableArray.MoveEventParams = function(sender, fromIndex, toIndex, item) {
	JW.ObservableArray.MoveEventParams._super.call(this, sender);
	this.fromIndex = fromIndex;
	this.toIndex = toIndex;
	this.item = item;
};

JW.extend(JW.ObservableArray.MoveEventParams/*<T>*/, JW.ObservableArray.EventParams/*<T>*/, {
	/*
	Fields
	Integer fromIndex;
	Integer toIndex;
	T item;
	*/
});

//--------

JW.ObservableArray.ReplaceEventParams = function(sender, index, oldItem, newItem) {
	JW.ObservableArray.ReplaceEventParams._super.call(this, sender);
	this.index = index;
	this.oldItem = oldItem;
	this.newItem = newItem;
};

JW.extend(JW.ObservableArray.ReplaceEventParams/*<T>*/, JW.ObservableArray.EventParams/*<T>*/, {
	/*
	Fields
	Integer index;
	T oldItem;
	T newItem;
	*/
});

//--------

JW.ObservableArray.ItemsEventParams = function(sender, items) {
	JW.ObservableArray.ItemsEventParams._super.call(this, sender);
	this.items = items;
};

JW.extend(JW.ObservableArray.ItemsEventParams/*<T>*/, JW.ObservableArray.EventParams/*<T>*/, {
	/*
	Fields
	Array<T> items;
	*/
});

//--------

JW.ObservableArray.ReorderEventParams = function(sender, indexArray, items) {
	JW.ObservableArray.ReorderEventParams._super.call(this, sender, items);
	this.indexArray = indexArray;
};

JW.extend(JW.ObservableArray.ReorderEventParams/*<T>*/, JW.ObservableArray.ItemsEventParams/*<T>*/, {
	/*
	Fields
	Array<Integer> indexArray;
	*/
});

//--------

JW.ObservableArray.LengthChangeEventParams = function(sender, oldLength, newLength) {
	JW.ObservableArray.LengthChangeEventParams._super.call(this, sender);
	this.oldLength = oldLength;
	this.newLength = newLength;
};

JW.extend(JW.ObservableArray.LengthChangeEventParams/*<T>*/, JW.ObservableArray.EventParams/*<T>*/, {
	/*
	Fields
	Integer oldLength;
	Integer newLength;
	*/
});
