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
import Watchable from '../Watchable';

class TextUpdater extends Class {
	constructor(private el: JQuery, private property: Watchable<any>) {
		super();
		this._update();
		this.own(property.changeEvent.bind(this._update, this));
	}

	private _update() {
		this.el[0].textContent = this.property.get();
	}
}

/**
 * Watches string modification and updates inner text of the DOM element.
 * Returns [[JW.UI.TextUpdater]] instance. Destroy it to stop synchronization.
 *
 *     // Bind inner text to property value
 *     this.own(el.jwtext(text));
 *
 * <iframe style="border: 1px solid green; padding: 10px;" width="730" height="220" src="http://enepomnyaschih.github.io/mt/1.4/jwui-property-jwtext.html"></iframe>
 *
 * @param property Text value.
 */
export default function text(el: JQuery, property: Watchable<any>): Destroyable {
	return new TextUpdater(el, property);
}
