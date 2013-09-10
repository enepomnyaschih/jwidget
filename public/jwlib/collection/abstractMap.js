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

JW.AbstractMap = function(json, adapter) {
	JW.AbstractMap._super.call(this);
	this.json = adapter ? json : json ? JW.apply({}, json) : {};
	this.length = JW.Map.getLength(this.json);
	this.getKey = null;
};

JW.extend(JW.AbstractMap/*<T>*/, JW.IndexedCollection/*<String, T>*/, {
	/*
	Fields
	Map<T> json;
	Integer length;
	String getKey(T item);
	*/
	
	getJson: function() {
		return this.json;
	},
	
	getLength: function() {
		return this.length;
	},
	
	isEmpty: function() {
		return this.length === 0;
	},
	
	get: function(key) {
		return this.json[key];
	},
	
	getKeys: function() {
		return JW.Map.getKeys(this.json);
	},
	
	every: function(callback, scope) {
		return JW.Map.every(this.json, callback, scope);
	},
	
	filter: function(callback, scope) {
		return JW.Map.filter(this.json, callback, scope);
	},
	
	$filter: JW.AbstractCollection._create$Map("filter"),
	
	map: function(callback, scope) {
		return JW.Map.map(this.json, callback, scope);
	},
	
	$map: JW.AbstractCollection._create$Map("map"),
	
	asMap: function() {
		return this.json;
	},
	
	$asMap: function() {
		return this;
	},
	
	trySet: function(item, key) {
		var spliceResult = this.trySplice([], JW.Map.single(key, item));
		if (spliceResult !== undefined) {
			return new JW.Proxy(spliceResult.removedItems[key]);
		}
	},
	
	setAll: function(items) {
		var spliceResult = this.trySetAll(items);
		return (spliceResult !== undefined) ? spliceResult : new JW.AbstractMap.SpliceResult({}, {});
	},
	
	trySetAll: function(items) {
		return this.trySplice([], items);
	},
	
	setKey: function(oldKey, newKey) {
		var item = this.trySetKey(oldKey, newKey);
		return (item !== undefined) ? item : this.json[newKey];
	},
	
	trySetKey: function(oldKey, newKey) {
		var keyMap = this.tryReindex(JW.Map.single(oldKey, newKey));
		if (keyMap !== undefined) {
			return this.json[newKey];
		}
	},
	
	tryRemove: function(key) {
		var spliceResult = this.trySplice([key], {});
		if (spliceResult !== undefined) {
			return spliceResult.removedItems[key];
		}
	},
	
	removeAll: function(keys) {
		var items = this.tryRemoveAll(keys);
		return (items !== undefined) ? items : {};
	},
	
	$removeAll: JW.AbstractCollection._create$Map("removeAll"),
	
	tryRemoveAll: function(keys) {
		var spliceResult = this.trySplice(keys, {});
		if (spliceResult !== undefined) {
			return spliceResult.removedItems;
		}
	},
	
	removeItems: function(items) {
		var itemSet = new JW.Set(items);
		var newItems = this.filter(function(item) {
			return !itemSet.contains(item);
		});
		this.performSplice(newItems);
	},
	
	clear: function() {
		var result = this.tryClear();
		return (result !== undefined) ? result : {};
	},
	
	$clear: JW.AbstractCollection._create$Map("clear"),
	
	tryClear: function() {
		this.length = 0;
		return JW.Map.tryClear(this.json);
	},
	
	splice: function(removedKeys, updatedItems) {
		var spliceResult = this.trySplice(removedKeys, updatedItems);
		return (spliceResult !== undefined) ? spliceResult : new JW.AbstractMap.SpliceResult({}, {});
	},
	
	trySplice: function(removedKeys, updatedItems) {
		var spliceResult = JW.Map.trySplice(this.json, removedKeys, updatedItems);
		if (spliceResult) {
			this.length += JW.Map.getLength(spliceResult.addedItems) - JW.Map.getLength(spliceResult.removedItems);
			return spliceResult;
		}
	},
	
	reindex: function(keyMap) {
		var result = this.tryReindex(keyMap);
		return (result !== undefined) ? result : {};
	},
	
	tryReindex: function(keyMap) {
		return JW.Map.tryReindex(this.json, keyMap);
	},
	
	detectSplice: function(newItems) {
		return JW.Map.detectSplice(this.json, newItems);
	},
	
	detectReindex: function(newItems, getKey, scope) {
		return JW.Map.detectReindex(this.json, newItems, getKey || this.getKey, scope || this);
	},
	
	performSplice: function(newItems) {
		var params = this.detectSplice(newItems);
		if (params !== undefined) {
			this.trySplice(params.removedKeys, params.updatedItems);s
		}
	},
	
	performReindex: function(newItems, getKey, scope) {
		var keyMap = this.detectReindex(newItems, getKey, scope);
		if (keyMap !== undefined) {
			this.tryReindex(keyMap);
		}
	},
	
	createMapper: function(config) {
		return new JW.AbstractMap.Mapper(this, config);
	},
	
	createObserver: function(config) {
		return new JW.AbstractMap.Observer(this, config);
	},
	
	createOrderer: function(config) {
		return new JW.AbstractMap.Orderer(this, config);
	},
	
	createSorter: function(config) {
		return new JW.AbstractMap.Sorter(this, config);
	},
	
	createIndexer: function(config) {
		return new JW.AbstractMap.Indexer(this, config);
	},
	
	createLister: function(config) {
		return new JW.AbstractMap.Lister(this, config);
	},
	
	createInserter: function(config) {
		return new JW.AbstractMap.Inserter(this, config);
	},
	
	equal: function(map) {
		return JW.Map.equal(this.json, map);
	},
	
	_callStatic: function(algorithm, args) {
		return JW.Map[algorithm].apply(JW.Map, [this.json].concat(JW.args(args)));
	}
});

JW.AbstractMap.SpliceParams = function(removedKeys, updatedItems) {
	JW.AbstractMap.SpliceParams._super.call(this);
	this.removedKeys = removedKeys;
	this.updatedItems = updatedItems;
};

JW.extend(JW.AbstractMap.SpliceParams/*<T>*/, JW.Class, {
	/*
	Fields
	Array<String> removedKeys;
	Map<T> updatedItems;
	*/
});

//--------

JW.AbstractMap.SpliceResult = function(removedItems, addedItems) {
	JW.AbstractMap.SpliceResult._super.call(this);
	this.removedItems = removedItems;
	this.addedItems = addedItems;
};

JW.extend(JW.AbstractMap.SpliceResult/*<T>*/, JW.Class, {
	/*
	Fields
	Map<T> removedItems;
	Map<T> addedItems;
	*/
});
