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

import {isDictionaryEmpty} from '../../internal';
import Class from '../../Class';
import Dictionary from '../../Dictionary';
import IMap from '../../IMap';
import IMapInserter from './IMapInserter';
import IMapInserterConfig from './IMapInserterConfig';

/**
 * View synchronizer with map. Listens all map events and reduces them to 2 granular functions:
 * item is added with specific key and item is removed with specific key. In optimization purposes,
 * you can define a third function: map is cleared
 * (in case if there is more effective clearing algorithm than iterative items deletion).
 * Unlike JW.AbstractCollection.Observer, tracks items keys.
 * Can be used mainly for DOM-element synchronization with map of child elements.
 *
 * Use [[JW.Map.createInserter|createInserter]] method to create the synchronizer.
 *
 *     var inserter = map.createInserter({
 *         addItem: function(el, key) { this.el.find("[elkey=" + key + "]").append(el); },
 *         removeItem: function(el, key) { el.detach(); },
 *         scope: this
 *     });
 *
 * The method will select which synchronizer implementation fits better (simple or observable).
 *
 * Synchronizer rules:
 *
 * - Function [[Inserter.Config.addItem|addItem]]
 * is called for all items of source map on synchronizer initialization.
 * - Function [[Inserter.Config.clearItems|clearItems]]
 * is called for map, or function
 * [[Inserter.Config.removeItem|removeItem]] is called for
 * all items of source map on synchronizer destruction.
 * - On source map reindexing, items keys are synchorinized by callback functions calls.
 *
 * @param T Map item type.
 */
export default class MapInserter<T> extends Class implements IMapInserter {
	/**
	 * @hidden
	 */
	protected _addItem: (item: T, key: string) => void;

	/**
	 * @hidden
	 */
	protected _removeItem: (item: T, key: string) => void;

	/**
	 * @hidden
	 */
	protected _clearItems: (items: Dictionary<T>) => void;

	/**
	 * @hidden
	 */
	protected _scope: any;


	/**
	 * Creates synchronizer.
	 * [[JW.Map.createInserter|createInserter]] method is preferred instead.
	 *
	 * @param source Source map.
	 * @param config Configuration.
	 */
	constructor(readonly source: IMap<T>, config: IMapInserterConfig<T> = {}) {
		super();
		this._addItem = config.addItem;
		this._removeItem = config.removeItem;
		this._scope = config.scope || this;
		this._clearItems = config.clearItems;
		this._addItems(this.source.items);
	}

	/**
	 * @inheritdoc
	 */
	destroyObject() {
		this._doClearItems(this.source.items);
		this._addItem = null;
		this._removeItem = null;
		this._clearItems = null;
		this._scope = null;
		super.destroyObject();
	}

	/**
	 * @hidden
	 */
	protected _addItems(items: Dictionary<T>) {
		if (!this._addItem) {
			return;
		}
		for (var key in items) {
			this._addItem.call(this._scope, items[key], key);
		}
	}

	/**
	 * @hidden
	 */
	protected _removeItems(items: Dictionary<T>) {
		if (!this._removeItem) {
			return;
		}
		for (var key in items) {
			this._removeItem.call(this._scope, key, items[key]);
		}
	}

	/**
	 * @hidden
	 */
	protected _doClearItems(items: Dictionary<T>) {
		if (isDictionaryEmpty(items)) {
			return;
		}
		if (this._clearItems) {
			this._clearItems.call(this._scope || this, items);
		} else {
			this._removeItems(items);
		}
	}
}
