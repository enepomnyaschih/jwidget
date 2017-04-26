/*!
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

import Listenable from './Listenable';
import {apply, destroy, iid} from './index';
import {CollectionFlags, SILENT, ADAPTER} from './index';
import Destroyable from './Destroyable';
import Dictionary from './Dictionary';
import Event from './Event';
import IList from './IList';
import IEvent from './IEvent';
import IMap from './IMap';
import IndexedCollection from './IndexedCollection';
import ISet from './ISet';
import List from './List';
import Some from './Some';
import Set from './Set';
import * as ArrayUtils from './ArrayUtils';
import * as DictionaryUtils from './DictionaryUtils';

/**
 * Map is unordered collection. Each item has its own string key.
 *
 * # Map methods
 *
 * **Difference compared to [[JW.IndexedCollection]] is in bold.**
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
 * * **[[getJson]] - Returns internal representation of map.**
 *
 * Iteration algorithms:
 *
 * * [[every]] - Checks all items by criteria.
 * Returns true if all items match the criteria.
 * * [[some]] - Checks each item by criteria.
 * Returns true if some items matches the criteria.
 * * [[each]] - Iterates items.
 * * [[search]] - Finds item by criteria.
 * Returns first item matching the criteria.
 * * [[find]] - Finds item by criteria.
 * Returns index of first item matching the criteria.
 * * [[filter]], [[filter]],
 * [[$filter]] - Filters collection by criteria.
 * Builds new collection of the same type, consisting of items matching the criteria.
 * * [[count]], [[$count]],
 * [[$$count]] - Counts the items matching criteria.
 * * [[map]], [[map]],
 * [[$mapValues]], [[$mapObjects]] - Maps collection items.
 * Builds new collection of the same type, consisting of results of mapping function call for each collection item.
 * * [[toSorted]], [[$toSorted]],
 * [[toSortedComparing]], [[$toSortedComparing]],
 * [[$$toSortedComparing]] -
 * Builds array consisting of collection items sorted by indexer or comparer.
 * * [[getSortingKeys]], [[$getSortingKeys]],
 * [[getSortingKeysComparing]],
 * [[$getSortingKeysComparing]] -
 * Returns indexes of collection items sorted by indexer or comparer.
 * * [[index]], [[$index]],
 * [[$$index]] - Indexes collection.
 * Builds new map by rule: key is the result of indexer function call, value is the corresponding item.
 * * [[toArray]], [[$toArray]],
 * [[$$toArray]] - Builds new array consisting of collection items.
 * * [[toDictionary]], [[toMap]] - Builds new map consisting of collection items.
 * * [[toSet]], [[toSet]],
 * [[$toSet]] - Builds new set consisting of collection items.
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
 * * [[clear]], [[$clear]],
 * [[tryClear]] - Clears collection.
 * * **[[splice]], [[trySplice]] - Removes and adds bunches of items.**
 * * **[[reindex]], [[tryReindex]] - Changes item keys.**
 * * **[[performSplice]] - Adjusts contents using [[splice]] method.**
 * * **[[performReindex]] - Adjusts contents using [[reindex]] method.**
 *
 * Synchronizers creation:
 *
 * * [[createMapper]] - Creates item mapper.
 * Extended version of [[$mapValues]] and [[$mapObjects]] methods.
 * * [[createFilterer]] - Creates filterer.
 * Extended version of [[$filter]] method.
 * * [[createCounter]] - Creates matching item counter.
 * Extended version of [[$$count]] method.
 * * [[createLister]] - Creates converter to set.
 * Extended version of [[$toSet]] method.
 * * [[createIndexer]] - Creates converter to map (indexer).
 * Extended version of [[$$index]] method.
 * * [[createOrderer]] - Creates converter to array (orderer).
 * Extended version of [[$$toArray]] method.
 * * [[createSorterComparing]] - Creates converter to array (sorter by comparer).
 * Extended version of [[$$toSortedComparing]] method.
 * * [[createObserver]] - Creates observer.
 * * **[[createInserter]] - Creates view synchronizer with map.**
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
 * see [[JW.Map]] static methods.
 *
 * @param T Map item type.
 */
