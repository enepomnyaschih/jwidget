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

import DestroyableReadonlySet from '../DestroyableReadonlySet';
import * as DictionaryUtils from '../DictionaryUtils';
import IMap from '../IMap';
import ReadonlyMap from '../ReadonlyMap';
import Set from '../Set';
import AbstractConverterToSet from './AbstractConverterToSet';

/**
 * AbstractConverterToSet implementation for Map.
 */
export default class MapConverterToSet<T> extends AbstractConverterToSet<T> {
	/**
	 * Source map.
	 */
	readonly source: ReadonlyMap<T>;

	/**
	 * @param source Source map.
	 * @param config Converter configuration.
	 */
	constructor(source: ReadonlyMap<T>, config: AbstractConverterToSet.Config<T>) {
		super(source, config);
		this.own(source.spliceEvent.listen(this._onSplice, this));
		this.own(source.clearEvent.listen(this._onClear, this));
	}

	private _onSplice(params: IMap.SpliceEventParams<T>) {
		var spliceResult = params.spliceResult;
		this._target.trySplice(
			DictionaryUtils.toArray(spliceResult.removedItems),
			DictionaryUtils.toArray(spliceResult.addedItems));
	}

	private _onClear(params: IMap.ItemsEventParams<T>) {
		this._target.tryRemoveAll(
			DictionaryUtils.toArray(params.items));
	}
}

/**
 * Converts map to set and starts synchronization.
 * @param source Source map.
 * @returns Target set.
 */
export function mapToSet<T>(source: ReadonlyMap<T>): DestroyableReadonlySet<T> {
	if (source.silent) {
		return source.toSet();
	}
	const target = new Set<T>(source.getKey);
	return target.owning(new MapConverterToSet<T>(source, {target}));
}
