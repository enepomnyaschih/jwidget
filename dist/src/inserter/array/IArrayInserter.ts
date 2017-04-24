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

import IClass from '../../IClass';

/**
 * View synchronizer with array. Listens all array events and reduces them to 2 granular functions:
 * item is added into specific position and item is removed from specific position. In optimization purposes,
 * you can define a third function: array is cleared
 * (in case if there is more effective clearing algorithm than iterative items deletion).
 * Unlike [[JW.AbstractCollection.Observer|Observer]], tracks items order.
 *
 * Use [[JW.List.createinserter|createinserter]] method to create the synchronizer.
 * The method selects a synchronizer implementation which fits better (simple or observable).
 *
 *     var inserter = array.createInserter({
 *         addItem: function(item, index) { this.store.insert(item, index); },
 *         removeItem: function(item, index) { this.store.remove(index); },
 *         scope: this
 *     });
 *
 * Synchronizer rules:
 *
 * - Function [[Inserter.Config.addItem|addItem]]
 * is called for all items of source array on synchronizer initialization.
 * - Function [[Inserter.Config.clearItems|clearItems]]
 * is called for array, or function
 * [[Inserter.Config.removeItem|removeItem]] is called for
 * all items of source array on synchronizer destruction.
 * - On source array reordering, items order is synchorinized by callback functions calls.
 *
 * @param T Array item type.
 */
interface IArrayInserter extends IClass {
}

export default IArrayInserter;

namespace IArrayInserter {
	/**
	 * [[JW.List.Inserter]] configuration.
	 *
	 * @param T Collection item type.
	 */
	export interface Config<T> {
		/**
		 * Function to call on item adding to specific position in array.
		 */
		readonly add?: (item: T, index: number) => void;

		/**
		 * Function to call on item removing from specific position in array.
		 */
		readonly remove?: (item: T, index: number) => void;

		/**
		 * Function to call on array cleanup.
		 * By default, calls [[removeItem]] for all array items.
		 */
		readonly clear?: (items: T[]) => void;

		/**
		 * [[addItem]], [[removeItem]] and [[clearItems]] call scope.
		 * Defaults to synchronizer itself.
		 */
		readonly scope?: any;
	}
}
