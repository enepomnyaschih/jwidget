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
