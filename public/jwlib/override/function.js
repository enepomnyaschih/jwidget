/*
	JW function prototype extension.
	
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

JW.Function = JW.Class.extend({
	base : null, // [readonly] Function
	
	init: function(x)
	{
		this.base = x;
	}
});

JW.Function._prototype = {
	/**
	 * Returns callback with specified scope.
	 */
	inScope: function( // Function
		scope) // [optional] Object
	{
		var callee = this;
		return function() {
			return callee.apply(scope || this, arguments);
		}
	},
	
	/**
	 * Returns callback with empty arguments list.
	 */
	noArgs: function() // Function
	{
		var callee = this;
		return function() {
			return callee.call(this);
		}
	},
	
	/**
	 * Returns callback with specified arguments inserted.
	 */
	insertArgs: function( // Function
		index        // [required] Integer
		/*, args */) // [optional] *
	{
		return JW.Function.insertArgsArray(this, index, JW.args(arguments, 1));
	},
	
	/**
	 * Returns callback with specified arguments inserted.
	 */
	insertArgsArray: function( // Function
		index,  // [required] Integer
		args)   // [optional] Array
	{
		var callee = this;
		return function() {
			var args_new = JW.args(arguments);
			while (args_new.length < index)
				args_new.push(undefined);
			args_new.splice.apply(args_new, [ index, 0 ].concat(args));
			return callee.apply(this, args_new);
		}
	},
	
	/**
	 * Returns callback with specified arguments removed.
	 */
	removeArgs: function( // Function
		index,  // [required] Integer
		count)  // [optional] Integer
	{
		var callee = this;
		return function() {
			if (arguments.length <= index)
				return callee.apply(this, arguments);
			
			var args_new = JW.args(arguments);
			count = JW.defn(count, args_new.length - index);
			args_new.splice(index, count);
			return callee.apply(this, args_new);
		}
	},
	
	/**
	 * Returns callback with specified arguments.
	 * Pass "\x" to insert original argument with x index (x = 0..7).
	 */
	withArgs: function( // Function
		/* args */) // [optional] *
	{
		return JW.Function.asArray(this, null, JW.args(arguments));
	},
	
	/**
	 * Returns callback with specified arguments.
	 * Pass "\x" to insert original argument with x index (x = 0..7).
	 */
	withArgsArray: function( // Function
		args) // [required] Array
	{
		return JW.Function.asArray(this, null, args);
	},
	
	/**
	 * Universal callback builder.
	 * Optimized combination of inScope and withArgs methods.
	 */
	as: function( // Function
		scope        // [optional] Object
		/*, args */) // [optional] *
	{
		return JW.Function.asArray(this, scope, JW.args(arguments, 1));
	},
	
	/**
	 * Universal callback builder.
	 * Optimized combination of inScope and withArgs methods.
	 */
	asArray: function( // Function
		scope, // [optional] Object
		args)  // [required] Array
	{
		var callee = this;
		return function() {
			var args_new = [];
			for (var i = 0; i < args.length; ++i)
			{
				var a = args[i];
				if (typeof a === "string" && a.length == 1 && (a.charCodeAt(0) < 8))
					args_new.push(arguments[a.charCodeAt(0)]);
				else
					args_new.push(a);
			}
			return callee.apply(scope || this, args_new);
		}
	},
	
	/**
	 * Returns callback which returns opposite boolean value.
	 */
	not: function() // Function
	{
		var callee = this;
		return function() {
			return !callee.apply(this, arguments);
		}
	}
};

