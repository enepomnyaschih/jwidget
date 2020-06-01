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
import IList from '../IList';
import Property from '../Property';
import ReadonlyList from '../ReadonlyList';
import AbstractCounter from './AbstractCounter';

/**
 * AbstractCounter implementation for List.
 */
export default class ListCounter<T> extends AbstractCounter<T> {
	/**
	 * Source list.
	 */
	readonly source: ReadonlyList<T>;

	/**
	 * @param source Source list.
	 * @param test Filtering criteria.
	 * @param config Counter configuration.
	 */
	constructor(source: ReadonlyList<T>, test: (item: T) => any, config?: AbstractCounter.Config) {
		super(source, test, config);
		this.own(source.spliceEvent.listen(this._onSplice, this));
		this.own(source.replaceEvent.listen(this._onReplace, this));
		this.own(source.clearEvent.listen(this._onClear, this));
	}

	private _onSplice(params: IList.SpliceEventParams<T>) {
		var spliceResult = params.spliceResult;
		var value = this._target.get();
		spliceResult.removedItemsList.forEach((indexItems) => {
			value -= ArrayUtils.count(indexItems.items, this._test, this._scope);
		});
		spliceResult.addedItemsList.forEach((indexItems) => {
			value += ArrayUtils.count(indexItems.items, this._test, this._scope);
		});
		this._target.set(value);
	}

	private _onReplace(params: IList.ReplaceEventParams<T>) {
		var oldFiltered = this._test.call(this._scope, params.oldItem);
		var newFiltered = this._test.call(this._scope, params.newItem);
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
 * Counts matching items in a list and starts synchronization.
 * @param source Source list.
 * @param test Filtering criteria.
 * @param scope Call scope of `test` function.
 * @returns Target property.
 */
export function countList<T>(source: ReadonlyList<T>, test: (item: T) => any,
                             scope?: any): DestroyableBindable<number> {
	if (source.silent) {
		return new Property(source.count(test, scope), true);
	}
	const target = new Property(0);
	return target.owning(new ListCounter<T>(source, test, {target, scope}));
}
