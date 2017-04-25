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

import {default as ArrayOrderer, arrayToArray} from './array';
import {default as MapOrderer, mapToArray} from './map';
import {default as SetOrderer, setToArray} from './set';
import AbstractCollectionOrderer from './AbstractCollectionOrderer';
import IList from '../IList';
import IClass from '../IClass';
import ICollection from '../ICollection';
import List from '../List';
import Map from '../Map';
import Set from '../Set';

export function createOrderer<T extends IClass>(source: ICollection<T>, config: AbstractCollectionOrderer.Config<T>): AbstractCollectionOrderer<T> {
	return (source instanceof List) ? new ArrayOrderer(source, config) :
		(source instanceof Map) ? new MapOrderer(source, config) :
		(source instanceof Set) ? new SetOrderer(source, config) : null;
}

export function collectionToArray<T extends IClass>(source: ICollection<T>): IList<T> {
	return (source instanceof List) ? arrayToArray(source) :
		(source instanceof Map) ? mapToArray(source) :
		(source instanceof Set) ? setToArray(source) : null;
}
