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
import AbstractSorterComparing from './AbstractSorterComparing';

/**
 * AbstractSorterComparing implementation for Map.
 */
export default class MapSorterComparing<T> extends AbstractSorterComparing<T> {
	/**
	 * @param source Source map.
	 * @param config Sorter configuration.
	 */
	constructor(readonly source: ReadonlyBindableMap<unknown, T>, config?: AbstractSorterComparing.FullConfig<T>) {
		super(config, source.silent);
		this._splice([], source.values());
		this.own(source.onSplice.listen(this._onSplice, this));
		this.own(source.onClear.listen(this._onClear, this));
	}

	protected destroyObject() {
		this._splice(this.source.values(), []);
		super.destroyObject();
	}

	private _onSplice(spliceResult: IBindableMap.SpliceResult<unknown, T>) {
		this._splice(
			spliceResult.removedEntries.values(),
			spliceResult.addedEntries.values());
	}

	private _onClear(oldContents: ReadonlyMap<unknown, T>) {
		this._splice(oldContents.values(), []);
	}
}

/**
 * Sorts a map and starts synchronization.
 * @param source Source map.
 * @param config Sorter configuration.
 * @returns Sorted list.
 */
export function sortMapComparing<T>(source: ReadonlyBindableMap<unknown, T>,
									config?: AbstractSorterComparing.Config<T>): DestroyableReadonlyBindableArray<T> {
	if (source.silent) {
		return new BindableArray([...source.values()].sort((x, y) => config.order * config.compare(x, y)), true);
	}
	const target = new BindableArray<T>();
	return target.owning(new MapSorterComparing<T>(source, {
		target,
		compare: config.compare,
		order: config.order
	}));
}
