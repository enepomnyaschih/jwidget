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

import BindableMap from '../BindableMap';
import DestroyableReadonlyBindableMap from '../DestroyableReadonlyBindableMap';
import Destructor from '../Destructor';
import IBindableMap from '../IBindableMap';
import {destroy} from '../index';
import {healthyManKeys, map} from "../MapUtils";
import ReadonlyBindableMap from '../ReadonlyBindableMap';
import {getDifference} from "../SetUtils";
import AbstractMapper from './AbstractMapper';

/**
 * AbstractMapper implementation for maps.
 */
class MapMapper<K, T, U> extends AbstractMapper<T, U> {

	private _targetCreated: boolean;

	/**
	 * Target map.
	 */
	readonly target: IBindableMap<K, U>;

	/**
	 * @param source Source map.
	 * @param create Mapping callback.
	 * @param config Mapper configuration.
	 */
	constructor(readonly source: ReadonlyBindableMap<K, T>, create: (data: T) => U,
				config: MapMapper.FullConfig<K, T, U> = {}) {
		super(create, config);
		this._targetCreated = config.target == null;
		this.target = this._targetCreated ? new BindableMap<K, U>(this.source.silent) : config.target;
		this.target.trySetAll(map(source.native, this._create));
		this.own(source.onSplice.listen(this._onSplice, this));
		this.own(source.onReindex.listen(this._onReindex, this));
		this.own(source.onClear.listen(this._onClear, this));
	}

	protected destroyObject() {
		this._destroyItems(this.target.tryRemoveAll(healthyManKeys(this.source)) ?? new Map(), this.source.native);
		if (this._targetCreated) {
			this.target.destroy();
		}
		super.destroyObject();
	}

	private _destroyItems(items: ReadonlyMap<K, U>, datas: ReadonlyMap<K, T>) {
		if (this._destroy === undefined) {
			return;
		}
		for (let [key, item] of items) {
			this._destroy(item, datas.get(key));
		}
	}

	private _onSplice(sourceResult: IBindableMap.SpliceResult<K, T>) {
		const {removedEntries, addedEntries} = sourceResult;
		const targetResult = this.target.trySplice(
			getDifference(healthyManKeys(removedEntries), addedEntries),
			map(addedEntries, this._create));
		if (targetResult !== undefined) {
			this._destroyItems(targetResult.removedEntries, removedEntries);
		}
	}

	private _onReindex(keyMapping: ReadonlyMap<K, K>) {
		this.target.tryReindex(keyMapping);
	}

	private _onClear(oldContents: ReadonlyMap<K, T>) {
		this._destroyItems(this.target.tryRemoveAll(healthyManKeys(oldContents)), oldContents);
	}
}

export default MapMapper;

namespace MapMapper {
	/**
	 * MapMapper configuration.
	 */
	export interface FullConfig<K, T, U> extends AbstractMapper.Config<T, U> {
		/**
		 * Target map.
		 */
		readonly target?: IBindableMap<K, U>;
	}
}

/**
 * Maps a map and starts synchronization.
 * @param source Source map.
 * @param create Mapping callback.
 * @param config Mapper configuration.
 * @returns Target map.
 */
export function startMappingMap<K, T, U>(source: ReadonlyBindableMap<K, T>, create: (sourceValue: T) => U,
										 config: AbstractMapper.Config<T, U> = {}): DestroyableReadonlyBindableMap<K, U> {
	if (!source.silent) {
		const target = new BindableMap<K, U>();
		return target.owning(new MapMapper<K, T, U>(source, create, {
			target,
			destroy: config.destroy
		}));
	}
	const target = new BindableMap(map(source.native, create), true);
	if (config.destroy === destroy) {
		target.ownValues();
	} else if (config.destroy) {
		const sourceValues = new Map(source.native);
		target.own(new Destructor(() => target.forEach((value, key) => {
			config.destroy(value, sourceValues.get(key));
		})));
	}
	return target;
}
