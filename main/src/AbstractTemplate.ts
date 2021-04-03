/*
MIT License

Copyright (c) 2021 Egor Nepomnyaschih

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

import {addAll} from "./ArrayUtils";
import * as DomUtils from './DomUtils';
import * as StringUtils from './StringUtils';
import TemplateOutput from './TemplateOutput';

/**
 * Abstract HTML template.
 */
abstract class AbstractTemplate {
	private prefixes: string[] = null;

	private parentIds: Map<string, Set<string>> = null; // The parent IDs of [key] item.
	private childIds: Map<string, Set<string>> = null; // The child IDs of [key] item.

	protected ids: string[] = null; // IDs in dependency order.

	/**
	 * Flag indicating if rendering of a `Component` by this template must be followed with a DOM presence check with a
	 * possible `afterAppend` method call.
	 */
	get requiresAfterAppend(): boolean {
		return false;
	}

	/**
	 * Renders the template. See `TemplateOutput` for details.
	 */
	abstract createElement(): TemplateOutput;

	protected abstract _addElement(id: string, el: HTMLElement, path: readonly number[]): void;

	protected _compileAttributes(root: HTMLElement) {
		this.prefixes = StringUtils.parseClass(root.getAttribute("jwclass"));
		root.removeAttribute("jwclass");
		for (let prefix of this.prefixes) {
			DomUtils.addClass(root, prefix);
		}

		this.parentIds = new Map<string, Set<string>>();
		this.childIds = new Map<string, Set<string>>();

		// add elements to groups and fill in dependencies
		this._walkAll(root);

		// resolving dependencies to a plain array of IDs
		this.ids = [];
		this._backtrace("root");

		// check for trash
		const parentIds = Array.from(this.parentIds.keys());
		// some ID's may not have been backtraced if they are assigned to the root element,
		// so we must backtrace them to make sure that everything is processed
		for (let id of parentIds) {
			this._backtrace(id);
		}
		const remainingIds = Array.from(this.parentIds.keys());
		if (this.parentIds.size !== 0) {
			console.warn("jWidget template '" + this.prefixes.join(" ") +
				"' has cyclic dependencies between the next jwid's: " + [...remainingIds].join(", ") +
				". Can't detect the desired rendering order. Rendering elements in arbitrary order...");
			addAll(this.ids, remainingIds);
		}

		this.prefixes = null;
		this.parentIds = null;
		this.childIds = null;
	}

	private _walkAll(root: HTMLElement) {
		this._walk(root, [], [], (el: HTMLElement, path: readonly number[]): string[] => {
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
			for (let id of ids) {
				for (let prefix of this.prefixes) {
					DomUtils.addClass(el, prefix + "-" + id);
				}
				this._addElement(id, el, path);
			}
			return ids;
		});
		this._addElement("root", root, []);
	}

	private _walk(el: HTMLElement, path: number[], parentIds: readonly string[],
				  callback: (el: HTMLElement, path: readonly number[]) => string[]) {
		if (el.nodeType !== 1) { // ELEMENT
			return;
		}
		let childIds: string[] = callback(el, path);
		if (path.length === 0) {
			childIds = childIds || [];
			childIds.push("root");
		}
		if (childIds !== null) {
			for (let childId of childIds) {
				this.parentIds.set(childId, this.parentIds.get(childId) || new Set<string>());
				for (let parentId of parentIds) {
					this.childIds.set(parentId, this.childIds.get(parentId) || new Set<string>());
					this.parentIds.get(childId).add(parentId);
					this.childIds.get(parentId).add(childId);
				}
			}
			parentIds = childIds;
		}
		const index = path.length;
		path.push(0);
		const childNodes = el.childNodes;
		for (let i = 0, l = childNodes.length; i < l; ++i) {
			path[index] = i;
			this._walk(<HTMLElement>childNodes[i], path, parentIds, callback);
		}
		path.pop();
	}

	private _backtrace(id: string) {
		// if this element has already been processed, skip it
		const parentIds = this.parentIds.get(id);
		if (parentIds === undefined) {
			return;
		}

		// if this element still has parents, skip it
		for (let parentId of parentIds) {
			if (this.parentIds.has(parentId)) {
				return;
			}
		}
		// remove the element from graph
		this.parentIds.delete(id);
		this.ids.push(id);

		// traverse into children
		const childIds = this.childIds.get(id);
		if (childIds === undefined) {
			return;
		}
		for (let childId of childIds) {
			this._backtrace(childId);
		}
	}
}

export default AbstractTemplate;
