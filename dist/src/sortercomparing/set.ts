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

import AbstractCollectionSorterComparing from './AbstractCollectionSorterComparing';
import IList from '../IList';
import IClass from '../IClass';
import ISet from '../ISet';
import List from '../List';

/**
 * [[JW.AbstractCollection.SorterComparing|SorterComparing]] implementation for [[JW.Set]].
 */
export default class SetSorterComparing<T extends IClass> extends AbstractCollectionSorterComparing<T> {
	/**
	 * @inheritdoc
	 */
	readonly source: ISet<T>;

	/**
	 * @inheritdoc
	 */
	constructor(source: ISet<T>, config: AbstractCollectionSorterComparing.Config<T>) {
		super(source, config);
		this.own(source.spliceEvent.listen(this._onSplice, this));
		this.own(source.clearEvent.listen(this._onClear, this));
	}

	private _onSplice(params: ISet.SpliceEventParams<T>) {
		var spliceResult = params.spliceResult;
		this._splice(spliceResult.removedItems, spliceResult.addedItems);
	}

	private _onClear(params: ISet.ItemsEventParams<T>) {
		this._splice(params.items, []);
	}
}

export function sortSetComparing<T extends IClass>(source: ISet<T>, compare: (x: T, y: T) => number, scope?: any): IList<T> {
	if (source.silent) {
		return source.$toSortedComparing(compare, scope);
	}
	var result = new List<T>();
	result.own(new SetSorterComparing<T>(source, {
		target: result,
		compare: compare,
		scope: scope
	}));
	return result;
}
