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

import ListObserver from './list';
import MapObserver from './map';
import SetObserver from './set';
import AbstractCollectionObserver from './AbstractCollectionObserver';
import ICollection from '../ICollection';
import List from '../List';
import Map from '../Map';
import Set from '../Set';

export function createObserver<T>(source: ICollection<T>, config: AbstractCollectionObserver.Config<T>): AbstractCollectionObserver<T> {
	return (source instanceof List) ? new ListObserver(source, config) :
		(source instanceof Map) ? new MapObserver(source, config) :
		(source instanceof Set) ? new SetObserver(source, config) : null;
}
