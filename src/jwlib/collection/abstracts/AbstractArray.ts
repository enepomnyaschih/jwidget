import {array} from '../../core/globals';
import {byMethod, def, destroyForcibly, Dictionary, Proxy} from '../../core/Core';
import {Class} from '../../core/Class';
import {IClass} from '../../core/IClass';
import {Destroyable} from '../../core/Destroyable';
import {AbstractCollection} from './AbstractCollection';
import {IndexedCollection} from './IndexedCollection';
import * as Collections from '../interfaces/ICollection';
import {IArray} from '../interfaces/IArray';
import * as Arrays from '../interfaces/IArray';
import * as ArrayUtils from '../utils/Array';

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
export abstract class AbstractArray<T> extends IndexedCollection<number, T> implements IArray<T> {
	protected items: T[];

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
	 * @param items Initial array contents.
	 * @param adapter Set to true to wrap the **items** rather than copying them into
	 * a new array.
	 */
	constructor(items?: T[], adapter?: boolean) {
		super();
		this.items = adapter ? items : items ? items.concat() : [];
	}

	/**
	 * @inheritdoc
	 */
	ownItems(): IArray<T> {
		super.ownItems();
		return this;
	}

	/**
	 * @inheritdoc
	 */
	getLength(): number {
		return this.items.length;
	}

	/**
	 * @inheritdoc
	 */
	isEmpty(): boolean {
		return this.items.length === 0;
	}

	/**
	 * @inheritdoc
	 */
	getFirst(): T {
		return this.items[0];
	}

	/**
	 * Returns the last collection item. If collection is empty, returns undefined.
	 */
	getLast(): T {
		return this.items[this.items.length - 1];
	}

	/**
	 * @inheritdoc
	 */
	getFirstKey(): number {
		return (this.items.length !== 0) ? 0 : undefined;
	}

	/**
	 * Returns index of last collection item. If collection is empty, returns undefined.
	 */
	getLastKey(): number {
		var l = this.items.length;
		return (l !== 0) ? (l - 1) : undefined;
	}

	/**
	 * @inheritdoc
	 */
	get(index: number): T {
		return this.items[index];
	}

	/**
	 * Returns item array - internal collection representation.
	 *
	 * **Caution: doesn't make a copy - please don't modify.**
	 */
	getItems(): T[] {
		return this.items;
	}

	/**
	 * Returns array of indexes of all collection items, i.e. array `[0, 1, ... , length - 1]`.
	 */
	getKeys(): number[] {
		var items = this.items;
		var result = array<number>(items.length);
		for (var i = 0, l = items.length; i < l; ++i) {
			result[i] = i;
		}
		return result;
	}

	/**
	 * @inheritdoc
	 */
	containsItem(item: T): boolean {
		return ArrayUtils.containsItem(this.items, item);
	}

	/**
	 * @inheritdoc
	 */
	every(callback: (item: T, index: number) => boolean, scope?: any): boolean {
		return ArrayUtils.every(this.items, callback, scope || this);
	}

	/**
	 * @inheritdoc
	 */
	toSorted(callback?: (item: T, key: number) => any, scope?: any, order?: number): T[] {
		return ArrayUtils.toSorted(this.items, callback, scope || this, order);
	}

	/**
	 * @inheritdoc
	 */
	toSortedComparing(compare?: (t1: T, t2: T, k1: number, k2: number) => number, scope?: any, order?: number): T[] {
		return ArrayUtils.toSortedComparing(this.items, compare, scope || this, order);
	}

	/**
	 * @inheritdoc
	 */
	getSortingKeys(callback?: (item: T, key: number) => any, scope?: any, order?: number): number[] {
		return ArrayUtils.getSortingKeys(this.items, callback, scope || this, order);
	}

	/**
	 * @inheritdoc
	 */
	getSortingKeysComparing(compare?: (t1: T, t2: T, k1: number, k2: number) => number, scope?: any, order?: number): number[] {
		return ArrayUtils.getSortingKeysComparing(this.items, compare, scope || this, order);
	}

	/**
	 * @inheritdoc
	 */
	filter(callback: (item: T, index: number) => boolean, scope?: any): T[] {
		return ArrayUtils.filter(this.items, callback, scope || this);
	}

	/**
	 * @inheritdoc
	 */
	abstract $filter(callback: (item: T, index: number) => boolean, scope?: any): IArray<T>;

	/**
	 * @inheritdoc
	 */
	$$filter(callback: (item: T) => boolean, scope?: any): IArray<T> {
		return this.$filter(callback, scope || this);
	}

