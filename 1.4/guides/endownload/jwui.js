/*!
	jWidget UI 1.4.6

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
;
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

/**
 * @class
 *
 * Result of {@link jQuery#jwon jwon} method call. Destroy it to unbind event handler.
 *
 * @extends JW.Class
 *
 * @constructor
 * Creates the attachment, subscribes to the event. Shorthand: {@link jQuery#jwon jwon}
 * @param {jQuery} el jQuery element collection.
 * @param {string} events One or more space-separated event types and optional namespaces, such as "click" or "keydown.myPlugin".
 * @param {string} selector A selector string to filter the descendants of the selected elements that trigger the event. If the selector is null or omitted, the event is always triggered when it reaches the selected element.
 * @param {Function} handler
 *
 * `handler(event: Event, target: DOMElement)`
 *
 * A function to execute when the event is triggered. The value `false` is also allowed as a shorthand for a function that simply does `return false`.
 *
 * @param {Object} [scope] Function call scope.
 */
JW.UI.JQEventAttachment = function(el, events, selector, handler, scope) {
	JW.UI.JQEventAttachment._super.call(this);
	this.el = el;
	this.events = events;
	if (typeof selector === "function" || typeof selector === "boolean") {
		scope = handler;
		handler = selector;
		selector = null;
	}
	this.selector = selector;
	if (scope && typeof handler === "function") {
		this.handler = function(event) {
			return handler.call(scope || this, event, this);
		};
	} else {
		this.handler = handler;
	}
	el.on(events, this.selector, this.handler);
};

JW.extend(JW.UI.JQEventAttachment, JW.Class, {
	destroyObject: function() {
		this.el.off(this.events, this.selector, this.handler);
		this._super();
	}
});
;
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

/**
 * @class jQuery
 *
 * jQuery extension.
 */
jQuery.extend(jQuery.fn, {
	/**
	 * Attaches handler to an event. jWidget extension for <a href="http://api.jquery.com/on/" target="_blank">on</a>
	 * method which has the next features.
	 *
	 * ### 1. Aggregation
	 *
	 * The method returns event attachment object. Its destruction results in event unbinding which allows you to use
	 * jQuery events in conjunction with {@link JW.Class#own own} method.
	 *
	 *     // Bind a handler to "mousemove" event and aggregate the attachment
	 *     this.own($(window).jwon("mousemove", function(event) {
	 *         $(".output").text(event.pageX + ":" + event.pageY);
	 *     }, this));
	 *
	 * ### 2. Call context argument
	 *
	 * The method accepts callback context as an argument which allows you to avoid JW.inScope
	 * and <a href="http://api.jquery.com/jQuery.proxy/" target="_blank">jQuery.proxy</a> usage.
	 *
	 *     // On button click, destroy this component
	 *     el.jwon("click", this.destroy, this);
	 *
	 * Event target which jQuery usually assigns the call context to is passed as a second callback argument.
	 *
	 *     el.jwon("click", function(event, target) { ... }, this);
	 *
	 * The method doesn't support "data" argument - please use closures instead.
	 *
	 * <iframe style="border: 1px solid green; padding: 10px;" width="800" height="200" src="http://enepomnyaschih.github.io/mt/1.4/jwui-jwon.html"></iframe>
	 *
	 * @param {String} events One or more space-separated event types and optional namespaces, such as "click" or "keydown.myPlugin".
	 * @param {String} selector A selector string to filter the descendants of the selected elements that trigger the event. If the selector is null or omitted, the event is always triggered when it reaches the selected element.
	 * @param {Function} handler
	 *
	 * `handler(event: Event, target: DOMElement)`
	 *
	 * A function to execute when the event is triggered. The value `false` is also allowed as a shorthand for a function that simply does `return false`.
	 *
	 * @param {Object} [scope] Function call scope.
	 * @returns {JW.UI.JQEventAttachment} New event attachment.
	 */
	jwon: function(events, selector, handler, scope) {
		return new JW.UI.JQEventAttachment(this, events, selector, handler, scope);
	},

	/**
	 * Watches string property modification and updates the specified attribute of the DOM element.
	 * Returns JW.UI.AttrUpdater instance. Destroy it to stop synchronization.
	 *
	 *     // Bind "title" attribute to title property value
	 *     this.own(el.jwattr("title", title));
	 *
	 * <iframe style="border: 1px solid green; padding: 10px;" width="800" height="180" src="http://enepomnyaschih.github.io/mt/1.4/jwui-property-jwattr.html"></iframe>
	 *
	 * @param {String} attr DOM element attribute name.
	 * @param {JW.Property} property `<String>` Attribute value.
	 * @returns {JW.UI.AttrUpdater} Synchronizer instance.
	 */
	jwattr: function(attr, property) {
		return new JW.UI.AttrUpdater(this, attr, property);
	},

	/**
	 * DOM element CSS class management method. Supports two variations.
	 *
	 *     jwclass(cls: String, property: JW.Property<Boolean>): JW.UI.ClassUpdater
	 *     jwclass(cls: JW.Property<String>): JW.UI.ClassNameUpdater
	 *
	 * <hr>
	 *
	 *     jwclass(cls: String, property: JW.Property<Boolean>): JW.UI.ClassUpdater
	 *
	 * Watches boolean property modification and updates the specified CSS class presence in the DOM element.
	 * Returns JW.UI.ClassUpdater instance. Destroy it to stop synchronization.
	 *
	 *     // Bind "checked" CSS class to checked property value
	 *     this.own(el.jwclass("checked", checked));
	 *
	 * <iframe style="border: 1px solid green; padding: 10px;" width="800" height="220" src="http://enepomnyaschih.github.io/mt/1.4/jwui-property-jwclass-bool.html"></iframe>
	 *
	 * <hr>
	 *
	 *     jwclass(cls: JW.Property<String>): JW.UI.ClassNameUpdater
	 *
	 * Watches string property modification and updates CSS class name in the DOM element.
	 * Returns JW.UI.ClassNameUpdater instance. Destroy it to stop synchronization.
	 *
	 * **Caution:** Method doesn't check if the class of the same name is already present in the element.
	 * If that's the case, it will remove the class on the next property value change. However, it won't
	 * touch the other classes, e.g. it doesn't remove "application-rect" class in the example below.
	 *
	 *     // Bind CSS class name to color property value
	 *     this.own(el.jwclass(color));
	 *
	 * <iframe style="border: 1px solid green; padding: 10px;" width="800" height="250" src="http://enepomnyaschih.github.io/mt/1.4/jwui-property-jwclass-string.html"></iframe>
	 */
	jwclass: function() {
		var a = arguments[0], b = arguments[1];
		return (b != null) ? new JW.UI.ClassUpdater(this, a, b) : new JW.UI.ClassNameUpdater(this, a);
	},

	/**
	 * Watches string modification and updates the specified CSS style of the DOM element.
	 * Returns JW.UI.CssUpdater instance. Destroy it to stop synchronization.
	 *
	 *     // Bind background color style to color property value
	 *     this.own(el.jwcss("background-color", color));
	 *
	 * <iframe style="border: 1px solid green; padding: 10px;" width="800" height="180" src="http://enepomnyaschih.github.io/mt/1.4/jwui-property-jwcss.html"></iframe>
	 *
	 * @param {String} style CSS style name.
	 * @param {JW.Property} property `<String>` Style value.
	 * @returns {JW.UI.CssUpdater} Synchronizer instance.
	 */
	jwcss: function(style, property) {
		return new JW.UI.CssUpdater(this, style, property);
	},

	/**
	 * Watches string property modification and updates inner HTML of the DOM element.
	 * Returns JW.UI.HtmlUpdater instance. Destroy it to stop synchronization.
	 *
	 *     // Bind inner HTML to html property value
	 *     this.own(el.jwhtml(html));
	 *
	 * <iframe style="border: 1px solid green; padding: 10px;" width="800" height="220" src="http://enepomnyaschih.github.io/mt/1.4/jwui-property-jwhtml.html"></iframe>
	 *
	 * @param {JW.Property} property `<String>` HTML value.
	 * @returns {JW.UI.HtmlUpdater} Synchronizer instance.
	 */
	jwhtml: function(property) {
		return new JW.UI.HtmlUpdater(this, property);
	},

	/**
	 * DOM element property management method. Supports two variations.
	 *
	 *     jwprop("checked"): JW.Property<Boolean>
	 *     jwprop(prop: String, property: JW.Property<Boolean>, [binding: JW.Binding]): JW.UI.PropBinding
	 *
	 * <hr>
	 *
	 *     jwprop("checked"): JW.Property<Boolean>
	 *
	 * Returns a boolean property containing current checkbox state and starts watching for its modification.
	 * Destroy the result property to stop synchronization.
	 *
	 *     // Watch checkbox state
	 *     var property = this.own(el.jwprop("checked"));
	 *
	 * <hr>
	 *
	 *     jwprop(prop: String, property: JW.Property<Boolean>, [binding: JW.Binding]): JW.UI.PropBinding
	 *
	 * Binds specified property of the DOM element to boolean property and/or vice versa.
	 * Returns JW.UI.PropBinding instance. Destroy it to stop synchronization.
	 *
	 *     // Bind element state to property
	 *     this.own(el.jwprop("disabled", property));
	 *
	 * <iframe style="border: 1px solid green; padding: 10px;" width="800" height="140" src="http://enepomnyaschih.github.io/mt/1.4/jwui-property-jwprop.html"></iframe>
	 *
	 * Two way binding:
	 *
	 *     this.own(el.jwprop("checked", this.value, JW.TWOWAY));
	 *
	 * <iframe style="border: 1px solid green; padding: 10px;" width="800" height="150" src="http://enepomnyaschih.github.io/mt/1.4/jwui-property-jwprop-two.html"></iframe>
	 *
	 * @param {String} prop Element's property name.
	 * @param {JW.Property} [property] `<Boolean>` Property value.
	 * @param {JW.Binding} [binding] Binding mode. Defaults to JW.Binding.UPDATE.
	 */
	jwprop: function(prop, property, binding) {
		if (property != null) {
			return new JW.UI.PropBinding(this, prop, property, binding);
		}
		if (prop === "checked") {
			var target = new JW.Property();
			target.own(new JW.UI.CheckedListener(this, {target: target}));
			return target;
		}
		throw new Error("Invalid argument");
	},

	/**
	 * Radio group value management method. Supports two variations.
	 *
	 *     jwradio(name: String): JW.Property<String>
	 *     jwradio(name: String, value: JW.Property<String>, [binding: JW.Binding]): JW.UI.RadioBinding
	 *
	 * <hr>
	 *
	 *     jwradio(name: String): JW.Property<String>
	 *
	 * Returns a string property containing current radio group selection and starts watching for selection modification.
	 * Destroy the result property to stop synchronization.
	 *
	 * Notice that the object binds an event listener to a container element and uses bubbling mechanism to detect the
	 * selection modification. That's why you must avoid bubbling interruption in child elements of the container.
	 * All radios must have the same "name" attribute value. If neighter radio is selected, property is set to null.
	 *
	 *     // Watch radio button selection
	 *     var color = this.own(el.jwradio("color"));
	 *
	 * <iframe style="border: 1px solid green; padding: 10px;" width="800" height="255" src="http://enepomnyaschih.github.io/mt/1.4/jwui-property-jwclass-string.html"></iframe>
	 *
	 * <hr>
	 *
	 *     jwradio(name: String, value: JW.Property<String>, [binding: JW.Binding]): JW.UI.RadioBinding
	 *
	 * Binds radio group selection to string property and/or vice versa.
	 * Returns JW.UI.RadioBinding instance. Destroy it to stop synchronization.
	 *
	 * All radios must have the same "name" attribute value.
	 *
	 *     // Bind radio button selection to property value
	 *     this.own(el.jwradio("letter", value));
	 *
	 * <iframe style="border: 1px solid green; padding: 10px;" width="800" height="170" src="http://enepomnyaschih.github.io/mt/1.4/jwui-property-jwradio.html"></iframe>
	 *
	 * Two way binding:
	 *
	 *     this.own(el.jwradio("first", this.value, JW.TWOWAY));
	 *
	 * <iframe style="border: 1px solid green; padding: 10px;" width="800" height="300" src="http://enepomnyaschih.github.io/mt/1.4/jwui-property-jwradio-two.html"></iframe>
	 *
	 * @param {String} name Radios "name" attribute.
	 * @param {JW.Property} [property] `<String>` Radio value.
	 * @param {JW.Binding} [binding] Binding mode. Defaults to JW.Binding.UPDATE.
	 */
	jwradio: function(name, property, binding) {
		if (property != null) {
			return new JW.UI.RadioBinding(this, name, property, binding);
		}
		var target = new JW.Property();
		target.own(new JW.UI.RadioListener(this, name, {target: target}));
		return target;
	},

	/**
	 * Watches string modification and updates inner text of the DOM element.
	 * Returns JW.UI.TextUpdater instance. Destroy it to stop synchronization.
	 *
	 *     // Bind inner text to property value
	 *     this.own(el.jwtext(text));
	 *
	 * <iframe style="border: 1px solid green; padding: 10px;" width="800" height="220" src="http://enepomnyaschih.github.io/mt/1.4/jwui-property-jwtext.html"></iframe>
	 *
	 * @param {JW.Property} property `<String>` HTML value.
	 * @returns {JW.UI.TextUpdater} Synchronizer instance.
	 */
	jwtext: function(property) {
		return new JW.UI.TextUpdater(this, property);
	},

	/**
	 * DOM element value management method. Supports two variations.
	 *
	 *     jwval([simple: Boolean]): JW.Property<String>
	 *     jwval(value: JW.Property<String>, [binding: JW.Binding], [simple: Boolean]): JW.UI.ValueBinding
	 *
	 * <hr>
	 *
	 *     jwval([simple: Boolean]): JW.Property<String>
	 *
	 * Returns a string property containing current element value and starts watching for value modification.
	 * Destroy the result property to stop synchronization.
	 *
	 *     // Watch input element value
	 *     var value = this.own(el.jwval());
	 *
	 * If simple is `true`, listens "change" event only. Defaults to `false` which enables
	 * reaction to any real-time field modification.
	 *
	 * <hr>
	 *
	 *     jwval(value: JW.Property<String>, [binding: JW.Binding], [simple: Boolean]): JW.UI.ValueBinding
	 *
	 * Binds DOM text input value to string property and/or vice versa.
	 * Returns JW.UI.ValueBinding instance. Destroy it to stop synchronization.
	 *
	 *     // Bind element value to property
	 *     this.own(el.jwval(value));
	 *
	 * If simple is `true`, watch-binding listens "change" event only. Defaults to `false` which enables
	 * reaction to any real-time field modification.
	 *
	 * <iframe style="border: 1px solid green; padding: 10px;" width="800" height="285" src="http://enepomnyaschih.github.io/mt/1.4/jwui-property-jwval.html"></iframe>
	 *
	 * Two way binding:
	 *
	 *     this.own(el.jwval(this.value, JW.TWOWAY));
	 *
	 * <iframe style="border: 1px solid green; padding: 10px;" width="800" height="180" src="http://enepomnyaschih.github.io/mt/1.4/jwui-property-jwval-two.html"></iframe>
	 *
	 * @param {JW.Property} [property] `<String>` Element value.
	 * @param {JW.Binding} [binding] Binding mode. Defaults to JW.Binding.UPDATE.
	 * @param {Boolean} [simple=false]
	 * If true, watch-binding listens "change" event only. Defaults to false which enables
	 * reaction to any real-time field modification.
	 */
	jwval: function(property, binding, simple) {
		if (property != null && (typeof property !== "boolean")) {
			return new JW.UI.ValueBinding(this, property, binding, simple);
		}
		var target = new JW.Property();
		target.own(new JW.UI.ValueListener(this, {target: target, simple: simple}));
		return target;
	},

	/**
	 * Watches boolean property modification and updates visibility of the DOM element.
	 * To make element invisible, sets "display: none" inline style. To make
	 * element visible, removes "display" inline style. Make sure that element is visible according to your CSS rules.
	 * Returns JW.UI.VisibleUpdater instance. Destroy it to stop synchronization.
	 *
	 *     // Bind element visibility to property value
	 *     this.own(el.jwshow(checked));
	 *
	 * <iframe style="border: 1px solid green; padding: 10px;" width="800" height="215" src="http://enepomnyaschih.github.io/mt/1.4/jwui-property-jwshow.html"></iframe>
	 *
	 * @param {JW.Property} property `<Boolean>` Element visibility.
	 * @returns {JW.UI.VisibleUpdater} Synchronizer instance.
	 */
	jwshow: function(property) {
		return new JW.UI.VisibleUpdater(this, property);
	}
});
;
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

