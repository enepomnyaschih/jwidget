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

import * as ArrayUtils from './ArrayUtils';
import Bindable from './Bindable';
import Class from './Class';
import Destroyable from './Destroyable';
import Dictionary from './Dictionary';
import * as DictionaryUtils from './DictionaryUtils';
import Event from './Event';
import IEvent from './IEvent';
import IList from './IList';
import IMap from './IMap';
import {ADAPTER, apply, CollectionFlags, destroy, SILENT} from './index';
import {vid, VidSet} from './internal';
import IProperty from './IProperty';
import ISet from './ISet';
import List from './List';
import Listenable from './Listenable';
import Property from './Property';
import Reducer from './Reducer';
import Set from './Set';
import Some from './Some';

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
class Map<T> extends Class implements IMap<T> {
	private _ownsItems: Boolean = false;
	private _length: IProperty<number>;
	private _adapter: boolean;
	private _items: Dictionary<T>;

	private _spliceEvent  : IEvent<IMap.SpliceEventParams<T>>;
	private _reindexEvent : IEvent<IMap.ReindexEventParams<T>>;
	private _clearEvent   : IEvent<IMap.ItemsEventParams<T>>;
	private _changeEvent  : IEvent<IMap.EventParams<T>>;

	/**
	 * Identifies an item in this collection for optimization of some algorithms.
	 */
	readonly getKey: (item: T) => string;

	/**
	 * @param json Initial map contents.
	 * @param adapter Set to true to wrap the **items** rather than copying them into
	 * a new map.
	 */
	constructor(silent?: boolean);
	constructor(getKey: (item: T) => string, silent?: boolean);
	constructor(items: Dictionary<T>, flags?: CollectionFlags);
	constructor(items: Dictionary<T>, getKey: (item: T) => string, flags?: CollectionFlags);
	constructor(a?: any, b?: any, c?: CollectionFlags) {
		super();
		if (typeof a === "boolean") {
			c = a ? SILENT : 0;
			a = null;
		} else if (typeof a === "function" || (a == null && typeof b === "boolean")) {
			c = b ? SILENT : 0;
			b = a;
			a = null;
		} else if (typeof b === "number") {
			c = b;
			b = null;
		}
		const items: Dictionary<T> = a;
		const silent = Boolean(c & SILENT);
		const adapter = (items != null) && Boolean(c & ADAPTER);

		this.getKey = b || vid;

		this._adapter = adapter;
		this._items = this._adapter ? items : apply<T>({}, items);
		this._length = this.own(new Property(DictionaryUtils.getLength(this._items), silent));

		this._spliceEvent = Event.make<IMap.SpliceEventParams<T>>(silent);
		this._reindexEvent = Event.make<IMap.ReindexEventParams<T>>(silent);
		this._clearEvent = Event.make<IMap.ItemsEventParams<T>>(silent);
		this._changeEvent = Event.make<IMap.EventParams<T>>(silent);
	}

	protected destroyObject(): void {
		this.clear();
		super.destroyObject();
	}

	/**
	 * Checks if this collection never triggers events. This knowledge may help you do certain code optimizations.
	 */
	get silent() {
		return this.changeEvent.dummy;
	}

	/**
	 * Collection length property.
	 */
	get length(): Bindable<number> {
		return this._length;
	}

	/**
	 * Checks collection for emptiness.
	 */
	get empty() {
		return this.length.get() === 0;
	}

	/**
	 * Returns first item in collection. If collection is empty, returns undefined.
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
	 * Makes this collection an owner of its items, which means that its items are alive as long as they are present in
	 * this collection. The item is destroyed when it leaves the
	 * collection, and all items are destroyed on the collection destruction.
	 * @returns this
	 */
	ownItems(): this {
		this._ownsItems = true;
		return this;
	}

	/**
	 * Returns a full copy of this object.
	 */
	clone(): IMap<T> {
		return new Map<T>(this.items, this.getKey, this.silent ? SILENT : 0);
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
		return new List<string>(this.getKeys(), String, SILENT | ADAPTER);
	}

	/**
	 * @inheritdoc
	 */
	contains(item: T): boolean {
		return DictionaryUtils.contains(this._items, item);
	}

	/**
	 * Checks existance of item with specified key in collection.
	 */
	containsKey(key: string): boolean {
		return this.get(key) !== undefined;
	}

