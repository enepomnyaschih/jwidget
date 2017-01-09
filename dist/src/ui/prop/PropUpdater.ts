/// <reference types="jquery" />

import Class from '../../Class';
import Property from '../../Property';

/**
 * @deprecated 1.4 Use [[JQuery.jwprop|jwprop]] instead.
 */
class PropUpdater extends Class {
	/**
	 * @param el DOM element.
	 * @param prop Element's property name.
	 * @param property Source property.
	 */
	constructor(private el: JQuery, private prop: string, private property: Property<boolean>) {
		super();
		this._update();
		this.own(property.changeEvent.bind(this._update, this));
	}

	private _update() {
		this.el.prop(this.prop, this.property.get());
		if (this.prop === "checked") {
			this.el.change();
		}
	}
}

export default PropUpdater;
