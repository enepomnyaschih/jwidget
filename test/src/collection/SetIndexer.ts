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
import BindableMap from "jwidget/BindableMap";
import BindableSet from "jwidget/BindableSet";
import SetIndexer, {startIndexingSet} from "jwidget/collection/SetIndexer";
import IBindableMap from "jwidget/IBindableMap";
import {cmpPrimitives} from "jwidget/internal";
import Listenable from "jwidget/Listenable";
import ReadonlyBindableMap from "jwidget/ReadonlyBindableMap";
import ReadonlyBindableSet from "jwidget/ReadonlyBindableSet";

describe("startIndexingSet", () => {
	it("should create a new map", () => {
		const source = new BindableSet<number>();
		const target = startIndexingSet(source, String);
		assert.isTrue(target instanceof BindableMap);
		expect(target).not.equal(source);
		expect(target.native).not.equal(source.native);
	});

	it("should fill the target initially", () => {
		const source = new BindableSet([5, 2, 8]);
		const target = startIndexingSet(source, String);
		expect(normalizeEntries(target)).eql([["2", 2], ["5", 5], ["8", 8]]);
	});

	it("should make proper calls on initialization", () => {
		const calls: number[] = [];
		const source = new BindableSet([5, 2, 8]);
		startIndexingSet(source, makeMapper(String, calls));
		expect(normalizeCalls(calls)).eql([2, 5, 8]);
	});

	it("should handle splice message", () => {
		const source = new BindableSet([5, 2, 8]);
		const target = startIndexingSet(source, String);
		const messages = listen(target);
		source.splice([5], [1, 3]); // 1, 2, 3, 8
		expect(normalizeEntries(target)).eql([["1", 1], ["2", 2], ["3", 3], ["8", 8]]);
		expect(messages).eql([
			["size", 3, 4],
			["splice", [["5", 5]], [["1", 1], ["3", 3]]],
			["change"]
		]);
	});

	it("should make proper calls on splice", () => {
		const calls: number[] = [];
		const source = new BindableSet([5, 2, 8]);
		startIndexingSet(source, makeMapper(String, calls));
		calls.splice(0);
		source.splice([5], [1, 3]); // 1, 2, 3, 8
		expect(normalizeCalls(calls)).eql([1, 3, 5]);
	});

	it("should handle clear message", () => {
		const source = new BindableSet([5, 2, 8]);
		const target = startIndexingSet(source, String);
		const messages = listen(target);
		source.clear();
		expect(normalizeEntries(target)).eql([]);
		expect(messages).eql([
			["size", 3, 0],
			["clear", [["2", 2], ["5", 5], ["8", 8]]],
			["change"]
		]);
	});

	it("should not make any calls on clear", () => {
		const calls: number[] = [];
		const source = new BindableSet([5, 2, 8]);
		startIndexingSet(source, makeMapper(String, calls));
		calls.splice(0);
		source.clear();
		expect(normalizeCalls(calls)).eql([]);
	});

	it("should create a silent set with proper contents if the source is silent", () => {
		const source = new BindableSet([5, 2, 8], true);
		const target = startIndexingSet(source, String);
		assert.isTrue(target.silent);
		expect(normalizeEntries(target)).eql([["2", 2], ["5", 5], ["8", 8]]);
	});

	it("should unbind all listeners on destruction", () => {
		const source = new BindableSet([5, 2, 8]);
		const target = startIndexingSet(source, String);
		assert.isTrue(hasBindings(source));
		target.destroy();
		assert.isFalse(hasBindings(source));
	});

	it("should make no calls on destruction", () => {
		const calls: number[] = [];
		const source = new BindableSet([5, 2, 8]);
		const target = startIndexingSet(source, makeMapper(String, calls));
		calls.splice(0);
		target.destroy();
		expect(normalizeCalls(calls)).eql([]);
	});
});

