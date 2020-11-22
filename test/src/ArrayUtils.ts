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
import {
	addAll,
	backForEach,
	binarySearch,
	invert,
	isIdentity,
	merge,
	move,
	reduce,
	tryReorder,
	trySplice
} from "jwidget/ArrayUtils";
import IBindableArray from "jwidget/IBindableArray";
import IndexCount from "jwidget/IndexCount";
import IndexItems from "jwidget/IndexItems";
import Reducer from "jwidget/Reducer";

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

describe("ArrayUtils.reduce(Reducer)", () => {
	it("should call the native method if the initial value is a constant", () => {
		// given
		const array = [5, 2, 8, 7, 8];
		const calls = spyMethod(array, "reduce");
		const reducer: Reducer<number, number> = {
			initial: 0,
			callback: (acc, item) => acc + item
		};

		// when
		reduce(array, reducer);

		// then
		assertCalls([[array, reducer.callback, 0]], calls);
	});

	it("should call the native method if the initial value is a function", () => {
		// given
		const array = [5, 2, 8, 7, 8];
		const calls = spyMethod(array, "reduce");
		const reducer: Reducer<number, number> = {
			initial: () => 0,
			callback: (acc, item) => acc + item
		};

		// when
		reduce(array, reducer);

		// then
		assertCalls([[array, reducer.callback, 0]], calls);
	});
});

describe("ArrayUtils.reduce(callback)", () => {
	it("should call the native method", () => {
		// given
		const array = [5, 2, 8, 7, 8];
		const calls = spyMethod(array, "reduce");
		const cb = () => 0;

		// when
		reduce(array, cb, 0);

		// then
		assertCalls([[array, cb, 0]], calls);
	});
});

describe("ArrayUtils.backForEach", () => {
	it("should call the callback in reverse order", () => {
		// given
		const array = [5, 2, 8, 7, 8];
		const {calls, fn} = spy();

		// when
		backForEach(array, fn);

		// then
		assertCalls([
			[8, 4],
			[7, 3],
			[8, 2],
			[2, 1],
			[5, 0]
		], calls);
	});
});

describe("ArrayUtils.isIdentity", () => {
	it("should return true for an empty array", () => {
		assert.isTrue(isIdentity([]));
	});

	it("should return true for a show identity array", () => {
		assert.isTrue(isIdentity([0]));
	});

	it("should return true for a long identity array", () => {
		assert.isTrue(isIdentity([0, 1, 2, 3, 4]));
	});

	it("should return false for a short non-identity array", () => {
		assert.isFalse(isIdentity([1]));
	});

	it("should return false for a long non-identity array", () => {
		assert.isFalse(isIdentity([0, 1, 3, 2, 4]));
	});
});

describe("ArrayUtils.invert", () => {
	it("should return a new array instance", () => {
		const array: number[] = [];
		expect(invert(array)).not.equal(array);
	});

	it("should an empty array for an empty array", () => {
		expect(invert([])).eql([]);
	});

	it("should return an equal array for an identity array", () => {
		expect(invert([0, 1, 2, 3, 4])).eql([0, 1, 2, 3, 4]);
	});

	it("should return an inverted array for a non-identity array", () => {
		expect(invert([0, 3, 2, 4, 1])).eql([0, 4, 2, 1, 3]);
	});

	it("may return an equal array for a special identity array", () => {
		expect(invert([2, 3, 0, 1, 4])).eql([2, 3, 0, 1, 4]);
	});
});

describe("ArrayUtils.merge", () => {
	it("should return a new array instance", () => {
		const array: number[][] = [];
		expect(merge(array)).not.equal(array);
	});

	it("should an empty array for an empty array", () => {
		expect(merge([])).eql([]);
	});

	it("should return a merged array", () => {
		expect(merge([[5, 2], [], [8], [7, 8, 1]])).eql([5, 2, 8, 7, 8, 1]);
	});
});

describe("ArrayUtils.addAll", () => {
	it("should add items to the end by default", () => {
		const array = [5, 2, 8, 7, 8];
		addAll(array, [1, 2])
		expect(array).eql([5, 2, 8, 7, 8, 1, 2]);
	});

	it("should add items to the middle", () => {
		const array = [5, 2, 8, 7, 8];
		addAll(array, [1, 2], 2)
		expect(array).eql([5, 2, 1, 2, 8, 7, 8]);
	});
});

describe("ArrayUtils.move", () => {
	it("should move the specified item forwards", () => {
		const array = [5, 2, 8, 7, 8];
		move(array, 1, 3);
		expect(array).eql([5, 8, 7, 2, 8]);
	});

	it("should move the specified item backwards", () => {
		const array = [5, 2, 8, 7, 8];
		move(array, 3, 1);
		expect(array).eql([5, 7, 2, 8, 8]);
	});

	it("should return the moved value", () => {
		const array = [5, 2, 8, 7, 8];
		expect(move(array, 1, 3)).equal(2);
	});

	it("should not change the array if the index is the same", () => {
		const array = [5, 2, 8, 7, 8];
		move(array, 1, 1);
		expect(array).eql([5, 2, 8, 7, 8]);
	});

	it("should return the value if the index is the same", () => {
		const array = [5, 2, 8, 7, 8];
		expect(move(array, 1, 1)).equal(2);
	});
});

