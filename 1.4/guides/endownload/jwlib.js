/*!
	jWidget Lib 1.4.6

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
;
/*
	jWidget Lib source file.
	
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
 *         {@link JW.Class#method-destroyObject destroyObject}: function() {
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
 *                 this.el = jQuery('<div></div>');
 *                 this.el.width(this.width);
 *                 this.el.height(this.height);
 *             }
 *             return this.el;
 *         }
 *     });
 *
 * jWidget classes support object aggregation feature. If you register object A
 * as aggregated by object B using method {@link #own own}, it means that
 * object A will be destroyed automatically on object B destruction.
 *
 *     var Door = function() {
 *         Door.{@link JW.Class#static-property-_super _super}.call(this);
 *         this.knockEvent = this.{@link #own own}(new JW.Event());
 *     };
 *
 *     JW.extend(Door, JW.Class);
 *
 * Aggregated objects are destroyed in reversive order.
 */
JW.Class = function() {
	this._iid = ++JW.ClassUtil._iid;
	this._ownagePool = [];
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
 * Class destructor invocation method. Destroys all aggregated objects and calls #destroyObject method.
 * You must call this method explicitly from outside, because JavaScript doesn't support automatic class destructor
 * calling. Alternatively (and optimally), you should use method #own to aggregate this object inside some another.
 *
 *     var object = new MyClass();
 *
 *     // ...
 *
 *     // Once object is not needed anymore, destroy it
 *     object.{@link #method-destroy destroy}();
 *
 * You can override this method in a subclass to do some preliminary work before aggregated objects destruction.
 * For example, JW.UI.Component overrides this method to remove child components before their destruction,
 * before child components are usually aggregated inside the component.
 *
 * @returns {void}
 */
/**
 * @method destroyObject
 *
 * Class destructor implementation. Called inside #destroy method after aggregated objects destruction.
 * The logic of class instance destruction should be implemented here. If you override this method,
 * don't forget to call superclass destructor at the end of the method:
 *
 *     destroyObject: function() {
 *         // Release resources
 *         ...
 *         // Call superclass destructor
 *         this.{@link #method-_super _super}();
 *     }
 *
 * @returns {void}
 */
/**
 * @method own
 *
 * Aggregate a specified object in a current one. It means that the specified object will be destroyed automatically
 * on this object destruction. The aggregated objects are destroyed in a reversive order.
 *
 * @param {JW.Class} obj An aggregated object.
 * @returns {JW.Class} An aggregated object (obj).
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
	own: function(obj) {
		this._ownagePool.push(obj);
		return obj;
	},
	
	destroy: function() {
		var pool = this._ownagePool;
		this._ownagePool = [];
		for (var i = pool.length - 1; i >= 0; --i) {
			pool[i].destroy();
		}
		this.destroyObject();
	},

	destroyObject: function() {}
});
;
/*
	jWidget Lib source file.

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

/**
 * @class
 *
 * `<P>`
 *
 * Used to notify some objects (clients) about some events (for example, about some field value change).
 *
 * **Notice:** Remember to destroy the events and event listeners.
 *
 * Full example of class that triggers the events:
 *
 *     var Dispatcher = function() {
 *         Dispatcher.{@link JW.Class#static-property-_super _super}.call(this);
 *         this.items = [];
 *         this.addEvent = this.{@link JW.Class#own own}(new JW.Event()); // <Dispatcher.EventParams>
 *         this.removeEvent = this.{@link JW.Class#own own}(new JW.Event()); // <Dispatcher.EventParams>
 *     };
 *
 *     JW.extend(Dispatcher, JW.Class, {
 *         addItem: function(item, index) {
 *             this.items.splice(index, 0, item);
 *             this.addEvent.{@link JW.Event#trigger trigger}({sender: this, item: item, index: index});
 *         },
 *
 *         removeItem: function(index) {
 *             var item = this.items.splice(index, 1)[0];
 *             this.removeEvent.{@link JW.Event#trigger trigger}({sender: this, item: item, index: index});
 *         }
 *     });
 *
 *     // interface Dispatcher.EventParams {
 *     //     Dispatcher sender;
 *     //     Object item;
 *     //     number index;
 *     // }
 *
 * Full example of these events listening:
 *
 *     var Client = function(dispatcher) {
 *         Client.{@link JW.Class#static-property-_super _super}.call(this);
 *         this.{@link JW.Class#own own}(dispatcher.addEvent.{@link JW.Event#bind bind}(this._onAdd, this));
 *         this.{@link JW.Class#own own}(dispatcher.removeEvent.{@link JW.Event#bind bind}(this._onRemove, this));
 *     };
 *
 *     JW.extend(Client, JW.Class, {
 *         _onAdd: function(params) {
 *             console.log(params.item, " item is added at ", params.index);
 *         },
 *
 *         _onRemove: function(params) {
 *             console.log(params.item, " item is removed at ", params.index);
 *         }
 *     });
 *
 * @extends JW.Class
 * @constructor
 */
JW.Event = function() {
	JW.Event._super.call(this);
	this.attachments = {};
};

JW.extend(JW.Event, JW.Class, {
	/*
	Map<JW.EventAttachment> attachments;
	*/

	destroyObject: function() {
		this.purge();
		this._super();
	},

	/**
	 * Starts listening the event.
	 *
	 * Whenever the event will be triggered with #trigger method, specified handler function
	 * will be called in specified scope.
	 *
	 * You can stop listening the event by destroying the returned JW.EventAttachment instance.
	 *
	 * @param {Function} callback
	 *
	 * `callback(params: P): void`
	 *
	 * Event handler function.
	 *
	 * @param {Object} scope `callback` call scope.
	 *
	 * @returns {JW.EventAttachment} `<P>` Event attachment object.
	 */
	bind: function(callback, scope) {
		var attachment = new JW.EventAttachment(this, callback, scope);
		this.attachments[attachment._iid] = attachment;
		return attachment;
	},

	/**
	 * Stops listening the event with specific handler.
	 *
	 * Equivalent to `attachment.destroy()`.
	 *
	 * @param {JW.EventAttachment} attachment `<P>` Event attachment.
	 * @returns {void}
	 */
	unbind: function(attachment) {
		delete this.attachments[attachment._iid];
	},

	/**
	 * Unbinds all event handlers. Called automatically in event destructor.
	 * @returns {void}
	 */
	purge: function() {
		this.attachments = {};
	},

	/**
	 * Triggers event, i.e. calls all bound handlers.
	 *
	 *     this.myEvent.{@link JW.Event#trigger trigger}({sender: this});
	 *
	 * This way, we've called all handlers of `myEvent` with argument `{sender: this}`.
	 *
	 * @param {P} params Event params.
	 * @returns {void}
	 */
	trigger: function(params) {
		// haven't splitted to simpler methods for debugging purposes
		for (var iid in this.attachments) {
			var attachment = this.attachments[iid];
			attachment.callback.call(attachment.scope || attachment, params);
		}
	}
});
;
/*
	jWidget Lib source file.
	
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

/**
 * @class
 * When client binds a handler to some event, it should store the attachment object to be able to
 * unbind from this event by attachment destruction.
 * @extends JW.Class
 * @constructor
 */
JW.EventAttachment = function(event, callback, scope) {
	JW.EventAttachment._super.call(this);
	this.event = event;
	this.callback = callback;
	this.scope = scope;
};

JW.extend(JW.EventAttachment, JW.Class, {
	/*
	JW.Event event;
	Function callback;
	Object scope;
	*/
	
	destroyObject: function() {
		this.event.unbind(this);
		this._super();
	}
});
;
/*
	jWidget Lib source file.
	
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

/**
 * @class
 * Typical interface for event params. You don't have to use it in your custom events, but jWidget
 * uses it to expose some events.
 * @extends JW.Class
 *
 * @constructor
 * @param {Object} sender Event sender.
 */
JW.EventParams = function(sender) {
	JW.EventParams._super.call(this);
	this.sender = sender;
};

JW.extend(JW.EventParams, JW.Class, {
	/**
	 * @property {Object} sender Event sender.
	 */
});
;
/*
	jWidget Lib source file.
	
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

/**
 * @class
 * `<T>` Event params with item. Usually used in event of some collection item change.
 * @extends JW.EventParams
 *
 * @constructor
 * @param {Object} sender Event sender.
 * @param {T} item Item.
 */
JW.ItemEventParams = function(sender, item) {
	JW.ItemEventParams._super.call(this, sender);
	this.item = item;
};

JW.extend(JW.ItemEventParams, JW.EventParams, {
	/**
	 * @property {T} item Item.
	 */
});
;
/*
	jWidget Lib source file.
	
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

/**
 * @class
 * `<V>` Event params with value. Usually used in some variable or field change event.
 * @extends JW.EventParams
 *
 * @constructor
 * @param {Object} sender Event sender.
 * @param {V} value Value.
 */
JW.ValueEventParams = function(sender, value) {
	JW.ValueEventParams._super.call(this, sender);
	this.value = value;
};

JW.extend(JW.ValueEventParams, JW.EventParams, {
	/**
	 * @property {V} value Value.
	 */
});
;
/*
	jWidget Lib source file.
	
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

/**
 * @class
 * `<V> extends JW.ValueEventParams<V>` Value change event params. Provides
 * old value along with new value.
 * @extends JW.ValueEventParams
 *
 * @constructor
 * @param {Object} sender Event sender.
 * @param {V} value New value.
 * @param {V} oldValue Old value.
 */
JW.ValueChangeEventParams = function(sender, value, oldValue) {
	JW.ValueChangeEventParams._super.call(this, sender, value);
	this.oldValue = oldValue;
};

JW.extend(JW.ValueChangeEventParams, JW.ValueEventParams, {
	/**
	 * @property {V} oldValue Old value.
	 */
});
;
/*
	jWidget Lib source file.
	
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

/**
 * @class
 * `<T, V> extends JW.ValueEventParams<V>` Event params with item and value. Usually used in
 * some item's field change event.
 * @extends JW.ValueEventParams
 *
 * @constructor
 * @param {Object} sender Event sender.
 * @param {T} item Item.
 * @param {V} value Value.
 */
JW.ItemValueEventParams = function(sender, item, value) {
	JW.ItemValueEventParams._super.call(this, sender, value);
	this.item = item;
};

JW.extend(JW.ItemValueEventParams, JW.ValueEventParams, {
	/**
	 * @property {T} item Item.
	 */
});
;
/*
	jWidget Lib source file.

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

/**
 * @class
 *
 * `<T>` Abstract collection of items of type T.
 *
 * There are 3 collection types:
 *
 * - JW.AbstractArray, extends JW.IndexedCollection
 * - JW.AbstractMap, extends JW.IndexedCollection
 * - JW.AbstractSet
 *
 * You can convert collections to each other using algorithms.
 *
 * Each collection has 2 implementations:
 *
 * - Simple collections: JW.Array, JW.Map, JW.Set
 * - Observable collection: JW.ObservableArray, JW.ObservableMap, JW.ObservableSet
 *
 * The difference is that observable collection triggers the events about its modifications.
 * It lets you to synchronize view with data on fly in accordance to Model-View architecture.
 * The next synchronizers exist to connect observable collections to each other:
 *
 * <table>
 *   <tbody>
 *     <tr><td>Synchronizer</td><td>Class</td><td>Creation methods</td></tr>
 *     <tr><td>Item mapper</td><td>JW.AbstractCollection.Mapper</td><td>#$$mapValues, #$$mapObjects, #createMapper</td></tr>
 *     <tr><td>Filterer</td><td>JW.AbstractCollection.Filterer</td><td>#$$filter, #createFilterer</td></tr>
 *     <tr><td>Matching item counter</td><td>JW.AbstractCollection.Counter</td><td>#$$count, #createCounter</td></tr>
 *     <tr><td>Converter to set</td><td>JW.AbstractCollection.Lister</td><td>#$$toSet, #createLister</td></tr>
 *     <tr><td>Converter to map (indexer)</td><td>JW.AbstractCollection.Indexer</td><td>#$$index, #createIndexer</td></tr>
 *     <tr><td>Converter to array (orderer)</td><td>JW.AbstractCollection.Orderer</td><td>#$$toArray, #createOrderer</td></tr>
 *     <tr><td>Converter to array (sorter by comparer)</td><td>JW.AbstractCollection.SorterComparing</td><td>#$$toSortedComparing, #createSorterComparing</td></tr>
 *     <tr><td>Observer</td><td>JW.AbstractCollection.Observer</td><td>#createObserver</td></tr>
 *     <tr><td>View synchronizers</td><td>JW.AbstractArray.Inserter, JW.AbstractMap.Inserter, JW.UI.Inserter</td><td>createInserter</td></tr>
 *     <tr><td>Arrays merger</td><td>JW.AbstractArray.Merger</td><td>{@link JW.AbstractArray#$$merge $$merge}, {@link JW.AbstractArray#createMerger createMerger}</td></tr>
 *     <tr><td>Array reverser</td><td>JW.AbstractArray.Reverser</td><td>{@link JW.AbstractArray#$$toReversed $$toReversed}, {@link JW.AbstractArray#createReverser createReverser}</td></tr>
 *   </tbody>
 * </table>
 *
 * Internally, simple collections are very similar to native JavaScript collections.
 * But their API is identical to observable collections' (excepting lack of events).
 * So you can use simple collections as a bridge between native JavaScript collections and
 * jWidget observable collections.
 *
 * Please keep the next rules in mind whenever you work with jWidget collections.
 *
 * 1) null and undefined items are prohibited in jWidget collections.
 * Use "Null Object" pattern if it is neccessary.
 *
 * 2) The majority of collection modification methods have 2 implementations: **tryMethod** and **method**.
 * These methods perform the same collection modification but return different result.
 * tryMethod is introduced for internal use mainly,
 * and *it always returns undefined if collection has not been modified*.
 * For example, <a href="#tryclear">tryClear</a> returns undefined if collection is empty,
 * else it returns old collection contents.
 * **method** returns result in more friendly format.
 * For example, <a href="#clear">clear</a> always returns old collection contents.
 * So, if you want to clear collection and destroy all items, <a href="#clear">clear</a> method fits better:
 *
 *     JW.Array.each(array.clear(), JW.destroy); // correct
 *     JW.Array.each(array.tryClear(), JW.destroy); // incorrect: 'undefined' exception if array is empty
 *
 * 3) Majority of collection returning methods have 3 implementations: **method**, **$method** and **$$method**.
 * These methods perform the same modification but return the result in different format.
 *
 * * **method** returns native JavaScript collection: Array or Object.
 * * **$method** returns jWidget collection: JW.Array, JW.Map or JW.Set.
 * * **$$method** returns jWidget collection and starts continuous synchronization with original
 * collection if one is observable. To stop synchronization, #destroy the target collection.
 *
 * Use one method that's more convenient in your specific situation.
 * For example, `$method` is convenient for chaining algorithm method calls.
 * So, previous example can be changed next way:
 *
 *     array.{@link JW.AbstractArray#$clear $clear}().{@link JW.AbstractArray#each each}(JW.destroy);
 *
 * But in the next example `method` is more appropriate:
 *
 *     set.{@link JW.AbstractArray#addAll addAll}(array.{@link JW.AbstractArray#clear clear}());
 *
 * Whereas `$$method` is just a shorthand for synchronizer creation:
 *
 *     this.set = this.own(array.{@link JW.AbstractArray#$$toSet $$toSet}());
 *     // pretty much the same as
 *     this.set = this.own(array.{@link JW.AbstractArray#createLister createLister}()).target;
 *
 * 4) It is better if all items in collection are unique. Some methods like
 * JW.AbstractArray#performReorder require each item to have an unique key.
 * If 2 items of collection are equal, then their keys are equal as well, so this method won't work correctly.
 *
 * # Collection methods
 *
 * Content retrieving:
 *
 * - {@link #getLength} - Returns count of items in collection. For observable collections, `length` property may come
 * in handy if you want to track collection length dynamically.
 * - {@link #isEmpty} - Checks collection for emptiness.
 * - {@link #getFirst} - Returns first item in collection.
 * - {@link #containsItem} - Does collection contain the item?
 *
 * Iteration algorhitms:
 *
 * - {@link #every} - Checks all items by criteria.
 * Returns `true` if all items match the criteria.
 * - {@link #some} - Checks each item by criteria.
 * Returns `true` if some items matches the criteria.
 * - {@link #each} - Iterates items.
 * - {@link #search} - Finds item by criteria.
 * Returns first item matching the criteria.
 * - {@link #filter}, #$filter, #$$filter - Filters collection by criteria.
 * Builds new collection of the same type, consisting of items matching the criteria.
 * - {@link #count}, #$count, #$$count - Counts the items matching criteria.
 * - {@link #map}, #$map, #$$mapValues, #$$mapObjects - Maps collection items.
 * Builds new collection of the same type, consisting of results of mapping function call for each collection item.
 * - {@link #toSorted}, #$toSorted, #toSortedComparing, #$toSortedComparing, #$$toSortedComparing -
 * Builds array consisting of collection items sorted by indexer or comparer.
 * - {@link #index}, #$index, #$$index - Indexes collection.
 * Builds new map by rule: key is the result of indexer function call, value is the corresponding item.
 * - {@link #toArray}, #$toArray, #$$toArray - Builds new array consisting of collection items.
 * - {@link #toSet}, #$toSet, #$$toSet - Builds new set consisting of collection items.
 * - {@link #asArray}, #$asArray - Represents collection as array.
 * - {@link #asSet}, #$asSet - Represents collection as set.
 *
 * Collection modification:
 *
 * - {@link #removeItem} - Removes first occurency of an item in collection.
 * - {@link #removeItems} - Removes all occurencies of items in collection.
 * - {@link #clear}, #$clear, #tryClear - Clears collection.
 *
 * Synchronizers creation:
 *
 * - {@link #createMapper} - Creates item mapper. Extended version of #$$mapValues and #$$mapObjects methods.
 * - {@link #createFilterer} - Creates filterer. Extended version of #$$filter method.
 * - {@link #createCounter} - Creates matching item counter. Extended version of #$$count method.
 * - {@link #createLister} - Creates converter to set. Extended version of #$$toSet method.
 * - {@link #createIndexer} - Creates converter to map (indexer). Extended version of #$$index method.
 * - {@link #createOrderer} - Creates converter to array (orderer). Extended version of #$$toArray method.
 * - {@link #createSorterComparing} - Creates converter to array (sorter by comparer). Extended version of #$$toSortedComparing method.
 * - {@link #createObserver} - Creates observer.
 *
 * Similar collection creation (for algorithms and synchronizers implementation):
 *
 * - {@link #createEmpty} - Creates empty collection of the same type.
 * - {@link #createEmptyArray} - Creates empty array of the same observability type.
 * - {@link #createEmptyMap} - Creates empty map of the same observability type.
 * - {@link #createEmptySet} - Creates empty set of the same observability type.
 *
 * All the same algorithms are also available for native JavaScript collections:
 *
 * - Array, see JW.Array static methods.
 * - Object as map, see JW.Map static methods.
 * - Object as set, see JW.Set static methods.
 *
 * @extends JW.Class
 * @abstract
 */
JW.AbstractCollection = function() {
	JW.AbstractCollection._super.call(this);
	this._ownsItems = false;
};

JW.AbstractCollection._create$Array = function(algorithm) {
	return function() {
		return new JW.Array(this[algorithm].apply(this, arguments), true);
	};
};

JW.AbstractCollection._create$Map = function(algorithm) {
	return function() {
		return new JW.Map(this[algorithm].apply(this, arguments), true);
	};
};

JW.AbstractCollection._create$Set = function(algorithm) {
	return function() {
		return new JW.Set(this[algorithm].apply(this, arguments), true);
	};
};

JW.extend(JW.AbstractCollection, JW.Class, {
	/**
	 * Makes this collection an owner of its items, which means that its items are alive while they are present in
	 * this collection. The item is destroyed when it leaves the
	 * collection, and all items are destroyed on the collection destruction.
	 * @returns {JW.AbstractCollection} this
	 */
	ownItems: function() {
		this._ownsItems = true;
		return this;
	},

	destroyObject: function() {
		this.tryClear();
		this._super();
	},

	/**
	 * @method getLength
	 * Returns count of items in collection.
	 * @returns {number} Count of items in collection.
	 */
	/**
	 * @method isEmpty
	 * Checks collection for emptiness.
	 * @returns {boolean} Collection doesn't contain any items.
	 */
	/**
	 * Returns first item in collection. If collection is empty, returns `undefined`.
	 * @returns {T} Item.
	 */
	getFirst: function() {
		return this._callStatic("getFirst");
	},

	/**
	 * @method containsItem
	 * Checks item existance in collection.
	 * @param {T} item Item.
	 * @returns {boolean} Collection contains specified item.
	 */
	/**
	 * @method removeItem
	 * Removes first occurency of an item in collection.
	 * @param {T} item Item.
	 * @returns {void}
	 */
	/**
	 * @method removeItems
	 * Removes all occurencies of items in collection.
	 * Works for `<T extends JW.Class>` only.
	 * @param {Array} items `<T>` Item.
	 * @returns {void}
	 */
	/**
	 * @method tryClear
	 * Clears collection.
	 * @returns {Array/Object} `<T>` Old collection contents. If not modified - `undefined`.
	 */
	/**
	 * @method clear
	 * Clears collection.
	 * @returns {Array/Object} `<T>` Old collection contents.
	 */
	/**
	 * @method $clear
	 * Clears collection.
	 * @returns {JW.AbstractCollection} `<T>` Old collection contents.
	 */
	/**
	 * @method every
	 *
	 * Checks all items by criteria.
	 *
	 * Returns true if function `f` returns !== `false` for all collection items.
	 *
	 * Algorithms iterates items sequentially, and stops after first item not matching the criteria.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T): boolean`
	 *
	 * Criteria.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {boolean} Result.
	 */

	/**
	 * Checks each item by criteria.
	 *
	 * Returns true if function `f` returns !== `false` for some collection item.
	 *
	 * Algorithms iterates items sequentially, and stops after first item matching the criteria.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T): boolean`
	 *
	 * Criteria.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {boolean} Result.
	 */
	some: function(callback, scope) {
		return !this.every(function(item) {
			return callback.call(this, item) === false;
		}, scope);
	},

	/**
	 * Iterates collection items. Calls specified function for all items.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T): void`
	 *
	 * Function.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {void}
	 */
	each: function(callback, scope) {
		this.every(function(item) {
			callback.call(this, item);
			return true;
		}, scope);
	},

	/**
	 * Finds item by criteria.
	 *
	 * Returns first item for which `f` returns !== `false`.
	 *
	 * Algorithms iterates items sequentially, and stops after first item matching the criteria.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T): boolean`
	 *
	 * Criteria.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {T} Found item or `undefined`.
	 */
	search: function(callback, scope) {
		var result;
		this.every(function(item) {
			if (callback.call(this, item) !== false) {
				result = item;
				return false;
			}
			return true;
		}, scope);
		return result;
	},

	/**
	 * Converts collection to sorted array.
	 *
	 * Builds array consisting of collection items sorted by result of `f` call for each item.
	 *
	 * @param {Function} [f]
	 *
	 * `f(item: T): number/string`
	 *
	 * Indexer function. Returns `item` by default.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @param {1/-1} [order] Sorting order.
	 * @returns {Array} `<T>` Sorted array.
	 */
	toSorted: function(callback, scope, order) {
		return this._callStatic("toSorted", [callback, scope || this, order]);
	},

	/**
	 * Converts collection to sorted array.
	 *
	 * Builds array consisting of collection items sorted by result of `f` call for each item.
	 *
	 * @param {Function} [f]
	 *
	 * `f(item: T): number/string`
	 *
	 * Indexer function. Returns `item` by default.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @param {1/-1} [order] Sorting order.
	 * @returns {JW.Array} `<T>` Sorted array.
	 */
	$toSorted: JW.AbstractCollection._create$Array("toSorted"),

	/**
	 * Converts collection to sorted array.
	 *
	 * Builds array consisting of collection items sorted by comparer.
	 *
	 * @param {Function} [compare]
	 *
	 * `f(t1: T, t2: T): number`
	 *
	 * Comparer function. Returns positive value if t1 > t2; nagative value if t1 < t2; 0 if t1 == t2.
	 * Defaults to `JW.cmp(t1, t2)`.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @param {1/-1} [order] Sorting order.
	 * @returns {Array} `<T>` Sorted array.
	 */
	toSortedComparing: function(compare, scope, order) {
		return this._callStatic("toSortedComparing", [compare, scope || this, order]);
	},

	/**
	 * Converts collection to sorted array.
	 *
	 * Builds array consisting of collection items sorted by comparer.
	 *
	 * @param {Function} [compare]
	 *
	 * `f(t1: T, t2: T): number`
	 *
	 * Comparer function. Returns positive value if t1 > t2; nagative value if t1 < t2; 0 if t1 == t2.
	 * Defaults to `JW.cmp(t1, t2)`.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @param {1/-1} [order] Sorting order.
	 * @returns {JW.Array} `<T>` Sorted array.
	 */
	$toSortedComparing: JW.AbstractCollection._create$Array("toSortedComparing"),

	/**
	 * Converts collection to sorted array.
	 *
	 * Builds array consisting of collection items sorted by comparer.
	 * If this collection is observable, starts continuous synchronization,
	 * i.e. creates JW.AbstractCollection.SorterComparing implicitly.
	 *
	 * @param {Function} [compare]
	 *
	 * `f(t1: T, t2: T): number`
	 *
	 * Comparer function. Returns positive value if t1 > t2; nagative value if t1 < t2; 0 if t1 == t2.
	 * Defaults to `JW.cmp(t1, t2)`.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @param {1/-1} [order] Sorting order.
	 * @returns {JW.AbstractArray} `<T>` Sorted array.
	 */
	$$toSortedComparing: function(compare, scope, order) {
		return this.$toSortedComparing(compare, scope, order);
	},

	/**
	 * Indexes collection.
	 *
	 * Builds new map by rule: key is the result of indexer function call, value is the corresponding item.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T): string`
	 *
	 * Indexer function.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {Object} `<T>` Collection index.
	 */
	index: function(callback, scope) {
		var result = {};
		this.every(function(item) {
			var key = callback.call(this, item);
			if (JW.isSet(key)) {
				result[key] = item;
			}
			return true;
		}, scope);
		return result;
	},

	/**
	 * Indexes collection.
	 *
	 * Builds new map by rule: key is the result of indexer function call, value is the corresponding item.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T): string`
	 *
	 * Indexer function.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {JW.Map} `<T>` Collection index.
	 */
	$index: JW.AbstractCollection._create$Map("index"),

	/**
	 * Indexes collection.
	 *
	 * Builds new map by rule: key is the result of indexer function call, value is the corresponding item.
	 * If this collection is observable, starts continuous synchronization,
	 * i.e. creates JW.AbstractCollection.Indexer implicitly.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T): string`
	 *
	 * Indexer function.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {JW.AbstractMap} `<T>` Collection index.
	 */
	$$index: function(callback, scope) {
		return this.$index(callback, scope);
	},

	/**
	 * Converts collection to array.
	 *
	 * Builds new array consisting of collection items.
	 *
	 * @returns {Array} `<T>` Items array.
	 */
	toArray: function() {
		var result = new Array(this.getLength());
		var index = 0;
		this.every(function(item) {
			result[index++] = item;
		});
		return result;
	},

	/**
	 * Converts collection to array.
	 *
	 * Builds new array consisting of collection items.
	 *
	 * @returns {JW.Array} `<T>` Items array.
	 */
	$toArray: JW.AbstractCollection._create$Array("toArray"),

	/**
	 * Converts collection to array.
	 *
	 * Builds new array consisting of collection items.
	 * If this collection is observable, starts continuous synchronization,
	 * i.e. creates JW.AbstractCollection.Orderer implicitly.
	 *
	 * @returns {JW.AbstractArray} `<T>` Items array.
	 */
	$$toArray: function() {
		return this.$toArray();
	},

	/**
	 * Converts collection to set.
	 *
	 * Builds new set consisting of collection items.
	 *
	 * @returns {Object} `<T>` Items set.
	 */
	toSet: function() {
		var result = {};
		this.every(function(item) {
			JW.Set.add(result, item);
		});
		return result;
	},

	/**
	 * Converts collection to set.
	 *
	 * Builds new set consisting of collection items.
	 *
	 * @returns {JW.Set} `<T>` Items set.
	 */
	$toSet: JW.AbstractCollection._create$Set("toSet"),

	/**
	 * Converts collection to set.
	 *
	 * Builds new set consisting of collection items.
	 * If this collection is observable, starts continuous synchronization,
	 * i.e. creates JW.AbstractCollection.Lister implicitly.
	 *
	 * @returns {JW.AbstractSet} `<T>` Items set.
	 */
	$$toSet: function() {
		return this.$toSet();
	},

	/**
	 * Represents collection as array.
	 *
	 * If this collection is array, returns it immediately. Else, executes #toArray method.
	 * This method works probably faster than #toArray, but please make sure that the returned array
	 * won't be modified externally, because it can cause strange unexpected bugs.
	 *
	 * @returns {Array} `<T>` Items array.
	 */
	asArray: function() {
		return this.toArray();
	},

	/**
	 * Represents collection as array.
	 *
	 * If this collection is array, returns it immediately. Else, executes #toArray method.
	 * This method works probably faster than #toArray, but please make sure that the returned array
	 * won't be modified externally, because it can cause strange unexpected bugs.
	 *
	 * @returns {JW.Array} `<T>` Items array
	 */
	$asArray: JW.AbstractCollection._create$Array("asArray"),

	/**
	 * Represents collection as set.
	 *
	 * If this collection is set, returns it immediately. Else, executes #toSet method.
	 * This method works probably faster than #toSet, but please make sure that the returned set
	 * won't be modified externally, because it can cause strange unexpected bugs.
	 *
	 * @returns {Object} `<T>` Items set.
	 */
	asSet: function() {
		return this.toSet();
	},

	/**
	 * Represents collection as set.
	 *
	 * If this collection is set, returns it immediately. Else, executes #toSet method.
	 * This method works probably faster than #toSet, but please make sure that the returned set
	 * won't be modified externally, because it can cause strange unexpected bugs.
	 *
	 * @returns {JW.Set} `<T>` Items set.
	 */
	$asSet: JW.AbstractCollection._create$Set("asSet"),

	/**
	 * @method filter
	 *
	 * Filters collection by criteria.
	 *
	 * Builds new collection of the same type, consisting of items for which `f` returns !== `false`.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T): boolean`
	 *
	 * Criteria.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {Array/Object} `<T>` Filtered collection.
	 */
	/**
	 * @method $filter
	 *
	 * Filters collection by criteria.
	 *
	 * Builds new collection of the same type, consisting of items for which `f` returns !== `false`.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T): boolean`
	 *
	 * Criteria.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {JW.AbstractCollection} `<T>` Filtered collection.
	 */
	/**
	 * Filters collection by criteria.
	 *
	 * Builds new collection of the same type, consisting of items for which `f` returns !== `false`.
	 * If this collection is observable, starts continuous synchronization,
	 * i.e. creates JW.AbstractCollection.Filterer implicitly.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T, index: number): boolean`
	 *
	 * Criteria.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {JW.AbstractCollection} `<T>` Filtered collection.
	 */
	$$filter: function(callback, scope) {
		return this.$filter(callback, scope);
	},

	/**
	 * @method count
	 *
	 * Counts the items matching criteria.
	 *
	 * Returns the number of items for which `f` returns !== `false`.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T): boolean`
	 *
	 * Criteria.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {number} Number of items.
	 */
	/**
	 * Counts the items matching criteria.
	 *
	 * Returns the number of items for which `f` returns !== `false`.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T): boolean`
	 *
	 * Criteria.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {JW.Property} `<number>` Number of items.
	 */
	$count: function(callback, scope) {
		return new JW.Property(this.count(callback, scope));
	},

	/**
	 * Counts the items matching criteria.
	 *
	 * Returns the number of items for which `f` returns !== `false`.
	 * If this collection is observable, starts continuous synchronization,
	 * i.e. creates JW.AbstractCollection.Counter implicitly.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T): boolean`
	 *
	 * Criteria.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {JW.Property} `<number>` Number of items.
	 */
	$$count: function(callback, scope) {
		return this.$count(callback, scope);
	},

	/**
	 * @method map
	 *
	 * `<U>` Maps collection items.
	 *
	 * Builds new collection of the same type, consisting of results of `f` call for each collection item.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T): U`
	 *
	 * Mapping function.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {Array/Object} `<U>` Mapped collection.
	 */
	/**
	 * @method $map
	 *
	 * `<U>` Maps collection items.
	 *
	 * Builds new collection of the same type, consisting of results of `f` call for each collection item.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T): U`
	 *
	 * Mapping function.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {JW.AbstractCollection} `<U>` Mapped collection.
	 */
	/**
	 * `<U>` Maps collection items.
	 *
	 * Builds new collection of the same type, consisting of results of `f` call for each collection item.
	 * If this collection is observable, starts continuous synchronization,
	 * i.e. creates JW.AbstractCollection.Mapper implicitly.
	 * In comparison to #$$mapObjects method, doesn't destroy the resulting items after their removal.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T): U`
	 *
	 * Mapping function.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {JW.AbstractCollection} `<U>` Mapped collection.
	 */
	$$mapValues: function(callback, scope) {
		return this.$map(callback, scope);
	},
	/**
	 * `<U>` Maps collection items.
	 *
	 * Builds new collection of the same type, consisting of results of `f` call for each collection item.
	 * If this collection is observable, starts continuous synchronization,
	 * i.e. creates JW.AbstractCollection.Mapper implicitly.
	 * In comparison to #$$mapValues method, destroys the resulting items after their removal.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T): U`
	 *
	 * Mapping function.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {JW.AbstractCollection} `<U>` Mapped collection.
	 */
	$$mapObjects: function(callback, scope) {
		return this.$map(callback, scope).ownItems();
	}

	/**
	 * @method createEmpty
	 * `<U>` Creates empty collection of the same type.
	 * @returns {JW.AbstractCollection} `<U>` Collection.
	 */
	/**
	 * @method createEmptyArray
	 * `<U>` Creates empty array of the same observability level.
	 * @returns {JW.AbstractArray} `<U>` Array.
	 */
	/**
	 * @method createEmptyMap
	 * `<U>` Creates empty map of the same observability level.
	 * @returns {JW.AbstractMap} `<U>` Map.
	 */
	/**
	 * @method createEmptySet
	 * `<U>` Creates empty set of the same observability level.
	 * @returns {JW.AbstractSet} `<U>` Set.
	 */
	/**
	 * @method createMapper
	 * `<U>` Creates collection item mapper.
	 * Selects appropriate synchronizer implementation automatically.
	 * Extended version of #$$mapValues and #$$mapObjects methods.
	 * @param {Object} config Configuration (see synchronizer's Config options).
	 * @returns {JW.AbstractCollection.Mapper}
	 * `<T, U, JW.AbstractCollection<T>, JW.AbstractCollection<U>>` Synchronizer.
	 */
	/**
	 * @method createFilterer
	 * Creates collection filterer.
	 * Selects appropriate synchronizer implementation automatically.
	 * Extended version of #$$filter method.
	 * @param {Object} config Configuration (see synchronizer's Config options).
	 * @returns {JW.AbstractCollection.Filterer}
	 * `<T, JW.AbstractCollection<T>>` Synchronizer.
	 */
	/**
	 * @method createCounter
	 * Creates matching item counter.
	 * Selects appropriate synchronizer implementation automatically.
	 * Extended version of #$$count method.
	 * @param {Object} config Configuration (see synchronizer's Config options).
	 * @returns {JW.AbstractCollection.Counter}
	 * `<T>` Synchronizer.
	 */
	/**
	 * @method createObserver
	 * Creates collection observer.
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} config Configuration (see synchronizer's Config options).
	 * @returns {JW.AbstractCollection.Observer}
	 * `<T, JW.AbstractCollection<T>>` Synchronizer.
	 */
	/**
	 * @method createOrderer
	 * Creates collection converter to array (orderer).
	 * Selects appropriate synchronizer implementation automatically.
	 * Extended version of #$$toArray method.
	 * @param {Object} [config] Configuration (see synchronizer's Config options).
	 * @returns {JW.AbstractCollection.Orderer}
	 * `<T, JW.AbstractCollection<T>>` Synchronizer.
	 */
	/**
	 * @method createSorterComparing
	 * Creates collection converter to array (sorter by comparer).
	 * Selects appropriate synchronizer implementation automatically.
	 * Extended version of #$$toSortedComparing method.
	 * @param {Object} config Configuration (see synchronizer's Config options).
	 * @returns {JW.AbstractCollection.SorterComparing}
	 * `<T, JW.AbstractCollection<T>>` Synchronizer.
	 */
	/**
	 * @method createIndexer
	 * Creates collection converter to map (indexer).
	 * Selects appropriate synchronizer implementation automatically.
	 * Extended version of #$$index method.
	 * @param {Object} config Configuration (see synchronizer's Config options).
	 * @returns {JW.AbstractCollection.Indexer}
	 * `<T, JW.AbstractCollection<T>>` Synchronizer.
	 */
	/**
	 * @method createLister
	 * Creates collection converter to set.
	 * Selects appropriate synchronizer implementation automatically.
	 * Extended version of #$$toSet method.
	 * @param {Object} [config] Configuration (see synchronizer's Config options).
	 * @returns {JW.AbstractCollection.Lister}
	 * `<T, JW.AbstractCollection<T>>` Synchronizer.
	 */
});
;
/*
	jWidget Lib source file.

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

/**
 * @class
 *
 * `<T>`
 *
 * Counter for collection items which match the specified filter.
 * Builds new JW.Property&lt;number&gt;, containing the number of items for which callback
 * function returns !== `false`.
 * If original collection is observable, starts continuous synchronization.
 *
 *     var source = new JW.ObservableArray([1, 2, 3]);
 *     var counter = source.{@link JW.AbstractCollection#createCounter createCounter}({
 *         {@link JW.AbstractCollection.Counter#cfg-filterItem filterItem}: function(x) { return x % 2 === 1; }
 *     });
 *     var target = counter.{@link JW.AbstractCollection.Counter#property-target target};
 *     assert(target.{@link JW.Property#get get}() === 2); // 1, 3
 *
 *     source.{@link JW.AbstractArray#addAll addAll}([4, 7, 1, 6]);
 *     assert(target.{@link JW.Property#get get}() === 4); // 1, 3, 7, 1
 *
 *     counter.{@link JW.AbstractCollection.Counter#destroy destroy}();
 *
 * Use JW.AbstractCollection#createCounter method to create the synchronizer.
 * The method will select which synchronizer implementation fits better (simple or observable).
 *
 * You can pass target property in config option:
 *
 *     var source = new JW.ObservableSet();
 *     var target = new JW.Property(0);
 *     var counter = source.{@link JW.AbstractCollection#createCounter createCounter}({
 *         {@link JW.AbstractCollection.Counter#cfg-target target}: target,
 *         {@link JW.AbstractCollection.Counter#cfg-filterItem filterItem}: this._filterItem,
 *         {@link JW.AbstractCollection.Counter#cfg-scope scope}: this
 *     });
 *
 * In simple cases, JW.AbstractCollection#$$count shorthand can be used instead. It returns the target property right away:
 *
 *     var source = new JW.ObservableArray([1, 2, 3]);
 *     var target = source.{@link JW.AbstractCollection#$$count $$count}(function(x) { return x % 2 === 1; });
 *     assert(target.{@link JW.Property#get get}() === 2); // 1, 3
 *
 *     source.{@link JW.AbstractArray#addAll addAll}([4, 7, 1, 6]);
 *     assert(target.{@link JW.Property#get get}() === 4); // 1, 3, 7, 1
 *
 *     target.{@link JW.Property#destroy destroy}();
 *
 * You may use JW.AbstractCollection.Filterer instead of counter, but counter works much
 * faster because it doesn't create a filtered collection.
 *
 *     var source = new JW.ObservableArray();
 *
 *     // via filterer
 *     var filterer = source.{@link JW.AbstractCollection#createFilterer createFilterer}({
 *         {@link JW.AbstractCollection.Filterer#cfg-filterItem filterItem}: this._filterItem,
 *         {@link JW.AbstractCollection.Filterer#cfg-scope scope}: this
 *     });
 *     var count = filterer.{@link JW.AbstractCollection.Filterer#property-target target}.{@link JW.ObservableArray#length length}; // JW.Property<number>
 *
 *     // via counter, works faster
 *     var counter = source.{@link JW.AbstractCollection#createCounter createCounter}({
 *         {@link JW.AbstractCollection.Counter#cfg-filterItem filterItem}: this._filterItem,
 *         {@link JW.AbstractCollection.Counter#cfg-scope scope}: this
 *     });
 *     var count = counter.{@link JW.AbstractCollection.Counter#property-target target}; // JW.Property<number>
 *
 * Counter works correctly for observable collections only.
 *
 * @extends JW.Class
 *
 * @constructor
 * Creates synchronizer. JW.AbstractCollection#createCounter method is preferrable instead.
 * @param {JW.AbstractCollection} source `<T>` Source collection.
 * @param {Object} config Configuration (see Config options).
 */
JW.AbstractCollection.Counter = function(source, config) {
	JW.AbstractCollection.Counter._super.call(this);
	config = config || {};
	this.source = source;
	this.filterItem = config.filterItem;
	this._targetCreated = config.target == null;
	this.target = this._targetCreated ? new JW.Property(0) : config.target;
	this.scope = config.scope || this;
	this.target.set(source.count(this.filterItem, this.scope));
};

JW.extend(JW.AbstractCollection.Counter, JW.Class, {
	/**
	 * @cfg {JW.Property} target `<number>` Target property.
	 */
	/**
	 * @cfg {Function} filterItem (required)
	 *
	 * `filterItem(item: T): boolean`
	 *
	 * Filtering function. Target property will count an item if filtering function
	 * returns !== `false` for this item.
	 */
	/**
	 * @cfg {Object} scope {@link #cfg-filterItem} call scope.
	 */
	/**
	 * @property {JW.AbstractCollection} source `<T>` Source collection.
	 */
	/**
	 * @property {JW.Property} target `<number>` Target property.
	 */

	// override
	destroyObject: function() {
		this.target.set(0);
		if (this._targetCreated) {
			this.target.destroy();
		}
		this.source = null;
		this.filterItem = null;
		this.target = null;
		this.scope = null;
		this._super();
	},

	/**
	 * Changes counter configuration and recounts matching items. Accepts next
	 * options: #filterItem, #scope.
	 * @param {Object} config Configuration.
	 */
	reconfigure: function(config) {
		this.filterItem = JW.def(config.filterItem, this.filterItem);
		this.scope = JW.def(config.scope, this.scope);
		this.recount();
	},

	/**
	 * Recounts matching items. Call this method when collection items properties change the way that
	 * they must be refiltered.
	 */
	recount: function() {
		this.target.set(this.source.count(this.filterItem, this.scope));
	}
});
;
/*
	jWidget Lib source file.

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

/**
 * @class
 *
 * `<T, C extends JW.AbstractCollection<T>>`
 *
 * Collection filterer.
 * Builds new collection of the same type, consisting of items for which callback
 * function returns !== `false`.
 * If original collection is observable, starts continuous synchronization.
 * Keeps item order in array.
 *
 *     var source = new JW.ObservableArray([1, 2, 3]);
 *     var filterer = source.{@link JW.AbstractCollection#createFilterer createFilterer}({
 *         {@link #cfg-filterItem filterItem}: function(x) { return x % 2 === 1; }
 *     });
 *     var target = filterer.{@link JW.AbstractCollection.Filterer#property-target target};
 *     assert(target.{@link JW.AbstractArray#equal equal}([1, 3]));
 *
 *     source.{@link JW.AbstractArray#addAll addAll}([4, 7, 1, 6]);
 *     assert(target.{@link JW.AbstractArray#equal equal}([1, 3, 7, 1]));
 *
 *     source.{@link JW.AbstractArray#move move}(2, 6); // move "3" item to the end
 *     assert(target.{@link JW.AbstractArray#equal equal}([1, 7, 1, 3]));
 *
 *     filterer.{@link JW.AbstractCollection.Filterer#destroy destroy}();
 *
 * Use JW.AbstractCollection#createFilterer method to create the synchronizer.
 * The method will select which synchronizer implementation fits better (simple or observable).
 *
 * You can pass target collection in config option:
 *
 *     var source = new JW.ObservableSet();
 *     var target = new JW.Set();
 *     var filterer = source.{@link JW.AbstractCollection#createFilterer createFilterer}({
 *         {@link #cfg-target target}: target,
 *         {@link #cfg-filterItem filterItem}: this._filterItem,
 *         {@link #cfg-scope scope}: this
 *     });
 *
 * In simple cases, JW.AbstractCollection#$$filter shorthand can be used instead. It returns the target collection right away:
 *
 *     var source = new JW.ObservableArray([1, 2, 3]);
 *     var target = source.{@link JW.AbstractCollection#$$filter $$filter}(function(x) { return x % 2 === 1; });
 *     assert(target.{@link JW.AbstractArray#equal equal}([1, 3]));
 *
 *     source.{@link JW.AbstractArray#addAll addAll}([4, 7, 1, 6]);
 *     assert(target.{@link JW.AbstractArray#equal equal}([1, 3, 7, 1]));
 *
 *     source.{@link JW.AbstractArray#move move}(2, 6); // move "3" item to the end
 *     assert(target.{@link JW.AbstractArray#equal equal}([1, 7, 1, 3]));
 *
 *     target.{@link JW.AbstractArray#destroy destroy}();
 *
 * Synchronizer rules:
 *
 * - Target collection is stored in {@link #property-target} property.
 * - Filtered items are added to {@link #property-target} immediately on synchronizer initialization.
 * - All items are removed from {@link #property-target} on synchronizer destruction.
 * - You can pass target collection in {@link #cfg-target} config option.
 * In this case, you are responsible for its destruction (though items will be removed
 * automatically on synchronizer destruction anyway).
 * - If {@link #cfg-target} is not passed, it will be created automatically. Synchronizer will select
 * appropriate {@link #property-target} implementation (simple or observable). In this
 * case, {@link #property-target} will be destroyed automatically on synchronizer destruction.
 *
 * **Additional rules for different collection types**
 *
 * JW.AbstractArray:
 *
 * - Target collection must be empty before initialization.
 * - A target collection can be synchronized with one source collection only.
 *
 * JW.AbstractMap:
 *
 * - A target collection can be synchronized with multiple source collections, if keys of all items are different.
 * - You can add items to target collection manually, if their keys differ from source collection keys.
 *
 * JW.AbstractSet:
 *
 * - A target collection can be synchronized with multiple source collections, if all items are different.
 * - You can add items to target collection manually, if they differ from source collection items.
 *
 * @extends JW.Class
 *
 * @constructor
 * Creates synchronizer. JW.AbstractCollection#createFilterer method is preferrable instead.
 * @param {JW.AbstractCollection} source `<T>` Source collection.
 * @param {Object} config Configuration (see Config options).
 */
JW.AbstractCollection.Filterer = function(source, config) {
	JW.AbstractCollection.Filterer._super.call(this);
	config = config || {};
	this.source = source;
	this.filterItem = config.filterItem;
	this._targetCreated = config.target == null;
	this.target = this._targetCreated ? this.source.createEmpty() : config.target;
	this.scope = config.scope || this;
};

JW.extend(JW.AbstractCollection.Filterer, JW.Class, {
	/**
	 * @cfg {C} target Target collection.
	 */
	/**
	 * @cfg {Function} filterItem (required)
	 *
	 * `filterItem(item: T): boolean`
	 *
	 * Filtering function. Target collection will contain an item if filtering function
	 * returns !== `false` for this item.
	 */
	/**
	 * @cfg {Object} scope {@link #cfg-filterItem} call scope.
	 */
	/**
	 * @property {C} source Source collection.
	 */
	/**
	 * @property {C} target Target collection.
	 */

	destroyObject: function() {
		if (this._targetCreated) {
			this.target.destroy();
		}
		this.source = null;
		this.filterItem = null;
		this.target = null;
		this.scope = null;
		this._super();
	}
});
;
/*
	jWidget Lib source file.
	
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

/**
 * @class
 *
 * `<T extends JW.Class, C extends JW.AbstractCollection<T>>`
 *
 * Converter to set.
 * If original collection is observable, starts continuous synchronization.
 * Can be used for fast item existance detection.
 *
 *     // Create two dummy collection items
 *     var x = new JW.Class();
 *     var y = new JW.Class();
 *
 *     // Initialize collection and synchronizer
 *     var array = new JW.ObservableArray([x]);
 *     var lister = array.{@link JW.AbstractCollection#createLister createLister}();
 *     var set = lister.{@link #property-target target};
 *
 *     assert(set.{@link JW.AbstractSet#contains contains}(x));
 *     assert(!set.{@link JW.AbstractSet#contains contains}(y));
 *
 *     // Target set is automatically synchronized with original observable array
 *     array.add(y);
 *     assert(set.{@link JW.AbstractSet#contains contains}(y));
 *
 *     lister.{@link JW.AbstractCollection.Lister#destroy destroy}();
 *
 * **Notice:** All items of source collection must be different (i.e. have unique _iid).
 *
 * Use JW.AbstractCollection#createLister method to create the synchronizer.
 * The method will select which synchronizer implementation fits better (simple or observable).
 *
 * You can pass target collection in config option:
 *
 *     var set = new JW.Set();
 *     var lister = collection.{@link JW.AbstractCollection#createLister createLister}({
 *         {@link #cfg-target target}: set
 *     });
 *
 * In simple cases, JW.AbstractCollection#$$toSet shorthand can be used instead. It returns the target set right away:
 *
 *     // Create two dummy collection items
 *     var x = new JW.Class();
 *     var y = new JW.Class();
 *
 *     // Initialize collections
 *     var array = new JW.ObservableArray([x]);
 *     var set = array.{@link JW.AbstractCollection#$$toSet $$toSet}();
 *
 *     assert(set.{@link JW.AbstractSet#contains contains}(x));
 *     assert(!set.{@link JW.AbstractSet#contains contains}(y));
 *
 *     // Target set is automatically synchronized with original observable array
 *     array.add(y);
 *     assert(set.{@link JW.AbstractSet#contains contains}(y));
 *
 *     set.{@link JW.AbstractSet#destroy destroy}();
 *
 * Synchronizer rules:
 *
 * - Target set is stored in {@link #property-target} property.
 * - All items of source collection are added to {@link #property-target} immediately on synchronizer initialization.
 * - All items are removed from {@link #property-target} on synchronizer destruction.
 * - You can pass target set in {@link #cfg-target} config option.
 * In this case, you are responsible for its destruction (though items will be removed
 * automatically on synchronizer destruction anyway).
 * - If {@link #cfg-target} is not passed, it will be created automatically. Synchronizer will select
 * appropriate {@link #property-target} implementation (simple or observable). In this
 * case, {@link #property-target} will be destroyed automatically on synchronizer destruction.
 * - You can convert multiple collections into one set, if all items are different.
 *
 * @extends JW.Class
 *
 * @constructor
 * Creates synchronizer. JW.AbstractCollection#createLister method is preferrable instead.
 * @param {JW.AbstractCollection} source `<T>` Source collection.
 * @param {Object} [config] Configuration (see Config options).
 */
JW.AbstractCollection.Lister = function(source, config) {
	JW.AbstractCollection.Lister._super.call(this);
	config = config || {};
	this.source = source;
	this._targetCreated = config.target == null;
	this.target = this._targetCreated ? source.createEmptySet() : config.target;
	this.target.tryAddAll(source.asArray());
};

JW.extend(JW.AbstractCollection.Lister, JW.Class, {
	/**
	 * @cfg {JW.AbstractSet} target `<T>` Target set.
	 */
	/**
	 * @property {C} source Source collection.
	 */
	/**
	 * @property {JW.AbstractSet} target `<T>` Target set.
	 */
	
	// override
	destroyObject: function() {
		this.target.tryRemoveAll(this.source.asArray());
		if (this._targetCreated) {
			this.target.destroy();
		}
		this.source = null;
		this.target = null;
		this._super();
	}
});
;
/*
	jWidget Lib source file.
	
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

/**
 * @class
 *
 * `<T, C extends JW.AbstractCollection<T>>`
 *
 * Collection indexer.
 * Builds new map by rule: key is the result of indexer function call, value is the corresponding item.
 * If original collection is observable, starts continuous synchronization.
 * Can be used for fast item search by key (for example, by ID).
 *
 *     var array = new JW.ObservableArray([{id: 9, label: "The item"}]);
 *     var indexer = array.{@link JW.ObservableArray#createIndexer createIndexer}({
 *         {@link #cfg-getKey getKey}: function(item) { return item.id; },
 *         {@link #cfg-scope scope}: this
 *     });
 *     var map = indexer.{@link #property-target target};
 *
 *     // Get an item with ID = 9
 *     assert(map.{@link JW.AbstractMap#get get}(9).label === "The item");
 *     assert(map.{@link JW.AbstractMap#get get}(5) == null);
 *
 *     // Target map is automatically synchronized with original observable array
 *     array.add({id: 5, label: "New item"});
 *     assert(map.{@link JW.AbstractMap#get get}(5).label === "New item");
 *
 *     indexer.{@link JW.AbstractCollection.Indexer#destroy destroy}();
 *
 * **Notice:** All items of source collection must have different (unique) string keys.
 *
 * Use JW.AbstractCollection#createIndexer method to create the synchronizer.
 * The method will select which synchronizer implementation fits better (simple or observable).
 *
 * You can pass target collection in config option:
 *
 *     var map = new JW.Map();
 *     var indexer = collection.{@link JW.AbstractCollection#createIndexer createIndexer}({
 *         {@link #cfg-target target}: map,
 *         {@link #cfg-getKey getKey}: function(item) { return item.id; },
 *         {@link #cfg-scope scope}: this
 *     });
 *
 * In simple cases, JW.AbstractCollection#$$index shorthand can be used instead. It returns the target map right away:
 *
 *     var array = new JW.ObservableArray([{id: 9, label: "The item"}]);
 *     var map = array.{@link JW.AbstractCollection#$$index $$index}(function(item) { return item.id; });
 *
 *     // Get an item with ID = 9
 *     assert(map.{@link JW.AbstractMap#get get}(9).label === "The item");
 *     assert(map.{@link JW.AbstractMap#get get}(5) == null);
 *
 *     // Target map is automatically synchronized with original observable array
 *     array.add({id: 5, label: "New item"});
 *     assert(map.{@link JW.AbstractMap#get get}(5).label === "New item");
 *
 *     map.{@link JW.AbstractMap#destroy destroy}();
 *
 * Synchronizer rules:
 *
 * - Target map is stored in {@link #property-target} property.
 * - All items of source collection are added to {@link #property-target} immediately on synchronizer initialization.
 * - All items are removed from {@link #property-target} on synchronizer destruction.
 * - You can pass target map in {@link #cfg-target} config option.
 * In this case, you are responsible for its destruction (though items will be removed
 * automatically on synchronizer destruction anyway).
 * - If {@link #cfg-target} is not passed, it will be created automatically. Synchronizer will select
 * appropriate {@link #property-target} implementation (simple or observable). In this
 * case, {@link #property-target} will be destroyed automatically on synchronizer destruction.
 * - You can index multiple collections into one map, if keys of all items are different.
 *
 * @extends JW.Class
 *
 * @constructor
 * Creates synchronizer. JW.AbstractCollection#createIndexer method is preferrable instead.
 * @param {JW.AbstractCollection} source `<T>` Source collection.
 * @param {Object} config Configuration (see Config options).
 */
JW.AbstractCollection.Indexer = function(source, config) {
	JW.AbstractCollection.Indexer._super.call(this);
	config = config || {};
	this.source = source;
	this.getKey = config.getKey;
	this._targetCreated = config.target == null;
	this.target = this._targetCreated ? source.createEmptyMap() : config.target;
	this.scope = config.scope || this;
	this.target.trySetAll(this._index(source.asArray()));
};

JW.extend(JW.AbstractCollection.Indexer, JW.Class, {
	/**
	 * @cfg {JW.AbstractMap} target `<T>` Target map.
	 */
	/**
	 * @cfg {Function} getKey (required)
	 *
	 * `getKey(item: T): string`
	 *
	 * Indexing function. Determines item key in map.
	 */
	/**
	 * @cfg {Object} scope {@link #cfg-getKey} call scope.
	 */
	/**
	 * @property {C} source Source collection.
	 */
	/**
	 * @property {JW.AbstractMap} target `<T>` Target map.
	 */
	
	// override
	destroyObject: function() {
		this.target.tryRemoveAll(this._keys(this.source.asArray()));
		if (this._targetCreated) {
			this.target.destroy();
		}
		this.source = null;
		this.getKey = null;
		this.target = null;
		this.scope = null;
		this._super();
	},
	
	_index: function(items) {
		var index = {};
		for (var i = 0, l = items.length; i < l; ++i) {
			var item = items[i];
			index[this.getKey.call(this.scope, item)] = item;
		}
		return index;
	},
	
	_keys: function(items) {
		var keys = [];
		for (var i = 0, l = items.length; i < l; ++i) {
			keys.push(this.getKey.call(this.scope, items[i]));
		}
		return keys;
	}
});
;
/*
	jWidget Lib source file.
	
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

/**
 * @class
 *
 * `<T, U, TC extends JW.AbstractCollection<T>, UC extends JW.AbstractCollection<U>>`
 *
 * Collection item converter.
 * Builds new collection of the same type, consisting of results of callback function
 * call for each collection item.
 * If original collection is observable, starts continuous synchronization.
 *
 *     var source = new JW.ObservableArray([1, 2]);
 *     var mapper = source.{@link JW.ObservableArray#createMapper createMapper}({
 *         {@link #cfg-createItem createItem}: function(x) { return 2 * x }
 *     });
 *     var target = source.{@link #property-target target};
 *
 *     assert(target.{@link JW.ObservableArray#get get}(0) === 2);
 *     assert(target.{@link JW.ObservableArray#get get}(1) === 4);
 *
 *     // Target collection is automatically synchronized with original observable collection
 *     source.add(3);
 *     assert(target.{@link JW.ObservableArray#get get}(2) === 6);
 *
 *     mapper.{@link JW.AbstractCollection.Mapper#destroy destroy}();
 *
 * Can be used for data convertion into view.
 *
 *     var mapper = dataCollection.{@link JW.AbstractCollection#createMapper createMapper}({
 *         {@link #cfg-createItem createItem}: function(data) { return new View(this, data); },
 *         {@link #cfg-destroyItem destroyItem}: JW.destroy,
 *         {@link #cfg-scope scope}: this
 *     });
 *     var viewCollection = mapper.{@link #property-target target};
 *
 * Use JW.AbstractCollection#createMapper method to create the synchronizer.
 * The method will select which synchronizer implementation fits better (simple or observable).
 *
 * You can pass target collection in config option:
 *
 *     var viewCollection = new JW.Array();
 *     var mapper = dataCollection.{@link JW.AbstractCollection#createMapper createMapper}({
 *         {@link #cfg-target target}: viewCollection,
 *         {@link #cfg-createItem createItem}: function(data) { return new View(this, data); },
 *         {@link #cfg-destroyItem destroyItem}: JW.destroy,
 *         {@link #cfg-scope scope}: this
 *     });
 *
 * In simple cases, JW.AbstractCollection#$$mapValues and JW.AbstractCollection#$$mapObjects shorthand methods
 * can be used instead. They return the target collection right away:
 *
 *     var viewCollection = dataCollection.{@link JW.AbstractCollection#$$mapObjects $$mapObjects}(function(data) {
 *         return new View(this, data);
 *     }, this);
 *
 *     // Once not needed anymore, destroy
 *     viewCollection.{@link JW.AbstractCollection#destroy destroy}();
 *
 * Synchronizer rules:
 *
 * - Target collection is stored in {@link #property-target} property.
 * - All items of source collection are converted and added to {@link #property-target}
 * immediately on synchronizer initialization.
 * - All items are removed from {@link #property-target} and destroyed on synchronizer destruction.
 * - You can pass target map in {@link #cfg-target} config option.
 * In this case, you are responsible for its destruction (though items will be removed and destroyed
 * automatically on synchronizer destruction anyway).
 * - If {@link #cfg-target} is not passed, it will be created automatically. Synchronizer will select
 * appropriate {@link #property-target} implementation (simple or observable). In this
 * case, {@link #property-target} will be destroyed automatically on synchronizer destruction.
 * - The items are not recreated in target collection on source items reordering/reindexing,
 * but they are reordered/reindexed according to source collection modification.
 *
 * **Additional rules for different collection types**
 *
 * JW.AbstractArray:
 *
 * - Target collection must be empty before initialization.
 * - You can't modify target collection manually and/or create other synchronizers with the same target collection.
 *
 * JW.AbstractMap:
 *
 * - A target collection can be synchronized with multiple source collections, if keys of all items are different.
 * - You can add items to target collection manually, if their keys differ from other collection keys.
 *
 * JW.AbstractSet:
 *
 * - A target collection can be synchronized with multiple source collections, if all items are different.
 * - You can add items to target collection manually, if they differ from other collection items.
 *
 * @extends JW.Class
 *
 * @constructor
 * Creates synchronizer. JW.AbstractCollection#createMapper method is preferrable instead.
 * @param {JW.AbstractCollection} source `<T>` Source collection.
 * @param {Object} config Configuration (see Config options).
 */
JW.AbstractCollection.Mapper = function(source, config) {
	JW.AbstractCollection.Mapper._super.call(this);
	config = config || {};
	this.source = source;
	this.createItem = config.createItem;
	this.destroyItem = config.destroyItem;
	this._targetCreated = config.target == null;
	this.target = this._targetCreated ? this.source.createEmpty() : config.target;
	this.scope = config.scope || this;
};

JW.extend(JW.AbstractCollection.Mapper, JW.Class, {
	/**
	 * @cfg {UC} target Target collection.
	 */
	/**
	 * @cfg {Function} createItem (required)
	 *
	 * `createItem(data: T): U`
	 *
	 * Mapping function. Creates an item of target collection by item of source collection.
	 */
	/**
	 * @cfg {Function} destroyItem
	 *
	 * `destroyItem(item: U, data: T): void`
	 *
	 * Item destructor. Destroys an item of target collection.
	 */
	/**
	 * @cfg {Object} scope {@link #cfg-createItem} and {@link #cfg-destroyItem} call scope.
	 */
	/**
	 * @property {TC} source Source collection.
	 */
	/**
	 * @property {UC} target Target collection.
	 */

	destroyObject: function() {
		if (this._targetCreated) {
			this.target.destroy();
		}
		this.source = null;
		this.createItem = null;
		this.destroyItem = null;
		this.target = null;
		this.scope = null;
		this._super();
	}
});
;
/*
	jWidget Lib source file.
	
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

/**
 * @class
 *
 * `<T, C extends JW.AbstractCollection<T>>`
 *
 * Collection observer. Listens all collection events and reduces them to 2 granular functions:
 * item is added and item is removed. In optimization purposes, you can define a third function: collection is cleared
 * (in case if there is more effective clearing algorithm than iterative items deletion).
 * Also, you can define a function which is called on each collection modification.
 * As example, this synchronizer can be used to notify the items that they are added into collection.
 *
 *     var observer = collection.{@link JW.AbstractCollection#createObserver createObserver}({
 *         {@link #cfg-addItem addItem}: function(item) { item.setInCollection(true); },
 *         {@link #cfg-removeItem removeItem}: function(item) { item.setInCollection(false); },
 *         {@link #cfg-scope scope}: this
 *     });
 *
 * Use JW.AbstractCollection#createObserver method to create the synchronizer.
 * The method will select which synchronizer implementation fits better (simple or observable).
 *
 * Just another synchronizer use case: if you have an abstract collection on input (and you don't know whether it is
 * simple or observable), but you want to listen collection change event in case, only if it is observable,
 * then you can do it meeting OOD principles:
 *
 *     var observer = collection.{@link JW.AbstractCollection#createObserver createObserver}({
 *         {@link #cfg-change change}: function() { console.log("Collection is changed"); }
 *     });
 *
 * Synchronizer rules:
 *
 * - Function {@link #cfg-addItem} is called for all items of source collection on synchronizer initialization.
 * - Function {@link #cfg-clearItems} is called for collection, or function {@link #cfg-removeItem} is called for
 * all items of source collection on synchronizer destruction.
 * - Functions {@link #cfg-addItem}, {@link #cfg-removeItem} and {@link #cfg-clearItems} are not called on
 * source collection reordering/reindexing.
 *
 * @extends JW.Class
 *
 * @constructor
 * Creates synchronizer. JW.AbstractCollection#createObserver method is preferrable instead.
 * @param {JW.AbstractCollection} source `<T>` Source collection.
 * @param {Object} config Configuration (see Config options).
 */
JW.AbstractCollection.Observer = function(source, config) {
	JW.AbstractCollection.Observer._super.call(this);
	config = config || {};
	this.source = source;
	this.addItem = config.addItem;
	this.removeItem = config.removeItem;
	this.clearItems = config.clearItems;
	this.change = config.change;
	this.scope = config.scope || this;
	this._addItems(source.asArray());
};

JW.extend(JW.AbstractCollection.Observer, JW.Class, {
	/**
	 * @cfg {Function} addItem
	 *
	 * `addItem(item: T): void`
	 *
	 * Item is added to collection.
	 */
	/**
	 * @cfg {Function} removeItem
	 *
	 * `removeItem(item: T): void`
	 *
	 * Item is removed from collection.
	 */
	/**
	 * @cfg {Function} clearItems
	 *
	 * `clearItems(items: Array<T>): void`
	 *
	 * Collection is cleared. By default, calls {@link #removeItem} for all collection items.
	 */
	/**
	 * @cfg {Function} change
	 *
	 * `change(): void`
	 *
	 * Collection is changed arbitrarily.
	 */
	/**
	 * @cfg {Object} scope {@link #addItem}, {@link #removeItem}, {@link #clearItems}, {@link #change} call scope.
	 */
	/**
	 * @property {C} source Source collection.
	 */
	
	// override
	destroyObject: function() {
		this._clearItems(this.source.asArray());
		this.source = null;
		this.addItem = null;
		this.removeItem = null;
		this.clearItems = null;
		this.change = null;
		this.scope = null;
		this._super();
	},
	
	_addItems: function(items) {
		if (!this.addItem) {
			return;
		}
		for (var i = 0, l = items.length; i < l; ++i) {
			this.addItem.call(this.scope, items[i]);
		}
	},
	
	_removeItems: function(items) {
		if (!this.removeItem) {
			return;
		}
		for (var i = items.length - 1; i >= 0; --i) {
			this.removeItem.call(this.scope, items[i]);
		}
	},
	
	_clearItems: function(items) {
		if (items.length === 0) {
			return;
		}
		if (this.clearItems) {
			this.clearItems.call(this.scope, items);
		} else {
			this._removeItems(items);
		}
	},
	
	_onChange: function() {
		this.change.call(this.scope);
	}
});
;
/*
	jWidget Lib source file.
	
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

/**
 * @class
 *
 * `<T extends JW.Class, C extends JW.AbstractCollection<T>>`
 *
 * Converter to array (orderer). Converts source collection to array.
 * Adds new items to the end of array.
 * If original collection is observable, starts continuous synchronization.
 *
 *     var map = new JW.ObservableMap({a: "A", b: "B"});
 *     var orderer = map.{@link JW.ObservableMap#createOrderer createOrderer}();
 *     var array = orderer.{@link JW.AbstractCollection.Orderer#property-target target};
 *
 *     assert(array.{@link JW.AbstractArray#get get}(0) === "A");
 *     assert(array.{@link JW.AbstractArray#get get}(1) === "B");
 *
 *     // Target array is automatically synchronized with original observable collection
 *     map.{@link JW.AbstractMap#set set}("C", "c");
 *     assert(array.{@link JW.AbstractArray#get get}(2) === "C");
 *
 *     orderer.{@link JW.AbstractCollection.Orderer#destroy destroy}();
 *
 * **Notice:** All items of source collection must be different.
 *
 * Use JW.AbstractCollection#createOrderer method to create the synchronizer.
 * The method will select which synchronizer implementation fits better (simple or observable).
 *
 * You can pass target array in config option:
 *
 *     var array = new JW.Array();
 *     var orderer = collection.{@link JW.AbstractCollection#createOrderer createOrderer}({
 *         {@link JW.AbstractCollection.Orderer#cfg-target target}: array
 *     });
 *
 * In simple cases, JW.AbstractCollection#$$toArray shorthand can be used instead. It returns the target array right away:
 *
 *     var map = new JW.ObservableMap({a: "A", b: "B"});
 *     var array = map.{@link JW.ObservableMap#$$toArray $$toArray}();
 *
 *     assert(array.{@link JW.AbstractArray#get get}(0) === "A");
 *     assert(array.{@link JW.AbstractArray#get get}(1) === "B");
 *
 *     // Target array is automatically synchronized with original observable collection
 *     map.{@link JW.AbstractMap#set set}("C", "c");
 *     assert(array.{@link JW.AbstractArray#get get}(2) === "C");
 *
 *     array.{@link JW.AbstractArray#destroy destroy}();
 *
 * Synchronizer rules:
 *
 * - Target array is stored in {@link #property-target} property.
 * - All items of source collection are added to {@link #property-target}
 * immediately on synchronizer initialization.
 * - All items are removed from {@link #property-target} on synchronizer destruction.
 * - You can pass target array in {@link #cfg-target} config option.
 * In this case, you are responsible for its destruction (though items will be removed
 * automatically on synchronizer destruction anyway).
 * - If {@link #cfg-target} is not passed, it will be created automatically. Synchronizer will select
 * appropriate {@link #property-target} implementation (simple or observable). In this
 * case, {@link #property-target} will be destroyed automatically on synchronizer destruction.
 * - You can convert multiple collections into one array, if all items are different.
 *
 * @extends JW.Class
 *
 * @constructor
 * Creates synchronizer. JW.AbstractCollection#createOrderer method is preferrable instead.
 * @param {JW.AbstractCollection} source `<T>` Source collection.
 * @param {Object} [config] Configuration (see Config options).
 */
JW.AbstractCollection.Orderer = function(source, config) {
	JW.AbstractCollection.Orderer._super.call(this);
	config = config || {};
	this.source = source;
	this._targetCreated = config.target == null;
	this.target = this._targetCreated ? source.createEmptyArray() : config.target;
	this.target.tryAddAll(source.asArray());
};

JW.extend(JW.AbstractCollection.Orderer, JW.Class, {
	/**
	 * @cfg {JW.AbstractArray} target `<T>` Target array.
	 */
	/**
	 * @property {C} source Source collection.
	 */
	/**
	 * @property {JW.AbstractArray} target `<T>` Target array.
	 */
	
	// override
	destroyObject: function() {
		this.target.removeItems(this.source.asArray());
		if (this._targetCreated) {
			this.target.destroy();
		}
		this.source = null;
		this.target = null;
		this._super();
	},
	
	_splice: function(removedItemsSet, addedItemsSet) {
		var filteredItems = this.target.filter(function(item) {
			return !JW.Set.contains(removedItemsSet, item) || JW.Set.contains(addedItemsSet, item);
		}, this);
		var addedItems = JW.Set.$toArray(addedItemsSet).filter(function(item) {
			return !JW.Set.contains(removedItemsSet, item);
		}, this);
		this.target.trySplice(
			this.target.detectFilter(filteredItems) || [],
			[new JW.AbstractArray.IndexItems(filteredItems.length, addedItems)]
		);
	}
});
;
/*
	jWidget Lib source file.
	
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

/**
 * @class
 *
 * `<T, C extends JW.AbstractCollection<T>>`
 *
 * Converter to array (sorter by comparer).
 * Converts source collection to array. Adds new items into such locations that target array is always kept in sorted
 * state. If original collection is observable, starts continuous synchronization.
 * Sorting is performed by comparing function defined by user.
 *
 *     var source = new JW.ObservableArray([
 *         {title: "apple", id: 3},
 *         {title: "Carrot", id: 1},
 *         {title: "Apple", id: 2}
 *     ]);
 *
 *     // Sort by title case-insensitively, and then by id
 *     var sorter = source.{@link JW.AbstractCollection#createSorterComparing createSorterComparing}({
 *         {@link #cfg-compare compare}: function(x, y) {
 *             return JW.cmp(x.title, y.title, true) || JW.cmp(x.id, y.id);
 *         },
 *         {@link #cfg-scope scope}: this
 *     });
 *     var target = sorter.{@link #property-target target};
 *
 *     assert(target.{@link JW.AbstractArray#get get}(0).id === 2); // Apple
 *     assert(target.{@link JW.AbstractArray#get get}(1).id === 3); // apple
 *     assert(target.{@link JW.AbstractArray#get get}(2).id === 1); // Carrot
 *
 *     // Target array is automatically synchronized with original observable collection
 *     source.add({title: "Banana", id: 4});
 *     assert(target.{@link JW.AbstractArray#get get}(0).id === 2); // Apple
 *     assert(target.{@link JW.AbstractArray#get get}(1).id === 3); // apple
 *     assert(target.{@link JW.AbstractArray#get get}(2).id === 4); // Banana
 *     assert(target.{@link JW.AbstractArray#get get}(3).id === 1); // Carrot
 *
 *     sorter.{@link JW.AbstractCollection.SorterComparing#destroy destroy}();
 *
 * Use JW.AbstractCollection#createSorterComparing method to create the synchronizer.
 * The method will select which synchronizer implementation fits better (simple or observable).
 *
 * You can pass target array in config option:
 *
 *     var array = new JW.Array();
 *     var sorter = collection.{@link JW.AbstractCollection#createSorterComparing createSorterComparing}({
 *         {@link #cfg-target target}: array,
 *         {@link #cfg-compare compare}: function(x, y) {
 *             return JW.cmp(x.title, y.title, true) || JW.cmp(x.id, y.id);
 *         },
 *         {@link #cfg-scope scope}: this
 *     });
 *
 * In simple cases, JW.AbstractCollection#$$toSortedComparing shorthand can be used instead.
 * It returns the target array right away:
 *
 *     var source = new JW.ObservableArray([
 *         {title: "apple", id: 3},
 *         {title: "Carrot", id: 1},
 *         {title: "Apple", id: 2}
 *     ]);
 *
 *     // Sort by title case-insensitively, and then by id
 *     var target = source.{@link JW.AbstractCollection#$$toSortedComparing $$toSortedComparing}(function(x, y) {
 *         return JW.cmp(x.title, y.title, true) || JW.cmp(x.id, y.id);
 *     });
 *
 *     assert(target.{@link JW.AbstractArray#get get}(0).id === 2); // Apple
 *     assert(target.{@link JW.AbstractArray#get get}(1).id === 3); // apple
 *     assert(target.{@link JW.AbstractArray#get get}(2).id === 1); // Carrot
 *
 *     // Target array is automatically synchronized with original observable collection
 *     source.add({title: "Banana", id: 4});
 *     assert(target.{@link JW.AbstractArray#get get}(0).id === 2); // Apple
 *     assert(target.{@link JW.AbstractArray#get get}(1).id === 3); // apple
 *     assert(target.{@link JW.AbstractArray#get get}(2).id === 4); // Banana
 *     assert(target.{@link JW.AbstractArray#get get}(3).id === 1); // Carrot
 *
 *     target.{@link JW.AbstractArray#destroy destroy}();
 *
 * Synchronizer rules:
 *
 * - Target array is stored in {@link #property-target} property.
 * - All items of source collection are added to {@link #property-target}
 * immediately on synchronizer initialization.
 * - All items are removed from {@link #property-target} on synchronizer destruction.
 * - You can pass target array in {@link #cfg-target} config option.
 * In this case, you are responsible for its destruction (though items will be removed
 * automatically on synchronizer destruction anyway).
 * - If {@link #cfg-target} is not passed, it will be created automatically. Synchronizer will select
 * appropriate {@link #property-target} implementation (simple or observable). In this
 * case, {@link #property-target} will be destroyed automatically on synchronizer destruction.
 * - You can sort multiple collections into one array.
 *
 * @extends JW.Class
 *
 * @constructor
 * Creates synchronizer. JW.AbstractCollection#createSorterComparing method is preferrable instead.
 * @param {JW.AbstractCollection} source `<T>` Source collection.
 * @param {Object} config Configuration (see Config options).
 */
JW.AbstractCollection.SorterComparing = function(source, config) {
	JW.AbstractCollection.SorterComparing._super.call(this);
	config = config || {};
	this.source = source;
	this.compare = config.compare || JW.cmp;
	this.order = config.order || 1;
	this.scope = config.scope || this;
	this._targetCreated = config.target == null;
	this.target = this._targetCreated ? source.createEmptyArray() : config.target;
	this._splice([], source.asArray());
};

JW.extend(JW.AbstractCollection.SorterComparing, JW.Class, {
	/**
	 * @cfg {JW.AbstractArray} target `<T>` Target array.
	 */
	/**
	 * @cfg {Function} compare
	 *
	 * `compare(t1: T, t2: T): number`
	 *
	 * Comparing function. Defaults to JW.cmp.
	 */
	/**
	 * @cfg {Object} scope {@link #compare} call scope.
	 */
	/**
	 * @cfg {1/-1} [order] Sorting order.
	 */
	/**
	 * @property {C} source Source collection.
	 */
	/**
	 * @property {JW.AbstractArray} target `<T>` Target array.
	 */
	
	// override
	destroyObject: function() {
		this._splice(this.source.asArray(), []);
		if (this._targetCreated) {
			this.target.destroy();
		}
		this.source = null;
		this.target = null;
		this.compare = null;
		this.scope = null;
		this._super();
	},
	
	/**
	 * Resorts target array. Call this method after sorting factors modification.
	 * @returns {void}
	 */
	resort: function() {
		this.target.sortComparing(this.compare, this.scope, this.order);
	},
	
	_splice: function(removedItems, addedItems) {
		var removedItemsSorted = JW.Array.toSortedComparing(removedItems, this.compare, this.scope, this.order);
		var addedItemsSorted = JW.Array.toSortedComparing(addedItems, this.compare, this.scope, this.order);
		removedItems = new Array(removedItems.length);
		addedItems = new Array(addedItems.length);
		var iRemoved = 0;
		var iAdded = 0;
		var jRemoved = 0;
		var jAdded = 0;
		// ignore out the items which are removed and added at the same time
		while ((iRemoved < removedItemsSorted.length) || (iAdded < addedItemsSorted.length)) {
			var removedItem = removedItemsSorted[iRemoved];
			var addedItem = addedItemsSorted[iAdded];
			var c = JW.cmp(removedItem === undefined, addedItem === undefined) ||
				(this.order * this.compare.call(this.scope, removedItem, addedItem));
			if (c < 0) {
				removedItems[jRemoved++] = removedItem;
				++iRemoved;
			} else if (c > 0) {
				addedItems[jAdded++] = addedItem;
				++iAdded;
			} else {
				++iRemoved;
				++iAdded;
			}
		}
		removedItems.splice(jRemoved, removedItems.length - jRemoved);
		addedItems.splice(jAdded, addedItems.length - jAdded);
		
		var iAdds = 0;
		var addShift = 0;
		var removeParamsList = [];
		var addParamsList = [];
		var removeParams = null;
		for (var iTarget = 0, lTarget = this.target.getLength(); iTarget < lTarget; ++iTarget) {
			var value = this.target.get(iTarget);
			if (removedItems[JW.Array.binarySearch(removedItems, value, this.compare, this.scope, this.order) - 1] === value) {
				if (!removeParams) {
					removeParams = new JW.AbstractArray.IndexCount(iTarget, 0);
					removeParamsList.push(removeParams);
				}
				++removeParams.count;
				--addShift;
			} else {
				removeParams = null;
				var addParams = new JW.AbstractArray.IndexItems(iTarget + addShift, []);
				while ((iAdds < addedItems.length) && (this.order * this.compare.call(this.scope, addedItems[iAdds], value) < 0)) {
					addParams.items.push(addedItems[iAdds++]);
					++addShift;
				}
				if (addParams.items.length !== 0) {
					addParamsList.push(addParams);
				}
			}
		}
		if (iAdds < addedItems.length) {
			addParamsList.push(new JW.AbstractArray.IndexItems(iTarget + addShift, addedItems.slice(iAdds)));
		}
		this.target.trySplice(removeParamsList, addParamsList);
	}
});
;
/*
	jWidget Lib source file.
	
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

JW.AbstractCollection._createStatic$Array = function(namespace, algorithm) {
	return function() {
		return new JW.Array(namespace[algorithm].apply(namespace, arguments), true);
	};
};

JW.AbstractCollection._createStatic$Map = function(namespace, algorithm) {
	return function() {
		return new JW.Map(namespace[algorithm].apply(namespace, arguments), true);
	};
};

JW.AbstractCollection._createStatic$Set = function(namespace, algorithm) {
	return function() {
		return new JW.Set(namespace[algorithm].apply(namespace, arguments), true);
	};
};

JW.AbstractCollection.createStaticMethods = function(namespace) {
	namespace.some = function(target, callback, scope) {
		return !namespace.every(target, function(item) {
			return callback.call(this, item) === false;
		}, scope);
	};
	
	namespace.each = function(target, callback, scope) {
		namespace.every(target, function(item) {
			callback.call(this, item);
			return true;
		}, scope);
	};
	
	namespace.search = function(target, callback, scope) {
		var result;
		namespace.every(target, function(item) {
			if (callback.call(this, item) !== false) {
				result = item;
				return false;
			}
			return true;
		}, scope);
		return result;
	};
	
	namespace.toSorted = function(target, callback, scope, order) {
		callback = callback || function(x) { return x; };
		order = order || 1;
		var pairs = [];
		namespace.every(target, function(item) {
			pairs.push([item, callback.call(this, item)]);
		}, scope);
		pairs.sort(function(x, y) {
			return order * JW.cmp(x[1], y[1]);
		});
		return JW.Array.map(pairs, function(pair) {
			return pair[0];
		});
	};
	
	namespace.$toSorted = JW.AbstractCollection._createStatic$Array(namespace, "toSorted");
	
	namespace.toSortedComparing = function(target, compare, scope, order) {
		compare = compare || JW.cmp;
		scope = scope || target;
		order = order || 1;
		var items = namespace.toArray(target);
		items.sort(function(x, y) {
			return order * compare.call(scope, x, y);
		});
		return items;
	};
	
	namespace.$toSortedComparing = JW.AbstractCollection._createStatic$Array(namespace, "toSortedComparing");
	
	namespace.index = function(target, callback, scope) {
		var result = {};
		namespace.every(target, function(item) {
			var key = callback.call(this, item);
			if (JW.isSet(key)) {
				result[key] = item;
			}
			return true;
		}, scope);
		return result;
	};
	
	namespace.$index = JW.AbstractCollection._createStatic$Map(namespace, "index");
	
	namespace.toArray = function(target) {
		var result = new Array(namespace.getLength(target));
		var index = 0;
		namespace.every(target, function(item) {
			result[index++] = item;
		});
		return result;
	};
	
	namespace.$toArray = JW.AbstractCollection._createStatic$Array(namespace, "toArray");
	
	namespace.toSet = function(target) {
		var result = {};
		namespace.every(target, function(item) {
			JW.Set.add(result, item);
		});
		return result;
	};
	
	namespace.$toSet = JW.AbstractCollection._createStatic$Set(namespace, "toSet");
	
	namespace.asArray = function(target) {
		return namespace.toArray(target);
	};
	
	namespace.$asArray = JW.AbstractCollection._createStatic$Array(namespace, "asArray");
	
	namespace.asSet = function(target) {
		return namespace.toSet(target);
	};
	
	namespace.$asSet = JW.AbstractCollection._createStatic$Set(namespace, "asSet");
};
;
/*
	jWidget Lib source file.

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

/**
 * @class
 *
 * `<K, T> extends JW.AbstractCollection<T>`
 *
 * Abstract collection of items of type T with keys of type K.
 *
 * There are 2 indexed collection types:
 *
 * - JW.AbstractArray (key is number)
 * - JW.AbstractMap (key is string)
 *
 * Please keep in mind the next rule whenever you work with jWidget indexed collections:
 * in all methods and callbacks which take item and key arguments, item goes first and key goes last.
 *
 * # Indexed collection methods
 *
 * **Difference compared to JW.AbstractCollection is in bold.**
 *
 * Content retrieving:
 *
 * - {@link #getLength} - Returns count of items in collection. For observable collections, `length` property may come
 * in handy if you want to track collection length dynamically.
 * - {@link #isEmpty} - Checks collection for emptiness.
 * - **{@link #get} - Returns collection item by key.**
 * - {@link #getFirst} - Returns first item in collection
 * - **{@link #getFirstKey} - Returns key of first item in collection.**
 * - **{@link #getKeys}, #$getKeys - Returns array of all item keys.**
 * - {@link #containsItem} - Does collection contain the item?
 * - **{@link #containsKey} - Does collection contain the key?**
 * - **{@link #keyOf} - Returns item key. If item is not found, returns `undefined`.**
 *
 * Iteration algorhitms (**callback functions are overridden and take extra arguments - item keys**):
 *
 * - {@link #every} - Checks all items by criteria.
 * Returns `true` if all items match the criteria.
 * - {@link #some} - Checks each item by criteria.
 * Returns `true` if some items matches the criteria.
 * - {@link #each} - Iterates items.
 * - {@link #search} - Finds item by criteria.
 * Returns first item matching the criteria.
 * - **{@link #find} - Finds item by criteria.
 * Returns index of first item matching the criteria.**
 * - {@link #filter}, #$filter, #$$filter - Filters collection by criteria.
 * Builds new collection of the same type, consisting of items matching the criteria.
 * - {@link #count}, #$count, #$$count - Counts the items matching criteria.
 * - {@link #map}, #$map, #$$mapValues, #$$mapObjects - Maps collection items.
 * Builds new collection of the same type, consisting of results of mapping function call for each collection item.
 * - {@link #toSorted}, #$toSorted, #toSortedComparing, #$toSortedComparing, #$$toSortedComparing -
 * Builds array consisting of collection items sorted by indexer or comparer.
 * - **{@link #getSortingKeys}, #$getSortingKeys, #getSortingKeysComparing, #$getSortingKeysComparing -
 * Returns indexes of collection items sorted by indexer or comparer.**
 * - {@link #index}, #$index, #$$index - Indexes collection.
 * Builds new map by rule: key is the result of indexer function call, value is the corresponding item.
 * - {@link #toArray}, #$toArray, #$$toArray - Builds new array consisting of collection items.
 * - **{@link #toMap}, #$toMap - Builds new map consisting of collection items.**
 * - {@link #toSet}, #$toSet, #$$toSet - Builds new set consisting of collection items.
 * - {@link #asArray}, #$asArray - Represents collection as array.
 * - **{@link #asMap}, #$asMap - Represents collection as map.**
 * - {@link #asSet}, #$asSet - Represents collection as set.
 *
 * Collection modification:
 *
 * - **{@link #set}, #trySet - Replaces an item by key.**
 * - **{@link #remove}, #tryRemove - Removes an item by key.**
 * - {@link #removeItem} - Removes first occurency of an item in collection.
 * - {@link #removeItems} - Removes all occurencies of items in collection.
 * - {@link #clear}, #$clear, #tryClear - Clears collection.
 *
 * Synchronizers creation:
 *
 * - {@link #createMapper} - Creates item mapper. Extended version of #$$mapValues and #$$mapObjects methods.
 * - {@link #createFilterer} - Creates filterer. Extended version of #$$filter method.
 * - {@link #createCounter} - Creates matching item counter. Extended version of #$$count method.
 * - {@link #createLister} - Creates converter to set. Extended version of #$$toSet method.
 * - {@link #createIndexer} - Creates converter to map (indexer). Extended version of #$$index method.
 * - {@link #createOrderer} - Creates converter to array (orderer). Extended version of #$$toArray method.
 * - {@link #createSorterComparing} - Creates converter to array (sorter by comparer). Extended version of #$$toSortedComparing method.
 * - {@link #createObserver} - Creates observer.
 *
 * Similar collection creation (for algorithms and synchronizers implementation):
 *
 * - {@link #createEmpty} - Creates empty collection of the same type.
 * - {@link #createEmptyArray} - Creates empty array of the same observability type.
 * - {@link #createEmptyMap} - Creates empty map of the same observability type.
 * - {@link #createEmptySet} - Creates empty set of the same observability type.
 *
 * All the same algorithms are also available for native JavaScript collections:
 *
 * - Array, see JW.Array static methods.
 * - Object as map, see JW.Map static methods.
 *
 * @extends JW.AbstractCollection
 * @abstract
 */
JW.IndexedCollection = function() {
	JW.IndexedCollection._super.call(this);
};

JW.extend(JW.IndexedCollection, JW.AbstractCollection, {
	/**
	 * @method get
	 * Returns item by key. If item with such key doesn't exist, returns `undefined`.
	 * @param {K} key Key.
	 * @returns {T} Item.
	 */
	/**
	 * @method $clear
	 * Clears collection.
	 * @returns {JW.IndexedCollection} `<K, T>` Old collection contents.
	 */

	/**
	 * Returns key of first collection item. If collection is empty, returns `undefined`.
	 * @returns {K} Key.
	 */
	getFirstKey: function() {
		return this._callStatic("getFirstKey");
	},

	/**
	 * @method getKeys
	 * Returns array of keys of all collection items.
	 * @returns {Array} `<K>` Keys array.
	 */
	/**
	 * Returns array of keys of all collection items.
	 * @returns {JW.Array} `<K>` Keys array.
	 */
	$getKeys: JW.AbstractCollection._create$Array("getKeys"),

	/**
	 * Checks existance of item with specified index in collection.
	 * @param {K} key Key.
	 * @returns {boolean} Collection contains item with specified key.
	 */
	containsKey: function(key) {
		return this.get(key) !== undefined;
	},

	containsItem: function(item) {
		return !this.every(function(v) { return item !== v; });
	},

	/**
	 * Returns index of item in collection. If such item doesn't exist, returns `undefined`.
	 * @param {T} item Item.
	 * @returns {K} Item key.
	 */
	keyOf: function(item) {
		return this.find(function(v) { return item === v; });
	},

	/**
	 * @method trySet
	 *
	 * Replaces item with specified key. If collection doesn't contain such key:
	 *
	 * - Array will break.
	 * - Map will add a new item.
	 *
	 * @param {T} item Item.
	 * @param {K} key Key.
	 * @returns {JW.Proxy} `<T>` Proxy of the replaced item. If not modified - `undefined`.
	 */
	/**
	 * Replaces item with specified key. If collection doesn't contain such key:
	 *
	 * - Array will break.
	 * - Map will add a new item.
	 *
	 * @param {T} item Item.
	 * @param {K} key Key.
	 * @returns {T} The replaced item.
	 */
	set: function(item, key) {
		var result = this.trySet(item, key);
		return (result !== undefined) ? result.value : this.get(key);
	},

	/**
	 * @method tryRemove
	 * Removes item with specified key. If collection doesn't contain such key:
	 *
	 * - Array will break.
	 * - Map will add a new item.
	 *
	 * @param {K} key Key.
	 * @returns {T} The removed item. If not modified - `undefined`.
	 */
	/**
	 * Removes item with specified key. If collection doesn't contain such key:
	 *
	 * - Array will break.
	 * - Map will do nothing.
	 *
	 * @param {K} key Key.
	 * @returns {T} The removed item.
	 */
	remove: function(key) {
		return this.tryRemove(key);
	},

	removeItem: function(item) {
		var key = this.keyOf(item);
		if (key !== undefined) {
			this.tryRemove(key);
		}
		return key;
	},

	/**
	 * @method every
	 *
	 * Checks all items by criteria.
	 *
	 * Returns true if function `f` returns !== `false` for all collection items.
	 *
	 * Algorithms iterates items sequentially, and stops after first item not matching the criteria.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T, key: K): boolean`
	 *
	 * Criteria.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {boolean} Result.
	 */
	/**
	 * Checks each item by criteria.
	 *
	 * Returns true if function `f` returns !== `false` for some collection item.
	 *
	 * Algorithms iterates items sequentially, and stops after first item matching the criteria.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T, key: K): boolean`
	 *
	 * Criteria.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {boolean} Result.
	 */
	some: function(callback, scope) {
		return !this.every(function(item, key) {
			return callback.call(this, item, key) === false;
		}, scope);
	},

	/**
	 * Iterates collection items. Calls specified function for all items.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T, key: K): void`
	 *
	 * Function.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {void}
	 */
	each: function(callback, scope) {
		this.every(function(item, key) {
			callback.call(this, item, key);
			return true;
		}, scope);
	},

	/**
	 * Finds item by criteria.
	 *
	 * Returns key of first item for which `f` returns !== `false`.
	 *
	 * Algorithms iterates items sequentially, and stops after first item matching the criteria.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T, key: K): boolean`
	 *
	 * Criteria.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {K} Found item key or `undefined`.
	 */
	find: function(callback, scope) {
		var result;
		this.every(function(item, key) {
			if (callback.call(this, item, key) !== false) {
				result = key;
				return false;
			}
			return true;
		}, scope);
		return result;
	},

	/**
	 * Finds item by criteria.
	 *
	 * Returns first item for which `f` returns !== `false`.
	 *
	 * Algorithms iterates items sequentially, and stops after first item matching the criteria.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T, key: K): boolean`
	 *
	 * Criteria.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {T} Found item or `undefined`.
	 */
	search: function(callback, scope) {
		var result;
		this.every(function(item, key) {
			if (callback.call(this, item, key) !== false) {
				result = item;
				return false;
			}
			return true;
		}, scope);
		return result;
	},

	/**
	 * @method toSorted
	 *
	 * Converts collection to sorted array.
	 *
	 * Builds array consisting of collection items sorted by result of `f` call for each item.
	 *
	 * @param {Function} [f]
	 *
	 * `f(item: T, key: K): number/string`
	 *
	 * Indexer function. Returns `item` by default.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @param {1/-1} [order] Sorting order.
	 * @returns {Array} `<T>` Sorted array.
	 */
	/**
	 * @method $toSorted
	 *
	 * Converts collection to sorted array.
	 *
	 * Builds array consisting of collection items sorted by result of `f` call for each item.
	 *
	 * @param {Function} [f]
	 *
	 * `f(item: T, key: K): number/string`
	 *
	 * Indexer function. Returns `item` by default.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @param {1/-1} [order] Sorting order.
	 * @returns {JW.Array} `<T>` Sorted array.
	 */
	/**
	 * @method toSortedComparing
	 *
	 * Converts collection to sorted array.
	 *
	 * Builds array consisting of collection items sorted by comparer.
	 *
	 * @param {Function} [compare]
	 *
	 * `f(t1: T, t2: T, k1: K, k2: K): number`
	 *
	 * Comparer function. Returns positive value if t1 > t2; nagative value if t1 < t2; 0 if t1 == t2.
	 * Defaults to `JW.cmp(t1, t2)`.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @param {1/-1} [order] Sorting order.
	 * @returns {Array} `<T>` Sorted array.
	 */
	/**
	 * @method $toSortedComparing
	 *
	 * Converts collection to sorted array.
	 *
	 * Builds array consisting of collection items sorted by comparer.
	 *
	 * @param {Function} [compare]
	 *
	 * `f(t1: T, t2: T, k1: K, k2: K): number`
	 *
	 * Comparer function. Returns positive value if t1 > t2; nagative value if t1 < t2; 0 if t1 == t2.
	 * Defaults to `JW.cmp(t1, t2)`.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @param {1/-1} [order] Sorting order.
	 * @returns {JW.Array} `<T>` Sorted array.
	 */

	/**
	 * Returns keys of sorted items.
	 *
	 * Builds array of item keys, sorted by result of `f` call for each item.
	 *
	 * @param {Function} [f]
	 *
	 * `f(item: T, key: K): number/string`
	 *
	 * Indexer function. Returns `item` by default.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @param {1/-1} [order] Sorting order.
	 * @returns {Array} `<K>` Sorted item keys array.
	 */
	getSortingKeys: function(callback, scope, order) {
		return this._callStatic("getSortingKeys", [callback, scope || this, order]);
	},

	/**
	 * Returns keys of sorted items.
	 *
	 * Builds array of item keys, sorted by result of `f` call for each item.
	 *
	 * @param {Function} [f]
	 *
	 * `f(item: T, key: K): number/string`
	 *
	 * Indexer function. Returns `item` by default.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @param {1/-1} [order] Sorting order.
	 * @returns {JW.Array} `<K>` Sorted item keys array.
	 */
	$getSortingKeys: JW.AbstractCollection._create$Array("getSortingKeys"),

	/**
	 * Returns keys of sorted items.
	 *
	 * Builds array of item keys, sorted by comparer.
	 *
	 * @param {Function} [compare]
	 *
	 * `f(t1: T, t2: T, k1: K, k2: K): number`
	 *
	 * Comparer function. Returns positive value if t1 > t2; nagative value if t1 < t2; 0 if t1 == t2.
	 * Defaults to `JW.cmp(t1, t2)`.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @param {1/-1} [order] Sorting order.
	 * @returns {Array} `<K>` Sorted item keys array.
	 */
	getSortingKeysComparing: function(compare, scope, order) {
		return this._callStatic("getSortingKeysComparing", [compare, scope || this, order]);
	},

	/**
	 * Returns keys of sorted items.
	 *
	 * Builds array of item keys, sorted by comparer.
	 *
	 * @param {Function} [compare]
	 *
	 * `f(t1: T, t2: T, k1: K, k2: K): number`
	 *
	 * Comparer function. Returns positive value if t1 > t2; nagative value if t1 < t2; 0 if t1 == t2.
	 * Defaults to `JW.cmp(t1, t2)`.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @param {1/-1} [order] Sorting order.
	 * @returns {JW.Array} `<K>` Sorted item keys array.
	 */
	$getSortingKeysComparing: JW.AbstractCollection._create$Array("getSortingKeysComparing"),

	/**
	 * @method $index
	 *
	 * Indexes collection.
	 *
	 * Builds new map by rule: key is the result of indexer function call, value is the corresponding item.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T, key: K): string`
	 *
	 * Indexer function.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {JW.Map} `<T>` Collection index.
	 */
	/**
	 * Indexes collection.
	 *
	 * Builds new map by rule: key is the result of indexer function call, value is the corresponding item.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T, key: K): string`
	 *
	 * Indexer function.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {Object} `<T>` Collection index.
	 */
	index: function(callback, scope) {
		var result = {};
		this.every(function(item, k) {
			var key = callback.call(this, item, k);
			if (JW.isSet(key)) {
				result[key] = item;
			}
			return true;
		}, scope);
		return result;
	},

	/**
	 * Converts collection to map.
	 *
	 * Builds new map consisting of collection items.
	 *
	 * @returns {Object} `<T>` Items map.
	 */
	toMap: function() {
		var result = {};
		this.every(function(v, k) {
			result[k] = v;
		});
		return result;
	},

	/**
	 * Converts collection to map.
	 *
	 * Builds new map consisting of collection items.
	 *
	 * @returns {JW.Map} `<T>` Items map.
	 */
	$toMap: JW.AbstractCollection._create$Map("toMap"),

	/**
	 * Represents collection as map.
	 *
	 * If this collection is map, returns it immediately. Else, executes #toMap method.
	 * This method works probably faster than #toMap, but please make sure that the returned map
	 * won't be modified externally, because it can cause strange unexpected bugs.
	 *
	 * @returns {Object} `<T>` Items map.
	 */
	asMap: function() {
		return this.toMap();
	},

	/**
	 * Represents collection as map.
	 *
	 * If this collection is map, returns it immediately. Else, executes #toMap method.
	 * This method works probably faster than #toMap, but please make sure that the returned map
	 * won't be modified externally, because it can cause strange unexpected bugs.
	 *
	 * @returns {JW.Map} `<T>` Items map.
	 */
	$asMap: JW.AbstractCollection._create$Map("asMap")

	/**
	 * @method filter
	 *
	 * Filters collection by criteria.
	 *
	 * Builds new collection of the same type, consisting of items for which `f` returns !== `false`.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T, key: K): boolean`
	 *
	 * Criteria.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {Array/Object} `<T>` Filtered collection.
	 */
	/**
	 * @method $filter
	 *
	 * Filters collection by criteria.
	 *
	 * Builds new collection of the same type, consisting of items for which `f` returns !== `false`.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T, key: K): boolean`
	 *
	 * Criteria.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {JW.IndexedCollection} `<K, T>` Filtered collection.
	 */
	/**
	 * @method map
	 *
	 * `<U>` Maps collection items.
	 *
	 * Builds new collection of the same type, consisting of results of `f` call for each collection item.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T, key: K): U`
	 *
	 * Mapping function.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {Array/Object} `<U>` Mapped collection.
	 */
	/**
	 * @method $map
	 *
	 * `<U>` Maps collection items.
	 *
	 * Builds new collection of the same type, consisting of results of `f` call for each collection item.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T, key: K): U`
	 *
	 * Mapping function.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {JW.IndexedCollection} `<K, U>` Mapped collection.
	 */

	/**
	 * @method createEmpty
	 * `<U>` Creates empty collection of the same type.
	 * @returns {JW.IndexedCollection} `<K, U>` Collection.
	 */
});
;
/*
	jWidget Lib source file.
	
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

JW.IndexedCollection.createStaticMethods = function(namespace) {
	JW.AbstractCollection.createStaticMethods(namespace);
	
	namespace.getFirst = function(target) {
		var key = namespace.getFirstKey(target);
		if (key !== undefined) {
			return namespace.get(target, key);
		}
	};
	
	namespace.$getKeys = JW.AbstractCollection._createStatic$Array(namespace, "getKeys");
	
	namespace.containsKey = function(target, key) {
		return namespace.get(target, key) !== undefined;
	};
	
	namespace.containsItem = function(target, item) {
		return !namespace.every(target, function(v) { return item !== v; });
	};
	
	namespace.keyOf = function(target, item) {
		return namespace.find(target, function(v) { return item === v; });
	};
	
	namespace.set = function(target, item, key) {
		var result = namespace.trySet(target, item, key);
		return (result !== undefined) ? result.value : namespace.get(target, key);
	};
	
	namespace.remove = function(target, key) {
		return namespace.tryRemove(target, key);
	};
	
	namespace.removeItem = function(target, item) {
		var key = namespace.keyOf(target, item);
		if (key !== undefined) {
			namespace.tryRemove(target, key);
		}
		return key;
	};
	
	namespace.some = function(target, callback, scope) {
		return !namespace.every(target, function(item, key) {
			return callback.call(this, item, key) === false;
		}, scope);
	};
	
	namespace.each = function(target, callback, scope) {
		namespace.every(target, function(item, key) {
			callback.call(this, item, key);
			return true;
		}, scope);
	};
	
	namespace.find = function(target, callback, scope) {
		var result;
		namespace.every(target, function(item, key) {
			if (callback.call(this, item, key) !== false) {
				result = key;
				return false;
			}
			return true;
		}, scope);
		return result;
	};
	
	namespace.search = function(target, callback, scope) {
		var result;
		namespace.every(target, function(item, key) {
			if (callback.call(this, item, key) !== false) {
				result = item;
				return false;
			}
			return true;
		}, scope);
		return result;
	};
	
	namespace.getSortingKeys = function(target, callback, scope, order) {
		callback = callback || function(x) { return x; };
		order = order || 1;
		var pairs = [];
		namespace.every(target, function(item, key) {
			pairs.push([key, callback.call(this, item, key)]);
		}, scope);
		pairs.sort(function(x, y) {
			return order * JW.cmp(x[1], y[1]);
		});
		return JW.Array.map(pairs, function(pair) {
			return pair[0];
		});
	};
	
	namespace.$getSortingKeys = JW.AbstractCollection._createStatic$Array(namespace, "getSortingKeys");
	
	namespace.getSortingKeysComparing = function(target, compare, scope, order) {
		compare = compare || JW.cmp;
		order = order || 1;
		var pairs = [];
		namespace.every(target, function(item, key) {
			pairs.push([key, item]);
		}, scope);
		pairs.sort(function(x, y) {
			return order * compare.call(scope, x[1], y[1], x[0], y[0]);
		});
		return JW.Array.map(pairs, function(pair) {
			return pair[0];
		});
	};
	
	namespace.$getSortingKeysComparing = JW.AbstractCollection._createStatic$Array(namespace, "getSortingKeysComparing");
	
	namespace.toSorted = function(target, callback, scope, order) {
		return JW.Array.map(namespace.getSortingKeys(target, callback, scope, order), function(key) {
			return namespace.get(target, key);
		});
	};
	
	namespace.$toSorted = JW.AbstractCollection._createStatic$Array(namespace, "toSorted");
	
	namespace.toSortedComparing = function(target, compare, scope, order) {
		return JW.Array.map(namespace.getSortingKeysComparing(target, compare, scope, order), function(key) {
			return namespace.get(target, key);
		});
	};
	
	namespace.$toSortedComparing = JW.AbstractCollection._createStatic$Array(namespace, "toSortedComparing");
	
	namespace.index = function(target, callback, scope) {
		var result = {};
		namespace.every(target, function(item, k) {
			var key = callback.call(this, item, k);
			if (JW.isSet(key)) {
				result[key] = item;
			}
			return true;
		}, scope);
		return result;
	};
	
	namespace.toMap = function(target) {
		var result = {};
		namespace.every(target, function(v, k) {
			result[k] = v;
		});
		return result;
	};
	
	namespace.$toMap = JW.AbstractCollection._createStatic$Map(namespace, "toMap");
	
	namespace.asMap = function(target) {
		return namespace.toMap(target);
	};
	
	namespace.$asMap = JW.AbstractCollection._createStatic$Map(namespace, "asMap");
};
;
/*
	jWidget Lib source file.

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

/**
 * @class
 *
 * `<T> extends JW.IndexedCollection<number, T>`
 *
 * Array is ordered collection. Each item of array has an index. Index of first item is 0,
 * index of each next one is higher by 1.
 *
 * # Array methods
 *
 * **Difference compared to JW.IndexedCollection is in bold.**
 *
 * Content retrieving:
 *
 * - {@link #getLength} - Returns count of items in collection. For observable collections, `length` property may come
 * in handy if you want to track collection length dynamically.
 * - {@link #isEmpty} - Checks collection for emptiness.
 * - {@link #get} - Returns collection item by index.
 * - {@link #getFirst} - Returns first item in collection.
 * - **{@link #getLast} - Returns last item in collection.**
 * - {@link #getFirstKey} - Returns index of first item in collection.
 * - **{@link #getLastKey} - Returns index of last item in collection.**
 * - {@link #getKeys}, #$getKeys - Returns array of all item indexes.
 * - {@link #containsItem} - Does collection contain the item?
 * - {@link #containsKey} - Does collection contain the index?
 * - {@link #keyOf} - Returns item index. If item is not found, returns `undefined`.
 * - **{@link #indexOf} - Returns item index. If item is not found, return -1.**
 * - **{@link #getItems} - Returns internal representation of array.**
 * - **{@link #binarySearch} - Finds the index by binary search.**
 *
 * Iteration algorhitms:
 *
 * - {@link #every} - Checks all items by criteria.
 * Returns `true` if all items match the criteria.
 * - {@link #some} - Checks each item by criteria.
 * Returns `true` if some items matches the criteria.
 * - {@link #each} - Iterates items.
 * - {@link #search} - Finds item by criteria.
 * Returns first item matching the criteria.
 * - {@link #find} - Finds item by criteria.
 * Returns index of first item matching the criteria.
 * - {@link #filter}, #$filter, #$$filter - Filters collection by criteria.
 * Builds new collection of the same type, consisting of items matching the criteria.
 * - {@link #count}, #$count, #$$count - Counts the items matching criteria.
 * - {@link #map}, #$map, #$$mapValues, #$$mapObjects - Maps collection items.
 * Builds new collection of the same type, consisting of results of mapping function call for each collection item.
 * - {@link #toSorted}, #$toSorted, #toSortedComparing, #$toSortedComparing, #$$toSortedComparing -
 * Builds array consisting of collection items sorted by indexer or comparer.
 * - {@link #getSortingKeys}, #$getSortingKeys, #getSortingKeysComparing, #$getSortingKeysComparing -
 * Returns indexes of collection items sorted by indexer or comparer.
 * - {@link #index}, #$index, #$$index - Indexes collection.
 * Builds new map by rule: key is the result of indexer function call, value is the corresponding item.
 * - {@link #toArray}, #$toArray, #$$toArray - Builds new array consisting of collection items.
 * - {@link #toMap}, #$toMap - Builds new map consisting of collection items.
 * - {@link #toSet}, #$toSet, #$$toSet - Builds new set consisting of collection items.
 * - {@link #asArray}, #$asArray - Represents collection as array.
 * - {@link #asMap}, #$asMap - Represents collection as map.
 * - {@link #asSet}, #$asSet - Represents collection as set.
 * - **{@link #backEvery} - Checks all items by criteria in backward order.**
 * - **{@link #merge}, #$merge, #$$merge - (for `JW.AbstractArray<? extends JW.AbstractArray>` only)
 * Builds array consisting of items of subarrays in the same order.**
 * - **{@link #toReversed}, #$toReversed, #$$toReversed -
 * Builds array consisting of collection items in reverse order.**
 *
 * Collection modification:
 *
 * - **{@link #add}, #tryAdd - Inserts an item.**
 * - **{@link #addAll}, #tryAddAll - Inserts item range.**
 * - {@link #set}, #trySet - Replaces an item by index.
 * - {@link #remove}, #tryRemove - Removes an item by index.
 * - **{@link #removeAll}, #$removeAll, #tryRemoveAll - Removes item range.**
 * - {@link #removeItem} - Removes first occurency of an item in collection.
 * - {@link #removeItems} - Removes all occurencies of items in collection.
 * - **{@link #pop} - Removes last item.**
 * - **{@link #move}, #tryMove - Moves item.**
 * - {@link #clear}, #$clear, #tryClear - Clears collection.
 * - **{@link #splice}, #trySplice - Removes/inserts item ranges.**
 * - **{@link #reorder}, #tryReorder - Reorders items.**
 * - **{@link #sort}, #sortComparing - Sorts array.**
 * - **{@link #reverse} - Reverses item order in array.**
 * - **{@link #performSplice} - Adjusts contents using #splice method.**
 * - **{@link #performFilter} - Filters contents using #splice method.**
 * - **{@link #performReorder} - Adjusts contents using #reorder method.**
 *
 * Synchronizers creation:
 *
 * - {@link #createMapper} - Creates item mapper. Extended version of #$$mapValues and #$$mapObjects methods.
 * - {@link #createFilterer} - Creates filterer. Extended version of #$$filter method.
 * - {@link #createCounter} - Creates matching item counter. Extended version of #$$count method.
 * - {@link #createLister} - Creates converter to set. Extended version of #$$toSet method.
 * - {@link #createIndexer} - Creates converter to map (indexer). Extended version of #$$index method.
 * - {@link #createOrderer} - Creates converter to array (orderer). Extended version of #$$toArray method.
 * - {@link #createSorterComparing} - Creates converter to array (sorter by comparer). Extended version of #$$toSortedComparing method.
 * - {@link #createObserver} - Creates observer.
 * - **{@link #createInserter} - Creates view synchronizer with array.**
 * - **{@link #createMerger} - Creates arrays merger. Extended version of #$$merge method.**
 * - **{@link #createReverser} - Creates array reverser. Extended version of #$$toReversed method.**
 *
 * Similar collection creation (for algorithms and synchronizers implementation):
 *
 * - {@link #createEmpty} - Creates empty collection of the same type.
 * - {@link #createEmptyArray} - Creates empty array of the same observability level.
 * - {@link #createEmptyMap} - Creates empty map of the same observability level.
 * - {@link #createEmptySet} - Creates empty set of the same observability level.
 *
 * Other methods:
 *
 * - **{@link #detectSplice} - Detects #splice method arguments to adjust contents.**
 * - **{@link #detectFilter} - Detects `removeParamsList` argument of #splice method to filter contents.**
 * - **{@link #detectReorder} - Detects #reorder method arguments to adjust contents.**
 * - **{@link #detectSort} - Detects #reorder method arguments to sort by indexer.**
 * - **{@link #detectSortComparing} - Detects #reorder method arguments to sort by comparer.**
 * - **{@link #collapse} - Collapses multi-dimensional array.**
 * - **{@link #equal} - Checks for equality to another array.**
 *
 * All the same algorithms are also available for native JavaScript Array, see JW.Array static methods.
 *
 * @extends JW.IndexedCollection
 * @abstract
 */
JW.AbstractArray = function(items, adapter) {
	JW.AbstractArray._super.call(this);
	this.items = adapter ? items : items ? items.concat() : [];
	this.getKey = null;
};

JW.extend(JW.AbstractArray, JW.IndexedCollection, {
	/**
	 * @property {Function} getKey
	 *
	 * `getKey(item: T): number/string`
	 *
	 * Function which returns unique key of an item in this collection.
	 * Function is used by #detectSplice, #performSplice, #detectReorder, #performReorder algorithms.
	 * Defaults to JW.iid.
	 * If collection consists of instances of JW.Class, then it's all right.
	 */
	/**
	 * @method getFirstKey
	 * Returns index of first collection item. If collection is empty, returns `undefined`.
	 * @returns {number} Index.
	 */
	/**
	 * @method containsKey
	 * Checks existance of item with specified index in collection.
	 * @param {number} index Index.
	 * @returns {boolean} Collection contains item with specified index.
	 */
	/**
	 * @method keyOf
	 * Returns index of item in collection. If such item doesn't exist, returns `undefined`.
	 * @param {T} item Item.
	 * @returns {number} Item index.
	 */

	/**
	 * Returns item array - internal collection representation.
	 *
	 * **Caution: doesn't make a copy.**
	 *
	 * @returns {Array} `<T>` Item array.
	 */
	getItems: function() {
		return this.items;
	},

	/**
	 * Returns the last collection item. If collection is empty, returns `undefined`.
	 * @returns {T} Item.
	 */
	getLast: function() {
		return this.items[this.items.length - 1];
	},

	/**
	 * Returns index of last collection item. If collection is empty, returns `undefined`.
	 * @returns {number} Index.
	 */
	getLastKey: function() {
		var l = this.items.length;
		if (l !== 0) {
			return l - 1;
		}
	},

	getLength: function() {
		return this.items.length;
	},

	isEmpty: function() {
		return this.items.length === 0;
	},

	/**
	 * @method get
	 * Returns item by index. If item with such index doesn't exist, returns `undefined`.
	 * @param {number} index Index.
	 * @returns {T} Item.
	 */
	get: function(index) {
		return this.items[index];
	},

	/**
	 * @method $getKeys
	 * Returns array of indexes of all collection items, i.e. array `[0, 1, ... , length - 1]`.
	 * @returns {JW.Array} `<number>` Indexes array.
	 */
	/**
	 * Returns array of indexes of all collection items, i.e. array `[0, 1, ... , length - 1]`.
	 * @returns {Array} `<number>` Indexes array.
	 */
	getKeys: function() {
		var items = this.items;
		var result = new Array(items.length);
		for (var i = 0, l = items.length; i < l; ++i) {
			result[i] = i;
		}
		return result;
	},

	/**
	 * Checks all items by criteria.
	 *
	 * Returns true if function `f` returns !== `false` for all collection items.
	 *
	 * Algorithms iterates items sequentially, and stops after first item not matching the criteria.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T, index: number): boolean`
	 *
	 * Criteria.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {boolean} Result.
	 */
	every: function(callback, scope) {
		return JW.Array.every(this.items, callback, scope || this);
	},

	/**
	 * @method some
	 *
	 * Checks each item by criteria.
	 *
	 * Returns true if function `f` returns !== `false` for some collection item.
	 *
	 * Algorithms iterates items sequentially, and stops after first item matching the criteria.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T, index: number): boolean`
	 *
	 * Criteria.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {boolean} Result.
	 */
	/**
	 * @method each
	 *
	 * Iterates collection items. Calls specified function for all items.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T, index: number): void`
	 *
	 * Function.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {void}
	 */
	/**
	 * @method find
	 *
	 * Finds item by criteria.
	 *
	 * Returns index of first item for which `f` returns !== `false`.
	 *
	 * Algorithms iterates items sequentially, and stops after first item matching the criteria.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T, index: number): boolean`
	 *
	 * Criteria.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {number} Found item index or `undefined`.
	 */
	/**
	 * @method search
	 *
	 * Finds item by criteria.
	 *
	 * Returns first item for which `f` returns !== `false`.
	 *
	 * Algorithms iterates items sequentially, and stops after first item matching the criteria.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T, index: number): boolean`
	 *
	 * Criteria.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {T} Found item or `undefined`.
	 */
	/**
	 * @method toSorted
	 *
	 * Converts collection to sorted array.
	 *
	 * Builds array consisting of collection items sorted by result of `f` call for each item.
	 *
	 * @param {Function} [f]
	 *
	 * `f(item: T, index: number): number/string`
	 *
	 * Indexer function. Returns `item` by default.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @param {1/-1} [order] Sorting order.
	 * @returns {Array} `<T>` Sorted array.
	 */
	/**
	 * @method $toSorted
	 *
	 * Converts collection to sorted array.
	 *
	 * Builds array consisting of collection items sorted by result of `f` call for each item.
	 *
	 * @param {Function} [f]
	 *
	 * `f(item: T, index: number): number/string`
	 *
	 * Indexer function. Returns `item` by default.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @param {1/-1} [order] Sorting order.
	 * @returns {JW.Array} `<T>` Sorted array.
	 */
	/**
	 * @method toSortedComparing
	 *
	 * Converts collection to sorted array.
	 *
	 * Builds array consisting of collection items sorted by comparer.
	 *
	 * @param {Function} [compare]
	 *
	 * `f(t1: T, t2: T, i1: number, i2: number): number`
	 *
	 * Comparer function. Returns positive value if t1 > t2; nagative value if t1 < t2; 0 if t1 == t2.
	 * Defaults to `JW.cmp(t1, t2)`.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @param {1/-1} [order] Sorting order.
	 * @returns {Array} `<T>` Sorted array.
	 */
	/**
	 * @method $toSortedComparing
	 *
	 * Converts collection to sorted array.
	 *
	 * Builds array consisting of collection items sorted by comparer.
	 *
	 * @param {Function} [compare]
	 *
	 * `f(t1: T, t2: T, i1: number, i2: number): number`
	 *
	 * Comparer function. Returns positive value if t1 > t2; nagative value if t1 < t2; 0 if t1 == t2.
	 * Defaults to `JW.cmp(t1, t2)`.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @param {1/-1} [order] Sorting order.
	 * @returns {JW.Array} `<T>` Sorted array.
	 */
	/**
	 * @method getSortingKeys
	 *
	 * Returns indexes of sorted items.
	 *
	 * Builds array of item indexes, sorted by result of `f` call for each item.
	 *
	 * @param {Function} [f]
	 *
	 * `f(item: T, index: number): number/string`
	 *
	 * Indexer function. Returns `item` by default.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @param {1/-1} [order] Sorting order.
	 * @returns {Array} `<number>` Sorted item indexes array.
	 */
	/**
	 * @method $getSortingKeys
	 *
	 * Returns indexes of sorted items.
	 *
	 * Builds array of item indexes, sorted by result of `f` call for each item.
	 *
	 * @param {Function} [f]
	 *
	 * `f(item: T, index: number): number/string`
	 *
	 * Indexer function. Returns `item` by default.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @param {1/-1} [order] Sorting order.
	 * @returns {JW.Array} `<number>` Sorted item indexes array.
	 */
	/**
	 * @method getSortingKeysComparing
	 *
	 * Returns indexes of sorted items.
	 *
	 * Builds array of item indexes, sorted by comparer.
	 *
	 * @param {Function} [compare]
	 *
	 * `f(t1: T, t2: T, i1: number, i2: number): number`
	 *
	 * Comparer function. Returns positive value if t1 > t2; nagative value if t1 < t2; 0 if t1 == t2.
	 * Defaults to `JW.cmp(t1, t2)`.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @param {1/-1} [order] Sorting order.
	 * @returns {Array} `<number>` Sorted item indexes array.
	 */
	/**
	 * @method $getSortingKeysComparing
	 *
	 * Returns indexes of sorted items.
	 *
	 * Builds array of item indexes, sorted by comparer.
	 *
	 * @param {Function} [compare]
	 *
	 * `f(t1: T, t2: T, i1: number, i2: number): number`
	 *
	 * Comparer function. Returns positive value if t1 > t2; nagative value if t1 < t2; 0 if t1 == t2.
	 * Defaults to `JW.cmp(t1, t2)`.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @param {1/-1} [order] Sorting order.
	 * @returns {JW.Array} `<number>` Sorted item indexes array.
	 */
	/**
	 * @method index
	 *
	 * Indexes collection.
	 *
	 * Builds new map by rule: key is the result of indexer function call, value is the corresponding item.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T, index: number): string`
	 *
	 * Indexer function.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {Object} `<T>` Collection index.
	 */
	/**
	 * @method $index
	 *
	 * Indexes collection.
	 *
	 * Builds new map by rule: key is the result of indexer function call, value is the corresponding item.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T, index: number): string`
	 *
	 * Indexer function.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {JW.Map} `<T>` Collection index.
	 */

	/**
	 * Filters collection by criteria.
	 *
	 * Builds new collection of the same type, consisting of items for which `f` returns !== `false`.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T, index: number): boolean`
	 *
	 * Criteria.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {Array} `<T>` Filtered collection.
	 */
	filter: function(callback, scope) {
		return JW.Array.filter(this.items, callback, scope || this);
	},

	/**
	 * Filters collection by criteria.
	 *
	 * Builds new collection of the same type, consisting of items for which `f` returns !== `false`.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T, index: number): boolean`
	 *
	 * Criteria.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {JW.Array} `<T>` Filtered collection.
	 */
	$filter: JW.AbstractCollection._create$Array("filter"),

	count: function(callback, scope) {
		return JW.Array.count(this.items, callback, scope || this);
	},

	/**
	 * `<U>` Maps collection items.
	 *
	 * Builds new collection of the same type, consisting of results of `f` call for each collection item.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T, index: number): U`
	 *
	 * Mapping function.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {Array} `<U>` Mapped collection.
	 */
	map: function(callback, scope) {
		return JW.Array.map(this.items, callback, scope || this);
	},

	/**
	 * `<U>` Maps collection items.
	 *
	 * Builds new collection of the same type, consisting of results of `f` call for each collection item.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T, index: number): U`
	 *
	 * Mapping function.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {JW.Array} `<U>` Mapped collection.
	 */
	$map: JW.AbstractCollection._create$Array("map"),

	toArray: function() {
		return this.items.concat();
	},

	asArray: function() {
		return this.items;
	},

	$asArray: function() {
		return this;
	},

	/**
	 * Inserts an item to array.
	 * @param {T} item Item.
	 * @param {number} [index] Index of an item before which to insert new one. By default, appends the item.
	 * @returns {void}
	 */
	add: function(item, index) {
		this.tryAdd(item, index);
	},

	/**
	 * Inserts an item to array.
	 * @param {T} item Item.
	 * @param {number} [index] Index of an item before which to insert new one. By default, appends the item.
	 * @returns {boolean} true.
	 */
	tryAdd: function(item, index) {
		return this.tryAddAll([item], index);
	},

	/**
	 * Inserts item range to array.
	 * @param {Array} items `<T>` Items.
	 * @param {number} [index] Index of an item before which to insert new ones. By default, appends the items.
	 * @returns {void}
	 */
	addAll: function(items, index) {
		this.tryAddAll(items, index);
	},

	/**
	 * Inserts item range to array.
	 * @param {Array} items `<T>` Items.
	 * @param {number} [index] Index of an item before which to insert new ones. By default, appends the items.
	 * @returns {boolean} true. If not modified - `undefined`.
	 */
	tryAddAll: function(items, index) {
		if (index === undefined) {
			index = this.items.length;
		}
		if (this.trySplice([], [new JW.AbstractArray.IndexItems(index, items)])) {
			return true;
		}
	},

	/**
	 * @method set
	 * Replaces item with specified index. If array doesn't contain such index, it will break the application.
	 * @param {T} item Item.
	 * @param {number} index Index.
	 * @returns {T} The replaced item.
	 */
	/**
	 * Replaces item with specified index. If array doesn't contain such index, it will break the application.
	 * @param {T} item Item.
	 * @param {number} index Index.
	 * @returns {JW.Proxy} `<T>` Proxy of the replaced item. If not modified - `undefined`.
	 */
	trySet: function(item, index) {
		var oldProxy = this._trySet(item, index);
		if ((oldProxy !== undefined) && this._ownsItems) {
			oldProxy.get().destroy();
		}
		return oldProxy;
	},

	_trySet: function(item, index) {
		return JW.Array.trySet(this.items, item, index);
	},

	/**
	 * @method remove
	 * Removes item with specified index. If array doesn't contain such index, it will break the application.
	 * @param {number} index Index.
	 * @returns {T} The removed item.
	 */
	/**
	 * Removes item with specified index. If array doesn't contain such index, it will break the application.
	 * @param {number} index Index.
	 * @returns {T} The removed item. If not modified - `undefined`.
	 */
	tryRemove: function(index) {
		var result = this.tryRemoveAll(index, 1);
		if (result !== undefined) {
			return result[0];
		}
	},

	/**
	 * Removes item range from array.
	 * @param {number} index Index of first item to remove.
	 * @param {number} count Count of items to remove.
	 * @returns {Array} `<T>` The removed items.
	 */
	removeAll: function(index, count) {
		var result = this.tryRemoveAll(index, count);
		return result || [];
	},

	/**
	 * Removes item range from array.
	 * @param {number} index Index of first item to remove.
	 * @param {number} count Count of items to remove.
	 * @returns {JW.Array} `<T>` The removed items.
	 */
	$removeAll: JW.AbstractCollection._create$Array("removeAll"),

	/**
	 * Removes item range from array.
	 * @param {number} index Index of first item to remove.
	 * @param {number} count Count of items to remove.
	 * @returns {Array} `<T>` The removed items. If not modified - `undefined`.
	 */
	tryRemoveAll: function(index, count) {
		var result = this.trySplice([new JW.AbstractArray.IndexCount(index, count)], []);
		if (result !== undefined) {
			return result.removedItemsList[0].items;
		}
	},

	removeItems: function(items) {
		var itemSet = new JW.Set(items);
		var newItems = this.filter(function(item) { return !itemSet.contains(item); });
		this.performFilter(newItems);
	},

	/**
	 * Moves an item inside array.
	 * @param {number} fromIndex Item index to move.
	 * @param {number} toIndex Index to move to.
	 * @returns {T} The moved item.
	 */
	move: function(fromIndex, toIndex) {
		this.tryMove(fromIndex, toIndex);
		return this.get(toIndex);
	},

	/**
	 * Moves an item inside array.
	 * @param {number} fromIndex Item index to move.
	 * @param {number} toIndex Index to move to.
	 * @returns {T} The moved item. If not modified - `undefined`.
	 */
	tryMove: function(fromIndex, toIndex) {
		return JW.Array.tryMove(this.items, fromIndex, toIndex);
	},

	/**
	 * Clears collection.
	 * @returns {Array} `<T>` Old collection contents.
	 */
	clear: function() {
		var result = this.tryClear();
		return (result !== undefined) ? result : [];
	},

	/**
	 * Clears collection.
	 * @returns {JW.Array} `<T>` Old collection contents.
	 */
	$clear: JW.AbstractCollection._create$Array("clear"),

	/**
	 * Clears collection.
	 * @returns {Array} `<T>` Old collection contents. If not modified - `undefined`.
	 */
	tryClear: function() {
		var items = this._tryClear(this.items);
		if ((items !== undefined) && this._ownsItems) {
			JW.Array.backEvery(items, JW.destroy);
		}
		return items;
	},

	_tryClear: function() {
		return JW.Array.tryClear(this.items);
	},

	/**
	 * Removes and inserts item ranges. Universal optimized granular operation of removal/insertion.
	 * @param {Array} removeParamsList `<JW.AbstractArray.IndexCount>`
	 * Array of segments to remove sorted by index asc. Segments are removed in backward order.
	 * @param {Array} addParamsList `<JW.AbstractArray.IndexItems<T>>`
	 * Array of segments to insert sorted by index asc. Segments are inserted in forward order.
	 * @returns {JW.AbstractArray.SpliceResult} `<T>` Result.
	 */
	splice: function(removeParamsList, addParamsList) {
		var result = this.trySplice(removeParamsList, addParamsList);
		return (result !== undefined) ? result : new JW.AbstractArray.SpliceResult(this.items.concat(), [], []);
	},

	/**
	 * Removes and inserts item ranges. Universal optimized granular operation of removal/insertion.
	 * @param {Array} removeParamsList `<JW.AbstractArray.IndexCount>`
	 * Array of segments to remove sorted by index asc. Segments are removed in backward order.
	 * @param {Array} addParamsList `<JW.AbstractArray.IndexItems<T>>`
	 * Array of segments to insert sorted by index asc. Segments are inserted in forward order.
	 * @returns {JW.AbstractArray.SpliceResult} `<T>` Result. If not modified - `undefined`.
	 */
	trySplice: function(removeParamsList, addParamsList) {
		var spliceResult = this._trySplice(removeParamsList, addParamsList);
		if ((spliceResult !== undefined) && this._ownsItems) {
			JW.Array.backEvery(spliceResult.getRemovedItems(), JW.destroy);
		}
		return spliceResult;
	},

	_trySplice: function(removeParamsList, addParamsList) {
		return JW.Array.trySplice(this.items, removeParamsList, addParamsList);
	},

	/**
	 * Reorders array items.
	 * @param {Array} indexArray `<number>` Index array. Item with index `i` will be moved to index `indexArray[i]`.
	 * Must contain all indexes from 0 to (length - 1).
	 * @returns {void}
	 */
	reorder: function(indexArray) {
		this.tryReorder(indexArray);
	},

	/**
	 * Reorders array items.
	 * @param {Array} indexArray `<number>` Index array. Item with index `i` will be moved to index `indexArray[i]`.
	 * Must contain all indexes from 0 to (length - 1).
	 * @returns {Array} `<T>` Old array contents. If not modified - undefined.
	 */
	tryReorder: function(indexArray) {
		return JW.Array.tryReorder(this.items, indexArray);
	},

	/**
	 * Detects #splice method arguments to adjust array contents to `newItems`.
	 * Determines which item ranges should be removed and which ones should be inserted.
	 * All items must have unique `getKey` function result.
	 * If items don't have unique key, probably #detectFilter method will help.
	 * @param {Array} newItems `<T>` New array contents.
	 * @param {Function} [getKey]
	 * Function which returns unique key of an item in this collection.
	 * Defaults to #getKey.
	 * If collection consists of instances of JW.Class, then it's all right.
	 * @param {Object} [scope] `getKey` call scope. Defaults to `this`.
	 * @returns {JW.AbstractArray.SpliceParams}
	 * `<T>` #splice method arguments. If no method call required - `undefined`.
	 */
	detectSplice: function(newItems, getKey, scope) {
		return JW.Array.detectSplice(this.items, newItems, getKey || this.getKey, scope || this);
	},

	/**
	 * Detects `removeParamsList` arguments of #splice to adjust array contents to `newItems`.
	 * Determines which item ranges should be removed.
	 * Doesn't assume items insertion - try #detectSplice if that's the case.
	 * In advantage to #detectSplice, doesn't require item uniquiness.
	 * @param {Array} newItems `<T>` New array contents.
	 * @returns {Array}
	 * `<JW.AbstractArray.IndexCount>` `removeParamsList` argument of #splice method.
	 * If no method call required - `undefined`.
	 */
	detectFilter: function(newItems) {
		return JW.Array.detectFilter(this.items, newItems);
	},

	/**
	 * Detects #reorder method arguments to adjust array contents to `newItems`.
	 * Determines where to move all items.
	 * If `newItems` contents differ from `this` contents, the array will be broken.
	 * @param {Array} newItems `<T>` New array contents.
	 * @param {Function} [getKey]
	 * Function which returns unique key of an item in this collection.
	 * Defaults to #getKey.
	 * If collection consists of instances of JW.Class, then it's all right.
	 * @param {Object} [scope] `getKey` call scope. Defaults to `this`.
	 * @returns {Array}
	 * `<number>` `indexArray` argument of #reorder method.
	 * If no method call required - `undefined`.
	 */
	detectReorder: function(newItems, getKey, scope) {
		return JW.Array.detectReorder(this.items, newItems, getKey || this.getKey, scope || this);
	},

	/**
	 * Detects #reorder method arguments to sort array contents by result of `f` call for each item.
	 * @param {Function} [f]
	 *
	 * `f(item: T, index: number): number/string`
	 *
	 * Indexer function. Returns `item` by default.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @param {1/-1} [order] Sorting order.
	 * @returns {Array}
	 * `<number>` `indexArray` argument of #reorder method.
	 * If no method call required - `undefined`.
	 */
	detectSort: function(callback, scope, order) {
		return JW.Array.detectSort(this.items, callback, scope || this, order);
	},

	/**
	 * Detects #reorder method arguments to sort array contents by comparer.
	 *
	 * @param {Function} [compare]
	 *
	 * `f(t1: T, t2: T, i1: number, i2: number): number`
	 *
	 * Comparer function. Returns positive value if t1 > t2; nagative value if t1 < t2; 0 if t1 == t2.
	 * Defaults to `JW.cmp(t1, t2)`.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @param {1/-1} [order] Sorting order.
	 * @returns {Array}
	 * `<number>` `indexArray` argument of #reorder method.
	 * If no method call required - `undefined`.
	 */
	detectSortComparing: function(compare, scope, order) {
		return JW.Array.detectSortComparing(this.items, compare, scope || this, order);
	},

	/**
	 * Adjusts array contents to `newItems` using #detectSplice and #splice methods.
	 * All items must have unique `getKey` function result.
	 * If items don't have unique key, probably #detectFilter method will help.
	 * @param {Array} newItems `<T>` New array contents.
	 * @param {Function} [getKey]
	 * Function which returns unique key of an item in this collection.
	 * Defaults to #getKey.
	 * If collection consists of instances of JW.Class, then it's all right.
	 * @param {Object} [scope] `getKey` call scope. Defaults to `this`.
	 * @returns {void}
	 */
	performSplice: function(newItems, getKey, scope) {
		var params = this.detectSplice(newItems, getKey || this.getKey, scope || this);
		if (params !== undefined) {
			this.trySplice(params.removeParamsList, params.addParamsList);
		}
	},

	/**
	 * Adjusts array contents to `newItems` using #detectFilter and #splice methods.
	 * Only removes items. Doesn't assume items insertion - try #detectSplice if that's the case.
	 * In advantage to #detectSplice, doesn't require item uniquiness.
	 * @param {Array} newItems `<T>` New array contents.
	 * @returns {void}
	 */
	performFilter: function(newItems) {
		var params = this.detectFilter(newItems);
		if (params !== undefined) {
			this.trySplice(params, []);
		}
	},

	/**
	 * Adjusts array contents to `newItems` using #detectReorder and #reorder methods.
	 * @param {Array} newItems `<T>` New array contents.
	 * @param {Function} [getKey]
	 * Function which returns unique key of an item in this collection.
	 * Defaults to #getKey.
	 * If collection consists of instances of JW.Class, then it's all right.
	 * @param {Object} [scope] `getKey` call scope. Defaults to `this`.
	 * @returns {void}
	 */
	performReorder: function(newItems, getKey, scope) {
		var indexArray = this.detectReorder(newItems, getKey || this.getKey, scope || this);
		if (indexArray !== undefined) {
			this.tryReorder(indexArray);
		}
	},

	/**
	 * Sorts array by result of `f` function call for each item.
	 *
	 * @param {Function} [f]
	 *
	 * `f(item: T, index: number): number/string`
	 *
	 * Indexer function. Returns `item` by default.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @param {1/-1} [order] Sorting order.
	 * @returns {void}
	 */
	sort: function(callback, scope, order) {
		var indexArray = this.detectSort(callback, scope, order);
		if (indexArray !== undefined) {
			this.tryReorder(indexArray);
		}
	},

	/**
	 * Sorts array by comparer.
	 *
	 * @param {Function} [compare]
	 *
	 * `f(t1: T, t2: T, i1: number, i2: number): number`
	 *
	 * Comparer function. Returns positive value if t1 > t2; nagative value if t1 < t2; 0 if t1 == t2.
	 * Defaults to `JW.cmp(t1, t2)`.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @param {1/-1} [order] Sorting order.
	 * @returns {void}
	 */
	sortComparing: function(compare, scope, order) {
		var indexArray = this.detectSortComparing(compare, scope, order);
		if (indexArray !== undefined) {
			this.tryReorder(indexArray);
		}
	},

	/**
	 * For `JW.AbstractArray<? extends JW.AbstractArray>` only.
	 * Builds array consisting of subarray items in the same order.
	 * Current array is not modified.
	 * @returns {Array} Merged array.
	 */
	merge: function() {
		return JW.Array.merge(this.map(JW.byMethod("getItems")));
	},

	/**
	 * For `JW.AbstractArray<? extends JW.AbstractArray>` only.
	 * Builds array consisting of subarray items in the same order.
	 * Current array is not modified.
	 * @returns {JW.Array} Merged array.
	 */
	$merge: JW.AbstractCollection._create$Array("merge"),

	/**
	 * For `JW.AbstractArray<? extends JW.AbstractArray>` only.
	 * Builds array consisting of subarray items in the same order.
	 * Current array is not modified.
	 * If this collection is observable, starts continuous synchronization,
	 * i.e. creates JW.AbstractArray.Merger implicitly.
	 * @returns {JW.AbstractArray} Merged array.
	 */
	$$merge: function() {
		var result = this._createMergerTarget();
		result.own(this.createMerger({
			target: result
		}));
		return result;
	},

	/**
	 * Reverses item order in array. Modifies the array itself.
	 * @returns {void}
	 */
	reverse: function() {
		this.items.reverse();
	},

	/**
	 * Builds a new array containing items of this array in reversed order.
	 * Current array is not modified.
	 * @returns {Array} `<T>` Reversed array.
	 */
	toReversed: function() {
		return JW.Array.toReversed(this.items);
	},

	/**
	 * Builds a new array containing items of this array in reversed order.
	 * Current array is not modified.
	 * @returns {JW.Array} `<T>` Reversed array.
	 */
	$toReversed: JW.AbstractCollection._create$Array("toReversed"),

	/**
	 * Builds a new array containing items of this array in reversed order.
	 * Current array is not modified.
	 * If this collection is observable, starts continuous synchronization,
	 * i.e. creates JW.AbstractArray.Reverser implicitly.
	 * @returns {JW.AbstractArray} `<T>` Reversed array.
	 */
	$$toReversed: function() {
		return this.$toReversed();
	},

	/**
	 * `<U>` Creates collection item mapper.
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} config Configuration (see synchronizer's Config options).
	 * @returns {JW.AbstractArray.Mapper}
	 * `<T, U>` Synchronizer.
	 */
	createMapper: function(config) {
		return new JW.AbstractArray.Mapper(this, config);
	},

	/**
	 * Creates collection filterer.
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} config Configuration (see synchronizer's Config options).
	 * @returns {JW.AbstractArray.Filterer}
	 * `<T>` Synchronizer.
	 */
	createFilterer: function(config) {
		return new JW.AbstractArray.Filterer(this, config);
	},

	/**
	 * Creates matching item counter.
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} config Configuration (see synchronizer's Config options).
	 * @returns {JW.AbstractArray.Counter}
	 * `<T>` Synchronizer.
	 */
	createCounter: function(config) {
		return new JW.AbstractArray.Counter(this, config);
	},

	/**
	 * Creates collection observer.
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} config Configuration (see synchronizer's Config options).
	 * @returns {JW.AbstractArray.Observer}
	 * `<T>` Synchronizer.
	 */
	createObserver: function(config) {
		return new JW.AbstractArray.Observer(this, config);
	},

	/**
	 * Creates collection converter to array (orderer).
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} [config] Configuration (see synchronizer's Config options).
	 * @returns {JW.AbstractArray.Orderer}
	 * `<T>` Synchronizer.
	 */
	createOrderer: function(config) {
		return new JW.AbstractArray.Orderer(this, config);
	},

	/**
	 * Creates collection converter to array (sorter by comparer).
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} config Configuration (see synchronizer's Config options).
	 * @returns {JW.AbstractArray.SorterComparing}
	 * `<T>` Synchronizer.
	 */
	createSorterComparing: function(config) {
		return new JW.AbstractArray.SorterComparing(this, config);
	},

	/**
	 * Creates collection converter to map (indexer).
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} config Configuration (see synchronizer's Config options).
	 * @returns {JW.AbstractArray.Indexer}
	 * `<T>` Synchronizer.
	 */
	createIndexer: function(config) {
		return new JW.AbstractArray.Indexer(this, config);
	},

	/**
	 * Creates collection converter to set.
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} [config] Configuration (see synchronizer's Config options).
	 * @returns {JW.AbstractArray.Lister}
	 * `<T>` Synchronizer.
	 */
	createLister: function(config) {
		return new JW.AbstractArray.Lister(this, config);
	},

	/**
	 * Creates view synchronizer with array.
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} config Configuration (see synchronizer's Config options).
	 * @returns {JW.AbstractArray.Inserter}
	 * `<T>` Synchronizer.
	 */
	createInserter: function(config) {
		return new JW.AbstractArray.Inserter(this, config);
	},

	/**
	 * Creates arrays merger.
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} [config] Configuration (see synchronizer's Config options).
	 * @returns {JW.AbstractArray.Merger}
	 * `<T>` Synchronizer.
	 */
	createMerger: function(config) {
		return new JW.AbstractArray.Merger(this, config);
	},

	createMergerBunch: function(merger) {
		return new JW.AbstractArray.Merger.Bunch(merger, this);
	},

	/**
	 * Creates array reverser.
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} [config] Configuration (see synchronizer's Config options).
	 * @returns {JW.AbstractArray.Reverser}
	 * `<T>` Synchronizer.
	 */
	createReverser: function(config) {
		return new JW.AbstractArray.Reverser(this, config);
	},

	createSplitter: function(config) {
		return new JW.AbstractArray.Splitter(this, config);
	},

	/**
	 * Checks for equality (===) to another array, item by item.
	 * @param {Array} arr `<T>` Another array.
	 * @returns {boolean} Arrays are equal.
	 */
	equal: function(arr) {
		return JW.Array.equal(this.items, arr);
	},

	/**
	 * Collapses multi-dimentional array.
	 * @param {number} depth Dimentions to collapse.
	 * @returns {Array} Collapsed array.
	 */
	collapse: function(depth) {
		return JW.Array.collapse(this.items, depth);
	},

	/**
	 * Returns item index in this collection. If item doesn't exist, returns -1.
	 * @param {T} item Item.
	 * @returns {number} Item index or -1.
	 */
	indexOf: function(item) {
		return JW.Array.indexOf(this.items, item);
	},

	/**
	 * Checks all items by criteria in backward order.
	 *
	 * Returns true if function `f` returns !== `false` for all collection items.
	 *
	 * Algorithms iterates items sequentially, and stops after first item not matching the criteria.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T, index: number): boolean`
	 *
	 * Criteria.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {boolean} Result.
	 */
	backEvery: function(callback, scope) {
		return JW.Array.backEvery(this.items, callback, scope);
	},

	// deprecated
	top: function() {
		return JW.Array.top(this.items);
	},

	/**
	 * Removes last array item. Does nothing if array is empty.
	 * @returns {T} The removed item or `undefined`.
	 */
	pop: function() {
		if (this.items.length !== 0) {
			return this.tryRemove(this.items.length - 1);
		}
	},

	/**
	 * Determines index of first item which is more (or less if `order` == -1) than specified value by `compare` function,
	 * using binary search. Array must be sorted by `compare` function.
	 * Can be used for item insertion easily.
	 * If you want to use this method for item removal, you must look at previous item and compare it to `value` first.
	 * @param {T} value Value.
	 * @param {Function} [compare]
	 *
	 * `f(t1: T, t2: T): number`
	 *
	 * Comparer function. Returns positive value if t1 > t2; nagative value if t1 < t2; 0 if t1 == t2.
	 * Defaults to `JW.cmp(t1, t2)`.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @param {1/-1} [order] Sorting order.
	 * @returns {number} Item index.
	 */
	binarySearch: function(value, compare, scope, order) {
		return JW.Array.binarySearch(this.items, value, compare, scope, order);
	},

	_callStatic: function(algorithm, args) {
		return JW.Array[algorithm].apply(JW.Array, [this.items].concat(args || []));
	},

	_createMergerTarget: function() {
		return this.some(function(bunch) { return bunch instanceof JW.ObservableArray; }) ?
			new JW.ObservableArray() : new JW.Array();
	}

	/**
	 * @method createEmpty
	 * `<U>` Creates empty collection of the same type.
	 * @returns {JW.AbstractArray} `<U>` Collection.
	 */
});

/**
 * @class
 * "Index-count" pair. Used in JW.AbstractArray#splice method arguments to specify item segments to remove.
 * @extends JW.Class
 *
 * @constructor
 * @param {number} index Index.
 * @param {number} count Count.
 */
JW.AbstractArray.IndexCount = function(index, count) {
	JW.AbstractArray.IndexCount._super.call(this);
	this.index = index;
	this.count = count;
};

JW.extend(JW.AbstractArray.IndexCount, JW.Class, {
	/**
	 * @property {number} index Index.
	 */
	/**
	 * @property {number} count Count.
	 */

	/**
	 * Clones pair.
	 * @returns {JW.AbstractArray.IndexCount}
	 */
	clone: function() {
		return new JW.AbstractArray.IndexCount(this.index, this.count);
	}
});

/**
 * @class
 * `<T>` "Index-items" pair. Used in JW.AbstractArray#splice method arguments to specify item segments to insert,
 * and in JW.AbstractArray.SpliceResult class to specify removed and added item segments.
 * @extends JW.Class
 *
 * @constructor
 * @param {number} index Index.
 * @param {Array} items `<T>` Items.
 */
JW.AbstractArray.IndexItems = function(index, items) {
	JW.AbstractArray.IndexItems._super.call(this);
	this.index = index;
	this.items = items;
};

JW.extend(JW.AbstractArray.IndexItems, JW.Class, {
	/**
	 * @property {number} index Index.
	 */
	/**
	 * @property {Array} items `<T>` Items.
	 */

	/**
	 * Converts to "index-count" pair.
	 * @returns {JW.AbstractArray.IndexCount} "Index-count" pair.
	 */
	toIndexCount: function() {
		return new JW.AbstractArray.IndexCount(this.index, this.items.length);
	},

	/**
	 * Clones pair.
	 * @returns {JW.AbstractArray.IndexItems}
	 */
	clone: function() {
		return new JW.AbstractArray.IndexItems(this.index, this.items.concat());
	}
});

/**
 * @class
 * `<T>` JW.AbstractArray#splice method arguments. Returned by JW.AbstractArray#detectSplice method.
 * @extends JW.Class
 *
 * @constructor
 * @param {Array} removeParamsList `<JW.AbstractArray.IndexCount>` Segments to remove.
 * @param {Array} addParamsList `<JW.AbstractArray.IndexItems<T>>` Segments to add.
 */
JW.AbstractArray.SpliceParams = function(removeParamsList, addParamsList) {
	JW.AbstractArray.SpliceParams._super.call(this);
	this.removeParamsList = removeParamsList;
	this.addParamsList = addParamsList;
};

JW.extend(JW.AbstractArray.SpliceParams/*<T>*/, JW.Class, {
	/**
	 * @property {Array} removeParamsList `<JW.AbstractArray.IndexCount>` Segments to remove.
	 */
	/**
	 * @property {Array} addParamsList `<JW.AbstractArray.IndexItems<T>>` Segments to add.
	 */
});

/**
 * @class
 * `<T>` JW.AbstractArray#splice method result.
 * @extends JW.Class
 *
 * @constructor
 * @param {Array} oldItems `<T>` Old array contents.
 * @param {Array} removedItemsList `<JW.AbstractArray.IndexItems<T>>` Removed item segments.
 * @param {Array} addedItemsList `<JW.AbstractArray.IndexItems<T>>` Added item segments.
 */
JW.AbstractArray.SpliceResult = function(oldItems, removedItemsList, addedItemsList) {
	JW.AbstractArray.SpliceResult._super.call(this);
	this.oldItems = oldItems;
	this.removedItemsList = removedItemsList;
	this.addedItemsList = addedItemsList;
	this.removedItems = null;
	this.addedItems = null;
	this.removeParamsList = null;
};

JW.extend(JW.AbstractArray.SpliceResult, JW.Class, {
	/**
	 * @property {Array} oldItems `<T>` Old array contents.
	 */
	/**
	 * @property {Array} removedItemsList `<JW.AbstractArray.IndexItems<T>>` Removed item segments.
	 */
	/**
	 * @property {Array} addedItemsList `<JW.AbstractArray.IndexItems<T>>` Added item segments.
	 */
	/*
	Array<T> removedItems;
	Array<T> addedItems;
	Array<JW.AbstractArray.IndexCount<T>> removeParamsList;
	*/

	/**
	 * Returns plain array of removed items.
	 * @returns {Array} `<T>` Removed items array.
	 */
	getRemovedItems: function() {
		if (!this.removedItems) {
			this.removedItems = JW.Array.merge(JW.Array.map(this.removedItemsList, JW.byField("items")));
		}
		return this.removedItems;
	},

	/**
	 * Returns plain array of added items.
	 * @returns {Array} `<T>` Added items array.
	 */
	getAddedItems: function() {
		if (!this.addedItems) {
			this.addedItems = JW.Array.merge(JW.Array.map(this.addedItemsList, JW.byField("items")));
		}
		return this.addedItems;
	},

	/**
	 * Converts removed item segments to "index-count" pairs.
	 * @returns {Array} `<JW.AbstractArray.IndexCount<T>>` Segments to remove.
	 */
	getRemoveParamsList: function() {
		if (!this.removeParamsList) {
			this.removeParamsList = JW.Array.map(this.removedItemsList, JW.byMethod("toIndexCount"));
		}
		return this.removeParamsList;
	},

	/**
	 * Checks that JW.AbstractArray#splice method call didn't change the array.
	 * @returns {boolean} Array hasn't been changed.
	 */
	isEmpty: function() {
		return (this.removedItemsList.length === 0) && (this.addedItemsList.length === 0);
	}
});
;
/*
	jWidget Lib source file.

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

/**
 * @class
 *
 * `<T> extends JW.AbstractCollection.Counter<T>`
 *
 * See JW.AbstractCollection.Counter for details.
 *
 * @extends JW.AbstractCollection.Counter
 *
 * @constructor
 * Creates synchronizer. JW.AbstractCollection#createCounter method is preferrable instead.
 * @param {JW.AbstractArray} source `<T>` Source collection.
 * @param {Object} config Configuration (see Config options).
 */
JW.AbstractArray.Counter = function(source, config) {
	JW.AbstractArray.Counter._super.call(this, source, config);
};

JW.extend(JW.AbstractArray.Counter, JW.AbstractCollection.Counter, {
	/**
	 * @property {JW.AbstractArray} source `<T>` Source collection.
	 */
});
;
/*
	jWidget Lib source file.
	
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

/**
 * @class
 *
 * `<T> extends JW.AbstractCollection.Filterer<T, JW.AbstractArray<T>>`
 *
 * See JW.AbstractCollection.Filterer for details.
 *
 * @extends JW.AbstractCollection.Filterer
 *
 * @constructor
 * Creates synchronizer. JW.AbstractCollection#createFilterer method is preferrable instead.
 * @param {JW.AbstractArray} source `<T>` Source collection.
 * @param {Object} config Configuration (see Config options).
 */
JW.AbstractArray.Filterer = function(source, config) {
	JW.AbstractArray.Filterer._super.call(this, source, config);
	this._filtered = [];
	this._splice([], [new JW.AbstractArray.IndexItems(0, this.source.getItems())]);
};

JW.extend(JW.AbstractArray.Filterer, JW.AbstractCollection.Filterer, {
	/**
	 * @cfg {JW.AbstractArray} target `<T>` Target array.
	 */
	/**
	 * @property {JW.AbstractArray} source `<T>` Source collection.
	 */
	/**
	 * @property {JW.AbstractArray} target `<T>` Target array.
	 */
	// Array<number> _filtered; // 0 - false, 1 - true
	
	// override
	destroyObject: function() {
		this.target.tryClear();
		this._super();
	},
	
	_countFiltered: function(index, count) {
		var result = 0;
		for (var i = 0; i < count; ++i) {
			result += this._filtered[index + i];
		}
		return result;
	},
	
	_splice: function(removedItemsList, addedItemsList) {
		var sourceIndex = 0;
		var targetIndex = 0;
		var removeParamsList = JW.Array.map(removedItemsList, function(indexItems) {
			targetIndex += this._countFiltered(sourceIndex, indexItems.index - sourceIndex);
			var count = this._countFiltered(indexItems.index, indexItems.items.length);
			var params = new JW.AbstractArray.IndexCount(targetIndex, count);
			sourceIndex = indexItems.index + indexItems.items.length;
			targetIndex += count;
			return params;
		}, this);
		JW.Array.trySplice(this._filtered, JW.Array.map(removedItemsList, JW.byMethod("toIndexCount")), []);
		
		var sourceIndex = 0;
		var targetIndex = 0;
		var addParamsList = JW.Array.map(addedItemsList, function(indexItems) {
			targetIndex += this._countFiltered(sourceIndex, indexItems.index - sourceIndex);
			var items = [];
			var filtered = JW.Array.map(indexItems.items, function(item) {
				if (this.filterItem.call(this.scope, item) === false) {
					return 0;
				}
				items.push(item);
				return 1;
			}, this);
			var params = new JW.AbstractArray.IndexItems(targetIndex, items);
			JW.Array.tryAddAll(this._filtered, filtered, indexItems.index);
			sourceIndex = indexItems.index + filtered.length;
			targetIndex += items.length;
			return params;
		}, this);
		
		this.target.trySplice(removeParamsList, addParamsList);
	},
	
	/**
	 * Changes filterer configuration and refilters target collection. Accepts next
	 * options: #filterItem, #scope.
	 * @param {Object} config Configuration.
	 */
	reconfigure: function(config) {
		this.filterItem = JW.def(config.filterItem, this.filterItem);
		this.scope = JW.def(config.scope, this.scope);
		this.refilter();
	},
	
	/**
	 * Refilters target collection item at specified position in source collection.
	 * Call this method when collection item properties change the way that it must be refiltered.
	 * @param {number} index Index of source collection item to refilter.
	 */
	refilterAt: function(sourceIndex) {
		var item = this.source.get(sourceIndex);
		var good = this.filterItem.call(this.scope, item) !== false;
		var targetIndex = this._countFiltered(0, sourceIndex);
		if (this._filtered[sourceIndex] === 0) {
			if (good) {
				this._filtered[sourceIndex] = 1;
				this.target.add(item, targetIndex);
			}
		} else {
			if (!good) {
				this._filtered[sourceIndex] = 0;
				this.target.remove(targetIndex);
			}
		}
	},
	
	/**
	 * Refilters target collection item. Call this method when collection item properties change the way that
	 * it must be refiltered.
	 * @param {T} item Item to refilter.
	 */
	refilterItem: function(item) {
		var index = this.source.indexOf(item);
		if (index !== -1) {
			this.refilterAt(index);
		}
	},
	
	/**
	 * Refilters target collection. Call this method when collection items properties change the way that
	 * they must be refiltered.
	 */
	refilter: function() {
		var newFiltered = this.source.map(function(item) {
			return (this.filterItem.call(this.scope, item) !== false) ? 1 : 0;
		}, this);
		
		var removeParams = null;
		var removeParamsList = [];
		
		function flushRemove() {
			if (removeParams !== null) {
				removeParamsList.push(removeParams);
				removeParams = null;
			}
		}
		
		var targetIndex = 0;
		this.source.every(function(item, index) {
			if (this._filtered[index] === 0) {
				return;
			}
			if (newFiltered[index] === 0) {
				if (removeParams === null) {
					removeParams = new JW.AbstractArray.IndexCount(targetIndex, 0);
				}
				++removeParams.count;
				this._filtered[index] = 0;
			} else {
				flushRemove();
			}
			++targetIndex;
		}, this);
		
		flushRemove();
		
		var addParams = null;
		var addParamsList = [];
		
		function flushAdd() {
			if (addParams !== null) {
				addParamsList.push(addParams);
				addParams = null;
			}
		}
		
		var targetIndex = 0;
		this.source.every(function(item, index) {
			if (this._filtered[index] === 1) {
				flushAdd();
				++targetIndex;
				return;
			}
			if (newFiltered[index] === 1) {
				if (addParams === null) {
					addParams = new JW.AbstractArray.IndexItems(targetIndex, []);
				}
				addParams.items.push(item);
				this._filtered[index] = 1;
				++targetIndex;
			} else {
				flushAdd();
			}
		}, this);
		
		flushAdd();
		
		this._filtered = newFiltered;
		this.target.trySplice(removeParamsList, addParamsList);
	}
});
;
/*
	jWidget Lib source file.
	
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

/**
 * @class
 *
 * `<T> extends JW.AbstractCollection.Indexer<T, JW.AbstractArray<T>>`
 *
 * See JW.AbstractCollection.Indexer for details.
 *
 * @extends JW.AbstractCollection.Indexer
 *
 * @constructor
 * Creates synchronizer. JW.AbstractCollection#createIndexer method is preferrable instead.
 * @param {JW.AbstractArray} source `<T>` Source collection.
 * @param {Object} config Configuration (see Config options).
 */
JW.AbstractArray.Indexer = function(source, config) {
	JW.AbstractArray.Indexer._super.call(this, source, config);
};

JW.extend(JW.AbstractArray.Indexer, JW.AbstractCollection.Indexer, {
	/**
	 * @property {JW.AbstractArray} source `<T>` Source collection.
	 */
});
;
/*
	jWidget Lib source file.
	
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

/**
 * @class
 *
 * `<T>`
 *
 * View synchronizer with array. Listens all array events and reduces them to 2 granular functions:
 * item is added into specific position and item is removed from specific position. In optimization purposes,
 * you can define a third function: array is cleared
 * (in case if there is more effective clearing algorithm than iterative items deletion).
 * Unlike JW.AbstractCollection.Observer, tracks items order.
 *
 * Use JW.AbstractArray#createInserter method to create the synchronizer.
 *
 *     var inserter = array.{@link JW.AbstractArray#createInserter createInserter}({
 *         {@link #cfg-addItem addItem}: function(item, index) { this.store.insert(item, index); },
 *         {@link #cfg-removeItem removeItem}: function(item, index) { this.store.remove(index); },
 *         {@link #cfg-scope scope}: this
 *     });
 *
 * The method will select which synchronizer implementation fits better (simple or observable).
 *
 * Synchronizer rules:
 *
 * - Function {@link #cfg-addItem} is called for all items of source array on synchronizer initialization.
 * - Function {@link #cfg-clearItems} is called for array, or function {@link #cfg-removeItem} is called for
 * all items of source array on synchronizer destruction.
 * - On source array reordering, items order is synchorinized by callback functions calls.
 *
 * @extends JW.Class
 *
 * @constructor
 * Creates synchronizer. JW.AbstractArray#createInserter method is preferrable instead.
 * @param {JW.AbstractArray} source `<T>` Source array.
 * @param {Object} config Configuration (see Config options).
 */
JW.AbstractArray.Inserter = function(source, config) {
	JW.AbstractArray.Inserter._super.call(this);
	config = config || {};
	this.source = source;
	this.addItem = config.addItem;
	this.removeItem = config.removeItem;
	this.clearItems = config.clearItems;
	this.scope = config.scope || this;
	this._addItems(this.source.getItems(), 0);
};

JW.extend(JW.AbstractArray.Inserter, JW.Class, {
	/**
	 * @cfg {Function} addItem
	 *
	 * `addItem(item: T, index: number): void`
	 *
	 * Item is added to specific position in array.
	 */
	/**
	 * @cfg {Function} removeItem
	 *
	 * `removeItem(item: T, index: number): void`
	 *
	 * Item is removed from specific position in array.
	 */
	/**
	 * @cfg {Function} clearItems
	 *
	 * `clearItems(items: Array<T>): void`
	 *
	 * Array is cleared. By default, calls {@link #removeItem} for all array items.
	 */
	/**
	 * @cfg {Object} scope {@link #addItem}, {@link #removeItem}, {@link #clearItems} call scope.
	 */
	/**
	 * @property {JW.AbstractArray} source `<T>` Source array.
	 */
	
	destroyObject: function() {
		this._clearItems(this.source.getItems());
		this.source = null;
		this.addItem = null;
		this.removeItem = null;
		this.clearItems = null;
		this.scope = null;
		this._super();
	},
	
	_addItems: function(items, index) {
		if (!this.addItem) {
			return;
		}
		for (var i = 0; i < items.length; ++i) {
			this.addItem.call(this.scope, items[i], i + index);
		}
	},
	
	_removeItems: function(items, index) {
		if (!this.removeItem) {
			return;
		}
		for (var i = items.length - 1; i >= 0; --i) {
			this.removeItem.call(this.scope, items[i], i + index);
		}
	},
	
	_clearItems: function(items) {
		if (items.length === 0) {
			return;
		}
		if (this.clearItems) {
			this.clearItems.call(this.scope || this, items);
		} else {
			this._removeItems(items, 0);
		}
	}
});
;
/*
	jWidget Lib source file.
	
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

/**
 * @class
 *
 * `<T extends JW.Class> extends JW.AbstractCollection.Lister<T, JW.AbstractArray<T>>`
 *
 * See JW.AbstractCollection.Lister for details.
 *
 * @extends JW.AbstractCollection.Lister
 *
 * @constructor
 * Creates synchronizer. JW.AbstractCollection#createLister method is preferrable instead.
 * @param {JW.AbstractArray} source `<T>` Source collection.
 * @param {Object} [config] Configuration (see Config options).
 */
JW.AbstractArray.Lister = function(source, config) {
	JW.AbstractArray.Lister._super.call(this, source, config);
};

JW.extend(JW.AbstractArray.Lister, JW.AbstractCollection.Lister, {
	/**
	 * @property {JW.AbstractArray} source `<T>` Source collection.
	 */
});
;
/*
	jWidget Lib source file.
	
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

/**
 * @class
 *
 * `<T, U> extends JW.AbstractCollection.Mapper<T, U, JW.AbstractArray<T>, JW.AbstractArray<U>>`
 *
 * See JW.AbstractCollection.Mapper for details.
 *
 * @extends JW.AbstractCollection.Mapper
 *
 * @constructor
 * Creates synchronizer. JW.AbstractCollection#createMapper method is preferrable instead.
 * @param {JW.AbstractArray} source `<T>` Source collection.
 * @param {Object} config Configuration (see Config options).
 */
JW.AbstractArray.Mapper = function(source, config) {
	JW.AbstractArray.Mapper._super.call(this, source, config);
	this.target.tryAddAll(this._createItems(this.source.getItems()));
};

JW.extend(JW.AbstractArray.Mapper, JW.AbstractCollection.Mapper, {
	/**
	 * @cfg {JW.AbstractArray} target `<U>` Target array.
	 */
	/**
	 * @property {JW.AbstractArray} source `<T>` Source array.
	 */
	/**
	 * @property {JW.AbstractArray} target `<U>` Target array.
	 */
	
	// override
	destroyObject: function() {
		this._destroyItems(this.target.clear(), this.source.getItems());
		this._super();
	},
	
	_createItems: function(datas) {
		var items = [];
		for (var i = 0, l = datas.length; i < l; ++i) {
			items.push(this.createItem.call(this.scope, datas[i]));
		}
		return items;
	},
	
	_destroyItems: function(items, datas) {
		if (this.destroyItem === undefined) {
			return;
		}
		for (var i = items.length - 1; i >= 0; --i) {
			this.destroyItem.call(this.scope, items[i], datas[i]);
		}
	}
});
;
/*
	jWidget Lib source file.
	
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

/**
 * @class
 *
 * `<T>`
 *
 * Arrays merger. Builds array consisting of all source collections items in the same order.
 * If any of the original collections is observable, starts continuous synchronization.
 *
 *     var source = new JW.ObservableArray([
 *         new JW.Array([1, 2, 3]),
 *         new JW.ObservableArray(),
 *         new JW.Array([4])
 *     ]);
 *     var merger = source.{@link JW.AbstractArray#createMerger createMerger}();
 *     var target = merger.{@link #property-target target};
 *     assert(target.{@link JW.AbstractArray#equal equal}([1, 2, 3, 4]));
 *
 *     source.{@link JW.AbstractArray#add add}(new JW.Array([5, 6]));
 *     assert(target.{@link JW.AbstractArray#equal equal}([1, 2, 3, 4, 5, 6]));
 *
 *     source.{@link JW.AbstractArray#get get}(1).{@link JW.AbstractArray#addAll addAll}([7, 8, 9]);
 *     assert(target.{@link JW.AbstractArray#equal equal}([1, 2, 3, 7, 8, 9, 4, 5, 6]));
 *
 *     merger.{@link JW.AbstractArray.Merger#destroy destroy}();
 * 
 * Use JW.AbstractArray#createMerger method to create the synchronizer.
 * The method will select which synchronizer implementation fits better (simple or observable).
 *
 * You can pass target array in config option:
 *
 *     var source = new JW.Array();
 *     var target = new JW.Array();
 *     var merger = source.{@link JW.AbstractArray#createMerger createMerger}({
 *         {@link #cfg-target target}: target
 *     });
 *
 * In simple cases, JW.AbstractArray#$$merge shorthand can be used instead. It returns the target array right away:
 *
 *     var source = new JW.ObservableArray([
 *         new JW.Array([1, 2, 3]),
 *         new JW.ObservableArray(),
 *         new JW.Array([4])
 *     ]);
 *     var target = source.{@link JW.AbstractArray#$$merge $$merge}();
 *     assert(target.{@link JW.AbstractArray#equal equal}([1, 2, 3, 4]));
 *
 *     source.{@link JW.AbstractArray#add add}(new JW.Array([5, 6]));
 *     assert(target.{@link JW.AbstractArray#equal equal}([1, 2, 3, 4, 5, 6]));
 *
 *     source.{@link JW.AbstractArray#get get}(1).{@link JW.AbstractArray#addAll addAll}([7, 8, 9]);
 *     assert(target.{@link JW.AbstractArray#equal equal}([1, 2, 3, 7, 8, 9, 4, 5, 6]));
 *
 *     target.{@link JW.AbstractArray#destroy destroy}();
 *
 * Synchronizer rules:
 *
 * - Target array is stored in {@link #property-target} property.
 * - Target array must be empty before initialization.
 * - You can't modify target array manually and/or create other synchronizers with the same target array.
 * - All items of source arrays are added to {@link #property-target}
 * immediately on synchronizer initialization.
 * - All items are removed from {@link #property-target} on synchronizer destruction.
 * - You can pass target array in {@link #cfg-target} config option.
 * In this case, you are responsible for its destruction (though items will be removed
 * automatically on synchronizer destruction anyway).
 * - If {@link #cfg-target} is not passed, it will be created automatically. Synchronizer will select
 * appropriate {@link #property-target} implementation (simple or observable). In this
 * case, {@link #property-target} will be destroyed automatically on synchronizer destruction.
 *
 * @extends JW.Class
 *
 * @constructor
 * Creates synchronizer. JW.AbstractArray#createMerger method is preferrable instead.
 * @param {JW.AbstractArray} source `<T>` Source array.
 * @param {Object} [config] Configuration (see Config options).
 */
JW.AbstractArray.Merger = function(source, config) {
	JW.AbstractArray.Merger._super.call(this);
	config = config || {};
	this.source = source;
	this._targetCreated = config.target == null;
	this.target = this._targetCreated ? source._createMergerTarget() : config.target;
	this._bunches = source.$$mapObjects(function(bunch) {
		return bunch.createMergerBunch(this);
	}, this);
	this.target.tryAddAll(this._getAllItems());
};

JW.extend(JW.AbstractArray.Merger, JW.Class, {
	/**
	 * @cfg {JW.AbstractArray} target `<T>` Target array.
	 */
	/**
	 * @property {JW.AbstractArray} source `<? extends JW.AbstractArray<T>>` Source array.
	 */
	/**
	 * @property {JW.AbstractArray} target `<T>` Target array.
	 */
	
	// override
	destroyObject: function() {
		this.target.tryClear();
		this._bunches.destroy();
		if (this._targetCreated) {
			this.target.destroy();
		}
		this.source = null;
		this.target = null;
		this._bunches = null;
		this._super();
	},
	
	_getAllItems: function() {
		return this._merge(this.source.getItems());
	},
	
	_merge: function(bunches) {
		var items = new Array(this._count(bunches));
		var iItems = 0;
		for (var i = 0, l = bunches.length; i < l; ++i) {
			var bunch = bunches[i].getItems();
			for (var j = 0, m = bunch.length; j < m; ++j) {
				items[iItems++] = bunch[j];
			}
		}
		return items;
	},
	
	_count: function(bunches, index, length) {
		if (index === undefined) {
			index = 0;
		}
		if (length === undefined) {
			length = bunches.length - index;
		}
		var count = 0;
		for (var i = 0; i < length; ++i) {
			count += bunches[index + i].getLength();
		}
		return count;
	}
});
;
/*
	jWidget Lib source file.
	
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

JW.AbstractArray.Merger.Bunch = function(merger, bunch) {
	JW.AbstractArray.Merger.Bunch._super.call(this);
};

JW.extend(JW.AbstractArray.Merger.Bunch, JW.Class);
;
/*
	jWidget Lib source file.
	
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

/**
 * @class
 *
 * `<T> extends JW.AbstractCollection.Observer<T, JW.AbstractArray<T>>`
 *
 * See JW.AbstractCollection.Observer for details.
 *
 * @extends JW.AbstractCollection.Observer
 *
 * @constructor
 * Creates synchronizer. JW.AbstractCollection#createObserver method is preferrable instead.
 * @param {JW.AbstractArray} source `<T>` Source collection.
 * @param {Object} config Configuration (see Config options).
 */
JW.AbstractArray.Observer = function(source, config) {
	JW.AbstractArray.Observer._super.call(this, source, config);
};

JW.extend(JW.AbstractArray.Observer, JW.AbstractCollection.Observer, {
	/**
	 * @property {JW.AbstractArray} source `<T>` Source collection.
	 */
});
;
/*
	jWidget Lib source file.
	
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

/**
 * @class
 *
 * `<T extends JW.Class> extends JW.AbstractCollection.Orderer<T, JW.AbstractArray<T>>`
 *
 * See JW.AbstractCollection.Orderer for details.
 *
 * @extends JW.AbstractCollection.Orderer
 *
 * @constructor
 * Creates synchronizer. JW.AbstractCollection#createOrderer method is preferrable instead.
 * @param {JW.AbstractArray} source `<T>` Source collection.
 * @param {Object} [config] Configuration (see Config options).
 */
JW.AbstractArray.Orderer = function(source, config) {
	JW.AbstractArray.Orderer._super.call(this, source, config);
};

JW.extend(JW.AbstractArray.Orderer, JW.AbstractCollection.Orderer, {
	/**
	 * @property {JW.AbstractArray} source `<T>` Source collection.
	 */
});
;
/*
	jWidget Lib source file.
	
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

/**
 * @class
 *
 * `<T>`
 *
 * Array reverser. Builds array containing all items of source array in reversed order.
 * If original collection is observable, starts continuous synchronization.
 *
 *     var source = new JW.ObservableArray([1, 2, 3]);
 *     var reverser = source.{@link JW.AbstractArray#createReverser createReverser}();
 *     var target = reverser.{@link #property-target target};
 *     assert(target.{@link JW.AbstractArray#equal equal}([3, 2, 1]));
 *
 *     source.{@link JW.AbstractArray#add add}(4);
 *     assert(target.{@link JW.AbstractArray#equal equal}([4, 3, 2, 1]));
 *
 *     source.{@link JW.AbstractArray#remove remove}(2);
 *     assert(target.{@link JW.AbstractArray#equal equal}([4, 2, 1]));
 *
 *     reverser.{@link JW.AbstractArray.Reverser#destroy destroy}();
 * 
 * Use JW.AbstractArray#createReverser method to create the synchronizer.
 * The method will select which synchronizer implementation fits better (simple or observable).
 *
 * You can pass target array in config option:
 *
 *     var source = new JW.Array();
 *     var target = new JW.Array();
 *     var reverser = source.{@link JW.AbstractArray#createReverser createReverser}({
 *         {@link #cfg-target target}: target
 *     });
 *
 * In simple cases, JW.AbstractArray#$$toReversed shorthand can be used instead. It returns the target array right away:
 *
 *     var source = new JW.ObservableArray([1, 2, 3]);
 *     var target = source.{@link JW.AbstractArray#$$toReversed $$toReversed}();
 *     assert(target.{@link JW.AbstractArray#equal equal}([3, 2, 1]));
 *
 *     source.{@link JW.AbstractArray#add add}(4);
 *     assert(target.{@link JW.AbstractArray#equal equal}([4, 3, 2, 1]));
 *
 *     source.{@link JW.AbstractArray#remove remove}(2);
 *     assert(target.{@link JW.AbstractArray#equal equal}([4, 2, 1]));
 *
 *     target.{@link JW.AbstractArray#destroy destroy}();
 *
 * Synchronizer rules:
 *
 * - Target array is stored in {@link #property-target} property.
 * - Target array must be empty before initialization.
 * - You can't modify target array manually and/or create other synchronizers with the same target array.
 * - All items of source array are added to {@link #property-target}
 * immediately on synchronizer initialization.
 * - All items are removed from {@link #property-target} on synchronizer destruction.
 * - You can pass target array in {@link #cfg-target} config option.
 * In this case, you are responsible for its destruction (though items will be removed
 * automatically on synchronizer destruction anyway).
 * - If {@link #cfg-target} is not passed, it will be created automatically. Synchronizer will select
 * appropriate {@link #property-target} implementation (simple or observable). In this
 * case, {@link #property-target} will be destroyed automatically on synchronizer destruction.
 *
 * @extends JW.Class
 *
 * @constructor
 * Creates synchronizer. JW.AbstractArray#createReverser method is preferrable instead.
 * @param {JW.AbstractArray} source `<T>` Source array.
 * @param {Object} [config] Configuration (see Config options).
 */
JW.AbstractArray.Reverser = function(source, config) {
	JW.AbstractArray.Reverser._super.call(this);
	config = config || {};
	this.source = source;
	this._targetCreated = config.target == null;
	this.target = this._targetCreated ? source.createEmpty() : config.target;
	this.target.tryAddAll(this._reverse(source.getItems()));
};

JW.extend(JW.AbstractArray.Reverser, JW.Class, {
	/**
	 * @cfg {JW.AbstractArray} target `<T>` Target array.
	 */
	/**
	 * @property {JW.AbstractArray} source `<T>` Source array.
	 */
	/**
	 * @property {JW.AbstractArray} target `<T>` Target array.
	 */
	
	// override
	destroyObject: function() {
		this.target.tryClear();
		if (this._targetCreated) {
			this.target.destroy();
		}
		this.source = null;
		this.target = null;
		this._super();
	},
	
	_reverse: function(items) {
		items = items.concat();
		items.reverse();
		return items;
	}
});
;
/*
	jWidget Lib source file.
	
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

/**
 * @class
 *
 * `<T> extends JW.AbstractCollection.SorterComparing<T, JW.AbstractArray<T>>`
 *
 * See JW.AbstractCollection.SorterComparing for details.
 *
 * @extends JW.AbstractCollection.SorterComparing
 *
 * @constructor
 * Creates synchronizer. JW.AbstractCollection#createSorterComparing method is preferrable instead.
 * @param {JW.AbstractArray} source `<T>` Source collection.
 * @param {Object} config Configuration (see Config options).
 */
JW.AbstractArray.SorterComparing = function(source, config) {
	JW.AbstractArray.SorterComparing._super.call(this, source, config);
};

JW.extend(JW.AbstractArray.SorterComparing, JW.AbstractCollection.SorterComparing, {
	/**
	 * @property {JW.AbstractArray} source `<T>` Source collection.
	 */
});
;
/*
	jWidget Lib source file.

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

JW.AbstractArray.Splitter = function(source, config) {
	JW.AbstractArray.Splitter._super.call(this);
	config = config || {};
	this.source = source;
	this.rows = config.rows || this.own(this.source.createEmpty());
	this.capacity = config.capacity || 1;
	this._length = 0;

	this.own(this.source.createInserter({
		addItem    : this._addItem,
		removeItem : this._removeItem,
		clearItems : this._clearItems,
		scope      : this
	}));
};

JW.extend(JW.AbstractArray.Splitter/*<T extends Any, R extends JW.AbstractArray<T>>*/, JW.Class, {
	/*
	Required
	JW.AbstractArray<T> source;

	Optional
	JW.AbstractArray<R> rows;
	number capacity;

	Fields
	number _length;
	*/

	createRow: function() {
		return this.source.createEmpty();
	},

	destroyRow: function(row) {
		row.destroy();
	},

	_addItem: function(item, index) {
		if (this._length % this.capacity === 0) {
			this.rows.tryAdd(this.createRow.call(this.scope || this));
		}
		var firstRow = Math.floor(index / this.capacity);
		for (var i = this.rows.getLength() - 1; i > firstRow; --i) {
			var broughtItem = this.rows.get(i - 1).tryRemove(this.capacity - 1);
			this.rows.get(i).tryAdd(broughtItem, 0);
		}
		this.rows.get(firstRow).tryAdd(item, index % this.capacity);
		++this._length;
	},

	_removeItem: function(item, index) {
		var firstRow = Math.floor(index / this.capacity);
		this.rows.get(firstRow).tryRemove(index % this.capacity);
		for (var i = firstRow + 1; i < this.rows.getLength(); ++i) {
			var broughtItem = this.rows.get(i).tryRemove(0);
			this.rows.get(i - 1).tryAdd(broughtItem, this.capacity - 1);
		}
		--this._length;
		if (this._length % this.capacity === 0) {
			this.destroyRow.call(this.scope || this, this.rows.tryRemove(this.rows.getLength() - 1));
		}
	},

	_clearItems: function() {
		var rows = this.rows.tryClear();
		this._length = 0;
		JW.Array.each(rows, this.destroyRow, this.scope || this);
	}
});
;
/*
	jWidget Lib source file.

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

/**
 * @class
 *
 * `<T> extends JW.IndexedCollection<string, T>`
 *
 * Map is unordered collection. Each item has its own string key.
 *
 * # Map methods
 *
 * **Difference compared to JW.IndexedCollection is in bold.**
 *
 * Content retrieving:
 *
 * - {@link #getLength} - Returns count of items in collection. For observable collections, `length` property may come
 * in handy if you want to track collection length dynamically.
 * - {@link #isEmpty} - Checks collection for emptiness.
 * - {@link #get} - Returns collection item by key.
 * - {@link #getFirst} - Returns first item in collection.
 * - {@link #getFirstKey} - Returns key of first item in collection.
 * - {@link #getKeys}, #$getKeys - Returns array of all item keys.
 * - {@link #containsItem} - Does collection contain the item?
 * - {@link #containsKey} - Does collection contain the key?
 * - {@link #keyOf} - Returns item key. If item is not found, returns `undefined`.
 * - **{@link #getJson} - Returns internal representation of map.**
 *
 * Iteration algorhitms:
 *
 * - {@link #every} - Checks all items by criteria.
 * Returns `true` if all items match the criteria.
 * - {@link #some} - Checks each item by criteria.
 * Returns `true` if some items matches the criteria.
 * - {@link #each} - Iterates items.
 * - {@link #search} - Finds item by criteria.
 * Returns first item matching the criteria.
 * - {@link #find} - Finds item by criteria.
 * Returns index of first item matching the criteria.
 * - {@link #filter}, #$filter, #$$filter - Filters collection by criteria.
 * Builds new collection of the same type, consisting of items matching the criteria.
 * - {@link #count}, #$count, #$$count - Counts the items matching criteria.
 * - {@link #map}, #$map, #$$mapValues, #$$mapObjects - Maps collection items.
 * Builds new collection of the same type, consisting of results of mapping function call for each collection item.
 * - {@link #toSorted}, #$toSorted, #toSortedComparing, #$toSortedComparing, #$$toSortedComparing -
 * Builds array consisting of collection items sorted by indexer or comparer.
 * - {@link #getSortingKeys}, #$getSortingKeys, #getSortingKeysComparing, #$getSortingKeysComparing -
 * Returns indexes of collection items sorted by indexer or comparer.
 * - {@link #index}, #$index, #$$index - Indexes collection.
 * Builds new map by rule: key is the result of indexer function call, value is the corresponding item.
 * - {@link #toArray}, #$toArray, #$$toArray - Builds new array consisting of collection items.
 * - {@link #toMap}, #$toMap - Builds new map consisting of collection items.
 * - {@link #toSet}, #$toSet, #$$toSet - Builds new set consisting of collection items.
 * - {@link #asArray}, #$asArray - Represents collection as array.
 * - {@link #asMap}, #$asMap - Represents collection as map.
 * - {@link #asSet}, #$asSet - Represents collection as set.
 *
 * Collection modification:
 *
 * - {@link #set}, #trySet - Adds or replaces an item by key.
 * - **{@link #setAll}, #setAllVerbose, #trySetAll - Adds or replaces a bunch of items.**
 * - {@link #remove}, #tryRemove - Removes an item by key.
 * - **{@link #removeAll}, #removeAllVerbose, #$removeAllVerbose, #tryRemoveAll - Removes a bunch of items.**
 * - {@link #removeItem} - Removes first occurency of an item in collection.
 * - {@link #removeItems} - Removes all occurencies of items in collection.
 * - **{@link #setKey}, #trySetKey - Changes item key.**
 * - {@link #clear}, #$clear, #tryClear - Clears collection.
 * - **{@link #splice}, #trySplice - Removes and adds bunches of items.**
 * - **{@link #reindex}, #tryReindex - Changes item keys.**
 * - **{@link #performSplice} - Adjusts contents using #splice method.**
 * - **{@link #performReindex} - Adjusts contents using #reindex method.**
 *
 * Synchronizers creation:
 *
 * - {@link #createMapper} - Creates item mapper. Extended version of #$$mapValues and #$$mapObjects methods.
 * - {@link #createFilterer} - Creates filterer. Extended version of #$$filter method.
 * - {@link #createCounter} - Creates matching item counter. Extended version of #$$count method.
 * - {@link #createLister} - Creates converter to set. Extended version of #$$toSet method.
 * - {@link #createIndexer} - Creates converter to map (indexer). Extended version of #$$index method.
 * - {@link #createOrderer} - Creates converter to array (orderer). Extended version of #$$toArray method.
 * - {@link #createSorterComparing} - Creates converter to array (sorter by comparer). Extended version of #$$toSortedComparing method.
 * - {@link #createObserver} - Creates observer.
 * - **{@link #createInserter} - Creates view synchronizer with map.**
 *
 * Similar collection creation (for algorithms and synchronizers implementation):
 *
 * - {@link #createEmpty} - Creates empty collection of the same type.
 * - {@link #createEmptyArray} - Creates empty array of the same observability level.
 * - {@link #createEmptyMap} - Creates empty map of the same observability level.
 * - {@link #createEmptySet} - Creates empty set of the same observability level.
 *
 * Other methods:
 *
 * - **{@link #detectSplice} - Detects #splice method arguments to adjust contents.**
 * - **{@link #detectReindex} - Detects #reindex method arguments to adjust contents.**
 * - **{@link #equal} - Checks for equality to another map.**
 *
 * All the same algorithms are also available for native JavaScript Object as map, see JW.Map static methods.
 *
 * @extends JW.IndexedCollection
 * @abstract
 */
JW.AbstractMap = function(json, adapter) {
	JW.AbstractMap._super.call(this);
	this._adapter = !!adapter;
	this.json = this._adapter ? json : json ? JW.apply({}, json) : {};
	this._length = JW.Map.getLength(this.json);
	this.getKey = null;
};

JW.extend(JW.AbstractMap, JW.IndexedCollection, {
	/**
	 * @property {Function} getKey
	 *
	 * `getKey(item: T): number/string`
	 *
	 * Function which returns unique key of an item in this collection.
	 * Function is used by #detectReindex, #performReindex algorithms.
	 * Defaults to JW.iid.
	 * If collection consists of instances of JW.Class, then it's all right.
	 */
	/**
	 * @method getFirstKey
	 * Returns key of first collection item. If collection is empty, returns `undefined`.
	 * @returns {string} Key.
	 */
	/**
	 * @method containsKey
	 * Checks existance of item with specified index in collection.
	 * @param {string} key Key.
	 * @returns {boolean} Collection contains item with specified key.
	 */
	/**
	 * @method keyOf
	 * Returns index of item in collection. If such item doesn't exist, returns `undefined`.
	 * @param {T} item Item.
	 * @returns {string} Item key.
	 */

	/**
	 * Returns item map - internal collection representation.
	 *
	 * **Caution: doesn't make a copy.**
	 *
	 * @returns {Object} `<T>` Item map.
	 */
	getJson: function() {
		return this.json;
	},

	getLength: function() {
		return this._length;
	},

	isEmpty: function() {
		return this._length === 0;
	},

	/**
	 * @method get
	 * Returns item by key. If item with such key doesn't exist, returns `undefined`.
	 * @param {string} key Key.
	 * @returns {T} Item.
	 */
	get: function(key) {
		return this.json[key];
	},

	/**
	 * @method $getKeys
	 * Returns array of keys of all collection items.
	 * @returns {JW.Array} `<string>` Keys array.
	 */
	/**
	 * Returns array of keys of all collection items.
	 * @returns {Array} `<string>` Keys array.
	 */
	getKeys: function() {
		return JW.Map.getKeys(this.json);
	},

	/**
	 * Checks all items by criteria.
	 *
	 * Returns true if function `f` returns !== `false` for all collection items.
	 *
	 * Algorithms iterates items sequentially, and stops after first item not matching the criteria.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T, key: string): boolean`
	 *
	 * Criteria.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {boolean} Result.
	 */
	every: function(callback, scope) {
		return JW.Map.every(this.json, callback, scope);
	},

	/**
	 * @method some
	 *
	 * Checks each item by criteria.
	 *
	 * Returns true if function `f` returns !== `false` for some collection item.
	 *
	 * Algorithms iterates items sequentially, and stops after first item matching the criteria.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T, key: string): boolean`
	 *
	 * Criteria.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {boolean} Result.
	 */
	/**
	 * @method each
	 *
	 * Iterates collection items. Calls specified function for all items.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T, key: string): void`
	 *
	 * Function.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {void}
	 */
	/**
	 * @method find
	 *
	 * Finds item by criteria.
	 *
	 * Returns key of first item for which `f` returns !== `false`.
	 *
	 * Algorithms iterates items sequentially, and stops after first item matching the criteria.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T, key: string): boolean`
	 *
	 * Criteria.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {string} Found item key or `undefined`.
	 */
	/**
	 * @method search
	 *
	 * Finds item by criteria.
	 *
	 * Returns first item for which `f` returns !== `false`.
	 *
	 * Algorithms iterates items sequentially, and stops after first item matching the criteria.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T, key: string): boolean`
	 *
	 * Criteria.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {T} Found item or `undefined`.
	 */
	/**
	 * @method toSorted
	 *
	 * Converts collection to sorted array.
	 *
	 * Builds array consisting of collection items sorted by result of `f` call for each item.
	 *
	 * @param {Function} [f]
	 *
	 * `f(item: T, key: string): number/string`
	 *
	 * Indexer function. Returns `item` by default.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @param {1/-1} [order] Sorting order.
	 * @returns {Array} `<T>` Sorted array.
	 */
	/**
	 * @method $toSorted
	 *
	 * Converts collection to sorted array.
	 *
	 * Builds array consisting of collection items sorted by result of `f` call for each item.
	 *
	 * @param {Function} [f]
	 *
	 * `f(item: T, key: string): number/string`
	 *
	 * Indexer function. Returns `item` by default.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @param {1/-1} [order] Sorting order.
	 * @returns {JW.Array} `<T>` Sorted array.
	 */
	/**
	 * @method toSortedComparing
	 *
	 * Converts collection to sorted array.
	 *
	 * Builds array consisting of collection items sorted by comparer.
	 *
	 * @param {Function} [compare]
	 *
	 * `f(t1: T, t2: T, k1: string, k2: string): number`
	 *
	 * Comparer function. Returns positive value if t1 > t2; nagative value if t1 < t2; 0 if t1 == t2.
	 * Defaults to `JW.cmp(t1, t2)`.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @param {1/-1} [order] Sorting order.
	 * @returns {Array} `<T>` Sorted array.
	 */
	/**
	 * @method $toSortedComparing
	 *
	 * Converts collection to sorted array.
	 *
	 * Builds array consisting of collection items sorted by comparer.
	 *
	 * @param {Function} [compare]
	 *
	 * `f(t1: T, t2: T, k1: string, k2: string): number`
	 *
	 * Comparer function. Returns positive value if t1 > t2; nagative value if t1 < t2; 0 if t1 == t2.
	 * Defaults to `JW.cmp(t1, t2)`.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @param {1/-1} [order] Sorting order.
	 * @returns {JW.Array} `<T>` Sorted array.
	 */
	/**
	 * @method getSortingKeys
	 *
	 * Returns keys of sorted items.
	 *
	 * Builds array of item keys, sorted by result of `f` call for each item.
	 *
	 * @param {Function} [f]
	 *
	 * `f(item: T, key: string): number/string`
	 *
	 * Indexer function. Returns `item` by default.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @param {1/-1} [order] Sorting order.
	 * @returns {Array} `<string>` Sorted item keys array.
	 */
	/**
	 * @method $getSortingKeys
	 *
	 * Returns keys of sorted items.
	 *
	 * Builds array of item keys, sorted by result of `f` call for each item.
	 *
	 * @param {Function} [f]
	 *
	 * `f(item: T, key: string): number/string`
	 *
	 * Indexer function. Returns `item` by default.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @param {1/-1} [order] Sorting order.
	 * @returns {JW.Array} `<string>` Sorted item keys array.
	 */
	/**
	 * @method getSortingKeysComparing
	 *
	 * Returns keys of sorted items.
	 *
	 * Builds array of item keys, sorted by comparer.
	 *
	 * @param {Function} [compare]
	 *
	 * `f(t1: T, t2: T, k1: string, k2: string): number`
	 *
	 * Comparer function. Returns positive value if t1 > t2; nagative value if t1 < t2; 0 if t1 == t2.
	 * Defaults to `JW.cmp(t1, t2)`.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @param {1/-1} [order] Sorting order.
	 * @returns {Array} `<string>` Sorted item keys array.
	 */
	/**
	 * @method $getSortingKeysComparing
	 *
	 * Returns keys of sorted items.
	 *
	 * Builds array of item keys, sorted by comparer.
	 *
	 * @param {Function} [compare]
	 *
	 * `f(t1: T, t2: T, k1: string, k2: string): number`
	 *
	 * Comparer function. Returns positive value if t1 > t2; nagative value if t1 < t2; 0 if t1 == t2.
	 * Defaults to `JW.cmp(t1, t2)`.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @param {1/-1} [order] Sorting order.
	 * @returns {JW.Array} `<string>` Sorted item keys array.
	 */

	/**
	 * @method index
	 *
	 * Indexes collection.
	 *
	 * Builds new map by rule: key is the result of indexer function call, value is the corresponding item.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T, key: string): string`
	 *
	 * Indexer function.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {Object} `<T>` Collection index.
	 */
	/**
	 * @method $index
	 *
	 * Indexes collection.
	 *
	 * Builds new map by rule: key is the result of indexer function call, value is the corresponding item.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T, key: string): string`
	 *
	 * Indexer function.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {JW.Map} `<T>` Collection index.
	 */
	/**
	 * @method getInverted
	 * Returns an inverted map. Keys are converted to values, and values are
	 * converted to keys. `this` must be `JW.AbstractMap<string>`.
	 * @returns {JW.AbstractMap} `<string>` The inverted map.
	 */

	/**
	 * Filters collection by criteria.
	 *
	 * Builds new collection of the same type, consisting of items for which `f` returns !== `false`.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T, key: string): boolean`
	 *
	 * Criteria.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {Object} `<T>` Filtered collection.
	 */
	filter: function(callback, scope) {
		return JW.Map.filter(this.json, callback, scope);
	},

	/**
	 * Filters collection by criteria.
	 *
	 * Builds new collection of the same type, consisting of items for which `f` returns !== `false`.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T, key: string): boolean`
	 *
	 * Criteria.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {JW.Map} `<T>` Filtered collection.
	 */
	$filter: JW.AbstractCollection._create$Map("filter"),

	count: function(callback, scope) {
		return JW.Map.count(this.json, callback, scope);
	},

	/**
	 * `<U>` Maps collection items.
	 *
	 * Builds new collection of the same type, consisting of results of `f` call for each collection item.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T, key: string): U`
	 *
	 * Mapping function.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {Object} `<U>` Mapped collection.
	 */
	map: function(callback, scope) {
		return JW.Map.map(this.json, callback, scope);
	},

	/**
	 * `<U>` Maps collection items.
	 *
	 * Builds new collection of the same type, consisting of results of `f` call for each collection item.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T, key: string): U`
	 *
	 * Mapping function.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {JW.Map} `<U>` Mapped collection.
	 */
	$map: JW.AbstractCollection._create$Map("map"),

	asMap: function() {
		return this.json;
	},

	$asMap: function() {
		return this;
	},

	/**
	 * @method set
	 * Replaces item with specified key. If map doesn't contain such key, it will be added.
	 * @param {T} item Item.
	 * @param {string} key Key.
	 * @returns {T} The replaced item.
	 */
	/**
	 * Replaces item with specified key. If map doesn't contain such key, it will be added.
	 * @param {T} item Item.
	 * @param {string} key Key.
	 * @returns {JW.Proxy} `<T>` Proxy of the replaced item. If not modified - `undefined`.
	 */
	trySet: function(item, key) {
		var result = this._trySet(item, key);
		if (result === undefined) {
			return;
		}
		var oldItem = result.get();
		if ((oldItem !== undefined) && this._ownsItems) {
			oldItem.destroy();
		}
		return result;
	},

	_trySet: function(item, key) {
		var result = JW.Map.trySet(this.json, item, key);
		if (result === undefined) {
			return;
		}
		if (result.get() === undefined) {
			++this._length;
		}
		return result;
	},

	/**
	 * Adds or replaces a bunch of items. As of jWidget 1.3, doesn't return anything for sake of performance.
	 * For old behaviour, use method {@link #setAllVerbose}.
	 * @param {Object} items Items.
	 */
	setAll: function(items) {
		for (var key in items) {
			this.trySet(items[key], key);
		}
	},

	/**
	 * Adds or replaces a bunch of items. Returns verbose result set.
	 * @param {Object} items Items.
	 * @returns {JW.AbstractMap.SpliceResult} `<T>` Result of #splice method.
	 */
	setAllVerbose: function(items) {
		var spliceResult = this.trySetAll(items);
		return (spliceResult !== undefined) ? spliceResult : new JW.AbstractMap.SpliceResult({}, {});
	},

	/**
	 * Adds or replaces a bunch of items.
	 * @param {Object} items Items.
	 * @returns {JW.AbstractMap.SpliceResult} `<T>` Result of #splice method. If not modified - `undefined`.
	 */
	trySetAll: function(items) {
		return this.trySplice([], items);
	},

	/**
	 * Changes item key in map. If collection doesn't contain `oldKey` or contains `newKey`, it will cause an error.
	 * @param {string} oldKey Old key of item.
	 * @param {string} newKey New key of item.
	 * @returns {T} Item.
	 */
	setKey: function(oldKey, newKey) {
		this.trySetKey(oldKey, newKey);
		return this.json[newKey];
	},

	/**
	 * Changes item key in map. If collection doesn't contain `oldKey` or contains `newKey`, it will cause an error.
	 * @param {string} oldKey Old key of item.
	 * @param {string} newKey New key of item.
	 * @returns {T} Item. If not modified - `undefined`.
	 */
	trySetKey: function(oldKey, newKey) {
		return JW.Map.trySetKey(this.json, oldKey, newKey);
	},

	/**
	 * @method remove
	 * Removes item with specified key if it exists in map.
	 * @param {string} key Key.
	 * @returns {T} Old collection item or `undefined`.
	 */
	/**
	 * Removes item with specified key if it exists in map.
	 * @param {string} key Key.
	 * @returns {T} Old collection item. If not modified - `undefined`.
	 */
	tryRemove: function(key) {
		var item = this._tryRemove(key);
		if ((item !== undefined) && this._ownsItems) {
			item.destroy();
		}
		return item;
	},

	_tryRemove: function(key) {
		var item = JW.Map.tryRemove(this.json, key);
		if (item === undefined) {
			return;
		}
		--this._length;
		return item;
	},

	/**
	 * Removes a bunch of items from map. As of jWidget 1.3, doesn't return anything for sake of performance.
	 * For old behaviour, use method {@link #removeAllVerbose}.
	 * @param {Array} keys `<string>` Item keys.
	 */
	removeAll: function(keys) {
		for (var i = 0, l = keys.length; i < l; ++i) {
			this.tryRemove(keys[i]);
		}
	},

	/**
	 * Removes a bunch of items from map. Returns verbose result set.
	 * @param {Array} keys `<string>` Item keys.
	 * @returns {Object} `<T>` The removed items.
	 */
	removeAllVerbose: function(keys) {
		var items = this.tryRemoveAll(keys);
		return (items !== undefined) ? items : {};
	},

	/**
	 * Removes a bunch of items from map. Returns verbose result set.
	 * @param {Array} keys `<string>` Item keys.
	 * @returns {JW.Map} `<T>` The removed items.
	 */
	$removeAllVerbose: JW.AbstractCollection._create$Map("removeAllVerbose"),

	/**
	 * Removes a bunch of items from map.
	 * @param {Array} keys `<string>` Item keys.
	 * @returns {Object} `<T>` The removed items. If not modified - `undefined`.
	 */
	tryRemoveAll: function(keys) {
		var spliceResult = this.trySplice(keys, {});
		if (spliceResult !== undefined) {
			return spliceResult.removedItems;
		}
	},

	removeItems: function(items) {
		var itemSet = new JW.Set(items);
		var newItems = this.filter(function(item) {
			return !itemSet.contains(item);
		});
		this.performSplice(newItems);
	},

	/**
	 * Clears collection.
	 * @returns {Object} `<T>` Old collection contents.
	 */
	clear: function() {
		var result = this.tryClear();
		return (result !== undefined) ? result : {};
	},

	/**
	 * Clears collection.
	 * @returns {JW.Map} `<T>` Old collection contents.
	 */
	$clear: JW.AbstractCollection._create$Map("clear"),

	/**
	 * Clears collection.
	 * @returns {Object} `<T>` Old collection contents. If not modified - `undefined`.
	 */
	tryClear: function() {
		var items = this._tryClear();
		if ((items !== undefined) && this._ownsItems) {
			JW.Array.backEvery(JW.Map.toArray(items), JW.destroy);
		}
		return items;
	},

	_tryClear: function() {
		if (this._length === 0) {
			return;
		}
		var items;
		this._length = 0;
		if (this._adapter) {
			items = JW.Map.tryClear(this.json);
		} else {
			items = this.json;
			this.json = {};
		}
		return items;
	},

	/**
	 * Removes and adds bunches of items in map. Universal optimized granular operation of removal/insertion.
	 * @param {Array} removedKeys `<string>` Keys of items to remove.
	 * @param {Object} updatedItems `<T>` Items to add/replace.
	 * @returns {JW.AbstractMap.SpliceResult} `<T>` Result.
	 */
	splice: function(removedKeys, updatedItems) {
		var spliceResult = this.trySplice(removedKeys, updatedItems);
		return (spliceResult !== undefined) ? spliceResult : new JW.AbstractMap.SpliceResult({}, {});
	},

	/**
	 * Removes and adds bunches of items in map. Universal optimized granular operation of removal/insertion.
	 * @param {Array} removedKeys `<string>` Keys of items to remove.
	 * @param {Object} updatedItems `<T>` Items to add/replace.
	 * @returns {JW.AbstractMap.SpliceResult} `<T>` Result. If not modified - `undefined`.
	 */
	trySplice: function(removedKeys, updatedItems) {
		var spliceResult = this._trySplice(removedKeys, updatedItems);
		if ((spliceResult !== undefined) && this._ownsItems) {
			JW.Array.backEvery(JW.Map.toArray(spliceResult.removedItems), JW.destroy);
		}
		return spliceResult;
	},

	_trySplice: function(removedKeys, updatedItems) {
		var spliceResult = JW.Map.trySplice(this.json, removedKeys, updatedItems);
		if (spliceResult !== undefined) {
			this._length += JW.Map.getLength(spliceResult.addedItems) - JW.Map.getLength(spliceResult.removedItems);
			return spliceResult;
		}
	},

	/**
	 * Changes item keys in map.
	 * @param {Object} keyMap `<string>` Key map. Item with key `k` will gain key `keyMap[k]`.
	 * It is neccessary to pass only changed keys, but unchanged keys or unexisting keys are acceptable as well.
	 * @returns {Object} `<T>` Map of changed keys.
	 */
	reindex: function(keyMap) {
		var result = this.tryReindex(keyMap);
		return (result !== undefined) ? result : {};
	},

	/**
	 * Changes item keys in map.
	 * @param {Object} keyMap `<string>` Key map. Item with key `k` will gain key `keyMap[k]`.
	 * It is neccessary to pass only changed keys, but unchanged keys or unexisting keys are acceptable as well.
	 * @returns {Object} `<T>` Map of changed keys. If not modified - `undefined`.
	 */
	tryReindex: function(keyMap) {
		return JW.Map.tryReindex(this.json, keyMap);
	},

	/**
	 * Detects #splice method arguments to adjust map contents to `newItems`.
	 * Determines which item bunches should be removed and which ones should be inserted/replaced, and their keys.
	 * @param {Object} newItems `<T>` New map contents.
	 * @returns {JW.AbstractMap.SpliceParams}
	 * `<T>` #splice method arguments. If no method call required - `undefined`.
	 */
	detectSplice: function(newItems) {
		return JW.Map.detectSplice(this.json, newItems);
	},

	/**
	 * Detects #reindex method arguments to adjust map contents to `newItems`.
	 * Determines which keys should be assigned to all items.
	 * If `newItems` contents differ from `this` contents, the map will be broken.
	 * @param {Object} newItems `<T>` New map contents.
	 * @param {Function} [getKey]
	 * Function which returns unique key of an item in this collection.
	 * Defaults to #getKey.
	 * If collection consists of instances of JW.Class, then it's all right.
	 * @param {Object} [scope] `getKey` call scope. Defaults to `this`.
	 * @returns {Object}
	 * `<string>` `keyMap` argument of #reindex method.
	 * If no method call required - `undefined`.
	 */
	detectReindex: function(newItems, getKey, scope) {
		return JW.Map.detectReindex(this.json, newItems, getKey || this.getKey, scope || this);
	},

	/**
	 * Adjusts map contents to `newItems` using #detectSplice and #splice methods.
	 * @param {Object} newItems `<T>` New map contents.
	 * @returns {void}
	 */
	performSplice: function(newItems) {
		var params = this.detectSplice(newItems);
		if (params !== undefined) {
			this.trySplice(params.removedKeys, params.updatedItems);
		}
	},

	/**
	 * Adjusts map contents to `newItems` using #detectReindex and #reindex methods.
	 * @param {Object} newItems `<T>` New map contents.
	 * @param {Function} [getKey]
	 * Function which returns unique key of an item in this collection.
	 * Defaults to #getKey.
	 * If collection consists of instances of JW.Class, then it's all right.
	 * @param {Object} [scope] `getKey` call scope. Defaults to `this`.
	 * @returns {void}
	 */
	performReindex: function(newItems, getKey, scope) {
		var keyMap = this.detectReindex(newItems, getKey, scope);
		if (keyMap !== undefined) {
			this.tryReindex(keyMap);
		}
	},

	getInverted: function() {
		return JW.Map.getInverted(this.json);
	},

	/**
	 * `<U>` Creates collection item mapper.
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} config Configuration (see synchronizer's Config options).
	 * @returns {JW.AbstractMap.Mapper}
	 * `<T, U>` Synchronizer.
	 */
	createMapper: function(config) {
		return new JW.AbstractMap.Mapper(this, config);
	},

	/**
	 * Creates collection filterer.
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} config Configuration (see synchronizer's Config options).
	 * @returns {JW.AbstractMap.Filterer}
	 * `<T>` Synchronizer.
	 */
	createFilterer: function(config) {
		return new JW.AbstractMap.Filterer(this, config);
	},

	/**
	 * Creates matching item counter.
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} config Configuration (see synchronizer's Config options).
	 * @returns {JW.AbstractMap.Counter}
	 * `<T>` Synchronizer.
	 */
	createCounter: function(config) {
		return new JW.AbstractMap.Counter(this, config);
	},

	/**
	 * Creates collection observer.
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} config Configuration (see synchronizer's Config options).
	 * @returns {JW.AbstractMap.Observer}
	 * `<T>` Synchronizer.
	 */
	createObserver: function(config) {
		return new JW.AbstractMap.Observer(this, config);
	},

	/**
	 * Creates collection converter to array (orderer).
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} [config] Configuration (see synchronizer's Config options).
	 * @returns {JW.AbstractMap.Orderer}
	 * `<T>` Synchronizer.
	 */
	createOrderer: function(config) {
		return new JW.AbstractMap.Orderer(this, config);
	},

	/**
	 * Creates collection converter to array (sorter by comparer).
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} config Configuration (see synchronizer's Config options).
	 * @returns {JW.AbstractMap.SorterComparing}
	 * `<T>` Synchronizer.
	 */
	createSorterComparing: function(config) {
		return new JW.AbstractMap.SorterComparing(this, config);
	},

	/**
	 * Creates collection converter to map (indexer).
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} config Configuration (see synchronizer's Config options).
	 * @returns {JW.AbstractMap.Indexer}
	 * `<T>` Synchronizer.
	 */
	createIndexer: function(config) {
		return new JW.AbstractMap.Indexer(this, config);
	},

	/**
	 * Creates collection converter to set.
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} [config] Configuration (see synchronizer's Config options).
	 * @returns {JW.AbstractMap.Lister}
	 * `<T>` Synchronizer.
	 */
	createLister: function(config) {
		return new JW.AbstractMap.Lister(this, config);
	},

	/**
	 * Creates view synchronizer with map.
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} config Configuration (see synchronizer's Config options).
	 * @returns {JW.AbstractMap.Inserter}
	 * `<T>` Synchronizer.
	 */
	createInserter: function(config) {
		return new JW.AbstractMap.Inserter(this, config);
	},

	/**
	 * Checks for equality (===) to another map, item by item.
	 * @param {Object} map `<T>` Another map.
	 * @returns {boolean} Maps are equal.
	 */
	equal: function(map) {
		return JW.Map.equal(this.json, map);
	},

	_callStatic: function(algorithm, args) {
		return JW.Map[algorithm].apply(JW.Map, [this.json].concat(JW.args(args || [])));
	}

	/**
	 * @method createEmpty
	 * `<U>` Creates empty collection of the same type.
	 * @returns {JW.AbstractMap} `<U>` Collection.
	 */
});

/**
 * @class
 * `<T>` JW.AbstractMap#splice method arguments. Returned by JW.AbstractMap#detectSplice method.
 * @extends JW.Class
 *
 * @constructor
 * @param {Array} removedKeys `<string>` Keys to remove.
 * @param {Object} updatedItems `<T>` Items to add/replace.
 */
JW.AbstractMap.SpliceParams = function(removedKeys, updatedItems) {
	JW.AbstractMap.SpliceParams._super.call(this);
	this.removedKeys = removedKeys;
	this.updatedItems = updatedItems;
};

JW.extend(JW.AbstractMap.SpliceParams, JW.Class, {
	/**
	 * @property {Array} removedKeys `<string>` Keys to remove.
	 */
	/**
	 * @property {Object} updatedItems `<T>` Items to add/replace.
	 */
});

/**
 * @class
 * `<T>` JW.AbstractMap#splice method result.
 * @extends JW.Class
 *
 * @constructor
 * @param {Object} removedItems `<T>` Removed items.
 * @param {Object} addedItems `<T>` Added items.
 */
JW.AbstractMap.SpliceResult = function(removedItems, addedItems) {
	JW.AbstractMap.SpliceResult._super.call(this);
	this.removedItems = removedItems;
	this.addedItems = addedItems;
};

JW.extend(JW.AbstractMap.SpliceResult, JW.Class, {
	/**
	 * @property {Object} removedItems `<T>` Removed items.
	 */
	/**
	 * @property {Object} addedItems `<T>` Added items.
	 */
});
;
/*
	jWidget Lib source file.

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

/**
 * @class
 *
 * `<T> extends JW.AbstractCollection.Counter<T>`
 *
 * See JW.AbstractCollection.Counter for details.
 *
 * @extends JW.AbstractCollection.Counter
 *
 * @constructor
 * Creates synchronizer. JW.AbstractCollection#createFilterer method is preferrable instead.
 * @param {JW.AbstractMap} source `<T>` Source collection.
 * @param {Object} config Configuration (see Config options).
 */
JW.AbstractMap.Counter = function(source, config) {
	JW.AbstractMap.Counter._super.call(this, source, config);
};

JW.extend(JW.AbstractMap.Counter, JW.AbstractCollection.Counter, {
	/**
	 * @property {JW.AbstractMap} source `<T>` Source collection.
	 */
});
;
/*
	jWidget Lib source file.
	
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

/**
 * @class
 *
 * `<T> extends JW.AbstractCollection.Filterer<T, JW.AbstractMap<T>>`
 *
 * See JW.AbstractCollection.Filterer for details.
 *
 * @extends JW.AbstractCollection.Filterer
 *
 * @constructor
 * Creates synchronizer. JW.AbstractCollection#createFilterer method is preferrable instead.
 * @param {JW.AbstractMap} source `<T>` Source collection.
 * @param {Object} config Configuration (see Config options).
 */
JW.AbstractMap.Filterer = function(source, config) {
	JW.AbstractMap.Filterer._super.call(this, source, config);
	this.target.trySetAll(source.filter(this.filterItem, this.scope));
};

JW.extend(JW.AbstractMap.Filterer, JW.AbstractCollection.Filterer, {
	/**
	 * @cfg {JW.AbstractMap} target `<T>` Target collection.
	 */
	/**
	 * @property {JW.AbstractMap} source `<T>` Source collection.
	 */
	/**
	 * @property {JW.AbstractMap} target `<T>` Target collection.
	 */
	
	// override
	destroyObject: function() {
		this.target.tryRemoveAll(this.source.getKeys());
		this._super();
	}
});
;
/*
	jWidget Lib source file.
	
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

/**
 * @class
 *
 * `<T> extends JW.AbstractCollection.Indexer<T, JW.AbstractMap<T>>`
 *
 * See JW.AbstractCollection.Indexer for details.
 *
 * @extends JW.AbstractCollection.Indexer
 *
 * @constructor
 * Creates synchronizer. JW.AbstractCollection#createIndexer method is preferrable instead.
 * @param {JW.AbstractMap} source `<T>` Source collection.
 * @param {Object} config Configuration (see Config options).
 */
JW.AbstractMap.Indexer = function(source, config) {
	JW.AbstractMap.Indexer._super.call(this, source, config);
};

JW.extend(JW.AbstractMap.Indexer, JW.AbstractCollection.Indexer, {
	/**
	 * @property {JW.AbstractMap} source `<T>` Source collection.
	 */
});
;
/*
	jWidget Lib source file.
	
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

/**
 * @class
 *
 * `<T>`
 *
 * View synchronizer with map. Listens all map events and reduces them to 2 granular functions:
 * item is added with specific key and item is removed with specific key. In optimization purposes,
 * you can define a third function: map is cleared
 * (in case if there is more effective clearing algorithm than iterative items deletion).
 * Unlike JW.AbstractCollection.Observer, tracks items keys.
 * Can be used mainly for DOM-element synchronization with map of child elements.
 *
 * Use JW.AbstractMap#createInserter method to create the synchronizer.
 *
 *     var inserter = map.{@link JW.AbstractMap#createInserter createInserter}({
 *         {@link #cfg-addItem addItem}: function(el, key) { this.el.find("[elkey=" + key + "]").append(el); },
 *         {@link #cfg-removeItem removeItem}: function(el, key) { el.detach(); },
 *         {@link #cfg-scope scope}: this
 *     });
 *
 * The method will select which synchronizer implementation fits better (simple or observable).
 *
 * Synchronizer rules:
 *
 * - Function {@link #cfg-addItem} is called for all items of source map on synchronizer initialization.
 * - Function {@link #cfg-clearItems} is called for map, or function {@link #cfg-removeItem} is called for
 * all items of source map on synchronizer destruction.
 * - On source map reindexing, items keys are synchorinized by callback functions calls.
 *
 * @extends JW.Class
 *
 * @constructor
 * Creates synchronizer. JW.AbstractMap#createInserter method is preferrable instead.
 * @param {JW.AbstractMap} source `<T>` Source map.
 * @param {Object} config Configuration (see Config options).
 */
JW.AbstractMap.Inserter = function(source, config) {
	JW.AbstractMap.Inserter._super.call(this);
	config = config || {};
	this.source = source;
	this.addItem = config.addItem;
	this.removeItem = config.removeItem;
	this.clearItems = config.clearItems;
	this.scope = config.scope || this;
	this._addItems(this.source.getJson());
};

JW.extend(JW.AbstractMap.Inserter, JW.Class, {
	/**
	 * @cfg {Function} addItem
	 *
	 * `addItem(item: T, key: string): void`
	 *
	 * Item is added to map with specific key.
	 */
	/**
	 * @cfg {Function} removeItem
	 *
	 * `removeItem(item: T, key: string): void`
	 *
	 * Item is removed from map with specific key.
	 */
	/**
	 * @cfg {Function} clearItems
	 *
	 * `clearItems(items: Object): void`
	 *
	 * Map is cleared. By default, calls {@link #removeItem} for all map items.
	 */
	/**
	 * @cfg {Object} scope {@link #addItem}, {@link #removeItem}, {@link #clearItems} call scope.
	 */
	/**
	 * @property {JW.AbstractMap} source `<T>` Source map.
	 */
	
	destroyObject: function() {
		this._clearItems(this.source.getJson());
		this.source = null;
		this.addItem = null;
		this.removeItem = null;
		this.clearItems = null;
		this.scope = null;
		this._super();
	},
	
	_addItems: function(items) {
		if (!this.addItem) {
			return;
		}
		for (var key in items) {
			this.addItem.call(this.scope, items[key], key);
		}
	},
	
	_removeItems: function(items) {
		if (!this.removeItem) {
			return;
		}
		for (var key in items) {
			this.removeItem.call(this.scope, key, items[key]);
		}
	},
	
	_clearItems: function(items) {
		if (JW.Map.isEmpty(items)) {
			return;
		}
		if (this.clearItems) {
			this.clearItems.call(this.scope || this, items);
		} else {
			this._removeItems(items);
		}
	}
});
;
/*
	jWidget Lib source file.
	
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

/**
 * @class
 *
 * `<T extends JW.Class> extends JW.AbstractCollection.Lister<T, JW.AbstractMap<T>>`
 *
 * See JW.AbstractCollection.Lister for details.
 *
 * @extends JW.AbstractCollection.Lister
 *
 * @constructor
 * Creates synchronizer. JW.AbstractCollection#createLister method is preferrable instead.
 * @param {JW.AbstractMap} source `<T>` Source collection.
 * @param {Object} [config] Configuration (see Config options).
 */
JW.AbstractMap.Lister = function(source, config) {
	JW.AbstractMap.Lister._super.call(this, source, config);
};

JW.extend(JW.AbstractMap.Lister, JW.AbstractCollection.Lister, {
	/**
	 * @property {JW.AbstractMap} source `<T>` Source collection.
	 */
});
;
/*
	jWidget Lib source file.
	
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

/**
 * @class
 *
 * `<T, U> extends JW.AbstractCollection.Mapper<T, U, JW.AbstractMap<T>, JW.AbstractMap<U>>`
 *
 * See JW.AbstractCollection.Mapper for details.
 *
 * @extends JW.AbstractCollection.Mapper
 *
 * @constructor
 * Creates synchronizer. JW.AbstractCollection#createMapper method is preferrable instead.
 * @param {JW.AbstractMap} source `<T>` Source collection.
 * @param {Object} config Configuration (see Config options).
 */
JW.AbstractMap.Mapper = function(source, config) {
	JW.AbstractMap.Mapper._super.call(this, source, config);
	this.target.trySetAll(this._createItems(source.getJson()));
};

JW.extend(JW.AbstractMap.Mapper, JW.AbstractCollection.Mapper, {
	/**
	 * @cfg {JW.AbstractMap} target `<U>` Target collection.
	 */
	/**
	 * @property {JW.AbstractMap} source `<T>` Source collection.
	 */
	/**
	 * @property {JW.AbstractMap} target `<U>` Target collection.
	 */
	
	// override
	destroyObject: function() {
		this._destroyItems(this.target.removeAllVerbose(this.source.getKeys()), this.source.getJson());
		this._super();
	},
	
	_createItems: function(datas) {
		var items = {};
		for (var key in datas) {
			items[key] = this.createItem.call(this.scope, datas[key]);
		}
		return items;
	},
	
	_destroyItems: function(items, datas) {
		if (this.destroyItem === undefined) {
			return;
		}
		for (var key in items) {
			this.destroyItem.call(this.scope, items[key], datas[key]);
		}
	}
});
;
/*
	jWidget Lib source file.
	
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

/**
 * @class
 *
 * `<T> extends JW.AbstractCollection.Observer<T, JW.AbstractMap<T>>`
 *
 * See JW.AbstractCollection.Observer for details.
 *
 * @extends JW.AbstractCollection.Observer
 *
 * @constructor
 * Creates synchronizer. JW.AbstractCollection#createObserver method is preferrable instead.
 * @param {JW.AbstractMap} source `<T>` Source collection.
 * @param {Object} config Configuration (see Config options).
 */
JW.AbstractMap.Observer = function(source, config) {
	JW.AbstractMap.Observer._super.call(this, source, config);
};

JW.extend(JW.AbstractMap.Observer, JW.AbstractCollection.Observer, {
	/**
	 * @property {JW.AbstractMap} source `<T>` Source collection.
	 */
});
;
/*
	jWidget Lib source file.
	
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

/**
 * @class
 *
 * `<T extends JW.Class> extends JW.AbstractCollection.Orderer<T, JW.AbstractMap<T>>`
 *
 * See JW.AbstractCollection.Orderer for details.
 *
 * @extends JW.AbstractCollection.Orderer
 *
 * @constructor
 * Creates synchronizer. JW.AbstractCollection#createOrderer method is preferrable instead.
 * @param {JW.AbstractMap} source `<T>` Source collection.
 * @param {Object} [config] Configuration (see Config options).
 */
JW.AbstractMap.Orderer = function(source, config) {
	JW.AbstractMap.Orderer._super.call(this, source, config);
};

JW.extend(JW.AbstractMap.Orderer, JW.AbstractCollection.Orderer, {
	/**
	 * @property {JW.AbstractMap} source `<T>` Source collection.
	 */
});
;
/*
	jWidget Lib source file.
	
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

/**
 * @class
 *
 * `<T> extends JW.AbstractCollection.SorterComparing<T, JW.AbstractMap<T>>`
 *
 * See JW.AbstractCollection.SorterComparing for details.
 *
 * @extends JW.AbstractCollection.SorterComparing
 *
 * @constructor
 * Creates synchronizer. JW.AbstractCollection#createSorterComparing method is preferrable instead.
 * @param {JW.AbstractMap} source `<T>` Source collection.
 * @param {Object} config Configuration (see Config options).
 */
JW.AbstractMap.SorterComparing = function(source, config) {
	JW.AbstractMap.SorterComparing._super.call(this, source, config);
};

JW.extend(JW.AbstractMap.SorterComparing, JW.AbstractCollection.SorterComparing, {
	/**
	 * @property {JW.AbstractMap} source `<T>` Source collection.
	 */
});
;
/*
	jWidget Lib source file.

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

/**
 * @class
 *
 * `<T extends JW.Class> extends JW.AbstractCollection<T>`
 *
 * Set is unordered collection optimized for items adding, removal and search. Unlike
 * array and map, set can contain only JW.Class instances. Internal set representation is
 * map from item {@link JW.Class#_iid iid} to this item.
 *
 * # Set methods
 *
 * **Difference compared to JW.AbstractCollection is in bold.**
 *
 * Content retrieving:
 *
 * - {@link #getLength} - Returns count of items in collection. For observable collections, `length` property may come
 * in handy if you want to track collection length dynamically.
 * - {@link #isEmpty} - Checks collection for emptiness.
 * - {@link #getFirst} - Returns first item in collection.
 * - {@link #containsItem}, **{@link #contains}** - Does collection contain the item?
 * - **{@link #getJson} - Returns internal representation of set.**
 *
 * Iteration algorhitms:
 *
 * - {@link #every} - Checks all items by criteria.
 * Returns `true` if all items match the criteria.
 * - {@link #some} - Checks each item by criteria.
 * Returns `true` if some items matches the criteria.
 * - {@link #each} - Iterates items.
 * - {@link #search} - Finds item by criteria.
 * Returns first item matching the criteria.
 * - {@link #filter}, #$filter, #$$filter - Filters collection by criteria.
 * Builds new collection of the same type, consisting of items matching the criteria.
 * - {@link #count}, #$count, #$$count - Counts the items matching criteria.
 * - {@link #map}, #$map, #$$mapValues, #$$mapObjects - Maps collection items.
 * Builds new collection of the same type, consisting of results of mapping function call for each collection item.
 * - {@link #toSorted}, #$toSorted, #toSortedComparing, #$toSortedComparing, #$$toSortedComparing -
 * Builds array consisting of collection items sorted by indexer or comparer.
 * - {@link #index}, #$index, #$$index - Indexes collection.
 * Builds new map by rule: key is the result of indexer function call, value is the corresponding item.
 * - {@link #toArray}, #$toArray, #$$toArray - Builds new array consisting of collection items.
 * - {@link #toSet}, #$toSet, #$$toSet - Builds new set consisting of collection items.
 * - {@link #asArray}, #$asArray - Represents collection as array.
 * - {@link #asSet}, #$asSet - Represents collection as set.
 *
 * Collection modification:
 *
 * - **{@link #add}, #tryAdd - Adds item to set.**
 * - **{@link #addAll}, #$addAll, #tryAddAll - Adds multiple items to set.**
 * - **{@link #remove}, #tryRemove - Removes item from set.**
 * - **{@link #removeAll}, #$removeAll, #tryRemoveAll - Removes multiple items from set.**
 * - {@link #removeItem} - Removes first occurency of an item in collection.
 * - {@link #removeItems} - Removes all occurencies of items in collection.
 * - {@link #clear}, #$clear, #tryClear - Clears collection.
 * - **{@link #splice}, #trySplice - Removes and adds multiple items.**
 * - **{@link #performSplice} - Adjusts contents using #splice method.**
 *
 * Synchronizers creation:
 *
 * - {@link #createMapper} - Creates item mapper. Extended version of #$$mapValues and #$$mapObjects methods.
 * - {@link #createFilterer} - Creates filterer. Extended version of #$$filter method.
 * - {@link #createCounter} - Creates matching item counter. Extended version of #$$count method.
 * - {@link #createLister} - Creates converter to set. Extended version of #$$toSet method.
 * - {@link #createIndexer} - Creates converter to map (indexer). Extended version of #$$index method.
 * - {@link #createOrderer} - Creates converter to array (orderer). Extended version of #$$toArray method.
 * - {@link #createSorterComparing} - Creates converter to array (sorter by comparer). Extended version of #$$toSortedComparing method.
 * - {@link #createObserver} - Creates observer.
 *
 * Similar collection creation (for algorithms and synchronizers implementation):
 *
 * - {@link #createEmpty} - Creates empty collection of the same type.
 * - {@link #createEmptyArray} - Creates empty array of the same observability type.
 * - {@link #createEmptyMap} - Creates empty map of the same observability type.
 * - {@link #createEmptySet} - Creates empty set of the same observability type.
 *
 * Other methods:
 *
 * - **{@link #detectSplice} - Detects #splice method arguments to adjust contents.**
 * - **{@link #equal} - Checks for equality to array.**
 *
 * All the same algorithms are also available for native JavaScript Object as set, see JW.Set static methods.
 *
 * @extends JW.AbstractCollection
 * @abstract
 */
JW.AbstractSet = function(items, adapter) {
	JW.AbstractSet._super.call(this);
	this._adapter = !!adapter;
	this.json = this._adapter ? items : items ? JW.Array.index(items, JW.byField("_iid")) : {};
	this._length = JW.Set.getLength(this.json);
};

JW.extend(JW.AbstractSet, JW.AbstractCollection, {
	/**
	 * Returns item map - internal collection representation.
	 *
	 * **Caution: doesn't make a copy.**
	 *
	 * @returns {Object} `<T>` Item map.
	 */
	getJson: function() {
		return this.json;
	},

	getLength: function() {
		return this._length;
	},

	isEmpty: function() {
		return this._length === 0;
	},

	containsItem: function(item) {
		return this.json.hasOwnProperty(item._iid);
	},

	/**
	 * Checks item existance in collection. Shortcut for #containsItem.
	 * @param {T} item Item.
	 * @returns {boolean} Collection contains specified item.
	 */
	contains: function(item) {
		return this.json.hasOwnProperty(item._iid);
	},

	every: function(callback, scope) {
		return JW.Set.every(this.json, callback, scope);
	},

	/**
	 * Filters collection by criteria.
	 *
	 * Builds new collection of the same type, consisting of items for which `f` returns !== `false`.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T): boolean`
	 *
	 * Criteria.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {Object} `<T>` Filtered collection.
	 */
	filter: function(callback, scope) {
		return JW.Set.filter(this.json, callback, scope);
	},

	/**
	 * Filters collection by criteria.
	 *
	 * Builds new collection of the same type, consisting of items for which `f` returns !== `false`.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T): boolean`
	 *
	 * Criteria.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {JW.Set} `<T>` Filtered collection.
	 */
	$filter: JW.AbstractCollection._create$Set("filter"),

	count: function(callback, scope) {
		return JW.Set.count(this.json, callback, scope);
	},

	/**
	 * `<U>` Maps collection items.
	 *
	 * Builds new collection of the same type, consisting of results of `f` call for each collection item.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T): U`
	 *
	 * Mapping function.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {Object} `<U>` Mapped collection.
	 */
	map: function(callback, scope) {
		return JW.Set.map(this.json, callback, scope);
	},

	/**
	 * `<U>` Maps collection items.
	 *
	 * Builds new collection of the same type, consisting of results of `f` call for each collection item.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T): U`
	 *
	 * Mapping function.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {JW.Set} `<U>` Mapped collection.
	 */
	$map: JW.AbstractCollection._create$Set("map"),

	asSet: function() {
		return this.json;
	},

	$asSet: function() {
		return this;
	},

	/**
	 * Adds item to set if one is absent.
	 * @param {T} item Item.
	 * @returns {boolean} Item is added successfully.
	 */
	add: function(item) {
		return this.tryAdd(item) !== undefined;
	},

	/**
	 * Adds item to set if one is absent.
	 * @param {T} item Item.
	 * @returns {boolean} Item is added successfully. If not modified - `undefined`.
	 */
	tryAdd: function(item) {
		if (this.trySplice([], [item]) !== undefined) {
			return true;
		}
	},

	/**
	 * Adds multiple items to set, ones that are absent.
	 * @param {Array} items `<T>` Items.
	 * @returns {Array} `<T>` Added items.
	 */
	addAll: function(items) {
		var result = this.tryAddAll(items);
		return (result !== undefined) ? result : [];
	},

	/**
	 * Adds multiple items to set, ones that are absent.
	 * @param {Array} items `<T>` Items.
	 * @returns {JW.Array} `<T>` Added items.
	 */
	$addAll: JW.AbstractCollection._create$Array("addAll"),

	/**
	 * Adds multiple items to set, ones that are absent.
	 * @param {Array} items `<T>` Items.
	 * @returns {Array} `<T>` Added items. If not modified - `undefined`.
	 */
	tryAddAll: function(items) {
		var spliceResult = this.trySplice([], items);
		if (spliceResult !== undefined) {
			return spliceResult.addedItems;
		}
	},

	/**
	 * Removes item from set if one is present.
	 * @param {T} item Item.
	 * @returns {boolean} Item is removed successfully.
	 */
	remove: function(item) {
		return this.tryRemove(item) !== undefined;
	},

	/**
	 * Removes item from set if one is present.
	 * @param {T} item Item.
	 * @returns {boolean} Item is removed successfully. If not modified - `undefined`.
	 */
	tryRemove: function(item) {
		if (this.trySplice([item], []) !== undefined) {
			return true;
		}
	},

	removeItem: function(item) {
		this.tryRemove(item);
	},

	/**
	 * Removes multiple items from set, ones that are present.
	 * @param {Array} items `<T>` Items.
	 * @returns {Array} `<T>` Removed items.
	 */
	removeAll: function(items) {
		var result = this.tryRemoveAll(items);
		return (result !== undefined) ? result : [];
	},

	/**
	 * Removes multiple items from set, ones that are present.
	 * @param {Array} items `<T>` Items.
	 * @returns {JW.Array} `<T>` Removed items.
	 */
	$removeAll: JW.AbstractCollection._create$Array("removeAll"),

	/**
	 * Removes multiple items from set, ones that are present.
	 * @param {Array} items `<T>` Items.
	 * @returns {Array} `<T>` Removes items. If not modified - `undefined`.
	 */
	tryRemoveAll: function(items) {
		var spliceResult = this.trySplice(items, []);
		if (spliceResult !== undefined) {
			return spliceResult.removedItems;
		}
	},

	removeItems: function(items) {
		this.tryRemoveAll(items);
	},

	/**
	 * Clears collection.
	 * @returns {Array} `<T>` Old collection contents.
	 */
	clear: function() {
		var items = this.tryClear();
		return (items !== undefined) ? items : [];
	},

	/**
	 * Clears collection.
	 * @returns {JW.Array} `<T>` Old collection contents.
	 */
	$clear: JW.AbstractCollection._create$Array("clear"),

	/**
	 * Clears collection.
	 * @returns {Array} `<T>` Old collection contents. If not modified - `undefined`.
	 */
	tryClear: function() {
		var items = this._tryClear();
		if ((items !== undefined) && this._ownsItems) {
			JW.Array.backEvery(items, JW.destroy);
		}
		return items;
	},

	_tryClear: function() {
		if (this._length === 0) {
			return;
		}
		var items;
		this._length = 0;
		if (this._adapter) {
			items = JW.Set.tryClear(this.json);
		} else {
			items = this.toArray();
			this.json = {};
		}
		return items;
	},

	/**
	 * Removes and adds multiple items in set. Universal optimized granular operation of removal/insertion.
	 * @param {Array} removedItems `<T>` Items to remove.
	 * @param {Array} addedItems `<T>` Items to add.
	 * @returns {JW.AbstractSet.SpliceResult} `<T>` Result.
	 */
	splice: function(removedItems, addedItems) {
		var spliceResult = this.trySplice(removedItems, addedItems);
		return (spliceResult !== undefined) ? spliceResult : new JW.AbstractSet.SpliceResult([], []);
	},

	/**
	 * Removes and adds multiple items in map. Universal optimized granular operation of removal/insertion.
	 * @param {Array} removedItems `<T>` Items to remove.
	 * @param {Array} addedItems `<T>` Items to add.
	 * @returns {JW.AbstractSet.SpliceResult} `<T>` Result. If not modified - `undefined`.
	 */
	trySplice: function(removedItems, addedItems) {
		var spliceResult = this._trySplice(removedItems, addedItems);
		if ((spliceResult !== undefined) && this._ownsItems) {
			JW.Array.backEvery(spliceResult.removedItems, JW.destroy);
		}
		return spliceResult;
	},

	_trySplice: function(removedItems, addedItems) {
		var spliceResult = JW.Set.trySplice(this.json, removedItems, addedItems);
		if (spliceResult !== undefined) {
			this._length += spliceResult.addedItems.length - spliceResult.removedItems.length;
			return spliceResult;
		}
	},

	/**
	 * Detects #splice method arguments to adjust set contents to `newItems`.
	 * Determines which items should be removed and which ones should be added.
	 * @param {Object} newItems `<T>` New set contents.
	 * @returns {JW.AbstractMap.SpliceParams}
	 * `<T>` #splice method arguments. If no method call required - `undefined`.
	 */
	detectSplice: function(newItems) {
		return JW.Set.detectSplice(this.json, newItems);
	},

	/**
	 * Adjusts set contents to `newItems` using #detectSplice and #splice methods.
	 * @param {Object} newItems `<T>` New set contents.
	 * @returns {void}
	 */
	performSplice: function(newItems) {
		var spliceParams = this.detectSplice(newItems);
		if (spliceParams !== undefined) {
			this.trySplice(spliceParams.removedItems, spliceParams.addedItems);
		}
	},

	/**
	 * `<U>` Creates collection item mapper.
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} config Configuration (see synchronizer's Config options).
	 * @returns {JW.AbstractSet.Mapper}
	 * `<T, U>` Synchronizer.
	 */
	createMapper: function(config) {
		return new JW.AbstractSet.Mapper(this, config);
	},

	/**
	 * Creates collection filterer.
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} config Configuration (see synchronizer's Config options).
	 * @returns {JW.AbstractSet.Filterer}
	 * `<T>` Synchronizer.
	 */
	createFilterer: function(config) {
		return new JW.AbstractSet.Filterer(this, config);
	},

	/**
	 * Creates matching item counter.
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} config Configuration (see synchronizer's Config options).
	 * @returns {JW.AbstractSet.Counter}
	 * `<T>` Synchronizer.
	 */
	createCounter: function(config) {
		return new JW.AbstractSet.Counter(this, config);
	},

	/**
	 * Creates collection observer.
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} config Configuration (see synchronizer's Config options).
	 * @returns {JW.AbstractSet.Observer}
	 * `<T>` Synchronizer.
	 */
	createObserver: function(config) {
		return new JW.AbstractSet.Observer(this, config);
	},

	/**
	 * Creates collection converter to array (orderer).
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} [config] Configuration (see synchronizer's Config options).
	 * @returns {JW.AbstractSet.Orderer}
	 * `<T>` Synchronizer.
	 */
	createOrderer: function(config) {
		return new JW.AbstractSet.Orderer(this, config);
	},

	/**
	 * Creates collection converter to array (sorter by comparer).
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} config Configuration (see synchronizer's Config options).
	 * @returns {JW.AbstractSet.SorterComparing}
	 * `<T>` Synchronizer.
	 */
	createSorterComparing: function(config) {
		return new JW.AbstractSet.SorterComparing(this, config);
	},

	/**
	 * Creates collection converter to map (indexer).
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} config Configuration (see synchronizer's Config options).
	 * @returns {JW.AbstractSet.Indexer}
	 * `<T>` Synchronizer.
	 */
	createIndexer: function(config) {
		return new JW.AbstractSet.Indexer(this, config);
	},

	/**
	 * Creates collection converter to set.
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} [config] Configuration (see synchronizer's Config options).
	 * @returns {JW.AbstractSet.Lister}
	 * `<T>` Synchronizer.
	 */
	createLister: function(config) {
		return new JW.AbstractSet.Lister(this, config);
	},

	/**
	 * Checks for equality (===) to array, item by item.
	 * @param {Array} array `<T>` Array.
	 * @returns {boolean} Set is equal to array.
	 */
	equal: function(array) {
		return JW.Set.equal(this.json, array);
	},

	_callStatic: function(algorithm, args) {
		return JW.Set[algorithm].apply(JW.Set, [this.json].concat(JW.args(args || [])));
	}

	/**
	 * @method createEmpty
	 * `<U>` Creates empty collection of the same type.
	 * @returns {JW.AbstractSet} `<U>` Collection.
	 */
});

/**
 * @class
 * `<T>` JW.AbstractSet#splice method arguments. Returned by JW.AbstractSet#detectSplice method.
 * @extends JW.Class
 *
 * @constructor
 * @param {Array} removedItems `<T>` Items to remove.
 * @param {Array} addedItems `<T>` Items to add.
 */
JW.AbstractSet.SpliceParams = function(removedItems, addedItems) {
	JW.AbstractSet.SpliceParams._super.call(this);
	this.removedItems = removedItems;
	this.addedItems = addedItems;
};

JW.extend(JW.AbstractSet.SpliceParams, JW.Class, {
	/**
	 * @property {Array} removedItems `<T>` Items to remove.
	 */
	/**
	 * @property {Array} addedItems `<T>` Items to add.
	 */
});

/**
 * @class
 * `<T>` JW.AbstractSet#splice method result.
 * @extends JW.Class
 *
 * @constructor
 * @param {Array} removedItems `<T>` Removed items.
 * @param {Array} addedItems `<T>` Added items.
 */
JW.AbstractSet.SpliceResult = function(removedItems, addedItems) {
	JW.AbstractSet.SpliceResult._super.call(this);
	this.removedItems = removedItems;
	this.addedItems = addedItems;
};

JW.extend(JW.AbstractSet.SpliceResult, JW.Class, {
	/**
	 * @property {Array} removedItems `<T>` Removed items.
	 */
	/**
	 * @property {Array} addedItems `<T>` Added items.
	 */
});
;
/*
	jWidget Lib source file.

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

/**
 * @class
 *
 * `<T extends JW.Class> extends JW.AbstractCollection.Counter<T>`
 *
 * See JW.AbstractCollection.Counter for details.
 *
 * @extends JW.AbstractCollection.Counter
 *
 * @constructor
 * Creates synchronizer. JW.AbstractCollection#createCounter method is preferrable instead.
 * @param {JW.AbstractSet} source `<T>` Source collection.
 * @param {Object} config Configuration (see Config options).
 */
JW.AbstractSet.Counter = function(source, config) {
	JW.AbstractSet.Counter._super.call(this, source, config);
};

JW.extend(JW.AbstractSet.Counter, JW.AbstractCollection.Counter, {
	/**
	 * @property {JW.AbstractSet} source `<T>` Source collection.
	 */
});
;
/*
	jWidget Lib source file.
	
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

/**
 * @class
 *
 * `<T extends JW.Class> extends JW.AbstractCollection.Filterer<T, JW.AbstractSet<T>>`
 *
 * See JW.AbstractCollection.Filterer for details.
 *
 * @extends JW.AbstractCollection.Filterer
 *
 * @constructor
 * Creates synchronizer. JW.AbstractCollection#createFilterer method is preferrable instead.
 * @param {JW.AbstractSet} source `<T>` Source collection.
 * @param {Object} config Configuration (see Config options).
 */
JW.AbstractSet.Filterer = function(source, config) {
	JW.AbstractSet.Filterer._super.call(this, source, config);
	this.target.tryAddAll(source.$toArray().filter(this.filterItem, this.scope));
};

JW.extend(JW.AbstractSet.Filterer, JW.AbstractCollection.Filterer, {
	/**
	 * @cfg {JW.AbstractSet} target `<T>` Target collection.
	 */
	/**
	 * @property {JW.AbstractSet} source `<T>` Source collection.
	 */
	/**
	 * @property {JW.AbstractSet} target `<T>` Target collection.
	 */
	
	// override
	destroyObject: function() {
		this.target.tryRemoveAll(this.source.toArray());
		this._super();
	}
});
;
/*
	jWidget Lib source file.
	
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

/**
 * @class
 *
 * `<T extends JW.Class> extends JW.AbstractCollection.Indexer<T, JW.AbstractSet<T>>`
 *
 * See JW.AbstractCollection.Indexer for details.
 *
 * @extends JW.AbstractCollection.Indexer
 *
 * @constructor
 * Creates synchronizer. JW.AbstractCollection#createIndexer method is preferrable instead.
 * @param {JW.AbstractSet} source `<T>` Source collection.
 * @param {Object} config Configuration (see Config options).
 */
JW.AbstractSet.Indexer = function(source, config) {
	JW.AbstractSet.Indexer._super.call(this, source, config);
};

JW.extend(JW.AbstractSet.Indexer, JW.AbstractCollection.Indexer, {
	/**
	 * @property {JW.AbstractSet} source `<T>` Source collection.
	 */
});
;
/*
	jWidget Lib source file.
	
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

/**
 * @class
 *
 * `<T extends JW.Class> extends JW.AbstractCollection.Lister<T, JW.AbstractSet<T>>`
 *
 * See JW.AbstractCollection.Lister for details.
 *
 * @extends JW.AbstractCollection.Lister
 *
 * @constructor
 * Creates synchronizer. JW.AbstractCollection#createLister method is preferrable instead.
 * @param {JW.AbstractSet} source `<T>` Source collection.
 * @param {Object} [config] Configuration (see Config options).
 */
JW.AbstractSet.Lister = function(source, config) {
	JW.AbstractSet.Lister._super.call(this, source, config);
};

JW.extend(JW.AbstractSet.Lister, JW.AbstractCollection.Lister, {
	/**
	 * @property {JW.AbstractSet} source `<T>` Source collection.
	 */
});
;
/*
	jWidget Lib source file.
	
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

/**
 * @class
 *
 * `<T extends JW.Class, U extends JW.Class> extends JW.AbstractCollection.Mapper<T, U, JW.AbstractSet<T>, JW.AbstractSet<U>>`
 *
 * See JW.AbstractCollection.Mapper for details.
 *
 * @extends JW.AbstractCollection.Mapper
 *
 * @constructor
 * Creates synchronizer. JW.AbstractCollection#createMapper method is preferrable instead.
 * @param {JW.AbstractSet} source `<T>` Source collection.
 * @param {Object} config Configuration (see Config options).
 */
JW.AbstractSet.Mapper = function(source, config) {
	JW.AbstractSet.Mapper._super.call(this, source, config);
	this._items = {};
	this.target.tryAddAll(this._createItems(source.toArray()));
};

JW.extend(JW.AbstractSet.Mapper, JW.AbstractCollection.Mapper, {
	/**
	 * @cfg {JW.AbstractSet} target `<U>` Target collection.
	 */
	/**
	 * @property {JW.AbstractSet} source `<T>` Source collection.
	 */
	/**
	 * @property {JW.AbstractSet} target `<U>` Target collection.
	 */
	/*
	Map<T> _items;
	*/
	
	// override
	destroyObject: function() {
		var datas = this.source.toArray();
		this.target.tryRemoveAll(this._getItems(datas));
		this._destroyItems(datas);
		this._super();
	},
	
	_getItems: function(datas) {
		return JW.Array.map(datas, function(data) {
			return this._items[data._iid];
		}, this);
	},
	
	_createItems: function(datas) {
		var items = [];
		for (var i = 0, l = datas.length; i < l; ++i) {
			var data = datas[i];
			var item = this.createItem.call(this.scope || this, data);
			items.push(item);
			this._items[data._iid] = item;
		}
		return items;
	},
	
	_destroyItems: function(datas) {
		if (this.destroyItem === undefined) {
			return
		}
		for (var i = datas.length - 1; i >= 0; --i) {
			var data = datas[i];
			var iid = data._iid;
			var item = this._items[iid];
			delete this._items[iid];
			this.destroyItem.call(this.scope || this, item, data);
		}
	}
});
;
/*
	jWidget Lib source file.
	
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

/**
 * @class
 *
 * `<T extends JW.Class> extends JW.AbstractCollection.Observer<T, JW.AbstractSet<T>>`
 *
 * See JW.AbstractCollection.Observer for details.
 *
 * @extends JW.AbstractCollection.Observer
 *
 * @constructor
 * Creates synchronizer. JW.AbstractCollection#createObserver method is preferrable instead.
 * @param {JW.AbstractSet} source `<T>` Source collection.
 * @param {Object} config Configuration (see Config options).
 */
JW.AbstractSet.Observer = function(source, config) {
	JW.AbstractSet.Observer._super.call(this, source, config);
};

JW.extend(JW.AbstractSet.Observer, JW.AbstractCollection.Observer, {
	/**
	 * @property {JW.AbstractSet} source `<T>` Source collection.
	 */
});
;
/*
	jWidget Lib source file.
	
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

/**
 * @class
 *
 * `<T extends JW.Class> extends JW.AbstractCollection.Orderer<T, JW.AbstractSet<T>>`
 *
 * See JW.AbstractCollection.Orderer for details.
 *
 * @extends JW.AbstractCollection.Orderer
 *
 * @constructor
 * Creates synchronizer. JW.AbstractCollection#createOrderer method is preferrable instead.
 * @param {JW.AbstractSet} source `<T>` Source collection.
 * @param {Object} [config] Configuration (see Config options).
 */
JW.AbstractSet.Orderer = function(source, config) {
	JW.AbstractSet.Orderer._super.call(this, source, config);
};

JW.extend(JW.AbstractSet.Orderer, JW.AbstractCollection.Orderer, {
	/**
	 * @property {JW.AbstractSet} source `<T>` Source collection.
	 */
});
;
/*
	jWidget Lib source file.
	
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

/**
 * @class
 *
 * `<T extends JW.Class> extends JW.AbstractCollection.SorterComparing<T, JW.AbstractSet<T>>`
 *
 * See JW.AbstractCollection.SorterComparing for details.
 *
 * @extends JW.AbstractCollection.SorterComparing
 *
 * @constructor
 * Creates synchronizer. JW.AbstractCollection#createSorterComparing method is preferrable instead.
 * @param {JW.AbstractSet} source `<T>` Source collection.
 * @param {Object} config Configuration (see Config options).
 */
JW.AbstractSet.SorterComparing = function(source, config) {
	JW.AbstractSet.SorterComparing._super.call(this, source, config);
};

JW.extend(JW.AbstractSet.SorterComparing, JW.AbstractCollection.SorterComparing, {
	/**
	 * @property {JW.AbstractSet} source `<T>` Source collection.
	 */
});
;
/*
	JW array extension.

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

/**
 * @class
 *
 * `<T> extends JW.AbstractArray<T>`
 *
 * See structurized list of methods in JW.AbstractArray.
 * Static methods duplicate API of JW.AbstractArray, but take native Array as first argument.
 *
 * @extends JW.AbstractArray
 *
 * @constructor
 * @param {Array} [items] `<T>` Initial contents. By default, created collection is empty.
 * @param {boolean} [adapter] Create array as adapter of `items`. Defaults to false, so `items` is copied.
 */
JW.Array = function(items, adapter) {
	JW.Array._super.call(this, items, adapter);
};

JW.extend(JW.Array, JW.AbstractArray, {
	/**
	 * `<U>` Creates empty collection of the same type.
	 * @returns {JW.Array} `<U>` Collection.
	 */
	createEmpty: function() {
		return new JW.Array();
	},

	/**
	 * `<U>` Creates empty array of the same observability level.
	 * @returns {JW.Array} `<U>` Array.
	 */
	createEmptyArray: function() {
		return new JW.Array();
	},

	/**
	 * `<U>` Creates empty map of the same observability level.
	 * @returns {JW.Map} `<U>` Map.
	 */
	createEmptyMap: function() {
		return new JW.Map();
	},

	/**
	 * `<U>` Creates empty set of the same observability level.
	 * @returns {JW.Set} `<U>` Set.
	 */
	createEmptySet: function() {
		return new JW.Set();
	}

	/**
	 * @method getLength
	 * `<T>` Returns count of items in collection.
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @returns {number} Count of items in collection.
	 */
	/**
	 * @method isEmpty
	 * `<T>` Checks collection for emptiness.
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @returns {boolean} Collection doesn't contain any items.
	 */
	/**
	 * @method getFirst
	 * `<T>` Returns first item in collection. If collection is empty, returns `undefined`.
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @returns {T} Item.
	 */
	/**
	 * @method getFirstKey
	 * `<T>` Returns index of first collection item. If collection is empty, returns `undefined`.
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @returns {number} Index.
	 */
	/**
	 * @method getLast
	 * `<T>` Returns the last collection item. If collection is empty, returns `undefined`.
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @returns {T} Item.
	 */
	/**
	 * @method getLastKey
	 * `<T>` Returns index of last collection item. If collection is empty, returns `undefined`.
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @returns {number} Index.
	 */
	/**
	 * @method get
	 * `<T>` Returns item by index. If item with such index doesn't exist, returns `undefined`.
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @param {number} index Index.
	 * @returns {T} Item.
	 */
	/**
	 * @method containsKey
	 * `<T>` Checks existance of item with specified index in collection.
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @param {number} index Index.
	 * @returns {boolean} Collection contains item with specified index.
	 */
	/**
	 * @method containsItem
	 * `<T>` Checks item existance in collection.
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @param {T} item Item.
	 * @returns {boolean} Collection contains specified item.
	 */
	/**
	 * @method keyOf
	 * `<T>` Returns index of item in collection. If such item doesn't exist, returns `undefined`.
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @param {T} item Item.
	 * @returns {number} Item index.
	 */
	/**
	 * @method getKeys
	 * `<T>` Returns array of indexes of all collection items, i.e. array `[0, 1, ... , length - 1]`.
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @returns {Array} `<number>` Indexes array.
	 */
	/**
	 * @method $getKeys
	 * `<T>` Returns array of indexes of all collection items, i.e. array `[0, 1, ... , length - 1]`.
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @returns {JW.Array} `<number>` Indexes array.
	 */
	/**
	 * @method removeItem
	 * `<T>` Removes first occurency of an item in collection.
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @param {T} item Item.
	 * @returns {void}
	 */
	/**
	 * @method removeItems
	 * `<T extends JW.Class>` Removes all occurencies of items in collection.
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @param {Array} items `<T>` Items.
	 * @returns {void}
	 */
	/**
	 * @method tryClear
	 * `<T>` Clears collection.
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @returns {Array} `<T>` Old collection contents. If not modified - `undefined`.
	 */
	/**
	 * @method clear
	 * `<T>` Clears collection.
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @returns {Array} `<T>` Old collection contents.
	 */
	/**
	 * @method $clear
	 * `<T>` Clears collection.
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @returns {JW.Array} `<T>` Old collection contents.
	 */
	/**
	 * @method every
	 *
	 * `<T>` Checks all items by criteria.
	 *
	 * Returns true if function `f` returns !== `false` for all collection items.
	 *
	 * Algorithms iterates items sequentially, and stops after first item not matching the criteria.
	 *
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @param {Function} f
	 *
	 * `f(item: T, index: number): boolean`
	 *
	 * Criteria.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {boolean} Result.
	 */
	/**
	 * @method some
	 *
	 * `<T>` Checks each item by criteria.
	 *
	 * Returns true if function `f` returns !== `false` for some collection item.
	 *
	 * Algorithms iterates items sequentially, and stops after first item matching the criteria.
	 *
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @param {Function} f
	 *
	 * `f(item: T, index: number): boolean`
	 *
	 * Criteria.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {boolean} Result.
	 */
	/**
	 * @method each
	 * `<T>` Iterates collection items. Calls specified function for all items.
	 *
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @param {Function} f
	 *
	 * `f(item: T, index: number): void`
	 *
	 * Function.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {void}
	 */
	/**
	 * @method find
	 *
	 * `<T>` Finds item by criteria.
	 *
	 * Returns index of first item for which `f` returns !== `false`.
	 *
	 * Algorithms iterates items sequentially, and stops after first item matching the criteria.
	 *
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @param {Function} f
	 *
	 * `f(item: T, index: number): boolean`
	 *
	 * Criteria.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {number} Found item index or `undefined`.
	 */
	/**
	 * @method search
	 *
	 * `<T>` Finds item by criteria.
	 *
	 * Returns first item for which `f` returns !== `false`.
	 *
	 * Algorithms iterates items sequentially, and stops after first item matching the criteria.
	 *
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @param {Function} f
	 *
	 * `f(item: T, index: number): boolean`
	 *
	 * Criteria.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {T} Found item or `undefined`.
	 */
	/**
	 * @method toSorted
	 *
	 * `<T>` Converts collection to sorted array.
	 *
	 * Builds array consisting of collection items sorted by result of `f` call for each item.
	 *
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @param {Function} [f]
	 *
	 * `f(item: T, index: number): number/string`
	 *
	 * Indexer function. Returns `item` by default.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @param {1/-1} [order] Sorting order.
	 * @returns {Array} `<T>` Sorted array.
	 */
	/**
	 * @method $toSorted
	 *
	 * `<T>` Converts collection to sorted array.
	 *
	 * Builds array consisting of collection items sorted by result of `f` call for each item.
	 *
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @param {Function} [f]
	 *
	 * `f(item: T, index: number): number/string`
	 *
	 * Indexer function. Returns `item` by default.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @param {1/-1} [order] Sorting order.
	 * @returns {JW.Array} `<T>` Sorted array.
	 */
	/**
	 * @method toSortedComparing
	 *
	 * `<T>` Converts collection to sorted array.
	 *
	 * Builds array consisting of collection items sorted by comparer.
	 *
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @param {Function} [compare]
	 *
	 * `f(t1: T, t2: T, i1: number, i2: number): number`
	 *
	 * Comparer function. Returns positive value if t1 > t2; nagative value if t1 < t2; 0 if t1 == t2.
	 * Defaults to `JW.cmp(t1, t2)`.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @param {1/-1} [order] Sorting order.
	 * @returns {Array} `<T>` Sorted array.
	 */
	/**
	 * @method $toSortedComparing
	 *
	 * `<T>` Converts collection to sorted array.
	 *
	 * Builds array consisting of collection items sorted by comparer.
	 *
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @param {Function} [compare]
	 *
	 * `f(t1: T, t2: T, i1: number, i2: number): number`
	 *
	 * Comparer function. Returns positive value if t1 > t2; nagative value if t1 < t2; 0 if t1 == t2.
	 * Defaults to `JW.cmp(t1, t2)`.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @param {1/-1} [order] Sorting order.
	 * @returns {JW.Array} `<T>` Sorted array.
	 */
	/**
	 * @method getSortingKeys
	 *
	 * `<T>` Returns indexes of sorted items.
	 *
	 * Builds array of item indexes, sorted by result of `f` call for each item.
	 *
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @param {Function} [f]
	 *
	 * `f(item: T, index: number): number/string`
	 *
	 * Indexer function. Returns `item` by default.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @param {1/-1} [order] Sorting order.
	 * @returns {Array} `<number>` Sorted item indexes array.
	 */
	/**
	 * @method $getSortingKeys
	 *
	 * `<T>` Returns indexes of sorted items.
	 *
	 * Builds array of item indexes, sorted by result of `f` call for each item.
	 *
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @param {Function} [f]
	 *
	 * `f(item: T, index: number): number/string`
	 *
	 * Indexer function. Returns `item` by default.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @param {1/-1} [order] Sorting order.
	 * @returns {JW.Array} `<number>` Sorted item indexes array.
	 */
	/**
	 * @method getSortingKeysComparing
	 *
	 * `<T>` Returns indexes of sorted items.
	 *
	 * Builds array of item indexes, sorted by comparer.
	 *
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @param {Function} [compare]
	 *
	 * `f(t1: T, t2: T, i1: number, i2: number): number`
	 *
	 * Comparer function. Returns positive value if t1 > t2; nagative value if t1 < t2; 0 if t1 == t2.
	 * Defaults to `JW.cmp(t1, t2)`.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @param {1/-1} [order] Sorting order.
	 * @returns {Array} `<number>` Sorted item indexes array.
	 */
	/**
	 * @method $getSortingKeysComparing
	 *
	 * `<T>` Returns indexes of sorted items.
	 *
	 * Builds array of item indexes, sorted by comparer.
	 *
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @param {Function} [compare]
	 *
	 * `f(t1: T, t2: T, i1: number, i2: number): number`
	 *
	 * Comparer function. Returns positive value if t1 > t2; nagative value if t1 < t2; 0 if t1 == t2.
	 * Defaults to `JW.cmp(t1, t2)`.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @param {1/-1} [order] Sorting order.
	 * @returns {JW.Array} `<number>` Sorted item indexes array.
	 */
	/**
	 * @method index
	 *
	 * `<T>` Indexes collection.
	 *
	 * Builds new map by rule: key is the result of indexer function call, value is the corresponding item.
	 *
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @param {Function} f
	 *
	 * `f(item: T, index: number): string`
	 *
	 * Indexer function.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {Object} `<T>` Collection index.
	 */
	/**
	 * @method $index
	 *
	 * `<T>` Indexes collection.
	 *
	 * Builds new map by rule: key is the result of indexer function call, value is the corresponding item.
	 *
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @param {Function} f
	 *
	 * `f(item: T, index: number): string`
	 *
	 * Indexer function.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {JW.Map} `<T>` Collection index.
	 */
	/**
	 * @method toArray
	 *
	 * `<T>` Converts collection to array.
	 *
	 * Builds new array consisting of collection items.
	 *
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @returns {Array} `<T>` Items array.
	 */
	/**
	 * @method $toArray
	 *
	 * `<T>` Converts collection to array.
	 *
	 * Builds new array consisting of collection items.
	 *
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @returns {JW.Array} `<T>` Items array.
	 */
	/**
	 * @method toMap
	 *
	 * Converts collection to map.
	 *
	 * Builds new map consisting of collection items.
	 *
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @returns {Object} `<T>` Items map.
	 */
	/**
	 * @method $toMap
	 *
	 * Converts collection to map.
	 *
	 * Builds new map consisting of collection items.
	 *
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @returns {JW.Map} `<T>` Items map.
	 */
	/**
	 * @method toSet
	 *
	 * `<T>` Converts collection to set.
	 *
	 * Builds new set consisting of collection items.
	 *
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @returns {Object} `<T>` Items set.
	 */
	/**
	 * @method $toSet
	 *
	 * `<T>` Converts collection to set.
	 *
	 * Builds new set consisting of collection items.
	 *
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @returns {JW.Set} `<T>` Items set.
	 */
	/**
	 * @method asArray
	 *
	 * `<T>` Represents collection as array.
	 *
	 * If this collection is array, returns it immediately. Else, executes {@link #static-method-toArray} method.
	 * This method works probably faster than {@link #static-method-toArray}, but please make sure that the returned array
	 * won't be modified externally, because it can cause strange unexpected bugs.
	 *
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @returns {Array} `<T>` Items array.
	 */
	/**
	 * @method $asArray
	 *
	 * `<T>` Represents collection as array.
	 *
	 * If this collection is array, returns it immediately. Else, executes {@link #static-method-toArray} method.
	 * This method works probably faster than {@link #static-method-toArray}, but please make sure that the returned array
	 * won't be modified externally, because it can cause strange unexpected bugs.
	 *
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @returns {JW.Array} `<T>` Items array.
	 */
	/**
	 * @method asMap
	 *
	 * `<T>` Represents collection as map.
	 *
	 * If this collection is map, returns it immediately. Else, executes {@link #static-method-toMap} method.
	 * This method works probably faster than {@link #static-method-toMap}, but please make sure that the returned map
	 * won't be modified externally, because it can cause strange unexpected bugs.
	 *
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @returns {Object} `<T>` Items map.
	 */
	/**
	 * @method $asMap
	 *
	 * `<T>` Represents collection as map.
	 *
	 * If this collection is map, returns it immediately. Else, executes {@link #static-method-toMap} method.
	 * This method works probably faster than {@link #static-method-toMap}, but please make sure that the returned map
	 * won't be modified externally, because it can cause strange unexpected bugs.
	 *
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @returns {JW.Map} `<T>` Items map.
	 */
	/**
	 * @method asSet
	 *
	 * `<T>` Represents collection as set.
	 *
	 * If this collection is set, returns it immediately. Else, executes {@link #static-method-toSet} method.
	 * This method works probably faster than {@link #static-method-toSet}, but please make sure that the returned set
	 * won't be modified externally, because it can cause strange unexpected bugs.
	 *
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @returns {Object} `<T>` Items set.
	 */
	/**
	 * @method $asSet
	 *
	 * `<T>` Represents collection as set.
	 *
	 * If this collection is set, returns it immediately. Else, executes {@link #static-method-toSet} method.
	 * This method works probably faster than {@link #static-method-toSet}, but please make sure that the returned set
	 * won't be modified externally, because it can cause strange unexpected bugs.
	 *
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @returns {JW.Set} `<T>` Items set.
	 */
	/**
	 * @method filter
	 *
	 * `<T>` Filters collection by criteria.
	 *
	 * Builds new collection of the same type, consisting of items for which `f` returns !== `false`.
	 *
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @param {Function} f
	 *
	 * `f(item: T, index: number): boolean`
	 *
	 * Criteria.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {Array} `<T>` Filtered collection.
	 */
	/**
	 * @method $filter
	 *
	 * `<T>` Filters collection by criteria.
	 *
	 * Builds new collection of the same type, consisting of items for which `f` returns !== `false`.
	 *
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @param {Function} f
	 *
	 * `f(item: T, index: number): boolean`
	 *
	 * Criteria.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {JW.Array} `<T>` Filtered collection.
	 */
	/**
	 * @method count
	 *
	 * `<T>` Counts the items matching criteria.
	 *
	 * Returns the number of items for which `f` returns !== `false`.
	 *
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @param {Function} f
	 *
	 * `f(item: T, index: number): boolean`
	 *
	 * Criteria.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {number} Number of items.
	 */
	/**
	 * @method map
	 *
	 * `<T, U>` Maps collection items.
	 *
	 * Builds new collection of the same type, consisting of results of `f` call for each collection item.
	 *
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @param {Function} f
	 *
	 * `f(item: T, index: number): U`
	 *
	 * Mapping function.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {Array} `<U>` Mapped collection.
	 */
	/**
	 * @method $map
	 *
	 * `<T, U>` Maps collection items.
	 *
	 * Builds new collection of the same type, consisting of results of `f` call for each collection item.
	 *
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @param {Function} f
	 *
	 * `f(item: T, index: number): U`
	 *
	 * Mapping function.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {JW.Array} `<U>` Mapped collection.
	 */
	/**
	 * @method merge
	 * For `Array<Array>` only.
	 * Builds array consisting of subarray items in the same order.
	 * Original array is not modified.
	 * @static
	 * @param {Array} array Array.
	 * @returns {Array} Merged array.
	 */
	/**
	 * @method $merge
	 * For `Array<Array>` only.
	 * Builds array consisting of subarray items in the same order.
	 * Original array is not modified.
	 * @static
	 * @param {Array} array Array.
	 * @returns {JW.Array} Merged array.
	 */
	/**
	 * @method reverse
	 * `<T>` Reverses item order in array. Modifies the array itself.
	 * @static
	 * @param {Array} array `<T>` array Array.
	 */
	/**
	 * @method toReversed
	 * `<T>` Builds a new array containing items of original array in reversed order.
	 * Original array is not modified.
	 * @static
	 * @param {Array} array `<T>` array Array.
	 * @returns {Array} `<T>` Reversed array.
	 */
	/**
	 * @method $toReversed
	 * `<T>` Builds a new array containing items of original array in reversed order.
	 * Original array is not modified.
	 * @static
	 * @param {Array} array `<T>` array Array.
	 * @returns {JW.Array} `<T>` Reversed array.
	 */
	/**
	 * @method add
	 * `<T>` Inserts an item to array.
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @param {T} item Item.
	 * @param {number} [index] Index of an item before which to insert new one. By default, appends the item.
	 * @returns {void}
	 */
	/**
	 * @method tryAdd
	 * `<T>` Inserts an item to array.
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @param {T} item Item.
	 * @param {number} [index] Index of an item before which to insert new one. By default, appends the item.
	 * @returns {boolean} true.
	 */
	/**
	 * @method addAll
	 * `<T>` Inserts item range to array.
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @param {Array} items `<T>` Items.
	 * @param {number} [index] Index of an item before which to insert new ones. By default, appends the items.
	 * @returns {void}
	 */
	/**
	 * @method tryAddAll
	 * `<T>` Inserts item range to array.
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @param {Array} items `<T>` Items.
	 * @param {number} [index] Index of an item before which to insert new ones. By default, appends the items.
	 * @returns {boolean} true. If not modified - `undefined`.
	 */
	/**
	 * @method set
	 * `<T>` Replaces item with specified index. If array doesn't contain such index, it will break the application.
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @param {T} item Item.
	 * @param {number} index Index.
	 * @returns {T} The replaced item.
	 */
	/**
	 * @method trySet
	 * `<T>` Replaces item with specified index. If array doesn't contain such index, it will break the application.
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @param {T} item Item.
	 * @param {number} index Index.
	 * @returns {JW.Proxy} `<T>` Proxy of the replaced item. If not modified - `undefined`.
	 */
	/**
	 * @method remove
	 * `<T>` Removes item with specified index. If array doesn't contain such index, it will break the application.
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @param {number} index Index.
	 * @returns {T} The removed item.
	 */
	/**
	 * @method tryRemove
	 * `<T>` Removes item with specified index. If array doesn't contain such index, it will break the application.
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @param {number} index Index.
	 * @returns {T} The removed item. If not modified - `undefined`.
	 */
	/**
	 * @method removeAll
	 * `<T>` Removes item range from array.
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @param {number} index Index of first item to remove.
	 * @param {number} count Count of items to remove.
	 * @returns {Array} `<T>` The removed items.
	 */
	/**
	 * @method $removeAll
	 * `<T>` Removes item range from array.
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @param {number} index Index of first item to remove.
	 * @param {number} count Count of items to remove.
	 * @returns {JW.Array} `<T>` The removed items.
	 */
	/**
	 * @method tryRemoveAll
	 * `<T>` Removes item range from array.
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @param {number} index Index of first item to remove.
	 * @param {number} count Count of items to remove.
	 * @returns {Array} `<T>` The removed items. If not modified - `undefined`.
	 */
	/**
	 * @method move
	 * `<T>` Moves an item inside array.
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @param {number} fromIndex Item index to move.
	 * @param {number} toIndex Index to move to.
	 * @returns {T} The moved item.
	 */
	/**
	 * @method tryMove
	 * `<T>` Moves an item inside array.
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @param {number} fromIndex Item index to move.
	 * @param {number} toIndex Index to move to.
	 * @returns {T} The moved item. If not modified - `undefined`.
	 */
	/**
	 * @method splice
	 * `<T>` Removes and inserts item ranges. Universal optimized granular operation of removal/insertion.
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @param {Array} removeParamsList `<JW.AbstractArray.IndexCount>`
	 * Array of segments to remove sorted by index asc. Segments are removed in backward order.
	 * @param {Array} addParamsList `<JW.AbstractArray.IndexItems<T>>`
	 * Array of segments to insert sorted by index asc. Segments are inserted in forward order.
	 * @returns {JW.AbstractArray.SpliceResult} `<T>` Result.
	 */
	/**
	 * @method trySplice
	 * `<T>` Removes and inserts item ranges. Universal optimized granular operation of removal/insertion.
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @param {Array} removeParamsList `<JW.AbstractArray.IndexCount>`
	 * Array of segments to remove sorted by index asc. Segments are removed in backward order.
	 * @param {Array} addParamsList `<JW.AbstractArray.IndexItems<T>>`
	 * Array of segments to insert sorted by index asc. Segments are inserted in forward order.
	 * @returns {JW.AbstractArray.SpliceResult} `<T>` Result. If not modified - `undefined`.
	 */
	/**
	 * @method reorder
	 * `<T>` Reorders array items.
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @param {Array} indexArray `<number>` Index array. Item with index `i` will be moved to index `indexArray[i]`.
	 * Must contain all indexes from 0 to (length - 1).
	 * @returns {void}
	 */
	/**
	 * @method tryReorder
	 * `<T>` Reorders array items.
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @param {Array} indexArray `<number>` Index array. Item with index `i` will be moved to index `indexArray[i]`.
	 * Must contain all indexes from 0 to (length - 1).
	 * @returns {Array} `<T>` Old array contents. If not modified - undefined.
	 */
	/**
	 * @method detectSplice
	 * `<T>` Detects {@link #static-method-splice} method arguments to adjust array contents to `newItems`.
	 * Determines which item ranges should be removed and which ones should be inserted.
	 * All items must have unique `getKey` function result.
	 * If items don't have unique key, probably {@link #static-method-detectFilter} method will help.
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @param {Array} newItems `<T>` New array contents.
	 * @param {Function} [getKey]
	 * Function which returns unique key of an item in this collection.
	 * Defaults to JW.iid.
	 * If collection consists of instances of JW.Class, then it's all right.
	 * @param {Object} [scope] `getKey` call scope. Defaults to `this`.
	 * @returns {JW.AbstractArray.SpliceParams}
	 * `<T>` {@link #static-method-splice} method arguments. If no method call required - `undefined`.
	 */
	/**
	 * @method detectFilter
	 * Detects `removeParamsList` arguments of {@link #static-method-splice} to adjust array contents to `newItems`.
	 * Determines which item ranges should be removed.
	 * Doesn't assume items insertion - try {@link #static-method-detectSplice} if that's the case.
	 * In advantage to {@link #static-method-detectSplice}, doesn't require item uniquiness.
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @param {Array} newItems `<T>` New array contents.
	 * @returns {Array}
	 * `<JW.AbstractArray.IndexCount>` `removeParamsList` argument of {@link #static-method-splice} method.
	 * If no method call required - `undefined`.
	 */
	/**
	 * @method detectReorder
	 * `<T>` Detects {@link #static-method-reorder} method arguments to adjust array contents to `newItems`.
	 * Determines where to move all items.
	 * If `newItems` contents differ from `this` contents, the array will be broken.
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @param {Array} newItems `<T>` New array contents.
	 * @param {Function} [getKey]
	 * Function which returns unique key of an item in this collection.
	 * Defaults to JW.iid.
	 * If collection consists of instances of JW.Class, then it's all right.
	 * @param {Object} [scope] `getKey` call scope. Defaults to `this`.
	 * @returns {Array}
	 * `<number>` `indexArray` argument of {@link #static-method-reorder} method.
	 * If no method call required - `undefined`.
	 */
	/**
	 * @method detectSort
	 * `<T>` Detects {@link #static-method-reorder} method arguments to sort array contents by result of `f` call for each item.
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @param {Function} [f]
	 *
	 * `f(item: T, index: number): number/string`
	 *
	 * Indexer function. Returns `item` by default.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @param {1/-1} [order] Sorting order.
	 * @returns {Array}
	 * `<number>` `indexArray` argument of {@link #static-method-reorder} method.
	 * If no method call required - `undefined`.
	 */
	/**
	 * @method detectSortComparing
	 * `<T>` Detects {@link #static-method-reorder} method arguments to sort array contents by comparer.
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @param {Function} [compare]
	 *
	 * `f(t1: T, t2: T, i1: number, i2: number): number`
	 *
	 * Comparer function. Returns positive value if t1 > t2; nagative value if t1 < t2; 0 if t1 == t2.
	 * Defaults to `JW.cmp(t1, t2)`.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @param {1/-1} [order] Sorting order.
	 * @returns {Array}
	 * `<number>` `indexArray` argument of {@link #static-method-reorder} method.
	 * If no method call required - `undefined`.
	 */
	/**
	 * @method performSplice
	 * `<T>` Adjusts array contents to `newItems` using {@link #static-method-detectSplice} and {@link #static-method-splice} methods.
	 * All items must have unique `getKey` function result.
	 * If items don't have unique key, probably {@link #static-method-detectFilter} method will help.
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @param {Array} newItems `<T>` New array contents.
	 * @param {Function} [getKey]
	 * Function which returns unique key of an item in this collection.
	 * Defaults to JW.iid.
	 * If collection consists of instances of JW.Class, then it's all right.
	 * @param {Object} [scope] `getKey` call scope. Defaults to `this`.
	 * @returns {void}
	 */
	/**
	 * @method performFilter
	 * `<T>` Adjusts array contents to `newItems` using {@link #static-method-detectFilter} and {@link #static-method-splice} methods.
	 * Only removes items. Doesn't assume items insertion - try {@link #static-method-detectSplice} if that's the case.
	 * In advantage to {@link #static-method-detectSplice}, doesn't require item uniquiness.
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @param {Array} newItems `<T>` New array contents.
	 * @returns {void}
	 */
	/**
	 * @method performReorder
	 * `<T>` Adjusts array contents to `newItems` using {@link #static-method-detectReorder} and {@link #static-method-reorder} methods.
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @param {Array} newItems `<T>` New array contents.
	 * @param {Function} [getKey]
	 * Function which returns unique key of an item in this collection.
	 * Defaults to JW.iid.
	 * If collection consists of instances of JW.Class, then it's all right.
	 * @param {Object} [scope] `getKey` call scope. Defaults to `this`.
	 * @returns {void}
	 */
	/**
	 * @method sort
	 * `<T>` Sorts array by result of `f` function call for each item.
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @param {Function} [f]
	 *
	 * `f(item: T, index: number): number/string`
	 *
	 * Indexer function. Returns `item` by default.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @param {1/-1} [order] Sorting order.
	 * @returns {void}
	 */
	/**
	 * @method sortComparing
	 * `<T>` Sorts array by comparer.
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @param {Function} [compare]
	 *
	 * `f(t1: T, t2: T, i1: number, i2: number): number`
	 *
	 * Comparer function. Returns positive value if t1 > t2; nagative value if t1 < t2; 0 if t1 == t2.
	 * Defaults to `JW.cmp(t1, t2)`.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @param {1/-1} [order] Sorting order.
	 * @returns {void}
	 */
	/**
	 * @method equal
	 * `<T>` Checks 2 arrays for equality (===), item by item.
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @param {Array} arr `<T>` Another array.
	 * @returns {boolean} Arrays are equal.
	 */
	/**
	 * @method collapse
	 * `<T>` Collapses multi-dimentional array.
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @param {number} depth Dimentions to collapse.
	 * @returns {Array} Collapsed array.
	 */
	/**
	 * @method indexOf
	 * `<T>` Returns item index in this collection. If item doesn't exist, returns -1.
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @param {T} item Item.
	 * @returns {number} Item index or -1.
	 */
	/**
	 * @method backEvery
	 *
	 * `<T>` Checks all items by criteria in backward order.
	 *
	 * Returns true if function `f` returns !== `false` for all collection items.
	 *
	 * Algorithms iterates items sequentially, and stops after first item not matching the criteria.
	 *
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @param {Function} f
	 *
	 * `f(item: T, index: number): boolean`
	 *
	 * Criteria.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {boolean} Result.
	 */
	/**
	 * @method pop
	 * `<T>` Removes last array item. Does nothing if array is empty.
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @returns {T} The removed item or `undefined`.
	 */
	/**
	 * @method binarySearch
	 * `<T>` Determines index of first item which is more (or less if `order` == -1) than specified value by `compare` function,
	 * using binary search. Array must be sorted by `compare` function.
	 * Can be used for item insertion easily.
	 * If you want to use this method for item removal, you must look at previous item and compare it to `value` first.
	 * @static
	 * @param {Array} array `<T>` Array.
	 * @param {T} value Value.
	 * @param {Function} [compare]
	 *
	 * `f(t1: T, t2: T): number`
	 *
	 * Comparer function. Returns positive value if t1 > t2; negative value if t1 < t2; 0 if t1 == t2.
	 * Defaults to `JW.cmp(t1, t2)`.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @param {1/-1} [order] Sorting order.
	 * @returns {number} Item index.
	 */
});
;
/*
	jWidget Lib source file.

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

JW.IndexedCollection.createStaticMethods(JW.Array);

JW.apply(JW.Array, {
	getFirstKey: function(target) {
		if (target.length !== 0) {
			return 0;
		}
	},

	getLast: function(target) {
		return target[target.length - 1];
	},

	getLastKey: function(target) {
		var l = target.length;
		if (l !== 0) {
			return l - 1;
		}
	},

	getLength: function(target) {
		return target.length;
	},

	isEmpty: function(target) {
		return target.length === 0;
	},

	get: function(target, index) {
		return target[index];
	},

	getKeys: function(target) {
		var result = new Array(target.length);
		for (var i = 0, l = target.length; i < l; ++i) {
			result[i] = i;
		}
		return result;
	},

	every: function(target, callback, scope) {
		// JW.assertArray(target);
		// JW.assertFunction(callback);
		for (var i = 0, l = target.length; i < l; ++i) {
			if (callback.call(scope || target, target[i], i) === false) {
				return false;
			}
		}
		return true;
	},

	filter: function(target, callback, scope) {
		var result = [];
		JW.Array.every(target, function(item, index) {
			if (callback.call(this, item, index) !== false) {
				result.push(item);
			}
		}, scope);
		return result;
	},

	$filter: JW.AbstractCollection._createStatic$Array(JW.Array, "filter"),

	count: function(target, callback, scope) {
		var result = 0;
		JW.Array.every(target, function(item, index) {
			if (callback.call(this, item, index) !== false) {
				++result;
			}
		}, scope);
		return result;
	},

	map: function(target, callback, scope) {
		var result = [];
		JW.Array.every(target, function(item, index) {
			result.push(callback.call(this, item, index));
		}, scope);
		return result;
	},

	$map: JW.AbstractCollection._createStatic$Array(JW.Array, "map"),

	toArray: function(target) {
		return target.concat();
	},

	toSet: function(target) {
		return JW.Array.index(target, JW.iid);
	},

	asArray: function(target) {
		return target;
	},

	add: function(target, item, index) {
		JW.Array.tryAdd(target, item, index);
	},

	tryAdd: function(target, item, index) {
		target.splice(JW.def(index, target.length), 0, item);
		return true;
	},

	addAll: function(target, items, index) {
		JW.Array.tryAddAll(target, items, index);
	},

	tryAddAll: function(target, items, index) {
		if (items.length === 0) {
			return;
		}
		if (index === undefined) {
			var l = target.length;
			target.length += items.length;
			for (var i = 0; i < items.length; ++i) {
				target[i + l] = items[i];
			}
		} else {
			var tail = target.splice(index, target.length - index);
			JW.Array.tryAddAll(target, items);
			JW.Array.tryAddAll(target, tail);
		}
		return true;
	},

	trySet: function(target, item, index) {
		// JW.assertArray(target);
		// JW.assertIsSet(item);
		// JW.assertInt(index, 0, target.length);
		var oldItem = target[index];
		if (item !== oldItem) {
			target[index] = item;
			return new JW.Proxy(oldItem);
		}
	},

	tryRemove: function(target, index) {
		return target.splice(index, 1)[0];
	},

	removeAll: function(target, index, count) {
		var result = JW.Array.tryRemoveAll(target, index, count);
		return result || [];
	},

	$removeAll: JW.AbstractCollection._createStatic$Array(JW.Array, "removeAll"),

	tryRemoveAll: function(target, index, count) {
		if (count === 0) {
			return;
		}
		return target.splice(index, count);
	},

	removeItems: function(target, items) {
		var itemSet = new JW.Set(items);
		var newItems = JW.Array.filter(target, function(item) { return !itemSet.contains(item); });
		JW.Array.performSplice(target, newItems);
	},

	move: function(target, fromIndex, toIndex) {
		JW.Array.tryMove(target, fromIndex, toIndex);
		return JW.Array.get(target, toIndex);
	},

	tryMove: function(target, fromIndex, toIndex) {
		// JW.assertArray(target);
		// JW.assertInt(fromIndex, 0, target.length);
		// JW.assertInt(toIndex, 0, target.length);
		if (fromIndex === toIndex) {
			return;
		}
		var item = target[fromIndex];
		target.splice(fromIndex, 1);
		target.splice(toIndex, 0, item);
		return item;
	},

	clear: function(target) {
		var result = JW.Array.tryClear(target);
		return (result !== undefined) ? result : [];
	},

	$clear: JW.AbstractCollection._createStatic$Array(JW.Array, "clear"),

	tryClear: function(target) {
		// JW.assertArray(target);
		if (target.length !== 0) {
			return target.splice(0, target.length);
		}
	},

	splice: function(target, removeParamsList, addParamsList) {
		var result = JW.Array.trySplice(target, removeParamsList, addParamsList);
		return (result !== undefined) ? result : new JW.AbstractArray.SpliceResult(target.concat(), [], []);
	},

	trySplice: function(target, removeParamsList, addParamsList) {
		// JW.assertArray(target);
		// JW.assertArray(removeParamsList, function(params) { return params instanceof JW.AbstractArray.IndexCount; }, this);
		// JW.assertArray(addParamsList, function(params) { return params instanceof JW.AbstractArray.IndexItems; }, this);
		// TODO: assert out of bounds stuff
		var last;

		var optimizedRemoveParamsList = [];
		last = null;
		for (var i = 0, l = removeParamsList.length; i < l; ++i) {
			var params = removeParamsList[i];
			if (last && (params.index === last.index + last.count)) {
				last.count += params.count;
			} else {
				last = params.clone();
				optimizedRemoveParamsList.push(last);
			}
		}

		var optimizedAddParamsList = [];
		last = null;
		for (var i = 0, l = addParamsList.length; i < l; ++i) {
			var params = addParamsList[i];
			if (last && (params.index === last.index + last.items.length)) {
				JW.Array.tryAddAll(last.items, params.items);
			} else {
				last = params.clone();
				optimizedAddParamsList.push(last);
			}
		}

		var oldItems = target.concat();
		var removedItemsList = [];
		for (var i = optimizedRemoveParamsList.length - 1; i >= 0; --i) {
			var params = optimizedRemoveParamsList[i];
			var index = params.index;
			var items = JW.Array.tryRemoveAll(target, index, params.count);
			if (items === undefined) {
				continue;
			}
			removedItemsList.push(new JW.AbstractArray.IndexItems(index, items));
		}
		var addedItemsList = [];
		for (var i = 0, l = optimizedAddParamsList.length; i < l; ++i) {
			var params = optimizedAddParamsList[i];
			if (JW.Array.tryAddAll(target, params.items, params.index) === undefined) {
				continue;
			}
			addedItemsList.push(params);
		}
		if ((removedItemsList.length !== 0) || (addedItemsList.length !== 0)) {
			removedItemsList.reverse();
			return new JW.AbstractArray.SpliceResult(oldItems, removedItemsList, addedItemsList);
		}
	},

	reorder: function(target, indexList) {
		JW.Array.tryReorder(target, indexList);
	},

	tryReorder: function(target, indexArray) {
		// JW.assertArray(target);
		// JW.assertArray(indexArray);
		// JW.assert(target.length === indexArray.length, '"target" and "indexArray" must have equal length');
		// var indexArraySorted = indexArray.concat();
		// indexArraySorted.sort();
		// JW.assert(JW.Array.isIdentity(indexArraySorted), '"indexArray" must contain all indexes from 0 to target.length - 1');
		var length = target.length;
		if (JW.Array.isIdentity(indexArray)) {
			return;
		}
		var oldItems = target.concat();
		for (var i = 0; i < length; ++i) {
			target[indexArray[i]] = oldItems[i];
		}
		return oldItems;
	},

	detectSplice: function(oldItems, newItems, getKey, scope) {
		getKey = getKey || JW.iid;
		scope = scope || oldItems;
		var removeParamsList = [];
		var addParamsList = [];
		var oldIndexMap = {};
		for (var i = 0, l = oldItems.length; i < l; ++i) {
			oldIndexMap[getKey.call(scope, oldItems[i])] = i;
		}
		var nextOldIndex = 0;
		var offset = 0;
		var newItemBuffer = [];

		function buffer(item) {
			newItemBuffer.push(item);
		}

		function flush() {
			if (newItemBuffer.length === 0) {
				return;
			}
			addParamsList.push(new JW.AbstractArray.IndexItems(offset + nextOldIndex, newItemBuffer));
			offset += newItemBuffer.length;
			newItemBuffer = [];
		}

		function testRemove(oldIndex) {
			if (oldIndex > nextOldIndex) {
				var count = oldIndex - nextOldIndex;
				removeParamsList.push(new JW.AbstractArray.IndexCount(nextOldIndex, count));
				offset -= count;
			}
		}

		for (var newIndex = 0, l = newItems.length; newIndex < l; ++newIndex) {
			var item = newItems[newIndex];
			var key = getKey.call(scope, item);
			var oldIndex = oldIndexMap[key];
			if ((oldIndex === undefined) || (oldIndex < nextOldIndex)) {
				buffer(item);
			} else {
				flush();
				testRemove(oldIndex);
				nextOldIndex = oldIndex + 1;
			}
		}
		flush();
		testRemove(oldItems.length);
		if ((removeParamsList.length !== 0) || (addParamsList.length !== 0)) {
			return new JW.AbstractArray.SpliceParams(removeParamsList, addParamsList);
		}
	},

	detectFilter: function(oldItems, newItems) {
		var removeParamsList = [];
		var oldIndex = 0;
		var oldLength = oldItems.length;
		var newLength = newItems.length;
		for (var newIndex = 0; newIndex <= newLength; ++newIndex) {
			var newItem = newItems[newIndex];
			var count = 0;
			while ((oldIndex + count < oldLength) && (oldItems[oldIndex + count] !== newItem)) {
				++count;
			}
			if (count !== 0) {
				removeParamsList.push(new JW.AbstractArray.IndexCount(oldIndex, count));
			}
			oldIndex += count + 1;
		}
		if (removeParamsList.length !== 0) {
			return removeParamsList;
		}
	},

	detectReorder: function(oldItems, newItems, getKey, scope) {
		getKey = getKey || JW.iid;
		scope = scope || oldItems;
		var indexArray = [];
		var newIndexMap = {};
		for (var i = 0, l = newItems.length; i < l; ++i) {
			newIndexMap[getKey.call(scope, newItems[i])] = i;
		}
		for (var i = 0, l = oldItems.length; i < l; ++i) {
			indexArray.push(newIndexMap[getKey.call(scope, oldItems[i])]);
		}
		if (!JW.Array.isIdentity(indexArray)) {
			return indexArray;
		}
	},

	detectSort: function(target, callback, scope, order) {
		var keys = JW.Array.getSortingKeys(target, callback, scope, order);
		if (!JW.Array.isIdentity(keys)) {
			return JW.Array.invert(keys);
		}
	},

	detectSortComparing: function(target, compare, scope, order) {
		var keys = JW.Array.getSortingKeysComparing(target, compare, scope, order);
		if (!JW.Array.isIdentity(keys)) {
			return JW.Array.invert(keys);
		}
	},

	performSplice: function(target, newItems, getKey, scope) {
		var params = JW.Array.detectSplice(target, newItems, getKey, scope);
		if (params !== undefined) {
			JW.Array.trySplice(target, params.removeParamsList, params.addParamsList);
		}
	},

	performFilter: function(target, newItems) {
		var params = JW.Array.detectFilter(target, newItems);
		if (params !== undefined) {
			JW.Array.trySplice(target, params, []);
		}
	},

	performReorder: function(target, newItems, getKey, scope) {
		var indexArray = JW.Array.detectReorder(target, newItems, getKey, scope);
		if (indexArray !== undefined) {
			JW.Array.tryReorder(target, indexArray);
		}
	},

	sort: function(target, callback, scope, order) {
		var indexArray = JW.Array.detectSort(target, callback, scope, order);
		if (indexArray !== undefined) {
			JW.Array.tryReorder(target, indexArray);
		}
	},

	sortComparing: function(target, compare, scope, order) {
		var indexArray = JW.Array.detectSortComparing(target, compare, scope, order);
		if (indexArray !== undefined) {
			JW.Array.tryReorder(target, indexArray);
		}
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

	collapse: function(target, depth) {
		var result = [];
		for (var i = 0, l = target.length; i < l; ++i) {
			if (!JW.isArray(target[i])) {
				result.push(target[i]);
				continue;
			}
			if (!JW.isSet(depth)) {
				JW.Array.tryAddAll(result, JW.Array.collapse(target[i]));
				continue;
			}
			if (depth) {
				JW.Array.tryAddAll(result, JW.Array.collapse(target[i], depth - 1));
				continue;
			}
			result.push(target[i]);
		}
		return result;
	},

	indexOf: Array.prototype.indexOf ? function(target, item) {
		return target.indexOf(item);
	} : function(target, item) {
		var key = JW.Array.keyOf(target, item);
		return (key !== undefined) ? key : -1;
	},

	backEvery: function(target, callback, scope) {
		for (var i = target.length - 1; i >= 0; --i) {
			if (callback.call(scope || target, target[i], i) === false) {
				return false;
			}
		}
		return true;
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
	},

	isIdentity: function(array) {
		for (var i = 0, l = array.length; i < l; ++i) {
			if (array[i] !== i) {
				return false;
			}
		}
		return true;
	},

	invert: function(array) {
		var l = array.length;
		var result = new Array(l);
		for (var i = 0; i < l; ++i) {
			result[array[i]] = i;
		}
		return result;
	},

	merge: function(arrays) {
		var result = [];
		for (var i = 0, l = arrays.length; i < l; ++i) {
			result.push.apply(result, arrays[i]);
		}
		return result;
	},

	$merge: JW.AbstractCollection._createStatic$Array(JW.Array, "merge"),

	countMerged: function(arrays) {
		var result = 0;
		for (var i = 0, l = arrays.length; i < l; ++i) {
			result += arrays[i].length;
		}
		return result;
	},

	reverse: function(target) {
		target.reverse();
	},

	toReversed: function(target) {
		var result = target.concat();
		result.reverse();
		return result;
	},

	$toReversed: JW.AbstractCollection._createStatic$Array(JW.Array, "toReversed"),

	// deprecated
	top: function(target) {
		return JW.Array.getLast(target);
	},

	pop: function(target) {
		return target.pop();
	},

	binarySearch: function(target, value, compare, scope, order) {
		compare = compare || function(x, y) { return (x < y) ? -1 : (x > y) ? 1 : 0 };
		scope = scope || target;
		order = order || 1;
		var length = target.length;
		var len2 = length >> 1;
		var step = 1;
		while (step <= len2) {
			step <<= 1;
		}
		var index = 0;
		while (step) {
			if ((index + step <= length) && (order * compare.call(scope, value, target[index + step - 1]) >= 0)) {
				index += step;
			}
			step >>= 1;
		}
		return index;
	}
});
;
/*
	jWidget Lib source file.

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

/**
 * @class
 *
 * `<T> extends JW.AbstractMap<T>`
 *
 * See structurized list of methods in JW.AbstractMap.
 * Static methods duplicate API of JW.AbstractMap, but take native Object as first argument.
 *
 * @extends JW.AbstractMap
 *
 * @constructor
 * @param {Object} [items] `<T>` Initial contents. By default, created collection is empty.
 * @param {boolean} [adapter] Create map as adapter of `items`. Defaults to false, so `items` is copied.
 */
JW.Map = function(json, adapter) {
	JW.Map._super.call(this, json, adapter);
};

JW.extend(JW.Map, JW.AbstractMap, {
	/**
	 * `<U>` Creates empty collection of the same type.
	 * @returns {JW.Map} `<U>` Collection.
	 */
	createEmpty: function() {
		return new JW.Map();
	},

	/**
	 * `<U>` Creates empty array of the same observability level.
	 * @returns {JW.Array} `<U>` Array.
	 */
	createEmptyArray: function() {
		return new JW.Array();
	},

	/**
	 * `<U>` Creates empty map of the same observability level.
	 * @returns {JW.Map} `<U>` Map.
	 */
	createEmptyMap: function() {
		return new JW.Map();
	},

	/**
	 * `<U>` Creates empty set of the same observability level.
	 * @returns {JW.Set} `<U>` Set.
	 */
	createEmptySet: function() {
		return new JW.Set();
	}

	/**
	 * @method getLength
	 * `<T>` Returns count of items in collection.
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @returns {number} Count of items in collection.
	 */
	/**
	 * @method isEmpty
	 * `<T>` Checks collection for emptiness.
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @returns {boolean} Collection doesn't contain any items.
	 */
	/**
	 * @method getFirst
	 * `<T>` Returns first item in collection. If collection is empty, returns `undefined`.
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @returns {T} Item.
	 */
	/**
	 * @method getFirstKey
	 * `<T>` Returns key of first collection item. If collection is empty, returns `undefined`.
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @returns {string} Key.
	 */
	/**
	 * @method get
	 * `<T>` Returns item by key. If item with such key doesn't exist, returns `undefined`.
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @param {string} key Key.
	 * @returns {T} Item.
	 */
	/**
	 * @method getKeys
	 * `<T>` Returns array of keys of all collection items.
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @returns {Array} `<string>` Keys array.
	 */
	/**
	 * @method $getKeys
	 * `<T>` Returns array of keys of all collection items.
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @returns {JW.Array} `<string>` Keys array.
	 */
	/**
	 * @method containsKey
	 * `<T>` Checks existance of item with specified index in collection.
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @param {string} key Key.
	 * @returns {boolean} Collection contains item with specified key.
	 */
	/**
	 * @method containsItem
	 * `<T>` Checks item existance in collection.
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @param {T} item Item.
	 * @returns {boolean} Collection contains specified item.
	 */
	/**
	 * @method keyOf
	 * `<T>` Returns index of item in collection. If such item doesn't exist, returns `undefined`.
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @param {T} item Item.
	 * @returns {string} Item key.
	 */
	/**
	 * @method removeItem
	 * `<T>` Removes first occurency of an item in collection.
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @param {T} item Item.
	 * @returns {void}
	 */
	/**
	 * @method removeItems
	 * `<T extends JW.Class>` Removes all occurencies of items in collection.
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @param {Array} items `<T>` Item.
	 * @returns {void}
	 */
	/**
	 * @method tryClear
	 * `<T>` Clears collection.
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @returns {Object} `<T>` Old collection contents. If not modified - `undefined`.
	 */
	/**
	 * @method clear
	 * `<T>` Clears collection.
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @returns {Object} `<T>` Old collection contents.
	 */
	/**
	 * @method $clear
	 * `<T>` Clears collection.
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @returns {JW.Map} `<T>` Old collection contents.
	 */
	/**
	 * @method every
	 *
	 * `<T>` Checks all items by criteria.
	 *
	 * Returns true if function `f` returns !== `false` for all collection items.
	 *
	 * Algorithms iterates items sequentially, and stops after first item not matching the criteria.
	 *
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @param {Function} f
	 *
	 * `f(item: T, key: string): boolean`
	 *
	 * Criteria.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {boolean} Result.
	 */
	/**
	 * @method some
	 *
	 * `<T>` Checks each item by criteria.
	 *
	 * Returns true if function `f` returns !== `false` for some collection item.
	 *
	 * Algorithms iterates items sequentially, and stops after first item matching the criteria.
	 *
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @param {Function} f
	 *
	 * `f(item: T, key: string): boolean`
	 *
	 * Criteria.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {boolean} Result.
	 */
	/**
	 * @method each
	 *
	 * `<T>` Iterates collection items. Calls specified function for all items.
	 *
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @param {Function} f
	 *
	 * `f(item: T, key: string): void`
	 *
	 * Function.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {void}
	 */
	/**
	 * @method find
	 *
	 * `<T>` Finds item by criteria.
	 *
	 * Returns key of first item for which `f` returns !== `false`.
	 *
	 * Algorithms iterates items sequentially, and stops after first item matching the criteria.
	 *
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @param {Function} f
	 *
	 * `f(item: T, key: string): boolean`
	 *
	 * Criteria.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {string} Found item key or `undefined`.
	 */
	/**
	 * @method search
	 *
	 * `<T>` Finds item by criteria.
	 *
	 * Returns first item for which `f` returns !== `false`.
	 *
	 * Algorithms iterates items sequentially, and stops after first item matching the criteria.
	 *
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @param {Function} f
	 *
	 * `f(item: T, key: string): boolean`
	 *
	 * Criteria.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {T} Found item or `undefined`.
	 */
	/**
	 * @method toSorted
	 *
	 * `<T>` Converts collection to sorted array.
	 *
	 * Builds array consisting of collection items sorted by result of `f` call for each item.
	 *
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @param {Function} [f]
	 *
	 * `f(item: T, key: string): number/string`
	 *
	 * Indexer function. Returns `item` by default.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @param {1/-1} [order] Sorting order.
	 * @returns {Array} `<T>` Sorted array.
	 */
	/**
	 * @method $toSorted
	 *
	 * `<T>` Converts collection to sorted array.
	 *
	 * Builds array consisting of collection items sorted by result of `f` call for each item.
	 *
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @param {Function} [f]
	 *
	 * `f(item: T, key: string): number/string`
	 *
	 * Indexer function. Returns `item` by default.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @param {1/-1} [order] Sorting order.
	 * @returns {JW.Array} `<T>` Sorted array.
	 */
	/**
	 * @method toSortedComparing
	 *
	 * `<T>` Converts collection to sorted array.
	 *
	 * Builds array consisting of collection items sorted by comparer.
	 *
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @param {Function} [compare]
	 *
	 * `f(t1: T, t2: T, k1: string, k2: string): number`
	 *
	 * Comparer function. Returns positive value if t1 > t2; nagative value if t1 < t2; 0 if t1 == t2.
	 * Defaults to `JW.cmp(t1, t2)`.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @param {1/-1} [order] Sorting order.
	 * @returns {Array} `<T>` Sorted array.
	 */
	/**
	 * @method $toSortedComparing
	 *
	 * `<T>` Converts collection to sorted array.
	 *
	 * Builds array consisting of collection items sorted by comparer.
	 *
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @param {Function} [compare]
	 *
	 * `f(t1: T, t2: T, k1: string, k2: string): number`
	 *
	 * Comparer function. Returns positive value if t1 > t2; nagative value if t1 < t2; 0 if t1 == t2.
	 * Defaults to `JW.cmp(t1, t2)`.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @param {1/-1} [order] Sorting order.
	 * @returns {JW.Array} `<T>` Sorted array.
	 */
	/**
	 * @method getSortingKeys
	 *
	 * `<T>` Returns keys of sorted items.
	 *
	 * Builds array of item keys, sorted by result of `f` call for each item.
	 *
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @param {Function} [f]
	 *
	 * `f(item: T, key: string): number/string`
	 *
	 * Indexer function. Returns `item` by default.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @param {1/-1} [order] Sorting order.
	 * @returns {Array} `<string>` Sorted item keys array.
	 */
	/**
	 * @method $getSortingKeys
	 *
	 * `<T>` Returns keys of sorted items.
	 *
	 * Builds array of item keys, sorted by result of `f` call for each item.
	 *
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @param {Function} [f]
	 *
	 * `f(item: T, key: string): number/string`
	 *
	 * Indexer function. Returns `item` by default.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @param {1/-1} [order] Sorting order.
	 * @returns {JW.Array} `<string>` Sorted item keys array.
	 */
	/**
	 * @method getSortingKeysComparing
	 *
	 * `<T>` Returns keys of sorted items.
	 *
	 * Builds array of item keys, sorted by comparer.
	 *
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @param {Function} [compare]
	 *
	 * `f(t1: T, t2: T, k1: string, k2: string): number`
	 *
	 * Comparer function. Returns positive value if t1 > t2; nagative value if t1 < t2; 0 if t1 == t2.
	 * Defaults to `JW.cmp(t1, t2)`.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @param {1/-1} [order] Sorting order.
	 * @returns {Array} `<string>` Sorted item keys array.
	 */
	/**
	 * @method $getSortingKeysComparing
	 *
	 * `<T>` Returns keys of sorted items.
	 *
	 * Builds array of item keys, sorted by comparer.
	 *
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @param {Function} [compare]
	 *
	 * `f(t1: T, t2: T, k1: string, k2: string): number`
	 *
	 * Comparer function. Returns positive value if t1 > t2; nagative value if t1 < t2; 0 if t1 == t2.
	 * Defaults to `JW.cmp(t1, t2)`.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @param {1/-1} [order] Sorting order.
	 * @returns {JW.Array} `<string>` Sorted item keys array.
	 */
	/**
	 * @method index
	 *
	 * `<T>` Indexes collection.
	 *
	 * Builds new map by rule: key is the result of indexer function call, value is the corresponding item.
	 *
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @param {Function} f
	 *
	 * `f(item: T, key: string): string`
	 *
	 * Indexer function.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {Object} `<T>` Collection index.
	 */
	/**
	 * @method $index
	 *
	 * `<T>` Indexes collection.
	 *
	 * Builds new map by rule: key is the result of indexer function call, value is the corresponding item.
	 *
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @param {Function} f
	 *
	 * `f(item: T, key: string): string`
	 *
	 * Indexer function.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {JW.Map} `<T>` Collection index.
	 */
	/**
	 * @method toArray
	 *
	 * `<T>` Converts collection to array.
	 *
	 * Builds new array consisting of collection items.
	 *
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @returns {Array} `<T>` Items array.
	 */
	/**
	 * @method $toArray
	 *
	 * `<T>` Converts collection to array.
	 *
	 * Builds new array consisting of collection items.
	 *
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @returns {JW.Array} `<T>` Items array.
	 */
	/**
	 * @method toMap
	 *
	 * `<T>` Converts collection to map.
	 *
	 * Builds new map consisting of collection items.
	 *
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @returns {Object} `<T>` Items map.
	 */
	/**
	 * @method $toMap
	 *
	 * `<T>` Converts collection to map.
	 *
	 * Builds new map consisting of collection items.
	 *
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @returns {JW.Map} `<T>` Items map.
	 */
	/**
	 * @method toSet
	 *
	 * `<T>` Converts collection to set.
	 *
	 * Builds new set consisting of collection items.
	 *
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @returns {Object} `<T>` Items set.
	 */
	/**
	 * @method $toSet
	 *
	 * `<T>` Converts collection to set.
	 *
	 * Builds new set consisting of collection items.
	 *
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @returns {JW.Set} `<T>` Items set.
	 */
	/**
	 * @method asArray
	 *
	 * `<T>` Represents collection as array.
	 *
	 * If this collection is array, returns it immediately. Else, executes {@link #static-method-toArray} method.
	 * This method works probably faster than {@link #static-method-toArray}, but please make sure that the returned array
	 * won't be modified externally, because it can cause strange unexpected bugs.
	 *
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @returns {Array} `<T>` Items array.
	 */
	/**
	 * @method $asArray
	 *
	 * `<T>` Represents collection as array.
	 *
	 * If this collection is array, returns it immediately. Else, executes {@link #static-method-toArray} method.
	 * This method works probably faster than {@link #static-method-toArray}, but please make sure that the returned array
	 * won't be modified externally, because it can cause strange unexpected bugs.
	 *
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @returns {JW.Array} `<T>` Items array
	 */
	/**
	 * @method asMap
	 *
	 * `<T>` Represents collection as map.
	 *
	 * If this collection is map, returns it immediately. Else, executes {@link #static-method-toMap} method.
	 * This method works probably faster than {@link #static-method-toMap}, but please make sure that the returned map
	 * won't be modified externally, because it can cause strange unexpected bugs.
	 *
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @returns {Object} `<T>` Items map.
	 */
	/**
	 * @method $asMap
	 *
	 * `<T>` Represents collection as map.
	 *
	 * If this collection is map, returns it immediately. Else, executes {@link #static-method-toMap} method.
	 * This method works probably faster than {@link #static-method-toMap}, but please make sure that the returned map
	 * won't be modified externally, because it can cause strange unexpected bugs.
	 *
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @returns {JW.Map} `<T>` Items map.
	 */
	/**
	 * @method asSet
	 *
	 * `<T>` Represents collection as set.
	 *
	 * If this collection is set, returns it immediately. Else, executes {@link #static-method-toSet}method.
	 * This method works probably faster than {@link #static-method-toSet}, but please make sure that the returned set
	 * won't be modified externally, because it can cause strange unexpected bugs.
	 *
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @returns {Object} `<T>` Items set.
	 */
	/**
	 * @method $asSet
	 *
	 * `<T>` Represents collection as set.
	 *
	 * If this collection is set, returns it immediately. Else, executes {@link #static-method-toSet} method.
	 * This method works probably faster than {@link #static-method-toSet}, but please make sure that the returned set
	 * won't be modified externally, because it can cause strange unexpected bugs.
	 *
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @returns {JW.Set} `<T>` Items set.
	 */
	/**
	 * @method filter
	 *
	 * `<T>` Filters collection by criteria.
	 *
	 * Builds new collection of the same type, consisting of items for which `f` returns !== `false`.
	 *
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @param {Function} f
	 *
	 * `f(item: T, key: string): boolean`
	 *
	 * Criteria.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {Object} `<T>` Filtered collection.
	 */
	/**
	 * @method $filter
	 *
	 * `<T>` Filters collection by criteria.
	 *
	 * Builds new collection of the same type, consisting of items for which `f` returns !== `false`.
	 *
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @param {Function} f
	 *
	 * `f(item: T, key: string): boolean`
	 *
	 * Criteria.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {JW.Map} `<T>` Filtered collection.
	 */
	/**
	 * @method count
	 *
	 * `<T>` Counts the items matching criteria.
	 *
	 * Returns the number of items for which `f` returns !== `false`.
	 *
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @param {Function} f
	 *
	 * `f(item: T, key: string): boolean`
	 *
	 * Criteria.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {number} Number of items.
	 */
	/**
	 * @method map
	 *
	 * `<T, U>` Maps collection items.
	 *
	 * Builds new collection of the same type, consisting of results of `f` call for each collection item.
	 *
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @param {Function} f
	 *
	 * `f(item: T, key: string): U`
	 *
	 * Mapping function.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {Object} `<U>` Mapped collection.
	 */
	/**
	 * @method $map
	 *
	 * `<T, U>` Maps collection items.
	 *
	 * Builds new collection of the same type, consisting of results of `f` call for each collection item.
	 *
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @param {Function} f
	 *
	 * `f(item: T, key: string): U`
	 *
	 * Mapping function.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {JW.Map} `<U>` Mapped collection.
	 */
	/**
	 * @method set
	 * `<T>` Replaces item with specified key. If map doesn't contain such key, it will be added.
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @param {T} item Item.
	 * @param {string} key Key.
	 * @returns {T} The replaced item.
	 */
	/**
	 * @method trySet
	 * `<T>` Replaces item with specified key. If map doesn't contain such key, it will be added.
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @param {T} item Item.
	 * @param {string} key Key.
	 * @returns {JW.Proxy} `<T>` Proxy of the replaced item. If not modified - `undefined`.
	 */
	/**
	 * @method setAll
	 * `<T>` Adds or replaces a bunch of items. As of jWidget 1.3, doesn't return anything for sake of performance.
	 * For old behaviour, use method {@link #static-method-setAllVerbose}.
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @param {Object} items Items.
	 */
	/**
	 * @method setAllVerbose
	 * `<T>` Adds or replaces a bunch of items. Returns verbose result set.
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @param {Object} items Items.
	 * @returns {JW.AbstractMap.SpliceResult} `<T>` Result of {@link #static-method-splice} method.
	 */
	/**
	 * @method trySetAll
	 * `<T>` Adds or replaces a bunch of items.
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @param {Object} items Items.
	 * @returns {JW.AbstractMap.SpliceResult} `<T>` Result of {@link #static-method-splice} method. If not modified - `undefined`.
	 */
	/**
	 * @method setKey
	 * `<T>` Changes item key in map. If collection doesn't contain `oldKey` or contains `newKey`, it will cause an error.
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @param {string} oldKey Old key of item.
	 * @param {string} newKey New key of item.
	 * @returns {T} Item.
	 */
	/**
	 * @method trySetKey
	 * `<T>` Changes item key in map. If collection doesn't contain `oldKey` or contains `newKey`, it will cause an error.
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @param {string} oldKey Old key of item.
	 * @param {string} newKey New key of item.
	 * @returns {T} Item. If not modified - `undefined`.
	 */
	/**
	 * @method remove
	 * `<T>` Removes item with specified key if it exists in map.
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @param {K} key Key.
	 * @returns {T} Old collection item or `undefined`.
	 */
	/**
	 * @method tryRemove
	 * `<T>` Removes item with specified key if it exists in map.
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @param {K} key Key.
	 * @returns {T} Old collection item. If not modified - `undefined`.
	 */
	/**
	 * @method removeAll
	 * `<T>` Removes a bunch of items from map. As of jWidget 1.3, doesn't return anything for sake of performance.
	 * For old behaviour, use method {@link #removeAllVerbose}.
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @param {Array} keys `<string>` Item keys.
	 */
	/**
	 * @method removeAllVerbose
	 * `<T>` Removes a bunch of items from map. Returns verbose result set.
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @param {Array} keys `<string>` Item keys.
	 * @returns {Object} `<T>` The removed items.
	 */
	/**
	 * @method $removeAllVerbose
	 * `<T>` Removes a bunch of items from map. Returns verbose result set.
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @param {Array} keys `<string>` Item keys.
	 * @returns {JW.Map} `<T>` The removed items.
	 */
	/**
	 * @method tryRemoveAll
	 * `<T>` Removes a bunch of items from map.
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @param {Array} keys `<string>` Item keys.
	 * @returns {Object} `<T>` The removed items. If not modified - `undefined`.
	 */
	/**
	 * @method splice
	 * `<T>` Removes and adds bunches of items in map. Universal optimized granular operation of removal/insertion.
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @param {Array} removedKeys `<string>` Keys of items to remove.
	 * @param {Object} updatedItems `<T>` Items to add/replace.
	 * @returns {JW.AbstractMap.SpliceResult} `<T>` Result.
	 */
	/**
	 * @method trySplice
	 * `<T>` Removes and adds bunches of items in map. Universal optimized granular operation of removal/insertion.
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @param {Array} removedKeys `<string>` Keys of items to remove.
	 * @param {Object} updatedItems `<T>` Items to add/replace.
	 * @returns {JW.AbstractMap.SpliceResult} `<T>` Result. If not modified - `undefined`.
	 */
	/**
	 * @method reindex
	 * `<T>` Changes item keys in map.
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @param {Object} keyMap `<string>` Key map. Item with key `k` will gain key `keyMap[k]`.
	 * It is neccessary to pass only changed keys, but unchanged keys or unexisting keys are acceptable as well.
	 * @returns {Object} `<T>` Map of changed keys.
	 */
	/**
	 * @method tryReindex
	 * `<T>` Changes item keys in map.
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @param {Object} keyMap `<string>` Key map. Item with key `k` will gain key `keyMap[k]`.
	 * It is neccessary to pass only changed keys, but unchanged keys or unexisting keys are acceptable as well.
	 * @returns {Object} `<T>` Map of changed keys. If not modified - `undefined`.
	 */
	/**
	 * @method detectSplice
	 * `<T>` Detects {@link #static-method-splice} method arguments to adjust map contents to `newItems`.
	 * Determines which item bunches should be removed and which ones should be inserted/replaced, and their keys.
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @param {Object} newItems `<T>` New map contents.
	 * @returns {JW.AbstractMap.SpliceParams}
	 * `<T>` {@link #static-method-splice} method arguments. If no method call required - `undefined`.
	 */
	/**
	 * @method detectReindex
	 * `<T>` Detects {@link #static-method-reindex} method arguments to adjust map contents to `newItems`.
	 * Determines which keys should be assigned to all items.
	 * If `newItems` contents differ from `this` contents, the map will be broken.
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @param {Object} newItems `<T>` New map contents.
	 * @param {Function} [getKey]
	 * Function which returns unique key of an item in this collection.
	 * Defaults to JW.iid.
	 * If collection consists of instances of JW.Class, then it's all right.
	 * @param {Object} [scope] `getKey` call scope. Defaults to `this`.
	 * @returns {Object}
	 * `<string>` `keyMap` argument of {@link #static-method-reindex} method.
	 * If no method call required - `undefined`.
	 */
	/**
	 * @method performSplice
	 * `<T>` Adjusts map contents to `newItems` using {@link #static-method-detectSplice} and {@link #static-method-splice} methods.
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @param {Object} newItems `<T>` New map contents.
	 * @returns {void}
	 */
	/**
	 * @method performReindex
	 * `<T>` Adjusts map contents to `newItems` using {@link #static-method-detectReindex} and {@link #static-method-reindex} methods.
	 * @static
	 * @param {Object} map `<T>` Map.
	 * @param {Object} newItems `<T>` New map contents.
	 * @param {Function} [getKey]
	 * Function which returns unique key of an item in this collection.
	 * Defaults to JW.iid.
	 * If collection consists of instances of JW.Class, then it's all right.
	 * @param {Object} [scope] `getKey` call scope. Defaults to `this`.
	 * @returns {void}
	 */
	/**
	 * @method equal
	 * `<T>` Checks two maps for equality (===), item by item.
	 * @static
	 * @param {Object} map1 `<T>` Map.
	 * @param {Object} map2 `<T>` Another map.
	 * @returns {boolean} Maps are equal.
	 */
	/**
	 * @method getInverted
	 * Returns an inverted map. Keys are converted to values, and values are
	 * converted to keys. `this` must be `JW.AbstractMap<string>`.
	 * @static
	 * @returns {JW.AbstractMap} `<string>` The inverted map.
	 */
});
;
/*
	jWidget Lib source file.

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

JW.IndexedCollection.createStaticMethods(JW.Map);

JW.apply(JW.Map, {
	getLength: function(target) {
		var length = 0;
		for (var key in target) {
			++length;
		}
		return length;
	},

	isEmpty: function(target) {
		for (var key in target) {
			return false;
		}
		return true;
	},

	getFirstKey: function(target) {
		for (var key in target) {
			return key;
		}
		return undefined;
	},

	get: function(target, key) {
		return target[key];
	},

	getKeys: function(target) {
		var keys = [];
		for (var key in target) {
			keys.push(key);
		}
		return keys;
	},

	every: function(target, callback, scope) {
		scope = scope || target;
		for (var key in target) {
			if (callback.call(scope, target[key], key) === false) {
				return false;
			}
		}
		return true;
	},

	filter: function(target, callback, scope) {
		var result = {};
		JW.Map.every(target, function(item, key) {
			if (callback.call(this, item, key) !== false) {
				result[key] = item;
			}
		}, scope);
		return result;
	},

	$filter: JW.AbstractCollection._createStatic$Map(JW.Map, "filter"),

	count: function(target, callback, scope) {
		var result = 0;
		JW.Map.every(target, function(item, key) {
			if (callback.call(this, item, key) !== false) {
				++result;
			}
		}, scope);
		return result;
	},

	map: function(target, callback, scope) {
		var result = {};
		JW.Map.every(target, function(item, key) {
			result[key] = callback.call(this, item, key);
		}, scope);
		return result;
	},

	$map: JW.AbstractCollection._createStatic$Map(JW.Map, "map"),

	asMap: function(target) {
		return target;
	},

	trySet: function(target, item, key) {
		var oldItem = target[key];
		if (oldItem === item) {
			return;
		}
		target[key] = item;
		return new JW.Proxy(oldItem);
	},

	setAll: function(target, items) {
		// JW.assertMap(target);
		// JW.assertMap(items, JW.assertDefined);
		for (var key in items) {
			target[key] = items[key];
		}
	},

	setAllVerbose: function(target, items) {
		var spliceResult = JW.Map.trySetAll(target, items);
		return (spliceResult !== undefined) ? spliceResult : new JW.AbstractMap.SpliceResult({}, {});
	},

	trySetAll: function(target, map) {
		// JW.assertMap(target);
		// JW.assertMap(map, JW.assertDefined);
		var removedItems = {};
		var addedItems = {};
		for (var key in map) {
			var item = map[key];
			var oldItem = JW.Map.trySet(target, item, key);
			if (oldItem === undefined) {
				continue;
			}
			var removedItem = oldItem.value;
			if (removedItem !== undefined) {
				removedItems[key] = removedItem;
			}
			addedItems[key] = item;
		}
		if (!JW.Map.isEmpty(removedItems) || !JW.Map.isEmpty(addedItems)) {
			return new JW.AbstractMap.SpliceResult(removedItems, addedItems);
		}
	},

	setKey: function(target, oldKey, newKey) {
		var item = JW.Map.trySetKey(target, oldKey, newKey);
		return (item !== undefined) ? item : target[newKey];
	},

	trySetKey: function(target, oldKey, newKey) {
		// JW.assertMap(target);
		// JW.assertString(oldKey);
		// JW.assertString(newKey);
		// JW.assertDefined(target[oldKey]);
		// JW.assertUndefined(target[newKey]);
		if (oldKey === newKey) {
			return;
		}
		var item = target[oldKey];
		delete target[oldKey];
		target[newKey] = item;
		return item;
	},

	tryRemove: function(target, key) {
		// JW.assertMap(target);
		// JW.assertString(key);
		var item = target[key];
		if (item !== undefined) {
			delete target[key];
		}
		return item;
	},

	removeAll: function(target, keys) {
		// JW.assertMap(target);
		for (var i = 0, l = keys.length; i < l; ++i) {
			var key = keys[i];
			delete target[key];
		}
	},

	removeAllVerbose: function(target, keys) {
		var items = JW.Map.tryRemoveAll(target, keys);
		return (items !== undefined) ? items : {};
	},

	$removeAllVerbose: JW.AbstractCollection._createStatic$Map(JW.Map, "removeAllVerbose"),

	tryRemoveAll: function(target, keys) {
		// JW.assertMap(target);
		var items = {};
		for (var i = 0, l = keys.length; i < l; ++i) {
			var key = keys[i];
			var item = JW.Map.tryRemove(target, key);
			if (item !== undefined) {
				items[key] = item;
			}
		}
		if (!JW.Map.isEmpty(items)) {
			return items;
		}
	},

	removeItems: function(target, items) {
		var itemSet = new JW.Set(items);
		var newItems = JW.Map.filter(target, function(item) {
			return !itemSet.contains(item);
		});
		JW.Map.performSplice(target, newItems);
	},

	clear: function(target) {
		var result = JW.Map.tryClear(target);
		return (result !== undefined) ? result : {};
	},

	$clear: JW.AbstractCollection._createStatic$Map(JW.Map, "clear"),

	tryClear: function(target) {
		// JW.assertMap(target);
		if (JW.Map.isEmpty(target)) {
			return;
		}
		var items = JW.apply({}, target);
		for (var key in items) {
			delete target[key];
		}
		return items;
	},

	splice: function(target, removedKeys, updatedItems) {
		var spliceResult = JW.Map.trySplice(target, removedKeys, updatedItems);
		return (spliceResult !== undefined) ? spliceResult : new JW.AbstractMap.SpliceResult({}, {});
	},

	trySplice: function(target, removedKeys, updatedItems) {
		// JW.assertMap(target);
		// JW.assertArray(item, JW.assertString);
		// JW.assertMap(updatedItems, JW.assertDefined);
		removedKeys = JW.Array.filter(removedKeys, function(key) {
			return !updatedItems.hasOwnProperty(key);
		});
		var removedItems = JW.Map.tryRemoveAll(target, removedKeys);
		var spliceResult = JW.Map.trySetAll(target, updatedItems);
		if (spliceResult !== undefined) {
			JW.apply(spliceResult.removedItems, removedItems);
			return spliceResult;
		}
		if (removedItems !== undefined) {
			return new JW.AbstractMap.SpliceResult(removedItems, {});
		}
	},

	reindex: function(target, keyMap) {
		var result = JW.Map.tryReindex(target, keyMap);
		return (result !== undefined) ? result : {};
	},

	tryReindex: function(target, keyMap) {
		// JW.assertMap(target);
		// JW.assertMap(keyMap, JW.assertString);
		// JW.assertMap(keyMap, function(key) { return target.hasOwnProperty(key); }, this);
		var sanitizedKeyMap = {};
		for (var oldKey in keyMap) {
			var newKey = keyMap[oldKey];
			if ((newKey === undefined) || (newKey === oldKey) || (target[oldKey] === undefined)) {
				continue;
			}
			sanitizedKeyMap[oldKey] = newKey;
		}

		var backKeyMap = JW.Map.getInverted(sanitizedKeyMap);
		var removedKeys = [];
		var updatedItems = {};
		for (var oldKey in sanitizedKeyMap) {
			var newKey = sanitizedKeyMap[oldKey];
			// JW.assertUndefined(updatedItems[newKey]);
			sanitizedKeyMap[oldKey] = newKey;
			updatedItems[newKey] = target[oldKey];
			if (backKeyMap[oldKey] === undefined) {
				removedKeys.push(oldKey);
			}
		}

		if (JW.Map.isEmpty(sanitizedKeyMap)) {
			return;
		}
		for (var i = 0, l = removedKeys.length; i < l; ++i) {
			delete target[removedKeys[i]];
		}
		JW.apply(target, updatedItems);
		return sanitizedKeyMap;
	},

	detectSplice: function(oldItems, newItems) {
		// JW.assertMap(oldItems);
		// JW.assertMap(newItems, JW.assertDefined);
		var removedKeys = [];
		var updatedItems = {};
		for (var key in oldItems) {
			if (!newItems.hasOwnProperty(key)) {
				removedKeys.push(key);
			}
		}
		for (var key in newItems) {
			var item = newItems[key];
			if (item !== oldItems[key]) {
				updatedItems[key] = item;
			}
		}
		if ((removedKeys.length !== 0) || !JW.Map.isEmpty(updatedItems)) {
			return new JW.AbstractMap.SpliceParams(removedKeys, updatedItems);
		}
	},

	detectReindex: function(oldItems, newItems, getKey, scope) {
		// JW.assertMap(oldItems);
		// JW.assertMap(newItems, JW.assertDefined);
		getKey = getKey || JW.iid;
		scope = scope || oldItems;
		var newItemKeys = {};
		for (var key in newItems) {
			newItemKeys[getKey.call(scope, newItems[key])] = key;
		}
		var keyMap = {};
		for (var oldKey in oldItems) {
			var newKey = newItemKeys[getKey.call(scope, oldItems[oldKey])];
			if (oldKey !== newKey) {
				keyMap[oldKey] = newKey;
			}
		}
		if (!JW.Map.isEmpty(keyMap)) {
			return keyMap;
		}
	},

	performSplice: function(target, newItems) {
		var params = JW.Map.detectSplice(target, newItems);
		if (params !== undefined) {
			JW.Map.trySplice(target, params.removedKeys, params.updatedItems);
		}
	},

	performReindex: function(target, newItems, getKey, scope) {
		var keyMap = JW.Map.detectReindex(target, newItems, getKey, scope);
		if (keyMap !== undefined) {
			JW.Map.tryReindex(target, keyMap);
		}
	},

	equal: function(x, y) {
		if (x === y) {
			return true;
		}
		var length = JW.Map.getLength(y);
		for (var key in x) {
			if ((--length < 0) || (x[key] !== y[key])) {
				return false;
			}
		}
		return length === 0;
	},

	single: function(key, item) {
		var result = {};
		result[key] = item;
		return result;
	},

	getRemovedKeys: function(removedItems, addedItems) {
		var removedKeys = [];
		for (var key in removedItems) {
			if (!addedItems.hasOwnProperty(key)) {
				removedKeys.push(key);
			}
		}
		return removedKeys;
	},

	getInverted: function(map) {
		// JW.assertMap(map, JW.assertString);
		var result = {};
		for (var key in map) {
			// JW.assertUndefined(result[map[key]]);
			result[map[key]] = key;
		}
		return result;
	}
});
;
/*
	jWidget Lib source file.

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

/**
 * @class
 *
 * `<T extends JW.Class> extends JW.AbstractSet<T>`
 *
 * See structurized list of methods in JW.AbstractSet.
 * Static methods duplicate API of JW.AbstractSet, but take native Object as first argument.
 *
 * @extends JW.AbstractSet
 *
 * @constructor
 * @param {Array} [items] `<T>` Initial contents. By default, created collection is empty.
 * @param {boolean} [adapter] Create set as adapter of `items` (`items` should be Object for this, not Array).
 * Defaults to false, so `items` is copied.
 */
JW.Set = function(json, adapter) {
	JW.Set._super.call(this, json, adapter);
};

JW.extend(JW.Set, JW.AbstractSet, {
	/**
	 * `<U>` Creates empty collection of the same type.
	 * @returns {JW.Set} `<U>` Collection.
	 */
	createEmpty: function() {
		return new JW.Set();
	},

	/**
	 * `<U>` Creates empty array of the same observability level.
	 * @returns {JW.Array} `<U>` Array.
	 */
	createEmptyArray: function() {
		return new JW.Array();
	},

	/**
	 * `<U>` Creates empty map of the same observability level.
	 * @returns {JW.Map} `<U>` Map.
	 */
	createEmptyMap: function() {
		return new JW.Map();
	},

	/**
	 * `<U>` Creates empty set of the same observability level.
	 * @returns {JW.Set} `<U>` Set.
	 */
	createEmptySet: function() {
		return new JW.Set();
	}

	/**
	 * @method getLength
	 * `<T extends JW.Class>` Returns count of items in collection.
	 * @static
	 * @param {Object} set `<T>` Set.
	 * @returns {number} Count of items in collection.
	 */
	/**
	 * @method isEmpty
	 * `<T extends JW.Class>` Checks collection for emptiness.
	 * @static
	 * @param {Object} set `<T>` Set.
	 * @returns {boolean} Collection doesn't contain any items.
	 */
	/**
	 * @method getFirst
	 * `<T extends JW.Class>` Returns first item in collection. If collection is empty, returns `undefined`.
	 * @static
	 * @param {Object} set `<T>` Set.
	 * @returns {T} Item.
	 */
	/**
	 * @method containsItem
	 * `<T extends JW.Class>` Checks item existance in collection.
	 * @static
	 * @param {Object} set `<T>` Set.
	 * @param {T} item Item.
	 * @returns {boolean} Collection contains specified item.
	 */
	/**
	 * @method contains
	 * `<T extends JW.Class>` Checks item existance in collection. Shortcut for {@link #static-method-containsItem}.
	 * @static
	 * @param {Object} set `<T>` Set.
	 * @param {T} item Item.
	 * @returns {boolean} Collection contains specified item.
	 */
	/**
	 * @method removeItem
	 * `<T extends JW.Class>` Removes first occurency of an item in collection.
	 * @static
	 * @param {Object} set `<T>` Set.
	 * @param {T} item Item.
	 * @returns {void}
	 */
	/**
	 * @method removeItems
	 * `<T extends JW.Class>` Removes all occurencies of items in collection.
	 * @static
	 * @param {Object} set `<T>` Set.
	 * @param {Array} items `<T>` Items.
	 * @returns {void}
	 */
	/**
	 * @method tryClear
	 * `<T extends JW.Class>` Clears collection.
	 * @static
	 * @param {Object} set `<T>` Set.
	 * @returns {Array} `<T>` Old collection contents. If not modified - `undefined`.
	 */
	/**
	 * @method clear
	 * `<T extends JW.Class>` Clears collection.
	 * @static
	 * @param {Object} set `<T>` Set.
	 * @returns {Array} `<T>` Old collection contents.
	 */
	/**
	 * @method $clear
	 * `<T extends JW.Class>` Clears collection.
	 * @static
	 * @param {Object} set `<T>` Set.
	 * @returns {JW.Array} `<T>` Old collection contents.
	 */
	/**
	 * @method every
	 *
	 * `<T extends JW.Class>` Checks all items by criteria.
	 *
	 * Returns true if function `f` returns !== `false` for all collection items.
	 *
	 * Algorithms iterates items sequentially, and stops after first item not matching the criteria.
	 *
	 * @static
	 * @param {Object} set `<T>` Set.
	 * @param {Function} f
	 *
	 * `f(item: T): boolean`
	 *
	 * Criteria.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {boolean} Result.
	 */
	/**
	 * @method some
	 *
	 * `<T extends JW.Class>` Checks each item by criteria.
	 *
	 * Returns true if function `f` returns !== `false` for some collection item.
	 *
	 * Algorithms iterates items sequentially, and stops after first item matching the criteria.
	 *
	 * @static
	 * @param {Object} set `<T>` Set.
	 * @param {Function} f
	 *
	 * `f(item: T): boolean`
	 *
	 * Criteria.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {boolean} Result.
	 */
	/**
	 * @method each
	 * `<T extends JW.Class>` Iterates collection items. Calls specified function for all items.
	 *
	 * @static
	 * @param {Object} set `<T>` Set.
	 * @param {Function} f
	 *
	 * `f(item: T): void`
	 *
	 * Function.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {void}
	 */
	/**
	 * @method search
	 *
	 * `<T extends JW.Class>` Finds item by criteria.
	 *
	 * Returns first item for which `f` returns !== `false`.
	 *
	 * Algorithms iterates items sequentially, and stops after first item matching the criteria.
	 *
	 * @static
	 * @param {Object} set `<T>` Set.
	 * @param {Function} f
	 *
	 * `f(item: T): boolean`
	 *
	 * Criteria.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {T} Found item or `undefined`.
	 */
	/**
	 * @method toSorted
	 *
	 * `<T extends JW.Class>` Converts collection to sorted array.
	 *
	 * Builds array consisting of collection items sorted by result of `f` call for each item.
	 *
	 * @static
	 * @param {Object} set `<T>` Set.
	 * @param {Function} [f]
	 *
	 * `f(item: T): number/string`
	 *
	 * Indexer function. Returns `item` by default.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @param {1/-1} [order] Sorting order.
	 * @returns {Array} `<T>` Sorted array.
	 */
	/**
	 * @method $toSorted
	 *
	 * `<T extends JW.Class>` Converts collection to sorted array.
	 *
	 * Builds array consisting of collection items sorted by result of `f` call for each item.
	 *
	 * @static
	 * @param {Object} set `<T>` Set.
	 * @param {Function} [f]
	 *
	 * `f(item: T): number/string`
	 *
	 * Indexer function. Returns `item` by default.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @param {1/-1} [order] Sorting order.
	 * @returns {JW.Array} `<T>` Sorted array.
	 */
	/**
	 * @method toSortedComparing
	 *
	 * `<T extends JW.Class>` Converts collection to sorted array.
	 *
	 * Builds array consisting of collection items sorted by comparer.
	 *
	 * @static
	 * @param {Object} set `<T>` Set.
	 * @param {Function} [compare]
	 *
	 * `f(t1: T, t2: T): number`
	 *
	 * Comparer function. Returns positive value if t1 > t2; nagative value if t1 < t2; 0 if t1 == t2.
	 * Defaults to `JW.cmp(t1, t2)`.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @param {1/-1} [order] Sorting order.
	 * @returns {Array} `<T>` Sorted array.
	 */
	/**
	 * @method $toSortedComparing
	 *
	 * `<T extends JW.Class>` Converts collection to sorted array.
	 *
	 * Builds array consisting of collection items sorted by comparer.
	 *
	 * @static
	 * @param {Object} set `<T>` Set.
	 * @param {Function} [compare]
	 *
	 * `f(t1: T, t2: T): number`
	 *
	 * Comparer function. Returns positive value if t1 > t2; nagative value if t1 < t2; 0 if t1 == t2.
	 * Defaults to `JW.cmp(t1, t2)`.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @param {1/-1} [order] Sorting order.
	 * @returns {JW.Array} `<T>` Sorted array.
	 */
	/**
	 * @method index
	 *
	 * `<T extends JW.Class>` Indexes collection.
	 *
	 * Builds new map by rule: key is the result of indexer function call, value is the corresponding item.
	 *
	 * @static
	 * @param {Object} set `<T>` Set.
	 * @param {Function} f
	 *
	 * `f(item: T): string`
	 *
	 * Indexer function.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {Object} `<T>` Collection index.
	 */
	/**
	 * @method $index
	 *
	 * `<T extends JW.Class>` Indexes collection.
	 *
	 * Builds new map by rule: key is the result of indexer function call, value is the corresponding item.
	 *
	 * @static
	 * @param {Object} set `<T>` Set.
	 * @param {Function} f
	 *
	 * `f(item: T): string`
	 *
	 * Indexer function.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {JW.Map} `<T>` Collection index.
	 */
	/**
	 * @method toArray
	 *
	 * `<T extends JW.Class>` Converts collection to array.
	 *
	 * Builds new array consisting of collection items.
	 *
	 * @static
	 * @param {Object} set `<T>` Set.
	 * @returns {Array} `<T>` Items array.
	 */
	/**
	 * @method $toArray
	 *
	 * `<T extends JW.Class>` Converts collection to array.
	 *
	 * Builds new array consisting of collection items.
	 *
	 * @static
	 * @param {Object} set `<T>` Set.
	 * @returns {JW.Array} `<T>` Items array.
	 */
	/**
	 * @method toSet
	 *
	 * `<T extends JW.Class>` Converts collection to set.
	 *
	 * Builds new set consisting of collection items.
	 *
	 * @static
	 * @param {Object} set `<T>` Set.
	 * @returns {Object} `<T>` Items set.
	 */
	/**
	 * @method $toSet
	 *
	 * `<T extends JW.Class>` Converts collection to set.
	 *
	 * Builds new set consisting of collection items.
	 *
	 * @static
	 * @param {Object} set `<T>` Set.
	 * @returns {JW.Set} `<T>` Items set.
	 */
	/**
	 * @method asArray
	 *
	 * `<T extends JW.Class>` Represents collection as array.
	 *
	 * If this collection is array, returns it immediately. Else, executes {@link #static-method-toArray} method.
	 * This method works probably faster than {@link #static-method-toArray}, but please make sure that the returned array
	 * won't be modified externally, because it can cause strange unexpected bugs.
	 *
	 * @static
	 * @param {Object} set `<T>` Set.
	 * @returns {Array} `<T>` Items array.
	 */
	/**
	 * @method $asArray
	 *
	 * `<T extends JW.Class>` Represents collection as array.
	 *
	 * If this collection is array, returns it immediately. Else, executes {@link #static-method-toArray} method.
	 * This method works probably faster than {@link #static-method-toArray}, but please make sure that the returned array
	 * won't be modified externally, because it can cause strange unexpected bugs.
	 *
	 * @static
	 * @param {Object} set `<T>` Set.
	 * @returns {JW.Array} `<T>` Items array.
	 */
	/**
	 * @method asSet
	 *
	 * `<T extends JW.Class>` Represents collection as set.
	 *
	 * If this collection is set, returns it immediately. Else, executes {@link #static-method-toSet}method.
	 * This method works probably faster than {@link #static-method-toSet}, but please make sure that the returned set
	 * won't be modified externally, because it can cause strange unexpected bugs.
	 *
	 * @static
	 * @param {Object} set `<T>` Set.
	 * @returns {Object} `<T>` Items set.
	 */
	/**
	 * @method $asSet
	 *
	 * `<T extends JW.Class>` Represents collection as set.
	 *
	 * If this collection is set, returns it immediately. Else, executes {@link #static-method-toSet}method.
	 * This method works probably faster than {@link #static-method-toSet}, but please make sure that the returned set
	 * won't be modified externally, because it can cause strange unexpected bugs.
	 *
	 * @static
	 * @param {Object} set `<T>` Set.
	 * @returns {JW.Set} `<T>` Items set.
	 */
	/**
	 * @method filter
	 *
	 * `<T extends JW.Class>` Filters collection by criteria.
	 *
	 * Builds new collection of the same type, consisting of items for which `f` returns !== `false`.
	 *
	 * @static
	 * @param {Object} set `<T>` Set.
	 * @param {Function} f
	 *
	 * `f(item: T): boolean`
	 *
	 * Criteria.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {Object} `<T>` Filtered collection.
	 */
	/**
	 * @method $filter
	 *
	 * `<T extends JW.Class>` Filters collection by criteria.
	 *
	 * Builds new collection of the same type, consisting of items for which `f` returns !== `false`.
	 *
	 * @static
	 * @param {Object} set `<T>` Set.
	 * @param {Function} f
	 *
	 * `f(item: T): boolean`
	 *
	 * Criteria.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {JW.Set} `<T>` Filtered collection.
	 */
	/**
	 * @method count
	 *
	 * `<T extends JW.Class>` Counts the items matching criteria.
	 *
	 * Returns the number of items for which `f` returns !== `false`.
	 *
	 * @static
	 * @param {Object} set `<T>` Set.
	 * @param {Function} f
	 *
	 * `f(item: T): boolean`
	 *
	 * Criteria.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {number} Number of items.
	 */
	/**
	 * @method map
	 *
	 * `<T extends JW.Class, U extends JW.Class>` Maps collection items.
	 *
	 * Builds new collection of the same type, consisting of results of `f` call for each collection item.
	 *
	 * @static
	 * @param {Object} set `<T>` Set.
	 * @param {Function} f
	 *
	 * `f(item: T): U`
	 *
	 * Mapping function.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {Object} `<U>` Mapped collection.
	 */
	/**
	 * @method $map
	 *
	 * `<T extends JW.Class, U extends JW.Class>` Maps collection items.
	 *
	 * Builds new collection of the same type, consisting of results of `f` call for each collection item.
	 *
	 * @static
	 * @param {Object} set `<T>` Set.
	 * @param {Function} f
	 *
	 * `f(item: T): U`
	 *
	 * Mapping function.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {JW.Set} `<U>` Mapped collection.
	 */
	/**
	 * @method add
	 * `<T extends JW.Class>` Adds item to set if one is absent.
	 * @static
	 * @param {Object} set `<T>` Set.
	 * @param {T} item Item.
	 * @returns {boolean} Item is added successfully.
	 */
	/**
	 * @method tryAdd
	 * `<T extends JW.Class>` Adds item to set if one is absent.
	 * @static
	 * @param {Object} set `<T>` Set.
	 * @param {T} item Item.
	 * @returns {boolean} Item is added successfully. If not modified - `undefined`.
	 */
	/**
	 * @method addAll
	 * `<T extends JW.Class>` Adds multiple items to set, ones that are absent.
	 * @static
	 * @param {Object} set `<T>` Set.
	 * @param {Array} items `<T>` Items.
	 * @returns {Array} `<T>` Added items.
	 */
	/**
	 * @method $addAll
	 * `<T extends JW.Class>` Adds multiple items to set, ones that are absent.
	 * @static
	 * @param {Object} set `<T>` Set.
	 * @param {Array} items `<T>` Items.
	 * @returns {JW.Array} `<T>` Added items.
	 */
	/**
	 * @method tryAddAll
	 * `<T extends JW.Class>` Adds multiple items to set, ones that are absent.
	 * @static
	 * @param {Object} set `<T>` Set.
	 * @param {Array} items `<T>` Items.
	 * @returns {Array} `<T>` Added items. If not modified - `undefined`.
	 */
	/**
	 * @method remove
	 * `<T extends JW.Class>` Removes item from set if one is present.
	 * @static
	 * @param {Object} set `<T>` Set.
	 * @param {T} item Item.
	 * @returns {boolean} Item is removed successfully.
	 */
	/**
	 * @method tryRemove
	 * `<T extends JW.Class>` Removes item from set if one is present.
	 * @static
	 * @param {Object} set `<T>` Set.
	 * @param {T} item Item.
	 * @returns {boolean} Item is removed successfully. If not modified - `undefined`.
	 */
	/**
	 * @method removeAll
	 * `<T extends JW.Class>` Removes multiple items from set, ones that are present.
	 * @static
	 * @param {Object} set `<T>` Set.
	 * @param {Array} items `<T>` Items.
	 * @returns {Array} `<T>` Removed items.
	 */
	/**
	 * @method $removeAll
	 * `<T extends JW.Class>` Removes multiple items from set, ones that are present.
	 * @static
	 * @param {Object} set `<T>` Set.
	 * @param {Array} items `<T>` Items.
	 * @returns {JW.Array} `<T>` Removed items.
	 */
	/**
	 * @method tryRemoveAll
	 * `<T extends JW.Class>` Removes multiple items from set, ones that are present.
	 * @static
	 * @param {Object} set `<T>` Set.
	 * @param {Array} items `<T>` Items.
	 * @returns {Array} `<T>` Removes items. If not modified - `undefined`.
	 */
	/**
	 * @method splice
	 * `<T extends JW.Class>` Removes and adds multiple items in map. Universal optimized granular operation of removal/insertion.
	 * @static
	 * @param {Object} set `<T>` Set.
	 * @param {Array} removedItems `<T>` Items to remove.
	 * @param {Array} addedItems `<T>` Items to add.
	 * @returns {JW.AbstractSet.SpliceResult} `<T>` Result.
	 */
	/**
	 * @method trySplice
	 * `<T extends JW.Class>` Removes and adds multiple items in map. Universal optimized granular operation of removal/insertion.
	 * @static
	 * @param {Object} set `<T>` Set.
	 * @param {Array} removedItems `<T>` Items to remove.
	 * @param {Array} addedItems `<T>` Items to add.
	 * @returns {JW.AbstractSet.SpliceResult} `<T>` Result. If not modified - `undefined`.
	 */
	/**
	 * @method detectSplice
	 * `<T extends JW.Class>` Detects {@link #static-method-splice} method arguments to adjust set contents to `newItems`.
	 * Determines which items should be removed and which ones should be added.
	 * @static
	 * @param {Object} set `<T>` Set.
	 * @param {Object} newItems `<T>` New map contents.
	 * @returns {JW.AbstractMap.SpliceParams}
	 * `<T>` #splice method arguments. If no method call required - `undefined`.
	 */
	/**
	 * @method performSplice
	 * `<T extends JW.Class>` Adjusts map contents to `newItems` using {@link #static-method-detectSplice} and {@link #static-method-splice} methods.
	 * @static
	 * @param {Object} set `<T>` Set.
	 * @param {Object} newItems `<T>` New map contents.
	 * @returns {void}
	 */
	/**
	 * @method equal
	 * `<T extends JW.Class>` Checks for set equality (===) to array, item by item.
	 * @static
	 * @param {Object} set `<T>` Set.
	 * @param {Array} array `<T>` Array.
	 * @returns {boolean} Set is equal to array.
	 */
});
;
/*
	jWidget Lib source file.

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

JW.AbstractCollection.createStaticMethods(JW.Set);

JW.apply(JW.Set, {
	getLength: function(target) {
		var length = 0;
		for (var key in target) {
			++length;
		}
		return length;
	},

	isEmpty: function(target) {
		for (var key in target) {
			return false;
		}
		return true;
	},

	getFirst: function(target) {
		for (var key in target) {
			return target[key];
		}
		return undefined;
	},

	containsItem: function(target, item) {
		return target.hasOwnProperty(item._iid);
	},

	contains: function(target, item) {
		return target.hasOwnProperty(item._iid);
	},

	every: function(target, callback, scope) {
		scope = scope || target;
		for (var iid in target) {
			if (callback.call(scope, target[iid]) === false) {
				return false;
			}
		}
		return true;
	},

	filter: function(target, callback, scope) {
		var result = {};
		JW.Set.every(target, function(item) {
			if (callback.call(this, item) !== false) {
				result[item._iid] = item;
			}
		}, scope);
		return result;
	},

	$filter: JW.AbstractCollection._createStatic$Set(JW.Set, "filter"),

	count: function(target, callback, scope) {
		var result = 0;
		JW.Set.every(target, function(item) {
			if (callback.call(this, item) !== false) {
				++result;
			}
		}, scope);
		return result;
	},

	map: function(target, callback, scope) {
		var result = {};
		JW.Set.every(target, function(item) {
			JW.Set.tryAdd(result, callback.call(this, item));
		}, scope);
		return result;
	},

	$map: JW.AbstractCollection._createStatic$Set(JW.Set, "map"),

	asSet: function(target) {
		return target;
	},

	add: function(target, item) {
		return JW.Set.tryAdd(target, item) !== undefined;
	},

	tryAdd: function(target, item) {
		var iid = item._iid;
		if (target.hasOwnProperty(iid)) {
			return;
		}
		target[iid] = item;
		return true;
	},

	addAll: function(target, items) {
		var result = JW.Set.tryAddAll(target, items);
		return (result !== undefined) ? result : [];
	},

	$addAll: JW.AbstractCollection._createStatic$Array(JW.Set, "addAll"),

	tryAddAll: function(target, items) {
		var addedItems = [];
		for (var i = 0, l = items.length; i < l; ++i) {
			var item = items[i];
			if (JW.Set.tryAdd(target, item)) {
				addedItems.push(item);
			}
		}
		if (addedItems.length !== 0) {
			return addedItems;
		}
	},

	remove: function(target, item) {
		return JW.Set.tryRemove(target, item) !== undefined;
	},

	tryRemove: function(target, item) {
		var iid = item._iid;
		if (!target.hasOwnProperty(iid)) {
			return;
		}
		delete target[iid];
		return true;
	},

	removeItem: function(target, item) {
		JW.Set.tryRemove(target, item);
	},

	removeAll: function(target, items) {
		var result = JW.Set.tryRemoveAll(target, items);
		return (result !== undefined) ? result : [];
	},

	$removeAll: JW.AbstractCollection._createStatic$Array(JW.Set, "removeAll"),

	tryRemoveAll: function(target, items) {
		var removedItems = [];
		for (var i = 0, l = items.length; i < l; ++i) {
			var item = items[i];
			if (JW.Set.tryRemove(target, item)) {
				removedItems.push(item);
			}
		}
		if (removedItems.length !== 0) {
			return removedItems;
		}
	},

	removeItems: function(target, items) {
		JW.Set.tryRemoveAll(target, items);
	},

	clear: function(target) {
		var result = JW.Set.tryClear(target);
		return (result !== undefined) ? result : [];
	},

	$clear: JW.AbstractCollection._createStatic$Array(JW.Set, "clear"),

	tryClear: function(target) {
		var items = JW.Set.toArray(target);
		if (!items.length) {
			return;
		}
		JW.Set.tryRemoveAll(target, items);
		return items;
	},

	splice: function(target, removedItems, addedItems) {
		var spliceResult = JW.Set.trySplice(target, removedItems, addedItems);
		return (spliceResult !== undefined) ? spliceResult : new JW.AbstractSet.SpliceResult([], []);
	},

	trySplice: function(target, removedItems, addedItems) {
		var addedItemSet = new JW.Set(addedItems);
		removedItems = JW.Array.filter(removedItems, function(item) { return !addedItemSet.contains(item); });
		removedItems = JW.Set.tryRemoveAll(target, removedItems);
		addedItems = JW.Set.tryAddAll(target, addedItems);
		if ((removedItems !== undefined) || (addedItems !== undefined)) {
			return new JW.AbstractSet.SpliceResult(removedItems || [], addedItems || []);
		}
	},

	detectSplice: function(oldItems, newItemArray) {
		var removedItems = [];
		var addedItems = [];
		var newItems = JW.Array.index(newItemArray, JW.byField("_iid"));
		for (var key in oldItems) {
			if (!newItems.hasOwnProperty(key)) {
				removedItems.push(oldItems[key]);
			}
		}
		for (var key in newItems) {
			if (!oldItems.hasOwnProperty(key)) {
				addedItems.push(newItems[key]);
			}
		}
		if ((removedItems.length !== 0) || (addedItems.length !== 0)) {
			return new JW.AbstractSet.SpliceParams(removedItems, addedItems);
		}
	},

	performSplice: function(target, newItems) {
		var spliceParams = JW.Set.detectSplice(target, newItems);
		if (spliceParams !== undefined) {
			JW.Set.trySplice(target, spliceParams.removedItems, spliceParams.addedItems);
		}
	},

	equal: function(x, y) {
		if (JW.Set.getLength(x) !== y.length) {
			return false;
		}
		for (var i = 0, l = y.length; i < l; ++i) {
			if (!x.hasOwnProperty(y[i]._iid)) {
				return false;
			}
		}
		return true;
	},

	single: function(item) {
		var result = {};
		result[item._iid] = item;
		return result;
	}
});
;
JW.ObservableCollection = {
	$$toSortedComparing: function(compare, scope, order) {
		var result = new JW.ObservableArray();
		result.own(this.createSorterComparing({
			target: result,
			compare: compare,
			scope: scope || this,
			order: order
		}));
		return result;
	},

	$$index: function(callback, scope) {
		var result = new JW.ObservableMap();
		result.own(this.createIndexer({
			target: result,
			getKey: callback,
			scope: scope || this
		}));
		return result;
	},

	$$toArray: function() {
		var result = new JW.ObservableArray();
		result.own(this.createOrderer({
			target: result
		}));
		return result;
	},

	$$toSet: function() {
		var result = new JW.ObservableSet();
		result.own(this.createLister({
			target: result
		}));
		return result;
	},

	$$filter: function(callback, scope) {
		var result = this.createEmpty();
		result.own(this.createFilterer({
			target: result,
			filterItem: callback,
			scope: scope || this
		}));
		return result;
	},

	$$count: function(callback, scope) {
		var result = new JW.Property(0);
		result.own(this.createCounter({
			target: result,
			filterItem: callback,
			scope: scope || this
		}));
		return result;
	},

	$$mapValues: function(callback, scope) {
		var result = this.createEmpty();
		result.own(this.createMapper({
			target: result,
			createItem: callback,
			scope: scope || this
		}));
		return result;
	},

	$$mapObjects: function(callback, scope) {
		var result = this.createEmpty();
		result.own(this.createMapper({
			target: result,
			createItem: callback,
			destroyItem: JW.destroy,
			scope: scope || this
		}));
		return result;
	}
};
;
/*
	jWidget Lib source file.

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

/**
 * @class
 *
 * `<T> extends JW.AbstractArray<T>`
 *
 * Has several events and an observable property #length.
 *
 * See structurized list of methods in JW.AbstractArray.
 *
 * @extends JW.AbstractArray
 *
 * @constructor
 * @param {Array} [items] `<T>` Initial contents. By default, created collection is empty.
 * @param {boolean} [adapter] Create array as adapter of `items`. Defaults to false, so `items` is copied.
 */
JW.ObservableArray = function(items, adapter) {
	JW.ObservableArray._super.call(this, items, adapter);
	this.length = new JW.Property(this.getLength());
	this.spliceEvent = new JW.Event();
	this.replaceEvent = new JW.Event();
	this.moveEvent = new JW.Event();
	this.clearEvent = new JW.Event();
	this.reorderEvent = new JW.Event();
	this.changeEvent = new JW.Event();
};

JW.extend(JW.ObservableArray, JW.AbstractArray, {
	/**
	 * @property {JW.Property} length `<Number>` Collection length. **Don't modify manually!**
	 */
	/**
	 * @event spliceEvent
	 * Items are removed from array and items are added to array. Triggered in result
	 * of calling #add, #tryAdd, #addAll, #tryAddAll, #remove, #tryRemove, #removeItem, #pop, #removeAll, #tryRemoveAll,
	 * {@link #removeItems}, #splice, #trySplice, #performSplice.
	 * @param {JW.ObservableArray.SpliceEventParams} params `<T>` Parameters.
	 */
	/**
	 * @event replaceEvent
	 * Item is replaced in array. Triggered in result of calling #set, #trySet.
	 * @param {JW.ObservableArray.ReplaceEventParams} params `<T>` Parameters.
	 */
	/**
	 * @event moveEvent
	 * Item is moved in array. Triggered in result of calling #move, #tryMove.
	 * @param {JW.ObservableArray.MoveEventParams} params `<T>` Parameters.
	 */
	/**
	 * @event clearEvent
	 * Array is cleared. Triggered in result of calling #clear, #$clear, #tryClear.
	 * @param {JW.ObservableArray.ItemsEventParams} params `<T>` Parameters.
	 */
	/**
	 * @event reorderEvent
	 * Items are reordered in array. Triggered in result
	 * of calling #reorder, #tryReorder, #performReorder, #sort, #sortComparing.
	 * @param {JW.ObservableArray.ReorderEventParams} params `<T>` Parameters.
	 */
	/**
	 * @event changeEvent
	 * Array is changed. Triggered right after one
	 * of events #spliceEvent, #replaceEvent, #moveEvent, #clearEvent, #reorderEvent.
	 * @param {JW.ObservableArray.EventParams} params `<T>` Parameters.
	 */

	// override
	destroyObject: function() {
		this.changeEvent.destroy();
		this.reorderEvent.destroy();
		this.clearEvent.destroy();
		this.moveEvent.destroy();
		this.replaceEvent.destroy();
		this.spliceEvent.destroy();
		this.length.destroy();
		this._super();
	},

	// override
	trySet: function(item, index) {
		var oldItem = this._trySet(item, index);
		if (oldItem === undefined) {
			return;
		}
		this.replaceEvent.trigger(new JW.ObservableArray.ReplaceEventParams(this, index, oldItem.value, item));
		this.changeEvent.trigger(new JW.ObservableArray.EventParams(this));
		if (this._ownsItems) {
			oldItem.get().destroy();
		}
		return oldItem;
	},

	// override
	tryMove: function(fromIndex, toIndex) {
		var item = this._super(fromIndex, toIndex);
		if (item === undefined) {
			return;
		}
		this.moveEvent.trigger(new JW.ObservableArray.MoveEventParams(this, fromIndex, toIndex, item));
		this.changeEvent.trigger(new JW.ObservableArray.EventParams(this));
		return item;
	},

	// override
	tryClear: function() {
		var oldItems = this._tryClear();
		if (oldItems === undefined) {
			return;
		}
		this.length.set(0);
		this.clearEvent.trigger(new JW.ObservableArray.ItemsEventParams(this, oldItems));
		this.changeEvent.trigger(new JW.ObservableArray.EventParams(this));
		if (this._ownsItems) {
			JW.Array.backEvery(oldItems, JW.destroy);
		}
		return oldItems;
	},

	// override
	trySplice: function(removeParamsList, addParamsList) {
		var result = this._trySplice(removeParamsList, addParamsList);
		if (result === undefined) {
			return;
		}
		this.length.set(this.getLength());
		this.spliceEvent.trigger(new JW.ObservableArray.SpliceEventParams(this, result));
		this.changeEvent.trigger(new JW.ObservableArray.EventParams(this));
		if (this._ownsItems) {
			JW.Array.backEvery(result.getRemovedItems(), JW.destroy);
		}
		return result;
	},

	// override
	tryReorder: function(indexArray) {
		var items = this._super(indexArray);
		if (items === undefined) {
			return;
		}
		this.reorderEvent.trigger(new JW.ObservableArray.ReorderEventParams(this, indexArray, items));
		this.changeEvent.trigger(new JW.ObservableArray.EventParams(this));
		return items;
	},

	// override
	reverse: function() {
		var length = this.getLength();
		var indices = new Array(length);
		for (var i = 0; i < length; ++i) {
			indices[i] = length - i - 1;
		}
		this.reorder(indices);
	},

	// override
	$$toReversed: function() {
		var result = new JW.ObservableArray();
		result.own(this.createReverser({
			target: result
		}));
		return result;
	},

	/**
	 * `<U>` Creates empty collection of the same type.
	 * @returns {JW.ObservableArray} `<U>` Collection.
	 */
	createEmpty: function() {
		return new JW.ObservableArray();
	},

	/**
	 * `<U>` Creates empty array of the same observability level.
	 * @returns {JW.ObservableArray} `<U>` Array.
	 */
	createEmptyArray: function() {
		return new JW.ObservableArray();
	},

	/**
	 * `<U>` Creates empty map of the same observability level.
	 * @returns {JW.ObservableMap} `<U>` Map.
	 */
	createEmptyMap: function() {
		return new JW.ObservableMap();
	},

	/**
	 * `<U>` Creates empty set of the same observability level.
	 * @returns {JW.ObservableSet} `<U>` Set.
	 */
	createEmptySet: function() {
		return new JW.ObservableSet();
	},

	/**
	 * `<U>` Creates collection item mapper.
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} config Configuration (see synchronizer's Config options).
	 * @returns {JW.ObservableArray.Mapper}
	 * `<T, U>` Synchronizer.
	 */
	createMapper: function(config) {
		return new JW.ObservableArray.Mapper(this, config);
	},

	/**
	 * Creates collection filterer.
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} config Configuration (see synchronizer's Config options).
	 * @returns {JW.ObservableArray.Filterer}
	 * `<T>` Synchronizer.
	 */
	createFilterer: function(config) {
		return new JW.ObservableArray.Filterer(this, config);
	},

	/**
	 * Creates matching item counter.
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} config Configuration (see synchronizer's Config options).
	 * @returns {JW.ObservableArray.Counter}
	 * `<T>` Synchronizer.
	 */
	createCounter: function(config) {
		return new JW.ObservableArray.Counter(this, config);
	},

	/**
	 * Creates collection observer.
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} config Configuration (see synchronizer's Config options).
	 * @returns {JW.ObservableArray.Observer}
	 * `<T>` Synchronizer.
	 */
	createObserver: function(config) {
		return new JW.ObservableArray.Observer(this, config);
	},

	/**
	 * Creates collection converter to array (orderer).
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} [config] Configuration (see synchronizer's Config options).
	 * @returns {JW.ObservableArray.Orderer}
	 * `<T>` Synchronizer.
	 */
	createOrderer: function(config) {
		return new JW.ObservableArray.Orderer(this, config);
	},

	/**
	 * Creates collection converter to array (sorter by comparer).
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} config Configuration (see synchronizer's Config options).
	 * @returns {JW.ObservableArray.SorterComparing}
	 * `<T>` Synchronizer.
	 */
	createSorterComparing: function(config) {
		return new JW.ObservableArray.SorterComparing(this, config);
	},

	/**
	 * Creates collection converter to map (indexer).
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} config Configuration (see synchronizer's Config options).
	 * @returns {JW.ObservableArray.Indexer}
	 * `<T>` Synchronizer.
	 */
	createIndexer: function(config) {
		return new JW.ObservableArray.Indexer(this, config);
	},

	/**
	 * Creates collection converter to set.
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} [config] Configuration (see synchronizer's Config options).
	 * @returns {JW.ObservableArray.Lister}
	 * `<T>` Synchronizer.
	 */
	createLister: function(config) {
		return new JW.ObservableArray.Lister(this, config);
	},

	/**
	 * Creates view synchronizer with array.
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} config Configuration (see synchronizer's Config options).
	 * @returns {JW.ObservableArray.Inserter}
	 * `<T>` Synchronizer.
	 */
	createInserter: function(config) {
		return new JW.ObservableArray.Inserter(this, config);
	},

	/**
	 * Creates arrays merger.
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} [config] Configuration (see synchronizer's Config options).
	 * @returns {JW.ObservableArray.Merger}
	 * `<T>` Synchronizer.
	 */
	createMerger: function(config) {
		return new JW.ObservableArray.Merger(this, config);
	},

	createMergerBunch: function(merger) {
		return new JW.ObservableArray.Merger.Bunch(merger, this);
	},

	/**
	 * Creates array reverser.
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} [config] Configuration (see synchronizer's Config options).
	 * @returns {JW.ObservableArray.Reverser}
	 * `<T>` Synchronizer.
	 */
	createReverser: function(config) {
		return new JW.ObservableArray.Reverser(this, config);
	},

	createSplitter: function(config) {
		return new JW.ObservableArray.Splitter(this, config);
	},

	_createMergerTarget: function() {
		return new JW.ObservableArray();
	}
});

JW.apply(JW.ObservableArray.prototype, JW.ObservableCollection);

/**
 * @class
 * `<T>` JW.ObservableArray event parameters.
 * @extends JW.EventParams
 *
 * @constructor
 * @param {JW.ObservableArray} sender `<T>` Event sender.
 */
JW.ObservableArray.EventParams = function(sender) {
	JW.ObservableArray.EventParams._super.call(this, sender);
};

JW.extend(JW.ObservableArray.EventParams, JW.EventParams, {
	/**
	 * @property {JW.ObservableArray} sender `<T>` Event sender.
	 */
});

/**
 * @class
 *
 * `<T> extends JW.ObservableArray.EventParams<T>`
 *
 * Parameters of JW.ObservableArray#spliceEvent.
 *
 * @extends JW.ObservableArray.EventParams
 *
 * @constructor
 * @param {JW.ObservableArray} sender `<T>` Event sender.
 * @param {JW.AbstractArray.SpliceResult} spliceResult `<T>` Result of JW.AbstractArray#splice method.
 */
JW.ObservableArray.SpliceEventParams = function(sender, spliceResult) {
	JW.ObservableArray.SpliceEventParams._super.call(this, sender);
	this.spliceResult = spliceResult;
};

JW.extend(JW.ObservableArray.SpliceEventParams/*<T>*/, JW.ObservableArray.EventParams/*<T>*/, {
	/**
	 * @property {JW.AbstractArray.SpliceResult} spliceResult `<T>` Result of JW.AbstractArray#splice method.
	 */
});

/**
 * @class
 *
 * `<T> extends JW.ObservableArray.EventParams<T>`
 *
 * Parameters of JW.ObservableArray#moveEvent.
 *
 * @extends JW.ObservableArray.EventParams
 *
 * @constructor
 * @param {JW.ObservableArray} sender `<T>` Event sender.
 * @param {number} fromIndex Where item is moved from.
 * @param {number} toIndex Where item is moved to.
 * @param {T} item Item.
 */
JW.ObservableArray.MoveEventParams = function(sender, fromIndex, toIndex, item) {
	JW.ObservableArray.MoveEventParams._super.call(this, sender);
	this.fromIndex = fromIndex;
	this.toIndex = toIndex;
	this.item = item;
};

JW.extend(JW.ObservableArray.MoveEventParams, JW.ObservableArray.EventParams, {
	/**
	 * @property {number} fromIndex Where item is moved from.
	 */
	/**
	 * @property {number} toIndex Where item is moved to.
	 */
	/**
	 * @property {T} item Item.
	 */
});

/**
 * @class
 *
 * `<T> extends JW.ObservableArray.EventParams<T>`
 *
 * Parameters of JW.ObservableArray#replaceEvent.
 *
 * @extends JW.ObservableArray.EventParams
 *
 * @constructor
 * @param {JW.ObservableArray} sender `<T>` Event sender.
 * @param {number} index Item index.
 * @param {T} oldItem Old value.
 * @param {T} newItem New value.
 */
JW.ObservableArray.ReplaceEventParams = function(sender, index, oldItem, newItem) {
	JW.ObservableArray.ReplaceEventParams._super.call(this, sender);
	this.index = index;
	this.oldItem = oldItem;
	this.newItem = newItem;
};

JW.extend(JW.ObservableArray.ReplaceEventParams, JW.ObservableArray.EventParams, {
	/**
	 * @property {number} index Item index.
	 */
	/**
	 * @property {T} oldItem Old value.
	 */
	/**
	 * @property {T} newItem New value.
	 */
});

/**
 * @class
 *
 * `<T> extends JW.ObservableArray.EventParams<T>`
 *
 * Parameters of JW.ObservableArray event which bring its old contents.
 *
 * @extends JW.ObservableArray.EventParams
 *
 * @constructor
 * @param {JW.ObservableArray} sender `<T>` Event sender.
 * @param {Array} items `<T>` Old array contents.
 */
JW.ObservableArray.ItemsEventParams = function(sender, items) {
	JW.ObservableArray.ItemsEventParams._super.call(this, sender);
	this.items = items;
};

JW.extend(JW.ObservableArray.ItemsEventParams, JW.ObservableArray.EventParams, {
	/**
	 * @property {Array} items `<T>` Old array contents.
	 */
});

/**
 * @class
 *
 * `<T> extends JW.ObservableArray.ItemsEventParams<T>`
 *
 * Parameters of JW.ObservableArray#reorderEvent.
 *
 * @extends JW.ObservableArray.ItemsEventParams
 *
 * @constructor
 * @param {JW.ObservableArray} sender `<T>` Event sender.
 * @param {Array} indexArray `<number>` Indexes of items in reordered array.
 * @param {Array} items `<T>` Old array contents.
 */
JW.ObservableArray.ReorderEventParams = function(sender, indexArray, items) {
	JW.ObservableArray.ReorderEventParams._super.call(this, sender, items);
	this.indexArray = indexArray;
};

JW.extend(JW.ObservableArray.ReorderEventParams, JW.ObservableArray.ItemsEventParams, {
	/**
	 * @property {Array} indexArray `<number>` Indexes of items in reordered array.
	 */
});
;
/*
	jWidget Lib source file.

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

/**
 * @class
 *
 * `<T> extends JW.AbstractArray.Counter<T>`
 *
 * See JW.AbstractCollection.Counter for details.
 *
 * @extends JW.AbstractArray.Counter
 *
 * @constructor
 * Creates synchronizer. JW.AbstractCollection#createCounter method is preferrable instead.
 * @param {JW.ObservableArray} source `<T>` Source collection.
 * @param {Object} config Configuration (see Config options).
 */
JW.ObservableArray.Counter = function(source, config) {
	JW.ObservableArray.Counter._super.call(this, source, config);
	this.own(source.spliceEvent.bind(this._onSplice, this));
	this.own(source.replaceEvent.bind(this._onReplace, this));
	this.own(source.clearEvent.bind(this._onClear, this));
};

JW.extend(JW.ObservableArray.Counter, JW.AbstractArray.Counter, {
	_onSplice: function(params) {
		var spliceResult = params.spliceResult;
		var value = this.target.get();
		JW.Array.every(spliceResult.removedItemsList, function(indexItems) {
			value -= JW.Array.count(indexItems.items, this.filterItem, this.scope);
		}, this);
		JW.Array.every(spliceResult.addedItemsList, function(indexItems) {
			value += JW.Array.count(indexItems.items, this.filterItem, this.scope);
		}, this);
		this.target.set(value);
	},

	_onReplace: function(params) {
		var oldFiltered = this.filterItem.call(this.scope, params.oldItem) !== false;
		var newFiltered = this.filterItem.call(this.scope, params.newItem) !== false;
		if (oldFiltered && !newFiltered) {
			this.target.set(this.target.get() - 1);
		} else if (!oldFiltered && newFiltered) {
			this.target.set(this.target.get() + 1);
		}
	},

	_onClear: function(params) {
		this.target.set(0);
	}
});
;
/*
	jWidget Lib source file.
	
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

/**
 * @class
 *
 * `<T> extends JW.AbstractArray.Filterer<T>`
 *
 * See JW.AbstractCollection.Filterer for details.
 *
 * @extends JW.AbstractArray.Filterer
 *
 * @constructor
 * Creates synchronizer. JW.AbstractCollection#createFilterer method is preferrable instead.
 * @param {JW.ObservableArray} source `<T>` Source collection.
 * @param {Object} config Configuration (see Config options).
 */
JW.ObservableArray.Filterer = function(source, config) {
	JW.ObservableArray.Filterer._super.call(this, source, config);
	this.own(source.spliceEvent.bind(this._onSplice, this));
	this.own(source.replaceEvent.bind(this._onReplace, this));
	this.own(source.moveEvent.bind(this._onMove, this));
	this.own(source.clearEvent.bind(this._onClear, this));
	this.own(source.reorderEvent.bind(this._onReorder, this));
};

JW.extend(JW.ObservableArray.Filterer, JW.AbstractArray.Filterer, {
	_onSplice: function(params) {
		var spliceResult = params.spliceResult;
		this._splice(spliceResult.removedItemsList, spliceResult.addedItemsList);
	},
	
	_onReplace: function(params) {
		var oldFiltered = this._filtered[params.index] !== 0;
		var newFiltered = this.filterItem.call(this.scope, params.newItem) !== false;
		if (!oldFiltered && !newFiltered) {
			return;
		}
		var index = this._countFiltered(0, params.index);
		this._filtered[params.index] = newFiltered ? 1 : 0;
		if (!newFiltered) {
			this.target.tryRemove(index);
		} else if (!oldFiltered) {
			this.target.tryAdd(params.newItem, index);
		} else {
			this.target.trySet(params.newItem, index);
		}
	},
	
	_onMove: function(params) {
		if (this._filtered[params.fromIndex] !== 0) {
			var fromIndex, toIndex;
			if (params.fromIndex < params.toIndex) {
				fromIndex = this._countFiltered(0, params.fromIndex);
				toIndex = fromIndex + this._countFiltered(params.fromIndex + 1, params.toIndex - params.fromIndex);
			} else {
				toIndex = this._countFiltered(0, params.toIndex);
				fromIndex = toIndex + this._countFiltered(params.toIndex, params.fromIndex - params.toIndex);
			}
			this.target.tryMove(fromIndex, toIndex);
		}
		JW.Array.tryMove(this._filtered, params.fromIndex, params.toIndex);
	},
	
	_onClear: function(params) {
		this.target.tryClear();
	},
	
	_onReorder: function(params) {
		var targetIndex = 0;
		var targetIndexWhichMovesToI = {}
		for (var sourceIndex = 0, l = this._filtered.length; sourceIndex < l; ++sourceIndex) {
			if (this._filtered[sourceIndex] !== 0) {
				targetIndexWhichMovesToI[params.indexArray[sourceIndex]] = targetIndex++;
			}
		}
		JW.Array.tryReorder(this._filtered, params.indexArray);
		
		var targetIndex = 0;
		var indexes = new Array(this.target.getLength());
		for (var sourceIndex = 0, l = this._filtered.length; sourceIndex < l; ++sourceIndex) {
			if (this._filtered[sourceIndex] !== 0) {
				indexes[targetIndexWhichMovesToI[sourceIndex]] = targetIndex++;
			}
		}
		
		this.target.tryReorder(indexes);
	}
});
;
/*
	jWidget Lib source file.
	
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

/**
 * @class
 *
 * `<T> extends JW.AbstractArray.Indexer<T>`
 *
 * See JW.AbstractCollection.Indexer for details.
 *
 * @extends JW.AbstractArray.Indexer
 *
 * @constructor
 * Creates synchronizer. JW.AbstractCollection#createIndexer method is preferrable instead.
 * @param {JW.ObservableArray} source `<T>` Source collection.
 * @param {Object} config Configuration (see Config options).
 */
JW.ObservableArray.Indexer = function(source, config) {
	JW.ObservableArray.Indexer._super.call(this, source, config);
	this.own(source.spliceEvent.bind(this._onSplice, this));
	this.own(source.replaceEvent.bind(this._onReplace, this));
	this.own(source.clearEvent.bind(this._onClear, this));
};

JW.extend(JW.ObservableArray.Indexer, JW.AbstractArray.Indexer, {
	_onSplice: function(params) {
		var spliceResult = params.spliceResult;
		this.target.trySplice(
			this._keys(spliceResult.getRemovedItems()),
			this._index(spliceResult.getAddedItems()));
	},
	
	_onReplace: function(params) {
		this.target.trySplice(
			this._keys([params.oldItem]),
			this._index([params.newItem]));
	},
	
	_onClear: function(params) {
		this.target.tryRemoveAll(
			this._keys(params.items));
	}
});
;
/*
	jWidget Lib source file.
	
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

/**
 * @class
 *
 * `<T> extends JW.AbstractArray.Inserter<T>`
 *
 * See JW.AbstractArray.Inserter for details.
 *
 * @extends JW.AbstractArray.Inserter
 *
 * @constructor
 * Creates synchronizer. JW.AbstractArray#createInserter method is preferrable instead.
 * @param {JW.ObservableArray} source `<T>` Source collection.
 * @param {Object} config Configuration (see Config options).
 */
JW.ObservableArray.Inserter = function(source, config) {
	JW.ObservableArray.Inserter._super.call(this, source, config);
	this.own(source.spliceEvent.bind(this._onSplice, this));
	this.own(source.replaceEvent.bind(this._onReplace, this));
	this.own(source.moveEvent.bind(this._onMove, this));
	this.own(source.clearEvent.bind(this._onClear, this));
	this.own(source.reorderEvent.bind(this._onReorder, this));
};

JW.extend(JW.ObservableArray.Inserter, JW.AbstractArray.Inserter, {
	_onSplice: function(params) {
		var spliceResult = params.spliceResult;
		var oldItems = spliceResult.oldItems;
		var removedItems = spliceResult.getRemovedItems();
		
		// if there is an effective clearing function, just reset the controller
		if (this.clearItems && (3 * removedItems.length > 2 * oldItems.length)) {
			this.clearItems.call(this.scope, oldItems);
			this._addItems(this.source.getItems(), 0);
			return;
		}
		
		// else, splice the elements
		var removedItemsList = spliceResult.removedItemsList;
		var addedItemsList = spliceResult.addedItemsList;
		for (var i = removedItemsList.length - 1; i >= 0; --i) {
			var removeRarams = removedItemsList[i];
			this._removeItems(removeRarams.items, removeRarams.index);
		}
		for (var i = 0, l = addedItemsList.length; i < l; ++i) {
			var addParams = addedItemsList[i];
			this._addItems(addParams.items, addParams.index);
		}
	},
	
	_onReplace: function(params) {
		if (this.removeItem) {
			this.removeItem.call(this.scope, params.oldItem, params.index);
		}
		if (this.addItem) {
			this.addItem.call(this.scope, params.newItem, params.index);
		}
	},
	
	_onMove: function(params) {
		if (this.removeItem) {
			this.removeItem.call(this.scope, params.item, params.fromIndex);
		}
		if (this.addItem) {
			this.addItem.call(this.scope, params.item, params.toIndex);
		}
	},
	
	_onClear: function(params) {
		this._clearItems(params.items);
	},
	
	_onReorder: function(params) {
		this._clearItems(params.items);
		this._addItems(this.source.getItems(), 0);
	}
});
;
/*
	jWidget Lib source file.
	
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

/**
 * @class
 *
 * `<T extends JW.Class> extends JW.AbstractArray.Lister<T>`
 *
 * See JW.AbstractCollection.Lister for details.
 *
 * @extends JW.AbstractArray.Lister
 *
 * @constructor
 * Creates synchronizer. JW.AbstractCollection#createLister method is preferrable instead.
 * @param {JW.ObservableArray} source `<T>` Source collection.
 * @param {Object} [config] Configuration (see Config options).
 */
JW.ObservableArray.Lister = function(source, config) {
	JW.ObservableArray.Lister._super.call(this, source, config);
	this.own(this.source.spliceEvent.bind(this._onSplice, this));
	this.own(this.source.replaceEvent.bind(this._onReplace, this));
	this.own(this.source.clearEvent.bind(this._onClear, this));
};

JW.extend(JW.ObservableArray.Lister, JW.AbstractArray.Lister, {
	_onSplice: function(params) {
		var spliceResult = params.spliceResult;
		this.target.trySplice(spliceResult.getRemovedItems(), spliceResult.getAddedItems());
	},
	
	_onReplace: function(params) {
		this.target.trySplice([params.oldItem], [params.newItem]);
	},
	
	_onClear: function(params) {
		this.target.tryRemoveAll(params.items);
	}
});
;
/*
	jWidget Lib source file.
	
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

/**
 * @class
 *
 * `<T, U> extends JW.AbstractArray.Mapper<T, U>`
 *
 * See JW.AbstractCollection.Mapper for details.
 *
 * @extends JW.AbstractArray.Mapper
 *
 * @constructor
 * Creates synchronizer. JW.AbstractCollection#createMapper method is preferrable instead.
 * @param {JW.ObservableArray} source `<T>` Source collection.
 * @param {Object} config Configuration (see Config options).
 */
JW.ObservableArray.Mapper = function(source, config) {
	JW.ObservableArray.Mapper._super.call(this, source, config);
	this.own(source.spliceEvent.bind(this._onSplice, this));
	this.own(source.replaceEvent.bind(this._onReplace, this));
	this.own(source.moveEvent.bind(this._onMove, this));
	this.own(source.clearEvent.bind(this._onClear, this));
	this.own(source.reorderEvent.bind(this._onReorder, this));
};

JW.extend(JW.ObservableArray.Mapper, JW.AbstractArray.Mapper, {
	_onSplice: function(params) {
		var sourceResult = params.spliceResult;
		var sourceAddedItemsList = sourceResult.addedItemsList;
		var targetAddParamsList = [];
		for (var i = 0, l = sourceAddedItemsList.length; i < l; ++i) {
			var addParams = sourceAddedItemsList[i];
			targetAddParamsList.push(new JW.AbstractArray.IndexItems(
				addParams.index, this._createItems(addParams.items)));
		}
		var targetResult = this.target.trySplice(sourceResult.getRemoveParamsList(), targetAddParamsList);
		var sourceRemovedItemsList = sourceResult.removedItemsList;
		var targetRemovedItemsList = targetResult.removedItemsList;
		for (var i = targetRemovedItemsList.length - 1; i >= 0; --i) {
			this._destroyItems(targetRemovedItemsList[i].items, sourceRemovedItemsList[i].items);
		}
	},
	
	_onReplace: function(params) {
		var newItem = this.createItem.call(this.scope, params.newItem);
		var oldItem = this.target.trySet(newItem, params.index).value;
		this.destroyItem.call(this.scope, oldItem, params.oldItem);
	},
	
	_onMove: function(params) {
		this.target.tryMove(params.fromIndex, params.toIndex);
	},
	
	_onClear: function(params) {
		this._destroyItems(this.target.tryClear(), params.items);
	},
	
	_onReorder: function(params) {
		this.target.tryReorder(params.indexArray);
	}
});
;
/*
	jWidget Lib source file.
	
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

/**
 * @class
 *
 * `<T> extends JW.AbstractArray.Merger<T>`
 *
 * See JW.AbstractArray.Merger for details.
 *
 * @extends JW.AbstractArray.Merger
 *
 * @constructor
 * Creates synchronizer. JW.AbstractArray#createMerger method is preferrable instead.
 * @param {JW.ObservableArray} source `<T>` Source collection.
 * @param {Object} [config] Configuration (see Config options).
 */
JW.ObservableArray.Merger = function(source, config) {
	JW.ObservableArray.Merger._super.call(this, source, config);
	this.own(source.spliceEvent.bind(this._onSplice, this));
	this.own(source.replaceEvent.bind(this._onReplace, this));
	this.own(source.moveEvent.bind(this._onMove, this));
	this.own(source.clearEvent.bind(this._onClear, this));
	this.own(source.reorderEvent.bind(this._onReorder, this));
};

JW.extend(JW.ObservableArray.Merger, JW.AbstractArray.Merger, {
	_getIndexes: function(bunches) {
		var currentIndex = 0;
		var indexes = JW.Array.map(bunches, function(bunch) {
			var index = currentIndex;
			currentIndex += bunch.getLength();
			return index;
		}, this);
		indexes.push(currentIndex);
		return indexes;
	},
	
	// 0 x,x
	// 2 x,x,x delete
	// 5 x,x,x,x
	// 9 x,x
	
	// 0 x,x
	// 2 x,x,x,x
	// 6 x,x
	
	_onSplice: function(params) {
		var spliceResult = params.spliceResult;
		var indexes = this._getIndexes(spliceResult.oldItems);
		var removeParamsList = JW.Array.map(spliceResult.removedItemsList, function(indexItems) {
			return new JW.AbstractArray.IndexCount(indexes[indexItems.index], this._count(indexItems.items));
		}, this);
		JW.Array.backEvery(spliceResult.removedItemsList, function(indexItems) {
			indexes.splice(indexItems.index, indexItems.items.length);
			var count = this._count(indexItems.items);
			for (var i = indexItems.index; i < indexes.length; ++i) {
				indexes[i] -= count;
			}
		}, this);
		var addParamsList = JW.Array.map(spliceResult.addedItemsList, function(indexItems) {
			return new JW.AbstractArray.IndexItems(indexes[indexItems.index], this._merge(indexItems.items));
		}, this);
		this.target.trySplice(removeParamsList, addParamsList);
	},
	
	_onReplace: function(params) {
		var index = this._count(this.source.getItems(), 0, params.index);
		this.target.trySplice(
			[new JW.AbstractArray.IndexCount(index, params.oldItem.getLength())],
			[new JW.AbstractArray.IndexItems(index, params.newItem.getItems())]);
	},
	
	_onMove: function(params) {
		var count = params.item.getLength();
		var indexes = new Array(this.target.getLength());
		var currentIndex = 0;
		
		function shiftBunch(bunchLength, shift) {
			for (var j = 0; j < bunchLength; ++j) {
				indexes[currentIndex] = currentIndex + shift;
				++currentIndex;
			}
		}
		
		for (var i = 0, l = Math.min(params.fromIndex, params.toIndex); i < l; ++i) {
			shiftBunch(this.source.get(i).getLength(), 0);
		}
		if (params.fromIndex <= params.toIndex) {
			// [1], [2], [3], [4], [5]        [2] move to 3
			// [1], [3], [4], [2], [5]
			shiftBunch(count, this._count(this.source.getItems(), params.fromIndex, params.toIndex - params.fromIndex));
			for (var i = params.fromIndex; i < params.toIndex; ++i) {
				shiftBunch(this.source.get(i).getLength(), -count);
			}
		} else {
			// [1], [2], [3], [4], [5]        [4] move to 1
			// [1], [4], [2], [3], [5]
			for (var i = params.toIndex + 1; i <= params.fromIndex; ++i) {
				shiftBunch(this.source.get(i).getLength(), count);
			}
			shiftBunch(count, -this._count(this.source.getItems(), params.toIndex + 1, params.fromIndex - params.toIndex));
		}
		for (var i = Math.max(params.fromIndex, params.toIndex) + 1, l = this.source.getLength(); i < l; ++i) {
			shiftBunch(this.source.get(i).getLength(), 0);
		}
		
		this.target.tryReorder(indexes);
	},
	
	_onClear: function(params) {
		this.target.tryClear();
	},
	
	_onReorder: function(params) {
		var oldIndexes = this._getIndexes(params.items);
		var newIndexes = this._getIndexes(this.source.getItems());
		var indexes = new Array(this.target.getLength());
		for (var i = 0, l = params.items.length; i < l; ++i) {
			var bunch = params.items[i];
			var oldIndex = oldIndexes[i];
			var newIndex = newIndexes[params.indexArray[i]];
			for (var j = 0, m = bunch.getLength(); j < m; ++j) {
				indexes[oldIndex + j] = newIndex + j;
			}
		}
		this.target.tryReorder(indexes);
	}
});
;
/*
	jWidget Lib source file.
	
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

JW.ObservableArray.Merger.Bunch = function(merger, bunch) {
	JW.ObservableArray.Merger.Bunch._super.call(this);
	this.source = merger.source;
	this.target = merger.target;
	this.bunch = bunch;
	this.own(bunch.spliceEvent.bind(this._onSplice, this));
	this.own(bunch.replaceEvent.bind(this._onReplace, this));
	this.own(bunch.moveEvent.bind(this._onMove, this));
	this.own(bunch.clearEvent.bind(this._onClear, this));
	this.own(bunch.reorderEvent.bind(this._onReorder, this));
};

JW.extend(JW.ObservableArray.Merger.Bunch, JW.AbstractArray.Merger.Bunch, {
	/*
	Fields
	JW.AbstractArray<? extends JW.ObservableArray<T>> source;
	JW.AbstractArray<T> target;
	JW.AbstractArray<T> bunch;
	*/
	
	_getIndex: function() {
		var bunches = this.source.getItems();
		var index = 0;
		for (var i = 0, l = bunches.length; i < l; ++i) {
			var bunch = bunches[i];
			if (bunch === this.bunch) {
				return index;
			}
			index += bunch.getLength();
		}
		console.warn("JW.ObservableArray.Merger object is corrupted");
		return 0;
	},
	
	_onSplice: function(params) {
		var spliceResult = params.spliceResult;
		var index = this._getIndex();
		var removeParamsList = JW.Array.map(spliceResult.removedItemsList, function(indexItems) {
			return new JW.AbstractArray.IndexCount(indexItems.index + index, indexItems.items.length);
		}, this);
		var addParamsList = JW.Array.map(spliceResult.addedItemsList, function(indexItems) {
			return new JW.AbstractArray.IndexItems(indexItems.index + index, indexItems.items.concat());
		}, this);
		this.target.trySplice(removeParamsList, addParamsList);
	},
	
	_onReplace: function(params) {
		this.target.trySet(params.newItem, this._getIndex() + params.index);
	},
	
	_onMove: function(params) {
		var index = this._getIndex();
		this.target.tryMove(index + params.fromIndex, index + params.toIndex);
	},
	
	_onClear: function(params) {
		this.target.tryRemoveAll(this._getIndex(), params.items.length);
	},
	
	_onReorder: function(params) {
		var index = this._getIndex();
		var bunchIndexArray = params.indexArray;
		var bunchLength = bunchIndexArray.length;
		var targetLength = this.target.getLength();
		var targetIndexArray = new Array(targetLength);
		for (var i = 0; i < index; ++i) {
			targetIndexArray[i] = i;
		}
		for (var i = 0; i < bunchLength; ++i) {
			targetIndexArray[index + i] = index + bunchIndexArray[i];
		}
		for (var i = index + bunchLength; i < targetLength; ++i) {
			targetIndexArray[i] = i;
		}
		this.target.tryReorder(targetIndexArray);
	}
});
;
/*
	jWidget Lib source file.
	
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

/**
 * @class
 *
 * `<T> extends JW.AbstractArray.Observer<T>`
 *
 * See JW.AbstractCollection.Observer for details.
 *
 * @extends JW.AbstractArray.Observer
 *
 * @constructor
 * Creates synchronizer. JW.AbstractCollection#createObserver method is preferrable instead.
 * @param {JW.ObservableArray} source `<T>` Source collection.
 * @param {Object} config Configuration (see Config options).
 */
JW.ObservableArray.Observer = function(source, config) {
	JW.ObservableArray.Observer._super.call(this, source, config);
	this.own(source.spliceEvent.bind(this._onSplice, this));
	this.own(source.replaceEvent.bind(this._onReplace, this));
	this.own(source.clearEvent.bind(this._onClear, this));
	if (this.change) {
		this.own(source.changeEvent.bind(this._onChange, this));
	}
};

JW.extend(JW.ObservableArray.Observer, JW.AbstractArray.Observer, {
	_onSplice: function(params) {
		var spliceResult = params.spliceResult;
		var oldItems = spliceResult.oldItems;
		var removedItems = spliceResult.getRemovedItems();
		
		if (this.clearItems && (3 * removedItems.length > 2 * oldItems.length)) {
			// if there is an effective clearing function, just reset the controller
			this.clearItems.call(this.scope, oldItems);
			this._addItems(this.source.getItems());
		} else {
			// else, splice the elements
			this._removeItems(removedItems);
			this._addItems(spliceResult.getAddedItems());
		}
	},
	
	_onReplace: function(params) {
		if (this.removeItem) {
			this.removeItem.call(this.scope, params.oldItem);
		}
		if (this.addItem) {
			this.addItem.call(this.scope, params.newItem);
		}
	},
	
	_onClear: function(params) {
		this._clearItems(params.items);
	}
});
;
/*
	jWidget Lib source file.
	
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

/**
 * @class
 *
 * `<T extends JW.Class> extends JW.AbstractArray.Orderer<T>`
 *
 * See JW.AbstractCollection.Orderer for details.
 *
 * @extends JW.AbstractArray.Orderer
 *
 * @constructor
 * Creates synchronizer. JW.AbstractCollection#createOrderer method is preferrable instead.
 * @param {JW.ObservableArray} source `<T>` Source collection.
 * @param {Object} [config] Configuration (see Config options).
 */
JW.ObservableArray.Orderer = function(source, config) {
	JW.ObservableArray.Orderer._super.call(this, source, config);
	this.own(source.spliceEvent.bind(this._onSplice, this));
	this.own(source.replaceEvent.bind(this._onReplace, this));
	this.own(source.clearEvent.bind(this._onClear, this));
};

JW.extend(JW.ObservableArray.Orderer, JW.AbstractArray.Orderer, {
	_onSplice: function(params) {
		var spliceResult = params.spliceResult;
		this._splice(
			JW.Array.toSet(spliceResult.getRemovedItems()),
			JW.Array.toSet(spliceResult.getAddedItems()));
	},
	
	_onReplace: function(params) {
		var index = this.target.keyOf(params.oldItem);
		this.target.trySplice(
			[new JW.AbstractArray.IndexCount(index, 1)],
			[new JW.AbstractArray.IndexItems(this.target.getLength() - 1, [params.newItem])]);
	},
	
	_onClear: function(params) {
		this.target.removeItems(params.items);
	}
});
;
/*
	jWidget Lib source file.
	
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

/**
 * @class
 *
 * `<T> extends JW.AbstractArray.Reverser<T>`
 *
 * See JW.AbstractArray.Reverser for details.
 *
 * @extends JW.AbstractArray.Reverser
 *
 * @constructor
 * Creates synchronizer. JW.AbstractArray#createReverser method is preferrable instead.
 * @param {JW.ObservableArray} source `<T>` Source collection.
 * @param {Object} [config] Configuration (see Config options).
 */
JW.ObservableArray.Reverser = function(source, config) {
	JW.ObservableArray.Reverser._super.call(this, source, config);
	this.own(source.spliceEvent.bind(this._onSplice, this));
	this.own(source.replaceEvent.bind(this._onReplace, this));
	this.own(source.moveEvent.bind(this._onMove, this));
	this.own(source.clearEvent.bind(this._onClear, this));
	this.own(source.reorderEvent.bind(this._onReorder, this));
};

JW.extend(JW.ObservableArray.Reverser, JW.AbstractArray.Reverser, {
	_onSplice: function(params) {
		var spliceResult = params.spliceResult;
		var oldLength = this.target.getLength();
		var newLength = oldLength;
		
		var removeParamsList = JW.Array.map(spliceResult.removedItemsList, function(indexItems) {
			var length = indexItems.items.length;
			var index = oldLength - indexItems.index - length;
			newLength -= length;
			return new JW.AbstractArray.IndexCount(index, length);
		}, this);
		removeParamsList.reverse();
		
		var addedItemsList = spliceResult.addedItemsList.concat();
		addedItemsList.reverse();
		
		JW.Array.each(addedItemsList, function(indexItems) {
			newLength += indexItems.items.length;
		}, this);
		
		var addParamsList = JW.Array.map(addedItemsList, function(indexItems) {
			var items = indexItems.items;
			var length = items.length;
			var index = newLength - indexItems.index - length;
			return new JW.AbstractArray.IndexItems(index, this._reverse(items));
		}, this);
		
		this.target.trySplice(removeParamsList, addParamsList);
	},
	
	_onReplace: function(params) {
		this.target.trySet(params.newItem, this.target.getLength() - params.index - 1);
	},
	
	_onMove: function(params) {
		this.target.tryMove(
			this.target.getLength() - params.fromIndex - 1,
			this.target.getLength() - params.toIndex - 1);
	},
	
	_onClear: function(params) {
		this.target.tryClear();
	},
	
	_onReorder: function(params) {
		var indexArray = params.indexArray;
		var length = indexArray.length;
		var indexes = new Array(indexArray.length);
		for (var i = 0; i < length; ++i) {
			indexes[length - i - 1] = length - indexArray[i] - 1;
		}
		this.target.tryReorder(indexes);
	}
});
;
/*
	jWidget Lib source file.
	
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

/**
 * @class
 *
 * `<T> extends JW.AbstractArray.SorterComparing<T>`
 *
 * See JW.AbstractCollection.SorterComparing for details.
 *
 * @extends JW.AbstractArray.SorterComparing
 *
 * @constructor
 * Creates synchronizer. JW.AbstractCollection#createSorterComparing method is preferrable instead.
 * @param {JW.ObservableArray} source `<T>` Source collection.
 * @param {Object} config Configuration (see Config options).
 */
JW.ObservableArray.SorterComparing = function(source, config) {
	JW.ObservableArray.SorterComparing._super.call(this, source, config);
	this.own(source.spliceEvent.bind(this._onSplice, this));
	this.own(source.replaceEvent.bind(this._onReplace, this));
	this.own(source.clearEvent.bind(this._onClear, this));
};

JW.extend(JW.ObservableArray.SorterComparing, JW.AbstractArray.SorterComparing, {
	_onSplice: function(params) {
		var spliceResult = params.spliceResult;
		this._splice(spliceResult.getRemovedItems(), spliceResult.getAddedItems());
	},
	
	_onReplace: function(params) {
		this._splice([params.oldItem], [params.newItem]);
	},
	
	_onClear: function(params) {
		this._splice(params.items, []);
	}
});
;
/*
	jWidget Lib source file.
	
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

JW.ObservableArray.Splitter = JW.AbstractArray.Splitter.extend();
;
/*
	jWidget Lib source file.

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

/**
 * @class
 *
 * `<T> extends JW.AbstractMap<T>`
 *
 * Has several events and an observable property #length.
 *
 * See structurized list of methods in JW.AbstractMap.
 *
 * @extends JW.AbstractMap
 *
 * @constructor
 * @param {Object} [items] Initial contents. By default, created collection is empty.
 * @param {boolean} [adapter] Create map as adapter of `items`. Defaults to false, so `items` is copied.
 */
JW.ObservableMap = function(json, adapter) {
	JW.ObservableMap._super.call(this, json, adapter);
	this.length = new JW.Property(this.getLength());
	this.spliceEvent = new JW.Event();
	this.reindexEvent = new JW.Event();
	this.clearEvent = new JW.Event();
	this.changeEvent = new JW.Event();
};

JW.extend(JW.ObservableMap, JW.AbstractMap, {
	/**
	 * @property {JW.Property} length `<Number>` Collection length. **Don't modify manually!**
	 */
	/**
	 * @event spliceEvent
	 * Items are removed from map, items are added to map and items are updated in map. Triggered in result
	 * of calling #set, #trySet, #setAll, #trySetAll, #remove, #tryRemove, #removeItem, #removeAll, #tryRemoveAll,
	 * {@link #removeItems}, #splice, #trySplice, #performSplice.
	 * @param {JW.ObservableMap.SpliceEventParams} params `<T>` Parameters.
	 */
	/**
	 * @event reindexEvent
	 * Keys of items are changed in map. Triggered in result
	 * of calling #setKey, #trySetKey, #reindex, #tryReindex, #performReindex.
	 * @param {JW.ObservableMap.ReindexEventParams} params `<T>` Parameters.
	 */
	/**
	 * @event clearEvent
	 * Map is cleared. Triggered in result of calling #clear, #$clear, #tryClear.
	 * @param {JW.ObservableMap.ItemsEventParams} params `<T>` Parameters.
	 */
	/**
	 * @event changeEvent
	 * Map is changed. Triggered right after one
	 * of events #spliceEvent, #reindexEvent, #clearEvent.
	 * @param {JW.ObservableMap.EventParams} params `<T>` Parameters.
	 */

	// override
	destroyObject: function() {
		this.changeEvent.destroy();
		this.clearEvent.destroy();
		this.reindexEvent.destroy();
		this.spliceEvent.destroy();
		this.length.destroy();
		this._super();
	},

	// override
	trySet: function(item, key) {
		var result = this._trySet(item, key);
		if (result === undefined) {
			return;
		}
		var removedItems = {};
		var removedItem = result.get();
		if (removedItem !== undefined) {
			removedItems[key] = removedItem;
		}
		var addedItems = {};
		addedItems[key] = item;
		var spliceResult = new JW.AbstractMap.SpliceResult(removedItems, addedItems);
		this.length.set(this.getLength());
		this.spliceEvent.trigger(new JW.ObservableMap.SpliceEventParams(this, spliceResult));
		this.changeEvent.trigger(new JW.ObservableMap.EventParams(this));
		if ((removedItem !== undefined) && this._ownsItems) {
			removedItem.destroy();
		}
		return result;
	},

	// override
	setAll: function(items) {
		this.trySetAll(items);
	},

	// override
	trySetKey: function(oldKey, newKey) {
		var item = this._super(oldKey, newKey);
		if (item === undefined) {
			return;
		}
		this.reindexEvent.trigger(new JW.ObservableMap.ReindexEventParams(this, JW.Map.single(oldKey, newKey)));
		this.changeEvent.trigger(new JW.ObservableMap.EventParams(this));
		return item;
	},

	// override
	tryRemove: function(key) {
		var item = this._tryRemove(key);
		if (item === undefined) {
			return;
		}
		var spliceResult = new JW.AbstractMap.SpliceResult(JW.Map.single(key, item), {});
		this.length.set(this.getLength());
		this.spliceEvent.trigger(new JW.ObservableMap.SpliceEventParams(this, spliceResult));
		this.changeEvent.trigger(new JW.ObservableMap.EventParams(this));
		if (this._ownsItems) {
			item.destroy();
		}
		return item;
	},

	// override
	removeAll: function(keys) {
		this.tryRemoveAll(keys);
	},

	// override
	trySplice: function(removedKeys, updatedItems) {
		var spliceResult = this._trySplice(removedKeys, updatedItems);
		if (spliceResult === undefined) {
			return;
		}
		this.length.set(this.getLength());
		this.spliceEvent.trigger(new JW.ObservableMap.SpliceEventParams(this, spliceResult));
		this.changeEvent.trigger(new JW.ObservableMap.EventParams(this));
		if (this._ownsItems) {
			JW.Array.backEvery(JW.Map.toArray(spliceResult.removedItems), JW.destroy);
		}
		return spliceResult;
	},

	// override
	tryClear: function() {
		var items = this._tryClear();
		if (items === undefined) {
			return;
		}
		this.length.set(0);
		this.clearEvent.trigger(new JW.ObservableMap.ItemsEventParams(this, items));
		this.changeEvent.trigger(new JW.ObservableMap.EventParams(this));
		if (this._ownsItems) {
			JW.Array.backEvery(JW.Map.toArray(items), JW.destroy);
		}
		return items;
	},

	// override
	tryReindex: function(keyMap) {
		var result = this._super(keyMap);
		if (result === undefined) {
			return;
		}
		this.reindexEvent.trigger(new JW.ObservableMap.ReindexEventParams(this, result));
		this.changeEvent.trigger(new JW.ObservableMap.EventParams(this));
		return result;
	},

	/**
	 * `<U>` Creates empty collection of the same type.
	 * @returns {JW.ObservableMap} `<U>` Collection.
	 */
	createEmpty: function() {
		return new JW.ObservableMap();
	},

	/**
	 * `<U>` Creates empty array of the same observability level.
	 * @returns {JW.ObservableArray} `<U>` Array.
	 */
	createEmptyArray: function() {
		return new JW.ObservableArray();
	},

	/**
	 * `<U>` Creates empty map of the same observability level.
	 * @returns {JW.ObservableMap} `<U>` Map.
	 */
	createEmptyMap: function() {
		return new JW.ObservableMap();
	},

	/**
	 * `<U>` Creates empty set of the same observability level.
	 * @returns {JW.ObservableSet} `<U>` Set.
	 */
	createEmptySet: function() {
		return new JW.ObservableSet();
	},

	/**
	 * `<U>` Creates collection item mapper.
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} config Configuration (see synchronizer's Config options).
	 * @returns {JW.ObservableMap.Mapper}
	 * `<T, U>` Synchronizer.
	 */
	createMapper: function(config) {
		return new JW.ObservableMap.Mapper(this, config);
	},

	/**
	 * Creates collection filterer.
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} config Configuration (see synchronizer's Config options).
	 * @returns {JW.ObservableMap.Filterer}
	 * `<T>` Synchronizer.
	 */
	createFilterer: function(config) {
		return new JW.ObservableMap.Filterer(this, config);
	},

	/**
	 * Creates matching item counter.
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} config Configuration (see synchronizer's Config options).
	 * @returns {JW.ObservableMap.Counter}
	 * `<T>` Synchronizer.
	 */
	createCounter: function(config) {
		return new JW.ObservableMap.Counter(this, config);
	},

	/**
	 * Creates collection observer.
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} config Configuration (see synchronizer's Config options).
	 * @returns {JW.ObservableMap.Observer}
	 * `<T>` Synchronizer.
	 */
	createObserver: function(config) {
		return new JW.ObservableMap.Observer(this, config);
	},

	/**
	 * Creates collection converter to array (orderer).
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} [config] Configuration (see synchronizer's Config options).
	 * @returns {JW.ObservableMap.Orderer}
	 * `<T>` Synchronizer.
	 */
	createOrderer: function(config) {
		return new JW.ObservableMap.Orderer(this, config);
	},

	/**
	 * Creates collection converter to array (sorter by comparer).
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} config Configuration (see synchronizer's Config options).
	 * @returns {JW.ObservableMap.SorterComparing}
	 * `<T>` Synchronizer.
	 */
	createSorterComparing: function(config) {
		return new JW.ObservableMap.SorterComparing(this, config);
	},

	/**
	 * Creates collection converter to map (indexer).
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} config Configuration (see synchronizer's Config options).
	 * @returns {JW.ObservableMap.Indexer}
	 * `<T>` Synchronizer.
	 */
	createIndexer: function(config) {
		return new JW.ObservableMap.Indexer(this, config);
	},

	/**
	 * Creates collection converter to set.
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} [config] Configuration (see synchronizer's Config options).
	 * @returns {JW.ObservableMap.Lister}
	 * `<T>` Synchronizer.
	 */
	createLister: function(config) {
		return new JW.ObservableMap.Lister(this, config);
	},

	/**
	 * Creates view synchronizer with map.
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} config Configuration (see synchronizer's Config options).
	 * @returns {JW.ObservableMap.Inserter}
	 * `<T>` Synchronizer.
	 */
	createInserter: function(config) {
		return new JW.ObservableMap.Inserter(this, config);
	}
});

JW.apply(JW.ObservableMap.prototype, JW.ObservableCollection);

/**
 * @class
 * `<T>` JW.ObservableMap event parameters.
 * @extends JW.EventParams
 *
 * @constructor
 * @param {JW.ObservableMap} sender `<T>` Event sender.
 */
JW.ObservableMap.EventParams = function(sender) {
	JW.ObservableMap.EventParams._super.call(this, sender);
};

JW.extend(JW.ObservableMap.EventParams, JW.EventParams, {
	/**
	 * @property {JW.ObservableMap} sender `<T>` Event sender.
	 */
});

/**
 * @class
 *
 * `<T> extends JW.ObservableMap.EventParams<T>`
 *
 * Parameters of JW.ObservableMap#spliceEvent.
 *
 * @extends JW.ObservableMap.EventParams
 *
 * @constructor
 * @param {JW.ObservableMap} sender `<T>` Event sender.
 * @param {JW.AbstractMap.SpliceResult} spliceResult `<T>` Result of JW.AbstractMap#splice method.
 */
JW.ObservableMap.SpliceEventParams = function(sender, spliceResult) {
	JW.ObservableMap.SpliceEventParams._super.call(this, sender);
	this.spliceResult = spliceResult;
};

JW.extend(JW.ObservableMap.SpliceEventParams, JW.ObservableMap.EventParams, {
	/**
	 * @property {JW.AbstractMap.SpliceResult} spliceResult `<T>` Result of JW.AbstractMap#splice method.
	 */
});

/**
 * @class
 *
 * `<T> extends JW.ObservableMap.EventParams<T>`
 *
 * Parameters of JW.ObservableMap#reindexEvent.
 *
 * @extends JW.ObservableMap.EventParams
 *
 * @constructor
 * @param {JW.ObservableMap} sender `<T>` Event sender.
 * @param {Object} keyMap Map of changed keys.
 */
JW.ObservableMap.ReindexEventParams = function(sender, keyMap) {
	JW.ObservableMap.ReindexEventParams._super.call(this, sender);
	this.keyMap = keyMap;
};

JW.extend(JW.ObservableMap.ReindexEventParams, JW.ObservableMap.EventParams, {
	/**
	 * @property {Object} keyMap Map of changed keys.
	 */
});

/**
 * @class
 *
 * `<T> extends JW.ObservableMap.EventParams<T>`
 *
 * Parameters of JW.ObservableMap event which bring its old contents.
 *
 * @extends JW.ObservableMap.EventParams
 *
 * @constructor
 * @param {JW.ObservableMap} sender `<T>` Event sender.
 * @param {Object} items Old map contents.
 */
JW.ObservableMap.ItemsEventParams = function(sender, items) {
	JW.ObservableMap.ItemsEventParams._super.call(this, sender);
	this.items = items;
};

JW.extend(JW.ObservableMap.ItemsEventParams, JW.ObservableMap.EventParams, {
	/**
	 * @property {Object} items Old map contents.
	 */
});
;
/*
	jWidget Lib source file.

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

/**
 * @class
 *
 * `<T> extends JW.AbstractMap.Counter<T>`
 *
 * See JW.AbstractCollection.Counter for details.
 *
 * @extends JW.AbstractMap.Counter
 *
 * @constructor
 * Creates synchronizer. JW.AbstractCollection#createCounter method is preferrable instead.
 * @param {JW.ObservableMap} source `<T>` Source collection.
 * @param {Object} config Configuration (see Config options).
 */
JW.ObservableMap.Counter = function(source, config) {
	JW.ObservableMap.Counter._super.call(this, source, config);
	this.own(source.spliceEvent.bind(this._onSplice, this));
	this.own(source.clearEvent.bind(this._onClear, this));
};

JW.extend(JW.ObservableMap.Counter, JW.AbstractMap.Counter, {
	_onSplice: function(params) {
		var spliceResult = params.spliceResult;
		this.target.set(this.target.get() -
			JW.Map.count(spliceResult.removedItems, this.filterItem, this.scope) +
			JW.Map.count(spliceResult.addedItems, this.filterItem, this.scope));
	},

	_onClear: function(params) {
		this.target.set(0);
	}
});
;
/*
	jWidget Lib source file.
	
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

/**
 * @class
 *
 * `<T> extends JW.AbstractMap.Filterer<T>`
 *
 * See JW.AbstractCollection.Filterer for details.
 *
 * @extends JW.AbstractMap.Filterer
 *
 * @constructor
 * Creates synchronizer. JW.AbstractCollection#createFilterer method is preferrable instead.
 * @param {JW.ObservableMap} source `<T>` Source collection.
 * @param {Object} config Configuration (see Config options).
 */
JW.ObservableMap.Filterer = function(source, config) {
	JW.ObservableMap.Filterer._super.call(this, source, config);
	this.own(source.spliceEvent.bind(this._onSplice, this));
	this.own(source.reindexEvent.bind(this._onReindex, this));
	this.own(source.clearEvent.bind(this._onClear, this));
};

JW.extend(JW.ObservableMap.Filterer, JW.AbstractMap.Filterer, {
	_onSplice: function(params) {
		var spliceResult = params.spliceResult;
		this.target.trySplice(
			JW.Map.getKeys(spliceResult.removedItems),
			JW.Map.filter(spliceResult.addedItems, this.filterItem, this.scope));
	},
	
	_onReindex: function(params) {
		this.target.tryReindex(params.keyMap);
	},
	
	_onClear: function(params) {
		this.target.tryRemoveAll(JW.Map.getKeys(params.items));
	}
});
;
/*
	jWidget Lib source file.
	
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

/**
 * @class
 *
 * `<T> extends JW.AbstractMap.Indexer<T>`
 *
 * See JW.AbstractCollection.Indexer for details.
 *
 * @extends JW.AbstractMap.Indexer
 *
 * @constructor
 * Creates synchronizer. JW.AbstractCollection#createIndexer method is preferrable instead.
 * @param {JW.ObservableMap} source `<T>` Source collection.
 * @param {Object} config Configuration (see Config options).
 */
JW.ObservableMap.Indexer = function(source, config) {
	JW.ObservableMap.Indexer._super.call(this, source, config);
	this.own(this.source.spliceEvent.bind(this._onSplice, this));
	this.own(this.source.clearEvent.bind(this._onClear, this));
};

JW.extend(JW.ObservableMap.Indexer, JW.AbstractMap.Indexer, {
	_onSplice: function(params) {
		var spliceResult = params.spliceResult;
		this.target.trySplice(
			this._keys(JW.Map.toArray(spliceResult.removedItems)),
			this._index(JW.Map.toArray(spliceResult.addedItems)));
	},
	
	_onClear: function(params) {
		this.target.tryRemoveAll(
			this._keys(JW.Map.toArray(params.items)));
	}
});
;
/*
	jWidget Lib source file.
	
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

/**
 * @class
 *
 * `<T> extends JW.AbstractMap.Inserter<T>`
 *
 * See JW.AbstractMap.Inserter for details.
 *
 * @extends JW.AbstractMap.Inserter
 *
 * @constructor
 * Creates synchronizer. JW.AbstractMap#createInserter method is preferrable instead.
 * @param {JW.ObservableMap} source `<T>` Source collection.
 * @param {Object} config Configuration (see Config options).
 */
JW.ObservableMap.Inserter = function(source, config) {
	JW.ObservableMap.Inserter._super.call(this, source, config);
	this.own(source.spliceEvent.bind(this._onSplice, this));
	this.own(source.reindexEvent.bind(this._onReindex, this));
	this.own(source.clearEvent.bind(this._onClear, this));
};

JW.extend(JW.ObservableMap.Inserter, JW.AbstractMap.Inserter, {
	_onSplice: function(params) {
		var spliceResult = params.spliceResult;
		this._removeItems(spliceResult.removedItems);
		this._addItems(spliceResult.addedItems);
	},
	
	_onReindex: function(params) {
		var keyMap = params.keyMap;
		for (var oldKey in keyMap) {
			var newKey = keyMap[oldKey];
			var item = this.source.get(newKey);
			if (this.removeItem) {
				this.removeItem.call(this.scope, oldKey, item);
			}
			if (this.addItem) {
				this.addItem.call(this.scope, item, newKey);
			}
		}
	},
	
	_onClear: function(params) {
		this._clearItems(params.items);
	}
});
;
/*
	jWidget Lib source file.
	
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

/**
 * @class
 *
 * `<T extends JW.Class> extends JW.AbstractMap.Lister<T>`
 *
 * See JW.AbstractCollection.Lister for details.
 *
 * @extends JW.AbstractMap.Lister
 *
 * @constructor
 * Creates synchronizer. JW.AbstractCollection#createLister method is preferrable instead.
 * @param {JW.ObservableMap} source `<T>` Source collection.
 * @param {Object} [config] Configuration (see Config options).
 */
JW.ObservableMap.Lister = function(source, config) {
	JW.ObservableMap.Lister._super.call(this, source, config);
	this.own(this.source.spliceEvent.bind(this._onSplice, this));
	this.own(this.source.clearEvent.bind(this._onClear, this));
};

JW.extend(JW.ObservableMap.Lister, JW.AbstractMap.Lister, {
	_onSplice: function(params) {
		var spliceResult = params.spliceResult;
		this.target.trySplice(
			JW.Map.toArray(spliceResult.removedItems),
			JW.Map.toArray(spliceResult.addedItems));
	},
	
	_onClear: function(params) {
		this.target.tryRemoveAll(
			JW.Map.toArray(params.items));
	}
});
;
/*
	jWidget Lib source file.
	
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

/**
 * @class
 *
 * `<T, U> extends JW.AbstractMap.Mapper<T, U>`
 *
 * See JW.AbstractCollection.Mapper for details.
 *
 * @extends JW.AbstractMap.Mapper
 *
 * @constructor
 * Creates synchronizer. JW.AbstractCollection#createMapper method is preferrable instead.
 * @param {JW.ObservableMap} source `<T>` Source collection.
 * @param {Object} config Configuration (see Config options).
 */
JW.ObservableMap.Mapper = function(source, config) {
	JW.ObservableMap.Mapper._super.call(this, source, config);
	this.own(source.spliceEvent.bind(this._onSplice, this));
	this.own(source.reindexEvent.bind(this._onReindex, this));
	this.own(source.clearEvent.bind(this._onClear, this));
};

JW.extend(JW.ObservableMap.Mapper, JW.AbstractMap.Mapper, {
	_onSplice: function(params) {
		var sourceResult = params.spliceResult;
		var removedDatas = sourceResult.removedItems;
		var addedDatas = sourceResult.addedItems;
		var targetResult = this.target.trySplice(
			JW.Map.getRemovedKeys(removedDatas, addedDatas),
			this._createItems(addedDatas));
		if (targetResult !== undefined) {
			this._destroyItems(targetResult.removedItems, removedDatas);
		}
	},
	
	_onReindex: function(params) {
		this.target.tryReindex(params.keyMap);
	},
	
	_onClear: function(params) {
		var datas = params.items;
		this._destroyItems(this.target.tryRemoveAll(JW.Map.getKeys(datas)), datas);
	}
});
;
/*
	jWidget Lib source file.
	
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

/**
 * @class
 *
 * `<T> extends JW.AbstractMap.Observer<T>`
 *
 * See JW.AbstractCollection.Observer for details.
 *
 * @extends JW.AbstractMap.Observer
 *
 * @constructor
 * Creates synchronizer. JW.AbstractCollection#createObserver method is preferrable instead.
 * @param {JW.ObservableMap} source `<T>` Source collection.
 * @param {Object} config Configuration (see Config options).
 */
JW.ObservableMap.Observer = function(source, config) {
	JW.ObservableMap.Observer._super.call(this, source, config);
	this.own(source.spliceEvent.bind(this._onSplice, this));
	this.own(source.clearEvent.bind(this._onClear, this));
	if (this.change) {
		this.own(source.changeEvent.bind(this._onChange, this));
	}
};

JW.extend(JW.ObservableMap.Observer, JW.AbstractMap.Observer, {
	_onSplice: function(params) {
		var spliceResult = params.spliceResult;
		this._removeItems(JW.Map.toArray(spliceResult.removedItems));
		this._addItems(JW.Map.toArray(spliceResult.addedItems));
	},
	
	_onClear: function(params) {
		this._clearItems(JW.Map.toArray(params.items));
	}
});
;
/*
	jWidget Lib source file.
	
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

/**
 * @class
 *
 * `<T extends JW.Class> extends JW.AbstractMap.Orderer<T>`
 *
 * See JW.AbstractCollection.Orderer for details.
 *
 * @extends JW.AbstractMap.Orderer
 *
 * @constructor
 * Creates synchronizer. JW.AbstractCollection#createOrderer method is preferrable instead.
 * @param {JW.ObservableMap} source `<T>` Source collection.
 * @param {Object} [config] Configuration (see Config options).
 */
JW.ObservableMap.Orderer = function(source, config) {
	JW.ObservableMap.Orderer._super.call(this, source, config);
	this.own(source.spliceEvent.bind(this._onSplice, this));
	this.own(source.clearEvent.bind(this._onClear, this));
};

JW.extend(JW.ObservableMap.Orderer, JW.AbstractMap.Orderer, {
	_onSplice: function(params) {
		var spliceResult = params.spliceResult;
		this._splice(
			JW.Map.toSet(spliceResult.removedItems),
			JW.Map.toSet(spliceResult.addedItems));
	},
	
	_onClear: function(params) {
		this.target.removeItems(
			JW.Map.toArray(params.items));
	}
});
;
/*
	jWidget Lib source file.
	
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

/**
 * @class
 *
 * `<T> extends JW.AbstractMap.SorterComparing<T>`
 *
 * See JW.AbstractCollection.SorterComparing for details.
 *
 * @extends JW.AbstractMap.SorterComparing
 *
 * @constructor
 * Creates synchronizer. JW.AbstractCollection#createSorterComparing method is preferrable instead.
 * @param {JW.ObservableMap} source `<T>` Source collection.
 * @param {Object} config Configuration (see Config options).
 */
JW.ObservableMap.SorterComparing = function(source, config) {
	JW.ObservableMap.SorterComparing._super.call(this, source, config);
	this.own(source.spliceEvent.bind(this._onSplice, this));
	this.own(source.clearEvent.bind(this._onClear, this));
};

JW.extend(JW.ObservableMap.SorterComparing, JW.AbstractMap.SorterComparing, {
	_onSplice: function(params) {
		var spliceResult = params.spliceResult;
		this._splice(
			JW.Map.toArray(spliceResult.removedItems),
			JW.Map.toArray(spliceResult.addedItems));
	},
	
	_onClear: function(params) {
		this._splice(JW.Map.toArray(params.items), []);
	}
});
;
/*
	jWidget Lib source file.

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

/**
 * @class
 *
 * `<T extends JW.Class> extends JW.AbstractSet<T>`
 *
 * Has several events and an observable property #length.
 *
 * See structurized list of methods in JW.AbstractSet.
 *
 * @extends JW.AbstractSet
 *
 * @constructor
 * @param {Array} [items] `<T>` Initial contents. By default, created collection is empty.
 * @param {boolean} [adapter] Create set as adapter of `items` (`items` should be Object for this, not Array).
 * Defaults to false, so `items` is copied.
 */
JW.ObservableSet = function(json, adapter) {
	JW.ObservableSet._super.call(this, json, adapter);
	this.length = new JW.Property(this.getLength());
	this.spliceEvent = new JW.Event();
	this.clearEvent = new JW.Event();
	this.changeEvent = new JW.Event();
};

JW.extend(JW.ObservableSet, JW.AbstractSet, {
	/**
	 * @property {JW.Property} length `<Number>` Collection length. **Don't modify manually!**
	 */
	/**
	 * @event spliceEvent
	 * Items are removed from set, items are added to set. Triggered in result
	 * of calling #add, #tryAdd, #addAll, #$addAll, #tryAddAll, #remove, #tryRemove, #removeItem, #removeAll, #$removeAll,
	 * {@link #tryRemoveAll}, #removeItems, #splice, #trySplice, #performSplice.
	 * @param {JW.ObservableSet.SpliceEventParams} params `<T>` Parameters.
	 */
	/**
	 * @event clearEvent
	 * Set is cleared. Triggered in result of calling #clear, #$clear, #tryClear.
	 * @param {JW.ObservableSet.ItemsEventParams} params `<T>` Parameters.
	 */
	/**
	 * @event changeEvent
	 * Set is changed. Triggered right after one
	 * of events #spliceEvent, #clearEvent.
	 * @param {JW.ObservableSet.EventParams} params `<T>` Parameters.
	 */

	// override
	destroyObject: function() {
		this.changeEvent.destroy();
		this.clearEvent.destroy();
		this.spliceEvent.destroy();
		this.length.destroy();
		this._super();
	},

	// override
	tryClear: function() {
		var items = this._tryClear();
		if (items === undefined) {
			return;
		}
		this.length.set(0);
		this.clearEvent.trigger(new JW.ObservableSet.ItemsEventParams(this, items));
		this.changeEvent.trigger(new JW.ObservableSet.EventParams(this));
		if (this._ownsItems) {
			JW.Array.backEvery(items, JW.destroy);
		}
		return items;
	},

	// override
	trySplice: function(removedItems, addedItems) {
		var spliceResult = this._trySplice(removedItems, addedItems);
		if (spliceResult === undefined) {
			return;
		}
		this.length.set(this.getLength());
		this.spliceEvent.trigger(new JW.ObservableSet.SpliceEventParams(this, spliceResult));
		this.changeEvent.trigger(new JW.ObservableSet.EventParams(this));
		if (this._ownsItems) {
			JW.Array.backEvery(spliceResult.removedItems, JW.destroy);
		}
		return spliceResult;
	},

	/**
	 * `<U>` Creates empty collection of the same type.
	 * @returns {JW.ObservableSet} `<U>` Collection.
	 */
	createEmpty: function() {
		return new JW.ObservableSet();
	},

	/**
	 * `<U>` Creates empty array of the same observability level.
	 * @returns {JW.ObservableArray} `<U>` Array.
	 */
	createEmptyArray: function() {
		return new JW.ObservableArray();
	},

	/**
	 * `<U>` Creates empty map of the same observability level.
	 * @returns {JW.ObservableMap} `<U>` Map.
	 */
	createEmptyMap: function() {
		return new JW.ObservableMap();
	},

	/**
	 * `<U>` Creates empty set of the same observability level.
	 * @returns {JW.ObservableSet} `<U>` Set.
	 */
	createEmptySet: function() {
		return new JW.ObservableSet();
	},

	/**
	 * `<U>` Creates collection item mapper.
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} config Configuration (see synchronizer's Config options).
	 * @returns {JW.ObservableSet.Mapper}
	 * `<T, U>` Synchronizer.
	 */
	createMapper: function(config) {
		return new JW.ObservableSet.Mapper(this, config);
	},

	/**
	 * Creates collection filterer.
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} config Configuration (see synchronizer's Config options).
	 * @returns {JW.ObservableSet.Filterer}
	 * `<T>` Synchronizer.
	 */
	createFilterer: function(config) {
		return new JW.ObservableSet.Filterer(this, config);
	},

	/**
	 * Creates matching item counter.
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} config Configuration (see synchronizer's Config options).
	 * @returns {JW.ObservableSet.Counter}
	 * `<T>` Synchronizer.
	 */
	createCounter: function(config) {
		return new JW.ObservableSet.Counter(this, config);
	},

	/**
	 * Creates collection observer.
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} config Configuration (see synchronizer's Config options).
	 * @returns {JW.ObservableSet.Observer}
	 * `<T>` Synchronizer.
	 */
	createObserver: function(config) {
		return new JW.ObservableSet.Observer(this, config);
	},

	/**
	 * Creates collection converter to array (orderer).
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} [config] Configuration (see synchronizer's Config options).
	 * @returns {JW.ObservableSet.Orderer}
	 * `<T>` Synchronizer.
	 */
	createOrderer: function(config) {
		return new JW.ObservableSet.Orderer(this, config);
	},

	/**
	 * Creates collection converter to array (sorter by comparer).
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} config Configuration (see synchronizer's Config options).
	 * @returns {JW.ObservableSet.SorterComparing}
	 * `<T>` Synchronizer.
	 */
	createSorterComparing: function(config) {
		return new JW.ObservableSet.SorterComparing(this, config);
	},

	/**
	 * Creates collection converter to map (indexer).
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} config Configuration (see synchronizer's Config options).
	 * @returns {JW.ObservableSet.Indexer}
	 * `<T>` Synchronizer.
	 */
	createIndexer: function(config) {
		return new JW.ObservableSet.Indexer(this, config);
	},

	/**
	 * Creates collection converter to set.
	 * Selects appropriate synchronizer implementation automatically.
	 * @param {Object} [config] Configuration (see synchronizer's Config options).
	 * @returns {JW.ObservableSet.Lister}
	 * `<T>` Synchronizer.
	 */
	createLister: function(config) {
		return new JW.ObservableSet.Lister(this, config);
	}
});

JW.apply(JW.ObservableSet.prototype, JW.ObservableCollection);

/**
 * @class
 * `<T>` JW.ObservableSet event parameters.
 * @extends JW.EventParams
 *
 * @constructor
 * @param {JW.ObservableSet} sender `<T>` Event sender.
 */
JW.ObservableSet.EventParams = function(sender) {
	JW.ObservableSet.EventParams._super.call(this, sender);
};

JW.extend(JW.ObservableSet.EventParams, JW.EventParams, {
	/**
	 * @property {JW.ObservableSet} sender `<T>` Event sender.
	 */
});

/**
 * @class
 *
 * `<T> extends JW.ObservableSet.EventParams<T>`
 *
 * Parameters of JW.ObservableSet#spliceEvent.
 *
 * @extends JW.ObservableSet.EventParams
 *
 * @constructor
 * @param {JW.ObservableSet} sender `<T>` Event sender.
 * @param {JW.AbstractSet.SpliceResult} spliceResult `<T>` Result of JW.AbstractSet#splice method.
 */
JW.ObservableSet.SpliceEventParams = function(sender, spliceResult) {
	JW.ObservableSet.SpliceEventParams._super.call(this, sender);
	this.spliceResult = spliceResult;
};

JW.extend(JW.ObservableSet.SpliceEventParams, JW.ObservableSet.EventParams, {
	/**
	 * @property {JW.AbstractSet.SpliceResult} spliceResult `<T>` Result of JW.AbstractSet#splice method.
	 */
});

/**
 * @class
 *
 * `<T> extends JW.ObservableSet.EventParams<T>`
 *
 * Parameters of JW.ObservableSet event which bring its old contents.
 *
 * @extends JW.ObservableSet.EventParams
 *
 * @constructor
 * @param {JW.ObservableSet} sender `<T>` Event sender.
 * @param {Array} items `<T>` Old set contents.
 */
JW.ObservableSet.ItemsEventParams = function(sender, items) {
	JW.ObservableSet.ItemsEventParams._super.call(this, sender);
	this.items = items;
};

JW.extend(JW.ObservableSet.ItemsEventParams, JW.ObservableSet.EventParams, {
	/**
	 * @property {Array} items `<T>` Old set contents.
	 */
});
;
/*
	jWidget Lib source file.

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

/**
 * @class
 *
 * `<T extends JW.Class> extends JW.AbstractSet.Counter<T>`
 *
 * See JW.AbstractCollection.Counter for details.
 *
 * @extends JW.AbstractSet.Counter
 *
 * @constructor
 * Creates synchronizer. JW.AbstractCollection#createCounter method is preferrable instead.
 * @param {JW.ObservableSet} source `<T>` Source collection.
 * @param {Object} config Configuration (see Config options).
 */
JW.ObservableSet.Counter = function(source, config) {
	JW.ObservableSet.Counter._super.call(this, source, config);
	this.own(source.spliceEvent.bind(this._onSplice, this));
	this.own(source.clearEvent.bind(this._onClear, this));
};

JW.extend(JW.ObservableSet.Counter, JW.AbstractSet.Counter, {
	_onSplice: function(params) {
		var spliceResult = params.spliceResult;
		this.target.set(this.target.get() -
			JW.Array.count(spliceResult.removedItems, this.filterItem, this.scope) +
			JW.Array.count(spliceResult.addedItems, this.filterItem, this.scope));
	},

	_onClear: function(params) {
		this.target.set(0);
	}
});
;
/*
	jWidget Lib source file.
	
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

/**
 * @class
 *
 * `<T extends JW.Class> extends JW.AbstractSet.Filterer<T>`
 *
 * See JW.AbstractCollection.Filterer for details.
 *
 * @extends JW.AbstractSet.Filterer
 *
 * @constructor
 * Creates synchronizer. JW.AbstractCollection#createFilterer method is preferrable instead.
 * @param {JW.ObservableSet} source `<T>` Source collection.
 * @param {Object} config Configuration (see Config options).
 */
JW.ObservableSet.Filterer = function(source, config) {
	JW.ObservableSet.Filterer._super.call(this, source, config);
	this.own(source.spliceEvent.bind(this._onSplice, this));
	this.own(source.clearEvent.bind(this._onClear, this));
};

JW.extend(JW.ObservableSet.Filterer, JW.AbstractSet.Filterer, {
	_onSplice: function(params) {
		var spliceResult = params.spliceResult;
		this.target.trySplice(
			spliceResult.removedItems,
			JW.Array.filter(spliceResult.addedItems, this.filterItem, this.scope));
	},
	
	_onClear: function(params) {
		this.target.tryRemoveAll(params.items);
	}
});
;
/*
	jWidget Lib source file.
	
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

/**
 * @class
 *
 * `<T extends JW.Class> extends JW.AbstractSet.Indexer<T>`
 *
 * See JW.AbstractCollection.Indexer for details.
 *
 * @extends JW.AbstractSet.Indexer
 *
 * @constructor
 * Creates synchronizer. JW.AbstractCollection#createIndexer method is preferrable instead.
 * @param {JW.ObservableSet} source `<T>` Source collection.
 * @param {Object} config Configuration (see Config options).
 */
JW.ObservableSet.Indexer = function(source, config) {
	JW.ObservableSet.Indexer._super.call(this, source, config);
	this.own(this.source.spliceEvent.bind(this._onSplice, this));
	this.own(this.source.clearEvent.bind(this._onClear, this));
};

JW.extend(JW.ObservableSet.Indexer, JW.AbstractSet.Indexer, {
	_onSplice: function(params) {
		var spliceResult = params.spliceResult;
		this.target.trySplice(
			this._keys(spliceResult.removedItems),
			this._index(spliceResult.addedItems));
	},
	
	_onClear: function(params) {
		this.target.tryRemoveAll(
			this._keys(params.items));
	}
});
;
/*
	jWidget Lib source file.
	
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

/**
 * @class
 *
 * `<T extends JW.Class> extends JW.AbstractSet.Lister<T>`
 *
 * See JW.AbstractCollection.Lister for details.
 *
 * @extends JW.AbstractSet.Lister
 *
 * @constructor
 * Creates synchronizer. JW.AbstractCollection#createLister method is preferrable instead.
 * @param {JW.ObservableSet} source `<T>` Source collection.
 * @param {Object} [config] Configuration (see Config options).
 */
JW.ObservableSet.Lister = function(source, config) {
	JW.ObservableSet.Lister._super.call(this, source, config);
	this.own(this.source.spliceEvent.bind(this._onSplice, this));
	this.own(this.source.clearEvent.bind(this._onClear, this));
};

JW.extend(JW.ObservableSet.Lister, JW.AbstractSet.Lister, {
	_onSplice: function(params) {
		var spliceResult = params.spliceResult;
		this.target.trySplice(spliceResult.removedItems, spliceResult.addedItems);
	},
	
	_onClear: function(params) {
		this.target.tryRemoveAll(params.items);
	}
});
;
/*
	jWidget Lib source file.
	
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

/**
 * @class
 *
 * `<T extends JW.Class, U extends JW.Class> extends JW.AbstractSet.Mapper<T, U>`
 *
 * See JW.AbstractCollection.Mapper for details.
 *
 * @extends JW.AbstractSet.Mapper
 *
 * @constructor
 * Creates synchronizer. JW.AbstractCollection#createMapper method is preferrable instead.
 * @param {JW.ObservableSet} source `<T>` Source collection.
 * @param {Object} config Configuration (see Config options).
 */
JW.ObservableSet.Mapper = function(source, config) {
	JW.ObservableSet.Mapper._super.call(this, source, config);
	this.own(source.spliceEvent.bind(this._onSplice, this));
	this.own(source.clearEvent.bind(this._onClear, this));
};

JW.extend(JW.ObservableSet.Mapper, JW.AbstractSet.Mapper, {
	_onSplice: function(params) {
		var spliceResult = params.spliceResult;
		var removedDatas = spliceResult.removedItems;
		var addedDatas = spliceResult.addedItems;
		this.target.trySplice(this._getItems(removedDatas), this._createItems(addedDatas));
		this._destroyItems(removedDatas);
	},
	
	_onClear: function(params) {
		var datas = params.items;
		this.target.tryRemoveAll(this._getItems(datas));
		this._destroyItems(datas);
	}
});
;
/*
	jWidget Lib source file.
	
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

/**
 * @class
 *
 * `<T extends JW.Class> extends JW.AbstractSet.Observer<T>`
 *
 * See JW.AbstractCollection.Observer for details.
 *
 * @extends JW.AbstractSet.Observer
 *
 * @constructor
 * Creates synchronizer. JW.AbstractCollection#createObserver method is preferrable instead.
 * @param {JW.ObservableSet} source `<T>` Source collection.
 * @param {Object} config Configuration (see Config options).
 */
JW.ObservableSet.Observer = function(source, config) {
	JW.ObservableSet.Observer._super.call(this, source, config);
	this.own(source.spliceEvent.bind(this._onSplice, this));
	this.own(source.clearEvent.bind(this._onClear, this));
	if (this.change) {
		this.own(source.changeEvent.bind(this._onChange, this));
	}
};

JW.extend(JW.ObservableSet.Observer, JW.AbstractSet.Observer, {
	_onSplice: function(params) {
		var spliceResult = params.spliceResult;
		this._removeItems(spliceResult.removedItems);
		this._addItems(spliceResult.addedItems);
	},
	
	_onClear: function(params) {
		this._clearItems(params.items);
	}
});
;
/*
	jWidget Lib source file.
	
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

/**
 * @class
 *
 * `<T extends JW.Class> extends JW.AbstractSet.Orderer<T>`
 *
 * See JW.AbstractCollection.Orderer for details.
 *
 * @extends JW.AbstractSet.Orderer
 *
 * @constructor
 * Creates synchronizer. JW.AbstractCollection#createOrderer method is preferrable instead.
 * @param {JW.ObservableSet} source `<T>` Source collection.
 * @param {Object} [config] Configuration (see Config options).
 */
JW.ObservableSet.Orderer = function(source, config) {
	JW.ObservableSet.Orderer._super.call(this, source, config);
	this.own(source.spliceEvent.bind(this._onSplice, this));
	this.own(source.clearEvent.bind(this._onClear, this));
};

JW.extend(JW.ObservableSet.Orderer, JW.AbstractSet.Orderer, {
	_onSplice: function(params) {
		var spliceResult = params.spliceResult;
		this._splice(
			JW.Array.toSet(spliceResult.removedItems),
			JW.Array.toSet(spliceResult.addedItems));
	},
	
	_onClear: function(params) {
		this.target.removeItems(params.items);
	}
});
;
/*
	jWidget Lib source file.
	
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

/**
 * @class
 *
 * `<T extends JW.Class> extends JW.AbstractSet.SorterComparing<T>`
 *
 * See JW.AbstractCollection.SorterComparing for details.
 *
 * @extends JW.AbstractSet.SorterComparing
 *
 * @constructor
 * Creates synchronizer. JW.AbstractCollection#createSorterComparing method is preferrable instead.
 * @param {JW.ObservableSet} source `<T>` Source collection.
 * @param {Object} config Configuration (see Config options).
 */
JW.ObservableSet.SorterComparing = function(source, config) {
	JW.ObservableSet.SorterComparing._super.call(this, source, config);
	this.own(source.spliceEvent.bind(this._onSplice, this));
	this.own(source.clearEvent.bind(this._onClear, this));
};

JW.extend(JW.ObservableSet.SorterComparing, JW.AbstractSet.SorterComparing, {
	_onSplice: function(params) {
		var spliceResult = params.spliceResult;
		this._splice(spliceResult.removedItems, spliceResult.addedItems);
	},
	
	_onClear: function(params) {
		this._splice(params.items, []);
	}
});
;
/*
	jWidget Lib source file.
	
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

/**
 * @class
 * `<V>` Watches source {@link JW.Property property} modification and copies
 * its value to target property.
 *
 *     var source = new JW.Property(1);
 *     var target = new JW.Property();
 *     var copier = new JW.Copier(source, { {@link #cfg-target target}: target });
 *     assert(1, target.{@link JW.Property#get get}());
 *     source.{@link JW.Property#set set}(2);
 *     assert(2, target.{@link JW.Property#get get}());
 *
 * If target is omitted in constructor, it is created automatically. Notice
 * that copier owns it in this case.
 *
 *     var source = new JW.Property(1);
 *     var target = new JW.Copier(this.source).{@link #property-target target};
 *     assert(1, target.{@link JW.Property#get get}());
 *
 * JW.Property has a shorthand method {@link JW.Property#bindTo bindTo}:
 *
 *     var source = new JW.Property(1);
 *     var target = new JW.Property();
 *     target.{@link JW.Property#bindTo bindTo}(source);
 *     assert(1, target.{@link JW.Property#get get}());
 *
 * @extends JW.Class
 *
 * @constructor
 * @param {JW.Property} source `<V>` Source property.
 * @param {Object} [config] Configuration (see Config options).
 */
JW.Copier = function(source, config) {
	JW.Copier._super.call(this);
	config = config || {};
	this.source = source;
	this._targetCreated = config.target == null;
	this.target = this._targetCreated ? new JW.Property() : config.target;
	this._update();
	this.own(source.changeEvent.bind(this._update, this));
};

JW.extend(JW.Copier, JW.Class, {
	/**
	 * @property {JW.Property} source `<V>` Source property.
	 */
	/**
	 * @cfg {JW.Property} target
	 * `<V>` Target property. By default, created automatically.
	 */
	/**
	 * @property {JW.Property} target `<V>` Target property.
	 */

	destroyObject: function() {
		if (this._targetCreated) {
			this.target.destroy();
		}
		this.source = null;
		this.target = null;
		this._super();
	},
	
	_update: function() {
		this.target.set(this.source.get());
	}
});
;
/*
	jWidget Lib source file.
	
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

/**
 * @class
 * `<T>` Watches source {@link JW.Property properties} modification and updates
 * a target property based on their values.
 *
 *     var value = new JW.Property(1000);
 *     var unit = new JW.Property("MW");
 *     var target = new JW.Property();
 *     var functor = new JW.Functor([ value, unit ], function(value, unit) {
 *         return value + " " + unit;
 *     }, this, { {@link #cfg-target target}: target });
 *     assert("1000 MW", target.{@link JW.Property#get get}());
 *     value.{@link JW.Property#set set}(1500);
 *     assert("1500 MW", target.{@link JW.Property#get get}());
 *     unit.{@link JW.Property#set set}("МВт"); // change localization to Russian
 *     assert("1500 МВт", target.{@link JW.Property#get get}());
 *
 * If target is omitted in constructor, it is created automatically. Notice
 * that functor owns it in this case.
 *
 *     var value = new JW.Property(1000);
 *     var unit = new JW.Property("MW");
 *     var functor = new JW.Functor([ value, unit ], function(value, unit) {
 *         return value + " " + unit;
 *     }, this);
 *     var target = functor.{@link #property-target target};
 *     assert("1000 MW", target.{@link JW.Property#get get}());
 *
 * Functor doesn't let you destroy a previously assigned value. Functor doesn't reset the value of target property
 * on destruction. Use JW.Mapper if you need these features.
 *
 * @extends JW.Class
 *
 * @constructor
 * @param {Array} source `<JW.Property>` Source properties.
 *
 * @param {Function} func
 *
 * `func(... sourceValues): T`
 *
 * Calculates target property value based on source property values.
 *
 * @param {Object} scope Function call scope.
 * @param {Object} [config] Configuration (see Config options).
 */
JW.Functor = function(sources, func, scope, config) {
	JW.Functor._super.call(this);
	config = config || {};
	this.sources = sources;
	this.func = func;
	this.scope = scope || this;
	this._targetCreated = config.target == null;
	this.target = this._targetCreated ? new JW.Property() : config.target;
	this.update();
	JW.Array.every(sources, this.watch, this);
};

JW.extend(JW.Functor, JW.Class, {
	/**
	 * @cfg {JW.Property} [target]
	 * `<T>` Optional. Target property. By default, created automatically.
	 */
	/**
	 * @property {Array} sources `<JW.Property>` Source properties.
	 */
	/**
	 * @property {JW.Property} target `<T>` Target property.
	 */

	destroyObject: function() {
		if (this._targetCreated) {
			this.target.destroy();
		}
		this.sources = null;
		this.target = null;
		this.func = null;
		this.scope = null;
		this._super();
	},
	
	/**
	 * Watches specified event and triggers target value recalculation on
	 * the event triggering.
	 * @param {JW.Event} event Event.
	 * @returns {JW.Functor} this
	 */
	bind: function(event) {
		this.own(event.bind(this.update, this));
		return this;
	},
	
	/**
	 * Watches specified property and triggers target value recalculation on
	 * the property change.
	 * @param {JW.Property} property Property.
	 * @returns {JW.Functor} this
	 */
	watch: function(property) {
		this.bind(property.changeEvent);
		return this;
	},
	
	/**
	 * Updates target property focibly.
	 */
	update: function() {
		var values = JW.Array.map(this.sources, JW.byMethod("get"));
		this.target.set(this.func.apply(this.scope, values));
	}
});
;
/*
	jWidget Lib source file.
	
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

/**
 * @class
 * `<T>` Watches source {@link JW.Property properties} modification and recreates
 * a target property using specified functions. Unlike JW.Functor,
 * lets you destroy a previously created value. Also, mapper resets the target
 * property value to null on destruction.
 *
 *     var count = new JW.Property(1);
 *     var units = new JW.Property("apples");
 *     var target = new JW.Property();
 *     // Next command prints "Init 1 apples" to console
 *     var mapper = new JW.Mapper([ count, units ], {
 *         {@link #cfg-target target}: target,
 *         {@link JW.Mapper#createValue createValue}: function(value, units) {
 *             var result = value + " " + units;
 *             console.log("Init " + result);
 *             return result;
 *         },
 *         {@link JW.Mapper#destroyValue destroyValue}: function(result, value, units) {
 *             console.log("Done " + result);
 *         },
 *         {@link JW.Mapper#scope scope}: this
 *     });
 *     assert("1 apples", target.{@link JW.Property#get get}());
 *
 *     // Next command prints "Done 1 apples" and "Init 2 apples"
 *     count.{@link JW.Property#set set}(2);
 *     assert("2 apples", target.{@link JW.Property#get get}());
 *
 *     // Next command prints "Done 2 apples"
 *     mapper.{@link JW.Mapper#destroy destroy}();
 *     assert(null, target.{@link JW.Property#get get}());
 *
 * If target is omitted in constructor, it is created automatically. Notice
 * that mapper owns it in this case.
 *
 *     var source = new JW.Property(1);
 *     var mapper = new JW.Mapper([ source ], {
 *         {@link JW.Mapper#createValue createValue}: function(value) {
 *             return value + " apples";
 *         },
 *         {@link JW.Mapper#scope scope}: this
 *     });
 *     var target = mapper.{@link JW.Mapper#property-target target};
 *     assert("1 apples", target.{@link JW.Property#get get}());
 *     mapper.{@link JW.Mapper#destroy destroy}();
 *
 * In simple cases, JW.Property#$$mapValue and JW.Property#$$mapObject shorthand methods
 * can be used instead. They return the target property right away:
 *
 *     var source = new JW.Property(1);
 *     var target = source.{@link JW.Property#$$mapValue $$mapValue}(function(value) { return value + " apples"; });
 *     assert("1 apples", target.{@link JW.Property#get get}());
 *     target.{@link JW.Property#destroy destroy}();
 *
 * On source property change, next flow will take a place:
 *
 * 1. New value is created
 * 1. Target property is set to new value
 * 1. Old value is destroyed
 *
 * In contrast, JW.Switcher's flow is opposite:
 *
 * 1. {@link JW.Switcher#done done} method is called
 * 1. {@link JW.Switcher#init init} method is called
 *
 * Common use case for mapper is replaceable child component creation by data:
 *
 *     var MyComponent = function(document) {
 *         MyComponent.{@link JW.Class#static-property-_super _super}.call(this);
 *         this.document = document;
 *     };
 *     
 *     JW.extend(MyComponent, JW.UI.Component, {
 *         // JW.Property<Document> document;
 *         
 *         renderDocument: function() {
 *             return this.{@link JW.Class#own own}(this.document.{@link JW.Property#$$mapObject $$mapObject}(function(document) {
 *                 return new DocumentView(document);
 *             }, this);
 *         }
 *     });
 *     
 *     JW.UI.template(MyComponent, {
 *         main:
 *             '<div jwclass="my-component">' +
 *                 '<div jwid="document"></div>' +
 *             '</div>'
 *     });
 *
 * Also, mapper allows you to chain property calculations. Assume that you have several folders and
 * several documents in each folder. One folder is selected, and each folder has a selected document there. You
 * want to create a document view by a currently selected folder and a currently selected document there. Do this:
 *
 *     var Folder = function() {
 *         Folder.{@link JW.Class#_super _super}.call(this);
 *         this.selectedDocument = this.{@link JW.Class#own own}(new JW.Property());
 *     };
 *     
 *     JW.extend(Folder, JW.Class);
 *     
 *     var App = function() {
 *         App.{@link JW.Class#_super _super}.call(this);
 *         this.selectedFolder = this.{@link JW.Class#own own}(new JW.Property());
 *         this.documentView = this.{@link JW.Class#own own}(new JW.Property());
 *         this.{@link JW.Class#own own}(new JW.Mapper([this.selectedFolder], {
 *             {@link JW.Mapper#cfg-createValue createValue}: function(folder) {
 *                 return new JW.Mapper([folder.selectedDocument], {
 *                     {@link JW.Mapper#cfg-target target}: this.documentView,
 *                     {@link JW.Mapper#cfg-createValue createValue}: function(document) {
 *                         return new DocumentView(folder, document);
 *                     },
 *                     {@link JW.Mapper#cfg-destroyValue destroyValue}: JW.destroy,
 *                     {@link JW.Mapper#cfg-scope scope}: this
 *                 });
 *             },
 *             {@link JW.Mapper#cfg-destroyValue destroyValue}: JW.destroy,
 *             {@link JW.Mapper#cfg-scope scope}: this
 *         }));
 *     };
 *     
 *     JW.extend(App, JW.Class);
 *
 * By default, mapper doesn't calls the callbacks if at least one of the source values is null. You can change it
 * via {@link JW.Mapper#acceptNull acceptNull} option.
 *
 * @extends JW.Class
 *
 * @constructor
 * @param {Array} source `<JW.Property>` Source properties.
 * @param {Object} config Configuration (see Config options).
 */
JW.Mapper = function(sources, config) {
	JW.Mapper._super.call(this);
	this.sources = sources;
	this.createValue = config.createValue;
	this.destroyValue = config.destroyValue;
	this.scope = config.scope || this;
	this._targetCreated = config.target == null;
	this.target = this._targetCreated ? new JW.Property() : config.target;
	this.acceptNull = config.acceptNull || false;
	this._sourceValues = null;
	this._targetValue = null;
	this.update();
	JW.Array.every(sources, this.watch, this);
};

JW.extend(JW.Mapper, JW.Class, {
	/**
	 * @cfg {JW.Property} target
	 * `<T>` Target property. By default, created automatically.
	 */
	/**
	 * @cfg {Function} createValue
	 *
	 * `createValue(... sourceValues): T`
	 *
	 * Calculates target property value based on source property values.
	 */
	/**
	 * @cfg {Function} [destroyValue]
	 *
	 * `destroyValue(targetValue: T, ... sourceValues)`
	 *
	 * Optional. Destroys target property value.
	 */
	/**
	 * @cfg {Object} scope
	 * Optional. Call scope of #createValue and #destroyValue.
	 */
	/**
	 * @cfg {Boolean} [acceptNull=false]
	 * Optional. If false, functions won't be called if at least one of the source values is null. Target value
	 * is resetted to null in this case.
	 */
	/**
	 * @property {Array} sources `<JW.Property>` Source properties.
	 */
	/**
	 * @property {JW.Property} target `<T>` Target property.
	 */
	
	// override
	destroyObject: function() {
		var oldValue = this.target.get();
		if (oldValue === this._targetValue) {
			this.target.set(null);
		}
		this._done();
		if (this._targetCreated) {
			this.target.destroy();
		}
		this.sources = null;
		this.createValue = null;
		this.destroyValue = null;
		this.scope = null;
		this.target = null;
		this._sourceValues = null;
		this._targetValue = null;
		this._super();
	},
	
	/**
	 * Watches specified event and triggers target value recalculation on
	 * the event triggering.
	 * @param {JW.Event} event Event.
	 * @returns {JW.Functor} this
	 */
	bind: function(event) {
		this.own(event.bind(this.update, this));
		return this;
	},
	
	/**
	 * Watches specified property and triggers target value recalculation on
	 * the property change.
	 * @param {JW.Property} property Property.
	 * @returns {JW.Functor} this
	 */
	watch: function(property) {
		this.bind(property.changeEvent);
		return this;
	},
	
	/**
	 * Updates target property focibly.
	 */
	update: function() {
		var values = JW.Array.map(this.sources, JW.byMethod("get"));
		var newValue;
		if (this.acceptNull || JW.Array.every(values, JW.isSet)) {
			newValue = this.createValue.apply(this.scope, values);
		} else {
			newValue = null;
			values = null;
		}
		this.target.set(newValue);
		this._done();
		this._targetValue = newValue;
		this._sourceValues = values;
	},
	
	_done: function() {
		if (this.destroyValue && this._sourceValues) {
			this.destroyValue.apply(this.scope, [this._targetValue].concat(this._sourceValues));
		}
	}
});
;
/*
	jWidget Lib source file.
	
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

/**
 * @class
 * `<V>` The observable property. A convenient way to keep one object in sync
 * with another object. Has next helpers:
 *
 * - JW.Copier - keeps one property equal to another property
 * - JW.Updater - watches several properties in order to update something by
 * a callback
 * - JW.Functor - watches several properties in order to reassign target
 * property value to a callback result
 * - JW.Mapper - watches several properties in order to recreate and destroy
 * target property value by callbacks
 * - JW.Switcher - watches a property to initialize and release its value
 *
 * Also, see {@link jQuery jQuery} extension methods.
 *
 * For example, you can use the next algorithm to change localization on fly
 * in your Web application:
 *
 *     var locale = {
 *         en: {
 *             hi: "Hi",
 *             bye: "Bye"
 *         },
 *         ru: {
 *             hi: "Привет",
 *             bye: "Пока"
 *         }
 *     };
 *     var language = new JW.Property("en");
 *     var hi = language.{@link JW.Property#$$mapValue $$mapValue}(function(language) { return locale[language].hi; });
 *     var bye = language.{@link JW.Property#$$mapValue $$mapValue}(function(language) { return locale[language].bye; });
 *     $("#hi").{@link jQuery#jwtext jwtext}(hi);
 *     $("#bye").{@link jQuery#jwtext jwtext}(bye);
 *     // Now you can change localization easily
 *     language.{@link #set}("ru");
 *
 * @extends JW.Class
 *
 * @constructor
 * @param {V} value Initial value.
 */
JW.Property = function(value) {
	JW.Property._super.call(this);
	this._value = JW.defn(value, null);
	this._ownsValue = false;
	this._copier = null;
	this.changeEvent = this.own(new JW.Event());
};

JW.extend(JW.Property, JW.Class, {
	/**
	 * @event changeEvent
	 * Property value is changed. Triggered in result of calling #set method.
	 * @param {JW.ValueChangeEventParams} params `<V>` Parameters.
	 */
	// V _value;
	// boolean _ownsValue;
	// JW.Copier<V> _copier;
	
	destroyObject: function() {
		this.bindTo();
		if (this._ownsValue && JW.isSet(this._value)) {
			this._value.destroy();
		}
		this._value = null;
		this._super();
	},
	
	/**
	 * Returns property value.
	 * @returns {V} Property value.
	 */
	get: function() {
		return this._value;
	},
	
	/**
	 * Changes property value and triggers event #changeEvent.
	 * @param {V} value
	 */
	set: function(value) {
		if (value === undefined) {
			value = null;
		}
		var oldValue = this._value;
		if (oldValue === value) {
			return;
		}
		this._value = value;
		this.changeEvent.trigger(new JW.ValueChangeEventParams(this, value, oldValue));
		if (this._ownsValue && JW.isSet(oldValue)) {
			oldValue.destroy();
		}
	},
	
	/**
	 * Makes this property an owner of its value. It means that the value will
	 * be destroyed automatically on reassignment and on destruction of the
	 * property.
	 * @returns {JW.Property} this
	 */
	ownValue: function() {
		this._ownsValue = true;
		return this;
	},
	
	/**
	 * Binds this property to another property using a JW.Copier.
	 * @param {JW.Property} source `<V>` Source property to bind to.
	 */
	bindTo: function(source) {
		if (this._copier) {
			this._copier.destroy();
			this._copier = null;
		}
		if (source) {
			this._copier = new JW.Copier(source, { target: this });
		}
	},

	/**
	 * `<U>` Maps property value.
	 *
	 * If property value is null, returns null.
	 * Otherwise, returns the result of `f` call with property value in argument.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T): U`
	 *
	 * Mapping function.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {U} Result value.
	 */
	map: function(callback, scope) {
		return (this._value == null) ? null : callback.call(scope || this, this._value);
	},

	/**
	 * `<U>` Maps property value.
	 *
	 * If property value is null, returns null property.
	 * Otherwise, returns a property containing the result of `f` call with property value in argument.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T): U`
	 *
	 * Mapping function.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {JW.Property} `<U>` Result value.
	 */
	$map: function(callback, scope) {
		return new JW.Property(this.map(callback, scope));
	},

	/**
	 * `<U>` Maps property value.
	 *
	 * If property value is null, returns null property.
	 * Otherwise, returns a property containing the result of `f` call with property value in argument.
	 * Starts continuous synchronization, i.e. creates JW.Mapper implicitly.
	 * In comparison to #$$mapObject method, doesn't destroy the previously assigned values.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T): U`
	 *
	 * Mapping function.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {JW.Property} `<U>` Result value.
	 */
	$$mapValue: function(callback, scope) {
		var result = new JW.Property();
		result.own(new JW.Mapper([this], {
			target: result,
			createValue: callback,
			scope: scope || this
		}));
		return result;
	},

	/**
	 * `<U>` Maps property value.
	 *
	 * If property value is null, returns null property.
	 * Otherwise, returns a property containing the result of `f` call with property value in argument.
	 * Starts continuous synchronization, i.e. creates JW.Mapper implicitly.
	 * In comparison to #$$mapValue method, destroys the previously assigned values.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T): U`
	 *
	 * Mapping function.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {JW.Property} `<U>` Result value.
	 */
	$$mapObject: function(callback, scope) {
		var result = new JW.Property();
		result.own(new JW.Mapper([this], {
			target: result,
			createValue: callback,
			destroyValue: JW.destroy,
			scope: scope || this
		}));
		return result;
	}
});
;
/*
	jWidget Lib source file.
	
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

/**
 * @class
 * Watches source {@link JW.Property properties} modification and calls
 * the specified functions.
 *
 * {@link #init} function is called on switcher initialization and on property change. The new values of the properties
 * are passed as arguments.
 *
 * {@link #done} function is called on property change and on switcher destruction. The old values of the properties
 * are passed as arguments.
 *
 *     var property = new JW.Property(1);
 *     var switcher = new JW.Switcher([property], {
 *         {@link #init}: function(value) {
 *             console.log("Init " + value);
 *             return value + 1;
 *         },
 *         {@link #done}: function(value) {
 *             console.log("Done " + value);
 *         },
 *         {@link #scope}: this
 *     }); // output: Init 1
 *     property.{@link JW.Property#set set}(2); // output: Done 1, Init 2
 *     property.{@link JW.Property#set set}(null); // output: Done 2
 *     property.{@link JW.Property#set set}(3); // output: Init 3
 *     switcher.{@link #destroy}(); // output: Done 3
 *
 * By default, switcher doesn't calls the callbacks if at least one of the source values is null. You can change it
 * via {@link JW.Switcher#acceptNull acceptNull} option.
 *
 * Realistic use case for switcher is represented in next example:
 *
 *     this.selectedDocument = this.{@link JW.Class#own own}(new JW.Property());
 *     this.{@link JW.Class#own own}(new JW.Switcher([this.selectedDocument], {
 *         {@link #init}: function(document) {
 *             document.selected.{@link JW.Property#set set}(true);
 *         },
 *         {@link #done}: function(document) {
 *             document.selected.{@link JW.Property#set set}(false);
 *         },
 *         {@link #scope}: this
 *     }));
 *
 * @extends JW.Class
 *
 * @constructor
 * @param {Array} sources `<JW.Property>` Source properties.
 * @param {Object} config Configuration (see Config options).
 */
JW.Switcher = function(sources, config) {
	JW.Switcher._super.call(this);
	config = config || {};
	this.sources = sources;
	this.init = config.init;
	this.done = config.done;
	this.scope = config.scope || this;
	this.acceptNull = config.acceptNull || false;
	this._values = null;
	this._init();
	JW.Array.every(sources, this.watch, this);
};

JW.extend(JW.Switcher, JW.Class, {
	/**
	 * @property {Array} sources `<JW.Property>` Source properties.
	 */
	/**
	 * @cfg {Function} [init]
	 *
	 * `init(... sourceValues)`
	 *
	 * Optional. Value initialization function.
	 */
	/**
	 * @cfg {Function} [done]
	 *
	 * `done(... sourceValues)`
	 *
	 * Optional. Value releasing function.
	 */
	/**
	 * @cfg {Object} [scope]
	 * Optional. {@link #init} and {@link #done} call scope.
	 */
	/**
	 * @cfg {Boolean} [acceptNull=false]
	 * Optional. If false, functions won't be called if at least one of the source values is null.
	 */
	
	destroyObject: function() {
		this._done();
		this.sources = null;
		this.init = null;
		this.done = null;
		this.scope = null;
		this._values = null;
		this._super();
	},
	
	/**
	 * Watches specified event and triggers target value recalculation on
	 * the event triggering.
	 * @param {JW.Event} event Event.
	 * @returns {JW.Functor} this
	 */
	bind: function(event) {
		this.own(event.bind(this.update, this));
		return this;
	},
	
	/**
	 * Watches specified property and triggers target value recalculation on
	 * the property change.
	 * @param {JW.Property} property Property.
	 * @returns {JW.Functor} this
	 */
	watch: function(property) {
		this.bind(property.changeEvent);
		return this;
	},
	
	/**
	 * Updates switcher forcibly.
	 */
	update: function() {
		this._done();
		this._init();
	},
	
	_init: function() {
		var values = JW.Array.map(this.sources, JW.byMethod("get"));
		this._values = (this.acceptNull || JW.Array.every(values, JW.isSet)) ? values : null;
		if (this._values && this.init) {
			this.init.apply(this.scope, this._values);
		}
	},
	
	_done: function() {
		if (this._values && this.done) {
			this.done.apply(this.scope, this._values);
		}
		this._values = null;
	}
});
;
/*
	jWidget Lib source file.
	
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

/**
 * @class
 * Watches source {@link JW.Property properties} modification and calls
 * the specified function passing property values as arguments. Also, the
 * function is called on updater initialization.
 *
 *     var frequency = new JW.Property(106.2);
 *     var wave = new JW.Property("FM");
 *     var updater = new JW.Updater([ frequency, wave ], function(frequency, wave) {
 *         console.log("Running radio on wave " + frequency + " " + wave);
 *     }, this); // output: Running radio on wave 106.2 FM
 *     frequency.{@link JW.Property#set set}(105); // output: Running radio on wave 105 FM
 *     wave.{@link JW.Property#set set}("USW"); // output: Running radio on wave 105 USW
 *
 * @extends JW.Class
 *
 * @constructor
 * @param {Array} source `<JW.Property>` Source properties.
 *
 * @param {Function} func
 *
 * `func(... sourceValues)`
 *
 * Callback function.
 *
 * @param {Object} scope Function call scope.
 */
JW.Updater = function(sources, func, scope) {
	JW.Updater._super.call(this);
	this.sources = sources;
	this.func = func;
	this.scope = scope || this;
	this.update();
	JW.Array.every(sources, this.watch, this);
};

JW.extend(JW.Updater, JW.Class, {
	/**
	 * @property {Array} sources `<JW.Property>` Source properties.
	 */
	
	/**
	 * Watches specified event and triggers updater's function call on
	 * the event triggering.
	 * @param {JW.Event} event Event.
	 * @returns {JW.Updater} this
	 */
	bind: function(event) {
		this.own(event.bind(this.update, this));
		return this;
	},
	
	/**
	 * Watches specified property and triggers updater's function call on
	 * the property change.
	 * @param {JW.Property} property Property.
	 * @returns {JW.Updater} this
	 */
	watch: function(property) {
		this.bind(property.changeEvent);
		return this;
	},
	
	/**
	 * Calls updater's function focibly.
	 */
	update: function() {
		var values = JW.Array.map(this.sources, JW.byMethod("get"));
		this.func.apply(this.scope, values);
	}
});
;
/*
	jWidget Lib source file.

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

/**
 * @method makeRegistry
 *
 * Converts a class to a {@link Registry Registry}, which means that this class gets special static fields and methods.
 *
 * @static
 * @member JW
 * @param {Function} cls Class.
 * @param {String} [idField="id"] Identifier field name.
 * @returns {Function} Returns cls.
 */
JW.makeRegistry = function(cls, idField) {
	idField = idField || "id";

	/**
	 * @class Registry
	 * Convert a class to a registry by method JW.makeRegistry. After that you'll be able to use several
	 * static fields and methods.
	 *
	 *     // Base time unit
	 *     var TimeUnit = function() {
	 *         TimeUnit.{@link JW.Class#_super _super}.call(this);
	 *     };
	 *
	 *     JW.extend(TimeUnit, JW.Class, {
	 *         // abstract id: String;
	 *         // abstract add(date: Date, count: number): Date;
	 *     });
	 *
	 *     JW.makeRegistry(TimeUnit);
	 *
	 *     // Date time unit
	 *     TimeUnit.Day = function() {
	 *         TimeUnit.Day.{@link JW.Class#_super _super}.call(this);
	 *     };
	 *
	 *     JW.extend(TimeUnit.Day, TimeUnit, {
	 *         id: "day",
	 *         add: function(date, count) { date.setDate(date.getDate() + count); }
	 *     });
	 *
	 *     TimeUnit.{@link Registry#registerItem registerItem}(new TimeUnit.Day());
	 *
	 *     // Month time unit
	 *     TimeUnit.Month = function() {
	 *         TimeUnit.Month.{@link JW.Class#_super _super}.call(this);
	 *     };
	 *
	 *     JW.extend(TimeUnit.Month, TimeUnit, {
	 *         id: "month",
	 *         add: function(date, count) { date.setMonth(date.getMonth() + count); }
	 *     });
	 *
	 *     TimeUnit.{@link Registry#registerItem registerItem}(new TimeUnit.Month());
	 *
	 *     // Example of how to utilize this
	 *     function addDate(date, count, unit) {
	 *         TimeUnit.{@link Registry#getItem getItem}(unit).add(date, count);
	 *     }
	 *
	 *     var date = new Date(2000, 0, 1);
	 *     addDate(date, 40, "day");
	 *     assert(2000 === date.getFullYear());
	 *     assert(1 === date.getMonth());
	 *     assert(10 === date.getDate());
	 */
	JW.apply(cls, {
		/**
		 * @property {Object} items Mapping from item id to an item.
		 * @static
		 */
		items: {},

		/**
		 * @property {Array} itemArray Array of all items in addition order.
		 * @static
		 */
		itemArray: [],

		/**
		 * @method
		 * Registers a new item. Item must have an id field specified by JW.makeRegistry method call.
		 * @static
		 * @param {Mixed} item Item.
		 */
		registerItem: function(item) {
			cls.items[item[idField]] = item;
			cls.itemArray.push(item);
		},

		/**
		 * @method
		 * Returns an item by id.
		 * @static
		 * @param {String} id
		 */
		getItem: function(value) {
			return (value instanceof cls) ? value : cls.items[value];
		},

		getId: function(value) {
			return (value instanceof cls) ? value[idField] : value;
		}
	});

	return cls;
};

JW.makeFactory = JW.makeRegistry;
;
/*
	jWidget Lib source file.
	
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

/**
 * @class
 *
 * jWidget wrapper over setInterval function.
 * JW.Interval destruction causes clearInterval invocation.
 * Convenient to use in combination with {@link JW.Class#own} method:
 *
 *     this.{@link JW.Class#own own}(new JW.Interval(this._update, this, 1000));
 *
 * @extends JW.Class
 *
 * @constructor
 * @param {Function} handler Interval handler function.
 * @param {Object} [scope] Call scope of handler.
 * @param {Number} [delay] Interval delay.
 */
JW.Interval = function(handler, scope, delay) {
	JW.Interval._super.call(this);
	if (JW.isSet(scope) && (typeof scope === "object")) {
		handler = JW.inScope(handler, scope);
	} else if (typeof scope === "number") {
		delay = scope;
	}
	this.interval = setInterval(handler, delay);
};

JW.extend(JW.Interval, JW.Class, {
	destroyObject: function() {
		clearInterval(this.interval);
		this._super();
	}
});
;
/*
	jWidget Lib source file.
	
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

/**
 * @class
 *
 * `<T>` jWidget object adapter. JW.Class wrapper of arbitrary value.
 *
 * Since some jWidget classes work with JW.Class instances only (for example, JW.AbstractSet),
 * the library provides a simple adapter for any objects and values conversion to JW.Class.
 *
 * If you want to track the value and react on its modification, use JW.Property instead.
 *
 * @extends JW.Class
 *
 * @constructor
 * @param {T} value Object.
 */
JW.Proxy = function(value) {
	JW.Proxy._super.call(this);
	this.value = value;
	this._ownsValue = false;
};

JW.extend(JW.Proxy, JW.Class, {
	/**
	 * @property {T} value Object.
	 * @deprecated
	 */
	// boolean _ownsValue;
	
	destroyObject: function() {
		if (this._ownsValue && JW.isSet(this.value)) {
			this.value.destroy();
		}
		this.value = null;
		this._super();
	},
	
	/**
	 * Returns object.
	 * @returns {V} Object.
	 */
	get: function() {
		return this.value;
	},
	
	/**
	 * Changes object.
	 * @param {V} value
	 */
	set: function(value) {
		var oldValue = this.value;
		if (oldValue === value) {
			return;
		}
		this.value = value;
		if (this._ownsValue && JW.isSet(oldValue)) {
			oldValue.destroy();
		}
	},
	
	/**
	 * Makes this proxy an owner of its value. It means that the value will
	 * be destroyed automatically on destruction of the proxy.
	 * @returns {JW.Property} this
	 */
	ownValue: function() {
		this._ownsValue = true;
		return this;
	}
});
;
/*
	jWidget Lib source file.
	
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

JW.setInterval = function(callback, ms) {
	if (!ms) {
		return setInterval(callback, ms);
	}
	if (typeof callback == "string") {
		callback = function() { eval(callback); };
	}
	
	var lastTime = Date.getTime();
	
	function onInterval() {
		var curTime = Date.getTime();
		
		// Prevent inactive time lapses
		if (curTime - lastTime > 10 * ms) {
			lastTime = curTime - ms;
		}
		var b = true;
		while (b || (lastTime < curTime)) {
			b = false;
			lastTime += ms;
			callback();
		}
	}
	
	return setInterval(onInterval, ms);
};
;
/*
	jWidget Lib source file.
	
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

/**
 * @class
 *
 * String utility functions.
 */
JW.String = {
	/**
	 * Escapes special HTML symbols.
	 * Converts symbols &amp;, &gt;, &lt;, &quot; to `&amp;` `&gt;` `&lt;` `&quot;` correspondingly.
	 * @static
	 * @param {string} str String.
	 * @returns {string} Result.
	 */
	htmlEncode: function(target) {
		return String(target).
			replace(/&/g, "&amp;").
			replace(/>/g, "&gt;").
			replace(/</g, "&lt;").
			replace(/"/g, "&quot;");
	},
	
	/**
	 * Unescapes special HTML symbols.
	 * Converts sequences `&amp;` `&gt;` `&lt;` `&quot;` to &amp;, &gt;, &lt;, &quot; correspondingly.
	 * @static
	 * @param {string} str String.
	 * @returns {string} Result.
	 */
	htmlDecode: function(target) {
		return String(target).
			replace(/&quot;/g, '"').
			replace(/&lt;/g, "<").
			replace(/&gt;/g, ">").
			replace(/&amp;/g, "&");
	},
	
	removeScripts: function(target) {
		target = String(target);
		var result = [];
		var index = 0;
		while (true) {
			var from = target.indexOf("<script", index);
			if (from === -1) {
				break;
			}
			result.push(target.substr(index, from - index));
			index = target.indexOf("</script>", from) + 9;
			if (index === -1) {
				return result.join("");
			}
		}
		result.push(target.substr(index));
		return result.join("");
	},
	
	/**
	 * Shortens the string to specified length. If string is short enough, it doesn't change.
	 * Otherwise, it is cutted, and `ellipsis` substring is appended so the resulting string length
	 * equals to `length`.
	 * @static
	 * @param {string} str String.
	 * @param {number} length Maximum length of resulting string.
	 * @param {string} [ellipsis] String tail for shortening. Defaults to `...`
	 * @returns {string} Result.
	 */
	ellipsis: function(target, length, ellipsis) {
		target = String(target);
		if (target.length <= length) {
			return target;
		}
		ellipsis = ellipsis || "...";
		return target.substr(0, length - ellipsis.length) + ellipsis;
	},
	
	/**
	 * Prepends string with specified symbol at the beginning to adjust to specified length.
	 * If string is long enough, it doesn't change.
	 * 
	 *     JW.String.prepend("123", 5, "0")  // "00123"
	 * 
	 * @static
	 * @param {string} str String.
	 * @param {number} length Minimum length of resulting string.
	 * @param {string} ch Symbol to prepend.
	 * @returns {string} Result.
	 */
	prepend: function(target, length, ch) {
		target = String(target);
		var buf = [];
		length -= target.length;
		for (var i = 0; i < length; ++i) {
			buf.push(ch);
		}
		buf.push(target);
		return buf.join("");
	},
	
	/**
	 * Capitalizes first symbol.
	 * 
	 *     JW.String.capitalize("vasya")  // "Vasya"
	 * 
	 * @static
	 * @param {string} str String.
	 * @returns {string} Result.
	 */
	capitalize: function(target) {
		target = String(target);
		return target.charAt(0).toUpperCase() + target.substr(1);
	},
	
	/**
	 * Converts hyphen-style to camelStyle.
	 * 
	 *     JW.String.camel("i-love-js")  // "iLoveJs"
	 *
	 * @static
	 * @param {string} str String.
	 * @returns {string} result.
	 */
	camel: function(target) {
		return String(target).replace(/-([a-z])/ig, JW.String._fcamel);
	},
	
	/**
	 * Converts camelStyle to hyphen-style.
	 * 
	 *     JW.String.hyphen("iLoveJs")  // "i-love-js"
	 *
	 * @static
	 * @param {string} str String.
	 * @returns {string} Result.
	 */
	hyphen: function(target) {
		return String(target).replace(/([A-Z])/g, JW.String._fhyphen);
	},
	
	/**
	 * Removes whitespace symbols at begin and end of string.
	 * 
	 *     JW.String.trim("\t\tI love JS!    ")  // "I love JS!"
	 *
	 * @static
	 * @param {string} str String.
	 * @returns {string} Result.
	 */
	trim: function(target) {
		return String(target).replace(/^\s*/, "").replace(/\s*$/, "");
	},
	
	/**
	 * Parses CSS class string and returns array of CSS class names.
	 * Supports strings, untrimmed strings, space-separated strings, arrays
	 * and subarrays.
	 * 
	 *     JW.String.parseClass(["  a    b ", "c", [], [["d", "e"]]]); // ["a", "b", "c", "d", "e"]
	 *
	 * @static
	 * @param {String/Array} str String.
	 * @returns {Array} `<String>` Result.
	 */
	parseClass: function(str) {
		if (JW.isArray(str)) {
			var result = [];
			for (var i = 0; i < str.length; ++i) {
				result.push.apply(result, JW.String.parseClass(str[i]));
			}
			return result;
		}
		if (typeof str === "string") {
			str = JW.String.trim(str);
			if (str === "") {
				return [];
			}
			return str.split(/\s+/);
		}
		return [];
	},
	
	_fcamel: function(a, b) {
		return b.toUpperCase();
	},
	
	_fhyphen: function(a, b) {
		return "-" + b.toLowerCase();
	}
};
;
/*
	jWidget Lib source file.
	
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

/**
 * @class
 *
 * jWidget wrapper over setTimeout function.
 * JW.Timeout destruction causes clearTimeout invocation.
 * Convenient to use in combination with {@link JW.Class#own} method:
 *
 *     this.{@link JW.Class#own own}(new JW.Timeout(this._update, this, 1000));
 *
 * @extends JW.Class
 *
 * @constructor
 * @param {Function} handler Timeout handler function.
 * @param {Object} [scope] Call scope of handler.
 * @param {Number} [delay] Timeout delay.
 */
JW.Timeout = function(handler, scope, delay) {
	JW.Timeout._super.call(this);
	if (JW.isSet(scope) && (typeof scope === "object")) {
		handler = JW.inScope(handler, scope);
	} else if (typeof scope === "number") {
		delay = scope;
	}
	this.timeout = setTimeout(handler, delay);
};

JW.extend(JW.Timeout, JW.Class, {
	destroyObject: function() {
		clearTimeout(this.timeout);
		this._super();
	}
});
;
/*
	jWidget Lib source file.

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

JW.Timer = function(delay, repeat, sensitive) {
	JW.Timer._super.call(this);
	this.tickEvent = this.own(new JW.Event());
	this.delay = delay || 0;
	this.repeat = repeat || false;
	this.sensitive = sensitive || false;
	this._handle = 0;
	this._onTimeout = JW.inScope(this._onTimeout, this);
};

JW.extend(JW.Timer, JW.Class, {
	/*
	Fields
	JW.Event<JW.Timer.EventParams> tickEvent;
	Number delay;
	Boolean repeat;
	Boolean sensitive;
	number _handle;
	*/

	destroyObject: function() {
		this.stop();
		this._super();
	},

	start: function() {
		if (this.isStarted()) {
			return;
		}
		var runner = this._getRunner();
		this._handle = runner(this._onTimeout, this.delay);
	},

	stop: function() {
		if (!this.isStarted()) {
			return;
		}
		var stopper = this._getStopper();
		stopper(this._handle);
		this._handle = 0;
	},

	restart: function() {
		this.stop();
		this.start();
	},

	isStarted: function() {
		return this._handle !== 0;
	},

	_getRunner: function() {
		return !this.repeat ? setTimeout : this.sensitive ? JW.setInterval : setInterval;
	},

	_getStopper: function() {
		return this.repeat ? clearInterval : clearTimeout;
	},

	_onTimeout: function() {
		if (!this.repeat) {
			this._handle = 0;
		}
		this.tickEvent.trigger(new JW.Timer.EventParams(this));
	}
});

JW.Timer.EventParams = JW.EventParams.extend();
;