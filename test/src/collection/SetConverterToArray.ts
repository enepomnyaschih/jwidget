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
import BindableSet from "jwidget/BindableSet";
import SetConverterToArray, {startConvertingSetToArray} from "jwidget/collection/SetConverterToArray";
import IBindableArray from "jwidget/IBindableArray";
import Listenable from "jwidget/Listenable";
import ReadonlyBindableArray from "jwidget/ReadonlyBindableArray";
import ReadonlyBindableSet from "jwidget/ReadonlyBindableSet";

describe("startConvertingSetToArray", () => {
	it("should create a new array", () => {
		const source = new BindableSet<number>();
		const target = startConvertingSetToArray(source);
		assert.isTrue(target instanceof BindableArray);
	});

	it("should collect the values initially", () => {
		const source = new BindableSet([5, 2, 8, 7, 9]);
		const target = startConvertingSetToArray(source);
		expect(normalizeValues(target)).eql([2, 5, 7, 8, 9]);
	});

	it("should handle splice message", () => {
		const source = new BindableSet([5, 2, 8, 7, 9]);
		const target = startConvertingSetToArray(source); // 2, 5, 7, 8, 9
		const messages = listen(target);
		source.splice([5, 9], [3, 4, 1]);
		expect(normalizeValues(target.native.slice(0, 3))).eql([2, 7, 8]);
		expect(normalizeValues(target.native.slice(3))).eql([1, 3, 4]);
		expect(messages).eql([
			["length", 5, 6],
			["splice", [5, 9], [[3, [1, 3, 4]]]],
			["change"]
		]);
	});

	it("should handle clear message", () => {
		const source = new BindableSet([5, 2, 8, 7, 9]);
		const target = startConvertingSetToArray(source); // 2, 5, 7, 8, 9
		const messages = listen(target);
		source.clear();
		expect(normalizeValues(target)).eql([]);
		expect(messages).eql([
			["length", 5, 0],
			["clear", [2, 5, 7, 8, 9]],
			["change"]
		]);
	});

	it("should create a silent set with proper contents if the source is silent", () => {
		const source = new BindableSet([5, 2, 8, 7, 9], true);
		const target = startConvertingSetToArray(source); // 2, 5, 7, 8, 9
		assert.isTrue(target.silent);
		expect(normalizeValues(target)).eql([2, 5, 7, 8, 9]);
	});

	it("should unbind all listeners on destruction", () => {
		const source = new BindableSet([5, 2, 8, 7, 9]);
		const target = startConvertingSetToArray(source); // 2, 5, 7, 8, 9
		assert.isTrue(hasBindings(source));
		target.destroy();
		assert.isFalse(hasBindings(source));
	});
});

describe("SetConverterToArray", () => {
	// Tests above are not repeated here.

	it("should create a new array by default", () => {
		const source = new BindableSet<number>();
		const collector = new SetConverterToArray(source);
		assert.isTrue(collector.target instanceof BindableArray);
	});

	it("should accept an existing target", () => {
		const source = new BindableSet<number>();
		const target = new BindableArray<number>();
		const collector = new SetConverterToArray(source, {target});
		expect(collector.target).equal(target);
	});

	it("should fill the target initially", () => {
		const source = new BindableSet([5, 2, 8, 7, 9]);
		const target = new BindableArray<number>();
		const messages = listen(target);
		new SetConverterToArray(source, {target});
		expect(normalizeValues(target)).eql([2, 5, 7, 8, 9]);
		expect(messages).eql([
			["length", 0, 5],
			["splice", [], [[0, [2, 5, 7, 8, 9]]]],
			["change"]
		]);
	});

	it("should initialize proper contents if the source is silent", () => {
		const source = new BindableSet([5, 2, 8, 7, 9], true);
		const target = new BindableArray<number>();
		new SetConverterToArray(source, {target});
		expect(normalizeValues(target)).eql([2, 5, 7, 8, 9]);
	});

	it("should clear the target on destruction", () => {
		const source = new BindableSet([5, 2, 8, 7, 9]);
		const target = new BindableArray<number>();
		const collector = new SetConverterToArray(source, {target});
		const messages = listen(target);
		collector.destroy();
		expect(normalizeValues(target)).eql([]);
		expect(messages).eql([
			["length", 5, 0],
			["clear", [2, 5, 7, 8, 9]],
			["change"]
		]);
	});

	it("should unbind all listeners on destruction", () => {
		const source = new BindableSet([5, 2, 8, 7, 9]);
		const target = new BindableArray<number>();
		const collector = new SetConverterToArray(source, {target});
		assert.isTrue(hasBindings(source));
		collector.destroy();
		assert.isFalse(hasBindings(source));
	});

	it("should support multiple sources", () => {
		const source1 = new BindableSet([1, 2, 3]);
		const source2 = new BindableSet([4, 5]);
		const target = new BindableArray<number>([9]);
		const collector1 = new SetConverterToArray(source1, {target});
		const collector2 = new SetConverterToArray(source2, {target});
		expect(normalizeValues(target)).eql([1, 2, 3, 4, 5, 9]);
		source1.add(6);
		expect(normalizeValues(target)).eql([1, 2, 3, 4, 5, 6, 9]);
		source2.delete(4);
		expect(normalizeValues(target)).eql([1, 2, 3, 5, 6, 9]);
		collector1.destroy();
		expect(normalizeValues(target)).eql([5, 9]);
		source2.add(6);
		expect(normalizeValues(target)).eql([5, 6, 9]);
		collector2.destroy();
		expect(normalizeValues(target)).eql([9]);
		source1.add(10);
		expect(normalizeValues(target)).eql([9]);
		source2.add(11);
		expect(normalizeValues(target)).eql([9]);
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
		result.push(["clear", normalizeValues(oldContents)]);
	});
	array.onChange.listen(() => {
		result.push(["change"]);
	});
	array.length.onChange.listen(message => {
		result.push(["length", message.oldValue, message.value]);
	});
	return result;
}

function parseSpliceResult<T>(spliceResult: IBindableArray.SpliceResult<T>) {
	return [
		normalizeValues(spliceResult.removedItems),
		spliceResult.addedSegments.map(segment => [segment.index, normalizeValues(segment.items)])
	];
}

function hasBindings(array: ReadonlyBindableSet<unknown>) {
	return hasListeners(array.onSplice) ||
		hasListeners(array.onClear);
}

function hasListeners(dispatcher: Listenable<unknown>) {
	const listeners = (<any>dispatcher)._listeners;
	return listeners != null && listeners.size !== 0;
}

function normalizeValues<T>(values: Iterable<T>) {
	return Array.from(values).sort();
}
