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
import CheckedListener from './CheckedListener';
import Destroyable from '../../Destroyable';
import IProperty from '../../IProperty';
import PropBinding from './PropBinding';
import Property from '../../Property';
import Watchable from '../../Watchable';

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
export default function prop(el: JQuery, prop: string): Watchable<boolean>;

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
export default function prop(el: JQuery, prop: string, property: Watchable<any>): Destroyable;
export default function prop(el: JQuery, prop: string, property: IProperty<boolean>, binding: Binding): Destroyable;
export default function prop(el: JQuery, prop: string, property?: any, binding?: Binding): any {
	if (property != null) {
		return new PropBinding(el, prop, property, binding);
	}
	if (prop === "checked") {
		var target = new Property<boolean>(true);
		target.own(new CheckedListener(el, {target: target}));
		return target;
	}
	throw new Error("Invalid argument");
}
