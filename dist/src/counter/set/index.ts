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

import SetCounter from './SetCounter';
import IClass from '../../IClass';
import ISet from '../../ISet';
import ISetCounter from './ISetCounter';
import ICollectionCounterConfig from '../ICollectionCounterConfig';
import Watchable from '../../Watchable';
import ObservableSet from '../../ObservableSet';
import ObservableSetCounter from './ObservableSetCounter';
import ObservableProperty from '../../ObservableProperty';

export function createSetCounter<T extends IClass>(source: ISet<T>, config: ICollectionCounterConfig<T>): ISetCounter<T> {
	return (source instanceof ObservableSet) ?
		new ObservableSetCounter<T>(source, config) :
		new SetCounter<T>(source, config);
}

export function countSet<T extends IClass>(source: ISet<T>, callback: (item: T) => boolean, scope?: any): Watchable<number> {
	if (!(source instanceof ObservableSet)) {
		return source.$count(callback, scope);
	}
	var result = new ObservableProperty(0);
	result.own(new ObservableSetCounter<T>(source, {
		target: result,
		filterItem: callback,
		scope: scope
	}));
	return result;
}
