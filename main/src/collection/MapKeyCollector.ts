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

import BindableSet from '../BindableSet';
import DestroyableReadonlyBindableSet from '../DestroyableReadonlyBindableSet';
import IBindableMap from '../IBindableMap';
import {getIterableKeys, getIterableValues} from "../MapUtils";
import ReadonlyBindableMap from '../ReadonlyBindableMap';
import AbstractValueCollector from './AbstractValueCollector';

/**
 * Value collector implementation for maps.
 */
export default class MapKeyCollector<K> extends AbstractValueCollector<K> {

	/**
	 * @param source Source map.
	 * @param config Converter configuration.
	 */
	constructor(readonly source: ReadonlyBindableMap<K, unknown>, config?: AbstractValueCollector.Config<K>) {
		super(config, source.silent);
		this._target.tryAddAll(getIterableKeys(source));
		this.own(source.onSplice.listen(this._onSplice, this));
		this.own(source.onReindex.listen(this._onReindex, this));
		this.own(source.onClear.listen(this._onClear, this));
	}

	protected destroyObject() {
		this._target.tryDeleteAll(getIterableKeys(this.source));
		super.destroyObject();
	}

	private _onSplice(spliceResult: IBindableMap.SpliceResult<K, unknown>) {
		this._target.trySplice(
			getIterableKeys(spliceResult.deletedEntries),
			getIterableKeys(spliceResult.addedEntries));
	}

	private _onReindex(keyMapping: ReadonlyMap<K, K>) {
		this._target.trySplice(
			getIterableKeys(keyMapping),
			getIterableValues(keyMapping));
	}

	private _onClear(oldContents: ReadonlyMap<K, unknown>) {
		this._target.tryDeleteAll(getIterableKeys(oldContents));
	}
}

/**
 * Creates a set containing all map keys and starts synchronization.
 * @param source Source map.
 * @returns Target set.
 */
export function startCollectingMapKeys<K>(source: ReadonlyBindableMap<K, unknown>): DestroyableReadonlyBindableSet<K> {
	if (source.silent) {
		return new BindableSet(getIterableKeys(source), true);
	}
	const target = new BindableSet<K>();
	return target.owning(new MapKeyCollector<K>(source, {target}));
}