JW.UI.Browsers = (function()
{
	ua = navigator.userAgent.toLowerCase();
	function check(r){
		return r.test(ua);
	};
	
	var isStrict = document.compatMode == "CSS1Compat",
		docMode = document.documentMode,
		isOpera = check(/opera/),
		isOpera10_5 = isOpera && check(/version\/10\.5/),
		isChrome = check(/\bchrome\b/),
		isWebKit = check(/webkit/),
		isSafari = !isChrome && check(/safari/),
		isSafari2 = isSafari && check(/applewebkit\/4/), // unique to Safari 2
		isSafari3 = isSafari && check(/version\/3/),
		isSafari4 = isSafari && check(/version\/4/),
		isSafari5 = isSafari && check(/version\/5/),
		isIE = !isOpera && check(/msie/),
		isIE7 = isIE && (check(/msie 7/) || docMode == 7),
		isIE8 = isIE && (check(/msie 8/) && docMode != 7 && docMode != 9 || docMode == 8),
		isIE9 = isIE && (check(/msie 9/) && docMode != 7 && docMode != 8 || docMode == 9),
		isIE6 = isIE && check(/msie 6/),
		isGecko = !isWebKit && check(/gecko/),
		isGecko2 = isGecko && check(/rv:1\.8/),
		isGecko3 = isGecko && check(/rv:1\.9/),
		isGecko4 = isGecko && check(/rv:2\.0/),
		isGecko5 = isGecko && check(/rv:5\./),
		isFF3_0 = isGecko3 && check(/rv:1\.9\.0/),
		isFF3_5 = isGecko3 && check(/rv:1\.9\.1/),
		isFF3_6 = isGecko3 && check(/rv:1\.9\.2/),
		isBorderBox = isIE && !isStrict,
		isWindows = check(/windows|win32/),
		isMac = check(/macintosh|mac os x/),
		isAir = check(/adobeair/),
		isLinux = check(/linux/),
		isIPad = check(/ipad/),
		isSecure = /^https/i.test(window.location.protocol);
	
	var isPaddingWideTd = !(isWebKit || isIPad);
	
	return {
		isStrict    : isStrict,
		isOpera     : isOpera,
		isOpera10_5 : isOpera10_5,
		isChrome    : isChrome,
		isWebKit    : isWebKit,
		isSafari    : isSafari,
		isSafari2   : isSafari2,
		isSafari3   : isSafari3,
		isSafari4   : isSafari4,
		isSafari5   : isSafari5,
		isIE        : isIE,
		isIE7       : isIE7,
		isIE8       : isIE8,
		isIE9       : isIE9,
		isIE6       : isIE6,
		isGecko     : isGecko,
		isGecko2    : isGecko2,
		isGecko3    : isGecko3,
		isGecko4    : isGecko4,
		isGecko5    : isGecko5,
		isFF3_0     : isFF3_0,
		isFF3_5     : isFF3_5,
		isFF3_6     : isFF3_6,
		isBorderBox : isBorderBox,
		isWindows   : isWindows,
		isMac       : isMac,
		isAir       : isAir,
		isLinux     : isLinux,
		isIPad      : isIPad,
		isSecure    : isSecure,
		
		isPaddingWideTd    : isPaddingWideTd
	};
})();
;
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

/**
 * @class
 *
 * View synchronizer. Synchronizes DOM element children with the source array. Usually used in conjunction with
 * JW.AbstractArray.Mapper.
 *
 *     var data = new JW.ObservableArray(["apple", "banana", "cherry"]);
 *     var elements = data.{@link JW.ObservableArray#createMapper createMapper}({
 *         {@link JW.ObservableArray.Mapper#cfg-createItem createItem}: function(value) { return jQuery('<option />').text(value)[0]; }
 *     }).{@link JW.ObservableArray.Mapper#property-target target};
 *     var inserter = new JW.UI.Inserter(elements, document.getElementById("myselect"));
 *
 * @extends JW.Class
 *
 * @constructor
 * Creates synchronizer.
 * @param {JW.AbstractArray} source `<DOMElement>` Source array.
 * @param {DOMElement} el Parent element.
 */
JW.UI.Inserter = function(source, el) {
	JW.UI.Inserter._super.call(this);
	this.el = el; // DOMElement
	this.own(source.createInserter({
		addItem    : this._addItem,
		removeItem : this._removeItem,
		scope      : this
	}));
};

JW.extend(JW.UI.Inserter, JW.Class, {
	_getElement: function(item) {
		return item;
	},
	
	_addItem: function(item, index) {
		var parent = this.el;
		var anchor = parent.childNodes[index];
		var child = this._getElement(item);
		if (anchor != null) {
			parent.insertBefore(child, anchor);
		} else {
			parent.appendChild(child);
		}
	},
	
	_removeItem: function(item) {
		JW.UI.remove(this._getElement(item));
	}
});
;
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

