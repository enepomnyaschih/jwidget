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

/**
 * Collection observer. Listens to all collection messages and reduces them to 2 granular functions:
 * item is added and item is removed.
 */
abstract class AbstractObserver<T> extends Class {

	protected _add: (item: T) => void;
	protected _remove: (item: T) => void;
	protected _clear: (items: Iterable<T>) => void;

	constructor(config: AbstractObserver.Config<T>) {
		super();
		this._add = config.add;
		this._remove = config.remove;
		this._clear = config.clear;
	}

	protected destroyObject() {
		this._add = null;
		this._remove = null;
		this._clear = null;
		super.destroyObject();
	}

	protected _addItems(items: Iterable<T>) {
		if (!this._add) {
			return;
		}
		for (let item of items) {
			this._add(item);
		}
	}

	protected _removeItems(items: Iterable<T>) {
		if (!this._remove) {
			return;
		}
		for (let item of items) {
			this._remove(item);
		}
	}

	protected _clearItems(items: Iterable<T>) {
		if (this._clear) {
			this._clear(items);
		} else {
			this._removeItems(items);
		}
	}
}

export default AbstractObserver;

namespace AbstractObserver {
	/**
	 * AbstractObserver configuration.
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
		readonly clear?: (items: Iterable<T>) => void;
	}
}
