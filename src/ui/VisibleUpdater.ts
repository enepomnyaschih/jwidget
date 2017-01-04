/// <reference types="jquery" />

import Class from '../Class';
import Property from '../Property';

/**
 * Result of [[JQuery.jwshow|jwshow]] method call. Destroy it to stop synchronization.
 *
 * Was used as a standalone class before jWidget 1.4.
 * As of jWidget 1.4, [[JQuery.jwshow|jwshow]] is an easier alternative.
 */
class VisibleUpdater extends Class {
	/**
	 * @param el DOM element.
	 * @param property Source property.
	 */
	constructor(private el: JQuery, private property: Property<boolean>) {
		super();
		this._update();
		this.own(property.changeEvent.bind(this._update, this));
	}

	private _update() {
		this.el.css("display", this.property.get() ? "" : "none");
	}
}

export default VisibleUpdater;
