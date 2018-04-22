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

import DestroyableReadOnlyCollection from '../DestroyableReadOnlyCollection';
import List from '../List';
import Map from '../Map';
import ReadOnlyCollection from '../ReadOnlyCollection';
import Set from '../Set';
import AbstractMapper from './AbstractMapper';
import {default as ListMapper, mapList} from './list';
import {default as MapMapper, mapMap} from './map';
import {default as SetMapper, mapSet} from './set';

export function createMapper<T, U>(source: ReadOnlyCollection<T>, create: (sourceValue: T) => U,
		config?: AbstractMapper.Config<T, U>): AbstractMapper<T, U> {
	return (source instanceof List) ? new ListMapper(source, create, config) :
		(source instanceof Map) ? new MapMapper(source, create, config) :
		(source instanceof Set) ? new SetMapper(source, create, config) : null;
}

export function mapCollection<T, U>(source: ReadOnlyCollection<T>, create: (item: T) => U,
		config?: AbstractMapper.Config<T, U>): DestroyableReadOnlyCollection<U> {
	return (source instanceof List) ? mapList(source, create, config) :
		(source instanceof Map) ? mapMap(source, create, config) :
		(source instanceof Set) ? mapSet(source, create, config) : null;
}
