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
import AbstractSorterComparing from './AbstractSorterComparing';
import {default as ListSorterComparing, sortListComparing} from './list';
import {default as MapSorterComparing, sortMapComparing} from './map';
import {default as SetSorterComparing, sortSetComparing} from './set';

export function createSorterComparing<T>(source: ReadonlyCollection<T>,
										 config?: AbstractSorterComparing.FullConfig<T>): AbstractSorterComparing<T> {
	return (source instanceof List) ? new ListSorterComparing(source, config) :
		(source instanceof Map) ? new MapSorterComparing(source, config) :
		(source instanceof Set) ? new SetSorterComparing(source, config) : null;
}

export function sortCollectionComparing<T>(source: ReadonlyCollection<T>,
										   config?: AbstractSorterComparing.Config<T>): DestroyableReadonlyList<T> {
	return (source instanceof List) ? sortListComparing(source, config) :
		(source instanceof Map) ? sortMapComparing(source, config) :
		(source instanceof Set) ? sortSetComparing(source, config) : null;
}
