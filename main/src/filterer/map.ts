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

import DestroyableReadonlyBindableMap from '../DestroyableReadonlyBindableMap';
import * as DictionaryUtils from '../DictionaryUtils';
import IBindableMap from '../IBindableMap';
import BindableMap from '../BindableMap';
import ReadonlyBindableMap from '../ReadonlyBindableMap';
import AbstractFilterer from './AbstractFilterer';

/**
 * AbstractFilterer implementation for maps.
 */
class MapFilterer<T> extends AbstractFilterer<T> {
	/**
	 * @inheritDoc
	 */
	readonly target: IBindableMap<T>;

	/**
	 * @param source Source map.
	 * @param test Filtering criteria.
	 * @param config Filterer configuration.
	 */
	constructor(readonly source: ReadonlyBindableMap<T>, test: (item: T) => any,
				config: MapFilterer.Config<T> = {}) {
		super(test, config);
		this.target = config.target ?? this.own(new BindableMap<T>(source.getKey, this.source.silent));
		this.target.tryPutAll(DictionaryUtils.filter(source.items, this._test, this._scope));
		this.own(source.onSplice.listen(this._onSplice, this));
		this.own(source.onReindex.listen(this._onReindex, this));
		this.own(source.onClear.listen(this._onClear, this));
	}

	/**
	 * @inheritDoc
	 */
	protected destroyObject() {
		this.target.tryRemoveAll(this.source.getKeys().items);
		super.destroyObject();
	}

	private _onSplice(message: IBindableMap.SpliceMessage<T>) {
		var spliceResult = message.spliceResult;
		this.target.trySplice(
			Object.keys(spliceResult.removedItems),
			DictionaryUtils.filter(spliceResult.addedItems, this._test, this._scope));
	}

	private _onReindex(message: IBindableMap.ReindexMessage<T>) {
		this.target.tryReindex(message.keyMap);
	}

	private _onClear(message: IBindableMap.MessageWithItems<T>) {
		this.target.tryRemoveAll(Object.keys(message.items));
	}
}

export default MapFilterer;

namespace MapFilterer {
	/**
	 * MapFilterer configuration.
	 */
	export interface Config<T> extends AbstractFilterer.Config {
		/**
		 * Target map.
		 */
		readonly target?: IBindableMap<T>;
	}
}

/**
 * Filters a map and starts synchronization.
 * @param source Source map.
 * @param test Filtering criteria.
 * @param scope Call scope of `test` function.
 * @returns Target map.
 */
export function filterMap<T>(source: ReadonlyBindableMap<T>, test: (item: T) => any, scope?: any): DestroyableReadonlyBindableMap<T> {
	if (source.silent) {
		return source.filter(test, scope);
	}
	const target = new BindableMap<T>(source.getKey);
	return target.owning(new MapFilterer<T>(source, test, {target, scope}));
}
