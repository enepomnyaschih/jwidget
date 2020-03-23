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

import DestroyableReadonlyCollection from './DestroyableReadonlyCollection';
import IClass from './IClass';

/**
 * Extension of DestroyableReadonlyCollection with modification methods.
 */
interface ICollection<T> extends IClass, DestroyableReadonlyCollection<T> {
	/**
	 * Makes this collection an owner of its items, which means that its items are alive as long as they are present in
	 * this collection. The item is destroyed when it leaves the
	 * collection, and all items are destroyed on the collection destruction.
	 */
	ownItems(): this;

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
	 * Clears the collection and triggers clearEvent.
	 * @returns Old collection contents.
	 */
	clear(): any;
}

export default ICollection;

namespace ICollection {
	/**
	 * ICollection event parameters.
	 */
	export interface EventParams<T> {
		/**
		 * A collection that triggered the event.
		 */
		readonly sender: ICollection<T>;
	}
}
