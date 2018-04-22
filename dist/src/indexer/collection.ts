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

import DestroyableReadOnlyMap from '../DestroyableReadOnlyMap';
import ICollection from '../ICollection';
import List from '../List';
import Map from '../Map';
import Set from '../Set';
import AbstractIndexer from './AbstractIndexer';
import {default as ListIndexer, indexList} from './list';
import {default as MapIndexer, indexMap} from './map';
import {default as SetIndexer, indexSet} from './set';

export function createIndexer<T>(source: ICollection<T>, getKey: (item: T) => any,
								 config?: AbstractIndexer.Config<T>): AbstractIndexer<T> {
	return (source instanceof List) ? new ListIndexer(source, getKey, config) :
		(source instanceof Map) ? new MapIndexer(source, getKey, config) :
		(source instanceof Set) ? new SetIndexer(source, getKey, config) : null;
}

export function indexCollection<T>(source: ICollection<T>, getKey: (item: T) => any, scope?: any): DestroyableReadOnlyMap<T> {
	return (source instanceof List) ? indexList(source, getKey, scope) :
		(source instanceof Map) ? indexMap(source, getKey, scope) :
		(source instanceof Set) ? indexSet(source, getKey, scope) : null;
}
