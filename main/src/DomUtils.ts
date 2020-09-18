/*
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

import jQuery from 'jquery';

/**
 * Some code is taken from jQuery. We are not happy with standard jQuery.parseHtml, because it is slow.
 * We implement an own parseHtml which omits a good bunch of useless manipulations.
 */
const wrapMap = new Map<string, [number, string, string]>([
	["option", [1, "<select multiple='multiple'>", "</select>"]],
	["thead", [1, "<table>", "</table>"]],
	["col", [2, "<table><colgroup>", "</colgroup></table>"]],
	["tr", [2, "<table><tbody>", "</tbody></table>"]],
	["td", [3, "<table><tbody><tr>", "</tr></tbody></table>"]],
	["_default", [0, "", ""]]
]);

wrapMap.set("optgroup", wrapMap.get("option"));
wrapMap.set("tbody", wrapMap.get("thead"));
wrapMap.set("tfoot", wrapMap.get("thead"));
wrapMap.set("colgroup", wrapMap.get("thead"));
wrapMap.set("caption", wrapMap.get("thead"));
wrapMap.set("th", wrapMap.get("td"));

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
	const wrap = wrapMap.get(tagName) ?? wrapMap.get("_default");
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
