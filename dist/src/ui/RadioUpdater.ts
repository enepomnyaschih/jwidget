/// <reference types="jquery" />

import Class from '../Class';
import Property from '../Property';

/**
 * Use [[JQuery.jwradio|jwradio]] instead.
 */
class RadioUpdater extends Class {
	private _selector: string;

	constructor(private el: JQuery, name: string, private property: Property<string>) {
		super();
		this._selector = "input[type=radio][name='" + name + "']";
		this._update();
		this.own(property.changeEvent.bind(this._update, this));
	}

	private _update() {
		var value = this.property.get();
		if (value != null) {
			var els = this.el.find(this._selector + "[value='" + value + "']");
			if (els.length !== 0) {
				els.prop("checked", true).change();
				return;
			}
		}
		this.el.find(this._selector + ":checked").prop("checked", false).change();
	}
}

export default RadioUpdater;
