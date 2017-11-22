[Back to index](../README.md)

# Array utilities

* **Getter functions**
	* [getLast](#getlast)
	* [isEmpty](#isempty)
* **Item search functions**
	* [contains](#contains)
	* [find](#find)
	* [findIndex](#findindex)
	* [binarySearch](#binarysearch)
	* [max](#max)
	* [maxIndex](#maxindex)
	* [maxComparing](#maxcomparing)
	* [maxIndexComparing](#maxindexcomparing)
	* [min](#min)
	* [minIndex](#minindex)
	* [minComparing](#mincomparing)
	* [minIndexComparing](#minindexcomparing)
* **Array modification functions**
	* [add](#add)
	* [addAll](#addall)
	* [set](#set)
	* [remove](#remove)
	* [removeAll](#removeall)
	* [removeItem](#removeitem)
	* [removeItems](#removeitems)
	* [move](#move)
	* [clear](#clear)
	* [splice](#splice)
	* [reorder](#reorder)
	* [sort](#sort)
	* [sortComparing](#sortcomparing)
* **Other functions**
	* [count](#count)
	* [getSortingIndices](#getsortingindices)
	* [getSortingIndicesComparing](#getsortingindicescomparing)
	* [toSorted](#tosorted)
	* [toSortedComparing](#tosortedcomparing)
	* [toReversed](#toreversed)
	* [index](#index)
	* [reduce](#reduce)
	* [equal](#equal)
	* [backEvery](#backevery)
	* [isIdentity](#isidentity)
	* [invert](#invert)
	* [merge](#merge)
* **Low-level array modification functions (primarily for internal usage)**
	* [tryAddAll](#tryaddall)
	* [trySet](#tryset)
	* [tryRemoveAll](#tryremoveall)
	* [tryMove](#trymove)
	* [tryClear](#tryclear)
	* [trySplice](#trysplice)
	* [tryReorder](#tryreorder)
* **Low-level array analysing functions (primarily for internal usage)**
	* [detectSplice](#detectsplice)
	* [detectFilter](#detectfilter)
	* [detectReorder](#detectreorder)
	* [detectSort](#detectsort)
	* [detectSortComparing](#detectsortcomparing)

## Consumption

	import * as ArrayUtils from "jwidget/ArrayUtils";

## Description

jWidget utilities for native JavaScript arrays. Some utilities duplicate the functions of [Underscore.js](http://underscorejs.org) and [Lodash](https://lodash.com), but still may come in handy if you want to keep dependency list short.

## Getter functions

### getLast

	getLast<T>(arr: T[]): T

Returns the last array item. If array is empty, returns undefined.

### isEmpty

	isEmpty<T>(arr: T[]): boolean

Checks if array is empty.

## Item search functions

### contains

	contains<T>(arr: T[], item: T): boolean

Checks if the item exists in array, i.e. if `arr.indexOf(item)` doesn't return -1.

### find

	find<T>(arr: T[], callback: (item: T, index: number) => boolean, scope?: any): T

Finds an item matching criteria.

Returns the first item for which callback returns [truthy](index.md#istruthy) value.

Algorithms iterates items consequently, and stops after the first item matching the criteria.

### findIndex

	findIndex<T>(arr: T[], callback: (item: T, index: number) => boolean, scope?: any): number

Finds an item matching criteria.

Returns index of the first item for which callback returns [truthy](index.md#istruthy) value.

Algorithms iterates items consequently, and stops after the first item matching the criteria.

### binarySearch

	binarySearch<T>(arr: T[], value: T, compare?: (t1: T, t2: T) => number, scope?: any, order?: number): number

Determines index of the first item which is more (or less if `order` < 0) than the specified value by `compare` function, using binary search. Array must be sorted by `compare` function. Can be used for item insertion easily. If you want to use this function for item removal, you must look at previous item and compare it to `value` first.

Comparer function must return positive value if t1 > t2; negative value if t1 < t2; 0 if t1 == t2. Defaults to [cmp](index.md#cmp).

`order` should reflect sorting order. Positive number if array is sorted ascending, negative if descending.

### max

	max<T>(arr: T[], callback?: (item: T, index: number) => any, scope?: any, order: number = 1): T

Returns the array item which callback returns the highest (or lowest) value for.

`callback` must return a comparable value, compatible with [cmp](index.md#cmp). Returns item itself by default.

Pass positive `order` to find the highest value, and negative to find the lowest one.

### maxIndex

	maxIndex<T>(arr: T[], callback?: (item: T, index: number) => any, scope?: any, order: number = 1): number

Returns index of the array item which callback returns the highest (or lowest) value for.

`callback` must return a comparable value, compatible with [cmp](index.md#cmp). Returns item itself by default.

Pass positive `order` to find the highest value, and negative to find the lowest one.

### maxComparing

	maxComparing<T>(arr: T[], compare?: (t1: T, t2: T, i1: number, i2: number) => any, scope?: any, order: number = 1): T

Returns the highest (or lowest) array item in terms of the specified comparer function.

Comparer function must return positive value if t1 > t2; negative value if t1 < t2; 0 if t1 == t2. Defaults to [cmp](index.md#cmp).

Pass positive `order` to find the highest value, and negative to find the lowest one.

### maxIndexComparing

	maxIndexComparing<T>(arr: T[], compare?: (t1: T, t2: T, i1: number, i2: number) => any, scope?: any, order: number = 1): number

Returns index of the highest (or lowest) array item in terms of the specified comparer function.

Comparer function must return positive value if t1 > t2; negative value if t1 < t2; 0 if t1 == t2. Defaults to [cmp](index.md#cmp).

Pass positive `order` to find the highest value, and negative to find the lowest one.

### min

	min<T>(arr: T[], callback?: (item: T, index: number) => any, scope?: any, order: number = 1): T

Returns the array item which callback returns the lowest (or highest) value for.

`callback` must return a comparable value, compatible with [cmp](index.md#cmp). Returns item itself by default.

Pass positive `order` to find the lowest value, and negative to find the highest one.

### minIndex

	minIndex<T>(arr: T[], callback?: (item: T, index: number) => any, scope?: any, order: number = 1): number

Returns index of the array item which callback returns the lowest (or highest) value for.

`callback` must return a comparable value, compatible with [cmp](index.md#cmp). Returns item itself by default.

Pass positive `order` to find the lowest value, and negative to find the highest one.

### minComparing

	minComparing<T>(arr: T[], compare?: (t1: T, t2: T, i1: number, i2: number) => any, scope?: any, order: number = 1): T

Returns the lowest (or highest) array item in terms of the specified comparer function.

Comparer function must return positive value if t1 > t2; negative value if t1 < t2; 0 if t1 == t2. Defaults to [cmp](index.md#cmp).

Pass positive `order` to find the lowest value, and negative to find the highest one.

### minIndexComparing

	minIndexComparing<T>(arr: T[], compare?: (t1: T, t2: T, i1: number, i2: number) => any, scope?: any, order: number = 1): number

Returns index of the lowest (or highest) array item in terms of the specified comparer function.

Comparer function must return positive value if t1 > t2; negative value if t1 < t2; 0 if t1 == t2. Defaults to [cmp](index.md#cmp).

Pass positive `order` to find the lowest value, and negative to find the highest one.

## Array modification functions

### add

	add<T>(arr: T[], item: T, index?: number)

Inserts an item to array.

`index` is an index of an item to insert the new one before. By default, appends the item to the end of array.

### addAll

	addAll<T>(arr: T[], items: T[], index?: number)

Inserts an item range to array.

`index` is an index of an item to insert the new ones before. By default, appends the items to the end of array.

### set

	set<T>(arr: T[], index: number, item: T): T

Replaces item at specified index. If array doesn't contain such index, it will demolish the application.

Returns the replaced item.

### remove

	remove<T>(arr: T[], index: number): T

Removes item at specified position. If array doesn't contain such index, it will demolish the application.

Returns the removed item.

### removeAll

	removeAll<T>(arr: T[], index: number, count: number): T[]

Removes item range from array.

Returns the removed items.

### removeItem

	removeItem<T>(arr: T[], item: T): number

Removes the first occurrence of an item in array.

Returns the index of the removed item. If the item doesn't exist in the array, returns -1.

### removeItems

	removeItems<T>(arr: T[], items: T[], getKey?: (item: T) => string)

Removes all occurrences of items in array.

`getKey` should identify an item in this array for optimization. Default implementation identifies primitive values and [jwidget/Identifiable](Identifiable.md) objects.

### move

	move<T>(arr: T[], fromIndex: number, toIndex: number): T

Moves an item inside array.

Returns the moved item.

### clear

	clear<T>(arr: T[]): T[]

Clears array.

Returns old array contents. Never returns null or undefined.

### splice

	splice<T>(arr: T[],
		removeParamsList: IList.IndexCount[],
		addParamsList: IList.IndexItems<T>[]): IList.SpliceResult<T>

Reference: [jwidget/IList](IList.md).

Removes and inserts item ranges (in this order).

`removeParamsList` is an array of segments to remove sorted by index asc. Segments are removed in backward order.

`addParamsList` is an array of segments to insert sorted by index asc. Segments are inserted in forward order.

Never returns null or undefined.

### reorder

	reorder<T>(arr: T[], indexArray: number[])

Reorders array items.

Item with index `i` is moved to index `indexArray[i]`. `indexArray` must contain all indexes from 0 to (length - 1).

### sort

	sort<T>(arr: T[], callback?: (item: T, index: number) => any, scope?: any, order?: number)

Sorts array by the result of `callback` function call for each item.

`callback` must return a comparable value, compatible with [cmp](index.md#cmp). Returns item itself by default.

Pass positive order for ascending sorting, negative order for descending sorting.

### sortComparing

	sortComparing<T>(arr: T[], compare?: (t1: T, t2: T, i1: number, i2: number) => number, scope?: any, order?: number)

Sorts array by comparer.

`compare` must return positive value if t1 > t2; negative value if t1 < t2; 0 if t1 == t2. Defaults to [cmp](index.md#cmp).

Pass positive order for ascending sorting, negative order for descending sorting.

## Other functions

### count

	count<T>(arr: T[], callback: (item: T, index: number) => boolean, scope?: any): number

Counts items matching criteria.

Returns the number of items for which callback returns [truthy](index.md#istruthy) value.

### getSortingIndices

	getSortingIndices<T>(arr: T[], callback?: (item: T, index: number) => any, scope?: any, order?: number): number[]

Returns indices of sorted items.

Builds array of item indices, sorted by the result of callback call for each item.

Callback function must return a comparable value, compatible with [cmp](index.md#cmp). Returns item itself by default.

Pass positive order for ascending sorting, negative order for descending sorting.

### getSortingIndicesComparing

	getSortingIndicesComparing<T>(arr: T[], compare?: (t1: T, t2: T, i1: number, i2: number) => any, scope?: any, order?: number): number[]

Returns indices of sorted items.

Builds array of item indices, sorted by comparer.

Comparer function must return positive value if t1 > t2; negative value if t1 < t2; 0 if t1 == t2. Defaults to [cmp](index.md#cmp).

Pass positive order for ascending sorting, negative order for descending sorting.

### toSorted

	toSorted<T>(arr: T[], callback?: (item: T, index: number) => any, scope?: any, order?: number): T[]

Builds and returns a new array consisting of original array items sorted by the result of callback call for each item.

Callback function must return a comparable value, compatible with [cmp](index.md#cmp). Returns item itself by default.

Pass positive order for ascending sorting, negative order for descending sorting.

As opposed to [sort](#sort), does not modify the array.

### toSortedComparing

	toSortedComparing<T>(arr: T[], compare?: (t1: T, t2: T, i1: number, i2: number) => any, scope?: any, order?: number): T[]

Builds and returns a new array consisting of original array items sorted by comparer.

Comparer function must return positive value if t1 > t2; negative value if t1 < t2; 0 if t1 == t2. Defaults to [cmp](index.md#cmp).

Pass positive order for ascending sorting, negative order for descending sorting.

As opposed to [sortComparing](#sortComparing), does not modify the array.

### toReversed

	toReversed<T>(arr: T[]): T[]

Builds a new array containing items of this array in reversed order.

As opposed to `arr.reverse()`, does not modify the array.

### index

	index<T>(arr: T[], callback: (item: T, index: number) => string, scope?: any): Dictionary<T>

Reference: [jwidget/Dictionary](Dictionary.md).

Indexes collection.

Builds and returns a new map by rule: key is the result of the indexer function call, value is the corresponding item.

### reduce

	reduce<T, U>(arr: T[], reducer: Reducer<T, U>): U
	reduce<T, U>(arr: T[], callback: (accumulator: U, item: T, index: number) => U, initial: U): U

Reference: [jwidget/Reducer](Reducer.md).

Applies a function against an accumulator and each item in the array (from left to right) to reduce it to a single value. Compared to standard `arr.reduce`, also supports [jwidget/Reducer](Reducer.md) as an argument.

### equal

	equal<T>(x: T[], y: T[]): boolean

Checks two arrays for equality, item by item (===). Not a deep comparison.

### backEvery

	backEvery<T>(arr: T[], callback: (item: T, index: number) => boolean, scope?: any): boolean

The same as `arr.every`, but iterates the items in backward order.

### isIdentity

	isIdentity(arr: number[]): boolean

Checks if every item in array is equal to its index: `array[i] === i`.

### invert

	invert(arr: number[]): number[]

Builds a new array by the rule: `result[array[i]] === i`.

### merge

	merge<T>(arrays: T[][]): T[]

Builds a new array consisting of subarray items in the same order.

## Low-level array modification functions (primarily for internal usage)

### tryAddAll

	tryAddAll<T>(arr: T[], items: T[], index?: number): boolean

The same as [addAll](#addall), but returns undefined if the array stays unmodified. Else returns true.

### trySet

	trySet<T>(arr: T[], index: number, item: T): Some<T>

Reference: [Some](jwidget/Some).

The same as [addAll](#addall), but returns undefined if the array stays unmodified. Else returns [Some](jwidget/Some) of the replaced item.

### tryRemoveAll

	tryRemoveAll<T>(arr: T[], index: number, count: number): T[]

The same as [removeAll](#removeall), but returns undefined if the array stays unmodified.

### tryMove

	tryMove<T>(arr: T[], fromIndex: number, toIndex: number): T

The same as [move](#move), but returns undefined if the array stays unmodified.

### tryClear

	tryClear<T>(arr: T[]): T[]

The same as [clear](#clear), but returns undefined if the array stays unmodified.

### trySplice

	trySplice<T>(arr: T[],
		removeParamsList: IList.IndexCount[],
		addParamsList: IList.IndexItems<T>[]): IList.SpliceResult<T>

The same as [splice](#splice), but returns undefined if the array stays unmodified.

### tryReorder

	tryReorder<T>(arr: T[], indexArray: number[]): T[]

The same as [reorder](#reorder), but returns undefined if the array stays unmodified. Else returns old array contents.

## Low-level array analysing functions (primarily for internal usage)

### detectSplice

	detectSplice<T>(oldItems: T[], newItems: T[],
		getKey?: (item: T) => string): IList.SpliceParams<T>

Reference: [jwidget/IList](IList.md).

Detects [splice](#splice) method arguments to adjust array contents to `newItems`.
Determines item ranges neccessary to be removed and inserted.
All items must have unique `getKey` function result.
Default `getKey` implementation identifies primitive values and [jwidget/Identifiable](Identifiable.md) objects.
If items don't have unique key, probably [detectFilter](#detectfilter) method may help, because it doesn't require item uniquiness.

Returns arguments of [splice](#splice) method. If no method call required, returns undefined.

### detectFilter

	detectFilter<T>(oldItems: T[], newItems: T[]): IList.IndexCount[]

Reference: [jwidget/IList](IList.md).

Detects `removeParamsList` argument of [splice](#splice) method to adjust array contents to `newItems`.
Determines item ranges neccessary to be removed.
Doesn't assume item insertion - try [detectSplice](#detectsplice) if that's the case.
In advantage to [detectSplice](#detectsplice), doesn't require item uniquiness.

Returns `removeParamsList` argument of [splice](#splice) method. If no method call required, returns undefined.

### detectReorder

	detectReorder<T>(oldItems: T[], newItems: T[], getKey?: (item: T) => string): number[]

Detects [reorder](#reorder) method arguments to adjust array contents to `newItems`.
Determines indices to move the items to.

All items must have unique `getKey` function result.
Default `getKey` implementation identifies primitive values and [jwidget/Identifiable](Identifiable.md) objects.

If `newItems` contents differ from `oldItems` contents, you should pray Gods that application still works well.

Returns `indexArray` argument of [reorder](#reorder) method. If no method call required, returns undefined.

### detectSort

	detectSort<T>(arr: T[], callback?: (item: T, index: number) => any, scope?: any, order?: number): number[]

Detects [reorder](#reorder) method arguments to sort array contents by the result of `callback` call for each item.

`callback` must return a comparable value, compatible with [cmp](index.md#cmp). Returns item itself by default.

Pass positive order for ascending sorting, negative order for descending sorting.

Returns `indexArray` argument of [reorder](#reorder) method. If no method call required, returns undefined.

### detectSortComparing

	detectSortComparing<T>(arr: T[], compare?: (t1: T, t2: T, i1: number, i2: number) => number, scope?: any, order?: number): number[]

Detects [reorder](#reorder) method arguments to sort array contents by comparer.

`compare` must return positive value if t1 > t2; negative value if t1 < t2; 0 if t1 == t2. Defaults to [cmp](index.md#cmp).

Pass positive order for ascending sorting, negative order for descending sorting.

Returns `indexArray` argument of [reorder](#reorder) method. If no method call required, returns undefined.
