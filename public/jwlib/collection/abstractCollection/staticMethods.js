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

JW.AbstractCollection._createStatic$Array = function(namespace, algorithm) {
	return function() {
		return new JW.Array(namespace[algorithm].apply(namespace, arguments), true);
	};
};

JW.AbstractCollection._createStatic$Map = function(namespace, algorithm) {
	return function() {
		return new JW.Map(namespace[algorithm].apply(namespace, arguments), true);
	};
};

JW.AbstractCollection._createStatic$Set = function(namespace, algorithm) {
	return function() {
		return new JW.Set(namespace[algorithm].apply(namespace, arguments), true);
	};
};

JW.AbstractCollection.createStaticMethods = function(namespace) {
	namespace.some = function(target, callback, scope) {
		return !namespace.every(target, function(item) {
			return callback.call(this, item) === false;
		}, scope);
	};
	
	namespace.each = function(target, callback, scope) {
		namespace.every(target, function(item) {
			callback.call(this, item);
			return true;
		}, scope);
	};
	
	namespace.search = function(target, callback, scope) {
		var result;
		namespace.every(target, function(item) {
			if (callback.call(this, item) !== false) {
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
		var pairs = [];
		namespace.every(target, function(item) {
			pairs.push([item, callback.call(this, item)]);
		}, scope);
		pairs.sort(function(x, y) {
			return order * JW.cmp(x[1], y[1]);
		});
		return JW.Array.map(pairs, function(pair) {
			return pair[0];
		});
	};
	
	namespace.$toSorted = JW.AbstractCollection._createStatic$Array(namespace, "toSorted");
	
	namespace.toSortedComparing = function(target, compare, scope, order) {
		compare = compare || JW.cmp;
		scope = scope || target;
		order = order || 1;
		var items = namespace.toArray(target);
		items.sort(function(x, y) {
			return order * compare.call(scope, x, y);
		});
		return items;
	};
	
	namespace.$toSortedComparing = JW.AbstractCollection._createStatic$Array(namespace, "toSortedComparing");
	
	namespace.index = function(target, callback, scope) {
		var result = {};
		namespace.every(target, function(item) {
			var key = callback.call(this, item);
			if (JW.isSet(key)) {
				result[key] = item;
			}
			return true;
		}, scope);
		return result;
	};
	
	namespace.$index = JW.AbstractCollection._createStatic$Map(namespace, "index");
	
	namespace.toArray = function(target) {
		var result = new Array(namespace.getLength(target));
		var index = 0;
		namespace.every(target, function(item) {
			result[index++] = item;
		});
		return result;
	};
	
	namespace.$toArray = JW.AbstractCollection._createStatic$Array(namespace, "toArray");
	
	namespace.toSet = function(target) {
		var result = {};
		namespace.every(target, function(item) {
			JW.Set.add(result, item);
		});
		return result;
	};
	
	namespace.$toSet = JW.AbstractCollection._createStatic$Set(namespace, "toSet");
	
	namespace.asArray = function(target) {
		return namespace.toArray(target);
	};
	
	namespace.$asArray = JW.AbstractCollection._createStatic$Array(namespace, "asArray");
	
	namespace.asSet = function(target) {
		return namespace.toSet(target);
	};
	
	namespace.$asSet = JW.AbstractCollection._createStatic$Set(namespace, "asSet");
};
