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
import Class from "jwidget/Class";

describe("Class", () => {
	it("should destroy owned objects in the reverse order", () => {
		let step = 0;

		const owner = new Class(),
			obj1 = {
				destroy: () => {
					expect(++step).equal(1);
				}
			},
			obj2 = {
				destroy: () => {
					expect(++step).equal(2);
				}
			};

		owner.own(obj2);
		owner.owning(obj1);
		owner.destroy();

		expect(step).equal(2);
	});

	it("should destroy owned objects before calling destroyObject", () => {
		let step = 0;

		class MyClass extends Class {

			protected destroyObject() {
				expect(++step).equal(2);
				super.destroyObject();
			}
		}

		const owner = new MyClass(),
			obj = {
				destroy: () => {
					expect(++step).equal(1);
				}
			};

		owner.own(obj);
		owner.destroy();

		expect(step).equal(2);
	});
});
