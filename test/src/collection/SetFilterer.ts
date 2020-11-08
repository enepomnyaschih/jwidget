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
import SetFilterer, {startFilteringSet} from "jwidget/collection/SetFilterer";
import IBindableSet from "jwidget/IBindableSet";
import Listenable from "jwidget/Listenable";
import ReadonlyBindableSet from "jwidget/ReadonlyBindableSet";

describe("startFilteringSet", () => {
	it("should create a new set", () => {
		const source = new BindableSet<number>();
		const target = startFilteringSet(source, () => true);
		assert.isTrue(target instanceof BindableSet);
		expect(target).not.equal(source);
		expect(target.native).not.equal(source.native);
	});

	it("should filter the target initially", () => {
		const source = new BindableSet([5, 2, 8, 7, 6]);
		const target = startFilteringSet(source, x => x % 2 === 0);
		expect(normalizeValues(target)).eql([2, 6, 8]);
	});

	it("should make proper calls on initialization", () => {
		const calls: number[] = [];
		const source = new BindableSet([5, 2, 8, 7, 6]);
		startFilteringSet(source, makeTester(x => x % 2 === 0, calls));
		expect(normalizeValues(calls)).eql([2, 5, 6, 7, 8]);
	});

	it("should handle splice message", () => {
		const source = new BindableSet([5, 2, 8, 7, 6]);
		const target = startFilteringSet(source, x => x % 2 === 0); // 2, 6, 8
		const messages = listen(target);
		source.splice([5, 2, 6], [1, 3, 4]); // 1, 3, 4, 7, 8 => 4, 8
		expect(normalizeValues(target)).eql([4, 8]);
		expect(messages).eql([
			["size", 3, 2],
			["splice", [2, 6], [4]],
			["change"]
		]);
	});

	it("should make proper calls on splice", () => {
		const calls: number[] = [];
		const source = new BindableSet([5, 2, 8, 7, 6]);
		startFilteringSet(source, makeTester(x => x % 2 === 0, calls)); // 2, 6, 8
		calls.splice(0);
		source.splice([5, 2, 6], [1, 3, 4]); // 1, 3, 4, 7, 8 => 4, 8
		expect(normalizeValues(calls)).eql([1, 3, 4]);
	});

	it("should handle clear message for a non-empty set", () => {
		const source = new BindableSet([5, 2, 8, 7, 6]);
		const target = startFilteringSet(source, x => x % 2 === 0); // 2, 6, 8
		const messages = listen(target);
		source.clear();
		expect(normalizeValues(target)).eql([]);
		expect(messages).eql([
			["size", 3, 0],
			["clear", [2, 6, 8]],
			["change"]
		]);
	});

	it("should ignore clear message for an empty set", () => {
		const source = new BindableSet([5, 2, 8, 7, 10]);
		const target = startFilteringSet(source, x => x % 3 === 0);
		const messages = listen(target);
		source.clear();
		expect(normalizeValues(target)).eql([]);
		expect(messages).eql([]);
	});

	it("should not make any calls on clear", () => {
		const calls: number[] = [];
		const source = new BindableSet([5, 2, 8, 7, 6]);
		startFilteringSet(source, makeTester(x => x % 2 === 0, calls)); // 2, 6, 8
		calls.splice(0);
		source.clear();
		expect(normalizeValues(calls)).eql([]);
	});

	it("should create a silent set with proper contents if the source is silent", () => {
		const source = new BindableSet([5, 2, 8, 7, 6], true);
		const target = startFilteringSet(source, x => x % 2 === 0);
		assert.isTrue(target.silent);
		expect(normalizeValues(target)).eql([2, 6, 8]);
	});

	it("should unbind all listeners on destruction", () => {
		const source = new BindableSet([5, 2, 8, 7, 6]);
		const target = startFilteringSet(source, x => x % 2 === 0);
		assert.isTrue(hasBindings(source));
		target.destroy();
		assert.isFalse(hasBindings(source));
	});

	it("should make no calls on destruction", () => {
		const calls: number[] = [];
		const source = new BindableSet([5, 2, 8, 7, 6]);
		const target = startFilteringSet(source, makeTester(x => x % 2 === 0, calls));
		calls.splice(0);
		target.destroy();
		expect(normalizeValues(calls)).eql([]);
	});
});

