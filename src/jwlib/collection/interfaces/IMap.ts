import {apply, destroyForcibly, Dictionary, Proxy} from '../../core/Core';
import {Destroyable} from '../../core/Destroyable';
import {IClass} from '../../core/IClass';
import {ICollection} from './ICollection';
import {IIndexedCollection} from './IIndexedCollection';
import * as Collection from './ICollection';

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
export interface IMap<T> extends IIndexedCollection<string, T> {
	/**
	 * Function which returns unique key of an item in this collection.
	 * [[detectReindex]],
	 * [[performReindex]] algorithms.
	 * Defaults to [[iid]], so
	 * if collection contains instances of JW.Class, you are in a good shape.
	 */
	getKey: (item: T) => any;

	/**
	 * @inheritdoc
	 */
	ownItems(): IMap<T>;

	/**
	 * @inheritdoc
	 */
	getLength(): number;

	/**
	 * @inheritdoc
	 */
	isEmpty(): boolean;

	/**
	 * @inheritdoc
	 */
	getFirst(): T;

	/**
	 * @inheritdoc
	 */
	getFirstKey(): string;

	/**
	 * @inheritdoc
	 */
	get(key: string): T;

	/**
	 * Returns item map - internal collection representation.
	 *
	 * **Caution: doesn't make a copy - please don't modify.**
	 */
	getJson(): Dictionary<T>;

	/**
	 * @inheritdoc
	 */
	getKeys(): string[];

	/**
	 * @inheritdoc
	 */
	containsItem(item: T): boolean;

	/**
	 * @inheritdoc
	 */
	every(callback: (item: T, key: string) => boolean, scope?: any): boolean;

	/**
	 * @inheritdoc
	 */
	toSorted(callback?: (item: T, key: string) => any, scope?: any, order?: number): T[];

	/**
	 * @inheritdoc
	 */
	toSortedComparing(compare?: (t1: T, t2: T, k1: string, k2: string) => number, scope?: any, order?: number): T[];

	/**
	 * @inheritdoc
	 */
	getSortingKeys(callback?: (item: T, key: string) => any, scope?: any, order?: number): string[];

	/**
	 * @inheritdoc
	 */
	getSortingKeysComparing(compare?: (t1: T, t2: T, k1: string, k2: string) => number, scope?: any, order?: number): string[];

	/**
	 * @inheritdoc
	 */
	filter(callback: (item: T, key: string) => boolean, scope?: any): Dictionary<T>;

	/**
	 * @inheritdoc
	 */
	$filter(callback: (item: T, key: string) => boolean, scope?: any): IMap<T>;

	/**
	 * @inheritdoc
	 */
	$$filter(callback: (item: T) => boolean, scope?: any): IMap<T>;

	/**
	 * @inheritdoc
	 */
	count(callback: (item: T, key: string) => boolean, scope?: any): number;

	/**
	 * @inheritdoc
	 */
	map<U>(callback: (item: T, key: string) => U, scope?: any): Dictionary<U>;

	/**
	 * @inheritdoc
	 */
	$map<U>(callback: (item: T, key: string) => U, scope?: any): IMap<U>;

	/**
	 * @inheritdoc
	 */
	$$mapValues<U>(callback: (item: T) => U, scope?: any): IMap<U>;

	/**
	 * @inheritdoc
	 */
	$$mapObjects<U extends Destroyable>(callback: (item: T) => U, scope?: any): IMap<U>;

	/**
	 * @inheritdoc
	 */
	toMap(): Dictionary<T>;

	/**
	 * @inheritdoc
	 */
	asMap(): Dictionary<T>;

	/**
	 * @inheritdoc
	 */
	$asMap(): IMap<T>;

	/**
	 * Replaces item with specified key. If map doesn't contain such key, new item is added.
	 * @returns Proxy of the replaced item. If collection is not modified, returns undefined.
	 */
	trySet(item: T, key: string): Proxy<T>;

	/**
	 * Adds or replaces a bunch of items.
	 */
	setAll(items: Dictionary<T>);

	/**
	 * Low-performance alternative to [[setAll]] with verbose result set.
	 * @returns Result of internal [[splice]] method call.
	 */
	setAllVerbose(items: Dictionary<T>): SpliceResult<T>;