	/**
	 * @inheritdoc
	 */
	count(callback: (item: T, index: number) => boolean, scope?: any): number {
		return ArrayUtils.count(this.items, callback, scope || this);
	}

	/**
	 * @inheritdoc
	 */
	map<U>(callback: (item: T, index: number) => U, scope?: any): U[] {
		return ArrayUtils.map(this.items, callback, scope || this);
	}

	/**
	 * @inheritdoc
	 */
	abstract $map<U>(callback: (item: T, index: number) => U, scope?: any): IArray<U>;

	/**
	 * @inheritdoc
	 */
	$$mapValues<U>(callback: (item: T) => U, scope?: any): IArray<U> {
		return this.$map(callback, scope || this);
	}

	/**
	 * @inheritdoc
	 */
	$$mapObjects<U extends Destroyable>(callback: (item: T) => U, scope?: any): IArray<U> {
		return this.$map(callback, scope || this).ownItems();
	}

	/**
	 * @inheritdoc
	 */
	toArray(): T[] {
		return this.items.concat();
	}

	/**
	 * @inheritdoc
	 */
	asArray(): T[] {
		return this.items;
	}

	/**
	 * @inheritdoc
	 */
	$asArray(): IArray<T> {
		return this;
	}

	/**
	 * Inserts an item to array.
	 *
	 * @param item Item to insert.
	 * @param index Index of an item before which to insert new one.
	 * By default, appends the item to the end of collection.
	 */
	add(item: T, index?: number) {
		this.tryAdd(item, index);
	}

	/**
	 * Inserts an item to array.
	 *
	 * @param item Item to insert.
	 * @param index Index of an item before which to insert new one.
	 * By default, appends the item to the end of collection.
	 * @returns Always returns true.
	 */
	tryAdd(item: T, index?: number): boolean {
		return this.tryAddAll([item], index);
	}

	/**
	 * Inserts item range to array.
	 *
	 * @param items Items to insert.
	 * @param index Index of an item before which to insert new ones.
	 * By default, appends the items to the end of collection.
	 */
	addAll(items: T[], index?: number) {
		this.tryAddAll(items, index);
	}

	/**
	 * Inserts item range to array.
	 *
	 * @param items Items to insert.
	 * @param index Index of an item before which to insert new ones.
	 * By default, appends the items to the end of collection.
	 * @returns Always returns true.
	 */
	tryAddAll(items: T[], index?: number): boolean {
		if (index === undefined) {
			index = this.items.length;
		}
		if (this.trySplice([], [new AbstractArray.IndexItems<T>(index, items)])) {
			return true;
		}
	}

	/**
	 * Replaces item at specified position.
	 * If array doesn't contain such index, it will demolish the application.
	 *
	 * @returns Proxy of the replaced item. If collection is not modified, returns undefined.
	 */
	abstract trySet(item: T, index: number): Proxy<T>;

	/**
	 * Removes item at specified position.
	 * If array doesn't contain such index, it will demolish the application.
	 *
	 * @returns The removed item. If collection is not modified, returns undefined.
	 */
	tryRemove(index: number): T {
		var result = this.tryRemoveAll(index, 1);
		if (result !== undefined) {
			return result[0];
		}
	}

	/**
	 * Removes item range from array.
	 *
	 * @param index Index of first item to remove.
	 * @param count Count of items to remove.
	 * @returns The removed items.
	 */
	removeAll(index: number, count: number): T[]{
		var result = this.tryRemoveAll(index, count);
		return result || [];
	}

	/**
	 * Removes item range from array.
	 *
	 * @param index Index of first item to remove.
	 * @param count Count of items to remove.
	 * @returns The removed items.
	 */
	abstract $removeAll(index: number, count: number): IArray<T>;

	/**
	 * Removes item range from array.
	 *
	 * @param index Index of first item to remove.
	 * @param count Count of items to remove.
	 * @returns The removed items. If collection is not modified, returns undefined.
	 */
	tryRemoveAll(index: number, count: number): T[]{
		var result = this.trySplice([new AbstractArray.IndexCount(index, count)], []);
		if (result !== undefined) {
			return result.removedItemsList[0].items;
		}
	}

	/**
	 * @inheritdoc
	 */
	removeItems(items: T[]) {
		var itemSet: Dictionary<any> = {};
		for (var i = 0; i < items.length; ++i) {
			itemSet[(<any>items[i])._iid] = items[i];
		}
		var newItems = this.filter(function (item: any) { return !itemSet.hasOwnProperty(item._iid); });
		this.performFilter(newItems);
	}

