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
import bindRadio, {RadioField} from "jwidget/bindRadio";
import Property from "jwidget/Property";
import {RadioUpdaterButton, RadioWatcherButton} from "../../main/src/bindRadio";

describe("bindRadio(UPDATE)", () => {
	it("should select radio on initialization if set", () => {
		// given
		const el = new DummyRadioField();
		const property = new Property("a");

		// when
		bindRadio(el, "field", property);

		// then
		expect(el.calls).eql([["prop", "a", true], ["change", "a"]]);
	});

	it("should unselect radio on initialization if null", () => {
		// given
		const el = new DummyRadioField("a");
		const property = new Property<string>(null);

		// when
		bindRadio(el, "field", property);

		// then
		expect(el.calls).eql([["prop", "a", false], ["change", "a"]]);
	});

	it("should unselect radio on initialization if wrong", () => {
		// given
		const el = new DummyRadioField("a");
		const property = new Property<string>("x");

		// when
		bindRadio(el, "field", property);

		// then
		expect(el.calls).eql([["prop", "a", false], ["change", "a"]]);
	});

	it("should leave radio alone on initialization if already selected", () => {
		// given
		const el = new DummyRadioField("a");
		const property = new Property("a");

		// when
		bindRadio(el, "field", property);

		// then
		expect(el.calls).eql([]);
	});

	it("should leave radio alone on initialization if already unselected", () => {
		// given
		const el = new DummyRadioField();
		const property = new Property<string>();

		// when
		bindRadio(el, "field", property);

		// then
		expect(el.calls).eql([]);
	});

	it("should leave radio alone on initialization if already unselected and the property is wrong", () => {
		// given
		const el = new DummyRadioField();
		const property = new Property<string>("x");

		// when
		bindRadio(el, "field", property);

		// then
		expect(el.calls).eql([]);
	});

	it("should select another radio on property change", () => {
		// given
		const el = new DummyRadioField();
		const property = new Property("a");
		bindRadio(el, "field", property);
		el.calls.splice(0);

		// when
		property.set("b");

		// then
		expect(el.calls).eql([["prop", "b", true], ["change", "b"]]);
	});

	it("should unselect radio on property reset", () => {
		// given
		const el = new DummyRadioField();
		const property = new Property("a");
		bindRadio(el, "field", property);
		el.calls.splice(0);

		// when
		property.set(null);

		// then
		expect(el.calls).eql([["prop", "a", false], ["change", "a"]]);
	});

	it("should unselect radio on wrong property value assignment", () => {
		// given
		const el = new DummyRadioField();
		const property = new Property("a");
		bindRadio(el, "field", property);
		el.calls.splice(0);

		// when
		property.set("x");

		// then
		expect(el.calls).eql([["prop", "a", false], ["change", "a"]]);
	});

	it("should unbind on destruction", () => {
		// given
		const el = new DummyRadioField();
		const property = new Property("a");
		const binding = bindRadio(el, "field", property);
		el.calls.splice(0);

		// when
		assert.isTrue(hasBindings(property));
		binding.destroy();

		// then
		assert.isFalse(hasBindings(property));

		// when
		property.set("b");

		// then
		expect(el.calls).eql([]);
	});
});

describe("bindRadio(WATCH)", () => {
	it("should assign property on initialization if selected", () => {
		// given
		const updates: string[] = [];
		const el = new DummyRadioField("a");
		const property = spyProperty(null, updates);

		// when
		bindRadio(el, "field", property, WATCH);

		// then
		expect(updates).eql(["a"]);
	});

	it("should reset property on initialization if unselected", () => {
		// given
		const updates: string[] = [];
		const el = new DummyRadioField();
		const property = spyProperty("a", updates);

		// when
		bindRadio(el, "field", property, WATCH);

		// then
		expect(updates).eql([null]);
	});

	it("should assign property on radio selection", () => {
		// given
		const updates: string[] = [];
		const el = new DummyRadioField();
		const property = spyProperty(null, updates);
		bindRadio(el, "field", property, WATCH);
		updates.splice(0);

		// when
		el.select("a");

		// then
		expect(updates).eql(["a"]);
	});

	it("should reassign property on another radio selection", () => {
		// given
		const updates: string[] = [];
		const el = new DummyRadioField("a");
		const property = spyProperty(null, updates);
		bindRadio(el, "field", property, WATCH);
		updates.splice(0);

		// when
		el.select("b");

		// then
		expect(updates).eql(["b"]);
	});

	// We don't test reaction to "unselection", because there's no user action which can naturally lead to this.

	it("should unbind on destruction", () => {
		// given
		const updates: string[] = [];
		const el = new DummyRadioField();
		const property = spyProperty(null, updates);
		const binding = bindRadio(el, "field", property, WATCH);
		updates.splice(0);

		// when
		assert.isTrue(el.hasListeners());
		binding.destroy();

		// then
		assert.isFalse(el.hasListeners());

		// when
		el.select("a");

		// then
		expect(updates).eql([]);
	});
});

