/// <reference types="jquery" />

import {Binding, UPDATE, WATCH} from '../../Core';
import CheckedListener from './CheckedListener';
import Class from '../../Class';
import PropUpdater from './PropUpdater';
import Property from '../../Property';

/**
 * Result of [[JQuery.jwprop|jwprop]] method call. Destroy it to stop synchronization.
 */
class PropBinding extends Class {
	/**
	 * @param el DOM element.
	 * @param prop Element's property name.
	 * @param property Property.
	 * @param binding Binding mode. Defaults to [[JW.Binding.UPDATE]].
	 */
	constructor(el: JQuery, prop: string, property: Property<boolean>, binding: Binding = UPDATE) {
		super();
		if (binding & UPDATE) {
			this.own(new PropUpdater(el, prop, property));
		}
		if (prop === "checked" && (binding & WATCH)) {
			this.own(new CheckedListener(el, {target: property}));
		}
	}
}

export default PropBinding;
