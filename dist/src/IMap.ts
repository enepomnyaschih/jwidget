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
 * Map is unordered collection. Each item has its own string key.
 *
 * # Map methods
 *
 * **Difference compared to [[IIndexedCollection]] is in bold.**
 *
 * Content retrieving:
 *
 * * [[length]] - Collection length property.
 * * [[isEmpty]] - Checks collection for emptiness.
 * * [[get]] - Returns collection item by key.
 * * [[getFirst]] - Returns first item in collection.
 * * [[getFirstKey]] - Returns key of first item in collection.
 * * [[getKeys]], #$getKeys - Returns array of all item keys.
 * * [[containsItem]] - Does collection contain the item?
 * * [[containsKey]] - Does collection contain the key?
 * * [[keyOf]] - Returns item key. If item is not found, returns undefined.
 * * **[[getJson]] - Returns internal representation of the map.**
 *
 * Iteration algorithms:
 *
 * * [[every]] - Checks all items by criteria.
 * Returns true if all items match the criteria.
 * * [[some]] - Checks each item by criteria.
 * Returns true if some items matches the criteria.
 * * [[each]], [[forEach]] - Iterates items.
 * * [[search]] - Finds item by criteria.
 * Returns first item matching the criteria.
 * * [[find]] - Finds item by criteria.
 * Returns index of first item matching the criteria.
 * * [[filter]], [[filter]] - Filters collection by criteria.
 * Builds new collection of the same type, consisting of items matching the criteria.
 * * [[count]], [[$count]] - Counts the items matching criteria.
 * * [[map]], [[map]] - Maps collection items.
 * Builds new collection of the same type, consisting of results of mapping function call for each collection item.
 * * [[toSorted]], [[$toSorted]], [[toSortedComparing]], [[$toSortedComparing]] -
 * Builds array consisting of collection items sorted by indexer or comparer.
 * * [[getSortingKeys]], [[$getSortingKeys]],
 * [[getSortingKeysComparing]], [[$getSortingKeysComparing]] -
 * Returns indexes of collection items sorted by indexer or comparer.
 * * [[index]], [[$index]] - Indexes collection.
 * Builds new map by rule: key is the result of indexer function call, value is the corresponding item.
 * * [[toArray]], [[$toArray]] - Builds new array consisting of collection items.
 * * [[toDictionary]], [[toMap]] - Builds new map consisting of collection items.
 * * [[toSet]], [[toSet]] - Builds new set consisting of collection items.
 * * [[asArray]], [[$asArray]] - Represents collection as array.
 * * [[asDictionary]], [[asMap]] - Represents collection as map.
 * * [[asSet]], [[asSet]] - Represents collection as set.
 *
 * Collection modification:
 *
 * * [[set]], [[trySet]] - Adds or replaces an item by key.
 * * **[[setAll]], [[setAllVerbose]],
 * [[trySetAll]] - Adds or replaces a bunch of items.**
 * * [[remove]], [[tryRemove]] - Removes an item by key.
 * * **[[removeAll]], [[removeAllVerbose]],
 * [[$removeAllVerbose]], [[tryRemoveAll]] - Removes a bunch of items.**
 * * [[removeItem]] - Removes first occurency of an item in collection.
 * * [[removeItems]] - Removes all occurencies of items in collection.
 * * **[[setKey]], [[trySetKey]] - Changes item key.**
 * * [[clear]], [[$clear]], [[tryClear]] - Clears collection.
 * * **[[splice]], [[trySplice]] - Removes and adds bunches of items.**
 * * **[[reindex]], [[tryReindex]] - Changes item keys.**
 * * **[[performSplice]] - Adjusts contents using [[splice]] method.**
 * * **[[performReindex]] - Adjusts contents using [[reindex]] method.**
 *
 * Similar collection creation (for algorithms and synchronizers implementation):
 *
 * * [[createEmpty]] - Creates empty collection of the same type.
 * * [[createEmptyArray]] - Creates empty array of the same observability level.
 * * [[createEmptyMap]] - Creates empty map of the same observability level.
 * * [[createEmptySet]] - Creates empty set of the same observability level.
 *
 * Other methods:
 *
 * * **[[detectSplice]] - Detects [[splice]] method arguments to adjust contents.**
 * * **[[detectReindex]] - Detects [[reindex]] method arguments to adjust contents.**
 * * **[[equal]] - Checks for equality to another map.**
 *
 * All the same algorithms are also available for native JavaScript Object as map,
 * see [[DictionaryUtils]] functions.
 */
