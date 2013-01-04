/*
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

JW.Array = JW.Class.extend({
	base : null, // [readonly] Array
	
	init: function(x)
	{
		this.base = x;
	}
});

JW.Array._prototype = {
	/**
	 * Executes a function on each item in an array, and returns true if
	 * all items have returned value true.
	 */
	every: function( // Boolean
		callback, // [required] Function(item, index, array)
		scope)    // [optional] Object
	{
		for (var i = 0; i < this.length; ++i)
		{
			if (!callback.call(scope || this, this[i], i))
				return false;
		}
		
		return true;
	},
	
	/**
	 * Creates empty array. JW.Alg.BuildMethods-required method.
	 */
	createEmpty: function() // Array
	{
		return [];
	},
	
	/**
	 * Adds an item to array. Returns updated array. JW.Alg.BuildMethods-required method.
	 */
	pushItem: function( // this
		value, // [required] *
		index) // [optional] Integer
	{
		this.push(value);
		return this;
	},
	
	/**
	 * Finds item object which contains field with value equal (==) to specified one
	 * and removes all such items.
	 * This array must contain objects only.
	 */
	removeBy: function( // this
		field, // [required] String, field name
		value) // [required] *
	{
		var index = 0;
		while (index < this.length)
		{
			if (JW.get(this[index], field) == value)
				this.splice(index, 1);
			else
				++index;
		}
		
		return this;
	},
	
	/**
	 * Removes all items equal (==) to specified value.
	 */
	removeItem: function( // this
		item) // [optional] *
	{
		for (var i = 0; i < this.length; ++i)
		{
			if (this[i] == item)
			{
				this.splice(i, 1);
				--i;
			}
		}
		
		return this;
	},
	
	/**
	 * Compares two arrays by items respectively (==).
	 */
	equal: function( // Boolean
		arr) // [required] Array
	{
		if (this === arr)
			return true;
		
		if (this.length != arr.length)
			return false;
		
		for (var i = 0; i < this.length; ++i)
		{
			if (this[i] != arr[i])
				return false;
		}
		
		return true;
	},
	
	/**
	 * Adds multiple items to array.
	 */
	pushAll: function( // this
		items) // [optional] Array
	{
		if (!items)
			return this;
		
		this.push.apply(this, items);
		return this;
	},
	
	/**
	 * Sorts array using value of specified item field for comparing the items.
	 * This array must contain objects only.
	 */
	sortBy: function( // this
		field, // [optional] String
		order) // [optional] Number
	{
		order = order || 1;
		this.sort(function(x, y) {
			return JW.cmp(JW.get(x, field), JW.get(y, field)) * order;
		});
		return this;
	},
	
	/**
	 * Returns last element of array.
	 */
	top: function() // *
	{
		return this[this.length - 1];
	},
	
	/**
	 * Considering all items of this array as arrays, builds new array
	 * containing all items of child arrays. Supports arbitrary collapsing
	 * depth. If depth is undefined, collapses all levels.
	 */
	collapse: function( // Array
		depth) // [optional] Integer
	{
		var result = [];
		for (var i = 0; i < this.length; ++i)
		{
			if (!JW.isArray(this[i]))
			{
				result.push(this[i]);
				continue;
			}
			
			if (!JW.isSet(depth))
			{
				JW.Array.pushAll(result, JW.Array.collapse(this[i]));
				continue;
			}
			
			if (depth)
			{
				JW.Array.pushAll(result, JW.Array.collapse(this[i], depth - 1));
				continue;
			}
			
			result.push(this[i]);
		}
		
		return result;
	},
	
	/**
	 * Find specified item.
	 */
	indexOf: Array.prototype.indexOf || function( // Integer
		item) // [optional] *
	{
		for (var i = 0; i < this.length; ++i)
		{
			if (this[i] == item)
				return i;
		}
		
		return -1;
	},
	
	/**
	 * Insert item (JW.Syncher-compatible).
	 */
	insertItemAt: function( // this
		item,  // [required] *
		index) // [required] Integer
	{
		if (JW.isSet(index))
			this.splice(index, 0, item);
		else
			this.push(item);
		
		return this;
	},
	
	/**
	 * Remove item (JW.Syncher-compatible).
	 */
	removeItemAt: function( // *
		index)  // [required] Integer
	{
		var item = this[index];
		this.splice(index, 1);
		return item;
	},
	
	/**
	 * Clear items (JW.Syncher-compatible).
	 */
	clearItems: function() // this
	{
		this.splice(0, this.length);
		return this;
	},
	
	/**
	 * Get array length. JW.Alg.SimpleMethods-overriding method.
	 */
	getLength: function()
	{
		return this.length;
	},
	
	/**
	 * Check if array is empty.
	 */
	isEmpty: function()
	{
		return this.length === 0;
	}
};

JW.applyIf(JW.Array._prototype, JW.Alg.SimpleMethods, JW.Alg.BuildMethods);

JW.extendFly(JW.Array, JW.Array._prototype, {
	concat      : Array.prototype.concat,
	join        : Array.prototype.join,
	lastIndexOf : Array.prototype.lastIndexOf,
	pop         : Array.prototype.pop,
	push        : Array.prototype.push,
	reverse     : Array.prototype.reverse,
	shift       : Array.prototype.shift,
	slice       : Array.prototype.slice,
	sort        : Array.prototype.sort,
	splice      : Array.prototype.splice,
	toString    : Array.prototype.toString,
	unshift     : Array.prototype.unshift,
	valueOf     : Array.prototype.valueOf
});

JW.apply(JW.Array, {
	every            : JW.descope(JW.Array._prototype.every),
	removeBy         : JW.descope(JW.Array._prototype.removeBy),
	removeItem       : JW.descope(JW.Array._prototype.removeItem),
	equal            : JW.descope(JW.Array._prototype.equal),
	pushAll          : JW.descope(JW.Array._prototype.pushAll),
	sortBy           : JW.descope(JW.Array._prototype.sortBy),
	top              : JW.descope(JW.Array._prototype.top),
	collapse         : JW.descope(JW.Array._prototype.collapse),
	indexOf          : JW.descope(JW.Array._prototype.indexOf),
	insertItemAt     : JW.descope(JW.Array._prototype.insertItemAt),
	removeItemAt     : JW.descope(JW.Array._prototype.removeItemAt),
	clearItems       : JW.descope(JW.Array._prototype.clearItems),
	getLength        : JW.descope(JW.Array._prototype.getLength),
	isEmpty          : JW.descope(JW.Array._prototype.isEmpty),
	
	/**
	 * Arrays comparison function.
	 */
	cmp: function( // Integer
		x,               // [required] Array
		y,               // [required] Array
		caseInsensitive) // [optional] Boolean
	{
		var n = Math.min(x.length, y.length);
		for (var i = 0; i < n; ++i)
		{
			var result = JW.cmp(x[i], y[i], caseInsensitive);
			if (result)
				return result;
		}
		
		return JW.cmp(x.length, y.length);
	},
	
	/**
	 * Returns shuffled array of numbers from 0 to n-1.
	 */
	shuffle: function( // Array
		n) // [required] Integer
	{
		var result = new Array(n);
		for (var i = 0; i < n; ++i)
			result[i] = i;
		
		for (var i = 0; i < n; ++i)
		{
			var j = i + Math.floor(Math.random() * (n - i));
			var t = result[i];
			result[i] = result[j];
			result[j] = t;
		}
		
		return result;
	}
});
