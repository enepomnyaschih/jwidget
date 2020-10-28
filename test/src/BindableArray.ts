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
import IBindableArray from "jwidget/IBindableArray";
import IndexCount from "jwidget/IndexCount";
import IndexItems from "jwidget/IndexItems";

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

	it("should be zero for an empty array", () => {
		expect(new BindableArray().length.get()).equal(0);
	});

	it("should return number of items for a non-empty array", () => {
		expect(new BindableArray([5, 2, 8, 7, 8]).length.get()).equal(5);
	});

	// ... all tests for reaction to concrete mutation methods are among tests for those methods
});

describe("BindableArray.destroy", () => {
	it("should clear the array", () => {
		const array = new BindableArray([5, 2, 8, 7, 8]);
		const messages = listen(array);
		array.destroy();
		expect(array.native).eql([]);
		expect(array.length.get()).eql(0);
		expect(messages).eql([
			["length", 5, 0],
			["clear", [5, 2, 8, 7, 8]],
			["change"]
		]);
	});

	it("should not destroy items if not owned", () => {
		const array = new BindableArray([
			newDestroyFailObject(),
			newDestroyFailObject()
		]);
		array.destroy();
	});

	it("should destroy all items in reverse order if owned", () => {
		let step = 0;
		const array = new BindableArray([
			newDestroyStepObject(() => ++step, 2),
			newDestroyStepObject(() => ++step, 1)
		]).ownValues();
		array.destroy();
		expect(step).eql(2);
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

describe("BindableArray.includes", () => {
	it("should return true for an existing value", () => {
		const input = [5, 2, 8, 7, 8];
		const array = new BindableArray(input);
		assert.isTrue(array.includes(2));
		assert.isTrue(array.includes(5));
		assert.isTrue(array.includes(7));
		assert.isTrue(array.includes(5));
	});

	it("should return false for non-existent value", () => {
		const input = [5, 2, 8, 7, 8];
		const array = new BindableArray(input);
		assert.isFalse(array.includes(0));
		assert.isFalse(array.includes(10));
		assert.isFalse(array.includes(null));
	});

	it("should recognize NaN", () => {
		assert.isTrue(new BindableArray([NaN]).includes(NaN));
		assert.isFalse(new BindableArray([1]).includes(NaN));
		assert.isFalse(new BindableArray([Number.POSITIVE_INFINITY]).includes(NaN));
	});

	it("should recognize Infinity", () => {
		assert.isTrue(new BindableArray([Number.POSITIVE_INFINITY]).includes(Number.POSITIVE_INFINITY));
		assert.isFalse(new BindableArray([1]).includes(Number.POSITIVE_INFINITY));
		assert.isFalse(new BindableArray([NaN]).includes(Number.POSITIVE_INFINITY));
	});

	// ... extending this block any further would just be testing of the native array.includes method
});

// ... same for all other methods-delegators. It doesn't make much sense to cover them with tests

describe("BindableArray.reduce(callback)", () => {
	it("should return the initial value for an empty array", () => {
		expect(new BindableArray<number>().reduce((acc, value) => acc + value, 10)).equal(10);
	});

	it("should properly reduce the array to a value", () => {
		expect(new BindableArray([5, 2, 8, 7, 8]).reduce((acc, value) => acc + value, 10)).equal(40);
	});
});

describe("BindableArray.reduce(reducer)", () => {
	it("should return the initial value for an empty array", () => {
		expect(new BindableArray<number>().reduce({
			initial: 10,
			callback: (acc, value) => acc + value
		})).equal(10);
	});

	it("should properly reduce the array to a value", () => {
		expect(new BindableArray([5, 2, 8, 7, 8]).reduce({
			initial: 10,
			callback: (acc, value) => acc + value
		})).equal(40);
	});
});

describe("BindableArray.add", () => {
	it("should add a new item to the end by default", () => {
		const array = new BindableArray([5, 2, 8, 7, 8]);
		array.add(3);
		expect(array.native).eql([5, 2, 8, 7, 8, 3]);
	});

	it("should add a new item to the specified index", () => {
		const array = new BindableArray([5, 2, 8, 7, 8]);
		array.add(3, 2);
		expect(array.native).eql([5, 2, 3, 8, 7, 8]);
	});

	it("should dispatch proper messages", () => {
		const array = new BindableArray([5, 2, 8, 7, 8]);
		const messages = listen(array);
		array.add(3, 2);
		expect(messages).eql([
			["length", 5, 6],
			["splice", [5, 2, 8, 7, 8], [], [[2, [3]]]],
			["change"]
		]);
	});
});

describe("BindableArray.addAll", () => {
	it("should add new items to the end by default", () => {
		const array = new BindableArray([5, 2, 8, 7, 8]);
		array.addAll([3, 0]);
		expect(array.native).eql([5, 2, 8, 7, 8, 3, 0]);
	});

	it("should add new items to the specified index", () => {
		const array = new BindableArray([5, 2, 8, 7, 8]);
		array.addAll([3, 0], 2);
		expect(array.native).eql([5, 2, 3, 0, 8, 7, 8]);
	});

	it("should dispatch proper messages", () => {
		const array = new BindableArray([5, 2, 8, 7, 8]);
		const messages = listen(array);
		array.addAll([3, 0], 2);
		expect(messages).eql([
			["length", 5, 7],
			["splice", [5, 2, 8, 7, 8], [], [[2, [3, 0]]]],
			["change"]
		]);
	});

	it("should not change the array if the argument is empty", () => {
		const array = new BindableArray([5, 2, 8, 7, 8]);
		array.addAll([]);
		expect(array.native).eql([5, 2, 8, 7, 8]);
	});

	it("should not dispatch any messages if the argument is empty", () => {
		const array = new BindableArray([5, 2, 8, 7, 8]);
		const messages = listen(array);
		array.addAll([]);
		expect(messages).eql([]);
	});
});

describe("BindableArray.set", () => {
	it("should change the specified item", () => {
		const array = new BindableArray([5, 2, 8, 7, 8]);
		array.set(2, 3);
		expect(array.native).eql([5, 2, 3, 7, 8]);
	});

	it("should dispatch proper messages", () => {
		const array = new BindableArray([5, 2, 8, 7, 8]);
		const messages = listen(array);
		array.set(2, 3);
		expect(messages).eql([
			["replace", 2, 8, 3],
			["change"]
		]);
	});

	it("should return the old value", () => {
		const array = new BindableArray([5, 2, 8, 7, 8]);
		expect(array.set(2, 3)).equal(8);
	});

	it("should not change the array if the value is the same", () => {
		const array = new BindableArray([5, 2, 8, 7, 8]);
		array.set(2, 8);
		expect(array.native).eql([5, 2, 8, 7, 8]);
	});

	it("should not dispatch any messages if the value is the same", () => {
		const array = new BindableArray([5, 2, 8, 7, 8]);
		const messages = listen(array);
		array.set(2, 8);
		expect(messages).eql([]);
	});

	it("should return the value if it is the same", () => {
		const array = new BindableArray([5, 2, 8, 7, 8]);
		expect(array.set(2, 8)).equal(8);
	});

	it("should not destroy the value by default", () => {
		const array = new BindableArray<any>([
			newDestroyFailObject(),
			newDestroyFailObject(),
			newDestroyFailObject()
		]);
		array.set(1, newDestroyFailObject());
	});

	it("should destroy the value if owned", () => {
		let step = 0;
		const array = new BindableArray<any>([
			newDestroyFailObject(),
			newDestroyStepObject(() => ++step, 1),
			newDestroyFailObject()
		]).ownValues();
		expect(step).equal(0);
		array.set(1, newDestroyFailObject());
		expect(step).equal(1);
	});
});

describe("BindableArray.trySet", () => {
	// While set delegates its logic to trySet, it doesn't make sense to copy all tests over here.

	it("should return the old value", () => {
		const array = new BindableArray([5, 2, 8, 7, 8]);
		expect(array.trySet(2, 3)).equal(8);
	});

	it("should return undefined if the value is the same", () => {
		const array = new BindableArray([5, 2, 8, 7, 8]);
		assert.isUndefined(array.trySet(2, 8));
	});
});

describe("BindableArray.remove", () => {
	it("should remove the specified item", () => {
		const array = new BindableArray([5, 2, 8, 7, 8]);
		array.remove(2);
		expect(array.native).eql([5, 2, 7, 8]);
	});

	it("should dispatch proper messages", () => {
		const array = new BindableArray([5, 2, 8, 7, 8]);
		const messages = listen(array);
		array.remove(2);
		expect(messages).eql([
			["length", 5, 4],
			["splice", [5, 2, 8, 7, 8], [[2, [8]]], []],
			["change"]
		]);
	});

	it("should return the old value", () => {
		const array = new BindableArray([5, 2, 8, 7, 8]);
		expect(array.remove(2)).equal(8);
	});

	it("should not destroy the value by default", () => {
		const array = new BindableArray<any>([
			newDestroyFailObject(),
			newDestroyFailObject(),
			newDestroyFailObject()
		]);
		array.remove(1);
	});

	it("should destroy the value if owned", () => {
		let step = 0;
		const array = new BindableArray<any>([
			newDestroyFailObject(),
			newDestroyStepObject(() => ++step, 1),
			newDestroyFailObject()
		]).ownValues();
		expect(step).equal(0);
		array.remove(1);
		expect(step).equal(1);
	});
});

describe("BindableArray.removeAll", () => {
	it("should remove the specified item range", () => {
		const array = new BindableArray([5, 2, 8, 7, 8]);
		array.removeAll(0, 2);
		expect(array.native).eql([8, 7, 8]);
	});

	it("should dispatch proper messages", () => {
		const array = new BindableArray([5, 2, 8, 7, 8]);
		const messages = listen(array);
		array.removeAll(0, 2);
		expect(messages).eql([
			["length", 5, 3],
			["splice", [5, 2, 8, 7, 8], [[0, [5, 2]]], []],
			["change"]
		]);
	});

	it("should return the removed items", () => {
		const array = new BindableArray([5, 2, 8, 7, 8]);
		expect(array.removeAll(0, 2)).eql([5, 2]);
	});

	it("should not change the array if the count is zero", () => {
		const array = new BindableArray([5, 2, 8, 7, 8]);
		array.removeAll(2, 0);
		expect(array.native).eql([5, 2, 8, 7, 8]);
	});

	it("should not dispatch any messages if the count is zero", () => {
		const array = new BindableArray([5, 2, 8, 7, 8]);
		const messages = listen(array);
		array.removeAll(2, 0);
		expect(messages).eql([]);
	});

	it("should return an empty array if the count is zero", () => {
		const array = new BindableArray([5, 2, 8, 7, 8]);
		expect(array.removeAll(2, 0)).eql([]);
	});

	it("should not destroy the values by default", () => {
		const array = new BindableArray<any>([
			newDestroyFailObject(),
			newDestroyFailObject(),
			newDestroyFailObject(),
			newDestroyFailObject()
		]);
		array.removeAll(1, 2);
	});

	it("should destroy the values in reverse order if owned", () => {
		let step = 0;
		const array = new BindableArray<any>([
			newDestroyFailObject(),
			newDestroyStepObject(() => ++step, 2),
			newDestroyStepObject(() => ++step, 1),
			newDestroyFailObject()
		]).ownValues();
		expect(step).equal(0);
		array.removeAll(1, 2);
		expect(step).equal(2);
	});
});

describe("BindableArray.tryRemoveAll", () => {
	// While removeAll delegates its logic to tryRemoveAll, it doesn't make sense to copy all tests over here.

	it("should return the removed items", () => {
		const array = new BindableArray([5, 2, 8, 7, 8]);
		expect(array.tryRemoveAll(0, 2)).eql([5, 2]);
	});

	it("should return undefined if the count is zero", () => {
		const array = new BindableArray([5, 2, 8, 7, 8]);
		assert.isUndefined(array.tryRemoveAll(2, 0));
	});
});

describe("BindableArray.removeValues", () => {
	it("should remove the specified values", () => {
		const array = new BindableArray([5, 2, 8, 8, 7, 8, 3, 3, 8, 2, 2, 3]);
		array.removeValues([3, 8]);
		expect(array.native).eql([5, 2, 7, 2, 2]);
	});

	it("should dispatch proper messages", () => {
		const array = new BindableArray([5, 2, 8, 8, 7, 8, 3, 3, 8, 2, 2, 3]);
		const messages = listen(array);
		array.removeValues([3, 8]);
		expect(messages).eql([
			["length", 12, 5],
			["splice", [5, 2, 8, 8, 7, 8, 3, 3, 8, 2, 2, 3], [[2, [8, 8]], [5, [8, 3, 3, 8]], [11, [3]]], []],
			["change"]
		]);
	});

	it("should not change the array if the values are missing", () => {
		const array = new BindableArray([5, 2, 8, 7, 8]);
		array.removeValues([3]);
		expect(array.native).eql([5, 2, 8, 7, 8]);
	});

	it("should not dispatch any messages if the values are missing", () => {
		const array = new BindableArray([5, 2, 8, 7, 8]);
		const messages = listen(array);
		array.removeValues([3]);
		expect(messages).eql([]);
	});

	it("should not change the array if the value array is empty", () => {
		const array = new BindableArray([5, 2, 8, 7, 8]);
		array.removeValues([]);
		expect(array.native).eql([5, 2, 8, 7, 8]);
	});

	it("should not dispatch any messages if the value array is empty", () => {
		const array = new BindableArray([5, 2, 8, 7, 8]);
		const messages = listen(array);
		array.removeValues([]);
		expect(messages).eql([]);
	});

	it("should not destroy the values by default", () => {
		const objects = [
			newDestroyFailObject(),
			newDestroyFailObject(),
			newDestroyFailObject(),
			newDestroyFailObject(),
			newDestroyFailObject()
		];
		const array = new BindableArray<any>(objects.concat());
		array.removeValues([objects[1], objects[2], objects[4]]);
	});

	it("should destroy the values in reverse order if owned", () => {
		let step = 0;
		const objects = [
			newDestroyFailObject(),
			newDestroyStepObject(() => ++step, 3),
			newDestroyStepObject(() => ++step, 2),
			newDestroyFailObject(),
			newDestroyStepObject(() => ++step, 1)
		];
		const array = new BindableArray<any>(objects.concat()).ownValues();
		expect(step).equal(0);
		array.removeValues([objects[1], objects[2], objects[4]]);
		expect(step).equal(3);
	});
});

describe("BindableArray.move", () => {
	it("should move the specified item forwards", () => {
		const array = new BindableArray([5, 2, 8, 7, 8]);
		array.move(1, 3);
		expect(array.native).eql([5, 8, 7, 2, 8]);
	});

	it("should move the specified item backwards", () => {
		const array = new BindableArray([5, 2, 8, 7, 8]);
		array.move(3, 1);
		expect(array.native).eql([5, 7, 2, 8, 8]);
	});

	it("should dispatch proper messages", () => {
		const array = new BindableArray([5, 2, 8, 7, 8]);
		const messages = listen(array);
		array.move(1, 3);
		expect(messages).eql([
			["move", 1, 3, 2],
			["change"]
		]);
	});

	it("should return the moved value", () => {
		const array = new BindableArray([5, 2, 8, 7, 8]);
		expect(array.move(1, 3)).equal(2);
	});

	it("should not change the array if the index is the same", () => {
		const array = new BindableArray([5, 2, 8, 7, 8]);
		array.move(1, 1);
		expect(array.native).eql([5, 2, 8, 7, 8]);
	});

	it("should not dispatch any messages if the index is the same", () => {
		const array = new BindableArray([5, 2, 8, 7, 8]);
		const messages = listen(array);
		array.move(1, 1);
		expect(messages).eql([]);
	});

	it("should return the value if the index is the same", () => {
		const array = new BindableArray([5, 2, 8, 7, 8]);
		expect(array.move(1, 1)).equal(2);
	});

	it("should not destroy the value even if owned", () => {
		const array = new BindableArray<any>([
			newDestroyFailObject(),
			newDestroyFailObject()
		]).ownValues();
		array.move(0, 1);
	});
});

describe("BindableArray.tryMove", () => {
	// While move delegates its logic to tryMove, it doesn't make sense to copy all tests over here.

	it("should return the moved value", () => {
		const array = new BindableArray([5, 2, 8, 7, 8]);
		expect(array.tryMove(1, 3)).equal(2);
	});

	it("should return undefined if the index is the same", () => {
		const array = new BindableArray([5, 2, 8, 7, 8]);
		assert.isUndefined(array.tryMove(1, 1));
	});
});

describe("BindableArray.clear", () => {
	it("should clear the array", () => {
		const array = new BindableArray([5, 2, 8, 7, 8]);
		array.clear();
		expect(array.native).eql([]);
	});

	it("should not change the native reference", () => {
		const array = new BindableArray([5, 2, 8, 7, 8]);
		const native = array.native;
		array.clear();
		expect(array.native).equal(native);
	});

	it("should dispatch proper messages", () => {
		const array = new BindableArray([5, 2, 8, 7, 8]);
		const messages = listen(array);
		array.clear();
		expect(messages).eql([
			["length", 5, 0],
			["clear", [5, 2, 8, 7, 8]],
			["change"]
		]);
	});

	it("should return the old contents", () => {
		const array = new BindableArray([5, 2, 8, 7, 8]);
		expect(array.clear()).eql([5, 2, 8, 7, 8]);
	});

	it("should not change the array if it is empty", () => {
		const array = new BindableArray([]);
		array.clear();
		expect(array.native).eql([]);
	});

	it("should not dispatch any messages if the array is empty", () => {
		const array = new BindableArray([]);
		const messages = listen(array);
		array.clear();
		expect(messages).eql([]);
	});

	it("should return an empty array if the array is empty", () => {
		const array = new BindableArray([]);
		expect(array.clear()).eql([]);
	});

	it("should not destroy the values by default", () => {
		const array = new BindableArray<any>([
			newDestroyFailObject(),
			newDestroyFailObject(),
			newDestroyFailObject(),
			newDestroyFailObject(),
			newDestroyFailObject()
		]);
		array.clear();
	});

	it("should destroy the values in reverse order if owned", () => {
		let step = 0;
		const array = new BindableArray<any>([
			newDestroyStepObject(() => ++step, 5),
			newDestroyStepObject(() => ++step, 4),
			newDestroyStepObject(() => ++step, 3),
			newDestroyStepObject(() => ++step, 2),
			newDestroyStepObject(() => ++step, 1)
		]).ownValues();
		expect(step).equal(0);
		array.clear();
		expect(step).equal(5);
	});
});

describe("BindableArray.splice", () => {
	it("should remove and add items in middle as documented", () => {
		const array = new BindableArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);
		array.splice([
			new IndexCount(2, 2),
			new IndexCount(6, 1)
		], [ // [1, 2, 5, 6, 8, 9]
			new IndexItems(1, [10, 11]), // [1, 10, 11, 2, 5, 6, 8, 9]
			new IndexItems(5, [12, 13])  // [1, 10, 11, 2, 5, 12, 13, 6, 8, 9]
		]);
		expect(array.native).eql([1, 10, 11, 2, 5, 12, 13, 6, 8, 9]);
	});

	it("should remove and add items in front and rear as documented", () => {
		const array = new BindableArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);
		array.splice([
			new IndexCount(0, 2),
			new IndexCount(7, 2)
		], [ // [3, 4, 5, 6, 7]
			new IndexItems(0, [10, 11]), // [10, 11, 3, 4, 5, 6, 7]
			new IndexItems(7, [12, 13])  // [10, 11, 3, 4, 5, 6, 7, 12, 13]
		]);
		expect(array.native).eql([10, 11, 3, 4, 5, 6, 7, 12, 13]);
	});

	it("should dispatch proper messages", () => {
		const array = new BindableArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);
		const messages = listen(array);
		array.splice([
			new IndexCount(2, 2),
			new IndexCount(6, 1)
		], [ // [1, 2, 5, 6, 8, 9]
			new IndexItems(1, [10, 11]), // [1, 10, 11, 2, 5, 6, 8, 9]
			new IndexItems(5, [12, 13])  // [1, 10, 11, 2, 5, 12, 13, 6, 8, 9]
		]);
		expect(messages).eql([
			["length", 9, 10],
			[
				"splice",
				[1, 2, 3, 4, 5, 6, 7, 8, 9],
				[[2, [3, 4]], [6, [7]]],
				[[1, [10, 11]], [5, [12, 13]]]
			],
			["change"]
		]);
	});

	it("should return the splice result", () => {
		const array = new BindableArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);
		expect(parseSpliceResult(array.splice([
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
		const array = new BindableArray([1, 2, 3, 4, 5]);
		array.splice([], []);
		expect(array.native).eql([1, 2, 3, 4, 5]);
	});

	it("should not dispatch any messages if no segments provided", () => {
		const array = new BindableArray([]);
		const messages = listen(array);
		array.splice([], []);
		expect(messages).eql([]);
	});

	it("should return an empty splice result if no segments provided", () => {
		const array = new BindableArray([]);
		assert.isTrue(array.splice([], []).empty);
	});

	it("should ignore empty segments", () => {
		const array = new BindableArray([1, 2, 3, 4, 5]);
		const messages = listen(array);
		const result = array.splice([new IndexCount(1, 0)], [new IndexItems(1, [])]);
		expect(array.native).eql([1, 2, 3, 4, 5]);
		expect(messages).eql([]);
		assert.isTrue(result.empty);
	});

	it("should merge consequent segments", () => {
		const array = new BindableArray([1, 2, 3, 4, 5]);
		const messages = listen(array);
		array.splice(
			[new IndexCount(1, 1), new IndexCount(2, 1)],
			[new IndexItems(1, [6]), new IndexItems(2, [7])]);
		expect(array.native).eql([1, 6, 7, 4, 5]);
		expect(messages).eql([
			["splice", [1, 2, 3, 4, 5], [[1, [2, 3]]], [[1, [6, 7]]]],
			["change"]
		]);
	});

	it("should not destroy the values by default", () => {
		const array = new BindableArray<any>([
			newDestroyFailObject(),
			newDestroyFailObject(),
			newDestroyFailObject(),
			newDestroyFailObject(),
			newDestroyFailObject()
		]);
		array.splice([new IndexCount(1, 2), new IndexCount(4, 1)], [new IndexItems(1, [newDestroyFailObject()])]);
	});

	it("should destroy the values in reverse order if owned", () => {
		let step = 0;
		const array = new BindableArray<any>([
			newDestroyFailObject(),
			newDestroyStepObject(() => ++step, 3),
			newDestroyStepObject(() => ++step, 2),
			newDestroyFailObject(),
			newDestroyStepObject(() => ++step, 1)
		]).ownValues();
		expect(step).equal(0);
		array.splice([new IndexCount(1, 2), new IndexCount(4, 1)], [new IndexItems(1, [newDestroyFailObject()])]);
		expect(step).equal(3);
	});
});

describe("BindableArray.trySplice", () => {
	it("should return the splice result", () => {
		const array = new BindableArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);
		expect(parseSpliceResult(array.trySplice([
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

	it("should return undefined if no segments provided", () => {
		const array = new BindableArray([]);
		assert.isUndefined(array.trySplice([], []));
	});

	it("should return undefined if only empty segments are provided", () => {
		const array = new BindableArray([1, 2, 3, 4, 5]);
		assert.isUndefined(array.trySplice([new IndexCount(1, 0)], [new IndexItems(1, [])]));
	});
});

describe("BindableArray.reorder", () => {
	it("should reorder array items", () => {
		const array = new BindableArray([5, 2, 8, 7, 8]);
		array.reorder([2, 4, 3, 0, 1]);
		expect(array.native).eql([7, 8, 5, 8, 2]);
	});

	it("should dispatch proper messages", () => {
		const array = new BindableArray([5, 2, 8, 7, 8]);
		const messages = listen(array);
		array.reorder([2, 4, 3, 0, 1]);
		expect(messages).eql([
			["reorder", [5, 2, 8, 7, 8], [2, 4, 3, 0, 1]],
			["change"]
		]);
	});

	it("should not change the array if empty", () => {
		const array = new BindableArray([]);
		array.reorder([]);
		expect(array.native).eql([]);
	});

	it("should not dispatch any messages if empty", () => {
		const array = new BindableArray([]);
		const messages = listen(array);
		array.reorder([]);
		expect(messages).eql([]);
	});

	it("should not change the array if the indexes are identical", () => {
		const array = new BindableArray([5, 2, 8, 7, 8]);
		array.reorder([0, 1, 2, 3, 4]);
		expect(array.native).eql([5, 2, 8, 7, 8]);
	});

	it("should not dispatch any messages if the indexes are identical", () => {
		const array = new BindableArray([5, 2, 8, 7, 8]);
		const messages = listen(array);
		array.reorder([0, 1, 2, 3, 4]);
		expect(messages).eql([]);
	});

	it("should not destroy the values even if owned", () => {
		const array = new BindableArray<any>([
			newDestroyFailObject(),
			newDestroyFailObject(),
			newDestroyFailObject(),
			newDestroyFailObject(),
			newDestroyFailObject()
		]).ownValues();
		array.reorder([2, 4, 3, 0, 1]);
	});
});

describe("BindableArray.tryReorder", () => {
	// While reorder delegates its logic to tryReorder, it doesn't make sense to copy all tests over here.

	it("should return old array contents", () => {
		const array = new BindableArray([5, 2, 8, 7, 8]);
		expect(array.tryReorder([2, 4, 3, 0, 1])).eql([5, 2, 8, 7, 8]);
	});

	it("should return undefined if empty", () => {
		const array = new BindableArray([]);
		assert.isUndefined(array.tryReorder([]));
	});

	it("should return undefined if the indexes are identical", () => {
		const array = new BindableArray([5, 2, 8, 7, 8]);
		assert.isUndefined(array.tryReorder([0, 1, 2, 3, 4]));
	});
});

describe("BindableArray.detectSplice", () => {
	it("should infer proper splice parameters", () => {
		const array = new BindableArray([1, 2, 3, 4, 5, 6]);
		expect(parseSpliceParams(array.detectSplice([7, 8, 10, 1, 4, 9]))).eql([
			[[1, 2], [4, 2]],
			[[0, [7, 8, 10]], [5, [9]]]
		]);
	});

	it("should not change the array", () => {
		const array = new BindableArray([1, 2, 3, 4, 5, 6]);
		array.detectSplice([7, 8, 10, 1, 4, 9]);
		expect(array.native).eql([1, 2, 3, 4, 5, 6]);
	});

	it("should return undefined if the array is empty", () => {
		const array = new BindableArray([]);
		assert.isUndefined(array.detectSplice([]));
	});

	it("should return undefined if the contents are identical", () => {
		const array = new BindableArray([1, 2, 3, 4, 5, 6]);
		assert.isUndefined(array.detectSplice([1, 2, 3, 4, 5, 6]));
	});
});

describe("BindableArray.detectFilter", () => {
	it("should infer proper segments to remove", () => {
		const array = new BindableArray([1, 2, 3, 4, 5, 6]);
		expect(array.detectFilter([1, 4]).map(segment => [segment.index, segment.count]))
			.eql([[1, 2], [4, 2]]);
	});

	it("should not change the array", () => {
		const array = new BindableArray([1, 2, 3, 4, 5, 6]);
		array.detectFilter([1, 4]);
		expect(array.native).eql([1, 2, 3, 4, 5, 6]);
	});

	it("should return undefined if the array is empty", () => {
		const array = new BindableArray([]);
		assert.isUndefined(array.detectFilter([]));
	});

	it("should return undefined if the contents are identical", () => {
		const array = new BindableArray([1, 2, 3, 4, 5, 6]);
		assert.isUndefined(array.detectFilter([1, 2, 3, 4, 5, 6]));
	});

	it("should support duplicating values and pick the leftmost ones", () => {
		const array = new BindableArray([1, 2, 1, 3, 4, 4, 5, 6, 1]);
		expect(array.detectFilter([1, 4, 4]).map(segment => [segment.index, segment.count]))
			.eql([[1, 3], [6, 3]]);
	});
});

describe("BindableArray.detectReorder", () => {
	it("should infer a proper index array", () => {
		const array = new BindableArray([1, 2, 3, 4, 5, 6]);
		expect(array.detectReorder([5, 2, 1, 6, 3, 4])).eql([2, 1, 4, 5, 0, 3]);
	});

	it("should not change the array", () => {
		const array = new BindableArray([1, 2, 3, 4, 5, 6]);
		array.detectReorder([5, 2, 1, 6, 3, 4]);
		expect(array.native).eql([1, 2, 3, 4, 5, 6]);
	});

	it("should return undefined if the array is empty", () => {
		const array = new BindableArray([]);
		assert.isUndefined(array.detectReorder([]));
	});

	it("should return undefined if the contents are identical", () => {
		const array = new BindableArray([1, 2, 3, 4, 5, 6]);
		assert.isUndefined(array.detectReorder([1, 2, 3, 4, 5, 6]));
	});
});

describe("BindableArray.detectSort", () => {
	it("should return a proper index array by default", () => {
		const array = new BindableArray([5, 2, 1, 6, 3, 4]);
		expect(array.detectSort()).eql([4, 1, 0, 5, 2, 3]);
	});

	it("should return a proper index array by callback", () => {
		const array = new BindableArray([1, 2, 3, 4, 5, 6]);
		expect(array.detectSort(x => -x)).eql([5, 4, 3, 2, 1, 0]);
	});

	it("should return a proper index array by order", () => {
		const array = new BindableArray([1, 2, 3, 4, 5, 6]);
		expect(array.detectSort(undefined, -1)).eql([5, 4, 3, 2, 1, 0]);
	});

	it("should return a proper index array by callback and order", () => {
		const array = new BindableArray([5, 2, 1, 6, 3, 4]);
		expect(array.detectSort(x => -x, -1)).eql([4, 1, 0, 5, 2, 3]);
	});

	it("should not change the array", () => {
		const array = new BindableArray([5, 2, 1, 6, 3, 4]);
		array.detectSort();
		expect(array.native).eql([5, 2, 1, 6, 3, 4]);
	});

	it("should return undefined if the array is empty", () => {
		const array = new BindableArray([]);
		assert.isUndefined(array.detectSort());
	});

	it("should return undefined if the order stays the same", () => {
		const array = new BindableArray([1, 2, 3, 4, 5, 6]);
		assert.isUndefined(array.detectSort(x => -x, -1));
	});
});

describe("BindableArray.detectSortComparing", () => {
	it("should return a proper index array by default", () => {
		const array = new BindableArray([5, 2, 1, 6, 3, 4]);
		expect(array.detectSortComparing()).eql([4, 1, 0, 5, 2, 3]);
	});

	it("should return a proper index array by callback", () => {
		const array = new BindableArray([1, 2, 3, 4, 5, 6]);
		expect(array.detectSortComparing((x, y) => y - x)).eql([5, 4, 3, 2, 1, 0]);
	});

	it("should return a proper index array by order", () => {
		const array = new BindableArray([1, 2, 3, 4, 5, 6]);
		expect(array.detectSortComparing(undefined, -1)).eql([5, 4, 3, 2, 1, 0]);
	});

	it("should return a proper index array by callback and order", () => {
		const array = new BindableArray([5, 2, 1, 6, 3, 4]);
		expect(array.detectSortComparing((x, y) => y - x, -1)).eql([4, 1, 0, 5, 2, 3]);
	});

	it("should not change the array", () => {
		const array = new BindableArray([5, 2, 1, 6, 3, 4]);
		array.detectSortComparing();
		expect(array.native).eql([5, 2, 1, 6, 3, 4]);
	});

	it("should return undefined if the array is empty", () => {
		const array = new BindableArray([]);
		assert.isUndefined(array.detectSortComparing());
	});

	it("should return undefined if the order stays the same", () => {
		const array = new BindableArray([1, 2, 3, 4, 5, 6]);
		assert.isUndefined(array.detectSortComparing((x, y) => y - x, -1));
	});
});

describe("BindableArray.performSplice", () => {
	it("should update the array contents", () => {
		const array = new BindableArray([1, 2, 3, 4, 5, 6]);
		array.performSplice([7, 8, 10, 1, 4, 9]);
		expect(array.native).eql([7, 8, 10, 1, 4, 9]);
	});

	it("should dispatch proper messages", () => {
		const array = new BindableArray([1, 2, 3, 4, 5, 6]);
		const messages = listen(array);
		array.performSplice([7, 8, 10, 1, 4, 9]);
		expect(messages).eql([
			["splice", [1, 2, 3, 4, 5, 6], [[1, [2, 3]], [4, [5, 6]]], [[0, [7, 8, 10]], [5, [9]]]],
			["change"]
		]);
	});

	it("should not dispatch any messages if the array is empty", () => {
		const array = new BindableArray([]);
		const messages = listen(array);
		array.performSplice([]);
		expect(messages).eql([]);
	});

	it("should not dispatch any messages if the contents are identical", () => {
		const array = new BindableArray([1, 2, 3, 4, 5, 6]);
		const messages = listen(array);
		array.performSplice([1, 2, 3, 4, 5, 6]);
		expect(messages).eql([]);
	});

	it("should not destroy the values by default", () => {
		const array = new BindableArray<any>([
			newDestroyFailObject(),
			newDestroyFailObject(),
			newDestroyFailObject(),
			newDestroyFailObject(),
			newDestroyFailObject()
		]);
		array.performSplice([
			array.get(0),
			newDestroyFailObject(),
			newDestroyFailObject(),
			array.get(3)
		]);
	});

	it("should destroy the values in reverse order if owned", () => {
		let step = 0;
		const array = new BindableArray<any>([
			newDestroyFailObject(),
			newDestroyStepObject(() => ++step, 3),
			newDestroyStepObject(() => ++step, 2),
			newDestroyFailObject(),
			newDestroyStepObject(() => ++step, 1)
		]).ownValues();
		expect(step).equal(0);
		array.performSplice([
			array.get(0),
			newDestroyFailObject(),
			newDestroyFailObject(),
			array.get(3)
		]);
		expect(step).equal(3);
	});
});

describe("BindableArray.performFilter", () => {
	it("should update the array contents", () => {
		const array = new BindableArray([1, 2, 3, 4, 5, 6]);
		array.performFilter([1, 4]);
		expect(array.native).eql([1, 4]);
	});

	it("should dispatch proper messages", () => {
		const array = new BindableArray([1, 2, 3, 4, 5, 6]);
		const messages = listen(array);
		array.performFilter([1, 4]);
		expect(messages).eql([
			["length", 6, 2],
			["splice", [1, 2, 3, 4, 5, 6], [[1, [2, 3]], [4, [5, 6]]], []],
			["change"]
		]);
	});

	it("should not dispatch any messages if the array is empty", () => {
		const array = new BindableArray([]);
		const messages = listen(array);
		array.performFilter([]);
		expect(messages).eql([]);
	});

	it("should not dispatch any messages if the contents are identical", () => {
		const array = new BindableArray([1, 2, 3, 4, 5, 6]);
		const messages = listen(array);
		array.performFilter([1, 2, 3, 4, 5, 6]);
		expect(messages).eql([]);
	});

	it("should support duplicating values and pick the leftmost ones", () => {
		const array = new BindableArray([1, 2, 1, 3, 4, 4, 5, 6, 1]);
		const messages = listen(array);
		array.performFilter([1, 4, 4]);
		expect(messages).eql([
			["length", 9, 3],
			["splice", [1, 2, 1, 3, 4, 4, 5, 6, 1], [[1, [2, 1, 3]], [6, [5, 6, 1]]], []],
			["change"]
		])
	});

	it("should not destroy the values by default", () => {
		const array = new BindableArray<any>([
			newDestroyFailObject(),
			newDestroyFailObject(),
			newDestroyFailObject(),
			newDestroyFailObject(),
			newDestroyFailObject()
		]);
		array.performFilter([
			array.get(0),
			array.get(3)
		]);
	});

	it("should destroy the values in reverse order if owned", () => {
		let step = 0;
		const array = new BindableArray<any>([
			newDestroyFailObject(),
			newDestroyStepObject(() => ++step, 3),
			newDestroyStepObject(() => ++step, 2),
			newDestroyFailObject(),
			newDestroyStepObject(() => ++step, 1)
		]).ownValues();
		expect(step).equal(0);
		array.performFilter([
			array.get(0),
			array.get(3)
		]);
		expect(step).equal(3);
	});
});

describe("BindableArray.performReorder", () => {
	it("should update the array contents", () => {
		const array = new BindableArray([1, 2, 3, 4, 5, 6]);
		array.performReorder([5, 2, 1, 6, 3, 4]);
		expect(array.native).eql([5, 2, 1, 6, 3, 4]);
	});

	it("should dispatch proper messages", () => {
		const array = new BindableArray([1, 2, 3, 4, 5, 6]);
		const messages = listen(array);
		array.performReorder([5, 2, 1, 6, 3, 4])
		expect(messages).eql([
			["reorder", [1, 2, 3, 4, 5, 6], [2, 1, 4, 5, 0, 3]],
			["change"]
		]);
	});

	it("should not dispatch any messages if the array is empty", () => {
		const array = new BindableArray([]);
		const messages = listen(array);
		array.performReorder([]);
		expect(messages).eql([]);
	});

	it("should not dispatch any messages if the contents are identical", () => {
		const array = new BindableArray([1, 2, 3, 4, 5, 6]);
		const messages = listen(array);
		array.performReorder([1, 2, 3, 4, 5, 6]);
		expect(messages).eql([]);
	});

	it("should not destroy the values even if owned", () => {
		const array = new BindableArray<any>([
			newDestroyFailObject(),
			newDestroyFailObject(),
			newDestroyFailObject(),
			newDestroyFailObject(),
			newDestroyFailObject()
		]);
		array.reorder([2, 4, 3, 0, 1]);
	});
});

describe("BindableArray.sort", () => {
	it("should sort the array by default", () => {
		const array = new BindableArray([5, 2, 1, 6, 3, 4]);
		array.sort();
		expect(array.native).eql([1, 2, 3, 4, 5, 6])
	});

	it("should sort the array by callback", () => {
		const array = new BindableArray([1, 2, 3, 4, 5, 6]);
		array.sort(x => -x);
		expect(array.native).eql([6, 5, 4, 3, 2, 1]);
	});

	it("should sort the array by order", () => {
		const array = new BindableArray([1, 2, 3, 4, 5, 6]);
		array.sort(undefined, -1);
		expect(array.native).eql([6, 5, 4, 3, 2, 1]);
	});

	it("should sort the array by callback and order", () => {
		const array = new BindableArray([5, 2, 1, 6, 3, 4]);
		array.sort(x => -x, -1);
		expect(array.native).eql([1, 2, 3, 4, 5, 6])
	});

	it("should dispatch proper messages by default", () => {
		const array = new BindableArray([5, 2, 1, 6, 3, 4]);
		const messages = listen(array);
		array.sort();
		expect(messages).eql([
			["reorder", [5, 2, 1, 6, 3, 4], [4, 1, 0, 5, 2, 3]],
			["change"]
		]);
	});

	it("should dispatch proper messages by callback", () => {
		const array = new BindableArray([1, 2, 3, 4, 5, 6]);
		const messages = listen(array);
		array.sort(x => -x)
		expect(messages).eql([
			["reorder", [1, 2, 3, 4, 5, 6], [5, 4, 3, 2, 1, 0]],
			["change"]
		]);
	});

	it("should dispatch proper messages by order", () => {
		const array = new BindableArray([1, 2, 3, 4, 5, 6]);
		const messages = listen(array);
		array.sort(undefined, -1)
		expect(messages).eql([
			["reorder", [1, 2, 3, 4, 5, 6], [5, 4, 3, 2, 1, 0]],
			["change"]
		]);
	});

	it("should dispatch proper messages by callback and order", () => {
		const array = new BindableArray([5, 2, 1, 6, 3, 4]);
		const messages = listen(array);
		array.sort(x => -x, -1)
		expect(messages).eql([
			["reorder", [5, 2, 1, 6, 3, 4], [4, 1, 0, 5, 2, 3]],
			["change"]
		]);
	});

	it("should not dispatch any messages if the array is empty", () => {
		const array = new BindableArray([]);
		const messages = listen(array);
		array.sort();
		expect(messages).eql([]);
	});

	it("should not dispatch any messages if the order stays the same", () => {
		const array = new BindableArray([1, 2, 3, 4, 5, 6]);
		const messages = listen(array);
		array.sort(x => -x, -1);
		expect(messages).eql([]);
	});
});

describe("BindableArray.sortComparing", () => {
	it("should sort the array by default", () => {
		const array = new BindableArray([5, 2, 1, 6, 3, 4]);
		array.sortComparing();
		expect(array.native).eql([1, 2, 3, 4, 5, 6])
	});

	it("should sort the array by callback", () => {
		const array = new BindableArray([1, 2, 3, 4, 5, 6]);
		array.sortComparing((x, y) => y - x);
		expect(array.native).eql([6, 5, 4, 3, 2, 1]);
	});

	it("should sort the array by order", () => {
		const array = new BindableArray([1, 2, 3, 4, 5, 6]);
		array.sortComparing(undefined, -1);
		expect(array.native).eql([6, 5, 4, 3, 2, 1]);
	});

	it("should sort the array by callback and order", () => {
		const array = new BindableArray([5, 2, 1, 6, 3, 4]);
		array.sortComparing((x, y) => y - x, -1);
		expect(array.native).eql([1, 2, 3, 4, 5, 6])
	});

	it("should dispatch proper messages by default", () => {
		const array = new BindableArray([5, 2, 1, 6, 3, 4]);
		const messages = listen(array);
		array.sortComparing();
		expect(messages).eql([
			["reorder", [5, 2, 1, 6, 3, 4], [4, 1, 0, 5, 2, 3]],
			["change"]
		]);
	});

	it("should dispatch proper messages by callback", () => {
		const array = new BindableArray([1, 2, 3, 4, 5, 6]);
		const messages = listen(array);
		array.sortComparing((x, y) => y - x)
		expect(messages).eql([
			["reorder", [1, 2, 3, 4, 5, 6], [5, 4, 3, 2, 1, 0]],
			["change"]
		]);
	});

	it("should dispatch proper messages by order", () => {
		const array = new BindableArray([1, 2, 3, 4, 5, 6]);
		const messages = listen(array);
		array.sortComparing(undefined, -1)
		expect(messages).eql([
			["reorder", [1, 2, 3, 4, 5, 6], [5, 4, 3, 2, 1, 0]],
			["change"]
		]);
	});

	it("should dispatch proper messages by callback and order", () => {
		const array = new BindableArray([5, 2, 1, 6, 3, 4]);
		const messages = listen(array);
		array.sortComparing((x, y) => y - x, -1)
		expect(messages).eql([
			["reorder", [5, 2, 1, 6, 3, 4], [4, 1, 0, 5, 2, 3]],
			["change"]
		]);
	});

	it("should not dispatch any messages if the array is empty", () => {
		const array = new BindableArray([]);
		const messages = listen(array);
		array.sortComparing();
		expect(messages).eql([]);
	});

	it("should not dispatch any messages if the order stays the same", () => {
		const array = new BindableArray([1, 2, 3, 4, 5, 6]);
		const messages = listen(array);
		array.sortComparing((x, y) => y - x, -1);
		expect(messages).eql([]);
	});
});

describe("BindableArray.reverse", () => {
	it("should update the array contents", () => {
		const array = new BindableArray([1, 2, 3, 4]);
		array.reverse();
		expect(array.native).eql([4, 3, 2, 1])
	});

	it("should dispatch proper messages", () => {
		const array = new BindableArray([1, 2, 3, 4]);
		const messages = listen(array);
		array.reverse();
		expect(messages).eql([
			["reorder", [1, 2, 3, 4], [3, 2, 1, 0]],
			["change"]
		]);
	});

	it("should not dispatch any messages if the array is empty", () => {
		const array = new BindableArray([]);
		const messages = listen(array);
		array.reverse();
		expect(messages).eql([]);
	});

	it("should not dispatch any messages if the array contains only one item", () => {
		const array = new BindableArray([1]);
		const messages = listen(array);
		array.reverse();
		expect(messages).eql([]);
	});
});

function listen(array: BindableArray<any>) {
	const result: any[] = [];
	array.onSplice.listen(spliceResult => {
		result.push(["splice", ...parseSpliceResult(spliceResult)]);
	});
	array.onReplace.listen(message => {
		result.push(["replace", message.index, message.oldValue, message.newValue]);
	});
	array.onMove.listen(message => {
		result.push(["move", message.fromIndex, message.toIndex, message.value]);
	});
	array.onReorder.listen(message => {
		result.push(["reorder", message.oldContents, message.indexMapping]);
	});
	array.onClear.listen(oldContents => {
		result.push(["clear", oldContents]);
	});
	array.onChange.listen(() => {
		result.push(["change"]);
	});
	array.length.onChange.listen(message => {
		result.push(["length", message.oldValue, message.value]);
	});
	return result;
}

function parseSpliceParams(spliceParams: IBindableArray.SpliceParams<any>) {
	return [
		spliceParams.segmentsToRemove.map(segment => [segment.index, segment.count]),
		spliceParams.segmentsToAdd.map(segment => [segment.index, segment.items])
	];
}

function parseSpliceResult(spliceResult: IBindableArray.SpliceResult<any>) {
	return [
		spliceResult.oldContents,
		spliceResult.removedSegments.map(segment => [segment.index, segment.items]),
		spliceResult.addedSegments.map(segment => [segment.index, segment.items])
	];
}

function newDestroyFailObject() {
	return {
		destroy: () => {
			assert.fail();
		}
	};
}

function newDestroyStepObject(postIncrement: () => number, expectedValue: number) {
	return {
		destroy: () => {
			expect(postIncrement()).equal(expectedValue);
		}
	};
}
