/// <reference types="jquery" />

import {Binding} from './Core';
import AttrUpdater from './ui/AttrUpdater';
import Class from './Class';
import CheckedListener from './ui/CheckedListener';
import ClassNameUpdater from './ui/ClassNameUpdater';
import ClassUpdater from './ui/ClassUpdater';
import CssUpdater from './ui/CssUpdater';
import HtmlUpdater from './ui/HtmlUpdater';
import JQEventAttachment from './ui/JQEventAttachment';
import Property from './Property';
import PropBinding from './ui/PropBinding';
import RadioBinding from './ui/RadioBinding';
import RadioListener from './ui/RadioListener';
import TextUpdater from './ui/TextUpdater';
import ValueBinding from './ui/ValueBinding';
import ValueListener from './ui/ValueListener';
import VisibleUpdater from './ui/VisibleUpdater';

/**
 * Attaches handler to an event. jWidget extension for <a href="http://api.jquery.com/on/" target="_blank">on</a>
 * method which has the next features.
 *
 * ### 1. Aggregation
 *
 * The method returns event attachment object. Its destruction results in event unbinding which allows you to use
 * jQuery events in conjunction with [[JW.Class.own|own]] method.
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
 * <iframe style="border: 1px solid green; padding: 10px;" width="730" height="200" src="http://enepomnyaschih.github.io/mt/1.4/jwui-jwon.html"></iframe>
 *
 * @param events One or more space-separated event types and optional namespaces, such as "click" or "keydown.myPlugin".
 * @param handler A function to execute when the event is triggered. The value `false` is also allowed as a shorthand for a function that simply does `return false`.
 * @param scope Function call scope.
 */
export function on(el: JQuery, events: string, handler: (eventObject: JQueryEventObject) => any, scope?: any): Class;

/**
 * @param events One or more space-separated event types and optional namespaces, such as "click" or "keydown.myPlugin".
 * @param selector A selector string to filter the descendants of the selected elements that trigger the event. If the selector is null or omitted, the event is always triggered when it reaches the selected element.
 * @param handler A function to execute when the event is triggered. The value `false` is also allowed as a shorthand for a function that simply does `return false`.
 * @param scope Function call scope.
 */
export function on(el: JQuery, events: string, selector: string, handler: (eventObject: JQueryEventObject) => any, scope?: any): Class;
export function on(el: JQuery, events: string, selector: any, handler: any, scope?: any): Class {
	return new JQEventAttachment(el, events, selector, handler, scope);
}

/**
 * Watches string property modification and updates the specified attribute of the DOM element.
 * Returns [[JW.UI.AttrUpdater]] instance. Destroy it to stop synchronization.
 *
 *     // Bind "title" attribute to title property value
 *     this.own(el.jwattr("title", title));
 *
 * <iframe style="border: 1px solid green; padding: 10px;" width="730" height="180" src="http://enepomnyaschih.github.io/mt/1.4/jwui-property-jwattr.html"></iframe>
 *
 * @param attr DOM element attribute name.
 * @param property Attribute value.
 */
export function attr(el: JQuery, attr: string, property: Property<any>): Class {
	return new AttrUpdater(el, attr, property);
}

/**
 * DOM element CSS class management method.
 *
 * Watches boolean property modification and updates the specified CSS class presence in the DOM element.
 * Returns [[JW.UI.ClassUpdater]] instance. Destroy it to stop synchronization.
 *
 *     // Bind "checked" CSS class to checked property value
 *     this.own(el.jwclass("checked", checked));
 *
 * <iframe style="border: 1px solid green; padding: 10px;" width="730" height="220" src="http://enepomnyaschih.github.io/mt/1.4/jwui-property-jwclass-bool.html"></iframe>
 *
 * @param cls CSS class name.
 * @param property Boolean property to bind CSS class to.
 */
export function cls(el: JQuery, cls: string, property: Property<boolean>): Class;

/**
 * DOM element CSS class management method.
 *
 * Watches string property modification and updates CSS class name in the DOM element.
 * Returns [[JW.UI.ClassNameUpdater]] instance. Destroy it to stop synchronization.
 *
 * **Caution:** Method doesn't check if the class of the same name is already present in the element.
 * If that's the case, it will remove the class on the next property value change. However, it won't
 * touch the other classes, e.g. it doesn't remove "application-rect" class in the example below.
 *
 *     // Bind CSS class name to color property value
 *     this.own(el.jwclass(color));
 *
 * <iframe style="border: 1px solid green; padding: 10px;" width="730" height="250" src="http://enepomnyaschih.github.io/mt/1.4/jwui-property-jwclass-string.html"></iframe>
 *
 * @param cls CSS class name.
 */
