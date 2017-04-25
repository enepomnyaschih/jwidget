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

import {default as ListLister, listToSet} from './list';
import {default as MapLister, mapToSet} from './map';
import {default as SetLister, setToSet} from './set';
import AbstractCollectionLister from './AbstractCollectionLister';
import IClass from '../IClass';
import ICollection from '../ICollection';
import ISet from '../ISet';
import List from '../List';
import Map from '../Map';
import Set from '../Set';

export function createLister<T extends IClass>(source: ICollection<T>, config: AbstractCollectionLister.Config<T>): AbstractCollectionLister<T> {
	return (source instanceof List) ? new ListLister(source, config) :
		(source instanceof Map) ? new MapLister(source, config) :
		(source instanceof Set) ? new SetLister(source, config) : null;
}

export function collectionToSet<T extends IClass>(source: ICollection<T>): ISet<T> {
	return (source instanceof List) ? listToSet(source) :
		(source instanceof Map) ? mapToSet(source) :
		(source instanceof Set) ? setToSet(source) : null;
}
