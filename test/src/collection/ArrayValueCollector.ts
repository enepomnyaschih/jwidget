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
import ArrayValueCollector, {startCollectingArrayValues} from "jwidget/collection/ArrayValueCollector";
import IBindableSet from "jwidget/IBindableSet";
import Listenable from "jwidget/Listenable";
import ReadonlyBindableArray from "jwidget/ReadonlyBindableArray";
import ReadonlyBindableSet from "jwidget/ReadonlyBindableSet";

describe("startCollectingArrayValues", () => {
	it("should create a new set", () => {
		const source = new BindableArray<number>();
		const target = startCollectingArrayValues(source);
		assert.isTrue(target instanceof BindableSet);
	});

	it("should collect the values initially", () => {
		const source = new BindableArray([5, 2, 8, 7, 9]);
		const target = startCollectingArrayValues(source);
		expect(normalizeValues(target)).eql([2, 5, 7, 8, 9]);
	});

	it("should handle splice message", () => {
		const source = new BindableArray([5, 2, 8, 7, 9]);
		const target = startCollectingArrayValues(source); // 2, 5, 7, 8, 9
		const messages = listen(target);
		source.splice(
			[[0, 2], [4, 1]], // 8, 7
			[[1, [3, 4]], [4, [1, 2]]]); // 8, 3, 4, 7, 1, 2
		expect(normalizeValues(target)).eql([1, 2, 3, 4, 7, 8]);
		expect(messages).eql([
			["size", 5, 6],
			["splice", [5, 9], [1, 3, 4]],
			["change"]
		]);
	});

	it("should handle replace message", () => {
		const source = new BindableArray([5, 2, 8, 7, 9]);
		const target = startCollectingArrayValues(source); // 2, 5, 7, 8, 9
		const messages = listen(target);
		source.set(1, 1); // 5, 1, 8, 7, 9 => 1, 5, 7, 8, 9
		expect(normalizeValues(target)).eql([1, 5, 7, 8, 9]);
		expect(messages).eql([
			["splice", [2], [1]],
			["change"]
		]);
	});

	it("should ignore move message", () => {
		const source = new BindableArray([5, 2, 8, 7, 9]);
		const target = startCollectingArrayValues(source); // 2, 5, 7, 8, 9
		const messages = listen(target);
		source.move(1, 3);
		expect(normalizeValues(target)).eql([2, 5, 7, 8, 9]);
		expect(messages).eql([]);
	});

	it("should ignore reorder message", () => {
		const source = new BindableArray([5, 2, 8, 7, 9]);
		const target = startCollectingArrayValues(source); // 2, 5, 7, 8, 9
		const messages = listen(target);
		source.reorder([2, 4, 3, 0, 1]);
		expect(normalizeValues(target)).eql([2, 5, 7, 8, 9]);
		expect(messages).eql([]);
	});

	it("should handle clear message", () => {
		const source = new BindableArray([5, 2, 8, 7, 9]);
		const target = startCollectingArrayValues(source); // 2, 5, 7, 8, 9
		const messages = listen(target);
		source.clear();
		expect(normalizeValues(target)).eql([]);
		expect(messages).eql([
			["size", 5, 0],
			["clear", [2, 5, 7, 8, 9]],
			["change"]
		]);
	});

	it("should create a silent set with proper contents if the source is silent", () => {
		const source = new BindableArray([5, 2, 8, 7, 9], true);
		const target = startCollectingArrayValues(source); // 2, 5, 7, 8, 9
		assert.isTrue(target.silent);
		expect(normalizeValues(target)).eql([2, 5, 7, 8, 9]);
	});

	it("should unbind all listeners on destruction", () => {
		const source = new BindableArray([5, 2, 8, 7, 9]);
		const target = startCollectingArrayValues(source); // 2, 5, 7, 8, 9
		assert.isTrue(hasBindings(source));
		target.destroy();
		assert.isFalse(hasBindings(source));
	});
});

describe("ArrayValueCollector", () => {
	// Tests above are not repeated here.

	it("should create a new set by default", () => {
		const source = new BindableArray<number>();
		const collector = new ArrayValueCollector(source);
		assert.isTrue(collector.target instanceof BindableSet);
	});

	it("should accept an existing target", () => {
		const source = new BindableArray<number>();
		const target = new BindableSet<number>();
		const collector = new ArrayValueCollector(source, {target});
		expect(collector.target).equal(target);
	});

	it("should fill the target initially", () => {
		const source = new BindableArray([5, 2, 8, 7, 9]);
		const target = new BindableSet<number>();
		const messages = listen(target);
		new ArrayValueCollector(source, {target});
		expect(normalizeValues(target)).eql([2, 5, 7, 8, 9]);
		expect(messages).eql([
			["size", 0, 5],
			["splice", [], [2, 5, 7, 8, 9]],
			["change"]
		]);
	});

	it("should initialize proper contents if the source is silent", () => {
		const source = new BindableArray([5, 2, 8, 7, 9], true);
		const target = new BindableSet<number>();
		new ArrayValueCollector(source, {target});
		expect(normalizeValues(target)).eql([2, 5, 7, 8, 9]);
	});

	it("should clear the target on destruction", () => {
		const source = new BindableArray([5, 2, 8, 7, 9]);
		const target = new BindableSet<number>();
		const collector = new ArrayValueCollector(source, {target});
		const messages = listen(target);
		collector.destroy();
		expect(normalizeValues(target)).eql([]);
		expect(messages).eql([
			["size", 5, 0],
			["clear", [2, 5, 7, 8, 9]],
			["change"]
		]);
	});

	it("should unbind all listeners on destruction", () => {
		const source = new BindableArray([5, 2, 8, 7, 9]);
		const target = new BindableSet<number>();
		const collector = new ArrayValueCollector(source, {target});
		assert.isTrue(hasBindings(source));
		collector.destroy();
		assert.isFalse(hasBindings(source));
	});

	it("should support multiple sources", () => {
		const source1 = new BindableArray([1, 2, 3]);
		const source2 = new BindableArray([4, 5]);
		const target = new BindableSet<number>([9]);
		const collector1 = new ArrayValueCollector(source1, {target});
		const collector2 = new ArrayValueCollector(source2, {target});
		expect(normalizeValues(target)).eql([1, 2, 3, 4, 5, 9]);
		source1.add(6);
		expect(normalizeValues(target)).eql([1, 2, 3, 4, 5, 6, 9]);
		source2.remove(0);
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

function listen(set: ReadonlyBindableSet<any>) {
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

function parseSpliceResult<T>(spliceResult: IBindableSet.SpliceResult<T>) {
	return [
		normalizeValues(spliceResult.deletedValues),
		normalizeValues(spliceResult.addedValues)
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

function normalizeValues<T>(values: Iterable<T>) {
	return Array.from(values).sort();
}