/**
 * @class JW.UI.Component
 *
 * Base class of UI component.
 *
 * Features:
 *
 * - Rendering by HTML template
 * - Direct access to component elements
 * - [jQuery-interface](http://api.jquery.com/) for element manipulations
 * - Convenient API for child component management
 *
 * jWidget has very simple interface, but pretty unusual philosophy, which guarantees Model-View architecture
 * following without a lot of effort. Let's start with examples.
 *
 * ### jWidget UI-component example
 *
 *     // Define namespace
 *     var MyApp = {};
 *
 *     // Define component constructor
 *     MyApp.Component = function(message, link) {
 *         MyApp.Component.{@link JW.Class#static-property-_super _super}.call(this);
 *         this.message = message;
 *         this.link = link;
 *     };
 *
 *     // Inherit from JW.UI.Component
 *     JW.extend(MyApp.Component, JW.UI.Component, {
 *         // String message;
 *         // String link;
 *
 *         // override
 *         {@link #afterRender afterRender}: function() {
 *             this.{@link JW.Class#method-_super _super}();
 *             this.{@link #getElement getElement}("hello-message").text(this.message);
 *             this.{@link #getElement getElement}("link").attr("href", this.link);
 *         }
 *     });
 *
 *     JW.UI.template(MyApp.Component, {
 *         main:
 *             '<div jwclass="myapp-component">' +
 *                 '<div jwid="hello-message"></div>' +
 *                 '<a href="#" jwid="link">Click me!</a>' +
 *             '</div>'
 *     });
 *
 * Let's learn, how HTML-template works. Each component has main template, which is passed into
 * JW.UI.template function with name `main` and defaults to
 * <code>&lt;div&gt;&lt;/div&gt;</code>. You can add other templates as well, they'll be available in component's field
 * <code>{@link #templates this.templates}.&lt;template_name&gt;</code> (but they are not used usually).
 * Subclass inherits superclass templates.
 *
 * Take a note at special attributes `jwclass` and `jwid`. `jwclass` is root CSS-class of component,
 * `jwid` is a suffix to `jwclass` in this element. So, next HTML fragment will be rendered in result
 * of this component rendering:
 *
 *     <div class="myapp-component">
 *         <div class="myapp-component-hello-message"></div>
 *         <a href="#" class="myapp-component-link">Click me!</a>
 *     </div>
 *
 * You can retrieve an element by its `jwid` using method #getElement. Result of this method is
 * a [jQuery-wrapper](http://api.jquery.com/) over this element. Root element always has jwid "root".
 * In addition, root element of the component is stored in #el property.
 *
 * ### Component creation in code
 *
 * Component can be created by simple construction of component object. After that, you can use method #renderTo
 * or #renderAs in order to insert this component into DOM.
 *
 *     var component;
 *
 *     jQuery(function() {
 *         component = new MyApp.Component("Hello world!", "http://google.com");
 *         component.{@link #renderTo renderTo}("body");
 *     });
 *
 * ### Child components
 *
 * There are 5 ways to add a child component:
 *
 * - Add a child component into #children map with a key equal to `jwid` of element to replace with the child
 * component. Usually it is done in #afterRender method.
 * - Add an easily replaceable child component using #addReplaceable method. Pass JW.Property there and
 * the framework will provide the continuous synchronization with this property during application running.
 * - Add an array of child components into some element using #addArray method. If the passed array
 * is JW.ObservableArray, then framework will provide the continuous synchronization with this array during
 * application running.
 * - Add a collection of child components into some element using #addCollection method. As opposed to #addArray
 * method, #addCollection doesn't keep the child component order. A newly added component is always appended to the
 * end. If the passed collection is observable, then framework will provide the continuous synchronization with this
 * collection during application running.
 * - Define method <code>render&lt;ChildId&gt;</code>, where <code>&lt;ChildId&gt;</code> is `jwid` of element,
 * written in CamelCase with capitalized first letter. Example: `renderArticle` (renders element `jwid="article"`).
 * If the method returns JW.UI.Component, JW.Property or JW.AbstractCollection, then result will be treated as child component
 * or child component collection. Define method `renderRoot` to render root element, but you can return JW.AbstractCollection
 * only there.
 * See **More about render&lt;ChildId&gt; method** paragraph for details.
 *
 * Such interface provides simplicity, at one hand, and flexibility in Model-View architecture following regard,
 * at another hand.
 *
 * [Getting started. Part 1. Model and view](#!/guide/ensample1)
 *
 * ### More about child component collections
 *
 * It is convenient to use JW.AbstractCollection#$$mapObjects method to convert data collections into UI component collections.
 * Thanks to it, view will be updated on data update automatically.
 *
 * That's the reason why we recommend to use jWidget collections in data model instead of native JavaScript
 * Array and Object: jWidget collections have observable implementations which can be synchronized to each other.
 *
 * [Getting started. Part 6. Collection synchronizers](#!/guide/ensample6)
 *
 * ### More about render&lt;ChildId&gt; method
 *
 * You can define method `render<ChildId>` for every element in HTML template that has attribute `jwid`.
 * `<ChildId>` equals to this `jwid`, written in CamelCase with capitalized first letter. Method signature:
 *
 * <code>renderChildId(el: [jQuery](http://api.jquery.com/)): Mixed</code>
 *
 * `el` - element with corresponding `jwid`.
 *
 * Depending on the returned result of this method, there are next capabilities:
 *
 * - If method returns JW.UI.Component, then it will be added into #children map and will become a child component.
 * Doesn't work for root element.
 * - If method returns JW.Property, then it will be added as easily replaceable child component by
 * method #addReplaceable. Doesn't work for root element.
 * - If method returns JW.AbstractArray, then it will be added as child array by method #addArray.
 * - If method returns JW.AbstractCollection (which is not JW.AbstractArray), then it will be added as child
 * collection by method #addCollection.
 * - If method returns `false` (===), then element will be removed from component HTML. Doesn't work for root element.
 * - In any other case, framework won't perform any additional action.
 *
 * ### Components removal and destruction
 *
 * You can destroy the component via #destroy method. However you can not destroy a component which is added into
 * another one as a child (framework will throw an exception in this case). You must remove child component from a
 * parent first. To remove the component from a parent, you must perform the operation opposite to adding operation.
 *
 * - If you have added a component to #children object, you must remove it via
 * {@link JW.AbstractMap#method-remove remove} method.
 * - Method #addReplaceable returns an instance of JW.UI.Component.Replaceable. Its destruction removes the
 * replaceable child.
 * - Method #addArray returns an instance of JW.UI.Component.Array. Its destruction removes the array.
 * - Method #addCollection returns an instance of JW.UI.Component.Collection. Its destruction removes the collection.
 *
 * As soon as child component is removed, you can destroy it:
 *
 *     this.{@link JW.UI.Component#children children}.{@link JW.AbstractMap#method-remove remove}("comments").{@link JW.Class#destroy destroy}();
 *
 * Another example:
 *
 *     // should be called not before the rendering initiation
 *     initLabels: function() {
 *         this._labelViews = this.labels.{@link JW.AbstractArray#$$mapObjects $$mapObjects}(function(label) {
 *             return new LabelView(label);
 *         }, this);
 *         // Add labels into element with jwid="labels"
 *         this._labelArray = this.{@link #addArray addArray}(this._labelViews, "labels");
 *     },
 *
 *     clearLabels: function() {
 *         this._labelArray.{@link JW.Class#destroy destroy}();
 *         this._labelArray = null;
 *         this._labelViews.{@link JW.Class#destroy destroy}();
 *         this._labelViews = null;
 *     }
 *
 * You don't need to remove child components explicitly all the time. On parent component destruction, framework
 * automatically removes all the children before {@link #unrender} method call. However, it doesn't destroy them.
 * You can use aggregation method {@link JW.Class#own own} to destroy the child components. So, usually your code will
 * look as simple as this:
 *
 *     renderTitleBox: function() {
 *         return this.{@link JW.Class#own own}(new TitleBox());
 *     },
 *
 *     renderLabels: function() {
 *         return this.{@link JW.Class#own own}(this.labels.{@link JW.AbstractArray#$$mapObjects $$mapObjects}(function(label) {
 *             return new LabelView(label);
 *         }, this));
 *     }
 *
 * ### Common practices of child component management
 *
 * **Create child component**
 *
 * This example describes how to create and destroy a child component with `jwid="title-box"`.
 *
 *     var MyComponent = function() {
 *         MyComponent.{@link JW.Class#static-property-_super _super}.call(this);
 *     };
 *
 *     JW.extend(MyComponent, JW.UI.Component, {
 *         renderTitleBox: function() {
 *             return this.{@link JW.Class#own own}(new TitleBox());
 *         }
 *     });
 *
 *     JW.UI.template(MyComponent, {
 *         main:
 *             '<div jwclass="my-component">' +
 *                 '<div jwid="title-box"></div>' +
 *             '</div>'
 *     });
 *
 * **Create replaceable child component**
 *
 * This example describes how to create an easily replaceable child component with `jwid="document"`.
 * Assume that you have a property "document" and want to replace an old document view with a new one
 * on document change.
 *
 *     var MyComponent = function(document) {
 *         MyComponent.{@link JW.Class#static-property-_super _super}.call(this);
 *         this.document = document;
 *     };
 *
 *     JW.extend(MyComponent, JW.UI.Component, {
 *         // JW.Property<Document> document;
 *
 *         renderDocument: function() {
 *             return this.{@link JW.Class#own own}(this.document.{@link JW.Property#$$mapObject $$mapObject}(function(document) {
 *                 return new DocumentView(document);
 *             }, this));
 *         }
 *     });
 *
 *     JW.UI.template(MyComponent, {
 *         main:
 *             '<div jwclass="my-component">' +
 *                 '<div jwid="document"></div>' +
 *             '</div>'
 *     });
 *
 * **Create child collection**
 *
 * This example describes how to create and destroy child components by data collection, and insert them into
 * element with `jwid="labels"`. If data collection is observable, child collection will be constantly synchronized with data.
 *
 *     var MyComponent = function(labels) {
 *         MyComponent.{@link JW.Class#static-property-_super _super}.call(this);
 *         this.labels = labels;
 *     };
 *
 *     JW.extend(MyComponent, JW.UI.Component, {
 *         // JW.AbstractArray<Label> labels;
 *
 *         renderLabels: function() {
 *             return this.{@link JW.Class#own own}(this.labels.{@link JW.AbstractArray#$$mapObjects $$mapObjects}(function(label) {
 *                 return new LabelView(label);
 *             }, this));
 *         }
 *     });
 *
 *     JW.UI.template(MyComponent, {
 *         main:
 *             '<div jwclass="my-component">' +
 *                 '<div jwid="labels"></div>' +
 *             '</div>'
 *     });
 *
 * **Add existing components as children**
 *
 * This example describes how to insert child components which were created by someone else, and therefore
 * shouldn't be destroyed automatically. Here, "titleBox" can be either JW.UI.Component, or
 * JW.Property<JW.UI.Component>, or JW.AbstractCollection<JW.UI.Component>.
 *
 *     var MyComponent = function(titleBox) {
 *         MyComponent.{@link JW.Class#static-property-_super _super}.call(this);
 *         this.titleBox = titleBox;
 *     };
 *
 *     JW.extend(MyComponent, JW.UI.Component, {
 *         // Mixed titleBox;
 *
 *         renderTitleBox: function() {
 *             return this.titleBox;
 *         }
 *     });
 *
 *     JW.UI.template(MyComponent, {
 *         main:
 *             '<div jwclass="my-component">' +
 *                 '<div jwid="title-box"></div>' +
 *             '</div>'
 *     });
 *
 * ### Component life stages
 *
 * Each component has several stages of life.
 *
 * 1. Like in all other classes, **constructor** is called first. Usually all fields are defined and assigned to
 * their initial values here, events are created etc. Only component model should be touched here, view is completely
 * ignored. Notice that component is not rendered after construction yet, so it doesn't have
 * fields #el and #children, methods #addArray, #addCollection and #addReplaceable won't work.
 * The main reason of that is to give you ability to
 * do something else between component construction and rendering, for example, change some field values and call
 * some methods. Second reason: it is not recommended to call virtual methods in constructor in any object-oriented
 * language. You can render the component directly by calling #render, #renderTo, #renderAs,
 * or by adding this component into another component as a child. For example, component will be rendered immediately
 * after adding into #children map. You can invoke component rendering multiple times, but it will be rendered only
 * on first invokation.
 * 1. Method #beforeRender is called during rendering, after HTML template reading and initialization of all links to
 * this template elements. It is convenient to perform some preliminary action here before child components creation.
 * But you are already able to create child components here. <code>this._super()</code> call is performed at first line
 * of method.
 * 1. All <code>render&lt;ChildId&gt;</code> methods are called for HTML template elements, i.e. child component
 * creation is performed.
 * 1. Method #afterRender is called. You should assign all elements' attributes here, create child components,
 * bind to events and fill component with interactivity. Component rendering is finished here.
 * <code>this._super()</code> call is performed at first line of method.
 * 1. Method #afterAppend is called after first-time component appearing in HTML DOM and UI components tree.
 * Component layouting should be performed here (calculate element sizes).
 * <code>this._super()</code> call is performed at first line of method.
 * 1. Method #releaseDom is called during component destruction. Everything that was performed in #afterAppend method,
 * i.e. on step 5, should be reverted here. <code>this._super()</code> method call is performed at last line of method.
 * 1. Method #unrender is called during component destruction. Everything that was performed during component
 * rendering, i.e. on steps 2-4, should be reverted here. All child components are already removed by framework
 * before this method call, but the components themselves are not destroyed. You must destroy them explicitly unless
 * you used {@link JW.Class#own own} method to aggregate them.
 * <code>this._super()</code> method call is performed at last line of method.
 * 1. Method #afterDestroy is called during component destruction. Everything that was performed in component
 * constructor, i.e. on step 1, should be reverted here. <code>this._super()</code> method call is performed
 * at last line of method.
 *
 * ### Intergration with jWidget SDK
 *
 * jWidget UI library is integrated with [jWidget SDK](https://github.com/enepomnyaschih/jwsdk/wiki/en) perfectly, and
 * it gives you nice code optimizations of JS-code out of the box and capability to extract HTML templates into
 * separate files. For example, you can simplify the very first example by splitting code into 2 files:
 *
 * **component.js**
 *
 *     // Define namespace
 *     var MyApp = {};
 *
 *     // Define component constructor
 *     MyApp.Component = function(message, link) {
 *         MyApp.Component.{@link JW.Class#static-property-_super _super}.call(this);
 *         this.message = message;
 *         this.link = link;
 *     };
 *
 *     // Inherit from JW.UI.Component
 *     JW.extend(MyApp.Component, JW.UI.Component, {
 *         // String message;
 *         // String link;
 *
 *         // override
 *         {@link #afterRender afterRender}: function() {
 *             this.{@link JW.Class#method-_super _super}();
 *             this.{@link #getElement getElement}("hello-message").text(this.message);
 *             this.{@link #getElement getElement}("link").attr("href", this.link);
 *         }
 *     });
 *
 * **component.jw.html**
 *
 *     <div jwclass="myapp-component">
 *         <div jwid="hello-message"></div>
 *         <a href="#" jwid="link">Click me!</a>
 *     </div>
 *
 * To make this work, you just need to register the next resources in corresponding jWidget SDK package:
 *
 *     {
 *         "resources" : [
 *             "component.js",
 *             "component.jw.html : MyApp.Component",
 *             ...
 *         ]
 *     }
 *
 * Sure, you can use jWidget even without jWidget SDK, but in this case you'll need to either load HTML templates
 * dinamically or define them explicitly right in JavaScript code using JW.UI.template function.
 *
 * See more complicated example in article:
 *
 * [Getting started. Part 7. Project infrastructure](#!/guide/ensample7)
 *
 * ### Clear-div persistence
 *
 * As of jWidget 1.4, you may render child collections to non-blank DOM elements. In this case, all existing nodes
 * stay at the end of the element. The most common application of this feature
 * is <a href="https://css-tricks.com/the-how-and-why-of-clearing-floats/" target="_blank">clear-div usage</a>.
 *
 * <iframe style="border: 1px solid green; padding: 10px;" width="600" height="260" src="http://enepomnyaschih.github.io/mt/1.4/jwui-clear-div.html"></iframe>
 *
 * @extends JW.Class
 * @constructor
 */
