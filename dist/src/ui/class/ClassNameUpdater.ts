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

import Class from '../../Class';
import Property from '../../Property';
import Switcher from '../../Switcher';

/**
 * Result of [[JQuery.jwclass|jwclass]] method call. Destroy it to stop synchronization.
 *
 * Was used as a standalone class before jWidget 1.4.
 * As of jWidget 1.4, [[JQuery.jwclass|jwclass]] is an easier alternative.
 */
class ClassNameUpdater extends Class {
	/**
	 * @param el DOM element.
	 * @param property Source property.
	 */
	constructor(private el: JQuery, property: Property<string>) {
		super();
		this.own(new Switcher([property], {
			init: (value: any) => this.el.addClass(value),
			done: (value: any) => this.el.removeClass(value)
		}));
	}
}

export default ClassNameUpdater;
