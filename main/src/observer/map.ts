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

import * as DictionaryUtils from '../DictionaryUtils';
import IMap from '../IMap';
import ReadonlyMap from '../ReadonlyMap';
import AbstractObserver from './AbstractObserver';

/**
 * AbstractObserver implementation for Map.
 */
export default class MapObserver<T> extends AbstractObserver<T> {
	/**
	 * Source map.
	 */
	readonly source: ReadonlyMap<T>;

	/**
	 * @param source Source map.
	 * @param config Observer configuration.
	 */
	constructor(source: ReadonlyMap<T>, config: AbstractObserver.Config<T>) {
		super(source, config);
		this.own(source.onSplice.listen(this._onSplice, this));
		this.own(source.onClear.listen(this._onClear, this));
	}

	private _onSplice(message: IMap.SpliceMessage<T>) {
		var spliceResult = message.spliceResult;
		this._removeItems(DictionaryUtils.toArray(spliceResult.removedItems));
		this._addItems(DictionaryUtils.toArray(spliceResult.addedItems));
	}

	private _onClear(message: IMap.MessageWithItems<T>) {
		this._doClearItems(DictionaryUtils.toArray(message.items));
	}
}
