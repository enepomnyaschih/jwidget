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
 * @deprecated 1.4 Use [[JQuery.jwval|jwval]] instead.
 */
class ValueUpdater extends Class {
	constructor(private el: JQuery, private property: Watchable<any>) {
		super();
		this._update();
		this.own(property.changeEvent.bind(this._update, this));
	}

	private _update() {
		this.el.val(this.property.get());
	}
}

export default ValueUpdater;