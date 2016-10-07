import {apply, destroyForcibly, iidString, Dictionary, Proxy} from '../../core/Core';
import {Destroyable} from '../../core/Destroyable';
import {Class} from '../../core/Class';
import {IClass} from '../../core/IClass';
import {AbstractCollection} from './AbstractCollection';
import * as Collections from '../interfaces/ICollection';
import {IndexedCollection} from './IndexedCollection';
import {IArray} from '../interfaces/IArray';
import * as ArrayUtils from '../utils/Array';
import {IMap} from '../interfaces/IMap';
import * as Maps from '../interfaces/IMap';
import * as MapUtils from '../utils/Map';

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
export abstract class AbstractMap<T> extends IndexedCollection<string, T> implements IMap<T> {
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
		return MapUtils.getKeys(this.json);
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
	$$filter(callback: (item: T) => boolean, scope?: any): IMap<T> {
		return this.$filter(callback, scope || this);
	}

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
	$$mapValues<U>(callback: (item: T) => U, scope?: any): IMap<U> {
		return this.$map(callback, scope || this);
	}

	/**
	 * @inheritdoc
	 */
	$$mapObjects<U extends Destroyable>(callback: (item: T) => U, scope?: any): IMap<U> {
		return this.$map(callback, scope || this);
	}

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
			return;
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
	setAllVerbose(items: Dictionary<T>): AbstractMap.SpliceResult<T> {
		var spliceResult = this.trySetAll(items);
		return (spliceResult !== undefined) ? spliceResult : { removedItems: {}, addedItems: {} };
	}

	/**
	 * Adds or replaces a bunch of items.
	 * @returns Result of internal [[splice]] method call.
	 * If collection is not modified, returns undefined.
	 */
	trySetAll(items: Dictionary<T>): AbstractMap.SpliceResult<T> {
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
			return;
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
	}

