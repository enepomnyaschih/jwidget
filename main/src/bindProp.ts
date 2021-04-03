/*
MIT License

Copyright (c) 2021 Egor Nepomnyaschih

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
import IProperty from './IProperty';
import Property from './Property';

class PropUpdater extends Class {
	constructor(private el: PropUpdaterElement, private prop: string, private property: Bindable<boolean>) {
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

class CheckedWatcher extends Class {
	private sync: () => void;

	constructor(private el: CheckedWatcherElement, private target: IProperty<boolean>) {
		super();
		this.sync = () => this._sync();
		this._sync();
		this.el.on("change", this.sync);
	}

	protected destroyObject() {
		this.el.off("change", this.sync);
		super.destroyObject();
	}

	private _sync() {
		this.target.set(this.el.prop("checked"));
	}
}

class CheckedBinding extends Class {
	private sync: () => void;
	private syncing = false;

	constructor(private el: PropUpdaterElement & CheckedWatcherElement, private property: IProperty<boolean>) {
		super();
		this.sync = () => this._sync();
		this._update();
		this.own(property.onChange.listen(this._update, this));
		this.el.on("change", this.sync);
	}

	protected destroyObject() {
		this.el.off("change", this.sync);
		super.destroyObject();
	}

	private _update() {
		if (this.syncing) {
			return;
		}
		this.el.prop("checked", this.property.get());
		this.el.change();
	}

	private _sync() {
		this.syncing = true;
		this.property.set(this.el.prop("checked"));
		this.syncing = false;
	}
}

/**
 * Returns a new boolean `Property` bound to checkbox state of a DOM element.
 * Only "checked" JQuery property is supported in this case.
 * @param el DOM element.
 * @param prop JQuery property name.
 * @returns Bound `Property`. You must destroy it to stop the synchronization.
 */
export default function bindProp(el: CheckedWatcherElement, prop: "checked"): DestroyableBindable<boolean>;

/**
 * Binds a JQuery property of a DOM element to a boolean `Property`.
 * @param el DOM element.
 * @param prop JQuery property name.
 * @param property Property.
 * @param binding Binding direction.
 * @returns Binding object. You must destroy it to stop the synchronization.
 */
export default function bindProp(el: PropUpdaterElement, prop: string, property: Bindable<boolean>, binding?: 1): Destroyable;

/**
 * Binds a boolean `Property` to a JQuery property of a DOM element.
 * Only "checked" JQuery property is supported in this case.
 * @param el DOM element.
 * @param prop JQuery property name.
 * @param property Property.
 * @param binding Binding direction.
 * @returns Bound property. You must destroy it to stop the synchronization.
 */
export default function bindProp(el: CheckedWatcherElement, prop: "checked", property: IProperty<boolean>, binding: 2): Destroyable;

/**
 * Sets up a two-way binding between a JQuery property of a DOM element and a boolean `Property`.
 * Initially, the boolean property value prevails.
 * Only "checked" JQuery property is supported in this case.
 * @param el DOM element.
 * @param prop JQuery property name.
 * @param property Property.
 * @param binding Binding direction.
 * @returns Binding object. You must destroy it to stop the synchronization.
 */
export default function bindProp(el: PropUpdaterElement & CheckedWatcherElement, prop: "checked",
								 property: IProperty<boolean>, binding: 3): Destroyable;
export default function bindProp(el: any, prop: string, property?: any, binding?: number): Destroyable {
	if (property == null) {
		const target = new Property<boolean>();
		return target.owning(new CheckedWatcher(el, target));
	}
	if (binding === 2) {
		return new CheckedWatcher(el, property);
	}
	if (binding === 3) {
		return new CheckedBinding(el, property);
	}
	return new PropUpdater(el, prop, property);
}

export interface PropUpdaterElement {

	prop(prop: string, value: boolean): void;

	change(): void;
}

export interface CheckedWatcherElement {

	prop(prop: "checked"): boolean;

	on(event: "change", callback: () => void): void;

	off(event: "change", callback: () => void): void;
}
