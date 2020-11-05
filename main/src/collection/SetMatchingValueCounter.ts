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

import Bindable from "../Bindable";
import Class from "../Class";
import DestroyableBindable from '../DestroyableBindable';
import IBindableSet from '../IBindableSet';
import IProperty from "../IProperty";
import {count} from "../IterableUtils";
import Property from '../Property';
import ReadonlyBindableSet from '../ReadonlyBindableSet';

/**
 * Set matching value counter. Builds a new Property containing number of set values the callback
 * returns a truthy value for, and starts continuous synchronization.
 */
export default class SetMatchingValueCounter<T> extends Class {

	private _targetCreated: boolean;
	private _target: IProperty<number>;

	/**
	 * @param source Source set.
	 * @param test Filtering criteria.
	 * @param config Counter configuration.
	 */
	constructor(readonly source: ReadonlyBindableSet<T>, private test: (value: T) => boolean,
				config: SetMatchingValueCounter.Config = {}) {
		super();
		this._targetCreated = config.target == null;
		this._target = this._targetCreated ? new Property<number>(0) : config.target;
		this.recount();
		this.own(source.onSplice.listen(this._onSplice, this));
		this.own(source.onClear.listen(this._onClear, this));
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
	 * Changes counter configuration and recounts matching values.
	 * @param config Options to modify.
	 */
	reconfigure(config: SetMatchingValueCounter.Reconfig<T>) {
		this.test = config.test ?? this.test;
		this.recount();
	}

	/**
	 * Recounts matching values. Call this method when set value properties change in such a way that
	 * they must be retested.
	 */
	recount() {
		this._target.set(count(this.source, this.test));
	}

	private _onSplice(spliceResult: IBindableSet.SpliceResult<T>) {
		this._target.set(this._target.get() -
			count(spliceResult.removedValues, this.test) +
			count(spliceResult.addedValues, this.test));
	}

	private _onClear() {
		this._target.set(0);
	}
}

namespace SetMatchingValueCounter {
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
		readonly test?: (value: T) => boolean;
	}
}

/**
 * Counts matching values in a set and starts synchronization.
 * @param source Source set.
 * @param test Filtering criteria.
 * @returns Target property.
 */
export function countSet<T>(source: ReadonlyBindableSet<T>, test: (value: T) => boolean): DestroyableBindable<number> {
	if (source.silent) {
		return new Property(count(source, test), true);
	}
	const target = new Property(0);
	return target.owning(new SetMatchingValueCounter<T>(source, test, {target}));
}
