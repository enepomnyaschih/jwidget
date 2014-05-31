/*
	jWidget UI source file.
	
	Copyright (C) 2014 Egor Nepomnyaschih
	
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

JW.UI.Component.Template = function(html) {
	JW.UI.Component.Template._super.call(this);
	this.html = html;
	this.mirror = null;
	this.prefixes = null;
	this.groups = null;
};

JW.extend(JW.UI.Component.Template, JW.Class, {
	/*
	String html;
	DOMElement mirror;
	Array<String> prefixes;
	Map<String, Array<Array<int>>> groups;
	*/
	
	createElement: function() {
		this._compile();
		var root = this.mirror.cloneNode(true);
		var groups = {};
		for (var id in this.groups) {
			var paths = this.groups[id];
			var groupSize = paths.length;
			var group = new Array(groupSize);
			for (var i = 0; i < groupSize; ++i) {
				var path = paths[i];
				var el = root;
				for (var j = 0, n = path.length; j < n; ++j) {
					el = el.childNodes[path[j]];
				}
				group[i] = el;
			}
			groups[id] = group;
		}
		return new JW.UI.Component.TemplateOutput(root, groups);
	},
	
	_compile: function() {
		if (this.mirror !== null) {
			return;
		}
		this.mirror = JW.UI.parseHtml(this.html);
		this.prefixes = JW.String.parseClass(this.mirror.getAttribute("jwclass"));
		this.mirror.removeAttribute("jwclass");
		for (var i = 0, l = this.prefixes.length; i < l; ++i) {
			JW.UI.addClass(this.mirror, this.prefixes[i]);
		}
		this.groups = {};
		var path = [];
		this._walk(this.mirror, path, function(el, path) {
			var ids = JW.String.parseClass(el.getAttribute("jwid"));
			el.removeAttribute("jwid");
			for (var i = 0, l = ids.length; i < l; ++i) {
				var id = ids[i];
				for (var j = 0, n = this.prefixes.length; j < n; ++j) {
					JW.UI.addClass(el, this.prefixes[j] + "-" + id);
				}
				this.groups[id] = this.groups[id] || [];
				this.groups[id].push(path.concat());
			}
		}, this);
		this.groups["root"] = this.groups["root"] || [];
		this.groups["root"].push([]);
	},
	
	_walk: function(el, path, callback, scope) {
		if (el.nodeType !== 1) { // ELEMENT
			return;
		}
		callback.call(scope, el, path);
		var index = path.length;
		path.push(0);
		var childNodes = el.childNodes;
		for (var i = 0, l = childNodes.length; i < l; ++i) {
			path[index] = i;
			this._walk(childNodes[i], path, callback, scope);
		}
		path.pop();
	}
});

JW.UI.template(JW.UI.Component, {
	main: '<div></div>'
});