	/**
	 * Moves an item inside array.
	 *
	 * @param fromIndex Item index to move.
	 * @param toIndex Index to move to.
	 * @returns The moved item.
	 */
	move(fromIndex: number, toIndex: number): T {
		this.tryMove(fromIndex, toIndex);
		return this.get(toIndex);
	}

	/**
	 * Moves an item inside array.
	 *
	 * @param fromIndex Item index to move.
	 * @param toIndex Index to move to.
	 * @returns The moved item. If collection is not modified, returns undefined.
	 */
	abstract tryMove(fromIndex: number, toIndex: number): T;

	/**
	 * @inheritdoc
	 */
	clear(): T[]{
		var result = this.tryClear();
		return (result !== undefined) ? result : [];
	}

	/**
	 * @inheritdoc
	 */
	abstract $clear(): IArray<T>;

	/**
	 * @inheritdoc
	 */
	abstract tryClear(): T[];

	/**
	 * Removes and inserts item ranges. Universal optimized granular operation of removal/insertion.
	 *
	 * @param removeParamsList Array of segments to remove sorted by index asc. Segments are removed in backward order.
	 * @param addParamsList Array of segments to insert sorted by index asc. Segments are inserted in forward order.
	 * @returns Splice result. Never returns null or undefined.
	 */
	splice(removeParamsList: Arrays.IndexCount[], addParamsList: Arrays.IndexItems<T>[]): Arrays.SpliceResult<T> {
		var result = this.trySplice(removeParamsList, addParamsList);
		return (result !== undefined) ? result : new AbstractArray.SpliceResult(this.items.concat(), [], []);
	}

	/**
	 * Removes and inserts item ranges. Universal optimized granular operation of removal/insertion.
	 *
	 * @param removeParamsList Array of segments to remove sorted by index asc. Segments are removed in backward order.
	 * @param addParamsList Array of segments to insert sorted by index asc. Segments are inserted in forward order.
	 * @returns Splice result. If collection is not modified, returns undefined.
	 */
	abstract trySplice(removeParamsList: Arrays.IndexCount[], addParamsList: Arrays.IndexItems<T>[]): Arrays.SpliceResult<T>;

	/**
	 * Reorders array items.
	 *
	 * @param indexArray Index array. Item with index `i` will be moved to index `indexArray[i]`.
	 * Must contain all indexes from 0 to (length - 1).
	 */
	reorder(indexArray: number[]) {
		this.tryReorder(indexArray);
	}

	/**
	 * Reorders array items.
	 *
	 * @param indexArray Index array. Item with index `i` will be moved to index `indexArray[i]`.
	 * Must contain all indexes from 0 to (length - 1).
	 * @returns Old array contents. If collection is not modified, returns undefined.
	 */
	abstract tryReorder(indexArray: number[]): T[];

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
	abstract detectSplice(newItems: T[], getKey?: (item: T) => any, scope?: any): Arrays.SpliceParams<T>;

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
	abstract detectFilter(newItems: T[]): Arrays.IndexCount[];

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
	abstract detectReorder(newItems: T[], getKey?: (item: T) => any, scope?: any): number[];

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
	abstract detectSort(callback?: (item: T, index: number) => any, scope?: any, order?: number): number[];

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
	abstract detectSortComparing(compare?: (t1: T, t2: T, i1: number, i2: number) => number, scope?: any, order?: number): number[];

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
	performSplice(newItems: T[], getKey?: (item: T) => any, scope?: any) {
		var params = this.detectSplice(newItems, getKey || this.getKey, scope || this);
		if (params !== undefined) {
			this.trySplice(params.removeParamsList, params.addParamsList);
		}
	}

	/**
	 * Adjusts array contents to **newItems** using [[detectFilter]] and
	 * [[splice]] methods.
	 * Only removes items.
	 * Doesn't assume items insertion - try [[detectSplice]] if that's the case.
	 * In advantage to [[detectSplice]], doesn't require item uniquiness.
	 *
	 * @param newItems New array contents.
	 */
	performFilter(newItems: T[]) {
		var params = this.detectFilter(newItems);
		if (params !== undefined) {
			this.trySplice(params, []);
		}
	}

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
	performReorder(newItems: T[], getKey?: (item: T) => any, scope?: any) {
		var indexArray = this.detectReorder(newItems, getKey || this.getKey, scope || this);
		if (indexArray !== undefined) {
			this.tryReorder(indexArray);
		}
	}

