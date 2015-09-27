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
	 * Watches string property modification and updates the specified attribute of the DOM element.
	 * Returns JW.UI.AttrUpdater instance. Destroy it to stop synchronization.
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
	 *     jwprop(prop: String, property: JW.Property<Boolean>): JW.UI.PropUpdater
	 *     jwprop("checked"): JW.Property<Boolean>
	 *
	 * <hr>
	 *
	 *     jwprop(prop: String, property: JW.Property<Boolean>): JW.UI.PropUpdater
	 *
	 * Watches boolean property modification and updates the specified property of the DOM element.
	 * Returns JW.UI.PropUpdater instance. Destroy it to stop synchronization.
	 *
	 * <hr>
	 *
	 *     jwprop("checked"): JW.Property<Boolean>
	 *
	 * Returns a boolean property containing current checkbox state and starts watching for checkbox modification.
	 * Creates JW.UI.CheckedListener implicitly. Destroy the result property to stop synchronization.
	 *
	 * <iframe style="border: 1px solid green; padding: 10px;" width="800" height="140" src="http://enepomnyaschih.github.io/mt/1.4/jwui-property-jwprop.html"></iframe>
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
	 * Radio group value management method. Supports two variations.
	 *
	 *     jwradio(name: String, value: JW.Property<String>): JW.UI.RadioUpdater
	 *     jwradio(name: String): JW.Property<String>
	 *
	 * <hr>
	 *
	 *     jwradio(name: String, value: JW.Property<String>): JW.UI.RadioUpdater
	 *
	 * Watches string property modification and selects a corresponding radio button.
	 * Returns JW.UI.RadioUpdater instance. Destroy it to stop synchronization.
	 *
	 * All radios must have the same "name" attribute value.
	 *
	 * <iframe style="border: 1px solid green; padding: 10px;" width="800" height="170" src="http://enepomnyaschih.github.io/mt/1.4/jwui-property-jwradio.html"></iframe>
	 *
	 * <hr>
	 *
	 *     jwradio(name: String): JW.Property<String>
	 *
	 * Returns a string property containing current radio group selection and starts watching for selection modification.
	 * Creates JW.UI.RadioListener implicitly. Destroy the result property to stop synchronization.
	 *
	 * Notice that the object binds an event listener to a container element and uses bubbling mechanism to detect the
	 * selection modification. That's why you must avoid bubbling interruption in child elements of the container.
	 * All radios must have the same "name" attribute value. If neighter radio is selected, property is set to null.
	 *
	 * <iframe style="border: 1px solid green; padding: 10px;" width="800" height="255" src="http://enepomnyaschih.github.io/mt/1.4/jwui-property-jwclass-string.html"></iframe>
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
	 * Watches string modification and updates inner text of the DOM element.
	 * Returns JW.UI.TextUpdater instance. Destroy it to stop synchronization.
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
	 *     jwval(value: JW.Property<String>): JW.UI.ValueUpdater
	 *     jwval(): JW.Property<String>
	 *
	 * <hr>
	 *
	 *     jwval(value: JW.Property<String>): JW.UI.ValueUpdater
	 *
	 * Watches string property modification and updates the value of the DOM text input.
	 * Returns JW.UI.ValueUpdater instance. Destroy it to stop synchronization.
	 *
	 * <hr>
	 *
	 *     jwval(): JW.Property<String>
	 *
	 * Returns a string property containing current element value and starts watching for value modification.
	 * Creates JW.UI.ValueListener implicitly. Destroy the result property to stop synchronization.
	 *
	 * <iframe style="border: 1px solid green; padding: 10px;" width="800" height="285" src="http://enepomnyaschih.github.io/mt/1.4/jwui-property-jwval.html"></iframe>
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
	 * Watches boolean property modification and updates visibility of the DOM element.
	 * To make element invisible, sets "display: none" inline style. To make
	 * element visible, removes "display" inline style. Make sure that element is visible according to your CSS rules.
	 * Returns JW.UI.VisibleUpdater instance. Destroy it to stop synchronization.
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
