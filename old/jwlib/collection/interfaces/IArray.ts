import {array} from '../../core/globals';
import {byMethod, def, destroyForcibly, Proxy} from '../../core/Core';
import {Destroyable} from '../../core/Destroyable';
import {IClass} from '../../core/IClass';
import {ICollection} from './ICollection';
import {IIndexedCollection} from './IIndexedCollection';
import * as Collection from './ICollection';

/**
 * Array is ordered collection. Each item of array has an index. Index of first item is 0,
 * index of each next one is higher by 1.
 *
 * # Array methods
 *
 * **Difference compared to [[JW.IndexedCollection]] is in bold.**
 *
 * Content retrieving:
 *
 * * [[getLength]] - Returns count of items in collection.
 * For observable collections, **length** property may come
 * in handy if you want to track collection length dynamically.
 * * [[isEmpty]] - Checks collection for emptiness.
 * * [[get]] - Returns collection item by index.
 * * [[getFirst]] - Returns first item in collection.
 * * **[[getLast]] - Returns last item in collection.**
 * * [[getFirstKey]] - Returns index of first item in collection.
 * * **[[getLastKey]] - Returns index of last item in collection.**
 * * [[getKeys]], [[$getKeys]] - Returns array of all item indexes.
 * * [[containsItem]] - Does collection contain the item?
 * * [[containsKey]] - Does collection contain the index?
 * * [[keyOf]] - Returns item index. If item is not found, returns undefined.
 * * **[[indexOf]] - Returns item index. If item is not found, return -1.**
 * * **[[getItems]] - Returns internal representation of array.**
 * * **[[binarySearch]] - Finds the index by binary search.**
 *
 * Iteration algorithms:
 *
 * * [[every]] - Checks all items by criteria.
 * Returns true if all items match the criteria.
 * * [[some]] - Checks each item by criteria.
 * Returns true if some item matches the criteria.
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
 * * **[[backEvery]] - Checks all items by criteria in backward order.**
 * * **[[merge]], [[$merge]],
 * [[$$merge]] - *suitable if array consists of JW.AbstractArray instances only.*
 * Builds array consisting of items of subarrays in the same order.**
 * * **[[toReversed]], [[$toReversed]],
 * [[$$toReversed]] -
 * Builds array consisting of collection items in reverse order.**
 *
 * Collection modification:
 *
 * * **[[add]], [[tryAdd]] - Inserts an item.**
 * * **[[addAll]], [[tryAddAll]] - Inserts item range.**
 * * [[set]], [[trySet]] - Replaces an item by index.
 * * [[remove]], [[tryRemove]] - Removes an item by index.
 * * **[[removeAll]], [[$removeAll]],
 * [[tryRemoveAll]] - Removes item range.**
 * * [[removeItem]] - Removes first occurency of an item in collection.
 * * [[removeItems]] - Removes all occurencies of items in collection.
 * * **[[pop]] - Removes last item.**
 * * **[[move]], [[tryMove]] - Moves item.**
 * * [[clear]], [[$clear]],
 * [[tryClear]] - Clears collection.
 * * **[[splice]], [[trySplice]] - Removes/inserts item ranges.**
 * * **[[reorder]], [[tryReorder]] - Reorders items.**
 * * **[[sort]], [[sortComparing]] - Sorts array.**
 * * **[[reverse]] - Reverses item order in array.**
 * * **[[performSplice]] - Adjusts contents using [[splice]]. method.**
 * * **[[performFilter]] - Filters contents using [[splice]]. method.**
 * * **[[performReorder]] - Adjusts contents using [[reorder]]. method.**
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
 * * **[[createInserter]] - Creates view synchronizer with array.**
 * * **[[createMerger]] - Creates arrays merger.
 * Extended version of [[$$merge]] method.**
 * * **[[createReverser]] - Creates array reverser.
 * Extended version of [[$$toReversed]] method.**
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
 * * **[[detectFilter]] - Detects removeParamsList argument of [[splice]] method to filter contents.**
 * * **[[detectReorder]] - Detects [[reorder]] method arguments to adjust contents.**
 * * **[[detectSort]] - Detects [[reorder]] method arguments to sort by indexer.**
 * * **[[detectSortComparing]] - Detects [[reorder]] method arguments to sort by comparer.**
 * * **[[collapse]] - Collapses multi-dimensional array.**
 * * **[[equal]] - Checks for equality to another array.**
 *
 * All the same algorithms are also available for native JavaScript Array,
 * see [[JW.Array]] static methods.
 *
 * @param T Array item type.
 */
