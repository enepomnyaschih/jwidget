/*!
	jWidget Lib 1.4.2

	http://enepomnyaschih.github.io/jwidget/#!/guide/home

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

if (typeof JW !== "undefined") {
	throw new Error("Can't initialize jWidget Lib: JW namespace already defined");
}

(typeof window === "undefined" ? global : window).JW = {};

/**
 * @class JW
 *
 * Main jWidget library namespace.
 */

/**
 * @property {Object}
 *
 * Root environment namespace. Involved for JavaScript and NodeJS compatibility. Equals to `window` in
 * browser environment and `global` in NodeJS environment.
 *
 * @static
 */
JW.global = (typeof window === "undefined" ? global : window);

/**
 * Iterates through objects passed after first argument and copies all their fields into
 * `target` object. Returns `target`. Fields of source objects which are undefined will be ignored.
 * Empty source objects (undefined, null) will be ignored.
 *
 * Function modifies `target` object!
 *
 * Example 1:
 *
 *     var x = {         var y = {         // Result = {
 *         a: 10,                          //     a: 10,
 *         b: 20,            b: 30,        //     b: 30,
 *         c: null,          c: 40,        //     c: 40,
 *         d: undefined,     d: 50,        //     d: 50,
 *         e: null                         //     e: null,
 *                           f: 60,        //     f: 60
 *                           g: undefined  //
 *     };                };                // };
 *
 *     JW.apply(x, y);
 *
 * Example 2 (form data preparing):
 *
 *     My.Form = JW.Class.{@link JW.Class#static-method-extend}({
 *         // Object data;
 *
 *         composeData: function(extraData) {
 *             return JW.apply({}, this.getDefaultData(), this.data, extraData);
 *         },
 *
 *         // virtual
 *         getDefaultData: function() {
 *             return null;
 *         }
 *     });
 *
 * @static
 *
 * @param {Object} target Target object.
 * @param {Object} [sources] Source objects.
 * @returns {Object} Returns target object.
 */
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
	/**
	 * Checks whether x is undefined.
	 * @static
	 * @param {Mixed} x
	 * @returns {boolean} x is undefined.
	 */
	isUndefined: function(v) {
		return v === undefined;
	},

	/**
	 * Checks whether x is not undefined.
	 * @static
	 * @param {Mixed} x
	 * @returns {boolean} x is not undefined.
	 */
	isDefined: function(v) {
		return v !== undefined;
	},

	/**
	 * Checks whether x is null.
	 * @static
	 * @param {Mixed} x
	 * @returns {boolean} x is null.
	 */
	isNull: function(v) {
		return v === null;
	},

	/**
	 * Checks whether x is not null.
	 * @static
	 * @param {Mixed} x
	 * @returns {boolean} x is not null.
	 */
	isNotNull: function(v) {
		return v !== null;
	},

	/**
	 * Checks whether x is not undefined and null.
	 * @static
	 * @param {Mixed} x
	 * @returns {boolean} x is not undefined and null.
	 */
	isSet: function(v) {
		return (v !== undefined) && (v !== null);
	},

	/**
	 * Checkes whether x is undefined or null.
	 * @static
	 * @param {Mixed} x
	 * @returns {boolean} x is undefined or null.
	 */
	isNotSet: function(v) {
		return (v === undefined) || (v === null);
	},

	/**
	 * Checks whether x is blank (`null`, `undefined`, `false`, 0 or blank string).
	 * @static
	 * @param {Mixed} x
	 * @returns {boolean} x is blank.
	 */
	isBlank: function(v) {
		return !v;
	},

	/**
	 * Checks whether x is not blank (`null`, `undefined`, `false`, 0 or blank string).
	 * @static
	 * @param {Mixed} x
	 * @returns {boolean} x is not blank.
	 */
	isNotBlank: function(v) {
		return Boolean(v);
	},

	/**
	 * Checks whether x is an integer.
	 * @static
	 * @param {Mixed} x
	 * @returns {boolean} x is an integer.
	 */
	isInt: function(v) {
		return (typeof v === "number") && Math.round(v) === v;
	},

	/**
	 * Checks whether x is a number.
	 * @static
	 * @param {Mixed} x
	 * @returns {boolean} x is a number.
	 */
	isNumber: function(v) {
		return typeof v === "number";
	},

	/**
	 * Checks whether x is a string.
	 * @static
	 * @param {Mixed} x
	 * @returns {boolean} x is a string.
	 */
	isString: function(v) {
		return typeof v === "string";
	},

	/**
	 * Checks whether x is a boolean.
	 * @static
	 * @param {Mixed} x
	 * @returns {boolean} x is a boolean.
	 */
	isBoolean: function(v) {
		return typeof v === "boolean";
	},

	/**
	 * Checks whether x is a function.
	 * @static
	 * @param {Mixed} x
	 * @returns {boolean} x is a function.
	 */
	isFunction: function(v) {
		return typeof v === "function";
	},

	/**
	 * Checks whether x is a native JavaScript Array.
	 * @static
	 * @param {Mixed} x
	 * @returns {boolean} x is an Array.
	 */
	isArray: function(v) {
		return Object.prototype.toString.apply(v) === '[object Array]';
	},

	/**
	 * Checks whether x is a native JavaScript Object or class instance.
	 * @static
	 * @param {Mixed} x
	 * @returns {boolean} x is an Object.
	 */
	isObject: function(v) {
		return Object.prototype.toString.apply(v) === '[object Object]';
	},

	/**
	 * Checks whether x is a regular expression.
	 * @static
	 * @param {Mixed} x
	 * @returns {boolean} x is a regular expression.
	 */
	isRegExp: function(v) {
		return Object.prototype.toString.apply(v) === '[object RegExp]';
	},

	/**
	 * Checks whether x is a date.
	 * @static
	 * @param {Mixed} x
	 * @returns {boolean} x is a date.
	 */
	isDate: function(v) {
		return Object.prototype.toString.apply(v) === '[object Date]';
	},

	/**
	 * Defines default value. Returns `value`, if it is not undefined, else returns `default`.
	 * @static
	 * @param {Mixed} value
	 * @param {Mixed} default
	 * @returns {Mixed}
	 */
	def: function(v, d) {
		return JW.isDefined(v) ? v : d;
	},

	/**
	 * Defines default value. Returns `value`, if it is not undefined and null, else returns `default`.
	 * @static
	 * @param {Mixed} value
	 * @param {Mixed} default
	 * @returns {Mixed}
	 */
	defn: function(v, d) {
		return JW.isSet(v) ? v : d;
	},

	/**
	 * The same as JW.apply, but ignores fields which are defined in `target`.
	 *
	 * **Example**
	 *
	 *     var x = {         var y = {         // Result = {
	 *         a: 10,                          //     a: 10,
	 *         b: 20,            b: 30,        //     b: 20,
	 *         c: null,          c: 40,        //     c: null,
	 *         d: undefined      d: 50,        //     d: 50,
	 *                           e: 60,        //     e: 60
	 *                           f: undefined  //
	 *     };                };                // };
	 *
	 *     JW.applyIf(x, y);
	 *
	 * @static
	 *
	 * @param {Object} target Target object.
	 * @param {Object} [sources] Source objects.
	 * @returns {Object} Returns target object.
	 */
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

	/**
	 * The same as JW.apply, but ignores fields which are not undefined and null in `target`.
	 *
	 * **Example**
	 *
	 *     var x = {         var y = {         // Result = {
	 *         a: 10,                          //     a: 10,
	 *         b: 20,            b: 30,        //     b: 20,
	 *         c: null,          c: 40,        //     c: 40,
	 *         d: undefined      d: 50,        //     d: 50,
	 *                           e: 60,        //     e: 60
	 *                           f: undefined  //
	 *     };                };                // };
	 *
	 *     JW.applyIf(x, y);
	 *
	 * @static
	 *
	 * @param {Object} target Target object.
	 * @param {Object} [sources] Source objects.
	 * @returns {Object} Returns target object.
	 */
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

	/**
	 * Clears object from `undefined` values. Returns new object, containing all `target` fields except `undefined`.
	 *
	 * Doesn't modify `target` object.
	 *
	 * If you want to remove `null` values as well, try JW.cleann function.
	 *
	 * Example:
	 *
	 *     var x = {          // Result: y = {
	 *         a : 10,        //     a: 10,
	 *         b : 20,        //     b: 20,
	 *         c : null,      //     c: null
	 *         d : undefined  //
	 *     };                 // };
	 *
	 *     var y = JW.clean(x);
	 *
	 * @static
	 *
	 * @param {Object} target Object.
	 * @returns {Object} Cleared object.
	 */
	clean: function(source) {
		var result = {};
		for (var i in source) {
			if (JW.isDefined(source[i])) {
				result[i] = source[i];
			}
		}
		return result;
	},

	/**
	 * Clears object from `null` and `undefined` values.
	 * Returns new object, containing all `target` fields except `null` and `undefined`.
	 *
	 * Doesn't modify `target` object.
	 *
	 * If you want to remove `undefined` values only, try JW.clean function.
	 *
	 * Example:
	 *
	 *     var x = {          // Result: y = {
	 *         a : 10,        //     a: 10,
	 *         b : 20,        //     b: 20
	 *         c : null,      //
	 *         d : undefined  //
	 *     };                 // };
	 *
	 *     var y = JW.clean(x);
	 *
	 * @static
	 *
	 * @param {Object} target Object.
	 * @returns {Object} Cleared object.
	 */
	cleann: function(source) {
		var result = {};
		for (var i in source) {
			if (JW.isSet(source[i])) {
				result[i] = source[i];
			}
		}
		return result;
	},

	/**
	 * @method toArray
	 *
	 * Converts object to array. Object must have `length` property and keys from 0 to (`length` - 1).
	 *
	 * Example of such object is function `arguments` list. You can use this method to apply arbitrary
	 * array methods to `arguments` list.
	 *
	 * Example:
	 *
	 *     function applyOperations(value) {
	 *         var operations = JW.toArray(arguments, 1);
	 *         JW.Array.{@link JW.Array#static-method-each each}(operations, function(operation) {
	 *             operation(value);
	 *         });
	 *     }
	 *
	 * @static
	 *
	 * @param {Mixed} a Source object.
	 * @param {number} [index] Index of first item to convert. Defaults to 0.
	 * @param {number} [count] Count of items to convert. Defaults to (`length` - `index`).
	 * @returns {Array} Array.
	 */
	/**
	 * JW.toArray shortcut.
	 * @static
	 * @param {Mixed} a Source object.
	 * @param {number} [index] Index of first item to convert. Defaults to 0.
	 * @param {number} [count] Count of items to convert. Defaults to (`length` - `index`).
	 * @returns {Array} Array.
	 */
	args: function(a, index, count) {
		index = index || 0;
		count = count || (a.length - index);
		var r = [];
		for (var i = 0; i < count; ++i) {
			r.push(a[index + i]);
		}
		return r;
	},

	/**
	 * Empty function.
	 * @static
	 * @returns {void}
	 */
	emptyFn: function() {},

	/**
	 * Universal native types comparer for array sorting.
	 *
	 * - Returns 1, if x > y
	 * - Returns -1, if x < y
	 * - Returns 0, if x == y
	 *
	 * You can compare next types: boolean, number, string, Array.
	 *
	 * @static
	 * @param {Mixed} x First value.
	 * @param {Mixed} y Second value.
	 * @param {boolean} caseInsensitive Compare strings ignoring letters case. Defaults to false.
	 * @returns {number} Comparing result.
	 */
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

	/**
	 * Equivalent for `JW.cmp(x, y, true)`. Compares two values ignoring letters case in strings.
	 * @static
	 * @param {Mixed} x First value.
	 * @param {Mixed} y Second value.
	 * @returns {number} Comparing result.
	 */
	cmpCaseInsensitive: function(x, y) {
		return JW.cmp(x, y, true);
	},

	/**
	 * Returns object item by expression. Expression is several words, passed in array of string joined by periods.
	 * If `field` is `null`, `undefined` or blank string, function will return `obj`.
	 *
	 * Example 1:
	 *
	 *     var obj = {
	 *         abc : [
	 *             {
	 *                 qwe : "xyz"
	 *             }
	 *         ]
	 *     };
	 *
	 *     return JW.get(obj, "abc.0.qwe"); // "xyz"
	 *
	 *     // Equivalent code
	 *     return JW.get(obj, [ "abc", 0, "qwe" ]); // "xyz"
	 *
	 * Function represents logic of JW.byField and JW.byValue callbacks.
	 *
	 * Example 2:
	 *
	 *     var arr = [
	 *         {
	 *             id   : 1,
	 *             name : "First item"
	 *         }, {
	 *             id   : 2,
	 *             name : "Second item"
	 *         }
	 *     ];
	 *
	 *     return JW.Array.{@link JW.Array#static-method-search search}(arr, JW.byValue("id", 2)).name; // "Second item"
	 *
	 * In this example, function JW.get is called inside JW.byValue function implicitly with argument `field` === "id".
	 *
	 * @static
	 * @param {Object} obj Object.
	 * @param {string/Array} expression Expression.
	 * @param {Mixed} def Value to return if item with such expression doesn't exist in object. Defaults to `undefined`.
	 * @returns {Mixed} Object item.
	 */
	get: function(obj, field, def) {
		if (!field) {
			return JW.def(obj, def);
		}
		if (typeof field === "string") {
			field = field.split(".");
		}
		field = JW.Array.filter(field, function(token) {
			return JW.isSet(token) && (token !== "");
		});
		for (var i = 0, l = field.length; i < l; ++i) {
			if (!obj) {
				return def;
			}
			obj = obj[field[i]];
		}
		return JW.def(obj, def);
	},

	/**
	 * Assigns object item by expression. Expression is several words, passed in array of string joined by periods.
	 *
	 * Example:
	 *
	 *     var obj = {
	 *         abc : [
	 *             {
	 *                 qwe : "xyz"
	 *             }
	 *         ]
	 *     };
	 *
	 *     JW.set(obj, "def", "abc.0.qwe"); // replace "xyz" with "def"
	 *
	 *     // equivalent code
	 *     JW.set(obj, "def", [ "abc", 0, "qwe" ]); // replace "xyz" with "def"
	 *
	 * @static
	 * @param {Object} obj Object.
	 * @param {Mixed} value Value.
	 * @param {string/Array} field Expression.
	 * @returns {void}
	 */
	set: function(obj, value, field) {
		if (!field) {
			return;
		}
		if (typeof field === "string") {
			field = field.split(".");
		}
		field = JW.Array.filter(field, function(token) {
			return JW.isSet(token) && (token !== "");
		});
		for (var i = 0, l = field.length - 1; i < l; ++i) {
			token = field[i];
			obj[token] = obj[token] || {};
			obj = obj[token];
		}
		obj[JW.Array.getLast(field)] = value;
	},

	/**
	 * Returns object unique ID. Returns {@link JW.Class#_iid iid} of object if it is instance of JW.Class,
	 * else returns the object itself.
	 *
	 * This function is used as default result for JW.AbstractArray#getKey and JW.AbstractMap#getKey, and also for
	 * getKey parameter of static methods JW.Array#static-method-detectSplice,
	 * JW.Array#static-method-performSplice, JW.Array#static-method-detectReorder,
	 * JW.Array#static-method-performReorder, JW.Map#static-method-detectReindex,
	 * JW.Map#static-method-performReindex.
	 *
	 * @static
	 * @param {Object} obj Object.
	 * @returns {Mixed} Unique object ID.
	 */
	iid: function(obj) {
		return (obj && typeof obj === "object") ? obj._iid : obj;
	},

	/**
	 * Calls object method {@link JW.Class#destroy destroy} if available. Can be used in mappers configuration:
	 *
	 *     var mapper = collection.{@link JW.AbstractCollection#createMapper createMapper}({
	 *         {@link JW.AbstractCollection.Mapper#createItem createItem}  : function(data) { return new View(data); },
	 *         {@link JW.AbstractCollection.Mapper#destroyItem destroyItem} : JW.destroy,
	 *         {@link JW.AbstractCollection.Mapper#scope scope}       : this
	 *     });
	 *
	 * @static
	 * @param {Object} obj Object.
	 * @returns {void}
	 */
	destroy: function(obj) {
		if (obj && typeof obj.destroy === "function") {
			obj.destroy();
		}
	},

	/**
	 * Returns the remainder of `value` / `mod`. Unlike % operation, work correctly even for decimal `value` and `mod`.
	 * Returns result in semi-interval [0, `mod`).
	 * @static
	 * @param {number} value Value.
	 * @param {number} mod Divider.
	 * @returns {number} Remainder.
	 */
	mod: function(value, mod) {
		return value - mod * Math.floor(value / mod);
	},

	/**
	 * Returns the remainder of `value` / `mod`. Unlike % operation, work correctly even for decimal `value` and `mod`.
	 * Returns result in semi-interval [-`mod` / 2, `mod` / 2).
	 * @static
	 * @param {number} value Value.
	 * @param {number} mod Divider.
	 * @returns {number} Remainder.
	 */
	smod: function(value, mod) {
		return value - mod * Math.round(value / mod);
	},

	/**
	 * Returns `value` number sign: 0, 1 or -1.
	 * @static
	 * @param {number} value Value.
	 * @returns {number} Sign.
	 */
	sgn: function(value) {
		return !value ? 0 : value > 0 ? 1 : -1;
	},

	/**
	 * Returns non-zero `value` number sign: 1 or -1. Returns 1 for 0.
	 * @static
	 * @param {number} value Value.
	 * @returns {number} Sign.
	 */
	sgnnz: function(value) {
		return value >= 0 ? 1 : -1;
	},

	/**
	 * Specifies function call scope.
	 *
	 * **Example**
	 *
	 *     setTimeout(JW.inScope(this.onTimeout, this), 1000);
	 *
	 * is the same as
	 *
	 *     var self = this;
	 *     setTimeout(function() { self.onTimeout(); }, 1000);
	 *
	 * It is convenient to specify class methods' call scope in constructor before superclass constructor call:
	 *
	 *     var MyClass = function(el, message) {
	 *         this._onClick = JW.inScope(this._onClick, this);
	 *         MyClass.{@link JW.Class#_super _super}.call(this);
	 *         this.el = el;
	 *         this.message = message;
	 *         this.el.bind("click", this._onClick);
	 *     };
	 *
	 *     JW.extend(MyClass, JW.Class, {
	 *         // Element el;
	 *         // String message;
	 *
	 *         // override
	 *         {@link JW.Class#destroyObject destroyObject}: function() {
	 *             this.el.unbind("click", this._onClick);
	 *             this._super();
	 *         },
	 *
	 *         _onClick: function() {
	 *             alert(this.message);
	 *         }
	 *     });
	 *
	 * @static
	 * @param {Function} fn Function.
	 * @param {Object} scope Call scope.
	 * @returns {Function} Function with specified call scope.
	 */
	inScope: function(func, scope) {
		return function() {
			return func.apply(scope, arguments);
		};
	},

	/**
	 * Returns callback function for collection algorithms. Function returns value of specified field
	 * of collection item. Item field is retrieved using JW.get function.
	 *
	 * **Example (get titles of all collection items):**
	 *
	 *     var titles = collection.{@link JW.AbstractCollection#map map}(JW.byField("title"));
	 *
	 * @static
	 * @param {string} field Expression for JW.get function that specifies item field.
	 * @returns {Function} Callback function.
	 */
	byField: function(field) {
		return function(item) {
			return JW.get(item, field);
		};
	},

	/**
	 * Returns callback function for collection algorithms. Function checks whether specified field of collection item
	 * is equal (===) to specified value. Item field is retrieved using JW.get function.
	 *
	 * **Example (find item by ID):**
	 *
	 *     var item = collection.{@link JW.AbstractCollection#search search}(JW.byValue("id", id));
	 *
	 * @static
	 * @param {string} field Expression for JW.get function that specifies item field.
	 * @param {Mixed} value Value.
	 * @returns {Function} Callback function.
	 */
	byValue: function(field, value) {
		return function(item) {
			return JW.get(item, field) === value;
		};
	},

	/**
	 * Returns callback function for collection algorithms. Function calls specified method of collection item
	 * with specified arguments and returns the result of this call.
	 *
	 * **Example (filter tasks that relate to specified on):**
	 *
	 *     var tasks = collection.{@link JW.AbstractCollection#filter filter}(JW.byMethod("relatesTo", [task]));
	 *
	 * @static
	 * @param {string} method Collection item method name.
	 * @param {Array} [args] Method arguments.
	 * @returns {Function} Callback function.
	 */
	byMethod: function(method, args) {
		args = args || [];
		return function(item) {
			return item[method].apply(item, args);
		};
	},

	makeArray: function(v) {
		return JW.isArray(v) ? v : JW.isSet(v) ? [v] : [];
	},

	/**
	 * @property {JW.Binding} UPDATE
	 * Shorthand for JW.Binding.UPDATE.
	 */
	UPDATE: 1,

	/**
	 * @property {JW.Binding} WATCH
	 * Shorthand for JW.Binding.WATCH.
	 */
	WATCH: 2,

	/**
	 * @property {JW.Binding} TWOWAY
	 * Shorthand for JW.Binding.TWOWAY.
	 */
	TWOWAY: 3
});

