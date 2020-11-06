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
import ArrayReverser, {startReversingArray} from "jwidget/collection/ArrayReverser";
import IBindableArray from "jwidget/IBindableArray";
import IndexCount from "jwidget/IndexCount";
import IndexItems from "jwidget/IndexItems";
import Listenable from "jwidget/Listenable";
import ReadonlyBindableArray from "jwidget/ReadonlyBindableArray";

describe("startReversingArray", () => {
	it("should create a new array", () => {
		const source = new BindableArray<number>();
		const target = startReversingArray(source);
		assert.isTrue(target instanceof BindableArray);
		expect(target).not.equal(source);
		expect(target.native).not.equal(source.native);
	});

	it("should reverse the target initially", () => {
		const source = new BindableArray([5, 2, 8, 7, 8]);
		const target = startReversingArray(source);
		expect(target.native).eql([8, 7, 8, 2, 5]);
	});

	it("should handle splice message", () => {
		const source = new BindableArray([5, 2, 8, 7, 8]);
		const target = startReversingArray(source); // 8, 7, 8, 2, 5
		const messages = listen(target);
		source.splice(
			[new IndexCount(0, 2), new IndexCount(4, 1)], // 8, 7 => 7, 8
			[new IndexItems(1, [3, 4]), new IndexItems(4, [1, 1])]); // 8, 3, 4, 7, 1, 1 => 1, 1, 7, 4, 3, 8
		expect(target.native).eql([1, 1, 7, 4, 3, 8]);
		expect(messages).eql([
			["length", 5, 6],
			["splice", [8, 7, 8, 2, 5], [[0, [8]], [3, [2, 5]]], [[0, [1, 1]], [3, [4, 3]]]],
			["change"]
		]);
	});

	it("should handle replace message", () => {
		const source = new BindableArray([5, 2, 8, 7, 8]);
		const target = startReversingArray(source); // 8, 7, 8, 2, 5
		const messages = listen(target);
		source.set(1, 1); // 5, 1, 8, 7, 8 => 8, 7, 8, 1, 5
		expect(target.native).eql([8, 7, 8, 1, 5]);
		expect(messages).eql([
			["replace", 3, 2, 1],
			["change"]
		]);
	});

	it("should handle move message", () => {
		const source = new BindableArray([5, 2, 8, 7, 8]);
		const target = startReversingArray(source); // 8, 7, 8, 2, 5
		const messages = listen(target);
		source.move(1, 3); // 5, 8, 7, 2, 8 => 8, 2, 7, 8, 5
		expect(target.native).eql([8, 2, 7, 8, 5]);
		expect(messages).eql([
			["move", 3, 1, 2],
			["change"]
		]);
	});

	it("should handle reorder message", () => {
		const source = new BindableArray([5, 2, 8, 7, 8]);
		const target = startReversingArray(source); // 8, 7, 8, 2, 5
		const messages = listen(target);
		source.reorder([2, 4, 3, 0, 1]); // 7, 8, 5, 8, 2 => 2, 8, 5, 8, 7
		expect(target.native).eql([2, 8, 5, 8, 7]);
		expect(messages).eql([
			["reorder", [8, 7, 8, 2, 5], [3, 4, 1, 0, 2]],
			["change"]
		]);
	});

	it("should handle clear message", () => {
		const source = new BindableArray([5, 2, 8, 7, 8]);
		const target = startReversingArray(source); // 8, 7, 8, 2, 5
		const messages = listen(target);
		source.clear();
		expect(target.native).eql([]);
		expect(messages).eql([
			["length", 5, 0],
			["clear", [8, 7, 8, 2, 5]],
			["change"]
		]);
	});

	it("should create a silent array with proper contents if the source is silent", () => {
		const source = new BindableArray([5, 2, 8, 7, 8], true);
		const target = startReversingArray(source); // 8, 7, 8, 2, 5
		assert.isTrue(target.silent);
		expect(target.native).eql([8, 7, 8, 2, 5]);
	});

	it("should unbind all listeners on destruction", () => {
		const source = new BindableArray([5, 2, 8, 7, 8]);
		const target = startReversingArray(source); // 8, 7, 8, 2, 5
		assert.isTrue(hasBindings(source));
		target.destroy();
		assert.isFalse(hasBindings(source));
	});
});

describe("ArrayReverser", () => {
	// Tests above are not repeated here.

	it("should create a new array by default", () => {
		const source = new BindableArray<number>();
		const reverser = new ArrayReverser(source);
		assert.isTrue(reverser.target instanceof BindableArray);
		expect(reverser.target).not.equal(source);
		expect(reverser.target.native).not.equal(source.native);
	});

	it("should accept an existing target", () => {
		const source = new BindableArray<number>();
		const target = new BindableArray<number>();
		const reverser = new ArrayReverser(source, {target});
		expect(reverser.target).equal(target);
	});

	it("should reverse the target initially", () => {
		const source = new BindableArray([5, 2, 8, 7, 8]);
		const target = new BindableArray<number>();
		const messages = listen(target);
		new ArrayReverser(source, {target});
		expect(target.native).eql([8, 7, 8, 2, 5]);
		expect(messages).eql([
			["length", 0, 5],
			["splice", [], [], [[0, [8, 7, 8, 2, 5]]]],
			["change"]
		]);
	});

	it("should initialize proper contents if the source is silent", () => {
		const source = new BindableArray([5, 2, 8, 7, 8], true);
		const target = new BindableArray<number>();
		new ArrayReverser(source, {target});
		expect(target.native).eql([8, 7, 8, 2, 5]);
	});

	it("should clear the target on destruction", () => {
		const source = new BindableArray([5, 2, 8, 7, 8]);
		const target = new BindableArray<number>();
		const reverser = new ArrayReverser(source, {target});
		const messages = listen(target);
		reverser.destroy();
		expect(target.native).eql([]);
		expect(messages).eql([
			["length", 5, 0],
			["clear", [8, 7, 8, 2, 5]],
			["change"]
		]);
	});

	it("should unbind all listeners on destruction", () => {
		const source = new BindableArray([5, 2, 8, 7, 8]);
		const target = new BindableArray<number>();
		const reverser = new ArrayReverser(source, {target});
		assert.isTrue(hasBindings(source));
		reverser.destroy();
		assert.isFalse(hasBindings(source));
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
