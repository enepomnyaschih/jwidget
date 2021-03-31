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
import SetMapper, {startMappingSet} from "jwidget/collection/SetMapper";
import IBindableSet from "jwidget/IBindableSet";
import {cmpPrimitives} from "jwidget/internal";
import Listenable from "jwidget/Listenable";
import ReadonlyBindableSet from "jwidget/ReadonlyBindableSet";

describe("startMappingSet", () => {
	it("should create a new set", () => {
		const source = new BindableSet<number>();
		const target = startMappingSet(source, String);
		assert.isTrue(target instanceof BindableSet);
		expect(target).not.equal(source);
		expect(target.native).not.equal(source.native);
	});

	it("should map the target initially", () => {
		const source = new BindableSet([5, 2, 8]);
		const target = startMappingSet(source, String);
		expect(normalizeValues(target)).eql(["2", "5", "8"]);
	});

	it("should make proper calls on initialization", () => {
		const calls: any[] = [];
		const source = new BindableSet([5, 2, 8]);
		startMappingSet(source, makeCreator(String, calls), {destroy: makeDestroyer(calls)});
		expect(calls).eql([
			["create", [2, 5, 8]]
		]);
	});

	it("should handle splice message", () => {
		const source = new BindableSet([5, 2, 8]);
		const target = startMappingSet(source, String);
		const messages = listen(target);
		source.splice([5], [1, 3]);
		expect(normalizeValues(target)).eql(["1", "2", "3", "8"]);
		expect(messages).eql([
			["size", 3, 4],
			["splice", ["5"], ["1", "3"]],
			["change"]
		]);
	});

	it("should make proper calls on splice", () => {
		const calls: any[] = [];
		const source = new BindableSet([5, 2, 8]);
		startMappingSet(source, makeCreator(String, calls), {destroy: makeDestroyer(calls)});
		calls.splice(0);
		source.splice([5], [1, 3]);
		expect(calls).eql([
			["create", [1, 3]],
			["destroy", [["5", 5]]]
		]);
	});

	it("should handle clear message", () => {
		const source = new BindableSet([5, 2, 8]);
		const target = startMappingSet(source, String);
		const messages = listen(target);
		source.clear();
		expect(normalizeValues(target)).eql([]);
		expect(messages).eql([
			["size", 3, 0],
			["clear", ["2", "5", "8"]],
			["change"]
		]);
	});

	it("should make proper calls on clear", () => {
		const calls: any[] = [];
		const source = new BindableSet([5, 2, 8]);
		startMappingSet(source, makeCreator(String, calls), {destroy: makeDestroyer(calls)});
		calls.splice(0);
		source.clear();
		expect(calls).eql([
			["destroy", [["2", 2], ["5", 5], ["8", 8]]]
		]);
	});

	it("should create a silent array with proper contents if the source is silent", () => {
		const source = new BindableSet([5, 2, 8], true);
		const target = startMappingSet(source, String);
		assert.isTrue(target.silent);
		expect(normalizeValues(target)).eql(["2", "5", "8"]);
	});

	it("should unbind all listeners on destruction", () => {
		const source = new BindableSet([5, 2, 8]);
		const target = startMappingSet(source, String);
		assert.isTrue(hasBindings(source));
		target.destroy();
		assert.isFalse(hasBindings(source));
	});

	it("should make proper calls on destruction", () => {
		const calls: any[] = [];
		const source = new BindableSet([5, 2, 8]);
		const target = startMappingSet(source, makeCreator(String, calls), {destroy: makeDestroyer(calls)});
		calls.splice(0);
		target.destroy();
		expect(calls).eql([
			["destroy", [["2", 2], ["5", 5], ["8", 8]]]
		]);
	});

	it("should make proper calls on destruction even if the source is silent", () => {
		const calls: any[] = [];
		const source = new BindableSet([5, 2, 8], true);
		const target = startMappingSet(source, makeCreator(String, calls), {destroy: makeDestroyer(calls)});
		calls.splice(0);
		target.destroy();
		expect(calls).eql([
			["destroy", [["2", 2], ["5", 5], ["8", 8]]]
		]);
	});
});

