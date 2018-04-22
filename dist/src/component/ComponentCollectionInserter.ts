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

import Class from '../Class';
import Component from '../Component';
import * as DomUtils from '../DomUtils';
import {createObserver} from '../observer/collection';
import ReadonlyCollection from '../ReadonlyCollection';

/**
 * @hidden
 */
export default class ComponentCollectionInserter extends Class {
	private len: number = 0;

	constructor(source: ReadonlyCollection<Component>, private el: HTMLElement) {
		super();
		this.own(createObserver(source, {
			add: this._addItem,
			remove: this._removeItem,
			scope: this
		}));
	}

	_addItem(item: Component) {
		var parent = this.el;
		var anchor = parent.childNodes[this.len];
		var child = item.el[0];
		if (anchor != null) {
			parent.insertBefore(child, anchor);
		} else {
			parent.appendChild(child);
		}
		++this.len;
		item._afterAppend();
	}

	_removeItem(item: Component) {
		DomUtils.remove(item.el[0]);
		--this.len;
	}
}
