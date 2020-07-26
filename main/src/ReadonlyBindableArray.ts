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
import IBindableMap from './IBindableMap';
import IBindableSet from "./IBindableSet";
import Listenable from './Listenable';
import Reducer from './Reducer';

/**
 * Ordered collection of items. Each item of the array has an index. Index of first item is 0,
 * index of each next one is higher by 1.
 * @param T Item type.
 */
interface ReadonlyBindableArray<T> {
	/**
	 * Checks if this collection never dispatches any message. This knowledge may help you do certain code optimizations.
	 */
	readonly silent: boolean;

	/**
	 * Identifies an item in this collection for optimization of some algorithms.
	 */
	readonly getKey: (item: T) => any;

	/**
	 * Collection length property.
	 */
	readonly length: Bindable<number>;

	/**
	 * Checks collection for emptiness.
	 */
	readonly empty: boolean;

	/**
	 * Returns the first (or some) item in collection. If collection is empty, returns undefined.
	 */
	readonly first: T;

	/**
	 * The last item of the array.
	 */
	readonly last: T;

	/**
	 * The index of the last item of the array. If the array is empty, returns undefined.
	 */
	readonly lastIndex: number;

	/**
	 * Item array - internal collection representation.
	 *
	 * Caution: doesn't make a copy - please don't modify.
	 */
	readonly items: T[];

	/**
	 * Items are removed from the array and items are added to the array.
	 */
	readonly onSplice: Listenable<IBindableArray.SpliceMessage<T>>;

	/**
	 * An item is replaced in the array.
	 */
	readonly onReplace: Listenable<IBindableArray.ReplaceMessage<T>>;

	/**
	 * An item is moved in the array.
	 */
	readonly onMove: Listenable<IBindableArray.MoveMessage<T>>;

	/**
	 * The array is cleared.
	 */
	readonly onClear: Listenable<IBindableArray.MessageWithItems<T>>;

	/**
	 * Items are reordered in the array.
	 */
	readonly onReorder: Listenable<IBindableArray.ReorderMessage<T>>;

	/**
	 * The array is changed. Dispatched right after any another message.
	 */
	readonly onChange: Listenable<IBindableArray.Message<T>>;

	/**
	 * Returns a shallow copy of this collection.
	 */
	clone(): IBindableArray<T>;

	/**
	 * Checks item for existence in collection.
	 */
	contains(item: T): boolean;

	/**
	 * Returns an item by index. If an item with such index doesn't exist, returns undefined.
	 * @param index Item index.
	 */
	get(index: number): T;

	/**
	 * @inheritDoc
	 */
	every(callback: (item: T, index: number) => any, scope?: any): boolean;

	/**
	 * Checks all items against the criteria in backward order.
	 * Returns true if the callback returns !== false for all collection items.
	 * Algorithm iterates items consequently, and stops it after the first item not matching the criteria.
	 * @param callback Criteria callback.
	 * @param scope Callback call scope. Defaults to collection itself.
	 * @returns Every item matches the criteria.
	 */
	backEvery(callback: (item: T, index: number) => any, scope?: any): boolean;

	/**
	 * @inheritDoc
	 */
	some(callback: (item: T, index: number) => any, scope?: any): boolean;

	/**
	 * @inheritDoc
	 */
	forEach(callback: (item: T, index: number) => any, scope?: any): void;

	/**
	 * Returns item index in this array.
	 * @param item Item.
	 * @returns Item index. If item doesn't exist, returns -1.
	 */
	indexOf(item: T): number;

	/**
	 * @inheritDoc
	 */
	find(callback: (item: T, index: number) => any, scope?: any): T;

	/**
	 * Finds item matching criteria.
	 * Returns index of the first item the callback returns %truthy value for.
	 * Algorithm iterates items sequentially, and stops it after the first item matching the criteria.
	 * @param callback Criteria callback.
	 * @param scope `callback` call scope. Defaults to collection itself.
	 * @returns Found item index or undefined.
	 */
	findIndex(callback: (item: T, index: number) => any, scope?: any): number;

	/**
	 * Determines index of the first item which is more (or less if order < 0) than the specified value by compare function,
	 * using binary search. Array must be sorted by compare function. Can be used for item insertion easily.
	 * If you want to use this method for item removal, you must look at the previous item and compare it to the value first.
	 * @param value Value to insert/remove.
	 * @param compare Comparer function. Should return positive value if t1 > t2;
	 * negative value if t1 < t2; 0 if t1 == t2.
	 * Defaults to [[cmp]].
	 * @param scope Comparer call scope. Defaults to collection itself.
	 * @param order Sorting order. Positive number for ascending sorting, negative for descending sorting.
	 * @returns Item index.
	 */
	binarySearch(value: T, compare?: (t1: T, t2: T) => number, scope?: any, order?: number): number;

