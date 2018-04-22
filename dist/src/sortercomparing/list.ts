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
import IList from '../IList';
import List from '../List';
import ReadOnlyList from '../ReadOnlyList';
import AbstractSorterComparing from './AbstractSorterComparing';

/**
 * [[JW.Abstract.SorterComparing|SorterComparing]] implementation for [[JW.Array]].
 */
export default class ListSorterComparing<T> extends AbstractSorterComparing<T> {
	/**
	 * @inheritdoc
	 */
	readonly source: ReadOnlyList<T>;

	/**
	 * @inheritdoc
	 */
	constructor(source: ReadOnlyList<T>, config?: AbstractSorterComparing.FullConfig<T>) {
		super(source, config);
		this.own(source.spliceEvent.listen(this._onSplice, this));
		this.own(source.replaceEvent.listen(this._onReplace, this));
		this.own(source.clearEvent.listen(this._onClear, this));
	}

	private _onSplice(params: IList.SpliceEventParams<T>) {
		var spliceResult = params.spliceResult;
		this._splice(spliceResult.removedItems, spliceResult.addedItems);
	}

	private _onReplace(params: IList.ReplaceEventParams<T>) {
		this._splice([params.oldItem], [params.newItem]);
	}

	private _onClear(params: IList.ItemsEventParams<T>) {
		this._splice(params.items, []);
	}
}

export function sortListComparing<T>(source: ReadOnlyList<T>,
		config?: AbstractSorterComparing.Config<T>): DestroyableReadOnlyList<T> {
	if (source.silent) {
		return source.toSortedComparing(config.compare, config.scope, config.order);
	}
	const target = new List<T>(source.getKey);
	return target.owning(new ListSorterComparing<T>(source, {
		target,
		compare: config.compare,
		scope: config.scope,
		order: config.order
	}));
}