JW.UI.Component = function() {
	JW.UI.Component._super.call(this);
	this.parent = null;
	this.wasAfterAppend = false;
	this.el = null;
	this.children = null;
	this._template = this.templates.main;
	this._elements = null; // Map<jQuery>
	this._replaceables = null; // Set<JW.UI.Component.Replaceable>
	this._arrays = null; // Set<JW.UI.Component.Array>
	this._collections = null; // Set<JW.UI.Component.Collection>
},

JW.extend(JW.UI.Component, JW.Class, {
	/**
	 * @property {boolean} wasAfterAppend Was #afterAppend called?
	 */
	/**
	 * @property {Object} templates `<JW.UI.Component.Template>` Map from template ID to the template. Templates are defined by JW.UI.template method.
	 */
	/**
	 * @property {JW.UI.Component} parent Parent component. Field is available from component rendering beginning.
	 */
	/**
	 * @property {jQuery} el Root element. Field is available from component rendering beginning.
	 */
	/**
	 * @property {JW.AbstractMap} children
	 * `<JW.UI.Component>` (mutable) Named child components. Use this map to add child components in place of
	 * elements with corresponding `jwid`. Field is available from component rendering beginning.
	 */

	destroy: function() {
		if (this.parent) {
			throw new Error("JW.UI.Component.destroy must be used for root and detached components only");
		}
		if (this.wasAfterAppend) {
			this.releaseDom();
		}
		if (this.el) {
			JW.UI.remove(this.el[0]);
			JW.Set.each(this._collections, JW.destroy);
			this._collections = null;
			JW.Set.each(this._arrays, JW.destroy);
			this._arrays = null;
			JW.Set.each(this._replaceables, JW.destroy);
			this._replaceables = null;
			this.children.unrender();
		}
		this._super();
	},

	destroyObject: function() {
		if (this.el) {
			this.unrender();

			this.children.destroy();
			this.children = null;
			this.el.remove();
		}
		this._elements = null;
		this.el = null;
		this.afterDestroy();
		this._super();
	},

	/**
	 * Component life stage method. Called during component rendering after HTML template parsing and initialization
	 * of references to all elements of the template. Called before `render<ChildId>` methods and
	 * {@link #afterRender} method. It is convenient to perform some preliminary action here before child
	 * components creation. But you are already able to create child components here. <code>this._super()</code>
	 * call is performed at first line of method.
	 *
	 * @returns {void}
	 */
	beforeRender: function() {},

	/**
	 * Component life stage method. Called after #beforeRender method and `render<ChildId>` methods.
	 * You should assign all elements' attributes here, create child components,
	 * bind to events and fill component with interactivity. <code>this._super()</code> call is performed at
	 * first line of method.
	 *
	 * @returns {void}
	 */
	afterRender: function() {},

	/**
	 * Component life stage method. Called after first-time component appearing in HTML DOM and UI components tree.
	 * Component layouting should be performed here (calculate element sizes).
	 * Component rendering is finished here. <code>this._super()</code> call is performed at first line of method.
	 *
	 * @returns {void}
	 */
	afterAppend: function() {},

	/**
	 * Component life stage method. Called during component destruction before {@link #unrender} method call.
	 * Everything that was performed in #afterAppend method should be reverted here.
	 *
	 * @returns {void}
	 */
	releaseDom: function() {},

	/**
	 * Component life stage method. Called during component destruction before {@link #afterDestroy} method call.
	 * Everything that was performed during component
	 * rendering should be reverted here. All child component arrays are already removed by framework
	 * before this method call, but the components themselves are not destroyed. You must destroy them explicitly.
	 * Unlike arrays, named child component will be destroyed automatically after #unrender method, so you must
	 * remove them from #children map if you want to keep them alive. <code>this._super()</code> method call is performed
	 * at last line of method.
	 *
	 * @returns {void}
	 */
	unrender: function() {},

	/**
	 * Component life stage method. Called during component destruction after {@link #unrender} method call.
	 * Everything that was performed during component construction should be reverted here.
	 * <code>this._super()</code> method call is performed at last line of method.
	 *
	 * @returns {void}
	 */
	afterDestroy: function() {},

	/**
	 * Selects component rendering strategy. By default, component is rendered outside of DOM based on `main` HTML
	 * template specified by JW.UI.template method. You can change this by passing one of the next values
	 * into #using method of the component:
	 *
	 * - JW.UI.Component.Template or String - use this template explicitly for rendering
	 * - DOMElement or jQuery - build component on top of existing DOM element. Special attributes `jwclass` and `jwid`
	 * will be processed the usual way
	 *
	 * **Disclaimer:** We strongly encourage you to use standard rendering strategy via JW.UI.template, or at least
	 * create JW.UI.Component.Template instances to store your HTML templates. They work 3 times faster compared to
	 * raw HTML rendering thanks to preliminary compilation and node cloning method.
	 *
	 * @param {Object} value Template or element to use for component rendering.
	 * @returns {JW.UI.Component} this
	 */
	using: function(value) {
		this._template =
			(typeof value === "string") ? new JW.UI.Component.Template(value) :
			(value instanceof JW.UI.Component.Template) ? value : new JW.UI.Component.DomTemplate(value);
		return this;
	},

	/**
	 * Renders component. Call this method to initialize references to all elements of component and create
	 * child components. This method is called automatically in next cases:
	 *
	 * - One of methods #renderTo, #renderAs is called
	 * - The component is added into another component as a child
	 *
	 * Feel free to call component rendering multiple times: it will be rendered only once.
	 *
	 * @returns {JW.UI.Component} this
	 */
	render: function() {
		if (this.el) {
			return this;
		}
		var output = this._template.createElement();
		this.el = jQuery(output.root);
		this._elements = JW.Map.map(output.groups, jQuery);
		this.children = new JW.UI.Component.Children(this);
		this._replaceables = {};
		this._arrays = {};
		this._collections = {};
		this.beforeRender();
		var elements = JW.apply({}, this._elements);
		for (var jwId in elements) {
			var element = elements[jwId];
			var aliveElements = JW.Array.filter(element, function(el) {
				return JW.UI.inEl(el, this.el[0]);
			}, this);
			if (aliveElements.length === 0) {
				delete this._elements[jwId];
				continue;
			}
			if (aliveElements.length !== element.length) {
				element = jQuery(aliveElements);
				this._elements[jwId] = element;
			}
			var jwIdCamel = JW.String.camel(jwId);
			var renderMethodName = "render" + JW.String.capitalize(jwIdCamel);
			if (typeof this[renderMethodName] === "function") {
				var result = this[renderMethodName](element);
				if (jwId === "root") {
					if (result instanceof JW.AbstractArray) {
						this.addArray(result, jwId);
					} else if (result instanceof JW.AbstractCollection) {
						this.addCollection(result, jwId);
					}
				} else {
					if (result instanceof JW.UI.Component) {
						this.children.set(result, jwId);
					} else if (result instanceof JW.Property) {
						this.addReplaceable(result, jwId);
					} else if (result instanceof JW.AbstractArray) {
						this.addArray(result, jwId);
					} else if (result instanceof JW.AbstractCollection) {
						this.addCollection(result, jwId);
					} else if (result === false) {
						this.removeElement(jwId);
					}
				}
			}
		}
		this.afterRender();
		if (this._template.requiresAfterAppend) {
			this._afterAppend();
		}
		return this;
	},

	/**
	 * Render component into specified element. Use it to render root component only: its children must be rendered
	 * using #children or #addArray stuff.
	 *
	 * @param {jQuery} [el] Element to render into.
	 * @returns {JW.UI.Component} this
	 */
	renderTo: function(el) {
		this.render();
		jQuery(el)[0].appendChild(this.el[0]);
		this._afterAppend();
		return this;
	},

	/**
	 * Render component in place of specified element. Use it to render root component only: its children must be rendered
	 * using #children or #addArray stuff.
	 *
	 * @param {jQuery} [el] Element to render in place of.
	 * @returns {JW.UI.Component} this
	 */
	renderAs: function(el) {
		this.render();
		JW.UI.replace(jQuery(el)[0], this.el[0], true);
		this._afterAppend();
		return this;
	},

	/**
	 * Remove component from DOM. Can be used for root component only (which was added via #renderTo or #renderAs
	 * method. All child components should be removed using #children or JW.UI.Component.Array stuff.
	 *
	 * @returns {JW.UI.Component} this
	 */
	remove: function() {
		if (this.parent) {
			throw new Error("JW.UI.Component.remove must be used for root components only");
		}
		JW.UI.remove(this.el[0]);
		return this;
	},

	/**
	 * Get element by its `jwid`.
	 * @param {string} jwid
	 * @returns {jQuery} Element.
	 */
	getElement: function(id) {
		return this._elements[id];
	},

	/**
	 * Remove element by `jwid`. Element will be removed from DOM and it will be impossible to get it
	 * by #getElement method.
	 * @param {string} jwid
	 * @returns {void}
	 */
	removeElement: function(id) {
		var el = this._elements[id];
		if (!el) {
			return;
		}
		el.remove();
		delete this._elements[id];
	},

	/**
	 * Add an easily replaceable child component into specified element.
	 *
	 * Pass an instance of JW.Property<JW.UI.Component>, and view will be synchronized with this property of fly.
	 *
	 * It is convenient to create "component" property from data property using JW.Property#$$mapObject method.
	 *
	 * Method returns an instance of JW.UI.Component.Replaceable. This object is purposed for replaceable child
	 * removal from parent component. Use {@link JW.Class#destroy destroy} method to do this.
	 * Also, the replaceable will be removed from parent component on parent component destruction right
	 * before #unrender method call.
	 * But notice that child component inside this property won't be destroyed automatically.
	 * Usually it can be done by corresponding JW.Mapper or property destruction in #unrender method.
	 *
	 * @param {JW.Property} component `<JW.UI.Component>` Child component property.
	 * @param {String} id jwId of element to replace.
	 * @returns {JW.UI.Component.Replaceable} Replaceable child component wrapper.
	 */
	addReplaceable: function(component, id) {
		return new JW.UI.Component.Replaceable(this, component, id);
	},

	/**
	 * Add child component array into specified element. As opposed to #addCollection method, keeps
	 * component order. However, it works slower and accepts array only.
	 *
	 * Based on JW.UI.Inserter synchronizer. Thanks to that, if you'll pass an instance of
	 * JW.ObservableArray as "components", then view will be synchronized with this array content of fly.
	 *
	 * It is convenient to create "components" array from data array using JW.AbstractArray#$$mapObjects method,
	 * i.e. by JW.AbstractCollection.Mapper instantiation.
	 *
	 * Method returns an instance of JW.UI.Component.Array. This object is purposed for child component array
	 * removal from parent component. Use {@link JW.Class#destroy destroy} method to do this.
	 * Also, the array will be removed from parent component on parent component destruction right
	 * before #unrender method call.
	 * But notice that child components inside this array won't be destroyed automatically.
	 * Usually it can be done by corresponding JW.AbstractCollection.Mapper or array destruction in #unrender method.
	 *
	 * @param {JW.AbstractArray} components Child component array.
	 * @param {jQuery/string} [el]
	 * Element to add child components into, or its `jwid`.
	 * Defaults to root element (#el) of component.
	 * @returns {JW.UI.Component.Array} Child component array wrapper.
	 */
	addArray: function(source, el) {
		return new JW.UI.Component.Array(this, source, this._getContainerElement(el));
	},

	/**
	 * Add child component collection into specified element. As opposed to #addArray method, ignores
	 * component order. However, it works faster and accepts any kind of collection, not array only.
	 *
	 * If you'll pass an instance of JW.ObservableCollection as "components",
	 * then view will be synchronized with this collection content of fly.
	 *
	 * It is convenient to create "components" collection from data collection using
	 * JW.AbstractCollection#$$mapObjects method, i.e. by JW.AbstractCollection.Mapper instantiation.
	 *
	 * Method returns an instance of JW.UI.Component.Collection. This object is purposed for child component
	 * collection removal from parent component. Use {@link JW.Class#destroy destroy} method to do this.
	 * Also, the collection will be removed from parent component on parent component destruction right
	 * before #unrender method call.
	 * But notice that child components inside this collection won't be destroyed automatically.
	 * Usually it can be done by corresponding JW.AbstractCollection.Mapper or collection destruction in #unrender method.
	 *
	 * @param {JW.AbstractCollection} components Child component collection.
	 * @param {jQuery/string} [el]
	 * Element to add child components into, or its `jwid`.
	 * Defaults to root element (#el) of component.
	 * @returns {JW.UI.Component.Collection} Child component collection wrapper.
	 */
	addCollection: function(source, el) {
		return new JW.UI.Component.Collection(this, source, this._getContainerElement(el));
	},

	_afterAppend: function() {
		if (this.wasAfterAppend || !this.el) {
			return;
		}
		if (this.parent && !this.parent.wasAfterAppend) {
			return;
		}
		if (!this.parent && !JW.UI.inDom(this.el[0])) {
			return;
		}
		this.wasAfterAppend = true;
		this.afterAppend();
		this.children.each(JW.UI._afterAppend);
		JW.Set.each(this._arrays, JW.UI._afterAppend);
		JW.Set.each(this._collections, JW.UI._afterAppend);
	},

	_initChild: function(component) {
		component.render();
		component.parent = this;
	},

	_doneChild: function(component) {
		component.parent = null;
	},

	_getContainerElement: function(el) {
		return (el === undefined) ? this.el :
			(typeof el === "string") ? this._elements[el] : jQuery(el);
	}
});