interface IMap<T> extends ICollection<T>, DestroyableReadonlyMap<T> {
	/**
	 * Returns item map - internal collection representation.
	 *
	 * **Caution: doesn't make a copy - please don't modify.**
	 */
	readonly items: Dictionary<T>;

	/**
	 * Returns key of first collection item. If collection is empty, returns undefined.
	 */
	readonly firstKey: string;

	/**
	 * Items are removed from map, items are added to map and items are updated in map.
	 * Triggered in result of calling:
	 *
	 * * [[set]]
	 * * [[trySet]]
	 * * [[setAll]]
	 * * [[trySetAll]]
	 * * [[remove]]
	 * * [[tryRemove]]
	 * * [[removeItem]]
	 * * [[removeAll]]
	 * * [[tryRemoveAll]]
	 * * [[removeItems]]
	 * * [[splice]]
	 * * [[trySplice]]
	 * * [[performSplice]]
	 */
	readonly spliceEvent: Listenable<IMap.SpliceEventParams<T>>;

	/**
	 * Keys of items are changed in map. Triggered in result of calling:
	 *
	 * * [[setKey]]
	 * * [[trySetKey]]
	 * * [[reindex]]
	 * * [[tryReindex]]
	 * * [[performReindex]]
	 */
	readonly reindexEvent: Listenable<IMap.ReindexEventParams<T>>;

	/**
	 * Map is cleared. Triggered in result of calling:
	 *
	 * * [[clear]]
	 * * [[$clear]]
	 * * [[tryClear]]
	 */
	readonly clearEvent: Listenable<IMap.ItemsEventParams<T>>;

	/**
	 * Map is changed. Triggered right after any another event.
	 */
	readonly changeEvent: Listenable<IMap.EventParams<T>>;

	/**
	 * Returns item by key. If item with such key doesn't exist, returns undefined.
	 */
	get(key: string): T;

	/**
	 * Returns array of all map keys.
	 */
	getKeys(): IList<string>;

	/**
	 * Checks existance of item with specified key in collection.
	 */
	containsKey(key: string): boolean;

	/**
	 * Returns key of item in collection. If such item doesn't exist, returns undefined.
	 */
	keyOf(item: T): string;

	/**
	 * @inheritdoc
	 */
	every(callback: (item: T, key: string) => any, scope?: any): boolean;

	/**
	 * @inheritdoc
	 */
	some(callback: (item: T, key: string) => any, scope?: any): boolean;

	/**
	 * @inheritdoc
	 */
	forEach(callback: (item: T, key: string) => any, scope?: any): void;

	/**
	 * Finds item matching criteria.
	 *
	 * Returns key of first item for which callback returns !== false.
	 *
	 * Algorithms iterates items sequentially, and stops after first item matching the criteria.
	 *
	 * @param callback Criteria callback.
	 * @param scope **callback** call scope. Defaults to collection itself.
	 * @returns Found item key or undefined.
	 */
	findKey(callback: (item: T, key: string) => any, scope?: any): string;

	/**
	 * @inheritdoc
	 */
	find(callback: (item: T, key: string) => any, scope: any): T;

	/**
	 * @inheritdoc
	 */
	toSorted(callback?: (item: T, key: string) => any, scope?: any, order?: number): IList<T>;

	/**
	 * @inheritdoc
	 */
	toSortedComparing(compare?: (t1: T, t2: T, k1: string, k2: string) => number, scope?: any, order?: number): IList<T>;

	/**
	 * @inheritdoc
	 */
	getSortingKeys(callback?: (item: T, key: string) => any, scope?: any, order?: number): IList<string>;

	/**
	 * @inheritdoc
	 */
	getSortingKeysComparing(compare?: (t1: T, t2: T, k1: string, k2: string) => number, scope?: any, order?: number): IList<string>;

	/**
	 * @inheritdoc
	 */
	index(callback: (item: T, key: string) => any, scope?: any): IMap<T>;

	/**
	 * @inheritdoc
	 */
	filter(callback: (item: T, key: string) => any, scope?: any): IMap<T>;

	/**
	 * @inheritdoc
	 */
	count(callback: (item: T, key: string) => any, scope?: any): number;

	/**
	 * @inheritdoc
	 */
	map<U>(callback: (item: T, key: string) => U, scope?: any, getKey?: (item: U) => any): IMap<U>;

