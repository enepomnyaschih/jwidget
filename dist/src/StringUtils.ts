/*
	jWidget 2
	Copyright (C) 2017  Egor Nepomnyaschih
	enepomnyaschih@gmail.com
	https://github.com/enepomnyaschih/jwidget

	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU Lesser General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU Lesser General Public License for more details.

	You should have received a copy of the GNU Lesser General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

import {defn, isArray} from './Core';

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
 * Removes script tags from HTML.
 *
 * @deprecated Doesn't line up with other jWidget functions.
 */
export function removeScripts(target: string): string {
	target = String(target);
	var result: string[] = [];
	var index = 0;
	while (true) {
		var from = target.indexOf("<script", index);
		if (from === -1) {
			break;
		}
		result.push(target.substr(index, from - index));
		index = target.indexOf("</script>", from) + 9;
		if (index === -1) {
			return result.join("");
		}
	}
	result.push(target.substr(index));
	return result.join("");
}

/**
 * Shortens the string to specified length. If string is short enough, it stays the same.
 * Otherwise it is cutted and **ellipsis** substring is appended so that the result string length
 * equals to **length**.
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
	ellipsis = defn(ellipsis, "...");
	return str.substr(0, length - ellipsis.length) + ellipsis;
}

/**
 * Prepends string with specified symbol at the beginning to adjust to specified length.
 * If string is long enough, it stays the same.
 *
 *     JW.strings.prepend("123", 5, "0")  // "00123"
 *
 * @param str Input string.
 * @param length Minimum length of resulting string.
 * @param ch Symbol to prepend.
 * @returns Result string.
 */
export function prepend(str: string, length: number, ch: string): string {
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
 * Removes whitespace symbols at begin and end of string.
 *
 *     JW.strings.trim("\t\tI love JS!    ")  // "I love JS!"
 *
 * @deprecated Use JavaScript native **trim** method instead.
 */
export function trim(target: string): string {
	return String(target).replace(/^\s*/, "").replace(/\s*$/, "");
}

/**
 * Parses CSS class string and returns array of CSS class names.
 * Supports strings, untrimmed strings, space-separated strings, arrays
 * and subarrays.
 *
 *     JW.strings.parseClass(["  a    b ", "c", [], [["d", "e"]]]); // ["a", "b", "c", "d", "e"]
 */
export function parseClass(str: string): string[];
export function parseClass(str: any[]): string[];
export function parseClass(str: any): string[] {
	if (isArray(str)) {
		var result: string[] = [];
		for (var i = 0; i < str.length; ++i) {
			result.push.apply(result, parseClass(str[i]));
		}
		return result;
	}
	if (typeof str === "string") {
		str = trim(str);
		if (str === "") {
			return [];
		}
		return str.split(/\s+/);
	}
	return [];
}

function _fcamel(a: string, b: string): string {
	a = a;
	return b.toUpperCase();
}

function _fhyphen(a: string, b: string): string {
	a = a;
	return "-" + b.toLowerCase();
}
