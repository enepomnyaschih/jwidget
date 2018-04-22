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

import DestroyableReadOnlySet from '../DestroyableReadOnlySet';
import IList from '../IList';
import ReadOnlyList from '../ReadOnlyList';
import Set from '../Set';
import AbstractConverterToSet from './AbstractConverterToSet';

/**
 * [[JW.Abstract.Lister|Lister]] implementation for [[JW.Array]].
 */
export default class ListConverterToSet<T> extends AbstractConverterToSet<T> {
	/**
	 * @inheritdoc
	 */
	readonly source: ReadOnlyList<T>;

	/**
	 * @inheritdoc
	 */
	constructor(source: ReadOnlyList<T>, config: AbstractConverterToSet.Config<T>) {
		super(source, config);
		this.own(source.spliceEvent.listen(this._onSplice, this));
		this.own(source.replaceEvent.listen(this._onReplace, this));
		this.own(source.clearEvent.listen(this._onClear, this));
	}

	private _onSplice(params: IList.SpliceEventParams<T>) {
		var spliceResult = params.spliceResult;
		this.target.trySplice(spliceResult.removedItems, spliceResult.addedItems);
	}

	private _onReplace(params: IList.ReplaceEventParams<T>) {
		this.target.trySplice([params.oldItem], [params.newItem]);
	}

	private _onClear(params: IList.ItemsEventParams<T>) {
		this.target.tryRemoveAll(params.items);
	}
}

export function listToSet<T>(source: ReadOnlyList<T>): DestroyableReadOnlySet<T> {
	if (source.silent) {
		return source.toSet();
	}
	const target = new Set<T>(source.getKey);
	return target.owning(new ListConverterToSet<T>(source, {target}));
}