JW.apply(JW.Function, {
	enscope         : JW.enscope,
	descope         : JW.descope,
	
	inScope         : JW.descope(JW.Function._prototype.inScope),
	noArgs          : JW.descope(JW.Function._prototype.noArgs),
	insertArgs      : JW.descope(JW.Function._prototype.insertArgs),
	insertArgsArray : JW.descope(JW.Function._prototype.insertArgsArray),
	removeArgs      : JW.descope(JW.Function._prototype.removeArgs),
	withArgs        : JW.descope(JW.Function._prototype.withArgs),
	withArgsArray   : JW.descope(JW.Function._prototype.withArgsArray),
	as              : JW.descope(JW.Function._prototype.as),
	asArray         : JW.descope(JW.Function._prototype.asArray),
	not             : JW.descope(JW.Function._prototype.not),
	
	/**
	 * Returns callback which returns conjunction of several function results.
	 */
	and: function( // Function
		/* callbacks */) // [optional] Function
	{
		var callbacks = JW.args(arguments);
		return function() {
			for (var i = 0; i < callbacks.length; ++i)
			{
				if (!callbacks[i].apply(this, arguments))
					return false;
			}
			return true;
		}
	},

	/**
	 * Returns callback which returns disjunction of several function results.
	 */
	or: function( // Function
		/* callbacks */) // [optional] Function
	{
		var callbacks = JW.args(arguments);
		return function() {
			for (var i = 0; i < callbacks.length; ++i)
			{
				if (callbacks[i].apply(this, arguments))
					return true;
			}
			return false;
		}
	},

	/**
	 * Returns callback which returns boolean sum of several function results.
	 */
	xor: function( // Function
		/* callbacks */) // [optional] Function
	{
		var callbacks = JW.args(arguments);
		return function() {
			var result = 0;
			for (var i = 0; i < callbacks.length; ++i)
				result = result ^ callbacks[i].apply(this, arguments);
			return result;
		}
	},

	/**
	 * Returns callback which returns implication of 2 function results.
	 */
	impl: function( // Function
		x, // [required] Function
		y) // [required] Function
	{
		return function() {
			return !x.apply(this, arguments) || y.apply(this, arguments);
		}
	},
	
	/**
	 * Returns callback which runs multiple functions and returns result of last function.
	 */
	forth: function( // Function
		/* callbacks */) // [required] Function
	{
		var callbacks = JW.args(arguments);
		return function() {
			for (var i = 0; i < callbacks.length - 1; ++i)
				callbacks[i].apply(this, arguments);
			return JW.Array.top(callbacks).apply(this, arguments);
		}
	},
	
	/**
	 * Returns callback which runs multiple functions and returns result of first function.
	 */
	back: function( // Function
		/* callbacks */) // [required] Function
	{
		var callbacks = JW.args(arguments);
		return function() {
			var result = callbacks[0].apply(this, arguments);
			for (var i = 1; i < callbacks.length; ++i)
				callbacks[i].apply(this, arguments);
			return result;
		}
	},
	
	/**
	 * Returns callback which runs function and returns specified value.
	 */
	returns: function( // Function
		target, // [optional] Function
		value)  // [required] *
	{
		if (target)
		{
			return function() {
				target.apply(this, arguments);
				return value;
			}
		}
		else
		{
			return function() {
				return value;
			}
		}
	},
	
	/**
	 * Returns callback which runs function and returns specified argument.
	 */
	returnsArg: function( // Function
		target, // [optional] Function
		index)  // [required] Integer
	{
		if (target)
		{
			return function() {
				target.apply(this, arguments);
				return arguments[index];
			}
		}
		else
		{
			return function() {
				return arguments[index];
			}
		}
	}
});

JW.apply(JW.Function._prototype, {
	enscope    : JW.enscope(JW.enscope),
	descope    : JW.enscope(JW.descope),
	
	and        : JW.enscope(JW.Function.and),
	or         : JW.enscope(JW.Function.or),
	xor        : JW.enscope(JW.Function.xor),
	impl       : JW.enscope(JW.Function.impl),
	forth      : JW.enscope(JW.Function.forth),
	back       : JW.enscope(JW.Function.back),
	returns    : JW.enscope(JW.Function.returns),
	returnsArg : JW.enscope(JW.Function.returnsArg)
});

JW.extendFly(JW.Function, JW.Function._prototype, {
	call  : Array.prototype.call,
	apply : Array.prototype.apply
});
