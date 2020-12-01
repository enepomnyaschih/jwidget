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
import {destroy, TWOWAY, WATCH} from "jwidget";
import Bindable from "jwidget/Bindable";
import bindVal, {ValueUpdaterElement, ValueWatcherElement} from "jwidget/bindVal";
import Destroyable from "jwidget/Destroyable";
import Property from "jwidget/Property";

describe("bindVal(UPDATE)", () => {
	it("should assign value on initialization", () => {
		// given
		const el = new DummyInputElement();
		const property = new Property("Hello");

		// when
		bindVal(el, property);

		// then
		expect(el.calls).eql([["val", "Hello"], ["change"]]);
	});

	it("should reassign value on property change", () => {
		// given
		const el = new DummyInputElement();
		const property = new Property("Hello");
		bindVal(el, property);
		el.calls.splice(0);

		// when
		property.set("Bye");

		// then
		expect(el.calls).eql([["val", "Bye"], ["change"]]);
	});

	it("should unbind on destruction", () => {
		// given
		const el = new DummyInputElement();
		const property = new Property("Hello");
		const binding = bindVal(el, property);
		el.calls.splice(0);

		// when
		assert.isTrue(hasBindings(property));
		binding.destroy();

		// then
		assert.isFalse(hasBindings(property));

		// when
		property.set("Bye");

		// then
		expect(el.calls).eql([]);
	});
});

describe("bindVal(WATCH, advanced)", () => {
	it("should assign property on initialization", () => {
		let binding: Destroyable;
		try {
			// given
			const updates: string[] = [];
			const el = new DummyInputElement();
			const property = spyProperty(new Property<string>(), updates);

			// when
			binding = bindVal(el, property, WATCH);

			// then
			expect(updates).eql([""]);
		} finally {
			destroy(binding);
		}
	});

	it("should reassign property on value change", () => {
		let binding: Destroyable;
		try {
			// given
			const updates: string[] = [];
			const el = new DummyInputElement();
			const property = spyProperty(new Property<string>(), updates);
			binding = bindVal(el, property, WATCH);
			updates.splice(0);

			// when
			el.enter("Hello", true);

			// then
			expect(updates).eql(["Hello"]);
		} finally {
			destroy(binding);
		}
	});

	it("should unbind on destruction", () => {
		let binding: Destroyable;
		try {
			// given
			const updates: string[] = [];
			const el = new DummyInputElement();
			const property = spyProperty(new Property<string>(), updates);
			binding = bindVal(el, property, WATCH);
			updates.splice(0);

			// when
			assert.isTrue(el.hasListeners());
			binding.destroy();
			binding = null;

			// then
			assert.isFalse(el.hasListeners());

			// when
			el.enter("Hello", true);

			// then
			expect(updates).eql([]);
		} finally {
			destroy(binding);
		}
	});
});

describe("bindVal(WATCH, simple)", () => {
	it("should assign property on initialization", () => {
		// given
		const updates: string[] = [];
		const el = new DummyInputElement();
		const property = spyProperty(new Property<string>(), updates);

		// when
		bindVal(el, property, WATCH, true);

		// then
		expect(updates).eql([""]);
	});

	it("should reassign property on value change", () => {
		// given
		const updates: string[] = [];
		const el = new DummyInputElement();
		const property = spyProperty(new Property<string>(), updates);
		bindVal(el, property, WATCH, true);
		updates.splice(0);

		// when
		el.enter("Hello", true);

		// then
		expect(updates).eql(["Hello"]);
	});

	it("should unbind on destruction", () => {
		// given
		const updates: string[] = [];
		const el = new DummyInputElement();
		const property = spyProperty(new Property<string>(), updates);
		const binding = bindVal(el, property, WATCH, true);
		updates.splice(0);

		// when
		assert.isTrue(el.hasListeners());
		binding.destroy();

		// then
		assert.isFalse(el.hasListeners());

		// when
		el.enter("Hello", true);

		// then
		expect(updates).eql([]);
	});
});

describe("bindVal(WATCH, auto-target)", () => {
	it("should assign property on initialization", () => {
		// given
		const el = new DummyInputElement();

		// when
		const property = bindVal<string>(el, true);

		// then
		expect(property.get()).eql("");
	});

	it("should reassign property on value change", () => {
		// given
		const updates: string[] = [];
		const el = new DummyInputElement();
		spyProperty(bindVal<string>(el, true), updates);

		// when
		el.enter("Hello", true);

		// then
		expect(updates).eql(["Hello"]);
	});

	it("should unbind on destruction", () => {
		// given
		const updates: string[] = [];
		const el = new DummyInputElement();
		const property = spyProperty(bindVal<string>(el, true), updates);

		// when
		assert.isTrue(el.hasListeners());
		property.destroy();

		// then
		assert.isFalse(el.hasListeners());

		// when
		el.enter("Hello", true);

		// then
		expect(updates).eql([]);
	});
});

