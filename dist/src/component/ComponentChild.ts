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

/**
 * @hidden
 */
export default class ComponentChild extends Class {
	name: string;
	_el: JQuery;

	constructor(public parent: Component, public child: Component) {
		super();
	}

	attach(name: string) {
		// JW.assertNull(this.name);
		this.name = name;
		this._el = this.parent._elements[name];
		this.parent._initChild(this.child);
		this.parent._elements[name] = this.child.el;
		DomUtils.replace(this._el[0], this.child.el[0], true);
		this.child._afterAppend();
	}

	detach() {
		// JW.assertString(this.name, JW.isNotBlank);
		if (this.parent._elements[this.name] === this.child.el) {
			this.parent._elements[this.name] = this._el;
		}
		DomUtils.replace(this.child.el[0], this._el[0]);
		this.parent._doneChild(this.child);
		this._el = null;
		this.name = null;
	}
}
