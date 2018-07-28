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
	 * Source collection.
	 */
	readonly source: ReadonlyList<T>;

	/**
	 * @param source Source collection.
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
 * @param source Source collection.
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
