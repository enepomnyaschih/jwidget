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
import {count, filter, index, map} from "jwidget/IterableUtils";

describe("IterableUtils.map", () => {
	it("should return a mapped array", () => {
		expect(map([1, 2, 3], x => 2 * x)).eql([2, 4, 6]);
	});

	it("should return an empty array if the input collection is empty", () => {
		expect(map([], () => {
			assert.fail();
		})).eql([]);
	});
});

describe("IterableUtils.filter", () => {
	it("should return a filtered array", () => {
		expect(filter([1, 2, 3], x => x % 2 !== 0)).eql([1, 3]);
	});

	it("should return an empty array if the input collection is empty", () => {
		expect(filter([], () => {
			assert.fail();
		})).eql([]);
	});
});

describe("IterableUtils.count", () => {
	it("should return count of matching items", () => {
		expect(count([1, 2, 3], x => x % 2 !== 0)).equal(2);
	});

	it("should return 0 if the input collection is empty", () => {
		expect(count([], () => {
			assert.fail();
		})).equal(0);
	});
});

describe("IterableUtils.index", () => {
	it("should return a map from a key to its item", () => {
		expect(Array.from(index([1, 2, 3], x => x * 2))).eql([[2, 1], [4, 2], [6, 3]]);
	});

	it("should return an empty map if the input collection is empty", () => {
		expect(Array.from(index([], () => {
			assert.fail();
		}))).eql([]);
	});
});
