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

import ArrayOrderer from './ArrayOrderer';
import IArray from '../../IArray';
import IArrayOrderer from './IArrayOrderer';
import IClass from '../../IClass';
import ICollectionOrdererConfig from '../ICollectionOrdererConfig';
import List from '../../List';
import ObservableArrayOrderer from './ObservableArrayOrderer';

export function createArrayOrderer<T extends IClass>(source: IArray<T>, config: ICollectionOrdererConfig<T>): IArrayOrderer<T> {
	return source.silent ?
		new ArrayOrderer<T>(source, config) :
		new ObservableArrayOrderer<T>(source, config);
}

export function arrayToArray<T extends IClass>(source: IArray<T>): IArray<T> {
	if (source.silent) {
		return source.$toArray();
	}
	var result = new List<T>();
	result.own(new ObservableArrayOrderer<T>(source, {
		target: result
	}));
	return result;
}
