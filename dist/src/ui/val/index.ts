import {Binding} from '../../Core';
import IClass from '../../IClass';
import Property from '../../Property';
import ValueBinding from './ValueBinding';
import ValueListener from './ValueListener';

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
export default function val(el: JQuery, simple?: boolean): Property<string>;

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
export default function val(el: JQuery, value: Property<string>, binding?: Binding, simple?: boolean): IClass;
export default function val(el: JQuery, value: any, binding?: Binding, simple?: boolean): IClass {
	if (value != null && (typeof value !== "boolean")) {
		return new ValueBinding(el, value, binding, simple);
	}
	var target = new Property<string>();
	target.own(new ValueListener(el, {target: target, simple: simple}));
	return target;
}
