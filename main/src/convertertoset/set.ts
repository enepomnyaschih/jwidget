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
import ReadonlyBindableSet from '../ReadonlyBindableSet';
import BindableSet from '../BindableSet';
import AbstractConverterToSet from './AbstractConverterToSet';

/**
 * AbstractConverterToSet implementation for sets.
 */
export default class SetConverterToSet<T> extends AbstractConverterToSet<T> {
	/**
	 * @param source Source set.
	 * @param config Converter configuration.
	 */
	constructor(readonly source: ReadonlyBindableSet<T>, config: AbstractConverterToSet.Config<T>) {
		super(config, source.getKey, source.silent);
		this._target.tryAddAll(source.toArray());
		this.own(source.onSplice.listen(this._onSplice, this));
		this.own(source.onClear.listen(this._onClear, this));
	}

	/**
	 * @inheritDoc
	 */
	protected destroyObject() {
		this._target.removeItems(this.source.toArray());
		super.destroyObject();
	}

	private _onSplice(message: IBindableSet.SpliceMessage<T>) {
		var spliceResult = message.spliceResult;
		this._target.trySplice(spliceResult.removedItems, spliceResult.addedItems);
	}

	private _onClear(message: IBindableSet.MessageWithItems<T>) {
		this._target.tryRemoveAll(message.items);
	}
}

/**
 * Creates a copy of a set and starts synchronization.
 * @param source Source set.
 * @returns Target set.
 */
export function setToSet<T>(source: ReadonlyBindableSet<T>): DestroyableReadonlyBindableSet<T> {
	if (source.silent) {
		return source.clone();
	}
	const target = new BindableSet<T>(source.getKey);
	return target.owning(new SetConverterToSet<T>(source, {target}));
}
