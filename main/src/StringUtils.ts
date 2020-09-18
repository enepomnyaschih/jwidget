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

import {addAll} from "./ArrayUtils";

/**
 * Escapes special HTML symbols.
 * Converts symbols &amp;, &gt;, &lt;, &quot; to `&amp;` `&gt;` `&lt;` `&quot;` correspondingly.
 *
 * @deprecated Use Underscore's _.escape instead.
 */
export function htmlEncode(str: string): string {
	return String(str).
		replace(/&/g, "&amp;").
		replace(/>/g, "&gt;").
		replace(/</g, "&lt;").
		replace(/"/g, "&quot;");
}

/**
 * Unescapes special HTML symbols.
 * Converts sequences `&amp;` `&gt;` `&lt;` `&quot;` to &amp;, &gt;, &lt;, &quot; correspondingly.
 *
 * @deprecated Use Underscore's _.unescape instead.
 */
export function htmlDecode(str: string): string {
	return String(str).
		replace(/&quot;/g, '"').
		replace(/&lt;/g, "<").
		replace(/&gt;/g, ">").
		replace(/&amp;/g, "&");
}

/**
 * Shortens the string to specified length. If string is short enough, it stays the same.
 * Otherwise it is cutted and `ellipsis` substring is appended so that the resulting string length
 * equals to `length`.
 *
 * @param str Input string.
 * @param length Maximum length of resulting string.
 * @param ellipsis String tail for shortening. Defaults to `...`
 * @returns Result string.
 */
export function ellipsis(str: string, length: number, ellipsis?: string): string {
	str = String(str);
	if (str.length <= length) {
		return str;
	}
	ellipsis = ellipsis ?? "...";
	return str.substr(0, length - ellipsis.length) + ellipsis;
}

/**
 * Prepends string with specified symbol at the beginning to adjust it to specified length.
 * If string is long enough, it stays the same.
 *
 * @param str Input string.
 * @param length Minimum length of resulting string.
 * @param ch Symbol to prepend.
 * @returns Result string.
 */
export function pad(str: string, length: number, ch: string): string {
	str = String(str);
	var buf: string[] = [];
	length -= str.length;
	for (var i = 0; i < length; ++i) {
		buf.push(ch);
	}
	buf.push(str);
	return buf.join("");
}

/**
 * Capitalizes first symbol.
 *
 *     JW.strings.capitalize("vasya")  // "Vasya"
 */
export function capitalize(str: string): string {
	return String(str).charAt(0).toUpperCase() + str.substr(1);
}

/**
 * Converts hyphen-style to camelStyle.
 *
 *     JW.strings.camel("i-love-js")  // "iLoveJs"
 */
export function camel(str: string): string {
	return String(str).replace(/-([a-z])/ig, _fcamel);
}

/**
 * Converts camelStyle to hyphen-style.
 *
 *     JW.strings.hyphen("iLoveJs")  // "i-love-js"
 */
export function hyphen(str: string): string {
	return String(str).replace(/([A-Z])/g, _fhyphen);
}

/**
 * Parses CSS class string and returns array of CSS class names.
 * Supports strings, untrimmed strings, space-separated strings, arrays
 * and subarrays.
 *
 *     JW.strings.parseClass(["  a    b ", "c", [], [["d", "e"]]]); // ["a", "b", "c", "d", "e"]
 */
export function parseClass(str: string): string[];
export function parseClass(str: readonly any[]): string[];
export function parseClass(str: any): string[] {
	if (Array.isArray(str)) {
		const result: string[] = [];
		for (let i = 0; i < str.length; ++i) {
			addAll(result, parseClass(str[i]));
		}
		return result;
	}
	if (typeof str === "string") {
		str = str.trim();
		if (str === "") {
			return [];
		}
		return str.split(/\s+/);
	}
	return [];
}

function _fcamel(_a: string, b: string): string {
	return b.toUpperCase();
}

function _fhyphen(_a: string, b: string): string {
	return "-" + b.toLowerCase();
}
