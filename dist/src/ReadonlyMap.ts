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

import Dictionary from './Dictionary';
import IList from './IList';
import IMap from './IMap';
import Listenable from './Listenable';
import ReadonlyCollection from './ReadonlyCollection';
import Reducer from './Reducer';

/**
 * Unordered key-value collection. Each item has its own string key.
 * @param T Item type.
 */
interface ReadonlyMap<T> extends ReadonlyCollection<T> {
	/**
	 * Item dictionary - internal collection representation.
	 *
	 * Caution: doesn't make a copy - please don't modify.
	 */
	readonly items: Dictionary<T>;

	/**
	 * Returns key of first item. If collection is empty, returns undefined.
	 */
	readonly firstKey: string;

	/**
	 * Items are removed from the map and items are updated in the map.
	 */
	readonly spliceEvent: Listenable<IMap.SpliceEventParams<T>>;

	/**
	 * Keys of items are changed in the map.
	 */
	readonly reindexEvent: Listenable<IMap.ReindexEventParams<T>>;

	/**
	 * The map is cleared.
	 */
	readonly clearEvent: Listenable<IMap.ItemsEventParams<T>>;

	/**
	 * The map is changed. Triggered right after any another event.
	 */
	readonly changeEvent: Listenable<IMap.EventParams<T>>;

	/**
	 * Returns a shallow copy of this collection.
	 */
	clone(): IMap<T>;

	/**
	 * Returns an item by key. If item with such key doesn't exist, returns undefined.
	 * @param key Item key.
	 */
	get(key: string): T;

	/**
	 * Returns array of all map keys.
	 */
	getKeys(): IList<string>;

	/**
	 * Checks existence of an item with the specified key in the map.
	 * @param key Item key.
	 */
	containsKey(key: string): boolean;

	/**
	 * @inheritDoc
	 */
	every(callback: (item: T, key: string) => any, scope?: any): boolean;

	/**
	 * @inheritDoc
	 */
	some(callback: (item: T, key: string) => any, scope?: any): boolean;

	/**
	 * @inheritDoc
	 */
	forEach(callback: (item: T, key: string) => any, scope?: any): void;

	/**
	 * Returns key of the specified item in the map. If such item doesn't exist, returns undefined.
	 * @param item Map item.
	 */
	keyOf(item: T): string;

	/**
	 * @inheritDoc
	 */
	find(callback: (item: T, key: string) => any, scope?: any): T;

	/**
	 * Finds item matching criteria.
	 * Returns the key of some item the callback returns %truthy value for.
	 * Algorithm iterates items sequentially, and stops it after the first item matching the criteria.
	 * @param callback Criteria callback.
	 * @param scope `callback` call scope. Defaults to collection itself.
	 * @returns Found item key or undefined.
	 */
	findKey(callback: (item: T, key: string) => any, scope?: any): string;

	/**
	 * @inheritDoc
	 */
	toSorted(callback?: (item: T, key: string) => any, scope?: any, order?: number): IList<T>;

	/**
	 * @inheritDoc
	 */
	toSortedComparing(compare?: (t1: T, t2: T, k1: string, k2: string) => number, scope?: any, order?: number): IList<T>;

	/**
	 * Builds a list of item keys sorted by the result of %callback call for each item.
	 * @param callback Indexer function. Must return a comparable value, compatible with %cmp. Returns the item itself by default.
	 * @param scope Callback call scope. Defaults to the collection.
	 * @param order Sorting order. Positive number for ascending sorting (default), negative number for descending sorting.
	 * @returns Keys of items to build a sorted list.
	 */
	getSortingKeys(callback?: (item: T, key: string) => any, scope?: any, order?: number): IList<string>;

	/**
	 * Builds a list of item keys sorted by comparer.
	 * @param compare Comparer function. Should return positive value if t1 > t2; negative value if t1 < t2; 0 if t1 == t2. Defaults to cmp.
	 * @param scope Compare call scope. Defaults to the collection.
	 * @param order Sorting order. Positive number for ascending sorting (default), negative number for descending sorting.
	 * @returns Keys of items to build a sorted list.
	 */
	getSortingKeysComparing(compare?: (t1: T, t2: T, k1: string, k2: string) => number, scope?: any, order?: number): IList<string>;

	/**
	 * @inheritDoc
	 */
	index(callback: (item: T, key: string) => any, scope?: any): IMap<T>;

	/**
	 * @inheritDoc
	 */
	filter(callback: (item: T, key: string) => any, scope?: any): IMap<T>;

