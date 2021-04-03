/*
MIT License

Copyright (c) 2021 Egor Nepomnyaschih

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
import DestroyableReadonlyBindableSet from '../DestroyableReadonlyBindableSet';
import IBindableArray from '../IBindableArray';
import ReadonlyBindableArray from '../ReadonlyBindableArray';
import AbstractValueCollector from './AbstractValueCollector';

/**
 * `AbstractValueCollector` implementation for arrays.
 */
export default class ArrayValueCollector<T> extends AbstractValueCollector<T> {

	/**
	 * @param source Source array.
	 * @param config Collector configuration.
	 */
	constructor(readonly source: ReadonlyBindableArray<T>, config?: AbstractValueCollector.Config<T>) {
		super(config, source.silent);
		this._target.tryAddAll(source);
		this.own(source.onSplice.listen(this._onSplice, this));
		this.own(source.onReplace.listen(this._onReplace, this));
		this.own(source.onClear.listen(this._onClear, this));
	}

	protected destroyObject() {
		this._target.tryDeleteAll(this.source);
		super.destroyObject();
	}

	private _onSplice(spliceResult: IBindableArray.SpliceResult<T>) {
		this._target.trySplice(spliceResult.removedItems, spliceResult.addedItems);
	}

	private _onReplace(message: IBindableArray.ReplaceMessage<T>) {
		this._target.trySplice([message.oldValue], [message.newValue]);
	}

	private _onClear(oldContents: readonly T[]) {
		this._target.tryDeleteAll(oldContents);
	}
}

/**
 * Creates a new set bound to an array with `ArrayValueCollector`.
 * @param source Source array.
 * @returns Target set.
 */
export function startCollectingArrayValues<T>(source: ReadonlyBindableArray<T>): DestroyableReadonlyBindableSet<T> {
	if (source.silent) {
		return new BindableSet(source, true);
	}
	const target = new BindableSet<T>();
	return target.owning(new ArrayValueCollector<T>(source, {target}));
}
