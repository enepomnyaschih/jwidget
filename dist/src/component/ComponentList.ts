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
import ListMapper from '../mapper/list';
import ReadOnlyList from '../ReadOnlyList';
import ComponentInserter from './ComponentInserter';

/**
 * @hidden
 */
export default class ComponentList extends Class {
	constructor(private parent: Component, private source: ReadOnlyList<Component>, el: JQuery) {
		super();
		parent._arrays[this.iid] = this;

		const mapper = this.own(new ListMapper<Component, Component>(source, (child) => {
			this.parent._initChild(child);
			return child;
		}, {
			destroy: (child) => {
				this.parent._doneChild(child);
			}
		}));

		this.own(new ComponentInserter(mapper.target, el[0]));
	}

	destroy() {
		delete this.parent._arrays[this.iid];
		super.destroy();
	}

	_afterAppend() {
		this.source.forEach(DomUtils._afterAppend);
	}
}
