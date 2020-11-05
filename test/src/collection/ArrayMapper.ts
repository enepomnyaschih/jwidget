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
import ArrayMapper, {startMappingArray} from "jwidget/collection/ArrayMapper";
import IBindableArray from "jwidget/IBindableArray";
import IndexCount from "jwidget/IndexCount";
import IndexItems from "jwidget/IndexItems";
import Listenable from "jwidget/Listenable";
import ReadonlyBindableArray from "jwidget/ReadonlyBindableArray";

describe("startMappingArray", () => {
	it("should create a new array", () => {
		const source = new BindableArray<number>();
		const target = startMappingArray(source, x => x);
		assert.isTrue(target instanceof BindableArray);
		expect(target).not.equal(source);
		expect(target.native).not.equal(source.native);
	});

	it("should map the target initially", () => {
		let step = 0;
		const source = new BindableArray([5, 2, 8, 7, 8]);
		const target = startMappingArray(source, makeDoubler(() => ++step));
		expect(target.native).eql([10, 4, 16, 14, 16]);
		expect(step).equal(5);
	});

	it("should handle splice message", () => {
		let step = 0;
		const source = new BindableArray([5, 2, 8, 7, 8]);
		const target = startMappingArray(source, makeDoubler(() => ++step));
		const messages = listen(target);
		source.splice(
			[new IndexCount(0, 2), new IndexCount(4, 1)], // 8, 7
			[new IndexItems(1, [3, 4]), new IndexItems(4, [1, 1])]); // 8, 3, 4, 7, 1, 1
		expect(target.native).eql([16, 6, 8, 14, 2, 2]);
		expect(messages).eql([
			["length", 5, 6],
			["splice", [10, 4, 16, 14, 16], [[0, [10, 4]], [4, [16]]], [[1, [6, 8]], [4, [2, 2]]]],
			["change"]
		]);
		expect(step).equal(9);
	});

	it("should handle replace message", () => {
		let step = 0;
		const source = new BindableArray([5, 2, 8, 7, 8]);
		const target = startMappingArray(source, makeDoubler(() => ++step));
		const messages = listen(target);
		source.set(2, 1); // 5, 2, 1, 7, 8
		expect(target.native).eql([10, 4, 2, 14, 16]);
		expect(messages).eql([
			["replace", 2, 16, 2],
			["change"]
		]);
		expect(step).equal(6);
	});

	it("should handle move message for a present value", () => {
		let step = 0;
		const source = new BindableArray([5, 2, 8, 7, 8]);
		const target = startMappingArray(source, makeDoubler(() => ++step));
		const messages = listen(target);
		source.move(1, 3); // 5, 8, 7, 2, 8
		expect(target.native).eql([10, 16, 14, 4, 16]);
		expect(messages).eql([
			["move", 1, 3, 4],
			["change"]
		]);
		expect(step).equal(5);
	});

	it("should handle reorder message", () => {
		let step = 0;
		const source = new BindableArray([5, 2, 8, 7, 8]);
		const target = startMappingArray(source, makeDoubler(() => ++step));
		const messages = listen(target);
		source.reorder([2, 4, 3, 0, 1]); // 7, 8, 5, 8, 2
		expect(target.native).eql([14, 16, 10, 16, 4]);
		expect(messages).eql([
			["reorder", [10, 4, 16, 14, 16], [2, 4, 3, 0, 1]],
			["change"]
		]);
		expect(step).equal(5);
	});

	it("should handle clear message for a non-empty array", () => {
		let step = 0;
		const source = new BindableArray([5, 2, 8, 7, 8]);
		const target = startMappingArray(source, makeDoubler(() => ++step));
		const messages = listen(target);
		source.clear();
		expect(target.native).eql([]);
		expect(messages).eql([
			["length", 5, 0],
			["clear", [10, 4, 16, 14, 16]],
			["change"]
		]);
		expect(step).equal(5);
	});

	it("should create a silent array with proper contents if the source is silent", () => {
		const source = new BindableArray([5, 2, 8, 7, 8], true);
		const target = startMappingArray(source, x => 2 * x);
		assert.isTrue(target.silent);
		expect(target.native).eql([10, 4, 16, 14, 16]);
	});

	it("should unbind all listeners on destruction", () => {
		const source = new BindableArray([5, 2, 8, 7, 8]);
		const target = startMappingArray(source, x => 2 * x);
		assert.isTrue(hasBindings(source));
		target.destroy();
		assert.isFalse(hasBindings(source));
	});
});