class Map<T> extends IndexedCollection<string, T> implements IMap<T> {
	private _adapter: boolean;
	private _items: Dictionary<T>;

	private _spliceEvent  : IEvent<IMap.SpliceEventParams<T>>;
	private _reindexEvent : IEvent<IMap.ReindexEventParams<T>>;
	private _clearEvent   : IEvent<IMap.ItemsEventParams<T>>;
	private _changeEvent  : IEvent<IMap.EventParams<T>>;

	/**
	 * Function which returns unique key of an item in this collection.
	 * [[detectReindex]],
	 * [[performReindex]] algorithms.
	 * Defaults to [[iid]], so
	 * if collection contains instances of JW.Class, you are in a good shape.
	 */
	getKey: (item: T) => any;

	/**
	 * @param json Initial map contents.
	 * @param adapter Set to true to wrap the **items** rather than copying them into
	 * a new map.
	 */
	constructor(silent?: boolean);
	constructor(items: Dictionary<T>, flags: CollectionFlags);
	constructor(a?: any, b?: CollectionFlags) {
		const valued = (typeof a !== "boolean");
		const silent = Boolean(valued ? (b & SILENT) : a);
		const adapter = valued && Boolean(b & ADAPTER);
		const items: Dictionary<T> = (valued && a) ? a : {};

		super(silent);
		this._adapter = adapter;
		this._items = this._adapter ? items : apply<T>({}, items);
		this._length.set(DictionaryUtils.getLength(this._items));

		this._spliceEvent  = Event.make<IMap.SpliceEventParams<T>>(this, silent);
		this._reindexEvent = Event.make<IMap.ReindexEventParams<T>>(this, silent);
		this._clearEvent   = Event.make<IMap.ItemsEventParams<T>>(this, silent);
		this._changeEvent  = Event.make<IMap.EventParams<T>>(this, silent);
	}

	/**
	 * @inheritdoc
	 */
	get first(): T {
		return DictionaryUtils.getFirst(this._items);
	}

	/**
	 * @inheritdoc
	 */
	get firstKey(): string {
		return DictionaryUtils.getFirstKey(this._items);
	}

	/**
	 * Returns item map - internal collection representation.
	 *
	 * **Caution: doesn't make a copy - please don't modify.**
	 */
	get items(): Dictionary<T> {
		return this._items;
	}

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
	get spliceEvent(): Listenable<IMap.SpliceEventParams<T>> {
		return this._spliceEvent;
	}

	/**
	 * Keys of items are changed in map. Triggered in result of calling:
	 *
	 * * [[setKey]]
	 * * [[trySetKey]]
	 * * [[reindex]]
	 * * [[tryReindex]]
	 * * [[performReindex]]
	 */
	get reindexEvent(): Listenable<IMap.ReindexEventParams<T>> {
		return this._reindexEvent;
	}

	/**
	 * Map is cleared. Triggered in result of calling:
	 *
	 * * [[clear]]
	 * * [[$clear]]
	 * * [[tryClear]]
	 */
	get clearEvent(): Listenable<IMap.ItemsEventParams<T>> {
		return this._clearEvent;
	}

	/**
	 * Map is changed. Triggered right after any another event.
	 */
	get changeEvent(): Listenable<IMap.EventParams<T>> {
		return this._changeEvent;
	}

	/**
	 * @inheritdoc
	 */
	ownItems(): this {
		super.ownItems();
		return this;
	}

	/**
	 * @inheritdoc
	 */
	get(key: string): T {
		return this._items[key];
	}

	/**
	 * @inheritdoc
	 */
	getKeys(): string[] {
		return Object.keys(this._items);
	}

