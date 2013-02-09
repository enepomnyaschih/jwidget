﻿/*
	JW array extension.
	
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

JW.Array = {
	add: function(target, item, index) {
		target.splice(index, 0, item);
	},
	
	addAll: function(target, items, index) {
		target.splice.apply(target, [ JW.def(index, target.length), 0 ].concat(items));
	},
	
	remove: function(target, index, count) {
		var items = target.splice(index, JW.def(count, 1));
		return (count === undefined) ? items[0] : items;
	},
	
	move: function(target, fromIndex, toIndex) {
		var item = target[fromIndex];
		if (fromIndex === toIndex) {
			return item;
		}
		target.splice(fromIndex, 1);
		target.splice(toIndex, 0, item);
		return item;
	},
	
	clear: function(target) {
		return target.splice(0, target.length);
	},
	
	every: function(target, callback, scope) {
		for (var i = 0, l = target.length; i < l; ++i) {
			if (callback.call(scope || target, target[i], i, target) === false) {
				return false;
			}
		}
		return true;
	},
	
	removeItem: function(target, item) {
		for (var i = 0; i < target.length; ++i) {
			if (target[i] === item) {
				target.splice(i, 1);
				--i;
			}
		}
		return target;
	},
	
	removeBy: function(target, field, value) {
		for (var i = 0; i < target.length; ++i) {
			if (JW.get(target[i], field) === value) {
				target.splice(i, 1);
				--i;
			}
		}
		return target;
	},
	
	equal: function(target, arr) {
		if (target === arr) {
			return true;
		}
		if (target.length !== arr.length) {
			return false;
		}
		for (var i = 0, l = target.length; i < l; ++i) {
			if (target[i] !== arr[i]) {
				return false;
			}
		}
		return true;
	},
	
	pushAll: function(target, items) {
		if (!items) {
			return target.length;
		}
		return target.push.apply(target, items);
	},
	
	sortBy: function(target, field, order) {
		order = order || 1;
		target.sort(function(x, y) {
			return JW.cmp(JW.get(x, field), JW.get(y, field)) * order;
		});
		return target;
	},
	
	top: function(target) {
		return target[target.length - 1];
	},
	
	collapse: function(target, depth) {
		var result = [];
		for (var i = 0, l = target.length; i < l; ++i) {
			if (!JW.isArray(target[i])) {
				result.push(target[i]);
				continue;
			}
			if (!JW.isSet(depth)) {
				JW.Array.pushAll(result, JW.Array.collapse(target[i]));
				continue;
			}
			if (depth) {
				JW.Array.pushAll(result, JW.Array.collapse(target[i], depth - 1));
				continue;
			}
			result.push(target[i]);
		}
		return result;
	},
	
	indexOf: Array.prototype.indexOf ? function(target, item) {
		return target.indexOf(item);
	} : function(target, item) {
		for (var i = 0, l = target.length; i < l; ++i) {
			if (target[i] === item) {
				return i;
			}
		}
		return -1;
	},
	
	getSize: function(target) {
		return target.length;
	},
	
	isEmpty: function(target) {
		return target.length === 0;
	},
	
	clone: function(target) {
		return target.concat();
	},
	
	cmp: function(x, y, caseInsensitive) {
		var n = Math.min(x.length, y.length);
		for (var i = 0; i < n; ++i) {
			var result = JW.cmp(x[i], y[i], caseInsensitive);
			if (result) {
				return result;
			}
		}
		return JW.cmp(x.length, y.length);
	},
	
	shuffle: function(n) {
		var result = new Array(n);
		for (var i = 0; i < n; ++i) {
			result[i] = i;
		}
		for (var i = 0; i < n; ++i) {
			var j = i + Math.floor(Math.random() * (n - i));
			var t = result[i];
			result[i] = result[j];
			result[j] = t;
		}
		return result;
	}
};

JW.Array.getLength = JW.Array.getSize; // alias

JW.applyIf(
	JW.Array,
	JW.Alg.createBuildFunctions(
		JW.Array.every,
		function() { return []; },
		function(target, item) { target.push(item); }
	)
);
