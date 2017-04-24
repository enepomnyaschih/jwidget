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

import {createArrayObserver} from './array';
import {createMapObserver} from './map';
import {createSetObserver} from './set';
import List from '../List';
import Map from '../Map';
import Set from '../Set';
import ICollection from '../ICollection';
import ICollectionObserver from './ICollectionObserver';

export function createObserver<T>(source: ICollection<T>, config: ICollectionObserver.Config<T>): ICollectionObserver {
	return (source instanceof List) ? createArrayObserver(source, config) :
		(source instanceof Map) ? createMapObserver(source, config) :
		(source instanceof Set) ? createSetObserver(source, config) : null;
}
