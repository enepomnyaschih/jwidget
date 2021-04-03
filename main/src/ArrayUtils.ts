/*
MIT License

Copyright (c) 2021 Egor Nepomnyaschih

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

/**
 * Determines index of the first item the `isHigher` callback returns true for. If such an item does not exist,
 * returns the array length. The input array must be ordered in such a way that all values such that
 * `!isHigher(value)` go before `isHigher(value)`.
 * @param arr Sorted array.
 * @param isHigher Should return true if the argument is "higher" than the searched value.
 * @returns Array index.
 */
export function binarySearch<T>(arr: readonly T[], isHigher: (value: T) => boolean): number {
	const length = arr.length;
	const len2 = length >> 1;
	let step = 1;
	while (step <= len2) {
		step <<= 1;
	}
	let index = 0;
	while (step) {
		if ((index + step <= length) && !isHigher(arr[index + step - 1])) {
			index += step;
		}
		step >>= 1;
	}
	return index;
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
 * @param arr Array.
 * @returns Every item in `arr` is equal to its index: `arr[i] === i`.
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
 * Builds a new array by the rule: `result[arr[i]] === i` and returns it.
 *
 * @param arr Array to invert.
 * @returns New inverted array.
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
 * @returns Merged array.
 */
export function merge<T>(arrays: readonly (readonly T[])[]): T[] {
	const result: T[] = [];
	for (let array of arrays) {
		addAll(result, array);
	}
	return result;
}

/**
 * Adds a range of new items to an array.
 * @param arr Array to modify.
 * @param items Items to add.
 * @param index Index of an item to add the new ones before. By default, appends the items to the end of array.
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
 * Moves an item in an array.
 * @param arr Array to modify.
 * @param fromIndex Index of an item to move.
 * @param toIndex Index to move the item to.
 * @returns Value of the moved item.
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
 * @param arr Array to modify.
 * @param segmentsToRemove Array of segments to remove sorted by index asc. Segments are removed in backward order.
 * @param segmentsToAdd Array of segments to insert sorted by index asc. Segments are inserted in forward order.
 * @returns Splice result. If the array is not modified, returns undefined.
 */
export function trySplice<T>(arr: T[],
							 segmentsToRemove: Iterable<IBindableArray.IndexCount>,
							 segmentsToAdd: Iterable<IBindableArray.IndexItems<T>>): IBindableArray.SpliceResult<T> {
	const optimizedSegmentsToRemove: IBindableArray.IndexCount[] = [];
	let rlast: [number, number] = null;
	for (let rparams of segmentsToRemove) {
		if (rlast && (rparams[0] === rlast[0] + rlast[1])) {
			rlast[1] += rparams[1];
		} else {
			rlast = [rparams[0], rparams[1]];
			optimizedSegmentsToRemove.push(rlast);
		}
	}

	const optimizedSegmentsToAdd: IBindableArray.IndexItems<T>[] = [];
	let alast: [number, T[]] = null;
	for (let aparams of segmentsToAdd) {
		if (alast && (aparams[0] === alast[0] + alast[1].length)) {
			addAll(alast[1], aparams[1]);
		} else {
			alast = [aparams[0], aparams[1].concat()];
			optimizedSegmentsToAdd.push(alast);
		}
	}

	const oldContents = arr.concat();
	const removedSegments: IBindableArray.IndexItems<T>[] = [];
	for (let i = optimizedSegmentsToRemove.length - 1; i >= 0; --i) {
		const rparams = optimizedSegmentsToRemove[i];
		if (rparams[1] === 0) {
			continue;
		}
		const index = rparams[0];
		const items = arr.splice(index, rparams[1]);
		removedSegments.push([index, items]);
	}
	const addedSegments: IBindableArray.IndexItems<T>[] = [];
	for (let aparams of optimizedSegmentsToAdd) {
		if (!aparams[1].length) {
			continue;
		}
		addAll(arr, aparams[1], aparams[0]);
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
 * @param arr Array to modify.
 * @param indexArray Index array. Item with index `i` will be moved to index `indexArray[i]`.
 * Must contain all indexes from 0 to (length - 1).
 * @returns Old array contents. If the array is not modified, returns undefined.
 */
export function tryReorder<T>(arr: T[], indexArray: readonly number[]): T[] {
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