describe("SetMapper", () => {
	// Tests above are not repeated here.

	it("should create a new set by default", () => {
		const source = new BindableSet<number>();
		const mapper = new SetMapper(source, String);
		assert.isTrue(mapper.target instanceof BindableSet);
		expect(mapper.target).not.equal(source);
		expect(mapper.target.native).not.equal(source.native);
	});

	it("should accept an existing target", () => {
		const source = new BindableSet<number>();
		const target = new BindableSet<string>();
		const mapper = new SetMapper(source, String, {target});
		expect(mapper.target).equal(target);
	});

	it("should map the target initially", () => {
		const source = new BindableSet([5, 2, 8]);
		const target = new BindableSet<string>();
		const messages = listen(target);
		new SetMapper(source, String, {target});
		expect(normalizeValues(target)).eql(["2", "5", "8"]);
		expect(messages).eql([
			["size", 0, 3],
			["splice", [], ["2", "5", "8"]],
			["change"]
		]);
	});

	it("should make proper calls on initialization", () => {
		const calls: any[] = [];
		const source = new BindableSet([5, 2, 8]);
		const target = new BindableSet<string>();
		new SetMapper(source, makeCreator(String, calls), {target, destroy: makeDestroyer(calls)});
		expect(calls).eql([
			["create", [2, 5, 8]]
		]);
	});

	it("should initialize proper contents if the source is silent", () => {
		const source = new BindableSet([5, 2, 8], true);
		const target = new BindableSet<string>();
		new SetMapper(source, String, {target});
		expect(normalizeValues(target)).eql(["2", "5", "8"]);
	});

	it("should clear the target on destruction", () => {
		const source = new BindableSet([5, 2, 8]);
		const target = new BindableSet<string>();
		const mapper = new SetMapper(source, String, {target});
		const messages = listen(target);
		mapper.destroy();
		expect(normalizeValues(target)).eql([]);
		expect(messages).eql([
			["size", 3, 0],
			["clear", ["2", "5", "8"]],
			["change"]
		]);
	});

	it("should unbind all listeners on destruction", () => {
		const source = new BindableSet([5, 2, 8]);
		const target = new BindableSet<string>();
		const mapper = new SetMapper(source, String, {target});
		assert.isTrue(hasBindings(source));
		mapper.destroy();
		assert.isFalse(hasBindings(source));
	});

	it("should make proper calls on destruction", () => {
		const calls: any[] = [];
		const source = new BindableSet([5, 2, 8]);
		const target = new BindableSet<string>();
		const mapper = new SetMapper(source, makeCreator(String, calls), {target, destroy: makeDestroyer(calls)});
		calls.splice(0);
		mapper.destroy();
		expect(calls).eql([
			["destroy", [["2", 2], ["5", 5], ["8", 8]]]
		]);
	});

	it("should support multiple sources", () => {
		const source1 = new BindableSet([1, 2, 3]);
		const source2 = new BindableSet([4, 5, 1]);
		const target = new BindableSet(["a"]);
		const collector1 = new SetMapper(source1, String, {target});
		const collector2 = new SetMapper(source2, x => x + "!", {target});
		expect(normalizeValues(target)).eql(["1", "1!", "2", "3", "4!", "5!", "a"]);
		source1.addAll([7, 8]);
		expect(normalizeValues(target)).eql(["1", "1!", "2", "3", "4!", "5!", "7", "8", "a"]);
		source2.deleteAll([4, 5]);
		expect(normalizeValues(target)).eql(["1", "1!", "2", "3", "7", "8", "a"]);
		collector1.destroy();
		expect(normalizeValues(target)).eql(["1!", "a"]);
		source2.add(8);
		expect(normalizeValues(target)).eql(["1!", "8!", "a"]);
		collector2.destroy();
		expect(normalizeValues(target)).eql(["a"]);
		source1.add(12);
		expect(normalizeValues(target)).eql(["a"]);
		source2.add(14);
		expect(normalizeValues(target)).eql(["a"]);
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

function hasBindings(array: ReadonlyBindableSet<unknown>) {
	return hasListeners(array.onSplice) ||
		hasListeners(array.onClear);
}

function hasListeners(dispatcher: Listenable<unknown>) {
	const listeners = (<any>dispatcher)._listeners;
	return listeners != null && listeners.size !== 0;
}

function makeCreator<T, U>(creator: (value: T) => U, calls: any[]) {
	return (value: T) => {
		if (calls.length && calls[calls.length - 1][0] === "create") {
			calls[calls.length - 1][1].push(value);
			calls[calls.length - 1][1].sort();
		} else {
			calls.push(["create", [value]]);
		}
		return creator(value);
	};
}

function makeDestroyer<T, U>(calls: any[]) {
	return (targetValue: U, sourceValue: T) => {
		if (calls.length && calls[calls.length - 1][0] === "destroy") {
			calls[calls.length - 1][1].push([targetValue, sourceValue]);
			calls[calls.length - 1][1].sort((x: any, y: any) => cmpPrimitives(x[0], y[0]));
		} else {
			calls.push(["destroy", [[targetValue, sourceValue]]]);
		}
	};
}

function normalizeValues<T>(values: Iterable<T>) {
	return Array.from(values).sort();
}
