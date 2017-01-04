/// <reference types="jquery" />

import Class from '../Class';
import Property from '../Property';

/**
 * @deprecated 1.4 Use [[JQuery.jwval|jwval]] instead.
 */
class ValueUpdater extends Class {
	constructor(private el: JQuery, private property: Property<string>) {
		super();
		this._update();
		this.own(property.changeEvent.bind(this._update, this));
	}

	private _update() {
		this.el.val(this.property.get());
	}
}

export default ValueUpdater;
