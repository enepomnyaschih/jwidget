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
import Bindable from "jwidget/Bindable";
import BindableSet from "jwidget/BindableSet";
import SetMatchingValueCounter, {startCountingMatchingSetValues} from "jwidget/collection/SetMatchingValueCounter";
import Listenable from "jwidget/Listenable";
import Property from "jwidget/Property";
import ReadonlyBindableSet from "jwidget/ReadonlyBindableSet";

describe("startCountingMatchingSetValues", () => {
	it("should create a new property", () => {
		const source = new BindableSet<number>();
		const target = startCountingMatchingSetValues(source, () => true);
		assert.isTrue(target instanceof Property);
	});

	it("should count the target initially", () => {
		const source = new BindableSet([5, 2, 8, 7, 6]);
		const target = startCountingMatchingSetValues(source, x => x % 2 === 0);
		expect(target.get()).equal(3);
	});

	it("should make proper calls on initialization", () => {
		const calls: number[] = [];
		const source = new BindableSet([5, 2, 8, 7, 6]);
		startCountingMatchingSetValues(source, makeTester(x => x % 2 === 0, calls));
		expect(normalizeValues(calls)).eql([2, 5, 6, 7, 8]);
	});

	it("should handle splice message", () => {
		const source = new BindableSet([5, 2, 8, 7, 6]);
		const target = startCountingMatchingSetValues(source, x => x % 2 === 0); // 2, 6, 8
		const messages = listen(target);
		source.splice([5, 2, 6], [1, 3, 4]); // 1, 3, 4, 7, 8 => 4, 8
		expect(target.get()).equal(2);
		expect(messages).eql([[3, 2]]);
	});

	it("should make proper calls on splice", () => {
		const calls: number[] = [];
		const source = new BindableSet([5, 2, 8, 7, 6]);
		startCountingMatchingSetValues(source, makeTester(x => x % 2 === 0, calls)); // 2, 6, 8
		calls.splice(0);
		source.splice([5, 2, 6], [1, 3, 4]); // 1, 3, 4, 7, 8 => 4, 8
		expect(normalizeValues(calls)).eql([1, 2, 3, 4, 5, 6]);
	});

	it("should handle clear message for a positive count", () => {
		const source = new BindableSet([5, 2, 8, 7, 6]);
		const target = startCountingMatchingSetValues(source, x => x % 2 === 0); // 2, 6, 8
		const messages = listen(target);
		source.clear();
		expect(target.get()).equal(0);
		expect(messages).eql([[3, 0]]);
	});

	it("should ignore clear message for zero count", () => {
		const source = new BindableSet([5, 2, 8, 7, 10]);
		const target = startCountingMatchingSetValues(source, x => x % 3 === 0);
		const messages = listen(target);
		source.clear();
		expect(target.get()).equal(0);
		expect(messages).eql([]);
	});

	it("should not make any calls on clear", () => {
		const calls: number[] = [];
		const source = new BindableSet([5, 2, 8, 7, 6]);
		startCountingMatchingSetValues(source, makeTester(x => x % 2 === 0, calls)); // 2, 6, 8
		calls.splice(0);
		source.clear();
		expect(normalizeValues(calls)).eql([]);
	});

	it("should create a silent property with proper contents if the source is silent", () => {
		const source = new BindableSet([5, 2, 8, 7, 6], true);
		const target = startCountingMatchingSetValues(source, x => x % 2 === 0);
		assert.isTrue(target.silent);
		expect(target.get()).equal(3);
	});

	it("should unbind all listeners on destruction", () => {
		const source = new BindableSet([5, 2, 8, 7, 6]);
		const target = startCountingMatchingSetValues(source, x => x % 2 === 0);
		assert.isTrue(hasBindings(source));
		target.destroy();
		assert.isFalse(hasBindings(source));
	});

	it("should make no calls on destruction", () => {
		const calls: number[] = [];
		const source = new BindableSet([5, 2, 8, 7, 6]);
		const target = startCountingMatchingSetValues(source, makeTester(x => x % 2 === 0, calls));
		calls.splice(0);
		target.destroy();
		expect(normalizeValues(calls)).eql([]);
	});
});

