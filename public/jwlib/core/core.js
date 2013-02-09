/*!
	jWidget Lib 0.4.
	
	https://github.com/enepomnyaschih/jwlib
	
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

if (typeof JW !== "undefined") {
	throw new Error("Can't initialize jWidget Lib: JW namespace already defined");
}

(typeof window === "undefined" ? global : window).JW = {};

JW.global = (typeof window === "undefined" ? global : window);

JW.apply = function(target /*, sources */) {
	for (var i = 1; i < arguments.length; ++i) {
		var source = arguments[i];
		if (!source) {
			continue;
		}
		for (var key in source) {
			if (typeof source[key] !== "undefined") {
				target[key] = source[key];
			}
		}
	}
	return target;
};

JW.apply(JW, {
	isUndefined: function(v) {
		return v === undefined;
	},
	
	isDefined: function(v) {
		return v !== undefined;
	},
	
	isNull: function(v) {
		return v === null;
	},
	
	isSet: function(v) {
		return (v !== undefined) && (v !== null);
	},
	
	isInt: function(v) {
		return (typeof v === "number") && Math.round(v) === v;
	},
	
	isNumber: function(v) {
		return typeof v === "number";
	},
	
	isString: function(v) {
		return typeof v === "string";
	},
	
	isBoolean: function(v) {
		return typeof v === "boolean";
	},
	
	isFunction: function(v) {
		return typeof v === "function";
	},
	
	isArray: function(v) {
		return Object.prototype.toString.apply(v) === '[object Array]';
	},
	
	isObject: function(v) {
		return Object.prototype.toString.apply(v) === '[object Object]';
	},
	
	isRegExp: function(v) {
		return Object.prototype.toString.apply(v) === '[object RegExp]';
	},
	
	isDate: function(v) {
		return Object.prototype.toString.apply(v) === '[object Date]';
	},
	
	isBlank: function(v) {
		return !v;
	},
	
	def: function(v, d) {
		return JW.isDefined(v) ? v : d;
	},
	
	defn: function(v, d) {
		return JW.isSet(v) ? v : d;
	},
	
	applyIf: function(target /*, sources */) {
		for (var i = 1; i < arguments.length; ++i) {
			var source = arguments[i];
			if (!source) {
				continue;
			}
			for (var key in source) {
				if (JW.isDefined(source[key]) && !JW.isDefined(target[key])) {
					target[key] = source[key];
				}
			}
		}
		return target;
	},
	
	applyIfn: function(target /*, sources */) {
		for (var i = 1; i < arguments.length; ++i) {
			var source = arguments[i];
			if (!source) {
				continue;
			}
			for (var key in source) {
				if (JW.isDefined(source[key]) && !JW.isSet(target[key])) {
					target[key] = source[key];
				}
			}
		}
		return target;
	},
	
	clean: function(source) {
		var result = {};
		for (var i in source) {
			if (JW.isDefined(source[i])) {
				result[i] = source[i];
			}
		}
		return result;
	},
	
	cleann: function(source) {
		var result = {};
		for (var i in source) {
			if (JW.isSet(source[i])) {
				result[i] = source[i];
			}
		}
		return result;
	},
	
	args: function(a, index, count) {
		index = index || 0;
		count = count || (a.length - index);
		var r = [];
		for (var i = 0; i < count; ++i) {
			r.push(a[index + i]);
		}
		return r;
	},
	
	emptyFn: function() {},
	
	cmp: function(x, y, caseInsensitive) {
		if (typeof x === "boolean" && typeof y === "boolean") {
			return x ? (y ? 0 : 1) : (y ? -1 : 0);
		}
		if (JW.isArray(x) && JW.isArray(y)) {
			return JW.Array.cmp(x, y, caseInsensitive);
		}
		if (caseInsensitive) {
			if (typeof x === "string") {
				x = x.toLowerCase();
			}
			if (typeof y === "string") {
				y = y.toLowerCase();
			}
		}
		if (x > y) return 1;
		if (x < y) return -1;
		return 0;
	},
	
	cmpCaseInsensitive: function(x, y) {
		return JW.cmp(x, y, true);
	},
	
	get: function(obj, field, def) {
		if (!field) {
			return JW.def(obj, def);
		}
		field = field.split(".");
		for (var i = 0; i < field.length; ++i) {
			if (!obj) {
				return def;
			}
			obj = obj[field[i]];
		}
		return JW.def(obj, def);
	},
	
	eq: function(x, y) {
		return x == y;
	},
	
	seq: function(x, y) {
		return x === y;
	},
	
	mod: function(value, mod) {
		return value - mod * Math.floor(value / mod);
	},
	
	smod: function(value, mod) {
		return value - mod * Math.round(value / mod);
	},
	
	sgn: function(value) {
		return !value ? 0 : value > 0 ? 1 : -1;
	},
	
	sgnnz: function(value) {
		return value >= 0 ? 1 : -1;
	},
	
	inScope: function(func, scope) {
		return function() {
			return func.apply(scope, arguments);
		};
	}
});

JW.toArray = JW.args;
