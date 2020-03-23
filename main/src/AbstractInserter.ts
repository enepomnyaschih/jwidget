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

import Class from './Class';
import * as DomUtils from './DomUtils';
import ListInserter from './inserter/list';
import ReadonlyList from './ReadonlyList';

export default abstract class AbstractInserter<T> extends Class {
	/**
	 * @param source Child element list.
	 * @param el Parent element to insert children into.
	 */
	constructor(source: ReadonlyList<T>, readonly el: HTMLElement) {
		super();
		this.own(new ListInserter(source, {
			add: this._addItem,
			remove: this._removeItem,
			scope: this
		}));
	}

	protected abstract _getElement(item: T): HTMLElement;

	protected _addItem(item: T, index: number) {
		const parent = this.el;
		const anchor = parent.childNodes[index];
		const child = this._getElement(item);
		if (anchor != null) {
			parent.insertBefore(child, anchor);
		} else {
			parent.appendChild(child);
		}
	}

	protected _removeItem(item: T, _index: number) {
		DomUtils.remove(this._getElement(item));
	}
}
