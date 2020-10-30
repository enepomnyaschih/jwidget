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
import BindableSet from "jwidget/BindableSet";
import IBindableSet from "jwidget/IBindableSet";

describe("new BindableSet", () => {
	it("should assign silent flag properly", () => {
		expect(new BindableSet().silent).equal(false);
		expect(new BindableSet(true).silent).equal(true);
		expect(new BindableSet([]).silent).equal(false);
		expect(new BindableSet([], true).silent).equal(true);
	});

	it("should contain a native set", () => {
		assert.isTrue(new BindableSet().native instanceof Set);
		assert.isTrue(new BindableSet(true).native instanceof Set);
		assert.isTrue(new BindableSet([]).native instanceof Set);
		assert.isTrue(new BindableSet([], true).native instanceof Set);
	});

	it("should create a new array", () => {
		const input: any[] = [];
		expect(new BindableSet(input).native).not.equal(input);
		expect(new BindableSet(input, true).native).not.equal(input);
	});
});

describe("BindableSet.size", () => {
	it("should not be silent for a non-silent set", () => {
		expect(new BindableSet().size.silent).equal(false);
	});

	it("should be silent for a silent set", () => {
		expect(new BindableSet(true).size.silent).equal(true);
	});

	it("should be zero for an empty set", () => {
		expect(new BindableSet().size.get()).equal(0);
	});

	it("should return number of items for a non-empty set", () => {
		expect(new BindableSet([1, 2, 3, 4, 5]).size.get()).equal(5);
	});

	// ... all tests for reaction to concrete mutation methods are among tests for those methods
});

describe("BindableSet.destroy", () => {
	it("should clear the set", () => {
		const set = new BindableSet([1, 2, 3, 4, 5]);
		const messages = listen(set);
		set.destroy();
		expect(normalizeValues(set.native)).eql([]);
		expect(set.size.get()).eql(0);
		expect(messages).eql([
			["size", 5, 0],
			["clear", [1, 2, 3, 4, 5]],
			["change"]
		]);
	});

	it("should not destroy items if not owned", () => {
		const set = new BindableSet([
			newDestroyFailObject(),
			newDestroyFailObject()
		]);
		set.destroy();
	});

	it("should destroy all items in direct order if owned", () => {
		const container = new Set<number>();
		const set = new BindableSet([
			newDestroyStepObject(container, 1),
			newDestroyStepObject(container, 2)
		]).ownValues();
		expect(normalizeValues(container)).eql([]);
		set.destroy();
		expect(normalizeValues(container)).eql([1, 2]);
	});
});

describe("BindableSet[Symbol.iterator]", () => {
	it("should support empty sets", () => {
		const set = new BindableSet();
		for (let _value of set) {
			assert.fail();
		}
	});

	it("should iterate through values", () => {
		const input = [1, 2, 3, 4, 5];
		const set = new BindableSet(input);
		let i = 0;
		for (let value of set) {
			expect(value).equal(input[i++]);
		}
		expect(i).equal(5);
	});
});

// ... testing methods-delegators any further would just be testing of the native Set methods. Skipping...

describe("BindableSet.add", () => {
	it("should add the value if absent", () => {
		const set = new BindableSet([1, 2, 3, 4, 5]);
		set.add(6);
		expect(normalizeValues(set.native)).eql([1, 2, 3, 4, 5, 6]);
	});

	it("should dispatch proper messages", () => {
		const set = new BindableSet([1, 2, 3, 4, 5]);
		const messages = listen(set);
		set.add(6);
		expect(messages).eql([
			["size", 5, 6],
			["splice", [], [6]],
			["change"]
		]);
	});

	it("should return true if absent", () => {
		const set = new BindableSet([1, 2, 3, 4, 5]);
		assert.isTrue(set.add(6));
	});

	it("should not add the value if present", () => {
		const set = new BindableSet([1, 2, 3, 4, 5]);
		set.add(3);
		expect(normalizeValues(set.native)).eql([1, 2, 3, 4, 5]);
	});

	it("should not dispatch any messages if present", () => {
		const set = new BindableSet([1, 2, 3, 4, 5]);
		const messages = listen(set);
		set.add(3);
		expect(messages).eql([]);
	});

	it("should return false if present", () => {
		const set = new BindableSet([1, 2, 3, 4, 5]);
		assert.isFalse(set.add(3));
	});
});

describe("BindableSet.addAll", () => {
	it("should add the absent values and ignore the present values", () => {
		const set = new BindableSet([1, 2, 3, 4, 5]);
		set.addAll([2, 3, 6, 7]);
		expect(normalizeValues(set.native)).eql([1, 2, 3, 4, 5, 6, 7]);
	});

	it("should dispatch proper messages", () => {
		const set = new BindableSet([1, 2, 3, 4, 5]);
		const messages = listen(set);
		set.addAll([2, 3, 6, 7]);
		expect(messages).eql([
			["size", 5, 7],
			["splice", [], [6, 7]],
			["change"]
		]);
	});

	it("should return the absent values", () => {
		const set = new BindableSet([1, 2, 3, 4, 5]);
		expect(normalizeValues(set.addAll([2, 3, 6, 7]))).eql([6, 7]);
	});

	it("should not dispatch any messages if all values are present", () => {
		const set = new BindableSet([1, 2, 3, 4, 5]);
		const messages = listen(set);
		set.addAll([2, 3]);
		expect(messages).eql([]);
	});

	it("should return an empty set if all values are present", () => {
		const set = new BindableSet([1, 2, 3, 4, 5]);
		expect(normalizeValues(set.addAll([2, 3]))).eql([]);
	});
});

