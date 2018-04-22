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

import DestroyableReadOnlyList from '../DestroyableReadOnlyList';
import {VidSet} from '../internal';
import ISet from '../ISet';
import List from '../List';
import ReadOnlySet from '../ReadOnlySet';
import AbstractConverterToList from './AbstractConverterToList';

/**
 * [[JW.Abstract.Orderer|Orderer]] implementation for [[JW.Set]].
 */
export default class SetConverterToList<T> extends AbstractConverterToList<T> {
	/**
	 * @inheritdoc
	 */
	readonly source: ReadOnlySet<T>;

	/**
	 * @inheritdoc
	 */
	constructor(source: ReadOnlySet<T>, config: AbstractConverterToList.Config<T>) {
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

export function setToList<T>(source: ReadOnlySet<T>): DestroyableReadOnlyList<T> {
	if (source.silent) {
		return source.toList();
	}
	const target = new List<T>(source.getKey);
	return target.owning(new SetConverterToList<T>(source, {target}));
}
