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
import {smartCmp} from "jwidget";

describe("index.smartCmp", () => {
	it("should compare numbers mathematically", () => {
		expect(smartCmp(12, 12)).equal(0);
		expect(smartCmp(100, 12)).equal(1);
		expect(smartCmp(12, 100)).equal(-1);
	});

	it("should compare strings lexicographically", () => {
		expect(smartCmp("12", "12")).equal(0);
		expect(smartCmp("100", "10")).equal(1);
		expect(smartCmp("10", "100")).equal(-1);
		expect(smartCmp("100", "12")).equal(-1);
		expect(smartCmp("12", "100")).equal(1);
	});

	it("should compare strings case sensitively", () => {
		expect(smartCmp("aB", "Ab")).equal(1);
		expect(smartCmp("aBc", "Ab")).equal(1);
		expect(smartCmp("aB", "Abc")).equal(1);
	});

	it("should compare arrays of strings lexicographically", () => {
		expect(smartCmp(["ab", "cd"], ["ab", "cd"])).equal(0);
		expect(smartCmp(["ab", "ce"], ["ab", "cd"])).equal(1);
		expect(smartCmp(["ab", "cd"], ["ab", "ce"])).equal(-1);
		expect(smartCmp(["ab", "cd", "ef"], ["ab", "cd"])).equal(1);
		expect(smartCmp(["ab", "cd"], ["ab", "cd", "ef"])).equal(-1);
		expect(smartCmp(["ab", "cd"], ["ab!cd"])).equal(-1);
	});

	it("should compare arrays of strings case sensitively", () => {
		expect(smartCmp(["aB"], ["Ab"])).equal(1);
		expect(smartCmp(["aBc"], ["Ab"])).equal(1);
		expect(smartCmp(["aB"], ["Abc"])).equal(1);
	});

	it("should compare booleans", () => {
		expect(smartCmp(false, false)).equal(0);
		expect(smartCmp(true, false)).equal(1);
		expect(smartCmp(false, true)).equal(-1);
		expect(smartCmp(true, true)).equal(0);
	});

	it("should compare nulls", () => {
		expect(smartCmp(null, null)).equal(0);
	});

	it("should compare undefined", () => {
		expect(smartCmp(undefined, undefined)).equal(0);
	});

	it("should compare different types", () => {
		expect(smartCmp(null, undefined)).equal(1);
		expect(smartCmp(undefined, null)).equal(-1);
		expect(smartCmp([], null)).equal(1);
		expect(smartCmp(null, [])).equal(-1);
		expect(smartCmp(true, [])).equal(1);
		expect(smartCmp([], true)).equal(-1);
		expect(smartCmp(0, true)).equal(1);
		expect(smartCmp(true, 0)).equal(-1);
		expect(smartCmp("", 0)).equal(1);
		expect(smartCmp(0, "")).equal(-1);
	});
});

describe("index.smartCmp(caseInsensitive)", () => {
	it("should compare strings case insensitively", () => {
		expect(smartCmp("aB", "Ab", {caseInsensitive: true})).equal(0);
		expect(smartCmp("aBc", "Ab", {caseInsensitive: true})).equal(1);
		expect(smartCmp("aB", "Abc", {caseInsensitive: true})).equal(-1);
	});

	it("should compare arrays of strings case insensitively", () => {
		expect(smartCmp(["aB"], ["Ab"], {caseInsensitive: true})).equal(0);
		expect(smartCmp(["aBc"], ["Ab"], {caseInsensitive: true})).equal(1);
		expect(smartCmp(["aB"], ["Abc"], {caseInsensitive: true})).equal(-1);
	});
});