	/**
	 * @inheritdoc
	 */
	toDictionary(): Dictionary<T>;

	/**
	 * @inheritdoc
	 */
	asDictionary(): Dictionary<T>;

	/**
	 * Detects [[splice]] method arguments to adjust map contents to **newItems**.
	 * Determines which item bunches should be removed and which ones should be inserted/replaced, and their keys.
	 * @param newItems New map contents.
	 * @returns [[splice]] method arguments. If no method call required, returns undefined.
	 */
	detectSplice(newItems: Dictionary<T>): IMap.SpliceParams<T>;

	/**
	 * Detects [[reindex]] method arguments to adjust map contents to **newItems**.
	 * Determines which keys should be assigned to all items.
	 * If **newItems** contents differ from current map contents, the map will be broken.
	 * @param newItems New map contents.
	 * @param getKey Function which returns unique key of an item in this collection.
	 * Defaults to [[getKey]].
	 * If collection consists of instances of [[IClass]], then you are in a good shape.
	 * @param scope **getKey** call scope. Defaults to collection itself.
	 * @returns **keyMap** argument of [[reindex]] method.
	 * If no method call required, returns undefined.
	 */
	detectReindex(newItems: Dictionary<T>, getKey?: (item: T) => any, scope?: any): Dictionary<string>;

	/**
	 * Checks for equality (===) to another map, item by item.
	 */
	equal(map: Dictionary<T>): boolean;

	reduce<U>(reducer: Reducer<T, U>): U;
	reduce<U>(callback: (accumulator: U, item: T, key: string) => U, initial: U): U;

	max(callback?: (item: T, key: string) => any, scope?: any, order?: number): T;

	maxKey(callback?: (item: T, key: string) => any, scope?: any, order?: number): string;

	maxComparing(compare?: (t1: T, t2: T, k1: string, k2: string) => number, scope?: any, order?: number): T;

	maxKeyComparing(compare?: (t1: T, t2: T, k1: string, k2: string) => number, scope?: any, order?: number): string;

	min(callback?: (item: T, key: string) => any, scope?: any, order?: number): T;

	minKey(callback?: (item: T, key: string) => any, scope?: any, order?: number): string;

	minComparing(compare?: (t1: T, t2: T, k1: string, k2: string) => number, scope?: any, order?: number): T;

	minKeyComparing(compare?: (t1: T, t2: T, k1: string, k2: string) => number, scope?: any, order?: number): string;

	/**
	 * Replaces item with specified key. If map doesn't contain such key, new item is added.
	 * @returns The replaced item. If collection is not modified, returns undefined.
	 */
	tryPut(key: string, item: T): Some<T>;

	/**
	 * Replaces item with specified key. If collection doesn't contain such key:
	 *
	 * * Array will be broken.
	 * * Map will add a new item.
	 *
	 * @returns The replaced item.
	 */
	put(key: string, item: T): T;

	/**
	 * Adds or replaces a bunch of items.
	 */
	putAll(items: Dictionary<T>): void;

	/**
	 * Low-performance alternative to [[setAll]] with verbose result set.
	 * @returns Result of internal [[splice]] method call.
	 */
	putAllVerbose(items: Dictionary<T>): IMap.SpliceResult<T>;

	/**
	 * Adds or replaces a bunch of items.
	 * @returns Result of internal [[splice]] method call.
	 * If collection is not modified, returns undefined.
	 */
	tryPutAll(items: Dictionary<T>): IMap.SpliceResult<T>;

	/**
	 * Changes item key in map. If collection doesn't contain oldKey or contains newKey, it causes an error.
	 * @returns The moved item.
	 */
	setKey(oldKey: string, newKey: string): T;

	/**
	 * Changes item key in map. If collection doesn't contain oldKey or contains newKey, it causes an error.
	 * @returns The moved item.
	 * If collection is not modified, returns undefined.
	 */
	trySetKey(oldKey: string, newKey: string): T;

	/**
	 * Removes item with specified key if it exists in map.
	 * @returns Old collection item.
	 * If collection is not modified, returns undefined.
	 */
	tryRemove(key: string): T;

	/**
	 * Removes item with specified key. If collection doesn't contain such key:
	 *
	 * * Array will be broken.
	 * * Map will add a new item.
	 *
	 * @returns The removed item.
	 */
	remove(index: string): T;

	/**
	 * Removes a bunch of items from map.
	 */
	removeAll(keys: string[]): void;

