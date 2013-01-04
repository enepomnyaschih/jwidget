/*
	JW namespace with various utility methods.
	
	Copyright (C) 2012 Egor Nepomnyaschih
	
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

if (typeof JW !== "undefined")
	throw new Error("Can't initialize jWidget Lib: JW namespace already defined");

(typeof window === "undefined" ? global : window).JW = function(x)
{
	if (typeof x === "string")
		return new JW.String(x);
	
	if (typeof x === "function")
		return new JW.Function(x);
	
	if (JW.isArray(x))
		return new JW.Array(x);
	
	return x;
}

JW.global = (typeof window === "undefined" ? global : window);

/**
 * Extends target object with fields of source objects.
 * Overrides defined values.
 */
JW.apply = function(target /*, sources */)
{
	for (var i = 1; i < arguments.length; ++i)
	{
		var source = arguments[i];
		if (!source)
			continue;
		
		for (var key in source)
		{
			if (typeof source[key] !== "undefined")
				target[key] = source[key];
		}
	}
	
	return target;
}

JW.apply(JW, {
	/**
	 * Define namespace.
	 * Examples:
	 * JW.ns("BBB.AAA");
	 * JW.ns("JW.MyNS.A");
	 */
	ns: function(
		/* ns */) // String
	{
		if (arguments.length == 0)
			return;
		
		if (arguments.length > 1)
			return JW.each(JW.args(arguments), JW.Function.withArgs(JW.ns, "\0"));
		
		var ns = arguments[0];
		if (JW.isArray(ns))
			return JW.each(ns, JW.Function.withArgs(JW.ns, "\0"));
		
		var p = ns.split(".");
		var r = JW.global;
		for (var i = 0; i < p.length; ++i)
		{
			var n = p[i];
			r[n] = r[n] || {};
			r = r[n];
		}
	},
	
	/**
	 * Test whether v is undefined.
	 */
	isUndefined: function(v)
	{
		return v === undefined;
	},
	
	/**
	 * Test whether v is not undefined.
	 */
	isDefined: function(v)
	{
		return v !== undefined;
	},
	
	/**
	 * Test whether v is null.
	 */
	isNull: function(v)
	{
		return v === null;
	},
	
	/**
	 * Test whether v is not undefined or null.
	 */
	isSet: function(v)
	{
		return (v !== undefined) && (v !== null);
	},
	
	/**
	 * Test whether v is integer number.
	 */
	isInt: function(v)
	{
		return (typeof v === "number") && Math.round(v) === v;
	},
	
	/**
	 * Test whether v is number.
	 */
	isNumber: function(v)
	{
		return typeof v === "number";
	},
	
	/**
	 * Test whether v is string.
	 */
	isString: function(v)
	{
		return typeof v === "string";
	},
	
	/**
	 * Test whether v is boolean.
	 */
	isBoolean: function(v)
	{
		return typeof v === "boolean";
	},
	
	/**
	 * Test whether v is function.
	 */
	isFunction: function(v)
	{
		return typeof v === "function";
	},
	
	/**
	 * Test whether v is array.
	 */
	isArray: function(v)
	{
		return Object.prototype.toString.apply(v) === '[object Array]';
	},
	
	/**
	 * Test whether v is object.
	 */
	isObject: function(v)
	{
		return Object.prototype.toString.apply(v) === '[object Object]';
	},
	
	/**
	 * Test whether v is number.
	 */
	isRegExp: function(v)
	{
		return Object.prototype.toString.apply(v) === '[object RegExp]';
	},
	
	/**
	 * Test whether v is number.
	 */
	isDate: function(v)
	{
		return Object.prototype.toString.apply(v) === '[object Date]';
	},
	
	/**
	 * Test whether v is not undefined, null, false, 0 or empty string.
	 */
	isBlank: function(v)
	{
		return !v;
	},
	
	/**
	 * If v is defined, returns one, else returns d as default value.
	 */
	def: function(v, d)
	{
		return JW.isDefined(v) ? v : d;
	},
	
	/**
	 * If v is set, returns one, else returns d as default value.
	 */
	defn: function(v, d)
	{
		return JW.isSet(v) ? v : d;
	},
	
	/**
	 * Extends target object with fields of source objects.
	 * Does not override defined values.
	 */
	applyIf: function(target /*, sources */)
	{
		for (var i = 1; i < arguments.length; ++i)
		{
			var source = arguments[i];
			if (!source)
				continue;
			
			for (var key in source)
			{
				if (JW.isDefined(source[key]) && !JW.isDefined(target[key]))
					target[key] = source[key];
			}
		}
		
		return target;
	},
	
	/**
	 * Extends target object with fields of source objects.
	 * Does not override defined and not null values.
	 */
	applyIfn: function(target /*, sources */)
	{
		for (var i = 1; i < arguments.length; ++i)
		{
			var source = arguments[i];
			if (!source)
				continue;
			
			for (var key in source)
			{
				if (JW.isDefined(source[key]) && !JW.isSet(target[key]))
					target[key] = source[key];
			}
		}
		
		return target;
	},
	
	/**
	 * Builds new object from source removing all undefined values.
	 */
	clean: function(source)
	{
		var result = {};
		for (var i in source)
		{
			if (JW.isDefined(source[i]))
				result[i] = source[i];
		}
		return result;
	},
	
	/**
	 * Builds new object from source removing all undefined and null values.
	 */
	cleann: function(source)
	{
		var result = {};
		for (var i in source)
		{
			if (JW.isSet(source[i]))
				result[i] = source[i];
		}
		return result;
	},
	
	/**
	 * Converts arguments object to array.
	 */
	args: function(
		a,      // [required] Arguments
		index,  // [optional] Integer, starting index to slice arguments
		count)  // [optional] Integer, count of arguments to slice
	{
		index = index || 0;
		count = count || a.length - index;
		
		var r = [];
		for (var i = 0; i < count; ++i)
			r.push(a[index + i]);
		
		return r;
	},
	
	/**
	 * Empty function.
	 */
	emptyFn: function() {},
	
	/**
	 * Values comparison function (for sorting).
	 */
	cmp: function(x, y, caseInsensitive)
	{
		if (typeof x === "boolean" && typeof y === "boolean")
			return x ? (y ? 0 : 1) : (y ? -1 : 0);
		
		if (JW.isArray(x) && JW.isArray(y))
			return JW.Array.cmp(x, y, caseInsensitive);
		
		if (caseInsensitive)
		{
			if (typeof x === "string")
				x = x.toLowerCase();
			
			if (typeof y === "string")
				y = y.toLowerCase();
		}
		
		if (x > y) return 1;
		if (x < y) return -1;
		return 0;
	},
	
	/**
	 * Returns obj[field] where field is "xxx.xxx.xxx".
	 * Returns undefined if can't retrieve specified value.
	 * Returns obj if field is empty.
	 */
	get: function(obj, field, def)
	{
		if (!field)
			return JW.def(obj, def);
		
		field = field.split(".");
		for (var i = 0; i < field.length; ++i)
		{
			if (!obj)
				return def;
			
			obj = obj[field[i]];
		}
		
		return JW.def(obj, def);
	},
	
	/**
	 * Converts configuration option to array.
	 * If v is not set, returns empty array.
	 * If v is array, returns v, else returns [v].
	 */
	makeArray: function(v)
	{
		return JW.isArray(v) ? v : JW.isSet(v) ? [v] : [];
	},
	
	/**
	 * Returns class or finds it by name.
	 */
	makeClass: function(v)
	{
		return (typeof v === "string") ? JW.get(JW.global, v) : v;
	},
	
	/**
	 * Universal equality checker.
	 * Can compare objects with any structure (even looped).
	 */
	equal: function(x, y, recursively, strict)
	{
		var pairs = [];
		var eq = strict ? JW.seq : JW.eq;
		var req;
		
		function rec(x, y)
		{
			// Either not object/array
			if (typeof x !== "object" || typeof y !== "object")
				return eq(x, y);
			
			// May be the same?
			if (x === y)
				return true;
			
			// May be have different type? (object/array)
			var xa = JW.isArray(x);
			var ya = JW.isArray(y);
			
			if (xa !== ya)
				return false;
			
			// May be this is infinite inclusion?
			for (var i = 0; i < pairs.length; ++i)
			{
				if ((pairs[i][0] === x && pairs[i][1] === y) ||
					(pairs[i][0] === y && pairs[i][1] === x))
					return true;
			}
			
			pairs.push([ x, y ]);
			
			// May be they are both arrays?
			if (xa)
			{
				if (x.length !== y.length)
					return false;
				
				for (var i = 0; i < x.length; ++i)
				{
					if (!req(x[i], y[i]))
						return false;
				}
				
				return true;
			}
			
			// They are objects!
			var keys = {};
			
			for (var i in x)
			{
				keys[i] = true;
				if (!req(x[i], y[i]))
					return false;
			}
			
			for (var i in y)
			{
				if (!keys[i])
					return false;
				delete keys[i];
			}
			
			for (var i in keys)
				return false;
			
			return true
		}
		
		req = recursively ? rec : eq;
		
		return rec(x, y);
	},
	
	/**
	 * Compare two values.
	 */
	eq: function(x, y)
	{
		return x == y;
	},
	
	/**
	 * Compare two values strictly.
	 */
	seq: function(x, y)
	{
		return x === y;
	},
	
	/**
	 * Calculates unsigned modulo value in [0, mod).
	 */
	mod: function(value, mod)
	{
		return value - mod * Math.floor(value / mod);
	},
	
	/**
	 * Calculates signed modulo value in [-mod/2, mod/2).
	 */
	smod: function(value, mod)
	{
		return value - mod * Math.round(value / mod);
	},
	
	/**
	 * Returns value sign (-1, 0, or 1).
	 */
	sgn: function(value)
	{
		return !value ? 0 : value > 0 ? 1 : -1;
	},
	
	/**
	 * Returns non-zero value sign (-1, or 1)
	 */
	sgnnz: function(value)
	{
		return value >= 0 ? 1 : -1;
	},
	
	/**
	 * Get field value.
	 * If field name is started with "-", returns variable value.
	 * Else tries to run getter method or returns variable value.
	 */
	getField: function(target, field)
	{
		if (!JW.isSet(field))
			return null;
		
		if (!field)
			return target;
		
		if (field.charAt(0) === "-")
			return JW.get(target, field.substr(1));
		
		var m = "get" + JW.String.capitalize(field);
		if (typeof target[m] === "function")
			return target[m]();
		
		return JW.get(target, field);
	},
	
	/**
	 * Set field value.
	 * If field name is started with "-", changes variable value.
	 * Else tries to run setter method or changes variable value.
	 * Does nothing if value is already the same strictly.
	 */
	setField: function(target, field, value)
	{
		if (!field)
			return target;
		
		if (JW.getField(target, field) === value)
			return target;
		
		if (field.charAt(0) === "-")
		{
			target[field.substr(1)] = value;
			return target;
		}
		
		var m = "set" + JW.String.capitalize(field);
		if (typeof target[m] === "function")
		{
			target[m](value);
			return target;
		}
		
		target[field] = value;
		return target;
	},
	
	/**
	 * Replaces all special characters from text to put it into html properly.
	 */
	htmlEncode: function(text)
	{
		return JW.String.htmlEncode(text);
	},
	
	/**
	 * Back function to htmlEncode.
	 */
	htmlDecode: function(text)
	{
		return JW.String.htmlDecode(text);
	},
	
	/**
	 * Removes all <script> tags from html to prevent scripting.
	 */
	removeScripts: function(text)
	{
		return JW.String.removeScripts(text);
	},
	
	/**
	 * Shortens string to specified length using ellipsis.
	 */
	ellipsis: function(
		text,       // [required] String
		length,     // [required] Integer, string length to shorten to
		ellipsis)   // [optional] String, defaults to "..."
	{
		return JW.String.ellipsis(text, length, ellipsis);
	},
	
	/**
	 * Prepends string by specified symbols till specified length.
	 */
	prepend: function(
		text,       // [required] String
		length,     // [required] Integer, string length to stretch to
		ch)         // [required] String, symbol to prepend
	{
		return JW.String.ellipsis(text, length, ch);
	},
	
	/**
	 * Takes first symbol in string to upper case.
	 */
	capitalize: function(text)
	{
		return JW.String.capitalize(text);
	},
	
	/**
	 * Converts all hyphen/lowercase pairs to uppercase symbols.
	 */
	camel: function(text)
	{
		return JW.String.camel(text);
	},
	
	/**
	 * Converts all uppercase letters to hyphen/lowercase pairs.
	 */
	hyphen: function(text)
	{
		return JW.String.hyphen(text);
	},
	
	/**
	 * Removes all whitespaces at the beginning and at the end.
	 */
	trim: function(text)
	{
		return JW.String.trim(text);
	},
	
	/**
	 * Returns function which has scope instead of first argument.
	 */
	enscope: function(callback)
	{
		return function() {
			var args = [ this ];
			for (var i = 0; i < arguments.length; ++i)
				args.push(arguments[i]);
			
			return callback.apply(this, args);
		}
	},
	
	/**
	 * Returns function which has first argument instead of scope.
	 */
	descope: function( // Function
		callback,  // [required] Function
		converter) // [optional] Function
	{
		if (converter)
		{
			return function(target) {
				return callback.apply(converter(target), JW.args(arguments, 1));
			}
		}
		else
		{
			return function(target) {
				return callback.apply(target, JW.args(arguments, 1));
			}
		}
	},
	
	/**
	 * Returns method of flyweight based on direct method.
	 */
	enfly: function( // Function
		callback) // [required] Function
	{
		return function() {
			return callback.apply(this.base, arguments);
		}
	},
	
	/**
	 * Populates flyweight class with methods.
	 */
	extendFly: function( // Function
		target         // Function
		/* sources */) // Object
	{
		for (var i = 1; i < arguments.length; ++i)
		{
			var source = arguments[i];
			for (var key in source)
				target.prototype[key] = JW.enfly(source[key]);
		}
		
		return target;
	}
});
