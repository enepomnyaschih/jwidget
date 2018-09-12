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

import DestroyableReadonlyList from './DestroyableReadonlyList';
import ICollection from './ICollection';
import IMap from './IMap';
import Listenable from './Listenable';
import Reducer from './Reducer';
import Some from './Some';

/**
 * Extension of DestroyableReadonlyList with modification methods.
 * @param T List item type.
 */
interface IList<T> extends ICollection<T>, DestroyableReadonlyList<T> {

	/**
	 * The list is cleared.
	 */
	readonly clearEvent: Listenable<IList.ItemsEventParams<T>>;

	/**
	 * The list is changed. Triggered right after any another event.
	 */
	readonly changeEvent: Listenable<IList.EventParams<T>>;

	/**
	 * Returns a full copy of this collection.
	 */
	clone(): IList<T>;

	/**
	 * @inheritDoc
	 */
	every(callback: (item: T, index: number) => any, scope?: any): boolean;

	/**
	 * @inheritDoc
	 */
	some(callback: (item: T, index: number) => any, scope?: any): boolean;

	/**
	 * @inheritDoc
	 */
	forEach(callback: (item: T, index: number) => any, scope?: any): void;

	/**
	 * @inheritDoc
	 */
	findIndex(callback: (item: T, index: number) => any, scope?: any): number;

	/**
	 * @inheritDoc
	 */
	find(callback: (item: T, index: number) => any, scope?: any): T;

	/**
	 * @inheritDoc
	 */
	toSorted(callback?: (item: T, index: number) => any, scope?: any, order?: number): IList<T>;

	/**
	 * @inheritDoc
	 */
	toSortedComparing(compare?: (t1: T, t2: T, k1: number, k2: number) => number, scope?: any, order?: number): IList<T>;

	/**
	 * @inheritDoc
	 */
	getSortingIndices(callback?: (item: T, index: number) => any, scope?: any, order?: number): IList<number>;

	/**
	 * @inheritDoc
	 */
	getSortingIndicesComparing(compare?: (t1: T, t2: T, k1: number, k2: number) => number, scope?: any, order?: number): IList<number>;

	/**
	 * @inheritDoc
	 */
	index(callback: (item: T, index: number) => any, scope?: any): IMap<T>;

	/**
	 * @inheritDoc
	 */
	filter(callback: (item: T, index: number) => any, scope?: any): IList<T>;

	/**
	 * @inheritDoc
	 */
	count(callback: (item: T, index: number) => any, scope?: any): number;

	/**
	 * @inheritDoc
	 */
	map<U>(callback: (item: T, index: number) => U, scope?: any, getKey?: (item: U) => any): IList<U>;

	/**
	 * @inheritDoc
	 */
	reduce<U>(reducer: Reducer<T, U>): U;

	/**
	 * @inheritDoc
	 */
	reduce<U>(callback: (accumulator: U, item: T, index: number) => U, initial: U): U;

	/**
	 * @inheritDoc
	 */
	max(callback?: (item: T, index: number) => any, scope?: any, order?: number): T;

	/**
	 * @inheritDoc
	 */
	maxIndex(callback?: (item: T, index: number) => any, scope?: any, order?: number): number;

	/**
	 * @inheritDoc
	 */
	maxComparing(compare?: (t1: T, t2: T, i1: number, i2: number) => number, scope?: any, order?: number): T;

	/**
	 * @inheritDoc
	 */
	maxIndexComparing(compare?: (t1: T, t2: T, i1: number, i2: number) => number, scope?: any, order?: number): number;

	/**
	 * @inheritDoc
	 */
	min(callback?: (item: T, index: number) => any, scope?: any, order?: number): T;

	/**
	 * @inheritDoc
	 */
	minIndex(callback?: (item: T, index: number) => any, scope?: any, order?: number): number;

	/**
	 * @inheritDoc
	 */
	minComparing(compare?: (t1: T, t2: T, i1: number, i2: number) => number, scope?: any, order?: number): T;

	/**
	 * @inheritDoc
	 */
	minIndexComparing(compare?: (t1: T, t2: T, i1: number, i2: number) => number, scope?: any, order?: number): number;

	/**
	 * Inserts an item to the list.
	 * @param item Item to insert.
	 * @param index Index of an item to insert new one before. By default, appends the item to the end of collection.
	 */
	add(item: T, index?: number): void;

	/**
	 * Inserts item range to the list.
	 * @param items Items to insert.
	 * @param index Index of an item to insert new ones before. By default, appends the items to the end of collection.
	 */
	addAll(items: T[], index?: number): void;

	/**
	 * Replaces item at specified position.
	 * @param index Index of an item to replace. If list doesn't contain such index, it may lead to unknown consequences.
	 * @param item Item to put into the list.
	 * @returns The replaced item.
	 */
	set(index: number, item: T): T;

