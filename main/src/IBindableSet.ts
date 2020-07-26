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

import DestroyableReadonlyBindableSet from './DestroyableReadonlyBindableSet';
import IClass from "./IClass";
import Listenable from './Listenable';

/**
 * Extension of DestroyableReadonlySet with modification methods.
 * @param T Map item type.
 */
interface IBindableSet<T> extends IClass, DestroyableReadonlyBindableSet<T> {

	/**
	 * The set is cleared.
	 */
	readonly onClear: Listenable<IBindableSet.MessageWithItems<T>>;

	/**
	 * The set is changed. Dispatched right after any another message.
	 */
	readonly onChange: Listenable<IBindableSet.Message<T>>;

	/**
	 * @inheritDoc
	 */
	clone(): IBindableSet<T>;

	/**
	 * @inheritDoc
	 */
	filter(callback: (item: T) => any, scope?: any): IBindableSet<T>;

	/**
	 * @inheritDoc
	 */
	map<U>(callback: (item: T) => U, scope?: any, getKey?: (item: U) => any): IBindableSet<U>;

	/**
	 * Makes this collection an owner of its items, which means that its items are alive as long as they are present in
	 * this collection. The item is destroyed when it leaves the
	 * collection, and all items are destroyed on the collection destruction.
	 */
	ownItems(): this;

	/**
	 * Adds an item to the set if one is absent.
	 * @param item Item to add.
	 * @returns Item is added successfully. False if item is already present.
	 */
	add(item: T): boolean;

	/**
	 * Adds multiple items to the set, ones that are absent.
	 * @param items Items to add.
	 * @returns The added items. Never returns null or undefined.
	 */
	addAll(items: T[]): T[];

	/**
	 * Removes an item from the set if one is present.
	 * @param item Item to remove.
	 * @returns Item is removed successfully. Returns false if item is already absent.
	 */
	remove(item: T): boolean;

	/**
	 * Removes multiple items from the set, ones that are present.
	 * @param items Items to remove.
	 * @returns The removed items. Never returns null or undefined.
	 */
	removeAll(items: T[]): T[];

	/**
	 * Removes the first occurrence of the item in the collection.
	 * @param item Item to remove.
	 */
	removeItem(item: T): void;

	/**
	 * Removes all occurrences of the items in the collection.
	 * For efficient performance, you should define an optimal getKey callback for this collection.
	 * @param items Items to remove.
	 */
	removeItems(items: T[]): void;

	/**
	 * @inheritDoc
	 */
	clear(): T[];

	/**
	 * Removes and adds multiple items in the set. Universal optimized granular operation of removal/insertion.
	 * @param removedItems Items to remove.
	 * @param addedItems Items to add.
	 * @returns Splice result. Never returns null or undefined.
	 */
	splice(removedItems: T[], addedItems: T[]): IBindableSet.SpliceResult<T>;

	/**
	 * Adds multiple items to the set, ones that are absent.
	 * @param items Items to add.
	 * @returns The added items. If collection is not modified, returns undefined.
	 */
	tryAddAll(items: T[]): T[];

	/**
	 * Removes multiple items from the set, ones that are present.
	 * @param items Items to remove.
	 * @returns The removed items. If collection is not modified, returns undefined.
	 */
	tryRemoveAll(items: T[]): T[];

	/**
	 * Removes and adds multiple items in the set. Universal optimized granular operation of removal/insertion.
	 * @param removedItems Items to remove.
	 * @param addedItems Items to add.
	 * @returns Splice result. If collection is not modified, returns undefined.
	 */
	trySplice(removedItems: T[], addedItems: T[]): IBindableSet.SpliceResult<T>;

	/**
	 * Adjusts set contents to `newItems` using `detectSplice` and `splice` methods.
	 * @param newItems New set contents.
	 */
	performSplice(newItems: T[]): void;
}

export default IBindableSet;

namespace IBindableSet {
	/**
	 * Message of ISet.
	 * @param T Item type.
	 */
	export interface Message<T> {
		/**
		 * Message sender.
		 */
		readonly sender: IBindableSet<T>;
	}

	/**
	 * Set splice message.
	 * @param T Item type.
	 */
	export interface SpliceMessage<T> extends Message<T> {
		/**
		 * Result of `splice` method.
		 */
		readonly spliceResult: SpliceResult<T>;
	}

	/**
	 * Set message with items.
	 * @param T Item type.
	 */
	export interface MessageWithItems<T> extends Message<T> {
		/**
		 * Old set contents.
		 */
		readonly items: T[];
	}

	/**
	 * ISet.splice method arguments. Result of `detectSplice` method.
	 * @param T Item type.
	 */
	export interface SpliceParams<T> {
		/**
		 * Items to remove.
		 */
		readonly removedItems: T[];

		/**
		 * Items to add.
		 */
		readonly addedItems: T[];
	}

	/**
	 * ISet.splice method result.
	 * @param T Item type.
	 */
	export interface SpliceResult<T> {
		/**
		 * Removed items.
		 */
		readonly removedItems: T[];

		/**
		 * Added items.
		 */
		readonly addedItems: T[];
	}
}