JW.UI.Component.EventParams = function(sender) {
	JW.UI.Component.EventParams._super.call(this, sender);
};

JW.extend(JW.UI.Component.EventParams, JW.EventParams, {
	/*
	Fields
	JW.UI.Component sender;
	*/
});
;
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
			// some ID's may not have been backtraced if they are assigned to the root element,
			// so we must backtrace them to make sure that everything is processed
			JW.Array.each(remainingIds, this._backtrace, this);
			remainingIds = JW.Map.getKeys(this.parentIdMap);
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
;
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

/**
 * @class
 *
 * Child component array wrapper in JW.UI.Component.
 *
 * Returned by JW.UI.Component#addArray method. If you'll destroy this object, child components will be removed
 * from parent.
 *
 * @extends JW.Class
 */
JW.UI.Component.Array = function(parent, source, el) {
	JW.UI.Component.Array._super.call(this);
	this.parent = parent;
	this.source = source;
	JW.Set.add(parent._arrays, this);

	this._mapper = source.createMapper({
		createItem  : function(child) { this.parent._initChild(child); return child; },
		destroyItem : function(child) { this.parent._doneChild(child); },
		scope       : this
	});

	this._inserter = new JW.UI.Component.Inserter(this._mapper.target, el[0]);
};

JW.extend(JW.UI.Component.Array, JW.Class, {
	// JW.UI.Component parent;
	// JW.AbstractArray<JW.UI.Component> source;

	// override
	destroyObject: function() {
		this._inserter.destroy();
		this._inserter = null;
		this._mapper.destroy();
		this._mapper = null;
		JW.Set.remove(this.parent._arrays, this);
		this._super();
	},

	_afterAppend: function() {
		this.source.each(JW.UI._afterAppend);
	}
});
;
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

JW.UI.Component.Child = function(parent, child) {
	JW.UI.Component.Child._super.call(this);
	this.parent = parent; // JW.UI.Component
	this.child = child; // JW.UI.Component
	this.name = null; // String
	this._el = null; // jQuery
};

JW.extend(JW.UI.Component.Child, JW.Class, {
	attach: function(name) {
		// JW.assertNull(this.name);
		this.name = name;
		this._el = this.parent._elements[name];
		this.parent._initChild(this.child);
		this.parent._elements[name] = this.child.el;
		JW.UI.replace(this._el[0], this.child.el[0], true);
		this.child._afterAppend();
	},
	
	detach: function() {
		// JW.assertString(this.name, JW.isNotBlank);
		if (this.parent._elements[this.name] === this.child.el) {
			this.parent._elements[this.name] = this._el;
		}
		JW.UI.replace(this.child.el[0], this._el[0]);
		this.parent._doneChild(this.child);
		this._el = null;
		this.name = null;
	}
});
;
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

