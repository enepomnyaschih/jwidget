import {apply, destroy} from './Core';
import Destroyable from './Destroyable';
import Dictionary from './Dictionary';
import IMap from './IMap';
import IMapSpliceParams from './IMapSpliceParams';
import IMapSpliceResult from './IMapSpliceResult';
import IndexedCollection from './IndexedCollection';
import Proxy from './Proxy';
import * as ArrayUtils from './ArrayUtils';
import * as MapUtils from './MapUtils';

/**
 * Map is unordered collection. Each item has its own string key.
 *
 * # Map methods
 *
 * **Difference compared to [[JW.IndexedCollection]] is in bold.**
 *
 * Content retrieving:
 *
 * * [[getLength]] - Returns count of items in collection.
 * For observable collections, **length** property may come
 * in handy if you want to track collection length dynamically.
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
 * * [[filter]], [[$filter]],
 * [[$$filter]] - Filters collection by criteria.
 * Builds new collection of the same type, consisting of items matching the criteria.
 * * [[count]], [[$count]],
 * [[$$count]] - Counts the items matching criteria.
 * * [[map]], [[$map]],
 * [[$$mapValues]], [[$$mapObjects]] - Maps collection items.
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
 * * [[toMap]], [[$toMap]] - Builds new map consisting of collection items.
 * * [[toSet]], [[$toSet]],
 * [[$$toSet]] - Builds new set consisting of collection items.
 * * [[asArray]], [[$asArray]] - Represents collection as array.
 * * [[asMap]], [[$asMap]] - Represents collection as map.
 * * [[asSet]], [[$asSet]] - Represents collection as set.
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
 * Extended version of [[$$mapValues]] and [[$$mapObjects]] methods.
 * * [[createFilterer]] - Creates filterer.
 * Extended version of [[$$filter]] method.
 * * [[createCounter]] - Creates matching item counter.
 * Extended version of [[$$count]] method.
 * * [[createLister]] - Creates converter to set.
 * Extended version of [[$$toSet]] method.
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
abstract class AbstractMap<T> extends IndexedCollection<string, T> implements IMap<T> {
	private json: Dictionary<T>;
	private _length: number;
	private _adapter: boolean;

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
	constructor(json?: Dictionary<T>, adapter?: boolean) {
		super();
		this._adapter = Boolean(adapter);
		this.json = adapter ? json : json ? apply<T>({}, json) : {};
		this._length = MapUtils.getLength(this.json);
	}

	/**
	 * @inheritdoc
	 */
	ownItems(): AbstractMap<T> {
		super.ownItems();
		return this;
	}

	/**
	 * @inheritdoc
	 */
	getLength(): number {
		return this._length;
	}

	/**
	 * @inheritdoc
	 */
	isEmpty(): boolean {
		return this._length === 0;
	}

	/**
	 * @inheritdoc
	 */
	getFirst(): T {
		return MapUtils.getFirst(this.json);
	}

	/**
	 * @inheritdoc
	 */
	getFirstKey(): string {
		return MapUtils.getFirstKey(this.json);
	}

	/**
	 * @inheritdoc
	 */
	get(key: string): T {
		return this.json[key];
	}

	/**
	 * Returns item map - internal collection representation.
	 *
	 * **Caution: doesn't make a copy - please don't modify.**
	 */
	getJson(): Dictionary<T> {
		return this.json;
	}

	/**
	 * @inheritdoc
	 */
	getKeys(): string[] {
		return Object.keys(this.json);
	}

	/**
	 * @inheritdoc
	 */
	containsItem(item: T): boolean {
		return MapUtils.containsItem(this.json, item);
	}

	/**
	 * @inheritdoc
	 */
	every(callback: (item: T, key: string) => boolean, scope?: any): boolean {
		return MapUtils.every(this.json, callback, scope || this);
	}

	/**
	 * @inheritdoc
	 */
	toSorted(callback?: (item: T, key: string) => any, scope?: any, order?: number): T[] {
		return MapUtils.toSorted(this.json, callback, scope || this, order);
	}

	/**
	 * @inheritdoc
	 */
	toSortedComparing(compare?: (t1: T, t2: T, k1: string, k2: string) => number, scope?: any, order?: number): T[] {
		return MapUtils.toSortedComparing(this.json, compare, scope || this, order);
	}

	/**
	 * @inheritdoc
	 */
	getSortingKeys(callback?: (item: T, key: string) => any, scope?: any, order?: number): string[] {
		return MapUtils.getSortingKeys(this.json, callback, scope || this, order);
	}

	/**
	 * @inheritdoc
	 */
	getSortingKeysComparing(compare?: (t1: T, t2: T, k1: string, k2: string) => number, scope?: any, order?: number): string[] {
		return MapUtils.getSortingKeysComparing(this.json, compare, scope || this, order);
	}

	/**
	 * @inheritdoc
	 */
	filter(callback: (item: T, key: string) => boolean, scope?: any): Dictionary<T> {
		return MapUtils.filter(this.json, callback, scope || this);
	}

	/**
	 * @inheritdoc
	 */
	abstract $filter(callback: (item: T, key: string) => boolean, scope?: any): IMap<T>;

	/**
	 * @inheritdoc
	 */
	count(callback: (item: T, key: string) => boolean, scope?: any): number {
		return MapUtils.count(this.json, callback, scope || this);
	}

	/**
	 * @inheritdoc
	 */
	map<U>(callback: (item: T, key: string) => U, scope?: any): Dictionary<U> {
		return MapUtils.map(this.json, callback, scope || this);
	}

	/**
	 * @inheritdoc
	 */
	abstract $map<U>(callback: (item: T, key: string) => U, scope?: any): IMap<U>;

	/**
	 * @inheritdoc
	 */
	toMap(): Dictionary<T> {
		return apply<T>({}, this.json);
	}

	/**
	 * @inheritdoc
	 */
	asMap(): Dictionary<T> {
		return this.json;
	}

	/**
	 * @inheritdoc
	 */
	$asMap(): IMap<T> {
		return this;
	}

	/**
	 * Replaces item with specified key. If map doesn't contain such key, new item is added.
	 * @returns Proxy of the replaced item. If collection is not modified, returns undefined.
	 */
	trySet(item: T, key: string): Proxy<T> {
		var result = this._trySet(item, key);
		if (result === undefined) {
			return undefined;
		}
		var oldItem = result.value;
		if (oldItem !== undefined && this._ownsItems) {
			(<Destroyable><any>oldItem).destroy();
		}
		return result;
	}

	protected _trySet(item: T, key: string): Proxy<T> {
		var result = MapUtils.trySet(this.json, item, key);
		if (result === undefined) {
			return undefined;
		}
		if (result.value === undefined) {
			++this._length;
		}
		return result;
	}

	/**
	 * Adds or replaces a bunch of items.
	 */
	setAll(items: Dictionary<T>) {
		for (var key in items) {
			this.trySet(items[key], key);
		}
	}

	/**
	 * Low-performance alternative to [[setAll]] with verbose result set.
	 * @returns Result of internal [[splice]] method call.
	 */
	setAllVerbose(items: Dictionary<T>): IMapSpliceResult<T> {
		var spliceResult = this.trySetAll(items);
		return (spliceResult !== undefined) ? spliceResult : { removedItems: {}, addedItems: {} };
	}

	/**
	 * Adds or replaces a bunch of items.
	 * @returns Result of internal [[splice]] method call.
	 * If collection is not modified, returns undefined.
	 */
	trySetAll(items: Dictionary<T>): IMapSpliceResult<T> {
		return this.trySplice([], items);
	}

	/**
	 * Changes item key in map. If collection doesn't contain oldKey or contains newKey, it causes an error.
	 * @returns The moved item.
	 */
	setKey(oldKey: string, newKey: string): T {
		this.trySetKey(oldKey, newKey);
		return this.json[newKey];
	}

	/**
	 * Changes item key in map. If collection doesn't contain oldKey or contains newKey, it causes an error.
	 * @returns The moved item.
	 * If collection is not modified, returns undefined.
	 */
	trySetKey(oldKey: string, newKey: string): T {
		return MapUtils.trySetKey(this.json, oldKey, newKey);
	}

	/**
	 * Removes item with specified key if it exists in map.
	 * @returns Old collection item.
	 * If collection is not modified, returns undefined.
	 */
	tryRemove(key: string): T {
		var item = this._tryRemove(key);
		if (item !== undefined && this._ownsItems) {
			(<Destroyable><any>item).destroy();
		}
		return item;
	}

	protected _tryRemove(key: string): T {
		var item = MapUtils.tryRemove(this.json, key);
		if (item === undefined) {
			return undefined;
		}
		--this._length;
		return item;
	}

	/**
	 * Removes a bunch of items from map.
	 */
	removeAll(keys: string[]) {
		for (var i = 0, l = keys.length; i < l; ++i) {
			this.tryRemove(keys[i]);
		}
	}

	/**
	 * Low-performance alternative to [[removeAll]] with verbose result set.
	 * @returns The removed items.
	 */
	removeAllVerbose(keys: string[]): Dictionary<T> {
		var items = this.tryRemoveAll(keys);
		return (items !== undefined) ? items : {};
	}

	/**
	 * Low-performance alternative to [[removeAll]] with verbose result set.
	 * @returns The removed items.
	 */
	abstract $removeAllVerbose(keys: string[]): IMap<T>;

	/**
	 * Removes a bunch of items from map.
	 * @returns The removed items.
	 * If collection is not modified, returns undefined.
	 */
	tryRemoveAll(keys: string[]): Dictionary<T> {
		var spliceResult = this.trySplice(keys, {});
		if (spliceResult !== undefined) {
			return spliceResult.removedItems;
		}
		return undefined;
	}

	/**
	 * @inheritdoc
	 */
	removeItems(items: T[]) {
		var itemSet = ArrayUtils.index<any>(items, function(item) {
			return String(item._iid);
		});
		var newItems = this.filter(function (item) {
			return !itemSet.hasOwnProperty((<any>item)._iid);
		});
		this.performSplice(newItems);
	}

	/**
	 * @inheritdoc
	 */
	clear(): Dictionary<T> {
		var result = this.tryClear();
		return (result !== undefined) ? result : {};
	}

	/**
	 * @inheritdoc
	 */
	abstract $clear(): IMap<T>;

	/**
	 * @inheritdoc
	 */
	tryClear(): Dictionary<T> {
		var items = this._tryClear();
		if (items !== undefined && this._ownsItems) {
			ArrayUtils.backEvery(MapUtils.toArray(items), destroy);
		}
		return items;
	}

	protected _tryClear(): Dictionary<T> {
		if (this._length === 0) {
			return undefined;
		}
		var items: Dictionary<T>;
		this._length = 0;
		if (this._adapter) {
			items = MapUtils.tryClear(this.json);
		} else {
			items = this.json;
			this.json = {};
		}
		return items;
	}

	/**
	 * Removes and adds bunches of items in map. Universal optimized granular operation of removal/insertion.
	 * @param removedKeys Keys of items to remove.
	 * @param updatedItems Items to add/replace.
	 * @returns Splice result. Never returns null or undefined.
	 */
	splice(removedKeys: string[], updatedItems: Dictionary<T>): IMapSpliceResult<T> {
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
	trySplice(removedKeys: string[], updatedItems: Dictionary<T>): IMapSpliceResult<T> {
		var spliceResult = this._trySplice(removedKeys, updatedItems);
		if ((spliceResult !== undefined) && this._ownsItems) {
			ArrayUtils.backEvery<T>(MapUtils.toArray(spliceResult.removedItems), destroy);
		}
		return spliceResult;
	}

	protected _trySplice(removedKeys: string[], updatedItems: Dictionary<T>): IMapSpliceResult<T> {
		var spliceResult = MapUtils.trySplice(this.json, removedKeys, updatedItems);
		if (spliceResult !== undefined) {
			this._length += MapUtils.getLength(spliceResult.addedItems) - MapUtils.getLength(spliceResult.removedItems);
			return spliceResult;
		}
		return undefined;
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
		return MapUtils.tryReindex(this.json, keyMap);
	}

	/**
	 * Detects [[splice]] method arguments to adjust map contents to **newItems**.
	 * Determines which item bunches should be removed and which ones should be inserted/replaced, and their keys.
	 * @param newItems New map contents.
	 * @returns [[splice]] method arguments. If no method call required, returns undefined.
	 */
	detectSplice(newItems: Dictionary<T>): IMapSpliceParams<T> {
		return MapUtils.detectSplice(this.json, newItems);
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
		return MapUtils.detectReindex(this.json, newItems, getKey || this.getKey, scope || this);
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
		return MapUtils.getInverted(<Dictionary<any>>this.json);
	}

	/**
	 * Checks for equality (===) to another map, item by item.
	 */
	equal(map: Dictionary<T>): boolean {
		return MapUtils.equal(this.json, map);
	}

	/**
	 * @inheritdoc
	 */
	abstract createEmpty<U>(): AbstractMap<U>;
}

export default AbstractMap;
