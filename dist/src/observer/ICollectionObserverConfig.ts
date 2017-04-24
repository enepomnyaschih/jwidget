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

/**
 * [[JW.AbstractCollection.Observer]] configuration.
 *
 * @param T Collection item type.
 */
interface ICollectionObserverConfig<T> {
	/**
	 * Item is added to collection.
	 */
	readonly addItem?: (item: T) => void;

	/**
	 * Item is removed from collection.
	 */
	readonly removeItem?: (item: T) => void;

	/**
	 * Collection is cleared. By default, calls [[removeItem]] for all collection items.
	 */
	readonly clearItems?: (items: T[]) => void;

	/**
	 * Collection is changed arbitrarily.
	 */
	readonly change?: () => void;

	/**
	 * [[addItem]], [[removeItem]],
	 * [[clearItems]] and [[change]] call scope.
	 * Defaults to synchronizer itself.
	 */
	readonly scope?: any;
}

export default ICollectionObserverConfig;
