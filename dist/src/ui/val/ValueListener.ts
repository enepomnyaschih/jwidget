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

import {isLifeInput} from '../../internal';
import Class from '../../Class';
import Property from '../../Property';

/**
 * @deprecated 1.4 Use [[JQuery.jwval|jwval]] instead.
 */
class ValueListener extends Class {
	public target: Property<string>;
	private simple: boolean;
	private _timer: number;
	private update: () => void;

	constructor(private el: JQuery, config: ValueListener.Config = {}) {
		super();
		this.update = () => this._update();
		this.target = config.target || this.own(new Property<string>());
		this.simple = config.simple || !isLifeInput(el);
		this.update();
		this.el.bind("change", this.update);
		if (!this.simple) {
			this._timer = window.setInterval(this.update, 100);
		}
	}

	destroy() {
		if (!this.simple) {
			clearInterval(this._timer);
		}
		this.el.unbind("change", this.update);
		super.destroy();
	}

	_update() {
		this.target.set(this.el.val());
	}
}

namespace ValueListener {
	export interface Config {
		target?: Property<string>;
		simple?: boolean;
	}
}

export default ValueListener;
