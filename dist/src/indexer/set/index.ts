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

import SetIndexer from './SetIndexer';
import IClass from '../../IClass';
import ISet from '../../ISet';
import ISetIndexer from './ISetIndexer';
import ICollectionIndexerConfig from '../ICollectionIndexerConfig';
import IMap from '../../IMap';
import ObservableSet from '../../ObservableSet';
import ObservableSetIndexer from './ObservableSetIndexer';
import ObservableMap from '../../ObservableMap';

export function createSetIndexer<T extends IClass>(source: ISet<T>, config: ICollectionIndexerConfig<T>): ISetIndexer<T> {
	return (source instanceof ObservableSet) ?
		new ObservableSetIndexer<T>(source, config) :
		new SetIndexer<T>(source, config);
}

export function indexSet<T extends IClass>(source: ISet<T>, callback: (item: T) => any, scope?: any): IMap<T> {
	if (!(source instanceof ObservableSet)) {
		return source.$index(callback, scope);
	}
	var result = new ObservableMap<T>();
	result.own(new ObservableSetIndexer<T>(source, {
		target: result,
		getKey: callback,
		scope: scope
	}));
	return result;
}
