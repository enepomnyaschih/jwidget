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
import IMap from '../IMap';
import Map from '../Map';
import ReadonlyCollection from '../ReadonlyCollection';
import ReadonlyMap from "../ReadonlyMap";

/**
 * Abstract collection indexer. Builds a new map by rule: key is the result of the function call, value is the
 * corresponding item. Can be used for item search optimization.
 * @param T Collection item type.
 */
abstract class AbstractIndexer<T> extends Class {
	private _targetCreated: boolean;

	/**
	 * @hidden
	 */
	protected _scope: any;

	/**
	 * @hidden
	 */
	protected _target: IMap<T>;

	/**
	 * @hidden
	 */
	constructor(readonly source: ReadonlyCollection<T>, protected _getKey: (item: T) => any,
				config: AbstractIndexer.Config<T> = {}) {
		super();
		this._scope = config.scope || this;
		this._targetCreated = config.target == null;
		this._target = this._targetCreated ? new Map<T>(source.getKey, source.silent) : config.target;
		this._target.tryPutAll(this._index(source.asArray()));
	}

	/**
	 * Target map.
	 */
	get target(): ReadonlyMap<T> {
		return this._target;
	}

	/**
	 * @inheritDoc
	 */
	protected destroyObject() {
		this._target.tryRemoveAll(this._keys(this.source.asArray()));
		if (this._targetCreated) {
			this._target.destroy();
		}
		this._getKey = null;
		this._scope = null;
		super.destroyObject();
	}

	/**
	 * @hidden
	 */
	protected _index(items: T[]): Dictionary<T> {
		var index: Dictionary<T> = {};
		for (var i = 0, l = items.length; i < l; ++i) {
			var item = items[i];
			index[this._getKey.call(this._scope, item)] = item;
		}
		return index;
	}

	/**
	 * @hidden
	 */
	protected _keys(items: T[]): string[] {
		var keys: string[] = [];
		for (var i = 0, l = items.length; i < l; ++i) {
			keys.push(this._getKey.call(this._scope, items[i]));
		}
		return keys;
	}
}

export default AbstractIndexer;

namespace AbstractIndexer {
	/**
	 * AbstractIndexer configuration.
	 * @param T Collection item type.
	 */
	export interface Config<T> {
		/**
		 * Call scope of indexer's `getKey` callback. Defaults to the synchronizer itself.
		 */
		readonly scope?: any;

		/**
		 * Target map. By default, created automatically.
		 */
		readonly target?: IMap<T>;
	}
}
