/*
	jWidget Lib source file.
	
	Copyright (C) 2015 Egor Nepomnyaschih
	
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

/**
 * @class
 *
 * String utility functions.
 */
JW.String = {
	/**
	 * Escapes special HTML symbols.
	 * Converts symbols &amp;, &gt;, &lt;, &quot; to `&amp;` `&gt;` `&lt;` `&quot;` correspondingly.
	 * @static
	 * @param {string} str String.
	 * @returns {string} Result.
	 */
	htmlEncode: function(target) {
		return String(target).
			replace(/&/g, "&amp;").
			replace(/>/g, "&gt;").
			replace(/</g, "&lt;").
			replace(/"/g, "&quot;");
	},
	
	/**
	 * Unescapes special HTML symbols.
	 * Converts sequences `&amp;` `&gt;` `&lt;` `&quot;` to &amp;, &gt;, &lt;, &quot; correspondingly.
	 * @static
	 * @param {string} str String.
	 * @returns {string} Result.
	 */
	htmlDecode: function(target) {
		return String(target).
			replace(/&quot;/g, '"').
			replace(/&lt;/g, "<").
			replace(/&gt;/g, ">").
			replace(/&amp;/g, "&");
	},
	
	removeScripts: function(target) {
		target = String(target);
		var result = [];
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
	},
	
	/**
	 * Shortens the string to specified length. If string is short enough, it doesn't change.
	 * Otherwise, it is cutted, and `ellipsis` substring is appended so the resulting string length
	 * equals to `length`.
	 * @static
	 * @param {string} str String.
	 * @param {number} length Maximum length of resulting string.
	 * @param {string} [ellipsis] String tail for shortening. Defaults to `...`
	 * @returns {string} Result.
	 */
	ellipsis: function(target, length, ellipsis) {
		target = String(target);
		if (target.length <= length) {
			return target;
		}
		ellipsis = ellipsis || "...";
		return target.substr(0, length - ellipsis.length) + ellipsis;
	},
	
	/**
	 * Prepends string with specified symbol at the beginning to adjust to specified length.
	 * If string is long enough, it doesn't change.
	 * 
	 *     JW.String.prepend("123", 5, "0")  // "00123"
	 * 
	 * @static
	 * @param {string} str String.
	 * @param {number} length Minimum length of resulting string.
	 * @param {string} ch Symbol to prepend.
	 * @returns {string} Result.
	 */
	prepend: function(target, length, ch) {
		target = String(target);
		var buf = [];
		length -= target.length;
		for (var i = 0; i < length; ++i) {
			buf.push(ch);
		}
		buf.push(target);
		return buf.join("");
	},
	
	/**
	 * Capitalizes first symbol.
	 * 
	 *     JW.String.capitalize("vasya")  // "Vasya"
	 * 
	 * @static
	 * @param {string} str String.
	 * @returns {string} Result.
	 */
	capitalize: function(target) {
		target = String(target);
		return target.charAt(0).toUpperCase() + target.substr(1);
	},
	
	/**
	 * Converts hyphen-style to camelStyle.
	 * 
	 *     JW.String.camel("i-love-js")  // "iLoveJs"
	 *
	 * @static
	 * @param {string} str String.
	 * @returns {string} result.
	 */
	camel: function(target) {
		return String(target).replace(/-([a-z])/ig, JW.String._fcamel);
	},
	
	/**
	 * Converts camelStyle to hyphen-style.
	 * 
	 *     JW.String.hyphen("iLoveJs")  // "i-love-js"
	 *
	 * @static
	 * @param {string} str String.
	 * @returns {string} Result.
	 */
	hyphen: function(target) {
		return String(target).replace(/([A-Z])/g, JW.String._fhyphen);
	},
	
	/**
	 * Removes whitespace symbols at begin and end of string.
	 * 
	 *     JW.String.trim("\t\tI love JS!    ")  // "I love JS!"
	 *
	 * @static
	 * @param {string} str String.
	 * @returns {string} Result.
	 */
	trim: function(target) {
		return String(target).replace(/^\s*/, "").replace(/\s*$/, "");
	},
	
	/**
	 * Parses CSS class string and returns array of CSS class names.
	 * Supports strings, untrimmed strings, space-separated strings, arrays
	 * and subarrays.
	 * 
	 *     JW.String.parseClass(["  a    b ", "c", [], [["d", "e"]]]); // ["a", "b", "c", "d", "e"]
	 *
	 * @static
	 * @param {String/Array} str String.
	 * @returns {Array} `<String>` Result.
	 */
	parseClass: function(str) {
		if (JW.isArray(str)) {
			var result = [];
			for (var i = 0; i < str.length; ++i) {
				result.push.apply(result, JW.String.parseClass(str[i]));
			}
			return result;
		}
		if (typeof str === "string") {
			str = JW.String.trim(str);
			if (str === "") {
				return [];
			}
			return str.split(/\s+/);
		}
		return [];
	},
	
	_fcamel: function(a, b) {
		return b.toUpperCase();
	},
	
	_fhyphen: function(a, b) {
		return "-" + b.toLowerCase();
	}
};
