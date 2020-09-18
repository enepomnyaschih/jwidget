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
import DestroyableReadonlyBindableMap from '../DestroyableReadonlyBindableMap';
import IBindableSet from '../IBindableSet';
import {index, map} from "../IterableUtils";
import ReadonlyBindableSet from '../ReadonlyBindableSet';
import AbstractIndexer from './AbstractIndexer';

/**
 * AbstractIndexer implementation for sets.
 */
export default class SetIndexer<V, K> extends AbstractIndexer<V, K> {

	/**
	 * @param source Source set.
	 * @param getKey Indexer function.
	 * @param config Indexer configuration.
	 */
	constructor(readonly source: ReadonlyBindableSet<V>, getKey: (value: V) => K,
				config?: AbstractIndexer.Config<V, K>) {
		super(getKey, config, source.silent);
		this._target.trySetAll(index(source, getKey));
		this.own(source.onSplice.listen(this._onSplice, this));
		this.own(source.onClear.listen(this._onClear, this));
	}

	protected destroyObject() {
		this._target.tryRemoveAll(map(this.source, this.getKey));
		super.destroyObject();
	}

	private _onSplice(spliceResult: IBindableSet.SpliceResult<V>) {
		this._target.trySplice(
			map(spliceResult.removedValues, this.getKey),
			index(spliceResult.addedValues, this.getKey));
	}

	private _onClear(oldContents: ReadonlySet<V>) {
		this._target.tryRemoveAll(
			map(oldContents, this.getKey));
	}
}

/**
 * Indexes set and starts synchronization.
 * @param source Source set.
 * @param getKey Indexer function.
 * @returns Set index map.
 */
export function indexSet<V, K>(source: ReadonlyBindableSet<V>,
							   getKey: (value: V) => K): DestroyableReadonlyBindableMap<K, V> {
	if (source.silent) {
		return new BindableMap(index(source, getKey));
	}
	const target = new BindableMap<K, V>();
	return target.owning(new SetIndexer<V, K>(source, getKey, {target}));
}
