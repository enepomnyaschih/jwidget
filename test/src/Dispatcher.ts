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
import Dispatcher from "jwidget/Dispatcher";
import dummyDispatcher from "jwidget/dummyDispatcher";

describe("Dispatcher", () => {
	it("should call handlers", () => {
		let called = false;

		const dispatcher = new Dispatcher();
		dispatcher.listen(() => {
			called = true;
		});

		expect(called).equal(false);
		dispatcher.dispatch();
		expect(called).equal(true);
	});

	it("should pass a proper message", () => {
		const dispatcher = new Dispatcher<string>();
		dispatcher.listen(message => {
			expect(message).equal("Message");
		});
		dispatcher.dispatch("Message");
	});

	it("should call handlers in direct order", () => {
		let step = 0;

		const dispatcher = new Dispatcher();
		dispatcher.listen(() => {
			expect(++step).equal(1);
		});
		dispatcher.listen(() => {
			expect(++step).equal(2);
		});

		expect(step).equal(0);
		dispatcher.dispatch();
		expect(step).equal(2);
	});

	it("should call handlers on each dispatch", () => {
		let addend = 0;
		let step = 0;

		const dispatcher = new Dispatcher();
		dispatcher.listen(() => {
			expect(++step).equal(addend + 1);
		});
		dispatcher.listen(() => {
			expect(++step).equal(addend + 2);
		});

		expect(step).equal(0);
		dispatcher.dispatch();
		expect(step).equal(2);

		addend = step;
		dispatcher.dispatch();
		expect(step).equal(4);
	});

	it("should unbind handlers on their destruction", () => {
		let step = 0;

		const dispatcher = new Dispatcher(),
			handler1 = () => {
				expect(++step).equal(1);
			},
			handler2 = () => {
				expect(++step).equal(2);
			},
			failHandler = () => {
				assert.fail();
			};

		dispatcher.listen(handler1);
		const listener = dispatcher.listen(failHandler);
		dispatcher.listen(handler2);
		listener.destroy();

		expect(step).equal(0);
		dispatcher.dispatch();
		expect(step).equal(2);
	});

	it("should allow new handlers after dispatch", () => {
		let addend = 0;
		let step = 0;

		const dispatcher = new Dispatcher(),
			handler1 = () => {
				expect(++step).equal(addend + 1);
			},
			handler2 = () => {
				expect(++step).equal(addend + 2);
			},
			handler3 = () => {
				expect(++step).equal(addend + 3);
			};

		dispatcher.listen(handler1);
		dispatcher.listen(handler2);

		expect(step).equal(0);
		dispatcher.dispatch();
		expect(step).equal(2);

		dispatcher.listen(handler3);
		addend = step;
		expect(step).equal(2);
		dispatcher.dispatch();
		expect(step).equal(5);
	});

	it("should purge handlers", () => {
		const dispatcher = new Dispatcher(),
			failHandler = () => {
				assert.fail();
			};

		dispatcher.listen(failHandler);
		dispatcher.purge();
		dispatcher.dispatch();
	});

	it("should allow new handlers after purge", () => {
		let called = false;

		const dispatcher = new Dispatcher(),
			failHandler = () => {
				assert.fail();
			},
			handler = () => {
				called = true;
			};

		dispatcher.listen(failHandler);
		dispatcher.purge();
		dispatcher.listen(handler);

		expect(called).equal(false);
		dispatcher.dispatch();
		expect(called).equal(true);
	});
});

describe("Dispatcher.make", () => {
	it("should make a dummy dispatcher", () => {
		expect(Dispatcher.make(true)).equal(dummyDispatcher);
	});

	it("should make a non-dummy dispatcher", () => {
		let called = false;

		const dispatcher = Dispatcher.make(false);
		dispatcher.listen(() => {
			called = true;
		});

		expect(called).equal(false);
		dispatcher.dispatch();
		expect(called).equal(true);
	});
});
