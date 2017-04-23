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

import ArrayLister from './ArrayLister';
import IArray from '../../IArray';
import IArrayLister from './IArrayLister';
import IClass from '../../IClass';
import ICollectionListerConfig from '../ICollectionListerConfig';
import ISet from '../../ISet';
import ObservableArrayLister from './ObservableArrayLister';
import Set from '../../Set';

export function createArrayLister<T extends IClass>(source: IArray<T>, config: ICollectionListerConfig<T>): IArrayLister<T> {
	return source.isSilent() ?
		new ArrayLister<T>(source, config) :
		new ObservableArrayLister<T>(source, config);
}

export function arrayToSet<T extends IClass>(source: IArray<T>): ISet<T> {
	if (source.isSilent()) {
		return source.$toSet();
	}
	var result = new Set<T>();
	result.own(new ObservableArrayLister<T>(source, {
		target: result
	}));
	return result;
}
