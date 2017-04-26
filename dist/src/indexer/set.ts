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
import Identifiable from '../Identifiable';
import IMap from '../IMap';
import ISet from '../ISet';
import Map from '../Map';

/**
 * [[JW.AbstractCollection.Indexer|Indexer]] implementation for [[JW.Set]].
 */
export default class SetIndexer<T extends Identifiable> extends AbstractCollectionIndexer<T> {
	/**
	 * @inheritdoc
	 */
	readonly source: ISet<T>;

	/**
	 * @inheritdoc
	 */
	constructor(source: ISet<T>, config: AbstractCollectionIndexer.Config<T>) {
		super(source, config);
		this.own(source.spliceEvent.listen(this._onSplice, this));
		this.own(source.clearEvent.listen(this._onClear, this));
	}

	private _onSplice(params: ISet.SpliceEventParams<T>) {
		var spliceResult = params.spliceResult;
		this.target.trySplice(
			this._keys(spliceResult.removedItems),
			this._index(spliceResult.addedItems));
	}

	private _onClear(params: ISet.ItemsEventParams<T>) {
		this.target.tryRemoveAll(
			this._keys(params.items));
	}
}

export function indexSet<T extends Identifiable>(source: ISet<T>, getKey: (item: T) => any, scope?: any): IMap<T> {
	if (source.silent) {
		return source.$index(getKey, scope);
	}
	const result = new Map<T>();
	return result.owning(new SetIndexer<T>(source, {
		target: result,
		getKey: getKey,
		scope: scope
	}));
}