	/**
	 * Returns key of item in collection. If such item doesn't exist, returns undefined.
	 */
	keyOf(item: T): string {
		return DictionaryUtils.keyOf(this._items, item);
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
	some(callback: (item: T, key: string) => boolean, scope?: any): boolean {
		return DictionaryUtils.some(this._items, callback, scope || this);
	}

	/**
	 * Iterates collection items. Calls specified function for all items.
	 *
	 * @param callback Callback function.
	 * @param scope **callback** call scope. Defaults to collection itself.
	 */
	forEach(callback: (item: T, key: string) => any, scope?: any): void {
		DictionaryUtils.forEach(this._items, callback, scope || this);
	}

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
	findKey(callback: (item: T, key: string) => boolean, scope?: any): string {
		return DictionaryUtils.findKey(this._items, callback, scope || this);
	}

	/**
	 * @inheritdoc
	 */
	find(callback: (item: T, key: string) => boolean, scope?: any): T {
		return DictionaryUtils.find(this._items, callback, scope || this);
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
		return new List<T>(this.toSorted(callback, scope, order), this.getKey, SILENT | ADAPTER);
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
		return new List<T>(this.toSortedComparing(compare, scope, order), this.getKey, SILENT | ADAPTER);
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
		return new List<string>(this.getSortingKeys(callback, scope, order), String, SILENT | ADAPTER);
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
		return new List<string>(this.getSortingKeysComparing(compare, scope, order), String, SILENT | ADAPTER);
	}

	/**
	 * @inheritdoc
	 */
	filter(callback: (item: T, key: string) => boolean, scope?: any): IMap<T> {
		return new Map<T>(DictionaryUtils.filter(this._items, callback, scope || this), this.getKey, SILENT | ADAPTER);
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
	map<U>(callback: (item: T, key: string) => U, scope?: any, getKey?: (item: U) => string): IMap<U> {
		return new Map<U>(DictionaryUtils.map(this._items, callback, scope || this), getKey, SILENT | ADAPTER);
	}

	/**
	 * @inheritdoc
	 */
	index(callback: (item: T, key: string) => string, scope?: any): Dictionary<T> {
		return DictionaryUtils.index(this._items, callback, scope || this);
	}

	/**
	 * @inheritdoc
	 */
	$index(callback: (item: T, key: string) => string, scope?: any): IMap<T> {
		return new Map<T>(this.index(callback, scope), this.getKey, SILENT | ADAPTER);
	}

	reduce<U>(reducer: Reducer<T, U>): U;
	reduce<U>(callback: (accumulator: U, item: T, key: string) => U, initial: U): U;
	reduce<U>(reducer: Reducer<T, U> | ((accumulator: U, item: T, key: string) => U), initial?: U): U {
		return (typeof reducer === "function") ?
			DictionaryUtils.reduce<T, U>(this.items, reducer, initial) :
			DictionaryUtils.reduce<T, U>(this.items, reducer);
	}

	max(callback?: (item: T, key: string) => any, scope?: any, order?: number): T {
		return DictionaryUtils.max(this._items, callback, scope, order);
	}

	maxKey(callback?: (item: T, key: string) => any, scope?: any, order?: number): string {
		return DictionaryUtils.maxKey(this._items, callback, scope, order);
	}

	maxComparing(compare?: (t1: T, t2: T, k1: string, k2: string) => number, scope?: any, order?: number): T {
		return DictionaryUtils.maxComparing(this._items, compare, scope, order);
	}

	maxKeyComparing(compare?: (t1: T, t2: T, k1: string, k2: string) => number, scope?: any, order?: number): string {
		return DictionaryUtils.maxKeyComparing(this._items, compare, scope, order);
	}

	min(callback?: (item: T, key: string) => any, scope?: any, order?: number): T {
		return DictionaryUtils.min(this._items, callback, scope, order);
	}

	minKey(callback?: (item: T, key: string) => any, scope?: any, order?: number): string {
		return DictionaryUtils.minKey(this._items, callback, scope, order);
	}

	minComparing(compare?: (t1: T, t2: T, k1: string, k2: string) => number, scope?: any, order?: number): T {
		return DictionaryUtils.minComparing(this._items, compare, scope, order);
	}

	minKeyComparing(compare?: (t1: T, t2: T, k1: string, k2: string) => number, scope?: any, order?: number): string {
		return DictionaryUtils.minKeyComparing(this._items, compare, scope, order);
	}

	/**
	 * Converts collection to array.
	 *
	 * Builds new array consisting of collection items.
	 */
	toArray(): T[] {
		return DictionaryUtils.toArray(this._items);
	}

	/**
	 * @inheritdoc
	 */
	toList(): IList<T> {
		return new List<T>(this.toArray(), this.getKey, SILENT | ADAPTER);
	}

	/**
	 * @inheritdoc
	 */
	toSet(): ISet<T> {
		return new Set<T>(this.toArray(), this.getKey, true);
	}

	/**
	 * @inheritdoc
	 */
	toDictionary(): Dictionary<T> {
		return apply<T>({}, this._items);
	}

	/**
	 * Represents collection as array.
	 *
	 * If this collection is array, returns it immediately.
	 * Else, executes [[toArray]] method.
	 * This method works usually faster than [[toArray]],
	 * but please make sure that the returned array
	 * won't be modified externally, because it can cause strange unexpected bugs.
	 */
	asArray(): T[] {
		return this.toArray();
	}

	/**
	 * Represents collection as array.
	 *
	 * If this collection is array, returns it immediately.
	 * Else, executes [[toArray]] method.
	 * This method works usually faster than [[toArray]],
	 * but please make sure that the returned array
	 * won't be modified externally, because it can cause strange unexpected bugs.
	 */
	asList(): IList<T> {
		return this.toList();
	}

	/**
	 * Represents collection as set.
	 *
	 * If this collection is set, returns it immediately.
	 * Else, executes [[toSet]] method.
	 * This method works usually faster than [[toSet]],
	 * but please make sure that the returned set
	 * won't be modified externally, because it can cause strange unexpected bugs.
	 */
	asSet(): ISet<T> {
		return this.toSet();
	}

	/**
	 * @inheritdoc
	 */
	asDictionary(): Dictionary<T> {
		return this._items;
	}

	/**
	 * Replaces item with specified key. If map doesn't contain such key, new item is added.
	 * @returns The replaced item. If collection is not modified, returns undefined.
	 */
	tryPut(key: string, item: T): Some<T> {
		const result = DictionaryUtils.tryPut(this._items, key, item);
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
	 * Replaces item with specified key. If collection doesn't contain such key:
	 *
	 * * Array will be broken.
	 * * Map will add a new item.
	 *
	 * @returns The replaced item.
	 */
	put(key: string, item: T): T {
		const result = this.tryPut(key, item);
		return (result !== undefined) ? result.value : this.get(key);
	}

	/**
	 * Adds or replaces a bunch of items.
	 */
	putAll(items: Dictionary<T>) {
		if (!this.silent) {
			this.tryPutAll(items);
			return;
		}
		for (var key in items) {
			this.tryPut(key, items[key]);
		}
	}

	/**
	 * Low-performance alternative to [[setAll]] with verbose result set.
	 * @returns Result of internal [[splice]] method call.
	 */
	putAllVerbose(items: Dictionary<T>): IMap.SpliceResult<T> {
		var spliceResult = this.tryPutAll(items);
		return (spliceResult !== undefined) ? spliceResult : { removedItems: {}, addedItems: {} };
	}

	/**
	 * Adds or replaces a bunch of items.
	 * @returns Result of internal [[splice]] method call.
	 * If collection is not modified, returns undefined.
	 */
	tryPutAll(items: Dictionary<T>): IMap.SpliceResult<T> {
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
			this._reindexEvent.trigger({ sender: this, keyMap: {[oldKey]: newKey} });
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
			const spliceResult: IMap.SpliceResult<T> = { addedItems: {}, removedItems: {[key]: item} };
			this._spliceEvent.trigger({ sender: this, spliceResult: spliceResult });
			this._changeEvent.trigger({ sender: this });
		}
		if (this._ownsItems) {
			(<Destroyable><any>item).destroy();
		}
		return item;
	}

	/**
	 * Removes item with specified key. If collection doesn't contain such key:
	 *
	 * * Array will be broken.
	 * * Map will add a new item.
	 *
	 * @returns The removed item.
	 */
	remove(key: string): T {
		return this.tryRemove(key);
	}

	/**
	 * @inheritdoc
	 */
	removeItem(item: T): string {
		var key = this.keyOf(item);
		if (key !== undefined) {
			this.tryRemove(key);
		}
		return key;
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
		const itemSet = VidSet.fromArray<T>(items, this.getKey);
		const newItems = DictionaryUtils.filter(this._items, function (item) {
			return !itemSet.contains(item);
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
	detectReindex(newItems: Dictionary<T>): Dictionary<string> {
		return DictionaryUtils.detectReindex(this._items, newItems, this.getKey);
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
	performReindex(newItems: Dictionary<T>) {
		var keyMap = this.detectReindex(newItems);
		if (keyMap !== undefined) {
			this.tryReindex(keyMap);
		}
	}

	/**
	 * Checks for equality (===) to another map, item by item.
	 */
	equal(map: Dictionary<T>): boolean {
		return DictionaryUtils.equal(this._items, map);
	}
}

export default Map;
