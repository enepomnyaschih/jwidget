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
