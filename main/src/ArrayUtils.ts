/*
MIT License

Copyright (c) 2020 Egor Nepomnyaschih

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

import ArraySpliceResult from './ArraySpliceResult';
import IBindableArray from './IBindableArray';
import {cmp} from './index';
import IndexCount from './IndexCount';
import IndexItems from './IndexItems';
import {identity, initReduceState} from './internal';
import Reducer from './Reducer';

/**
 * Determines index of the first item which is more (or less if `order` < 0) than the specified value by `compare` function,
 * using binary search. Array must be sorted by `compare` function.
 * Can be used for item insertion easily.
 * If you want to use this method for item removal, you must look at previous item and compare it to `value` first.
 * @param arr Sorted array.
 * @param value Searched value.
 * @param compare Comparer function. Should return positive value if t1 > t2;
 * negative value if t1 < t2; 0 if t1 == t2.
 * Defaults to `cmp`.
 * @param order Sorting order. Positive number if array is sorted ascending, negative if descending.
 * @returns Item index.
 */
export function binarySearch<T>(arr: readonly T[], value: T, compare?: (t1: T, t2: T) => number, order?: number): number {
	compare = compare || cmp;
	order = order || 1;
	const length = arr.length;
	const len2 = length >> 1;
	let step = 1;
	while (step <= len2) {
		step <<= 1;
	}
	let index = 0;
	while (step) {
		if ((index + step <= length) && (order * compare(value, arr[index + step - 1]) >= 0)) {
			index += step;
		}
		step >>= 1;
	}
	return index;
}

/**
 * Returns the array item which callback returns the highest (or lowest) value for.
 *
 * @param arr Array.
 * @param callback Returns a comparable value, compatible with `cmp`. Returns item itself by default.
 * @param order Pass positive order to find the highest value, and negative to find the lowest one.
 * @returns Array item.
 */
export function max<T>(arr: readonly T[], callback?: (item: T, index: number) => any, order: number = 1): T {
	return arr[maxIndex(arr, callback, order)];
}

/**
 * Returns index of the array item which callback returns the highest (or lowest) value for.
 *
 * @param arr Array.
 * @param callback Returns a comparable value, compatible with `cmp`. Returns item itself by default.
 * @param order Pass positive order to find the highest value, and negative to find the lowest one.
 * @returns Item index.
 */
export function maxIndex<T>(arr: readonly T[], callback?: (item: T, index: number) => any, order: number = 1): number {
	if (arr.length === 0) {
		return -1;
	}
	callback = callback || identity;
	let result = 0;
	let max: any = callback(arr[0], 0);
	for (let i = 1, l = arr.length; i < l; ++i) {
		const item: any = callback(arr[i], i);
		const diff = cmp(item, max);
		if ((order > 0 && diff > 0) || (order < 0 && diff < 0)) {
			result = i;
			max = item;
		}
	}
	return result;
}

/**
 * Returns the highest (or lowest) array item in terms of the specified comparer function.
 *
 * @param arr Array.
 * @param compare Comparer function. Should return positive value if t1 > t2;
 * negative value if t1 < t2; 0 if t1 == t2. Defaults to `cmp`.
 * @param order Pass positive order to find the highest value, and negative to find the lowest one.
 * @returns Array item.
 */
export function maxComparing<T>(arr: readonly T[], compare?: (t1: T, t2: T, i1: number, i2: number) => number,
								order: number = 1): T {
	return arr[maxIndexComparing(arr, compare, order)];
}

/**
 * Returns index of the highest (or lowest) array item in terms of the specified comparer function.
 *
 * @param arr Array.
 * @param compare Comparer function. Should return positive value if t1 > t2;
 * negative value if t1 < t2; 0 if t1 == t2. Defaults to `cmp`.
 * @param order Pass positive order to find the highest value, and negative to find the lowest one.
 * @returns Item index.
 */
export function maxIndexComparing<T>(arr: readonly T[], compare?: (t1: T, t2: T, i1: number, i2: number) => number,
									 order: number = 1): number {
	if (arr.length === 0) {
		return -1;
	}
	compare = compare || cmp;
	let result = 0;
	for (let i = 1, l = arr.length; i < l; ++i) {
		if (order * compare(arr[result], arr[i], result, i) < 0) {
			result = i;
		}
	}
	return result;
}

/**
 * Returns the array item which callback returns the lowest (or highest) value for.
 *
 * @param arr Array.
 * @param callback Returns a comparable value, compatible with `cmp`. Returns item itself by default.
 * @param order Pass positive order to find the lowest value, and negative to find the highest one.
 * @returns Array item.
 */