describe("SetIndexer", () => {
	// Tests above are not repeated here.

	it("should create a new set by default", () => {
		const source = new BindableSet<number>();
		const indexer = new SetIndexer(source, String);
		assert.isTrue(indexer.target instanceof BindableMap);
		expect(indexer.target).not.equal(source);
		expect(indexer.target.native).not.equal(source.native);
	});

	it("should accept an existing target", () => {
		const source = new BindableSet<number>();
		const target = new BindableMap<string, number>();
		const indexer = new SetIndexer(source, String, {target});
		expect(indexer.target).equal(target);
	});

	it("should fill the target initially", () => {
		const source = new BindableSet([5, 2, 8]);
		const target = new BindableMap<string, number>();
		const messages = listen(target);
		new SetIndexer(source, String, {target});
		expect(normalizeEntries(target)).eql([["2", 2], ["5", 5], ["8", 8]]);
		expect(messages).eql([
			["size", 0, 3],
			["splice", [], [["2", 2], ["5", 5], ["8", 8]]],
			["change"]
		]);
	});

	it("should make proper calls on initialization", () => {
		const calls: number[] = [];
		const source = new BindableSet([5, 2, 8]);
		const target = new BindableMap<string, number>();
		new SetIndexer(source, makeMapper(String, calls), {target});
		expect(normalizeCalls(calls)).eql([2, 5, 8]);
	});

	it("should initialize proper contents if the source is silent", () => {
		const source = new BindableSet([5, 2, 8], true);
		const target = new BindableMap<string, number>();
		new SetIndexer(source, String, {target});
		expect(normalizeEntries(target)).eql([["2", 2], ["5", 5], ["8", 8]]);
	});

	it("should clear the target on destruction", () => {
		const source = new BindableSet([5, 2, 8]);
		const target = new BindableMap<string, number>();
		const indexer = new SetIndexer(source, String, {target});
		const messages = listen(target);
		indexer.destroy();
		expect(normalizeEntries(target)).eql([]);
		expect(messages).eql([
			["size", 3, 0],
			["clear", [["2", 2], ["5", 5], ["8", 8]]],
			["change"]
		]);
	});

	it("should unbind all listeners on destruction", () => {
		const source = new BindableSet([5, 2, 8]);
		const target = new BindableMap<string, number>();
		const indexer = new SetIndexer(source, String, {target});
		assert.isTrue(hasBindings(source));
		indexer.destroy();
		assert.isFalse(hasBindings(source));
	});

	it("should support multiple sources", () => {
		const source1 = new BindableSet([1, 2, 3]);
		const source2 = new BindableSet([4, 5, 1]);
		const target = new BindableMap([["a", 9]]);
		const collector1 = new SetIndexer(source1, String, {target});
		const collector2 = new SetIndexer(source2, x => x + "!", {target});
		expect(normalizeEntries(target)).eql([["1", 1], ["1!", 1], ["2", 2], ["3", 3], ["4!", 4], ["5!", 5], ["a", 9]]);
		source1.addAll([7, 8]);
		expect(normalizeEntries(target)).eql([["1", 1], ["1!", 1], ["2", 2], ["3", 3], ["4!", 4], ["5!", 5], ["7", 7], ["8", 8], ["a", 9]]);
		source2.deleteAll([4, 5]);
		expect(normalizeEntries(target)).eql([["1", 1], ["1!", 1], ["2", 2], ["3", 3], ["7", 7], ["8", 8], ["a", 9]]);
		collector1.destroy();
		expect(normalizeEntries(target)).eql([["1!", 1], ["a", 9]]);
		source2.add(8);
		expect(normalizeEntries(target)).eql([["1!", 1], ["8!", 8], ["a", 9]]);
		collector2.destroy();
		expect(normalizeEntries(target)).eql([["a", 9]]);
		source1.add(12);
		expect(normalizeEntries(target)).eql([["a", 9]]);
		source2.add(14);
		expect(normalizeEntries(target)).eql([["a", 9]]);
	});
});

function listen(map: ReadonlyBindableMap<any, any>) {
	const result: any[] = [];
	map.onSplice.listen(spliceResult => {
		result.push(["splice", ...parseSpliceResult(spliceResult)]);
	});
	map.onReindex.listen(mapping => {
		result.push(["reindex", normalizeEntries(mapping)]);
	});
	map.onClear.listen(oldContents => {
		result.push(["clear", normalizeEntries(oldContents)]);
	});
	map.onChange.listen(() => {
		result.push(["change"]);
	});
	map.size.onChange.listen(message => {
		result.push(["size", message.oldValue, message.value]);
	});
	return result;
}

function parseSpliceResult<K, V>(spliceResult: IBindableMap.SpliceResult<K, V>) {
	return [
		normalizeEntries(spliceResult.removedEntries.entries()),
		normalizeEntries(spliceResult.addedEntries.entries())
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

function makeMapper<T, U>(mapper: (value: T) => U, calls: T[]) {
	return (value: T) => {
		calls.push(value);
		return mapper(value);
	};
}

function normalizeEntries<K, V>(entries: Iterable<readonly [K, V]>) {
	return Array.from(entries).sort((x, y) => cmpPrimitives(x[0], y[0]))
}

function normalizeCalls(calls: number[]) {
	return calls.concat().sort();
}
