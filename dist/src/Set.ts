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
import {apply, destroy, iid, isArray} from './index';
import {CollectionFlags, SILENT, ADAPTER} from './index';
import AbstractCollection from './AbstractCollection';
import Dictionary from './Dictionary';
import Event from './Event';
import Identifiable from './Identifiable';
import IList from './IList';
import IEvent from './IEvent';
import IMap from './IMap';
import ISet from './ISet';
import List from './List';
import Map from './Map';
import * as ArrayUtils from './ArrayUtils';
import * as DictionaryUtils from './DictionaryUtils';

/**
 * Set is unordered collection optimized for items adding, removal and search. Unlike
 * array and map, set can contain only [[JW.Class]] instances. Internal set representation is
 * map from [[iid]] to items themselves.
 *
 * # Set methods
 *
 * **Difference compared to [[JW.AbstractCollection]] is in bold.**
 *
 * Content retrieving:
 *
 * * [[length]] - Collection length property.
 * * [[isEmpty]] - Checks collection for emptiness.
 * * [[getFirst]] - Returns first item in collection.
 * * [[containsItem]] - Does collection contain the item?
 * - **[[getJson]] - Returns internal representation of set.**
 *
 * Iteration algorithms:
 *
 * * [[every]] - Checks all items by criteria.
 * Returns true if all items match the criteria.
 * * [[some]] - Checks each item by criteria.
 * Returns true if some item matches the criteria.
 * * [[each]] - Iterates items through.
 * * [[search]] - Finds item by criteria.
 * Returns first item matching the criteria.
 * * [[filter]], [[filter]], [[$filter]] - Filters collection by criteria.
 * Builds new collection of the same type, consisting of items matching the criteria.
 * * [[count]], [[$count]], [[$$count]] - Counts the items matching criteria.
 * * [[map]], [[map]], [[$mapValues]], [[$mapObjects]] - Maps collection items.
 * Builds new collection of the same type, consisting of results of mapping function call for each collection item.
 * * [[toSorted]], [[$toSorted]],
 * [[toSortedComparing]], [[$toSortedComparing]],
 * [[$$toSortedComparing]] -
 * Builds array consisting of collection items sorted by indexer or comparer.
 * * [[index]], [[$index]], [[$$index]] - Indexes collection.
 * Builds new map by rule: key is the result of indexer function call, value is the corresponding item.
 * * [[toArray]], [[$toArray]], [[$$toArray]] -
 * Builds new array consisting of collection items.
 * * [[toSet]], [[toSet]], [[$toSet]] -
 * Builds new set consisting of collection items.
 * * [[asArray]], [[$asArray]] - Represents collection as array.
 * * [[asSet]], [[asSet]] - Represents collection as set.
 *
 * Collection modification:
 *
 * - **[[add]], [[tryAdd]] - Adds item to set.**
 * - **[[addAll]], [[$addAll]],
 * [[tryAddAll]] - Adds multiple items to set.**
 * - **[[remove]], [[tryRemove]] - Removes item from set.**
 * - **[[removeAll]], [[$removeAll]],
 * [[tryRemoveAll]] - Removes multiple items from set.**
 * * [[removeItem]] - Removes first occurency of an item in collection.
 * * [[removeItems]] - Removes all occurencies of items in collection.
 * * [[clear]], [[$clear]], [[tryClear]] - Clears collection.
 * - **[[splice]], [[trySplice]] - Removes and adds multiple items.**
 * - **[[performSplice]] - Adjusts contents using [[splice]] method.**
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
 *
 * Similar collection creation (for algorithms and synchronizers implementation):
 *
 * * [[createEmpty]] - Creates empty collection of the same type.
 * * [[createEmptyArray]] - Creates empty array of the same observability type.
 * * [[createEmptyMap]] - Creates empty map of the same observability type.
 * * [[createEmptySet]] - Creates empty set of the same observability type.
 *
 * Other methods:
 *
 * - **[[detectSplice]] - Detects [[splice]] method arguments to adjust contents.**
 * - **[[equal]] - Checks for equality to array.**
 *
 * All the same algorithms are also available for native JavaScript Object as set,
 * see [[JW.Set]] static methods.
 *
 * @param T Collection item type.
 */
class Set<T extends Identifiable> extends AbstractCollection<T> implements ISet<T> {
	private _adapter: boolean;
	private _items: Dictionary<T>;

	private _spliceEvent : IEvent<ISet.SpliceEventParams<T>>;
	private _clearEvent  : IEvent<ISet.ItemsEventParams<T>>;
	private _changeEvent : IEvent<ISet.EventParams<T>>;

