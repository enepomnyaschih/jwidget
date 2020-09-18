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
import IBindableSet from '../IBindableSet';
import ReadonlyBindableSet from '../ReadonlyBindableSet';
import AbstractSorterComparing from './AbstractSorterComparing';

/**
 * AbstractSorterComparing implementation for Set.
 */
export default class SetSorterComparing<T> extends AbstractSorterComparing<T> {
	/**
	 * @param source Source set.
	 * @param config Sorter configuration.
	 */
	constructor(readonly source: ReadonlyBindableSet<T>, config?: AbstractSorterComparing.FullConfig<T>) {
		super(config, source.silent);
		this._splice([], source.native);
		this.own(source.onSplice.listen(this._onSplice, this));
		this.own(source.onClear.listen(this._onClear, this));
	}

	protected destroyObject() {
		this._splice(this.source, []);
		super.destroyObject();
	}

	private _onSplice(spliceResult: IBindableSet.SpliceResult<T>) {
		this._splice(spliceResult.removedValues, spliceResult.addedValues);
	}

	private _onClear(oldContents: ReadonlySet<T>) {
		this._splice(oldContents, []);
	}
}

/**
 * Sorts a set and starts synchronization.
 * @param source Source set.
 * @param config Sorter configuration.
 * @returns Sorted list.
 */
export function sortSetComparing<T>(source: ReadonlyBindableSet<T>,
									config?: AbstractSorterComparing.Config<T>): DestroyableReadonlyBindableArray<T> {
	if (source.silent) {
		return new BindableArray([...source].sort((x, y) => config.order * config.compare(x, y)), true);
	}
	const target = new BindableArray<T>();
	return target.owning(new SetSorterComparing<T>(source, {
		target,
		compare: config.compare,
		order: config.order
	}));
}
