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

import Bindable from './Bindable';
import Class from './Class';

/**
 * Listens source property modification and calls the specified functions.
 */
class Switcher<T> extends Class {
	private _init: Switcher.Callback<T>;
	private _done: Switcher.Callback<T>;
	private _scope: any;
	private _acceptNil: boolean;
	private _value: T;

	/**
	 * @param source Source property.
	 * @param config Configuration.
	 */
	constructor(readonly source: Bindable<T>, config: Switcher.Config<T> = {}) {
		super();
		this._init = config.init;
		this._done = config.done;
		this._scope = config.scope || this;
		this._acceptNil = config.acceptNil || false;
		this._doInit();
		this.own(source.changeEvent.listen(this._update, this));
	}

	protected destroyObject() {
		this._doDone();
		this._init = null;
		this._done = null;
		this._scope = null;
		this._value = null;
		super.destroyObject();
	}

	private _update() {
		this._doDone();
		this._doInit();
	}

	private _doInit() {
		this._value = this.source.get();
		if (this._init && (this._acceptNil || this._value != null)) {
			this._init.call(this._scope, this._value);
		}
	}

	private _doDone() {
		if (this._done && (this._acceptNil || this._value != null)) {
			this._done.call(this._scope, this._value);
		}
		this._value = null;
	}
}

namespace Switcher {
	/**
	 * Switcher callback.
	 */
	export interface Callback<T> {
		(value: T): any;
	}

	/**
	 * Configuration of Switcher.
	 */
	export interface Config<T> {
		/**
		 * Value initialization callback.
		 */
		readonly init?: Callback<T>;

		/**
		 * Value releasing callback.
		 */
		readonly done?: Callback<T>;

		/**
		 * `init` and `done` call scope. Defaults to switcher itself.
		 */
		readonly scope?: any;

		/**
		 * Set to true if you want the callbacks to be called even if one of source values is null.
		 */
		readonly acceptNil?: boolean;
	}
}

export default Switcher;
