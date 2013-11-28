﻿/*
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
	_iid: 0,
	
	_fnTest: /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/,
	
	/**
	 * Extends one class from another. Pass class members in `body` argument - all fields and methods of `body`
	 * will become fields and methods of subclass. `body` contents move into subclass prorotype in
	 * slightly modified state.
	 * 
	 * You must define subclass constructor before using this function.
	 * 
	 * See JW.Class for example.
	 *
	 * @static
	 * @member JW
	 * @param {Function} subclass Subclass.
	 * @param {Function} superclass Superclass.
	 * @param {Object} body Subclass body.
	 * @returns {Function} Returns subclass.
	 */
	extend: function(subc, supc, body) {
		body = body || {};
		
		var F = function() {};
		F.prototype = supc.prototype;
		subc.prototype = new F();
		subc.prototype.constructor = subc;
		subc.superclass = supc.prototype;
		subc._super = supc;
		for (var i in body) {
			subc.prototype[i] = JW.ClassUtil.extendMethod(body[i], supc.prototype[i]);
		}
		subc.extend = function(body) {
			var f = function() {
				subc.apply(this, arguments);
			};
			JW.extend(f, subc, body);
			return f;
		};
		return subc;
	},
	
	extendMethod: function(sub, sup) {
		if ((typeof sup !== "function") ||
			(typeof sub !== "function") ||
			sub.superclass ||
			!JW.ClassUtil._fnTest.test(sub)) {
			return sub;
		}
		return function() {
			var tmp = this._super;
			this._super = sup;
			var result = sub.apply(this, arguments);
			this._super = tmp;
			return result;
		}
	}
};

JW.extend = JW.ClassUtil.extend;

/**
 * @class
 * 
 * The base class of all jWidget classes. You can inherit your classes from JW.Class and its subclasses.
 * 
 * Class inheritance sample:
 * 
 *     // Constructor
 *     var Shape = function(name) {
 *         // Call superclass constructor
 *         Shape.{@link JW.Class#static-property-_super _super}.call(this);
 *         // Define fields
 *         this.name = name;
 *     };
 *     
 *     // Inherit Shape from JW.Class
 *     JW.extend(Shape, JW.Class, {
 *         // string name;
 *         // abstract number getArea();
 *     });
 *     
 *     // --------
 *     
 *     var Rectangle = function(name, width, height) {
 *         Rectangle.{@link JW.Class#static-property-_super _super}.call(this, name);
 *         this.width = width;
 *         this.height = height;
 *         // For optimization, you should define all class fields (even null) in constructor
 *         this.el = null;
 *     };
 *     
 *     JW.extend(Rectangle, Shape, {
 *         // number width;
 *         // number height;
 *         // Element el;
 *         
 *         // Destructor
 *         {@link JW.Class#method-destroy destroy}: function() {
 *             // Release resources
 *             if (this.el) {
 *                 this.el.remove();
 *             }
 *             // Call superclass destructor
 *             this.{@link JW.Class#method-_super _super}();
 *         },
 *         
 *         // Override method
 *         getArea: function() {
 *             return this.width * this.height;
 *         },
 *         
 *         getElement: function() {
 *             if (!this.el) {
 *                 this.el = jQuery('<div />');
 *                 this.el.width(this.width);
 *                 this.el.height(this.height);
 *             }
 *             return this.el;
 *         }
 *     });
 */
JW.Class = function() {
	this._iid = ++JW.ClassUtil._iid;
	this._super = null;
};

/**
 * @property {Function} constructor
 *
 * Constructor as class. If you have an object, you can get its class using this field.
 */
/**
 * @property {number} _iid
 *
 * Instance ID.
 *
 * Auto-incremental object unique ID. Each JW.Class instance gets such identifier.
 * Used in JW.AbstractSet as map key for quick item access.
 */
/**
 * @method destroy
 *
 * Class destructor. The logic of class instance destruction should be implemented here. You must call this method
 * explicitly from outside, because JavaScript doesn't support automatic class destructor calling. Don't forget to
 * call superclass destructor at the end of the method:
 *
 *     destroy: function() {
 *         // Release resources
 *         ...
 *         // Call superclass destructor
 *         this.{@link #method-_super _super}();
 *     }
 *
 * @returns {void}
 */
/**
 * @method _super
 *
 * This method is available only inside class methods that were passed into JW.extend method.
 * This method is an easy way of the same superclass method calling:
 *
 *     ...
 *     // Class method
 *     myMethod: function(a, b, c) {
 *         return this.{@link #method-_super}(a, b) + c;
 *     }
 *     ...
 *
 * Equivalent code without {@link #method-_super} usage:
 *
 *     ...
 *     // Class method
 *     myMethod: function(a, b, c) {
 *         return MyClass.{@link #static-property-superclass}.myMethod.call(this, a, b) + c;
 *     }
 *     ...
 *
 * @returns {Mixed}
 */
/**
 * @property {Function} _super
 *
 * Superclass. Thanks to this static field, you can call superclass constructor:
 *
 *     var MyClass = function() {
 *         MyClass.{@link #static-property-_super}.call(this);
 *     };
 *     
 *     JW.extend(MyClass, JW.Class);
 *
 * All classes inherited from JW.Class gain this field automatically.
 *
 * @static
 */
/**
 * @property {Object} prototype
 *
 * Class prototype.
 *
 * @static
 */
/**
 * @property {Object} superclass
 *
 * Superclass prototype.
 *
 * All classes inherited from JW.Class gain this field automatically.
 *
 * @static
 */
/**
 * @method extend
 *
 * Shortcut of empty constructor definition and JW.extend calling. Example:
 *
 *     var MyClass = BaseClass.{@link #static-method-extend}({ ... });
 *
 * Equivalent code:
 *
 *     var MyClass = function() {
 *         MyClass.{@link #static-property-_super}.apply(this, arguments);
 *     };
 *     
 *     JW.extend(MyClass, BaseClass, { ... });
 *
 * Though this method is not recommended because it messes up stack traces a bit.
 *
 * @static
 *
 * @param {Object} body Subclass body.
 * @returns {Function} Subclass.
 */

JW.extend(JW.Class, Object, {
	destroy: function() {}
});