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
import Class from "../Class";
import DestroyableReadonlyBindableMap from '../DestroyableReadonlyBindableMap';
import IBindableMap from "../IBindableMap";
import IBindableSet from '../IBindableSet';
import {index, map} from "../IterableUtils";
import ReadonlyBindableMap from "../ReadonlyBindableMap";
import ReadonlyBindableSet from '../ReadonlyBindableSet';

/**
 * Set indexer. Builds a new map by rule: key is the result of the function call, value is the
 * corresponding set value. Can be used for value search optimization.
 */
export default class SetIndexer<V, K> extends Class {

	private _targetCreated: boolean;
	private _target: IBindableMap<K, V>;

	/**
	 * @param source Source set.
	 * @param getKey Indexer function.
	 * @param config Indexer configuration.
	 */
	constructor(readonly source: ReadonlyBindableSet<V>, private getKey: (value: V) => K,
				config: SetIndexer.Config<V, K> = {}) {
		super();
		this._targetCreated = config.target == null;
		this._target = this._targetCreated ? new BindableMap<K, V>(source.silent) : config.target;
		this._target.trySetAll(index(source, getKey));
		this.own(source.onSplice.listen(this._onSplice, this));
		this.own(source.onClear.listen(this._onClear, this));
	}

	/**
	 * Target map.
	 */
	get target(): ReadonlyBindableMap<K, V> {
		return this._target;
	}

	protected destroyObject() {
		this._onClear(this.source.native);
		if (this._targetCreated) {
			this._target.destroy();
		}
		this.getKey = null;
		super.destroyObject();
	}

	private _onSplice(spliceResult: IBindableSet.SpliceResult<V>) {
		this._target.trySplice(
			map(spliceResult.removedValues, this.getKey),
			index(spliceResult.addedValues, this.getKey));
	}

	private _onClear(oldContents: ReadonlySet<V>) {
		if (oldContents.size === this._target.size.get()) {
			this._target.tryClear();
		} else {
			this._target.tryRemoveAll(map(oldContents, this.getKey));
		}
	}
}

namespace SetIndexer {
	/**
	 * SetIndexer configuration.
	 */
	export interface Config<V, K> {
		/**
		 * Target map. By default, created automatically.
		 */
		readonly target?: IBindableMap<K, V>;
	}
}

/**
 * Indexes set and starts synchronization.
 * @param source Source set.
 * @param getKey Indexer function.
 * @returns Set index map.
 */
export function startIndexingSet<V, K>(source: ReadonlyBindableSet<V>,
									   getKey: (value: V) => K): DestroyableReadonlyBindableMap<K, V> {
	if (source.silent) {
		return new BindableMap(index(source, getKey), true);
	}
	const target = new BindableMap<K, V>();
	return target.owning(new SetIndexer<V, K>(source, getKey, {target}));
}
