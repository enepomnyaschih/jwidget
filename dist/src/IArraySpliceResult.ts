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

import IIndexCount from './IIndexCount';
import IIndexItems from './IIndexItems';

/**
 * [[JW.AbstractArray.splice|splice]] method result.
 *
 * @param T Item type.
 */
interface IArraySpliceResult<T> {
	/**
	 * Old array contents.
	 */
	oldItems: T[];

	/**
	 * Removed item segments.
	 */
	removedItemsList: IIndexItems<T>[];

	/**
	 * @param addedItemsList Added item segments.
	 */
	addedItemsList: IIndexItems<T>[];

	/**
	 * Returns plain array of removed items.
	 */
	getRemovedItems(): T[];

	/**
	 * Returns plain array of added items.
	 */
	getAddedItems(): T[];

	/**
	 * Converts removed item segments to "index-count" pairs.
	 */
	getRemoveParamsList(): IIndexCount[];

	/**
	 * Checks if [[JW.AbstractArray.splice|splice]] method call didn't change the array.
	 * @returns Array hasn't been changed.
	 */
	isEmpty(): boolean;
}

export default IArraySpliceResult;
