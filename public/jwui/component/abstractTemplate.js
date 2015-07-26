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

JW.UI.Component.AbstractTemplate = function() {
	JW.UI.Component.AbstractTemplate._super.call(this);
	this.prefixes = null; // Array<String>
};

JW.extend(JW.UI.Component.AbstractTemplate, JW.Class, {
	// abstract Boolean requiresAfterAppend;
	// abstract void _addElement(String id, DOMElement el, Array<number> path);

	_compileAttributes: function(root) {
		this.prefixes = JW.String.parseClass(root.getAttribute("jwclass"));
		root.removeAttribute("jwclass");
		for (var i = 0, l = this.prefixes.length; i < l; ++i) {
			JW.UI.addClass(root, this.prefixes[i]);
		}
		var path = [];
		this._walk(root, path, function(el, path) {
			var attr = el.getAttribute("jwid");
			if (!attr) {
				return;
			}
			var ids = JW.String.parseClass(attr);
			el.removeAttribute("jwid");
			for (var i = 0, l = ids.length; i < l; ++i) {
				var id = ids[i];
				for (var j = 0, n = this.prefixes.length; j < n; ++j) {
					JW.UI.addClass(el, this.prefixes[j] + "-" + id);
				}
				this._addElement(id, el, path);
			}
		}, this);
		this._addElement("root", root, []);
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