describe("SetMatchingValueCounter", () => {
	// Tests above are not repeated here.

	it("should create a new property by default", () => {
		const source = new BindableSet<number>();
		const counter = new SetMatchingValueCounter(source, () => true);
		assert.isTrue(counter.target instanceof Property);
	});

	it("should accept an existing target", () => {
		const source = new BindableSet<number>();
		const target = new Property<number>();
		const counter = new SetMatchingValueCounter(source, () => true, {target});
		expect(counter.target).equal(target);
	});

	it("should count the target initially", () => {
		const source = new BindableSet([5, 2, 8, 7, 6]);
		const target = new Property<number>();
		const messages = listen(target);
		new SetMatchingValueCounter(source, x => x % 2 === 0, {target});
		expect(target.get()).equal(3);
		expect(messages).eql([[null, 3]]);
	});

	it("should make proper calls on initialization", () => {
		const calls: number[] = [];
		const source = new BindableSet([5, 2, 8, 7, 6]);
		const target = new Property<number>();
		new SetMatchingValueCounter(source, makeTester(x => x % 2 === 0, calls), {target});
		expect(normalizeValues(calls)).eql([2, 5, 6, 7, 8]);
	});

	it("should initialize proper value if the source is silent", () => {
		const source = new BindableSet([5, 2, 8, 7, 6], true);
		const target = new Property<number>();
		new SetMatchingValueCounter(source, x => x % 2 === 0, {target}); // 2, 6, 8
		expect(target.get()).equal(3);
	});

	it("should reset the target on destruction", () => {
		const source = new BindableSet([5, 2, 8, 7, 6]);
		const target = new Property<number>();
		const counter = new SetMatchingValueCounter(source, x => x % 2 === 0, {target}); // 2, 6, 8
		const messages = listen(target);
		counter.destroy();
		expect(target.get()).equal(0);
		expect(messages).eql([[3, 0]]);
	});

	it("should unbind all listeners on destruction", () => {
		const source = new BindableSet([5, 2, 8, 7, 6]);
		const target = new Property<number>();
		const counter = new SetMatchingValueCounter(source, x => x % 2 === 0, {target}); // 2, 6, 8
		assert.isTrue(hasBindings(source));
		counter.destroy();
		assert.isFalse(hasBindings(source));
	});

	it("should support reconfiguring", () => {
		const source = new BindableSet([5, 2, 8, 7, 6]);
		const target = new Property<number>();
		const counter = new SetMatchingValueCounter(source, x => x % 2 === 0, {target}); // 2, 6, 8
		const messages = listen(target);
		counter.reconfigure({test: x => x % 2 === 1}); // 5, 7
		expect(target.get()).equal(2);
		expect(messages).eql([[3, 2]]);
	});

	it("should support reconfiguring with no changes", () => {
		const source = new BindableSet([5, 2, 8, 7, 6]);
		const target = new Property<number>();
		const counter = new SetMatchingValueCounter(source, x => x % 2 === 0, {target}); // 2, 6, 8
		const messages = listen(target);
		counter.reconfigure({test: x => x % 2 === 0});
		expect(target.get()).equal(3);
		expect(messages).eql([]);
	});

	it("should make proper calls on reconfiguring", () => {
		const calls1: number[] = [];
		const calls2: number[] = [];
		const source = new BindableSet([5, 2, 8, 7, 6]);
		const target = new Property<number>();
		const counter = new SetMatchingValueCounter(source, makeTester(x => x % 2 === 0, calls1), {target}); // 2, 6, 8
		calls1.splice(0);
		counter.reconfigure({test: makeTester(x => x % 2 === 1, calls2)}); // 5, 7
		expect(normalizeValues(calls1)).eql([]);
		expect(normalizeValues(calls2)).eql([2, 5, 6, 7, 8]);
	});

	it("should support recounting", () => {
		let divisor = 2;
		const source = new BindableSet([5, 2, 8, 7, 6]);
		const target = new Property<number>();
		const counter = new SetMatchingValueCounter(source, x => x % divisor === 0, {target}); // 2, 6, 8
		const messages = listen(target);
		divisor = 4;
		counter.recount();
		expect(target.get()).equal(1);
		expect(messages).eql([[3, 1]]);
	});

	it("should support recounting with no changes", () => {
		const source = new BindableSet([5, 2, 8, 7, 6]);
		const target = new Property<number>();
		const counter = new SetMatchingValueCounter(source, x => x % 2 === 0, {target}); // 2, 6, 8
		const messages = listen(target);
		counter.recount();
		expect(target.get()).equal(3);
		expect(messages).eql([]);
	});

	it("should make proper calls on recounting", () => {
		const calls: number[] = [];
		let divisor = 2;
		const source = new BindableSet([5, 2, 8, 7, 6]);
		const target = new Property<number>();
		const counter = new SetMatchingValueCounter(source, makeTester(x => x % divisor === 0, calls), {target}); // 2, 6, 8
		divisor = 4;
		calls.splice(0);
		counter.recount();
		expect(target.get()).eql(1);
		expect(normalizeValues(calls)).eql([2, 5, 6, 7, 8]);
	});

	it("should support multiple sources", () => {
		const source1 = new BindableSet([1, 2, 3]);
		const source2 = new BindableSet([4, 5, 6]);
		const target = new Property(1);
		const collector1 = new SetMatchingValueCounter(source1, x => x % 2 === 0, {target});
		const collector2 = new SetMatchingValueCounter(source2, x => x % 2 === 0, {target});
		expect(target.get()).equal(4);
		source1.addAll([7, 8]);
		expect(target.get()).equal(5);
		source2.deleteAll([4, 5]);
		expect(target.get()).equal(4);
		collector1.reconfigure({test: x => x % 4 === 0});
		expect(target.get()).equal(3);
		collector1.destroy();
		expect(target.get()).equal(2);
		source2.add(8);
		expect(target.get()).equal(3);
		collector2.destroy();
		expect(target.get()).equal(1);
		source1.add(12);
		expect(target.get()).equal(1);
		source2.add(14);
		expect(target.get()).equal(1);
	});
});

function listen(property: Bindable<any>) {
	const result: any[] = [];
	property.onChange.listen(message => {
		result.push([message.oldValue, message.value]);
	});
	return result;
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
