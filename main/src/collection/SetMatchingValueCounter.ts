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
 * Binds a `Property` to a set, assigning it to the number of values a function returns a truthy value for.
 */
export default class SetMatchingValueCounter<T> extends Class {

	private _targetCreated: boolean;
	private _target: IProperty<number>;
	private _matchingFromThisSource = 0;

	/**
	 * @param source Source set.
	 * @param test Criteria.
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
		this._onClear();
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
		const matching = this._matchingFromThisSource;
		this._matchingFromThisSource = count(this.source, this.test);
		this._target.set(this._target.get() + this._matchingFromThisSource - matching);
	}

	private _onSplice(spliceResult: IBindableSet.SpliceResult<T>) {
		const diff = count(spliceResult.deletedValues, this.test) - count(spliceResult.addedValues, this.test);
		this._matchingFromThisSource -= diff;
		this._target.set(this._target.get() - diff);
	}

	private _onClear() {
		const matching = this._matchingFromThisSource;
		this._matchingFromThisSource = 0;
		this._target.set(this._target.get() - matching);
	}
}

namespace SetMatchingValueCounter {
	/**
	 * Configuration of `SetMatchingValueCounter`.
	 */
	export interface Config {
		/**
		 * Target property. By default, created automatically.
		 */
		readonly target?: IProperty<number>;
	}

	/**
	 * Configuration of `SetMatchingValueCounter.reconfigure` method.
	 */
	export interface Reconfig<T> {
		/**
		 * Criteria.
		 */
		readonly test?: (value: T) => boolean;
	}
}

/**
 * Creates a new property bound to a set with `SetMatchingValueCounter`.
 * @param source Source set.
 * @param test Criteria.
 * @returns Target property.
 */
export function startCountingMatchingSetValues<T>(source: ReadonlyBindableSet<T>,
												  test: (value: T) => boolean): DestroyableBindable<number> {
	if (source.silent) {
		return new Property(count(source, test), true);
	}
	const target = new Property(0);
	return target.owning(new SetMatchingValueCounter<T>(source, test, {target}));
}
