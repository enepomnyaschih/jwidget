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

JW.Set = function(json) {
	JW.Set._super.call(this);
	this.json = {};
	this.size = 0;
	this.getKey = null;
	if (json) {
		this.addAll(json);
	}
};

JW.extend(JW.Set/*<T extends JW.Class>*/, JW.Class, {
	/*
	Fields
	Map<T> json;
	Integer size;
	String getKey(T item);
	*/
	
	getJson: function() {
		return this.json;
	},
	
	getSize: function() {
		return this.size;
	},
	
	isEmpty: function() {
		return this.size === 0;
	},
	
	contains: function(item) {
		return this.json.hasOwnProperty(item._iid);
	},
	
	add: function(item) {
		var iid = item._iid;
		if (this.json.hasOwnProperty(iid)) {
			return;
		}
		this.json[iid] = item;
		++this.size;
		return true;
	},
	
	addAll: function(items) {
		var addedItems = [];
		for (var i = 0, l = items.length; i < l; ++i) {
			var item = items[i];
			if (this.add(item)) {
				addedItems.push(item);
			}
		}
		if (addedItems.length !== 0) {
			return addedItems;
		}
	},
	
	remove: function(item) {
		var iid = item._iid;
		if (!this.json.hasOwnProperty(iid)) {
			return;
		}
		delete this.json[iid];
		--this.size;
		return true;
	},
	
	removeItem: function(item) {
		if (this.remove(item)) {
			return item._iid;
		}
	},
	
	removeAll: function(items) {
		var removedItems = [];
		for (var i = 0, l = items.length; i < l; ++i) {
			var item = items[i];
			if (this.remove(item)) {
				removedItems.push(item);
			}
		}
		if (removedItems.length !== 0) {
			return removedItems;
		}
	},
	
	clear: function() {
		if (this.size === 0) {
			return;
		}
		var removedItems = this.getValuesArray();
		this.json = {};
		this.size = 0;
		return removedItems;
	},
	
	splice: function(removedItems, addedItems) {
		removedItems = this.removeAll(removedItems);
		addedItems = this.addAll(addedItems);
		if ((removedItems !== undefined) || (addedItems !== undefined)) {
			return new JW.AbstractSet.SpliceResult(removedItems || [], addedItems || []);
		}
	},
	
	detectSplice: function(newItems) {
		return JW.Set.detectSplice(this.json, newItems);
	},
	
	performSplice: function(newItems) {
		var spliceParams = this.detectSplice(newItems);
		if (spliceParams !== undefined) {
			return this.splice(spliceParams.removedItems, spliceParams.addedItems);
		}
	},
	
	every: function(callback, scope) {
		return JW.Set.every(this.json, callback, scope);
	},
	
	createEmpty: function() {
		return new JW.Set();
	},
	
	createEmptyUnobservable: function() {
		return new JW.Set();
	},
	
	createEmptyArray: function() {
		return new JW.Array();
	},
	
	createEmptyMap: function() {
		return new JW.Map();
	},
	
	createEmptySet: function() {
		return new JW.Set();
	},
	
	createIndexer: function(config) {
		return new JW.AbstractSet.Indexer(this, config);
	},
	
	createMapper: function(config) {
		return new JW.AbstractSet.Mapper(this, config);
	},
	
	createObserver: function(config) {
		return new JW.AbstractSet.Observer(this, config);
	},
	
	equal: function(set) {
		if (this === set) {
			return true;
		}
		if (this.getSize() !== set.getSize()) {
			return false;
		}
		for (var iid in this.json) {
			if (!set.json.hasOwnProperty(iid)) {
				return false;
			}
		}
		return true;
	}
});

JW.Set.prototype.getLength = JW.Set.prototype.getSize;
JW.Set.prototype.pushItem = JW.Set.prototype.add;

JW.applyIf(JW.Set.prototype, JW.Alg.BuildMethods);

JW.apply(JW.Set, {
	contains: function(target, item) {
		return target.hasOwnProperty(item._iid);
	},
	
	add: function(target, item) {
		var iid = item._iid;
		if (target.hasOwnProperty(iid)) {
			return;
		}
		target[iid] = item;
		return true;
	},
	
	addAll: function(target, items) {
		var addedItems = [];
		for (var i = 0, l = items.length; i < l; ++i) {
			var item = items[i];
			if (JW.Set.add(target, item)) {
				addedItems.push(item);
			}
		}
		if (addedItems.length !== 0) {
			return addedItems;
		}
	},
	
	remove: function(target, item) {
		var iid = item._iid;
		if (!target.hasOwnProperty(iid)) {
			return;
		}
		delete target[iid];
		return true;
	},
	
	removeItem: function(target, item) {
		if (JW.Set.remove(target, item)) {
			return item._iid;
		}
	},
	
	removeAll: function(target, items) {
		var removedItems = [];
		for (var i = 0, l = items.length; i < l; ++i) {
			var item = items[i];
			if (JW.Set.remove(target, item)) {
				removedItems.push(item);
			}
		}
		if (removedItems.length !== 0) {
			return removedItems;
		}
	},
	
	clear: function(target) {
		if (JW.Set.isEmpty(target)) {
			return;
		}
		var items = JW.Set.getValuesArray(target);
		JW.Set.removeAll(target, items);
		return items;
	},
	
	splice: function(target, removedItems, addedItems) {
		removedItems = JW.Set.removeAll(target, removedItems);
		addedItems = JW.Set.addAll(target, addedItems);
		if ((removedItems !== undefined) || (addedItems !== undefined)) {
			return new JW.AbstractSet.SpliceResult(removedItems || [], addedItems || []);
		}
	},
	
	detectSplice: function(oldItems, newItemArray) {
		var removedItems = [];
		var addedItems = [];
		var newItems = JW.Array.indexBy(newItemArray, "_iid");
		for (var key in oldItems) {
			if (!newItems.hasOwnProperty(key)) {
				removedItems.push(oldItems[key]);
			}
		}
		for (var key in newItems) {
			if (!oldItems.hasOwnProperty(key)) {
				addedItems.push(newItems[key]);
			}
		}
		if ((removedItems.length !== 0) || (addedItems.length !== 0)) {
			return new JW.AbstractSet.SpliceParams(removedItems, addedItems);
		}
	},
	
	performSplice: function(target, newItemArray) {
		var spliceParams = JW.Set.detectSplice(target, newItemArray);
		if (spliceParams !== undefined) {
			return JW.Set.splice(target, spliceParams.removedItems, spliceParams.addedItems);
		}
	},
	
	every: function(target, callback, scope) {
		for (var key in target) {
			if (callback.call(scope || target, target[key], undefined, target) === false) {
				return false;
			}
		}
		return true;
	},
	
	equal: function(x, y) {
		if (x === y) {
			return true;
		}
		var size = JW.Set.getSize(y);
		for (var iid in x) {
			if ((--size < 0) || !y.hasOwnProperty(iid)) {
				return false;
			}
		}
		return size === 0;
	},
	
	clone: JW.Map.clone,
	
	single: function(item) {
		var result = {};
		result[item._iid] = item;
		return result;
	}
});

JW.applyIf(
	JW.Set,
	JW.Alg.createBuildFunctions(
		JW.Set.every,
		function() { return {}; },
		function() { return {}; },
		function(target, item) { target[item._iid] = item; }
	)
);
