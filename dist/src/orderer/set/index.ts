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

import IArray from '../../IArray';
import IClass from '../../IClass';
import ICollectionOrdererConfig from '../ICollectionOrdererConfig';
import ISet from '../../ISet';
import ISetOrderer from './ISetOrderer';
import List from '../../List';
import ObservableSet from '../../ObservableSet';
import ObservableSetOrderer from './ObservableSetOrderer';
import SetOrderer from './SetOrderer';

export function createSetOrderer<T extends IClass>(source: ISet<T>, config: ICollectionOrdererConfig<T>): ISetOrderer<T> {
	return (source instanceof ObservableSet) ?
		new ObservableSetOrderer<T>(source, config) :
		new SetOrderer<T>(source, config);
}

export function setToArray<T extends IClass>(source: ISet<T>): IArray<T> {
	if (!(source instanceof ObservableSet)) {
		return source.$toArray();
	}
	var result = new List<T>();
	result.own(new ObservableSetOrderer<T>(source, {
		target: result
	}));
	return result;
}
