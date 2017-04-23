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

import MapLister from './MapLister';
import IClass from '../../IClass';
import ICollectionListerConfig from '../ICollectionListerConfig';
import IMap from '../../IMap';
import IMapLister from './IMapLister';
import ISet from '../../ISet';
import ObservableMapLister from './ObservableMapLister';
import Set from '../../Set';

export function createMapLister<T extends IClass>(source: IMap<T>, config: ICollectionListerConfig<T>): IMapLister<T> {
	return source.isSilent() ?
		new MapLister<T>(source, config) :
		new ObservableMapLister<T>(source, config);
}

export function mapToSet<T extends IClass>(source: IMap<T>): ISet<T> {
	if (source.isSilent()) {
		return source.$toSet();
	}
	var result = new Set<T>();
	result.own(new ObservableMapLister<T>(source, {
		target: result
	}));
	return result;
}
