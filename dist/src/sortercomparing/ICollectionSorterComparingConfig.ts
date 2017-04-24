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

import IArray from '../IArray';

/**
 * [[JW.AbstractCollection.SorterComparing]] configuration.
 *
 * @param T Collection item type.
 */
interface ICollectionSorterComparingConfig<T> {
	/**
	 * Item comparing callback.
	 */
	readonly compare: (x: T, y: T) => number;

	/**
	 * [[compare]] call scope.
	 * Defaults to synchronizer itself.
	 */
	readonly scope?: any;

	/**
	 * Target array. By default, created automatically.
	 */
	readonly target?: IArray<T>;

	/**
	 * Sorting order. Positive number for ascending sorting, negative for descending sorting.
	 * Defaults to 1.
	 */
	readonly order?: number;
}

export default ICollectionSorterComparingConfig;