export interface IArray<T> extends IIndexedCollection<number, T> {
	/**
	 * Function which returns unique key of an item in this collection.
	 * Function is used in [[detectSplice]],
	 * [[performSplice]],
	 * [[detectReorder]],
	 * [[performReorder]] algorithms.
	 * Defaults to [[iid]], so
	 * if collection contains instances of JW.Class, you are in a good shape.
	 */
	getKey: (item: T) => any;

	/**
	 * @inheritdoc
	 */
	ownItems(): IArray<T>;

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
	 * Returns the last collection item. If collection is empty, returns undefined.
	 */
	getLast(): T;

	/**
	 * @inheritdoc
	 */
	getFirstKey(): number;

	/**
	 * Returns index of last collection item. If collection is empty, returns undefined.
	 */
	getLastKey(): number;

	/**
	 * @inheritdoc
	 */
	get(index: number): T;

	/**
	 * Returns item array - internal collection representation.
	 *
	 * **Caution: doesn't make a copy - please don't modify.**
	 */
	getItems(): T[];

	/**
	 * Returns array of indexes of all collection items, i.e. array `[0, 1, ... , length - 1]`.
	 */
	getKeys(): number[];

	/**
	 * @inheritdoc
	 */
	containsItem(item: T): boolean;

	/**
	 * @inheritdoc
	 */
	every(callback: (item: T, index: number) => boolean, scope?: any): boolean;

	/**
	 * @inheritdoc
	 */
	toSorted(callback?: (item: T, key: number) => any, scope?: any, order?: number): T[];

	/**
	 * @inheritdoc
	 */
	toSortedComparing(compare?: (t1: T, t2: T, k1: number, k2: number) => number, scope?: any, order?: number): T[];

	/**
	 * @inheritdoc
	 */
	getSortingKeys(callback?: (item: T, key: number) => any, scope?: any, order?: number): number[];

	/**
	 * @inheritdoc
	 */
	getSortingKeysComparing(compare?: (t1: T, t2: T, k1: number, k2: number) => number, scope?: any, order?: number): number[];

	/**
	 * @inheritdoc
	 */
	filter(callback: (item: T, index: number) => boolean, scope?: any): T[];

	/**
	 * @inheritdoc
	 */
	$filter(callback: (item: T, index: number) => boolean, scope?: any): IArray<T>;

	/**
	 * @inheritdoc
	 */
	$$filter(callback: (item: T) => boolean, scope?: any): IArray<T>;

	/**
	 * @inheritdoc
	 */
	count(callback: (item: T, index: number) => boolean, scope?: any): number;

	/**
	 * @inheritdoc
	 */
	map<U>(callback: (item: T, index: number) => U, scope?: any): U[];

	/**
	 * @inheritdoc
	 */
	$map<U>(callback: (item: T, index: number) => U, scope?: any): IArray<U>;

	/**
	 * @inheritdoc
	 */
	$$mapValues<U>(callback: (item: T) => U, scope?: any): IArray<U>;

	/**
	 * @inheritdoc
	 */
	$$mapObjects<U extends Destroyable>(callback: (item: T) => U, scope?: any): IArray<U>;

	/**
	 * @inheritdoc
	 */
	toArray(): T[];

	/**
	 * @inheritdoc
	 */
	asArray(): T[];

	/**
	 * @inheritdoc
	 */
	$asArray(): IArray<T>;

	/**
	 * Inserts an item to array.
	 *
	 * @param item Item to insert.
	 * @param index Index of an item before which to insert new one.
	 * By default, appends the item to the end of collection.
	 */
	add(item: T, index?: number);

	/**
	 * Inserts an item to array.
	 *
	 * @param item Item to insert.
	 * @param index Index of an item before which to insert new one.
	 * By default, appends the item to the end of collection.
	 * @returns Always returns true.
	 */
	tryAdd(item: T, index?: number): boolean;

	/**
	 * Inserts item range to array.
	 *
	 * @param items Items to insert.
	 * @param index Index of an item before which to insert new ones.
	 * By default, appends the items to the end of collection.
	 */
	addAll(items: T[], index?: number);

	/**
	 * Inserts item range to array.
	 *
	 * @param items Items to insert.
	 * @param index Index of an item before which to insert new ones.
	 * By default, appends the items to the end of collection.
	 * @returns Always returns true.
	 */
	tryAddAll(items: T[], index?: number): boolean;

	/**
	 * Replaces item at specified position.
	 * If array doesn't contain such index, it will demolish the application.
	 *
	 * @returns Proxy of the replaced item. If collection is not modified, returns undefined.
	 */
	trySet(item: T, index: number): Proxy<T>;

