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

import {expect} from "chai";
import Interval from "jwidget/Interval";
import defer from "../../main/src/defer";

describe("Interval", () => {
	it("should call the callback periodically", async () => {
		// given
		let step = 0;
		const interval = new Interval(() => {
			++step;
		}, 100);

		// when
		await defer(50);

		// then
		expect(step).equal(0);

		// when
		await defer(100);

		// then
		expect(step).equal(1);

		// when
		await defer(100);

		// then
		expect(step).equal(2);

		// tear down
		interval.destroy();
	});

	it("should stop calling the callback after destruction", async () => {
		// given
		let step = 0;
		const interval = new Interval(() => {
			++step;
		}, 100);
		await defer(150);

		// when
		interval.destroy();
		await defer(100);

		// then
		expect(step).equal(1);
	});

	it("should not call the callback if destroyed before the first call", async () => {
		// given
		let step = 0;
		const interval = new Interval(() => {
			++step;
		}, 100);
		await defer(50);

		// when
		interval.destroy();
		await defer(100);

		// then
		expect(step).equal(0);
	});
});
