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
		// JW.assertDefined(item);
		var oldItem = this.json[key];
		if (oldItem === item) {
			return;
		}
		if (oldItem === undefined) {
			++this.size;
		}
		this.json[key] = item;
		return new JW.Proxy(oldItem);
	},
	
	setAll: function(json) {
		var removedItems = {};
		var addedItems = {};
		for (var key in json) {
			var item = json[key];
			var oldItem = this.set(item, key);
			if (oldItem === undefined) {
				continue;
			}
			var removedItem = oldItem.value;
			if (removedItem !== undefined) {
				removedItems[key] = removedItem;
			}
			addedItems[key] = item;
		}
		if (!JW.Map.isEmpty(removedItems) || !JW.Map.isEmpty(addedItems)) {
			return new JW.AbstractMap.SpliceResult(removedItems, addedItems);
		}
	},
	
	setKey: function(oldKey, newKey) {
		return JW.Map.setKey(this.json, oldKey, newKey);
	},
	
	remove: function(key) {
		var item = this.json[key];
		if (item === undefined) {
			return;
		}
		delete this.json[key];
		--this.size;
		return item;
	},
	
	removeItem: function(item) {
		var key = this.indexOf(item);
		if (key === undefined) {
			return;
		}
		delete this.json[key];
		--this.size;
		return key;
	},
	
	removeAll: function(keys) {
		var items = {};
		for (var i = 0, l = keys.length; i < l; ++i) {
			var key = keys[i];
			var item = this.remove(key);
			if (item !== undefined) {
				items[key] = item;
			}
		}
		if (!JW.Map.isEmpty(items)) {
			return items;
		}
	},
	
	clear: function() {
		if (this.size === 0) {
			return;
		}
		var items = this.json;
		this.json = {};
		this.size = 0;
		return items;
	},
	
	splice: function(removedKeys, updatedItems) {
		removedKeys = JW.Array.filter(removedKeys, function(key) {
			return !updatedItems.hasOwnProperty(key);
		}, this);
		var removedItems = this.removeAll(removedKeys);
		var spliceResult = this.setAll(updatedItems);
		if (spliceResult !== undefined) {
			JW.apply(spliceResult.removedItems, removedItems);
			return spliceResult;
		}
		if (removedItems !== undefined) {
			return new JW.AbstractMap.SpliceResult(removedItems, {});
		}
	},
	
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
		if (spliceParams !== undefined) {
			return this.splice(spliceParams.removedKeys, spliceParams.updatedItems);
		}
	},
	
	performReindex: function(newItems, getKey, scope) {
		var keyMap = this.detectReindex(newItems, getKey || this.getKey, scope || this);
		if (keyMap !== undefined) {
			return this.reindex(keyMap);
		}
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
	
	createInserter: function(config) {
		return new JW.AbstractMap.Inserter(this, config);
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
			var oldItem = JW.Map.set(target, item, key);
			if (oldItem === undefined) {
				continue;
			}
			var removedItem = oldItem.value;
			if (removedItem !== undefined) {
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
		// JW.assertUndefined(target[newKey]);
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
			var item = JW.Map.remove(target, key);
			if (item !== undefined) {
				items[key] = item;
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
		var removedKeys = JW.Array.filter(function(key) {
			return !updatedItems.hasOwnProperty(key);
		});
		var removedItems = JW.Map.removeAll(target, removedKeys);
		var spliceResult = JW.Map.setAll(target, updatedItems);
		if (spliceResult !== undefined) {
			JW.apply(spliceResult.removedItems, removedItems);
			return spliceResult;
		}
		if (removedItems !== undefined) {
			return new JW.AbstractMap.SpliceResult(removedItems, {});
		}
	},
	
	reindex: function(target, keyMap) {
		// JW.assertMap(target);
		// JW.assertMap(keyMap, JW.assertString);
		// JW.assertMap(keyMap, function(key) { return target.hasOwnProperty(key); }, this);
		var oldItems = JW.Map.clear(target);
		if (oldItems === undefined) {
			return;
		}
		var resultMap = {};
		for (var oldKey in oldItems) {
			var newKey = keyMap[oldKey];
			if ((newKey === undefined) || (newKey === oldKey)) {
				// JW.assertUndefined(target[oldKey]);
				target[oldKey] = oldItems[oldKey];
			} else {
				// JW.assertUndefined(target[newKey]);
				target[newKey] = oldItems[oldKey];
				resultMap[oldKey] = newKey;
			}
		}
		if (!JW.Map.isEmpty(resultMap)) {
			return resultMap;
		}
	},
	
	detectSplice: function(oldItems, newItems) {
		// JW.assertMap(oldItems);
		// JW.assertMap(newItems, JW.assertDefined);
		var removedKeys = [];
		var updatedItems = {};
		for (var key in oldItems) {
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
		scope = scope || oldItems;
		var newItemKeys = {};
		for (var key in newItems) {
			newItemKeys[getKey.call(scope, newItems[key])] = key;
		}
		var keyMap = {};
		for (var oldKey in oldItems) {
			var newKey = newItemKeys[getKey.call(scope, oldItems[oldKey])];
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
		if (spliceParams !== undefined) {
			return JW.Map.splice(target, spliceParams.removedKeys, spliceParams.updatedItems);
		}
	},
	
	performReindex: function(target, newItems, getKey, scope) {
		var keyMap = JW.Map.detectReindex(target, newItems, getKey, scope);
		if (keyMap !== undefined) {
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
	},
	
	getRemovedKeys: function(removedItems, addedItems) {
		var removedKeys = [];
		for (var key in removedItems) {
			if (!addedItems.hasOwnProperty(key)) {
				removedKeys.push(key);
			}
		}
		return removedKeys;
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