	/**
	 * Removes item at specified index.
	 * @param index Index of an item to remove. If list doesn't contain such index, it may lead to unknown consequences.
	 * @returns The removed item.
	 */
	remove(index: number): T;

	/**
	 * Removes item range from the list.
	 * @param index Index of the first item to remove.
	 * @param count Count of items to remove.
	 * @returns The removed items.
	 */
	removeAll(index: number, count: number): T[];

	/**
	 * Moves an item inside the list.
	 * @param fromIndex Item index to move.
	 * @param toIndex Index to move to.
	 * @returns The moved item.
	 */
	move(fromIndex: number, toIndex: number): T;

	/**
	 * @inheritDoc
	 */
	clear(): T[];

	/**
	 * Removes and inserts item ranges. Universal optimized granular operation of removal/insertion.
	 * @param removeParamsList Array of segments to remove sorted by index asc. Segments are removed in backward order.
	 * @param addParamsList Array of segments to insert sorted by index asc. Segments are inserted in forward order.
	 * @returns Splice result. Never returns null or undefined.
	 */
	splice(removeParamsList: IList.IndexCount[], addParamsList: IList.IndexItems<T>[]): IList.SpliceResult<T>;

	/**
	 * Reorders list items.
	 * @param indexArray Index array. Item with index `i` will be moved to index `indexArray[i]`.
	 * Must contain all indexes from 0 to (length - 1).
	 */
	reorder(indexArray: number[]): void;

	/**
	 * Replaces item at specified index.
	 * @param index Index of an item to replace. If list doesn't contain such index, it may lead to unknown consequences.
	 * @param item Item to put into the list.
	 * @returns Wrapper over the replaced item. If collection is not modified, returns undefined.
	 */
	trySet(index: number, item: T): Some<T>;

	/**
	 * Removes item range from the list.
	 * @param index Index of the first item to remove.
	 * @param count Count of items to remove.
	 * @returns The removed items. If collection is not modified, returns undefined.
	 */
	tryRemoveAll(index: number, count: number): T[];

	/**
	 * Moves an item inside the list.
	 * @param fromIndex Item index to move.
	 * @param toIndex Index to move to.
	 * @returns The moved item. If collection is not modified, returns undefined.
	 */
	tryMove(fromIndex: number, toIndex: number): T;

	/**
	 * Removes and inserts item ranges. Universal optimized granular operation of removal/insertion.
	 * @param removeParamsList Array of segments to remove sorted by index asc. Segments are removed in backward order.
	 * @param addParamsList Array of segments to insert sorted by index asc. Segments are inserted in forward order.
	 * @returns Splice result. If collection is not modified, returns undefined.
	 */
	trySplice(removeParamsList: IList.IndexCount[], addParamsList: IList.IndexItems<T>[]): IList.SpliceResult<T>;

	/**
	 * Reorders list items.
	 * @param indexArray Index array. Item with index `i` will be moved to index `indexArray[i]`.
	 * Must contain all indexes from 0 to (length - 1).
	 * @returns Old list contents. If collection is not modified, returns undefined.
	 */
	tryReorder(indexArray: number[]): T[];

	/**
	 * Adjusts list contents to `newItems` using `detectSplice` and `splice` methods.
	 * All items must have unique `getKey` function result.
	 * If items don't have unique key, probably `performFilter` method may help,
	 * because it doesn't require item uniquiness.
	 * @param newItems New list contents.
	 * @param getKey Function which returns unique key of an item in this collection.
	 * Defaults to `getKey` property of the collection.
	 * @param scope `getKey` call scope. Defaults to collection itself.
	 */
	performSplice(newItems: T[], getKey?: (item: T) => any, scope?: any): void;

	/**
	 * Adjusts list contents to `newItems` using `detectFilter` and `splice` methods. Only removes items.
	 * Doesn't assume items insertion - try `detectSplice` if that's the case.
	 * In advantage to `detectSplice`, doesn't require item uniquiness.
	 * @param newItems New list contents.
	 */
	performFilter(newItems: T[]): void;

	/**
	 * Adjusts list contents to `newItems` using `detectReorder` and `reorder` methods.
	 * @param newItems New list contents.
	 * @param getKey Function which returns unique key of an item in this collection.
	 * Defaults to `getKey` property of the collection.
	 * @param scope `getKey` call scope. Defaults to collection itself.
	 */
	performReorder(newItems: T[], getKey?: (item: T) => any, scope?: any): void;

