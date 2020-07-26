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
import IBindableArray from '../IBindableArray';
import ReadonlyBindableArray from '../ReadonlyBindableArray';
import BindableSet from '../BindableSet';
import AbstractConverterToSet from './AbstractConverterToSet';

/**
 * AbstractConverterToSet implementation for arrays.
 */
export default class ArrayConverterToSet<T> extends AbstractConverterToSet<T> {
	/**
	 * @param source Source array.
	 * @param config Converter configuration.
	 */
	constructor(readonly source: ReadonlyBindableArray<T>, config: AbstractConverterToSet.Config<T>) {
		super(config, source.getKey, source.silent);
		this._target.tryAddAll(source.items);
		this.own(source.onSplice.listen(this._onSplice, this));
		this.own(source.onReplace.listen(this._onReplace, this));
		this.own(source.onClear.listen(this._onClear, this));
	}

	/**
	 * @inheritDoc
	 */
	protected destroyObject() {
		this._target.removeItems(this.source.items);
		super.destroyObject();
	}

	private _onSplice(message: IBindableArray.SpliceMessage<T>) {
		var spliceResult = message.spliceResult;
		this._target.trySplice(spliceResult.removedItems, spliceResult.addedItems);
	}

	private _onReplace(message: IBindableArray.ReplaceMessage<T>) {
		this._target.trySplice([message.oldItem], [message.newItem]);
	}

	private _onClear(message: IBindableArray.MessageWithItems<T>) {
		this._target.tryRemoveAll(message.items);
	}
}

/**
 * Converts an array to a set and starts synchronization.
 * @param source Source array.
 * @returns Target set.
 */
export function arrayToSet<T>(source: ReadonlyBindableArray<T>): DestroyableReadonlyBindableSet<T> {
	if (source.silent) {
		return source.toSet();
	}
	const target = new BindableSet<T>(source.getKey);
	return target.owning(new ArrayConverterToSet<T>(source, {target}));
}