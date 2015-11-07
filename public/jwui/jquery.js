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
