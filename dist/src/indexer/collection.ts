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

import {default as ListIndexer, indexList} from './list';
import {default as MapIndexer, indexMap} from './map';
import {default as SetIndexer, indexSet} from './set';
import AbstractCollectionIndexer from './AbstractCollectionIndexer';
import ICollection from '../ICollection';
import IMap from '../IMap';
import List from '../List';
import Map from '../Map';
import Set from '../Set';

export function createIndexer<T>(source: ICollection<T>, config: AbstractCollectionIndexer.Config<T>): AbstractCollectionIndexer<T> {
	return (source instanceof List) ? new ListIndexer(source, config) :
		(source instanceof Map) ? new MapIndexer(source, config) :
		(source instanceof Set) ? new SetIndexer(source, config) : null;
}

export function indexCollection<T>(source: ICollection<T>, getKey: (item: T) => string, scope?: any): IMap<T> {
	return (source instanceof List) ? indexList(source, getKey, scope) :
		(source instanceof Map) ? indexMap(source, getKey, scope) :
		(source instanceof Set) ? indexSet(source, getKey, scope) : null;
}
