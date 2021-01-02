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

import DestroyableReadonlyBindableArray from './DestroyableReadonlyBindableArray';
import IClass from "./IClass";

/**
 * Extension of DestroyableReadonlyBindableArray with modification methods.
 */
interface IBindableArray<T> extends IClass, DestroyableReadonlyBindableArray<T> {

	/**
	 * Makes this array an owner of its values, which means that its items are alive as long as they are present in
	 * this array. The item is destroyed when it leaves the array, and all items are destroyed on the array destruction.
	 * All item values in such array must be unique.
	 */
	ownValues(): this;

	/**
	 * Inserts an item to the array and dispatches a splice message.
	 * @param value Value to insert.
	 * @param index Index of an item to insert new one before. By default, appends the item to the end of the array.
	 */
	add(value: T, index?: number): void;

	/**
	 * Inserts an item range to the array and dispatches a splice message.
	 * @param values Values to insert.
	 * @param index Index of an item to insert new ones before. By default, appends the items to the end of the array.
	 */
	addAll(values: readonly T[], index?: number): void;

	/**
	 * Replaces item at specified position and dispatches an item replacement message.
	 * @param index Index of an item to replace. If the array doesn't contain such index, it may lead to unknown consequences.
	 * @param newValue New item value.
	 * @returns Old item value.
	 */
	set(index: number, newValue: T): T;

	/**
	 * Removes item at specified index and dispatches a splice message.
	 * @param index Index of an item to remove. If the array doesn't contain such index, it may lead to unknown consequences.
	 * @returns The removed item.
	 */
	remove(index: number): T;

	/**
	 * Removes item range from the array and dispatches a splice message.
	 * @param index Index of the first item to remove.
	 * @param count Count of items to remove.
	 * @returns The removed items.
	 */
	removeAll(index: number, count: number): T[];

	/**
	 * Removes all occurrences of the values in the array and dispatches a splice message.
	 * @param values Values to remove.
	 */
	removeValues(values: Iterable<T>): void;

	/**
	 * Moves an item inside the array and dispatches an item movement message.
	 * @param fromIndex Item index to move.
	 * @param toIndex Index to move to.
	 * @returns The moved item.
	 */
	move(fromIndex: number, toIndex: number): T;

	/**
	 * Removes all array items and dispatches a cleanup message.
	 */
	clear(): T[];

	/**
	 * Removes and inserts item ranges granularly and dispatches a splice message.
	 * @param segmentsToRemove Array of segments to remove sorted by index asc. Segments are removed in backward order.
	 * @param segmentsToAdd Array of segments to insert sorted by index asc. Segments are inserted in forward order.
	 * @returns Splice result. Never returns null or undefined.
	 */
	splice(segmentsToRemove: Iterable<IBindableArray.IndexCount>,
		   segmentsToAdd: Iterable<IBindableArray.IndexItems<T>>): IBindableArray.SpliceResult<T>;

	/**
	 * Reorders array items and dispatches a reordering message.
	 * @param indexMapping Index array. Item with index `i` will be moved to index `indexArray[i]`.
	 * Must contain all indexes from 0 to (length - 1).
	 */
	reorder(indexMapping: readonly number[]): void;

	/**
	 * Replaces an item at the specified index and dispatches a splice message.
	 * @param index Index of an item to replace.
	 * @param newValue New item value.
	 * @returns Old item value. If the array is not modified, returns undefined.
	 */
	trySet(index: number, newValue: T): T;

	/**
	 * Removes an item range from the array and dispatches a splice message.
	 * @param index Index of the first item to remove.
	 * @param count Count of items to remove.
	 * @returns The removed items. If the array is not modified, returns undefined.
	 */
	tryRemoveAll(index: number, count: number): T[];

	/**
	 * Moves an item inside the array and dispatches an item replacement message.
	 * @param fromIndex Item index to move.
	 * @param toIndex Index to move to.
	 * @returns The moved item. If the array is not modified, returns undefined.
	 */
	tryMove(fromIndex: number, toIndex: number): T;

	/**
	 * Removes and inserts item ranges granularly and dispatches a splice message.
	 * @param segmentsToRemove Array of segments to remove sorted by index asc. Segments are removed in backward order.
	 * @param segmentsToAdd Array of segments to insert sorted by index asc. Segments are inserted in forward order.
	 * @returns Splice result. If the array is not modified, returns undefined.
	 */
	trySplice(segmentsToRemove: Iterable<IBindableArray.IndexCount>,
			  segmentsToAdd: Iterable<IBindableArray.IndexItems<T>>): IBindableArray.SpliceResult<T>;

