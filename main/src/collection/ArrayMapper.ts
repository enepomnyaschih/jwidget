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

import {backForEach} from "../ArrayUtils";
import BindableArray from '../BindableArray';
import DestroyableReadonlyBindableArray from '../DestroyableReadonlyBindableArray';
import Destructor from '../Destructor';
import IBindableArray from '../IBindableArray';
import ReadonlyBindableArray from '../ReadonlyBindableArray';
import AbstractMapper from './AbstractMapper';

/**
 * `AbstractMapper` implementation for arrays.
 */
class ArrayMapper<T, U> extends AbstractMapper<T, U> {

	private _target: IBindableArray<U>;
	private _targetCreated: boolean;

	/**
	 * @param source Source array.
	 * @param create Mapping callback.
	 * @param config Mapper configuration.
	 */
	constructor(readonly source: ReadonlyBindableArray<T>, create: (sourceValue: T) => U,
				config: ArrayMapper.FullConfig<T, U> = {}) {
		super(create, config);
		this._targetCreated = config.target == null;
		this._target = this._targetCreated ? new BindableArray<U>(this.source.silent) : config.target;
		this._target.addAll(this._createItems(this.source.native));
		this.own(source.onSplice.listen(this._onSplice, this));
		this.own(source.onReplace.listen(this._onReplace, this));
		this.own(source.onMove.listen(this._onMove, this));
		this.own(source.onClear.listen(this._onClear, this));
		this.own(source.onReorder.listen(this._onReorder, this));
	}

	/**
	 * Target array.
	 */
	get target(): ReadonlyBindableArray<U> {
		return this._target;
	}

	protected destroyObject() {
		this._destroyItems(this._target.clear(), this.source.native);
		if (this._targetCreated) {
			this._target.destroy();
		}
		super.destroyObject();
	}

	private _createItems(datas: readonly T[]): U[] {
		return datas.map(this._create);
	}

	private _destroyItems(items: readonly U[], datas: readonly T[]) {
		if (this._destroy === undefined) {
			return;
		}
		for (let i = items.length - 1; i >= 0; --i) {
			this._destroy(items[i], datas[i]);
		}
	}

	private _onSplice(sourceResult: IBindableArray.SpliceResult<T>) {
		const {addedSegments} = sourceResult;
		const segmentsToAdd = addedSegments.map(
			addParams => <IBindableArray.IndexItems<U>>[addParams[0], this._createItems(addParams[1])]);
		const targetResult = this._target.trySplice(sourceResult.removeParams, segmentsToAdd);
		const sourceRemovedSegments = sourceResult.removedSegments;
		const targetRemovedSegments = targetResult.removedSegments;
		for (let i = targetRemovedSegments.length - 1; i >= 0; --i) {
			this._destroyItems(targetRemovedSegments[i][1], sourceRemovedSegments[i][1]);
		}
	}

	private _onReplace(message: IBindableArray.ReplaceMessage<T>) {
		const newItem = this._create(message.newValue);
		const oldItem = this._target.trySet(message.index, newItem);
		if (this._destroy != null) {
			this._destroy(oldItem, message.oldValue);
		}
	}

	private _onMove(message: IBindableArray.MoveMessage<T>) {
		this._target.tryMove(message.fromIndex, message.toIndex);
	}

	private _onClear(oldContents: readonly T[]) {
		this._destroyItems(this._target.clear(), oldContents);
	}

	private _onReorder(message: IBindableArray.ReorderMessage<T>) {
		this._target.tryReorder(message.indexMapping);
	}
}

export default ArrayMapper;

namespace ArrayMapper {
	/**
	 * Configuration of `ArrayMapper`.
	 */
	export interface FullConfig<T, U> extends AbstractMapper.Config<T, U> {
		/**
		 * Target array.
		 */
		readonly target?: IBindableArray<U>;
	}
}

/**
 * Creates a new array bound to another array with `ArrayMapper`.
 * @param source Source array.
 * @param create Mapping callback.
 * @param config Mapper configuration.
 * @returns Target array.
 */
export function startMappingArray<T, U>(source: ReadonlyBindableArray<T>, create: (sourceValue: T) => U,
										config: AbstractMapper.Config<T, U> = {}): DestroyableReadonlyBindableArray<U> {
	if (!source.silent) {
		const target = new BindableArray<U>();
		return target.owning(new ArrayMapper<T, U>(source, create, {target, destroy: config.destroy}));
	}
	const target = new BindableArray(source.native.map(create), true);
	if (config.destroy) {
		const sourceValues = source.native.concat();
		target.own(new Destructor(() => backForEach(target.native, (item, index) => {
			config.destroy(item, sourceValues[index]);
		})));
	}
	return target;
}
