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
import ArrayMapper from './ArrayMapper';
import Destroyable from '../../Destroyable';
import IArray from '../../IArray';
import IArrayMapper from './IArrayMapper';
import List from '../../List';
import ObservableArrayMapper from './ObservableArrayMapper';

export function createArrayMapper<T, U>(source: IArray<T>, config: IArrayMapper.Config<T, U>): IArrayMapper<T, U> {
	return source.silent ?
		new ArrayMapper<T, U>(source, config) :
		new ObservableArrayMapper<T, U>(source, config);
}

export function mapArray<T, U>(source: IArray<T>, map: (item: T) => U, scope?: any): IArray<U> {
	if (source.silent) {
		return source.$map(map, scope);
	}
	var result = new List<U>();
	result.own(new ObservableArrayMapper<T, U>(source, {
		target: result,
		create: map,
		scope: scope
	}));
	return result;
}

export function mapDestroyableArray<T, U extends Destroyable>(source: IArray<T>, create: (item: T) => U, scope?: any): IArray<U> {
	if (source.silent) {
		return source.$map(create, scope).ownItems();
	}
	var result = new List<U>();
	result.own(new ObservableArrayMapper<T, U>(source, {
		target: result,
		create: create,
		destroy: destroy,
		scope: scope
	}));
	return result;
}
