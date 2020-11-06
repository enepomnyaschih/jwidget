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
import {startMergingArrays} from "jwidget/collection/ArrayMerger";
import IBindableArray from "jwidget/IBindableArray";
import IndexCount from "jwidget/IndexCount";
import IndexItems from "jwidget/IndexItems";
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
			new BindableArray<number>([]),
			new BindableArray([3, 4, 5]),
			new BindableArray([6])
		]);
		const target = startMergingArrays(source);
		expect(target.native).eql([1, 2, 3, 4, 5, 6]);
	});

	it("should handle parent splice message", () => {
		const source = new BindableArray([
			new BindableArray([1, 2]),
			new BindableArray<number>([]),
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
			new BindableArray<number>([]),
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
