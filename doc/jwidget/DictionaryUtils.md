[Back to index](../README.md)

# Dictionary utilities

* **Getter methods**
	* [getFirst](#getfirst)
	* [getFirstKey](#getfirstkey)
	* [getLength](#getlength)
	* [isEmpty](#isempty)
* **Item search methods**
	* [contains](#contains)
	* [keyOf](#keyof)
	* [find](#find)
	* [findKey](#findkey)
	* [max](#max)
	* [maxKey](#maxkey)
	* [maxComparing](#maxcomparing)
	* [maxKeyComparing](#maxkeycomparing)
	* [min](#min)
	* [minKey](#minkey)
	* [minComparing](#mincomparing)
	* [minKeyComparing](#minkeycomparing)
* **Dictionary modification methods**
	* [put](#put)
	* [putAll](#putall)
	* [putAllVerbose](#putallverbose)
	* [remove](#remove)
	* [removeAll](#removeall)
	* [removeAllVerbose](#removeallverbose)
	* [removeItem](#removeitem)
	* [removeItems](#removeitems)
	* [setKey](#setkey)
	* [clear](#clear)
	* [splice](#splice)
	* [reindex](#reindex)
* **Other functions**
	* [clone](#clone)
	* [every](#every)
	* [some](#some)
	* [forEach](#foreach)
	* [filter](#filter)
	* [count](#count)
	* [map](#map)
	* [getSortingKeys](#getsortingkeys)
	* [getSortingKeysComparing](#getsortingkeyscomparing)
	* [toSorted](#tosorted)
	* [toSortedComparing](#tosortedcomparing)
	* [toArray](#toarray)
	* [index](#index)
	* [reduce](#reduce)
	* [equal](#equal)
* **Low-level dictionary modification functions (primarily for internal usage)**
	* [tryPut](#tryput)
	* [tryPutAll](#tryputall)
	* [tryRemove](#tryremove)
	* [tryRemoveAll](#tryremoveall)
	* [trySetKey](#trysetkey)
	* [tryClear](#tryclear)
	* [trySplice](#trysplice)
	* [tryReindex](#tryreindex)
	* [detectSplice](#detectsplice)
	* [detectReindex](#detectreindex)
	* [getRemovedKeys](#getremovedkeys)
	* [getInverted](#getinverted)

## Consumption

	import * as DictionaryUtils from "jwidget/DictionaryUtils";

## Description

Utilities for [jwidget/Dictionary](Dictionary.md) which is basically native JavaScript object. Some utilities duplicate the functions of [Underscore.js](http://underscorejs.org) and [Lodash](https://lodash.com), but still may come in handy if you want to keep dependency list short.

## Getter methods

### getFirst

	getFirst<T>(dict: Dictionary<T>): T

Returns some item in dictionary.

### getFirstKey

	getFirstKey<T>(dict: Dictionary<T>): string

Returns some key in item.

### getLength

	getLength<T>(dict: Dictionary<T>): number

Returns count of items in dictionary.

### isEmpty

	isEmpty<T>(dict: Dictionary<T>)

Checks if dictionary is empty.

## Item search methods

### contains

	contains<T>(dict: Dictionary<T>, item: T): boolean

Checks if the item exists in dictionary.

### keyOf

	keyOf<T>(dict: Dictionary<T>, item: T): string

Returns key of item in dictionary.

### find

	find<T>(dict: Dictionary<T>, callback: (item: T, key: string) => boolean, scope?: any): T

Finds item matching criteria.

Returns the first item for which callback returns [truthy](index.md#istruthy) value.

Algorithms iterates items consequently, and stops after first item matching the criteria.

### findKey

	findKey<T>(dict: Dictionary<T>, callback: (item: T, key: string) => boolean, scope?: any): string

Finds item matching criteria.

Returns key of first item for which callback returns [truthy](index.md#istruthy) value.

Algorithms iterates items consequently, and stops after the first item matching the criteria.

### max

	max<T>(dict: Dictionary<T>, callback?: (item: T, key: string) => any, scope?: any, order: number = 1): T

Returns the array item which callback returns the highest (or lowest) value for.

`callback` must return a comparable value, compatible with [cmp](index.md#cmp). Returns item itself by default.

Pass positive `order` to find the highest value, and negative to find the lowest one.

### maxKey

	maxKey<T>(dict: Dictionary<T>, callback?: (item: T, key: string) => any, scope?: any, order: number = 1): string

Returns key of the dictionary item which callback returns the highest (or lowest) value for.

`callback` must return a comparable value, compatible with [cmp](index.md#cmp). Returns item itself by default.

Pass positive `order` to find the highest value, and negative to find the lowest one.

### maxComparing

	maxComparing<T>(dict: Dictionary<T>, compare?: (t1: T, t2: T, k1: string, k2: string) => any, scope?: any, order: number = 1): T

Returns the highest (or lowest) dictionary item in terms of the specified comparer function.

Comparer function must return positive value if t1 > t2; negative value if t1 < t2; 0 if t1 == t2. Defaults to [cmp](index.md#cmp).

Pass positive `order` to find the highest value, and negative to find the lowest one.

### maxKeyComparing

	maxKeyComparing<T>(dict: Dictionary<T>, compare?: (t1: T, t2: T, k1: string, k2: string) => any, scope?: any, order: number = 1): string

Returns key of the highest (or lowest) dictionary item in terms of the specified comparer function.

Comparer function must return positive value if t1 > t2; negative value if t1 < t2; 0 if t1 == t2. Defaults to [cmp](index.md#cmp).

Pass positive `order` to find the highest value, and negative to find the lowest one.

### min

	min<T>(dict: Dictionary<T>, callback?: (item: T, key: string) => any, scope?: any, order: number = 1): T

Returns the dictionary item which callback returns the lowest (or highest) value for.

`callback` must return a comparable value, compatible with [cmp](index.md#cmp). Returns item itself by default.

Pass positive `order` to find the lowest value, and negative to find the highest one.

### minKey

	minKey<T>(dict: Dictionary<T>, callback?: (item: T, key: string) => any, scope?: any, order: number = 1): string

Returns key of the dictionary item which callback returns the lowest (or highest) value for.

`callback` must return a comparable value, compatible with [cmp](index.md#cmp). Returns item itself by default.

Pass positive `order` to find the lowest value, and negative to find the highest one.

### minComparing

	minComparing<T>(dict: Dictionary<T>, compare?: (t1: T, t2: T, k1: string, k2: string) => any, scope?: any, order: number = 1): T

Returns the lowest (or highest) dictionary item in terms of the specified comparer function.

Comparer function must return positive value if t1 > t2; negative value if t1 < t2; 0 if t1 == t2. Defaults to [cmp](index.md#cmp).

Pass positive `order` to find the lowest value, and negative to find the highest one.

### minKeyComparing

	minKeyComparing<T>(dict: Dictionary<T>, compare?: (t1: T, t2: T, k1: string, k2: string) => any, scope?: any, order: number = 1): string

Returns key of the lowest (or highest) dictionary item in terms of the specified comparer function.

Comparer function must return positive value if t1 > t2; negative value if t1 < t2; 0 if t1 == t2. Defaults to [cmp](index.md#cmp).

Pass positive `order` to find the lowest value, and negative to find the highest one.

## Dictionary modification methods

### put

	put<T>(dict: Dictionary<T>, key: string, item: T): T

Replaces item with specified key. If dictionary doesn't contain such key, new item is added.

Returns the replaced item or undefined.

### putAll

	putAll<T>(dict: Dictionary<T>, items: Dictionary<T>)

Adds or replaces a bunch of items.

### putAllVerbose

	putAllVerbose<T>(dict: Dictionary<T>, items: Dictionary<T>): IMap.SpliceResult<T>

Reference: [jwidget/IMap](IMap.md).

Low-performance alternative to [putAll](#putall) with verbose result set.

Returns the result of internal [splice](#splice) method call. Nevers returns null or undefined.

### remove

	remove<T>(dict: Dictionary<T>, key: string): T

Removes item with specified key if it exists in dictionary.

Returns the removed item.

### removeAll

	removeAll<T>(dict: Dictionary<T>, keys: string[])

Removes a bunch of items from dictionary.

### removeAllVerbose

	removeAllVerbose<T>(dict: Dictionary<T>, keys: string[]): Dictionary<T>

Low-performance alternative to `removeAll` with verbose result set.

Returns the removed items. Never returns null or undefined.

### removeItem

	removeItem<T>(dict: Dictionary<T>, item: T): string

Removes an item from the dictionary.

Returns item key in the dictionary or undefined.

### removeItems

	removeItems<T>(dict: Dictionary<T>, items: T[], getKey?: (item: T) => string)

Removes all occurrences of items in dictionary.

`getKey` function should return unique key of an item in this dictionary. By default, identifies primitive values and [jwidget/Identifiable](Identifiable.md) objects.

### setKey

	setKey<T>(dict: Dictionary<T>, oldKey: string, newKey: string): T

Changes item key in dictionary. If dictionary doesn't contain `oldKey` or contains `newKey`, it causes an error.

Returns the moved item.

### clear

	clear<T>(dict: Dictionary<T>): Dictionary<T>

Clears dictionary.

Returns old dictionary contents. Never returns null or undefined.

### splice

	splice<T>(dict: Dictionary<T>, removedKeys: string[], updatedItems: Dictionary<T>): IMap.SpliceResult<T>

Reference: [jwidget/IMap](IMap.md).

Removes and adds bunches of items in dictionary. Universal optimized granular operation of removal/insertion.

Never returns null or undefined.

### reindex

	reindex<T>(dict: Dictionary<T>, keyMap: Dictionary<string>): Dictionary<string>

Changes item keys in dictionary.

Item with key `x` will gain key `keyMap[x]`. It is enough to pass only changed keys, but unchanged keys or unexisting keys are acceptable as well.

Returns map of changed keys. Never returns null or undefined.

## Other functions

### clone

	clone<T>(dict: Dictionary<T>): Dictionary<T>

Returns a shallow copy of the dictionary.

### every

	every<T>(dict: Dictionary<T>, callback: (item: T, key: string) => boolean, scope?: any): boolean

Matches all items against criteria.

Returns true if callback returns [truthy](index.md#istruthy) value for all dictionary items.

Algorithms iterates items consequently, and stops after the first item not matching the criteria.

### some

	some<T>(dict: Dictionary<T>, callback: (item: T, key: string) => boolean, scope?: any): boolean

Matches each item against criteria.

Returns true if callback returns [truthy](index.md#istruthy) value for some dictionary item.

Algorithms iterates items consequently, and stops after the first item matching the criteria.

### forEach

	forEach<T>(dict: Dictionary<T>, callback: (item: T, key: string) => any, scope?: any)

Iterates dictionary items. Calls specified function for all items.

### filter

	filter<T>(dict: Dictionary<T>, callback: (item: T, key: string) => boolean, scope?: any): Dictionary<T>

Filters dictionary by criteria.

Builds new dictionary, consisting of items for which callback returns [truthy](index.md#istruthy) value.

### count

	count<T>(dict: Dictionary<T>, callback: (item: T, key: string) => boolean, scope?: any): number

Counts the items matching criteria.

Returns the number of items for which callback returns [truthy](index.md#istruthy) value.

### map

	map<T, U>(dict: Dictionary<T>, callback: (item: T, key: string) => U, scope?: any): Dictionary<U>

Maps dictionary items.

Builds new dictionary, containing results of callback call for each dictionary item.

### getSortingKeys

	getSortingKeys<T>(dict: Dictionary<T>, callback?: (item: T, key: string) => any, scope?: any, order?: number): string[]

Returns keys of sorted items.

Builds array of item keys, sorted by the result of callback call for each item.

Callback function must return a comparable value, compatible with [cmp](index.md#cmp). Returns item itself by default.

Pass positive order for ascending sorting, negative order for descending sorting.

### getSortingKeysComparing

	getSortingKeysComparing<T>(dict: Dictionary<T>, compare?: (t1: T, t2: T, k1: string, k2: string) => any, scope?: any, order?: number): string[]

Returns keys of sorted items.

Builds array of item keys, sorted by comparer.

Comparer function must return positive value if t1 > t2; negative value if t1 < t2; 0 if t1 == t2. Defaults to [cmp](index.md#cmp).

Pass positive order for ascending sorting, negative order for descending sorting.

### toSorted

	toSorted<T>(dict: Dictionary<T>, callback?: (item: T, key: string) => any, scope?: any, order?: number): T[]

Builds and returns a new array consisting of dictionary items sorted by the result of callback call for each item.

Callback function must return a comparable value, compatible with [cmp](index.md#cmp). Returns item itself by default.

Pass positive order for ascending sorting, negative order for descending sorting.

### toSortedComparing

	toSortedComparing<T>(dict: Dictionary<T>, compare?: (t1: T, t2: T, k1: string, k2: string) => any, scope?: any, order?: number): T[]

Builds and returns a new array consisting of dictionary items sorted by comparer.

Comparer function must return positive value if t1 > t2; negative value if t1 < t2; 0 if t1 == t2. Defaults to [cmp](index.md#cmp).

Pass positive order for ascending sorting, negative order for descending sorting.

### toArray

	toArray<T>(dict: Dictionary<T>): T[]

Converts dictionary to array.

Builds new array consisting of dictionary items in arbitrary order.

### index

	index<T>(dict: Dictionary<T>, callback: (item: T, key: string) => string, scope?: any): Dictionary<T>

Indexes dictionary items.

Builds new dictionary by rule: key is the result of indexer function call, value is the corresponding item.

### reduce

	reduce<T, U>(dict: Dictionary<T>, reducer: Reducer<T, U>): U
	reduce<T, U>(dict: Dictionary<T>, callback: (accumulator: U, item: T, key: string) => U, initial: U): U

Reference: [jwidget/Reducer](Reducer.md).

Applies a function against an accumulator and each item in the dictionary (from left to right) to reduce it to a single value.

### equal

	equal<T>(x: Dictionary<T>, y: Dictionary<T>): boolean

Checks two arrays for equality, item by item (===). Not a deep comparison.

## Low-level dictionary modification functions (primarily for internal usage)

### tryPut

	tryPut<T>(dict: Dictionary<T>, key: string, item: T): Some<T>

Reference: [jwidget/Some](Some.md).

The same as [put](#put), but returns undefined if the dictionary stays unmodified. Else returns some of the removed item.

### tryPutAll

	tryPutAll<T>(dict: Dictionary<T>, items: Dictionary<T>): IMap.SpliceResult<T>

The same as [putAllVerbose](#putAllVerbose), but returns undefined if the dictionary stays unmodified.

### tryRemove

	tryRemove<T>(dict: Dictionary<T>, key: string): T

The same as [remove](#remove), but returns undefined if the dictionary stays unmodified.

### tryRemoveAll

	tryRemoveAll<T>(dict: Dictionary<T>, keys: string[]): Dictionary<T>

The same as [removeAll](#removeAll), but returns undefined if the dictionary stays unmodified.

### trySetKey

	trySetKey<T>(dict: Dictionary<T>, oldKey: string, newKey: string): T

The same as [setKey](#setKey), but returns undefined if the dictionary stays unmodified.

### tryClear

	tryClear<T>(dict: Dictionary<T>): Dictionary<T>

The same as [clear](#clear), but returns undefined if the dictionary stays unmodified.

### trySplice

	trySplice<T>(dict: Dictionary<T>, removedKeys: string[], updatedItems: Dictionary<T>): IMap.SpliceResult<T>

The same as [splice](#splice), but returns undefined if the dictionary stays unmodified.

### tryReindex

	tryReindex<T>(dict: Dictionary<T>, keyMap: Dictionary<string>): Dictionary<string>

The same as [reindex](#reindex), but returns undefined if the dictionary stays unmodified.

### detectSplice

	detectSplice<T>(oldItems: Dictionary<T>, newItems: Dictionary<T>): IMap.SpliceParams<T>

Reference: [jwidget/IMap](IMap.md).

Detects [splice](#splice) method arguments to adjust dictionary contents to `newItems`.
Determines which item bunches should be removed and which ones should be inserted/replaced, and their keys.

Returns [splice](#splice) method arguments. If no method call required, returns undefined.

### detectReindex

	detectReindex<T>(oldItems: Dictionary<T>, newItems: Dictionary<T>, getKey?: (item: T) => string): Dictionary<string>

Detects [reindex](#reindex) method arguments to adjust dictionary contents to `newItems`.
Determines which keys should be assigned to all items.
If `newItems` contents differ from current dictionary contents, the dictionary will be broken.

`getKey` function should return unique key of an item in this dictionary. By default, identifies primitive values and [jwidget/Identifiable](Identifiable.md) objects.

Returns `keyMap` argument of [reindex](#reindex) method. If no method call required, returns undefined.

### getRemovedKeys

	getRemovedKeys<T>(removedItems: Dictionary<T>, addedItems: Dictionary<T>): string[]

Based on the removed and added items during dictionary splice, returns keys which were effectively removed, not replaced by other items.

### getInverted

	getInverted(dict: Dictionary<string>): Dictionary<string>

Creates a new dictionary by rule: `result[dict[key]] === key`.
