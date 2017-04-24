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

import MapCounter from './MapCounter';
import ICollectionCounter from '../ICollectionCounter';
import IMap from '../../IMap';
import IMapCounter from './IMapCounter';
import ObservableMapCounter from './ObservableMapCounter';
import Property from '../../Property';
import Watchable from '../../Watchable';

export function createMapCounter<T>(source: IMap<T>, config: ICollectionCounter.Config<T>): IMapCounter<T> {
	return source.silent ?
		new MapCounter<T>(source, config) :
		new ObservableMapCounter<T>(source, config);
}

export function countMap<T>(source: IMap<T>, test: (item: T) => boolean, scope?: any): Watchable<number> {
	if (source.silent) {
		return source.$count(test, scope);
	}
	var result = new Property(0);
	result.own(new ObservableMapCounter<T>(source, {
		target: result,
		test: test,
		scope: scope
	}));
	return result;
}