	/**
	 * Sorts array by result of **callback** function call for each item.
	 *
	 * @param callback Indexer function. Must return a comparable value, compatible with
	 * [[JW.cmp]]. Returns item itself by default.
	 * @param scope **callback** call scope. Defaults to collection itself.
	 * @param order Sorting order. Positive number for ascending sorting, negative for descending sorting.
	 */
	sort(callback?: (item: T, index: number) => any, scope?: any, order?: number) {
		var indexArray = this.detectSort(callback, scope, order);
		if (indexArray !== undefined) {
			this.tryReorder(indexArray);
		}
	}

	/**
	 * Sorts array by comparer.
	 *
	 * @param compare Comparer function. Should return positive value if t1 > t2;
	 * negative value if t1 < t2; 0 if t1 == t2.
	 * Defaults to [[JW.cmp]]
	 * @param scope **comparer** call scope. Defaults to collection itself.
	 * @param order Sorting order. Positive number for ascending sorting, negative for descending sorting.
	 */
	sortComparing(compare?: (t1: T, t2: T, i1: number, i2: number) => number, scope?: any, order?: number) {
		var indexArray = this.detectSortComparing(compare, scope, order);
		if (indexArray !== undefined) {
			this.tryReorder(indexArray);
		}
	}

	/**
	 * *Suitable if array consists of JW.AbstractArray instances only.*
	 * Builds array consisting of subarray items in the same order.
	 * Current array is not modified.
	 *
	 * @returns Merged array.
	 */
	abstract merge(): any[];

	/**
	 * *Suitable if array consists of JW.AbstractArray instances only.*
	 * Builds array consisting of subarray items in the same order.
	 * Current array is not modified.
	 *
	 * @returns Merged array.
	 */
	$merge(): IArray<any> {
		var result = this._createMergerTarget<any>();
		result.own(this.createMerger({
			target: result
		}));
		return result;
	}

	/**
	 * *Suitable if array consists of JW.AbstractArray instances only.*
	 * Builds array consisting of subarray items in the same order.
	 * Current array is not modified.
	 * Starts continuous synchronization,
	 * i.e. creates [[JW.abstractarray.Merger]] implicitly.
	 *
	 * @returns Merged array.
	 */
	$$merge(): IArray<any> {
		return this.$merge();
	}

	/**
	 * Reverses item order in array. Modifies the array itself.
	 */
	reverse() {
		this.items.reverse();
	}

	/**
	 * Builds a new array containing items of this array in reversed order.
	 * Current array is not modified.
	 *
	 * @returns Reversed array.
	 */
	abstract toReversed(): T[];

	/**
	 * Builds a new array containing items of this array in reversed order.
	 * Current array is not modified.
	 *
	 * @returns Reversed array.
	 */
	abstract $toReversed(): IArray<T>;

	/**
	 * Builds a new array containing items of this array in reversed order.
	 * Current array is not modified.
	 * If this collection is observable, starts continuous synchronization,
	 * i.e. creates [[JW.abstractarray.Reverser]] implicitly.
	 *
	 * @returns Reversed array.
	 */
	$$toReversed(): IArray<T> {
		return this.$toReversed();
	}

	/**
	 * Checks for equality (===) to another array, item by item.
	 *
	 * @param arr Another array.
	 * @returns Arrays are equal.
	 */
	abstract equal(arr: T[]): boolean;

	/**
	 * Collapses multi-dimentional array.
	 *
	 * @param depth Dimentions to collapse.
	 * @returns Collapsed array.
	 */
	abstract collapse(depth: number): any[];

	/**
	 * Returns item index in this collection.
	 *
	 * @returns Item index. If item doesn't exist, returns -1.
	 */
	abstract indexOf(item: T): number;

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
	abstract backEvery(callback: (item: T, index: number) => boolean, scope?: any): boolean;

	/**
	 * Removes last array item. Does nothing if array is empty.
	 *
	 * @returns The removed item or undefined.
	 */
	pop(): T {
		if (this.items.length !== 0) {
			return this.tryRemove(this.items.length - 1);
		}
	}

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
	abstract binarySearch(value: T, compare?: (t1: T, t2: T) => number, scope?: any, order?: number): number;

	/**
	 * @inheritdoc
	 */
	abstract createEmpty<U>(): IArray<U>;

	/**
	 * @inheritdoc
	 */
	createMapper<U>(config: Arrays.MapperConfig<T, U>): Arrays.Mapper<T, U> {
		return new AbstractArray.Mapper<T, U>(this, config);
	}