export function min<T>(arr: readonly T[], callback?: (item: T, index: number) => any, order: number = 1): T {
	return max(arr, callback, -order);
}

/**
 * Returns index of the array item which callback returns the lowest (or highest) value for.
 *
 * @param arr Array.
 * @param callback Returns a comparable value, compatible with `cmp`. Returns item itself by default.
 * @param order Pass positive order to find the lowest value, and negative to find the highest one.
 * @returns Item index.
 */
export function minIndex<T>(arr: readonly T[], callback?: (item: T, index: number) => any, order: number = 1): number {
	return maxIndex(arr, callback, -order);
}

/**
 * Returns the lowest (or highest) array item in terms of the specified comparer function.
 *
 * @param arr Array.
 * @param compare Comparer function. Should return positive value if t1 > t2;
 * negative value if t1 < t2; 0 if t1 == t2. Defaults to `cmp`.
 * @param order Pass positive order to find the lowest value, and negative to find the highest one.
 * @returns Array item.
 */
export function minComparing<T>(arr: readonly T[], compare?: (t1: T, t2: T, i1: number, i2: number) => number,
								order: number = 1): T {
	return maxComparing(arr, compare, -order);
}

/**
 * Returns index of the lowest (or highest) array item in terms of the specified comparer function.
 *
 * @param arr Array.
 * @param compare Comparer function. Should return positive value if t1 > t2;
 * negative value if t1 < t2; 0 if t1 == t2. Defaults to `cmp`.
 * @param order Pass positive order to find the lowest value, and negative to find the highest one.
 * @returns Item index.
 */
export function minIndexComparing<T>(arr: readonly T[], compare?: (t1: T, t2: T, i1: number, i2: number) => number,
									 order: number = 1): number {
	return maxIndexComparing(arr, compare, -order);
}

/**
 * Counts the items matching criteria.
 *
 * Returns count of items which `callback` returns truthy value for.
 *
 * @param arr Array.
 * @param callback Criteria callback.
 * @returns Number of items.
 */
export function count<T>(arr: readonly T[], callback: (item: T, index: number) => any): number {
	let result = 0;
	arr.forEach((item, index) => {
		if (callback(item, index)) {
			++result;
		}
	});
	return result;
}

/**
 * Indexes an array. Builds and returns a new map by rule: key is the result of the indexer function call,
 * value is the corresponding item.
 * @param arr Array.
 * @param callback Indexer function.
 * @returns Array index.
 */
export function index<T, K>(arr: readonly T[], callback: (item: T, index: number) => K): ReadonlyMap<K, T> {
	const result = new Map<K, T>();
	arr.forEach((item, index) => {
		result.set(callback(item, index), item);
	});
	return result;
}

/**
 * Applies a function against an accumulator and each item in the array (from left to right)
 * to reduce it to a single value.
 *
 * @param arr Array.
 * @param reducer Standard reducer. See `jwidget/Reducer` for examples.
 * @returns Final accumulator value.
 */
export function reduce<T, U>(arr: readonly T[], reducer: Reducer<T, U>): U;

/**
 * Applies a function against an accumulator and each item in the array (from left to right)
 * to reduce it to a single value.
 *
 * @param arr Array.
 * @param callback Function to execute on each item in the array.
 * @param initial Value to use as the first argument to the first call of the callback.
 * @returns Final accumulator value.
 */
export function reduce<T, U>(arr: readonly T[], callback: (accumulator: U, item: T, index: number) => U, initial: U): U;
export function reduce<T, U>(arr: readonly T[],
							 reducer: Reducer<T, U> | ((accumulator: U, item: T, index: number) => U), initial?: U): U {
	let {value, callback} = (typeof reducer !== "function") ? initReduceState(reducer) : {
		value: initial,
		callback: reducer
	};
	return arr.reduce(callback, value);
}

/**
 * Iterates through array items in backward order.
 * @param arr Array.
 * @param callback Callback.
 */
export function backForEach<T>(arr: readonly T[], callback: (item: T, index: number) => void): void {
	for (let i = arr.length - 1; i >= 0; --i) {
		callback(arr[i], i);
	}
}

/**
 * Checks if every item in array is equal to its index: `array[i] === i`.
 *
 * @param arr Array.
 * @returns Every item is equal to its index.
 */
export function isIdentity(arr: readonly number[]): boolean {
	for (let i = 0, l = arr.length; i < l; ++i) {
		if (arr[i] !== i) {
			return false;
		}
	}
	return true;
}

/**
 * Builds a new array by the rule: `result[array[i]] === i`.
 *
 * @param arr Array.
 * @returns The inverted array.
 */
