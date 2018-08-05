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

import Class from '../Class';
import Dictionary from '../Dictionary';
import {isEmpty} from '../DictionaryUtils';
import IMap from '../IMap';
import ReadonlyMap from '../ReadonlyMap';

/**
 * Inserter implementation for Map.
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
	 * @param source Source map.
	 * @param config Inserter configuration.
	 */
	constructor(readonly source: ReadonlyMap<T>, config: MapInserter.Config<T> = {}) {
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
		if (isEmpty(items)) {
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
	 * MapInserter configuration.
	 * @param T Map item type.
	 */
	export interface Config<T> {
		/**
		 * Callback to call when an item is added to the map or moved within the map.
		 */
		readonly add?: (item: T, key: string) => void;

		/**
		 * Callback to call when an item is removed from the map or moved within the map.
		 */
		readonly remove?: (item: T, key: string) => void;

		/**
		 * Callback to call when the map is cleared. By default, calls `remove` for all map items.
		 */
		readonly clear?: (items: Dictionary<T>) => void;

		/**
		 * Call scope of `add`, `remove` and `clear` callbacks. Defaults to the synchronizer itself.
		 */
		readonly scope?: any;
	}
}
