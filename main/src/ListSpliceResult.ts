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