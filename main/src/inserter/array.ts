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
 * Inserter implementation for arrays.
 * @param T Array item type.
 */
class ArrayInserter<T> extends Class {
	/**
	 * @hidden
	 */
	protected _add: (item: T, index: number) => void;

	/**
	 * @hidden
	 */
	protected _remove: (item: T, index: number) => void;

	/**
	 * @hidden
	 */
	protected _clear: (items: T[]) => void;

	/**
	 * @hidden
	 */
	protected _scope: any;

	/**
	 * @param source Source array.
	 * @param config Inserter configuration.
	 */
	constructor(readonly source: ReadonlyBindableArray<T>, config: ArrayInserter.Config<T> = {}) {
		super();
		this._add = config.add;
		this._remove = config.remove;
		this._clear = config.clear;
		this._scope = config.scope || this;
		this._addItems(this.source.items, 0);
		this.own(source.onSplice.listen(this._onSplice, this));
		this.own(source.onReplace.listen(this._onReplace, this));
		this.own(source.onMove.listen(this._onMove, this));
		this.own(source.onClear.listen(this._onClear, this));
		this.own(source.onReorder.listen(this._onReorder, this));
	}

	/**
	 * @inheritDoc
	 */
	protected destroyObject() {
		this._doClearItems(this.source.items);
		this._add = null;
		this._remove = null;
		this._clear = null;
		this._scope = null;
		super.destroyObject();
	}

	private _addItems(items: T[], index: number) {
		if (!this._add) {
			return;
		}
		for (var i = 0; i < items.length; ++i) {
			this._add.call(this._scope, items[i], i + index);
		}
	}

	private _removeItems(items: T[], index: number) {
		if (!this._remove) {
			return;
		}
		for (var i = items.length - 1; i >= 0; --i) {
			this._remove.call(this._scope, items[i], i + index);
		}
	}

	private _doClearItems(items: T[]) {
		if (items.length === 0) {
			return;
		}
		if (this._clear) {
			this._clear.call(this._scope, items);
		} else {
			this._removeItems(items, 0);
		}
	}

	private _onSplice(message: IBindableArray.SpliceMessage<T>) {
		var spliceResult = message.spliceResult;
		var oldItems = spliceResult.oldItems;
		var removedItems = spliceResult.removedItems;

		// if there is an effective clearing function, just reset the controller
		if (this._clear && (3 * removedItems.length > 2 * oldItems.length)) {
			this._clear.call(this._scope, oldItems);
			this._addItems(this.source.items, 0);
			return;
		}

		// else, splice the elements
		const {removedSegments, addedSegments} = spliceResult;
		for (var i = removedSegments.length - 1; i >= 0; --i) {
			var removeRarams = removedSegments[i];
			this._removeItems(removeRarams.items, removeRarams.index);
		}
		for (var i = 0, l = addedSegments.length; i < l; ++i) {
			var addParams = addedSegments[i];
			this._addItems(addParams.items, addParams.index);
		}
	}

	private _onReplace(message: IBindableArray.ReplaceMessage<T>) {
		if (this._remove) {
			this._remove.call(this._scope, message.oldItem, message.index);
		}
		if (this._add) {
			this._add.call(this._scope, message.newItem, message.index);
		}
	}

	private _onMove(message: IBindableArray.MoveMessage<T>) {
		if (this._remove) {
			this._remove.call(this._scope, message.item, message.fromIndex);
		}
		if (this._add) {
			this._add.call(this._scope, message.item, message.toIndex);
		}
	}

	private _onClear(message: IBindableArray.MessageWithItems<T>) {
		this._doClearItems(message.items);
	}

	private _onReorder(message: IBindableArray.ReorderMessage<T>) {
		this._doClearItems(message.items);
		this._addItems(this.source.items, 0);
	}
}

export default ArrayInserter;

namespace ArrayInserter {
	/**
	 * ArrayInserter configuration.
	 * @param T Array item type.
	 */
	export interface Config<T> {
		/**
		 * Callback to call when an item is added to the array or moved within the array.
		 */
		readonly add?: (item: T, index: number) => void;

		/**
		 * Callback to call when an item is removed from the array or moved within the array.
		 */
		readonly remove?: (item: T, index: number) => void;

		/**
		 * Callback to call when the array is cleared. By default, calls `remove` for all array items.
		 */
		readonly clear?: (items: T[]) => void;

		/**
		 * Call scope of `add`, `remove` and `clear` callbacks. Defaults to the synchronizer itself.
		 */
		readonly scope?: any;
	}
}
