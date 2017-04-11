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

import Class from '../../Class';
import IArray from '../../IArray';
import IArrayInserter from './IArrayInserter';
import IArrayInserterConfig from './IArrayInserterConfig';

/**
 * View synchronizer with array. Listens all array events and reduces them to 2 granular functions:
 * item is added into specific position and item is removed from specific position. In optimization purposes,
 * you can define a third function: array is cleared
 * (in case if there is more effective clearing algorithm than iterative items deletion).
 * Unlike [[JW.AbstractCollection.Observer|Observer]], tracks items order.
 *
 * Use [[JW.AbstractArray.createinserter|createinserter]] method to create the synchronizer.
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
	protected _addItem: (item: T, index: number) => void;

	/**
	 * @hidden
	 */
	protected _removeItem: (item: T, index: number) => void;

	/**
	 * @hidden
	 */
	protected _clearItems: (items: T[]) => void;

	/**
	 * @hidden
	 */
	protected _scope: any;

	/**
	 * Creates synchronizer.
	 * [[JW.AbstractArray.createInserter|createInserter]] method is preferred instead.
	 *
	 * @param source Source array.
	 * @param config Configuration.
	 */
	constructor(public source: IArray<T>, config: IArrayInserterConfig<T> = {}) {
		super();
		this._addItem = config.addItem;
		this._removeItem = config.removeItem;
		this._clearItems = config.clearItems;
		this._scope = config.scope || this;
		this._addItems(this.source.getItems(), 0);
	}

	/**
	 * @inheritdoc
	 */
	protected destroyObject() {
		this._doClearItems(this.source.getItems());
		this.source = null;
		this._addItem = null;
		this._removeItem = null;
		this._clearItems = null;
		this._scope = null;
		super.destroyObject();
	}

	/**
	 * @hidden
	 */
	protected _addItems(items: T[], index: number) {
		if (!this._addItem) {
			return;
		}
		for (var i = 0; i < items.length; ++i) {
			this._addItem.call(this._scope, items[i], i + index);
		}
	}

	/**
	 * @hidden
	 */
	protected _removeItems(items: T[], index: number) {
		if (!this._removeItem) {
			return;
		}
		for (var i = items.length - 1; i >= 0; --i) {
			this._removeItem.call(this._scope, items[i], i + index);
		}
	}

	/**
	 * @hidden
	 */
	protected _doClearItems(items: T[]) {
		if (items.length === 0) {
			return;
		}
		if (this._clearItems) {
			this._clearItems.call(this._scope, items);
		} else {
			this._removeItems(items, 0);
		}
	}
}
