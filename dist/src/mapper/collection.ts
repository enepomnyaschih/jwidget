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

import {createArrayMapper, mapArray, mapDestroyableArray} from './array';
import {createMapMapper, mapMap, mapDestroyableMap} from './map';
import {createSetMapper, mapSet, mapDestroyableSet} from './set';
import AbstractArray from '../AbstractArray';
import AbstractMap from '../AbstractMap';
import AbstractSet from '../AbstractSet';
import IClass from '../IClass';
import ICollection from '../ICollection';
import ICollectionMapper from './ICollectionMapper';
import ICollectionMapperConfig from './ICollectionMapperConfig';

export function createMapper<T extends IClass, U extends IClass>(source: ICollection<T>, config: ICollectionMapperConfig<T, U>): ICollectionMapper<U> {
	return (source instanceof AbstractArray) ? createArrayMapper(source, config) :
		(source instanceof AbstractMap) ? createMapMapper(source, config) :
		(source instanceof AbstractSet) ? createSetMapper(source, config) : null;
}

export function mapCollection<T extends IClass, U extends IClass>(source: ICollection<T>, callback: (item: T) => U, scope?: any): ICollection<U> {
	return (source instanceof AbstractArray) ? mapArray(source, callback, scope) :
		(source instanceof AbstractMap) ? mapMap(source, callback, scope) :
		(source instanceof AbstractSet) ? mapSet(source, callback, scope) : null;
}

export function mapDestroyableCollection<T extends IClass, U extends IClass>(source: ICollection<T>, callback: (item: T) => U, scope?: any): ICollection<U> {
	return (source instanceof AbstractArray) ? mapDestroyableArray(source, callback, scope) :
		(source instanceof AbstractMap) ? mapDestroyableMap(source, callback, scope) :
		(source instanceof AbstractSet) ? mapDestroyableSet(source, callback, scope) : null;
}
