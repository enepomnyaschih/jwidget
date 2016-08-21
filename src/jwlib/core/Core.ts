import {Class} from './Class';
import {Destroyable} from './Destroyable';
import {Array} from '../collection/Array';

/**
 * Value proxy. The interface which hash only one field: "value".
 */
export interface Proxy<T> {
	/**
	 * The proxied value.
	 */
	value: T;
}

export interface Dictionary<T> {
	[index: string]: T;
}

/**
 * Checks whether value is undefined.
 *
 * @deprecated Use Underscore's _.isUndefined instead.
 */
export function isUndefined(value): boolean {
	return value === undefined;
}

/**
 * Checks whether value is defined.
 *
 * @deprecated Use Underscore's _.negate(_.isUndefined) instead.
 */
export function isDefined(value): boolean {
	return value !== undefined;
}

/**
 * Checks whether value is null.
 *
 * @deprecated Use Underscore's _.isNull instead.
 */
export function isNull(value): boolean {
	return value === null;
}

/**
 * Checks whether value is not null.
 *
 * @deprecated Use Underscore's _.negate(_.isNull) instead.
 */
export function isNotNull(value): boolean {
	return value !== null;
}

/**
 * Checks whether value is not undefined or null.
 * Prefer using `value != null` expression instead.
 * The function may come in handy if you need a callback.
 */
export function isSet(value): boolean {
	return value != null;
}

/**
 * Checks whether value is undefined or null.
 * Prefer using `value == null` expression instead.
 * The function may come in handy if you need a callback.
 */
export function isNotSet(value): boolean {
	return value == null;
}

/**
 * Checks whether value casts to false value.
 *
 * @deprecated Use Underscore's _.negate(Boolean) instead.
 */
export function isBlank(value): boolean {
	return !value;
}

/**
 * Checks whether value casts to true value.
 *
 * @deprecated Use Boolean function instead.
 */
export function isNotBlank(value): boolean {
	return Boolean(value);
}

/**
 * Checks whether value is an integer.
 */
export function isInt(value): boolean {
	return (typeof value === "number") && Math.round(value) === value;
}

/**
 * Checks whether value is a number.
 *
 * @deprecated Use Underscore's _.isNumber instead.
 */
export function isNumber(value): boolean {
	return typeof value === "number";
}

/**
 * Checks whether value is a string.
 *
 * @deprecated Use Underscore's _.isString instead.
 */
export function isString(value): boolean {
	return typeof value === "string";
}

/**
 * Checks whether value is a boolean.
 *
 * @deprecated Use Underscore's _.isBoolean instead.
 */
export function isBoolean(value): boolean {
	return typeof value === "boolean";
}

/**
 * Checks whether value is a function.
 *
 * @deprecated Use Underscore's _.isFunction instead.
 */
export function isFunction(value): boolean {
	return typeof value === "function";
}

/**
 * Checks whether value is a native JavaScript array.
 *
 * @deprecated Use Underscore's _.isArray instead.
 */
export function isArray(value): boolean {
	return Object.prototype.toString.apply(value) === '[object Array]';
}

/**
 * Checks whether value is a native JavaScript Object or class instance.
 */
export function isObject(value): boolean {
	return Object.prototype.toString.apply(value) === '[object Object]';
}

/**
 * Checks whether value is a regular expression.
 *
 * @deprecated Use Underscore's _.isRegExp instead.
 */
export function isRegExp(value): boolean {
	return Object.prototype.toString.apply(value) === '[object RegExp]';
}

/**
 * Checks whether value is a date.
 *
 * @deprecated Use Underscore's _.isDate instead.
 */
export function isDate(value): boolean {
	return Object.prototype.toString.apply(value) === '[object Date]';
}

/**
 * Defines default value. Returns **value** unless it is undefined, else returns **defaultValue**.
 */
export function def<T>(value: T, defaultValue: T): T {
	return (value !== undefined) ? value : defaultValue;
}

/**
 * Defines default value. Returns **value** unless it is undefined or null, else returns **defaultValue**.
 */
export function defn<T>(value: T, defaultValue: T): T {
	return (value != null) ? value : defaultValue;
}

