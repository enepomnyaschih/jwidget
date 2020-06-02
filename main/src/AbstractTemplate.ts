﻿/*
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

import Dictionary from './Dictionary';
import * as DomUtils from './DomUtils';
import * as StringUtils from './StringUtils';
import TemplateOutput from './TemplateOutput';

/**
 * Abstract HTML template.
 */
abstract class AbstractTemplate {
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
		for (let i = 0, l = this.prefixes.length; i < l; ++i) {
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
		let remainingIds = Object.keys(this.parentIdMap);
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
			const attr = el.getAttribute("jwid");
			if (!attr) {
				return null;
			}
			const ids = StringUtils.parseClass(attr);
			el.removeAttribute("jwid");
			const l = ids.length;
			if (l === 0) {
				return null;
			}
			for (let i = 0; i < l; ++i) {
				const id = ids[i];
				for (let j = 0, n = this.prefixes.length; j < n; ++j) {
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
		let childIds: string[] = callback.call(scope, el, path);
		if (path.length === 0) {
			childIds = childIds || [];
			childIds.push("root");
		}
		if (childIds !== null) {
			for (let i = 0, l = childIds.length; i < l; ++i) {
				const childId = childIds[i];
				this.parentIdMap[childId] = this.parentIdMap[childId] || {};
				for (let j = 0, m = parentIds.length; j < m; ++j) {
					const parentId = parentIds[j]
					this.childIdMap[parentId] = this.childIdMap[parentId] || {};
					this.parentIdMap[childId][parentId] = true;
					this.childIdMap[parentId][childId] = true;
				}
			}
			parentIds = childIds;
		}
		const index = path.length;
		path.push(0);
		const childNodes = el.childNodes;
		for (var i = 0, l = childNodes.length; i < l; ++i) {
			path[index] = i;
			this._walk(childNodes[i], path, parentIds, callback, scope);
		}
		path.pop();
	}

	private _backtrace(id: string) {
		// if this element has already been processed, skip it
		const parentIds = this.parentIdMap[id];
		if (parentIds === undefined) {
			return;
		}

		// if this element still has parents, skip it
		for (let parentId in parentIds) {
			if (this.parentIdMap.hasOwnProperty(parentId)) {
				return;
			}
		}
		// remove the element from graph
		delete this.parentIdMap[id];
		this.ids.push(id);

		// traverse into children
		const childIds = this.childIdMap[id];
		for (let childId in childIds) {
			this._backtrace(childId);
		}
	}
}

export default AbstractTemplate;