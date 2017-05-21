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

import Class from '../Class';
import ReadOnlyCollection from '../ReadOnlyCollection';

/**
 * Collection observer. Listens all collection events and reduces them to 2 granular functions:
 * item is added and item is removed. In optimization purposes, you can define a third function: collection is cleared
 * (in case if there is more effective clearing algorithm than iterative items deletion).
 * Also, you can define a function which is called on each collection modification.
 * For example, this synchronizer can be used to notify the items if they are added to collection.
 *
 *     var observer = collection.createObserver({
 *         addItem: function(item) { item.setInCollection(true); },
 *         removeItem: function(item) { item.setInCollection(false); },
 *         scope: this
 *     });
 *
 * Use [[JW.Abstract.createObserver|createObserver]] method to create the synchronizer.
 * The method selects a synchronizer implementation which fits better (simple or observable).
 *
 * Just another observer use case: if you have an abstract collection on input (and you don't know whether it is
 * simple or observable), and you want to listen collection change event if it is observable,
 * then you can do it meeting OOD principles:
 *
 *     var observer = collection.createObserver({
 *         change: function() { console.log("Collection is changed"); }
 *     });
 *
 * Synchronizer rules:
 *
 * - Function [[Observer.Config.addItem|addItem]]
 * is called for all items of source collection on synchronizer initialization.
 * - Function [[Observer.Config.clearItems|clearItems]]
 * is called for collection, or function
 * [[Observer.Config.removeItem|removeItem]] is called for
 * all items of source collection on synchronizer destruction.
 * - Functions [[Observer.Config.addItem|addItem]],
 * [[Observer.Config.removeItem|removeItem]] and
 * [[Observer.Config.clearItems|clearItems]] are
 * not called on source collection reordering/reindexing.
 *
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
	 * Creates synchronizer.
	 * [[JW.Abstract.createObserver|createObserver]] method is preferred instead.
	 *
	 * @param source Source collection.
	 * @param config Configuration.
	 */
	constructor(readonly source: ReadOnlyCollection<T>, config: AbstractObserver.Config<T>) {
		super();
		this._add = config.add;
		this._remove = config.remove;
		this._clear = config.clear;
		this._scope = config.scope || this;
		this._addItems(source.asArray());
	}

	/**
	 * @inheritdoc
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
	 * [[JW.Abstract.Observer]] configuration.
	 *
	 * @param T Collection item type.
	 */
	export interface Config<T> {
		/**
		 * Item is added to collection.
		 */
		readonly add?: (item: T) => void;

		/**
		 * Item is removed from collection.
		 */
		readonly remove?: (item: T) => void;

		/**
		 * Collection is cleared. By default, calls [[removeItem]] for all collection items.
		 */
		readonly clear?: (items: T[]) => void;

		/**
		 * [[addItem]], [[removeItem]],
		 * [[clearItems]] and [[change]] call scope.
		 * Defaults to synchronizer itself.
		 */
		readonly scope?: any;
	}
}
