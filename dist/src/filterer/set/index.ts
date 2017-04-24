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

import SetFilterer from './SetFilterer';
import IClass from '../../IClass';
import ISet from '../../ISet';
import ISetFilterer from './ISetFilterer';
import ISetFiltererConfig from './ISetFiltererConfig';
import ObservableSetFilterer from './ObservableSetFilterer';
import Set from '../../Set';

export function createSetFilterer<T extends IClass>(source: ISet<T>, config: ISetFiltererConfig<T>): ISetFilterer<T> {
	return source.silent ?
		new SetFilterer<T>(source, config) :
		new ObservableSetFilterer<T>(source, config);
}

export function filterSet<T extends IClass>(source: ISet<T>, callback: (item: T) => boolean, scope?: any): ISet<T> {
	if (source.silent) {
		return source.$filter(callback, scope);
	}
	var result = new Set<T>();
	result.own(new ObservableSetFilterer<T>(source, {
		target: result,
		filterItem: callback,
		scope: scope
	}));
	return result;
}
