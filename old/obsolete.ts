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
 * Defines default value. Returns **value** unless it is undefined or null, else returns **defaultValue**.
 */
export function defn<T>(value: T, defaultValue: T): T {
	return (value != null) ? value : defaultValue;
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
 * Returns object unique ID as string. Returns iid of object. Returns undefined if obj is null or undefined.
 */
export function iidString(obj: IClass): string {
	if (obj) {
		return String(obj._iid);
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
