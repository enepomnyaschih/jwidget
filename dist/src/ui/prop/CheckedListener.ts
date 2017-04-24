/*!
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
import IProperty from '../../IProperty';
import Property from '../../Property';
import Watchable from '../../Watchable';

/**
 * @deprecated 1.4 Use [[JQuery.jwprop|jwprop]] instead.
 */
class CheckedListener extends Class {
	private _target: IProperty<boolean>;
	private update: () => void;

	constructor(private el: JQuery, config: CheckedListener.Config = {}) {
		super();
		this.update = () => this._update();
		this._target = config.target || this.own(new Property<boolean>());
		this._update();
		this.el.bind("change", this.update);
	}

	get target(): Watchable<boolean> {
		return this._target;
	}

	protected destroyObject() {
		this.el.unbind("change", this.update);
		super.destroy();
	}

	private _update() {
		this._target.set(this.el.prop("checked"));
	}
}

namespace CheckedListener {
	export interface Config {
		readonly target?: IProperty<boolean>;
	}
}

export default CheckedListener;
