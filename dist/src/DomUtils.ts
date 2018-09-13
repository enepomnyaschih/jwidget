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

import Dictionary from './Dictionary';

/**
 * Some code is taken from jQuery. We are not happy with standard jQuery.parseHtml, because it is slow.
 * We implement an own parseHtml which omits a good bunch of useless manupulations.
 */
const wrapMap: Dictionary<any[]> = {
	option: [1, "<select multiple='multiple'>", "</select>"],
	thead: [1, "<table>", "</table>"],
	col: [2, "<table><colgroup>", "</colgroup></table>"],
	tr: [2, "<table><tbody>", "</tbody></table>"],
	td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
	_default: [0, "", ""]
};

const rtagName = /^<([\w:]+)/;

let _fragment: DocumentFragment = null;

/**
 * Checks if value is a jQuery element.
 */
export function isElement(value: any): boolean {
	return value instanceof (<any>jQuery.fn).init;
}

const lifeInputTags = ["text", "password", "email", "number", "search", "tel", "url"];

/**
 * Checks if the element is a text input.
 *
 * @param el Element.
 * @returns Element is a text input.
 */
export function isTextInput(el: JQuery): boolean;

/**
 * Checks if the element is a text input.
 *
 * @param el Element.
 * @returns Element is a text input.
 */
export function isTextInput(el: Element): boolean;
export function isTextInput(el: any): boolean {
	const $el: JQuery = jQuery(el);
	const tagName = $el[0].tagName.toLowerCase();
	if (tagName === "input") {
		const type = $el.attr("type");
		return !type || lifeInputTags.indexOf(type.toLowerCase()) !== -1;
	}
	return tagName === "textarea";
}

/**
 * Checks if current HTML document body contains the specified element.
 *
 * @param el HTML element.
 * @returns Element is in DOM.
 */
export function inDom(el: HTMLElement): boolean {
	while (el) {
		if (el.tagName.toLowerCase() === "body") {
			return true;
		}
		el = <HTMLElement>(el.parentNode);
	}
	return false;
}

/**
 * Checks deeply if one HTML element is a descendant of another element.
 *
 * @param descendantEl Descendant HTML element to check.
 * @param ancestorEl Ancestor HTML element to check.
 * @returns Element is a descendant of another element.
 */
export function inEl(descendantEl: HTMLElement, ancestorEl: HTMLElement): boolean {
	while (descendantEl) {
		if (descendantEl === ancestorEl) {
			return true;
		}
		descendantEl = descendantEl.parentElement;
	}
	return false;
}

/**
 * Checks if element contains the specified CSS class name.
 *
 * @param el HTML element.
 * @param cls Single CSS class name.
 * @return Element contains this CSS class name.
 */
export function hasClass(el: HTMLElement, cls: string): boolean {
	return (" " + el.className + " ").indexOf(cls) !== -1;
}

/**
 * Adds the specified CSS class name to element unless it already contains it.
 *
 * @param el HTML element.
 * @param cls Single CSS class name.
 */
export function addClass(el: HTMLElement, cls: string) {
	if (!el.className) {
		el.className = cls;
	} else if (!hasClass(el, cls)) {
		el.className += " " + cls;
	}
}

/**
 * Parses HTML and builds a new DOM element.
 *
 * @param html HTML code to parse.
 * @returns New HTML element.
 */
export function parseHtml(html: string): HTMLElement {
	if (_fragment) {
		_fragment.textContent = "";
	} else {
		_fragment = document.createDocumentFragment();
	}
	let el: HTMLElement = document.createElement("div");
	_fragment.appendChild(el);
	const tagName = rtagName.exec(html)[1];
	const wrap = wrapMap[tagName] || wrapMap['_default'];
	el.innerHTML = wrap[1] + html + wrap[2];
	for (let i = 0; i < wrap[0]; ++i) {
		el = <HTMLElement>(el.firstChild);
	}
	return <HTMLElement>(el.firstChild);
}

/**
 * Inserts element as a child at specified position.
 *
 * @param parent Element to insert into.
 * @param child Element to insert.
 * @param index Position to insert at.
 */
export function insert(parent: Node, child: Node, index?: number) {
	if ((index == null) || (index >= parent.childNodes.length)) {
		parent.appendChild(child);
	} else {
		parent.insertBefore(child, parent.childNodes.item(index));
	}
}

/**
 * Removes element from DOM.
 *
 * @param el Element to remove.
 */
export function remove(el: Node) {
	if (el.parentNode) {
		el.parentNode.removeChild(el);
	}
}

/**
 * Replaces one HTML element with another.
 *
 * @param removeEl Element to replace.
 * @param insertEl Element to replace `removeEl` with.
 * @param attrs If true, retains element `id` and `class`
 */
export function replace(removeEl: HTMLElement, insertEl: HTMLElement, attrs?: boolean) {
	const parentEl = removeEl.parentNode;
	if (!parentEl) {
		return;
	}
	const id = attrs ? removeEl.getAttribute("id") : null,
		cls = attrs ? removeEl.getAttribute("class") : null;
	parentEl.replaceChild(insertEl, removeEl);
	if (id) {
		insertEl.setAttribute("id", id);
	}
	if (cls) {
		addClass(insertEl, cls);
	}
}

export function _afterAppend(child: { _afterAppend: () => void }) {
	child._afterAppend();
}

(function (wrapMap) {
	wrapMap['optgroup'] = wrapMap['option'];
	wrapMap['tbody'] = wrapMap['tfoot'] = wrapMap['colgroup'] = wrapMap['caption'] = wrapMap['thead'];
	wrapMap['th'] = wrapMap['td'];
})(wrapMap);
