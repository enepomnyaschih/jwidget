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

import {createArrayFilterer, filterArray} from './array';
import {createMapFilterer, filterMap} from './map';
import {createSetFilterer, filterSet} from './set';
import AbstractArray from '../AbstractArray';
import AbstractMap from '../AbstractMap';
import AbstractSet from '../AbstractSet';
import ICollection from '../ICollection';
import ICollectionFilterer from './ICollectionFilterer';
import ICollectionFiltererConfig from './ICollectionFiltererConfig';

export function createFilterer<T>(source: ICollection<T>, config: ICollectionFiltererConfig<T>): ICollectionFilterer<T> {
	return (source instanceof AbstractArray) ? createArrayFilterer(source, config) :
		(source instanceof AbstractMap) ? createMapFilterer(source, config) :
		(source instanceof AbstractSet) ? createSetFilterer(source, config) : null;
}

export function filterCollection<T>(source: ICollection<T>, callback: (item: T) => boolean, scope?: any): ICollection<T> {
	return (source instanceof AbstractArray) ? filterArray(source, callback, scope) :
		(source instanceof AbstractMap) ? filterMap(source, callback, scope) :
		(source instanceof AbstractSet) ? filterSet(source, callback, scope) : null;
}
