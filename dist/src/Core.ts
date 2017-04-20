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

/**
 * Checks if value is undefined.
 * @returns Value is undefined.
 */
export function isUndefined(value: any) {
	return value === undefined;
}

/**
 * Checks if value is not undefined.
 * @returns Value is not undefined.
 */
export function isDefined(value: any) {
	return value !== undefined;
}

/**
 * Checks if value is null.
 * @returns Value is null.
 */
export function isNull(value: any) {
	return value === null;
}

/**
 * Checks if value is not null.
 * @returns Value is not null.
 */
export function isNotNull(value: any) {
	return value !== null;
}

/**
 * Checks if value is not undefined and null.
 * @returns Value is not undefined and null.
 */
export function isNotNil(value: any) {
	return value != null;
}

/**
 * Checkes if value is undefined or null.
 * @returns Value is undefined or null.
 */
export function isNil(value: any) {
	return value == null;
}

/**
 * Checks if value is falsy (`null`, `undefined`, `false`, 0, `NaN` or blank string).
 * @returns Value is falsy.
 */
export function isFalsy(value: any) {
	return !value;
}

/**
 * Checks if value is truthy (not `null`, `undefined`, `false`, 0, `NaN` or blank string).
 * @returns Value is not truthy.
 */
export function isTruthy(value: any) {
	return Boolean(value);
}

/**
 * Checks if value is an integer.
 * @returns Value is an integer.
 */
export function isInt(value: any) {
	return (typeof value === "number") && Math.round(value) === value;
}

/**
 * Checks if value is a number.
 * @returns Value is a number.
 */
export function isNumber(value: any) {
	return typeof value === "number";
}

/**
 * Checks if value is a string.
 * @returns Value is a string.
 */
export function isString(value: any) {
	return typeof value === "string";
}

/**
 * Checks if value is a boolean.
 * @returns Value is a boolean.
 */
export function isBoolean(value: any) {
	return typeof value === "boolean";
}

/**
 * Checks if value is a function.
 * @returns Value is a function.
 */
export function isFunction(value: any) {
	return typeof value === "function";
}

/**
 * Checks if value is a native JavaScript Array.
 * @returns Value is an Array.
 */
export function isArray(value: any) {
	return Object.prototype.toString.apply(value) === '[object Array]';
}

/**
 * Checks if value is a regular expression.
 * @returns Value is a regular expression.
 */
export function isRegExp(value: any) {
	return Object.prototype.toString.apply(value) === '[object RegExp]';
}

/**
 * Checks if value is a date.
 * @returns Value is a date.
 */
export function isDate(value: any) {
	return Object.prototype.toString.apply(value) === '[object Date]';
}

/**
 * Defines default value. Returns `value`, if it is not undefined, else returns `default`.
 */
export function def<T>(value: T, defaultValue: T): T {
	return (value !== undefined) ? value : defaultValue;
}

/**
 * Defines default value. Returns `value`, if it is not undefined and null, else returns `default`.
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
 *     var x: Dictionary<number> = {   var y: Dictionary<number> = {  // Result = {
 *         a: 10,                                                     //     a: 10,
 *         b: 20,                          b: 30,                     //     b: 30,
 *         c: null,                        c: 40,                     //     c: 40,
 *         d: undefined,                   d: 50,                     //     d: 50,
 *         e: null                                                    //     e: null,
 *                                         f: 60,                     //     f: 60
 *                                         g: undefined               //
 *     };                              };                             // };
 *
 *     apply<number>(x, y);
 *
 * Example 2 (form data preparing):
 *
 *     class Form {
 *         data: Dictionary<any>;
 *
 *         composeData(extraData: Dictionary<any>): Dictionary<any> {
 *             return apply<any>({}, this.getDefaultData(), this.data, extraData);
 *         }
 *
 *         // virtual
 *         getDefaultData(): Dictionary<any> {
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
 * Universal and sophisticated comparer for array sorting. Broadly speaking, it:
 *
 * - Returns 1, if x > y
 * - Returns -1, if x < y
 * - Returns 0, if x == y
 *
 * In reality, it supports the next features:
 *
 * - Comparing of boolean, number, string values, subarrays
 * - Determined linear order, even for mixed arrays
 * - Case insensitive comparing for strings
 * - Comparing of digit sequences in strings as numbers
 *
 * *Example*
 *
 * Sort by color descending first, and by status ascending last. Both parameters are optional.
 *
 *     rows.sort((x, y) => {
 *         return cmp(x.color == null, y.color == null) ||
 *               -cmp(x.color, y.color) ||
 *                cmp(x.status == null, y.status == null) ||
 *                cmp(x.status, y.status);
 *     });
 */
export function cmp(x: any, y: any, config?: CmpConfig): number {
	const xRank = getTypeRank(x);
	const yRank = getTypeRank(y);
	if (xRank !== yRank) {
		return cmpPrimitives(xRank, yRank);
	}
	switch (xRank) {
		case "array": return cmpArrays(x, y, config);
		case "boolean": return cmpBooleans(x, y);
		case "string": return cmpStrings(x, y);
		default: return cmpPrimitives(x, y);
	}
}

