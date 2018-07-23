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

import Bindable from '../Bindable';
import Class from '../Class';
import IProperty from '../IProperty';
import Property from '../Property';
import ReadonlyCollection from '../ReadonlyCollection';

/**
 * Abstract collection item counter. Builds a new Property containing number of collection items the callback
 * returns truthy value for, and starts continuous synchronization.
 * @param T Collection item type.
 */
abstract class AbstractCounter<T> extends Class {
	private _targetCreated: boolean;

	/**
	 * @hidden
	 */
	protected _scope: any;

	/**
	 * @hidden
	 */
	protected _target: IProperty<number>;

	/**
	 * @param source Source collection.
	 * @param _test Filtering criteria.
	 * @param config Counter configuration.
	 */
	constructor(readonly source: ReadonlyCollection<T>, protected _test: (item: T) => any,
				config: AbstractCounter.Config = {}) {
		super();
		this._scope = config.scope || this;
		this._targetCreated = config.target == null;
		this._target = this._targetCreated ? new Property<number>(0) : config.target;
		this._target.set(source.count(this._test, this._scope));
	}

	/**
	 * Target property.
	 */
	get target(): Bindable<number> {
		return this._target;
	}

	/**
	 * @inheritDoc
	 */
	protected destroyObject() {
		this._target.set(0);
		if (this._targetCreated) {
			this._target.destroy();
		}
		this._test = null;
		this._target = null;
		this._scope = null;
		super.destroyObject();
	}

	/**
	 * Changes counter configuration and recounts matching items.
	 * @param config Options to modify.
	 */
	reconfigure(config: AbstractCounter.Reconfig<T>) {
		this._test = config.test || this._test;
		this._scope = config.scope || this._scope;
		this.recount();
	}

	/**
	 * Recounts matching items. Call this method when collection item properties change the way that
	 * they must be refiltered.
	 */
	recount() {
		this._target.set(this.source.count(this._test, this._scope));
	}
}

export default AbstractCounter;

namespace AbstractCounter {
	/**
	 * AbstractCounter configuration.
	 * @param T Collection item type.
	 */
	export interface Config {
		/**
		 * Call scope of counter's `test` callback. Defaults to the synchronizer itself.
		 */
		readonly scope?: any;

		/**
		 * Target property. By default, created automatically.
		 */
		readonly target?: IProperty<number>;
	}

	/**
	 * AbstractCounter.reconfigure method configuration.
	 * @param T Collection item type.
	 */
	export interface Reconfig<T> {
		/**
		 * Filtering criteria.
		 */
		readonly test?: (item: T) => any;

		/**
		 * Call scope of counter's `test` callback.
		 */
		readonly scope?: any;
	}
}
