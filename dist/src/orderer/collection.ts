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

import {createArrayOrderer, arrayToArray} from './array';
import {createMapOrderer, mapToArray} from './map';
import {createSetOrderer, setToArray} from './set';
import AbstractArray from '../AbstractArray';
import AbstractMap from '../AbstractMap';
import AbstractSet from '../AbstractSet';
import IClass from '../IClass';
import ICollection from '../ICollection';
import ICollectionOrderer from './ICollectionOrderer';
import ICollectionOrdererConfig from './ICollectionOrdererConfig';
import IArray from '../IArray';

export function createOrderer<T extends IClass>(source: ICollection<T>, config: ICollectionOrdererConfig<T>): ICollectionOrderer<T> {
	return (source instanceof AbstractArray) ? createArrayOrderer(source, config) :
		(source instanceof AbstractMap) ? createMapOrderer(source, config) :
		(source instanceof AbstractSet) ? createSetOrderer(source, config) : null;
}

export function collectionToArray<T extends IClass>(source: ICollection<T>): IArray<T> {
	return (source instanceof AbstractArray) ? arrayToArray(source) :
		(source instanceof AbstractMap) ? mapToArray(source) :
		(source instanceof AbstractSet) ? setToArray(source) : null;
}
