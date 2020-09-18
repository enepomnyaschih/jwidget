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

import DestroyableBindable from '../DestroyableBindable';
import IBindableArray from '../IBindableArray';
import {count} from "../IterableUtils";
import Property from '../Property';
import ReadonlyBindableArray from '../ReadonlyBindableArray';
import AbstractCounter from './AbstractCounter';

/**
 * AbstractCounter implementation for arrays.
 */
export default class ArrayCounter<T> extends AbstractCounter<T> {

	/**
	 * @param source Source array.
	 * @param test Filtering criteria.
	 * @param config Counter configuration.
	 */
	constructor(readonly source: ReadonlyBindableArray<T>, test: (item: T) => boolean, config?: AbstractCounter.Config) {
		super(test, config);
		this.own(source.onSplice.listen(this._onSplice, this));
		this.own(source.onReplace.listen(this._onReplace, this));
		this.own(source.onClear.listen(this._onClear, this));
	}

	recount() {
		this._target.set(count(this.source, this.test));
	}

	private _onSplice(spliceResult: IBindableArray.SpliceResult<T>) {
		let value = this._target.get();
		spliceResult.removedSegments.forEach(indexItems => {
			value -= count(indexItems.items, this.test);
		});
		spliceResult.addedSegments.forEach((indexItems) => {
			value += count(indexItems.items, this.test);
		});
		this._target.set(value);
	}

	private _onReplace(message: IBindableArray.ReplaceMessage<T>) {
		this._target.set(this._target.get() -
			(this.test(message.oldValue) ? 1 : 0) +
			(this.test(message.newValue) ? 1 : 0));
	}

	private _onClear() {
		this._target.set(0);
	}
}

/**
 * Counts matching items in an array and starts synchronization.
 * @param source Source array.
 * @param test Filtering criteria.
 * @returns Target property.
 */
export function countArray<T>(source: ReadonlyBindableArray<T>,
							  test: (item: T) => boolean): DestroyableBindable<number> {
	if (source.silent) {
		return new Property(count(source, test), true);
	}
	const target = new Property(0);
	return target.owning(new ArrayCounter<T>(source, test, {target}));
}