	/**
	 * Converts collection to a native array. Builds a new array consisting of collection items.
	 */
	toArray(): T[];

	/**
	 * Converts collection to a bindable array. Builds a new array consisting of collection items.
	 */
	toBindableArray(): IBindableArray<T>;

	/**
	 * Converts collection to a set. Builds a new set consisting of collection items.
	 */
	toSet(): IBindableSet<T>;

	/**
	 * Represents collection as a native array.
	 * If this collection is an array, returns its items immediately.
	 * Else, executes toArray method.
	 * Use with caution.
	 */
	asArray(): T[];

	/**
	 * Represents collection as a bindable array.
	 * If this collection is an array, returns it immediately.
	 * Else, executes toArray method.
	 * Use with caution.
	 */
	asBindableArray(): IBindableArray<T>;

	/**
	 * Represents collection as set.
	 * If this collection is set, returns it immediately.
	 * Else, executes toSet method.
	 * Use with caution.
	 */
	asSet(): IBindableSet<T>;

	/**
	 * @inheritDoc
	 */
	toSorted(callback?: (item: T, index: number) => any, scope?: any, order?: number): IBindableArray<T>;

	/**
	 * @inheritDoc
	 */
	toSortedComparing(compare?: (t1: T, t2: T, k1: number, k2: number) => number, scope?: any, order?: number): IBindableArray<T>;

	/**
	 * Builds an array of item indices sorted by the result of %callback call for each item.
	 * @param callback Indexer function. Must return a comparable value, compatible with %cmp. Returns the item itself by default.
	 * @param scope Callback call scope. Defaults to the collection.
	 * @param order Sorting order. Positive number for ascending sorting (default), negative number for descending sorting.
	 * @returns Indices of items to build a sorted array.
	 */
	getSortingIndices(callback?: (item: T, index: number) => any, scope?: any, order?: number): IBindableArray<number>;

	/**
	 * Builds an array of item indices sorted by comparer.
	 * @param compare Comparer function. Should return positive value if t1 > t2; negative value if t1 < t2; 0 if t1 == t2. Defaults to cmp.
	 * @param scope Compare call scope. Defaults to the collection.
	 * @param order Sorting order. Positive number for ascending sorting (default), negative number for descending sorting.
	 * @returns Indices of items to build a sorted array.
	 */
	getSortingIndicesComparing(compare?: (t1: T, t2: T, k1: number, k2: number) => number, scope?: any, order?: number): IBindableArray<number>;

	/**
	 * Builds a new array containing items of this array in reversed order. Does not modify this array.
	 * @returns Reversed array.
	 */
	toReversed(): IBindableArray<T>;

	/**
	 * @inheritDoc
	 */
	index(callback: (item: T, index: number) => any, scope?: any): IBindableMap<T>;

	/**
	 * @inheritDoc
	 */
	filter(callback: (item: T, index: number) => any, scope?: any): IBindableArray<T>;

	/**
	 * @inheritDoc
	 */
	count(callback: (item: T, index: number) => any, scope?: any): number;

	/**
	 * @inheritDoc
	 */
	map<U>(callback: (item: T, index: number) => U, scope?: any, getKey?: (item: U) => any): IBindableArray<U>;

	/**
	 * @inheritDoc
	 */
	reduce<U>(reducer: Reducer<T, U>): U;

	/**
	 * @inheritDoc
	 */
	reduce<U>(callback: (accumulator: U, item: T, index: number) => U, initial: U): U;

	/**
	 * @inheritDoc
	 */
	max(callback?: (item: T, index: number) => any, scope?: any, order?: number): T;

	/**
	 * Returns index of the array item the callback returns the highest (or lowest if order < 0) value for.
	 * @param callback Returns a comparable value, compatible with cmp. Returns the item itself by default.
	 * @param scope Callback call scope. Defaults to the collection.
	 * @param order Pass negative order to find the lowest value.
	 * @returns Index of item with the highest (or lowest) value in the array.
	 */
	maxIndex(callback?: (item: T, index: number) => any, scope?: any, order?: number): number;

	/**
	 * @inheritDoc
	 */
	maxComparing(compare?: (t1: T, t2: T, i1: number, i2: number) => number, scope?: any, order?: number): T;

	/**
	 * Returns index of the highest (or lowest if order < 0) array item in terms of the specified comparer function.
	 * @param compare Returns a positive value if t1 > t2; negative value if t1 < t2; 0 if t1 == t2. Defaults to cmp.
	 * @param scope Callback call scope. Defaults to the collection.
	 * @param order Pass negative order to find the lowest value.
	 * @returns Index of the highest (or lowest) array item.
	 */
	maxIndexComparing(compare?: (t1: T, t2: T, i1: number, i2: number) => number, scope?: any, order?: number): number;

