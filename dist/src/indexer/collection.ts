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

import {createArrayIndexer, indexArray} from './array';
import {createMapIndexer, indexMap} from './map';
import {createSetIndexer, indexSet} from './set';
import List from '../List';
import Map from '../Map';
import Set from '../Set';
import ICollection from '../ICollection';
import ICollectionIndexer from './ICollectionIndexer';
import ICollectionIndexerConfig from './ICollectionIndexerConfig';
import IMap from '../IMap';

export function createIndexer<T>(source: ICollection<T>, config: ICollectionIndexerConfig<T>): ICollectionIndexer<T> {
	return (source instanceof List) ? createArrayIndexer(source, config) :
		(source instanceof Map) ? createMapIndexer(source, config) :
		(source instanceof Set) ? createSetIndexer(source, config) : null;
}

export function indexCollection<T>(source: ICollection<T>, callback: (item: T) => string, scope?: any): IMap<T> {
	return (source instanceof List) ? indexArray(source, callback, scope) :
		(source instanceof Map) ? indexMap(source, callback, scope) :
		(source instanceof Set) ? indexSet(source, callback, scope) : null;
}
