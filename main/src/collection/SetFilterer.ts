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

import BindableSet from '../BindableSet';
import Class from "../Class";
import DestroyableReadonlyBindableSet from '../DestroyableReadonlyBindableSet';
import IBindableSet from '../IBindableSet';
import {filter} from "../IterableUtils";
import ReadonlyBindableSet from '../ReadonlyBindableSet';

/**
 * Map filterer. Builds a new map consisting of values the callback function returns a truthy value for, and
 * starts continuous synchronization. Preserves value keys.
 */
class SetFilterer<T> extends Class {

	private _targetCreated: boolean;

	/**
	 * Target set.
	 */
	readonly target: IBindableSet<T>;

	/**
	 * @param source Source set.
	 * @param test Filtering criteria.
	 * @param config Filterer configuration.
	 */
	constructor(readonly source: ReadonlyBindableSet<T>, private test: (value: T) => boolean,
				config: SetFilterer.Config<T> = {}) {
		super();
		this._targetCreated = config.target == null;
		this.target = this._targetCreated ? new BindableSet<T>(this.source.silent) : config.target;
		this.target.tryAddAll(filter(source, this.test));
		this.own(source.onSplice.listen(this._onSplice, this));
		this.own(source.onClear.listen(this._onClear, this));
	}

	protected destroyObject() {
		this.target.tryDeleteAll(this.source);
		if (this._targetCreated) {
			this.target.destroy();
		}
		this.test = null;
		super.destroyObject();
	}

	private _onSplice(spliceResult: IBindableSet.SpliceResult<T>) {
		this.target.trySplice(
			spliceResult.removedValues,
			filter(spliceResult.addedValues, this.test));
	}

	private _onClear(oldContents: ReadonlySet<T>) {
		this.target.tryDeleteAll(oldContents);
	}
}

export default SetFilterer;

namespace SetFilterer {
	/**
	 * SetFilterer configuration.
	 */
	export interface Config<T> {
		/**
		 * Target set.
		 */
		readonly target?: IBindableSet<T>;
	}
}

/**
 * Filters a set and starts synchronization.
 * @param source Source set.
 * @param test Filtering criteria.
 * @returns Target set.
 */
export function startFilteringSet<T>(source: ReadonlyBindableSet<T>,
									 test: (value: T) => boolean): DestroyableReadonlyBindableSet<T> {
	if (source.silent) {
		return new BindableSet(filter(source, test));
	}
	const target = new BindableSet<T>();
	return target.owning(new SetFilterer<T>(source, test, {target}));
}
