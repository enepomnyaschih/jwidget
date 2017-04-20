[Back to index](../README.md)

# Core

## Consumption

	import * as Core from "jwidget/Core";

## Description

Core jWidget utilities. Some utilities duplicate the functions of [Underscore.js](http://underscorejs.org) and [Lodash](https://lodash.com), but still may come in handy if you want to keep dependency list short.

## Enumerations

### Binding

jWidget binding modes. All options have shorthands in Core module, i.e. Binding.UPDATE can be imported separately as {UPDATE}.

* UPDATE = 1
	Bind invoker to argument.

		// Bind element value to property
		this.own(jwval(el, property, UPDATE));

	Always used as default binding. Hence, the next code is equivalent:

		this.own(jwval(el, property));
* WATCH = 2
	Bind argument to invoker.

		// Bind property to element value
		this.own(jwval(el, property, WATCH));

	Always supplied with a no-argument method, which creates the property automatically.

		// Watch element value
		const property = this.own(jwval(el));
* TWOWAY = 3
	Bind invoker and argument to each other.
	UPDATE-binding is applied first.

		// Assign element value to property and setup two-way binding
		this.own(jwval(el, property, TWOWAY));

## Value test functions

These functions are useful for collection filtering:

	const realValues = values.filter(isNotNil);

Which is a shorter equivalent for:

	const readValues = values.filter((value) => value != null);

### isUndefined

	isUndefined(value: any): boolean

Checks if value is undefined.

### isDefined

	isDefined(value: any): boolean

Checks if value is defined.

### isNull

	isNull(value: any): boolean

Checks if value is null.

### isNotNull

	isNotNull(value: any): boolean

Checks if value is not null.

### isNil

	isNil(value: any): boolean

Checkes if value is undefined or null.

### isNotNil

	isNotNil(value: any): boolean

Checks if value is not undefined and null.

### isFalsy

	isFalsy(value: any): boolean

Checks if value is falsy (i.e. `Boolean(value)` is false).

### isTruthy

	isTruthy(value: any): boolean

Checks if value is truthy (i.e. `Boolean(value)` is true).

### isInt

	isInt(value: any): boolean

Checks if value is an integer.

### isNumber

	isNumber(value: any): boolean

Checks if value is a number.

### isString

	isString(value: any): boolean

Checks if value is a string.

### isBoolean

	isBoolean(value: any): boolean

Checks if value is a boolean.

### isFunction

	isFunction(value: any): boolean

Checks if value is a function.

### isArray

	isArray(value: any): boolean

Checks if value is a native JavaScript Array.

### isRegExp

	isRegExp(value: any): boolean

Checks if value is a regular expression.

### isDate

	isDate(value: any): boolean

Checks if value is a date.

## Other functions

### def

	def<T>(value: T, defaultValue: T): T

Defines default value. Returns `value`, if it is not undefined, else returns `default`.

### defn

	defn<T>(value: T, defaultValue: T): T

Defines default value. Returns `value`, if it is not undefined and null, else returns `default`.

### apply

	apply<T>(target: Dictionary<T>, ...sources: Dictionary<T>[]): Dictionary<T>

Iterates through objects passed after first argument and copies all their fields into
**target** object. Returns **target**. Fields of source objects which are undefined will be ignored.
Empty source objects (undefined, null) will be ignored.

Function modifies **target** object!

Example 1:

	var x: Dictionary<number> = {   var y: Dictionary<number> = {  // Result = {
		a: 10,                                                     //     a: 10,
		b: 20,                          b: 30,                     //     b: 30,
		c: null,                        c: 40,                     //     c: 40,
		d: undefined,                   d: 50,                     //     d: 50,
		e: null                                                    //     e: null,
										f: 60,                     //     f: 60
										g: undefined               //
	};                              };                             // };

	apply<number>(x, y);

Example 2 (form data preparing):

	class Form {
		data: Dictionary<any>;

		composeData(extraData: Dictionary<any>): Dictionary<any> {
			return apply<any>({}, this.getDefaultData(), this.data, extraData);
		}

		// virtual
		getDefaultData(): Dictionary<any> {
			return null;
		}
	}

### cmp

	cmp(x: any, y: any, config?: CmpConfig): number

Universal and sophisticated comparer for array sorting. Broadly speaking, it:

- Returns 1, if x > y
- Returns -1, if x < y
- Returns 0, if x == y

In reality, it supports the next features:

- Comparing of boolean, number, string values, subarrays
- Determined linear order, even for mixed arrays
- Case insensitive comparing for strings
- Comparing of digit sequences in strings as numbers

**Example**

Sort by color descending first, and by status ascending last. Both parameters are optional.

	rows.sort((x, y) => {
		return cmp(x.color == null, y.color == null) ||
			  -cmp(x.color, y.color) ||
			   cmp(x.status == null, y.status == null) ||
			   cmp(x.status, y.status);
	});

Configuration options:

* caseInsensitive: boolean = false
	Ignore case when comparing strings.
* compareNumbersInStrings: boolean = false
	Compare digit sequences as numbers when comparing strings.

### get

	get<T>(obj: any, path: any): T

Returns object item or subitem by path.
Path is a primitive value (object key), or an array of subpaths.
If **path** is null, undefined or empty array, returns **obj**.
If item doesn't exist, returns undefined.

Example:

	const obj = {
		abc: [
			{
				qwe: "xyz"
			}
		]
	};

	get(obj, ["abc", 0, "qwe"]); // "xyz"
	get(obj, "abc"); // the array

### iid

	iid(obj: any): number

Returns object unique ID. Returns iid of object if it is an instance of Class,
else returns the object itself.

### destroy

	destroy(obj: any): void

Calls object method **destroy** if available. Can be used in mappers configuration:

	const mapper = createMapper(collection, {
		createItem  : (data: Data) => new View(data),
		destroyItem : destroy
	});

