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
import * as DictionaryUtils from '../DictionaryUtils';
import IMap from '../IMap';
import List from '../List';
import ReadonlyMap from '../ReadonlyMap';
import AbstractSorterComparing from './AbstractSorterComparing';

/**
 * AbstractSorterComparing implementation for Map.
 */
export default class MapSorterComparing<T> extends AbstractSorterComparing<T> {
	/**
	 * Source map.
	 */
	readonly source: ReadonlyMap<T>;

	/**
	 * @param source Source map.
	 * @param config Sorter configuration.
	 */
	constructor(source: ReadonlyMap<T>, config?: AbstractSorterComparing.FullConfig<T>) {
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

/**
 * Sorts a map and starts synchronization.
 * @param source Source map.
 * @param config Sorter configuration.
 * @returns Sorted list.
 */
export function sortMapComparing<T>(source: ReadonlyMap<T>,
                                    config?: AbstractSorterComparing.Config<T>): DestroyableReadonlyList<T> {
	if (source.silent) {
		return source.toSortedComparing(config.compare, config.scope, config.order);
	}
	const target = new List<T>(source.getKey);
	return target.owning(new MapSorterComparing<T>(source, {
		target,
		compare: config.compare,
		scope: config.scope,
		order: config.order
	}));
}
