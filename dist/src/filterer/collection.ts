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

import {default as ListFilterer, filterList} from './list';
import {default as MapFilterer, filterMap} from './map';
import {default as SetFilterer, filterSet} from './set';
import AbstractCollectionFilterer from './AbstractCollectionFilterer';
import ICollection from '../ICollection';
import List from '../List';
import Map from '../Map';
import Set from '../Set';

export function createFilterer<T>(source: ICollection<T>, test: (item: T) => boolean, scope?: any): AbstractCollectionFilterer<T> {
	return (source instanceof List) ? new ListFilterer(source, test, {scope}) :
		(source instanceof Map) ? new MapFilterer(source, test, {scope}) :
		(source instanceof Set) ? new SetFilterer(source, test, {scope}) : null;
}

export function filterCollection<T>(source: ICollection<T>, test: (item: T) => boolean, scope?: any): ICollection<T> {
	return (source instanceof List) ? filterList(source, test, scope) :
		(source instanceof Map) ? filterMap(source, test, scope) :
		(source instanceof Set) ? filterSet(source, test, scope) : null;
}
