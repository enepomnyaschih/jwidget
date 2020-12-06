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
import {absoluteRoot, append, relativeRoot} from "jwidget/Endpoint";

interface Params1 {
	id1: string;
}

interface Params2 extends Params1 {
	id2: string;
}

describe("Endpoint.append", () => {
	it("should append a constant to relative root", () => {
		expect(append(relativeRoot, "api")(null)).equal("api");
	});

	it("should append a constant to absolute root", () => {
		expect(append(absoluteRoot, "api")(null)).equal("/api");
	});

	it("should append a constant array to relative root", () => {
		expect(append(relativeRoot, ["api", "user"])(null)).equal("api/user");
	});

	it("should append a constant array to absolute root", () => {
		expect(append(absoluteRoot, ["api", "user"])(null)).equal("/api/user");
	});

	it("should append a variable to relative root", () => {
		expect(append(relativeRoot, (params: Params1) => params.id1)({id1: "1"})).equal("1");
	});

	it("should append a variable to absolute root", () => {
		expect(append(absoluteRoot, (params: Params1) => params.id1)({id1: "1"})).equal("/1");
	});

	it("should append a variable array to relative root", () => {
		expect(append(relativeRoot, (params: Params1) => ["api", params.id1])({id1: "1"})).equal("api/1");
	});

	it("should append a variable array to absolute root", () => {
		expect(append(absoluteRoot, (params: Params1) => ["api", params.id1])({id1: "1"})).equal("/api/1");
	});

	it("should build an endpoint from multiple parts with relative root", () => {
		const endpoint1 = append(relativeRoot, ["api", "v1"]),
			endpoint2 = append(endpoint1, ({id1}: Params1) => id1),
			endpoint3 = append(endpoint2, "user"),
			endpoint4 = append(endpoint3, ({id2}: Params2) => id2);
		expect(endpoint4({id1: "1", id2: "2"})).equal("api/v1/1/user/2");
	});

	it("should build an endpoint from multiple parts with absolute root", () => {
		const endpoint1 = append(absoluteRoot, ["api", "v1"]),
			endpoint2 = append(endpoint1, ({id1}: Params1) => id1),
			endpoint3 = append(endpoint2, "user"),
			endpoint4 = append(endpoint3, ({id2}: Params2) => id2);
		expect(endpoint4({id1: "1", id2: "2"})).equal("/api/v1/1/user/2");
	});
});
