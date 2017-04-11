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

import ArrayMerger from './ArrayMerger';
import IArray from '../../IArray';
import IArrayMerger from './IArrayMerger';
import IArrayMergerConfig from './IArrayMergerConfig';
import JWArray from '../../JWArray';
import ObservableArray from '../../ObservableArray';
import ObservableArrayMerger from './ObservableArrayMerger';
import * as ArrayUtils from '../../ArrayUtils';

export function createArrayMerger<T>(source: IArray<IArray<T>>, config: IArrayMergerConfig<T>): IArrayMerger<T> {
	return (source instanceof ObservableArray) ?
		new ObservableArrayMerger<T>(source, config) :
		new ArrayMerger<T>(source, config);
}

export function mergeArrays<T>(source: IArray<IArray<T>>): IArray<T> {
	if (!(source instanceof ObservableArray)) {
		if (!source.some(function(item) { return item instanceof ObservableArray; })) {
			return $mergeNoSync(source);
		}
		let result = new ObservableArray<T>();
		result.own(new ArrayMerger<T>(source, {
			target: result
		}));
		return result;
	}
	let result = new ObservableArray<T>();
	result.own(new ObservableArrayMerger<T>(source, {
		target: result
	}));
	return result;
}

export function mergeNoSync<T>(source: IArray<IArray<T>>): T[] {
	return ArrayUtils.merge(source.map(function(item: any): any[] {
		return item.getItems();
	}));
}

export function $mergeNoSync<T>(source: IArray<IArray<T>>): IArray<T> {
	return new JWArray(mergeNoSync(source), true);
}
