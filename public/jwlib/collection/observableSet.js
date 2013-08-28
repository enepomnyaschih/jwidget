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

JW.ObservableSet = function(json, adapter) {
	JW.ObservableSet._super.call(this, json, adapter);
	this.spliceEvent = new JW.Event();
	this.clearEvent = new JW.Event();
	this.changeEvent = new JW.Event();
	this.lengthChangeEvent = new JW.Event();
	this._lastLength = this.getLength();
};

JW.extend(JW.ObservableSet/*<T extends JW.Class>*/, JW.AbstractSet/*<T>*/, {
	/*
	Fields
	JW.Event<JW.ObservableSet.SpliceEventParams<T>> spliceEvent;
	JW.Event<JW.ObservableSet.ItemsEventParams<T>> clearEvent;
	JW.Event<JW.ObservableSet.EventParams<T>> changeEvent;
	JW.Event<JW.ObservableSet.LengthChangeEventParams<T>> lengthChangeEvent;
	Integer _lastLength;
	*/
	
	// override
	destroy: function() {
		this.lengthChangeEvent.destroy();
		this.changeEvent.destroy();
		this.clearEvent.destroy();
		this.spliceEvent.destroy();
		this._super();
	},
	
	// override
	tryClear: function() {
		var items = this._super();
		if (items === undefined) {
			return;
		}
		this.clearEvent.trigger(new JW.ObservableSet.ItemsEventParams(this, items));
		this._triggerChange();
		return items;
	},
	
	// override
	trySplice: function(removedItems, addedItems) {
		var spliceResult = this._super(removedItems, addedItems);
		if (spliceResult === undefined) {
			return;
		}
		this.spliceEvent.trigger(new JW.ObservableSet.SpliceEventParams(this, spliceResult));
		this._triggerChange();
		return spliceResult;
	},
	
	// override
	createEmpty: function() {
		return new JW.ObservableSet();
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
		return new JW.ObservableSet.Mapper(this, config);
	},
	
	// override
	createObserver: function(config) {
		return new JW.ObservableSet.Observer(this, config);
	},
	
	// override
	createOrderer: function(config) {
		return new JW.ObservableSet.Orderer(this, config);
	},
	
	// override
	createSorter: function(config) {
		return new JW.ObservableSet.Sorter(this, config);
	},
	
	// override
	createIndexer: function(config) {
		return new JW.ObservableSet.Indexer(this, config);
	},
	
	// override
	createLister: function(config) {
		return new JW.ObservableSet.Lister(this, config);
	},
	
	_triggerChange: function() {
		this.changeEvent.trigger(new JW.ObservableSet.EventParams(this));
		var newLength = this.getLength();
		if (this._lastLength !== newLength) {
			this.lengthChangeEvent.trigger(new JW.ObservableSet.LengthChangeEventParams(this, this._lastLength, newLength));
			this._lastLength = newLength;
		}
	}
});

//--------

JW.ObservableSet.EventParams = function(sender) {
	JW.ObservableSet.EventParams._super.call(this, sender);
};

JW.extend(JW.ObservableSet.EventParams/*<T extends JW.Class>*/, JW.EventParams, {
	/*
	Fields
	JW.ObservableSet<T> sender;
	*/
});

//--------

JW.ObservableSet.SpliceEventParams = function(sender, spliceResult) {
	JW.ObservableSet.SpliceEventParams._super.call(this, sender);
	this.spliceResult = spliceResult;
};

JW.extend(JW.ObservableSet.SpliceEventParams/*<T extends JW.Class>*/, JW.ObservableSet.EventParams/*<T>*/, {
	/*
	Fields
	JW.AbstractSet.SpliceResult<T> spliceResult;
	*/
});

//--------

JW.ObservableSet.ItemsEventParams = function(sender, items) {
	JW.ObservableSet.ItemsEventParams._super.call(this, sender);
	this.items = items;
};

JW.extend(JW.ObservableSet.ItemsEventParams/*<T extends JW.Class>*/, JW.ObservableSet.EventParams/*<T>*/, {
	/*
	Fields
	Array<T> items;
	*/
});

//--------

JW.ObservableSet.LengthChangeEventParams = function(sender, oldLength, newLength) {
	JW.ObservableSet.LengthChangeEventParams._super.call(this, sender);
	this.oldLength = oldLength;
	this.newLength = newLength;
};

JW.extend(JW.ObservableSet.LengthChangeEventParams/*<T extends JW.Class>*/, JW.ObservableSet.EventParams/*<T>*/, {
	/*
	Fields
	Integer oldLength;
	Integer newLength;
	*/
});
