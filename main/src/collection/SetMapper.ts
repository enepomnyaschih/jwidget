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

import BindableSet from '../BindableSet';
import DestroyableReadonlyBindableSet from '../DestroyableReadonlyBindableSet';
import Destructor from '../Destructor';
import IBindableSet from '../IBindableSet';
import {destroy} from '../index';
import {map} from "../IterableUtils";
import {getIterableValues} from "../MapUtils";
import ReadonlyBindableSet from '../ReadonlyBindableSet';
import AbstractMapper from './AbstractMapper';

/**
 * `AbstractMapper` implementation for sets.
 */
class SetMapper<T, U> extends AbstractMapper<T, U> {

	private _target: IBindableSet<U>;
	private _targetCreated: boolean;

	private readonly _items = new Map<T, U>();

	/**
	 * @param source Source set.
	 * @param create Mapping callback.
	 * @param config Mapper configuration.
	 */
	constructor(readonly source: ReadonlyBindableSet<T>, create: (data: T) => U,
				config: SetMapper.FullConfig<T, U> = {}) {
		super(create, config);
		this._targetCreated = config.target == null;
		this._target = this._targetCreated ? new BindableSet<U>(this.source.silent) : config.target;
		this._target.tryAddAll(this._createItems(source));
		this.own(source.onSplice.listen(this._onSplice, this));
		this.own(source.onClear.listen(this._onClear, this));
	}

	/**
	 * Target set.
	 */
	get target(): ReadonlyBindableSet<U> {
		return this._target;
	}

	protected destroyObject() {
		this._target.tryDeleteAll(this._getItems(this.source));
		this._destroyItems(this.source);
		if (this._targetCreated) {
			this._target.destroy();
		}
		super.destroyObject();
	}

	private _getItems(datas: Iterable<T>): U[] {
		return map(datas, data => this._items.get(data));
	}

	private _createItems(datas: Iterable<T>): U[] {
		const items: U[] = [];
		for (let data of datas) {
			const item = this._create(data);
			items.push(item);
			this._items.set(data, item);
		}
		return items;
	}

	private _destroyItems(datas: Iterable<T>) {
		if (this._destroy === undefined) {
			return;
		}
		for (let data of datas) {
			const item = this._items.get(data);
			this._items.delete(data);
			this._destroy(item, data);
		}
	}

	private _onSplice(spliceResult: IBindableSet.SpliceResult<T>) {
		const {deletedValues, addedValues} = spliceResult;
		this._target.trySplice(this._getItems(deletedValues), this._createItems(addedValues));
		this._destroyItems(deletedValues);
	}

	private _onClear(oldContents: ReadonlySet<T>) {
		this._target.tryDeleteAll(this._getItems(oldContents));
		this._destroyItems(oldContents);
	}
}

export default SetMapper;

namespace SetMapper {
	/**
	 * Configuration of `SetMapper`.
	 */
	export interface FullConfig<T, U> extends AbstractMapper.Config<T, U> {
		/**
		 * Target set.
		 */
		readonly target?: IBindableSet<U>;
	}
}

/**
 * Creates a new set bound to another set with `SetMapper`.
 * @param source Source set.
 * @param create Mapping callback.
 * @param config Mapper configuration.
 * @returns Target set.
 */
export function startMappingSet<T, U>(source: ReadonlyBindableSet<T>, create: (sourceValue: T) => U,
									  config: AbstractMapper.Config<T, U> = {}): DestroyableReadonlyBindableSet<U> {
	if (!source.silent) {
		const target = new BindableSet<U>();
		return target.owning(new SetMapper<T, U>(source, create, {
			target,
			destroy: config.destroy
		}));
	}
	if (config.destroy && config.destroy !== destroy) {
		const mapping = new Map(map(source, data => [data, create(data)]));
		const target = new BindableSet(getIterableValues(mapping), true);
		target.own(new Destructor(() => mapping.forEach(config.destroy)));
		return target;
	}
	const target = new BindableSet(map(source, create), true);
	if (config.destroy) {
		target.ownValues();
	}
	return target;
}
