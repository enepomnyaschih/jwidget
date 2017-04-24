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

import Class from '../../Class';
import IArray from '../../IArray';
import IArrayInserter from './IArrayInserter';

/**
 * View synchronizer with array. Listens all array events and reduces them to 2 granular functions:
 * item is added into specific position and item is removed from specific position. In optimization purposes,
 * you can define a third function: array is cleared
 * (in case if there is more effective clearing algorithm than iterative items deletion).
 * Unlike [[JW.AbstractCollection.Observer|Observer]], tracks items order.
 *
 * Use [[JW.List.createinserter|createinserter]] method to create the synchronizer.
 * The method selects a synchronizer implementation which fits better (simple or observable).
 *
 *     var inserter = array.createInserter({
 *         addItem: function(item, index) { this.store.insert(item, index); },
 *         removeItem: function(item, index) { this.store.remove(index); },
 *         scope: this
 *     });
 *
 * Synchronizer rules:
 *
 * - Function [[Inserter.Config.addItem|addItem]]
 * is called for all items of source array on synchronizer initialization.
 * - Function [[Inserter.Config.clearItems|clearItems]]
 * is called for array, or function
 * [[Inserter.Config.removeItem|removeItem]] is called for
 * all items of source array on synchronizer destruction.
 * - On source array reordering, items order is synchorinized by callback functions calls.
 *
 * @param T Array item type.
 */
export default class ArrayInserter<T> extends Class implements IArrayInserter {
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
	 * Creates synchronizer.
	 * [[JW.List.createInserter|createInserter]] method is preferred instead.
	 *
	 * @param source Source array.
	 * @param config Configuration.
	 */
	constructor(readonly source: IArray<T>, config: IArrayInserter.Config<T> = {}) {
		super();
		this._add = config.add;
		this._remove = config.remove;
		this._clear = config.clear;
		this._scope = config.scope || this;
		this._addItems(this.source.items, 0);
		this.own(source.spliceEvent.bind(this._onSplice, this));
		this.own(source.replaceEvent.bind(this._onReplace, this));
		this.own(source.moveEvent.bind(this._onMove, this));
		this.own(source.clearEvent.bind(this._onClear, this));
		this.own(source.reorderEvent.bind(this._onReorder, this));
	}

	/**
	 * @inheritdoc
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

	private _onSplice(params: IArray.SpliceEventParams<T>) {
		var spliceResult = params.spliceResult;
		var oldItems = spliceResult.oldItems;
		var removedItems = spliceResult.removedItems;

		// if there is an effective clearing function, just reset the controller
		if (this._clear && (3 * removedItems.length > 2 * oldItems.length)) {
			this._clear.call(this._scope, oldItems);
			this._addItems(this.source.items, 0);
			return;
		}

		// else, splice the elements
		var removedItemsList = spliceResult.removedItemsList;
		var addedItemsList = spliceResult.addedItemsList;
		for (var i = removedItemsList.length - 1; i >= 0; --i) {
			var removeRarams = removedItemsList[i];
			this._removeItems(removeRarams.items, removeRarams.index);
		}
		for (var i = 0, l = addedItemsList.length; i < l; ++i) {
			var addParams = addedItemsList[i];
			this._addItems(addParams.items, addParams.index);
		}
	}

	private _onReplace(params: IArray.ReplaceEventParams<T>) {
		if (this._remove) {
			this._remove.call(this._scope, params.oldItem, params.index);
		}
		if (this._add) {
			this._add.call(this._scope, params.newItem, params.index);
		}
	}

	private _onMove(params: IArray.MoveEventParams<T>) {
		if (this._remove) {
			this._remove.call(this._scope, params.item, params.fromIndex);
		}
		if (this._add) {
			this._add.call(this._scope, params.item, params.toIndex);
		}
	}

	private _onClear(params: IArray.ItemsEventParams<T>) {
		this._doClearItems(params.items);
	}

	private _onReorder(params: IArray.ReorderEventParams<T>) {
		this._doClearItems(params.items);
		this._addItems(this.source.items, 0);
	}
}
