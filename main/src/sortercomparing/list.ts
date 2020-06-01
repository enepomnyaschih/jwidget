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

import DestroyableReadonlyList from '../DestroyableReadonlyList';
import IList from '../IList';
import List from '../List';
import ReadonlyList from '../ReadonlyList';
import AbstractSorterComparing from './AbstractSorterComparing';

/**
 * AbstractSorterComparing implementation for List.
 */
export default class ListSorterComparing<T> extends AbstractSorterComparing<T> {
	/**
	 * Source list.
	 */
	readonly source: ReadonlyList<T>;

	/**
	 * @param source Source list.
	 * @param config Sorter configuration.
	 */
	constructor(source: ReadonlyList<T>, config?: AbstractSorterComparing.FullConfig<T>) {
		super(source, config);
		this.own(source.spliceEvent.listen(this._onSplice, this));
		this.own(source.replaceEvent.listen(this._onReplace, this));
		this.own(source.clearEvent.listen(this._onClear, this));
	}

	private _onSplice(params: IList.SpliceEventParams<T>) {
		var spliceResult = params.spliceResult;
		this._splice(spliceResult.removedItems, spliceResult.addedItems);
	}

	private _onReplace(params: IList.ReplaceEventParams<T>) {
		this._splice([params.oldItem], [params.newItem]);
	}

	private _onClear(params: IList.ItemsEventParams<T>) {
		this._splice(params.items, []);
	}
}

/**
 * Sorts a list and starts synchronization.
 * @param source Source list.
 * @param config Sorter configuration.
 * @returns Sorted list.
 */
export function sortListComparing<T>(source: ReadonlyList<T>,
                                     config?: AbstractSorterComparing.Config<T>): DestroyableReadonlyList<T> {
	if (source.silent) {
		return source.toSortedComparing(config.compare, config.scope, config.order);
	}
	const target = new List<T>(source.getKey);
	return target.owning(new ListSorterComparing<T>(source, {
		target,
		compare: config.compare,
		scope: config.scope,
		order: config.order
	}));
}
