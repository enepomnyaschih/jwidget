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

import SetIndexer from './SetIndexer';
import IClass from '../../IClass';
import ISet from '../../ISet';
import ISetIndexer from './ISetIndexer';
import ICollectionIndexerConfig from '../ICollectionIndexerConfig';
import IMap from '../../IMap';
import Map from '../../Map';
import ObservableSetIndexer from './ObservableSetIndexer';

export function createSetIndexer<T extends IClass>(source: ISet<T>, config: ICollectionIndexerConfig<T>): ISetIndexer<T> {
	return source.silent ?
		new SetIndexer<T>(source, config) :
		new ObservableSetIndexer<T>(source, config);
}

export function indexSet<T extends IClass>(source: ISet<T>, getKey: (item: T) => any, scope?: any): IMap<T> {
	if (source.silent) {
		return source.$index(getKey, scope);
	}
	var result = new Map<T>();
	result.own(new ObservableSetIndexer<T>(source, {
		target: result,
		getKey: getKey,
		scope: scope
	}));
	return result;
}
