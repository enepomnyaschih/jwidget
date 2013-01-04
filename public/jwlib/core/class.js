/*
	JW simple inheritance.
	
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

JW.ClassUtil = {
	fnTest: /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/,
	
	/**
	 * Base class. Constructor is "init" method.
	 */
	Class: function()
	{
		if (this.init)
			this.init.apply(this, arguments);
		
		return this;
	},
	
	/**
	 * Create empty class.
	 */
	newClass: function()
	{
		var cl = function()
		{
			cl.superclass.constructor.apply(this, arguments);
			return this;
		}
		
		return cl;
	},
	
	/**
	 * Class inheritance function.
	 * 
	 * Arguments purposes depend on their types:
	 * extend() - create JW.Class subclass
	 * extend(body:Object) - create JW.Class subclass with specified body
	 * extend(supc:Function) - create supc subclass
	 * extend(supc:Function, body:Object) - create supc with specified body
	 * extend(subc:Function, supc:Function) - inherits subc from supc
	 * extend(subc:Function, supc:Function, body:Object) - inherits subc from supc with specified body
	 * 
	 * Function returns subclass always.
	 */
	extend: function(a, b, c)
	{
		var subc, supc, body;
		
		if (!a || typeof a == "object")
		{
			if (c)
				throw "Can't extend: subclass is undefined";
			
			if (b)
				throw "Can't extend: superclass is undefined";
			
			subc = JW.ClassUtil.newClass();
			supc = JW.ClassUtil.Class;
			body = a;
		}
		else if (!b || typeof b == "object")
		{
			if (c)
				throw "Can't extend: superclass is undefined";
			
			subc = JW.ClassUtil.newClass();
			supc = a;
			body = b;
		}
		else
		{
			subc = a;
			supc = b;
			body = c;
		}
		
		var F = function(){};
		
		F.prototype = supc.prototype;
		subc.prototype = new F();
		subc.prototype.constructor = subc;
		subc.superclass = supc.prototype;
		
		subc.extend = function(a, b) {
			return JW.ClassUtil.extend(subc, a, b);
		}
		
		subc.create = function(a) {
			return (a instanceof subc) ? a : new subc(a);
		}
		
		for (var i in body)
			subc.prototype[i] = JW.ClassUtil.extendMethod(body[i], supc.prototype[i]);
		
		return subc;
	},
	
	/**
	 * Create subclass method. Adds this._super call support.
	 */
	extendMethod: function(sub, sup)
	{
		if (typeof sup !== "function" ||
			typeof sub !== "function" ||
			sub.superclass ||
			!JW.ClassUtil.fnTest.test(sub))
			return sub;
		
		return function()
		{
			var tmp = this._super;
			this._super = sup;
			var result = sub.apply(this, arguments);
			this._super = tmp;
			return result;
		}
	}
};

JW.Class = JW.ClassUtil.Class;
JW.ClassUtil.extend(JW.Class, Object);

JW.Class.prototype.init = function() {};
JW.Class.prototype.destroy = function() {};
