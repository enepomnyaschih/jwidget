﻿import Class from './Class';
import Dictionary from './Dictionary';
import TemplateOutput from './TemplateOutput';
import * as DomUtils from './DomUtils';
import * as StringUtils from './StringUtils';

/**
 * Abstract HTML template.
 */
abstract class AbstractTemplate extends Class {
	/**
	 * @hidden
	 */
	prefixes: string[] = null;

	/**
	 * The parent IDs of [key] item.
	 * @hidden
	 */
	parentIdMap: Dictionary<Dictionary<boolean>> = null;

	/**
	 * The child IDs of [key] item.
	 * @hidden
	 */
	childIdMap: Dictionary<Dictionary<boolean>> = null;

	/**
	 * ID's in dependency order.
	 * @hidden
	 */
	ids: string[] = null;

	/**
	 * @hidden
	 */
	requiresAfterAppend: boolean = false;

	/**
	 * Renders the template. See [[TemplateOutput]] for details.
	 */
	abstract createElement(): TemplateOutput;

	/**
	 * @hidden
	 */
	abstract _addElement(id: string, el: HTMLElement, path: number[]): void;

	/**
	 * @hidden
	 */
	_compileAttributes(root: HTMLElement) {
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

	/**
	 * @hidden
	 */
	_walkAll(root: HTMLElement) {
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

	/**
	 * @hidden
	 */
	_walk(el: Node, path: number[], parentIds: string[], callback: (el: HTMLElement, path: number[]) => void, scope?: any) {
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

	/**
	 * @hidden
	 */
	_backtrace(id: string) {
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
