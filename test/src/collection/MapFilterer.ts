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
import MapFilterer, {startFilteringMap} from "jwidget/collection/MapFilterer";
import IBindableMap from "jwidget/IBindableMap";
import {cmpPrimitives} from "jwidget/internal";
import Listenable from "jwidget/Listenable";
import ReadonlyBindableMap from "jwidget/ReadonlyBindableMap";

describe("startFilteringMap", () => {
	it("should create a new array", () => {
		const source = new BindableMap<string, number>();
		const target = startFilteringMap(source, () => true);
		assert.isTrue(target instanceof BindableMap);
		expect(target).not.equal(source);
		expect(target.native).not.equal(source.native);
	});

	it("should filter the target initially", () => {
		const source = new BindableMap([["a", 5], ["b", 2], ["c", 8], ["d", 7], ["e", 8]]);
		const target = startFilteringMap(source, x => x % 2 === 0);
		expect(normalizeEntries(target)).eql([["b", 2], ["c", 8], ["e", 8]]);
	});

	it("should make proper calls on initialization", () => {
		const calls: number[] = [];
		const source = new BindableMap([["a", 5], ["b", 2], ["c", 8], ["d", 7], ["e", 8]]);
		startFilteringMap(source, makeTester(x => x % 2 === 0, calls));
		expect(calls).eql([5, 2, 8, 7, 8]);
	});

	it("should handle splice message", () => {
		const source = new BindableMap([["a", 5], ["b", 2], ["c", 8], ["d", 7], ["e", 8]]);
		const target = startFilteringMap(source, x => x % 2 === 0); // b: 2, c: 8, e: 8
		const messages = listen(target);
		source.splice(["c"], new Map([["b", 3], ["d", 4], ["e", 10], ["f", 3], ["h", 4]])); // a: 5, b: 3, d: 4, e: 10, f: 3, h: 4
		expect(normalizeEntries(target)).eql([["d", 4], ["e", 10], ["h", 4]]);
		expect(messages).eql([
			["splice", [["b", 2], ["c", 8], ["e", 8]], [["d", 4], ["e", 10], ["h", 4]]],
			["change"]
		]);
	});

	it("should make proper calls on splice", () => {
		const calls: number[] = [];
		const source = new BindableMap([["a", 5], ["b", 2], ["c", 8], ["d", 7], ["e", 8]]);
		startFilteringMap(source, makeTester(x => x % 2 === 0, calls)); // b: 2, c: 8, e: 8
		calls.splice(0);
		source.splice(["c"], new Map([["b", 3], ["d", 4], ["f", 3], ["h", 4]])); // a: 5, b: 3, d: 4, e: 8, f: 3, h: 4
		expect(normalizeCalls(calls)).eql([3, 3, 4, 4]);
	});

	it("should handle reindex message", () => {
		const source = new BindableMap([["a", 5], ["b", 2], ["c", 8], ["d", 7], ["e", 8]]);
		const target = startFilteringMap(source, x => x % 2 === 0); // b: 2, c: 8, e: 8
		const messages = listen(target);
		source.reindex(new Map([["b", "f"], ["c", "g"]])); // a: 5, d: 7, e: 8, f: 2, g: 8
		expect(normalizeEntries(target)).eql([["e", 8], ["f", 2], ["g", 8]]);
		expect(messages).eql([
			["reindex", [["b", "f"], ["c", "g"]]],
			["change"]
		]);
	});

	it("should ignore reindex message for identity", () => {
		const source = new BindableMap([["a", 5], ["b", 2], ["c", 8], ["d", 7], ["e", 8]]);
		const target = startFilteringMap(source, x => x % 2 === 0); // b: 2, c: 8, e: 8
		const messages = listen(target);
		source.reindex(new Map([["a", "f"], ["d", "g"]])); // b: 2, c: 8, e: 8, f: 5, g: 7
		expect(normalizeEntries(target)).eql([["b", 2], ["c", 8], ["e", 8]]);
		expect(messages).eql([]);
	});

	it("should make no calls on reindex", () => {
		const calls: number[] = [];
		const source = new BindableMap([["a", 5], ["b", 2], ["c", 8], ["d", 7], ["e", 8]]);
		startFilteringMap(source, makeTester(x => x % 2 === 0, calls)); // b: 2, c: 8, e: 8
		calls.splice(0);
		source.reindex(new Map([["b", "f"], ["c", "g"]])); // a: 5, d: 7, e: 8, f: 2, g: 8
		expect(calls).eql([]);
	});

	it("should handle clear message for a non-empty map", () => {
		const source = new BindableMap([["a", 5], ["b", 2], ["c", 8], ["d", 7], ["e", 8]]);
		const target = startFilteringMap(source, x => x % 2 === 0); // b: 2, c: 8, e: 8
		const messages = listen(target);
		source.clear();
		expect(normalizeEntries(target)).eql([]);
		expect(messages).eql([
			["size", 3, 0],
			["clear", [["b", 2], ["c", 8], ["e", 8]]],
			["change"]
		]);
	});

	it("should ignore clear message for an empty map", () => {
		const source = new BindableMap([["a", 5], ["b", 2], ["c", 8], ["d", 7], ["e", 8]]);
		const target = startFilteringMap(source, x => x % 3 === 0);
		const messages = listen(target);
		source.clear();
		expect(normalizeEntries(target)).eql([]);
		expect(messages).eql([]);
	});

	it("should not make any calls on clear", () => {
		const calls: number[] = [];
		const source = new BindableMap([["a", 5], ["b", 2], ["c", 8], ["d", 7], ["e", 8]]);
		startFilteringMap(source, makeTester(x => x % 2 === 0, calls)); // b: 2, c: 8, e: 8
		calls.splice(0);
		source.clear();
		expect(calls).eql([]);
	});

	it("should create a silent map with proper contents if the source is silent", () => {
		const source = new BindableMap([["a", 5], ["b", 2], ["c", 8], ["d", 7], ["e", 8]], true);
		const target = startFilteringMap(source, x => x % 2 === 0);
		assert.isTrue(target.silent);
		expect(normalizeEntries(target)).eql([["b", 2], ["c", 8], ["e", 8]]);
	});

	it("should unbind all listeners on destruction", () => {
		const source = new BindableMap([["a", 5], ["b", 2], ["c", 8], ["d", 7], ["e", 8]]);
		const target = startFilteringMap(source, x => x % 2 === 0);
		assert.isTrue(hasBindings(source));
		target.destroy();
		assert.isFalse(hasBindings(source));
	});

	it("should make no calls on destruction", () => {
		const calls: number[] = [];
		const source = new BindableMap([["a", 5], ["b", 2], ["c", 8], ["d", 7], ["e", 8]]);
		const target = startFilteringMap(source, makeTester(x => x % 2 === 0, calls));
		calls.splice(0);
		target.destroy();
		expect(calls).eql([]);
	});
});

