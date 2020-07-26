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

import DestroyableReadonlyBindableMap from './DestroyableReadonlyBindableMap';
import Dictionary from './Dictionary';
import IBindableArray from './IBindableArray';
import IClass from "./IClass";
import Listenable from './Listenable';
import Reducer from './Reducer';
import Some from './Some';

/**
 * Extension of DestroyableReadonlyMap with modification methods.
 * @param T Map item type.
 */
interface IBindableMap<T> extends IClass, DestroyableReadonlyBindableMap<T> {

	/**
	 * The map is cleared.
	 */
	readonly onClear: Listenable<IBindableMap.MessageWithItems<T>>;

	/**
	 * The map is changed. Dispatched right after any another message.
	 */
	readonly onChange: Listenable<IBindableMap.Message<T>>;

	/**
	 * Returns a full copy of this collection.
	 */
	clone(): IBindableMap<T>;

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
	toSorted(callback?: (item: T, key: string) => any, scope?: any, order?: number): IBindableArray<T>;

	/**
	 * @inheritDoc
	 */
	toSortedComparing(compare?: (t1: T, t2: T, k1: string, k2: string) => number, scope?: any, order?: number): IBindableArray<T>;

	/**
	 * @inheritDoc
	 */
	getSortingKeys(callback?: (item: T, key: string) => any, scope?: any, order?: number): IBindableArray<string>;

	/**
	 * @inheritDoc
	 */
	getSortingKeysComparing(compare?: (t1: T, t2: T, k1: string, k2: string) => number, scope?: any, order?: number): IBindableArray<string>;

	/**
	 * @inheritDoc
	 */
	index(callback: (item: T, key: string) => any, scope?: any): IBindableMap<T>;

	/**
	 * @inheritDoc
	 */
	filter(callback: (item: T, key: string) => any, scope?: any): IBindableMap<T>;

	/**
	 * @inheritDoc
	 */
	count(callback: (item: T, key: string) => any, scope?: any): number;

	/**
	 * @inheritDoc
	 */
	map<U>(callback: (item: T, key: string) => U, scope?: any, getKey?: (item: U) => any): IBindableMap<U>;

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
	 * Makes this collection an owner of its items, which means that its items are alive as long as they are present in
	 * this collection. The item is destroyed when it leaves the
	 * collection, and all items are destroyed on the collection destruction.
	 */
	ownItems(): this;

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
	putAllVerbose(items: Dictionary<T>): IBindableMap.SpliceResult<T>;

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
	 * Removes the first occurrence of the item in the collection.
	 * @param item Item to remove.
	 */
	removeItem(item: T): void;

	/**
	 * Removes all occurrences of the items in the collection.
	 * For efficient performance, you should define an optimal getKey callback for this collection.
	 * @param items Items to remove.
	 */
	removeItems(items: T[]): void;

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
	splice(removedKeys: string[], updatedItems: Dictionary<T>): IBindableMap.SpliceResult<T>;

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
	tryPutAll(items: Dictionary<T>): IBindableMap.SpliceResult<T>;

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
	trySplice(removedKeys: string[], updatedItems: Dictionary<T>): IBindableMap.SpliceResult<T>;

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

export default IBindableMap;

namespace IBindableMap {
	/**
	 * Message of IMap.
	 * @param T Item type.
	 */
	export interface Message<T> {
		/**
		 * Message sender.
		 */
		readonly sender: IBindableMap<T>;
	}

	/**
	 * Map splice message.
	 * @param T Item type.
	 */
	export interface SpliceMessage<T> extends Message<T> {
		/**
		 * Result of `splice` method.
		 */
		readonly spliceResult: SpliceResult<T>;
	}

	/**
	 * Map item reindexing message.
	 * @param T Item type.
	 */
	export interface ReindexMessage<T> extends Message<T> {
		/**
		 * Map of changed keys.
		 */
		readonly keyMap: Dictionary<string>;
	}

	/**
	 * Map message with items.
	 * @param T Item type.
	 */
	export interface MessageWithItems<T> extends Message<T> {
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
