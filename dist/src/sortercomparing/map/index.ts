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

import IArray from '../../IArray';
import ICollectionSorterComparingConfig from '../ICollectionSorterComparingConfig';
import IMap from '../../IMap';
import IMapSorterComparing from './IMapSorterComparing';
import MapSorterComparing from './MapSorterComparing';
import List from '../../List';
import ObservableMapSorterComparing from './ObservableMapSorterComparing';

export function createMapSorterComparing<T>(source: IMap<T>, config: ICollectionSorterComparingConfig<T>): IMapSorterComparing<T> {
	return source.silent ?
		new MapSorterComparing<T>(source, config) :
		new ObservableMapSorterComparing<T>(source, config);
}

export function sortMapComparing<T>(source: IMap<T>, callback: (x: T, y: T) => number, scope?: any): IArray<T> {
	if (source.silent) {
		return source.$toSortedComparing(callback, scope);
	}
	var result = new List<T>();
	result.own(new ObservableMapSorterComparing<T>(source, {
		target: result,
		compare: callback,
		scope: scope
	}));
	return result;
}
