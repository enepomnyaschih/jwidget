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

import {arrayToSet} from './array';
import {mapToSet} from './map';
import {setToSet} from './set';
import ArrayLister from './array/ArrayLister';
import MapLister from './map/MapLister';
import SetLister from './set/SetLister';
import List from '../List';
import Map from '../Map';
import Set from '../Set';
import IClass from '../IClass';
import ICollection from '../ICollection';
import ICollectionLister from './ICollectionLister';
import ISet from '../ISet';

export function createLister<T extends IClass>(source: ICollection<T>, config: ICollectionLister.Config<T>): ICollectionLister<T> {
	return (source instanceof List) ? new ArrayLister(source, config) :
		(source instanceof Map) ? new MapLister(source, config) :
		(source instanceof Set) ? new SetLister(source, config) : null;
}

export function collectionToSet<T extends IClass>(source: ICollection<T>): ISet<T> {
	return (source instanceof List) ? arrayToSet(source) :
		(source instanceof Map) ? mapToSet(source) :
		(source instanceof Set) ? setToSet(source) : null;
}
