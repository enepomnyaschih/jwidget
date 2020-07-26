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

import * as ArrayUtils from '../ArrayUtils';
import DestroyableBindable from '../DestroyableBindable';
import IBindableArray from '../IBindableArray';
import Property from '../Property';
import ReadonlyBindableArray from '../ReadonlyBindableArray';
import AbstractCounter from './AbstractCounter';

/**
 * AbstractCounter implementation for arrays.
 */
export default class ArrayCounter<T> extends AbstractCounter<T> {
	/**
	 * Source array.
	 */
	readonly source: ReadonlyBindableArray<T>;

	/**
	 * @param source Source array.
	 * @param test Filtering criteria.
	 * @param config Counter configuration.
	 */
	constructor(source: ReadonlyBindableArray<T>, test: (item: T) => any, config?: AbstractCounter.Config) {
		super(source, test, config);
		this.own(source.onSplice.listen(this._onSplice, this));
		this.own(source.onReplace.listen(this._onReplace, this));
		this.own(source.onClear.listen(this._onClear, this));
	}

	private _onSplice(message: IBindableArray.SpliceMessage<T>) {
		var spliceResult = message.spliceResult;
		var value = this._target.get();
		spliceResult.removedSegments.forEach((indexItems) => {
			value -= ArrayUtils.count(indexItems.items, this._test, this._scope);
		});
		spliceResult.addedSegments.forEach((indexItems) => {
			value += ArrayUtils.count(indexItems.items, this._test, this._scope);
		});
		this._target.set(value);
	}

	private _onReplace(message: IBindableArray.ReplaceMessage<T>) {
		var oldFiltered = this._test.call(this._scope, message.oldItem);
		var newFiltered = this._test.call(this._scope, message.newItem);
		if (oldFiltered && !newFiltered) {
			this._target.set(this._target.get() - 1);
		} else if (!oldFiltered && newFiltered) {
			this._target.set(this._target.get() + 1);
		}
	}

	private _onClear() {
		this._target.set(0);
	}
}

/**
 * Counts matching items in an array and starts synchronization.
 * @param source Source array.
 * @param test Filtering criteria.
 * @param scope Call scope of `test` function.
 * @returns Target property.
 */
export function countArray<T>(source: ReadonlyBindableArray<T>, test: (item: T) => any,
							  scope?: any): DestroyableBindable<number> {
	if (source.silent) {
		return new Property(source.count(test, scope), true);
	}
	const target = new Property(0);
	return target.owning(new ArrayCounter<T>(source, test, {target, scope}));
}
