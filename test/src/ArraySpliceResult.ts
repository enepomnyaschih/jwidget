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
import ArraySpliceResult from "jwidget/ArraySpliceResult";
import IndexItems from "jwidget/IndexItems";

describe("ArraySpliceResult", () => {
	it("should identify removed items", () => {
		const spliceResult = new ArraySpliceResult([5, 2, 8, 7, 8],
			[new IndexItems(0, [5, 2]), new IndexItems(4, [8])], // 8, 7
			[new IndexItems(1, [3, 4]), new IndexItems(4, [1, 1])]); // 8, 3, 4, 7, 1, 1
		expect(spliceResult.removedItems).eql([5, 2, 8]);
	});

	it("should identify added items", () => {
		const spliceResult = new ArraySpliceResult([5, 2, 8, 7, 8],
			[new IndexItems(0, [5, 2]), new IndexItems(4, [8])], // 8, 7
			[new IndexItems(1, [3, 4]), new IndexItems(4, [1, 1])]); // 8, 3, 4, 7, 1, 1
		expect(spliceResult.addedItems).eql([3, 4, 1, 1]);
	});

	it("should identify remove params", () => {
		const spliceResult = new ArraySpliceResult([5, 2, 8, 7, 8],
			[new IndexItems(0, [5, 2]), new IndexItems(4, [8])], // 8, 7
			[new IndexItems(1, [3, 4]), new IndexItems(4, [1, 1])]); // 8, 3, 4, 7, 1, 1
		expect(spliceResult.removeParams).eql([[0, 2], [4, 1]]);
	});

	it("should identify if it is empty", () => {
		assert.isTrue(new ArraySpliceResult([5, 2, 8, 7, 8], [], []).empty);
		assert.isFalse(new ArraySpliceResult([5, 2, 8, 7, 8], [new IndexItems(0, [5, 2])], []).empty);
		assert.isFalse(new ArraySpliceResult([5, 2, 8, 7, 8], [], [new IndexItems(1, [3, 4])]).empty);
	});
});
