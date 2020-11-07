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
import MapMapper, {startMappingMap} from "jwidget/collection/MapMapper";
import IBindableMap from "jwidget/IBindableMap";
import {cmpPrimitives} from "jwidget/internal";
import Listenable from "jwidget/Listenable";
import ReadonlyBindableMap from "jwidget/ReadonlyBindableMap";

describe("startMappingMap", () => {
	it("should create a new map", () => {
		const source = new BindableMap<string, number>();
		const target = startMappingMap(source, x => x);
		assert.isTrue(target instanceof BindableMap);
		expect(target).not.equal(source);
		expect(target.native).not.equal(source.native);
	});

	it("should map the target initially", () => {
		const source = new BindableMap([["a", 5], ["b", 2], ["c", 8]]);
		const target = startMappingMap(source, x => 2 * x);
		expect(normalizeEntries(target.native)).eql([["a", 10], ["b", 4], ["c", 16]]);
	});

	it("should make proper calls on initialization", () => {
		const calls: any[] = [];
		const source = new BindableMap([["a", 5], ["b", 2], ["c", 8]]);
		startMappingMap(source, makeCreator(x => 2 * x, calls), {destroy: makeDestroyer(calls)});
		expect(calls).eql([
			["create", [2, 5, 8]]
		]);
	});

	it("should handle splice message", () => {
		const source = new BindableMap([["a", 5], ["b", 2], ["c", 8]]);
		const target = startMappingMap(source, x => 2 * x);
		const messages = listen(target);
		source.splice(["b"], new Map([["c", 3], ["d", 1]]));
		expect(normalizeEntries(target)).eql([["a", 10], ["c", 6], ["d", 2]]);
		expect(messages).eql([
			["splice", [["b", 4], ["c", 16]], [["c", 6], ["d", 2]]],
			["change"]
		]);
	});

	it("should make proper calls on splice", () => {
		const calls: any[] = [];
		const source = new BindableMap([["a", 5], ["b", 2], ["c", 8]]);
		startMappingMap(source, makeCreator(x => 2 * x, calls), {destroy: makeDestroyer(calls)});
		calls.splice(0);
		source.splice(["b"], new Map([["c", 3], ["d", 1]]));
		expect(calls).eql([
			["create", [1, 3]],
			["destroy", [[4, 2], [16, 8]]]
		]);
	});

	it("should handle reindex message", () => {
		const source = new BindableMap([["a", 5], ["b", 2], ["c", 8]]);
		const target = startMappingMap(source, x => 2 * x);
		const messages = listen(target);
		source.reindex(new Map([["a", "e"], ["b", "c"], ["c", "d"]]));
		expect(normalizeEntries(target)).eql([["c", 4], ["d", 16], ["e", 10]]);
		expect(messages).eql([
			["reindex", [["a", "e"], ["b", "c"], ["c", "d"]]],
			["change"]
		]);
	});

	it("should make no calls on reindex", () => {
		const calls: any[] = [];
		const source = new BindableMap([["a", 5], ["b", 2], ["c", 8]]);
		startMappingMap(source, makeCreator(x => 2 * x, calls), {destroy: makeDestroyer(calls)});
		calls.splice(0);
		source.reindex(new Map([["a", "e"], ["b", "c"], ["c", "d"]]));
		expect(calls).eql([]);
	});

	it("should handle clear message", () => {
		const source = new BindableMap([["a", 5], ["b", 2], ["c", 8]]);
		const target = startMappingMap(source, x => 2 * x);
		const messages = listen(target);
		source.clear();
		expect(normalizeEntries(target)).eql([]);
		expect(messages).eql([
			["size", 3, 0],
			["clear", [["a", 10], ["b", 4], ["c", 16]]],
			["change"]
		]);
	});

	it("should make proper calls on clear", () => {
		const calls: any[] = [];
		const source = new BindableMap([["a", 5], ["b", 2], ["c", 8]]);
		startMappingMap(source, makeCreator(x => 2 * x, calls), {destroy: makeDestroyer(calls)});
		calls.splice(0);
		source.clear();
		expect(calls).eql([
			["destroy", [[4, 2], [10, 5], [16, 8]]]
		]);
	});

	it("should create a silent array with proper contents if the source is silent", () => {
		const source = new BindableMap([["a", 5], ["b", 2], ["c", 8]], true);
		const target = startMappingMap(source, x => 2 * x);
		assert.isTrue(target.silent);
		expect(normalizeEntries(target)).eql([["a", 10], ["b", 4], ["c", 16]]);
	});

	it("should unbind all listeners on destruction", () => {
		const source = new BindableMap([["a", 5], ["b", 2], ["c", 8]]);
		const target = startMappingMap(source, x => 2 * x);
		assert.isTrue(hasBindings(source));
		target.destroy();
		assert.isFalse(hasBindings(source));
	});

	it("should make proper calls on destruction", () => {
		const calls: any[] = [];
		const source = new BindableMap([["a", 5], ["b", 2], ["c", 8]]);
		const target = startMappingMap(source, makeCreator(x => 2 * x, calls), {destroy: makeDestroyer(calls)});
		calls.splice(0);
		target.destroy();
		expect(calls).eql([
			["destroy", [[4, 2], [10, 5], [16, 8]]]
		]);
	});

	it("should make proper calls on destruction even if the source is silent", () => {
		const calls: any[] = [];
		const source = new BindableMap([["a", 5], ["b", 2], ["c", 8]], true);
		const target = startMappingMap(source, makeCreator(x => 2 * x, calls), {destroy: makeDestroyer(calls)});
		calls.splice(0);
		target.destroy();
		expect(calls).eql([
			["destroy", [[4, 2], [10, 5], [16, 8]]]
		]);
	});
});

