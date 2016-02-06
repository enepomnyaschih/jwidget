/*!
	jWidget UI 1.4.2

	http://enepomnyaschih.github.io/jwidget/#!/guide/home

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
 * @class JW.UI
 *
 * Main jWidget UI library namespace.
 */
JW.UI = {
	// Some code is taken from jQuery. We are not happy with standard jQuery.parseHtml, because it is slow.
	// We implement an own JW.UI.parseHtml which omits a good bunch of useless manupulations.
	wrapMap: {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		thead: [ 1, "<table>", "</table>" ],
		col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
		_default: [ 0, "", "" ]
	},

	rtagName: /^<([\w:]+)/,

	/**
	 * @property {JW.UI.Hash} hash
	 *
	 * Current page hash (without leading "#"). As of jWidget 1.4.1, two-way bound to location.hash.
	 *
	 * @static
	 */
	hash: null,

	/**
	 * Defines HTML templates for specified JW.UI.Component subclass.
	 *
	 * You can define multiple templates for any subclass of JW.UI.Component. Each template has a name.
	 * You can get component template via JW.UI.Component.templates dictionary.
	 *
	 * Templates are inherited together with component classes.
	 *
	 * Each component class has at least one template, its name is `main`. This is the main template which is
	 * used to render the component. By default, `main` equals to `<div></div>`.
	 * Usually, `main` template is enough for the majority of components. This template is applied automatically,
	 * unlike other templates which should be applied manually.
	 *
	 * JW.UI.template function is called automatically if you attach `jw.html` files via
	 * [jWidget SDK](https://github.com/enepomnyaschih/jwsdk/wiki/en). See
	 * [Getting started. Part 7. Project infrastructure](#!/guide/ensample7) for details.
	 *
	 * @static
	 * @param {Function} cls JW.UI.Component subclass.
	 * @param {Object} tpls Templates to add or override.
	 */
	template: function(cls, tpls) {
		tpls = JW.Map.map(tpls, function(html) {
			return new JW.UI.Component.Template(html);
		});
		if (cls.prototype.Templates && cls.prototype.Templates.componentCls == cls) {
			JW.apply(cls.prototype.Templates.prototype, tpls);
		} else {
			cls.prototype.Templates = (cls.superclass.Templates || JW.Class).extend(tpls);
			cls.prototype.Templates.componentCls = cls;
			cls.prototype.templates = new cls.prototype.Templates();
		}
	},

	/**
	 * Checks whether x is [jQuery element](http://api.jquery.com/).
	 * @static
	 * @param {Mixed} x
	 * @returns {boolean} Result.
	 */
	isElement: function(v) {
		return v instanceof jQuery.fn.init;
	},

	/**
	 * Calls `preventDefault` method for [jQuery event](http://api.jquery.com/category/events/event-object/).
	 *
	 * Use this way:
	 *
	 *     el.click(JW.UI.preventDefault);
	 *
	 * Shorthand for
	 *
	 *     el.click(JW.byMethod("preventDefault"));
	 *
	 * and
	 *
	 *     el.click(function(e) { e.preventDefault(); });
	 *
	 * @static
	 * @param {Object} event jQuery event.
	 */
	preventDefault: function(event) {
		event.preventDefault();
	},

	isLifeInput: function(el) {
		el = jQuery(el);
		var tagName = el[0].tagName.toLowerCase();
		if (tagName === "input") {
			var type = el.attr("type");
			return (type === "text") || (type !== "password");
		}
		return tagName === "textarea";
	},

	insert: function(parent, child, index) {
		if (!JW.isSet(index) || (index >= parent.childNodes.length)) {
			parent.appendChild(child);
		} else {
			parent.insertBefore(child, parent.childNodes.item(index));
		}
	},

	remove: function(el) {
		if (el.parentNode) {
			el.parentNode.removeChild(el);
		}
	},

	parseHtml: function(html) {
		if (JW.UI._fragment) {
			JW.UI._fragment.textContent = "";
		} else {
			JW.UI._fragment = document.createDocumentFragment();
		}
		var el = JW.UI._fragment.appendChild(document.createElement("div"));
		var tagName = JW.UI.rtagName.exec(html)[1];
		var wrap = JW.UI.wrapMap[tagName] || JW.UI.wrapMap._default;
		el.innerHTML = wrap[1] + html + wrap[2];
		for (var i = 0; i < wrap[0]; ++i) {
			el = el.firstChild;
		}
		return el.firstChild;
	},

	hasClass: function(el, cls) {
		return (" " + el.className + " ").indexOf(cls) !== -1;
	},

	addClass: function(el, cls) {
		if (!el.className) {
			el.className = cls;
		} else if (!JW.UI.hasClass(el, cls)) {
			el.className += " " + cls;
		}
	},

	inDom: function(el) {
		while (el) {
			if (el.tagName.toLowerCase() === "body") {
				return true;
			}
			el = el.parentNode;
		}
		return false;
	},

	inEl: function(childEl, parentEl) {
		while (childEl) {
			if (childEl === parentEl) {
				return true;
			}
			childEl = childEl.parentNode;
		}
		return false;
	},

	replace: function(removeEl, insertEl, attrs) {
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
			JW.UI.addClass(insertEl, cls);
		}
	},

	_afterAppend: function(child) {
		child._afterAppend();
	}
};

(function(wrapMap) {
	wrapMap.optgroup = wrapMap.option;
	wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
	wrapMap.th = wrapMap.td;
})(JW.UI.wrapMap);

jQuery(function() {
	JW.UI.windowEl = jQuery(window);
	JW.UI.bodyEl   = jQuery(document.body);
});