	/**
	 * Adds or replaces a bunch of items.
	 * @returns Result of internal [[splice]] method call.
	 * If collection is not modified, returns undefined.
	 */
	trySetAll(items: Dictionary<T>): SpliceResult<T>;

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
	 * Removes a bunch of items from map.
	 */
	removeAll(keys: string[]);

	/**
	 * Low-performance alternative to [[removeAll]] with verbose result set.
	 * @returns The removed items.
	 */
	removeAllVerbose(keys: string[]): Dictionary<T>;

	/**
	 * Low-performance alternative to [[removeAll]] with verbose result set.
	 * @returns The removed items.
	 */
	$removeAllVerbose(keys: string[]): IMap<T>;

	/**
	 * Removes a bunch of items from map.
	 * @returns The removed items.
	 * If collection is not modified, returns undefined.
	 */
	tryRemoveAll(keys: string[]): Dictionary<T>;

	/**
	 * @inheritdoc
	 */
	removeItems(items: T[]);

	/**
	 * @inheritdoc
	 */
	clear(): Dictionary<T>;

	/**
	 * @inheritdoc
	 */
	$clear(): IMap<T>;

	/**
	 * @inheritdoc
	 */
	tryClear(): Dictionary<T>;

	/**
	 * Removes and adds bunches of items in map. Universal optimized granular operation of removal/insertion.
	 * @param removedKeys Keys of items to remove.
	 * @param updatedItems Items to add/replace.
	 * @returns Splice result. Never returns null or undefined.
	 */
	splice(removedKeys: string[], updatedItems: Dictionary<T>): SpliceResult<T>;

	/**
	 * Removes and adds bunches of items in map. Universal optimized granular operation of removal/insertion.
	 * @param removedKeys Keys of items to remove.
	 * @param updatedItems Items to add/replace.
	 * @returns Splice result.
	 * If collection is not modified, returns undefined.
	 */
	trySplice(removedKeys: string[], updatedItems: Dictionary<T>): SpliceResult<T>;

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
	 * Detects [[splice]] method arguments to adjust map contents to **newItems**.
	 * Determines which item bunches should be removed and which ones should be inserted/replaced, and their keys.
	 * @param newItems New map contents.
	 * @returns [[splice]] method arguments. If no method call required, returns undefined.
	 */
	detectSplice(newItems: Dictionary<T>): SpliceParams<T>;

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
	detectReindex(newItems: Dictionary<T>, getKey?: (item: T) => any, scope?: any): Dictionary<string>;

	/**
	 * Adjusts map contents to **newItems** using [[detectSplice]] and
	 * [[splice]] methods.
	 * @param newItems New map contents.
	 */
	performSplice(newItems: Dictionary<T>);

	/**
	 * Adjusts map contents to **newItems** using [[detectReindex]] and
	 * [[reindex]] methods.
	 * @param newItems New map contents.
	 * @param getKey Function which returns unique key of an item in this collection.
	 * Defaults to [[getKey]].
	 * If collection consists of instances of JW.Class, then you are in a good shape.
	 * @param scope **getKey** call scope. Defaults to collection itself.
	 */
	performReindex(newItems: Dictionary<T>, getKey?: (item: T) => any, scope?: any);

	/**
	 * @hidden
	 */
	getInverted(): Dictionary<string>;

	/**
	 * Checks for equality (===) to another map, item by item.
	 */
	equal(map: Dictionary<T>): boolean;

	/**
	 * @inheritdoc
	 */
	createEmpty<U>(): IMap<U>;

	/**
	 * @inheritdoc
	 */
	createMapper<U>(config: MapperConfig<T, U>): Mapper<T, U>;

	/**
	 * @inheritdoc
	 */
	createFilterer(config: FiltererConfig<T>): Filterer<T>;

	/**
	 * @inheritdoc
	 */
	createCounter(config: Collection.CounterConfig<T>): Counter<T>;

	/**
	 * @inheritdoc
	 */
	createObserver(config: Collection.ObserverConfig<T>): Observer<T>;

	/**
	 * @inheritdoc
	 */
	createOrderer(config?: Collection.OrdererConfig<any>): Orderer<any>;

	/**
	 * @inheritdoc
	 */
	createSorterComparing(config?: Collection.SorterComparingConfig<T>): SorterComparing<T>;

	/**
	 * @inheritdoc
	 */
	createIndexer(config: Collection.IndexerConfig<T>): Indexer<T>;

