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

import DestroyableReadonlyList from '../DestroyableReadonlyList';
import List from '../List';
import Map from '../Map';
import ReadonlyCollection from '../ReadonlyCollection';
import Set from '../Set';
import AbstractConverterToList from './AbstractConverterToList';
import {default as ListConverterToList, listToList} from './list';
import {default as MapConverterToList, mapToList} from './map';
import {default as SetConverterToList, setToList} from './set';

export function createConverterToList<T>(source: ReadonlyCollection<T>, config: AbstractConverterToList.Config<T>): AbstractConverterToList<T> {
	return (source instanceof List) ? new ListConverterToList(source, config) :
		(source instanceof Map) ? new MapConverterToList(source, config) :
		(source instanceof Set) ? new SetConverterToList(source, config) : null;
}

export function collectionToList<T>(source: ReadonlyCollection<T>): DestroyableReadonlyList<T> {
	return (source instanceof List) ? listToList(source) :
		(source instanceof Map) ? mapToList(source) :
		(source instanceof Set) ? setToList(source) : null;
}

export function collectionAsList<T>(source: ReadonlyCollection<T>): DestroyableReadonlyList<T> {
	return (source instanceof List) ? source :
		(source instanceof Map) ? mapToList(source) :
		(source instanceof Set) ? setToList(source) : null;
}
