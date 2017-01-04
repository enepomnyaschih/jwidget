/// <reference types="jquery" />

import {Binding, UPDATE, WATCH} from '../Core';
import Class from '../Class';
import Property from '../Property';
import RadioListener from './RadioListener';
import RadioUpdater from './RadioUpdater';

/**
 * Result of [[JQuery.jwradio|jwradio]] method call. Destroy it to stop synchronization.
 */
class RadioBinding extends Class {
	/**
	 * @param el Container DOM element.
	 * @param name Radios "name" attribute.
	 * @param property Property.
	 * @param binding Binding mode. Defaults to [[JW.Binding.UPDATE]].
	 */
	constructor(el: JQuery, name: string, property: Property<string>, binding: Binding = UPDATE) {
		super();
		if (binding & UPDATE) {
			this.own(new RadioUpdater(el, name, property));
		}
		if (binding & WATCH) {
			this.own(new RadioListener(el, name, {target: property}));
		}
	}
}

export default RadioBinding;
