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

import ArraySorterComparing from './ArraySorterComparing';
import IArray from '../../IArray';
import IArraySorterComparing from './IArraySorterComparing';
import ICollectionSorterComparingConfig from '../ICollectionSorterComparingConfig';
import List from '../../List';
import ObservableArraySorterComparing from './ObservableArraySorterComparing';

export function createArraySorterComparing<T>(source: IArray<T>, config: ICollectionSorterComparingConfig<T>): IArraySorterComparing<T> {
	return source.silent ?
		new ArraySorterComparing<T>(source, config) :
		new ObservableArraySorterComparing<T>(source, config);
}

export function sortArrayComparing<T>(source: IArray<T>, callback: (x: T, y: T) => number, scope?: any): IArray<T> {
	if (source.silent) {
		return source.$toSortedComparing(callback, scope);
	}
	var result = new List<T>();
	result.own(new ObservableArraySorterComparing<T>(source, {
		target: result,
		compare: callback,
		scope: scope
	}));
	return result;
}
