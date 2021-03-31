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
import MapKeyCollector, {startCollectingMapKeys} from "jwidget/collection/MapKeyCollector";
import IBindableSet from "jwidget/IBindableSet";
import Listenable from "jwidget/Listenable";
import ReadonlyBindableMap from "jwidget/ReadonlyBindableMap";
import ReadonlyBindableSet from "jwidget/ReadonlyBindableSet";

describe("startCollectingMapKeys", () => {
	it("should create a new set", () => {
		const source = new BindableMap<string, number>();
		const target = startCollectingMapKeys(source);
		assert.isTrue(target instanceof BindableSet);
	});

	it("should collect the values initially", () => {
		const source = new BindableMap([["a", 5], ["b", 2], ["c", 8]]);
		const target = startCollectingMapKeys(source);
		expect(normalizeValues(target)).eql(["a", "b", "c"]);
	});

	it("should handle splice message", () => {
		const source = new BindableMap([["a", 5], ["b", 2], ["c", 8]]);
		const target = startCollectingMapKeys(source);
		const messages = listen(target);
		source.splice(["b"], new Map([["c", 3], ["d", 1]]));
		expect(normalizeValues(target)).eql(["a", "c", "d"]);
		expect(messages).eql([
			["splice", ["b"], ["d"]],
			["change"]
		]);
	});

	it("should handle reindex message", () => {
		const source = new BindableMap([["a", 5], ["b", 2], ["c", 8]]);
		const target = startCollectingMapKeys(source);
		const messages = listen(target);
		source.reindex(new Map([["a", "e"], ["b", "c"], ["c", "d"]]));
		expect(normalizeValues(target)).eql(["c", "d", "e"]);
		expect(messages).eql([
			["splice", ["a", "b"], ["d", "e"]],
			["change"]
		]);
	});

	it("should handle clear message", () => {
		const source = new BindableMap([["a", 5], ["b", 2], ["c", 8]]);
		const target = startCollectingMapKeys(source);
		const messages = listen(target);
		source.clear();
		expect(normalizeValues(target)).eql([]);
		expect(messages).eql([
			["size", 3, 0],
			["clear", ["a", "b", "c"]],
			["change"]
		]);
	});

	it("should create a silent set with proper contents if the source is silent", () => {
		const source = new BindableMap([["a", 5], ["b", 2], ["c", 8]], true);
		const target = startCollectingMapKeys(source);
		assert.isTrue(target.silent);
		expect(normalizeValues(target)).eql(["a", "b", "c"]);
	});

	it("should unbind all listeners on destruction", () => {
		const source = new BindableMap([["a", 5], ["b", 2], ["c", 8]]);
		const target = startCollectingMapKeys(source);
		assert.isTrue(hasBindings(source));
		target.destroy();
		assert.isFalse(hasBindings(source));
	});
});

describe("MapValueCollector", () => {
	// Tests above are not repeated here.

	it("should create a new set by default", () => {
		const source = new BindableMap<string, number>();
		const collector = new MapKeyCollector(source);
		assert.isTrue(collector.target instanceof BindableSet);
	});

	it("should accept an existing target", () => {
		const source = new BindableMap<string, number>();
		const target = new BindableSet<string>();
		const collector = new MapKeyCollector(source, {target});
		expect(collector.target).equal(target);
	});

	it("should fill the target initially", () => {
		const source = new BindableMap([["a", 5], ["b", 2], ["c", 8]]);
		const target = new BindableSet<string>();
		const messages = listen(target);
		new MapKeyCollector(source, {target});
		expect(normalizeValues(target)).eql(["a", "b", "c"]);
		expect(messages).eql([
			["size", 0, 3],
			["splice", [], ["a", "b", "c"]],
			["change"]
		]);
	});

	it("should initialize proper contents if the source is silent", () => {
		const source = new BindableMap([["a", 5], ["b", 2], ["c", 8]], true);
		const target = new BindableSet<string>();
		new MapKeyCollector(source, {target});
		expect(normalizeValues(target)).eql(["a", "b", "c"]);
	});

	it("should clear the target on destruction", () => {
		const source = new BindableMap([["a", 5], ["b", 2], ["c", 8]]);
		const target = new BindableSet<string>();
		const collector = new MapKeyCollector(source, {target});
		const messages = listen(target);
		collector.destroy();
		expect(normalizeValues(target)).eql([]);
		expect(messages).eql([
			["size", 3, 0],
			["clear", ["a", "b", "c"]],
			["change"]
		]);
	});

	it("should unbind all listeners on destruction", () => {
		const source = new BindableMap([["a", 5], ["b", 2], ["c", 8]]);
		const target = new BindableSet<string>();
		const collector = new MapKeyCollector(source, {target});
		assert.isTrue(hasBindings(source));
		collector.destroy();
		assert.isFalse(hasBindings(source));
	});

	it("should support multiple sources", () => {
		const source1 = new BindableMap([["a", 1], ["b", 2], ["c", 3]]);
		const source2 = new BindableMap([["d", 5], ["g", 2]]);
		const target = new BindableSet<string>(["e"]);
		const collector1 = new MapKeyCollector(source1, {target});
		const collector2 = new MapKeyCollector(source2, {target});
		expect(normalizeValues(target)).eql(["a", "b", "c", "d", "e", "g"]);
		source1.set("f", 7);
		expect(normalizeValues(target)).eql(["a", "b", "c", "d", "e", "f", "g"]);
		source2.delete("d");
		expect(normalizeValues(target)).eql(["a", "b", "c", "e", "f", "g"]);
		collector1.destroy();
		expect(normalizeValues(target)).eql(["e", "g"]);
		source2.set("d", 8);
		expect(normalizeValues(target)).eql(["d", "e", "g"]);
		collector2.destroy();
		expect(normalizeValues(target)).eql(["e"]);
		source1.set("k", 2);
		expect(normalizeValues(target)).eql(["e"]);
		source2.set("l", 4);
		expect(normalizeValues(target)).eql(["e"]);
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
