import {Binding} from '../../Core';
import CheckedListener from './CheckedListener';
import IClass from '../../IClass';
import PropBinding from './PropBinding';
import Property from '../../Property';

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
export default function prop(el: JQuery, prop: string): Property<boolean>;

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
export default function prop(el: JQuery, prop: string, property: Property<boolean>, binding?: Binding): IClass;
export default function prop(el: JQuery, prop: string, property?: Property<boolean>, binding?: Binding): IClass {
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