	/**
	 * @inheritdoc
	 */
	$getKeys(): IList<string> {
		return new List<string>(this.getKeys(), SILENT | ADAPTER);
	}

	/**
	 * @inheritdoc
	 */
	containsItem(item: T): boolean {
		return DictionaryUtils.containsItem(this._items, item);
	}

	/**
	 * @inheritdoc
	 */
	every(callback: (item: T, key: string) => boolean, scope?: any): boolean {
		return DictionaryUtils.every(this._items, callback, scope || this);
	}

	/**
	 * @inheritdoc
	 */
	toSorted(callback?: (item: T, key: string) => any, scope?: any, order?: number): T[] {
		return DictionaryUtils.toSorted(this._items, callback, scope || this, order);
	}

	/**
	 * @inheritdoc
	 */
	$toSorted(callback?: (item: T, key: string) => any, scope?: any, order?: number): IList<T> {
		return new List<T>(this.toSorted(callback, scope, order), SILENT | ADAPTER);
	}

	/**
	 * @inheritdoc
	 */
	toSortedComparing(compare?: (t1: T, t2: T, k1: string, k2: string) => number, scope?: any, order?: number): T[] {
		return DictionaryUtils.toSortedComparing(this._items, compare, scope || this, order);
	}

	/**
	 * @inheritdoc
	 */
	$toSortedComparing(compare?: (t1: T, t2: T, k1: string, k2: string) => number, scope?: any, order?: number): IList<T> {
		return new List<T>(this.toSortedComparing(compare, scope, order), SILENT | ADAPTER);
	}

	/**
	 * @inheritdoc
	 */
	getSortingKeys(callback?: (item: T, key: string) => any, scope?: any, order?: number): string[] {
		return DictionaryUtils.getSortingKeys(this._items, callback, scope || this, order);
	}

	/**
	 * @inheritdoc
	 */
	$getSortingKeys(callback?: (item: T, key: string) => any, scope?: any, order?: number): IList<string> {
		return new List<string>(this.getSortingKeys(callback, scope, order), SILENT | ADAPTER);
	}

	/**
	 * @inheritdoc
	 */
	getSortingKeysComparing(compare?: (t1: T, t2: T, k1: string, k2: string) => number, scope?: any, order?: number): string[] {
		return DictionaryUtils.getSortingKeysComparing(this._items, compare, scope || this, order);
	}

	/**
	 * @inheritdoc
	 */
	$getSortingKeysComparing(compare?: (t1: T, t2: T, k1: string, k2: string) => number, scope?: any, order?: number): IList<string> {
		return new List<string>(this.getSortingKeysComparing(compare, scope, order), SILENT | ADAPTER);
	}

	/**
	 * @inheritdoc
	 */
	filter(callback: (item: T, key: string) => boolean, scope?: any): IMap<T> {
		return new Map<T>(DictionaryUtils.filter(this._items, callback, scope || this), SILENT | ADAPTER);
	}

	/**
	 * @inheritdoc
	 */
	count(callback: (item: T, key: string) => boolean, scope?: any): number {
		return DictionaryUtils.count(this._items, callback, scope || this);
	}

	/**
	 * @inheritdoc
	 */
	map<U>(callback: (item: T, key: string) => U, scope?: any): IMap<U> {
		return new Map<U>(DictionaryUtils.map(this._items, callback, scope || this), SILENT | ADAPTER);
	}

	/**
	 * @inheritdoc
	 */
	$index(callback: (item: T, key: string) => string, scope?: any): IMap<T> {
		return new Map<T>(this.index(callback, scope), SILENT | ADAPTER);
	}

	/**
	 * @inheritdoc
	 */
	toList(): IList<T> {
		return new List<T>(this.toArray(), SILENT | ADAPTER);
	}

	/**
	 * @inheritdoc
	 */
	asList(): IList<T> {
		return new List<T>(this.asArray(), SILENT | ADAPTER);
	}

