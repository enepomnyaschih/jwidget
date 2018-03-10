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

import Bindable from './Bindable';
import Class from './Class';
import {isNotNil} from './index';
import Listenable from './Listenable';

/**
 * Listens source property modification and calls the specified functions.
 */
class Switcher extends Class {
	private _init: Switcher.Callback;
	private _done: Switcher.Callback;
	private _scope: any;
	private _acceptNull: boolean;
	private _sourceValues: any[];

	/**
	 * @param sources Source properties.
	 * @param config Configuration.
	 */
	constructor(
		readonly sources: Bindable<any>[],
		config?: Switcher.Config)
	{
		super();
		config = config || {};
		this._init = config.init;
		this._done = config.done;
		this._scope = config.scope || this;
		this._acceptNull = config.acceptNull || false;
		this._sourceValues = null;
		this._doInit();
		sources.forEach(this.bind, this);
	}

	protected destroyObject() {
		this._doDone();
		this._init = null;
		this._done = null;
		this._scope = null;
		this._sourceValues = null;
		super.destroyObject();
	}

	/**
	 * Listens specified event and issues callback calls on event triggering.
	 * @param event Event to listen.
	 * @returns this
	 */
	listen(event: Listenable<any>): this {
		return this.owning(event.listen(this.update, this));
	}

	/**
	 * Watches specified property and issues callback calls on its change.
	 * @param property Bindable to watch.
	 * @returns this
	 */
	bind(property: Bindable<any>): this {
		return this.listen(property.changeEvent);
	}

	/**
	 * Calls callbacks forcibly.
	 */
	update() {
		this._doDone();
		this._doInit();
	}

	private _doInit() {
		const values = this.sources.map((source) => source.get());
		this._sourceValues = (this._acceptNull || values.every(isNotNil)) ? values : null;
		if (this._sourceValues && this._init) {
			this._init.apply(this._scope, this._sourceValues);
		}
	}

	private _doDone() {
		if (this._sourceValues && this._done) {
			this._done.apply(this._scope, this._sourceValues);
		}
		this._sourceValues = null;
	}
}

namespace Switcher {
	/**
	 * Switcher callback.
	 */
	export interface Callback {
		(...sourceValues: any[]): any;
	}

	/**
	 * Configuration of Switcher.
	 */
	export interface Config {
		/**
		 * Value initialization callback.
		 */
		readonly init?: Callback;

		/**
		 * Value releasing callback.
		 */
		readonly done?: Callback;

		/**
		 * `init` and `done` call scope. Defaults to switcher itself.
		 */
		readonly scope?: any;

		/**
		 * Set to true if you want the callbacks to be called even if one of source values is null.
		 */
		readonly acceptNull?: boolean;
	}
}

export default Switcher;
