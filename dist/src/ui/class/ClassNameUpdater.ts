/// <reference types="jquery" />

import Class from '../../Class';
import Property from '../../Property';
import Switcher from '../../Switcher';

/**
 * Result of [[JQuery.jwclass|jwclass]] method call. Destroy it to stop synchronization.
 *
 * Was used as a standalone class before jWidget 1.4.
 * As of jWidget 1.4, [[JQuery.jwclass|jwclass]] is an easier alternative.
 */
class ClassNameUpdater extends Class {
	/**
	 * @param el DOM element.
	 * @param property Source property.
	 */
	constructor(private el: JQuery, property: Property<string>) {
		super();
		this.own(new Switcher([property], {
			init: (value: any) => this.el.addClass(value),
			done: (value: any) => this.el.removeClass(value)
		}));
	}
}

export default ClassNameUpdater;
