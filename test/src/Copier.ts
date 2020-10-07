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
import Copier from "jwidget/Copier";
import Property from "jwidget/Property";

describe("Copier", () => {
	it("should create a new target by default", () => {
		const source = new Property(2),
			copier = new Copier(source);
		expect(copier.target).not.equal(source);
	});

	it("should use the existing target if specified", () => {
		const source = new Property(2),
			target = new Property(0),
			copier = new Copier(source, target);
		expect(copier.target).equal(target);
	});

	it("should initialize the new target with a proper value", () => {
		const source = new Property(2),
			copier = new Copier(source);
		expect(copier.target.get()).equal(2);
	});

	it("should initialize the existing target with a proper value", () => {
		const source = new Property(2),
			target = new Property(0);
		new Copier(source, target);
		expect(target.get()).equal(2);
	});

	it("should update the target on source update", () => {
		const source = new Property(2),
			copier = new Copier(source);
		source.set(3);
		expect(copier.target.get()).equal(3);
		source.set(6);
		expect(copier.target.get()).equal(6);
	});

	it("should leave the target's current value on destruction", () => {
		const source = new Property(2),
			target = new Property(0),
			copier = new Copier(source, target);
		source.set(3);
		copier.destroy();
		expect(target.get()).equal(3);
	});

	it("should not update the target's after destruction", () => {
		const source = new Property(2),
			target = new Property(0),
			copier = new Copier(source, target);
		source.set(3);
		copier.destroy();
		source.set(6);
		expect(target.get()).equal(3);
	});
});
