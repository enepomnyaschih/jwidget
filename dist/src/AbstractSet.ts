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

import {apply, destroy} from './Core';
import AbstractCollection from './AbstractCollection';
import Dictionary from './Dictionary';
import IArray from './IArray';
import IClass from './IClass';
import ISet from './ISet';
import ISetSpliceParams from './ISetSpliceParams';
import ISetSpliceResult from './ISetSpliceResult';
import * as ArrayUtils from './ArrayUtils';
import * as SetUtils from './SetUtils';

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
 * * [[getLength]] - Returns count of items in collection.
 * For observable collections, **length** property may come
 * in handy if you want to track collection length dynamically.
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
 * * [[filter]], [[$filter]], [[$$filter]] - Filters collection by criteria.
 * Builds new collection of the same type, consisting of items matching the criteria.
 * * [[count]], [[$count]], [[$$count]] - Counts the items matching criteria.
 * * [[map]], [[$map]], [[$$mapValues]], [[$$mapObjects]] - Maps collection items.
 * Builds new collection of the same type, consisting of results of mapping function call for each collection item.
 * * [[toSorted]], [[$toSorted]],
 * [[toSortedComparing]], [[$toSortedComparing]],
 * [[$$toSortedComparing]] -
 * Builds array consisting of collection items sorted by indexer or comparer.
 * * [[index]], [[$index]], [[$$index]] - Indexes collection.
 * Builds new map by rule: key is the result of indexer function call, value is the corresponding item.
 * * [[toArray]], [[$toArray]], [[$$toArray]] -
 * Builds new array consisting of collection items.
 * * [[toSet]], [[$toSet]], [[$$toSet]] -
 * Builds new set consisting of collection items.
 * * [[asArray]], [[$asArray]] - Represents collection as array.
 * * [[asSet]], [[$asSet]] - Represents collection as set.
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
abstract class AbstractSet<T extends IClass> extends AbstractCollection<T> implements ISet<T> {
	private json: Dictionary<T>;
	private _length: number;
	private _adapter: boolean;

	/**
	 * This constructor should be used to create a new empty set.
	 */
	constructor();

	/**
	 * This constructor should be used to create a new set and copy the items into it.
	 *
	 * @param items Initial set contents.
	 */
	constructor(items: T[]);

	/**
	 * This constructor should be used to wrap the **items** rather than copying them
	 * into a new set. Since set is a map from [[iid]]
	 * to items, you must pass this map as a first argument.
	 *
	 * @param items Initial set contents.
	 * @param adapter Used to distinguish the constructor implementations and
	 * for consistency to other collections. Must be true.
	 */
	constructor(items: Dictionary<T>, adapter: boolean);
	constructor(items?: any, adapter?: boolean) {
		super();
		this._adapter = Boolean(adapter);
		this.json = this._adapter ? items :
			items ? ArrayUtils.index(<T[]>items, function(item) { return String(item._iid); }) : {};
		this._length = SetUtils.getLength(this.json);
	}

	/**
	 * @inheritdoc
	 */
	ownItems(): this {
		super.ownItems();
		return this;
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
		return SetUtils.getFirst(this.json);
	}

	/**
	 * @inheritdoc
	 */
	containsItem(item: T): boolean {
		return this.json.hasOwnProperty(String(item._iid));
	}

	/**
	 * Shorthand to [[containsItem]].
	 */
	contains(item: T): boolean {
		return this.json.hasOwnProperty(String(item._iid));
	}

	/**
	 * @inheritdoc
	 */
	every(callback: (item: T) => boolean, scope?: any): boolean {
		return SetUtils.every(this.json, callback, scope);
	}

	/**
	 * @inheritdoc
	 */
	toSorted(callback?: (item: T) => any, scope?: any, order?: number): T[] {
		return SetUtils.toSorted(this.json, callback, scope || this, order);
	}

	/**
	 * @inheritdoc
	 */
	toSortedComparing(compare?: (t1: T, t2: T) => number, scope?: any, order?: number): T[] {
		return SetUtils.toSortedComparing(this.json, compare, scope || this, order);
	}

	/**
	 * @inheritdoc
	 */
	filter(callback: (item: T) => boolean, scope?: any): Dictionary<T> {
		return SetUtils.filter(this.json, callback, scope);
	}

	/**
	 * @inheritdoc
	 */
	abstract $filter(callback: (item: T) => boolean, scope?: any): ISet<T>;

	/**
	 * @inheritdoc
	 */
	count(callback: (item: T) => boolean, scope?: any): number {
		return SetUtils.count(this.json, callback, scope);
	}

	/**
	 * @inheritdoc
	 */
	map<U extends IClass>(callback: (item: T) => U, scope?: any): Dictionary<U> {
		return SetUtils.map(this.json, callback, scope);
	}

	/**
	 * @inheritdoc
	 */
	abstract $map<U extends IClass>(callback: (item: T) => U, scope?: any): ISet<U>;

	/**
	 * @inheritdoc
	 */
	toSet(): Dictionary<T> {
		return apply<T>({}, this.json);
	}

	/**
	 * @inheritdoc
	 */
	asSet(): Dictionary<T> {
		return this.json;
	}

	/**
	 * @inheritdoc
	 */
	$asSet(): ISet<T> {
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
	abstract $addAll(items: T[]): IArray<T>;

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
	abstract $removeAll(items: T[]): IArray<T>;

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
		var items = this.tryClear();
		return (items !== undefined) ? items : [];
	}

	/**
	 * @inheritdoc
	 */
	abstract $clear(): IArray<T>;

	/**
	 * @inheritdoc
	 */
	tryClear(): T[] {
		var items = this._tryClear();
		if (items !== undefined && this._ownsItems) {
			ArrayUtils.backEvery(items, destroy);
		}
		return items;
	}

	_tryClear(): T[] {
		if (this._length === 0) {
			return undefined;
		}
		var items: T[];
		this._length = 0;
		if (this._adapter) {
			items = SetUtils.tryClear(this.json);
		} else {
			items = this.toArray();
			this.json = {};
		}
		return items;
	}

	/**
	 * Removes and adds multiple items in set. Universal optimized granular operation of removal/insertion.
	 * @param removedItems Items to remove.
	 * @param addedItems Items to add.
	 * @returns Splice result. Never returns null or undefined.
	 */
	splice(removedItems: T[], addedItems: T[]): ISetSpliceResult<T> {
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
	trySplice(removedItems: T[], addedItems: T[]): ISetSpliceResult<T> {
		var spliceResult = this._trySplice(removedItems, addedItems);
		if ((spliceResult !== undefined) && this._ownsItems) {
			ArrayUtils.backEvery(spliceResult.removedItems, destroy);
		}
		return spliceResult;
	}

	_trySplice(removedItems: T[], addedItems: T[]): ISetSpliceResult<T> {
		var spliceResult = SetUtils.trySplice(this.json, removedItems, addedItems);
		if (spliceResult !== undefined) {
			this._length += spliceResult.addedItems.length - spliceResult.removedItems.length;
			return spliceResult;
		}
		return undefined;
	}

	/**
	 * Detects [[splice]] method arguments to adjust set contents to **newItems**.
	 * Determines which items should be removed and which ones should be added.
	 * @param newItems New set contents.
	 * @returns [[splice]] method arguments. If no method call required, returns undefined.
	 */
	detectSplice(newItems: T[]): ISetSpliceParams<T> {
		return SetUtils.detectSplice(this.json, newItems);
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
		return SetUtils.equal(this.json, array);
	}

	/**
	 * @inheritdoc
	 */
	abstract createEmpty<U extends IClass>(): ISet<U>;
}

export default AbstractSet;
