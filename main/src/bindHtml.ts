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

import Bindable from './Bindable';
import Class from './Class';
import Destroyable from './Destroyable';

class HtmlUpdater extends Class {
	/**
	 * @param el DOM element.
	 * @param property Source property.
	 */
	constructor(private el: JQuery, private property: Bindable<any>) {
		super();
		this._update();
		this.own(property.changeEvent.listen(this._update, this));
	}

	private _update() {
		this.el.html(this.property.get());
	}
}

/**
 * Watches string property modification and updates inner HTML of the DOM element.
 * @param el DOM element.
 * @param property HTML value.
 * @returns Binding object. You must destroy it to stop the synchronization.
 */
export default function bindHtml(el: JQuery, property: Bindable<any>): Destroyable {
	return new HtmlUpdater(el, property);
}
