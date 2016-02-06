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
	this.parentIdMap = null; // Map<String, Map<String, true>>, the parent IDs of [key] item
	this.childIdMap = null; // Map<String, Map<String, true>>, the child IDs of [key] item
	this.ids = null; // Array<String>, in dependency order
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

		this.parentIdMap = {};
		this.childIdMap = {};

		// add elements to groups and fill in dependencies
		this._walkAll(root);

		// resolving dependencies to a plain list of IDs
		this.ids = [];
		this._backtrace("root");

		// check for trash
		var remainingIds = JW.Map.getKeys(this.parentIdMap);
		if (remainingIds.length !== 0) {
			console.warn("jWidget template '" + this.prefixes.join(" ") +
				"' has cyclic dependencies among the next jwid's: " + remainingIds.join(", ") +
				". Can't detect the desired rendering order. Rendering elements in arbitrary order...");
			this.ids.push.apply(this.ids, remainingIds);
		}

		this.prefixes = null;
		this.parentIdMap = null;
		this.childIdMap = null;
	},

	_walkAll: function(root) {
		var path = [];
		this._walk(root, path, [], function(el, path) {
			var attr = el.getAttribute("jwid");
			if (!attr) {
				return null;
			}
			var ids = JW.String.parseClass(attr);
			el.removeAttribute("jwid");
			var l = ids.length;
			if (l === 0) {
				return null;
			}
			for (var i = 0; i < l; ++i) {
				var id = ids[i];
				for (var j = 0, n = this.prefixes.length; j < n; ++j) {
					JW.UI.addClass(el, this.prefixes[j] + "-" + id);
				}
				this._addElement(id, el, path);
			}
			return ids;
		}, this);
		this._addElement("root", root, []);
	},

	_walk: function(el, path, parentIds, callback, scope) {
		if (el.nodeType !== 1) { // ELEMENT
			return;
		}
		var childIds = callback.call(scope, el, path);
		if (path.length === 0) {
			childIds = childIds || [];
			childIds.push("root");
		}
		if (childIds !== null) {
			for (var i = 0, l = childIds.length; i < l; ++i) {
				var childId = childIds[i];
				this.parentIdMap[childId] = this.parentIdMap[childId] || {};
				for (var j = 0, m = parentIds.length; j < m; ++j) {
					var parentId = parentIds[j]
					this.childIdMap[parentId] = this.childIdMap[parentId] || {};
					this.parentIdMap[childId][parentId] = true;
					this.childIdMap[parentId][childId] = true;
				}
			}
			parentIds = childIds;
		}
		var index = path.length;
		path.push(0);
		var childNodes = el.childNodes;
		for (var i = 0, l = childNodes.length; i < l; ++i) {
			path[index] = i;
			this._walk(childNodes[i], path, parentIds, callback, scope);
		}
		path.pop();
	},

	_backtrace: function(id) {
		// if this element has already been processed, skip it
		var parentIds = this.parentIdMap[id];
		if (parentIds === undefined) {
			return;
		}

		// if this element still has parents, skip it
		for (var parentId in parentIds) {
			if (this.parentIdMap.hasOwnProperty(parentId)) {
				return;
			}
		}
		// remove the element from graph
		delete this.parentIdMap[id];
		this.ids.push(id);

		// traverse into children
		var childIds = this.childIdMap[id];
		for (var childId in childIds) {
			this._backtrace(childId);
		}
	}
});
