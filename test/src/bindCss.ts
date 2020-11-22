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
import bindCss, {CssUpdaterElement} from "jwidget/bindCss";
import Property from "jwidget/Property";

describe("bindCss", () => {
	it("should assign the style on initialization", () => {
		// given
		const calls: any[][] = [];
		const el = spyCssUpdaterElement(calls);
		const property = new Property("red");

		// when
		bindCss(el, "color", property);

		// then
		assertCalls([[el, "color", "red"]], calls);
	});

	it("should reassign the style on property change", () => {
		// given
		const calls: any[][] = [];
		const el = spyCssUpdaterElement(calls);
		const property = new Property("red");
		bindCss(el, "color", property);
		calls.splice(0);

		// when
		property.set("blue");

		// then
		assertCalls([[el, "color", "blue"]], calls);
	});

	it("should unbind on destruction", () => {
		// given
		const calls: any[][] = [];
		const el = spyCssUpdaterElement(calls);
		const property = new Property("red");
		const binding = bindCss(el, "color", property);
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

function spyCssUpdaterElement(calls: any[][]): CssUpdaterElement {
	return {
		css: spy(calls, true)
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
