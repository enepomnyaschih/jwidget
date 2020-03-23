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
