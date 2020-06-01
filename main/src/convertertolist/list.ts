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
import IndexCount from '../IndexCount';
import IndexItems from '../IndexItems';
import {VidSet} from '../internal';
import List from '../List';
import ReadonlyList from '../ReadonlyList';
import AbstractConverterToList from './AbstractConverterToList';

/**
 * AbstractConverterToList implementation for List.
 */
export default class ListConverterToList<T> extends AbstractConverterToList<T> {
	/**
	 * Source list.
	 */
	readonly source: ReadonlyList<T>;

	/**
	 * @param source Source list.
	 * @param config Converter configuration.
	 */
	constructor(source: ReadonlyList<T>, config: AbstractConverterToList.Config<T>) {
		super(source, config);
		this.own(source.spliceEvent.listen(this._onSplice, this));
		this.own(source.replaceEvent.listen(this._onReplace, this));
		this.own(source.clearEvent.listen(this._onClear, this));
	}

	private _onSplice(params: IList.SpliceEventParams<T>) {
		const spliceResult = params.spliceResult;
		this._splice(
			VidSet.fromArray<T>(spliceResult.removedItems, this.source.getKey),
			VidSet.fromArray<T>(spliceResult.addedItems, this.source.getKey));
	}

	private _onReplace(params: IList.ReplaceEventParams<T>) {
		const index = this.target.indexOf(params.oldItem);
		this._target.trySplice(
			[new IndexCount(index, 1)],
			[new IndexItems(this.target.length.get() - 1, [params.newItem])]);
	}

	private _onClear(params: IList.ItemsEventParams<T>) {
		this._target.removeItems(params.items);
	}
}

/**
 * Creates a copy of a list and starts synchronization.
 * @param source Source list.
 * @returns Target list.
 */
export function listToList<T>(source: ReadonlyList<T>): DestroyableReadonlyList<T> {
	if (source.silent) {
		return source.toList();
	}
	const target = new List<T>(source.getKey);
	return target.owning(new ListConverterToList<T>(source, {target}));
}
