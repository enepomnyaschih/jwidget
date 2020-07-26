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

import DestroyableReadonlyBindableMap from '../DestroyableReadonlyBindableMap';
import * as DictionaryUtils from '../DictionaryUtils';
import IBindableMap from '../IBindableMap';
import BindableMap from '../BindableMap';
import ReadonlyBindableMap from '../ReadonlyBindableMap';
import AbstractIndexer from './AbstractIndexer';

/**
 * AbstractIndexer implementation for maps.
 */
export default class MapIndexer<T> extends AbstractIndexer<T> {
	/**
	 * @param source Source map.
	 * @param getKey Indexer function.
	 * @param config Indexer configuration.
	 */
	constructor(readonly source: ReadonlyBindableMap<T>, getKey: (item: T) => any,
				config?: AbstractIndexer.Config<T>) {
		super(getKey, config, source.getKey, source.silent);
		this._target.tryPutAll(this._index(source.asArray()));
		this.own(source.onSplice.listen(this._onSplice, this));
		this.own(source.onClear.listen(this._onClear, this));
	}

	/**
	 * @inheritDoc
	 */
	protected destroyObject() {
		this._target.tryRemoveAll(this._keys(this.source.asArray()));
		super.destroyObject();
	}

	private _onSplice(message: IBindableMap.SpliceMessage<T>) {
		var spliceResult = message.spliceResult;
		this._target.trySplice(
			this._keys(DictionaryUtils.toArray(spliceResult.removedItems)),
			this._index(DictionaryUtils.toArray(spliceResult.addedItems)));
	}

	private _onClear(message: IBindableMap.MessageWithItems<T>) {
		this._target.tryRemoveAll(
			this._keys(DictionaryUtils.toArray(message.items)));
	}
}

/**
 * Indexes map and starts synchronization.
 * @param source Source map.
 * @param getKey Indexer function.
 * @param scope Call scope of `getKey` callback.
 * @returns Collection index map.
 */
export function indexMap<T>(source: ReadonlyBindableMap<T>, getKey: (item: T) => any,
							scope?: any): DestroyableReadonlyBindableMap<T> {
	if (source.silent) {
		return source.index(getKey, scope);
	}
	const target = new BindableMap<T>(source.getKey);
	return target.owning(new MapIndexer<T>(source, getKey, {target, scope}));
}
