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

import IArraySpliceResult from './IArraySpliceResult';
import IIndexCount from './IIndexCount';
import IIndexItems from './IIndexItems';
import * as ArrayUtils from './ArrayUtils';

/**
 * [[JW.AbstractArray.splice|splice]] method result.
 *
 * @param T Item type.
 */
export default class ArraySpliceResult<T> implements IArraySpliceResult<T> {
	private removedItems: T[];
	private addedItems: T[];
	private removeParamsList: IIndexCount[];

	/**
	 * @param oldItems Old array contents.
	 * @param removedItemsList Removed item segments.
	 * @param addedItemsList Added item segments.
	 */
	constructor(public oldItems: T[], public removedItemsList: IIndexItems<T>[], public addedItemsList: IIndexItems<T>[]) {
	}

	/**
	 * Returns plain array of removed items.
	 */
	getRemovedItems(): T[]{
		if (!this.removedItems) {
			this.removedItems = ArrayUtils.merge(this.removedItemsList.map(function (indexItems) {
				return indexItems.items;
			}));
		}
		return this.removedItems;
	}

	/**
	 * Returns plain array of added items.
	 */
	getAddedItems(): T[]{
		if (!this.addedItems) {
			this.addedItems = ArrayUtils.merge(this.addedItemsList.map(function (indexItems) {
				return indexItems.items;
			}));
		}
		return this.addedItems;
	}

	/**
	 * Converts removed item segments to "index-count" pairs.
	 */
	getRemoveParamsList(): IIndexCount[]{
		if (!this.removeParamsList) {
			this.removeParamsList = this.removedItemsList.map((x) => x.toIndexCount());
		}
		return this.removeParamsList;
	}

	/**
	 * Checks if [[JW.AbstractArray.splice|splice]] method call didn't change the array.
	 * @returns Array hasn't been changed.
	 */
	isEmpty(): boolean {
		return (this.removedItemsList.length === 0) && (this.addedItemsList.length === 0);
	}
}
