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
import ISet from '../ISet';
import Map from '../Map';
import ReadonlySet from '../ReadonlySet';
import AbstractIndexer from './AbstractIndexer';

/**
 * AbstractIndexer implementation for Set.
 */
export default class SetIndexer<T> extends AbstractIndexer<T> {
	/**
	 * Source set.
	 */
	readonly source: ReadonlySet<T>;

	/**
	 * @param source Source set.
	 * @param getKey Indexer function.
	 * @param config Indexer configuration.
	 */
	constructor(source: ReadonlySet<T>, getKey: (item: T) => any,
				config?: AbstractIndexer.Config<T>) {
		super(source, getKey, config);
		this.own(source.spliceEvent.listen(this._onSplice, this));
		this.own(source.clearEvent.listen(this._onClear, this));
	}

	private _onSplice(params: ISet.SpliceEventParams<T>) {
		var spliceResult = params.spliceResult;
		this._target.trySplice(
			this._keys(spliceResult.removedItems),
			this._index(spliceResult.addedItems));
	}

	private _onClear(params: ISet.ItemsEventParams<T>) {
		this._target.tryRemoveAll(
			this._keys(params.items));
	}
}

/**
 * Indexes set and starts synchronization.
 * @param source Source set.
 * @param getKey Indexer function.
 * @param scope Call scope of `getKey` callback.
 * @returns Collection index map.
 */
export function indexSet<T>(source: ReadonlySet<T>, getKey: (item: T) => any,
                            scope?: any): DestroyableReadonlyMap<T> {
	if (source.silent) {
		return source.index(getKey, scope);
	}
	const target = new Map<T>(source.getKey);
	return target.owning(new SetIndexer<T>(source, getKey, {target, scope}));
}