	/**
	 * Removes item at specified position.
	 * If array doesn't contain such index, it will demolish the application.
	 *
	 * @returns The removed item. If collection is not modified, returns undefined.
	 */
	tryRemove(index: number): T;

	/**
	 * Removes item range from array.
	 *
	 * @param index Index of first item to remove.
	 * @param count Count of items to remove.
	 * @returns The removed items.
	 */
	removeAll(index: number, count: number): T[];

	/**
	 * Removes item range from array.
	 *
	 * @param index Index of first item to remove.
	 * @param count Count of items to remove.
	 * @returns The removed items.
	 */
	$removeAll(index: number, count: number): IArray<T>;

	/**
	 * Removes item range from array.
	 *
	 * @param index Index of first item to remove.
	 * @param count Count of items to remove.
	 * @returns The removed items. If collection is not modified, returns undefined.
	 */
	tryRemoveAll(index: number, count: number): T[];

	/**
	 * @inheritdoc
	 */
	removeItems(items: T[]);

	/**
	 * Moves an item inside array.
	 *
	 * @param fromIndex Item index to move.
	 * @param toIndex Index to move to.
	 * @returns The moved item.
	 */
	move(fromIndex: number, toIndex: number): T;

	/**
	 * Moves an item inside array.
	 *
	 * @param fromIndex Item index to move.
	 * @param toIndex Index to move to.
	 * @returns The moved item. If collection is not modified, returns undefined.
	 */
	tryMove(fromIndex: number, toIndex: number): T;

	/**
	 * @inheritdoc
	 */
	clear(): T[];

	/**
	 * @inheritdoc
	 */
	$clear(): IArray<T>;

	/**
	 * @inheritdoc
	 */
	tryClear(): T[];

	/**
	 * Removes and inserts item ranges. Universal optimized granular operation of removal/insertion.
	 *
	 * @param removeParamsList Array of segments to remove sorted by index asc. Segments are removed in backward order.
	 * @param addParamsList Array of segments to insert sorted by index asc. Segments are inserted in forward order.
	 * @returns Splice result. Never returns null or undefined.
	 */
	splice(removeParamsList: IndexCount[], addParamsList: IndexItems<T>[]): SpliceResult<T>;

	/**
	 * Removes and inserts item ranges. Universal optimized granular operation of removal/insertion.
	 *
	 * @param removeParamsList Array of segments to remove sorted by index asc. Segments are removed in backward order.
	 * @param addParamsList Array of segments to insert sorted by index asc. Segments are inserted in forward order.
	 * @returns Splice result. If collection is not modified, returns undefined.
	 */
	trySplice(removeParamsList: IndexCount[], addParamsList: IndexItems<T>[]): SpliceResult<T>;

	/**
	 * Reorders array items.
	 *
	 * @param indexArray Index array. Item with index `i` will be moved to index `indexArray[i]`.
	 * Must contain all indexes from 0 to (length - 1).
	 */
	reorder(indexArray: number[]);

	/**
	 * Reorders array items.
	 *
	 * @param indexArray Index array. Item with index `i` will be moved to index `indexArray[i]`.
	 * Must contain all indexes from 0 to (length - 1).
	 * @returns Old array contents. If collection is not modified, returns undefined.
	 */
	tryReorder(indexArray: number[]): T[];

	/**
	 * Detects [[splice]] method arguments to adjust array contents to **newItems**.
	 * Determines which item ranges should be removed and which ones should be inserted.
	 * All items must have unique **getKey** function result.
	 * If items don't have unique key, probably [[detectFilter]] method may help,
	 * because it doesn't require item uniquiness.
	 *
	 * @param newItems New array contents.
	 * @param getKey Function which returns unique key of an item in this collection.
	 * Defaults to [[getKey]].
	 * If collection consists of instances of JW.Class, then you are in a good shape.
	 * @param scope **getKey** call scope. Defaults to collection itself.
	 * @returns [[splice]] method arguments. If no method call required, returns undefined.
	 */
	detectSplice(newItems: T[], getKey?: (item: T) => any, scope?: any): SpliceParams<T>;

	/**
	 * Detects **removeParamsList** arguments of [[splice]] to adjust array contents to **newItems**.
	 * Determines which item ranges should be removed.
	 * Doesn't assume items insertion - try [[detectSplice]] if that's the case.
	 * In advantage to [[detectSplice]], doesn't require item uniquiness.
	 *
	 * @param newItems New array contents.
	 * @returns **removeParamsList** argument of [[splice]] method.
	 * If no method call required, returns undefined.
	 */
	detectFilter(newItems: T[]): IndexCount[];

