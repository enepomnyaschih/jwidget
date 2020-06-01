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
import ReadonlyCollection from '../ReadonlyCollection';

/**
 * Collection observer. Listens all collection events and reduces them to 2 granular functions:
 * item is added and item is removed.
 * @param T Collection item type.
 */
abstract class AbstractObserver<T> extends Class {
	/**
	 * @hidden
	 */
	protected _add: (item: T) => void;

	/**
	 * @hidden
	 */
	protected _remove: (item: T) => void;

	/**
	 * @hidden
	 */
	protected _clear: (items: T[]) => void;

	/**
	 * @hidden
	 */
	protected _scope: any;

	/**
	 * @hidden
	 */
	constructor(readonly source: ReadonlyCollection<T>, config: AbstractObserver.Config<T>) {
		super();
		this._add = config.add;
		this._remove = config.remove;
		this._clear = config.clear;
		this._scope = config.scope || this;
		this._addItems(source.asArray());
	}

	/**
	 * @inheritDoc
	 */
	protected destroyObject() {
		this._doClearItems(this.source.asArray());
		this._add = null;
		this._remove = null;
		this._clear = null;
		this._scope = null;
		super.destroyObject();
	}

	/**
	 * @hidden
	 */
	protected _addItems(items: T[]) {
		if (!this._add) {
			return;
		}
		for (var i = 0, l = items.length; i < l; ++i) {
			this._add.call(this._scope, items[i]);
		}
	}

	/**
	 * @hidden
	 */
	protected _removeItems(items: T[]) {
		if (!this._remove) {
			return;
		}
		for (var i = items.length - 1; i >= 0; --i) {
			this._remove.call(this._scope, items[i]);
		}
	}

	/**
	 * @hidden
	 */
	protected _doClearItems(items: T[]) {
		if (items.length === 0) {
			return;
		}
		if (this._clear) {
			this._clear.call(this._scope, items);
		} else {
			this._removeItems(items);
		}
	}
}

export default AbstractObserver;

namespace AbstractObserver {
	/**
	 * AbstractObserver configuration.
	 * @param T Collection item type.
	 */
	export interface Config<T> {
		/**
		 * Callback to call when an item is added to the collection.
		 */
		readonly add?: (item: T) => void;

		/**
		 * Callback to call when an item is removed from the collection.
		 */
		readonly remove?: (item: T) => void;

		/**
		 * Callback to call when the collection is cleared. By default, calls `remove` for all collection items.
		 */
		readonly clear?: (items: T[]) => void;

		/**
		 * Call scope of `add`, `remove` and `clear` callbacks. Defaults to the synchronizer itself.
		 */
		readonly scope?: any;
	}
}