	/**
	 * @inheritdoc
	 */
	toDictionary(): Dictionary<T> {
		return apply<T>({}, this._items);
	}

	/**
	 * @inheritdoc
	 */
	toMap(): IMap<T> {
		return new Map<T>(this.toDictionary(), SILENT | ADAPTER);
	}

	/**
	 * @inheritdoc
	 */
	asDictionary(): Dictionary<T> {
		return this._items;
	}

	/**
	 * @inheritdoc
	 */
	asMap(): IMap<T> {
		return this;
	}

	/**
	 * @inheritdoc
	 */
	toSet(): ISet<any> {
		return new Set<any>(this.toSet(), SILENT | ADAPTER);
	}

	/**
	 * @inheritdoc
	 */
	asSet(): ISet<any> {
		return new Set<any>(this.toSet(), SILENT | ADAPTER);
	}

	/**
	 * Replaces item with specified key. If map doesn't contain such key, new item is added.
	 * @returns The replaced item. If collection is not modified, returns undefined.
	 */
	trySet(item: T, key: string): Some<T> {
		const result = DictionaryUtils.trySet(this._items, item, key);
		if (result === undefined) {
			return undefined;
		}
		const removedItem = result.value;
		if (removedItem === undefined) {
			this._length.set(this._length.get() + 1);
		}
		if (!this.silent) {
			const removedItems: Dictionary<T> = {};
			if (removedItem !== undefined) {
				removedItems[key] = removedItem;
			}
			const addedItems: Dictionary<T> = {};
			addedItems[key] = item;
			const spliceResult = { removedItems: removedItems, addedItems: addedItems };
			this._spliceEvent.trigger({ sender: this, spliceResult: spliceResult });
			this._changeEvent.trigger({ sender: this });
		}
		if (removedItem !== undefined && this._ownsItems) {
			(<Destroyable><any>removedItem).destroy();
		}
		return result;
	}

	/**
	 * Adds or replaces a bunch of items.
	 */
	setAll(items: Dictionary<T>) {
		if (!this.silent) {
			this.trySetAll(items);
			return;
		}
		for (var key in items) {
			this.trySet(items[key], key);
		}
	}

	/**
	 * Low-performance alternative to [[setAll]] with verbose result set.
	 * @returns Result of internal [[splice]] method call.
	 */
	setAllVerbose(items: Dictionary<T>): IMap.SpliceResult<T> {
		var spliceResult = this.trySetAll(items);
		return (spliceResult !== undefined) ? spliceResult : { removedItems: {}, addedItems: {} };
	}

	/**
	 * Adds or replaces a bunch of items.
	 * @returns Result of internal [[splice]] method call.
	 * If collection is not modified, returns undefined.
	 */
	trySetAll(items: Dictionary<T>): IMap.SpliceResult<T> {
		return this.trySplice([], items);
	}

	/**
	 * Changes item key in map. If collection doesn't contain oldKey or contains newKey, it causes an error.
	 * @returns The moved item.
	 */
	setKey(oldKey: string, newKey: string): T {
		this.trySetKey(oldKey, newKey);
		return this._items[newKey];
	}

	/**
	 * Changes item key in map. If collection doesn't contain oldKey or contains newKey, it causes an error.
	 * @returns The moved item.
	 * If collection is not modified, returns undefined.
	 */
	trySetKey(oldKey: string, newKey: string): T {
		const item = DictionaryUtils.trySetKey(this._items, oldKey, newKey);
		if (item === undefined) {
			return undefined;
		}
		if (!this.silent) {
			this._reindexEvent.trigger({ sender: this, keyMap: DictionaryUtils.single(oldKey, newKey) });
			this._changeEvent.trigger({ sender: this });
		}
		return item;
	}