	/**
	 * Detects [[reorder]] method arguments to adjust array contents to **newItems**.
	 * Determines where to move all items.
	 * If **newItems** contents differ from collection contents,
	 * you should pray to Gods that application still works well.
	 *
	 * @param newItems New array contents.
	 * @param getKey Function which returns unique key of an item in this collection.
	 * Defaults to [[getKey]].
	 * If collection consists of instances of JW.Class, then it's all right.
	 * @param scope **getKey** call scope. Defaults to collection itself.
	 * @returns **indexArray** argument of [[reorder]] method.
	 * If no method call required, returns undefined.
	 */
	detectReorder(newItems: T[], getKey?: (item: T) => any, scope?: any): number[];

	/**
	 * Detects [[reorder]] method arguments to sort array contents by result of
	 * **callback** call for each item.
	 *
	 * @param callback Indexer function. Must return a comparable value, compatible with
	 * [[JW.cmp]]. Returns item itself by default.
	 * @param scope **callback** call scope. Defaults to collection itself.
	 * @param order Sorting order. Positive number for ascending sorting, negative for descending sorting.
	 * @returns **indexArray** argument of [[reorder]] method.
	 * If no method call required, returns undefined.
	 */
	detectSort(callback?: (item: T, index: number) => any, scope?: any, order?: number): number[];

	/**
	 * Detects [[reorder]] method arguments to sort array contents by comparer.
	 *
	 * @param compare Comparer function. Should return positive value if t1 > t2;
	 * negative value if t1 < t2; 0 if t1 == t2.
	 * Defaults to [[JW.cmp]]
	 * @param scope **comparer** call scope. Defaults to collection itself.
	 * @param order Sorting order. Positive number for ascending sorting, negative for descending sorting.
	 * @returns **indexArray** argument of [[reorder]] method.
	 * If no method call required, returns undefined.
	 */
	detectSortComparing(compare?: (t1: T, t2: T, i1: number, i2: number) => number, scope?: any, order?: number): number[];

	/**
	 * Adjusts array contents to **newItems** using [[detectSplice]] and
	 * [[splice]] methods.
	 * All items must have unique **getKey** function result.
	 * If items don't have unique key, probably [[detectFilter]] method may help,
	 * because it doesn't require item uniquiness.
	 *
	 * @param newItems New array contents.
	 * @param getKey Function which returns unique key of an item in this collection.
	 * Defaults to [[getKey]].
	 * If collection consists of instances of JW.Class, then you are in a good shape.
	 * @param scope **getKey** call scope. Defaults to collection itself.
	 */
	performSplice(newItems: T[], getKey?: (item: T) => any, scope?: any);

	/**
	 * Adjusts array contents to **newItems** using [[detectFilter]] and
	 * [[splice]] methods.
	 * Only removes items.
	 * Doesn't assume items insertion - try [[detectSplice]] if that's the case.
	 * In advantage to [[detectSplice]], doesn't require item uniquiness.
	 *
	 * @param newItems New array contents.
	 */
	performFilter(newItems: T[]);

	/**
	 * Adjusts array contents to **newItems** using [[detectReorder]] and
	 * [[reorder]] methods.
	 *
	 * @param newItems New array contents.
	 * @param getKey Function which returns unique key of an item in this collection.
	 * Defaults to [[getKey]].
	 * If collection consists of instances of JW.Class, then it's all right.
	 * @param scope **getKey** call scope. Defaults to collection itself.
	 */
	performReorder(newItems: T[], getKey?: (item: T) => any, scope?: any);

	/**
	 * Sorts array by result of **callback** function call for each item.
	 *
	 * @param callback Indexer function. Must return a comparable value, compatible with
	 * [[JW.cmp]]. Returns item itself by default.
	 * @param scope **callback** call scope. Defaults to collection itself.
	 * @param order Sorting order. Positive number for ascending sorting, negative for descending sorting.
	 */
	sort(callback?: (item: T, index: number) => any, scope?: any, order?: number);

	/**
	 * Sorts array by comparer.
	 *
	 * @param compare Comparer function. Should return positive value if t1 > t2;
	 * negative value if t1 < t2; 0 if t1 == t2.
	 * Defaults to [[JW.cmp]]
	 * @param scope **comparer** call scope. Defaults to collection itself.
	 * @param order Sorting order. Positive number for ascending sorting, negative for descending sorting.
	 */
	sortComparing(compare?: (t1: T, t2: T, i1: number, i2: number) => number, scope?: any, order?: number);

