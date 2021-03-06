/*
MIT License

Copyright (c) 2021 Egor Nepomnyaschih

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
import Class from "../Class";
import DestroyableReadonlyBindableMap from '../DestroyableReadonlyBindableMap';
import IBindableMap from '../IBindableMap';
import {filter as filterKeys} from "../IterableUtils";
import {filter as filterEntries, getIterableKeys} from "../MapUtils";
import ReadonlyBindableMap from '../ReadonlyBindableMap';

/**
 * Binds one map to another, filling it with entries of the source map a function returns a truthy value for.
 */
class MapFilterer<K, V> extends Class {

	private _target: IBindableMap<K, V>;
	private _targetCreated: boolean;
	private controlledKeys = new Set<K>();

	/**
	 * @param source Source map.
	 * @param test Filtering criteria.
	 * @param config Filterer configuration.
	 */
	constructor(readonly source: ReadonlyBindableMap<K, V>, private test: (value: V) => boolean,
				config: MapFilterer.Config<K, V> = {}) {
		super();
		this._targetCreated = config.target == null;
		this._target = this._targetCreated ? new BindableMap<K, V>(this.source.silent) : config.target;
		this._target.trySetAll(this._prepareToSet(source.native));
		this.own(source.onSplice.listen(this._onSplice, this));
		this.own(source.onReindex.listen(this._onReindex, this));
		this.own(source.onClear.listen(this._onClear, this));
	}

	/**
	 * Target map.
	 */
	get target(): ReadonlyBindableMap<K, V> {
		return this._target;
	}

	protected destroyObject() {
		this._target.tryDeleteAll(this._prepareToRemove(this.source.native));
		if (this._targetCreated) {
			this._target.destroy();
		}
		this.test = null;
		this.controlledKeys = null;
		super.destroyObject();
	}

	private _onSplice(spliceResult: IBindableMap.SpliceResult<K, V>) {
		this._target.trySplice(
			this._prepareToRemove(spliceResult.deletedEntries),
			this._prepareToSet(spliceResult.addedEntries));
	}

	private _onReindex(keyMapping: ReadonlyMap<K, K>) {
		this._target.tryReindex(keyMapping);
	}

	private _onClear(oldContents: ReadonlyMap<K, V>) {
		this._target.tryDeleteAll(this._prepareToRemove(oldContents));
	}

	private _prepareToSet(entries: ReadonlyMap<K, V>) {
		const entriesToAdd = filterEntries(entries, this.test);
		for (let key of entriesToAdd.keys()) {
			this.controlledKeys.add(key);
		}
		return entriesToAdd;
	}

	private _prepareToRemove(entries: ReadonlyMap<K, V>) {
		const keysToRemove = filterKeys(getIterableKeys(entries), key => this.controlledKeys.has(key));
		for (let key of keysToRemove) {
			this.controlledKeys.delete(key);
		}
		return keysToRemove;
	}
}

export default MapFilterer;

namespace MapFilterer {
	/**
	 * Configuration of `MapFilterer`.
	 */
	export interface Config<K, V> {
		/**
		 * Target map.
		 */
		readonly target?: IBindableMap<K, V>;
	}
}

/**
 * Creates a new map bound to another map with `MapFilterer`.
 * @param source Source map.
 * @param test Filtering criteria.
 * @returns Target map.
 */
export function startFilteringMap<K, V>(source: ReadonlyBindableMap<K, V>,
										test: (value: V) => boolean): DestroyableReadonlyBindableMap<K, V> {
	if (source.silent) {
		return new BindableMap(filterEntries(source.native, test), true);
	}
	const target = new BindableMap<K, V>();
	return target.owning(new MapFilterer<K, V>(source, test, {target}));
}
