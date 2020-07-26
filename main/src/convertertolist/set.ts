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
import {VidSet} from '../internal';
import ISet from '../ISet';
import List from '../List';
import ReadonlySet from '../ReadonlySet';
import AbstractConverterToList from './AbstractConverterToList';

/**
 * AbstractConverterToList implementation for Set.
 */
export default class SetConverterToList<T> extends AbstractConverterToList<T> {
	/**
	 * Source set.
	 */
	readonly source: ReadonlySet<T>;

	/**
	 * @param source Source set.
	 * @param config Converter configuration.
	 */
	constructor(source: ReadonlySet<T>, config: AbstractConverterToList.Config<T>) {
		super(source, config);
		this.own(source.onSplice.listen(this._onSplice, this));
		this.own(source.onClear.listen(this._onClear, this));
	}

	private _onSplice(message: ISet.SpliceMessage<T>) {
		var spliceResult = message.spliceResult;
		this._splice(
			VidSet.fromArray<T>(spliceResult.removedItems, this.source.getKey),
			VidSet.fromArray<T>(spliceResult.addedItems, this.source.getKey));
	}

	private _onClear(message: ISet.MessageWithItems<T>) {
		this._target.removeItems(message.items);
	}
}

/**
 * Converts a set to a list and starts synchronization.
 * @param source Source set.
 * @returns Target list.
 */
export function setToList<T>(source: ReadonlySet<T>): DestroyableReadonlyList<T> {
	if (source.silent) {
		return source.toList();
	}
	const target = new List<T>(source.getKey);
	return target.owning(new SetConverterToList<T>(source, {target}));
}