	/**
	 * *Suitable if array consists of JW.AbstractArray instances only.*
	 * Builds array consisting of subarray items in the same order.
	 * Current array is not modified.
	 *
	 * @returns Merged array.
	 */
	merge(): any[];

	/**
	 * *Suitable if array consists of JW.AbstractArray instances only.*
	 * Builds array consisting of subarray items in the same order.
	 * Current array is not modified.
	 *
	 * @returns Merged array.
	 */
	$merge(): IArray<any>;

	/**
	 * *Suitable if array consists of JW.AbstractArray instances only.*
	 * Builds array consisting of subarray items in the same order.
	 * Current array is not modified.
	 * Starts continuous synchronization,
	 * i.e. creates [[JW.abstractarray.Merger]] implicitly.
	 *
	 * @returns Merged array.
	 */
	$$merge(): IArray<any>;

	/**
	 * Reverses item order in array. Modifies the array itself.
	 */
	reverse();

	/**
	 * Builds a new array containing items of this array in reversed order.
	 * Current array is not modified.
	 *
	 * @returns Reversed array.
	 */
	toReversed(): T[];

	/**
	 * Builds a new array containing items of this array in reversed order.
	 * Current array is not modified.
	 *
	 * @returns Reversed array.
	 */
	$toReversed(): IArray<T>;

	/**
	 * Builds a new array containing items of this array in reversed order.
	 * Current array is not modified.
	 * If this collection is observable, starts continuous synchronization,
	 * i.e. creates [[JW.abstractarray.Reverser]] implicitly.
	 *
	 * @returns Reversed array.
	 */
	$$toReversed(): IArray<T>;

	/**
	 * Checks for equality (===) to another array, item by item.
	 *
	 * @param arr Another array.
	 * @returns Arrays are equal.
	 */
	equal(arr: T[]): boolean;

	/**
	 * Collapses multi-dimentional array.
	 *
	 * @param depth Dimentions to collapse.
	 * @returns Collapsed array.
	 */
	collapse(depth: number): any[];

	/**
	 * Returns item index in this collection.
	 *
	 * @returns Item index. If item doesn't exist, returns -1.
	 */
	indexOf(item: T): number;

	/**
	 * Checks all items against criteria in backward order.
	 *
	 * Returns true if criteria returns !== false for all collection items.
	 *
	 * Algorithms iterates items sequentially, and stops after first item not matching the criteria.
	 *
	 * @param callback Criteria callback.
	 * @param scope **callback** call scope. Defaults to collection itself.
	 */
	backEvery(callback: (item: T, index: number) => boolean, scope?: any): boolean;

	/**
	 * Removes last array item. Does nothing if array is empty.
	 *
	 * @returns The removed item or undefined.
	 */
	pop(): T;

	/**
	 * Determines index of first item which is more (or less if **order** < 0) than specified value by **compare** function,
	 * using binary search. Array must be sorted by **compare** function.
	 * Can be used for item insertion easily.
	 * If you want to use this method for item removal, you must look at previous item and compare it to **value** first.
	 *
	 * @param compare Comparer function. Should return positive value if t1 > t2;
	 * negative value if t1 < t2; 0 if t1 == t2.
	 * Defaults to [[JW.cmp]]
	 * @param scope **comparer** call scope. Defaults to collection itself.
	 * @param order Sorting order. Positive number for ascending sorting, negative for descending sorting.
	 * @returns Item index.
	 */
	binarySearch(value: T, compare?: (t1: T, t2: T) => number, scope?: any, order?: number): number;

	/**
	 * @inheritdoc
	 */
	createEmpty<U>(): IArray<U>;

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
	 * Creates view synchronizer with array.
	 * Selects appropriate synchronizer implementation automatically.
	 */
	createInserter(config: InserterConfig<T>): Inserter<T>;

	/**
	 * Creates arrays merger.
	 * Selects appropriate synchronizer implementation automatically.
	 */
	createMerger<U>(config?: MergerConfig<U>): Merger<U>;

	// type definition in argument breaks compiler for some reason
	/**
	 * @hidden
	 */
	createMergerBunch(merger: any): IClass;

	/**
	 * Creates array reverser.
	 * Selects appropriate synchronizer implementation automatically.
	 */
	createReverser(config?: ReverserConfig<T>): Reverser<T>;

	/**
	 * @hidden
	 */
	_createMergerTarget<T>(): IArray<T>;
}