describe("bindVal(TWOWAY, advanced)", () => {
	it("should assign value on initialization", () => {
		let binding: Destroyable;
		try {
			// given
			const updates: string[] = [];
			const el = new DummyInputElement();
			const property = spyProperty(new Property("Hello"), updates);

			// when
			binding = bindVal(el, property, TWOWAY);

			// then
			expect(el.calls).eql([["val", "Hello"], ["change"]]);
			expect(updates).eql([]);
		} finally {
			destroy(binding);
		}
	});

	it("should reassign value on property change", () => {
		let binding: Destroyable;
		try {
			// given
			const updates: string[] = [];
			const el = new DummyInputElement();
			const property = spyProperty(new Property("Hello"), updates);
			binding = bindVal(el, property, TWOWAY);
			el.calls.splice(0);
			updates.splice(0);

			// when
			property.set("Bye");

			// then
			expect(el.calls).eql([["val", "Bye"], ["change"]]);
			expect(updates).eql(["Bye"]);
		} finally {
			destroy(binding);
		}
	});

	it("should reassign property on value change", () => {
		let binding: Destroyable;
		try {
			// given
			const updates: string[] = [];
			const el = new DummyInputElement();
			const property = spyProperty(new Property("Hello"), updates);
			binding = bindVal(el, property, TWOWAY);
			el.calls.splice(0);
			updates.splice(0);

			// when
			el.enter("Bye", true);

			// then
			expect(el.calls).eql([]);
			expect(updates).eql(["Bye"]);
		} finally {
			destroy(binding);
		}
	});

	it("should unbind on destruction", () => {
		let binding: Destroyable;
		try {
			// given
			const updates: string[] = [];
			const el = new DummyInputElement();
			const property = spyProperty(new Property("Hello"), updates);
			binding = bindVal(el, property, TWOWAY);
			el.calls.splice(0);
			updates.splice(0);

			// when
			assert.isTrue(el.hasListeners());
			assert.isTrue(hasBindingsExceptForSpy(property));
			binding.destroy();
			binding = null;

			// then
			assert.isFalse(el.hasListeners());
			assert.isFalse(hasBindingsExceptForSpy(property));

			// when
			el.enter("Bye", true);

			// then
			expect(updates).eql([]);

			// when
			property.set("Wow");
			expect(el.calls).eql([]);
		} finally {
			destroy(binding);
		}
	});
});

describe("bindVal(TWOWAY, simple)", () => {
	it("should assign value on initialization", () => {
		// given
		const updates: string[] = [];
		const el = new DummyInputElement();
		const property = spyProperty(new Property("Hello"), updates);

		// when
		bindVal(el, property, TWOWAY, true);

		// then
		expect(el.calls).eql([["val", "Hello"], ["change"]]);
		expect(updates).eql([]);
	});

	it("should reassign value on property change", () => {
		// given
		const updates: string[] = [];
		const el = new DummyInputElement();
		const property = spyProperty(new Property("Hello"), updates);
		bindVal(el, property, TWOWAY, true);
		el.calls.splice(0);
		updates.splice(0);

		// when
		property.set("Bye");

		// then
		expect(el.calls).eql([["val", "Bye"], ["change"]]);
		expect(updates).eql(["Bye"]);
	});

	it("should reassign property on value change", () => {
		// given
		const updates: string[] = [];
		const el = new DummyInputElement();
		const property = spyProperty(new Property("Hello"), updates);
		bindVal(el, property, TWOWAY, true);
		el.calls.splice(0);
		updates.splice(0);

		// when
		el.enter("Bye", true);

		// then
		expect(el.calls).eql([]);
		expect(updates).eql(["Bye"]);
	});

	it("should unbind on destruction", () => {
		// given
		const updates: string[] = [];
		const el = new DummyInputElement();
		const property = spyProperty(new Property("Hello"), updates);
		const binding = bindVal(el, property, TWOWAY, true);
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
		el.enter("Bye", true);

		// then
		expect(updates).eql([]);

		// when
		property.set("Wow");
		expect(el.calls).eql([]);
	});
});

function spyProperty<T, U extends Bindable<T>>(property: U, updates: T[]): U {
	property.onChange.listen(({value}) => {
		updates.push(value);
	});
	return property;
}

class DummyInputElement implements ValueUpdaterElement<string>, ValueWatcherElement {

	private value = "";
	private listeners: (() => void)[] = [];

	readonly calls: any[][] = [];

	prop(_prop: "tagName"): string {
		return "INPUT";
	}

	attr(_attr: "type"): string {
		return "text";
	}

	val(): string | number | string[];
	val(value: string): void;
	val(value?: string): any {
		if (value === undefined) {
			return this.value;
		}
		this.value = value;
		this.calls.push(["val", value]);
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

	enter(value: string, trigger = false) {
		this.value = value;
		if (trigger) {
			// In reality, "change" event is not triggered immediately - only on blur.
			this.listeners.concat().forEach(callback => {
				callback();
			});
		}
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
