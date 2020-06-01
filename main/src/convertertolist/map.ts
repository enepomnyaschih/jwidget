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
import {VidSet} from '../internal';
import List from '../List';
import ReadonlyMap from '../ReadonlyMap';
import AbstractConverterToList from './AbstractConverterToList';

/**
 * AbstractConverterToList implementation for Map.
 */
export default class MapConverterToList<T> extends AbstractConverterToList<T> {
	/**
	 * Source map.
	 */
	readonly source: ReadonlyMap<T>;

	/**
	 * @param source Source map.
	 * @param config Converter configuration.
	 */
	constructor(source: ReadonlyMap<T>, config: AbstractConverterToList.Config<T>) {
		super(source, config);
		this.own(source.spliceEvent.listen(this._onSplice, this));
		this.own(source.clearEvent.listen(this._onClear, this));
	}

	private _onSplice(params: IMap.SpliceEventParams<T>) {
		var spliceResult = params.spliceResult;
		this._splice(
			VidSet.fromDictionary<T>(spliceResult.removedItems, this.source.getKey),
			VidSet.fromDictionary<T>(spliceResult.addedItems, this.source.getKey));
	}

	private _onClear(params: IMap.ItemsEventParams<T>) {
		this._target.removeItems(
			DictionaryUtils.toArray(params.items));
	}
}

/**
 * Converts a map to a list and start synchronization.
 * @param source Source map.
 * @returns Target list.
 */
export function mapToList<T>(source: ReadonlyMap<T>): DestroyableReadonlyList<T> {
	if (source.silent) {
		return source.toList();
	}
	const target = new List<T>(source.getKey);
	return target.owning(new MapConverterToList<T>(source, {target}));
}
