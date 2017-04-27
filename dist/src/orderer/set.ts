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
import ISet from '../ISet';
import List from '../List';

/**
 * [[JW.AbstractCollection.Orderer|Orderer]] implementation for [[JW.Set]].
 */
export default class SetOrderer<T extends IClass> extends AbstractCollectionOrderer<T> {
	/**
	 * @inheritdoc
	 */
	readonly source: ISet<T>;

	/**
	 * @inheritdoc
	 */
	constructor(source: ISet<T>, config: AbstractCollectionOrderer.Config<T>) {
		super(source, config);
		this.own(source.spliceEvent.listen(this._onSplice, this));
		this.own(source.clearEvent.listen(this._onClear, this));
	}

	private _onSplice(params: ISet.SpliceEventParams<T>) {
		var spliceResult = params.spliceResult;
		this._splice(
			VidSet.fromArray<T>(spliceResult.removedItems, this.source.getKey),
			VidSet.fromArray<T>(spliceResult.addedItems, this.source.getKey));
	}

	private _onClear(params: ISet.ItemsEventParams<T>) {
		this.target.removeItems(params.items);
	}
}

export function setToList<T extends IClass>(source: ISet<T>): IList<T> {
	if (source.silent) {
		return source.toList();
	}
	const result = new List<T>();
	return result.owning(new SetOrderer<T>(source, {
		target: result
	}));
}
