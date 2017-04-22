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
import Watchable from '../../Watchable';

/**
 * Use [[JQuery.jwradio|jwradio]] instead.
 */
class RadioUpdater extends Class {
	private _selector: string;

	constructor(private el: JQuery, name: string, private property: Watchable<any>) {
		super();
		this._selector = "input[type=radio][name='" + name + "']";
		this._update();
		this.own(property.changeEvent.bind(this._update, this));
	}

	private _update() {
		var value = this.property.get();
		if (value != null) {
			var els = this.el.find(this._selector + "[value='" + value + "']");
			if (els.length !== 0) {
				els.prop("checked", true).change();
				return;
			}
		}
		this.el.find(this._selector + ":checked").prop("checked", false).change();
	}
}

export default RadioUpdater;
