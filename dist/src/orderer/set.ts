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

import AbstractCollectionOrderer from './AbstractCollectionOrderer';
import IList from '../IList';
import IClass from '../IClass';
import ISet from '../ISet';
import List from '../List';
import * as ArrayUtils from '../ArrayUtils';

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
		this.own(source.spliceEvent.bind(this._onSplice, this));
		this.own(source.clearEvent.bind(this._onClear, this));
	}

	private _onSplice(params: ISet.SpliceEventParams<T>) {
		var spliceResult = params.spliceResult;
		this._splice(
			ArrayUtils.toSet(spliceResult.removedItems),
			ArrayUtils.toSet(spliceResult.addedItems));
	}

	private _onClear(params: ISet.ItemsEventParams<T>) {
		this.target.removeItems(params.items);
	}
}

export function setToList<T extends IClass>(source: ISet<T>): IList<T> {
	if (source.silent) {
		return source.toList();
	}
	var result = new List<T>();
	result.own(new SetOrderer<T>(source, {
		target: result
	}));
	return result;
}
