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
import IProperty from '../../IProperty';
import ObservableProperty from '../../ObservableProperty';
import Watchable from '../../Watchable';

/**
 * @deprecated 1.4 Use [[JQuery.jwval|jwval]] instead.
 */
class ValueListener extends Class {
	private _target: IProperty<string>;
	private _simple: boolean;
	private _timer: number;
	private update: () => void;

	constructor(private el: JQuery, config: ValueListener.Config = {}) {
		super();
		this.update = () => this._update();
		this._target = config.target || this.own(new ObservableProperty<string>());
		this._simple = config.simple || !isLifeInput(el);
		this.update();
		this.el.bind("change", this.update);
		if (!this._simple) {
			this._timer = window.setInterval(this.update, 100);
		}
	}

	get target(): Watchable<string> {
		return this._target;
	}

	destroy() {
		if (!this._simple) {
			clearInterval(this._timer);
		}
		this.el.unbind("change", this.update);
		super.destroy();
	}

	_update() {
		this._target.set(this.el.val());
	}
}

namespace ValueListener {
	export interface Config {
		target?: IProperty<string>;
		simple?: boolean;
	}
}

export default ValueListener;