/**
 * "Index-count" pair. Used in [[JW.AbstractArray.splice|splice]] method arguments
 * to specify item segments to remove.
 */
export interface IndexCount {
	index: number;
	count: number;

	/**
	 * Clones pair.
	 */
	clone(): IndexCount;
}

/**
 * "Index-items" pair. Used in [[JW.AbstractArray.splice|splice]] method arguments
 * to specify item segments to insert, and in [[JW.AbstractArray.SpliceResult|SpliceResult]]
 * class to specify removed and added item segments.
 *
 * @param T Item type.
 */
export interface IndexItems<T> {
	index: number;
	items: T[];

	/**
	 * Converts to "index-count" pair.
	 */
	toIndexCount(): IndexCount;

	/**
	 * Clones pair.
	 */
	clone(): IndexItems<T>;
}

/**
 * [[JW.AbstractArray.splice|splice]] method arguments.
 * Returned by [[JW.AbstractArray.detectSplice|detectSplice]] method.
 *
 * @param T Item type.
 */
export interface SpliceParams<T> {
	/**
	 * Segments to remove.
	 */
	removeParamsList: IndexCount[];

	/**
	 * Segments to add.
	 */
	addParamsList: IndexItems<T>[];
}

/**
 * [[JW.AbstractArray.splice|splice]] method result.
 *
 * @param T Item type.
 */
export interface SpliceResult<T> {
	/**
	 * Old array contents.
	 */
	oldItems: T[];

	/**
	 * Removed item segments.
	 */
	removedItemsList: IndexItems<T>[];

	/**
	 * @param addedItemsList Added item segments.
	 */
	addedItemsList: IndexItems<T>[];

	/**
	 * Returns plain array of removed items.
	 */
	getRemovedItems(): T[];

	/**
	 * Returns plain array of added items.
	 */
	getAddedItems(): T[];

	/**
	 * Converts removed item segments to "index-count" pairs.
	 */
	getRemoveParamsList(): IndexCount[];

	/**
	 * Checks if [[JW.AbstractArray.splice|splice]] method call didn't change the array.
	 * @returns Array hasn't been changed.
	 */
	isEmpty(): boolean;
}

/**
 * [[JW.AbstractCollection.Counter|Counter]] implementation for [[JW.Array]].
 */
export interface Counter<T> extends Collection.Counter<T> {
	/**
	 * @inheritdoc
	 */
	source: IArray<T>;
}

/**
 * [[JW.AbstractCollection.Filterer|Filterer]] implementation for [[JW.Array]].
 */
export interface Filterer<T> extends Collection.Filterer<T> {
	/**
	 * @inheritdoc
	 */
	source: IArray<T>;

	/**
	 * @inheritdoc
	 */
	target: IArray<T>;

	/**
	 * Changes filterer configuration and refilters target collection.
	 * @param config Options to modify.
	 */
	reconfigure(config: FiltererReconfig<T>);

	/**
	 * Refilters target collection item. Call this method when collection item properties change the way that
	 * it must be refiltered.
	 * @param item Item to refilter.
	 */
	refilterItem(item: T);

	/**
	 * Refilters target collection. Call this method when collection item properties change the way that
	 * they must be refiltered.
	 */
	refilter();

	/**
	 * Refilters target collection item at specified position in source collection.
	 * Call this method when collection item properties change the way that it must be refiltered.
	 * @param index Index of source collection item to refilter.
	 */
	refilterAt(sourceIndex: number);
}

/**
 * @inheritdoc
 */
export interface FiltererConfig<T> extends Collection.FiltererConfig<T> {
	/**
	 * @inheritdoc
	 */
	target?: IArray<T>;
}

/**
 * [[Filterer]]'s [[Filterer.reconfigure|reconfigure]] method options.
 * All options are optional. If skipped, an option stays the same.
 *
 * @param T Collection item type.
 */
export interface FiltererReconfig<T> {
	/**
	 * Filtering criteria.
	 */
	filterItem?: (item: T) => boolean;

	/**
	 * [[filterItem]] call scope.
	 */
	scope?: any;
}

/**
 * [[JW.AbstractCollection.Indexer|Indexer]] implementation for [[JW.Array]].
 */
export interface Indexer<T> extends Collection.Indexer<T> {
	/**
	 * @inheritdoc
	 */
	source: IArray<T>;
}

