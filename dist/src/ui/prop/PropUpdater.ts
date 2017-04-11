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

/**
 * @deprecated 1.4 Use [[JQuery.jwprop|jwprop]] instead.
 */
class PropUpdater extends Class {
	/**
	 * @param el DOM element.
	 * @param prop Element's property name.
	 * @param property Source property.
	 */
	constructor(private el: JQuery, private prop: string, private property: Property<boolean>) {
		super();
		this._update();
		this.own(property.changeEvent.bind(this._update, this));
	}

	private _update() {
		this.el.prop(this.prop, this.property.get());
		if (this.prop === "checked") {
			this.el.change();
		}
	}
}

export default PropUpdater;