	/**
	 * Removes item with specified key if it exists in map.
	 * @returns Old collection item.
	 * If collection is not modified, returns undefined.
	 */
	tryRemove(key: string): T {
		const item = DictionaryUtils.tryRemove(this._items, key);
		if (item === undefined) {
			return undefined;
		}
		this._length.set(this._length.get() - 1);
		if (!this.silent) {
			const spliceResult: IMap.SpliceResult<T> = { addedItems: {}, removedItems: DictionaryUtils.single(key, item) };
			this._spliceEvent.trigger({ sender: this, spliceResult: spliceResult });
			this._changeEvent.trigger({ sender: this });
		}
		if (this._ownsItems) {
			(<Destroyable><any>item).destroy();
		}
		return item;
	}

	/**
	 * Removes a bunch of items from map.
	 */
	removeAll(keys: string[]) {
		if (!this.silent) {
			this.tryRemoveAll(keys);
			return;
		}
		for (let i = 0, l = keys.length; i < l; ++i) {
			this.tryRemove(keys[i]);
		}
	}

	/**
	 * Low-performance alternative to [[removeAll]] with verbose result set.
	 * @returns The removed items.
	 */
	removeAllVerbose(keys: string[]): Dictionary<T> {
		const items = this.tryRemoveAll(keys);
		return (items !== undefined) ? items : {};
	}

	/**
	 * Removes a bunch of items from map.
	 * @returns The removed items.
	 * If collection is not modified, returns undefined.
	 */
	tryRemoveAll(keys: string[]): Dictionary<T> {
		const spliceResult = this.trySplice(keys, {});
		if (spliceResult !== undefined) {
			return spliceResult.removedItems;
		}
		return undefined;
	}

	/**
	 * @inheritdoc
	 */
	removeItems(items: T[]) {
		const itemSet = ArrayUtils.index(items, iid);
		const newItems = DictionaryUtils.filter(this._items, function (item) {
			return !itemSet.hasOwnProperty((<any>item).iid);
		});
		this.performSplice(newItems);
	}

	/**
	 * @inheritdoc
	 */
	clear(): Dictionary<T> {
		if (this._length.get() === 0) {
			return undefined;
		}
		let items: Dictionary<T>;
		this._length.set(0);
		if (this._adapter) {
			items = DictionaryUtils.tryClear(this._items);
		} else {
			items = this._items;
			this._items = {};
		}
		this._clearEvent.trigger({ sender: this, items: items });
		this._changeEvent.trigger({ sender: this });
		if (this._ownsItems) {
			ArrayUtils.backEvery(DictionaryUtils.toArray(items), destroy);
		}
		return items;
	}

	/**
	 * Removes and adds bunches of items in map. Universal optimized granular operation of removal/insertion.
	 * @param removedKeys Keys of items to remove.
	 * @param updatedItems Items to add/replace.
	 * @returns Splice result. Never returns null or undefined.
	 */
	splice(removedKeys: string[], updatedItems: Dictionary<T>): IMap.SpliceResult<T> {
		var spliceResult = this.trySplice(removedKeys, updatedItems);
		return (spliceResult !== undefined) ? spliceResult : { removedItems: {}, addedItems: {} };
	}

	/**
	 * Removes and adds bunches of items in map. Universal optimized granular operation of removal/insertion.
	 * @param removedKeys Keys of items to remove.
	 * @param updatedItems Items to add/replace.
	 * @returns Splice result.
	 * If collection is not modified, returns undefined.
	 */
	trySplice(removedKeys: string[], updatedItems: Dictionary<T>): IMap.SpliceResult<T> {
		const spliceResult = DictionaryUtils.trySplice(this._items, removedKeys, updatedItems);
		if (spliceResult === undefined) {
			return undefined;
		}
		this._length.set(this._length.get() + DictionaryUtils.getLength(spliceResult.addedItems) - DictionaryUtils.getLength(spliceResult.removedItems));
		this._spliceEvent.trigger({ sender: this, spliceResult: spliceResult });
		this._changeEvent.trigger({ sender: this });
		if (this._ownsItems) {
			ArrayUtils.backEvery(DictionaryUtils.toArray(spliceResult.removedItems), destroy);
		}
		return spliceResult;
	}

