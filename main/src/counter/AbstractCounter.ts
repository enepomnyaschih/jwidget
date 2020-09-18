/*
MIT License

Copyright (c) 2020 Egor Nepomnyaschih

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

import Bindable from '../Bindable';
import Class from '../Class';
import IProperty from '../IProperty';
import Property from '../Property';

/**
 * Abstract collection item counter. Builds a new Property containing number of collection items the callback
 * returns truthy value for, and starts continuous synchronization.
 */
abstract class AbstractCounter<T> extends Class {

	private _targetCreated: boolean;

	protected _target: IProperty<number>;

	/**
	 * @param test Filtering criteria.
	 * @param config Counter configuration.
	 */
	protected constructor(protected test: (item: T) => boolean, config: AbstractCounter.Config = {}) {
		super();
		this._targetCreated = config.target == null;
		this._target = this._targetCreated ? new Property<number>(0) : config.target;
		this.recount();
	}

	/**
	 * Target property.
	 */
	get target(): Bindable<number> {
		return this._target;
	}

	protected destroyObject() {
		this._target.set(0);
		if (this._targetCreated) {
			this._target.destroy();
		}
		this.test = null;
		this._target = null;
		super.destroyObject();
	}

	/**
	 * Changes counter configuration and recounts matching items.
	 * @param config Options to modify.
	 */
	reconfigure(config: AbstractCounter.Reconfig<T>) {
		this.test = config.test ?? this.test;
		this.recount();
	}

	/**
	 * Recounts matching items. Call this method when collection item properties change the way that
	 * they must be refiltered.
	 */
	abstract recount(): void;
}

export default AbstractCounter;

namespace AbstractCounter {
	/**
	 * AbstractCounter configuration.
	 */
	export interface Config {
		/**
		 * Target property. By default, created automatically.
		 */
		readonly target?: IProperty<number>;
	}

	/**
	 * AbstractCounter.reconfigure method configuration.
	 */
	export interface Reconfig<T> {
		/**
		 * Filtering criteria.
		 */
		readonly test?: (item: T) => boolean;
	}
}