describe("BindableSet.tryAddAll", () => {
	it("should return the absent values", () => {
		const set = new BindableSet([1, 2, 3, 4, 5]);
		expect(normalizeValues(set.tryAddAll([2, 3, 6, 7]))).eql([6, 7]);
	});

	it("should return undefined if all values are present", () => {
		const set = new BindableSet([1, 2, 3, 4, 5]);
		assert.isUndefined(set.tryAddAll([2, 3]));
	});
});

describe("BindableSet.delete", () => {
	it("should delete the value if present", () => {
		const set = new BindableSet([1, 2, 3, 4, 5]);
		set.delete(3);
		expect(normalizeValues(set.native)).eql([1, 2, 4, 5]);
	});

	it("should dispatch proper messages", () => {
		const set = new BindableSet([1, 2, 3, 4, 5]);
		const messages = listen(set);
		set.delete(3);
		expect(messages).eql([
			["size", 5, 4],
			["splice", [3], []],
			["change"]
		]);
	});

	it("should return true if present", () => {
		const set = new BindableSet([1, 2, 3, 4, 5]);
		assert.isTrue(set.delete(3));
	});

	it("should not delete the value if absent", () => {
		const set = new BindableSet([1, 2, 3, 4, 5]);
		set.delete(6);
		expect(normalizeValues(set.native)).eql([1, 2, 3, 4, 5]);
	});

	it("should not dispatch any messages if absent", () => {
		const set = new BindableSet([1, 2, 3, 4, 5]);
		const messages = listen(set);
		set.delete(6);
		expect(messages).eql([]);
	});

	it("should return false if absent", () => {
		const set = new BindableSet([1, 2, 3, 4, 5]);
		assert.isFalse(set.delete(6));
	});
});

describe("BindableSet.deleteAll", () => {
	it("should delete the present values and ignore the absent values", () => {
		const set = new BindableSet([1, 2, 3, 4, 5]);
		set.deleteAll([2, 3, 6, 7]);
		expect(normalizeValues(set.native)).eql([1, 4, 5]);
	});

	it("should dispatch proper messages", () => {
		const set = new BindableSet([1, 2, 3, 4, 5]);
		const messages = listen(set);
		set.deleteAll([2, 3, 6, 7]);
		expect(messages).eql([
			["size", 5, 3],
			["splice", [2, 3], []],
			["change"]
		]);
	});

	it("should return the present values", () => {
		const set = new BindableSet([1, 2, 3, 4, 5]);
		expect(normalizeValues(set.deleteAll([2, 3, 6, 7]))).eql([2, 3]);
	});

	it("should not dispatch any messages if all values are absent", () => {
		const set = new BindableSet([1, 2, 3, 4, 5]);
		const messages = listen(set);
		set.deleteAll([6, 7]);
		expect(messages).eql([]);
	});

	it("should return an empty set if all values are absent", () => {
		const set = new BindableSet([1, 2, 3, 4, 5]);
		expect(normalizeValues(set.deleteAll([6, 7]))).eql([]);
	});
});

describe("BindableSet.tryDeleteAll", () => {
	it("should return the present values", () => {
		const set = new BindableSet([1, 2, 3, 4, 5]);
		expect(normalizeValues(set.tryDeleteAll([2, 3, 6, 7]))).eql([2, 3]);
	});

	it("should return undefined if all values are absent", () => {
		const set = new BindableSet([1, 2, 3, 4, 5]);
		assert.isUndefined(set.tryDeleteAll([6, 7]));
	});
});

function listen(set: BindableSet<any>) {
	const result: any[] = [];
	set.onSplice.listen(spliceResult => {
		result.push(["splice", ...parseSpliceResult(spliceResult)]);
	});
	set.onClear.listen(oldContents => {
		result.push(["clear", normalizeValues(oldContents)]);
	});
	set.onChange.listen(() => {
		result.push(["change"]);
	});
	set.size.onChange.listen(message => {
		result.push(["size", message.oldValue, message.value]);
	});
	return result;
}

// function parseSpliceParams<T>(spliceParams: IBindableSet.SpliceParams<T>) {
// 	return [
// 		normalizeValues(spliceParams.valuesToRemove),
// 		normalizeValues(spliceParams.valuesToAdd)
// 	];
// }

function parseSpliceResult<T>(spliceResult: IBindableSet.SpliceResult<T>) {
	return [
		normalizeValues(spliceResult.removedValues),
		normalizeValues(spliceResult.addedValues)
	];
}

function normalizeValues<T>(values: Iterable<T>) {
	return Array.from(values).sort();
}

function newDestroyFailObject() {
	return {
		destroy: () => {
			assert.fail();
		}
	};
}

function newDestroyStepObject<T>(container: Set<T>, value: T) {
	return {
		destroy: () => {
			assert.isFalse(container.has(value));
			container.add(value);
		}
	};
}
