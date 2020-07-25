/*
MIT License

Copyright (c) 2020 Egor Nepomnyaschih

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
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
	readonly onClear: Listenable<IList.MessageWithItems<T>>;

	/**
	 * The list is changed. Dispatched right after any another message.
	 */
	readonly onChange: Listenable<IList.Message<T>>;

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
	 * Message of IList.
	 * @param T Item type.
	 */
	export interface Message<T> extends ICollection.Message<T> {
		/**
		 * Message sender.
		 */
		readonly sender: IList<T>;
	}

	/**
	 * List splice message.
	 * @param T Item type.
	 */
	export interface SpliceMessage<T> extends Message<T> {
		/**
		 * Result of `splice` method.
		 */
		readonly spliceResult: SpliceResult<T>;
	}

	/**
	 * List item movement message.
	 * @param T Item type.
	 */
	export interface MoveMessage<T> extends Message<T> {
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
	 * List item replacement message.
	 * @param T Item type.
	 */
	export interface ReplaceMessage<T> extends Message<T> {
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
	 * List message with items.
	 * @param T Item type.
	 */
	export interface MessageWithItems<T> extends Message<T> {
		/**
		 * Old list contents.
		 */
		readonly items: T[];
	}

	/**
	 * List item reordering message.
	 * @param T Item type.
	 */
	export interface ReorderMessage<T> extends MessageWithItems<T> {
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
