/*!
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

import Class from '../Class';
import Destroyable from '../Destroyable';
import Bindable from '../Bindable';

class VisibleUpdater extends Class {
	constructor(private el: JQuery, private property: Bindable<any>) {
		super();
		this._update();
		this.own(property.changeEvent.listen(this._update, this));
	}

	private _update() {
		this.el.css("display", this.property.get() ? "" : "none");
	}
}

/**
 * Watches boolean property modification and updates visibility of the DOM element.
 * To make element invisible, sets "display: none" inline style. To make
 * element visible, removes "display" inline style. Make sure that element is visible according to your CSS rules.
 * Returns [[JW.UI.VisibleUpdater]] instance. Destroy it to stop synchronization.
 *
 *     // Bind element visibility to property value
 *     this.own(el.jwshow(checked));
 *
 * <iframe style="border: 1px solid green; padding: 10px;" width="730" height="215" src="http://enepomnyaschih.github.io/mt/1.4/jwui-property-jwshow.html"></iframe>
 *
 * @param property Element visibility.
 */
export default function show(el: JQuery, property: Bindable<any>): Destroyable {
	return new VisibleUpdater(el, property);
}
