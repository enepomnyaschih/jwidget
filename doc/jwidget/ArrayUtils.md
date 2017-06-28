[Back to index](../README.md)

# Array utilities

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

## Search functions

### contains

	contains<T>(arr: T[], item: T): boolean

Checks if the item exists in array.

### find

	find<T>(arr: T[], callback: (item: T, index: number) => boolean, scope?: any): T

Finds an item matching criteria.

Returns the first item for which callback returns [truthy](index.md#isTruthy) value.

Algorithms iterates items consequently, and stops after the first item matching the criteria.

### findIndex

	findIndex<T>(arr: T[], callback: (item: T, index: number) => boolean, scope?: any): number

Finds an item matching criteria.

Returns index of the first item for which callback returns [truthy](index.md#isTruthy) value.

Algorithms iterates items consequently, and stops after the first item matching the criteria.

## Iteration functions

### count

	count<T>(arr: T[], callback: (item: T, index: number) => boolean, scope?: any): number

Counts items matching criteria.

Returns the number of items for which callback returns [truthy](index.md#isTruthy) value.

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

### toSortedComparing

	toSortedComparing<T>(arr: T[], compare?: (t1: T, t2: T, i1: number, i2: number) => any, scope?: any, order?: number): T[]

Builds and returns a new array consisting of original array items sorted by comparer.

Comparer function must return positive value if t1 > t2; negative value if t1 < t2; 0 if t1 == t2. Defaults to [cmp](index.md#cmp).

Pass positive order for ascending sorting, negative order for descending sorting.
