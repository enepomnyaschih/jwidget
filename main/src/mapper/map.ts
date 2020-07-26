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
import Destructor from '../Destructor';
import Dictionary from '../Dictionary';
import * as DictionaryUtils from '../DictionaryUtils';
import IBindableMap from '../IBindableMap';
import {destroy} from '../index';
import BindableMap from '../BindableMap';
import ReadonlyBindableMap from '../ReadonlyBindableMap';
import AbstractMapper from './AbstractMapper';

/**
 * AbstractMapper implementation for maps.
 * @param T Source collection item type.
 * @param U Target collection item type.
 */
class MapMapper<T, U> extends AbstractMapper<T, U> {
	private _targetCreated: boolean;

	/**
	 * Source map.
	 */
	readonly source: ReadonlyBindableMap<T>;

	/**
	 * Target map.
	 */
	readonly target: IBindableMap<U>;

	/**
	 * @param source Source map.
	 * @param create Mapping callback.
	 * @param config Mapper configuration.
	 */
	constructor(source: ReadonlyBindableMap<T>, create: (data: T) => U, config: MapMapper.FullConfig<T, U> = {}) {
		super(source, create, config);
		this._targetCreated = config.target == null;
		this.target = this._targetCreated ? new BindableMap<U>(config.getKey, this.source.silent) : config.target;
		this.target.tryPutAll(this._createItems(source.items));
		this.own(source.onSplice.listen(this._onSplice, this));
		this.own(source.onReindex.listen(this._onReindex, this));
		this.own(source.onClear.listen(this._onClear, this));
	}

	/**
	 * @inheritDoc
	 */
	protected destroyObject() {
		this._destroyItems(this.target.removeAllVerbose(this.source.getKeys().items), this.source.items);
		if (this._targetCreated) {
			this.target.destroy();
		}
		super.destroyObject();
	}

	private _createItems(datas: Dictionary<T>): Dictionary<U> {
		var items: Dictionary<U> = {};
		for (var key in datas) {
			items[key] = this._create.call(this._scope, datas[key]);
		}
		return items;
	}

	private _destroyItems(items: Dictionary<U>, datas: Dictionary<T>) {
		if (this._destroy === undefined) {
			return;
		}
		for (var key in items) {
			this._destroy.call(this._scope, items[key], datas[key]);
		}
	}

	private _onSplice(message: IBindableMap.SpliceMessage<T>) {
		var sourceResult = message.spliceResult;
		var removedDatas = sourceResult.removedItems;
		var addedDatas = sourceResult.addedItems;
		var targetResult = this.target.trySplice(
			DictionaryUtils.getRemovedKeys(removedDatas, addedDatas),
			this._createItems(addedDatas));
		if (targetResult !== undefined) {
			this._destroyItems(targetResult.removedItems, removedDatas);
		}
	}

	private _onReindex(message: IBindableMap.ReindexMessage<T>) {
		this.target.tryReindex(message.keyMap);
	}

	private _onClear(message: IBindableMap.MessageWithItems<T>) {
		var datas = message.items;
		this._destroyItems(this.target.tryRemoveAll(Object.keys(datas)), datas);
	}
}

export default MapMapper;

namespace MapMapper {
	/**
	 * MapMapper configuration.
	 * @param T Source collection item type.
	 * @param U Target collection item type.
	 */
	export interface FullConfig<T, U> extends AbstractMapper.Config<T, U> {
		/**
		 * Target map.
		 */
		readonly target?: IBindableMap<U>;
	}
}

/**
 * Maps a map and starts synchronization.
 * @param source Source map.
 * @param create Mapping callback.
 * @param config Mapper configuration.
 * @returns Target map.
 */
export function mapMap<T, U>(source: ReadonlyBindableMap<T>, create: (sourceValue: T) => U,
							 config: AbstractMapper.Config<T, U> = {}): DestroyableReadonlyBindableMap<U> {
	if (!source.silent) {
		const target = new BindableMap<U>(config.getKey);
		return target.owning(new MapMapper<T, U>(source, create, {
			target,
			destroy: config.destroy,
			scope: config.scope
		}));
	}
	const target = source.map(create, config.scope, config.getKey);
	if (config.destroy === destroy) {
		target.ownItems();
	} else if (config.destroy) {
		const sourceValues = DictionaryUtils.clone(source.items);
		target.own(new Destructor(() => target.every((item, key) => {
			config.destroy.call(config.scope, item, sourceValues[key]);
			return true;
		})));
	}
	return target;
}