/**
 * [[cmp]] function configuration object.
 */
export interface CmpConfig {
	/**
	 * Ignore case when comparing strings.
	 */
	caseInsensitive?: boolean;

	/**
	 * Compare digit sequences as numbers when comparing strings.
	 */
	compareNumbersInStrings?: boolean;
}

function getTypeRank(x: any): string {
	return (x === undefined) ? "0" : (x === null) ? "1" : isArray(x) ? "array" : typeof x;
}

function cmpPrimitives(x: any, y : any): number {
	return (x > y) ? 1 : (x < y) ? -1 : 0;
}

function cmpBooleans(x: boolean, y: boolean): number {
	return x ? (y ? 0 : 1) : (y ? -1 : 0);
}

function cmpArrays(x: any[], y: any[], config?: CmpConfig): number {
	let n = Math.min(x.length, y.length);
	for (let i = 0; i < n; ++i) {
		let result = cmp(x[i], y[i], config);
		if (result) {
			return result;
		}
	}
	return cmpPrimitives(x.length, y.length);
}

function cmpStrings(x: string, y: string, config?: CmpConfig): number {
	x = x || "";
	y = y || "";
	if (config && config.caseInsensitive) {
		x = x.toLowerCase();
		y = y.toLowerCase();
	}
	if (!config || !config.compareNumbersInStrings) {
		return cmpPrimitives(x, y);
	}
	let xIndex = 0;
	let yIndex = 0;
	while (true) {
		let xLength = x.substr(xIndex).search(/\d+/);
		if (xLength === -1) {
			xLength = x.length - xIndex;
		}
		let yLength = y.substr(yIndex).search(/\d+/);
		if (yLength === -1) {
			yLength = y.length - yIndex;
		}
		let result = cmpPrimitives(x.substr(xIndex, xLength), y.substr(yIndex, yLength));
		if (result) {
			return result;
		}
		xIndex += xLength;
		yIndex += yLength;
		const xMatches = /^\d+/.exec(x.substr(xIndex));
		const yMatches = /^\d+/.exec(y.substr(yIndex));
		if (xMatches == null || yMatches == null) {
			return cmpBooleans(xMatches != null, yMatches != null);
		}
		const xNumber = +xMatches[0];
		const yNumber = +yMatches[0];
		result = cmpPrimitives(xNumber, yNumber);
		if (result) {
			return result;
		}
		xIndex += xMatches[0].length;
		yIndex += yMatches[0].length;
	}
}

/**
 * Returns object item or subitem by path.
 * Path is a primitive value (object key), or an array of subpaths.
 * If **path** is null, undefined or empty array, returns **obj**.
 * If item doesn't exist, returns undefined.
 *
 * Example:
 *
 *     const obj = {
 *         abc: [
 *             {
 *                 qwe: "xyz"
 *             }
 *         ]
 *     };
 *
 *     get(obj, ["abc", 0, "qwe"]); // "xyz"
 *     get(obj, "abc"); // the array
 */
export function get<T>(obj: any, path: any): T {
	if (path == null) {
		return obj;
	}
	if (!isArray(path)) {
		return (obj && typeof obj === "object") ? obj[path] : undefined;
	}
	for (let i = 0, l = path.length; i < l; ++i) {
		obj = get(obj, path[i]);
	}
	return obj;
}

/**
 * Returns object unique ID. Returns iid of object if it is an instance of Class,
 * else returns the object itself.
 */
export function iid(obj: any): number {
	return obj ? defn<number>(obj._iid, obj) : null;
}

/**
 * Calls object method **destroy** if available. Can be used in mappers configuration:
 *
 *     let mapper = collection.createMapper<View>({
 *         createItem  : (data: Data) => { return new View(data); },
 *         destroyItem : JW.destroyForcibly
 *     });
 */
export function destroy(obj: any) {
	if (obj && typeof obj.destroy === "function") {
		obj.destroy();
	}
}

/**
 * Shorthand for [[Binding.UPDATE]].
 */
export const UPDATE = 1;

/**
 * Shorthand for [[Binding.WATCH]].
 */
export const WATCH = 2;

/**
 * Shorthand for [[Binding.TWOWAY]].
 */
export const TWOWAY = 3;

/**
 * jWidget binding modes. All properties have shorthands.
 */
export enum Binding {
	/**
	 * Bind invoker to argument.
	 *
	 *     // Bind element value to property
	 *     this.own(jwval(el, property, UPDATE));
	 *
	 * Always used as default binding. Hence, the next code is equivalent:
	 *
	 *     this.own(jwval(el, property));
	 */
	UPDATE = 1,

	/**
	 * Bind argument to invoker.
	 *
	 *     // Bind property to element value
	 *     this.own(jwval(el, property, WATCH));
	 *
	 * Always supplied with a no-argument method, which creates the property automatically.
	 *
	 *     // Watch element value
	 *     const property = this.own(jwval(el));
	 */
	WATCH = 2,

	/**
	 * Bind invoker and argument to each other.
	 * UPDATE-binding is applied first.
	 *
	 *     // Assign element value to property and setup two-way binding
	 *     this.own(jwval(el, property, TWOWAY));
	 */
	TWOWAY = 3
}
