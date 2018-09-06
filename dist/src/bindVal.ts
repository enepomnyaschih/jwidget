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
import {isTextInput} from './DomUtils';
import {Binding, UPDATE, WATCH} from './index';
import IProperty from './IProperty';
import Property from './Property';

class ValueBinding extends Class {
	constructor(el: JQuery, property: Bindable<any>);
	constructor(el: JQuery, property: IProperty<string>, binding: Binding, simple?: boolean);
	constructor(el: JQuery, property: any, binding: any = UPDATE, simple?: boolean) {
		super();
		if (typeof binding === "boolean") {
			simple = binding;
			binding = UPDATE;
		}
		if (binding & UPDATE) {
			this.own(new ValueUpdater(el, property));
		}
		if (binding & WATCH) {
			this.own(new ValueListener(el, {target: property, simple: simple}));
		}
	}
}

class ValueUpdater extends Class {
	constructor(private el: JQuery, private property: Bindable<any>) {
		super();
		this._update();
		this.own(property.changeEvent.listen(this._update, this));
	}

	private _update() {
		this.el.val(this.property.get());
	}
}

class ValueListener extends Class {
	private _target: IProperty<string>;
	private _simple: boolean;
	private _timer: number;
	private update: () => void;

	constructor(private el: JQuery, config: ValueListener.Config = {}) {
		super();
		this.update = () => this._update();
		this._target = config.target || this.own(new Property<string>());
		this._simple = config.simple || !isTextInput(el);
		this.update();
		this.el.bind("change", this.update);
		if (!this._simple) {
			this._timer = window.setInterval(this.update, 100);
		}
	}

	get target(): Bindable<string> {
		return this._target;
	}

	destroy() {
		if (!this._simple) {
			clearInterval(this._timer);
		}
		this.el.unbind("change", this.update);
		super.destroy();
	}

	_update() {
		this._target.set(<any>this.el.val());
	}
}

namespace ValueListener {
	export interface Config {
		readonly target?: IProperty<string>;
		readonly simple?: boolean;
	}
}

/**
 * Returns a string property containing current DOM element value and starts watching for its modification.
 * @param el DOM element.
 * @param simple Disable live watch by timer.
 * @returns Bound property. You must destroy it to stop the synchronization.
 */
export default function bindVal(el: JQuery, simple?: boolean): DestroyableBindable<string>;

/**
 * Watches string property modification and updates the DOM element value.
 * @param el DOM element.
 * @param value Element value to assign.
 * @returns Binding object. You must destroy it to stop the synchronization.
 */
export default function bindVal(el: JQuery, value: Bindable<any>): Destroyable;

/**
 * Watches string property modification and updates the DOM element value and/or vice versa.
 * @param el DOM element.
 * @param value Element value to read and/or write.
 * @param binding Binding direction.
 * @param simple Disable live watch by timer.
 * @returns Binding object. You must destroy it to stop the synchronization.
 */
export default function bindVal(el: JQuery, value: IProperty<string>, binding: Binding, simple?: boolean): Destroyable;
export default function bindVal(el: JQuery, value: any, binding?: any, simple?: any): Destroyable {
	if (value != null && (typeof value !== "boolean")) {
		return new ValueBinding(el, value, binding, simple);
	}
	const target = new Property<string>();
	return target.owning(new ValueListener(el, {target: target, simple: simple}));
}
