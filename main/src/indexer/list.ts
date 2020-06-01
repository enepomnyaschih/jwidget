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

import DestroyableReadonlyMap from '../DestroyableReadonlyMap';
import IList from '../IList';
import Map from '../Map';
import ReadonlyList from '../ReadonlyList';
import AbstractIndexer from './AbstractIndexer';

/**
 * AbstractIndexer implementation for List.
 */
export default class ListIndexer<T> extends AbstractIndexer<T> {
	/**
	 * Source list.
	 */
	readonly source: ReadonlyList<T>;

	/**
	 * @param source Source list.
	 * @param getKey Indexer function.
	 * @param config Indexer configuration.
	 */
	constructor(source: ReadonlyList<T>, getKey: (item: T) => any, config?: AbstractIndexer.Config<T>) {
		super(source, getKey, config);
		this.own(source.spliceEvent.listen(this._onSplice, this));
		this.own(source.replaceEvent.listen(this._onReplace, this));
		this.own(source.clearEvent.listen(this._onClear, this));
	}

	private _onSplice(params: IList.SpliceEventParams<T>) {
		var spliceResult = params.spliceResult;
		this._target.trySplice(
			this._keys(spliceResult.removedItems),
			this._index(spliceResult.addedItems));
	}

	private _onReplace(params: IList.ReplaceEventParams<T>) {
		this._target.trySplice(
			this._keys([params.oldItem]),
			this._index([params.newItem]));
	}

	private _onClear(params: IList.ItemsEventParams<T>) {
		this._target.tryRemoveAll(
			this._keys(params.items));
	}
}

/**
 * Indexes list and starts synchronization.
 * @param source Source list.
 * @param getKey Indexer function.
 * @param scope Call scope of `getKey` callback.
 * @returns Collection index map.
 */
export function indexList<T>(source: ReadonlyList<T>, getKey: (item: T) => any,
                             scope?: any): DestroyableReadonlyMap<T> {
	if (source.silent) {
		return source.index(getKey, scope);
	}
	const target = new Map<T>(source.getKey);
	return target.owning(new ListIndexer<T>(source, getKey, {target, scope}));
}
