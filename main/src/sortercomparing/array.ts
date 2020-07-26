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

import DestroyableReadonlyBindableArray from '../DestroyableReadonlyBindableArray';
import IBindableArray from '../IBindableArray';
import BindableArray from '../BindableArray';
import ReadonlyBindableArray from '../ReadonlyBindableArray';
import AbstractSorterComparing from './AbstractSorterComparing';

/**
 * AbstractSorterComparing implementation for arrays.
 */
export default class ArraySorterComparing<T> extends AbstractSorterComparing<T> {
	/**
	 * @param source Source array.
	 * @param config Sorter configuration.
	 */
	constructor(readonly source: ReadonlyBindableArray<T>, config?: AbstractSorterComparing.FullConfig<T>) {
		super(config, source.getKey, source.silent);
		this._splice([], source.asArray());
		this.own(source.onSplice.listen(this._onSplice, this));
		this.own(source.onReplace.listen(this._onReplace, this));
		this.own(source.onClear.listen(this._onClear, this));
	}

	/**
	 * @inheritDoc
	 */
	protected destroyObject() {
		this._splice(this.source.asArray(), []);
		super.destroyObject();
	}

	private _onSplice(message: IBindableArray.SpliceMessage<T>) {
		var spliceResult = message.spliceResult;
		this._splice(spliceResult.removedItems, spliceResult.addedItems);
	}

	private _onReplace(message: IBindableArray.ReplaceMessage<T>) {
		this._splice([message.oldItem], [message.newItem]);
	}

	private _onClear(message: IBindableArray.MessageWithItems<T>) {
		this._splice(message.items, []);
	}
}

/**
 * Sorts an array and starts synchronization.
 * @param source Source array.
 * @param config Sorter configuration.
 * @returns Sorted array.
 */
export function sortArrayComparing<T>(source: ReadonlyBindableArray<T>,
									  config?: AbstractSorterComparing.Config<T>): DestroyableReadonlyBindableArray<T> {
	if (source.silent) {
		return source.toSortedComparing(config.compare, config.scope, config.order);
	}
	const target = new BindableArray<T>(source.getKey);
	return target.owning(new ArraySorterComparing<T>(source, {
		target,
		compare: config.compare,
		scope: config.scope,
		order: config.order
	}));
}
