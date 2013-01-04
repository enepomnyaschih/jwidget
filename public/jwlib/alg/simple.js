/*
	JW simple collection methods.
	
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

JW.ns("JW.Alg");

JW.apply(JW, {
	/**
	 * Executes a function on each item in a collection, and returns true if
	 * all items have returned value true.
	 */
	every: function(
		target,     // [required] Mixed
		callback,   // [required] Function(item, /* keys */)
		scope)      // [optional] Object
	{
		if (typeof target === "function")
			return target(callback, scope || JW.global);
		
		if (typeof target !== "object" || !target)
			return true;
		
		if (typeof target.every === "function")
			return target.every(callback, scope);
		
		if (JW.isArray(target))
			return JW.Array.every(target, callback, scope);
		
		for (var i in target)
		{
			if (!callback.call(scope || target, target[i], i))
				return false;
		}
		
		return true;
	},
	
	/**
	 * Returns true if all items' specified field value is equal (==)
	 * to specified one. Must contain objects only.
	 */
	everyBy: function(
		target,     // [required] Mixed
		field,      // [required] String
		value)      // [required] *
	{
		return JW.invokeBy(JW.every, target, field, value);
	},
	
	/**
	 * Returns true if all items' specified method result is true.
	 * Must contain objects only.
	 */
	everyByMethod: function(
		target,     // [required] Mixed
		method,     // [required] String
		args)       // [optional] Array of arguments to pass into method
	{
		return JW.invokeByMethod(JW.every, target, method, args);
	},
	
	/**
	 * Executes a function on each item in a collection.
	 */
	each: function(
		target,     // [required] Mixed
		callback,   // [required] Function(item, /* keys */)
		scope)      // [optional] Object
	{
		JW.every(target, JW.Function.returns(callback, true), scope);
		return target;
	},
	
	/**
	 * Executes a method of each item in collection. Must contain objects only.
	 */
	eachByMethod: function(
		target,     // [required] Mixed
		method,     // [required] String
		args)       // [optional] Array of arguments to pass into method
	{
		return JW.invokeByMethod(JW.each, target, method, args);
	},
	
	/**
	 * Executes a function on each item in a collection, and returns true if
	 * at least one item has returned value true.
	 */
	some: function(
		target,     // [required] Mixed
		callback,   // [required] Function(item, /* keys */)
		scope)      // [optional] Object
	{
		return !JW.every(target, JW.Function.not(callback), scope);
	},
	
	/**
	 * Returns true if some items' specified field value is equal (==)
	 * to specified one. Must contain objects only.
	 */
	someBy: function(
		target,     // [required] Mixed
		field,      // [required] String
		value)      // [required] *
	{
		return JW.invokeBy(JW.some, target, field, value);
	},
	
	/**
	 * Returns true if all items' specified method result is true.
	 * Must contain objects only.
	 */
	someByMethod: function(
		target,     // [required] Mixed
		method,     // [required] String
		args)       // [optional] Array of arguments to pass into method
	{
		return JW.invokeByMethod(JW.some, target, method, args);
	},
	
	/**
	 * Find first item index where callback returns true.
	 */
	find: function(
		target,     // [required] Mixed
		callback,   // [required] Function(item, /* keys */)
		scope)      // [optional] Object
	{
		var result;
		JW.every(target, function(item, index) {
			if (callback.apply(scope || this, arguments))
			{
				result = index;
				return false;
			}
			
			return true;
		});
		
		return result;
	},
	
	/**
	 * Find first item index where specified field equals to specified value.
	 */
	findBy: function(
		target,     // [required] Mixed
		field,      // [required] String
		value)      // [required] *
	{
		return JW.invokeBy(JW.find, target, field, value);
	},
	
	/**
	 * Find first item index where specified method returns true.
	 */
	findByMethod: function(
		target,     // [required] Mixed
		method,     // [required] String
		args)       // [optional] Array of arguments to pass into method
	{
		return JW.invokeByMethod(JW.find, target, method, args);
	},
	
	/**
	 * Find first item where callback returns true.
	 */
	search: function(
		target,     // [required] Mixed
		callback,   // [required] Function(item, /* keys */)
		scope)      // [optional] Object
	{
		var result;
		JW.every(target, function(item) {
			if (callback.apply(scope || this, arguments))
			{
				result = item;
				return false;
			}
			
			return true;
		});
		
		return result;
	},
	
	/**
	 * Find first item where specified field equals to specified value.
	 */
	searchBy: function(
		target,     // [required] Mixed
		field,      // [required] String
		value)      // [required] *
	{
		return JW.invokeBy(JW.search, target, field, value);
	},
	
	/**
	 * Find first item where specified method returns true.
	 */
	searchByMethod: function(
		target,     // [required] Mixed
		method,     // [required] String
		args)       // [optional] Array of arguments to pass into method
	{
		return JW.invokeByMethod(JW.search, target, method, args);
	},
	
	/**
	 * Run specified algorithm with field value comparison callback.
	 */
	invokeBy: function(
		algorithm,  // [required] Function(target, callback)
		target,     // [required] Mixed
		field,      // [required] String
		value)      // [required] *
	{
		return algorithm(target, function(item) {
			return JW.get(item, field) == value;
		});
	},
	
	/**
	 * Run specified algorithm with method invokation callback.
	 */
	invokeByMethod: function(
		algorithm,  // [required] Function(target, callback)
		target,     // [required] Mixed
		method,     // [required] String
		args)       // [optional] Array of arguments to pass into method
	{
		args = args || [];
		return algorithm(target, function(item) {
			return item[method].apply(item, args);
		});
	},
	
	/**
	 * Builds array of all values in a collection.
	 */
	getValuesArray: function(
		target)     // [required] Mixed
	{
		var result = [];
		JW.every(target, function(item) {
			result.push(item);
			return true;
		});
		return result;
	},
	
	/**
	 * Builds set of all values in a collection (object from items to true).
	 */
	getValuesSet: function(
		target)     // [required] Mixed
	{
		var result = {};
		JW.every(target, function(item) {
			result[item] = true;
			return true;
		});
		return result;
	},
	
	/**
	 * Iterates collection and returns its length.
	 */
	getLength: function(
		target)     // [required] Mixed
	{
		var result = 0;
		JW.every(target, function(item) {
			++result;
			return true;
		});
		return result;
	},
	
	/**
	 * Returns true if collection doesn't contain any items.
	 */
	isEmpty: function(
		target)     // [required] Mixed
	{
		return JW.every(target, function(item) {
			return false;
		});
	},
	
	/**
	 * Indexes items by specified field.
	 */
	indexBy: function( // Object
		target, // [required] Mixed
		field)  // [required] String, field name
	{
		var result = {};
		JW.every(target, function(item) {
			var key = JW.get(item, field);
			if (JW.isSet(key))
				result[key] = item;
			return true;
		});
		return result;
	}
});

