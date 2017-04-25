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
import IMap from '../IMap';
import List from '../List';
import * as DictionaryUtils from '../DictionaryUtils';

/**
 * [[JW.AbstractCollection.Orderer|Orderer]] implementation for [[JW.Map]].
 */
export default class MapOrderer<T extends IClass> extends AbstractCollectionOrderer<T> {
	/**
	 * @inheritdoc
	 */
	readonly source: IMap<T>;

	/**
	 * @inheritdoc
	 */
	constructor(source: IMap<T>, config: AbstractCollectionOrderer.Config<T>) {
		super(source, config);
		this.own(source.spliceEvent.bind(this._onSplice, this));
		this.own(source.clearEvent.bind(this._onClear, this));
	}

	private _onSplice(params: IMap.SpliceEventParams<T>) {
		var spliceResult = params.spliceResult;
		this._splice(
			DictionaryUtils.toSet(spliceResult.removedItems),
			DictionaryUtils.toSet(spliceResult.addedItems));
	}

	private _onClear(params: IMap.ItemsEventParams<T>) {
		this.target.removeItems(
			DictionaryUtils.toArray(params.items));
	}
}

export function mapToList<T extends IClass>(source: IMap<T>): IList<T> {
	if (source.silent) {
		return source.toList();
	}
	var result = new List<T>();
	result.own(new MapOrderer<T>(source, {
		target: result
	}));
	return result;
}