	/**
	 * Changes item keys in map.
	 * @param keyMap Key map. Item with key x will gain key keyMap[x].
	 * It is neccessary to pass only changed keys, but unchanged keys or unexisting keys are acceptable as well.
	 * @returns Map of changed keys. Never returns null or undefined.
	 */
	reindex(keyMap: Dictionary<string>): Dictionary<string> {
		var result = this.tryReindex(keyMap);
		return (result !== undefined) ? result : {};
	}

	/**
	 * Changes item keys in map.
	 * @param keyMap Key map. Item with key x will gain key keyMap[x].
	 * It is neccessary to pass only changed keys, but unchanged keys or unexisting keys are acceptable as well.
	 * @returns Map of changed keys.
	 * If collection is not modified, returns undefined.
	 */
	tryReindex(keyMap: Dictionary<string>): Dictionary<string> {
		const result = DictionaryUtils.tryReindex(this._items, keyMap);
		if (result === undefined) {
			return undefined;
		}
		this._reindexEvent.trigger({ sender: this, keyMap: result });
		this._changeEvent.trigger({ sender: this });
		return result;
	}

	/**
	 * Detects [[splice]] method arguments to adjust map contents to **newItems**.
	 * Determines which item bunches should be removed and which ones should be inserted/replaced, and their keys.
	 * @param newItems New map contents.
	 * @returns [[splice]] method arguments. If no method call required, returns undefined.
	 */
	detectSplice(newItems: Dictionary<T>): IMap.SpliceParams<T> {
		return DictionaryUtils.detectSplice(this._items, newItems);
	}

	/**
	 * Detects [[reindex]] method arguments to adjust map contents to **newItems**.
	 * Determines which keys should be assigned to all items.
	 * If **newItems** contents differ from current map contents, the map will be broken.
	 * @param newItems New map contents.
	 * @param getKey Function which returns unique key of an item in this collection.
	 * Defaults to [[getKey]].
	 * If collection consists of instances of JW.Class, then you are in a good shape.
	 * @param scope **getKey** call scope. Defaults to collection itself.
	 * @returns **keyMap** argument of [[reindex]] method.
	 * If no method call required, returns undefined.
	 */
	detectReindex(newItems: Dictionary<T>, getKey?: (item: T) => any, scope?: any): Dictionary<string> {
		return DictionaryUtils.detectReindex(this._items, newItems, getKey || this.getKey, scope || this);
	}

	/**
	 * Adjusts map contents to **newItems** using [[detectSplice]] and
	 * [[splice]] methods.
	 * @param newItems New map contents.
	 */
	performSplice(newItems: Dictionary<T>) {
		var params = this.detectSplice(newItems);
		if (params !== undefined) {
			this.trySplice(params.removedKeys, params.updatedItems);
		}
	}

	/**
	 * Adjusts map contents to **newItems** using [[detectReindex]] and
	 * [[reindex]] methods.
	 * @param newItems New map contents.
	 * @param getKey Function which returns unique key of an item in this collection.
	 * Defaults to [[getKey]].
	 * If collection consists of instances of JW.Class, then you are in a good shape.
	 * @param scope **getKey** call scope. Defaults to collection itself.
	 */
	performReindex(newItems: Dictionary<T>, getKey?: (item: T) => any, scope?: any) {
		var keyMap = this.detectReindex(newItems, getKey, scope);
		if (keyMap !== undefined) {
			this.tryReindex(keyMap);
		}
	}

	/**
	 * @hidden
	 */
	getInverted(): Dictionary<string> {
		return DictionaryUtils.getInverted(<Dictionary<any>>this._items);
	}

	/**
	 * Checks for equality (===) to another map, item by item.
	 */
	equal(map: Dictionary<T>): boolean {
		return DictionaryUtils.equal(this._items, map);
	}
}

export default Map;