export function invert(arr: readonly number[]): number[] {
	const l = arr.length;
	const result = new Array<number>(l);
	for (let i = 0; i < l; ++i) {
		result[arr[i]] = i;
	}
	return result;
}

/**
 * Builds a new array consisting of subarray items in the same order.
 *
 * @param arrays Array of subarrays.
 * @returns The merged array.
 */
export function merge<T>(arrays: readonly (readonly T[])[]): T[] {
	const result: T[] = [];
	for (let array of arrays) {
		addAll(result, array);
	}
	return result;
}

/**
 * Adds a range of items to an array.
 * @param arr Array.
 * @param items Items to add.
 * @param index Index of an item to add the new ones before. By default, appends the items to the end of the array.
 */
export function addAll<T>(arr: T[], items: Iterable<T>, index?: number): void {
	if (index === undefined) {
		for (let item of items) {
			arr.push(item);
		}
	} else {
		const tail = arr.splice(index, arr.length - index);
		addAll(arr, items);
		addAll(arr, tail);
	}
}

/**
 * Moves an item inside array.
 * @param arr Array.
 * @param fromIndex Item index to move.
 * @param toIndex Index to move to.
 * @returns The moved item.
 */
export function move<T>(arr: T[], fromIndex: number, toIndex: number): T {
	const item = arr[fromIndex];
	if (fromIndex === toIndex) {
		return item;
	}
	arr.splice(fromIndex, 1);
	arr.splice(toIndex, 0, item);
	return item;
}

/**
 * Removes and inserts item ranges.
 * @param arr Array.
 * @param segmentsToRemove Array of segments to remove sorted by index asc. Segments are removed in backward order.
 * @param segmentsToAdd Array of segments to insert sorted by index asc. Segments are inserted in forward order.
 * @returns Splice result. If the array is not modified, returns undefined.
 */
export function trySplice<T>(arr: T[],
							 segmentsToRemove: Iterable<IBindableArray.IndexCount>,
							 segmentsToAdd: Iterable<IBindableArray.IndexItems<T>>): IBindableArray.SpliceResult<T> {
	const optimizedSegmentsToRemove: IBindableArray.IndexCount[] = [];
	let rlast: IndexCount = null;
	for (let rparams of segmentsToRemove) {
		if (rlast && (rparams.index === rlast.index + rlast.count)) {
			rlast.count += rparams.count;
		} else {
			rlast = rparams.clone();
			optimizedSegmentsToRemove.push(rlast);
		}
	}

	const optimizedSegmentsToAdd: IBindableArray.IndexItems<T>[] = [];
	let alast: IBindableArray.IndexItems<T> = null;
	for (let aparams of segmentsToAdd) {
		if (alast && (aparams.index === alast.index + alast.items.length)) {
			addAll(<T[]>alast.items, aparams.items);
		} else {
			alast = aparams.clone();
			optimizedSegmentsToAdd.push(alast);
		}
	}

	const oldContents = arr.concat();
	const removedSegments: IBindableArray.IndexItems<T>[] = [];
	for (let i = optimizedSegmentsToRemove.length - 1; i >= 0; --i) {
		const rparams = optimizedSegmentsToRemove[i];
		if (rparams.count === 0) {
			continue;
		}
		const index = rparams.index;
		const items = arr.splice(index, rparams.count);
		removedSegments.push(new IndexItems<T>(index, items));
	}
	const addedSegments: IBindableArray.IndexItems<T>[] = [];
	for (let aparams of optimizedSegmentsToAdd) {
		if (!aparams.items.length) {
			continue;
		}
		addAll(arr, aparams.items, aparams.index);
		addedSegments.push(aparams);
	}
	if ((removedSegments.length === 0) && (addedSegments.length === 0)) {
		return undefined;
	}
	removedSegments.reverse();
	return new ArraySpliceResult<T>(oldContents, removedSegments, addedSegments);
}

/**
 * Reorders array items.
 * @param arr Array.
 * @param indexArray Index array. Item with index `i` will be moved to index `indexArray[i]`.
 * Must contain all indexes from 0 to (length - 1).
 * @returns Old array contents. If the array is not modified, returns undefined.
 */
export function tryReorder<T>(arr: T[], indexArray: readonly number[]): readonly T[] {
	const length = arr.length;
	if (isIdentity(indexArray)) {
		return undefined;
	}
	const oldContents = arr.concat();
	for (let i = 0; i < length; ++i) {
		arr[indexArray[i]] = oldContents[i];
	}
	return oldContents;
}
