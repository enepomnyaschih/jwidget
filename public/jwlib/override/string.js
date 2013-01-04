/*
	JW string prototype extension.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
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

JW.String = JW.Class.extend({
	base : null, // [readonly] String
	
	init: function(x)
	{
		this.base = x;
	}
});

JW.String._prototype = {
	/**
	 * Replaces all special characters from text to put it into html properly.
	 */
	htmlEncode: function() // String
	{
		return this.
			replace(/&/g, "&amp;").
			replace(/>/g, "&gt;").
			replace(/</g, "&lt;").
			replace(/"/g, "&quot;");
	},
	
	/**
	 * Back function to htmlEncode.
	 */
	htmlDecode: function() // String
	{
		return this.
			replace(/&quot;/g, '"').
			replace(/&lt;/g, "<").
			replace(/&gt;/g, ">").
			replace(/&amp;/g, "&");
	},
	
	/**
	 * Removes all <script> tags from html to prevent scripting.
	 */
	removeScripts: function() // String
	{
		var result = [];
		var index = 0;
		while (true)
		{
			var from = this.indexOf("<script", index);
			if (from == -1)
				break;
			
			result.push(this.substr(index, from - index));
			index = this.indexOf("</script>", from) + 9;
			
			if (index == -1)
				return result.join("");
		}
		
		result.push(this.substr(index));
		return result.join("");
	},
	
	/**
	 * Shortens string to specified length using ellipsis.
	 */
	ellipsis: function( // String
		length,   // [required] Integer, string length to shorten to
		ellipsis) // [optional] String, defaults to "..."
	{
		if (this.length <= length)
			return this;
		
		ellipsis = ellipsis || "...";
		return this.substr(0, length - ellipsis.length) + ellipsis;
	},
	
	/**
	 * Prepends string by specified symbols till specified length.
	 */
	prepend: function( // String
		length, // [required] Integer, string length to stretch to
		ch)     // [required] String, symbol to prepend
	{
		var buf = [];
		length -= this.length;
		for (var i = 0; i < length; ++i)
			buf.push(ch);
		buf.push(this);
		return buf.join("");
	},
	
	/**
	 * Takes first symbol in string to upper case.
	 */
	capitalize: function() // String
	{
		return this.charAt(0).toUpperCase() + this.substr(1);
	},
	
	/**
	 * Converts all hyphen/lowercase pairs to uppercase symbols.
	 */
	camel: function() // String
	{
		return this.replace(/-([a-z])/ig, JW.String._fcamel);
	},
	
	/**
	 * Converts all uppercase letters to hyphen/lowercase pairs.
	 */
	hyphen: function() // String
	{
		return this.replace(/([A-Z])/g, JW.String._fhyphen);
	},
	
	/**
	 * Removes all whitespaces at the beginning and at the end.
	 */
	trim: function() // String
	{
		return this.replace(/^\s*/, "").replace(/\s*$/, "");
	}
};

JW.extendFly(JW.String, JW.String._prototype, {
	charAt       : String.prototype.charAt,
	charCodeAt   : String.prototype.charCodeAt,
	concat       : String.prototype.concat,
	indexOf      : String.prototype.indexOf,
	lastIndexOf  : String.prototype.lastIndexOf,
	match        : String.prototype.match,
	replace      : String.prototype.replace,
	search       : String.prototype.search,
	slice        : String.prototype.slice,
	split        : String.prototype.split,
	substr       : String.prototype.substr,
	substring    : String.prototype.substring,
	toLowerCase  : String.prototype.toLowerCase,
	toUpperCase  : String.prototype.toUpperCase,
	valueOf      : String.prototype.valueOf
});

JW.apply(JW.String, {
	htmlEncode    : JW.descope(JW.String._prototype.htmlEncode,    String),
	htmlDecode    : JW.descope(JW.String._prototype.htmlDecode,    String),
	removeScripts : JW.descope(JW.String._prototype.removeScripts, String),
	ellipsis      : JW.descope(JW.String._prototype.ellipsis,      String),
	prepend       : JW.descope(JW.String._prototype.prepend,       String),
	capitalize    : JW.descope(JW.String._prototype.capitalize,    String),
	camel         : JW.descope(JW.String._prototype.camel,         String),
	hyphen        : JW.descope(JW.String._prototype.hyphen,        String),
	trim          : JW.descope(JW.String._prototype.trim,          String),
	
	_fcamel: function(a, b)
	{
		return b.toUpperCase();
	},
	
	_fhyphen: function(a, b)
	{
		return "-" + b.toLowerCase();
	}
});
