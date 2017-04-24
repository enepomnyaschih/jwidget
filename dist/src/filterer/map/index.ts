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

import MapFilterer from './MapFilterer';
import IMap from '../../IMap';
import IMapFilterer from './IMapFilterer';
import IMapFiltererConfig from './IMapFiltererConfig';
import Map from '../../Map';
import ObservableMapFilterer from './ObservableMapFilterer';

export function createMapFilterer<T>(source: IMap<T>, config: IMapFiltererConfig<T>): IMapFilterer<T> {
	return source.silent ?
		new MapFilterer<T>(source, config) :
		new ObservableMapFilterer<T>(source, config);
}

export function filterMap<T>(source: IMap<T>, callback: (item: T) => boolean, scope?: any): IMap<T> {
	if (source.silent) {
		return source.$filter(callback, scope);
	}
	var result = new Map<T>();
	result.own(new ObservableMapFilterer<T>(source, {
		target: result,
		filterItem: callback,
		scope: scope
	}));
	return result;
}
