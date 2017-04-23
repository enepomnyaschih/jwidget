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

import SetLister from './SetLister';
import IClass from '../../IClass';
import ICollectionListerConfig from '../ICollectionListerConfig';
import ISet from '../../ISet';
import ISetLister from './ISetLister';
import ObservableSet from '../../ObservableSet';
import ObservableSetLister from './ObservableSetLister';

export function createSetLister<T extends IClass>(source: ISet<T>, config: ICollectionListerConfig<T>): ISetLister<T> {
	return (source instanceof ObservableSet) ?
		new ObservableSetLister<T>(source, config) :
		new SetLister<T>(source, config);
}

export function setToSet<T extends IClass>(source: ISet<T>): ISet<T> {
	if (!(source instanceof ObservableSet)) {
		return source.$toSet();
	}
	var result = new ObservableSet<T>();
	result.own(new ObservableSetLister<T>(source, {
		target: result
	}));
	return result;
}