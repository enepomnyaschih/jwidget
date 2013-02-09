/*
	jWidget Lib source file.
	
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

JW.String = {
	htmlEncode: function(target) {
		return String(target).
			replace(/&/g, "&amp;").
			replace(/>/g, "&gt;").
			replace(/</g, "&lt;").
			replace(/"/g, "&quot;");
	},
	
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
	
	ellipsis: function(target, length, ellipsis) {
		target = String(target);
		if (target.length <= length) {
			return target;
		}
		ellipsis = ellipsis || "...";
		return target.substr(0, length - ellipsis.length) + ellipsis;
	},
	
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
	
	capitalize: function(target) {
		return String(target).charAt(0).toUpperCase() + target.substr(1);
	},
	
	camel: function(target) {
		return String(target).replace(/-([a-z])/ig, JW.String._fcamel);
	},
	
	hyphen: function(target) {
		return String(target).replace(/([A-Z])/g, JW.String._fhyphen);
	},
	
	trim: function(target) {
		return String(target).replace(/^\s*/, "").replace(/\s*$/, "");
	},
	
	_fcamel: function(a, b) {
		return b.toUpperCase();
	},
	
	_fhyphen: function(a, b) {
		return "-" + b.toLowerCase();
	}
};
