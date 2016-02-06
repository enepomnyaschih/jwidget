/*
	jWidget UI source file.
	
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
 * @class JW.UI.Component.Template
 * 
 * HTML template. This class compiles the input template only once, and uses element cloning further on to
 * optimize rendering performance.
 * 
 * @extends JW.Class
 * @constructor
 * @param {String} html Input HTML.
 */
JW.UI.Component.Template = function(html) {
	JW.UI.Component.Template._super.call(this);
	this.html = html; // String
	this.mirror = null; // DOMElement
	this.groups = null; // Map<String, Array<Array<int>>>
};

JW.extend(JW.UI.Component.Template, JW.UI.Component.AbstractTemplate, {
	requiresAfterAppend: false,
	
	/**
	 * Render the template.
	 * @returns {JW.UI.Component.TemplateOutput} Template rendering output.
	 */
	createElement: function() {
		this._compile();
		var root = this.mirror.cloneNode(true);
		var groups = {};
		for (var index = 0, count = this.ids.length; index < count; ++index) {
			var id = this.ids[index];
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
		this.groups = {};
		this._compileAttributes(this.mirror);
	},
	
	_addElement: function(id, el, path) {
		this.groups[id] = this.groups[id] || [];
		this.groups[id].push(path.concat());
	}
});

JW.UI.template(JW.UI.Component, {
	main: '<div></div>'
});
