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

import {destroy} from '../../Core';
import ArrayMapper from './ArrayMapper';
import Destroyable from '../../Destroyable';
import IArray from '../../IArray';
import IArrayMapper from './IArrayMapper';
import IArrayMapperConfig from './IArrayMapperConfig';
import List from '../../List';
import ObservableArrayMapper from './ObservableArrayMapper';

export function createArrayMapper<T, U>(source: IArray<T>, config: IArrayMapperConfig<T, U>): IArrayMapper<T, U> {
	return source.isSilent() ?
		new ArrayMapper<T, U>(source, config) :
		new ObservableArrayMapper<T, U>(source, config);
}

export function mapArray<T, U>(source: IArray<T>, callback: (item: T) => U, scope?: any): IArray<U> {
	if (source.isSilent()) {
		return source.$map(callback, scope);
	}
	var result = new List<U>();
	result.own(new ObservableArrayMapper<T, U>(source, {
		target: result,
		createItem: callback,
		scope: scope
	}));
	return result;
}

export function mapDestroyableArray<T, U extends Destroyable>(source: IArray<T>, callback: (item: T) => U, scope?: any): IArray<U> {
	if (source.isSilent()) {
		return source.$map(callback, scope).ownItems();
	}
	var result = new List<U>();
	result.own(new ObservableArrayMapper<T, U>(source, {
		target: result,
		createItem: callback,
		destroyItem: destroy,
		scope: scope
	}));
	return result;
}
