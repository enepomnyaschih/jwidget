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

import AbstractInserter from './ui/AbstractInserter';

/**
 * View synchronizer. Synchronizes DOM element children with the source array. Usually used in conjunction with
 * [[JW.List.Mapper]].
 *
 *     var data = new JW.ObservableArray(["apple", "banana", "cherry"]);
 *     var elements = data.$$mapValues(function(value) {
 *         return jQuery('<option />').text(value)[0];
 *     });
 *     var inserter = new JW.UI.Inserter(elements, document.getElementById("myselect"));
 */
export default class Inserter extends AbstractInserter<HTMLElement> {
	/**
	 * @hidden
	 */
	_getElement(item: HTMLElement): HTMLElement {
		return item;
	}
}
