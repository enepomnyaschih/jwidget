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
import MapInserter from "jwidget/collection/MapInserter";
import {cmpPrimitives} from "jwidget/internal";
import Listenable from "jwidget/Listenable";
import ReadonlyBindableMap from "jwidget/ReadonlyBindableMap";

describe("MapInserter", () => {
	it("should call add callback initially", () => {
		const source = new BindableMap([["a", 5], ["b", 2], ["c", 8]]);
		const {messages} = observe(source);
		expect(messages).eql([
			["add", [["a", 5], ["b", 2], ["c", 8]]]
		]);
	});

	it("should call clear callback on destruction", () => {
		const source = new BindableMap([["a", 5], ["b", 2], ["c", 8]]);
		const {messages, inserter} = observe(source, true);
		inserter.destroy();
		expect(messages).eql([
			["clear", [["a", 5], ["b", 2], ["c", 8]]]
		]);
	});

	it("should call remove callback on destruction if clear callback is omitted", () => {
		const source = new BindableMap([["a", 5], ["b", 2], ["c", 8]]);
		const {messages, inserter} = observe(source, true, true);
		inserter.destroy();
		expect(messages).eql([
			["remove", [["a", 5], ["b", 2], ["c", 8]]]
		]);
	});

	it("should not call clear callback on destruction if the source empty", () => {
		const source = new BindableMap();
		const {messages, inserter} = observe(source, true, true);
		inserter.destroy();
		expect(messages).eql([]);
	});

	it("should handle splice message", () => {
		const source = new BindableMap([["a", 5], ["b", 2], ["c", 8]]);
		const {messages} = observe(source, true);
		source.splice(["b"], new Map([["c", 6], ["d", 2]]));
		expect(messages).eql([
			["remove", [["b", 2], ["c", 8]]],
			["add", [["c", 6], ["d", 2]]]
		]);
	});

	it("should handle reindex message with a subset of entries", () => {
		const source = new BindableMap([["a", 5], ["b", 2], ["c", 8]]);
		const {messages} = observe(source, true);
		source.reindex(new Map([["b", "c"], ["c", "d"]]));
		expect(messages).eql([
			["remove", [["b", 2], ["c", 8]]],
			["add", [["c", 2], ["d", 8]]]
		]);
	});

	it("should handle reindex message with all entries", () => {
		const source = new BindableMap([["a", 5], ["b", 2], ["c", 8]]);
		const {messages} = observe(source, true);
		source.reindex(new Map([["a", "e"], ["b", "c"], ["c", "d"]]));
		expect(messages).eql([
			["remove", [["a", 5], ["b", 2], ["c", 8]]],
			["add", [["c", 2], ["d", 8], ["e", 5]]]
		]);
	});

	it("should handle clear message", () => {
		const source = new BindableMap([["a", 5], ["b", 2], ["c", 8]]);
		const {messages} = observe(source, true);
		source.clear();
		expect(messages).eql([
			["clear", [["a", 5], ["b", 2], ["c", 8]]]
		]);
	});

	it("should unbind all listeners on destruction", () => {
		const source = new BindableMap([["a", 5], ["b", 2], ["c", 8]]);
		const {inserter} = observe(source, true);
		assert.isTrue(hasBindings(source));
		inserter.destroy();
		assert.isFalse(hasBindings(source));
	});
});

function observe<K, V>(map: ReadonlyBindableMap<K, V>, withoutInit: boolean = false, withoutClear: boolean = false) {
	const messages: any[] = [];
	const inserter = new MapInserter(map, {
		add: (value, key) => {
			if (messages.length && messages[messages.length - 1][0] === "add") {
				messages[messages.length - 1][1].push([key, value]);
				messages[messages.length - 1][1].sort();
			} else {
				messages.push(["add", [[key, value]]]);
			}
		},
		remove: (value, key) => {
			if (messages.length && messages[messages.length - 1][0] === "remove") {
				messages[messages.length - 1][1].push([key, value]);
				messages[messages.length - 1][1].sort();
			} else {
				messages.push(["remove", [[key, value]]]);
			}
		},
		clear: withoutClear ? null : entries => {
			messages.push(["clear", Array.from(entries).sort((x, y) => cmpPrimitives(x[0], y[0]))]);
		}
	});
	if (withoutInit) {
		messages.splice(0);
	}
	return {messages, inserter};
}

function hasBindings(map: ReadonlyBindableMap<unknown, unknown>) {
	return hasListeners(map.onSplice) ||
		hasListeners(map.onReindex) ||
		hasListeners(map.onClear);
}

function hasListeners(dispatcher: Listenable<unknown>) {
	const listeners = (<any>dispatcher)._listeners;
	return listeners != null && listeners.size !== 0;
}
