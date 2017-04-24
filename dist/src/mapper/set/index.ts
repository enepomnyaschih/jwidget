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

import {destroy} from '../../Core';
import IClass from '../../IClass';
import ISet from '../../ISet';
import ISetMapper from './ISetMapper';
import ObservableSetMapper from './ObservableSetMapper';
import Set from '../../Set';
import SetMapper from './SetMapper';

export function createSetMapper<T extends IClass, U extends IClass>(source: ISet<T>, config: ISetMapper.Config<T, U>): ISetMapper<T, U> {
	return source.silent ?
		new SetMapper<T, U>(source, config) :
		new ObservableSetMapper<T, U>(source, config);
}

export function mapSet<T extends IClass, U extends IClass>(source: ISet<T>, map: (item: T) => U, scope?: any): ISet<U> {
	if (source.silent) {
		return source.$map(map, scope);
	}
	var result = new Set<U>();
	result.own(new ObservableSetMapper<T, U>(source, {
		target: result,
		create: map,
		scope: scope
	}));
	return result;
}

export function mapDestroyableSet<T extends IClass, U extends IClass>(source: ISet<T>, create: (item: T) => U, scope?: any): ISet<U> {
	if (source.silent) {
		return source.$map(create, scope).ownItems();
	}
	var result = new Set<U>();
	result.own(new ObservableSetMapper<T, U>(source, {
		target: result,
		create: create,
		destroy: destroy,
		scope: scope
	}));
	return result;
}
