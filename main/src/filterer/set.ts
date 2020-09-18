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

import DestroyableReadonlyBindableSet from '../DestroyableReadonlyBindableSet';
import IBindableSet from '../IBindableSet';
import {filter} from "../IterableUtils";
import ReadonlyBindableSet from '../ReadonlyBindableSet';
import BindableSet from '../BindableSet';
import AbstractFilterer from './AbstractFilterer';

/**
 * AbstractFilterer implementation for sets.
 */
class SetFilterer<T> extends AbstractFilterer<T> {

	readonly target: IBindableSet<T>;

	/**
	 * @param source Source set.
	 * @param test Filtering criteria.
	 * @param config Filterer configuration.
	 */
	constructor(readonly source: ReadonlyBindableSet<T>, test: (value: T) => boolean,
				config: SetFilterer.Config<T> = {}) {
		super(test);
		this.target = config.target ?? this.own(new BindableSet<T>(this.source.silent));
		this.target.tryAddAll(filter(source, this.test));
		this.own(source.onSplice.listen(this._onSplice, this));
		this.own(source.onClear.listen(this._onClear, this));
	}

	protected destroyObject() {
		this.target.tryDeleteAll(this.source);
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
export function filterSet<T>(source: ReadonlyBindableSet<T>,
							 test: (value: T) => boolean): DestroyableReadonlyBindableSet<T> {
	if (source.silent) {
		return new BindableSet(filter(source, test));
	}
	const target = new BindableSet<T>();
	return target.owning(new SetFilterer<T>(source, test, {target}));
}
