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

import IProperty from '../IProperty';

/**
 * [[Counter]] configuration.
 *
 * @param T Collection item type.
 */
interface ICollectionCounterConfig<T> {
	/**
	 * Filtering criteria.
	 */
	readonly filterItem: (item: T) => boolean;

	/**
	 * [[filterItem]] call scope.
	 * Defaults to synchronizer itself.
	 */
	readonly scope?: any;

	/**
	 * Target property. By default, created automatically.
	 */
	readonly target?: IProperty<number>;
}

export default ICollectionCounterConfig;