describe("index.smartCmp(compareNumbersInStrings)", () => {
	it("should compare strings with one number", () => {
		expect(smartCmp("hello2abc", "hello123abc", {compareNumbersInStrings: true})).equal(-1);
		expect(smartCmp("hello2abc", "hello2abc", {compareNumbersInStrings: true})).equal(0);
		expect(smartCmp("hello123abc", "hello2abc", {compareNumbersInStrings: true})).equal(1);

		expect(smartCmp("2hello", "123hello", {compareNumbersInStrings: true})).equal(-1);
		expect(smartCmp("123hello", "2hello", {compareNumbersInStrings: true})).equal(1);

		expect(smartCmp("45", "123", {compareNumbersInStrings: true})).equal(-1);
		expect(smartCmp("123", "45", {compareNumbersInStrings: true})).equal(1);
	});

	it("should compare strings with multiple sequences of numbers", () => {
		expect(smartCmp("242hello22abc", "hello123abc", {compareNumbersInStrings: true})).equal(-1);
		expect(smartCmp("242hello22abc", "242hello22abc", {compareNumbersInStrings: true})).equal(0);
		expect(smartCmp("hello123abc", "242hello22abc", {compareNumbersInStrings: true})).equal(1);

		expect(smartCmp("242hello22abc", "he444llo123abc", {compareNumbersInStrings: true})).equal(-1);
		expect(smartCmp("he444llo123abc", "242hello22abc", {compareNumbersInStrings: true})).equal(1);

		expect(smartCmp("he444llo2abc", "he444llo123abc", {compareNumbersInStrings: true})).equal(-1);
		expect(smartCmp("he444llo123abc", "he444llo123abc", {compareNumbersInStrings: true})).equal(0);
		expect(smartCmp("he444llo123abc", "he444llo2abc", {compareNumbersInStrings: true})).equal(1);

		expect(smartCmp("242hello22abc", "242hello3abc", {compareNumbersInStrings: true})).equal(1);
		expect(smartCmp("242hello3abc", "242hello22abc", {compareNumbersInStrings: true})).equal(-1);
	});

	it("should compare strings without numbers", () => {
		const lessString = "hallo";
		const shortLessString = "hall";
		const greaterString = "hello";

		expect(smartCmp(lessString, greaterString, {compareNumbersInStrings: true})).equal(-1);
		expect(smartCmp(lessString, lessString, {compareNumbersInStrings: true})).equal(0);
		expect(smartCmp(greaterString, lessString, {compareNumbersInStrings: true})).equal(1);

		expect(smartCmp(lessString, shortLessString, {compareNumbersInStrings: true})).equal(1);
		expect(smartCmp(shortLessString, lessString, {compareNumbersInStrings: true})).equal(-1);
	});

	it("should compare strings including number sequences with leading 0s", () => {
		expect(smartCmp("0044", "045", {compareNumbersInStrings: true})).equal(-1);
		expect(smartCmp("045", "0044", {compareNumbersInStrings: true})).equal(1);

		expect(smartCmp("123", "0123", {compareNumbersInStrings: true})).equal(0);
		expect(smartCmp("00123", "0123", {compareNumbersInStrings: true})).equal(0);

		expect(smartCmp("hello00123", "hello0123", {compareNumbersInStrings: true})).equal(0);
		expect(smartCmp("00123hello", "hello0123", {compareNumbersInStrings: true})).equal(-1);

		expect(smartCmp("he00123llo", "he0123llo", {compareNumbersInStrings: true})).equal(0);
		expect(smartCmp("he123llo", "hello0123", {compareNumbersInStrings: true})).equal(-1);

		expect(smartCmp("hello123", "hello0123", {compareNumbersInStrings: true})).equal(0);
		expect(smartCmp("123hello", "hello0123", {compareNumbersInStrings: true})).equal(-1);
	});

	it("should compare a string with number and a string without number", () => {
		expect(smartCmp("hello75", "hello", {compareNumbersInStrings: true})).equal(1);
		expect(smartCmp("hello", "hello75", {compareNumbersInStrings: true})).equal(-1);

		expect(smartCmp("75hello", "hello", {compareNumbersInStrings: true})).equal(-1);
		expect(smartCmp("hello", "75hello", {compareNumbersInStrings: true})).equal(1);

		expect(smartCmp("hel75lo", "hello", {compareNumbersInStrings: true})).equal(-1);
		expect(smartCmp("hello", "hel75lo", {compareNumbersInStrings: true})).equal(1);
	});

	it("should compare blank strings", () => {
		expect(smartCmp("", "", {compareNumbersInStrings: true})).equal(0);

		expect(smartCmp("hello75", "", {compareNumbersInStrings: true})).equal(1);
		expect(smartCmp("", "hello75", {compareNumbersInStrings: true})).equal(-1);

		expect(smartCmp("hello", "", {compareNumbersInStrings: true})).equal(1);
		expect(smartCmp("", "hello", {compareNumbersInStrings: true})).equal(-1);
	});
});
