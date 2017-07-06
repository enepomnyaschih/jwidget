[Back to index](../README.md)

# Core utilities

# Identifiable

[](BEGIN_INDEX)
* **Enumerations**
    * [Binding](#binding)
    * [CollectionFlags](#collectionflags)
* **Value test functions**
    * [isUndefined](#isundefined)
    * [isDefined](#isdefined)
    * [isNull](#isnull)
    * [isNotNull](#isnotnull)
    * [isNil](#isnil)
    * [isNotNil](#isnotnil)
    * [isFalsy](#isfalsy)
    * [isTruthy](#istruthy)
    * [isInt](#isint)
    * [isNumber](#isnumber)
    * [isString](#isstring)
    * [isBoolean](#isboolean)
    * [isFunction](#isfunction)
    * [isArray](#isarray)
    * [isRegExp](#isregexp)
    * [isDate](#isdate)
* **Other functions**
    * [def](#def)
    * [defn](#defn)
    * [apply](#apply)
    * [cmp](#cmp)
    * [get](#get)
    * [newIid](#newiid)
    * [iidStr](#iidstr)
    * [destroy](#destroy)
[](END_INDEX)

## Consumption

	import * as JW from "jwidget";

## Description

Core jWidget utilities. Some utilities duplicate the functions of [Underscore.js](http://underscorejs.org) and [Lodash](https://lodash.com), but still may come in handy if you want to keep dependency list short.

## Enumerations

### Binding

jWidget binding modes. All options have shorthands, i.e. Binding.UPDATE can be imported separately as {UPDATE}.

* UPDATE = 1
	Bind element attribute to property.

		// Bind element value to property
		this.own(val(el, property, UPDATE));

	Always used as default binding. Hence, the next code is almost equivalent:

		this.own(val(el, property));

	Please prefer the second approach, because the first one takes [jwidget/IProperty](IProperty.md) as an argument whereas [jwidget/Bindable](Bindable.md) is enough for the second one.
* WATCH = 2
	Bind property to element attribute.

		// Bind property to element value
		this.own(val(el, property, WATCH));

	Always supplied with a no-argument method, which creates the property automatically.

		// Watch element value
		const property = this.own(val(el));
* TWOWAY = 3
	Bind element attribute and property to each other.
	UPDATE-binding is applied first.

		// Assign element value to property and setup two-way binding
		this.own(val(el, property, TWOWAY));

Reference: [jwidget/IClass.own](IClass.md#own), [jwidget/ui/val](ui/val.md).

### CollectionFlags

jWidget collection flags. All options have shorthands, i.e. CollectionFlags.SILENT can be imported separately as {SILENT}.

* SILENT = 1
	Creates a silent collection, which means that it never triggers modification events. Silent collections work a little bit faster and consume less memory. Useful for collections that never get modified or observed.
* ADAPTER = 2
	Creates an adapter for an existing array or dictionary, which means that it uses the same object as a container for the collection contents instead of creating a new container. Note that you should not modify the original array or dictionary in this case, because it may break the collection consistency.

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

Checks if value is not undefined.

### isNull

	isNull(value: any): boolean

Checks if value is null.

### isNotNull

	isNotNull(value: any): boolean

Checks if value is not null.

### isNil

	isNil(value: any): boolean

Checks if value is undefined or null.

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

Reference: [jwidget/Dictionary](Dictionary.md).

Iterates through objects passed after first argument and copies all their fields into
`target` object. Returns `target`. Undefined source object fields are ignored.
Null and undefined source objects are ignored.

Function modifies `target` object!

	var x: Dictionary<number> = { |  var y: Dictionary<number> = {  // Result = {
	    a: 10,                    |                                 //     a: 10,
	    b: 20,                    |      b: 30,                     //     b: 30,
	    c: null,                  |      c: 40,                     //     c: 40,
	    d: undefined,             |      d: 50,                     //     d: 50,
	    e: null                   |                                 //     e: null,
	                              |      f: 60,                     //     f: 60
	                              |      g: undefined               //
	};                            |  };                             // };

	apply<number>(x, y);

### cmp

	cmp(x: any, y: any, config?: Config): number

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

**Config**

* caseInsensitive: boolean = false
	Ignore case when comparing strings.
* compareNumbersInStrings: boolean = false
	Compare digit sequences as numbers when comparing strings.

### get

	get<T>(obj: any, path: any): T

Returns object item or subitem by path.
Path is a primitive value (object key), or an array of subpaths.
If `path` is null, undefined or empty array, returns `obj`.
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

### newIid

	newIid(): number

Returns a new auto-incrementing instance identifier for [jwidget/Identifiable](Identifiable.md) interface.

### iidStr

	iidStr(obj: Identifiable): string

Reference: [jwidget/Identifiable](Identifiable.md).

Returns object `iid` converted to a string. Can be used as `getKey` implementation
for collections consisting of `Identifiable` objects only.

### destroy

	destroy(obj: any): any

Calls object method `destroy` if available. Can be used in mapper configuration.

	const views = mapList(models, (model) => new View(model), {destroy});

Reference: [jwidget/mapper/list](mapper/list.md).

Doesn't return anything - `any` return type is specified for easier usage in methods like [jwidget/ArrayUtils.backEvery](ArrayUtils.md#backevery).
