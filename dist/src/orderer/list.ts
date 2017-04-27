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

import {VidSet} from '../internal';
import AbstractCollectionOrderer from './AbstractCollectionOrderer';
import IList from '../IList';
import IClass from '../IClass';
import IndexCount from '../IndexCount';
import IndexItems from '../IndexItems';
import List from '../List';

/**
 * [[JW.AbstractCollection.Orderer|Orderer]] implementation for [[JW.Array]].
 */
export default class ListOrderer<T extends IClass> extends AbstractCollectionOrderer<T> {
	/**
	 * @inheritdoc
	 */
	readonly source: IList<T>;

	/**
	 * @inheritdoc
	 */
	constructor(source: IList<T>, config: AbstractCollectionOrderer.Config<T>) {
		super(source, config);
		this.own(source.spliceEvent.listen(this._onSplice, this));
		this.own(source.replaceEvent.listen(this._onReplace, this));
		this.own(source.clearEvent.listen(this._onClear, this));
	}

	private _onSplice(params: IList.SpliceEventParams<T>) {
		var spliceResult = params.spliceResult;
		this._splice(
			VidSet.fromArray<T>(spliceResult.removedItems, this.source.getKey),
			VidSet.fromArray<T>(spliceResult.addedItems, this.source.getKey));
	}

	private _onReplace(params: IList.ReplaceEventParams<T>) {
		var index = this.target.keyOf(params.oldItem);
		this.target.trySplice(
			[new IndexCount(index, 1)],
			[new IndexItems(this.target.length.get() - 1, [params.newItem])]);
	}

	private _onClear(params: IList.ItemsEventParams<T>) {
		this.target.removeItems(params.items);
	}
}

export function listToList<T extends IClass>(source: IList<T>): IList<T> {
	if (source.silent) {
		return source.toList();
	}
	const result = new List<T>();
	return result.owning(new ListOrderer<T>(source, {
		target: result
	}));
}