/**
 * View synchronizer with array. Listens all array events and reduces them to 2 granular functions:
 * item is added into specific position and item is removed from specific position. In optimization purposes,
 * you can define a third function: array is cleared
 * (in case if there is more effective clearing algorithm than iterative items deletion).
 * Unlike [[JW.AbstractCollection.Observer|Observer]], tracks items order.
 *
 * Use [[JW.AbstractArray.createinserter|createinserter]] method to create the synchronizer.
 * The method selects a synchronizer implementation which fits better (simple or observable).
 *
 *     var inserter = array.createInserter({
 *         addItem: function(item, index) { this.store.insert(item, index); },
 *         removeItem: function(item, index) { this.store.remove(index); },
 *         scope: this
 *     });
 *
 * Synchronizer rules:
 *
 * - Function [[Inserter.Config.addItem|addItem]]
 * is called for all items of source array on synchronizer initialization.
 * - Function [[Inserter.Config.clearItems|clearItems]]
 * is called for array, or function
 * [[Inserter.Config.removeItem|removeItem]] is called for
 * all items of source array on synchronizer destruction.
 * - On source array reordering, items order is synchorinized by callback functions calls.
 *
 * @param T Array item type.
 */
export interface Inserter<T> extends IClass {
}

/**
 * [[JW.AbstractArray.Inserter]] configuration.
 *
 * @param T Collection item type.
 */
export interface InserterConfig<T> {
	/**
	 * Function to call on item adding to specific position in array.
	 */
	addItem?: (item: T, index: number) => void;

	/**
	 * Function to call on item removing from specific position in array.
	 */
	removeItem?: (item: T, index: number) => void;

	/**
	 * Function to call on array cleanup.
	 * By default, calls [[removeItem]] for all array items.
	 */
	clearItems?: (items: T[]) => void;

	/**
	 * [[addItem]], [[removeItem]] and [[clearItems]] call scope.
	 * Defaults to synchronizer itself.
	 */
	scope?: any;
}

/**
 * [[JW.AbstractCollection.Lister|Lister]] implementation for [[JW.Array]].
 */
export interface Lister<T extends IClass> extends Collection.Lister<T> {
	/**
	 * @inheritdoc
	 */
	source: IArray<T>;
}

/**
 * [[JW.AbstractCollection.Mapper|Mapper]] implementation for [[JW.Array]].
 */
export interface Mapper<T, U> extends Collection.Mapper<T, U> {
	/**
	 * @inheritdoc
	 */
	source: IArray<T>;

	/**
	 * @inheritdoc
	 */
	target: IArray<U>;
}

/**
 * @inheritdoc
 */
export interface MapperConfig<T, U> extends Collection.MapperConfig<T, U> {
	/**
	 * @inheritdoc
	 */
	target?: IArray<U>;
}

/**
 * Arrays merger. Builds array consisting of all source collections items in the same order.
 * If any of the original collections is observable, starts continuous synchronization.
 *
 *     var source = new JW.ObservableArray([
 *         new JW.Array([1, 2, 3]),
 *         new JW.ObservableArray(),
 *         new JW.Array([4])
 *     ]);
 *     var merger = source.createMerger();
 *     var target = merger.target;
 *     assert(target.equal([1, 2, 3, 4]));
 *
 *     source.add(new JW.Array([5, 6]));
 *     assert(target.equal([1, 2, 3, 4, 5, 6]));
 *
 *     source.get(1).addAll([7, 8, 9]);
 *     assert(target.equal([1, 2, 3, 7, 8, 9, 4, 5, 6]));
 *
 *     merger.destroy();
 *
 * Use [[JW.AbstractArray.createMerger|createMerger]] method to create the synchronizer.
 * The method will select which synchronizer implementation fits better (simple or observable).
 *
 * You can pass target array in config option:
 *
 *     var source = new JW.Array();
 *     var target = new JW.Array();
 *     var merger = source.createMerger({
 *         target: target
 *     });
 *
 * In simple cases, [[JW.AbstractArray.$$merge|$$merge]] shorthand can be used instead. It returns the target array right away:
 *
 *     var source = new JW.ObservableArray([
 *         new JW.Array([1, 2, 3]),
 *         new JW.ObservableArray(),
 *         new JW.Array([4])
 *     ]);
 *     var target = source.$$merge();
 *     assert(target.equal([1, 2, 3, 4]));
 *
 *     source.add(new JW.Array([5, 6]));
 *     assert(target.equal([1, 2, 3, 4, 5, 6]));
 *
 *     source.get(1).addAll([7, 8, 9]);
 *     assert(target.equal([1, 2, 3, 7, 8, 9, 4, 5, 6]));
 *
 *     target.destroy();
 *
 * Synchronizer rules:
 *
 * - Target array is stored in [[target]] property.
 * - Target array must be empty before initialization.
 * - You can't modify target array manually and/or create other synchronizers with the same target array.
 * - All items of source arrays are added to [[target]]
 * immediately on synchronizer initialization.
 * - All items are removed from [[target]] on synchronizer destruction.
 * - You can pass target array in [[Merger.Config.target|target]] config option.
 * In this case, you are responsible for its destruction (though items will be removed
 * automatically on synchronizer destruction anyway).
 * - If [[Merger.Config.target|target]]
 * is not passed, it will be created automatically. Synchronizer will select
 * appropriate [[target]] implementation (simple or observable). In this
 * case, [[target]] will be destroyed automatically on synchronizer destruction.
 *
 * @param T Array item type.
 */
