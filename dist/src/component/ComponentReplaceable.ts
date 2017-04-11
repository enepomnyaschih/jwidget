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
import Property from '../Property';
import Switcher from '../Switcher';
import * as SetUtils from '../SetUtils';

/**
 * Replaceable child component wrapper in [[JW.UI.Component]].
 *
 * Returned by [[JW.UI.Component.addReplaceable|addReplaceable]] method. If you'll destroy this object, replaceables child component
 * will be removed from parent and element will return to its original state.
 */
export default class ComponentReplaceable extends Class {
	/**
	 * @hidden
	 */
	constructor(public parent: Component, component: Property<Component>, public id: string) {
		super();
		SetUtils.add(parent._replaceables, this);

		this.own(new Switcher([component], {
			init: (child: Component) => {
				this.parent.children.set(child, this.id);
			},
			done: () => {
				this.parent.children.remove(this.id);
			}
		}));
	}

	/**
	 * @inheritdoc
	 */
	destroy() {
		SetUtils.remove(this.parent._replaceables, this);
		super.destroy();
	}
}