	/**
	 * Reorders array items and dispatches a reordering message.
	 * @param indexMapping Index array. Item with index `i` will be moved to index `indexArray[i]`.
	 * Must contain all indexes from 0 to (length - 1).
	 * @returns Old array contents. If the array is not modified, returns undefined.
	 */
	tryReorder(indexMapping: readonly number[]): T[];

	/**
	 * Adjusts array contents to `newContents` using `detectSplice` and `splice` methods.
	 * All current values in the array must be unique.
	 * Otherwise, consider using `performFilter` method, because it doesn't require value uniqueness.
	 * @param newContents New array contents.
	 */
	performSplice(newContents: readonly T[]): void;

	/**
	 * Adjusts array contents to `newContents` using `detectFilter` and `splice` methods.
	 * Doesn't consider item insertion - try `performSplice` if that's necessary.
	 * In advantage to `performSplice`, doesn't require item uniqueness.
	 * @param newContents New array contents.
	 */
	performFilter(newContents: readonly T[]): void;

	/**
	 * Adjusts array contents to `newContents` using `detectReorder` and `reorder` methods.
	 * Values of `newContents` must match current values of the array.
	 * All values in the array must be unique.
	 * @param newContents New array contents.
	 */
	performReorder(newContents: readonly T[]): void;

	/**
	 * Sorts the array by result of `callback` function call for each item. Modifies the array itself.
	 * @param callback Indexer function. Must return a comparable value, compatible with
	 * `cmp`. Returns item itself by default.
	 * @param order Sorting order. Positive number for ascending sorting, negative for descending sorting.
	 */
	sort(callback?: (value: T, index: number) => any, order?: number): void;

	/**
	 * Sorts the array by comparer. Modifies the array itself.
	 * @param compare Comparer function. Should return positive value if t1 > t2;
	 * negative value if t1 < t2; 0 if t1 == t2. Defaults to `cmp`.
	 * @param order Sorting order. Positive number for ascending sorting, negative for descending sorting.
	 */
	sortComparing(compare?: (t1: T, t2: T, i1: number, i2: number) => number, order?: number): void;

	/**
	 * Reverses item order in the array. Modifies the array itself.
	 */
	reverse(): void;
}

export default IBindableArray;

namespace IBindableArray {
	/**
	 * Array item movement message.
	 */
	export interface MoveMessage<T> {
		/**
		 * Where the item is moved from.
		 */
		readonly fromIndex: number;

		/**
		 * Where the item is moved to.
		 */
		readonly toIndex: number;

		/**
		 * The moved item value.
		 */
		readonly value: T;
	}

	/**
	 * Array item replacement message.
	 */
	export interface ReplaceMessage<T> {
		/**
		 * Index of the replaced item.
		 */
		readonly index: number;

		/**
		 * Old item value.
		 */
		readonly oldValue: T;

		/**
		 * New item value.
		 */
		readonly newValue: T;
	}

	/**
	 * Array item reordering message.
	 */
	export interface ReorderMessage<T> {
		/**
		 * Old array contents.
		 */
		readonly oldContents: readonly T[];

		/**
		 * Indexes of items in the reordered array.
		 */
		readonly indexMapping: readonly number[];
	}

	/**
	 * Array splice method arguments. Result of `detectSplice` method.
	 */
	export interface SpliceParams<T> {
		/**
		 * Segments to remove.
		 */
		readonly segmentsToRemove: readonly IndexCount[];

		/**
		 * Segments to add.
		 */
		readonly segmentsToAdd: readonly IndexItems<T>[];
	}

	/**
	 * Array splice method result.
	 */
	export interface SpliceResult<T> {
		/**
		 * Old array contents.
		 */
		readonly oldContents: readonly T[];

		/**
		 * Removed item segments.
		 */
		readonly removedSegments: readonly IndexItems<T>[];

		/**
		 * Added item segments.
		 */
		readonly addedSegments: readonly IndexItems<T>[];

		/**
		 * Plain array of all removed items.
		 */
		readonly removedItems: readonly T[];

		/**
		 * Plain array of all added items.
		 */
		readonly addedItems: readonly T[];

		/**
		 * Removed item segments converted to index and count pairs.
		 */
		readonly removeParams: readonly IndexCount[];

		/**
		 * The splice call didn't change the array.
		 */
		readonly empty: boolean;
	}

	/**
	 * Index and count pair. Used in array splice method arguments to specify item segments to remove.
	 */
	export type IndexCount = readonly [number, number];

	/**
	 * Index and items pair. Used in array splice method arguments to specify item segments to add, and in
	 * ArraySpliceResult class to specify removed and added item segments.
	 */
	export type IndexItems<T> = readonly [number, readonly T[]];
}