	/**
	 * This constructor should be used to create a new set and copy the items into it.
	 *
	 * @param items Initial set contents.
	 */
	constructor(silent?: boolean);
	constructor(items: T[], silent?: boolean);
	constructor(items: Dictionary<T>, flags?: CollectionFlags);
	constructor(a?: any, b?: any) {
		const valued = (typeof a !== "boolean");
		const arr = (typeof b === "boolean") || (isArray(a) && b == null);
		const silent = Boolean(arr ? b : valued ? (b & SILENT) : a);
		const adapter = !arr && valued && Boolean(b & ADAPTER);
		const items: Dictionary<T> = (!valued || !a) ? {} : arr ? ArrayUtils.index<T>(a, iid) : a;

		super(silent);
		this._adapter = adapter;
		this._items = this._adapter ? items : apply<T>({}, items);
		this._length.set((!valued || !a) ? 0 : arr ? a.length : DictionaryUtils.getLength(items));

		this._spliceEvent = Event.make<ISet.SpliceEventParams<T>>(this, silent);
		this._clearEvent  = Event.make<ISet.ItemsEventParams<T>>(this, silent);
		this._changeEvent = Event.make<ISet.EventParams<T>>(this, silent);
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
	 * @inheritdoc
	 */
	get first(): T {
		return DictionaryUtils.getFirst(this._items);
	}

	/**
	 * Items are removed from set, items are added to set.
	 * Triggered in result of calling:
	 *
	 * * [[add]]
	 * * [[tryAdd]]
	 * * [[addAll]]
	 * * [[$addAll]]
	 * * [[tryAddAll]]
	 * * [[remove]]
	 * * [[tryRemove]]
	 * * [[removeItem]]
	 * * [[removeAll]]
	 * * [[$removeAll]]
	 * * [[tryRemoveAll]]
	 * * [[removeItems]]
	 * * [[splice]]
	 * * [[trySplice]]
	 * * [[performSplice]]
	 */
	get spliceEvent(): Listenable<ISet.SpliceEventParams<T>> {
		return this._spliceEvent;
	}

	/**
	 * Set is cleared. Triggered in result of calling:
	 *
	 * * [[clear]]
	 * * [[$clear]]
	 * * [[tryClear]]
	 */
	get clearEvent(): Listenable<ISet.ItemsEventParams<T>> {
		return this._clearEvent;
	}

	/**
	 * Set is changed. Triggered right after any another event.
	 */
	get changeEvent(): Listenable<ISet.EventParams<T>> {
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
	containsItem(item: T): boolean {
		return this._items.hasOwnProperty(String(item.iid));
	}

	/**
	 * Shorthand to [[containsItem]].
	 */
	contains(item: T): boolean {
		return this._items.hasOwnProperty(String(item.iid));
	}

	/**
	 * @inheritdoc
	 */
	every(callback: (item: T) => boolean, scope?: any): boolean {
		return DictionaryUtils.every(this._items, callback, scope);
	}

	/**
	 * @inheritdoc
	 */
	toSorted(callback?: (item: T) => any, scope?: any, order?: number): T[] {
		return DictionaryUtils.toSorted(this._items, callback, scope || this, order);
	}

	/**
	 * @inheritdoc
	 */
	$toSorted(callback?: (item: T) => any, scope?: any, order?: number): IList<T> {
		return new List<T>(this.toSorted(callback, scope, order), SILENT | ADAPTER);
	}

	/**
	 * @inheritdoc
	 */
	toSortedComparing(compare?: (t1: T, t2: T) => number, scope?: any, order?: number): T[] {
		return DictionaryUtils.toSortedComparing(this._items, compare, scope || this, order);
	}

	/**
	 * @inheritdoc
	 */
	$toSortedComparing(compare?: (t1: T, t2: T) => number, scope?: any, order?: number): IList<T> {
		return new List<T>(this.toSortedComparing(compare, scope, order), SILENT | ADAPTER);
	}

	/**
	 * @inheritdoc
	 */
	$index(callback: (item: T) => string, scope?: any): IMap<T> {
		return new Map<T>(this.index(callback, scope), SILENT | ADAPTER);
	}

	/**
	 * @inheritdoc
	 */
	filter(callback: (item: T) => boolean, scope?: any): ISet<T> {
		return new Set<T>(DictionaryUtils.filter(this._items, callback, scope), SILENT | ADAPTER);
	}

	/**
	 * @inheritdoc
	 */
	count(callback: (item: T) => boolean, scope?: any): number {
		return DictionaryUtils.count(this._items, callback, scope);
	}

	/**
	 * @inheritdoc
	 */
	map<U extends Identifiable>(callback: (item: T) => U, scope?: any): ISet<U> {
		return new Set<U>(DictionaryUtils.map(this._items, callback, scope), SILENT | ADAPTER);
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
	toSet(): ISet<T> {
		return new Set<T>(this._items, SILENT);
	}

	/**
	 * @inheritdoc
	 */
	asSet(): ISet<T> {
		return this;
	}

	/**
	 * Adds an item to set if one is absent.
	 * @returns Item is added successfully. False if item is already present.
	 */
	add(item: T): boolean {
		return this.tryAdd(item) !== undefined;
	}

	/**
	 * Adds an item to set if one is absent.
	 * @returns Item is added successfully. If collection is not modified, returns undefined.
	 * In other words, this method may return true or undefined.
	 */
	tryAdd(item: T): boolean {
		if (this.trySplice([], [item]) !== undefined) {
			return true;
		}
		return undefined;
	}

	/**
	 * Adds multiple items to set, ones that are absent.
	 * @returns The added items.
	 */
	addAll(items: T[]): T[] {
		var result = this.tryAddAll(items);
		return (result !== undefined) ? result : [];
	}

	/**
	 * Adds multiple items to set, ones that are absent.
	 * @returns The added items.
	 */
	$addAll(items: T[]): IList<T> {
		return new List<T>(this.addAll(items), SILENT | ADAPTER);
	}

	/**
	 * Adds multiple items to set, ones that are absent.
	 * @returns The added items.
	 * If collection is not modified, returns undefined.
	 */
	tryAddAll(items: T[]): T[] {
		var spliceResult = this.trySplice([], items);
		if (spliceResult !== undefined) {
			return spliceResult.addedItems;
		}
		return undefined;
	}

	/**
	 * Removes an item from set if one is present.
	 * @returns Item is removed successfully. Returns false if item is already absent.
	 */
	remove(item: T): boolean {
		return this.tryRemove(item) !== undefined;
	}

	/**
	 * Removes an item from set if one is present.
	 * @returns Item is removed successfully. If collection is not modified, returns undefined.
	 * In other words, this method may return true or undefined.
	 */
	tryRemove(item: T): boolean {
		if (this.trySplice([item], []) !== undefined) {
			return true;
		}
		return undefined;
	}

	/**
	 * @inheritdoc
	 */
	removeItem(item: T) {
		this.tryRemove(item);
	}

	/**
	 * Removes multiple items from set, ones that are present.
	 * @returns The removed items.
	 */
	removeAll(items: T[]): T[] {
		var result = this.tryRemoveAll(items);
		return (result !== undefined) ? result : [];
	}

	/**
	 * Removes multiple items from set, ones that are present.
	 * @returns The removed items.
	 */
	$removeAll(items: T[]): IList<T> {
		return new List<T>(this.removeAll(items), SILENT | ADAPTER);
	}

	/**
	 * Removes multiple items from set, ones that are present.
	 * @returns The removed items.
	 * If collection is not modified, returns undefined.
	 */
	tryRemoveAll(items: T[]): T[] {
		var spliceResult = this.trySplice(items, []);
		if (spliceResult !== undefined) {
			return spliceResult.removedItems;
		}
		return undefined;
	}

	/**
	 * @inheritdoc
	 */
	removeItems(items: T[]) {
		this.tryRemoveAll(items);
	}

	/**
	 * @inheritdoc
	 */
	clear(): T[] {
		var items = this._tryClear();
		if (items === undefined) {
			return undefined;
		}
		this._clearEvent.trigger({ sender: this, items: items });
		this._changeEvent.trigger({ sender: this });
		if (this._ownsItems) {
			ArrayUtils.backEvery(items, destroy);
		}
		return items;
	}

	_tryClear(): T[] {
		if (this._length.get() === 0) {
			return undefined;
		}
		var items: T[];
		this._length.set(0);
		items = this.toArray();
		if (this._adapter) {
			DictionaryUtils.tryClear(this._items);
		} else {
			this._items = {};
		}
		return items;
	}

	/**
	 * Removes and adds multiple items in set. Universal optimized granular operation of removal/insertion.
	 * @param removedItems Items to remove.
	 * @param addedItems Items to add.
	 * @returns Splice result. Never returns null or undefined.
	 */
	splice(removedItems: T[], addedItems: T[]): ISet.SpliceResult<T> {
		var spliceResult = this.trySplice(removedItems, addedItems);
		return (spliceResult !== undefined) ? spliceResult : { addedItems: [], removedItems: [] };
	}

	/**
	 * Removes and adds multiple items in set. Universal optimized granular operation of removal/insertion.
	 * @param removedItems Items to remove.
	 * @param addedItems Items to add.
	 * @returns Splice result.
	 * If collection is not modified, returns undefined.
	 */
	trySplice(removedItems: T[], addedItems: T[]): ISet.SpliceResult<T> {
		const spliceResult = this._trySplice(removedItems, addedItems);
		if (spliceResult === undefined) {
			return undefined;
		}
		this._spliceEvent.trigger({ sender: this, spliceResult: spliceResult });
		this._changeEvent.trigger({ sender: this });
		if (this._ownsItems) {
			ArrayUtils.backEvery(spliceResult.removedItems, destroy);
		}
		return spliceResult;
	}

	_trySplice(removedItems: T[], addedItems: T[]): ISet.SpliceResult<T> {
		var addedItemSet = ArrayUtils.index(addedItems, iid);
		removedItems = removedItems.filter(function (item) {
			return !addedItemSet.hasOwnProperty(String(item.iid));
		});
		removedItems = this._tryRemoveAll(removedItems);
		addedItems = this._tryAddAll(addedItems);
		if ((removedItems === undefined) && (addedItems === undefined)) {
			return undefined;
		}
		const spliceResult = { removedItems: removedItems || [], addedItems: addedItems || [] };
		this._length.set(this._length.get() + spliceResult.addedItems.length - spliceResult.removedItems.length);
		return spliceResult;
	}

	_tryRemoveAll(items: T[]): T[] {
		const removedItems: T[] = [];
		for (let i = 0, l = items.length; i < l; ++i) {
			const item = items[i];
			if (this._tryRemove(item)) {
				removedItems.push(item);
			}
		}
		if (removedItems.length !== 0) {
			return removedItems;
		}
		return undefined;
	}

	_tryRemove(item: T): boolean {
		const iid = String(item.iid);
		if (!this._items.hasOwnProperty(iid)) {
			return undefined;
		}
		delete this._items[iid];
		return true;
	}

	_tryAddAll(items: T[]): T[] {
		const addedItems: T[] = [];
		for (let i = 0, l = items.length; i < l; ++i) {
			const item = items[i];
			if (this._tryAdd(item)) {
				addedItems.push(item);
			}
		}
		if (addedItems.length !== 0) {
			return addedItems;
		}
		return undefined;
	}

	_tryAdd(item: T): boolean {
		const iid = String(item.iid);
		if (this._items.hasOwnProperty(iid)) {
			return undefined;
		}
		this._items[iid] = item;
		return true;
	}

	/**
	 * Detects [[splice]] method arguments to adjust set contents to **newItems**.
	 * Determines which items should be removed and which ones should be added.
	 * @param newItems New set contents.
	 * @returns [[splice]] method arguments. If no method call required, returns undefined.
	 */
	detectSplice(newItemArray: T[]): ISet.SpliceParams<T> {
		var removedItems: T[] = [];
		var addedItems: T[] = [];
		var newItems: Dictionary<T> = ArrayUtils.index<T>(newItemArray, function (item) {
			return String(item.iid);
		});
		for (var key in this._items) {
			if (!newItems.hasOwnProperty(key)) {
				removedItems.push(this._items[key]);
			}
		}
		for (var key in newItems) {
			if (!this._items.hasOwnProperty(key)) {
				addedItems.push(newItems[key]);
			}
		}
		if ((removedItems.length !== 0) || (addedItems.length !== 0)) {
			return { removedItems: removedItems, addedItems: addedItems };
		}
		return undefined;
	}

	/**
	 * Adjusts set contents to **newItems** using [[detectSplice]] and
	 * [[splice]] methods.
	 * @param newItems New set contents.
	 */
	performSplice(newItems: T[]) {
		var spliceParams = this.detectSplice(newItems);
		if (spliceParams !== undefined) {
			this.trySplice(spliceParams.removedItems, spliceParams.addedItems);
		}
	}

	/**
	 * Checks for equality (===) to array, item by item.
	 */
	equal(array: T[]): boolean {
		if (this.length.get() !== array.length) {
			return false;
		}
		for (let i = 0, l = array.length; i < l; ++i) {
			if (!this._items.hasOwnProperty(String(array[i].iid))) {
				return false;
			}
		}
		return true;
	}
}

export default Set;