describe("bindRadio(TWOWAY)", () => {
	it("should select radio on initialization if set", () => {
		// given
		const updates: string[] = [];
		const el = new DummyRadioField();
		const property = spyProperty("a", updates);

		// when
		bindRadio(el, "field", property, TWOWAY);

		// then
		expect(el.calls).eql([["prop", "a", true], ["change", "a"]]);
		expect(updates).eql([]);
	});

	it("should unselect radio on initialization if null", () => {
		// given
		const el = new DummyRadioField("a");
		const property = new Property<string>(null);

		// when
		bindRadio(el, "field", property, TWOWAY);

		// then
		expect(el.calls).eql([["prop", "a", false], ["change", "a"]]);
	});

	it("should unselect radio and leave the property alone on initialization if wrong", () => {
		// given
		const updates: string[] = [];
		const el = new DummyRadioField("a");
		const property = spyProperty("x", updates);

		// when
		bindRadio(el, "field", property, TWOWAY);

		// then
		expect(el.calls).eql([["prop", "a", false], ["change", "a"]]);
		expect(updates).eql([]);
	});

	it("should leave radio alone on initialization if already selected", () => {
		// given
		const el = new DummyRadioField("a");
		const property = new Property("a");

		// when
		bindRadio(el, "field", property, TWOWAY);

		// then
		expect(el.calls).eql([]);
	});

	it("should leave radio alone on initialization if already unselected", () => {
		// given
		const el = new DummyRadioField();
		const property = new Property<string>();

		// when
		bindRadio(el, "field", property, TWOWAY);

		// then
		expect(el.calls).eql([]);
	});

	it("should leave radio alone and leave the property alone on initialization if already unselected and the property is wrong", () => {
		// given
		const updates: string[] = []
		const el = new DummyRadioField();
		const property = spyProperty("x", updates);

		// when
		bindRadio(el, "field", property, TWOWAY);

		// then
		expect(el.calls).eql([]);
		expect(updates).eql([]);
	});

	it("should select another radio on property change", () => {
		// given
		const el = new DummyRadioField();
		const property = new Property("a");
		bindRadio(el, "field", property, TWOWAY);
		el.calls.splice(0);

		// when
		property.set("b");

		// then
		expect(el.calls).eql([["prop", "b", true], ["change", "b"]]);
	});

	it("should unselect radio on property reset", () => {
		// given
		const el = new DummyRadioField();
		const property = new Property("a");
		bindRadio(el, "field", property, TWOWAY);
		el.calls.splice(0);

		// when
		property.set(null);

		// then
		expect(el.calls).eql([["prop", "a", false], ["change", "a"]]);
	});

	it("should unselect radio and leave the property alone on wrong property value assignment", () => {
		// given
		const updates: string[] = [];
		const el = new DummyRadioField();
		const property = new Property("a");
		bindRadio(el, "field", property, TWOWAY);
		el.calls.splice(0);

		// when
		property.set("x");

		// then
		expect(el.calls).eql([["prop", "a", false], ["change", "a"]]);
		expect(updates).eql([]);
	});

	it("should assign property on radio selection", () => {
		// given
		const updates: string[] = [];
		const el = new DummyRadioField();
		const property = spyProperty(null, updates);
		bindRadio(el, "field", property, TWOWAY);
		updates.splice(0);

		// when
		el.select("a");

		// then
		expect(updates).eql(["a"]);
	});

	it("should reassign property on another radio selection", () => {
		// given
		const updates: string[] = [];
		const el = new DummyRadioField("a");
		const property = spyProperty(null, updates);
		bindRadio(el, "field", property, TWOWAY);
		updates.splice(0);

		// when
		el.select("b");

		// then
		expect(updates).eql(["b"]);
	});

	// We don't test reaction to "unselection", because there's no user action which can naturally lead to this.

	it("should unbind on destruction", () => {
		// given
		const updates: string[] = [];
		const el = new DummyRadioField();
		const property = spyProperty("a", updates);
		const binding = bindRadio(el, "field", property, TWOWAY);
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
		el.select("b");

		// then
		expect(updates).eql([]);

		// when
		property.set("c");
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

class DummyRadioField implements RadioField {

	private buttons = new Map<string, DummyRadioButton>([
		["a", new DummyRadioButton("a", this)],
		["b", new DummyRadioButton("b", this)],
		["c", new DummyRadioButton("c", this)]
	]);
	listeners: (() => void)[] = [];

	readonly calls: any[][] = [];

	constructor(public value: string = null) {
	}

	find(selector: string): RadioUpdaterButton & RadioWatcherButton {
		if (selector === "input[type=radio][name='field']:checked") {
			return this.value ? this.buttons.get(this.value) : NO_RADIO_BUTTON;
		}
		const matches = /^input\[type=radio\]\[name='field'\]\[value='([\w])'\]$/.exec(selector);
		if (!matches) {
			assert.fail("Invalid selector: " + selector);
		}
		return this.buttons.get(matches[1]) ?? NO_RADIO_BUTTON;
	}

	on(_event: "change", selector: string, callback: () => void): void {
		if (selector !== "input[type=radio][name='field']") {
			assert.fail("Invalid selector: " + selector);
		}
		this.listeners.push(callback);
	}

	off(_event: "change", selector: string, callback: () => void): void {
		if (selector !== "input[type=radio][name='field']") {
			assert.fail("Invalid selector: " + selector);
		}
		this.listeners = this.listeners.filter(x => x !== callback);
	}

	select(value: string) {
		this.value = value;
		this.listeners.concat().forEach(callback => {
			callback();
		});
	}

	hasListeners() {
		return this.listeners.length !== 0;
	}
}

class DummyRadioButton implements RadioUpdaterButton, RadioWatcherButton {

	constructor(private readonly value: string, private field: DummyRadioField) {
	}

	get length() {
		return 1;
	}

	is(_selector: ":checked"): boolean {
		return this.field.value === this.value;
	}

	prop(_prop: "checked", checked: boolean) {
		this.field.calls.push(["prop", this.value, checked]);
		if (checked) {
			if (this.field.value === this.value) {
				assert.fail("The button is already checked.");
			}
			this.field.value = this.value;
		} else {
			if (this.field.value !== this.value) {
				assert.fail("The button is not yet checked.");
			}
			this.field.value = null;
		}
	}

	change(): void {
		this.field.listeners.concat().forEach(callback => {
			callback();
		});
		this.field.calls.push(["change", this.value]);
	}

	attr(_attr: "value"): string {
		return this.value;
	}
}

const NO_RADIO_BUTTON: RadioUpdaterButton & RadioWatcherButton = {
	length: 0,

	is(_selector: ":checked") {
		assert.fail("Unable to get state of 'no' radio button.");
	},

	prop(_prop: "checked", _value: boolean) {
		assert.fail("Unable to check or uncheck 'no' radio button.");
	},

	change(): void {
		assert.fail("Unable to change 'no' radio button.");
	},

	attr(_attr: "value"): string {
		assert.fail("Unable to get value of 'no' radio button.");
	}
};

function hasBindings(property: Property<unknown>) {
	return (<any>property.onChange)._listeners.size !== 0;
}

function hasBindingsExceptForSpy(property: Property<unknown>) {
	return (<any>property.onChange)._listeners.size > 1;
}
