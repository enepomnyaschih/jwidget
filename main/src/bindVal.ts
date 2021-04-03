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
import {InputElement, isTextInput} from './DomUtils';
import IProperty from './IProperty';
import Property from './Property';

class ValueUpdater<T extends string | number | string[]> extends Class {
	constructor(private el: ValueUpdaterElement<T>, private property: Bindable<T>) {
		super();
		this._update();
		this.own(property.onChange.listen(this._update, this));
	}

	private _update() {
		const value = this.property.get();
		if (this.el.val() !== value) {
			this.el.val(value);
			this.el.change();
		}
	}
}

class ValueWatcher<T extends string | number | string[]> extends Class {
	private timer: any;
	private sync: () => void;

	constructor(private el: ValueWatcherElement, private target: IProperty<T>, simple: boolean = false) {
		super();
		this.sync = () => this._sync();
		this._sync();
		this.el.on("change", this.sync);
		if (!simple && isTextInput(el)) {
			this.timer = setInterval(this.sync, 100);
		}
	}

	protected destroyObject() {
		clearInterval(this.timer);
		this.el.off("change", this.sync);
		super.destroyObject();
	}

	_sync() {
		this.target.set(<T>this.el.val());
	}
}

class ValueBinding<T extends string | number | string[]> extends Class {
	private timer: any;
	private sync: () => void;
	private syncing = false;

	constructor(private el: ValueUpdaterElement<T> & ValueWatcherElement, private property: IProperty<T>, simple: boolean = false) {
		super();
		this.sync = () => this._sync();
		this._update();
		this.own(property.onChange.listen(this._update, this));
		this.el.on("change", this.sync);
		if (!simple && isTextInput(el)) {
			this.timer = setInterval(this.sync, 100);
		}
	}

	protected destroyObject() {
		clearInterval(this.timer);
		this.el.off("change", this.sync);
		super.destroyObject();
	}

	private _update() {
		if (this.syncing) {
			return;
		}
		const value = this.property.get();
		if (this.el.val() !== value) {
			this.el.val(value);
			this.el.change();
		}
	}

	private _sync() {
		this.syncing = true;
		this.property.set(<T>this.el.val());
		this.syncing = false;
	}
}

/**
 * Returns a new `Property` bound to value of a DOM element.
 * @param el DOM element.
 * @param simple Disable live watch by timer.
 * @returns Bound property. You must destroy it to stop the synchronization.
 */
export default function bindVal<T extends string | number | string[]>(
	el: ValueWatcherElement, simple?: boolean): DestroyableBindable<T>;

/**
 * Binds value of a DOM element to a `Property`.
 * @param el DOM element.
 * @param property Property.
 * @param binding Binding direction.
 * @returns Binding object. You must destroy it to stop the synchronization.
 */
export default function bindVal<T extends string | number | string[]>(
	el: ValueUpdaterElement<T>, property: Bindable<T>, binding?: 1): Destroyable;

/**
 * Binds a `Property` to value of a DOM element.
 * @param el DOM element.
 * @param property Property.
 * @param binding Binding direction.
 * @param simple Disable live watch by timer.
 * @returns Binding object. You must destroy it to stop the synchronization.
 */
export default function bindVal<T extends string | number | string[]>(
	el: ValueWatcherElement, property: IProperty<T>, binding: 2, simple?: boolean): Destroyable;

/**
 * Sets up a two-way binding between value of a DOM element and a `Property`.
 * Initially, the property value prevails.
 * @param el DOM element.
 * @param property Property.
 * @param binding Binding direction.
 * @param simple Disable live watch by timer.
 */
export default function bindVal<T extends string | number | string[]>(
	el: ValueUpdaterElement<T> & ValueWatcherElement, property: IProperty<T>, binding: 3, simple?: boolean): Destroyable;
export default function bindVal<T extends string | number | string[]>(el: any, property: any, binding?: number, simple?: boolean): Destroyable {
	if (property == null || typeof property === "boolean") {
		// In this semantic, "property" apparently plays role of "simple".
		const target = new Property<T>();
		return target.owning(new ValueWatcher<T>(el, target, property));
	}
	if (binding === 2) {
		return new ValueWatcher<T>(el, property, simple);
	}
	if (binding === 3) {
		return new ValueBinding<T>(el, property, simple);
	}
	return new ValueUpdater<T>(el, property);
}

export interface ValueUpdaterElement<T extends string | number | string[]> {

	val(): string | number | string[];

	val(value: T): void;

	change(): void;
}

export interface ValueWatcherElement extends InputElement {

	val(): string | number | string[];

	on(event: "change", callback: () => void): void;

	off(event: "change", callback: () => void): void;
}
