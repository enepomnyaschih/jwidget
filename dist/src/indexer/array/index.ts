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

import ArrayIndexer from './ArrayIndexer';
import IArray from '../../IArray';
import IArrayIndexer from './IArrayIndexer';
import ICollectionIndexerConfig from '../ICollectionIndexerConfig';
import IMap from '../../IMap';
import ObservableArray from '../../ObservableArray';
import ObservableArrayIndexer from './ObservableArrayIndexer';
import ObservableMap from '../../ObservableMap';

export function createArrayIndexer<T>(source: IArray<T>, config: ICollectionIndexerConfig<T>): IArrayIndexer<T> {
	return (source instanceof ObservableArray) ?
		new ObservableArrayIndexer<T>(source, config) :
		new ArrayIndexer<T>(source, config);
}

export function indexArray<T>(source: IArray<T>, callback: (item: T) => any, scope?: any): IMap<T> {
	if (!(source instanceof ObservableArray)) {
		return source.$index(callback, scope);
	}
	var result = new ObservableMap<T>();
	result.own(new ObservableArrayIndexer<T>(source, {
		target: result,
		getKey: callback,
		scope: scope
	}));
	return result;
}
