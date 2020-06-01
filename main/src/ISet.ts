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

import DestroyableReadonlySet from './DestroyableReadonlySet';
import ICollection from './ICollection';
import Listenable from './Listenable';

/**
 * Extension of DestroyableReadonlySet with modification methods.
 * @param T Map item type.
 */
interface ISet<T> extends ICollection<T>, DestroyableReadonlySet<T> {

	/**
	 * The set is cleared.
	 */
	readonly clearEvent: Listenable<ISet.ItemsEventParams<T>>;

	/**
	 * The set is changed. Triggered right after any another event.
	 */
	readonly changeEvent: Listenable<ISet.EventParams<T>>;

	/**
	 * @inheritDoc
	 */
	clone(): ISet<T>;

	/**
	 * @inheritDoc
	 */
	filter(callback: (item: T) => any, scope?: any): ISet<T>;

	/**
	 * @inheritDoc
	 */
	map<U>(callback: (item: T) => U, scope?: any, getKey?: (item: U) => any): ISet<U>;

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
	 * @inheritDoc
	 */
	removeItem(item: T): void;

	/**
	 * Removes multiple items from the set, ones that are present.
	 * @param items Items to remove.
	 * @returns The removed items. Never returns null or undefined.
	 */
	removeAll(items: T[]): T[];

	/**
	 * @inheritDoc
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
	splice(removedItems: T[], addedItems: T[]): ISet.SpliceResult<T>;

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
	trySplice(removedItems: T[], addedItems: T[]): ISet.SpliceResult<T>;

	/**
	 * Adjusts set contents to `newItems` using `detectSplice` and `splice` methods.
	 * @param newItems New set contents.
	 */
	performSplice(newItems: T[]): void;
}

export default ISet;

namespace ISet {
	/**
	 * `ISet` event parameters.
	 * @param T Item type.
	 */
	export interface EventParams<T> extends ICollection.EventParams<T> {
		/**
		 * Event sender.
		 */
		readonly sender: ISet<T>;
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
	 * Parameters of `clearEvent`.
	 * @param T Item type.
	 */
	export interface ItemsEventParams<T> extends EventParams<T> {
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
