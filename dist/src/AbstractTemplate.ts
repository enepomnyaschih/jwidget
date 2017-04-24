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

import Class from './Class';
import Dictionary from './Dictionary';
import TemplateOutput from './TemplateOutput';
import * as DomUtils from './DomUtils';
import * as StringUtils from './StringUtils';

/**
 * Abstract HTML template.
 */
abstract class AbstractTemplate extends Class {
	private prefixes: string[] = null;

	private parentIdMap: Dictionary<Dictionary<boolean>> = null; // The parent IDs of [key] item.
	private childIdMap : Dictionary<Dictionary<boolean>> = null; // The child IDs of [key] item.

	protected ids: string[] = null; // IDs in dependency order.

	get requiresAfterAppend(): boolean {
		return false;
	}

	/**
	 * Renders the template. See [[TemplateOutput]] for details.
	 */
	abstract createElement(): TemplateOutput;

	protected abstract _addElement(id: string, el: HTMLElement, path: number[]): void;

	protected _compileAttributes(root: HTMLElement) {
		this.prefixes = StringUtils.parseClass(root.getAttribute("jwclass"));
		root.removeAttribute("jwclass");
		for (var i = 0, l = this.prefixes.length; i < l; ++i) {
			DomUtils.addClass(root, this.prefixes[i]);
		}

		this.parentIdMap = {};
		this.childIdMap = {};

		// add elements to groups and fill in dependencies
		this._walkAll(root);

		// resolving dependencies to a plain list of IDs
		this.ids = [];
		this._backtrace("root");

		// check for trash
		var remainingIds = Object.keys(this.parentIdMap);
		if (remainingIds.length !== 0) {
			// some ID's may not have been backtraced if they are assigned to the root element,
			// so we must backtrace them to make sure that everything is processed
			remainingIds.forEach(this._backtrace, this);
			remainingIds = Object.keys(this.parentIdMap);
			if (remainingIds.length !== 0) {
				console.warn("jWidget template '" + this.prefixes.join(" ") +
					"' has cyclic dependencies among the next jwid's: " + remainingIds.join(", ") +
					". Can't detect the desired rendering order. Rendering elements in arbitrary order...");
				this.ids.push.apply(this.ids, remainingIds);
			}
		}

		this.prefixes = null;
		this.parentIdMap = null;
		this.childIdMap = null;
	}

	private _walkAll(root: HTMLElement) {
		this._walk(root, [], [], (el: HTMLElement, path: number[]): string[] => {
			var attr = el.getAttribute("jwid");
			if (!attr) {
				return null;
			}
			var ids = StringUtils.parseClass(attr);
			el.removeAttribute("jwid");
			var l = ids.length;
			if (l === 0) {
				return null;
			}
			for (var i = 0; i < l; ++i) {
				var id = ids[i];
				for (var j = 0, n = this.prefixes.length; j < n; ++j) {
					DomUtils.addClass(el, this.prefixes[j] + "-" + id);
				}
				this._addElement(id, el, path);
			}
			return ids;
		}, this);
		this._addElement("root", root, []);
	}

	private _walk(el: Node, path: number[], parentIds: string[], callback: (el: HTMLElement, path: number[]) => void, scope?: any) {
		if (el.nodeType !== 1) { // ELEMENT
			return;
		}
		var childIds: string[] = callback.call(scope, el, path);
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
	}

	private _backtrace(id: string) {
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
}

export default AbstractTemplate;
