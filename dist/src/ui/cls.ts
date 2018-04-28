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

import Bindable from '../Bindable';
import Class from '../Class';
import Destroyable from '../Destroyable';
import Switcher from '../Switcher';

class ClassNameUpdater extends Class {
	constructor(private el: JQuery, property: Bindable<string>) {
		super();
		this.own(new Switcher(property, {
			init: value => this.el.addClass(value),
			done: value => this.el.removeClass(value)
		}));
	}
}

class ClassUpdater extends Class {
	constructor(private el: JQuery, private cls: string, private property: Bindable<any>) {
		super();
		this._update();
		this.own(property.changeEvent.listen(this._update, this));
	}

	private _update() {
		this.el.toggleClass(this.cls, !!this.property.get());
	}
}

/**
 * Watches boolean property modification and updates the specified CSS class presence in the DOM element.
 * @param el DOM element.
 * @param cls CSS class name.
 * @param property Boolean property to bind CSS class to.
 * @returns Binding object. You must destroy it to stop the synchronization.
 */
export default function cls(el: JQuery, cls: string, property: Bindable<any>): Destroyable;

/**
 * Watches string property modification and updates CSS class name in the DOM element.
 * @param el DOM element.
 * @param cls CSS class name.
 * @returns Binding object. You must destroy it to stop the synchronization.
 */
export default function cls(el: JQuery, cls: Bindable<string>): Destroyable;
export default function cls(el: JQuery, a: any, b?: any): Destroyable {
	return (b != null) ? new ClassUpdater(el, a, b) : new ClassNameUpdater(el, a);
}