export function cls(el: JQuery, cls: Property<string>): Class;
export function cls(el: JQuery, a: any, b?: any): Class {
	return (b != null) ? new ClassUpdater(el, a, b) : new ClassNameUpdater(el, a);
}

/**
 * Watches string modification and updates the specified CSS style of the DOM element.
 * Returns [[JW.UI.CssUpdater]] instance. Destroy it to stop synchronization.
 *
 *     // Bind background color style to color property value
 *     this.own(el.jwcss("background-color", color));
 *
 * <iframe style="border: 1px solid green; padding: 10px;" width="730" height="180" src="http://enepomnyaschih.github.io/mt/1.4/jwui-property-jwcss.html"></iframe>
 *
 * @param style CSS style name.
 * @param property Style value.
 */
export function css(el: JQuery, style: string, property: Property<any>): Class {
	return new CssUpdater(el, style, property);
}

/**
 * Watches string property modification and updates inner HTML of the DOM element.
 * Returns [[JW.UI.HtmlUpdater]] instance. Destroy it to stop synchronization.
 *
 *     // Bind inner HTML to html property value
 *     this.own(el.jwhtml(html));
 *
 * <iframe style="border: 1px solid green; padding: 10px;" width="730" height="220" src="http://enepomnyaschih.github.io/mt/1.4/jwui-property-jwhtml.html"></iframe>
 *
 * @param property HTML value.
 */
export function html(el: JQuery, property: Property<string>): Class {
	return new HtmlUpdater(el, property);
}

/**
 * DOM element property management method.
 *
 * Returns a boolean property containing current checkbox state and starts watching for its modification.
 * Destroy the result property to stop synchronization.
 *
 *     // Watch checkbox state
 *     var property = this.own(el.jwprop("checked"));
 *
 * @param prop Element's property name.
 */
export function prop(el: JQuery, prop: string): Property<boolean>;

/**
 * DOM element property management method.
 *
 * Binds specified property of the DOM element to boolean property and/or vice versa.
 * Returns [[JW.UI.PropBinding]] instance. Destroy it to stop synchronization.
 *
 *     // Bind element state to property
 *     this.own(el.jwprop("disabled", property));
 *
 * <iframe style="border: 1px solid green; padding: 10px;" width="730" height="140" src="http://enepomnyaschih.github.io/mt/1.4/jwui-property-jwprop.html"></iframe>
 *
 * Two way binding:
 *
 *     this.own(el.jwprop("checked", this.value, JW.TWOWAY));
 *
 * <iframe style="border: 1px solid green; padding: 10px;" width="730" height="150" src="http://enepomnyaschih.github.io/mt/1.4/jwui-property-jwprop-two.html"></iframe>
 *
 * @param prop Element's property name.
 * @param property Property value.
 * @param binding Binding mode. Defaults to [[JW.Binding.UPDATE]].
 */
export function prop(el: JQuery, prop: string, property: Property<boolean>, binding?: Binding): Class;
export function prop(el: JQuery, prop: string, property?: Property<boolean>, binding?: Binding): Class {
	if (property != null) {
		return new PropBinding(el, prop, property, binding);
	}
	if (prop === "checked") {
		var target = new Property<boolean>();
		target.own(new CheckedListener(el, {target: target}));
		return target;
	}
	throw new Error("Invalid argument");
}

/**
 * Radio group value management method.
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
 * <iframe style="border: 1px solid green; padding: 10px;" width="730" height="255" src="http://enepomnyaschih.github.io/mt/1.4/jwui-property-jwclass-string.html"></iframe>
 *
 * @param name Radios "name" attribute.
 */
export function radio(el: JQuery, name: string): Property<string>;

