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
import {binarySearch} from "jwidget/ArrayUtils";

describe("ArrayUtils.binarySearch", () => {
	it("should immediately return 0 for an empty array", () => {
		expect(binarySearch([], () => assert.fail())).equal(0);
	});

	it("should return 0 if the only item is higher", () => {
		expect(binarySearch([1], value => value > 0)).equal(0);
	});

	it("should return 1 if the only item is lower or equal", () => {
		expect(binarySearch([0], value => value > 0)).equal(1);
	});

	it("should find an item in the beginning (4 items)", () => {
		expect(binarySearch([1, 2, 3, 4], value => value > 0)).equal(0);
	});

	it("should find an item in the middle (4 items)", () => {
		expect(binarySearch([-2, -1, 1, 2], value => value > 0)).equal(2);
	});

	it("should find an item in the end (4 items)", () => {
		expect(binarySearch([-4, -3, -2, -1], value => value > 0)).equal(4);
	});

	it("should find an item in the beginning (5 items)", () => {
		expect(binarySearch([1, 2, 3, 4, 5], value => value > 0)).equal(0);
	});

	it("should find an item in the middle (5 items)", () => {
		expect(binarySearch([-2, -1, 0, 1, 2], value => value > 0)).equal(3);
	});

	it("should find an item in the end (5 items)", () => {
		expect(binarySearch([-4, -3, -2, -1, 0], value => value > 0)).equal(5);
	});

	it("should find an item in the beginning (7 items)", () => {
		expect(binarySearch([1, 2, 3, 4, 5, 6, 7], value => value > 0)).equal(0);
	});

	it("should find an item in the middle (7 items)", () => {
		expect(binarySearch([-3, -2, -1, 0, 1, 2, 3], value => value > 0)).equal(4);
	});

	it("should find an item in the end (7 items)", () => {
		expect(binarySearch([-6, -5, -4, -3, -2, -1, 0], value => value > 0)).equal(7);
	});
});
