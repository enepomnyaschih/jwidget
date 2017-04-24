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

import {createArraySorterComparing, sortArrayComparing} from './array';
import {createMapSorterComparing, sortMapComparing} from './map';
import {createSetSorterComparing, sortSetComparing} from './set';
import List from '../List';
import Map from '../Map';
import Set from '../Set';
import ICollection from '../ICollection';
import ICollectionSorterComparing from './ICollectionSorterComparing';
import ICollectionSorterComparingConfig from './ICollectionSorterComparingConfig';
import IArray from '../IArray';

export function createSorterComparing<T>(source: ICollection<T>, config: ICollectionSorterComparingConfig<T>): ICollectionSorterComparing<T> {
	return (source instanceof List) ? createArraySorterComparing(source, config) :
		(source instanceof Map) ? createMapSorterComparing(source, config) :
		(source instanceof Set) ? createSetSorterComparing(source, config) : null;
}

export function collectionToArray<T>(source: ICollection<T>, compare: (x: T, y: T) => number, scope?: any): IArray<T> {
	return (source instanceof List) ? sortArrayComparing(source, compare, scope) :
		(source instanceof Map) ? sortMapComparing(source, compare, scope) :
		(source instanceof Set) ? sortSetComparing(source, compare, scope) : null;
}
