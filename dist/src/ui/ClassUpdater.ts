/// <reference types="jquery" />

import Class from '../Class';
import Property from '../Property';

/**
 * Result of [[JQuery.jwclass|jwclass]] method call. Destroy it to stop synchronization.
 *
 * Was used as a standalone class before jWidget 1.4.
 * As of jWidget 1.4, [[JQuery.jwclass|jwclass]] is an easier alternative.
 */
class ClassUpdater extends Class {
	/**
	 * @param el DOM element.
	 * @param cls CSS class name.
	 * @param property Source property.
	 */
	constructor(private el: JQuery, private cls: string, private property: Property<boolean>) {
		super();
		this._update();
		this.own(property.changeEvent.bind(this._update, this));
	}

	private _update() {
		this.el.toggleClass(this.cls, !!this.property.get());
	}
}

export default ClassUpdater;