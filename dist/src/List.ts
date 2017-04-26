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
import {destroy, CollectionFlags, SILENT, ADAPTER} from './index';
import Dictionary from './Dictionary';
import Event from './Event';
import IList from './IList';
import IEvent from './IEvent';
import IMap from './IMap';
import IndexCount from './IndexCount';
import IndexItems from './IndexItems';
import IndexedCollection from './IndexedCollection';
import ISet from './ISet';
import ListSpliceResult from './ListSpliceResult';
import Map from './Map';
import Set from './Set';
import Some from './Some';
import Bindable from './Bindable';
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
 * * [[length]] - Collection length property.
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
 * * [[toDictionary]], [[toMap]] - Builds new map consisting of collection items.
 * * [[toSet]], [[toSet]],
 * [[$toSet]] - Builds new set consisting of collection items.
 * * [[asArray]], [[$asArray]] - Represents collection as array.
 * * [[asDictionary]], [[asMap]] - Represents collection as map.
 * * [[asSet]], [[asSet]] - Represents collection as set.
 * * **[[backEvery]] - Checks all items by criteria in backward order.**
 * * **[[merge]], [[$merge]],
 * [[$$merge]] - *suitable if array consists of List instances only.*
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
 * Extended version of [[$toSet]] method.
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
export default class List<T> extends IndexedCollection<number, T> implements IList<T> {
	private _items: T[];

	private _spliceEvent  : IEvent<IList.SpliceEventParams<T>>;
	private _replaceEvent : IEvent<IList.ReplaceEventParams<T>>;
	private _moveEvent    : IEvent<IList.MoveEventParams<T>>;
	private _reorderEvent : IEvent<IList.ReorderEventParams<T>>;
	private _clearEvent   : IEvent<IList.ItemsEventParams<T>>;
	private _changeEvent  : IEvent<IList.EventParams<T>>;

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
	constructor(silent?: boolean);
	constructor(items: T[], flags?: CollectionFlags);
	constructor(a?: any, b?: CollectionFlags) {
		const valued = (typeof a !== "boolean");
		const silent = Boolean(valued ? (b & SILENT) : a);
		const adapter = valued && Boolean(b & ADAPTER);
		const items: T[] = (valued && a) ? a : [];

		super(silent);
		this._items = adapter ? items : items ? items.concat() : [];
		this._length.set(this._items.length);

		this._spliceEvent  = Event.make<IList.SpliceEventParams<T>>(this, silent);
		this._replaceEvent = Event.make<IList.ReplaceEventParams<T>>(this, silent);
		this._moveEvent    = Event.make<IList.MoveEventParams<T>>(this, silent);
		this._reorderEvent = Event.make<IList.ReorderEventParams<T>>(this, silent);
		this._clearEvent   = Event.make<IList.ItemsEventParams<T>>(this, silent);
		this._changeEvent  = Event.make<IList.EventParams<T>>(this, silent);
	}

	get length(): Bindable<number> {
		return this._length;
	}

	/**
	 * @inheritdoc
	 */
	get first(): T {
		return this._items[0];
	}

	/**
	 * Returns the last collection item. If collection is empty, returns undefined.
	 */
	get last(): T {
		return this._items[this._items.length - 1];
	}

	/**
	 * @inheritdoc
	 */
	get firstKey(): number {
		return (this._items.length !== 0) ? 0 : undefined;
	}

	/**
	 * Returns index of last collection item. If collection is empty, returns undefined.
	 */
	get lastKey(): number {
		var l = this._items.length;
		return (l !== 0) ? (l - 1) : undefined;
	}

	/**
	 * Returns item array - internal collection representation.
	 *
	 * **Caution: doesn't make a copy - please don't modify.**
	 */
	get items(): T[] {
		return this._items;
	}

	/**
	 * Items are removed from array and items are added to array. Triggered in result
	 * of calling:
	 *
	 * * [[add]]
	 * * [[tryAdd]]
	 * * [[addAll]]
	 * * [[tryAddAll]]
	 * * [[remove]]
	 * * [[tryRemove]]
	 * * [[removeItem]]
	 * * [[pop]]
	 * * [[removeAll]]
	 * * [[tryRemoveAll]]
	 * * [[removeItems]]
	 * * [[splice]]
	 * * [[trySplice]]
	 * * [[performSplice]]
	 */
	get spliceEvent(): Listenable<IList.SpliceEventParams<T>> {
		return this._spliceEvent;
	}

