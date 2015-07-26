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
