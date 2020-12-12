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
import ArrayFilterer, {startFilteringArray} from "jwidget/collection/ArrayFilterer";
import IBindableArray from "jwidget/IBindableArray";
import IndexItems from "jwidget/IndexItems";
import Listenable from "jwidget/Listenable";
import ReadonlyBindableArray from "jwidget/ReadonlyBindableArray";

describe("startFilteringArray", () => {
	it("should create a new array", () => {
		const source = new BindableArray<number>();
		const target = startFilteringArray(source, () => true);
		assert.isTrue(target instanceof BindableArray);
		expect(target).not.equal(source);
		expect(target.native).not.equal(source.native);
	});

	it("should filter the target initially", () => {
		const source = new BindableArray([5, 2, 8, 7, 8]);
		const target = startFilteringArray(source, x => x % 2 === 0);
		expect(target.native).eql([2, 8, 8]);
	});

	it("should make proper calls on initialization", () => {
		const calls: number[] = [];
		const source = new BindableArray([5, 2, 8, 7, 8]);
		startFilteringArray(source, makeTester(x => x % 2 === 0, calls));
		expect(calls).eql([5, 2, 8, 7, 8]);
	});

	it("should handle splice message", () => {
		const source = new BindableArray([5, 2, 8, 7, 8]);
		const target = startFilteringArray(source, x => x % 2 === 0); // 2, 8, 8
		const messages = listen(target);
		source.splice(
			[[0, 2], [4, 1]], // 8, 7 => 8
			[new IndexItems(1, [3, 4]), new IndexItems(4, [1, 1])]); // 8, 3, 4, 7, 1, 1 => 8, 4
		expect(target.native).eql([8, 4]);
		expect(messages).eql([
			["length", 3, 2],
			["splice", [2, 8, 8], [[0, [2]], [2, [8]]], [[1, [4]]]],
			["change"]
		]);
	});

	it("should make proper calls on splice", () => {
		const calls: number[] = [];
		const source = new BindableArray([5, 2, 8, 7, 8]);
		startFilteringArray(source, makeTester(x => x % 2 === 0, calls)); // 2, 8, 8
		calls.splice(0);
		source.splice(
			[[0, 2], [4, 1]], // 8, 7 => 8
			[new IndexItems(1, [3, 4]), new IndexItems(4, [1, 1])]); // 8, 3, 4, 7, 1, 1 => 8, 4
		expect(calls).eql([3, 4, 1, 1]);
	});

	it("should handle replace message by removing a value", () => {
		const source = new BindableArray([5, 2, 8, 7, 8]);
		const target = startFilteringArray(source, x => x % 2 === 0); // 2, 8, 8
		const messages = listen(target);
		source.set(2, 1); // 5, 2, 1, 7, 8 => 2, 8
		expect(target.native).eql([2, 8]);
		expect(messages).eql([
			["length", 3, 2],
			["splice", [2, 8, 8], [[1, [8]]], []],
			["change"]
		]);
	});

	it("should handle replace message by adding a value", () => {
		const source = new BindableArray([5, 2, 8, 7, 8]);
		const target = startFilteringArray(source, x => x % 2 === 0); // 2, 8, 8
		const messages = listen(target);
		source.set(3, 6); // 5, 2, 8, 6, 8 => 2, 8, 6, 8
		expect(target.native).eql([2, 8, 6, 8]);
		expect(messages).eql([
			["length", 3, 4],
			["splice", [2, 8, 8], [], [[2, [6]]]],
			["change"]
		]);
	});

	it("should handle replace message by updating a value", () => {
		const source = new BindableArray([5, 2, 8, 7, 8]);
		const target = startFilteringArray(source, x => x % 2 === 0); // 2, 8, 8
		const messages = listen(target);
		source.set(2, 6); // 5, 2, 6, 7, 8 => 2, 6, 8
		expect(target.native).eql([2, 6, 8]);
		expect(messages).eql([
			["replace", 1, 8, 6],
			["change"]
		]);
	});

	it("should ignore replace message for a missing value", () => {
		const source = new BindableArray([5, 2, 8, 7, 8]);
		const target = startFilteringArray(source, x => x % 2 === 0); // 2, 8, 8
		const messages = listen(target);
		source.set(3, 5); // 5, 2, 8, 5, 8 => 2, 8, 8
		expect(target.native).eql([2, 8, 8]);
		expect(messages).eql([]);
	});

	it("should make proper calls on replace", () => {
		const calls: number[] = [];
		const source = new BindableArray([5, 2, 8, 7, 8]);
		startFilteringArray(source, makeTester(x => x % 2 === 0, calls)); // 2, 8, 8
		calls.splice(0);
		source.set(2, 1); // 5, 2, 1, 7, 8 => 2, 8
		expect(calls).eql([1]);
	});

	it("should handle move message for a present value", () => {
		const source = new BindableArray([5, 2, 8, 7, 8]);
		const target = startFilteringArray(source, x => x % 2 === 0); // 2, 8, 8
		const messages = listen(target);
		source.move(1, 3); // 5, 8, 7, 2, 8 => 8, 2, 8
		expect(target.native).eql([8, 2, 8]);
		expect(messages).eql([
			["move", 0, 1, 2],
			["change"]
		]);
	});

	it("should ignore move message for a missing value", () => {
		const source = new BindableArray([5, 2, 8, 7, 8]);
		const target = startFilteringArray(source, x => x % 2 === 0); // 2, 8, 8
		const messages = listen(target);
		source.move(3, 0); // 7, 5, 2, 8, 8 => 2, 8, 8
		expect(target.native).eql([2, 8, 8]);
		expect(messages).eql([]);
	});

	it("should make no calls on move", () => {
		const calls: number[] = [];
		const source = new BindableArray([5, 2, 8, 7, 8]);
		startFilteringArray(source, makeTester(x => x % 2 === 0, calls)); // 2, 8, 8
		calls.splice(0);
		source.move(1, 3); // 5, 8, 7, 2, 8 => 8, 2, 8
		expect(calls).eql([]);
	});

	it("should handle reorder message", () => {
		const source = new BindableArray([5, 2, 8, 7, 8]);
		const target = startFilteringArray(source, x => x % 2 === 0); // 2, 8, 8
		const messages = listen(target);
		source.reorder([2, 4, 3, 0, 1]); // 7, 8, 5, 8, 2 => 8, 8, 2
		expect(target.native).eql([8, 8, 2]);
		expect(messages).eql([
			["reorder", [2, 8, 8], [2, 1, 0]],
			["change"]
		]);
	});

	it("should ignore reorder message for identity", () => {
		const source = new BindableArray([5, 2, 8, 7, 8]);
		const target = startFilteringArray(source, x => x % 2 === 0); // 2, 8, 8
		const messages = listen(target);
		source.reorder([4, 0, 2, 1, 3]); // 2, 7, 8, 8, 5 => 2, 8, 8
		expect(target.native).eql([2, 8, 8]);
		expect(messages).eql([]);
	});

	it("should make no calls on reorder", () => {
		const calls: number[] = [];
		const source = new BindableArray([5, 2, 8, 7, 8]);
		startFilteringArray(source, makeTester(x => x % 2 === 0, calls)); // 2, 8, 8
		calls.splice(0);
		source.reorder([2, 4, 3, 0, 1]); // 7, 8, 5, 8, 2 => 8, 8, 2
		expect(calls).eql([]);
	});

	it("should handle clear message for a non-empty array", () => {
		const source = new BindableArray([5, 2, 8, 7, 8]);
		const target = startFilteringArray(source, x => x % 2 === 0); // 2, 8, 8
		const messages = listen(target);
		source.clear();
		expect(target.native).eql([]);
		expect(messages).eql([
			["length", 3, 0],
			["clear", [2, 8, 8]],
			["change"]
		]);
	});

	it("should ignore clear message for an empty array", () => {
		const source = new BindableArray([5, 2, 8, 7, 8]);
		const target = startFilteringArray(source, x => x % 3 === 0);
		const messages = listen(target);
		source.clear();
		expect(target.native).eql([]);
		expect(messages).eql([]);
	});

	it("should not make any calls on clear", () => {
		const calls: number[] = [];
		const source = new BindableArray([5, 2, 8, 7, 8]);
		startFilteringArray(source, makeTester(x => x % 2 === 0, calls)); // 2, 8, 8
		calls.splice(0);
		source.clear();
		expect(calls).eql([]);
	});

	it("should create a silent array with proper contents if the source is silent", () => {
		const source = new BindableArray([5, 2, 8, 7, 8], true);
		const target = startFilteringArray(source, x => x % 2 === 0);
		assert.isTrue(target.silent);
		expect(target.native).eql([2, 8, 8]);
	});

	it("should unbind all listeners on destruction", () => {
		const source = new BindableArray([5, 2, 8, 7, 8]);
		const target = startFilteringArray(source, x => x % 2 === 0);
		assert.isTrue(hasBindings(source));
		target.destroy();
		assert.isFalse(hasBindings(source));
	});

	it("should make no calls on destruction", () => {
		const calls: number[] = [];
		const source = new BindableArray([5, 2, 8, 7, 8]);
		const target = startFilteringArray(source, makeTester(x => x % 2 === 0, calls));
		calls.splice(0);
		target.destroy();
		expect(calls).eql([]);
	});
});

