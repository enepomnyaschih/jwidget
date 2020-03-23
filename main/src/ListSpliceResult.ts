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

import * as ArrayUtils from "./ArrayUtils";
import IList from "./IList";

/**
 * IList.splice method result.
 */
export default class ListSpliceResult<T> implements IList.SpliceResult<T> {
	private _removedItems: T[];
	private _addedItems: T[];
	private _removeParamsList: IList.IndexCount[];

	/**
	 * @param oldItems Old array contents.
	 * @param removedItemsList Removed item segments.
	 * @param addedItemsList Added item segments.
	 */
	constructor(readonly oldItems: T[],
		readonly removedItemsList: IList.IndexItems<T>[],
		readonly addedItemsList: IList.IndexItems<T>[]) {
	}

	/**
	 * Plain array of all removed items.
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
	 * Plain array of all added items.
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
	 * Removed item segments converted to index and count pairs.
	 */
	get removeParamsList(): IList.IndexCount[]{
		if (!this._removeParamsList) {
			this._removeParamsList = this.removedItemsList.map((x) => x.toIndexCount());
		}
		return this._removeParamsList;
	}

	/**
	 * The splice call didn't change the list.
	 */
	get empty(): boolean {
		return (this.removedItemsList.length === 0) && (this.addedItemsList.length === 0);
	}
}