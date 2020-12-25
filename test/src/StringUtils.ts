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
import {camel, capitalize, parseClass} from "jwidget/StringUtils";

describe("StringUtils.capitalize", () => {
	it("should capitalize the first letter", () => {
		expect(capitalize("helloWorld")).equal("HelloWorld");
	});

	it("should do nothing if already capitalized", () => {
		expect(capitalize("HelloWorld")).equal("HelloWorld");
	});

	it("should do nothing if the first character is not a letter", () => {
		expect(capitalize("1 hello")).equal("1 hello");
	});

	it("should do nothing if the string is empty", () => {
		expect(capitalize("")).equal("");
	});
});

describe("StringUtils.camel", () => {
	it("should bring a string to camel case", () => {
		expect(camel("i-love-js")).equal("iLoveJs");
	});

	it("should do nothing if already in camel case", () => {
		expect(camel("iLoveJs")).equal("iLoveJs");
	});

	it("should do nothing if the string is empty", () => {
		expect(camel("")).equal("");
	});
});

describe("StringUtils.parseClass", () => {
	it("should parse class names", () => {
		expect(parseClass(" class-1    class-2    ")).eql(["class-1", "class-2"]);
	});

	it("should return an empty array if the string is empty", () => {
		expect(parseClass("")).eql([]);
	});

	it("should return an empty array if the string contains only spaces", () => {
		expect(parseClass("        ")).eql([]);
	});
});
