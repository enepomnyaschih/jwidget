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

import {createMapper} from '../mapper/collection';
import Class from '../Class';
import Component from '../Component';
import ComponentCollectionInserter from './ComponentCollectionInserter';
import ICollection from '../ICollection';
import * as DomUtils from '../DomUtils';
import * as SetUtils from '../SetUtils';

/**
 * Child component collection wrapper in [[JW.UI.Component]].
 *
 * Returned by [[JW.UI.Component.addCollection|addCollection]] method. If you'll destroy this object, child components will be removed
 * from parent.
 */
export default class ComponentCollection extends Class {
	/**
	 * @hidden
	 */
	constructor(public parent: Component, public source: ICollection<Component>, el: JQuery) {
		super();
		SetUtils.add(parent._collections, this);

		var mapper = this.own(createMapper<Component, Component>(source, {
			createItem: (child) => {
				this.parent._initChild(child);
				return child;
			},
			destroyItem: (child) => {
				this.parent._doneChild(child);
			}
		}));

		this.own(new ComponentCollectionInserter(mapper.target, el[0]));
	}

	/**
	 * @inheritdoc
	 */
	destroy() {
		SetUtils.remove(this.parent._collections, this);
		super.destroy();
	}

	/**
	 * @inheritdoc
	 */
	_afterAppend() {
		this.source.each(DomUtils._afterAppend);
	}
}
