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
import Property from "jwidget/Property";
import Switcher from "jwidget/Switcher";

describe("Switcher", () => {
	it("should call init callback with proper non-null value on initialization", () => {
		let step = 0;
		const source = new Property(2);
		new Switcher(source, {
			init: value => {
				expect(value).equal(2);
				++step;
			}
		});
		expect(step).equal(1);
	});

	it("should not call init callback with null value on initialization by default", () => {
		const source = new Property();
		new Switcher(source, {
			init: () => {
				assert.fail();
			}
		});
	});

	it("should call init callback with null value on initialization in acceptNil mode", () => {
		let step = 0;
		const source = new Property();
		new Switcher(source, {
			init: value => {
				expect(value).equal(null);
				++step;
			},
			acceptNil: true
		});
		expect(step).equal(1);
	});

	it("should not call init callback on destruction", () => {
		let ready = false;
		const source = new Property(2),
			switcher = new Switcher(source, {
				init: () => {
					if (ready) {
						assert.fail();
					}
				}
			});
		ready = true;
		switcher.destroy();
	});

	it("should call done callback with proper non-null value on destruction", () => {
		let step = 0;
		const source = new Property(2),
			switcher = new Switcher(source, {
				done: value => {
					expect(value).equal(2);
					++step;
				}
			});
		expect(step).equal(0);
		switcher.destroy();
		expect(step).equal(1);
	});

	it("should not call done callback with null value on destruction by default", () => {
		const source = new Property(),
			switcher = new Switcher(source, {
				done: () => {
					assert.fail();
				}
			});
		switcher.destroy();
	});

	it("should call done callback with null value on destruction in acceptNil mode", () => {
		let step = 0;
		const source = new Property(),
			switcher = new Switcher(source, {
				done: value => {
					expect(value).equal(null);
					++step;
				},
				acceptNil: true
			});
		expect(step).equal(0);
		switcher.destroy();
		expect(step).equal(1);
	});

	it("should not call done callback on initialization", () => {
		const source = new Property(2);
		new Switcher(source, {
			done: () => {
				assert.fail();
			}
		});
	});

	it("should call init callback with proper non-null value on reassignment", () => {
		let step = 0,
			ready = false;
		const source = new Property();
		new Switcher(source, {
			init: value => {
				if (ready) {
					expect(value).equal(3);
					++step;
				}
			}
		});
		ready = true;
		expect(step).equal(0);
		source.set(3);
		expect(step).equal(1);
	});

	it("should not call init callback with null value on reassignment by default", () => {
		let ready = false;
		const source = new Property(2);
		new Switcher(source, {
			init: () => {
				if (ready) {
					assert.fail();
				}
			}
		});
		ready = true;
		source.set(null);
	});

	it("should call init callback with null value on reassignment in acceptNil mode", () => {
		let step = 0,
			ready = false;
		const source = new Property(2);
		new Switcher(source, {
			init: value => {
				if (ready) {
					expect(value).equal(null);
					++step;
				}
			},
			acceptNil: true
		});
		ready = true;
		expect(step).equal(0);
		source.set(null);
		expect(step).equal(1);
	});

	it("should call done callback with proper non-null value on reassignment", () => {
		let step = 0,
			ready = false;
		const source = new Property(2);
		new Switcher(source, {
			done: value => {
				if (ready) {
					expect(value).equal(2);
					++step;
				}
			}
		});
		ready = true;
		expect(step).equal(0);
		source.set(null);
		expect(step).equal(1);
	});

	it("should not call done callback with null value on reassignment by default", () => {
		let ready = false;
		const source = new Property(null);
		new Switcher(source, {
			done: () => {
				if (ready) {
					assert.fail();
				}
			}
		});
		ready = true;
		source.set(2);
	});

	it("should call done callback with null value on reassignment in acceptNil mode", () => {
		let step = 0,
			ready = false;
		const source = new Property(null);
		new Switcher(source, {
			done: value => {
				if (ready) {
					expect(value).equal(null);
					++step;
				}
			},
			acceptNil: true
		});
		ready = true;
		expect(step).equal(0);
		source.set(2);
		expect(step).equal(1);
	});

	it("should call init callback after done callback on reassignment", () => {
		let step = 0,
			ready = false;
		const source = new Property(2);
		new Switcher(source, {
			init: () => {
				if (ready) {
					expect(step++).equal(1);
				}
			},
			done: () => {
				if (ready) {
					expect(step++).equal(0);
				}
			}
		});
		ready = true;
		expect(step).equal(0);
		source.set(3);
		expect(step).equal(2);
	});
});