JW.UI.Component.ChildInserter = function() {
	JW.UI.Component.ChildInserter._super.call(this);
};

JW.extend(JW.UI.Component.ChildInserter, JW.AbstractMap, {
	// override
	trySet: function(item, key) {
		var result = this._super(item, key);
		if (result === undefined) {
			return;
		}
		var removedItem = result.get();
		if (removedItem) {
			removedItem.detach();
		}
		item.attach(key);
		return result;
	},

	// override
	setAll: function(items) {
		this.trySetAll(items);
	},

	// override
	trySetKey: function(oldKey, newKey) {
		var item = this._super(oldKey, newKey);
		if (item === undefined) {
			return;
		}
		item.detach();
		item.attach(newKey);
		return item;
	},

	// override
	tryRemove: function(key) {
		var item = this._super(key);
		if (item === undefined) {
			return;
		}
		item.detach();
		return item;
	},

	// override
	removeAll: function(keys) {
		this.tryRemoveAll(keys);
	},

	// override
	trySplice: function(removedKeys, updatedItems) {
		var spliceResult = this._super(removedKeys, updatedItems);
		if (spliceResult === undefined) {
			return;
		}
		JW.Map.each(spliceResult.removedItems, this._detach, this);
		JW.Map.each(spliceResult.addedItems, this._attach, this);
		return spliceResult;
	},

	// override
	tryClear: function() {
		var items = this._super();
		if (items === undefined) {
			return;
		}
		JW.Map.each(items, this._detach, this);
		return items;
	},

	// override
	tryReindex: function(keyMap) {
		var result = this._super(keyMap);
		if (result === undefined) {
			return;
		}
		for (var oldKey in keyMap) {
			var newKey = keyMap[oldKey];
			var item = this.get(newKey);
			item.detach();
			item.attach(newKey);
		}
		return result;
	},

	_attach: function(item, key) {
		item.attach(key);
	},

	_detach: function(item) {
		item.detach();
	}
});
;
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

JW.UI.Component.Children = function(component) {
	JW.UI.Component.Children._super.call(this);
	this.component = component; // JW.UI.Component
	this.target = new JW.UI.Component.ChildInserter();
};

JW.extend(JW.UI.Component.Children, JW.AbstractMap, {
	unrender: function() {
		this.target.destroy();
	},

	// override
	trySet: function(item, key) {
		var result = this._super(item, key);
		if (result === undefined) {
			return;
		}
		var child = new JW.UI.Component.Child(this.component, item);
		this.target.trySet(child, key);
		return result;
	},

	// override
	setAll: function(items) {
		this.trySetAll(items);
	},

	// override
	trySetKey: function(oldKey, newKey) {
		var item = this._super(oldKey, newKey);
		if (item === undefined) {
			return;
		}
		this.target.trySetKey(oldKey, newKey);
		return item;
	},

	// override
	tryRemove: function(key) {
		var item = this._super(key);
		if (item === undefined) {
			return;
		}
		this.target.tryRemove(key);
		return item;
	},

	// override
	removeAll: function(keys) {
		this.tryRemoveAll(keys);
	},
	
	// override
	trySplice: function(removedKeys, updatedItems) {
		var spliceResult = this._super(removedKeys, updatedItems);
		if (spliceResult === undefined) {
			return;
		}
		var removedItems = spliceResult.removedItems;
		var addedItems = spliceResult.addedItems;
		var children = JW.Map.map(addedItems, function(item) {
			return new JW.UI.Component.Child(this.component, item);
		}, this);
		var targetResult = this.target.trySplice(JW.Map.getRemovedKeys(removedItems, addedItems), children);
		return spliceResult;
	},
	
	// override
	tryClear: function() {
		var items = this._super();
		if (items === undefined) {
			return;
		}
		this.target.tryClear();
		return items;
	},
	
	// override
	tryReindex: function(keyMap) {
		var result = this._super(keyMap);
		if (result === undefined) {
			return;
		}
		this.target.tryReindex(keyMap);
		return result;
	}
});
;
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

/**
 * @class
 *
 * Child component collection wrapper in JW.UI.Component.
 *
 * Returned by JW.UI.Component#addCollection method. If you'll destroy this object, child components will be removed
 * from parent.
 *
 * @extends JW.Class
 */
JW.UI.Component.Collection = function(parent, source, el) {
	JW.UI.Component.Collection._super.call(this);
	this.parent = parent;
	this.source = source;
	JW.Set.add(parent._collections, this);

	this._mapper = source.createMapper({
		createItem  : function(child) { this.parent._initChild(child); return child; },
		destroyItem : function(child) { this.parent._doneChild(child); },
		scope       : this
	});

	this._inserter = new JW.UI.Component.CollectionInserter(this._mapper.target, el[0]);
};

JW.extend(JW.UI.Component.Collection, JW.Class, {
	// JW.UI.Component parent;
	// JW.AbstractCollection<JW.UI.Component> source;

	// override
	destroyObject: function() {
		this._inserter.destroy();
		this._inserter = null;
		this._mapper.destroy();
		this._mapper = null;
		JW.Set.remove(this.parent._collections, this);
		this._super();
	},

	_afterAppend: function() {
		this.source.each(JW.UI._afterAppend);
	}
});
;
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

JW.UI.Component.CollectionInserter = function(source, el) {
	JW.UI.Component.CollectionInserter._super.call(this);
	this.el = el; // DOMElement
	this.len = 0; // Number
	this.own(source.createObserver({
		addItem: this._addItem,
		removeItem: this._removeItem,
		scope: this
	}));
};

JW.extend(JW.UI.Component.CollectionInserter, JW.Class, {
	_addItem: function(item) {
		var parent = this.el;
		var anchor = parent.childNodes[this.len];
		var child = item.el[0];
		if (anchor != null) {
			parent.insertBefore(child, anchor);
		} else {
			parent.appendChild(child);
		}
		++this.len;
		item._afterAppend();
	},

	_removeItem: function(item) {
		JW.UI.remove(item.el[0]);
		--this.len;
	}
});
;
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

JW.UI.Component.DomTemplate = function(el) {
	JW.UI.Component.DomTemplate._super.call(this);
	this.el = jQuery(el)[0];
	this.output = null; // JW.UI.Component.TemplateOutput
};

JW.extend(JW.UI.Component.DomTemplate, JW.UI.Component.AbstractTemplate, {
	requiresAfterAppend: true,
	
	createElement: function() {
		if (this.output !== null) {
			return this.output;
		}
		this.groups = {};
		this._compileAttributes(this.el);
		var orderedGroups = {};
		for (var i = 0, l = this.ids.length; i < l; ++i) {
			var id = this.ids[i];
			orderedGroups[id] = this.groups[id];
		}
		this.output = new JW.UI.Component.TemplateOutput(this.el, orderedGroups);
		return this.output;
	},
	
	_addElement: function(id, el, path) {
		this.groups[id] = this.groups[id] || [];
		this.groups[id].push(el);
	}
});
;
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

JW.UI.Component.Inserter = function(source, el) {
	JW.UI.Component.Inserter._super.call(this, source, el);
};

JW.extend(JW.UI.Component.Inserter, JW.UI.Inserter, {
	_getElement: function(item) {
		return item.el[0];
	},
	
	_addItem: function(item, index) {
		this._super(item, index);
		item._afterAppend();
	}
});
;
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

/**
 * @class
 *
 * Replaceable child component wrapper in JW.UI.Component.
 * 
 * Returned by JW.UI.Component#addReplaceable method. If you'll destroy this object, replaceables child component
 * will be removed from parent and element will return to its original state.
 *
 * @extends JW.Class
 */
JW.UI.Component.Replaceable = function(parent, component, id) {
	JW.UI.Component.Replaceable._super.call(this);
	this.parent = parent;
	this.id = id;
	JW.Set.add(parent._replaceables, this);
	
	this._switcher = new JW.Switcher([component], {
		init: function(child) {
			this.parent.children.set(child, this.id);
		},
		done: function() {
			this.parent.children.remove(this.id);
		},
		scope: this
	});
};

JW.extend(JW.UI.Component.Replaceable, JW.Class, {
	// JW.UI.Component parent;
	
	// override
	destroyObject: function() {
		this._switcher.destroy();
		this._switcher = null;
		JW.Set.remove(this.parent._replaceables, this);
		this._super();
	}
});
;
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

/**
 * @class JW.UI.Component.Template
 * 
 * HTML template. This class compiles the input template only once, and uses element cloning further on to
 * optimize rendering performance.
 * 
 * @extends JW.Class
 * @constructor
 * @param {String} html Input HTML.
 */
JW.UI.Component.Template = function(html) {
	JW.UI.Component.Template._super.call(this);
	this.html = html; // String
	this.mirror = null; // DOMElement
	this.groups = null; // Map<String, Array<Array<int>>>
};

JW.extend(JW.UI.Component.Template, JW.UI.Component.AbstractTemplate, {
	requiresAfterAppend: false,
	
	/**
	 * Render the template.
	 * @returns {JW.UI.Component.TemplateOutput} Template rendering output.
	 */
	createElement: function() {
		this._compile();
		var root = this.mirror.cloneNode(true);
		var groups = {};
		for (var index = 0, count = this.ids.length; index < count; ++index) {
			var id = this.ids[index];
			var paths = this.groups[id];
			var groupSize = paths.length;
			var group = new Array(groupSize);
			for (var i = 0; i < groupSize; ++i) {
				var path = paths[i];
				var el = root;
				for (var j = 0, n = path.length; j < n; ++j) {
					el = el.childNodes[path[j]];
				}
				group[i] = el;
			}
			groups[id] = group;
		}
		return new JW.UI.Component.TemplateOutput(root, groups);
	},
	
	_compile: function() {
		if (this.mirror !== null) {
			return;
		}
		this.mirror = JW.UI.parseHtml(this.html);
		this.groups = {};
		this._compileAttributes(this.mirror);
	},
	
	_addElement: function(id, el, path) {
		this.groups[id] = this.groups[id] || [];
		this.groups[id].push(path.concat());
	}
});

JW.UI.template(JW.UI.Component, {
	main: '<div></div>'
});
;
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

/**
 * @class JW.UI.Component.TemplateOutput
 * 
 * Result of JW.UI.Component.Template#createElement method. HTML template rendering output.
 * 
 * @extends JW.Class
 * @constructor
 * @param {DOMElement} root The rendered element.
 * @param {Object} groups `<Array<DOMElement>>` Map from jwid to the elements with this jwid.
 */
JW.UI.Component.TemplateOutput = function(root, groups) {
	JW.UI.Component.TemplateOutput._super.call(this);
	this.root = root;
	this.groups = groups;
};

