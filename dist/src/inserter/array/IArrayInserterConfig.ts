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

/**
 * [[JW.List.Inserter]] configuration.
 *
 * @param T Collection item type.
 */
interface IArrayInserterConfig<T> {
	/**
	 * Function to call on item adding to specific position in array.
	 */
	addItem?: (item: T, index: number) => void;

	/**
	 * Function to call on item removing from specific position in array.
	 */
	removeItem?: (item: T, index: number) => void;

	/**
	 * Function to call on array cleanup.
	 * By default, calls [[removeItem]] for all array items.
	 */
	clearItems?: (items: T[]) => void;

	/**
	 * [[addItem]], [[removeItem]] and [[clearItems]] call scope.
	 * Defaults to synchronizer itself.
	 */
	scope?: any;
}

export default IArrayInserterConfig;