describe("ArrayMapper", () => {
	it("should create a new array by default", () => {
		const source = new BindableArray<number>();
		const mapper = new ArrayMapper(source, x => x);
		assert.isTrue(mapper.target instanceof BindableArray);
		expect(mapper.target).not.equal(source);
		expect(mapper.target.native).not.equal(source.native);
	});

	it("should accept an existing target", () => {
		const source = new BindableArray<number>();
		const target = new BindableArray<number>();
		const mapper = new ArrayMapper(source, x => x, {target});
		expect(mapper.target).equal(target);
	});

	// All the following tests have been written for an auto-created target case already above, so we skip them.

	it("should map the target initially", () => {
		let step = 0;
		const source = new BindableArray([5, 2, 8, 7, 8]);
		const target = new BindableArray<number>();
		const messages = listen(target);
		new ArrayMapper(source, makeDoubler(() => ++step), {target});
		expect(target.native).eql([10, 4, 16, 14, 16]);
		expect(messages).eql([
			["length", 0, 5],
			["splice", [], [], [[0, [10, 4, 16, 14, 16]]]],
			["change"]
		]);
		expect(step).equal(5);
	});

	it("should handle splice message", () => {
		let step = 0;
		const source = new BindableArray([5, 2, 8, 7, 8]);
		const target = new BindableArray<number>();
		new ArrayMapper(source, makeDoubler(() => ++step), {target});
		const messages = listen(target);
		source.splice(
			[new IndexCount(0, 2), new IndexCount(4, 1)], // 8, 7
			[new IndexItems(1, [3, 4]), new IndexItems(4, [1, 1])]); // 8, 3, 4, 7, 1, 1
		expect(target.native).eql([16, 6, 8, 14, 2, 2]);
		expect(messages).eql([
			["length", 5, 6],
			["splice", [10, 4, 16, 14, 16], [[0, [10, 4]], [4, [16]]], [[1, [6, 8]], [4, [2, 2]]]],
			["change"]
		]);
		expect(step).equal(9);
	});

	it("should handle replace message", () => {
		let step = 0;
		const source = new BindableArray([5, 2, 8, 7, 8]);
		const target = new BindableArray<number>();
		new ArrayMapper(source, makeDoubler(() => ++step), {target});
		const messages = listen(target);
		source.set(2, 1); // 5, 2, 1, 7, 8
		expect(target.native).eql([10, 4, 2, 14, 16]);
		expect(messages).eql([
			["replace", 2, 16, 2],
			["change"]
		]);
		expect(step).equal(6);
	});

	it("should handle move message", () => {
		let step = 0;
		const source = new BindableArray([5, 2, 8, 7, 8]);
		const target = new BindableArray<number>();
		new ArrayMapper(source, makeDoubler(() => ++step), {target});
		const messages = listen(target);
		source.move(1, 3); // 5, 8, 7, 2, 8
		expect(target.native).eql([10, 16, 14, 4, 16]);
		expect(messages).eql([
			["move", 1, 3, 4],
			["change"]
		]);
		expect(step).equal(5);
	});

	it("should handle reorder message", () => {
		let step = 0;
		const source = new BindableArray([5, 2, 8, 7, 8]);
		const target = new BindableArray<number>();
		new ArrayMapper(source, makeDoubler(() => ++step), {target});
		const messages = listen(target);
		source.reorder([2, 4, 3, 0, 1]); // 7, 8, 5, 8, 2
		expect(target.native).eql([14, 16, 10, 16, 4]);
		expect(messages).eql([
			["reorder", [10, 4, 16, 14, 16], [2, 4, 3, 0, 1]],
			["change"]
		]);
		expect(step).equal(5);
	});

	it("should handle clear message", () => {
		let step = 0;
		const source = new BindableArray([5, 2, 8, 7, 8]);
		const target = new BindableArray<number>();
		new ArrayMapper(source, makeDoubler(() => ++step), {target});
		const messages = listen(target);
		source.clear();
		expect(target.native).eql([]);
		expect(messages).eql([
			["length", 5, 0],
			["clear", [10, 4, 16, 14, 16]],
			["change"]
		]);
		expect(step).equal(5);
	});

	it("should initialize proper contents if the source is silent", () => {
		let step = 0;
		const source = new BindableArray([5, 2, 8, 7, 8], true);
		const target = new BindableArray<number>();
		new ArrayMapper(source, makeDoubler(() => ++step), {target});
		expect(target.native).eql([10, 4, 16, 14, 16]);
		expect(step).equal(5);
	});

	it("should clear the target and unbind all listeners on destruction", () => {
		let step = 0;
		const source = new BindableArray([5, 2, 8, 7, 8]);
		const target = new BindableArray<number>();
		const mapper = new ArrayMapper(source, makeDoubler(() => ++step), {target});
		const messages = listen(target);
		assert.isTrue(hasBindings(source));
		mapper.destroy();
		assert.isFalse(hasBindings(source));
		expect(target.native).eql([]);
		expect(messages).eql([
			["length", 5, 0],
			["clear", [10, 4, 16, 14, 16]],
			["change"]
		]);
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

function makeDoubler(incrementer: () => void) {
	return (value: number) => {
		incrementer();
		return 2 * value;
	};
}