	/**
	 * @inheritdoc
	 */
	createFilterer(config: Arrays.FiltererConfig<T>): Arrays.Filterer<T> {
		return new AbstractArray.Filterer<T>(this, config);
	}

	/**
	 * @inheritdoc
	 */
	createCounter(config: Collections.CounterConfig<T>): Arrays.Counter<T> {
		return new AbstractArray.Counter<T>(this, config);
	}

	/**
	 * @inheritdoc
	 */
	createObserver(config: Collections.ObserverConfig<T>): Arrays.Observer<T> {
		return new AbstractArray.Observer<T>(this, config);
	}

	/**
	 * @inheritdoc
	 */
	createOrderer(config?: Collections.OrdererConfig<any>): Arrays.Orderer<any> {
		return new AbstractArray.Orderer<any>(this, config);
	}

	/**
	 * @inheritdoc
	 */
	createSorterComparing(config?: Collections.SorterComparingConfig<T>): Arrays.SorterComparing<T> {
		return new AbstractArray.SorterComparing<T>(this, config);
	}

	/**
	 * @inheritdoc
	 */
	createIndexer(config: Collections.IndexerConfig<T>): Arrays.Indexer<T> {
		return new AbstractArray.Indexer<T>(this, config);
	}

	/**
	 * @inheritdoc
	 */
	createLister(config?: Collections.ListerConfig<any>): Arrays.Lister<any> {
		return new AbstractArray.Lister<any>(this, config);
	}

	/**
	 * Creates view synchronizer with array.
	 * Selects appropriate synchronizer implementation automatically.
	 */
	createInserter(config: Arrays.InserterConfig<T>): Arrays.Inserter<T> {
		return new AbstractArray.Inserter<T>(this, config);
	}

	/**
	 * Creates arrays merger.
	 * Selects appropriate synchronizer implementation automatically.
	 */
	createMerger<U>(config?: Arrays.MergerConfig<U>): Arrays.Merger<U> {
		return new AbstractArray.Merger<U>(<AbstractArray<any>>this, config);
	}

	// type definition in argument breaks compiler for some reason
	/**
	 * @hidden
	 */
	createMergerBunch(merger: any): Class {
		return new Class();
	}

	/**
	 * Creates array reverser.
	 * Selects appropriate synchronizer implementation automatically.
	 */
	createReverser(config?: Arrays.ReverserConfig<T>): Arrays.Reverser<T> {
		return new AbstractArray.Reverser<T>(this, config);
	}

	/**
	 * @hidden
	 */
	abstract _createMergerTarget<T>(): IArray<T>;
}

export module AbstractArray {
	export var IndexItems = ArrayUtils.IndexItems;
	export var IndexCount = ArrayUtils.IndexCount;
	export var SpliceResult = ArrayUtils.SpliceResult;

	/**
	 * [[JW.AbstractCollection.Counter|Counter]] implementation for [[JW.Array]].
	 */
	export class Counter<T> extends AbstractCollection.Counter<T> implements Arrays.Counter<T> {
		/**
		 * @inheritdoc
		 */
		public source: IArray<T>;

		/**
		 * @inheritdoc
		 */
		constructor(source: IArray<T>, config: Collections.CounterConfig<T>) {
			super(source, config);
		}
	}

	/**
	 * [[JW.AbstractCollection.Filterer|Filterer]] implementation for [[JW.Array]].
	 */
	export class Filterer<T> extends AbstractCollection.Filterer<T> implements Arrays.Filterer<T> {
		/**
		 * @hidden
		 */
		protected _filtered: number[] = [];

		/**
		 * @inheritdoc
		 */
		source: IArray<T>;

		/**
		 * @inheritdoc
		 */
		target: IArray<T>;

		/**
		 * @inheritdoc
		 */
		constructor(source: IArray<T>, config: Arrays.FiltererConfig<T>) {
			super(source, config);
			this._splice([], [new AbstractArray.IndexItems(0, this.source.getItems())]);
		}

		/**
		 * @inheritdoc
		 */
		protected destroyObject() {
			this.target.tryClear();
			super.destroyObject();
		}

		/**
		 * @hidden
		 */
		protected _countFiltered(index: number, count: number): number {
			var result = 0;
			for (var i = 0; i < count; ++i) {
				result += this._filtered[index + i];
			}
			return result;
		}

