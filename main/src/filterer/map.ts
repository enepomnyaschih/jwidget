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

import DestroyableReadonlyMap from '../DestroyableReadonlyMap';
import * as DictionaryUtils from '../DictionaryUtils';
import IMap from '../IMap';
import Map from '../Map';
import ReadonlyMap from '../ReadonlyMap';
import AbstractFilterer from './AbstractFilterer';

/**
 * AbstractFilterer implementation for Map.
 * @param T Collection item type.
 */
class MapFilterer<T> extends AbstractFilterer<T> {
	private _targetCreated: boolean;

	/**
	 * Source map.
	 */
	readonly source: ReadonlyMap<T>;

	/**
	 * @inheritDoc
	 */
	readonly target: IMap<T>;

	/**
	 * @param source Source map.
	 * @param test Filtering criteria.
	 * @param config Filterer configuration.
	 */
	constructor(source: ReadonlyMap<T>, test: (item: T) => any,
				config: MapFilterer.Config<T> = {}) {
		super(source, test, config);
		this._targetCreated = config.target == null;
		this.target = this._targetCreated ? new Map<T>(source.getKey, this.source.silent) : config.target;
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
		if (this._targetCreated) {
			this.target.destroy();
		}
		super.destroyObject();
	}

	private _onSplice(params: IMap.SpliceMessage<T>) {
		var spliceResult = params.spliceResult;
		this.target.trySplice(
			Object.keys(spliceResult.removedItems),
			DictionaryUtils.filter(spliceResult.addedItems, this._test, this._scope));
	}

	private _onReindex(params: IMap.ReindexMessage<T>) {
		this.target.tryReindex(params.keyMap);
	}

	private _onClear(params: IMap.MessageWithItems<T>) {
		this.target.tryRemoveAll(Object.keys(params.items));
	}
}

export default MapFilterer;

namespace MapFilterer {
	/**
	 * MapFilterer configuration.
	 * @param T Collection item type.
	 */
	export interface Config<T> extends AbstractFilterer.Config {
		/**
		 * Target collection.
		 */
		readonly target?: IMap<T>;
	}
}

/**
 * Filters a map and starts synchronization.
 * @param source Source map.
 * @param test Filtering criteria.
 * @param scope Call scope of `test` function.
 * @returns Target map.
 */
export function filterMap<T>(source: ReadonlyMap<T>, test: (item: T) => any, scope?: any): DestroyableReadonlyMap<T> {
	if (source.silent) {
		return source.filter(test, scope);
	}
	const target = new Map<T>(source.getKey);
	return target.owning(new MapFilterer<T>(source, test, {target, scope}));
}