JW.extend(JW.UI.Component.TemplateOutput, JW.Class, {
	/**
	 * @property {DOMElement} root The rendered element.
	 */
	/**
	 * @property {Object} groups `<Array<DOMElement>>` Map from jwid to the elements with this jwid.
	 */
});
;
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

/**
 * @class
 *
 * Current page hash (without leading "#"). Available as JW.UI.hash.
 *
 * @extends JW.Property
 */
JW.UI.Hash = function() {
	JW.UI.Hash._super.call(this, location.hash.substr(1));
	jQuery(window).jwon("hashchange", function() {
		JW.UI.hash.set(location.hash.substr(1));
	}, this);
};

JW.extend(JW.UI.Hash, JW.Property, {
	/**
	 * Changes window hash and triggers event #changeEvent.
	 * @param {String} value New hash value.
	 * @param {boolean} [replaceState] Replaces current history entry rather than creating a new one.
	 */
	set: function(value, replaceState) {
		value = value || "";
		var oldValue = this._value;
		if (oldValue === value) {
			return;
		}
		this._value = value;
		if (replaceState && window.history && history.replaceState) {
			history.replaceState(null, "", location.pathname + "#" + value);
		} else {
			location.hash = "#" + value;
		}
		this.changeEvent.trigger(new JW.ValueChangeEventParams(this, value, oldValue));
	}
});

JW.UI.hash = new JW.UI.Hash();
;
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

JW.UI.Params = {};

(function() {
	if (!location.search.length)
		return;
	
	var params = location.search.substr(1).split("&");
	for (var i = 0; i < params.length; ++i)
	{
		var tokens = params[i].split("=");
		if (tokens.length != 2)
			continue;
		
		JW.UI.Params[tokens[0]] = decodeURIComponent(tokens[1]).replace(/\+/g, " ");
	}
})();;
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

JW.UI.preloadImage = function(
	src,      // [required] String
	callback, // [optional] Function(image), image is undefined if error
	scope)    // [optional] Object
{
	var image = new Image();
	jQuery(image).
		load(function() {
			if (typeof callback === "function")
				callback.call(scope, image);
		}).
		error(function() {
			if (typeof callback === "function")
				callback.call(scope);
		}).
		attr("src", src);
}
;
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

/**
 * @class
 *
 * Result of {@link jQuery#jwattr jwattr} method call. Destroy it to stop synchronization.
 *
 * Was used as a standalone class before jWidget 1.4.
 * As of jWidget 1.4, {@link jQuery#jwattr jwattr} is an easier alternative.
 *
 * @extends JW.Class
 *
 * @constructor
 * @param {jQuery} el DOM element.
 * @param {String} attr Element's attribute name.
 * @param {JW.Property} property `<String>` Source property.
 */
JW.UI.AttrUpdater = function(el, attr, property) {
	JW.UI.AttrUpdater._super.call(this);
	this.el = jQuery(el);
	this.attr = attr;
	this.property = property;
	this._update();
	this.own(property.changeEvent.bind(this._update, this));
};

JW.extend(JW.UI.AttrUpdater, JW.Class, {
	/**
	 * @property {jQuery} el DOM element.
	 */
	/**
	 * @property {String} attr Element's attribute name.
	 */
	/**
	 * @property {JW.Property} property `<String>` Source property.
	 */

	destroyObject: function() {
		this.el = null;
		this.property = null;
		this._super();
	},
	
	_update: function() {
		this.el.attr(this.attr, this.property.get());
	}
});
;
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

/**
 * @class
 * @deprecated 1.4 Use {@link jQuery#jwprop jwprop} instead.
 * @extends JW.Class
 *
 * @constructor
 * @param {jQuery} el DOM element.
 * @param {Object} [config] Configuration (see Config options). For backward compatibility, target property is allowed
 * here, but this is a deprecated feature.
 */
JW.UI.CheckedListener = function(el, config) {
	this._update = JW.inScope(this._update, this);
	JW.UI.CheckedListener._super.call(this);
	config = (config instanceof JW.Property) ? {target: config} : (config || {});
	this.el = jQuery(el);
	this._targetCreated = config.target == null;
	this.target = this._targetCreated ? new JW.Property() : config.target;
	this.property = this.target;
	this._update();
	this.el.bind("change", this._update);
};

JW.extend(JW.UI.CheckedListener, JW.Class, {
	/**
	 * @cfg {JW.Property} target `<Boolean>` Target property. By default, created automatically.
	 */
	/**
	 * @property {jQuery} el DOM element.
	 */
	/**
	 * @property {JW.Property} target `<Boolean>` Target property.
	 */
	/**
	 * @property {JW.Property} property `<Boolean>` Deprecated, use {@link #property-target target} instead.
	 * @deprecated
	 */

	destroyObject: function() {
		this.el.unbind("change", this._update);
		if (this._targetCreated) {
			this.target.destroy();
		}
		this.el = null;
		this.target = null;
		this.property = null;
		this._super();
	},

	_update: function() {
		this.target.set(this.el.prop("checked"));
	}
});
;
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

/**
 * @class
 *
 * Result of {@link jQuery#jwclass jwclass} method call. Destroy it to stop synchronization.
 *
 * Was used as a standalone class before jWidget 1.4.
 * As of jWidget 1.4, {@link jQuery#jwclass jwclass} is an easier alternative.
 *
 * @extends JW.Class
 *
 * @constructor
 * @param {jQuery} el DOM element.
 * @param {JW.Property} property `<String>` Source property.
 */
JW.UI.ClassNameUpdater = function(el, property) {
	JW.UI.ClassNameUpdater._super.call(this);
	this.el = jQuery(el);
	this.own(new JW.Switcher([property], {
		init: function(value) { this.el.addClass(value); },
		done: function(value) { this.el.removeClass(value); },
		scope: this
	}));
};

JW.extend(JW.UI.ClassNameUpdater, JW.Class);
;
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

/**
 * @class
 *
 * Result of {@link jQuery#jwclass jwclass} method call. Destroy it to stop synchronization.
 *
 * Was used as a standalone class before jWidget 1.4.
 * As of jWidget 1.4, {@link jQuery#jwclass jwclass} is an easier alternative.
 *
 * @extends JW.Class
 *
 * @constructor
 * @param {jQuery} el DOM element.
 * @param {String} cls CSS class name.
 * @param {JW.Property} property `<Boolean>` Source property.
 */
JW.UI.ClassUpdater = function(el, cls, property) {
	JW.UI.ClassUpdater._super.call(this);
	this.el = jQuery(el);
	this.cls = cls;
	this.property = property;
	this._update();
	this.own(property.changeEvent.bind(this._update, this));
};

JW.extend(JW.UI.ClassUpdater, JW.Class, {
	/**
	 * @property {jQuery} el DOM element.
	 */
	/**
	 * @property {String} cls CSS class name.
	 */
	/**
	 * @property {JW.Property} property `<Boolean>` Source property.
	 */
	
	destroyObject: function() {
		this.el = null;
		this.property = null;
		this._super();
	},

	_update: function() {
		this.el.toggleClass(this.cls, !!this.property.get());
	}
});
;
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

/**
 * @class
 *
 * Result of {@link jQuery#jwcss jwcss} method call. Destroy it to stop synchronization.
 *
 * Was used as a standalone class before jWidget 1.4.
 * As of jWidget 1.4, {@link jQuery#jwcss jwcss} is an easier alternative.
 *
 * @extends JW.Class
 *
 * @constructor
 * @param {jQuery} el DOM element.
 * @param {String} style CSS style name.
 * @param {JW.Property} property `<String>` Source property.
 */
JW.UI.CssUpdater = function(el, style, property) {
	JW.UI.CssUpdater._super.call(this);
	this.el = jQuery(el);
	this.style = style;
	this.property = property;
	this._update();
	this.own(property.changeEvent.bind(this._update, this));
};

JW.extend(JW.UI.CssUpdater, JW.Class, {
	/**
	 * @property {jQuery} el DOM element.
	 */
	/**
	 * @property {String} style CSS style name.
	 */
	/**
	 * @property {JW.Property} property `<String>` Source property.
	 */

	destroyObject: function() {
		this.el = null;
		this.property = null;
		this._super();
	},
	
	_update: function() {
		this.el.css(this.style, this.property.get());
	}
});
;
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

/**
 * @class
 *
 * Result of {@link jQuery#jwhtml jwhtml} method call. Destroy it to stop synchronization.
 *
 * Was used as a standalone class before jWidget 1.4.
 * As of jWidget 1.4, {@link jQuery#jwhtml jwhtml} is an easier alternative.
 *
 * @extends JW.Class
 *
 * @constructor
 * @param {jQuery} el DOM element.
 * @param {JW.Property} property `<String>` Source property.
 */
JW.UI.HtmlUpdater = function(el, property) {
	JW.UI.HtmlUpdater._super.call(this);
	this.el = jQuery(el);
	this.property = property;
	this._update();
	this.own(property.changeEvent.bind(this._update, this));
};

JW.extend(JW.UI.HtmlUpdater, JW.Class, {
	/**
	 * @property {jQuery} el DOM element.
	 */
	/**
	 * @property {JW.Property} property `<String>` Source property.
	 */

	destroyObject: function() {
		this.el = null;
		this.property = null;
		this._super();
	},
	
	_update: function() {
		this.el.html(this.property.get());
	}
});
;
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

/**
 * @class
 *
 * Result of {@link jQuery#jwprop jwprop} method call. Destroy it to stop synchronization.
 *
 * @extends JW.Class
 *
 * @constructor
 * @param {jQuery} el DOM element.
 * @param {String} prop Element's property name.
 * @param {JW.Property} property `<Boolean>` Property.
 * @param {JW.Binding} [binding] Binding mode. Defaults to JW.Binding.UPDATE.
 */
JW.UI.PropBinding = function(el, prop, property, binding) {
	JW.UI.PropBinding._super.call(this);
	binding = binding || JW.UPDATE;
	if (binding & JW.UPDATE) {
		this.own(new JW.UI.PropUpdater(el, prop, property));
	}
	if (prop === "checked" && (binding & JW.WATCH)) {
		this.own(new JW.UI.CheckedListener(el, {target: property}));
	}
};

JW.extend(JW.UI.PropBinding, JW.Class);
;
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

/**
 * @class
 * @deprecated 1.4 Use {@link jQuery#jwprop jwprop} instead.
 * @extends JW.Class
 *
 * @constructor
 * @param {jQuery} el DOM element.
 * @param {String} prop Element's property name.
 * @param {JW.Property} property `<Boolean>` Source property.
 */
JW.UI.PropUpdater = function(el, prop, property) {
	JW.UI.PropUpdater._super.call(this);
	this.el = jQuery(el);
	this.prop = prop;
	this.property = property;
	this._update();
	this.own(property.changeEvent.bind(this._update, this));
};

