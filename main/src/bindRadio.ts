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
import IProperty from './IProperty';
import Property from './Property';

class RadioUpdater extends Class {
	private selector: string;

	constructor(private el: RadioUpdaterField, name: string, private property: Bindable<string>) {
		super();
		this.selector = `input[type=radio][name='${name}']`;
		this._update();
		this.own(property.onChange.listen(this._update, this));
	}

	private _update() {
		updateField(this.el, this.selector, this.property.get());
	}
}

class RadioWatcher extends Class {
	private selector: string;
	private sync: () => void;

	constructor(private el: RadioWatcherField, name: string, private target: IProperty<string>) {
		super();
		this.selector = `input[type=radio][name='${name}']`;
		this.sync = () => this._sync();
		this._sync();
		this.el.on("change", this.selector, this.sync);
	}

	destroyObject() {
		this.el.off("change", this.selector, this.sync);
		super.destroyObject();
	}

	private _sync() {
		const radio = this.el.find(this.selector + ":checked");
		this.target.set(radio.length !== 0 ? radio.attr("value") : null);
	}
}

class RadioBinding extends Class {
	private selector: string;
	private sync: () => void;
	private syncing = false;

	constructor(private el: RadioField, name: string, private property: IProperty<string>) {
		super();
		this.selector = `input[type=radio][name='${name}']`;
		this.sync = () => this._sync();
		this._update();
		this.own(property.onChange.listen(this._update, this));
		this.el.on("change", this.selector, this.sync);
	}

	destroyObject() {
		this.el.off("change", this.selector, this.sync);
		super.destroyObject();
	}

	private _update() {
		if (!this.syncing) {
			updateField(this.el, this.selector, this.property.get());
		}
	}

	private _sync() {
		const radio = this.el.find(this.selector + ":checked");
		this.syncing = true;
		this.property.set(radio.length !== 0 ? radio.attr("value") : null);
		this.syncing = false;
	}
}

function updateField(el: RadioUpdaterField, selector: string, value: string) {
	if (value != null) {
		const els = el.find(`${selector}[value='${value}']`);
		if (els.length !== 0) {
			if (!els.is(":checked")) {
				els.prop("checked", true);
				els.change();
			}
			return;
		}
	}
	const els = el.find(selector + ":checked");
	if (els.length !== 0) {
		els.prop("checked", false);
		els.change();
	}
}

/**
 * Returns a string property containing current radio group selection and starts watching for its modification.
 * @param el DOM element.
 * @param name Value of "name" attribute in radio button elements.
 * @returns Bound property. You must destroy it to stop the synchronization.
 */
export default function bindRadio(el: RadioWatcherField, name: string): DestroyableBindable<string>;

/**
 * Watches string property modification and updates the radio group selection.
 * @param el DOM element.
 * @param name Value of "name" attribute in radio button elements.
 * @param property Radio button value to select.
 * @returns Binding object. You must destroy it to stop the synchronization.
 */
export default function bindRadio(el: RadioUpdaterField, name: string, property: Bindable<string>, binding?: 1): Destroyable;

/**
 * Watches string property modification and updates the radio group selection.
 * @param el DOM element.
 * @param name Value of "name" attribute in radio button elements.
 * @param property Radio button value to read and/or write.
 * @param binding Binding direction.
 * @returns Binding object. You must destroy it to stop the synchronization.
 */
export default function bindRadio(el: RadioWatcherField, name: string, property: IProperty<string>, binding?: 2): Destroyable;
export default function bindRadio(el: RadioField, name: string, property: IProperty<string>, binding?: 3): Destroyable;
export default function bindRadio(el: any, name: string, property?: any, binding?: number): Destroyable {
	if (property == null) {
		const target = new Property<string>();
		return target.owning(new RadioWatcher(el, name, target));
	}
	if (binding === 2) {
		return new RadioWatcher(el, name, property);
	}
	if (binding === 3) {
		return new RadioBinding(el, name, property);
	}
	return new RadioUpdater(el, name, property);
}

export interface RadioUpdaterField {

	find(selector: string): RadioUpdaterButton;
}

export interface RadioUpdaterButton {

	readonly length: number;

	is(selector: ":checked"): boolean;

	prop(prop: "checked", value: boolean): void;

	change(): void;
}

export interface RadioWatcherField {

	find(selector: string): RadioWatcherButton;

	on(event: "change", selector: string, callback: () => void): void;

	off(event: "change", selector: string, callback: () => void): void;
}

export interface RadioWatcherButton {

	readonly length: number;

	attr(attr: "value"): string;
}

export interface RadioField extends RadioUpdaterField, RadioWatcherField {

	find(selector: string): RadioUpdaterButton & RadioWatcherButton;
}
