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

import {sortArrayComparing} from './array';
import {sortMapComparing} from './map';
import {sortSetComparing} from './set';
import ArraySorterComparing from './array/ArraySorterComparing';
import MapSorterComparing from './map/MapSorterComparing';
import SetSorterComparing from './set/SetSorterComparing';
import List from '../List';
import Map from '../Map';
import Set from '../Set';
import ICollection from '../ICollection';
import ICollectionSorterComparing from './ICollectionSorterComparing';
import IArray from '../IArray';

export function createSorterComparing<T>(source: ICollection<T>, config: ICollectionSorterComparing.Config<T>): ICollectionSorterComparing<T> {
	return (source instanceof List) ? new ArraySorterComparing(source, config) :
		(source instanceof Map) ? new MapSorterComparing(source, config) :
		(source instanceof Set) ? new SetSorterComparing(source, config) : null;
}

export function collectionToArray<T>(source: ICollection<T>, compare: (x: T, y: T) => number, scope?: any): IArray<T> {
	return (source instanceof List) ? sortArrayComparing(source, compare, scope) :
		(source instanceof Map) ? sortMapComparing(source, compare, scope) :
		(source instanceof Set) ? sortSetComparing(source, compare, scope) : null;
}
