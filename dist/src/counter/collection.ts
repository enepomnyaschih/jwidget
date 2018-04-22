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

import DestroyableBindable from '../DestroyableBindable';
import List from '../List';
import Map from '../Map';
import ReadonlyCollection from '../ReadonlyCollection';
import Set from '../Set';
import AbstractCounter from './AbstractCounter';
import {countList, default as ListCounter} from './list';
import {countMap, default as MapCounter} from './map';
import {countSet, default as SetCounter} from './set';

export function createCounter<T>(source: ReadonlyCollection<T>, test: (item: T) => any,
								 config?: AbstractCounter.Config): AbstractCounter<T> {
	return (source instanceof List) ? new ListCounter(source, test, config) :
		(source instanceof Map) ? new MapCounter(source, test, config) :
		(source instanceof Set) ? new SetCounter(source, test, config) : null;
}

export function countCollection<T>(source: ReadonlyCollection<T>, test: (item: T) => any,
								   scope?: any): DestroyableBindable<number> {
	return (source instanceof List) ? countList(source, test, scope) :
		(source instanceof Map) ? countMap(source, test, scope) :
		(source instanceof Set) ? countSet(source, test, scope) : null;
}
