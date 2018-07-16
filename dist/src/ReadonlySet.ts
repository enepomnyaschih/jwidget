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

import ISet from './ISet';
import Listenable from './Listenable';
import ReadonlyCollection from './ReadonlyCollection';

/**
 * Unordered collection optimized for items adding, removal and search.
 * @param T Item type.
 */
interface ReadonlySet<T> extends ReadonlyCollection<T> {
	/**
	 * Array of all set items. This getter makes a copy of the collection (in fact, internal representation of Set is
	 * not an array).
	 */
	readonly items: T[];

	/**
	 * Items are removed from the set and/or items are added to the set.
	 */
	readonly spliceEvent: Listenable<ISet.SpliceEventParams<T>>;

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
	 * Detects `splice` method arguments to adjust the set contents to `newItems`.
	 * Determines item bunches to be removed and added.
	 * @param newItems New set contents.
	 * @returns `splice` method arguments. If no method call required, returns undefined.
	 */
	detectSplice(newItems: T[]): ISet.SpliceParams<T>;

	/**
	 * Checks this set for equality (===) to an array, item by item.
	 * @param array Array.
	 * @returns This set is equal to the array.
	 */
	equal(array: T[]): boolean;
}

export default ReadonlySet;
