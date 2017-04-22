/*
	jWidget 2
	Copyright (C) 2017  Egor Nepomnyaschih
	enepomnyaschih@gmail.com
	https://github.com/enepomnyaschih/jwidget

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

import {Binding} from '../../Core';
import Destroyable from '../../Destroyable';
import IProperty from '../../IProperty';
import Property from '../../Property';
import RadioBinding from './RadioBinding';
import RadioListener from './RadioListener';
import Watchable from '../../Watchable';

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
export default function radio(el: JQuery, name: string): Watchable<string>;

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
export default function radio(el: JQuery, name: string, property: Watchable<any>): Destroyable;
export default function radio(el: JQuery, name: string, property: IProperty<string>, binding?: Binding): Destroyable;
export default function radio(el: JQuery, name: string, property?: any, binding?: Binding): any {
	if (property != null) {
		return new RadioBinding(el, name, property, binding);
	}
	var target = new Property<string>();
	target.own(new RadioListener(el, name, {target: target}));
	return target;
}