	/**
	 * @inheritDoc
	 */
	min(callback?: (item: T, index: number) => any, scope?: any, order?: number): T;

	/**
	 * Returns index of the array item the callback returns the lowest (or highest if order < 0) value for.
	 * @param callback Returns a comparable value, compatible with cmp. Returns the item itself by default.
	 * @param scope Callback call scope. Defaults to the collection.
	 * @param order Pass negative order to find the highest value.
	 * @returns Index of item with the lowest (or highest) value in the array.
	 */
	minIndex(callback?: (item: T, index: number) => any, scope?: any, order?: number): number;

	/**
	 * @inheritDoc
	 */
	minComparing(compare?: (t1: T, t2: T, i1: number, i2: number) => number, scope?: any, order?: number): T;

	/**
	 * Returns index of the lowest (or highest if order < 0) array item in terms of the specified comparer function.
	 * @param compare Returns a positive value if t1 > t2; negative value if t1 < t2; 0 if t1 == t2. Defaults to cmp.
	 * @param scope Callback call scope. Defaults to the collection.
	 * @param order Pass negative order to find the highest value.
	 * @returns Index of the lowest (or highest) array item.
	 */
	minIndexComparing(compare?: (t1: T, t2: T, i1: number, i2: number) => number, scope?: any, order?: number): number;

	/**
	 * Checks this array for equality (===) to a native array, item by item.
	 * @param arr Array.
	 * @returns This array is equal to the specified native array.
	 */
	equal(arr: T[]): boolean;

	/**
	 * Detects `splice` method arguments to adjust array contents to `newItems`.
	 * Determines item ranges to be removed and inserted.
	 * All items must have unique `getKey` function result.
	 * If items don't have unique key, probably `detectFilter` method may help,
	 * because it doesn't require item uniquiness.
	 * @param newItems New array contents.
	 * @param getKey Function which returns unique key of an item in this collection.
	 * Defaults to `getKey` property of the collection.
	 * @param scope `getKey` call scope. Defaults to collection itself.
	 * @returns `splice` method arguments. If no method call required, returns undefined.
	 */
	detectSplice(newItems: T[], getKey?: (item: T) => any, scope?: any): IBindableArray.SpliceParams<T>;

	/**
	 * Detects segments to remove to adjust list contents to `newItems` with a `splice` method call.
	 * Doesn't assume item insertion - try `detectSplice` if that's the case.
	 * In advantage to `detectSplice`, doesn't require item uniquiness.
	 * @param newItems New array contents.
	 * @returns Segments to remove.
	 * If no method call required, returns undefined.
	 */
	detectFilter(newItems: T[]): IBindableArray.IndexCount[];

	/**
	 * Detects `reorder` method arguments to adjust array contents to `newItems`.
	 * Determines where to move all items.
	 * If `newItems` contents differ from collection contents, it may have unexpected consequences.
	 * @param newItems New array contents.
	 * @param getKey Function which returns unique key of an item in this collection.
	 * Defaults to `getKey` property of the collection.
	 * @param scope `getKey` call scope. Defaults to collection itself.
	 * @returns `indexArray` argument of `reorder` method. If no method call required, returns undefined.
	 */
	detectReorder(newItems: T[], getKey?: (item: T) => any, scope?: any): number[];

	/**
	 * Detects `reorder` method arguments to sort array contents by result of
	 * `callback` call for each item.
	 * @param callback Indexer function. Must return a comparable value, compatible with
	 * `cmp`. Returns item itself by default.
	 * @param scope `callback` call scope. Defaults to collection itself.
	 * @param order Sorting order. Positive number for ascending sorting, negative for descending sorting.
	 * @returns `indexArray` argument of `reorder` method. If no method call required, returns undefined.
	 */
	detectSort(callback?: (item: T, index: number) => any, scope?: any, order?: number): number[];

	/**
	 * Detects `reorder` method arguments to sort array contents by comparer.
	 * @param compare Comparer function. Should return positive value if t1 > t2;
	 * negative value if t1 < t2; 0 if t1 == t2. Defaults to `cmp`.
	 * @param scope `comparer` call scope. Defaults to collection itself.
	 * @param order Sorting order. Positive number for ascending sorting, negative for descending sorting.
	 * @returns `indexArray` argument of `reorder` method. If no method call required, returns undefined.
	 */
	detectSortComparing(compare?: (t1: T, t2: T, i1: number, i2: number) => number, scope?: any, order?: number): number[];
}

export default ReadonlyBindableArray;
