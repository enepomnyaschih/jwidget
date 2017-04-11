/*
	jWidget 2
	Copyright (C) 2017  Egor Nepomnyaschih
	enepomnyaschih@gmail.com
	https://github.com/enepomnyaschih/jwidget

	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU Lesser General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU Lesser General Public License for more details.

	You should have received a copy of the GNU Lesser General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/// <reference types="jquery" />

import Class from '../../Class';
import Property from '../../Property';

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
