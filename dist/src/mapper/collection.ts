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

import {createArrayMapper, mapArray, mapDestroyableArray} from './array';
import {createMapMapper, mapMap, mapDestroyableMap} from './map';
import {createSetMapper, mapSet, mapDestroyableSet} from './set';
import List from '../List';
import Map from '../Map';
import Set from '../Set';
import IClass from '../IClass';
import ICollection from '../ICollection';
import ICollectionMapper from './ICollectionMapper';
import ICollectionMapperConfig from './ICollectionMapperConfig';

export function createMapper<T extends IClass, U extends IClass>(source: ICollection<T>, config: ICollectionMapperConfig<T, U>): ICollectionMapper<U> {
	return (source instanceof List) ? createArrayMapper(source, config) :
		(source instanceof Map) ? createMapMapper(source, config) :
		(source instanceof Set) ? createSetMapper(source, config) : null;
}

export function mapCollection<T extends IClass, U extends IClass>(source: ICollection<T>, callback: (item: T) => U, scope?: any): ICollection<U> {
	return (source instanceof List) ? mapArray(source, callback, scope) :
		(source instanceof Map) ? mapMap(source, callback, scope) :
		(source instanceof Set) ? mapSet(source, callback, scope) : null;
}

export function mapDestroyableCollection<T extends IClass, U extends IClass>(source: ICollection<T>, callback: (item: T) => U, scope?: any): ICollection<U> {
	return (source instanceof List) ? mapDestroyableArray(source, callback, scope) :
		(source instanceof Map) ? mapDestroyableMap(source, callback, scope) :
		(source instanceof Set) ? mapDestroyableSet(source, callback, scope) : null;
}
