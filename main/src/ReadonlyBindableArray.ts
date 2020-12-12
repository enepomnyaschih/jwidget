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

import Bindable from "./Bindable";
import IBindableArray from './IBindableArray';
import Listenable from './Listenable';

/**
 * Bindable readonly wrapper over a native array.
 */
interface ReadonlyBindableArray<T> {
	/**
	 * Iterates over items in the array.
	 */
	[Symbol.iterator](): IterableIterator<T>;

	/**
	 * The array never dispatches any messages. This knowledge may help you do certain code optimizations.
	 */
	readonly silent: boolean;

	/**
	 * Property containing number of items in the array.
	 */
	readonly length: Bindable<number>;

	/**
	 * Internal representation of the array.
	 */
	readonly native: readonly T[];

	/**
	 * Items are removed from the array and/or items are added to the array.
	 */
	readonly onSplice: Listenable<IBindableArray.SpliceResult<T>>;

	/**
	 * An item is replaced in the array.
	 */
	readonly onReplace: Listenable<IBindableArray.ReplaceMessage<T>>;

	/**
	 * An item is moved in the array.
	 */
	readonly onMove: Listenable<IBindableArray.MoveMessage<T>>;

	/**
	 * Items are reordered in the array. Passes mapping of indices (old to new) as a message.
	 */
	readonly onReorder: Listenable<IBindableArray.ReorderMessage<T>>;

	/**
	 * The array is cleared. Passes old contents as a message.
	 */
	readonly onClear: Listenable<readonly T[]>;

	/**
	 * The array is changed. Dispatched right after any another message.
	 */
	readonly onChange: Listenable<void>;

	/**
	 * Returns an item by index. If an item with such index doesn't exist, returns undefined.
	 * @param index Item index.
	 * @returns Array item.
	 */
	get(index: number): T;

	/**
	 * Checks if a value exists in the array.
	 */
	includes(value: T): boolean;

	/**
	 * Returns index of the first item with the specified value in this array.
	 * @param value Value.
	 * @returns Item index. If an item doesn't exist, returns -1.
	 */
	indexOf(value: T): number;

	/**
	 * Returns index of the last item with the specified value in this array.
	 * @param value Value.
	 * @returns Item index. If an item doesn't exist, returns -1.
	 */
	lastIndexOf(value: T): number;

	/**
	 * Matches all array items against a criteria. Returns true if the callback returns true for every
	 * array item. The algorithm iterates through the items sequentially, and stops the process after the first item
	 * violating the criteria.
	 * @param callback Criteria callback.
	 * @returns All items match the criteria.
	 */
	every(callback: (value: T, index: number) => boolean): boolean;

	/**
	 * Matches each array item against a criteria. Returns true if the callback returns true for at least one
	 * item in the array. The algorithm iterates through the items sequentially, and stops the process after the first
	 * item matching the criteria.
	 * @param callback Criteria callback.
	 * @returns Some item matches the criteria.
	 */
	some(callback: (value: T, index: number) => boolean): boolean;

	/**
	 * Iterates through the array items. Calls the specified function for all items.
	 * @param callback Callback function.
	 */
	forEach(callback: (value: T, index: number) => void): void;

	/**
	 * Finds an item matching the criteria. Returns the first item the callback returns true for. The
	 * algorithm iterates through the items sequentially, and stops the process after the first item matching the
	 * criteria.
	 * @param callback Criteria callback.
	 * @returns First item matching the criteria.
	 */
	find(callback: (value: T, index: number) => boolean): T;

	/**
	 * Finds an item matching the criteria. Returns index of the first item the callback returns true for.
	 * The algorithm iterates through the items sequentially, and stops the process after the first item matching the
	 * criteria.
	 * @param callback Criteria callback.
	 * @returns Index of the first item matching the criteria.
	 */
	findIndex(callback: (value: T, index: number) => boolean): number;

	/**
	 * Applies a function against an accumulator and each item in the collection (left to right) to reduce it to a
	 * single value.
	 * @param callback Function to execute on each item in the collection.
	 * @param initial Value to use as the first argument to the first call of the callback.
	 * @returns Final accumulator value.
	 */
	reduce<U>(callback: (accumulator: U, value: T, index: number) => U, initial: U): U;

	/**
	 * Applies a function against an accumulator and each item in the collection (right to left) to reduce it to a
	 * single value.
	 * @param callback Function to execute on each item in the collection.
	 * @param initial Value to use as the first argument to the first call of the callback.
	 * @returns Final accumulator value.
	 */
	reduceRight<U>(callback: (accumulator: U, value: T, index: number) => U, initial: U): U;

	/**
	 * Detects `splice` method arguments to adjust the array contents to `newContents`.
	 * Determines item ranges to be removed and inserted. All current values in the array must be unique.
	 * Otherwise, consider using `detectFilter` method, because it doesn't require value uniqueness.
	 * @param newContents New array contents.
	 * @returns `splice` method arguments. If no method call required, returns undefined.
	 */
	detectSplice(newContents: readonly T[]): IBindableArray.SpliceParams<T>;

	/**
	 * Detects segments to remove to adjust the array contents to `newContents` with a `splice` method call.
	 * Doesn't consider item insertion - try `detectSplice` if that's necessary.
	 * In advantage to `detectSplice`, doesn't require item uniqueness.
	 * @param newContents New array contents.
	 * @returns Segments to remove. If no method call required, returns undefined.
	 */
	detectFilter(newContents: readonly T[]): readonly IBindableArray.IndexCount[];

	/**
	 * Detects `reorder` method arguments to adjust the array contents to `newContents`.
	 * Determines where all items must be moved to. Values of `newContents` must match current values of the array.
	 * All values in the array must be unique.
	 * @param newContents New array contents.
	 * @returns `indexMapping` argument of `reorder` method. If no method call required, returns undefined.
	 */
	detectReorder(newContents: readonly T[]): readonly number[];

	/**
	 * Detects `reorder` method arguments to sort array contents by result of `callback` call for each item.
	 * @param callback Indexer function. Must return a comparable value, compatible with
	 * `cmp`. Returns item itself by default.
	 * @param order Sorting order. Positive number for ascending sorting, negative for descending sorting.
	 * @returns `indexMapping` argument of `reorder` method. If no method call required, returns undefined.
	 */
	detectSort(callback?: (item: T, index: number) => any, order?: number): readonly number[];

	/**
	 * Detects `reorder` method arguments to sort array contents by comparer.
	 * @param compare Comparer function. Should return positive value if t1 > t2;
	 * negative value if t1 < t2; 0 if t1 == t2. Defaults to `cmp`.
	 * @param order Sorting order. Positive number for ascending sorting, negative for descending sorting.
	 * @returns `indexMapping` argument of `reorder` method. If no method call required, returns undefined.
	 */
	detectSortComparing(compare?: (t1: T, t2: T, i1: number, i2: number) => number, order?: number): readonly number[];
}

export default ReadonlyBindableArray;
