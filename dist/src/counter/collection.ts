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

import {createArrayCounter, countArray} from './array';
import {createMapCounter, countMap} from './map';
import {createSetCounter, countSet} from './set';
import AbstractArray from '../AbstractArray';
import AbstractMap from '../AbstractMap';
import AbstractSet from '../AbstractSet';
import ICollection from '../ICollection';
import ICollectionCounter from './ICollectionCounter';
import ICollectionCounterConfig from './ICollectionCounterConfig';
import Watchable from '../Watchable';

export function createCounter<T>(source: ICollection<T>, config: ICollectionCounterConfig<T>): ICollectionCounter<T> {
	return (source instanceof AbstractArray) ? createArrayCounter(source, config) :
		(source instanceof AbstractMap) ? createMapCounter(source, config) :
		(source instanceof AbstractSet) ? createSetCounter(source, config) : null;
}

export function countCollection<T>(source: ICollection<T>, callback: (item: T) => boolean, scope?: any): Watchable<number> {
	return (source instanceof AbstractArray) ? countArray(source, callback, scope) :
		(source instanceof AbstractMap) ? countMap(source, callback, scope) :
		(source instanceof AbstractSet) ? countSet(source, callback, scope) : null;
}
