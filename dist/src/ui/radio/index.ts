import {Binding} from '../../Core';
import IClass from '../../IClass';
import Property from '../../Property';
import RadioBinding from './RadioBinding';
import RadioListener from './RadioListener';

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
export default function radio(el: JQuery, name: string): Property<string>;

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
export default function radio(el: JQuery, name: string, property: Property<string>, binding?: Binding): IClass;
export default function radio(el: JQuery, name: string, property?: Property<string>, binding?: Binding): IClass {
	if (property != null) {
		return new RadioBinding(el, name, property, binding);
	}
	var target = new Property<string>();
	target.own(new RadioListener(el, name, {target: target}));
	return target;
}
