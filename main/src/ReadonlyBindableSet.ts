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
import IBindableArray from "./IBindableArray";
import IBindableMap from "./IBindableMap";
import IBindableSet from './IBindableSet';
import Listenable from './Listenable';
import Reducer from "./Reducer";

/**
 * Unordered collection optimized for items adding, removal and search.
 * @param T Item type.
 */
interface ReadonlyBindableSet<T> {
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
	 * Array of all set items. This getter makes a copy of the collection (in fact, internal representation of Set is
	 * not an array).
	 */
	readonly items: T[];

	/**
	 * Items are removed from the set and/or items are added to the set.
	 */
	readonly onSplice: Listenable<IBindableSet.SpliceMessage<T>>;

	/**
	 * The set is cleared.
	 */
	readonly onClear: Listenable<IBindableSet.MessageWithItems<T>>;

	/**
	 * The set is changed. Dispatched right after any another message.
	 */
	readonly onChange: Listenable<IBindableSet.Message<T>>;

	/**
	 * @inheritDoc
	 */
	clone(): IBindableSet<T>;

	/**
	 * Checks item for existence in collection.
	 */
	contains(item: T): boolean;

	/**
	 * Matches all items against criteria. Returns true if callback returns truthy value for all collection
	 * items. Algorithms iterates through the items sequentially, and stops it after the first item not matching
	 * the criteria.
	 * @param callback Criteria callback.
	 * @param scope Callback call scope. Defaults to the collection.
	 * @returns All items match the criteria.
	 */
	every(callback: (item: T) => any, scope?: any): boolean;

	/**
	 * Matches each item against criteria. Returns true if callback returns truthy value for at least one item
	 * in the collection. Algorithms iterates through the items sequentially, and stops it after the first item matching
	 * the criteria.
	 * @param callback Criteria callback.
	 * @param scope Callback call scope. Defaults to the collection.
	 * @returns Some item matches the criteria.
	 */
	some(callback: (item: T) => any, scope?: any): boolean;

	/**
	 * Iterates through the collection items. Calls the specified function for all items.
	 * @param callback Callback function.
	 * @param scope Callback call scope. Defaults to the collection.
	 */
	forEach(callback: (item: T) => any, scope?: any): void;

	/**
	 * Finds an item matching the criteria. Returns the first item the callback returns truthy value for.
	 * Algorithms iterates through the items sequentially, and stops it after the first item matching the criteria.
	 * @param callback Criteria callback.
	 * @param scope Callback call scope. Defaults to the collection.
	 * @returns First item matching the criteria.
	 */
	find(callback: (item: T) => any, scope?: any): T;

	/**
	 * Converts the collection to a sorted array. Builds an array consisting of the collection items sorted by
	 * the result of the callback call for each item.
	 * @param callback Indexer function. Must return a comparable value, compatible with cmp. Returns the item itself by default.
	 * @param scope Callback call scope. Defaults to the collection.
	 * @param order Sorting order. Positive number for ascending sorting (default), negative number for descending sorting.
	 * @returns Sorted array.
	 */
	toSorted(callback?: (item: T) => any, scope?: any, order?: number): IBindableArray<T>;

	/**
	 * Converts the collection to a sorted array. Builds an array consisting of the collection items sorted by comparer.
	 * @param compare Comparer function. Should return positive value if t1 > t2;
	 * negative value if t1 < t2; 0 if t1 == t2. Defaults to `cmp`.
	 * @param scope Callback call scope. Defaults to collection itself.
	 * @param order Sorting order. Positive number for ascending sorting (default), negative number for descending sorting.
	 * @returns Sorted array.
	 */
	toSortedComparing(compare?: (t1: T, t2: T) => number, scope?: any, order?: number): IBindableArray<T>;

