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

import IBindableMap from '../IBindableMap';
import ReadonlyBindableMap from '../ReadonlyBindableMap';
import AbstractObserver from './AbstractObserver';

/**
 * AbstractObserver implementation for maps.
 */
export default class MapKeyObserver<T> extends AbstractObserver<T> {
	/**
	 * @param source Source map.
	 * @param config Observer configuration.
	 */
	constructor(readonly source: ReadonlyBindableMap<T, unknown>, config: AbstractObserver.Config<T>) {
		super(config);
		this._addItems(source.keys());
		this.own(source.onSplice.listen(this._onSplice, this));
		this.own(source.onReindex.listen(this._onReindex, this));
		this.own(source.onClear.listen(this._onClear, this));
	}

	protected destroyObject() {
		if (this.source.native.size !== 0) {
			this._clearItems(this.source.keys());
		}
		super.destroyObject();
	}

	private _onSplice(spliceResult: IBindableMap.SpliceResult<T, unknown>) {
		this._removeItems(spliceResult.removedEntries.keys());
		this._addItems(spliceResult.addedEntries.keys());
	}

	private _onReindex(keyMapping: ReadonlyMap<T, T>) {
		this._clearItems(keyMapping.keys());
		this._addItems(keyMapping.values());
	}

	private _onClear(oldContents: ReadonlyMap<T, unknown>) {
		this._clearItems(oldContents.keys());
	}
}
