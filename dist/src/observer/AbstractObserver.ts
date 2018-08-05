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