	/**
	 * @inheritdoc
	 */
	removeItems(items: T[]) {
		var itemSet = ArrayUtils.index<any>(items, iidString);
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
			ArrayUtils.backEvery(MapUtils.toArray(items), destroyForcibly);
		}
		return items;
	}

	protected _tryClear(): Dictionary<T> {
		if (this._length === 0) {
			return;
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
	splice(removedKeys: string[], updatedItems: Dictionary<T>): Maps.SpliceResult<T> {
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
	trySplice(removedKeys: string[], updatedItems: Dictionary<T>): Maps.SpliceResult<T> {
		var spliceResult = this._trySplice(removedKeys, updatedItems);
		if ((spliceResult !== undefined) && this._ownsItems) {
			ArrayUtils.backEvery<T>(MapUtils.toArray(spliceResult.removedItems), destroyForcibly);
		}
		return spliceResult;
	}

	protected _trySplice(removedKeys: string[], updatedItems: Dictionary<T>): Maps.SpliceResult<T> {
		var spliceResult = MapUtils.trySplice(this.json, removedKeys, updatedItems);
		if (spliceResult !== undefined) {
			this._length += MapUtils.getLength(spliceResult.addedItems) - MapUtils.getLength(spliceResult.removedItems);
			return spliceResult;
		}
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
	detectSplice(newItems: Dictionary<T>): Maps.SpliceParams<T> {
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

	/**
	 * @inheritdoc
	 */
	createMapper<U>(config: Maps.MapperConfig<T, U>): Maps.Mapper<T, U> {
		return new AbstractMap.Mapper<T, U>(this, config);
	}

	/**
	 * @inheritdoc
	 */
	createFilterer(config: Maps.FiltererConfig<T>): Maps.Filterer<T> {
		return new AbstractMap.Filterer<T>(this, config);
	}

	/**
	 * @inheritdoc
	 */
	createCounter(config: Collections.CounterConfig<T>): Maps.Counter<T> {
		return new AbstractMap.Counter<T>(this, config);
	}

	/**
	 * @inheritdoc
	 */
	createObserver(config: Collections.ObserverConfig<T>): Maps.Observer<T> {
		return new AbstractMap.Observer<T>(this, config);
	}

	/**
	 * @inheritdoc
	 */
	createOrderer(config?: Collections.OrdererConfig<any>): Maps.Orderer<any> {
		return new AbstractMap.Orderer<any>(this, config);
	}

	/**
	 * @inheritdoc
	 */
	createSorterComparing(config?: Collections.SorterComparingConfig<T>): Maps.SorterComparing<T> {
		return new AbstractMap.SorterComparing<T>(this, config);
	}

	/**
	 * @inheritdoc
	 */
	createIndexer(config: Collections.IndexerConfig<T>): Maps.Indexer<T> {
		return new AbstractMap.Indexer<T>(this, config);
	}

	/**
	 * @inheritdoc
	 */
	createLister(config?: Collections.ListerConfig<any>): Maps.Lister<any> {
		return new AbstractMap.Lister<any>(this, config);
	}

	/**
	 * Creates view synchronizer with map.
	 * Selects appropriate synchronizer implementation automatically.
	 */
	createInserter(config: Maps.InserterConfig<T>): Maps.Inserter<T> {
		return new AbstractMap.Inserter<T>(this, config);
	}
}

export module AbstractMap {
	/**
	 * [[JW.AbstractCollection.Counter|Counter]] implementation for [[JW.Map]].
	 */
	export class Counter<T> extends AbstractCollection.Counter<T> implements Maps.Counter<T> {
		/**
		 * @inheritdoc
		 */
		public source: IMap<T>;

		/**
		 * @inheritdoc
		 */
		constructor(source: IMap<T>, config: Collections.CounterConfig<T>) {
			super(source, config);
		}
	}

	/**
	 * [[JW.AbstractCollection.Filterer|Filterer]] implementation for [[JW.Map]].
	 */
	export class Filterer<T> extends AbstractCollection.Filterer<T> implements Maps.Filterer<T> {
		/**
		 * @inheritdoc
		 */
		source: IMap<T>;

		/**
		 * @inheritdoc
		 */
		target: IMap<T>;

		/**
		 * @inheritdoc
		 */
		constructor(source: IMap<T>, config: Maps.FiltererConfig<T>) {
			super(source, config);
			this.target.trySetAll(source.filter(this._filterItem, this._scope));
		}

		/**
		 * @inheritdoc
		 */
		protected destroyObject() {
			this.target.tryRemoveAll(this.source.getKeys());
			super.destroyObject();
		}
	}

	/**
	 * [[JW.AbstractCollection.Indexer|Indexer]] implementation for [[JW.Map]].
	 */
	export class Indexer<T> extends AbstractCollection.Indexer<T> implements Maps.Indexer<T> {
		/**
		 * @inheritdoc
		 */
		public source: IMap<T>;

		/**
		 * @inheritdoc
		 */
		constructor(source: IMap<T>, config: Collections.IndexerConfig<T>) {
			super(source, config);
		}
	}

	/**
	 * View synchronizer with map. Listens all map events and reduces them to 2 granular functions:
	 * item is added with specific key and item is removed with specific key. In optimization purposes,
	 * you can define a third function: map is cleared
	 * (in case if there is more effective clearing algorithm than iterative items deletion).
	 * Unlike JW.AbstractCollection.Observer, tracks items keys.
	 * Can be used mainly for DOM-element synchronization with map of child elements.
	 *
	 * Use [[JW.AbstractMap.createInserter|createInserter]] method to create the synchronizer.
	 *
	 *     var inserter = map.createInserter({
	 *         addItem: function(el, key) { this.el.find("[elkey=" + key + "]").append(el); },
	 *         removeItem: function(el, key) { el.detach(); },
	 *         scope: this
	 *     });
	 *
	 * The method will select which synchronizer implementation fits better (simple or observable).
	 *
	 * Synchronizer rules:
	 *
	 * - Function [[Inserter.Config.addItem|addItem]]
	 * is called for all items of source map on synchronizer initialization.
	 * - Function [[Inserter.Config.clearItems|clearItems]]
	 * is called for map, or function
	 * [[Inserter.Config.removeItem|removeItem]] is called for
	 * all items of source map on synchronizer destruction.
	 * - On source map reindexing, items keys are synchorinized by callback functions calls.
	 *
	 * @param T Map item type.
	 */
	export class Inserter<T> extends Class implements Maps.Inserter<T> {
		/**
		 * @hidden
		 */
		protected _addItem: (item: T, key: string) => void;

		/**
		 * @hidden
		 */
		protected _removeItem: (item: T, key: string) => void;

		/**
		 * @hidden
		 */
		protected _clearItems: (items: Dictionary<T>) => void;

		/**
		 * @hidden
		 */
		protected _scope: any;


		/**
		 * Creates synchronizer.
		 * [[JW.AbstractMap.createInserter|createInserter]] method is preferred instead.
		 *
		 * @param source Source map.
		 * @param config Configuration.
		 */
		constructor(public source: IMap<T>, config: Maps.InserterConfig<T> = {}) {
			super();
			this._addItem = config.addItem;
			this._removeItem = config.removeItem;
			this._scope = config.scope || this;
			this._clearItems = config.clearItems;
			this._addItems(this.source.getJson());
		}

		/**
		 * @inheritdoc
		 */
		destroyObject() {
			this._doClearItems(this.source.getJson());
			this.source = null;
			this._addItem = null;
			this._removeItem = null;
			this._clearItems = null;
			this._scope = null;
			super.destroyObject();
		}

		/**
		 * @hidden
		 */
		protected _addItems(items: Dictionary<T>) {
			if (!this._addItem) {
				return;
			}
			for (var key in items) {
				this._addItem.call(this._scope, items[key], key);
			}
		}

		/**
		 * @hidden
		 */
		protected _removeItems(items: Dictionary<T>) {
			if (!this._removeItem) {
				return;
			}
			for (var key in items) {
				this._removeItem.call(this._scope, key, items[key]);
			}
		}

		/**
		 * @hidden
		 */
		protected _doClearItems(items: Dictionary<T>) {
			if (MapUtils.isEmpty(items)) {
				return;
			}
			if (this._clearItems) {
				this._clearItems.call(this._scope || this, items);
			} else {
				this._removeItems(items);
			}
		}
	}

	/**
	 * [[JW.AbstractCollection.Lister|Lister]] implementation for [[JW.Map]].
	 */
	export class Lister<T extends IClass> extends AbstractCollection.Lister<T> implements Maps.Lister<T> {
		/**
		 * @inheritdoc
		 */
		public source: IMap<T>;

		/**
		 * @inheritdoc
		 */
		constructor(source: IMap<T>, config: Collections.ListerConfig<T>) {
			super(source, config);
		}
	}

	/**
	 * [[JW.AbstractCollection.Mapper|Mapper]] implementation for [[JW.Map]].
	 */
	export class Mapper<T, U> extends AbstractCollection.Mapper<T, U> implements Maps.Mapper<T, U> {
		/**
		 * @inheritdoc
		 */
		source: IMap<T>;

		/**
		 * @inheritdoc
		 */
		target: IMap<U>;

		/**
		 * @inheritdoc
		 */
		constructor(source: IMap<T>, config: Maps.MapperConfig<T, U>) {
			super(source, config);
			this.target.trySetAll(this._createItems(source.getJson()));
		}

		/**
		 * @inheritdoc
		 */
		protected destroyObject() {
			this._destroyItems(this.target.removeAllVerbose(this.source.getKeys()), this.source.getJson());
			super.destroyObject();
		}

		/**
		 * @hidden
		 */
		protected _createItems(datas: Dictionary<T>): Dictionary<U> {
			var items: Dictionary<U> = {};
			for (var key in datas) {
				items[key] = this._createItem.call(this._scope, datas[key]);
			}
			return items;
		}

		/**
		 * @hidden
		 */
		protected _destroyItems(items: Dictionary<U>, datas: Dictionary<T>) {
			if (this._destroyItem === undefined) {
				return;
			}
			for (var key in items) {
				this._destroyItem.call(this._scope, items[key], datas[key]);
			}
		}
	}

	/**
	 * [[JW.AbstractCollection.Observer|Observer]] implementation for [[JW.Map]].
	 */
	export class Observer<T> extends AbstractCollection.Observer<T> implements Maps.Observer<T> {
		/**
		 * @inheritdoc
		 */
		source: IMap<T>;

		/**
		 * @inheritdoc
		 */
		constructor(source: IMap<T>, config: Collections.ObserverConfig<T>) {
			super(source, config);
		}
	}

	/**
	 * [[JW.AbstractCollection.Orderer|Orderer]] implementation for [[JW.Map]].
	 */
	export class Orderer<T extends IClass> extends AbstractCollection.Orderer<T> implements Maps.Orderer<T> {
		/**
		 * @inheritdoc
		 */
		public source: IMap<T>;

		/**
		 * @inheritdoc
		 */
		constructor(source: IMap<T>, config: Collections.OrdererConfig<T>) {
			super(source, config);
		}
	}

	/**
	 * [[JW.AbstractCollection.SorterComparing|SorterComparing]] implementation for [[JW.Map]].
	 */
	export class SorterComparing<T> extends AbstractCollection.SorterComparing<T> implements Maps.SorterComparing<T> {
		/**
		 * @inheritdoc
		 */
		public source: IMap<T>;

		/**
		 * @inheritdoc
		 */
		constructor(source: IMap<T>, config: Collections.SorterComparingConfig<T>) {
			super(source, config);
		}
	}
}
