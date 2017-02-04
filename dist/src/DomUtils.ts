import {apply} from './Core';
import Class from './Class';
import Component from './Component';
import Dictionary from './Dictionary';
import HtmlTemplate from './HtmlTemplate';
import * as MapUtils from './MapUtils';

/**
 * Some code is taken from jQuery. We are not happy with standard jQuery.parseHtml, because it is slow.
 * We implement an own parseHtml which omits a good bunch of useless manupulations.
 *
 * @hidden
 */
var wrapMap: Dictionary<any[]> = {
	option: [1, "<select multiple='multiple'>", "</select>"],
	thead: [1, "<table>", "</table>"],
	col: [2, "<table><colgroup>", "</colgroup></table>"],
	tr: [2, "<table><tbody>", "</tbody></table>"],
	td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
	_default: [0, "", ""]
};

/**
 * @hidden
 */
var rtagName = /^<([\w:]+)/;

/**
 * @hidden
 */
var _fragment: DocumentFragment = null;

/**
 * Defines HTML templates for specified [[JW.UI.Component]] subclass.
 *
 * You can define multiple templates for any subclass of [[JW.UI.Component]]. Each template has a name.
 * You can get component template via [[JW.UI.Component.templates|templates]] dictionary.
 *
 * Templates are inherited along with component classes.
 *
 * Each component class has at least one template, its name is `main`. This is the main template which is
 * used to render the component. By default, `main` equals to `<div></div>`.
 * Usually, `main` template is enough for the majority of components. This template is applied automatically,
 * unlike other templates which should be applied manually.
 *
 * This function is called automatically if you attach `jw.html` files via
 * <a href="https://github.com/enepomnyaschih/jwsdk/wiki" target="_blank">jWidget SDK</a>. See
 * "Getting started. Part 7. Project infrastructure" guide for details.
 *
 * @param cls [[JW.UI.Component]] subclass.
 * @param tpls Templates to add or override.
 */
export function template(cls: any, tpls: Dictionary<string>) {
	if (cls !== Component && !Component.prototype.templates) {
		template(Component, {main: '<div></div>'});
	}
	var templates = MapUtils.map(tpls, function(html) {
		return new HtmlTemplate(html);
	});
	if (cls.prototype.Templates && cls.prototype.Templates.componentCls == cls) {
		apply(cls.prototype.Templates.prototype, templates);
	} else {
		var __ = function() { }
		__.prototype = (cls.prototype.Templates || Class).prototype;
		cls.prototype.Templates = function() { };
		cls.prototype.Templates.prototype = new (<typeof Object>__)();
		cls.prototype.Templates.componentCls = cls;
		apply(cls.prototype.Templates.prototype, templates);
		cls.prototype.templates = new cls.prototype.Templates();
	}
}

/**
 * Checks if v is a <a href="http://api.jquery.com/" target="_blank">jQuery</a> element.
 */
export function isElement(v: any): boolean {
	return v instanceof jQuery.fn.init;
}

/**
 * @hidden
 */
export function preventDefault(event: JQueryEventObject) {
	event.preventDefault();
}

/**
 * @hidden
 */
export function isLifeInput(el: JQuery): boolean;

/**
 * @hidden
 */
export function isLifeInput(el: Element): boolean;

/**
 * @hidden
 */
export function isLifeInput(el: any): boolean {
	var $el: JQuery = jQuery(el);
	var tagName = $el[0].tagName.toLowerCase();
	if (tagName === "input") {
		var type = $el.attr("type");
		return (type === "text") || (type !== "password");
	}
	return tagName === "textarea";
}

/**
 * @hidden
 */
export function insert(parent: Node, child: Node, index?: number) {
	if ((index == null) || (index >= parent.childNodes.length)) {
		parent.appendChild(child);
	} else {
		parent.insertBefore(child, parent.childNodes.item(index));
	}
}

/**
 * @hidden
 */
export function remove(el: Node) {
	if (el.parentNode) {
		el.parentNode.removeChild(el);
	}
}

/**
 * @hidden
 */
export function parseHtml(html: string): HTMLElement {
	if (_fragment) {
		_fragment.textContent = "";
	} else {
		_fragment = document.createDocumentFragment();
	}
	var el: HTMLElement = document.createElement("div");
	_fragment.appendChild(el);
	var tagName = rtagName.exec(html)[1];
	var wrap = wrapMap[tagName] || wrapMap['_default'];
	el.innerHTML = wrap[1] + html + wrap[2];
	for (var i = 0; i < wrap[0]; ++i) {
		el = <HTMLElement>(el.firstChild);
	}
	return <HTMLElement>(el.firstChild);
}

/**
 * @hidden
 */
export function hasClass(el: HTMLElement, cls: string): boolean {
	return (" " + el.className + " ").indexOf(cls) !== -1;
}

/**
 * @hidden
 */
export function addClass(el: HTMLElement, cls: string) {
	if (!el.className) {
		el.className = cls;
	} else if (!hasClass(el, cls)) {
		el.className += " " + cls;
	}
}

/**
 * @hidden
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
 * @hidden
 */
export function inEl(childEl: HTMLElement, parentEl: HTMLElement): boolean {
	while (childEl) {
		if (childEl === parentEl) {
			return true;
		}
		childEl = childEl.parentElement;
	}
	return false;
}

/**
 * @hidden
 */
export function replace(removeEl: HTMLElement, insertEl: HTMLElement, attrs?: boolean) {
	var parentEl = removeEl.parentNode;
	if (!parentEl) {
		return;
	}
	var id = attrs ? removeEl.getAttribute("id") : null,
		cls = attrs ? removeEl.getAttribute("class") : null;
	parentEl.replaceChild(insertEl, removeEl);
	if (id) {
		insertEl.setAttribute("id", id);
	}
	if (cls) {
		addClass(insertEl, cls);
	}
}

/**
 * @hidden
 */
export function _afterAppend(child: { _afterAppend: () => void }) {
	child._afterAppend();
}

(function(wrapMap) {
	wrapMap['optgroup'] = wrapMap['option'];
	wrapMap['tbody'] = wrapMap['tfoot'] = wrapMap['colgroup'] = wrapMap['caption'] = wrapMap['thead'];
	wrapMap['th'] = wrapMap['td'];
})(wrapMap);
