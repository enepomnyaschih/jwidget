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

import MapLister from './MapLister';
import IClass from '../../IClass';
import IMap from '../../IMap';
import ISet from '../../ISet';
import Set from '../../Set';

export function mapToSet<T extends IClass>(source: IMap<T>): ISet<T> {
	if (source.silent) {
		return source.$toSet();
	}
	var result = new Set<T>();
	result.own(new MapLister<T>(source, {
		target: result
	}));
	return result;
}
