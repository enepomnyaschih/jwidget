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

import DestroyableReadonlyList from '../DestroyableReadonlyList';
import IList from '../IList';
import IndexCount from '../IndexCount';
import IndexItems from '../IndexItems';
import {VidSet} from '../internal';
import List from '../List';
import ReadonlyList from '../ReadonlyList';
import AbstractConverterToList from './AbstractConverterToList';

/**
 * AbstractConverterToList implementation for List.
 */
export default class ListConverterToList<T> extends AbstractConverterToList<T> {
	/**
	 * Source list.
	 */
	readonly source: ReadonlyList<T>;

	/**
	 * @param source Source list.
	 * @param config Converter configuration.
	 */
	constructor(source: ReadonlyList<T>, config: AbstractConverterToList.Config<T>) {
		super(source, config);
		this.own(source.spliceEvent.listen(this._onSplice, this));
		this.own(source.replaceEvent.listen(this._onReplace, this));
		this.own(source.clearEvent.listen(this._onClear, this));
	}

	private _onSplice(params: IList.SpliceEventParams<T>) {
		const spliceResult = params.spliceResult;
		this._splice(
			VidSet.fromArray<T>(spliceResult.removedItems, this.source.getKey),
			VidSet.fromArray<T>(spliceResult.addedItems, this.source.getKey));
	}

	private _onReplace(params: IList.ReplaceEventParams<T>) {
		const index = this.target.indexOf(params.oldItem);
		this._target.trySplice(
			[new IndexCount(index, 1)],
			[new IndexItems(this.target.length.get() - 1, [params.newItem])]);
	}

	private _onClear(params: IList.ItemsEventParams<T>) {
		this._target.removeItems(params.items);
	}
}

/**
 * Creates a copy of a list and starts synchronization.
 * @param source Source list.
 * @returns Target list.
 */
export function listToList<T>(source: ReadonlyList<T>): DestroyableReadonlyList<T> {
	if (source.silent) {
		return source.toList();
	}
	const target = new List<T>(source.getKey);
	return target.owning(new ListConverterToList<T>(source, {target}));
}
