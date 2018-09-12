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

import DestroyableReadonlyMap from './DestroyableReadonlyMap';
import Dictionary from './Dictionary';
import ICollection from './ICollection';
import IList from './IList';
import Listenable from './Listenable';
import Reducer from './Reducer';
import Some from './Some';

/**
 * Extension of DestroyableReadonlyMap with modification methods.
 * @param T Map item type.
 */
interface IMap<T> extends ICollection<T>, DestroyableReadonlyMap<T> {

	/**
	 * The map is cleared.
	 */
	readonly clearEvent: Listenable<IMap.ItemsEventParams<T>>;

	/**
	 * The map is changed. Triggered right after any another event.
	 */
	readonly changeEvent: Listenable<IMap.EventParams<T>>;

	/**
	 * Returns a full copy of this collection.
	 */
	clone(): IMap<T>;

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
	 * @inheritDoc
	 */
	findKey(callback: (item: T, key: string) => any, scope?: any): string;

	/**
	 * @inheritDoc
	 */
	find(callback: (item: T, key: string) => any, scope?: any): T;

	/**
	 * @inheritDoc
	 */
	toSorted(callback?: (item: T, key: string) => any, scope?: any, order?: number): IList<T>;

	/**
	 * @inheritDoc
	 */
	toSortedComparing(compare?: (t1: T, t2: T, k1: string, k2: string) => number, scope?: any, order?: number): IList<T>;

	/**
	 * @inheritDoc
	 */
	getSortingKeys(callback?: (item: T, key: string) => any, scope?: any, order?: number): IList<string>;

	/**
	 * @inheritDoc
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
	 * @inheritDoc
	 */
	maxKey(callback?: (item: T, key: string) => any, scope?: any, order?: number): string;

	/**
	 * @inheritDoc
	 */
	maxComparing(compare?: (t1: T, t2: T, k1: string, k2: string) => number, scope?: any, order?: number): T;

	/**
	 * @inheritDoc
	 */
	maxKeyComparing(compare?: (t1: T, t2: T, k1: string, k2: string) => number, scope?: any, order?: number): string;

	/**
	 * @inheritDoc
	 */
	min(callback?: (item: T, key: string) => any, scope?: any, order?: number): T;

	/**
	 * @inheritDoc
	 */
	minKey(callback?: (item: T, key: string) => any, scope?: any, order?: number): string;

	/**
	 * @inheritDoc
	 */
	minComparing(compare?: (t1: T, t2: T, k1: string, k2: string) => number, scope?: any, order?: number): T;

	/**
	 * @inheritDoc
	 */
	minKeyComparing(compare?: (t1: T, t2: T, k1: string, k2: string) => number, scope?: any, order?: number): string;

	/**
	 * Puts or replaces an item with the specified key.
	 * @param key Item key.
	 * @param item Item to put.
	 * @returns The replaced item.
	 */
	put(key: string, item: T): T;

	/**
	 * Puts or replaces a bunch of items.
	 * @param items Items to put.
	 */
	putAll(items: Dictionary<T>): void;

	/**
	 * Low-performance alternative to putAll with verbose result set.
	 * @param items Items to put.
	 * @returns Result of internal splice method call.
	 */
	putAllVerbose(items: Dictionary<T>): IMap.SpliceResult<T>;

	/**
	 * Changes item key in the map. If collection doesn't contain oldKey or contains newKey, it may lead to unexpected
	 * consequences.
	 * @param oldKey Old key of the item.
	 * @param newKey New key of the item.
	 * @returns The moved item.
	 */
	setKey(oldKey: string, newKey: string): T;

	/**
	 * Removes item with specified key.
	 * @param key Item key.
	 * @returns The removed item.
	 */
	remove(key: string): T;

	/**
	 * Removes a bunch of items from the map.
	 * @param keys Item keys.
	 */
	removeAll(keys: string[]): void;

	/**
	 * Low-performance alternative to removeAll with verbose result set.
	 * @param keys Item keys.
	 * @returns The removed items.
	 */
	removeAllVerbose(keys: string[]): Dictionary<T>;

	/**
	 * @inheritDoc
	 */
	clear(): Dictionary<T>;

	/**
	 * Removes and adds bunches of items in the map. Universal optimized granular operation of removal/insertion.
	 * @param removedKeys Keys of items to remove.
	 * @param updatedItems Items to put/replace.
	 * @returns Splice result. Never returns null or undefined.
	 */
	splice(removedKeys: string[], updatedItems: Dictionary<T>): IMap.SpliceResult<T>;