/**
 * Radio group value management method.
 *
 * Binds radio group selection to string property and/or vice versa.
 * Returns [[JW.UI.RadioBinding]] instance. Destroy it to stop synchronization.
 *
 * All radios must have the same "name" attribute value.
 *
 *     // Bind radio button selection to property value
 *     this.own(el.jwradio("letter", value));
 *
 * <iframe style="border: 1px solid green; padding: 10px;" width="730" height="170" src="http://enepomnyaschih.github.io/mt/1.4/jwui-property-jwradio.html"></iframe>
 *
 * Two way binding:
 *
 *     this.own(el.jwradio("first", this.value, JW.TWOWAY));
 *
 * <iframe style="border: 1px solid green; padding: 10px;" width="730" height="300" src="http://enepomnyaschih.github.io/mt/1.4/jwui-property-jwradio-two.html"></iframe>
 *
 * @param name Radios "name" attribute.
 * @param property Radio value.
 * @param binding Binding mode. Defaults to [[JW.Binding.UPDATE]].
 */
export function radio(el: JQuery, name: string, property: Property<string>, binding?: Binding): Class;
export function radio(el: JQuery, name: string, property?: Property<string>, binding?: Binding): Class {
	if (property != null) {
		return new RadioBinding(el, name, property, binding);
	}
	var target = new Property<string>();
	target.own(new RadioListener(el, name, {target: target}));
	return target;
}

/**
 * Watches string modification and updates inner text of the DOM element.
 * Returns [[JW.UI.TextUpdater]] instance. Destroy it to stop synchronization.
 *
 *     // Bind inner text to property value
 *     this.own(el.jwtext(text));
 *
 * <iframe style="border: 1px solid green; padding: 10px;" width="730" height="220" src="http://enepomnyaschih.github.io/mt/1.4/jwui-property-jwtext.html"></iframe>
 *
 * @param property Text value.
 */
export function text(el: JQuery, property: Property<string>): Class {
	return new TextUpdater(el, property);
}

/**
 * DOM element value management method.
 *
 * Returns a string property containing current element value and starts watching for value modification.
 * Destroy the result property to stop synchronization.
 *
 *     // Watch input element value
 *     var value = this.own(el.jwval());
 *
 * @param simple If true, listens "change" event only. Defaults to false which enables
 * reaction to any real-time field modification.
 */
export function val(el: JQuery, simple?: boolean): Property<string>;

/**
 * DOM element value management method.
 *
 * Binds DOM text input value to string property and/or vice versa.
 * Returns [[JW.UI.ValueBinding]] instance. Destroy it to stop synchronization.
 *
 *     // Bind element value to property
 *     this.own(el.jwval(value));
 *
 * <iframe style="border: 1px solid green; padding: 10px;" width="730" height="285" src="http://enepomnyaschih.github.io/mt/1.4/jwui-property-jwval.html"></iframe>
 *
 * Two way binding:
 *
 *     this.own(el.jwval(this.value, JW.TWOWAY));
 *
 * <iframe style="border: 1px solid green; padding: 10px;" width="730" height="180" src="http://enepomnyaschih.github.io/mt/1.4/jwui-property-jwval-two.html"></iframe>
 *
 * @param property Element value.
 * @param binding Binding mode. Defaults to [[JW.Binding.UPDATE]].
 * @param simple If true, watch-binding listens "change" event only. Defaults to false which enables
 * reaction to any real-time field modification.
 */
export function val(el: JQuery, value: Property<string>, binding?: Binding, simple?: boolean): Class;
export function val(el: JQuery, value: any, binding?: Binding, simple?: boolean): Class {
	if (value != null && (typeof value !== "boolean")) {
		return new ValueBinding(el, value, binding, simple);
	}
	var target = new Property<string>();
	target.own(new ValueListener(el, {target: target, simple: simple}));
	return target;
}

/**
 * Watches boolean property modification and updates visibility of the DOM element.
 * To make element invisible, sets "display: none" inline style. To make
 * element visible, removes "display" inline style. Make sure that element is visible according to your CSS rules.
 * Returns [[JW.UI.VisibleUpdater]] instance. Destroy it to stop synchronization.
 *
 *     // Bind element visibility to property value
 *     this.own(el.jwshow(checked));
 *
 * <iframe style="border: 1px solid green; padding: 10px;" width="730" height="215" src="http://enepomnyaschih.github.io/mt/1.4/jwui-property-jwshow.html"></iframe>
 *
 * @param property Element visibility.
 */
export function show(el: JQuery, property: Property<boolean>): Class {
	return new VisibleUpdater(el, property);
}
