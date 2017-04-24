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

import IMap from '../IMap';

/**
 * [[JW.AbstractCollection.Indexer]] configuration.
 *
 * @param T Collection item type.
 */
interface ICollectionIndexerConfig<T> {
	/**
	 * Indexing function. Determines item key in map.
	 */
	readonly getKey: (item: T) => any;

	/**
	 * [[getKey]] call scope.
	 * Defaults to synchronizer itself.
	 */
	readonly scope?: any;

	/**
	 * Target map. By default, created automatically.
	 */
	readonly target?: IMap<T>;
}

export default ICollectionIndexerConfig;
