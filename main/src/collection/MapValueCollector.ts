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
import ReadonlyBindableMap from '../ReadonlyBindableMap';
import AbstractValueCollector from './AbstractValueCollector';

/**
 * Value collector implementation for maps.
 */
export default class MapValueCollector<V> extends AbstractValueCollector<V> {

	/**
	 * @param source Source map.
	 * @param config Converter configuration.
	 */
	constructor(readonly source: ReadonlyBindableMap<unknown, V>, config: AbstractValueCollector.Config<V>) {
		super(config, source.silent);
		this._target.tryAddAll(source.values());
		this.own(source.onSplice.listen(this._onSplice, this));
		this.own(source.onClear.listen(this._onClear, this));
	}

	protected destroyObject() {
		this._target.tryDeleteAll(this.source.values());
		super.destroyObject();
	}

	private _onSplice(spliceResult: IBindableMap.SpliceResult<unknown, V>) {
		this._target.trySplice(
			spliceResult.removedEntries.values(),
			spliceResult.addedEntries.values());
	}

	private _onClear(oldContents: ReadonlyMap<unknown, V>) {
		this._target.tryDeleteAll(oldContents.values());
	}
}

/**
 * Creates a set containing all map values and starts synchronization.
 * @param source Source map.
 * @returns Target set.
 */
export function startCollectingMapValues<V>(source: ReadonlyBindableMap<unknown, V>): DestroyableReadonlyBindableSet<V> {
	if (source.silent) {
		return new BindableSet(source.values(), true);
	}
	const target = new BindableSet<V>();
	return target.owning(new MapValueCollector<V>(source, {target}));
}
