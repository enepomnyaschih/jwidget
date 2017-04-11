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

import ArrayFilterer from './ArrayFilterer';
import IArray from '../../IArray';
import IArrayFilterer from './IArrayFilterer';
import IArrayFiltererConfig from './IArrayFiltererConfig';
import ObservableArray from '../../ObservableArray';
import ObservableArrayFilterer from './ObservableArrayFilterer';

export function createArrayFilterer<T>(source: IArray<T>, config: IArrayFiltererConfig<T>): IArrayFilterer<T> {
	return (source instanceof ObservableArray) ?
		new ObservableArrayFilterer<T>(source, config) :
		new ArrayFilterer<T>(source, config);
}

export function filterArray<T>(source: IArray<T>, callback: (item: T) => boolean, scope?: any): IArray<T> {
	if (!(source instanceof ObservableArray)) {
		return source.$filter(callback, scope);
	}
	var result = new ObservableArray<T>();
	result.own(new ObservableArrayFilterer<T>(source, {
		target: result,
		filterItem: callback,
		scope: scope
	}));
	return result;
}
