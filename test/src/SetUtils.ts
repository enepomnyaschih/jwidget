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

import {expect} from "chai";
import {getDifference} from "jwidget/SetUtils";

describe("SetUtils.getDifference", () => {
	it("should return a difference", () => {
		expect(Array.from(getDifference([1, 2, 3, 4, 5], new Set([0, 1, 3, 4, 6])))).eql([2, 5]);
	});

	it("should return an empty array when applicable", () => {
		expect(Array.from(getDifference([], new Set()))).eql([]);
		expect(Array.from(getDifference([], new Set([1, 2, 3])))).eql([]);
		expect(Array.from(getDifference([1, 2, 3], new Set([1, 2, 3])))).eql([]);
	});
});
