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
		this.own(property.onChange.listen(this._update, this));
	}

	private _update() {
		const value = this.property.get();
		if (this.el.val() !== value) {
			this.el.val(value).trigger("change");
		}
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