JW.toArray = JW.args;

/**
 * @enum {number}
 * jWidget binding mode. All properties have shorthands in {@link JW JW} namespace.
 */
JW.Binding = {
	/**
	 * Bind invoker to argument.
	 *
	 *     // Bind element value to property
	 *     this.{@link JW.Class#own own}(el.{@link jQuery#jwval jwval}(property, JW.UPDATE));
	 *
	 * Always used as default binding. Hence, the next code is equivalent:
	 *
	 *     this.{@link JW.Class#own own}(el.{@link jQuery#jwval jwval}(property));
	 *
	 * Shorthand: JW.UPDATE.
	 */
	UPDATE: 1,

	/**
	 * Bind argument to invoker.
	 *
	 *     // Bind property to element value
	 *     this.{@link JW.Class#own own}(el.{@link jQuery#jwval jwval}(property, JW.WATCH));
	 *
	 * Always supplied with a no-argument method, which creates the property automatically.
	 *
	 *     // Watch element value
	 *     var property = this.{@link JW.Class#own own}(el.{@link jQuery#jwval jwval}());
	 *
	 * Shorthand: JW.WATCH.
	 */
	WATCH: 2,

	/**
	 * Bind invoker and argument to each other.
	 * UPDATE-binding is applied first.
	 *
	 *     // Assign element value to property and setup two-way binding
	 *     this.{@link JW.Class#own own}(el.{@link jQuery#jwval jwval}(property, JW.TWOWAY));
	 *
	 * Shorthand: JW.TWOWAY.
	 */
	TWOWAY: 3
};