		/**
		 * @hidden
		 */
		protected _splice(removedItemsList: Arrays.IndexItems<T>[], addedItemsList: Arrays.IndexItems<T>[]) {
			var sourceIndex = 0;
			var targetIndex = 0;
			var removeParamsList = ArrayUtils.map(removedItemsList, (indexItems) => {
				targetIndex += this._countFiltered(sourceIndex, indexItems.index - sourceIndex);
				var count = this._countFiltered(indexItems.index, indexItems.items.length);
				var params = new AbstractArray.IndexCount(targetIndex, count);
				sourceIndex = indexItems.index + indexItems.items.length;
				targetIndex += count;
				return params;
			});
			ArrayUtils.trySplice(this._filtered, ArrayUtils.map(removedItemsList, (x) => x.toIndexCount()), []);

			var sourceIndex = 0;
			var targetIndex = 0;
			var addParamsList = ArrayUtils.map(addedItemsList, (indexItems) => {
				targetIndex += this._countFiltered(sourceIndex, indexItems.index - sourceIndex);
				var items = [];
				var filtered = ArrayUtils.map(indexItems.items, (item) => {
					if (this._filterItem.call(this._scope, item) === false) {
						return 0;
					}
					items.push(item);
					return 1;
				});
				var params = new AbstractArray.IndexItems(targetIndex, items);
				ArrayUtils.tryAddAll(this._filtered, filtered, indexItems.index);
				sourceIndex = indexItems.index + filtered.length;
				targetIndex += items.length;
				return params;
			});

			this.target.trySplice(removeParamsList, addParamsList);
		}

		/**
		 * Changes filterer configuration and refilters target collection.
		 * @param config Options to modify.
		 */
		reconfigure(config: Collections.FiltererReconfig<T>) {
			this._filterItem = def(config.filterItem, this._filterItem);
			this._scope = def(config.scope, this._scope);
			this.refilter();
		}

		/**
		 * Refilters target collection item at specified position in source collection.
		 * Call this method when collection item properties change the way that it must be refiltered.
		 * @param index Index of source collection item to refilter.
		 */
		refilterAt(sourceIndex: number) {
			var item = this.source.get(sourceIndex);
			var good = this._filterItem.call(this._scope, item) !== false;
			var targetIndex = this._countFiltered(0, sourceIndex);
			if (this._filtered[sourceIndex] === 0) {
				if (good) {
					this._filtered[sourceIndex] = 1;
					this.target.add(item, targetIndex);
				}
			} else {
				if (!good) {
					this._filtered[sourceIndex] = 0;
					this.target.remove(targetIndex);
				}
			}
		}

		/**
		 * Refilters target collection item. Call this method when collection item properties change the way that
		 * it must be refiltered.
		 * @param item Item to refilter.
		 */
		refilterItem(item: T) {
			var index = this.source.indexOf(item);
			if (index !== -1) {
				this.refilterAt(index);
			}
		}

		/**
		 * Refilters target collection. Call this method when collection item properties change the way that
		 * they must be refiltered.
		 */
		refilter() {
			var newFiltered = this.source.map((item) => {
				return (this._filterItem.call(this._scope, item) !== false) ? 1 : 0;
			});

			var removeParams: Arrays.IndexCount = null;
			var removeParamsList: Arrays.IndexCount[] = [];

			function flushRemove() {
				if (removeParams !== null) {
					removeParamsList.push(removeParams);
					removeParams = null;
				}
			}

			var targetIndex = 0;
			this.source.every((item, index) => {
				if (this._filtered[index] === 0) {
					return true;
				}
				if (newFiltered[index] === 0) {
					if (removeParams === null) {
						removeParams = new AbstractArray.IndexCount(targetIndex, 0);
					}
					++removeParams.count;
					this._filtered[index] = 0;
				} else {
					flushRemove();
				}
				++targetIndex;
				return true;
			});

			flushRemove();

			var addParams: Arrays.IndexItems<T> = null;
			var addParamsList: Arrays.IndexItems<T>[] = [];

			function flushAdd() {
				if (addParams !== null) {
					addParamsList.push(addParams);
					addParams = null;
				}
			}

			var targetIndex = 0;
			this.source.every((item, index) => {
				if (this._filtered[index] === 1) {
					flushAdd();
					++targetIndex;
					return true;
				}
				if (newFiltered[index] === 1) {
					if (addParams === null) {
						addParams = new AbstractArray.IndexItems<T>(targetIndex, []);
					}
					addParams.items.push(item);
					this._filtered[index] = 1;
					++targetIndex;
				} else {
					flushAdd();
				}
				return true;
			});

			flushAdd();

			this._filtered = newFiltered;
			this.target.trySplice(removeParamsList, addParamsList);
		}
	}

