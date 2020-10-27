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
import BindableMap from "jwidget/BindableMap";
//import IBindableMap from "jwidget/IBindableMap";

describe("new BindableMap", () => {
	it("should assign silent flag properly", () => {
		expect(new BindableMap().silent).equal(false);
		expect(new BindableMap(true).silent).equal(true);
		expect(new BindableMap([]).silent).equal(false);
		expect(new BindableMap([], true).silent).equal(true);
	});

	it("should contain a native map", () => {
		assert.isTrue(new BindableMap().native instanceof Map);
		assert.isTrue(new BindableMap(true).native instanceof Map);
		assert.isTrue(new BindableMap([]).native instanceof Map);
		assert.isTrue(new BindableMap([], true).native instanceof Map);
	});

	it("should create a new map", () => {
		const input = new Map();
		expect(new BindableMap(input).native).not.equal(input);
		expect(new BindableMap(input, true).native).not.equal(input);
	});
});

describe("BindableMap.size", () => {
	it("should not be silent for a non-silent map", () => {
		expect(new BindableMap().size.silent).equal(false);
	});

	it("should be silent for a silent map", () => {
		expect(new BindableMap(true).size.silent).equal(true);
	});

	it("should be zero for an empty map", () => {
		expect(new BindableMap().size.get()).equal(0);
	});

	it("should return number of items for a non-empty map", () => {
		expect(new BindableMap([["a", 2], ["b", 7]]).size.get()).equal(2);
	});

	// ... all tests for reaction to concrete mutation methods are among tests for those methods
});
