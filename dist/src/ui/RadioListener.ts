/// <reference types="jquery" />

import Class from '../Class';
import Property from '../Property';

/**
 * @deprecated 1.4 Use [[JQuery.jwradio|jwradio]] instead.
 */
class RadioListener extends Class {
	public target: Property<string>;
	private _selector: string;
	private update: () => void;

	constructor(private el: JQuery, name: string, config: RadioListener.Config = {}) {
		super();
		this.update = () => this._update();
		this.target = config.target || this.own(new Property<string>());
		this._selector = "input[type=radio][name='" + name + "']";
		this._update();
		this.el.on("change", this._selector, this.update);
	}

	destroy() {
		this.el.off("change", this._selector, this.update);
		super.destroy();
	}

	private _update() {
		var radio = this.el.find(this._selector + ":checked");
		this.target.set((radio.length !== 0) ? radio.attr("value") : null);
	}
}

namespace RadioListener {
	export interface Config {
		target?: Property<string>;
	}
}

export default RadioListener;
