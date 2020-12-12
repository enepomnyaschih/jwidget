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
import {filter, getIterableKeys, getIterableValues, map} from "jwidget/MapUtils";

describe("MapUtils.map", () => {
	it("should return a mapped map", () => {
		expect(Array.from(map([[1, 2], [3, 4], [5, 6]], x => 2 * x))).eql([[1, 4], [3, 8], [5, 12]]);
	});

	it("should pass keys", () => {
		expect(Array.from(map([[1, 2], [3, 4], [5, 6]], (_, x) => 2 * x))).eql([[1, 2], [3, 6], [5, 10]]);
	});

	it("should return an empty map if the input map is empty", () => {
		expect(Array.from(map([], () => {
			assert.fail();
		}))).eql([]);
	});
});

describe("MapUtils.filter", () => {
	it("should return a filtered map", () => {
		expect(Array.from(filter([[1, 2], [3, 4], [5, 6]], x => x > 3))).eql([[3, 4], [5, 6]]);
	});

	it("should pass keys", () => {
		expect(Array.from(filter([[1, 2], [3, 4], [5, 6]], (_, x) => x < 4))).eql([[1, 2], [3, 4]]);
	});

	it("should return an empty map if the input map is empty", () => {
		expect(Array.from(filter([], () => {
			assert.fail();
		}))).eql([]);
	});
});

describe("MapUtils.getIterableKeys", () => {
	it("should be reusable", () => {
		// given
		const map = new Map([[1, 2], [3, 4], [5, 6]]);

		// when
		const keys = getIterableKeys(map);

		// then
		expect(Array.from(keys)).eql([1, 3, 5]);
		expect(Array.from(keys)).eql([1, 3, 5]);
	});
});

describe("MapUtils.getIterableValues", () => {
	it("should be reusable", () => {
		// given
		const map = new Map([[1, 2], [3, 4], [5, 6]]);

		// when
		const values = getIterableValues(map);

		// then
		expect(Array.from(values)).eql([2, 4, 6]);
		expect(Array.from(values)).eql([2, 4, 6]);
	});
});
