/*!
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

import AbstractCollectionIndexer from './AbstractCollectionIndexer';
import IList from '../IList';
import IMap from '../IMap';
import Map from '../Map';

/**
 * [[JW.AbstractCollection.Indexer|Indexer]] implementation for [[JW.Array]].
 */
export default class ListIndexer<T> extends AbstractCollectionIndexer<T> {
	/**
	 * @inheritdoc
	 */
	readonly source: IList<T>;

	/**
	 * @inheritdoc
	 */
	constructor(source: IList<T>, config: AbstractCollectionIndexer.Config<T>) {
		super(source, config);
		this.own(source.spliceEvent.listen(this._onSplice, this));
		this.own(source.replaceEvent.listen(this._onReplace, this));
		this.own(source.clearEvent.listen(this._onClear, this));
	}

	private _onSplice(params: IList.SpliceEventParams<T>) {
		var spliceResult = params.spliceResult;
		this.target.trySplice(
			this._keys(spliceResult.removedItems),
			this._index(spliceResult.addedItems));
	}

	private _onReplace(params: IList.ReplaceEventParams<T>) {
		this.target.trySplice(
			this._keys([params.oldItem]),
			this._index([params.newItem]));
	}

	private _onClear(params: IList.ItemsEventParams<T>) {
		this.target.tryRemoveAll(
			this._keys(params.items));
	}
}

export function indexList<T>(source: IList<T>, getKey: (item: T) => string, scope?: any): IMap<T> {
	if (source.silent) {
		return source.$index(getKey, scope);
	}
	const result = new Map<T>(source.getKey);
	return result.owning(new ListIndexer<T>(source, {
		target: result,
		getKey: getKey,
		scope: scope
	}));
}
