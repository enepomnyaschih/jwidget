/*
	jWidget 2
	Copyright (C) 2017  Egor Nepomnyaschih
	enepomnyaschih@gmail.com
	https://github.com/enepomnyaschih/jwidget

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

import Dictionary from './Dictionary';

export function isArray(value: any): boolean {
	return Object.prototype.toString.apply(value) === '[object Array]';
}

export function def<T>(value: T, defaultValue: T): T {
	return (value !== undefined) ? value : defaultValue;
}

export function defn<T>(value: T, defaultValue: T): T {
	return (value != null) ? value : defaultValue;
}

export function isNotNil(value: any): boolean {
	return value != null;
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
export function cmp(x: any, y: any, caseInsensitive?: boolean): number {
	if (typeof x === "boolean" && typeof y === "boolean") {
		return x ? (y ? 0 : 1) : (y ? -1 : 0);
	}
	if (isArray(x) && isArray(y)) {
		let n = Math.min(x.length, y.length);
		for (let i = 0; i < n; ++i) {
			let result = cmp(x[i], y[i], caseInsensitive);
			if (result) {
				return result;
			}
		}
		return cmp(x.length, y.length);
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
export function cmpCaseSensitive(x: any, y: any): number {
	return cmp(x, y, false);
}

/**
 * Equivalent for `JW.cmp(x, y, true)`. Compares two values ignoring letters case in strings.
 */
export function cmpCaseInsensitive(x: any, y: any): number {
	return cmp(x, y, true);
}

/**
 * Returns object item by expression. Expression is several words, passed in array of string joined by periods.
 * If **field** is null, undefined or blank string, function will return **obj**.
 *
 * Example 1:
 *
 *     let obj = {
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
 *     let arr = [
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
export function get<T>(obj: any, field?: string[], def_?: T): T {
	if (!field) {
		return def<T>(obj, def_);
	}
	for (let i = 0, l = field.length; i < l; ++i) {
		let token = field[i];
		if (token == null || token === "") {
			continue;
		}
		if (obj == null) {
			return def_;
		}
		obj = obj[token];
	}
	return def(obj, def_);
}

/**
 * Assigns object item by expression. Expression is several words, passed in array of string joined by periods.
 *
 * Example:
 *
 *     let obj = {
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
export function set(obj: any, value: any, field: any) {
	if (!field) {
		return;
	}
	let len = field.length - 1;
	for (let i = 0; i < len; ++i) {
		let token = field[i];
		if (token == null || token === "") {
			continue;
		}
		obj[token] = obj[token] || {};
		obj = obj[token];
	}
	obj[field[len]] = value;
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
export function iid(obj: any): number {
	return (obj && typeof obj === "object") ? obj._iid : obj;
}

/**
 * Calls object method **destroy** if available. Can be used in mappers configuration:
 *
 *     let mapper = collection.createMapper<View>({
 *         createItem  : (data: Data) => { return new View(data); },
 *         destroyItem : JW.destroyForcibly
 *     });
 */
export function destroy(obj: any): any {
	if (obj && typeof obj.destroy === "function") {
		obj.destroy();
	}
}

/**
 * Specifies function call scope.
 *
 * @deprecated Use TypeScript lambda or Underscore's _.bind instead.
 */
export function inScope(func: (...args: any[]) => any, scope: any): () => any {
	return func ? function () {
		return func.apply(scope, arguments);
	} : func;
}

/**
 * Returns callback function for collection algorithms. Function returns value of specified field
 * of collection item. Item field is retrieved using JW.get function.
 *
 * **Example (get titles of all collection items):**
 *
 *     let titles = collection.map<string>(JW.byField<string>("title"));
 */
export function byField<T>(field?: any): (value: any) => T {
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
 *     let item = collection.search(JW.byValue("id", id));
 */
export function byValue(field: any, value: any): (value: any) => boolean {
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
 *     let tasks = collection.filter(JW.byMethod<boolean>("relatesTo", [task]));
 */
export function byMethod<T>(method: string, args?: any[]): (value: any) => T {
	args = args || [];
	return function (value: any): T {
		return value[method].apply(value, args);
	};
}

/**
 * Shorthand for JW.Binding.UPDATE.
 */
export let UPDATE = 1;

/**
 * Shorthand for JW.Binding.WATCH.
 */
export let WATCH = 2;

/**
 * Shorthand for JW.Binding.TWOWAY.
 */
export let TWOWAY = 3;

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
	 *     let property = this.own(el.jwval());
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
