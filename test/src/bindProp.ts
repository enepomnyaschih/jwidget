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

import {assert, expect} from "chai";
import {TWOWAY, WATCH} from "jwidget";
import bindProp, {CheckedWatcherElement, PropUpdaterElement} from "jwidget/bindProp";
import Property from "jwidget/Property";

describe("bindProp(UPDATE)", () => {
	it("should assign prop on initialization", () => {
		// given
		const el = new CheckboxElement();
		const property = new Property(true);

		// when
		bindProp(el, "enabled", property);

		// then
		expect(el.calls).eql([["prop", "enabled", true]]);
	});

	it("should reassign prop on property change", () => {
		// given
		const el = new CheckboxElement();
		const property = new Property(true);
		bindProp(el, "enabled", property);
		el.calls.splice(0);

		// when
		property.set(false);

		// then
		expect(el.calls).eql([["prop", "enabled", false]]);
	});

	it("should call change method on property change for checked prop", () => {
		// given
		const el = new CheckboxElement();
		const property = new Property(true);
		bindProp(el, "checked", property);
		el.calls.splice(0);

		// when
		property.set(false);

		// then
		expect(el.calls).eql([["prop", "checked", false], ["change"]]);
	});

	it("should unbind on destruction", () => {
		// given
		const el = new CheckboxElement();
		const property = new Property(true);
		const binding = bindProp(el, "enabled", property);
		el.calls.splice(0);

		// when
		assert.isTrue(hasBindings(property));
		binding.destroy();

		// then
		assert.isFalse(hasBindings(property));

		// when
		property.set(false);

		// then
		expect(el.calls).eql([]);
	});
});

describe("bindProp(WATCH)", () => {
	it("should assign property on initialization", () => {
		// given
		const updates: boolean[] = [];
		const el = new CheckboxElement();
		const property = spyProperty(null, updates);

		// when
		bindProp(el, "checked", property, WATCH);

		// then
		expect(updates).eql([false]);
	});

	it("should reassign property on prop change", () => {
		// given
		const updates: boolean[] = [];
		const el = new CheckboxElement();
		const property = spyProperty(null, updates);
		bindProp(el, "checked", property, WATCH);
		updates.splice(0);

		// when
		el.toggle();

		// then
		expect(updates).eql([true]);
	});

	it("should unbind on destruction", () => {
		// given
		const updates: boolean[] = [];
		const el = new CheckboxElement();
		const property = spyProperty(null, updates);
		const binding = bindProp(el, "checked", property, WATCH);
		updates.splice(0);

		// when
		assert.isTrue(el.hasListeners());
		binding.destroy();

		// then
		assert.isFalse(el.hasListeners());

		// when
		el.toggle();

		// then
		expect(updates).eql([]);
	});
});

describe("bindProp(TWOWAY)", () => {
	it("should assign prop on initialization", () => {
		// given
		const updates: boolean[] = [];
		const el = new CheckboxElement();
		const property = spyProperty(true, updates);

		// when
		bindProp(el, "checked", property, TWOWAY);

		// then
		expect(el.calls).eql([["prop", "checked", true], ["change"]]);
		expect(updates).eql([]);
	});

	it("should reassign prop on property change", () => {
		// given
		const updates: boolean[] = [];
		const el = new CheckboxElement();
		const property = spyProperty(true, updates);
		bindProp(el, "checked", property, TWOWAY);
		el.calls.splice(0);
		updates.splice(0);

		// when
		property.set(false);

		// then
		expect(el.calls).eql([["prop", "checked", false], ["change"]]);
		expect(updates).eql([false]);
	});

	it("should reassign property on prop change", () => {
		// given
		const updates: boolean[] = [];
		const el = new CheckboxElement();
		const property = spyProperty(true, updates);
		bindProp(el, "checked", property, TWOWAY);
		el.calls.splice(0);
		updates.splice(0);

		// when
		el.toggle();

		// then
		expect(el.calls).eql([]);
		expect(updates).eql([false]);
	});

	it("should unbind on destruction", () => {
		// given
		const updates: boolean[] = [];
		const el = new CheckboxElement();
		const property = spyProperty(true, updates);
		const binding = bindProp(el, "checked", property, TWOWAY);
		el.calls.splice(0);
		updates.splice(0);

		// when
		assert.isTrue(el.hasListeners());
		assert.isTrue(hasBindingsExceptForSpy(property));
		binding.destroy();

		// then
		assert.isFalse(el.hasListeners());
		assert.isFalse(hasBindingsExceptForSpy(property));

		// when
		el.toggle();

		// then
		expect(updates).eql([]);

		// when
		property.set(false);
		expect(el.calls).eql([]);
	});
});

function spyProperty<T>(value: T, updates: T[]): Property<T> {
	const property = new Property<T>(value);
	property.onChange.listen(({value}) => {
		updates.push(value);
	});
	return property;
}

class CheckboxElement implements PropUpdaterElement, CheckedWatcherElement {

	private value = false;
	private listeners: (() => void)[] = [];

	readonly calls: any[][] = [];

	prop(prop: "checked"): boolean;
	prop(prop: string, value: boolean): void;
	prop(prop: string, value?: boolean): any {
		if (value == null) {
			return this.value;
		}
		this.value = value;
		this.calls.push(["prop", prop, value]);
	}

	change(): void {
		this.listeners.concat().forEach(callback => {
			callback();
		});
		this.calls.push(["change"]);
	}

	on(_event: "change", callback: () => void): void {
		this.listeners.push(callback);
	}

	off(_event: "change", callback: () => void): void {
		this.listeners = this.listeners.filter(x => x !== callback);
	}

	toggle() {
		this.value = !this.value;
		this.listeners.concat().forEach(callback => {
			callback();
		});
	}

	hasListeners() {
		return this.listeners.length !== 0;
	}
}

function hasBindings(property: Property<unknown>) {
	return (<any>property.onChange)._listeners.size !== 0;
}

function hasBindingsExceptForSpy(property: Property<unknown>) {
	return (<any>property.onChange)._listeners.size > 1;
}
