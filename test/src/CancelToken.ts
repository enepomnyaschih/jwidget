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
import CancelToken, {runAsync} from "jwidget/CancelToken";
import dummyDestroyable from "jwidget/dummyDestroyable";
import defer from "../../main/src/defer";

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
		const handler = cancelToken.addHandler(() => {
		});

		// then
		expect(handler).equal(dummyDestroyable);
	});
});

describe("runAsync", () => {
	it("should start the specified succeeding operation if the token is omitted", async () => {
		// given
		const startTimestamp = Date.now();

		// when
		const result = await runAsync(resolve => {
			setTimeout(() => {
				resolve(1)
			}, 100);
		}, () => {
			assert.fail();
		});

		// then
		expect(result).equal(1);
		expect(Date.now() - startTimestamp).greaterThan(50).lessThan(150);
	});

	it("should start the specified explicitly failing operation if the token is omitted", async () => {
		// given
		const startTimestamp = Date.now();

		// when
		try {
			await runAsync((_resolve, reject) => {
				setTimeout(() => {
					reject(1)
				}, 100);
			}, () => {
				assert.fail();
			});
			assert.fail();
		} catch(e) {
			// then
			expect(e).equal(1);
		}

		expect(Date.now() - startTimestamp).greaterThan(50).lessThan(150);
	});

	it("should start the specified implicitly failing operation if the token is omitted", async () => {
		// when
		try {
			await runAsync(() => {
				throw 1;
			}, () => {
				assert.fail();
			});
			assert.fail();
		} catch(e) {
			// then
			expect(e).equal(1);
		}
	});

	it("should support chaining", async () => {
		// given
		const startTimestamp = Date.now();

		// when
		const result = await runAsync(resolve => {
			setTimeout(() => {
				resolve(new Promise(subResolve => {
					setTimeout(() => {
						subResolve(1);
					}, 100);
				}));
			}, 100);
		}, () => {
			assert.fail();
		});

		// then
		expect(result).equal(1);
		expect(Date.now() - startTimestamp).greaterThan(150).lessThan(250);
	});

	it("should never resolve/reject the promise if the token is already cancelled", async () => {
		// given
		const cancelToken = new CancelToken();
		cancelToken.destroy();

		// when
		runAsync(() => {
			assert.fail();
		}, () => {
			assert.fail();
		}, cancelToken).then(() => {
			assert.fail();
		}, () => {
			assert.fail();
		});
		await defer(50);

		// then no failures
	});

	it("should cancel the operation on the token destruction", async () => {
		// given
		const cancelToken = new CancelToken();
		let timeout: any;
		const promise = runAsync(resolve => {
			timeout = setTimeout(resolve, 100)
		}, () => {
			clearTimeout(timeout);
		}, cancelToken);
		promise.then(() => {
			assert.fail();
		}, () => {
			assert.fail();
		})
		cancelToken.destroy();

		// when
		await defer(150);

		// then no failures
	});

	it("should not cancel the operation on the token destruction if the operation has already succeeded", async () => {
		// given
		const cancelToken = new CancelToken();
		await runAsync(resolve => {
			setTimeout(resolve, 100)
		}, () => {
			assert.fail();
		}, cancelToken);

		// when
		cancelToken.destroy();

		// then no failures
	});

	it("should not cancel the operation on the token destruction if the operation has already failed", async () => {
		// given
		const cancelToken = new CancelToken();
		try {
			await runAsync((_, reject) => {
				setTimeout(reject, 100)
			}, () => {
				assert.fail();
			}, cancelToken);
		} catch(e) {
		}

		// when
		cancelToken.destroy();

		// then no failures
	});
});
