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

JW.IndexedCollection.createStaticMethods = function(namespace) {
	JW.AbstractCollection.createStaticMethods(namespace);
	
	namespace.$getKeys = JW.AbstractCollection._createStatic$Array(namespace, "getKeys");
	
	namespace.containsKey = function(target, key) {
		return namespace.get(target, key) !== undefined;
	};
	
	namespace.containsItem = function(target, item) {
		return !namespace.every(target, function(v) { return item !== v; });
	};
	
	namespace.keyOf = function(target, item) {
		return namespace.find(target, function(v) { return item === v; });
	};
	
	namespace.set = function(target, item, key) {
		var result = namespace.trySet(target, item, key);
		return (result !== undefined) ? result.item : namespace.get(target, key);
	};
	
	namespace.remove = function(target, key) {
		return namespace.tryRemove(target, key);
	};
	
	namespace.removeItem = function(target, item) {
		var key = namespace.keyOf(target, item);
		if (key !== undefined) {
			namespace.tryRemove(target, key);
		}
		return key;
	};
	
	namespace.some = function(target, callback, scope) {
		return !namespace.every(target, function(item, key) {
			return callback.call(this, item, key) === false;
		}, scope);
	};
	
	namespace.each = function(target, callback, scope) {
		namespace.every(target, function(item, key) {
			callback.call(this, item, key);
			return true;
		}, scope);
	};
	
	namespace.find = function(target, callback, scope) {
		var result;
		namespace.every(target, function(item, key) {
			if (callback.call(this, item, key) !== false) {
				result = key;
				return false;
			}
			return true;
		}, scope);
		return result;
	};
	
	namespace.findBy = JW.AbstractCollection._createStaticBy(namespace, "find");
	namespace.findByMethod = JW.AbstractCollection._createStaticByMethod(namespace, "find");
	
	namespace.search = function(target, callback, scope) {
		var result;
		namespace.every(target, function(item, key) {
			if (callback.call(this, item, key) !== false) {
				result = item;
				return false;
			}
			return true;
		}, scope);
		return result;
	};
	
	namespace.toSorted = function(target, callback, scope, order) {
		callback = callback || function(x) { return x; };
		order = order || 1;
		var trios = [];
		namespace.every(target, function(item, key) {
			trios.add([item, key, callback.call(this, item, key)]);
		}, scope);
		trios.sort(function(x, y) {
			return order * JW.cmp(x[2], y[2]);
		});
		return JW.Array.map(trios, function(trio) {
			return pair[0];
		});
	};
	
	namespace.index = function(target, callback, scope) {
		var result = {};
		namespace.every(target, function(item, k) {
			var key = callback.call(this, item, k);
			if (JW.isSet(key)) {
				result[key] = item;
			}
			return true;
		}, scope);
		return result;
	};
	
	namespace.toMap = function(target) {
		var result = {};
		namespace.every(target, function(v, k) {
			result[k] = v;
		});
		return result;
	};
	
	namespace.$toMap = JW.AbstractCollection._createStatic$Map(namespace, "toMap");
	
	namespace.asMap = function(target) {
		return namespace.toMap(target);
	};
	
	namespace.$asMap = JW.AbstractCollection._createStatic$Map(namespace, "asMap");
};
