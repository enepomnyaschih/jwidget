/*!
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
 */
export function isUndefined(value: any) {
	return value === undefined;
}

/**
 * Checks if value is not undefined.
 */
export function isDefined(value: any) {
	return value !== undefined;
}

/**
 * Checks if value is null.
 */
export function isNull(value: any) {
	return value === null;
}

/**
 * Checks if value is not null.
 */
export function isNotNull(value: any) {
	return value !== null;
}

/**
 * Checks if value is not undefined and null.
 */
export function isNotNil(value: any) {
	return value != null;
}

/**
 * Checkes if value is undefined or null.
 */
export function isNil(value: any) {
	return value == null;
}

/**
 * Checks if value is falsy (`null`, `undefined`, `false`, 0, `NaN` or blank string).
 */
export function isFalsy(value: any) {
	return !value;
}

/**
 * Checks if value is truthy (not `null`, `undefined`, `false`, 0, `NaN` or blank string).
 */
export function isTruthy(value: any) {
	return Boolean(value);
}

/**
 * Checks if value is an integer.
 */
export function isInt(value: any) {
	return (typeof value === "number") && Math.round(value) === value;
}

/**
 * Checks if value is a number.
 */
export function isNumber(value: any) {
	return typeof value === "number";
}

/**
 * Checks if value is a string.
 */
export function isString(value: any) {
	return typeof value === "string";
}

/**
 * Checks if value is a boolean.
 */
export function isBoolean(value: any) {
	return typeof value === "boolean";
}

/**
 * Checks if value is a function.
 */
export function isFunction(value: any) {
	return typeof value === "function";
}

/**
 * Checks if value is a native JavaScript Array.
 */
export function isArray(value: any) {
	return Object.prototype.toString.apply(value) === '[object Array]';
}

/**
 * Checks if value is a regular expression.
 */
export function isRegExp(value: any) {
	return Object.prototype.toString.apply(value) === '[object RegExp]';
}

/**
 * Checks if value is a date.
 */
export function isDate(value: any) {
	return Object.prototype.toString.apply(value) === '[object Date]';
}

/**
 * Checks if value fits `Bindable` interface.
 */
export function isBindable(value: any) {
	return (typeof value === "object") &&
		(typeof value.changeEvent === "object") &&
		(typeof value.changeEvent.bind === "function") &&
		(typeof value.get === "function");
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
 * See online documentation for details.
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
 * `cmp` function configuration object.
 */
export interface CmpConfig {
	/**
	 * Ignore case when comparing strings.
	 */
	readonly caseInsensitive?: boolean;

	/**
	 * Compare digit sequences as numbers when comparing strings.
	 */
	readonly compareNumbersInStrings?: boolean;
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
	const n = Math.min(x.length, y.length);
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
		const result1 = cmpPrimitives(x.substr(xIndex, xLength), y.substr(yIndex, yLength));
		if (result1) {
			return result1;
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
		const result2 = cmpPrimitives(xNumber, yNumber);
		if (result2) {
			return result2;
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

let _lastIid = 0;

/**
 * Returns a new auto-incrementing instance identifier for `Identifiable` interface.
 */
export function newIid() {
	return ++_lastIid;
}

/**
 * Returns object unique ID. Returns iid of object if it is an instance of Class,
 * else returns the object itself.
 */
export function iid(obj: any): number {
	return obj ? defn<number>(obj.iid, obj) : null;
}

/**
 * Calls object method **destroy** if available. Can be used in mapper configuration.
 */
export function destroy(obj: any): any {
	if (obj && typeof obj.destroy === "function") {
		obj.destroy();
	}
}

/**
 * Shorthand for Binding.UPDATE.
 */
export const UPDATE = 1;

/**
 * Shorthand for Binding.WATCH.
 */
export const WATCH = 2;

/**
 * Shorthand for Binding.TWOWAY.
 */
export const TWOWAY = 3;

/**
 * jWidget binding modes. All options have shorthands.
 */
export enum Binding {
	/**
	 * Bind invoker to argument. Always used as default binding.
	 */
	UPDATE = 1,

	/**
	 * Bind argument to invoker. Always supplied with a no-argument method, which creates the property automatically.
	 */
	WATCH = 2,

	/**
	 * Bind invoker and argument to each other. UPDATE-binding is applied first.
	 */
	TWOWAY = 3
}

/**
 * Shorthand for CollectionFlags.SILENT.
 */
export const SILENT = 1;

/**
 * Shorthand for CollectionFlags.ADAPTER.
 */
export const ADAPTER = 2;

/**
 * jWidget collection flags. All options have shorthands.
 */
export enum CollectionFlags {
	/**
	 * If on, uses `dummyEvent` implementation for all collection events.
	 * Toggle it on only if you know that this collection never gets modified or
	 * there are no listeners intersted in its modification.
	 */
	SILENT = 1,

	/**
	 * Creates a collection as an adapter over constructor argument.
	 * If off, creates a copy. Toggle it on only if noone else manages collection contents.
	 */
	ADAPTER = 2
}