	/**
	 * @inheritDoc
	 */
	count(callback: (item: T, key: string) => any, scope?: any): number;

	/**
	 * @inheritDoc
	 */
	map<U>(callback: (item: T, key: string) => U, scope?: any, getKey?: (item: U) => any): IMap<U>;

	/**
	 * @inheritDoc
	 */
	reduce<U>(reducer: Reducer<T, U>): U;

	/**
	 * @inheritDoc
	 */
	reduce<U>(callback: (accumulator: U, item: T, key: string) => U, initial: U): U;

	/**
	 * @inheritDoc
	 */
	max(callback?: (item: T, key: string) => any, scope?: any, order?: number): T;

	/**
	 * Returns key of the map item the callback returns the highest (or lowest if order < 0) value for.
	 * @param callback Returns a comparable value, compatible with cmp. Returns the item itself by default.
	 * @param scope Callback call scope. Defaults to the collection.
	 * @param order Pass negative order to find the lowest value.
	 * @returns Key of item with the highest (or lowest) value in the map.
	 */
	maxKey(callback?: (item: T, key: string) => any, scope?: any, order?: number): string;

	/**
	 * @inheritDoc
	 */
	maxComparing(compare?: (t1: T, t2: T, k1: string, k2: string) => number, scope?: any, order?: number): T;

	/**
	 * Returns key of the highest (or lowest if order < 0) map item in terms of the specified comparer function.
	 * @param compare Returns a positive value if t1 > t2; negative value if t1 < t2; 0 if t1 == t2. Defaults to cmp.
	 * @param scope Callback call scope. Defaults to the collection.
	 * @param order Pass negative order to find the lowest value.
	 * @returns Key of the highest (or lowest) map item.
	 */
	maxKeyComparing(compare?: (t1: T, t2: T, k1: string, k2: string) => number, scope?: any, order?: number): string;

	/**
	 * @inheritDoc
	 */
	min(callback?: (item: T, key: string) => any, scope?: any, order?: number): T;

	/**
	 * Returns key of the map item the callback returns the lowest (or highest if order < 0) value for.
	 * @param callback Returns a comparable value, compatible with cmp. Returns the item itself by default.
	 * @param scope Callback call scope. Defaults to the collection.
	 * @param order Pass negative order to find the highest value.
	 * @returns Key of item with the lowest (or highest) value in the map.
	 */
	minKey(callback?: (item: T, key: string) => any, scope?: any, order?: number): string;

	/**
	 * @inheritDoc
	 */
	minComparing(compare?: (t1: T, t2: T, k1: string, k2: string) => number, scope?: any, order?: number): T;

	/**
	 * Returns key of the lowest (or highest if order < 0) map item in terms of the specified comparer function.
	 * @param compare Returns a positive value if t1 > t2; negative value if t1 < t2; 0 if t1 == t2. Defaults to cmp.
	 * @param scope Callback call scope. Defaults to the collection.
	 * @param order Pass negative order to find the highest value.
	 * @returns Key of the lowest (or highest) map item.
	 */
	minKeyComparing(compare?: (t1: T, t2: T, k1: string, k2: string) => number, scope?: any, order?: number): string;

	/**
	 * Checks this map for equality (===) to a dictionary, item by item.
	 * @param dict Dictionary.
	 * @returns This map is equal to the dictionary.
	 */
	equal(dict: Dictionary<T>): boolean;

	/**
	 * @returns Copy of map contents.
	 */
	toDictionary(): Dictionary<T>;

	/**
	 * Detects `splice` method arguments to adjust the map contents to `newItems`.
	 * Determines item bunches to be removed and inserted/replaced, along with their keys.
	 * @param newItems New map contents.
	 * @returns `splice` method arguments. If no method call required, returns undefined.
	 */
	detectSplice(newItems: Dictionary<T>): IMap.SpliceParams<T>;

	/**
	 * Detects `reindex` method arguments to adjust the map contents to `newItems`.
	 * Determines new keys to be assigned to all items.
	 * If `newItems` contents differ from the map contents, it may lead to unknown consequences.
	 * @param newItems New map contents.
	 * @param getKey Function which returns unique key of an item in this collection. Defaults to `getKey`.
	 * @param scope `getKey` call scope. Defaults to collection itself.
	 * @returns `keyMap` argument of `reindex` method. If no method call required, returns undefined.
	 */
	detectReindex(newItems: Dictionary<T>, getKey?: (item: T) => any, scope?: any): Dictionary<string>;
}

export default ReadonlyMap;
