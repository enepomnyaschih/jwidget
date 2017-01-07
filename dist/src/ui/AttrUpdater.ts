/// <reference types="jquery" />

import Class from '../Class';
import Property from '../Property';

/**
 * Result of [[JQuery.jwattr|jwattr]] method call. Destroy it to stop synchronization.
 *
 * Was used as a standalone class before jWidget 1.4.
 * As of jWidget 1.4, [[JQuery.jwattr|jwattr]] is an easier alternative.
 */
class AttrUpdater extends Class {
	/**
	 * @param el DOM element.
	 * @param attr Element's attribute name.
	 * @param property Source property.
	 */
	constructor(private el: JQuery, private attr: string, private property: Property<any>) {
		super();
		this._update();
		this.own(property.changeEvent.bind(this._update, this));
	}

	private _update() {
		this.el.attr(this.attr, this.property.get());
	}
}

export default AttrUpdater;