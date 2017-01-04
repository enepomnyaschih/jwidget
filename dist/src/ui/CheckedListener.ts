/// <reference types="jquery" />

import Class from '../Class';
import Property from '../Property';

/**
 * @deprecated 1.4 Use [[JQuery.jwprop|jwprop]] instead.
 */
class CheckedListener extends Class {
	public target: Property<boolean>;
	private update: () => void;

	constructor(private el: JQuery, config: CheckedListener.Config = {}) {
		super();
		this.update = () => this._update();
		this.target = config.target || this.own(new Property<boolean>());
		this._update();
		this.el.bind("change", this.update);
	}

	protected destroyObject() {
		this.el.unbind("change", this.update);
		super.destroy();
	}

	private _update() {
		this.target.set(this.el.prop("checked"));
	}
}

namespace CheckedListener {
	export interface Config {
		target?: Property<boolean>;
	}
}

export default CheckedListener;
