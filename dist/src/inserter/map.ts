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

import {isDictionaryEmpty} from '../internal';
import Class from '../Class';
import Dictionary from '../Dictionary';
import IMap from '../IMap';

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
class MapInserter<T> extends Class {
	/**
	 * @hidden
	 */
	protected _add: (item: T, key: string) => void;

	/**
	 * @hidden
	 */
	protected _remove: (item: T, key: string) => void;

	/**
	 * @hidden
	 */
	protected _clear: (items: Dictionary<T>) => void;

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
	constructor(readonly source: IMap<T>, config: MapInserter.Config<T> = {}) {
		super();
		this._add = config.add;
		this._remove = config.remove;
		this._scope = config.scope || this;
		this._clear = config.clear;
		this._addItems(this.source.items);
		this.own(source.spliceEvent.listen(this._onSplice, this));
		this.own(source.reindexEvent.listen(this._onReindex, this));
		this.own(source.clearEvent.listen(this._onClear, this));
	}

	/**
	 * @inheritdoc
	 */
	destroyObject() {
		this._doClearItems(this.source.items);
		this._add = null;
		this._remove = null;
		this._clear = null;
		this._scope = null;
		super.destroyObject();
	}

	private _addItems(items: Dictionary<T>) {
		if (!this._add) {
			return;
		}
		for (var key in items) {
			this._add.call(this._scope, items[key], key);
		}
	}

	private _removeItems(items: Dictionary<T>) {
		if (!this._remove) {
			return;
		}
		for (var key in items) {
			this._remove.call(this._scope, key, items[key]);
		}
	}

	private _doClearItems(items: Dictionary<T>) {
		if (isDictionaryEmpty(items)) {
			return;
		}
		if (this._clear) {
			this._clear.call(this._scope || this, items);
		} else {
			this._removeItems(items);
		}
	}

	private _onSplice(params: IMap.SpliceEventParams<T>) {
		var spliceResult = params.spliceResult;
		this._removeItems(spliceResult.removedItems);
		this._addItems(spliceResult.addedItems);
	}

	private _onReindex(params: IMap.ReindexEventParams<T>) {
		var keyMap = params.keyMap;
		for (var oldKey in keyMap) {
			var newKey = keyMap[oldKey];
			var item = this.source.get(newKey);
			if (this._remove) {
				this._remove.call(this._scope, oldKey, item);
			}
			if (this._add) {
				this._add.call(this._scope, item, newKey);
			}
		}
	}

	private _onClear(params: IMap.ItemsEventParams<T>) {
		this._doClearItems(params.items);
	}
}

export default MapInserter;

namespace MapInserter {
	/**
	 * [[JW.Map.Inserter]] configuration.
	 *
	 * @param T Collection item type.
	 */
	export interface Config<T> {
		/**
		 * Function to call on item adding to specific position in map.
		 */
		readonly add?: (item: T, key: string) => void;

		/**
		 * Function to call on item removing from specific position in map.
		 */
		readonly remove?: (item: T, key: string) => void;

		/**
		 * Function to call on map cleanup.
		 * By default, calls [[removeItem]] for all map items.
		 */
		readonly clear?: (items: Dictionary<T>) => void;

		/**
		 * [[addItem]], [[removeItem]] and
		 * [[clearItems]] call scope.
		 * Defaults to synchronizer itself.
		 */
		readonly scope?: any;
	}
}
