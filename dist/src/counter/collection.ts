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

import {countArray} from './array';
import {countMap} from './map';
import {countSet} from './set';
import ArrayCounter from './array/ArrayCounter';
import MapCounter from './map/MapCounter';
import SetCounter from './set/SetCounter';
import List from '../List';
import Map from '../Map';
import Set from '../Set';
import ICollection from '../ICollection';
import ICollectionCounter from './ICollectionCounter';
import Watchable from '../Watchable';

export function createCounter<T>(source: ICollection<T>, config: ICollectionCounter.Config<T>): ICollectionCounter<T> {
	return (source instanceof List) ? new ArrayCounter(source, config) :
		(source instanceof Map) ? new MapCounter(source, config) :
		(source instanceof Set) ? new SetCounter(source, config) : null;
}

export function countCollection<T>(source: ICollection<T>, test: (item: T) => boolean, scope?: any): Watchable<number> {
	return (source instanceof List) ? countArray(source, test, scope) :
		(source instanceof Map) ? countMap(source, test, scope) :
		(source instanceof Set) ? countSet(source, test, scope) : null;
}
