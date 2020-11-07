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
import MapValueCollector, {startCollectingMapValues} from "jwidget/collection/MapValueCollector";
import IBindableSet from "jwidget/IBindableSet";
import Listenable from "jwidget/Listenable";
import ReadonlyBindableMap from "jwidget/ReadonlyBindableMap";
import ReadonlyBindableSet from "../../../main/src/ReadonlyBindableSet";

describe("startCollectingMapValues", () => {
	it("should create a new set", () => {
		const source = new BindableMap<string, number>();
		const target = startCollectingMapValues(source);
		assert.isTrue(target instanceof BindableSet);
	});

	it("should collect the values initially", () => {
		const source = new BindableMap([["a", 5], ["b", 2], ["c", 8]]);
		const target = startCollectingMapValues(source);
		expect(normalizeValues(target)).eql([2, 5, 8]);
	});

	it("should handle splice message", () => {
		const source = new BindableMap([["a", 5], ["b", 2], ["c", 8]]);
		const target = startCollectingMapValues(source);
		const messages = listen(target);
		source.splice(["b"], new Map([["c", 3], ["d", 1]]));
		expect(normalizeValues(target)).eql([1, 3, 5]);
		expect(messages).eql([
			["splice", [2, 8], [1, 3]],
			["change"]
		]);
	});

	it("should ignore reindex message", () => {
		const source = new BindableMap([["a", 5], ["b", 2], ["c", 8]]);
		const target = startCollectingMapValues(source);
		const messages = listen(target);
		source.reindex(new Map([["a", "e"], ["b", "c"], ["c", "d"]]));
		expect(normalizeValues(target)).eql([2, 5, 8]);
		expect(messages).eql([]);
	});

	it("should handle clear message", () => {
		const source = new BindableMap([["a", 5], ["b", 2], ["c", 8]]);
		const target = startCollectingMapValues(source);
		const messages = listen(target);
		source.clear();
		expect(normalizeValues(target)).eql([]);
		expect(messages).eql([
			["size", 3, 0],
			["clear", [2, 5, 8]],
			["change"]
		]);
	});

	it("should create a silent set with proper contents if the source is silent", () => {
		const source = new BindableMap([["a", 5], ["b", 2], ["c", 8]], true);
		const target = startCollectingMapValues(source);
		assert.isTrue(target.silent);
		expect(normalizeValues(target)).eql([2, 5, 8]);
	});

	it("should unbind all listeners on destruction", () => {
		const source = new BindableMap([["a", 5], ["b", 2], ["c", 8]]);
		const target = startCollectingMapValues(source);
		assert.isTrue(hasBindings(source));
		target.destroy();
		assert.isFalse(hasBindings(source));
	});
});

describe("MapValueCollector", () => {
	// Tests above are not repeated here.

	it("should create a new set by default", () => {
		const source = new BindableMap<string, number>();
		const collector = new MapValueCollector(source);
		assert.isTrue(collector.target instanceof BindableSet);
	});

	it("should accept an existing target", () => {
		const source = new BindableMap<string, number>();
		const target = new BindableSet<number>();
		const collector = new MapValueCollector(source, {target});
		expect(collector.target).equal(target);
	});

	it("should fill the target initially", () => {
		const source = new BindableMap([["a", 5], ["b", 2], ["c", 8]]);
		const target = new BindableSet<number>();
		const messages = listen(target);
		new MapValueCollector(source, {target});
		expect(normalizeValues(target)).eql([2, 5, 8]);
		expect(messages).eql([
			["size", 0, 3],
			["splice", [], [2, 5, 8]],
			["change"]
		]);
	});

	it("should initialize proper contents if the source is silent", () => {
		const source = new BindableMap([["a", 5], ["b", 2], ["c", 8]], true);
		const target = new BindableSet<number>();
		new MapValueCollector(source, {target});
		expect(normalizeValues(target)).eql([2, 5, 8]);
	});

	it("should clear the target on destruction", () => {
		const source = new BindableMap([["a", 5], ["b", 2], ["c", 8]]);
		const target = new BindableSet<number>();
		const collector = new MapValueCollector(source, {target});
		const messages = listen(target);
		collector.destroy();
		expect(normalizeValues(target)).eql([]);
		expect(messages).eql([
			["size", 3, 0],
			["clear", [2, 5, 8]],
			["change"]
		]);
	});

	it("should unbind all listeners on destruction", () => {
		const source = new BindableMap([["a", 5], ["b", 2], ["c", 8]]);
		const target = new BindableSet<number>();
		const collector = new MapValueCollector(source, {target});
		assert.isTrue(hasBindings(source));
		collector.destroy();
		assert.isFalse(hasBindings(source));
	});

	it("should support multiple sources", () => {
		const source1 = new BindableMap([["a", 1], ["b", 2], ["c", 3]]);
		const source2 = new BindableMap([["c", 4], ["d", 5], ["g", 6]]);
		const target = new BindableSet<number>([9]);
		const collector1 = new MapValueCollector(source1, {target});
		const collector2 = new MapValueCollector(source2, {target});
		expect(normalizeValues(target)).eql([1, 2, 3, 4, 5, 6, 9]);
		source1.set("f", 7);
		expect(normalizeValues(target)).eql([1, 2, 3, 4, 5, 6, 7, 9]);
		source2.remove("d");
		expect(normalizeValues(target)).eql([1, 2, 3, 4, 6, 7, 9]);
		collector1.destroy();
		expect(normalizeValues(target)).eql([4, 6, 9]);
		source2.set("d", 8);
		expect(normalizeValues(target)).eql([4, 6, 8, 9]);
		collector2.destroy();
		expect(normalizeValues(target)).eql([9]);
		source1.set("k", 2);
		expect(normalizeValues(target)).eql([9]);
		source2.set("l", 4);
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

function hasBindings(array: ReadonlyBindableMap<unknown, unknown>) {
	return hasListeners(array.onSplice) ||
		hasListeners(array.onReindex) ||
		hasListeners(array.onClear);
}

function hasListeners(dispatcher: Listenable<unknown>) {
	const listeners = (<any>dispatcher)._listeners;
	return listeners != null && listeners.size !== 0;
}

function normalizeValues<T>(values: Iterable<T>) {
	return Array.from(values).sort();
}