	/**
	 * Item is replaced in array. Triggered in result of calling:
	 *
	 * * [[set]]
	 * * [[trySet]]
	 */
	get replaceEvent(): Listenable<IList.ReplaceEventParams<T>> {
		return this._replaceEvent;
	}

	/**
	 * Item is moved in array. Triggered in result of calling:
	 *
	 * * [[move]]
	 * * [[tryMove]]
	 */
	get moveEvent(): Listenable<IList.MoveEventParams<T>> {
		return this._moveEvent;
	}

	/**
	 * Array is cleared. Triggered in result of calling:
	 * * [[clear]]
	 * * [[$clear]]
	 * * [[tryClear]]
	 */
	get clearEvent(): Listenable<IList.ItemsEventParams<T>> {
		return this._clearEvent;
	}

	/**
	 * Items are reordered in array. Triggered in result of calling:
	 *
	 * * [[reorder]]
	 * * [[tryReorder]]
	 * * [[performReorder]]
	 * * [[sort]]
	 * * [[sortComparing]]
	 */
	get reorderEvent(): Listenable<IList.ReorderEventParams<T>> {
		return this._reorderEvent;
	}

	/**
	 * Array is changed. Triggered right after any another event.
	 */
	get changeEvent(): Listenable<IList.EventParams<T>> {
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
	get(index: number): T {
		return this._items[index];
	}

	/**
	 * Returns array of indexes of all collection items, i.e. array `[0, 1, ... , length - 1]`.
	 */
	getKeys(): number[] {
		var items = this._items;
		var result = new Array<number>(items.length);
		for (var i = 0, l = items.length; i < l; ++i) {
			result[i] = i;
		}
		return result;
	}

	/**
	 * @inheritdoc
	 */
	$getKeys(): IList<number> {
		return new List<number>(this.getKeys(), SILENT | ADAPTER);
	}

	/**
	 * @inheritdoc
	 */
	containsItem(item: T): boolean {
		return ArrayUtils.containsItem(this._items, item);
	}

	/**
	 * @inheritdoc
	 */
	every(callback: (item: T, index: number) => boolean, scope?: any): boolean {
		return this._items.every(callback, scope || this);
	}

	/**
	 * @inheritdoc
	 */
	toSorted(callback?: (item: T, key: number) => any, scope?: any, order?: number): T[] {
		return ArrayUtils.toSorted(this._items, callback, scope || this, order);
	}

	/**
	 * @inheritdoc
	 */
	$toSorted(callback?: (item: T, key: number) => any, scope?: any, order?: number): IList<T> {
		return new List<T>(this.toSorted(callback, scope, order), SILENT | ADAPTER);
	}

	/**
	 * @inheritdoc
	 */
	toSortedComparing(compare?: (t1: T, t2: T, k1: number, k2: number) => number, scope?: any, order?: number): T[] {
		return ArrayUtils.toSortedComparing(this._items, compare, scope || this, order);
	}

	/**
	 * @inheritdoc
	 */
	$toSortedComparing(compare?: (t1: T, t2: T, k1: number, k2: number) => number, scope?: any, order?: number): IList<T> {
		return new List<T>(this.toSortedComparing(compare, scope, order), SILENT | ADAPTER);
	}

	/**
	 * @inheritdoc
	 */
	getSortingKeys(callback?: (item: T, key: number) => any, scope?: any, order?: number): number[] {
		return ArrayUtils.getSortingKeys(this._items, callback, scope || this, order);
	}

	/**
	 * @inheritdoc
	 */
	$getSortingKeys(callback?: (item: T, key: number) => any, scope?: any, order?: number): IList<number> {
		return new List<number>(this.getSortingKeys(callback, scope, order), SILENT | ADAPTER);
	}

	/**
	 * @inheritdoc
	 */
	getSortingKeysComparing(compare?: (t1: T, t2: T, k1: number, k2: number) => number, scope?: any, order?: number): number[] {
		return ArrayUtils.getSortingKeysComparing(this._items, compare, scope || this, order);
	}

	/**
	 * @inheritdoc
	 */
	$getSortingKeysComparing(compare?: (t1: T, t2: T, k1: number, k2: number) => number, scope?: any, order?: number): IList<number> {
		return new List<number>(this.getSortingKeysComparing(compare, scope, order), SILENT | ADAPTER);
	}

	/**
	 * @inheritdoc
	 */
	$index(callback: (item: T, key: number) => string, scope?: any): IMap<T> {
		return new Map<T>(this.index(callback, scope), SILENT | ADAPTER);
	}

	/**
	 * @inheritdoc
	 */
	$filter(callback: (item: T, index: number) => boolean, scope?: any): IList<T> {
		return new List<T>(this._items.filter(callback, scope || this), SILENT | ADAPTER);
	}

	/**
	 * @inheritdoc
	 */
	count(callback: (item: T, index: number) => boolean, scope?: any): number {
		return ArrayUtils.count(this._items, callback, scope || this);
	}

	/**
	 * @inheritdoc
	 */
	$map<U>(callback: (item: T, index: number) => U, scope?: any): IList<U> {
		return new List<U>(this._items.map(callback, scope || this), SILENT | ADAPTER);
	}

	/**
	 * @inheritdoc
	 */
	toArray(): T[] {
		return this._items.concat();
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
	asArray(): T[] {
		return this._items;
	}

	/**
	 * @inheritdoc
	 */
	asList(): IList<T> {
		return this;
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
	asMap(): IMap<T> {
		return new Map<T>(this.asDictionary(), SILENT | ADAPTER);
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
			index = this._items.length;
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
	 * @returns The replaced item. If collection is not modified, returns undefined.
	 */
	trySet(item: T, index: number): Some<T> {
		const oldProxy = ArrayUtils.trySet(this._items, item, index);
		if (oldProxy === undefined) {
			return undefined;
		}
		this._replaceEvent.trigger({ sender: this, index: index, oldItem: oldProxy.value, newItem: item });
		this._changeEvent.trigger({ sender: this });
		if (this._ownsItems) {
			(<any>oldProxy.value).destroy();
		}
		return oldProxy;
	}

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
	$removeAll(index: number, count: number): IList<T> {
		return new List<T>(this.removeAll(index, count), SILENT | ADAPTER);
	}

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
			itemSet[(<any>items[i]).iid] = items[i];
		}
		var newItems = this._items.filter(function (item: any) { return !itemSet.hasOwnProperty(item.iid); });
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
	tryMove(fromIndex: number, toIndex: number): T {
		var item = ArrayUtils.tryMove(this._items, fromIndex, toIndex);
		if (item === undefined) {
			return undefined;
		}
		this._moveEvent.trigger({ sender: this, fromIndex: fromIndex, toIndex: toIndex, item: item });
		this._changeEvent.trigger({ sender: this });
		return item;
	}

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
	$clear(): IList<T> {
		return new List<T>(this.clear(), SILENT | ADAPTER);
	}

	/**
	 * @inheritdoc
	 */
	tryClear(): T[]{
		var oldItems = ArrayUtils.tryClear(this._items);
		if (oldItems === undefined) {
			return undefined;
		}
		this._length.set(0);
		this._clearEvent.trigger({ sender: this, items: oldItems });
		this._changeEvent.trigger({ sender: this });
		if (this._ownsItems) {
			ArrayUtils.backEvery(oldItems, destroy);
		}
		return oldItems;
	}

	/**
	 * Removes and inserts item ranges. Universal optimized granular operation of removal/insertion.
	 *
	 * @param removeParamsList Array of segments to remove sorted by index asc. Segments are removed in backward order.
	 * @param addParamsList Array of segments to insert sorted by index asc. Segments are inserted in forward order.
	 * @returns Splice result. Never returns null or undefined.
	 */
	splice(removeParamsList: IList.IndexCount[], addParamsList: IList.IndexItems<T>[]): IList.SpliceResult<T> {
		var result = this.trySplice(removeParamsList, addParamsList);
		return (result !== undefined) ? result : new ListSpliceResult(this._items.concat(), [], []);
	}

	/**
	 * Removes and inserts item ranges. Universal optimized granular operation of removal/insertion.
	 *
	 * @param removeParamsList Array of segments to remove sorted by index asc. Segments are removed in backward order.
	 * @param addParamsList Array of segments to insert sorted by index asc. Segments are inserted in forward order.
	 * @returns Splice result. If collection is not modified, returns undefined.
	 */
	trySplice(removeParamsList: IList.IndexCount[], addParamsList: IList.IndexItems<T>[]): IList.SpliceResult<T> {
		var result = ArrayUtils.trySplice(this._items, removeParamsList, addParamsList);
		if (result === undefined) {
			return undefined;
		}
		this._length.set(this._items.length);
		this._spliceEvent.trigger({ sender: this, spliceResult: result });
		this._changeEvent.trigger({ sender: this });
		if (this._ownsItems) {
			ArrayUtils.backEvery(result.removedItems, destroy);
		}
		return result;
	}

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
	tryReorder(indexArray: number[]): T[]{
		var items = ArrayUtils.tryReorder(this._items, indexArray);
		if (items === undefined) {
			return undefined;
		}
		this._reorderEvent.trigger({ sender: this, indexArray: indexArray, items: items });
		this._changeEvent.trigger({ sender: this });
		return items;
	}

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
	detectSplice(newItems: T[], getKey?: (item: T) => any, scope?: any): IList.SpliceParams<T> {
		return ArrayUtils.detectSplice(this._items, newItems, getKey || this.getKey, scope || this);
	}

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
	detectFilter(newItems: T[]): IList.IndexCount[]{
		return ArrayUtils.detectFilter(this._items, newItems);
	}

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
	detectReorder(newItems: T[], getKey?: (item: T) => any, scope?: any): number[] {
		return ArrayUtils.detectReorder(this._items, newItems, getKey || this.getKey, scope || this);
	}

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
	detectSort(callback?: (item: T, index: number) => any, scope?: any, order?: number): number[]{
		return ArrayUtils.detectSort(this._items, callback, scope || this, order);
	}

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
	detectSortComparing(compare?: (t1: T, t2: T, i1: number, i2: number) => number, scope?: any, order?: number): number[]{
		return ArrayUtils.detectSortComparing(this._items, compare, scope || this, order);
	}

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
		if (this.silent) {
			this._items.reverse();
			return;
		}
		var length = this.length.get();
		var indices = new Array<number>(length);
		for (var i = 0; i < length; ++i) {
			indices[i] = length - i - 1;
		}
		this.reorder(indices);
	}

	/**
	 * Builds a new array containing items of this array in reversed order.
	 * Current array is not modified.
	 *
	 * @returns Reversed array.
	 */
	toReversed(): T[] {
		return ArrayUtils.toReversed(this._items);
	}

	/**
	 * Builds a new array containing items of this array in reversed order.
	 * Current array is not modified.
	 *
	 * @returns Reversed array.
	 */
	$toReversed(): IList<T> {
		return new List(this.toReversed(), SILENT | ADAPTER);
	}

	/**
	 * Checks for equality (===) to another array, item by item.
	 *
	 * @param arr Another array.
	 * @returns Arrays are equal.
	 */
	equal(arr: T[]): boolean {
		return ArrayUtils.equal(this._items, arr);
	}

	/**
	 * Collapses multi-dimentional array.
	 *
	 * @param depth Dimentions to collapse.
	 * @returns Collapsed array.
	 */
	collapse(depth: number): any[]{
		return ArrayUtils.collapse(this._items, depth);
	}

	/**
	 * Returns item index in this collection.
	 *
	 * @returns Item index. If item doesn't exist, returns -1.
	 */
	indexOf(item: T): number {
		return this._items.indexOf(item);
	}

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
	backEvery(callback: (item: T, index: number) => boolean, scope?: any): boolean {
		return ArrayUtils.backEvery(this._items, callback, scope);
	}

	/**
	 * Removes last array item. Does nothing if array is empty.
	 *
	 * @returns The removed item or undefined.
	 */
	pop(): T {
		if (this._items.length !== 0) {
			return this.tryRemove(this._items.length - 1);
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
	binarySearch(value: T, compare?: (t1: T, t2: T) => number, scope?: any, order?: number): number {
		return ArrayUtils.binarySearch(this._items, value, compare, scope, order);
	}
}
