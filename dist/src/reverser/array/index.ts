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

import ArrayReverser from './ArrayReverser';
import IArray from '../../IArray';
import IArrayReverser from './IArrayReverser';
import IArrayReverserConfig from './IArrayReverserConfig';
import List from '../../List';
import ObservableArrayReverser from './ObservableArrayReverser';

export function createArrayReverser<T>(source: IArray<T>, config: IArrayReverserConfig<T>): IArrayReverser<T> {
	return source.isSilent() ?
		new ArrayReverser<T>(source, config) :
		new ObservableArrayReverser<T>(source, config);
}

export function reverseArray<T>(source: IArray<T>): IArray<T> {
	if (source.isSilent()) {
		return source.$toReversed();
	}
	var result = new List<T>();
	result.own(new ObservableArrayReverser<T>(source, {
		target: result
	}));
	return result;
}