describe("ArrayUtils.trySplice", () => {
	it("should remove and add items in middle as documented", () => {
		const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
		trySplice(array, [
			new IndexCount(2, 2),
			new IndexCount(6, 1)
		], [ // [1, 2, 5, 6, 8, 9]
			new IndexItems(1, [10, 11]), // [1, 10, 11, 2, 5, 6, 8, 9]
			new IndexItems(5, [12, 13])  // [1, 10, 11, 2, 5, 12, 13, 6, 8, 9]
		]);
		expect(array).eql([1, 10, 11, 2, 5, 12, 13, 6, 8, 9]);
	});

	it("should remove and add items in front and rear as documented", () => {
		const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
		trySplice(array, [
			new IndexCount(0, 2),
			new IndexCount(7, 2)
		], [ // [3, 4, 5, 6, 7]
			new IndexItems(0, [10, 11]), // [10, 11, 3, 4, 5, 6, 7]
			new IndexItems(7, [12, 13])  // [10, 11, 3, 4, 5, 6, 7, 12, 13]
		]);
		expect(array).eql([10, 11, 3, 4, 5, 6, 7, 12, 13]);
	});

	it("should return the splice result", () => {
		const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
		expect(parseSpliceResult(trySplice(array, [
			new IndexCount(2, 2),
			new IndexCount(6, 1)
		], [ // [1, 2, 5, 6, 8, 9]
			new IndexItems(1, [10, 11]), // [1, 10, 11, 2, 5, 6, 8, 9]
			new IndexItems(5, [12, 13])  // [1, 10, 11, 2, 5, 12, 13, 6, 8, 9]
		]))).eql([
			[1, 2, 3, 4, 5, 6, 7, 8, 9],
			[[2, [3, 4]], [6, [7]]],
			[[1, [10, 11]], [5, [12, 13]]]
		]);
	});

	it("should not change the array if no segments provided", () => {
		const array = [1, 2, 3, 4, 5];
		trySplice(array, [], []);
		expect(array).eql([1, 2, 3, 4, 5]);
	});

	it("should return undefined if no segments provided", () => {
		const array = [1, 2, 3, 4, 5];
		assert.isUndefined(trySplice(array, [], []));
	});

	it("should ignore empty segments", () => {
		const array = [1, 2, 3, 4, 5];
		assert.isUndefined(trySplice(array, [new IndexCount(1, 0)], [new IndexItems(1, [])]));
		expect(array).eql([1, 2, 3, 4, 5]);
	});

	it("should merge consequent segments", () => {
		const array = [1, 2, 3, 4, 5];
		const result = trySplice(array,
			[new IndexCount(1, 1), new IndexCount(2, 1)],
			[new IndexItems(1, [6]), new IndexItems(2, [7])]);
		expect(array).eql([1, 6, 7, 4, 5]);
		expect(parseSpliceResult(result)).eql([[1, 2, 3, 4, 5], [[1, [2, 3]]], [[1, [6, 7]]]]);
	});
});

describe("ArrayUtils.tryReorder", () => {
	it("should reorder array items", () => {
		const array = [5, 2, 8, 7, 8];
		tryReorder(array, [2, 4, 3, 0, 1]);
		expect(array).eql([7, 8, 5, 8, 2]);
	});

	it("should not change the array if empty", () => {
		const array: number[] = [];
		tryReorder(array, []);
		expect(array).eql([]);
	});

	it("should not change the array if the indexes are identical", () => {
		const array = [5, 2, 8, 7, 8];
		tryReorder(array, [0, 1, 2, 3, 4]);
		expect(array).eql([5, 2, 8, 7, 8]);
	});

	it("should return old array contents", () => {
		const array = [5, 2, 8, 7, 8];
		expect(tryReorder(array, [2, 4, 3, 0, 1])).eql([5, 2, 8, 7, 8]);
	});

	it("should return undefined if empty", () => {
		const array: number[] = [];
		assert.isUndefined(tryReorder(array, []));
	});

	it("should return undefined if the indexes are identical", () => {
		const array = [5, 2, 8, 7, 8];
		assert.isUndefined(tryReorder(array, [0, 1, 2, 3, 4]));
	});
});

function spy(captureThis: boolean = false) {
	const calls: any[][] = [];
	const fn = function (this: any): any {
		calls.push([...(captureThis ? [this] : []), ...arguments]);
	};
	fn.calls = calls;
	return {calls, fn};
}

function spyMethod(obj: any, method: string) {
	const {calls, fn} = spy(true);
	obj[method] = fn;
	return calls;
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

function parseSpliceResult(spliceResult: IBindableArray.SpliceResult<any>) {
	return [
		spliceResult.oldContents,
		spliceResult.removedSegments.map(segment => [segment.index, segment.items]),
		spliceResult.addedSegments.map(segment => [segment.index, segment.items])
	];
}