	/**
	 * Sorts the list by result of `callback` function call for each item.
	 * @param callback Indexer function. Must return a comparable value, compatible with
	 * `cmp`. Returns item itself by default.
	 * @param scope `callback` call scope. Defaults to collection itself.
	 * @param order Sorting order. Positive number for ascending sorting, negative for descending sorting.
	 */
	sort(callback?: (item: T, index: number) => any, scope?: any, order?: number): void;

	/**
	 * Sorts the list by comparer.
	 * @param compare Comparer function. Should return positive value if t1 > t2;
	 * negative value if t1 < t2; 0 if t1 == t2. Defaults to `cmp`.
	 * @param scope `comparer` call scope. Defaults to collection itself.
	 * @param order Sorting order. Positive number for ascending sorting, negative for descending sorting.
	 */
	sortComparing(compare?: (t1: T, t2: T, i1: number, i2: number) => number, scope?: any, order?: number): void;

	/**
	 * Reverses item order in the list. Modifies the list itself.
	 */
	reverse(): void;

	/**
	 * Removes last item from the list. Does nothing if the list is empty.
	 * @returns The removed item or undefined.
	 */
	pop(): T;
}

export default IList;

namespace IList {
	/**
	 * `IList` event parameters.
	 * @param T Item type.
	 */
	export interface EventParams<T> extends ICollection.EventParams<T> {
		/**
		 * Event sender.
		 */
		readonly sender: IList<T>;
	}

	/**
	 * Parameters of `spliceEvent`.
	 * @param T Item type.
	 */
	export interface SpliceEventParams<T> extends EventParams<T> {
		/**
		 * Result of `splice` method.
		 */
		readonly spliceResult: SpliceResult<T>;
	}

	/**
	 * Parameters of `moveEvent`.
	 * @param T Item type.
	 */
	export interface MoveEventParams<T> extends EventParams<T> {
		/**
		 * Where item is moved from.
		 */
		readonly fromIndex: number;

		/**
		 * Where item is moved to.
		 */
		readonly toIndex: number;

		/**
		 * The moved item.
		 */
		readonly item: T;
	}

	/**
	 * Parameters of `replaceEvent`.
	 * @param T Item type.
	 */
	export interface ReplaceEventParams<T> extends EventParams<T> {
		/**
		 * Index of the replaced item.
		 */
		readonly index: number;

		/**
		 * Old item.
		 */
		readonly oldItem: T;

		/**
		 * New item.
		 */
		readonly newItem: T;
	}

	/**
	 * Parameters of `clearEvent`.
	 * @param T Item type.
	 */
	export interface ItemsEventParams<T> extends EventParams<T> {
		/**
		 * Old list contents.
		 */
		readonly items: T[];
	}

	/**
	 * Parameters of `reorderEvent`.
	 * @param T Item type.
	 */
	export interface ReorderEventParams<T> extends ItemsEventParams<T> {
		/**
		 * Indexes of items in reordered list.
		 */
		readonly indexArray: number[];
	}

	/**
	 * IList.splice method arguments. Result of `detectSplice` method.
	 * @param T Item type.
	 */
	export interface SpliceParams<T> {
		/**
		 * Segments to remove.
		 */
		readonly removeParamsList: IndexCount[];

		/**
		 * Segments to add.
		 */
		readonly addParamsList: IndexItems<T>[];
	}

	/**
	 * IList.splice method result.
	 */
	export interface SpliceResult<T> {
		/**
		 * Old list contents.
		 */
		readonly oldItems: T[];

		/**
		 * Removed item segments.
		 */
		readonly removedItemsList: IndexItems<T>[];

		/**
		 * Added item segments.
		 */
		readonly addedItemsList: IndexItems<T>[];

		/**
		 * Plain array of all removed items.
		 */
		readonly removedItems: T[];

		/**
		 * Plain array of all added items.
		 */
		readonly addedItems: T[];

		/**
		 * Removed item segments converted to index and count pairs.
		 */
		readonly removeParamsList: IndexCount[];

		/**
		 * The splice call didn't change the list.
		 */
		readonly empty: boolean;
	}

	/**
	 * Index and count pair. Used in IList.splice method arguments to specify item segments to remove.
	 */
	export interface IndexCount {
		/**
		 * Index.
		 */
		readonly index: number;

		/**
		 * Count.
		 */
		readonly count: number;

		/**
		 * Clones pair.
		 */
		clone(): IndexCount;
	}

	/**
	 * Index and items pair. Used in IList.splice method arguments to specify item segments to insert, and in
	 * ListSpliceResult class to specify removed and added item segments.
	 */
	export interface IndexItems<T> {
		/**
		 * Index.
		 */
		readonly index: number;

		/**
		 * Items.
		 */
		readonly items: T[];

		/**
		 * Converts to index and count pair.
		 */
		toIndexCount(): IndexCount;

		/**
		 * Clones pair.
		 */
		clone(): IndexItems<T>;
	}
}
