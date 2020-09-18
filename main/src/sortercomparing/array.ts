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

import BindableArray from '../BindableArray';
import DestroyableReadonlyBindableArray from '../DestroyableReadonlyBindableArray';
import IBindableArray from '../IBindableArray';
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
		super(config, source.silent);
		this._splice([], source.native);
		this.own(source.onSplice.listen(this._onSplice, this));
		this.own(source.onReplace.listen(this._onReplace, this));
		this.own(source.onClear.listen(this._onClear, this));
	}

	protected destroyObject() {
		this._splice(this.source.native, []);
		super.destroyObject();
	}

	private _onSplice(spliceResult: IBindableArray.SpliceResult<T>) {
		this._splice(spliceResult.removedItems, spliceResult.addedItems);
	}

	private _onReplace(message: IBindableArray.ReplaceMessage<T>) {
		this._splice([message.oldValue], [message.newValue]);
	}

	private _onClear(oldContents: readonly T[]) {
		this._splice(oldContents, []);
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
		return new BindableArray(source.native.concat().sort((x, y) => config.order * config.compare(x, y)), true);
	}
	const target = new BindableArray<T>();
	return target.owning(new ArraySorterComparing<T>(source, {
		target,
		compare: config.compare,
		order: config.order
	}));
}
