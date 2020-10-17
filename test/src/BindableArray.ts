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
import BindableArray from "jwidget/BindableArray";

describe("new BindableArray", () => {
	it("should assign silent flag properly", () => {
		expect(new BindableArray().silent).equal(false);
		expect(new BindableArray(true).silent).equal(true);
		expect(new BindableArray([]).silent).equal(false);
		expect(new BindableArray([], true).silent).equal(true);
	});

	it("should contain a native array", () => {
		assert.isArray(new BindableArray().native);
		assert.isArray(new BindableArray(true).native);
		assert.isArray(new BindableArray([]).native);
		assert.isArray(new BindableArray([], true).native);
	});

	it("should create a new array", () => {
		const input: any[] = [];
		expect(new BindableArray(input).native).not.equal(input);
		expect(new BindableArray(input, true).native).not.equal(input);
	});
});

describe("BindableArray.length", () => {
	it("should not be silent for a non-silent array", () => {
		expect(new BindableArray().length.silent).equal(false);
	});

	it("should be silent for a silent array", () => {
		expect(new BindableArray(true).length.silent).equal(true);
	});

	it("should be 0 for empty array", () => {
		expect(new BindableArray().length.get()).equal(0);
	});

	it("should return number of items for non-empty array", () => {
		expect(new BindableArray([5, 2, 8, 7, 8]).length.get()).equal(5);
	});

	// ... all tests for reaction to concrete mutation methods are among tests for those methods
});

describe("BindableArray.destroy", () => {
	it("should clear the array", () => {
		const array = new BindableArray([5, 2, 8, 7, 8]);
		array.destroy();
		expect(array.native).eql([]);
		expect(array.length.get()).eql(0);
	});

	it("should not destroy items if not owned", () => {
		const array = new BindableArray([
			{
				destroy: () => {
					assert.fail();
				}
			},
			{
				destroy: () => {
					assert.fail();
				}
			}
		]);
		array.destroy();
	});

	it("should destroy all items in reverse order if owned", () => {
		let step = 0;
		const array = new BindableArray([
			{
				destroy: () => {
					expect(++step).equal(2)
				}
			},
			{
				destroy: () => {
					expect(++step).equal(1)
				}
			}
		]).ownValues();
		array.destroy();
		expect(step).eql(2);
	});
});

describe("BindableArray.get", () => {
	it("should return a proper value", () => {
		const input = [5, 2, 8, 7, 8];
		const array = new BindableArray(input);
		expect(array.get(0)).equal(5);
		expect(array.get(1)).equal(2);
		expect(array.get(2)).equal(8);
		expect(array.get(3)).equal(7);
		expect(array.get(4)).equal(8);
	});

	it("should return undefined if out of bounds", () => {
		const input = [5, 2, 8, 7, 8];
		const array = new BindableArray(input);
		assert.isUndefined(array.get(-1));
		assert.isUndefined(array.get(5));
	});
});

describe("BindableArray.set", () => {
	it("should not change the original array", () => {
		const input = [5, 2, 8, 7, 8];
		const array = new BindableArray(input);
		array.set(0, 3);
		expect(input).eql([5, 2, 8, 7, 8]);
	});
});

describe("BindableArray[Symbol.iterator]", () => {
	it("should support empty arrays", () => {
		const array = new BindableArray();
		for (let _item of array) {
			assert.fail();
		}
	});

	it("should iterate through items", () => {
		const input = [5, 2, 8, 7, 8];
		const array = new BindableArray(input);
		let i = 0;
		for (let item of array) {
			expect(item).equal(input[i++]);
		}
		expect(i).equal(5);
	});
});
