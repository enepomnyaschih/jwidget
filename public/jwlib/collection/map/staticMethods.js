/*
	jWidget Lib source file.

	Copyright (C) 2015 Egor Nepomnyaschih

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

JW.IndexedCollection.createStaticMethods(JW.Map);

JW.apply(JW.Map, {
	getLength: function(target) {
		var length = 0;
		for (var key in target) {
			++length;
		}
		return length;
	},

	isEmpty: function(target) {
		for (var key in target) {
			return false;
		}
		return true;
	},

	getFirstKey: function(target) {
		for (var key in target) {
			return key;
		}
		return undefined;
	},

	get: function(target, key) {
		return target[key];
	},

	getKeys: function(target) {
		var keys = [];
		for (var key in target) {
			keys.push(key);
		}
		return keys;
	},

	every: function(target, callback, scope) {
		scope = scope || target;
		for (var key in target) {
			if (callback.call(scope, target[key], key) === false) {
				return false;
			}
		}
		return true;
	},

	filter: function(target, callback, scope) {
		var result = {};
		JW.Map.every(target, function(item, key) {
			if (callback.call(this, item, key) !== false) {
				result[key] = item;
			}
		}, scope);
		return result;
	},

	$filter: JW.AbstractCollection._createStatic$Map(JW.Map, "filter"),

	count: function(target, callback, scope) {
		var result = 0;
		JW.Map.every(target, function(item, key) {
			if (callback.call(this, item, key) !== false) {
				++result;
			}
		}, scope);
		return result;
	},

	map: function(target, callback, scope) {
		var result = {};
		JW.Map.every(target, function(item, key) {
			result[key] = callback.call(this, item, key);
		}, scope);
		return result;
	},

	$map: JW.AbstractCollection._createStatic$Map(JW.Map, "map"),

	asMap: function(target) {
		return target;
	},

	trySet: function(target, item, key) {
		var oldItem = target[key];
		if (oldItem === item) {
			return;
		}
		target[key] = item;
		return new JW.Proxy(oldItem);
	},

	setAll: function(target, items) {
		// JW.assertMap(target);
		// JW.assertMap(items, JW.assertDefined);
		for (var key in items) {
			target[key] = items[key];
		}
	},

	setAllVerbose: function(target, items) {
		var spliceResult = JW.Map.trySetAll(target, items);
		return (spliceResult !== undefined) ? spliceResult : new JW.AbstractMap.SpliceResult({}, {});
	},

	trySetAll: function(target, map) {
		// JW.assertMap(target);
		// JW.assertMap(map, JW.assertDefined);
		var removedItems = {};
		var addedItems = {};
		for (var key in map) {
			var item = map[key];
			var oldItem = JW.Map.trySet(target, item, key);
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
		var item = JW.Map.trySetKey(target, oldKey, newKey);
		return (item !== undefined) ? item : target[newKey];
	},

	trySetKey: function(target, oldKey, newKey) {
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

	tryRemove: function(target, key) {
		// JW.assertMap(target);
		// JW.assertString(key);
		var item = target[key];
		if (item !== undefined) {
			delete target[key];
		}
		return item;
	},

	removeAll: function(target, keys) {
		// JW.assertMap(target);
		for (var i = 0, l = keys.length; i < l; ++i) {
			var key = keys[i];
			delete target[key];
		}
	},

	removeAllVerbose: function(target, keys) {
		var items = JW.Map.tryRemoveAll(target, keys);
		return (items !== undefined) ? items : {};
	},

	$removeAllVerbose: JW.AbstractCollection._createStatic$Map(JW.Map, "removeAllVerbose"),

	tryRemoveAll: function(target, keys) {
		// JW.assertMap(target);
		var items = {};
		for (var i = 0, l = keys.length; i < l; ++i) {
			var key = keys[i];
			var item = JW.Map.tryRemove(target, key);
			if (item !== undefined) {
				items[key] = item;
			}
		}
		if (!JW.Map.isEmpty(items)) {
			return items;
		}
	},

	removeItems: function(target, items) {
		var itemSet = new JW.Set(items);
		var newItems = JW.Map.filter(target, function(item) {
			return !itemSet.contains(item);
		});
		JW.Map.performSplice(target, newItems);
	},

	clear: function(target) {
		var result = JW.Map.tryClear(target);
		return (result !== undefined) ? result : {};
	},

	$clear: JW.AbstractCollection._createStatic$Map(JW.Map, "clear"),

	tryClear: function(target) {
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
		var spliceResult = JW.Map.trySplice(target, removedKeys, updatedItems);
		return (spliceResult !== undefined) ? spliceResult : new JW.AbstractMap.SpliceResult({}, {});
	},

	trySplice: function(target, removedKeys, updatedItems) {
		// JW.assertMap(target);
		// JW.assertArray(item, JW.assertString);
		// JW.assertMap(updatedItems, JW.assertDefined);
		removedKeys = JW.Array.filter(removedKeys, function(key) {
			return !updatedItems.hasOwnProperty(key);
		});
		var removedItems = JW.Map.tryRemoveAll(target, removedKeys);
		var spliceResult = JW.Map.trySetAll(target, updatedItems);
		if (spliceResult !== undefined) {
			JW.apply(spliceResult.removedItems, removedItems);
			return spliceResult;
		}
		if (removedItems !== undefined) {
			return new JW.AbstractMap.SpliceResult(removedItems, {});
		}
	},

	reindex: function(target, keyMap) {
		var result = JW.Map.tryReindex(target, keyMap);
		return (result !== undefined) ? result : {};
	},

	tryReindex: function(target, keyMap) {
		// JW.assertMap(target);
		// JW.assertMap(keyMap, JW.assertString);
		// JW.assertMap(keyMap, function(key) { return target.hasOwnProperty(key); }, this);
		var sanitizedKeyMap = {};
		for (var oldKey in keyMap) {
			var newKey = keyMap[oldKey];
			if ((newKey === undefined) || (newKey === oldKey) || (target[oldKey] === undefined)) {
				continue;
			}
			sanitizedKeyMap[oldKey] = newKey;
		}

		var backKeyMap = JW.Map.getInverted(sanitizedKeyMap);
		var removedKeys = [];
		var updatedItems = {};
		for (var oldKey in sanitizedKeyMap) {
			var newKey = sanitizedKeyMap[oldKey];
			// JW.assertUndefined(updatedItems[newKey]);
			sanitizedKeyMap[oldKey] = newKey;
			updatedItems[newKey] = target[oldKey];
			if (backKeyMap[oldKey] === undefined) {
				removedKeys.push(oldKey);
			}
		}

		if (JW.Map.isEmpty(sanitizedKeyMap)) {
			return;
		}
		for (var i = 0, l = removedKeys.length; i < l; ++i) {
			delete target[removedKeys[i]];
		}
		JW.apply(target, updatedItems);
		return sanitizedKeyMap;
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
		var params = JW.Map.detectSplice(target, newItems);
		if (params !== undefined) {
			JW.Map.trySplice(target, params.removedKeys, params.updatedItems);
		}
	},

	performReindex: function(target, newItems, getKey, scope) {
		var keyMap = JW.Map.detectReindex(target, newItems, getKey, scope);
		if (keyMap !== undefined) {
			JW.Map.tryReindex(target, keyMap);
		}
	},

	equal: function(x, y) {
		if (x === y) {
			return true;
		}
		var length = JW.Map.getLength(y);
		for (var key in x) {
			if ((--length < 0) || (x[key] !== y[key])) {
				return false;
			}
		}
		return length === 0;
	},

	single: function(key, item) {
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
	},

	getInverted: function(map) {
		// JW.assertMap(map, JW.assertString);
		var result = {};
		for (var key in map) {
			// JW.assertUndefined(result[map[key]]);
			result[map[key]] = key;
		}
		return result;
	}
});