	/**
	 * Changes item keys in the map.
	 * @param keyMap Key dictionary. Item with key x will gain key keyMap[x].
	 * It is necessary to pass only changed keys, but unchanged keys or nonexistent keys are acceptable as well.
	 * @returns Dictionary of changed keys. Never returns null or undefined.
	 */
	reindex(keyMap: Dictionary<string>): Dictionary<string>;

	/**
	 * Puts or replaces an item with the specified key.
	 * @param key Item key.
	 * @param item Item to put.
	 * @returns The replaced item. If collection is not modified, returns undefined.
	 */
	tryPut(key: string, item: T): Some<T>;

	/**
	 * Puts or replaces a bunch of items.
	 * @param items Items to put.
	 * @returns Result of internal splice method call. If collection is not modified, returns undefined.
	 */
	tryPutAll(items: Dictionary<T>): IMap.SpliceResult<T>;

	/**
	 * Changes item key in map. If collection doesn't contain oldKey or contains newKey, it may lead to unexpected
	 * consequences.
	 * @param oldKey Old key of the item.
	 * @param newKey New key of the item.
	 * @returns The moved item. If collection is not modified, returns undefined.
	 */
	trySetKey(oldKey: string, newKey: string): T;

	/**
	 * Removes item with specified key.
	 * @param key Item key.
	 * @returns The removed item. If collection is not modified, returns undefined.
	 */
	tryRemove(key: string): T;

	/**
	 * Removes a bunch of items from the map.
	 * @param keys Item keys.
	 * @returns The removed items. If collection is not modified, returns undefined.
	 */
	tryRemoveAll(keys: string[]): Dictionary<T>;

	/**
	 * Removes and adds bunches of items in the map. Universal optimized granular operation of removal/insertion.
	 * @param removedKeys Keys of items to remove.
	 * @param updatedItems Items to put/replace.
	 * @returns Splice result. If collection is not modified, returns undefined.
	 */
	trySplice(removedKeys: string[], updatedItems: Dictionary<T>): IMap.SpliceResult<T>;

	/**
	 * Changes item keys in the map.
	 * @param keyMap Key dictionary. Item with key x will gain key keyMap[x].
	 * It is necessary to pass only changed keys, but unchanged keys or nonexistent keys are acceptable as well.
	 * @returns Dictionary of changed keys. If collection is not modified, returns undefined.
	 */
	tryReindex(keyMap: Dictionary<string>): Dictionary<string>;

	/**
	 * Adjusts map contents to `newItems` using `detectSplice` and `splice` methods.
	 * @param newItems New map contents.
	 */
	performSplice(newItems: Dictionary<T>): void;

	/**
	 * Adjusts map contents to `newItems` using `detectReindex` and `reindex` methods.
	 * All items must have unique `getKey` function result.
	 * @param newItems New map contents.
	 * @param getKey Function which returns unique key of an item in this collection.
	 * Defaults to `getKey` property of the collection.
	 * @param scope `getKey` call scope. Defaults to collection itself.
	 */
	performReindex(newItems: Dictionary<T>, getKey?: (item: T) => any, scope?: any): void;
}

export default IMap;

namespace IMap {
	/**
	 * `IMap` event parameters.
	 * @param T Item type.
	 */
	export interface EventParams<T> extends ICollection.EventParams<T> {
		/**
		 * Event sender.
		 */
		readonly sender: IMap<T>;
	}

	/**
	 * Parameters of `spliceEvent`.
	 * @param T Item type.
	 */
	export interface SpliceEventParams<T> extends EventParams<T> {
		/**
		 * Result of `splice` method.
		 */
		readonly spliceResult: SpliceResult<T>;
	}

	/**
	 * Parameters of `reindexEvent`.
	 * @param T Item type.
	 */
	export interface ReindexEventParams<T> extends EventParams<T> {
		/**
		 * Map of changed keys.
		 */
		readonly keyMap: Dictionary<string>;
	}

	/**
	 * Parameters of `clearEvent`.
	 * @param T Item type.
	 */
	export interface ItemsEventParams<T> extends EventParams<T> {
		/**
		 * Old map contents.
		 */
		readonly items: Dictionary<T>;
	}

	/**
	 * IMap.splice method arguments. Result of `detectSplice` method.
	 * @param T Item type.
	 */
	export interface SpliceParams<T> {
		/**
		 * Keys of items to remove.
		 */
		readonly removedKeys: string[];

		/**
		 * Items to put/replace.
		 */
		readonly updatedItems: Dictionary<T>;
	}

	/**
	 * IMap.splice method result.
	 * @param T Item type.
	 */
	export interface SpliceResult<T> {
		/**
		 * Removed items.
		 */
		readonly removedItems: Dictionary<T>;

		/**
		 * Added items.
		 */
		readonly addedItems: Dictionary<T>;
	}
}
