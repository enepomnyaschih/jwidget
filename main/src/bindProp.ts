/*
MIT License

Copyright (c) 2020 Egor Nepomnyaschih

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

import Bindable from './Bindable';
import Class from './Class';
import Destroyable from './Destroyable';
import DestroyableBindable from './DestroyableBindable';
import {Binding, UPDATE, WATCH} from './index';
import IProperty from './IProperty';
import Property from './Property';

class PropBinding extends Class {
	constructor(el: JQuery, prop: string, property: Bindable<any>);
	constructor(el: JQuery, prop: string, property: IProperty<boolean>, binding: Binding);
	constructor(el: JQuery, prop: string, property: any, binding: Binding = UPDATE) {
		super();
		if (binding & UPDATE) {
			this.own(new PropUpdater(el, prop, property));
		}
		if (prop === "checked" && (binding & WATCH)) {
			this.own(new CheckedListener(el, {target: property}));
		}
	}
}

class PropUpdater extends Class {
	constructor(private el: JQuery, private prop: string, private property: Bindable<any>) {
		super();
		this._update();
		this.own(property.onChange.listen(this._update, this));
	}

	private _update() {
		this.el.prop(this.prop, this.property.get());
		if (this.prop === "checked") {
			this.el.change();
		}
	}
}

class CheckedListener extends Class {
	private _target: IProperty<boolean>;
	private update: () => void;

	constructor(private el: JQuery, config: CheckedListener.Config = {}) {
		super();
		this.update = () => this._update();
		this._target = config.target || this.own(new Property<boolean>());
		this._update();
		this.el.bind("change", this.update);
	}

	get target(): Bindable<boolean> {
		return this._target;
	}

	protected destroyObject() {
		this.el.unbind("change", this.update);
		super.destroy();
	}

	private _update() {
		this._target.set(this.el.prop("checked"));
	}
}

namespace CheckedListener {
	export interface Config {
		readonly target?: IProperty<boolean>;
	}
}

/**
 * Returns a boolean property containing current checkbox state and starts watching for its modification.
 * Only "checked" prop is supported.
 * @param el DOM element.
 * @param prop Element's property name.
 * @returns Bound property. You must destroy it to stop the synchronization.
 */
export default function bindProp(el: JQuery, prop: string): DestroyableBindable<boolean>;

/**
 * Watches boolean property modification and updates the specified property of the DOM element.
 * @param el DOM element.
 * @param prop Element's property name.
 * @param property Property value to assign.
 * @returns Binding object. You must destroy it to stop the synchronization.
 */
export default function bindProp(el: JQuery, prop: string, property: Bindable<any>): Destroyable;

/**
 * Watches boolean property modification and updates the specified property of the DOM element and/or vice versa.
 * @param el DOM element.
 * @param prop Element's property name.
 * @param property Property value to read and/or write.
 * @param binding Binding direction.
 * @returns Binding object. You must destroy it to stop the synchronization.
 */
export default function bindProp(el: JQuery, prop: string, property: IProperty<boolean>, binding: Binding): Destroyable;
export default function bindProp(el: JQuery, prop: string, property?: any, binding?: Binding): Destroyable {
	if (property != null) {
		return new PropBinding(el, prop, property, binding);
	}
	if (prop === "checked") {
		const target = new Property<boolean>();
		return target.owning(new CheckedListener(el, {target: target}));
	}
	throw new Error("Invalid argument");
}
