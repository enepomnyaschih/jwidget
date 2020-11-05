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
import ArrayInserter from "jwidget/collection/ArrayInserter";
import IndexCount from "jwidget/IndexCount";
import IndexItems from "jwidget/IndexItems";
import Listenable from "jwidget/Listenable";
import ReadonlyBindableArray from "jwidget/ReadonlyBindableArray";

describe("ArrayInserter", () => {
	it("should call add callback in direct order initially", () => {
		const source = new BindableArray([5, 2, 8]);
		const {messages} = observe(source);
		expect(messages).eql([
			["add", 5, 0],
			["add", 2, 1],
			["add", 8, 2]
		]);
	});

	it("should call clear callback on destruction", () => {
		const source = new BindableArray([5, 2, 8]);
		const {messages, inserter} = observe(source, true);
		inserter.destroy();
		expect(messages).eql([
			["clear", [5, 2, 8]]
		]);
	});

	it("should call remove callback on destruction if clear callback is omitted", () => {
		const source = new BindableArray([5, 2, 8]);
		const {messages, inserter} = observe(source, true, true);
		inserter.destroy();
		expect(messages).eql([
			["remove", 8, 2],
			["remove", 2, 1],
			["remove", 5, 0]
		]);
	});

	it("should handle splice message", () => {
		const source = new BindableArray([5, 2, 8, 7, 8]);
		const {messages} = observe(source, true);
		source.splice(
			[new IndexCount(0, 2), new IndexCount(4, 1)], // 8, 7
			[new IndexItems(1, [3, 4]), new IndexItems(4, [1, 1])]); // 8, 3, 4, 7, 1, 1
		expect(messages).eql([
			["remove", 8, 4],
			["remove", 2, 1],
			["remove", 5, 0],
			["add", 3, 1],
			["add", 4, 2],
			["add", 1, 4],
			["add", 1, 5]
		]);
	});

	it("should handle replace message", () => {
		const source = new BindableArray([5, 2, 8, 7, 8]);
		const {messages} = observe(source, true);
		source.set(2, 1); // 5, 2, 1, 7, 8
		expect(messages).eql([
			["remove", 8, 2],
			["add", 1, 2]
		]);
	});

	it("should handle move message", () => {
		const source = new BindableArray([5, 2, 8, 7, 8]);
		const {messages} = observe(source, true);
		source.move(1, 3); // 5, 8, 7, 2, 8
		expect(messages).eql([
			["remove", 2, 1],
			["add", 2, 3]
		]);
	});

	it("should handle reorder message", () => {
		const source = new BindableArray([5, 2, 8, 7, 8]);
		const {messages} = observe(source, true);
		source.reorder([2, 4, 3, 0, 1]); // 7, 8, 5, 8, 2
		expect(messages).eql([
			["clear", [5, 2, 8, 7, 8]],
			["add", 7, 0],
			["add", 8, 1],
			["add", 5, 2],
			["add", 8, 3],
			["add", 2, 4]
		]);
	});

	it("should handle clear message", () => {
		const source = new BindableArray([5, 2, 8, 7, 8]);
		const {messages} = observe(source, true);
		source.clear();
		expect(messages).eql([
			["clear", [5, 2, 8, 7, 8]]
		]);
	});

	it("should unbind all listeners on destruction", () => {
		const source = new BindableArray([5, 2, 8, 7, 8]);
		const {inserter} = observe(source, true);
		assert.isTrue(hasBindings(source));
		inserter.destroy();
		assert.isFalse(hasBindings(source));
	});
});

function observe<T>(array: ReadonlyBindableArray<T>, withoutInit: boolean = false, withoutClear: boolean = false) {
	const messages: any[] = [];
	const inserter = new ArrayInserter(array, {
		add: (item, index) => {
			messages.push(["add", item, index]);
		},
		remove: (item, index) => {
			messages.push(["remove", item, index]);
		},
		clear: withoutClear ? null : items => {
			messages.push(["clear", items]);
		}
	});
	if (withoutInit) {
		messages.splice(0);
	}
	return {messages, inserter};
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
