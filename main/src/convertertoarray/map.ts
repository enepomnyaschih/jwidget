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
import IBindableMap from '../IBindableMap';
import ReadonlyBindableMap from '../ReadonlyBindableMap';
import AbstractConverterToArray from './AbstractConverterToArray';

/**
 * AbstractConverterToArray implementation for maps.
 */
export default class MapConverterToArray<T> extends AbstractConverterToArray<T> {

	/**
	 * @param source Source map.
	 * @param config Converter configuration.
	 */
	constructor(readonly source: ReadonlyBindableMap<unknown, T>, config: AbstractConverterToArray.Config<T>) {
		super(config, source.silent);
		this._target.addAll([...source.values()]);
		this.own(source.onSplice.listen(this._onSplice, this));
		this.own(source.onClear.listen(this._onClear, this));
	}

	protected destroyObject() {
		this._target.removeValues(this.source.values());
		super.destroyObject();
	}

	private _onSplice(spliceResult: IBindableMap.SpliceResult<unknown, T>) {
		this._splice(
			new Set(spliceResult.removedEntries.values()),
			new Set(spliceResult.addedEntries.values()));
	}

	private _onClear(oldContents: ReadonlyMap<unknown, T>) {
		this._target.removeValues(new Set(oldContents.values()));
	}
}

/**
 * Converts a map to an array and start synchronization.
 * @param source Source map.
 * @returns Target array.
 */
export function mapToArray<T>(source: ReadonlyBindableMap<unknown, T>): DestroyableReadonlyBindableArray<T> {
	if (source.silent) {
		return new BindableArray(source.values(), true);
	}
	const target = new BindableArray<T>();
	return target.owning(new MapConverterToArray<T>(source, {target}));
}
