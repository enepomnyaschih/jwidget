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
import IClass from '../../IClass';
import ICollectionSorterComparingConfig from '../ICollectionSorterComparingConfig';
import ISet from '../../ISet';
import ISetSorterComparing from './ISetSorterComparing';
import List from '../../List';
import ObservableSet from '../../ObservableSet';
import ObservableSetSorterComparing from './ObservableSetSorterComparing';
import SetSorterComparing from './SetSorterComparing';

export function createSetSorterComparing<T extends IClass>(source: ISet<T>, config: ICollectionSorterComparingConfig<T>): ISetSorterComparing<T> {
	return (source instanceof ObservableSet) ?
		new ObservableSetSorterComparing<T>(source, config) :
		new SetSorterComparing<T>(source, config);
}

export function sortSetComparing<T extends IClass>(source: ISet<T>, callback: (x: T, y: T) => number, scope?: any): IArray<T> {
	if (!(source instanceof ObservableSet)) {
		return source.$toSortedComparing(callback, scope);
	}
	var result = new List<T>();
	result.own(new ObservableSetSorterComparing<T>(source, {
		target: result,
		compare: callback,
		scope: scope
	}));
	return result;
}
