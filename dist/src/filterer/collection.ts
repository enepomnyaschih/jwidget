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

import DestroyableReadonlyCollection from '../DestroyableReadonlyCollection';
import List from '../List';
import Map from '../Map';
import ReadonlyCollection from '../ReadonlyCollection';
import Set from '../Set';
import AbstractFilterer from './AbstractFilterer';
import {default as ListFilterer, filterList} from './list';
import {default as MapFilterer, filterMap} from './map';
import {default as SetFilterer, filterSet} from './set';

/**
 * Creates a filterer matching the source collection type.
 * @param source Source collection.
 * @param test Filtering criteria.
 * @param scope Filterer configuration.
 * @returns Collection filterer.
 */
export function createFilterer<T>(source: ReadonlyCollection<T>, test: (item: T) => any,
                                  scope?: any): AbstractFilterer<T> {
	return (source instanceof List) ? new ListFilterer(source, test, {scope}) :
		(source instanceof Map) ? new MapFilterer(source, test, {scope}) :
			(source instanceof Set) ? new SetFilterer(source, test, {scope}) : null;
}

/**
 * Filters a collection and starts synchronization.
 * @param source Source collection.
 * @param test Filtering criteria.
 * @param scope Call scope of `test` function.
 * @returns Target collection.
 */
export function filterCollection<T>(source: ReadonlyCollection<T>, test: (item: T) => any,
                                    scope?: any): DestroyableReadonlyCollection<T> {
	return (source instanceof List) ? filterList(source, test, scope) :
		(source instanceof Map) ? filterMap(source, test, scope) :
			(source instanceof Set) ? filterSet(source, test, scope) : null;
}