describe("SetFilterer", () => {
	// Tests above are not repeated here.

	it("should create a new set by default", () => {
		const source = new BindableSet<number>();
		const filterer = new SetFilterer(source, () => true);
		assert.isTrue(filterer.target instanceof BindableSet);
		expect(filterer.target).not.equal(source);
		expect(filterer.target.native).not.equal(source.native);
	});

	it("should accept an existing target", () => {
		const source = new BindableSet<number>();
		const target = new BindableSet<number>();
		const filterer = new SetFilterer(source, () => true, {target});
		expect(filterer.target).equal(target);
	});

	it("should filter the target initially", () => {
		const source = new BindableSet([5, 2, 8, 7, 6]);
		const target = new BindableSet<number>();
		const messages = listen(target);
		new SetFilterer(source, x => x % 2 === 0, {target});
		expect(normalizeValues(target)).eql([2, 6, 8]);
		expect(messages).eql([
			["size", 0, 3],
			["splice", [], [2, 6, 8]],
			["change"]
		]);
	});

	it("should make proper calls on initialization", () => {
		const calls: number[] = [];
		const source = new BindableSet([5, 2, 8, 7, 6]);
		const target = new BindableSet<number>();
		new SetFilterer(source, makeTester(x => x % 2 === 0, calls), {target});
		expect(normalizeValues(calls)).eql([2, 5, 6, 7, 8]);
	});

	it("should initialize proper contents if the source is silent", () => {
		const source = new BindableSet([5, 2, 8, 7, 6], true);
		const target = new BindableSet<number>();
		new SetFilterer(source, x => x % 2 === 0, {target}); // 2, 6, 8
		expect(normalizeValues(target)).eql([2, 6, 8]);
	});

	it("should clear the target on destruction", () => {
		const source = new BindableSet([5, 2, 8, 7, 6]);
		const target = new BindableSet<number>();
		const filterer = new SetFilterer(source, x => x % 2 === 0, {target}); // 2, 6, 8
		const messages = listen(target);
		filterer.destroy();
		expect(normalizeValues(target)).eql([]);
		expect(messages).eql([
			["size", 3, 0],
			["clear", [2, 6, 8]],
			["change"]
		]);
	});

	it("should unbind all listeners on destruction", () => {
		const source = new BindableSet([5, 2, 8, 7, 6]);
		const target = new BindableSet<number>();
		const filterer = new SetFilterer(source, x => x % 2 === 0, {target}); // 2, 6, 8
		assert.isTrue(hasBindings(source));
		filterer.destroy();
		assert.isFalse(hasBindings(source));
	});

	it("should support multiple sources", () => {
		const source1 = new BindableSet([1, 2, 3]);
		const source2 = new BindableSet([4, 5, 6]);
		const target = new BindableSet([9]);
		const collector1 = new SetFilterer(source1, x => x % 2 === 0, {target});
		const collector2 = new SetFilterer(source2, x => x % 2 === 0, {target});
		expect(normalizeValues(target)).eql([2, 4, 6, 9]);
		source1.addAll([7, 8]);
		expect(normalizeValues(target)).eql([2, 4, 6, 8, 9]);
		source2.deleteAll([4, 5]);
		expect(normalizeValues(target)).eql([2, 6, 8, 9]);
		collector1.destroy();
		expect(normalizeValues(target)).eql([6, 9]);
		source2.add(8);
		expect(normalizeValues(target)).eql([6, 8, 9]);
		collector2.destroy();
		expect(normalizeValues(target)).eql([9]);
		source1.add(12);
		expect(normalizeValues(target)).eql([9]);
		source2.add(14);
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
		normalizeValues(spliceResult.removedValues),
		normalizeValues(spliceResult.addedValues)
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

function makeTester<T>(test: (value: T) => boolean, calls: T[]) {
	return (value: T) => {
		calls.push(value);
		return test(value);
	};
}

function normalizeValues<T>(values: Iterable<T>) {
	return Array.from(values).sort();
}