	/**
	 * Indexes collection. Builds a new map by rule: key is the result of indexer function call, value is the corresponding item.
	 * @param callback Indexer function.
	 * @param scope Callback call scope. Defaults to collection itself.
	 * @returns Collection index.
	 */
	index(callback: (item: T) => any, scope?: any): IBindableMap<T>;

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
	 * Filters the collection by criteria. Builds a new collection of the same type, consisting of items the callback
	 * return truthy value for.
	 * @param callback Criteria callback.
	 * @param scope Callback call scope. Defaults to the collection.
	 * @returns Filtered collection.
	 */
	filter(callback: (item: T) => any, scope?: any): IBindableSet<T>;

	/**
	 * Counts the items matching criteria. Returns the number of items the callback returns truthy value for.
	 * @param callback Criteria callback.
	 * @param scope Callback call scope. Defaults to the collection.
	 * @returns Number of matching items.
	 */
	count(callback: (item: T) => any, scope?: any): number;

	/**
	 * Maps collection items.
	 * Builds a new collection of the same type, containing results of the callback call for each collection item.
	 * @param callback Mapping function.
	 * @param scope Callback call scope. Defaults to the collection.
	 * @param getKey Function which returns unique key of an item in the resulting collection.
	 * @returns Mapped collection.
	 */
	map<U>(callback: (item: T) => U, scope?: any, getKey?: (item: U) => any): IBindableSet<U>;

	/**
	 * Applies a function against an accumulator and each item in the collection to reduce it to a single value.
	 * @param reducer Standard reducer.
	 * @returns Final accumulator value.
	 */
	reduce<U>(reducer: Reducer<T, U>): U;

	/**
	 * Applies a function against an accumulator and each item in the collection to reduce it to a single value.
	 * @param callback Function to execute on each item in the collection.
	 * @param initial Value to use as the first argument to the first call of the callback.
	 * @returns Final accumulator value.
	 */
	reduce<U>(callback: (accumulator: U, item: T) => U, initial: U): U;

	/**
	 * Returns the collection item the callback returns the highest (or lowest if order < 0) value for.
	 * @param callback Returns a comparable value, compatible with cmp. Returns the item itself by default.
	 * @param scope Callback call scope. Defaults to the collection
	 * @param order Pass negative order to find the lowest value.
	 * @returns Maximum collection item.
	 */
	max(callback?: (item: T) => any, scope?: any, order?: number): T;

	/**
	 * Returns the highest (or lowest if order < 0) collection item in terms of the specified comparer function.
	 * @param compare Returns a positive value if t1 > t2; negative value if t1 < t2; 0 if t1 == t2. Defaults to cmp.
	 * @param scope Callback call scope. Defaults to the collection.
	 * @param order Pass negative order to find the lowest value.
	 * @returns Maximum collection item.
	 */
	maxComparing(compare?: (t1: T, t2: T) => number, scope?: any, order?: number): T;

	/**
	 * Returns the collection item the callback returns the lowest (or highest if order < 0) value for.
	 * @param callback Returns a comparable value, compatible with cmp. Returns the item itself by default.
	 * @param scope Callback call scope. Defaults to the collection
	 * @param order Pass negative order to find the highest value.
	 * @returns Minimum collection item.
	 */
	min(callback?: (item: T) => any, scope?: any, order?: number): T;

	/**
	 * Returns the lowest (or highest if order < 0) collection item in terms of the specified comparer function.
	 * @param compare Returns a positive value if t1 > t2; negative value if t1 < t2; 0 if t1 == t2. Defaults to cmp.
	 * @param scope Callback call scope. Defaults to the collection.
	 * @param order Pass negative order to find the highest value.
	 * @returns Minimum collection item.
	 */
	minComparing(compare?: (t1: T, t2: T) => number, scope?: any, order?: number): T;

	/**
	 * Detects `splice` method arguments to adjust the set contents to `newItems`.
	 * Determines item bunches to be removed and added.
	 * @param newItems New set contents.
	 * @returns `splice` method arguments. If no method call required, returns undefined.
	 */
	detectSplice(newItems: T[]): IBindableSet.SpliceParams<T>;

	/**
	 * Checks this set for equality (===) to an array, item by item.
	 * @param array Array.
	 * @returns This set is equal to the array.
	 */
	equal(array: T[]): boolean;
}

export default ReadonlyBindableSet;