	/**
	 * @inheritdoc
	 */
	createLister(config?: Collection.ListerConfig<any>): Lister<any>;

	/**
	 * Creates view synchronizer with map.
	 * Selects appropriate synchronizer implementation automatically.
	 */
	createInserter(config: InserterConfig<T>): Inserter<T>;
}

/**
 * [[JW.AbstractMap.splice]] method arguments.
 * Returned by [[JW.AbstractMap.detectSplice]] method.
 *
 * @param T Item type.
 */
export interface SpliceParams<T> {
	/**
	 * Keys of items to remove.
	 */
	removedKeys: string[];

	/**
	 * Items to add/replace.
	 */
	updatedItems: Dictionary<T>;
}

/**
 * [[JW.AbstractMap.splice]] method result.
 *
 * @param T Item type.
 */
export interface SpliceResult<T> {
	removedItems: Dictionary<T>;
	addedItems: Dictionary<T>;
}

/**
 * [[JW.AbstractCollection.Counter|Counter]] implementation for [[JW.Map]].
 */
export interface Counter<T> extends Collection.Counter<T> {
	/**
	 * @inheritdoc
	 */
	source: IMap<T>;
}

/**
 * [[JW.AbstractCollection.Filterer|Filterer]] implementation for [[JW.Map]].
 */
export interface Filterer<T> extends Collection.Filterer<T> {
	/**
	 * @inheritdoc
	 */
	source: IMap<T>;

	/**
	 * @inheritdoc
	 */
	target: IMap<T>;
}

/**
 * @inheritdoc
 */
export interface FiltererConfig<T> extends Collection.FiltererConfig<T> {
	/**
	 * @inheritdoc
	 */
	target?: IMap<T>;
}

/**
 * [[JW.AbstractCollection.Indexer|Indexer]] implementation for [[JW.Map]].
 */
export interface Indexer<T> extends Collection.Indexer<T> {
	/**
	 * @inheritdoc
	 */
	source: IMap<T>;
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
export interface Inserter<T> extends IClass {
}

/**
 * [[JW.AbstractMap.Inserter]] configuration.
 *
 * @param T Collection item type.
 */
export interface InserterConfig<T> {
	/**
	 * Function to call on item adding to specific position in map.
	 */
	addItem?: (item: T, key: string) => void;

	/**
	 * Function to call on item removing from specific position in map.
	 */
	removeItem?: (item: T, key: string) => void;

	/**
	 * Function to call on map cleanup.
	 * By default, calls [[removeItem]] for all map items.
	 */
	clearItems?: (items: Dictionary<T>) => void;

	/**
	 * [[addItem]], [[removeItem]] and
	 * [[clearItems]] call scope.
	 * Defaults to synchronizer itself.
	 */
	scope?: any;
}

/**
 * [[JW.AbstractCollection.Lister|Lister]] implementation for [[JW.Map]].
 */
export interface Lister<T extends IClass> extends Collection.Lister<T> {
	/**
	 * @inheritdoc
	 */
	source: IMap<T>;
}

/**
 * [[JW.AbstractCollection.Mapper|Mapper]] implementation for [[JW.Map]].
 */
export interface Mapper<T, U> extends Collection.Mapper<T, U> {
	/**
	 * @inheritdoc
	 */
	source: IMap<T>;

	/**
	 * @inheritdoc
	 */
	target: IMap<U>;
}

/**
 * @inheritdoc
 */
export interface MapperConfig<T, U> extends Collection.MapperConfig<T, U> {
	/**
	 * @inheritdoc
	 */
	target?: IMap<U>;
}

/**
 * [[JW.AbstractCollection.Observer|Observer]] implementation for [[JW.Map]].
 */
export interface Observer<T> extends Collection.Observer<T> {
	/**
	 * @inheritdoc
	 */
	source: IMap<T>;
}

/**
 * [[JW.AbstractCollection.Orderer|Orderer]] implementation for [[JW.Map]].
 */
export interface Orderer<T extends IClass> extends Collection.Orderer<T> {
	/**
	 * @inheritdoc
	 */
	source: IMap<T>;
}

/**
 * [[JW.AbstractCollection.SorterComparing|SorterComparing]] implementation for [[JW.Map]].
 */
export interface SorterComparing<T> extends Collection.SorterComparing<T> {
	/**
	 * @inheritdoc
	 */
	source: IMap<T>;
}