	/**
	 * Low-performance alternative to [[removeAll]] with verbose result set.
	 * @returns The removed items.
	 */
	removeAllVerbose(keys: string[]): Dictionary<T>;

	/**
	 * Removes a bunch of items from map.
	 * @returns The removed items.
	 * If collection is not modified, returns undefined.
	 */
	tryRemoveAll(keys: string[]): Dictionary<T>;

	/**
	 * @inheritdoc
	 */
	removeItems(items: T[]): void;

	/**
	 * @inheritdoc
	 */
	clear(): Dictionary<T>;

	/**
	 * Removes and adds bunches of items in map. Universal optimized granular operation of removal/insertion.
	 * @param removedKeys Keys of items to remove.
	 * @param updatedItems Items to add/replace.
	 * @returns Splice result. Never returns null or undefined.
	 */
	splice(removedKeys: string[], updatedItems: Dictionary<T>): IMap.SpliceResult<T>;

	/**
	 * Removes and adds bunches of items in map. Universal optimized granular operation of removal/insertion.
	 * @param removedKeys Keys of items to remove.
	 * @param updatedItems Items to add/replace.
	 * @returns Splice result.
	 * If collection is not modified, returns undefined.
	 */
	trySplice(removedKeys: string[], updatedItems: Dictionary<T>): IMap.SpliceResult<T>;

	/**
	 * Changes item keys in map.
	 * @param keyMap Key map. Item with key x will gain key keyMap[x].
	 * It is neccessary to pass only changed keys, but unchanged keys or unexisting keys are acceptable as well.
	 * @returns Map of changed keys. Never returns null or undefined.
	 */
	reindex(keyMap: Dictionary<string>): Dictionary<string>;

	/**
	 * Changes item keys in map.
	 * @param keyMap Key map. Item with key x will gain key keyMap[x].
	 * It is neccessary to pass only changed keys, but unchanged keys or unexisting keys are acceptable as well.
	 * @returns Map of changed keys.
	 * If collection is not modified, returns undefined.
	 */
	tryReindex(keyMap: Dictionary<string>): Dictionary<string>;

	/**
	 * Adjusts map contents to **newItems** using [[detectSplice]] and
	 * [[splice]] methods.
	 * @param newItems New map contents.
	 */
	performSplice(newItems: Dictionary<T>): void;

	/**
	 * Adjusts map contents to **newItems** using [[detectReindex]] and
	 * [[reindex]] methods.
	 * @param newItems New map contents.
	 * @param getKey Function which returns unique key of an item in this collection.
	 * Defaults to [[getKey]].
	 * If collection consists of instances of [[IClass]], then you are in a good shape.
	 * @param scope **getKey** call scope. Defaults to collection itself.
	 */
	performReindex(newItems: Dictionary<T>, getKey?: (item: T) => any, scope?: any): void;
}

export default IMap;

namespace IMap {
	/**
	 * `IMap` event parameters.
	 */
	export interface EventParams<T> extends ICollection.EventParams<T> {
		/**
		 * Event sender.
		 */
		readonly sender: IMap<T>;
	}

	/**
	 * Parameters of `spliceEvent`.
	 */
	export interface SpliceEventParams<T> extends EventParams<T> {
		/**
		 * Result of `splice` method.
		 */
		readonly spliceResult: SpliceResult<T>;
	}

	/**
	 * Parameters of `reindexEvent`.
	 */
	export interface ReindexEventParams<T> extends EventParams<T> {
		/**
		 * Map of changed keys.
		 */
		readonly keyMap: Dictionary<string>;
	}

	/**
	 * Parameters of `clearEvent`.
	 */
	export interface ItemsEventParams<T> extends EventParams<T> {
		/**
		 * Old map contents.
		 */
		readonly items: Dictionary<T>;
	}

	/**
	 * [[JW.Map.splice]] method arguments.
	 * Returned by [[JW.Map.detectSplice]] method.
	 *
	 * @param T Item type.
	 */
	export interface SpliceParams<T> {
		/**
		 * Keys of items to remove.
		 */
		readonly removedKeys: string[];

		/**
		 * Items to add/replace.
		 */
		readonly updatedItems: Dictionary<T>;
	}

	/**
	 * [[JW.Map.splice]] method result.
	 *
	 * @param T Item type.
	 */
	export interface SpliceResult<T> {
		readonly removedItems: Dictionary<T>;
		readonly addedItems: Dictionary<T>;
	}
}
