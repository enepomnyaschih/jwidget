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

import {destroy} from '../../Core';
import Destroyable from '../../Destroyable';
import IMap from '../../IMap';
import IMapMapper from './IMapMapper';
import IMapMapperConfig from './IMapMapperConfig';
import Map from '../../Map';
import MapMapper from './MapMapper';
import ObservableMapMapper from './ObservableMapMapper';

export function createMapMapper<T, U>(source: IMap<T>, config: IMapMapperConfig<T, U>): IMapMapper<T, U> {
	return source.silent ?
		new MapMapper<T, U>(source, config) :
		new ObservableMapMapper<T, U>(source, config);
}

export function mapMap<T, U>(source: IMap<T>, callback: (item: T) => U, scope?: any): IMap<U> {
	if (source.silent) {
		return source.$map(callback, scope);
	}
	var result = new Map<U>();
	result.own(new ObservableMapMapper<T, U>(source, {
		target: result,
		createItem: callback,
		scope: scope
	}));
	return result;
}

export function mapDestroyableMap<T, U extends Destroyable>(source: IMap<T>, callback: (item: T) => U, scope?: any): IMap<U> {
	if (source.silent) {
		return source.$map(callback, scope).ownItems();
	}
	var result = new Map<U>();
	result.own(new ObservableMapMapper<T, U>(source, {
		target: result,
		createItem: callback,
		destroyItem: destroy,
		scope: scope
	}));
	return result;
}