	/**
	 * [[JW.AbstractCollection.Indexer|Indexer]] implementation for [[JW.Array]].
	 */
	export class Indexer<T> extends AbstractCollection.Indexer<T> implements Arrays.Indexer<T> {
		/**
		 * @inheritdoc
		 */
		public source: IArray<T>;

		/**
		 * @inheritdoc
		 */
		constructor(source: IArray<T>, config: Collections.IndexerConfig<T>) {
			super(source, config);
		}
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
	export class Inserter<T> extends Class implements Arrays.Inserter<T> {
		/**
		 * @hidden
		 */
		protected _addItem: (item: T, index: number) => void;

		/**
		 * @hidden
		 */
		protected _removeItem: (item: T, index: number) => void;

		/**
		 * @hidden
		 */
		protected _clearItems: (items: T[]) => void;

		/**
		 * @hidden
		 */
		protected _scope: any;

		/**
		 * Creates synchronizer.
		 * [[JW.AbstractArray.createInserter|createInserter]] method is preferred instead.
		 *
		 * @param source Source array.
		 * @param config Configuration.
		 */
		constructor(public source: IArray<T>, config: Arrays.InserterConfig<T> = {}) {
			super();
			this._addItem = config.addItem;
			this._removeItem = config.removeItem;
			this._clearItems = config.clearItems;
			this._scope = config.scope || this;
			this._addItems(this.source.getItems(), 0);
		}

		/**
		 * @inheritdoc
		 */
		protected destroyObject() {
			this._doClearItems(this.source.getItems());
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
		protected _addItems(items: T[], index: number) {
			if (!this._addItem) {
				return;
			}
			for (var i = 0; i < items.length; ++i) {
				this._addItem.call(this._scope, items[i], i + index);
			}
		}

		/**
		 * @hidden
		 */
		protected _removeItems(items: T[], index: number) {
			if (!this._removeItem) {
				return;
			}
			for (var i = items.length - 1; i >= 0; --i) {
				this._removeItem.call(this._scope, items[i], i + index);
			}
		}

		/**
		 * @hidden
		 */
		protected _doClearItems(items: T[]) {
			if (items.length === 0) {
				return;
			}
			if (this._clearItems) {
				this._clearItems.call(this._scope, items);
			} else {
				this._removeItems(items, 0);
			}
		}
	}

	/**
	 * [[JW.AbstractCollection.Lister|Lister]] implementation for [[JW.Array]].
	 */
	export class Lister<T extends IClass> extends AbstractCollection.Lister<T> implements Arrays.Lister<T> {
		/**
		 * @inheritdoc
		 */
		public source: IArray<T>;

		/**
		 * @inheritdoc
		 */
		constructor(source: IArray<T>, config: Collections.ListerConfig<T>) {
			super(source, config);
		}
	}

	/**
	 * [[JW.AbstractCollection.Mapper|Mapper]] implementation for [[JW.Array]].
	 */
	export class Mapper<T, U> extends AbstractCollection.Mapper<T, U> implements Arrays.Mapper<T, U> {
		/**
		 * @inheritdoc
		 */
		source: IArray<T>;

		/**
		 * @inheritdoc
		 */
		target: IArray<U>;

		/**
		 * @inheritdoc
		 */
		constructor(source: IArray<T>, config: Arrays.MapperConfig<T, U>) {
			super(source, config);
			this.target.tryAddAll(this._createItems(this.source.getItems()));
		}

		/**
		 * @inheritdoc
		 */
		protected destroyObject() {
			this._destroyItems(this.target.clear(), this.source.getItems());
			super.destroyObject();
		}

		/**
		 * @hidden
		 */
		protected _createItems(datas: T[]): U[] {
			var items: U[] = [];
			for (var i = 0, l = datas.length; i < l; ++i) {
				items.push(this._createItem.call(this._scope, datas[i]));
			}
			return items;
		}

		/**
		 * @hidden
		 */
		protected _destroyItems(items: U[], datas: T[]) {
			if (this._destroyItem === undefined) {
				return;
			}
			for (var i = items.length - 1; i >= 0; --i) {
				this._destroyItem.call(this._scope, items[i], datas[i]);
			}
		}
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
	export class Merger<T> extends Class implements Arrays.Merger<T> {
		private _targetCreated: boolean;
		private _bunches: IArray<IClass>;

