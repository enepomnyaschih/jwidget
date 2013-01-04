/*
	JW collection building methods.
	
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
	 * Creates a collection of the same type as target, which does not contain
	 * any items.
	 */
	createEmpty: function(
		target)     // [required] Mixed
	{
		if (typeof target === "function")
			return target();
		
		if (!target || typeof target !== "object")
			return null;
		
		if (typeof target.createEmpty === "function")
			return target.createEmpty();
		
		return JW.isArray(target) ? [] : {};
	},
	
	/**
	 * Updates item value in target collection.
	 * Returns updated collection.
	 */
	pushItem: function(
		target,     // [required] Mixed
		params)     // [required] Arguments of "every" method
	{
		if (typeof target === "function")
			return target.apply(JW.global, params);
		
		if (!target || typeof target !== "object")
			return target;
		
		if (typeof target.pushItem === "function")
			return target.pushItem.apply(target, params);
		
		if (JW.isArray(target))
			return target.push(params[0]);
		
		target[params[1]] = params[0];
		return target;
	},
	
	/**
	 * Constructs a new collection containing the same items that original
	 * collection contains (clone copy).
	 */
	clone: function(
		target)     // [required] Mixed
	{
		var result = JW.createEmpty(target);
		return JW.merge(result, target);
	},
	
	/**
	 * Executes a function on each item in a collection, and constructs a new
	 * collection of items in original collection which have returned true
	 * value.
	 */
	filter: function(
		target,     // [required] Mixed
		callback,   // [required] Function(item, /* keys */)
		scope)      // [optional] Object
	{
		var result = JW.createEmpty(target);
		JW.every(target, function() {
			if (callback.apply(scope || this, arguments))
				JW.pushItem(result, arguments);
			return true;
		});
		return result;
	},
	
	/**
	 * Finds all item objects which contain field with value equal (==) to specified one
	 * and builds new collection of such items.
	 * This collection must contain objects only.
	 */
	filterBy: function(
		target,     // [required] Mixed
		field,      // [required] String, field name
		value)      // [required] *
	{
		return JW.filter(target, function(item) {
			return JW.get(item, field) == value;
		});
	},
	
	/**
	 * Finds all item objects which contain method returning result is true
	 * and builds new collection of such items.
	 * This collection must contain objects only.
	 */
	filterByMethod: function (
		target,     // [required] Mixed
		method,     // [required] String
		args)       // [optional] Array of arguments to pass into method
	{
		args = args || [];
		return JW.filter(target, function(item) {
			return item[method].apply(item, args);
		});
	},
	
	/**
	 * Executes a function on each item in a collection, and constructs a new collection
	 * of items corresponding to the results of the function on each item in the
	 * original collection.
	 */
	map: function(
		target,     // [required] Mixed
		callback,   // [required] Function(item, /* keys */)
		scope)      // [optional] Object
	{
		var result = JW.createEmpty(target);
		JW.every(target, function() {
			var args = JW.args(arguments);
			args[0] = callback.apply(scope || this, arguments);
			JW.pushItem(result, args);
			return true;
		});
		return result;
	},
	
	/**
	 * Constructs a new collection of values of specified field of each item.
	 */
	mapBy: function(
		target,     // [required] Mixed
		field)      // [required] String, field name
	{
		return JW.map(target, function(item) {
			return JW.get(item, field);
		});
	},
	
	/**
	 * Constructs a new collection of results of specified method of each item.
	 */
	mapByMethod: function(
		target,     // [required] Mixed
		method,     // [required] String
		args)       // [optional] Array of arguments to pass into method
	{
		args = args || [];
		return JW.map(target, function(item) {
			return item[method].apply(item, args);
		});
	},
	
	/**
	 * Builds an object which contains collections of corresponding fields of each item.
	 */
	mapFields: function(
		target)     // [required] Mixed
	{
		var result = {};
		JW.every(target, function(item) {
			for (var key in item)
				result[key] = JW.mapBy(target, key);
			
			// Exit immediately
			return false;
		});
		return result;
	},
	
	/**
	 * Merged items from source collection into target collection.
	 * Returns target collection.
	 */
	merge: function(
		target,     // [required] Mixed
		source)     // [required] Mixed
	{
		JW.every(source, function() {
			JW.pushItem(target, arguments);
			return true;
		});
		return target;
	}
});

/**
 * Add these methods to prototype of your building collection.
 */
JW.Alg.BuildMethods = {
	clone: function()
	{
		return JW.clone(this);
	},
	
	filter: function(callback, scope)
	{
		return JW.filter(this, callback, scope);
	},
	
	filterBy: function(field, value)
	{
		return JW.filterBy(this, field, value);
	},
	
	filterByMethod: function(method, args)
	{
		return JW.filterByMethod(this, method, args);
	},
	
	map: function(callback, scope)
	{
		return JW.map(this, callback, scope);
	},
	
	mapBy: function(field)
	{
		return JW.mapBy(this, field);
	},
	
	mapByMethod: function(method, args)
	{
		return JW.mapByMethod(this, method, args);
	},
	
	mapFields: function()
	{
		return JW.mapFields(this);
	},
	
	merge: function(source)
	{
		return JW.merge(this, source);
	}
};
