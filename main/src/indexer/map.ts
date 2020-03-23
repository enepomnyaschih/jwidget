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
import * as DictionaryUtils from '../DictionaryUtils';
import IMap from '../IMap';
import Map from '../Map';
import ReadonlyMap from '../ReadonlyMap';
import AbstractIndexer from './AbstractIndexer';

/**
 * AbstractIndexer implementation for Map.
 */
export default class MapIndexer<T> extends AbstractIndexer<T> {
	/**
	 * Source map.
	 */
	readonly source: ReadonlyMap<T>;

	/**
	 * @param source Source map.
	 * @param getKey Indexer function.
	 * @param config Indexer configuration.
	 */
	constructor(source: ReadonlyMap<T>, getKey: (item: T) => any,
				config?: AbstractIndexer.Config<T>) {
		super(source, getKey, config);
		this.own(source.spliceEvent.listen(this._onSplice, this));
		this.own(source.clearEvent.listen(this._onClear, this));
	}

	private _onSplice(params: IMap.SpliceEventParams<T>) {
		var spliceResult = params.spliceResult;
		this._target.trySplice(
			this._keys(DictionaryUtils.toArray(spliceResult.removedItems)),
			this._index(DictionaryUtils.toArray(spliceResult.addedItems)));
	}

	private _onClear(params: IMap.ItemsEventParams<T>) {
		this._target.tryRemoveAll(
			this._keys(DictionaryUtils.toArray(params.items)));
	}
}

/**
 * Indexes map and starts synchronization.
 * @param source Source map.
 * @param getKey Indexer function.
 * @param scope Call scope of `getKey` callback.
 * @returns Collection index map.
 */
export function indexMap<T>(source: ReadonlyMap<T>, getKey: (item: T) => any,
                            scope?: any): DestroyableReadonlyMap<T> {
	if (source.silent) {
		return source.index(getKey, scope);
	}
	const target = new Map<T>(source.getKey);
	return target.owning(new MapIndexer<T>(source, getKey, {target, scope}));
}