		/**
		 * Target array.
		 */
		target: IArray<T>;

		/**
		 * Creates synchronizer.
		 * [[JW.AbstractArray.createMerger|createMerger]] method is preferred instead.
		 *
		 * @param source Source array.
		 * @param config Configuration.
		 */
		constructor(public source: IArray<IArray<T>>, config: Arrays.MergerConfig<T> = {}) {
			super();
			this._targetCreated = config.target == null;
			this.target = this._targetCreated ? source._createMergerTarget<T>() : config.target;
			this._bunches = source.$$mapObjects((bunch) => {
				return bunch.createMergerBunch(this);
			});
			this.target.tryAddAll(this._getAllItems());
		}

		/**
		 * @inheritdoc
		 */
		destroyObject() {
			this.target.tryClear();
			this._bunches.destroy();
			if (this._targetCreated) {
				this.target.destroy();
			}
			this.source = null;
			this.target = null;
			this._bunches = null;
			super.destroyObject();
		}

		/**
		 * @hidden
		 */
		protected _getAllItems(): T[] {
			return this._merge(this.source.getItems());
		}

		/**
		 * @hidden
		 */
		protected _merge(bunches: IArray<T>[]): T[] {
			var items = array<T>(this._count(bunches));
			var iItems = 0;
			for (var i = 0, l = bunches.length; i < l; ++i) {
				var bunch = bunches[i].getItems();
				for (var j = 0, m = bunch.length; j < m; ++j) {
					items[iItems++] = bunch[j];
				}
			}
			return items;
		}

		/**
		 * @hidden
		 */
		protected _count(bunches: IArray<T>[], index?: number, length?: number): number {
			if (index === undefined) {
				index = 0;
			}
			if (length === undefined) {
				length = bunches.length - index;
			}
			var count = 0;
			for (var i = 0; i < length; ++i) {
				count += bunches[index + i].getLength();
			}
			return count;
		}
	}

	/**
	 * [[JW.AbstractCollection.Observer|Observer]] implementation for [[JW.Array]].
	 */
	export class Observer<T> extends AbstractCollection.Observer<T> implements Arrays.Observer<T> {
		/**
		 * @inheritdoc
		 */
		source: IArray<T>;

		/**
		 * @inheritdoc
		 */
		constructor(source: IArray<T>, config: Collections.ObserverConfig<T>) {
			super(source, config);
		}
	}

	/**
	 * [[JW.AbstractCollection.Orderer|Orderer]] implementation for [[JW.Array]].
	 */
	export class Orderer<T extends IClass> extends AbstractCollection.Orderer<T> implements Arrays.Orderer<T> {
		/**
		 * @inheritdoc
		 */
		public source: IArray<T>;

		/**
		 * @inheritdoc
		 */
		constructor(source: IArray<T>, config: Collections.OrdererConfig<T>) {
			super(source, config);
		}
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
	export class Reverser<T> extends Class implements Arrays.Reverser<T> {
		private _targetCreated: boolean;

		/**
		 * Target array.
		 */
		target: IArray<T>;

		/**
		 * Creates synchronizer.
		 * [[JW.AbstractArray.createReverser|createReverser]] method is preferred instead.
		 *
		 * @param source Source array.
		 * @param config Configuration.
		 */
		constructor(public source: IArray<T>, config: Arrays.ReverserConfig<T> = {}) {
			super();
			this._targetCreated = config.target == null;
			this.target = this._targetCreated ? source.createEmpty<T>() : config.target;
			this.target.tryAddAll(this._reverse(source.getItems()));
		}

		/**
		 * @inheritdoc
		 */
		destroyObject() {
			this.target.tryClear();
			if (this._targetCreated) {
				this.target.destroy();
			}
			this.source = null;
			this.target = null;
			super.destroyObject();
		}

		/**
		 * @hidden
		 */
		protected _reverse(items: T[]) {
			items = items.concat();
			items.reverse();
			return items;
		}
	}

	/**
	 * [[JW.AbstractCollection.SorterComparing|SorterComparing]] implementation for [[JW.Array]].
	 */
	export class SorterComparing<T> extends AbstractCollection.SorterComparing<T> implements Arrays.SorterComparing<T> {
		/**
		 * @inheritdoc
		 */
		public source: IArray<T>;

		/**
		 * @inheritdoc
		 */
		constructor(source: IArray<T>, config: Collections.SorterComparingConfig<T>) {
			super(source, config);
		}
	}
}
