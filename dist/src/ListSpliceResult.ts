/*!
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

import IArray from "./IArray";
import IIndexCount from "./IIndexCount";
import IIndexItems from "./IIndexItems";
import * as ArrayUtils from "./ArrayUtils";

/**
 * [[JW.List.splice|splice]] method result.
 *
 * @param T Item type.
 */
export default class ListSpliceResult<T> implements IArray.SpliceResult<T> {
	private _removedItems: T[];
	private _addedItems: T[];
	private _removeParamsList: IIndexCount[];

	/**
	 * @param oldItems Old array contents.
	 * @param removedItemsList Removed item segments.
	 * @param addedItemsList Added item segments.
	 */
	constructor(readonly oldItems: T[], readonly removedItemsList: IIndexItems<T>[], readonly addedItemsList: IIndexItems<T>[]) {
	}

	/**
	 * Returns plain array of removed items.
	 */
	get removedItems(): T[]{
		if (!this._removedItems) {
			this._removedItems = ArrayUtils.merge(this.removedItemsList.map(function (indexItems) {
				return indexItems.items;
			}));
		}
		return this._removedItems;
	}

	/**
	 * Returns plain array of added items.
	 */
	get addedItems(): T[]{
		if (!this._addedItems) {
			this._addedItems = ArrayUtils.merge(this.addedItemsList.map(function (indexItems) {
				return indexItems.items;
			}));
		}
		return this._addedItems;
	}

	/**
	 * Converts removed item segments to "index-count" pairs.
	 */
	get removeParamsList(): IIndexCount[]{
		if (!this._removeParamsList) {
			this._removeParamsList = this.removedItemsList.map((x) => x.toIndexCount());
		}
		return this._removeParamsList;
	}

	/**
	 * Checks if [[JW.List.splice|splice]] method call didn't change the array.
	 * @returns Array hasn't been changed.
	 */
	get empty(): boolean {
		return (this.removedItemsList.length === 0) && (this.addedItemsList.length === 0);
	}
}