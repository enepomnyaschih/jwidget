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
import * as DictionaryUtils from '../DictionaryUtils';
import IMap from '../IMap';
import List from '../List';
import ReadonlyMap from '../ReadonlyMap';
import AbstractSorterComparing from './AbstractSorterComparing';

/**
 * AbstractSorterComparing implementation for Map.
 */
export default class MapSorterComparing<T> extends AbstractSorterComparing<T> {
	/**
	 * Source map.
	 */
	readonly source: ReadonlyMap<T>;

	/**
	 * @param source Source map.
	 * @param config Sorter configuration.
	 */
	constructor(source: ReadonlyMap<T>, config?: AbstractSorterComparing.FullConfig<T>) {
		super(source, config);
		this.own(source.onSplice.listen(this._onSplice, this));
		this.own(source.onClear.listen(this._onClear, this));
	}

	private _onSplice(params: IMap.SpliceMessage<T>) {
		var spliceResult = params.spliceResult;
		this._splice(
			DictionaryUtils.toArray(spliceResult.removedItems),
			DictionaryUtils.toArray(spliceResult.addedItems));
	}

	private _onClear(params: IMap.MessageWithItems<T>) {
		this._splice(DictionaryUtils.toArray(params.items), []);
	}
}

/**
 * Sorts a map and starts synchronization.
 * @param source Source map.
 * @param config Sorter configuration.
 * @returns Sorted list.
 */
export function sortMapComparing<T>(source: ReadonlyMap<T>,
                                    config?: AbstractSorterComparing.Config<T>): DestroyableReadonlyList<T> {
	if (source.silent) {
		return source.toSortedComparing(config.compare, config.scope, config.order);
	}
	const target = new List<T>(source.getKey);
	return target.owning(new MapSorterComparing<T>(source, {
		target,
		compare: config.compare,
		scope: config.scope,
		order: config.order
	}));
}
