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

import ArrayCounter from './ArrayCounter';
import IArray from '../../IArray';
import IArrayCounter from './IArrayCounter';
import ICollectionCounterConfig from '../ICollectionCounterConfig';
import ObservableArray from '../../ObservableArray';
import ObservableArrayCounter from './ObservableArrayCounter';
import Property from '../../Property';
import Watchable from '../../Watchable';

export function createArrayCounter<T>(source: IArray<T>, config: ICollectionCounterConfig<T>): IArrayCounter<T> {
	return (source instanceof ObservableArray) ?
		new ObservableArrayCounter<T>(source, config) :
		new ArrayCounter<T>(source, config);
}

export function countArray<T>(source: IArray<T>, callback: (item: T) => boolean, scope?: any): Watchable<number> {
	if (!(source instanceof ObservableArray)) {
		return source.$count(callback, scope);
	}
	var result = new Property(0);
	result.own(new ObservableArrayCounter<T>(source, {
		target: result,
		filterItem: callback,
		scope: scope
	}));
	return result;
}
