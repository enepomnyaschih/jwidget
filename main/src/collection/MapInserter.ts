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
import IBindableMap from '../IBindableMap';
import ReadonlyBindableMap from '../ReadonlyBindableMap';

/**
 * Inserter implementation for maps.
 */
class MapInserter<K, V> extends Class {

	protected _add: (value: V, key: K) => void;
	protected _remove: (value: V, key: K) => void;
	protected _clear: (entries: ReadonlyMap<K, V>) => void;

	/**
	 * @param source Source map.
	 * @param config Inserter configuration.
	 */
	constructor(readonly source: ReadonlyBindableMap<K, V>, config: MapInserter.Config<K, V> = {}) {
		super();
		this._add = config.add;
		this._remove = config.remove;
		this._clear = config.clear;
		this._addEntries(this.source.native);
		this.own(source.onSplice.listen(this._onSplice, this));
		this.own(source.onReindex.listen(this._onReindex, this));
		this.own(source.onClear.listen(this._onClear, this));
	}

	protected destroyObject() {
		this._doClearItems(this.source.native);
		this._add = null;
		this._remove = null;
		this._clear = null;
		super.destroyObject();
	}

	private _addEntries(entries: ReadonlyMap<K, V>) {
		if (!this._add) {
			return;
		}
		for (let [key, value] of entries) {
			this._add(value, key);
		}
	}

	private _removeEntries(entries: ReadonlyMap<K, V>) {
		if (!this._remove) {
			return;
		}
		for (let [key, value] of entries) {
			this._remove(value, key);
		}
	}

	private _doClearItems(entries: ReadonlyMap<K, V>) {
		if (entries.size === 0) {
			return;
		}
		if (this._clear) {
			this._clear(entries);
		} else {
			this._removeEntries(entries);
		}
	}

	private _onSplice(spliceResult: IBindableMap.SpliceResult<K, V>) {
		this._removeEntries(spliceResult.removedEntries);
		this._addEntries(spliceResult.addedEntries);
	}

	private _onReindex(keyMapping: ReadonlyMap<K, K>) {
		if (this._remove) {
			for (let [oldKey, newKey] of keyMapping) {
				this._remove(this.source.get(newKey), oldKey);
			}
		}
		if (this._add) {
			for (let newKey of keyMapping.values()) {
				this._add(this.source.get(newKey), newKey);
			}
		}
	}

	private _onClear(oldContents: ReadonlyMap<K, V>) {
		this._doClearItems(oldContents);
	}
}

export default MapInserter;

namespace MapInserter {
	/**
	 * MapInserter configuration.
	 */
	export interface Config<K, V> {
		/**
		 * Callback to call when an item is added to the map or moved within the map.
		 */
		readonly add?: (value: V, key: K) => void;

		/**
		 * Callback to call when an item is removed from the map or moved within the map.
		 */
		readonly remove?: (value: V, key: K) => void;

		/**
		 * Callback to call when the map is cleared. By default, calls `remove` for all map items.
		 */
		readonly clear?: (entries: ReadonlyMap<K, V>) => void;
	}
}
