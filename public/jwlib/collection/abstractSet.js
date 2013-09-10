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

JW.AbstractSet = function(items, adapter) {
	JW.AbstractSet._super.call(this);
	this.json = adapter ? items : items ? JW.Array.indexBy(items, "_iid") : {};
	this.length = JW.Set.getLength(this.json);
};

JW.extend(JW.AbstractSet/*<T>*/, JW.AbstractCollection/*<T>*/, {
	getJson: function() {
		return this.json;
	},
	
	getLength: function() {
		return this.length;
	},
	
	isEmpty: function() {
		return this.length === 0;
	},
	
	containsItem: function(item) {
		return this.json.hasOwnProperty(item._iid);
	},
	
	contains: function(item) {
		return this.json.hasOwnProperty(item._iid);
	},
	
	every: function(callback, scope) {
		return JW.Set.every(this.json, callback, scope);
	},
	
	filter: function(callback, scope) {
		return JW.Set.filter(this.json, callback, scope);
	},
	
	$filter: JW.AbstractCollection._create$Set("filter"),
	
	map: function(callback, scope) {
		return JW.Set.map(this.json, callback, scope);
	},
	
	$map: JW.AbstractCollection._create$Set("map"),
	
	asSet: function() {
		return this.json;
	},
	
	$asSet: function() {
		return this;
	},
	
	add: function(item) {
		return this.tryAdd(item) !== undefined;
	},
	
	tryAdd: function(item) {
		if (this.trySplice([], [item]) !== undefined) {
			return true;
		}
	},
	
	addAll: function(items) {
		var result = this.tryAddAll(items);
		return (result !== undefined) ? result : [];
	},
	
	$addAll: JW.AbstractCollection._create$Set("addAll"),
	
	tryAddAll: function(items) {
		var spliceResult = this.trySplice([], items);
		if (spliceResult !== undefined) {
			return spliceResult.addedItems;
		}
	},
	
	remove: function(item) {
		return this.tryRemove(item) !== undefined;
	},
	
	tryRemove: function(item) {
		if (this.trySplice([item], []) !== undefined) {
			return true;
		}
	},
	
	removeItem: function(item) {
		this.tryRemove(item);
	},
	
	removeAll: function(items) {
		var result = this.tryRemoveAll(items);
		return (result !== undefined) ? result : [];
	},
	
	$removeAll: JW.AbstractCollection._create$Array("removeAll"),
	
	tryRemoveAll: function(items) {
		var spliceResult = this.trySplice(items, []);
		if (spliceResult !== undefined) {
			return spliceResult.removedItems;
		}
	},
	
	removeItems: function(items) {
		this.tryRemoveAll(items);
	},
	
	clear: function() {
		var items = this.tryClear();
		return (items !== undefined) ? items : [];
	},
	
	$clear: JW.AbstractCollection._create$Array("clear"),
	
	tryClear: function() {
		this.length = 0;
		return JW.Set.tryClear(this.json);
	},
	
	splice: function(removedItems, addedItems) {
		var spliceResult = this.trySplice(removedItems, addedItems);
		return (spliceResult !== undefined) ? spliceResult : new JW.AbstractSet.SpliceResult([], []);
	},
	
	trySplice: function(removedItems, addedItems) {
		var spliceResult = JW.Set.trySplice(this.json, removedItems, addedItems);
		if (spliceResult) {
			this.length += spliceResult.addedItems.length - spliceResult.removedItems.length;
			return spliceResult;
		}
	},
	
	detectSplice: function(newItems) {
		return JW.Set.detectSplice(this.json, newItems);
	},
	
	performSplice: function(newItems) {
		var spliceParams = this.detectSplice(newItems);
		if (spliceParams !== undefined) {
			this.trySplice(spliceParams.removedItems, spliceParams.addedItems);
		}
	},
	
	createMapper: function(config) {
		return new JW.AbstractSet.Mapper(this, config);
	},
	
	createObserver: function(config) {
		return new JW.AbstractSet.Observer(this, config);
	},
	
	createOrderer: function(config) {
		return new JW.AbstractSet.Orderer(this, config);
	},
	
	createSorter: function(config) {
		return new JW.AbstractSet.Sorter(this, config);
	},
	
	createIndexer: function(config) {
		return new JW.AbstractSet.Indexer(this, config);
	},
	
	createLister: function(config) {
		return new JW.AbstractSet.Lister(this, config);
	},
	
	equal: function(array) {
		return JW.Set.equal(this.json, array);
	},
	
	_callStatic: function(algorithm, args) {
		return JW.Set[algorithm].apply(JW.Set, [this.json].concat(JW.args(args)));
	}
});

JW.AbstractSet.SpliceParams = function(removedItems, addedItems) {
	JW.AbstractSet.SpliceParams._super.call(this);
	this.removedItems = removedItems;
	this.addedItems = addedItems;
};

JW.extend(JW.AbstractSet.SpliceParams/*<T extends JW.Class>*/, JW.Class, {
	/*
	Fields
	Array<T> removedItems;
	Array<T> addedItems;
	*/
});

//--------

JW.AbstractSet.SpliceResult = function(removedItems, addedItems) {
	JW.AbstractSet.SpliceResult._super.call(this);
	this.removedItems = removedItems;
	this.addedItems = addedItems;
};

JW.extend(JW.AbstractSet.SpliceResult/*<T extends JW.Class>*/, JW.Class, {
	/*
	Fields
	Array<T> removedItems;
	Array<T> addedItems;
	*/
});
