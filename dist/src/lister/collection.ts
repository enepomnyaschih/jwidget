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

import {createArrayLister, arrayToSet} from './array';
import {createMapLister, mapToSet} from './map';
import {createSetLister, setToSet} from './set';
import List from '../List';
import AbstractMap from '../AbstractMap';
import AbstractSet from '../AbstractSet';
import IClass from '../IClass';
import ICollection from '../ICollection';
import ICollectionLister from './ICollectionLister';
import ICollectionListerConfig from './ICollectionListerConfig';
import ISet from '../ISet';

export function createLister<T extends IClass>(source: ICollection<T>, config: ICollectionListerConfig<T>): ICollectionLister<T> {
	return (source instanceof List) ? createArrayLister(source, config) :
		(source instanceof AbstractMap) ? createMapLister(source, config) :
		(source instanceof AbstractSet) ? createSetLister(source, config) : null;
}

export function collectionToSet<T extends IClass>(source: ICollection<T>): ISet<T> {
	return (source instanceof List) ? arrayToSet(source) :
		(source instanceof AbstractMap) ? mapToSet(source) :
		(source instanceof AbstractSet) ? setToSet(source) : null;
}
