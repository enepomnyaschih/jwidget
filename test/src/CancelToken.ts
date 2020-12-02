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
import CancelToken from "jwidget/CancelToken";
import dummyDestroyable from "jwidget/dummyDestroyable";

describe("CancelToken", () => {
	it("should not be cancelled before destroyed", () => {
		assert.isFalse(new CancelToken().cancelled);
	});

	it("should be cancelled after destroyed", () => {
		// given
		const cancelToken = new CancelToken();

		// when
		cancelToken.destroy();

		// then
		assert.isTrue(cancelToken.cancelled);
	});

	it("should call handlers in direct order once destroyed", () => {
		// given
		let step = 0;
		const cancelToken = new CancelToken();
		cancelToken.addHandler(() => {
			expect(step++).equal(0);
		});
		cancelToken.addHandler(() => {
			expect(step++).equal(1);
		});
		expect(step).equal(0);

		// when
		cancelToken.destroy();

		// then
		expect(step).equal(2);
	});

	it("should call a new handler immediately if already destroyed", () => {
		// given
		let step = 0;
		const cancelToken = new CancelToken();
		cancelToken.destroy();

		// when
		cancelToken.addHandler(() => {
			expect(step++).equal(0);
		});

		// then
		expect(step).equal(1);
	});

	it("should not call handlers that have been destroyed", () => {
		// given
		let step = 0;
		const cancelToken = new CancelToken();
		const handler = cancelToken.addHandler(() => {
			assert.fail();
		});
		cancelToken.addHandler(() => {
			expect(step++).equal(0);
		});
		expect(step).equal(0);
		handler.destroy();

		// when
		cancelToken.destroy();

		// then
		expect(step).equal(1);
	});

	it("should return dummy destroyable if the token is already destroy", () => {
		// given
		const cancelToken = new CancelToken();
		cancelToken.destroy();

		// when
		const handler = cancelToken.addHandler(() => {});

		// then
		expect(handler).equal(dummyDestroyable);
	});
});
