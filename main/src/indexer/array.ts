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
import IBindableArray from '../IBindableArray';
import BindableMap from '../BindableMap';
import ReadonlyBindableArray from '../ReadonlyBindableArray';
import AbstractIndexer from './AbstractIndexer';

/**
 * AbstractIndexer implementation for arrays.
 */
export default class ArrayIndexer<T> extends AbstractIndexer<T> {
	/**
	 * Source array.
	 */
	readonly source: ReadonlyBindableArray<T>;

	/**
	 * @param source Source array.
	 * @param getKey Indexer function.
	 * @param config Indexer configuration.
	 */
	constructor(source: ReadonlyBindableArray<T>, getKey: (item: T) => any, config?: AbstractIndexer.Config<T>) {
		super(source, getKey, config);
		this.own(source.onSplice.listen(this._onSplice, this));
		this.own(source.onReplace.listen(this._onReplace, this));
		this.own(source.onClear.listen(this._onClear, this));
	}

	private _onSplice(message: IBindableArray.SpliceMessage<T>) {
		var spliceResult = message.spliceResult;
		this._target.trySplice(
			this._keys(spliceResult.removedItems),
			this._index(spliceResult.addedItems));
	}

	private _onReplace(message: IBindableArray.ReplaceMessage<T>) {
		this._target.trySplice(
			this._keys([message.oldItem]),
			this._index([message.newItem]));
	}

	private _onClear(message: IBindableArray.MessageWithItems<T>) {
		this._target.tryRemoveAll(
			this._keys(message.items));
	}
}

/**
 * Indexes an array and starts synchronization.
 * @param source Source array.
 * @param getKey Indexer function.
 * @param scope Call scope of `getKey` callback.
 * @returns Collection index map.
 */
export function indexArray<T>(source: ReadonlyBindableArray<T>, getKey: (item: T) => any,
							  scope?: any): DestroyableReadonlyBindableMap<T> {
	if (source.silent) {
		return source.index(getKey, scope);
	}
	const target = new BindableMap<T>(source.getKey);
	return target.owning(new ArrayIndexer<T>(source, getKey, {target, scope}));
}