describe("ArrayFilterer", () => {
	// Tests above are not repeated here.

	it("should create a new array by default", () => {
		const source = new BindableArray<number>();
		const filterer = new ArrayFilterer(source, () => true);
		assert.isTrue(filterer.target instanceof BindableArray);
		expect(filterer.target).not.equal(source);
		expect(filterer.target.native).not.equal(source.native);
	});

	it("should accept an existing target", () => {
		const source = new BindableArray<number>();
		const target = new BindableArray<number>();
		const filterer = new ArrayFilterer(source, () => true, {target});
		expect(filterer.target).equal(target);
	});

	it("should filter the target initially", () => {
		const source = new BindableArray([5, 2, 8, 7, 8]);
		const target = new BindableArray<number>();
		const messages = listen(target);
		new ArrayFilterer(source, x => x % 2 === 0, {target});
		expect(target.native).eql([2, 8, 8]);
		expect(messages).eql([
			["length", 0, 3],
			["splice", [], [], [[0, [2, 8, 8]]]],
			["change"]
		]);
	});

	it("should make proper calls on initialization", () => {
		const calls: number[] = [];
		const source = new BindableArray([5, 2, 8, 7, 8]);
		const target = new BindableArray<number>();
		new ArrayFilterer(source, makeTester(x => x % 2 === 0, calls), {target});
		expect(calls).eql([5, 2, 8, 7, 8]);
	});

	it("should initialize proper contents if the source is silent", () => {
		const source = new BindableArray([5, 2, 8, 7, 8], true);
		const target = new BindableArray<number>();
		new ArrayFilterer(source, x => x % 2 === 0, {target}); // 2, 8, 8
		expect(target.native).eql([2, 8, 8]);
	});

	it("should clear the target on destruction", () => {
		const source = new BindableArray([5, 2, 8, 7, 8]);
		const target = new BindableArray<number>();
		const filterer = new ArrayFilterer(source, x => x % 2 === 0, {target}); // 2, 8, 8
		const messages = listen(target);
		filterer.destroy();
		expect(target.native).eql([]);
		expect(messages).eql([
			["length", 3, 0],
			["clear", [2, 8, 8]],
			["change"]
		]);
	});

	it("should unbind all listeners on destruction", () => {
		const source = new BindableArray([5, 2, 8, 7, 8]);
		const target = new BindableArray<number>();
		const filterer = new ArrayFilterer(source, x => x % 2 === 0, {target}); // 2, 8, 8
		assert.isTrue(hasBindings(source));
		filterer.destroy();
		assert.isFalse(hasBindings(source));
	});

	it("should support reconfiguring", () => {
		const source = new BindableArray([5, 2, 8, 7, 8]);
		const target = new BindableArray<number>();
		const filterer = new ArrayFilterer(source, x => x % 2 === 0, {target}); // 2, 8, 8
		const messages = listen(target);
		filterer.reconfigure({test: x => x % 2 === 1}); // 5, 7
		expect(target.native).eql([5, 7]);
		expect(messages).eql([
			["length", 3, 2],
			["splice", [2, 8, 8], [[0, [2, 8, 8]]], [[0, [5, 7]]]],
			["change"]
		]);
	});

	it("should support reconfiguring with no changes", () => {
		const source = new BindableArray([5, 2, 8, 7, 8]);
		const target = new BindableArray<number>();
		const filterer = new ArrayFilterer(source, x => x % 2 === 0, {target}); // 2, 8, 8
		const messages = listen(target);
		filterer.reconfigure({test: x => x % 2 === 0});
		expect(target.native).eql([2, 8, 8]);
		expect(messages).eql([]);
	});

	it("should make proper calls on reconfiguring", () => {
		const calls1: number[] = [];
		const calls2: number[] = [];
		const source = new BindableArray([5, 2, 8, 7, 8]);
		const target = new BindableArray<number>();
		const filterer = new ArrayFilterer(source, makeTester(x => x % 2 === 0, calls1), {target}); // 2, 8, 8
		calls1.splice(0);
		filterer.reconfigure({test: makeTester(x => x % 2 === 1, calls2)}); // 5, 7
		expect(calls1).eql([]);
		expect(calls2).eql([5, 2, 8, 7, 8]);
	});

	it("should support refiltering", () => {
		let divisor = 2;
		const source = new BindableArray([5, 2, 8, 7, 8]);
		const target = new BindableArray<number>();
		const filterer = new ArrayFilterer(source, x => x % divisor === 0, {target}); // 2, 8, 8
		const messages = listen(target);
		divisor = 4;
		filterer.refilter();
		expect(target.native).eql([8, 8]);
		expect(messages).eql([
			["length", 3, 2],
			["splice", [2, 8, 8], [[0, [2]]], []],
			["change"]
		]);
	});

	it("should support refiltering with no changes", () => {
		const source = new BindableArray([5, 2, 8, 7, 8]);
		const target = new BindableArray<number>();
		const filterer = new ArrayFilterer(source, x => x % 2 === 0, {target}); // 2, 8, 8
		const messages = listen(target);
		filterer.refilter();
		expect(target.native).eql([2, 8, 8]);
		expect(messages).eql([]);
	});

	it("should make proper calls on refiltering", () => {
		const calls: number[] = [];
		let divisor = 2;
		const source = new BindableArray([5, 2, 8, 7, 8]);
		const target = new BindableArray<number>();
		const filterer = new ArrayFilterer(source, makeTester(x => x % divisor === 0, calls), {target}); // 2, 8, 8
		divisor = 4;
		calls.splice(0);
		filterer.refilter();
		expect(target.native).eql([8, 8]);
		expect(calls).eql([5, 2, 8, 7, 8]);
	});

	it("should support refiltering of a specific item", () => {
		let divisor = 4;
		const source = new BindableArray([5, 2, 8, 7, 8]);
		const target = new BindableArray<number>();
		const filterer = new ArrayFilterer(source, x => x % divisor === 0, {target}); // 8, 8
		const messages = listen(target);
		divisor = 2;
		filterer.refilterAt(1);
		expect(target.native).eql([2, 8, 8]);
		expect(messages).eql([
			["length", 2, 3],
			["splice", [8, 8], [], [[0, [2]]]],
			["change"]
		]);
	});

	it("should support refiltering of a specific item with no changes", () => {
		const source = new BindableArray([5, 2, 8, 7, 8]);
		const target = new BindableArray<number>();
		const filterer = new ArrayFilterer(source, x => x % 2 === 0, {target}); // 2, 8, 8
		const messages = listen(target);
		filterer.refilterAt(0);
		filterer.refilterAt(1);
		expect(target.native).eql([2, 8, 8]);
		expect(messages).eql([]);
	});

	it("should make proper calls on refiltering of a specific item", () => {
		const calls: number[] = [];
		let divisor = 4;
		const source = new BindableArray([5, 2, 8, 7, 8]);
		const target = new BindableArray<number>();
		const filterer = new ArrayFilterer(source, makeTester(x => x % divisor === 0, calls), {target}); // 8, 8
		divisor = 2;
		calls.splice(0);
		filterer.refilterAt(1);
		expect(calls).eql([2]);
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

function makeTester<T>(test: (value: T) => boolean, calls: T[]) {
	return (value: T) => {
		calls.push(value);
		return test(value);
	};
}