JW.forEach = JW.each;
JW.forEachByMethod = JW.eachByMethod;

/**
 * Add these methods to prototype of your simple collection.
 */
JW.Alg.SimpleMethods = {
	everyBy: function(field, value)
	{
		return JW.everyBy(this, field, value);
	},
	
	everyByMethod: function(method, args)
	{
		return JW.everyByMethod(this, method, args);
	},
	
	each: function(callback, scope)
	{
		return JW.each(this, callback, scope);
	},
	
	eachByMethod: function(method, args)
	{
		return JW.eachByMethod(this, method, args);
	},
	
	forEach: function(callback, scope)
	{
		return JW.forEach(this, callback, scope);
	},
	
	forEachByMethod: function(method, args)
	{
		return JW.forEachByMethod(this, method, args);
	},
	
	some: function(callback, scope)
	{
		return JW.some(this, callback, scope);
	},
	
	someBy: function(field, value)
	{
		return JW.someBy(this, field, value);
	},
	
	someByMethod: function(method, args)
	{
		return JW.someByMethod(this, method, args);
	},
	
	find: function(callback, scope)
	{
		return JW.find(this, callback, scope);
	},
	
	findBy: function(field, value)
	{
		return JW.findBy(this, field, value);
	},
	
	findByMethod: function(method, args)
	{
		return JW.findByMethod(this, method, args);
	},
	
	search: function(callback, scope)
	{
		return JW.search(this, callback, scope);
	},
	
	searchBy: function(field, value)
	{
		return JW.searchBy(this, field, value);
	},
	
	searchByMethod: function(method, args)
	{
		return JW.searchByMethod(this, method, args);
	},
	
	invokeBy: function(algorithm, field, value)
	{
		return JW.invokeBy(algorithm, this, field, value);
	},
	
	invokeByMethod: function(algorithm, method, args)
	{
		return JW.invokeByMethod(algorithm, this, method, args);
	},
	
	getValuesArray: function()
	{
		return JW.getValuesArray(this);
	},
	
	getValuesSet: function()
	{
		return JW.getValuesSet(this);
	},
	
	getLength: function()
	{
		return JW.getLength(this);
	},
	
	isEmpty: function()
	{
		return JW.isEmpty(this);
	},
	
	indexBy: function(field)
	{
		return JW.indexBy(this, field);
	}
};
