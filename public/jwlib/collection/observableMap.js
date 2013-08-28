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

JW.ObservableMap = function(json, adapter) {
	JW.ObservableMap._super.call(this, json, adapter);
	this.spliceEvent = new JW.Event();
	this.reindexEvent = new JW.Event();
	this.clearEvent = new JW.Event();
	this.changeEvent = new JW.Event();
	this.lengthChangeEvent = new JW.Event();
	this._lastLength = this.getLength();
};

JW.extend(JW.ObservableMap/*<T>*/, JW.AbstractMap/*<T>*/, {
	/*
	Fields
	JW.Event<JW.ObservableMap.SpliceEventParams<T>> spliceEvent;
	JW.Event<JW.ObservableMap.ReindexEventParams<T>> reindexEvent;
	JW.Event<JW.ObservableMap.ItemsEventParams<T>> clearEvent;
	JW.Event<JW.ObservableMap.EventParams<T>> changeEvent;
	JW.Event<JW.ObservableMap.LengthChangeEventParams<T>> lengthChangeEvent;
	Integer _lastLength;
	*/
	
	// override
	destroy: function() {
		this.lengthChangeEvent.destroy();
		this.changeEvent.destroy();
		this.clearEvent.destroy();
		this.reindexEvent.destroy();
		this.spliceEvent.destroy();
		this._super();
	},
	
	// override
	trySplice: function(removedKeys, updatedItems) {
		var spliceResult = this._super(removedKeys, updatedItems);
		if (spliceResult === undefined) {
			return;
		}
		this.spliceEvent.trigger(new JW.ObservableMap.SpliceEventParams(this, spliceResult));
		this._triggerChange();
		return spliceResult;
	},
	
	// override
	tryClear: function() {
		var items = this._super();
		if (items === undefined) {
			return;
		}
		this.clearEvent.trigger(new JW.ObservableMap.ItemsEventParams(this, items));
		this._triggerChange();
		return items;
	},
	
	// override
	tryReindex: function(keyMap) {
		var result = this._super(keyMap);
		if (result === undefined) {
			return;
		}
		this.reindexEvent.trigger(new JW.ObservableMap.ReindexEventParams(this, result));
		this._triggerChange();
		return result;
	},
	
	// override
	createEmpty: function() {
		return new JW.ObservableMap();
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
		return new JW.ObservableMap.Mapper(this, config);
	},
	
	// override
	createObserver: function(config) {
		return new JW.ObservableMap.Observer(this, config);
	},
	
	// override
	createOrderer: function(config) {
		return new JW.ObservableMap.Orderer(this, config);
	},
	
	// override
	createSorter: function(config) {
		return new JW.ObservableMap.Sorter(this, config);
	},
	
	// override
	createIndexer: function(config) {
		return new JW.ObservableMap.Indexer(this, config);
	},
	
	// override
	createLister: function(config) {
		return new JW.ObservableMap.Lister(this, config);
	},
	
	// override
	createInserter: function(config) {
		return new JW.ObservableMap.Inserter(this, config);
	},
	
	_triggerChange: function() {
		this.changeEvent.trigger(new JW.ObservableMap.EventParams(this));
		var newLength = this.getLength();
		if (this._lastLength !== newLength) {
			this.lengthChangeEvent.trigger(new JW.ObservableMap.LengthChangeEventParams(this, this._lastLength, newLength));
			this._lastLength = newLength;
		}
	}
});

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

JW.ObservableMap.LengthChangeEventParams = function(sender, oldLength, newLength) {
	JW.ObservableMap.LengthChangeEventParams._super.call(this, sender);
	this.oldLength = oldLength;
	this.newLength = newLength;
};

JW.extend(JW.ObservableMap.LengthChangeEventParams/*<T>*/, JW.ObservableMap.EventParams/*<T>*/, {
	/*
	Fields
	Integer oldLength;
	Integer newLength;
	*/
});
