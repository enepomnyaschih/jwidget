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

JW.Map = function(json) {
	JW.Map._super.call(this);
	this.json = {};
	this.size = 0;
	this.getKey = null;
	if (json) {
		this.setAll(json);
	}
};

JW.extend(JW.Map/*<T extends Any>*/, JW.Class, {
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
	
	contains: function(key) {
		return this.json.hasOwnProperty(key);
	},
	
	get: function(key) {
		return this.json[key];
	},
	
	set: function(item, key) {
		if (item === undefined) {
			return null;
		}
		var oldItem = this.json[key];
		if (oldItem === item) {
			return null;
		}
		if (oldItem === undefined) {
			++this.size;
		}
		this.json[key] = item;
		return new JW.AbstractMap.ItemResult(oldItem);
	},
	
	setAll: function(json) {
		var changed = false;
		var removedItems = {};
		var addedItems = {};
		for (var key in json) {
			var item = json[key];
			var result = this.set(item, key);
			if (!result) {
				continue;
			}
			changed = true;
			var removedItem = result.item;
			if (removedItem) {
				removedItems[key] = removedItem;
			}
			addedItems[key] = item;
		}
		return changed ? new JW.AbstractMap.SpliceResult(removedItems, addedItems) : null;
	},
	
	setKey: function(oldKey, newKey) {
		return JW.Map.setKey(this.json, oldKey, newKey);
	},
	
	remove: function(key) {
		var item = this.json[key];
		if (item === undefined) {
			return null;
		}
		delete this.json[key];
		--this.size;
		return new JW.AbstractMap.ItemResult(item);
	},
	
	removeItem: function(item) {
		var key = this.indexOf(item);
		if (key === undefined) {
			return null;
		}
		delete this.json[key];
		--this.size;
		return new JW.AbstractMap.KeyResult(key);
	},
	
	removeAll: function(keys) {
		var changed = false;
		var items = {};
		for (var i = 0, l = keys.length; i < l; ++i) {
			var key = keys[i];
			var result = this.remove(key);
			if (!result) {
				continue;
			}
			changed = true;
			items[key] = result.item;
		}
		return changed ? new JW.AbstractMap.ItemsResult(items) : null;
	},
	
	clear: function() {
		if (this.size === 0) {
			return null;
		}
		var oldItems = this.json;
		this.json = {};
		this.size = 0;
		return new JW.AbstractMap.ItemsResult(items);
	},
	
	splice: function(removedKeys, updatedItems) {
		var changed = false;
		var removedItems = {};
		for (var i = 0, l = removedKeys.length; i < l; ++i) {
			var key = removedKeys[i];
			if (updatedItems[key] === undefined) {
				continue;
			}
			var item = this.json[key];
			if (item === undefined) {
				continue;
			}
			changed = true;
			removedItems[key] = item;
			delete this.json[key];
			--this.size;
		}
		var result = this.setAll(updatedItems);
		if (result) {
			JW.apply(result.removedItems, removedItems);
			return result;
		}
		return changed ? new JW.AbstractMap.SpliceResult(removedItems, {}) : null;
	},
	/*
	getSpliceParams: function(removedKeys, updatedItems) {
		return JW.AbstractMap.getSpliceParams(this.json, removedKeys, updatedItems);
	},
	*/
	reindex: function(keyMap) {
		return JW.Map.reindex(this.json, keyMap);
	},
	
	detectSplice: function(newItems) {
		return JW.Map.detectSplice(this.json, newItems);
	},
	
	detectReindex: function(newItems, getKey, scope) {
		return JW.Map.detectReindex(this.json, newItems, getKey || this.getKey, scope || this);
	},
	
	performSplice: function(newItems) {
		var spliceParams = this.detectSplice(newItems);
		return spliceParams ? this.splice(spliceParams.removedKeys, spliceParams.updatedItems) : null;
	},
	
	performReindex: function(newItems, getKey, scope) {
		var keyMap = this.detectReindex(newItems, getKey, scope);
		return keyMap ? this.reindex(keyMap) : null;
	},
	
	every: function(callback, scope) {
		return JW.Map.every(this.json, callback, scope);
	},
	
	createEmpty: function() {
		return new JW.Map();
	},
	
	createEmptyUnobservable: function() {
		return new JW.Map();
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
	
	createLister: function(config) {
		return new JW.AbstractMap.Lister(this, config);
	},
	
	createMapper: function(config) {
		return new JW.AbstractMap.Mapper(this, config);
	},
	
	createObserver: function(config) {
		return new JW.AbstractMap.Observer(this, config);
	},
	
	equal: function(map) {
		if (this === map) {
			return true;
		}
		if (this.getSize() !== map.getSize()) {
			return false;
		}
		var json = this.json;
		for (var key in json) {
			if (map.get(key) !== json[key]) {
				return false;
			}
		}
		return true;
	}
});

JW.Map.prototype.getLength = JW.Map.prototype.getSize;
JW.Map.prototype.pushItem = JW.Map.prototype.set;

JW.applyIf(JW.Map.prototype, JW.Alg.BuildMethods);

JW.apply(JW.Map, {
	get: function(target, key) {
		return target[key];
	},
	
	set: function(target, item, key) {
		// JW.assertMap(target);
		// JW.assertDefined(item);
		// JW.assertString(key);
		var oldItem = target[key];
		if (oldItem === item) {
			return;
		}
		target[key] = item;
		return new JW.Proxy(oldItem);
	},
	
	setAll: function(target, map) {
		// JW.assertMap(target);
		// JW.assertMap(map, JW.assertDefined);
		var removedItems = {};
		var addedItems = {};
		for (var key in map) {
			var item = map[key];
			var result = JW.Map.set(target, item, key);
			if (result === undefined) {
				continue;
			}
			var removedItem = result.value;
			if (removedItem) {
				removedItems[key] = removedItem;
			}
			addedItems[key] = item;
		}
		if (!JW.Map.isEmpty(removedItems) || !JW.Map.isEmpty(addedItems)) {
			return new JW.AbstractMap.SpliceResult(removedItems, addedItems);
		}
	},
	
	setKey: function(target, oldKey, newKey) {
		// JW.assertMap(target);
		// JW.assertString(oldKey);
		// JW.assertString(newKey);
		// JW.assertDefined(target[oldKey]);
		if (oldKey === newKey) {
			return;
		}
		var item = target[oldKey];
		delete target[oldKey];
		target[newKey] = item;
		return item;
	},
	
	remove: function(target, key) {
		// JW.assertMap(target);
		// JW.assertString(key);
		var item = target[key];
		if (item !== undefined) {
			delete target[key];
		}
		return item;
	},
	
	removeItem: function(target, item) {
		// JW.assertMap(target);
		// JW.assertDefined(item);
		var key = JW.Map.indexOf(target, item);
		if (key !== undefined) {
			delete target[key];
		}
		return key;
	},
	
	removeAll: function(target, keys) {
		// JW.assertMap(target);
		// JW.assertArray(item, JW.assertString);
		var items = {};
		for (var i = 0, l = keys.length; i < l; ++i) {
			var key = keys[i];
			var result = JW.Map.remove(target, key);
			if (result !== undefined) {
				items[key] = result.value;
			}
		}
		if (!JW.Map.isEmpty(items)) {
			return items;
		}
	},
	
	clear: function(target) {
		// JW.assertMap(target);
		if (JW.Map.isEmpty(target)) {
			return;
		}
		var items = JW.apply({}, target);
		for (var key in items) {
			delete target[key];
		}
		return items;
	},
	
	splice: function(target, removedKeys, updatedItems) {
		// JW.assertMap(target);
		// JW.assertArray(item, JW.assertString);
		// JW.assertMap(updatedItems, JW.assertDefined);
		var removedItems = {};
		for (var i = 0, l = removedKeys.length; i < l; ++i) {
			var key = removedKeys[i];
			var item = target[key];
			if (item === undefined) {
				continue;
			}
			removedItems[key] = item;
			delete target[key];
		}
		var result = JW.Map.setAll(target, updatedItems);
		if (result) {
			JW.apply(result.removedItems, removedItems);
			return result;
		}
		if (!JW.Map.isEmpty(removedItems)) {
			return new JW.AbstractMap.SpliceResult(removedItems, {});
		}
	},
	
	reindex: function(target, keyMap) {
		// JW.assertMap(target);
		// JW.assertMap(keyMap, JW.assertString);
		// JW.assertMap(keyMap, function(key) { return target.hasOwnProperty(key); }, this);
		var resultMap = {};
		for (var oldKey in keyMap) {
			var newKey = keyMap[oldKey];
			var item = JW.Map.setKey(target, oldKey, newKey);
			if (item !== undefined) {
				resultMap[oldKey] = newKey;
			}
		}
		if (!JW.Map.isEmpty(resultMap)) {
			return resultMap;
		}
	},
	/*
	getSpliceParams: function(target, removedKeys, updatedItems) {
		var removedItems = {};
		var addedItems = {};
		for (var i = 0, l = removedKeys.length; i < l; ++i) {
			var key = removedKeys[i];
			if (target.hasOwnProperty(key) && !updatedItems.hasOwnProperty(key)) {
				removedItems[key] = target[key];
			}
		}
		for (var key in updatedItems) {
			var oldItem = target[key];
			var newItem = updatedItems[key];
			if (oldItem !== newItem) {
				removedItems[key] = oldItem;
				addedItems[key] = newItem;
			}
		}
		return new JW.AbstractMap.SpliceParams(removedItems, addedItems);
	},
	*/
	detectSplice: function(oldItems, newItems) {
		// JW.assertMap(oldItems);
		// JW.assertMap(newItems, JW.assertDefined);
		var removedKeys = [];
		var updatedItems = {};
		for (var key in oldItems) {
			var item = oldItems[key];
			if (!newItems.hasOwnProperty(key)) {
				removedKeys.push(key);
			}
		}
		for (var key in newItems) {
			var item = newItems[key];
			if (item !== oldItems[key]) {
				updatedItems[key] = item;
			}
		}
		if ((removedKeys.length !== 0) || !JW.Map.isEmpty(updatedItems)) {
			return new JW.AbstractMap.SpliceParams(removedKeys, updatedItems);
		}
	},
	
	detectReindex: function(oldItems, newItems, getKey, scope) {
		// JW.assertMap(oldItems);
		// JW.assertMap(newItems, JW.assertDefined);
		getKey = getKey || JW.iid;
		var newItemKeys = {};
		for (var key in newItems) {
			var item = newItems[key];
			newItemKeys[getKey.call(scope || oldItems, item)] = item;
		}
		var keyMap = {};
		for (var oldKey in oldItems) {
			var newKey = newItemKeys[getKey.call(scope || oldItems, oldItems[oldKey])];
			if (oldKey !== newKey) {
				keyMap[oldKey] = newKey;
			}
		}
		if (!JW.Map.isEmpty(keyMap)) {
			return keyMap;
		}
	},
	
	performSplice: function(target, newItems) {
		var spliceParams = JW.Map.detectSplice(target, newItems);
		if (spliceParams) {
			return JW.Map.splice(target, spliceParams.removedKeys, spliceParams.updatedItems);
		}
	},
	
	performReindex: function(target, newItems, getKey, scope) {
		var keyMap = JW.Map.detectReindex(target, newItems, getKey, scope);
		if (keyMap) {
			return JW.Map.reindex(target, keyMap);
		}
	},
	
	every: function(target, callback, scope) {
		for (var key in target) {
			if (callback.call(scope || target, target[key], key, target) === false) {
				return false;
			}
		}
		return true;
	},
	
	equal: function(x, y) {
		if (x === y) {
			return true;
		}
		var size = JW.Map.getSize(y);
		for (var key in x) {
			if ((--size < 0) || (x[key] !== y[key])) {
				return false;
			}
		}
		return size === 0;
	},
	
	clone: function(target) {
		return JW.apply({}, target);
	},
	
	single: function(item, key) {
		var result = {};
		result[key] = item;
		return result;
	}
});

JW.applyIf(
	JW.Map,
	JW.Alg.createBuildFunctions(
		JW.Map.every,
		function() { return {}; },
		function() { return {}; },
		function(target, item, key) { target[key] = item; }
	)
);
