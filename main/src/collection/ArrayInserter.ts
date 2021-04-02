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

import Class from '../Class';
import IBindableArray from '../IBindableArray';
import ReadonlyBindableArray from '../ReadonlyBindableArray';

/**
 * Handles all messages of `ReadonlyBindableArray` with a combination of three callbacks.
 */
class ArrayInserter<T> extends Class {

	protected _add: (item: T, index: number) => void;
	protected _remove: (item: T, index: number) => void;
	protected _clear: (items: readonly T[]) => void;

	/**
	 * @param source Source array.
	 * @param config Inserter configuration.
	 */
	constructor(readonly source: ReadonlyBindableArray<T>, config: ArrayInserter.Config<T> = {}) {
		super();
		this._add = config.add;
		this._remove = config.remove;
		this._clear = config.clear;
		this._addItems(this.source.native, 0);
		this.own(source.onSplice.listen(this._onSplice, this));
		this.own(source.onReplace.listen(this._onReplace, this));
		this.own(source.onMove.listen(this._onMove, this));
		this.own(source.onClear.listen(this._onClear, this));
		this.own(source.onReorder.listen(this._onReorder, this));
	}

	protected destroyObject() {
		this._doClearItems(this.source.native);
		this._add = null;
		this._remove = null;
		this._clear = null;
		super.destroyObject();
	}

	private _addItems(items: readonly T[], index: number) {
		if (!this._add) {
			return;
		}
		for (let i = 0; i < items.length; ++i) {
			this._add(items[i], i + index);
		}
	}

	private _removeItems(items: readonly T[], index: number) {
		if (!this._remove) {
			return;
		}
		for (let i = items.length - 1; i >= 0; --i) {
			this._remove(items[i], i + index);
		}
	}

	private _doClearItems(items: readonly T[]) {
		if (items.length === 0) {
			return;
		}
		if (this._clear) {
			this._clear(items);
		} else {
			this._removeItems(items, 0);
		}
	}

	private _onSplice(spliceResult: IBindableArray.SpliceResult<T>) {
		const {oldContents, removedItems} = spliceResult;

		// if there is an effective clearing function, just reset the controller
		if (this._clear && (3 * removedItems.length > 2 * oldContents.length)) {
			this._clear(oldContents);
			this._addItems(this.source.native, 0);
			return;
		}

		// else, splice the elements
		const {removedSegments, addedSegments} = spliceResult;
		for (let i = removedSegments.length - 1; i >= 0; --i) {
			const removeRarams = removedSegments[i];
			this._removeItems(removeRarams[1], removeRarams[0]);
		}
		for (let i = 0, l = addedSegments.length; i < l; ++i) {
			const addParams = addedSegments[i];
			this._addItems(addParams[1], addParams[0]);
		}
	}

	private _onReplace(message: IBindableArray.ReplaceMessage<T>) {
		if (this._remove) {
			this._remove(message.oldValue, message.index);
		}
		if (this._add) {
			this._add(message.newValue, message.index);
		}
	}

	private _onMove(message: IBindableArray.MoveMessage<T>) {
		if (this._remove) {
			this._remove(message.value, message.fromIndex);
		}
		if (this._add) {
			this._add(message.value, message.toIndex);
		}
	}

	private _onClear(oldContents: readonly T[]) {
		this._doClearItems(oldContents);
	}

	private _onReorder(message: IBindableArray.ReorderMessage<T>) {
		this._doClearItems(message.oldContents);
		this._addItems(this.source.native, 0);
	}
}

export default ArrayInserter;

namespace ArrayInserter {
	/**
	 * Configuration of `ArrayInserter`.
	 */
	export interface Config<T> {
		/**
		 * Callback to call when an item is added to the array or moved in the array.
		 */
		readonly add?: (item: T, index: number) => void;

		/**
		 * Callback to call when an item is removed from the array or moved in the array.
		 */
		readonly remove?: (item: T, index: number) => void;

		/**
		 * Callback to call when the array is cleared. By default, calls `remove` for all array items.
		 */
		readonly clear?: (items: readonly T[]) => void;
	}
}
