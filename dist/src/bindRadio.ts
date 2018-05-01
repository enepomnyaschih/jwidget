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
import DestroyableBindable from './DestroyableBindable';
import {Binding, UPDATE, WATCH} from './index';
import IProperty from './IProperty';
import Property from './Property';

class RadioBinding extends Class {
	constructor(el: JQuery, name: string, property: Bindable<any>);
	constructor(el: JQuery, name: string, property: IProperty<string>, binding: Binding);
	constructor(el: JQuery, name: string, property: any, binding: any = UPDATE) {
		super();
		if (binding & UPDATE) {
			this.own(new RadioUpdater(el, name, property));
		}
		if (binding & WATCH) {
			this.own(new RadioListener(el, name, {target: property}));
		}
	}
}

class RadioUpdater extends Class {
	private _selector: string;

	constructor(private el: JQuery, name: string, private property: Bindable<any>) {
		super();
		this._selector = "input[type=radio][name='" + name + "']";
		this._update();
		this.own(property.changeEvent.listen(this._update, this));
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

class RadioListener extends Class {
	private _target: IProperty<string>;
	private _selector: string;
	private update: () => void;

	constructor(private el: JQuery, name: string, config: RadioListener.Config = {}) {
		super();
		this.update = () => this._update();
		this._target = config.target || this.own(new Property<string>());
		this._selector = "input[type=radio][name='" + name + "']";
		this._update();
		this.el.on("change", this._selector, this.update);
	}

	destroy() {
		this.el.off("change", this._selector, this.update);
		super.destroy();
	}

	get target(): Bindable<string> {
		return this._target;
	}

	private _update() {
		var radio = this.el.find(this._selector + ":checked");
		this._target.set((radio.length !== 0) ? radio.attr("value") : null);
	}
}

namespace RadioListener {
	export interface Config {
		readonly target?: IProperty<string>;
	}
}

/**
 * Returns a string property containing current radio group selection and starts watching for its modification.
 * @param el DOM element.
 * @param name Value of "name" attribute in radio button elements.
 * @returns Bound property. You must destroy it to stop the synchronization.
 */
export default function bindRadio(el: JQuery, name: string): DestroyableBindable<string>;

/**
 * Watches string property modification and updates the radio group selection.
 * @param el DOM element.
 * @param name Value of "name" attribute in radio button elements.
 * @param property Radio button value to select.
 * @returns Binding object. You must destroy it to stop the synchronization.
 */
export default function bindRadio(el: JQuery, name: string, property: Bindable<any>): Destroyable;

/**
 * Watches string property modification and updates the radio group selection.
 * @param el DOM element.
 * @param name Value of "name" attribute in radio button elements.
 * @param property Radio button value to read and/or write.
 * @param binding Binding direction.
 * @returns Binding object. You must destroy it to stop the synchronization.
 */
export default function bindRadio(el: JQuery, name: string, property: IProperty<string>, binding?: Binding): Destroyable;
export default function bindRadio(el: JQuery, name: string, property?: any, binding?: Binding): Destroyable {
	if (property != null) {
		return new RadioBinding(el, name, property, binding);
	}
	const target = new Property<string>();
	return target.owning(new RadioListener(el, name, {target: target}));
}
