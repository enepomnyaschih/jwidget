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

/// <reference types="jquery" />

import {Binding, UPDATE, WATCH} from '../../Core';
import CheckedListener from './CheckedListener';
import Class from '../../Class';
import PropUpdater from './PropUpdater';
import Property from '../../Property';

/**
 * Result of [[JQuery.jwprop|jwprop]] method call. Destroy it to stop synchronization.
 */
class PropBinding extends Class {
	/**
	 * @param el DOM element.
	 * @param prop Element's property name.
	 * @param property Property.
	 * @param binding Binding mode. Defaults to [[JW.Binding.UPDATE]].
	 */
	constructor(el: JQuery, prop: string, property: Property<boolean>, binding: Binding = UPDATE) {
		super();
		if (binding & UPDATE) {
			this.own(new PropUpdater(el, prop, property));
		}
		if (prop === "checked" && (binding & WATCH)) {
			this.own(new CheckedListener(el, {target: property}));
		}
	}
}

export default PropBinding;
