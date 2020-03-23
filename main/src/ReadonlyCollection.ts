/*
	jWidget 2
	Copyright (C) 2017  Egor Nepomnyaschih
	enepomnyaschih@gmail.com
	https://github.com/enepomnyaschih/jwidget

	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU Lesser General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU Lesser General Public License for more details.

	You should have received a copy of the GNU Lesser General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

import Bindable from './Bindable';
import ICollection from './ICollection';
import IList from './IList';
import IMap from './IMap';
import ISet from './ISet';
import Listenable from './Listenable';
import Reducer from './Reducer';

/**
 * Abstract readonly collection.
 */
interface ReadonlyCollection<T> {
	/**
	 * Checks if this collection never triggers events. This knowledge may help you do certain code optimizations.
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
	 * Collection is cleared.
	 */
	readonly clearEvent: Listenable<ICollection.EventParams<T>>;

	/**
	 * Collection is changed. Triggered right after any another event.
	 */
	readonly changeEvent: Listenable<ICollection.EventParams<T>>;

	/**
	 * Returns a shallow copy of this collection.
	 */
	clone(): ICollection<T>;

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
	toSorted(callback?: (item: T) => any, scope?: any, order?: number): IList<T>;

	/**
	 * Converts the collection to a sorted array. Builds an array consisting of the collection items sorted by comparer.
	 * @param compare Comparer function. Should return positive value if t1 > t2;
	 * negative value if t1 < t2; 0 if t1 == t2. Defaults to `cmp`.
	 * @param scope Callback call scope. Defaults to collection itself.
	 * @param order Sorting order. Positive number for ascending sorting (default), negative number for descending sorting.
	 * @returns Sorted array.
	 */
	toSortedComparing(compare?: (t1: T, t2: T) => number, scope?: any, order?: number): IList<T>;

	/**
	 * Indexes collection. Builds a new map by rule: key is the result of indexer function call, value is the corresponding item.
	 * @param callback Indexer function.
	 * @param scope Callback call scope. Defaults to collection itself.
	 * @returns Collection index.
	 */
	index(callback: (item: T) => any, scope?: any): IMap<T>;

	/**
	 * Converts collection to an array. Builds a new array consisting of collection items.
	 */
	toArray(): T[];

	/**
	 * Converts collection to a list. Builds a new list consisting of collection items.
	 */
	toList(): IList<T>;

	/**
	 * Converts collection to a set. Builds a new set consisting of collection items.
	 */
	toSet(): ISet<T>;

	/**
	 * Represents collection as array.
	 * If this collection is list, returns the array of items immediately.
	 * Else, executes toArray method.
	 * Use with caution.
	 */
	asArray(): T[];

	/**
	 * Represents collection as list.
	 * If this collection is list, returns it immediately.
	 * Else, executes toList method.
	 * Use with caution.
	 */
	asList(): IList<T>;

	/**
	 * Represents collection as set.
	 * If this collection is set, returns it immediately.
	 * Else, executes toSet method.
	 * Use with caution.
	 */
	asSet(): ISet<T>;

	/**
	 * Filters the collection by criteria. Builds a new collection of the same type, consisting of items the callback
	 * return truthy value for.
	 * @param callback Criteria callback.
	 * @param scope Callback call scope. Defaults to the collection.
	 * @returns Filtered collection.
	 */
	filter(callback: (item: T) => any, scope?: any): ICollection<T>;

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
	map<U>(callback: (item: T) => U, scope?: any, getKey?: (item: U) => any): ICollection<U>;

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
}

export default ReadonlyCollection;
