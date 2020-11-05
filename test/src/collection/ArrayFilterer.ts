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
import {startFilteringArray} from "jwidget/collection/ArrayFilterer";
import IBindableArray from "jwidget/IBindableArray";
import IndexCount from "jwidget/IndexCount";
import IndexItems from "jwidget/IndexItems";
import ReadonlyBindableArray from "jwidget/ReadonlyBindableArray";

describe("startFilteringArray", () => {
	it("should create a new array", () => {
		const source = new BindableArray();
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

	it("should handle splice message", () => {
		const source = new BindableArray([5, 2, 8, 7, 8]);
		const target = startFilteringArray(source, x => x % 2 === 0); // 2, 8, 8
		const messages = listen(target);
		source.splice(
			[new IndexCount(0, 2), new IndexCount(4, 1)], // 8, 7 => 8
			[new IndexItems(1, [3, 4]), new IndexItems(4, [1, 1])]); // 8, 3, 4, 7, 1, 1 => 8, 4
		expect(target.native).eql([8, 4]);
		expect(messages).eql([
			["length", 3, 2],
			["splice", [2, 8, 8], [[0, [2]], [2, [8]]], [[1, [4]]]],
			["change"]
		]);
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

	it("should handle replace message for a missing value", () => {
		const source = new BindableArray([5, 2, 8, 7, 8]);
		const target = startFilteringArray(source, x => x % 2 === 0); // 2, 8, 8
		const messages = listen(target);
		source.set(3, 5); // 5, 2, 8, 5, 8 => 2, 8, 8
		expect(target.native).eql([2, 8, 8]);
		expect(messages).eql([]);
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

	it("should handle move message for a missing value", () => {
		const source = new BindableArray([5, 2, 8, 7, 8]);
		const target = startFilteringArray(source, x => x % 2 === 0); // 2, 8, 8
		const messages = listen(target);
		source.move(3, 0); // 7, 5, 2, 8, 8 => 2, 8, 8
		expect(target.native).eql([2, 8, 8]);
		expect(messages).eql([]);
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

	it("should handle reorder message for identity", () => {
		const source = new BindableArray([5, 2, 8, 7, 8]);
		const target = startFilteringArray(source, x => x % 2 === 0); // 2, 8, 8
		const messages = listen(target);
		source.reorder([4, 0, 2, 1, 3]); // 2, 7, 8, 8, 5 => 2, 8, 8
		expect(target.native).eql([2, 8, 8]);
		expect(messages).eql([]);
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

	it("should handle clear message for an empty array", () => {
		const source = new BindableArray([5, 2, 8, 7, 8]);
		const target = startFilteringArray(source, () => false);
		const messages = listen(target);
		source.clear();
		expect(target.native).eql([]);
		expect(messages).eql([]);
	});

	// Add tests for silent collections

	// Add tests for destruction

	// Add tests for multiple sources
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
