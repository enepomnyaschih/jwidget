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

JW.ObservableArray = function(items, adapter) {
	JW.ObservableArray._super.call(this, items, adapter);
	this.spliceEvent = new JW.Event();
	this.replaceEvent = new JW.Event();
	this.moveEvent = new JW.Event();
	this.clearEvent = new JW.Event();
	this.reorderEvent = new JW.Event();
	this.changeEvent = new JW.Event();
	this.lengthChangeEvent = new JW.Event();
	this._lastLength = this.items.length;
};

JW.extend(JW.ObservableArray/*<T>*/, JW.AbstractArray/*<T>*/, {
	/*
	Fields
	JW.Event<JW.ObservableArray.SpliceEventParams<T>> spliceEvent;
	JW.Event<JW.ObservableArray.ReplaceEventParams<T>> replaceEvent;
	JW.Event<JW.ObservableArray.MoveEventParams<T>> moveEvent;
	JW.Event<JW.ObservableArray.ItemsEventParams<T>> clearEvent;
	JW.Event<JW.ObservableArray.ReorderEventParams<T>> reorderEvent;
	JW.Event<JW.ObservableArray.EventParams<T>> changeEvent;
	JW.Event<JW.ObservableArray.LengthChangeEventParams<T>> lengthChangeEvent;
	Integer _lastLength;
	*/
	
	// override
	destroy: function() {
		this.lengthChangeEvent.destroy();
		this.changeEvent.destroy();
		this.reorderEvent.destroy();
		this.clearEvent.destroy();
		this.moveEvent.destroy();
		this.replaceEvent.destroy();
		this.spliceEvent.destroy();
		this._super();
	},
	
	// override
	trySet: function(item, index) {
		var oldItem = this._super(item, index);
		if (oldItem === undefined) {
			return;
		}
		this.replaceEvent.trigger(new JW.ObservableArray.ReplaceEventParams(this, index, oldItem.value, item));
		this._triggerChange();
		return oldItem;
	},
	
	// override
	tryMove: function(fromIndex, toIndex) {
		var item = this._super(fromIndex, toIndex);
		if (item === undefined) {
			return;
		}
		this.moveEvent.trigger(new JW.ObservableArray.MoveEventParams(this, fromIndex, toIndex, item));
		this._triggerChange();
		return item;
	},
	
	// override
	tryClear: function() {
		var oldItems = this._super();
		if (oldItems === undefined) {
			return;
		}
		this.clearEvent.trigger(new JW.ObservableArray.ItemsEventParams(this, oldItems));
		this._triggerChange();
		return oldItems;
	},
	
	// override
	trySplice: function(removeParamsList, addParamsList) {
		var result = this._super(removeParamsList, addParamsList);
		if (result === undefined) {
			return;
		}
		this.spliceEvent.trigger(new JW.ObservableArray.SpliceEventParams(this, result));
		this._triggerChange();
		return result;
	},
	
	// override
	tryReorder: function(indexArray) {
		var items = this._super(indexArray);
		if (items === undefined) {
			return;
		}
		this.reorderEvent.trigger(new JW.ObservableArray.ReorderEventParams(this, indexArray, items));
		this._triggerChange();
		return items;
	},
	
	// override
	createEmpty: function() {
		return new JW.ObservableArray();
	},
	
	// override
	createEmptyArray: function() {
		return new JW.ObservableArray();
	},
	
	// override
	createEmptyMap: function() {
		return new JW.ObservableMap();
	},
	
	// override
	createEmptySet: function() {
		return new JW.ObservableSet();
	},
	
	// override
	createMapper: function(config) {
		return new JW.ObservableArray.Mapper(this, config);
	},
	
	// override
	createObserver: function(config) {
		return new JW.ObservableArray.Observer(this, config);
	},
	
	// override
	createOrderer: function(config) {
		return new JW.ObservableArray.Orderer(this, config);
	},
	
	// override
	createSorter: function(config) {
		return new JW.ObservableArray.Sorter(this, config);
	},
	
	// override
	createIndexer: function(config) {
		return new JW.ObservableArray.Indexer(this, config);
	},
	
	// override
	createLister: function(config) {
		return new JW.ObservableArray.Lister(this, config);
	},
	
	// override
	createInserter: function(config) {
		return new JW.ObservableArray.Inserter(this, config);
	},
	
	// override
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