describe("MapMapper", () => {
	// Tests above are not repeated here.

	it("should create a new map by default", () => {
		const source = new BindableMap<string, number>();
		const mapper = new MapMapper(source, x => x);
		assert.isTrue(mapper.target instanceof BindableMap);
		expect(mapper.target).not.equal(source);
		expect(mapper.target.native).not.equal(source.native);
	});

	it("should accept an existing target", () => {
		const source = new BindableMap<string, number>();
		const target = new BindableMap<string, number>();
		const mapper = new MapMapper(source, x => x, {target});
		expect(mapper.target).equal(target);
	});

	it("should map the target initially", () => {
		const source = new BindableMap([["a", 5], ["b", 2], ["c", 8]]);
		const target = new BindableMap<string, number>();
		const messages = listen(target);
		new MapMapper(source, x => 2 * x, {target});
		expect(normalizeEntries(target)).eql([["a", 10], ["b", 4], ["c", 16]]);
		expect(messages).eql([
			["size", 0, 3],
			["splice", [], [["a", 10], ["b", 4], ["c", 16]]],
			["change"]
		]);
	});

	it("should make proper calls on initialization", () => {
		const calls: any[] = [];
		const source = new BindableMap([["a", 5], ["b", 2], ["c", 8]]);
		const target = new BindableMap<string, number>();
		new MapMapper(source, makeCreator(x => 2 * x, calls), {target, destroy: makeDestroyer(calls)});
		expect(calls).eql([
			["create", [2, 5, 8]]
		])
	});

	it("should initialize proper contents if the source is silent", () => {
		const source = new BindableMap([["a", 5], ["b", 2], ["c", 8]], true);
		const target = new BindableMap<string, number>();
		new MapMapper(source, x => 2 * x, {target});
		expect(normalizeEntries(target)).eql([["a", 10], ["b", 4], ["c", 16]]);
	});

	it("should clear the target on destruction", () => {
		const source = new BindableMap([["a", 5], ["b", 2], ["c", 8]]);
		const target = new BindableMap<string, number>();
		const mapper = new MapMapper(source, x => 2 * x, {target});
		const messages = listen(target);
		mapper.destroy();
		expect(normalizeEntries(target)).eql([]);
		expect(messages).eql([
			["size", 3, 0],
			["clear", [["a", 10], ["b", 4], ["c", 16]]],
			["change"]
		]);
	});

	it("should unbind all listeners on destruction", () => {
		const source = new BindableMap([["a", 5], ["b", 2], ["c", 8]]);
		const target = new BindableMap<string, number>();
		const mapper = new MapMapper(source, x => 2 * x, {target});
		assert.isTrue(hasBindings(source));
		mapper.destroy();
		assert.isFalse(hasBindings(source));
	});

	it("should make proper calls on destruction", () => {
		const calls: any[] = [];
		const source = new BindableMap([["a", 5], ["b", 2], ["c", 8]]);
		const target = new BindableMap<string, number>();
		const mapper = new MapMapper(source, makeCreator(x => 2 * x, calls), {target, destroy: makeDestroyer(calls)});
		calls.splice(0);
		mapper.destroy();
		expect(calls).eql([
			["destroy", [[4, 2], [10, 5], [16, 8]]]
		]);
	});

	it("should support multiple sources", () => {
		const source1 = new BindableMap([["a", 1], ["b", 2], ["c", 3]]);
		const source2 = new BindableMap([["d", 5], ["g", 0]]);
		const target = new BindableMap<string, number>([["e", 9]]);
		const collector1 = new MapMapper(source1, x => 2 * x, {target});
		const collector2 = new MapMapper(source2, x => 3 * x, {target});
		expect(normalizeEntries(target)).eql([["a", 2], ["b", 4], ["c", 6], ["d", 15], ["e", 9], ["g", 0]]);
		source1.set("f", 6);
		expect(normalizeEntries(target)).eql([["a", 2], ["b", 4], ["c", 6], ["d", 15], ["e", 9], ["f", 12], ["g", 0]]);
		source2.remove("d");
		expect(normalizeEntries(target)).eql([["a", 2], ["b", 4], ["c", 6], ["e", 9], ["f", 12], ["g", 0]]);
		collector1.destroy();
		expect(normalizeEntries(target)).eql([["e", 9], ["g", 0]]);
		source2.set("d", 6);
		expect(normalizeEntries(target)).eql([["d", 18], ["e", 9], ["g", 0]]);
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

function normalizeEntries<K, V>(entries: Iterable<readonly [K, V]>) {
	return Array.from(entries).sort((x, y) => cmpPrimitives(x[0], y[0]))
}
