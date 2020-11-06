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
import ArrayMerger, {startMergingArrays} from "jwidget/collection/ArrayMerger";
import IBindableArray from "jwidget/IBindableArray";
import IndexCount from "jwidget/IndexCount";
import IndexItems from "jwidget/IndexItems";
import Listenable from "jwidget/Listenable";
import ReadonlyBindableArray from "jwidget/ReadonlyBindableArray";

describe("startMergingArrays", () => {
	it("should create a new array", () => {
		const source = new BindableArray<BindableArray<number>>();
		const target = startMergingArrays(source);
		assert.isTrue(target instanceof BindableArray);
		expect(target).not.equal(source);
		expect(target.native).not.equal(source.native);
	});

	it("should fill the target initially", () => {
		const source = new BindableArray([
			new BindableArray([1, 2]),
			new BindableArray<number>(),
			new BindableArray([3, 4, 5]),
			new BindableArray([6])
		]);
		const target = startMergingArrays(source);
		expect(target.native).eql([1, 2, 3, 4, 5, 6]);
	});

	it("should handle parent splice message", () => {
		const source = new BindableArray([
			new BindableArray([1, 2]),
			new BindableArray<number>(),
			new BindableArray([3, 4, 5]),
			new BindableArray([6])
		]);
		const target = startMergingArrays(source);
		const messages = listen(target);
		source.splice(
			[new IndexCount(0, 2), new IndexCount(3, 1)], // [3, 4, 5]
			[
				new IndexItems(0, [
					new BindableArray([7, 8]),
					new BindableArray<number>([9])
				]),
				new IndexItems(3, [
					new BindableArray([10]),
					new BindableArray([]),
					new BindableArray([11, 12, 13])
				])
			]); // [7, 8], [9], [3, 4, 5], [10], [], [11, 12, 13]
		expect(target.native).eql([7, 8, 9, 3, 4, 5, 10, 11, 12, 13]);
		expect(messages).eql([
			["length", 6, 10],
			["splice", [1, 2, 3, 4, 5, 6], [[0, [1, 2]], [5, [6]]], [[0, [7, 8, 9]], [6, [10, 11, 12, 13]]]],
			["change"]
		]);
	});

	it("should handle child splice message", () => {
		const source = new BindableArray([
			new BindableArray([1, 2]),
			new BindableArray<number>(),
			new BindableArray([3, 4, 5]),
			new BindableArray([6])
		]);
		const target = startMergingArrays(source);
		const messages = listen(target);
		source.get(2).splice(
			[new IndexCount(1, 1)], // [1, 2], [], [3, 5], [6]
			[new IndexItems(0, [7, 8]), new IndexItems(3, [9])]); // [1, 2], [], [7, 8, 3, 9, 5], [6]
		expect(target.native).eql([1, 2, 7, 8, 3, 9, 5, 6]);
		expect(messages).eql([
			["length", 6, 8],
			["splice", [1, 2, 3, 4, 5, 6], [[3, [4]]], [[2, [7, 8]], [5, [9]]]],
			["change"]
		]);
	});

	it("should handle parent replace message", () => {
		const source = new BindableArray([
			new BindableArray([1, 2]),
			new BindableArray<number>(),
			new BindableArray([3, 4, 5]),
			new BindableArray([6])
		]);
		const target = startMergingArrays(source);
		const messages = listen(target);
		source.set(2, new BindableArray([7, 8])); // [1, 2], [], [7, 8], [6]
		expect(target.native).eql([1, 2, 7, 8, 6]);
		expect(messages).eql([
			["length", 6, 5],
			["splice", [1, 2, 3, 4, 5, 6], [[2, [3, 4, 5]]], [[2, [7, 8]]]],
			["change"]
		]);
	});

	it("should handle child replace message", () => {
		const source = new BindableArray([
			new BindableArray([1, 2]),
			new BindableArray<number>(),
			new BindableArray([3, 4, 5]),
			new BindableArray([6])
		]);
		const target = startMergingArrays(source);
		const messages = listen(target);
		source.get(2).set(1, 7); // [1, 2], [], [3, 7, 5], [6]
		expect(target.native).eql([1, 2, 3, 7, 5, 6]);
		expect(messages).eql([
			["replace", 3, 4, 7],
			["change"]
		]);
	});

	it("should handle parent move message", () => {
		const source = new BindableArray([
			new BindableArray([1, 2]),
			new BindableArray<number>(),
			new BindableArray([3, 4, 5]),
			new BindableArray([6])
		]);
		const target = startMergingArrays(source);
		const messages = listen(target);
		source.move(2, 0); // [3, 4, 5], [1, 2], [], [6]
		expect(target.native).eql([3, 4, 5, 1, 2, 6]);
		expect(messages).eql([
			["reorder", [1, 2, 3, 4, 5, 6], [3, 4, 0, 1, 2, 5]],
			["change"]
		]);
	});

	it("should handle child move message", () => {
		const source = new BindableArray([
			new BindableArray([1, 2]),
			new BindableArray<number>(),
			new BindableArray([3, 4, 5]),
			new BindableArray([6])
		]);
		const target = startMergingArrays(source);
		const messages = listen(target);
		source.get(2).move(2, 0); // [1, 2], [], [5, 3, 4], [6]
		expect(target.native).eql([1, 2, 5, 3, 4, 6]);
		expect(messages).eql([
			["move", 4, 2, 5],
			["change"]
		]);
	});

	it("should handle parent reorder message", () => {
		const source = new BindableArray([
			new BindableArray([1, 2]),
			new BindableArray<number>(),
			new BindableArray([3, 4, 5]),
			new BindableArray([6])
		]);
		const target = startMergingArrays(source);
		const messages = listen(target);
		source.reorder([2, 3, 0, 1]); // [3, 4, 5], [6], [1, 2], []
		expect(target.native).eql([3, 4, 5, 6, 1, 2]);
		expect(messages).eql([
			["reorder", [1, 2, 3, 4, 5, 6], [4, 5, 0, 1, 2, 3]],
			["change"]
		]);
	});

	it("should handle child reorder message", () => {
		const source = new BindableArray([
			new BindableArray([1, 2]),
			new BindableArray<number>(),
			new BindableArray([3, 4, 5]),
			new BindableArray([6])
		]);
		const target = startMergingArrays(source);
		const messages = listen(target);
		source.get(2).reorder([2, 1, 0]); // [1, 2], [], [5, 4, 3], [6]
		expect(target.native).eql([1, 2, 5, 4, 3, 6]);
		expect(messages).eql([
			["reorder", [1, 2, 3, 4, 5, 6], [0, 1, 4, 3, 2, 5]],
			["change"]
		]);
	});

	it("should handle parent clear message", () => {
		const source = new BindableArray([
			new BindableArray([1, 2]),
			new BindableArray<number>(),
			new BindableArray([3, 4, 5]),
			new BindableArray([6])
		]);
		const target = startMergingArrays(source);
		const messages = listen(target);
		source.clear();
		expect(target.native).eql([]);
		expect(messages).eql([
			["length", 6, 0],
			["clear", [1, 2, 3, 4, 5, 6]],
			["change"]
		]);
	});

	it("should handle child clear message", () => {
		const source = new BindableArray([
			new BindableArray([1, 2]),
			new BindableArray<number>(),
			new BindableArray([3, 4, 5]),
			new BindableArray([6])
		]);
		const target = startMergingArrays(source);
		const messages = listen(target);
		source.get(2).clear();
		expect(target.native).eql([1, 2, 6]);
		expect(messages).eql([
			["length", 6, 3],
			["splice", [1, 2, 3, 4, 5, 6], [[2, [3, 4, 5]]], []],
			["change"]
		]);
	});

	it("should create a silent array with proper contents if the parent and all children are silent", () => {
		const source = new BindableArray([
			new BindableArray([1, 2], true),
			new BindableArray<number>(true),
			new BindableArray([3, 4, 5], true),
			new BindableArray([6], true)
		], true);
		const target = startMergingArrays(source);
		assert.isTrue(target.silent);
		expect(target.native).eql([1, 2, 3, 4, 5, 6]);
	});

	it("should create a non-silent array if the parent is not silent", () => {
		const source = new BindableArray([
			new BindableArray([1, 2], true),
			new BindableArray<number>(true),
			new BindableArray([3, 4, 5], true),
			new BindableArray([6], true)
		]);
		assert.isFalse(startMergingArrays(source).silent);
	});

	it("should create a non-silent array if some child is not silent", () => {
		const source = new BindableArray([
			new BindableArray([1, 2], true),
			new BindableArray<number>(true),
			new BindableArray([3, 4, 5], true),
			new BindableArray([6])
		], true);
		assert.isFalse(startMergingArrays(source).silent);
	});

	it("should bind to a newly added child", () => {
		const source = new BindableArray([
			new BindableArray([1, 2]),
			new BindableArray<number>(),
			new BindableArray([3, 4, 5]),
			new BindableArray([6])
		]);
		const target = startMergingArrays(source);
		source.add(new BindableArray([7, 8, 9])); // [1, 2], [], [3, 4, 5], [6], [7, 8, 9]
		const messages = listen(target);
		source.get(4).add(10);
		expect(target.native).eql([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
		expect(messages).eql([
			["length", 9, 10],
			["splice", [1, 2, 3, 4, 5, 6, 7, 8, 9], [], [[9, [10]]]],
			["change"]
		]);
	});

	it("should unbind from a removed child", () => {
		const source = new BindableArray([
			new BindableArray([1, 2]),
			new BindableArray<number>(),
			new BindableArray([3, 4, 5]),
			new BindableArray([6])
		]);
		const child = source.get(2);
		startMergingArrays(source);
		assert.isTrue(hasBindings(child));
		source.remove(2);
		assert.isFalse(hasBindings(child));
	});

	it("should unbind all listeners on destruction", () => {
		const source = new BindableArray([
			new BindableArray([1, 2])
		]);
		const target = startMergingArrays(source);
		assert.isTrue(hasBindings(source));
		assert.isTrue(hasBindings(source.get(0)));
		target.destroy();
		assert.isFalse(hasBindings(source));
		assert.isFalse(hasBindings(source.get(0)));
	});
});


describe("ArrayMerger", () => {
	// Tests above are not repeated here.

	it("should create a new array by default", () => {
		const source = new BindableArray<BindableArray<number>>();
		const mapper = new ArrayMerger(source);
		assert.isTrue(mapper.target instanceof BindableArray);
		expect(mapper.target).not.equal(source);
		expect(mapper.target.native).not.equal(source.native);
	});

	it("should accept an existing target", () => {
		const source = new BindableArray<BindableArray<number>>();
		const target = new BindableArray<number>();
		const mapper = new ArrayMerger(source, {target});
		expect(mapper.target).equal(target);
	});

	it("should fill the target initially", () => {
		const source = new BindableArray([
			new BindableArray([1, 2]),
			new BindableArray<number>(),
			new BindableArray([3, 4, 5]),
			new BindableArray([6])
		]);
		const target = new BindableArray<number>();
		const messages = listen(target);
		new ArrayMerger(source, {target});
		expect(target.native).eql([1, 2, 3, 4, 5, 6]);
		expect(messages).eql([
			["length", 0, 6],
			["splice", [], [], [[0, [1, 2, 3, 4, 5, 6]]]],
			["change"]
		]);
	});

	it("should initialize proper contents if the sources are silent", () => {
		const source = new BindableArray([
			new BindableArray([1, 2], true),
			new BindableArray<number>(true),
			new BindableArray([3, 4, 5], true),
			new BindableArray([6], true)
		], true);
		const target = new BindableArray<number>();
		new ArrayMerger(source, {target});
		expect(target.native).eql([1, 2, 3, 4, 5, 6]);
	});

	it("should clear the target on destruction", () => {
		const source = new BindableArray([
			new BindableArray([1, 2]),
			new BindableArray<number>(),
			new BindableArray([3, 4, 5]),
			new BindableArray([6])
		]);
		const target = new BindableArray<number>();
		const mapper = new ArrayMerger(source, {target});
		const messages = listen(target);
		mapper.destroy();
		expect(target.native).eql([]);
		expect(messages).eql([
			["length", 6, 0],
			["clear", [1, 2, 3, 4, 5, 6]],
			["change"]
		]);
	});

	it("should unbind all listeners on destruction", () => {
		const source = new BindableArray([
			new BindableArray([1, 2])
		]);
		const target = new BindableArray<number>();
		const mapper = new ArrayMerger(source, {target});
		assert.isTrue(hasBindings(source));
		assert.isTrue(hasBindings(source.get(0)));
		mapper.destroy();
		assert.isFalse(hasBindings(source));
		assert.isFalse(hasBindings(source.get(0)));
	});

	// This synchronizer doesn't support multiple sources for one target.
});

function listen(array: ReadonlyBindableArray<any>) {
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

function parseSpliceResult(spliceResult: IBindableArray.SpliceResult<any>) {
	return [
		spliceResult.oldContents,
		spliceResult.removedSegments.map(segment => [segment.index, segment.items]),
		spliceResult.addedSegments.map(segment => [segment.index, segment.items])
	];
}

function hasBindings(array: ReadonlyBindableArray<unknown>) {
	return hasListeners(array.onSplice) ||
		hasListeners(array.onReplace) ||
		hasListeners(array.onMove) ||
		hasListeners(array.onReorder) ||
		hasListeners(array.onClear);
}

function hasListeners(dispatcher: Listenable<unknown>) {
	const listeners = (<any>dispatcher)._listeners;
	return listeners != null && listeners.size !== 0;
}
