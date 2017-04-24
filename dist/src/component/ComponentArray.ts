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

import {createArrayMapper} from '../mapper/array';
import Class from '../Class';
import Component from '../Component';
import ComponentInserter from './ComponentInserter';
import IArray from '../IArray';
import * as DomUtils from '../DomUtils';
import * as SetUtils from '../SetUtils';

/**
 * @hidden
 */
export default class ComponentArray extends Class {
	constructor(private parent: Component, private source: IArray<Component>, el: JQuery) {
		super();
		SetUtils.add(parent._arrays, this);

		var mapper = this.own(createArrayMapper<Component, Component>(source, {
			createItem: (child) => {
				this.parent._initChild(child);
				return child;
			},
			destroyItem: (child) => {
				this.parent._doneChild(child);
			}
		}));

		this.own(new ComponentInserter(mapper.target, el[0]));
	}

	destroy() {
		SetUtils.remove(this.parent._arrays, this);
		super.destroy();
	}

	_afterAppend() {
		this.source.each(DomUtils._afterAppend);
	}
}