/**
 * Iterates through objects passed after first argument and copies all their fields into
 * **target** object. Returns **target**. Fields of source objects which are undefined will be ignored.
 * Empty source objects (undefined, null) will be ignored.
 *
 * Function modifies **target** object!
 *
 * Example 1:
 *
 *     var x: JW.Dictionary<number> = {   var y: JW.Dictionary<number> = {  // Result = {
 *         a: 10,                                                           //     a: 10,
 *         b: 20,                             b: 30,                        //     b: 30,
 *         c: null,                           c: 40,                        //     c: 40,
 *         d: undefined,                      d: 50,                        //     d: 50,
 *         e: null                                                          //     e: null,
 *                                            f: 60,                        //     f: 60
 *                                            g: undefined                  //
 *     };                                 };                                // };
 *
 *     JW.apply<number>(x, y);
 *
 * Example 2 (form data preparing):
 *
 *     class Form extends JW.Class {
 *         data: JW.Dictionary<any>;
 *
 *         composeData(extraData: JW.Dictionary<any>): JW.Dictionary<any> {
 *             return JW.apply<any>({}, this.getDefaultData(), this.data, extraData);
 *         }
 *
 *         // virtual
 *         getDefaultData(): JW.Dictionary<any> {
 *             return null;
 *         }
 *     }
 */
export function apply<T>(target: Dictionary<T>, ...sources: Dictionary<T>[]): Dictionary<T> {
	for (var i = 0; i < sources.length; ++i) {
		var source = sources[i];
		if (!source) {
			continue;
		}
		for (var key in source) {
			if (source[key] !== undefined) {
				target[key] = source[key];
			}
		}
	}
	return target;
}

/**
 * The same as JW.apply, but ignores fields which are defined in **target**.
 *
 * **Example**
 *
 *     var x: JW.Dictionary<number> = {   var y: JW.Dictionary<number> = {  // Result = {
 *         a: 10,                                                           //     a: 10,
 *         b: 20,                             b: 30,                        //     b: 20,
 *         c: null,                           c: 40,                        //     c: null,
 *         d: undefined,                      d: 50,                        //     d: 50,
 *         e: null                                                          //     e: null,
 *                                            f: 60,                        //     f: 60
 *                                            g: undefined                  //
 *     };                                 };                                // };
 *
 *     JW.apply<number>(x, y);
 */
export function applyIf<T>(target: Dictionary<T>, ...sources: Dictionary<T>[]): Dictionary<T> {
	for (var i = 0; i < sources.length; ++i) {
		var source = sources[i];
		if (!source) {
			continue;
		}
		for (var key in source) {
			if ((source[key] !== undefined) && (target[key] === undefined)) {
				target[key] = source[key];
			}
		}
	}
	return target;
}

/**
 * The same as JW.apply, but ignores fields which are defined and not null in **target**.
 *
 * **Example**
 *
 *     var x: JW.Dictionary<number> = {   var y: JW.Dictionary<number> = {  // Result = {
 *         a: 10,                                                           //     a: 10,
 *         b: 20,                             b: 30,                        //     b: 20,
 *         c: null,                           c: 40,                        //     c: 40,
 *         d: undefined,                      d: 50,                        //     d: 50,
 *         e: null                                                          //     e: null,
 *                                            f: 60,                        //     f: 60
 *                                            g: undefined                  //
 *     };                                 };                                // };
 *
 *     JW.apply<number>(x, y);
 */
export function applyIfn<T>(target: Dictionary<T>, ...sources: Dictionary<T>[]): Dictionary<T> {
	for (var i = 0; i < sources.length; ++i) {
		var source = sources[i];
		if (!source) {
			continue;
		}
		for (var key in source) {
			if ((source[key] !== undefined) && (target[key] == null)) {
				target[key] = source[key];
			}
		}
	}
	return target;
}

/**
 * Clears object from undefined values. Returns new object, containing all **source** fields except undefined ones.
 *
 * Doesn't modify **source** object.
 *
 * If you want to remove null values as well, try JW.cleann function.
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
 *     var y = JW.clean<any>(x);
 */
export function clean<T>(source: Dictionary<T>): Dictionary<T> {
	var result: Dictionary<T> = {};
	for (var i in source) {
		if (source[i] !== undefined) {
			result[i] = source[i];
		}
	}
	return result;
}

/**
 * The same as JW.clean, but clears off null fields as well.
 */
export function cleann<T>(source: Dictionary<T>): Dictionary<T> {
	var result: Dictionary<T> = {};
	for (var i in source) {
		if (source[i] != null) {
			result[i] = source[i];
		}
	}
	return result;
}

/**
 * Converts object to array. Object must have **length** property and keys from 0 to (**length** - 1).
 *
 * Example of such object is function **arguments** list. You can use this method to apply arbitrary
 * array methods to **arguments** list.
 *
 * Example:
 *
 *     function applyOperations(value) {
 *         var operations = JW.toArray(arguments, 1);
 *         JW.Array.each(operations, function(operation) {
 *             operation(value);
 *         });
 *     }
 *
 * @deprecated Use Underscore's _.toArray instead.
 */
