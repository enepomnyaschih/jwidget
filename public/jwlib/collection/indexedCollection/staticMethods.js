/*
MIT License

Copyright (c) 2020 Egor Nepomnyaschih

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

JW.IndexedCollection.createStaticMethods = function(namespace) {
	JW.AbstractCollection.createStaticMethods(namespace);
	
	namespace.getFirst = function(target) {
		var key = namespace.getFirstKey(target);
		if (key !== undefined) {
			return namespace.get(target, key);
		}
	};
	
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
		return (result !== undefined) ? result.value : namespace.get(target, key);
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
	
	namespace.getSortingKeys = function(target, callback, scope, order) {
		callback = callback || function(x) { return x; };
		order = order || 1;
		var pairs = [];
		namespace.every(target, function(item, key) {
			pairs.push([key, callback.call(this, item, key)]);
		}, scope);
		pairs.sort(function(x, y) {
			return order * JW.cmp(x[1], y[1]);
		});
		return JW.Array.map(pairs, function(pair) {
			return pair[0];
		});
	};
	
	namespace.$getSortingKeys = JW.AbstractCollection._createStatic$Array(namespace, "getSortingKeys");
	
	namespace.getSortingKeysComparing = function(target, compare, scope, order) {
		compare = compare || JW.cmp;
		order = order || 1;
		var pairs = [];
		namespace.every(target, function(item, key) {
			pairs.push([key, item]);
		}, scope);
		pairs.sort(function(x, y) {
			return order * compare.call(scope, x[1], y[1], x[0], y[0]);
		});
		return JW.Array.map(pairs, function(pair) {
			return pair[0];
		});
	};
	
	namespace.$getSortingKeysComparing = JW.AbstractCollection._createStatic$Array(namespace, "getSortingKeysComparing");
	
	namespace.toSorted = function(target, callback, scope, order) {
		return JW.Array.map(namespace.getSortingKeys(target, callback, scope, order), function(key) {
			return namespace.get(target, key);
		});
	};
	
	namespace.$toSorted = JW.AbstractCollection._createStatic$Array(namespace, "toSorted");
	
	namespace.toSortedComparing = function(target, compare, scope, order) {
		return JW.Array.map(namespace.getSortingKeysComparing(target, compare, scope, order), function(key) {
			return namespace.get(target, key);
		});
	};
	
	namespace.$toSortedComparing = JW.AbstractCollection._createStatic$Array(namespace, "toSortedComparing");
	
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
