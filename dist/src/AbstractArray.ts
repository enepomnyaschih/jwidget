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

import ArraySpliceResult from './ArraySpliceResult';
import Dictionary from './Dictionary';
import IArray from './IArray';
import IArraySpliceParams from './IArraySpliceParams';
import IArraySpliceResult from './IArraySpliceResult';
import IIndexCount from './IIndexCount';
import IIndexItems from './IIndexItems';
import IndexCount from './IndexCount';
import IndexItems from './IndexItems';
import IndexedCollection from './IndexedCollection';
import Proxy from './Proxy';
import * as ArrayUtils from './ArrayUtils';

/**
 * Array is ordered collection. Each item of array has an index. Index of first item is 0,
 * index of each next one is higher by 1.
 *
 * # Array methods
 *
 * **Difference compared to [[IndexedCollection]] is in bold.**
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
abstract class AbstractArray<T> extends IndexedCollection<number, T> implements IArray<T> {
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
	ownItems(): this {
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
		var result = new Array<number>(items.length);
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
		return this.items.every(callback, scope || this);
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
		return this.items.filter(callback, scope || this);
	}

	/**
	 * @inheritdoc
	 */
	abstract $filter(callback: (item: T, index: number) => boolean, scope?: any): IArray<T>;

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
		return this.items.map(callback, scope || this);
	}

	/**
	 * @inheritdoc
	 */
	abstract $map<U>(callback: (item: T, index: number) => U, scope?: any): IArray<U>;

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
		if (this.trySplice([], [new IndexItems<T>(index, items)])) {
			return true;
		}
		return undefined;
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
		return undefined;
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
		var result = this.trySplice([new IndexCount(index, count)], []);
		if (result !== undefined) {
			return result.removedItemsList[0].items;
		}
		return undefined;
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
	splice(removeParamsList: IIndexCount[], addParamsList: IIndexItems<T>[]): IArraySpliceResult<T> {
		var result = this.trySplice(removeParamsList, addParamsList);
		return (result !== undefined) ? result : new ArraySpliceResult(this.items.concat(), [], []);
	}

	/**
	 * Removes and inserts item ranges. Universal optimized granular operation of removal/insertion.
	 *
	 * @param removeParamsList Array of segments to remove sorted by index asc. Segments are removed in backward order.
	 * @param addParamsList Array of segments to insert sorted by index asc. Segments are inserted in forward order.
	 * @returns Splice result. If collection is not modified, returns undefined.
	 */
	abstract trySplice(removeParamsList: IIndexCount[], addParamsList: IIndexItems<T>[]): IArraySpliceResult<T>;

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
	abstract detectSplice(newItems: T[], getKey?: (item: T) => any, scope?: any): IArraySpliceParams<T>;

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
	abstract detectFilter(newItems: T[]): IIndexCount[];

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
		return undefined;
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
}

export default AbstractArray;
