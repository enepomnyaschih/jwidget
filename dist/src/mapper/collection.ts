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

import {mapArray, mapDestroyableArray} from './array';
import {mapMap, mapDestroyableMap} from './map';
import {mapSet, mapDestroyableSet} from './set';
import ArrayMapper from './array/ArrayMapper';
import MapMapper from './map/MapMapper';
import SetMapper from './set/SetMapper';
import List from '../List';
import Map from '../Map';
import Set from '../Set';
import IClass from '../IClass';
import ICollection from '../ICollection';
import ICollectionMapper from './ICollectionMapper';

export function createMapper<T extends IClass, U extends IClass>(source: ICollection<T>, config: ICollectionMapper.Config<T, U>): ICollectionMapper<U> {
	return (source instanceof List) ? new ArrayMapper(source, config) :
		(source instanceof Map) ? new MapMapper(source, config) :
		(source instanceof Set) ? new SetMapper(source, config) : null;
}

export function mapCollection<T extends IClass, U extends IClass>(source: ICollection<T>, map: (item: T) => U, scope?: any): ICollection<U> {
	return (source instanceof List) ? mapArray(source, map, scope) :
		(source instanceof Map) ? mapMap(source, map, scope) :
		(source instanceof Set) ? mapSet(source, map, scope) : null;
}

export function mapDestroyableCollection<T extends IClass, U extends IClass>(source: ICollection<T>, create: (item: T) => U, scope?: any): ICollection<U> {
	return (source instanceof List) ? mapDestroyableArray(source, create, scope) :
		(source instanceof Map) ? mapDestroyableMap(source, create, scope) :
		(source instanceof Set) ? mapDestroyableSet(source, create, scope) : null;
}
