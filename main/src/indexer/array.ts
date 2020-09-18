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
import IBindableArray from '../IBindableArray';
import {index, map} from "../IterableUtils";
import ReadonlyBindableArray from '../ReadonlyBindableArray';
import AbstractIndexer from './AbstractIndexer';

/**
 * AbstractIndexer implementation for arrays.
 */
export default class ArrayIndexer<V, K> extends AbstractIndexer<V, K> {

	/**
	 * @param source Source array.
	 * @param getKey Indexer function.
	 * @param config Indexer configuration.
	 */
	constructor(readonly source: ReadonlyBindableArray<V>, getKey: (value: V) => K, config?: AbstractIndexer.Config<V, K>) {
		super(getKey, config, source.silent);
		this._target.trySetAll(index(source, getKey));
		this.own(source.onSplice.listen(this._onSplice, this));
		this.own(source.onReplace.listen(this._onReplace, this));
		this.own(source.onClear.listen(this._onClear, this));
	}

	protected destroyObject() {
		this._target.tryRemoveAll(map(this.source, this.getKey));
		super.destroyObject();
	}

	private _onSplice(spliceResult: IBindableArray.SpliceResult<V>) {
		this._target.trySplice(
			map(spliceResult.removedItems, this.getKey),
			index(spliceResult.addedItems, this.getKey));
	}

	private _onReplace(message: IBindableArray.ReplaceMessage<V>) {
		this._target.trySplice(
			map([message.oldValue], this.getKey),
			index([message.newValue], this.getKey));
	}

	private _onClear(oldContents: readonly V[]) {
		this._target.tryRemoveAll(
			map(oldContents, this.getKey));
	}
}

/**
 * Indexes an array and starts synchronization.
 * @param source Source array.
 * @param getKey Indexer function.
 * @returns Array index map.
 */
export function indexArray<V, K>(source: ReadonlyBindableArray<V>,
								 getKey: (value: V) => K): DestroyableReadonlyBindableMap<K, V> {
	if (source.silent) {
		return new BindableMap(index(source, getKey), true);
	}
	const target = new BindableMap<K, V>();
	return target.owning(new ArrayIndexer<V, K>(source, getKey, {target}));
}