export interface Merger<T> extends IClass {
	/**
	 * Target array.
	 */
	target: IArray<T>;
}

/**
 * [[JW.AbstractArray.Merger]] configuration.
 *
 * @param T Collection item type.
 */
export interface MergerConfig<T> {
	/**
	 * Target array. By default, created automatically.
	 */
	target?: IArray<T>;
}

/**
 * [[JW.AbstractCollection.Observer|Observer]] implementation for [[JW.Array]].
 */
export interface Observer<T> extends Collection.Observer<T> {
	/**
	 * @inheritdoc
	 */
	source: IArray<T>;
}

/**
 * [[JW.AbstractCollection.Orderer|Orderer]] implementation for [[JW.Array]].
 */
export interface Orderer<T extends IClass> extends Collection.Orderer<T> {
	/**
	 * @inheritdoc
	 */
	source: IArray<T>;
}

/**
 * Array reverser. Builds array containing all items of source array in reversed order.
 * If original collection is observable, starts continuous synchronization.
 *
 *     var source = new JW.ObservableArray([1, 2, 3]);
 *     var reverser = source.createReverser();
 *     var target = reverser.target;
 *     assert(target.equal([3, 2, 1]));
 *
 *     source.add(4);
 *     assert(target.equal([4, 3, 2, 1]));
 *
 *     source.remove(2);
 *     assert(target.equal([4, 2, 1]));
 *
 *     reverser.destroy();
 *
 * Use [[JW.AbstractArray.createReverser|createReverser]] method to create the synchronizer.
 * The method will select which synchronizer implementation fits better (simple or observable).
 *
 * You can pass target array in config option:
 *
 *     var source = new JW.Array();
 *     var target = new JW.Array();
 *     var reverser = source.createReverser({
 *         target: target
 *     });
 *
 * In simple cases, [[JW.AbstractArray.$$toReversed|$$toReversed]] shorthand can be used instead. It returns the target array right away:
 *
 *     var source = new JW.ObservableArray([1, 2, 3]);
 *     var target = source.$$toReversed();
 *     assert(target.equal([3, 2, 1]));
 *
 *     source.add(4);
 *     assert(target.equal([4, 3, 2, 1]));
 *
 *     source.remove(2);
 *     assert(target.equal([4, 2, 1]));
 *
 *     target.destroy();
 *
 * Synchronizer rules:
 *
 * - Target array is stored in [[target]] property.
 * - Target array must be empty before initialization.
 * - You can't modify target array manually and/or create other synchronizers with the same target array.
 * - All items of source array are added to [[target]]
 * immediately on synchronizer initialization.
 * - All items are removed from [[target]] on synchronizer destruction.
 * - You can pass target array in [[Reverser.Config.target|target]] config option.
 * In this case, you are responsible for its destruction (though items will be removed
 * automatically on synchronizer destruction anyway).
 * - If [[Reverser.Config.target|target]]
 * is not passed, it will be created automatically. Synchronizer will select
 * appropriate [[target]] implementation (simple or observable). In this
 * case, [[target]] will be destroyed automatically on synchronizer destruction.
 *
 * @param T Array item type.
 */
export interface Reverser<T> extends IClass {
	/**
	 * Target array.
	 */
	target: IArray<T>;
}

/**
 * [[JW.AbstractArray.Reverser]] configuration.
 *
 * @param T Collection item type.
 */
export interface ReverserConfig<T> {
	/**
	 * Target array. By default, created automatically.
	 */
	target?: IArray<T>;
}

/**
 * [[JW.AbstractCollection.SorterComparing|SorterComparing]] implementation for [[JW.Array]].
 */
export interface SorterComparing<T> extends Collection.SorterComparing<T> {
	/**
	 * @inheritdoc
	 */
	source: IArray<T>;
}
