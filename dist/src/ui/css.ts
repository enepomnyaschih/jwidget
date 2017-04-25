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

class CssUpdater extends Class {
	constructor(private el: JQuery, private style: string, private property: Bindable<any>) {
		super();
		this._update();
		this.own(property.changeEvent.listen(this._update, this));
	}

	private _update() {
		this.el.css(this.style, this.property.get());
	}
}

/**
 * Watches string modification and updates the specified CSS style of the DOM element.
 * Returns [[JW.UI.CssUpdater]] instance. Destroy it to stop synchronization.
 *
 *     // Bind background color style to color property value
 *     this.own(el.jwcss("background-color", color));
 *
 * <iframe style="border: 1px solid green; padding: 10px;" width="730" height="180" src="http://enepomnyaschih.github.io/mt/1.4/jwui-property-jwcss.html"></iframe>
 *
 * @param style CSS style name.
 * @param property Style value.
 */
export default function css(el: JQuery, style: string, property: Bindable<any>): Destroyable {
	return new CssUpdater(el, style, property);
}
