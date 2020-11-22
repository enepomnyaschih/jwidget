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
import bindClass, {ClassUpdaterElement, ClassNameUpdaterElement} from "jwidget/bindClass";
import Property from "jwidget/Property";

describe("bindClass(el, cls, property)", () => {
	it("should toggle the class on initialization", () => {
		// given
		const calls: any[][] = [];
		const el = spyClassUpdaterElement(calls);
		const property = new Property(true);

		// when
		bindClass(el, "my-class", property);

		// then
		assertCalls([[el, "my-class", true]], calls);
	});

	it("should toggle the class on property change", () => {
		// given
		const calls: any[][] = [];
		const el = spyClassUpdaterElement(calls);
		const property = new Property(true);
		bindClass(el, "my-class", property);
		calls.splice(0);

		// when
		property.set(false);

		// then
		assertCalls([[el, "my-class", false]], calls);
	});

	it("should unbind on destruction", () => {
		// given
		const calls: any[][] = [];
		const el = spyClassUpdaterElement(calls);
		const property = new Property(true);
		const binding = bindClass(el, "my-class", property);
		calls.splice(0);

		// when
		assert.isTrue(hasBindings(property));
		binding.destroy();

		// then
		assert.isFalse(hasBindings(property));

		// when
		property.set(false);

		// then
		assertCalls([], calls);
	});
});

describe("bindClass(el, cls)", () => {
	it("should add the class on initialization", () => {
		// given
		const calls: any[][] = [];
		const el = spyClassNameUpdaterElement(calls);
		const property = new Property("red");

		// when
		bindClass(el, property);

		// then
		assertCalls([[el, "add", "red"]], calls);
	});

	it("should reassign the class on property change", () => {
		// given
		const calls: any[][] = [];
		const el = spyClassNameUpdaterElement(calls);
		const property = new Property("red");
		bindClass(el, property);
		calls.splice(0);

		// when
		property.set("blue");

		// then
		assertCalls([[el, "remove", "red"], [el, "add", "blue"]], calls);
	});

	it("should unbind on destruction", () => {
		// given
		const calls: any[][] = [];
		const el = spyClassNameUpdaterElement(calls);
		const property = new Property("red");
		const binding = bindClass(el, property);
		calls.splice(0);

		// when
		assert.isTrue(hasBindings(property));
		binding.destroy();

		// then
		assert.isFalse(hasBindings(property));

		// when
		property.set("blue");

		// then
		assertCalls([], calls);
	});
});

function spy(calls: any[][], captureThis: boolean, name?: string) {
	return function (this: any): any {
		calls.push([...(captureThis ? [this] : []), ...(name ? [name] : []), ...arguments]);
	};
}

function spyClassUpdaterElement(calls: any[][]): ClassUpdaterElement {
	return {
		toggleClass: spy(calls, true)
	};
}

function spyClassNameUpdaterElement(calls: any[][]): ClassNameUpdaterElement {
	return {
		addClass: spy(calls, true, "add"),
		removeClass: spy(calls, true, "remove")
	};
}

function assertCalls(expected: any[][], calls: any[][]) {
	expect(calls.length).equal(expected.length);
	for (let i = 0; i < calls.length; ++i) {
		expect(calls[i].length).equal(expected[i].length);
		for (let j = 0; j < calls[i].length; ++j) {
			expect(calls[i][j]).equal(expected[i][j]);
		}
	}
}

function hasBindings(property: Property<unknown>) {
	return (<any>property.onChange)._listeners.size !== 0;
}
