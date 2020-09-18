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

import BindableMap from '../BindableMap';
import Class from '../Class';
import IBindableMap from '../IBindableMap';
import ReadonlyBindableMap from "../ReadonlyBindableMap";

/**
 * Abstract collection indexer. Builds a new map by rule: key is the result of the function call, value is the
 * corresponding item. Can be used for item search optimization.
 */
abstract class AbstractIndexer<V, K> extends Class {

	private _targetCreated: boolean;

	protected _target: IBindableMap<K, V>;

	constructor(protected getKey: (value: V) => K, config: AbstractIndexer.Config<V, K> = {}, silent: boolean) {
		super();
		this._targetCreated = config.target == null;
		this._target = this._targetCreated ? new BindableMap<K, V>(silent) : config.target;
	}

	/**
	 * Target map.
	 */
	get target(): ReadonlyBindableMap<K, V> {
		return this._target;
	}

	protected destroyObject() {
		if (this._targetCreated) {
			this._target.destroy();
		}
		this.getKey = null;
		super.destroyObject();
	}
}

export default AbstractIndexer;

namespace AbstractIndexer {
	/**
	 * AbstractIndexer configuration.
	 */
	export interface Config<V, K> {
		/**
		 * Target map. By default, created automatically.
		 */
		readonly target?: IBindableMap<K, V>;
	}
}