export function toArray<T>(a: any, index?: number, count?: number): T[] {
	if (index === undefined) {
		index = 0;
	}
	if (count === undefined) {
		count = a.length - index;
	}
	var r: T[] = [];
	for (var i = 0; i < count; ++i) {
		r.push(a[index + i]);
	}
	return r;
}

/**
 * Empty function.
 *
 * @deprecated Use Underscore's _.noop instead.
 */
export function emptyFn(...args: any[]) { }

/**
 * Universal native types comparer for array sorting.
 *
 * - Returns 1, if x > y
 * - Returns -1, if x < y
 * - Returns 0, if x == y
 *
 * You can compare next types: boolean, number, string, Array.
 *
 * *Example*
 *
 * Sort by color descending first, and by status ascending last. Both parameters are optional.
 *
 *     rows.sort(function(x, y) {
 *         return JW.cmp(x.color == null, y.color == null) ||
 *               -JW.cmp(x.color, y.color) ||
 *                JW.cmp(x.status == null, y.status == null) ||
 *                JW.cmp(x.status, y.status);
 *     });
 */
export function cmp(x, y, caseInsensitive?: boolean): number {
	if (typeof x === "boolean" && typeof y === "boolean") {
		return x ? (y ? 0 : 1) : (y ? -1 : 0);
	}
	if (isArray(x) && isArray(y)) {
		return Array.cmp(x, y, caseInsensitive);
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
}

/**
 * Equivalent for `JW.cmp(x, y, false)`. Compares two values ignoring letters case in strings.
 */
export function cmpCaseSensitive(x, y): number {
	return cmp(x, y, false);
}

/**
 * Equivalent for `JW.cmp(x, y, true)`. Compares two values ignoring letters case in strings.
 */
export function cmpCaseInsensitive(x, y): number {
	return cmp(x, y, true);
}

/**
 * Returns object item by expression. Expression is several words, passed in array of string joined by periods.
 * If **field** is null, undefined or blank string, function will return **obj**.
 *
 * Example 1:
 *
 *     var obj = {
 *         abc: [
 *             {
 *                 qwe: "xyz"
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
 *     return JW.Array.search(arr, JW.byValue("id", 2)).name; // "Second item"
 *
 * In this example, function JW.get is called inside JW.byValue function implicitly with argument **field** === "id".
 */
export function get<T>(obj, field?, def_?: T): T {
	if (!field) {
		return def<T>(obj, def_);
	}
	if (typeof field === "string") {
		field = field.split(".");
	}
	field = Array.filter(field, function (token) {
		return (token != null) && (token !== "");
	});
	for (var i = 0, l = field.length; i < l; ++i) {
		if (!obj) {
			return def_;
		}
		obj = obj[field[i]];
	}
	return def(obj, def_);
}

/**
 * Assigns object item by expression. Expression is several words, passed in array of string joined by periods.
 *
 * Example:
 *
 *     var obj = {
 *         abc: [
 *             {
 *                 qwe: "xyz"
 *             }
 *         ]
 *     };
 *
 *     JW.set(obj, "def", "abc.0.qwe"); // replace "xyz" with "def"
 *
 *     // equivalent code
 *     JW.set(obj, "def", [ "abc", 0, "qwe" ]); // replace "xyz" with "def"
 */
export function set(obj, value, field) {
	if (!field) {
		return;
	}
	if (typeof field === "string") {
		field = field.split(".");
	}
	field = Array.filter(field, function (token) {
		return (token != null) && (token !== "");
	});
	for (var i = 0, l = field.length - 1; i < l; ++i) {
		var token = field[i];
		obj[token] = obj[token] || {};
		obj = obj[token];
	}
	obj[Array.getLast<string>(field)] = value;
}

/**
 * Returns object unique ID. Returns iid of object. Returns undefined if obj is null or undefined.
 */
export function iid(obj: Class): number {
	if (obj) {
		return obj._iid;
	}
}

/**
 * Returns object unique ID. Returns iid of object if it is an instance of JW.Class,
 * else returns the object itself.
 *
 * This function is used as default result for JW.AbstractArray#getKey and JW.AbstractMap#getKey, and also for
 * getKey parameter of static methods JW.Array#static-method-detectSplice,
 * JW.Array#static-method-performSplice, JW.Array#static-method-detectReorder,
 * JW.Array#static-method-performReorder, JW.Map#static-method-detectReindex,
 * JW.Map#static-method-performReindex.
 */
export function iidForcibly(obj): any {
	return (obj && typeof obj === "object") ? obj._iid : obj;
}

/**
 * Calls object method **destroy** if one is not null or undefined.
 * Can be used in mappers configuration:
 *
 *     var mapper = collection.createMapper<View>({
 *         createItem  : (data: Data) => { return new View(data); },
 *         destroyItem : JW.destroy
 *     });
 */
export function destroy(obj: Destroyable) {
	if (obj) {
		obj.destroy();
	}
}

/**
 * Calls object method **destroy** if available. Can be used in mappers configuration:
 *
 *     var mapper = collection.createMapper<View>({
 *         createItem  : (data: Data) => { return new View(data); },
 *         destroyItem : JW.destroyForcibly
 *     });
 */
export function destroyForcibly(obj): any {
	if (obj && typeof obj.destroy === "function") {
		obj.destroy();
	}
}

/**
 * Returns the remainder of **value** / **mod**. Unlike % operation, works correctly even for decimal **value** and **mod**.
 * Returns result in semi-interval [0, **mod**).
 */
export function mod(value: number, mod: number): number {
	return value - mod * Math.floor(value / mod);
}

/**
 * Returns the remainder of **value** / **mod**. Unlike % operation, works correctly even for decimal **value** and **mod**.
 * Returns result in semi-interval [-**mod** / 2, **mod** / 2).
 */
export function smod(value: number, mod: number): number {
	return value - mod * Math.round(value / mod);
}

/**
 * Returns **value** number sign: 0, 1 or -1.
 */
export function sgn(value: number): number {
	return !value ? 0 : value > 0 ? 1 : -1;
}

/**
 * Returns **value** number non-zero sign: 1 or -1. Returns 1 for 0.
 */
export function sgnnz(value: number): number {
	return value >= 0 ? 1 : -1;
}

/**
 * Specifies function call scope.
 *
 * @deprecated Use TypeScript lambda or Underscore's _.bind instead.
 */
export function inScope(func: (...args: any[]) => any, scope: any): () => any {
	return function () {
		return func.apply(scope, arguments);
	};
}

/**
 * Returns callback function for collection algorithms. Function returns value of specified field
 * of collection item. Item field is retrieved using JW.get function.
 *
 * **Example (get titles of all collection items):**
 *
 *     var titles = collection.map<string>(JW.byField<string>("title"));
 */
export function byField<T>(field?): (value) => T {
	return function (item) {
		return get<T>(item, field);
	};
}

/**
 * Returns callback function for collection algorithms. Function checks whether specified field of collection item
 * is equal (===) to specified value. Item field is retrieved using JW.get function.
 *
 * **Example (find item by ID):**
 *
 *     var item = collection.search(JW.byValue("id", id));
 */
export function byValue(field, value): (value) => boolean {
	return function (item) {
		return get(item, field) === value;
	};
}

/**
 * Returns callback function for collection algorithms. Function calls specified method of collection item
 * with specified arguments and returns the result of this call.
 *
 * **Example (filter tasks that relate to specified on):**
 *
 *     var tasks = collection.filter(JW.byMethod<boolean>("relatesTo", [task]));
 */
export function byMethod<T>(method: string, args?: any[]): (value) => T {
	args = args || [];
	return function (value: any): T {
		return value[method].apply(value, args);
	};
}

/**
 * Shorthand for JW.Binding.UPDATE.
 */
export var UPDATE = 1;

/**
 * Shorthand for JW.Binding.WATCH.
 */
export var WATCH = 2;

/**
 * Shorthand for JW.Binding.TWOWAY.
 */
export var TWOWAY = 3;

/**
 * jWidget binding mode. All properties have shorthands in JW namespace.
 */
export enum Binding {
	/**
	 * Bind invoker to argument.
	 *
	 *     // Bind element value to property
	 *     this.own(el.jwval(property, JW.UPDATE));
	 *
	 * Always used as default binding. Hence, the next code is equivalent:
	 *
	 *     this.own(el.jwval(property));
	 *
	 * Shorthand: JW.UPDATE.
	 */
	UPDATE = 1,

	/**
	 * Bind argument to invoker.
	 *
	 *     // Bind property to element value
	 *     this.own(el.jwval(property, JW.WATCH));
	 *
	 * Always supplied with a no-argument method, which creates the property automatically.
	 *
	 *     // Watch element value
	 *     var property = this.own(el.jwval());
	 *
	 * Shorthand: JW.WATCH.
	 */
	WATCH = 2,

	/**
	 * Bind invoker and argument to each other.
	 * UPDATE-binding is applied first.
	 *
	 *     // Assign element value to property and setup two-way binding
	 *     this.own(el.jwval(property, JW.TWOWAY));
	 *
	 * Shorthand: JW.TWOWAY.
	 */
	TWOWAY = 3
}