JW.extend(JW.UI.PropUpdater, JW.Class, {
	/**
	 * @property {jQuery} el DOM element.
	 */
	/**
	 * @property {String} prop Element's property name.
	 */
	/**
	 * @property {JW.Property} property `<Boolean>` Source property.
	 */

	destroyObject: function() {
		this.el = null;
		this.property = null;
		this._super();
	},
	
	_update: function() {
		this.el.prop(this.prop, this.property.get());
		if (this.prop === "checked") {
			this.el.change();
		}
	}
});
;
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

/**
 * @class
 *
 * Result of {@link jQuery#jwradio jwradio} method call. Destroy it to stop synchronization.
 *
 * @extends JW.Class
 *
 * @constructor
 * @param {jQuery} el Container DOM element.
 * @param {String} name Radios "name" attribute.
 * @param {JW.Property} property `<String>` Property.
 * @param {JW.Binding} [binding] Binding mode. Defaults to JW.Binding.UPDATE.
 */
JW.UI.RadioBinding = function(el, name, property, binding) {
	JW.UI.RadioBinding._super.call(this);
	binding = binding || JW.UPDATE;
	if (binding & JW.UPDATE) {
		this.own(new JW.UI.RadioUpdater(el, name, property));
	}
	if (binding & JW.WATCH) {
		this.own(new JW.UI.RadioListener(el, name, {target: property}));
	}
};

JW.extend(JW.UI.RadioBinding, JW.Class);
;
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

/**
 * @class
 * @deprecated 1.4 Use {@link jQuery#jwradio jwradio} instead.
 * @extends JW.Class
 *
 * @constructor
 * @param {jQuery} el Container DOM element.
 * @param {String} name Radios "name" attribute.
 * @param {Object} [config] Configuration (see Config options). For backward compatibility, target property is allowed
 * here, but this is a deprecated feature.
 */
JW.UI.RadioListener = function(el, name, config) {
	this._update = JW.inScope(this._update, this);
	JW.UI.RadioListener._super.call(this);
	config = (config instanceof JW.Property) ? {target: config} : (config || {});
	this.el = jQuery(el);
	this.name = name;
	this._targetCreated = config.target == null;
	this.target = this._targetCreated ? new JW.Property() : config.target;
	this.property = this.target;
	this._selector = "input[type=radio][name='" + name + "']";
	this._update();
	this.el.on("change", this._selector, this._update);
};

JW.extend(JW.UI.RadioListener, JW.Class, {
	/**
	 * @cfg {JW.Property} target `<String>` Target property. By default, created automatically.
	 */
	/**
	 * @property {jQuery} el Container DOM element.
	 */
	/**
	 * @property {String} name Radios "name" attribute.
	 */
	/**
	 * @property {JW.Property} target `<String>` Target property.
	 */
	/**
	 * @property {JW.Property} property `<String>` Deprecated, use {@link #property-target target} instead.
	 * @deprecated
	 */

	destroyObject: function() {
		this.el.off("change", this._selector, this._update);
		if (this._targetCreated) {
			this.target.destroy();
		}
		this.el = null;
		this.target = null;
		this.property = null;
		this._super();
	},

	_update: function() {
		var radio = this.el.find(this._selector + ":checked");
		this.target.set((radio.length !== 0) ? radio.attr("value") : null);
	}
});
;
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

/**
 * @class
 * @deprecated 1.4 Use {@link jQuery#jwradio jwradio} instead.
 * @extends JW.Class
 *
 * @constructor
 * @param {jQuery} el Container DOM element.
 * @param {String} name Radios "name" attribute.
 * @param {JW.Property} property `<String>` Source property.
 */
JW.UI.RadioUpdater = function(el, name, property) {
	JW.UI.RadioUpdater._super.call(this);
	this.el = jQuery(el);
	this.name = name;
	this.property = property;
	this._selector = "input[type=radio][name='" + name + "']";
	this._update();
	this.own(property.changeEvent.bind(this._update, this));
};

JW.extend(JW.UI.RadioUpdater, JW.Class, {
	/**
	 * @property {jQuery} el Container DOM element.
	 */
	/**
	 * @property {String} name Radios "name" attribute.
	 */
	/**
	 * @property {JW.Property} property `<String>` Source property.
	 */

	destroyObject: function() {
		this.el = null;
		this.property = null;
		this._super();
	},
	
	_update: function() {
		var value = this.property.get();
		if (JW.isSet(value)) {
			var els = this.el.find(this._selector + "[value='" + value + "']");
			if (els.length !== 0) {
				els.prop("checked", true).change();
				return;
			}
		}
		this.el.find(this._selector + ":checked").prop("checked", false).change();
	}
});
;
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

/**
 * @class
 *
 * Result of {@link jQuery#jwtext jwtext} method call. Destroy it to stop synchronization.
 *
 * Was used as a standalone class before jWidget 1.4.
 * As of jWidget 1.4, {@link jQuery#jwtext jwtext} is an easier alternative.
 *
 * @extends JW.Class
 *
 * @constructor
 * @param {jQuery} el DOM element.
 * @param {JW.Property} property `<String>` Source property.
 */
JW.UI.TextUpdater = function(el, property) {
	JW.UI.TextUpdater._super.call(this);
	this.el = jQuery(el);
	this.property = property;
	this._update();
	this.own(property.changeEvent.bind(this._update, this));
};

JW.extend(JW.UI.TextUpdater, JW.Class, {
	/**
	 * @property {jQuery} el DOM element.
	 */
	/**
	 * @property {JW.Property} property `<String>` Source property.
	 */

	destroyObject: function() {
		this.el = null;
		this.property = null;
		this._super();
	},
	
	_update: function() {
		this.el[0].textContent = this.property.get();
	}
});
;
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

/**
 * @class
 *
 * Result of {@link jQuery#jwval jwval} method call. Destroy it to stop synchronization.
 *
 * @extends JW.Class
 *
 * @constructor
 * @param {jQuery} el DOM element.
 * @param {JW.Property} property `<String>` Property.
 * @param {JW.Binding} [binding] Binding mode. Defaults to JW.Binding.UPDATE.
 * @param {Boolean} [simple=false]
 * If true, watch-binding listens "change" event only. Defaults to false which enables
 * reaction to any real-time field modification.
 */
JW.UI.ValueBinding = function(el, property, binding, simple) {
	JW.UI.ValueBinding._super.call(this);
	binding = binding || JW.UPDATE;
	if (binding & JW.UPDATE) {
		this.own(new JW.UI.ValueUpdater(el, property));
	}
	if (binding & JW.WATCH) {
		this.own(new JW.UI.ValueListener(el, {target: property, simple: simple}));
	}
};

JW.extend(JW.UI.ValueBinding, JW.Class);
;
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

/**
 * @class
 * @deprecated 1.4 Use {@link jQuery#jwval jwval} instead.
 * @extends JW.Class
 *
 * @constructor
 * @param {jQuery} el DOM element.
 * @param {Object} [config] Configuration (see Config options). For backward compatibility, target property is allowed
 * here, {@link #cfg-simple simple} option is allowed as third argument, but this is a deprecated feature.
 * @param {Boolean} [simple=false]
 * If true, listens "change" event only. Defaults to false which enables
 * reaction to any real-time field modification.
 */
JW.UI.ValueListener = function(el, config, simple) {
	this._update = JW.inScope(this._update, this);
	JW.UI.ValueListener._super.call(this);
	config = (config instanceof JW.Property) ? {target: config, simple: simple} : (config || {});
	this.el = jQuery(el);
	this._targetCreated = config.target == null;
	this.target = this._targetCreated ? new JW.Property() : config.target;
	this.property = this.target;
	this.simple = config.simple || !JW.UI.isLifeInput(el);
	this._update();
	this.el.bind("change", this._update);
	if (!this.simple) {
		this._timer = setInterval(this._update, 100);
	}
};

JW.extend(JW.UI.ValueListener, JW.Class, {
	/**
	 * @cfg {JW.Property} target `<String>` Target property. By default, created automatically.
	 */
	/**
	 * @cfg {Boolean} simple
	 * If true, listens "change" event only. Defaults to false which enables
	 * reaction to any real-time field modification.
	 */
	/**
	 * @property {jQuery} el DOM element.
	 */
	/**
	 * @property {JW.Property} target `<String>` Target property.
	 */
	/**
	 * @property {JW.Property} property `<String>` Deprecated, use {@link #property-target target} instead.
	 * @deprecated
	 */

	destroyObject: function() {
		if (!this.simple) {
			clearInterval(this._timer);
		}
		this.el.unbind("change", this._update);
		if (this._targetCreated) {
			this.target.destroy();
		}
		this.el = null;
		this.target = null;
		this.property = null;
		this._super();
	},

	_update: function() {
		this.target.set(this.el.val());
	}
});
;
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

/**
 * @class
 * @deprecated 1.4 Use {@link jQuery#jwval jwval} instead.
 * @extends JW.Class
 *
 * @constructor
 * @param {jQuery} el DOM element.
 * @param {JW.Property} property `<String>` Source property.
 */
JW.UI.ValueUpdater = function(el, property) {
	JW.UI.ValueUpdater._super.call(this);
	this.el = jQuery(el);
	this.property = property;
	this._update();
	this.own(property.changeEvent.bind(this._update, this));
};

JW.extend(JW.UI.ValueUpdater, JW.Class, {
	/**
	 * @property {jQuery} el DOM element.
	 */
	/**
	 * @property {JW.Property} property `<String>` Source property.
	 */

	destroyObject: function() {
		this.el = null;
		this.property = null;
		this._super();
	},

	_update: function() {
		var value = this.property.get();
		if (this.el.val() !== value) {
			this.el.val(value).change();
		}
	}
});
;
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

/**
 * @class
 *
 * Result of {@link jQuery#jwshow jwshow} method call. Destroy it to stop synchronization.
 *
 * Was used as a standalone class before jWidget 1.4.
 * As of jWidget 1.4, {@link jQuery#jwshow jwshow} is an easier alternative.
 *
 * @extends JW.Class
 *
 * @constructor
 * @param {jQuery} el DOM element.
 * @param {JW.Property} property `<Boolean>` Source property.
 */
JW.UI.VisibleUpdater = function(el, property) {
	JW.UI.VisibleUpdater._super.call(this);
	this.el = jQuery(el);
	this.property = property;
	this._update();
	this.own(property.changeEvent.bind(this._update, this));
};

JW.extend(JW.UI.VisibleUpdater, JW.Class, {
	/**
	 * @property {jQuery} el DOM element.
	 */
	/**
	 * @property {JW.Property} property `<String>` Source property.
	 */

	destroyObject: function() {
		this.el = null;
		this.property = null;
		this._super();
	},
	
	_update: function() {
		this.el.css("display", this.property.get() ? "" : "none");
	}
});
;