describe("MapFilterer", () => {
	// Tests above are not repeated here.

	it("should create a new map by default", () => {
		const source = new BindableMap<string, number>();
		const filterer = new MapFilterer(source, () => true);
		assert.isTrue(filterer.target instanceof BindableMap);
		expect(filterer.target).not.equal(source);
		expect(filterer.target.native).not.equal(source.native);
	});

	it("should accept an existing target", () => {
		const source = new BindableMap<string, number>();
		const target = new BindableMap<string, number>();
		const filterer = new MapFilterer(source, () => true, {target});
		expect(filterer.target).equal(target);
	});

	it("should filter the target initially", () => {
		const source = new BindableMap([["a", 5], ["b", 2], ["c", 8], ["d", 7], ["e", 8]]);
		const target = new BindableMap<string, number>();
		const messages = listen(target);
		new MapFilterer(source, x => x % 2 === 0, {target});
		expect(normalizeEntries(target)).eql([["b", 2], ["c", 8], ["e", 8]]);
		expect(messages).eql([
			["size", 0, 3],
			["splice", [], [["b", 2], ["c", 8], ["e", 8]]],
			["change"]
		]);
	});

	it("should make proper calls on initialization", () => {
		const calls: number[] = [];
		const source = new BindableMap([["a", 5], ["b", 2], ["c", 8], ["d", 7], ["e", 8]]);
		const target = new BindableMap<string, number>();
		new MapFilterer(source, makeTester(x => x % 2 === 0, calls), {target});
		expect(normalizeCalls(calls)).eql([2, 5, 7, 8, 8]);
	});

	it("should initialize proper contents if the source is silent", () => {
		const source = new BindableMap([["a", 5], ["b", 2], ["c", 8], ["d", 7], ["e", 8]], true);
		const target = new BindableMap<string, number>();
		new MapFilterer(source, x => x % 2 === 0, {target}); // b: 2, c: 8, e: 8
		expect(normalizeEntries(target)).eql([["b", 2], ["c", 8], ["e", 8]]);
	});

	it("should clear the target on destruction", () => {
		const source = new BindableMap([["a", 5], ["b", 2], ["c", 8], ["d", 7], ["e", 8]]);
		const target = new BindableMap<string, number>();
		const filterer = new MapFilterer(source, x => x % 2 === 0, {target}); // b: 2, c: 8, e: 8
		const messages = listen(target);
		filterer.destroy();
		expect(normalizeEntries(target)).eql([]);
		expect(messages).eql([
			["size", 3, 0],
			["clear", [["b", 2], ["c", 8], ["e", 8]]],
			["change"]
		]);
	});

	it("should unbind all listeners on destruction", () => {
		const source = new BindableMap([["a", 5], ["b", 2], ["c", 8], ["d", 7], ["e", 8]]);
		const target = new BindableMap<string, number>();
		const filterer = new MapFilterer(source, x => x % 2 === 0, {target}); // b: 2, c: 8, e: 8
		assert.isTrue(hasBindings(source));
		filterer.destroy();
		assert.isFalse(hasBindings(source));
	});

	it("should support multiple sources", () => {
		const source1 = new BindableMap([["a", 1], ["b", 2], ["c", 3]]);
		const source2 = new BindableMap([["c", 4], ["d", 5], ["g", 0]]);
		const target = new BindableMap<string, number>([["e", 9]]);
		const collector1 = new MapFilterer(source1, x => x % 2 === 0, {target});
		const collector2 = new MapFilterer(source2, x => x % 2 === 0, {target});
		expect(normalizeEntries(target)).eql([["b", 2], ["c", 4], ["e", 9], ["g", 0]]);
		source1.setAll(new Map([["f", 6], ["g", 7]]));
		expect(normalizeEntries(target)).eql([["b", 2], ["c", 4], ["e", 9], ["f", 6], ["g", 0]]);
		source2.removeAll(["c", "d"]);
		expect(normalizeEntries(target)).eql([["b", 2], ["e", 9], ["f", 6], ["g", 0]]);
		collector1.destroy();
		// This assertion is particularly interesting, because "g" key is also present in source1, but it is odd.
		expect(normalizeEntries(target)).eql([["e", 9], ["g", 0]]);
		source2.set("d", 6);
		expect(normalizeEntries(target)).eql([["d", 6], ["e", 9], ["g", 0]]);
		collector2.destroy();
		expect(normalizeEntries(target)).eql([["e", 9]]);
		source1.set("k", 2);
		expect(normalizeEntries(target)).eql([["e", 9]]);
		source2.set("l", 4);
		expect(normalizeEntries(target)).eql([["e", 9]]);
	});
});

function listen(map: ReadonlyBindableMap<any, any>) {
	const result: any[] = [];
	map.onSplice.listen(spliceResult => {
		result.push(["splice", ...parseSpliceResult(spliceResult)]);
	});
	map.onReindex.listen(mapping => {
		result.push(["reindex", Array.from(mapping)]);
	});
	map.onClear.listen(oldContents => {
		result.push(["clear", Array.from(oldContents)]);
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

function hasBindings(array: ReadonlyBindableMap<unknown, unknown>) {
	return hasListeners(array.onSplice) ||
		hasListeners(array.onReindex) ||
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

function normalizeEntries<K, V>(entries: Iterable<readonly [K, V]>) {
	return Array.from(entries).sort((x, y) => cmpPrimitives(x[0], y[0]))
}

function normalizeCalls(calls: number[]) {
	return calls.concat().sort();
}
