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
	 * Creates jQuery event adapter managed by jWidget.
	 * Shorthand for JW.UI.JQEventAttachment creation.
	 * See JW.UI.JQEventAttachment for more details.
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
	 * Shorthand for JW.UI.AttrUpdater creation - see it for details.
	 *
	 * @param {String} attr DOM element attribute name.
	 * @param {JW.Property} property `<String>` Attribute value.
	 * @returns {JW.UI.AttrUpdater} Synchronizer instance.
	 */
	jwattr: function(attr, property) {
		return new JW.UI.AttrUpdater(this, attr, property);
	},

	/**
	 * Shorthand for JW.UI.ClassUpdater and JW.UI.ClassNameUpdater creation - see them for details.
	 *
	 *     jwclass(cls: String, property: JW.Property<Boolean>): JW.UI.ClassUpdater
	 *     jwclass(cls: JW.Property<String>): JW.UI.ClassNameUpdater
	 */
	jwclass: function() {
		var a = arguments[0], b = arguments[1];
		return (b != null) ? new JW.UI.ClassUpdater(this, a, b) : new JW.UI.ClassNameUpdater(this, a);
	},

	/**
	 * Shorthand for JW.UI.CssUpdater creation - see it for details.
	 *
	 * @param {String} style CSS style name.
	 * @param {JW.Property} property `<String>` Style value.
	 * @returns {JW.UI.CssUpdater} Synchronizer instance.
	 */
	jwcss: function(style, property) {
		return new JW.UI.CssUpdater(this, style, property);
	},

	/**
	 * Shorthand for JW.UI.HtmlUpdater creation - see it for details.
	 *
	 * @param {JW.Property} property `<String>` HTML value.
	 * @returns {JW.UI.HtmlUpdater} Synchronizer instance.
	 */
	jwhtml: function(property) {
		return new JW.UI.HtmlUpdater(this, property);
	},

	/**
	 * Shorthand for JW.UI.PropUpdater and JW.UI.CheckedListener creation - see them for details.
	 *
	 *     jwprop(prop: String, property: JW.Property<Boolean>): JW.UI.PropUpdater
	 *     jwprop("checked"): JW.Property<Boolean> // creates JW.UI.CheckedListener implicitly
	 *
	 * @param {String} prop Element's property name.
	 * @param {JW.Property} [property] `<Boolean>` Property value.
	 */
	jwprop: function(prop, property) {
		if (property != null) {
			return new JW.UI.PropUpdater(this, prop, property);
		}
		if (prop === "checked") {
			var target = new JW.Property();
			target.own(new JW.UI.CheckedListener(this, {target: target}));
			return target;
		}
		throw new Error("Invalid argument");
	},

	/**
	 * Shorthand for JW.UI.RadioUpdater and JW.UI.RadioListener creation - see them for details.
	 *
	 *     jwradio(name: String, value: JW.Property<String>): JW.UI.RadioUpdater
	 *     jwradio(name: String): JW.Property<String> // creates JW.UI.RadioListener implicitly
	 *
	 * @param {String} name Radios "name" attribute.
	 * @param {JW.Property} [property] `<String>` Radio value.
	 */
	jwradio: function(name, property) {
		if (property != null) {
			return new JW.UI.RadioUpdater(this, name, property);
		}
		var target = new JW.Property();
		target.own(new JW.UI.RadioListener(this, name, {target: target}));
		return target;
	},

	/**
	 * Shorthand for JW.UI.TextUpdater creation - see it for details.
	 *
	 * @param {JW.Property} property `<String>` HTML value.
	 * @returns {JW.UI.TextUpdater} Synchronizer instance.
	 */
	jwtext: function(property) {
		return new JW.UI.TextUpdater(this, property);
	},

	/**
	 * Shorthand for JW.UI.ValueUpdater and JW.ValueListener creation - see them for details.
	 *
	 *     jwval(value: JW.Property<String>): JW.UI.ValueUpdater
	 *     jwval(): JW.Property<String> // creates JW.UI.ValueListener implicitly
	 *
	 * @param {JW.Property} [property] `<String>` Element value.
	 */
	jwval: function(property) {
		if (property != null) {
			return new JW.UI.ValueUpdater(this, property);
		}
		var target = new JW.Property();
		target.own(new JW.UI.ValueListener(this, {target: target}));
		return target;
	},

	/**
	 * Shorthand for JW.UI.VisibleUpdater creation - see it for details.
	 *
	 * @param {JW.Property} property `<Boolean>` Element visibility.
	 * @returns {JW.UI.VisibleUpdater} Synchronizer instance.
	 */
	jwshow: function(property) {
		return new JW.UI.VisibleUpdater(this, property);
	}
});
