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
import IMap from '../IMap';
import List from '../List';
import * as DictionaryUtils from '../DictionaryUtils';

/**
 * [[JW.AbstractCollection.SorterComparing|SorterComparing]] implementation for [[JW.Map]].
 */
export default class MapSorterComparing<T> extends AbstractCollectionSorterComparing<T> {
	/**
	 * @inheritdoc
	 */
	readonly source: IMap<T>;

	/**
	 * @inheritdoc
	 */
	constructor(source: IMap<T>, config?: AbstractCollectionSorterComparing.FullConfig<T>) {
		super(source, config);
		this.own(source.spliceEvent.listen(this._onSplice, this));
		this.own(source.clearEvent.listen(this._onClear, this));
	}

	private _onSplice(params: IMap.SpliceEventParams<T>) {
		var spliceResult = params.spliceResult;
		this._splice(
			DictionaryUtils.toArray(spliceResult.removedItems),
			DictionaryUtils.toArray(spliceResult.addedItems));
	}

	private _onClear(params: IMap.ItemsEventParams<T>) {
		this._splice(DictionaryUtils.toArray(params.items), []);
	}
}

export function sortMapComparing<T>(source: IMap<T>, config?: AbstractCollectionSorterComparing.Config<T>): IList<T> {
	if (source.silent) {
		return source.$toSortedComparing(config.compare, config.scope, config.order);
	}
	const target = new List<T>(source.getKey);
	return target.owning(new MapSorterComparing<T>(source, {
		target,
		compare: config.compare,
		scope: config.scope,
		order: config.order
	}));
}
