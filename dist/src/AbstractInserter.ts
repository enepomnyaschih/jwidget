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

import ListInserter from './inserter/list';
import Class from './Class';
import ReadOnlyList from './ReadOnlyList';
import * as DomUtils from './DomUtils';

/**
 * Abstract view synchronizer. See [[Inserter]] for details.
 */
export default class AbstractInserter<T> extends Class {
	/**
	 * @param source Source array.
	 * @param el Parent element.
	 */
	constructor(source: ReadOnlyList<T>, readonly el: HTMLElement) {
		super();
		this.own(new ListInserter(source, {
			add: this._addItem,
			remove: this._removeItem,
			scope: this
		}));
	}

	protected _getElement(item: T): HTMLElement {
		item = item;
		throw new SyntaxError("Method not implemented");
	}

	protected _addItem(item: T, index: number) {
		var parent = this.el;
		var anchor = parent.childNodes[index];
		var child = this._getElement(item);
		if (anchor != null) {
			parent.insertBefore(child, anchor);
		} else {
			parent.appendChild(child);
		}
	}

	protected _removeItem(item: T, index: number) {
		index = index;
		DomUtils.remove(this._getElement(item));
	}
}
