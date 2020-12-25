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

/**
 * Capitalizes first symbol.
 *
 *     JW.strings.capitalize("vasya")  // "Vasya"
 */
export function capitalize(str: string): string {
	return str.charAt(0).toUpperCase() + str.substr(1);
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
 * Parses CSS class string and returns array of CSS class names.
 * Supports strings, untrimmed strings, space-separated strings, arrays
 * and subarrays.
 *
 *     parseClass("  a    b "); // ["a", "b"]
 */
export function parseClass(str: string): string[] {
	if (str == null) {
		return [];
	}
	str = str.trim();
	if (str === "") {
		return [];
	}
	return str.split(/\s+/);
}

function _fcamel(_a: string, b: string): string {
	return b.toUpperCase();
}
