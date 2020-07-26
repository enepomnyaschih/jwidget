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

import DestroyableReadonlyBindableArray from '../DestroyableReadonlyBindableArray';
import Destructor from '../Destructor';
import IBindableArray from '../IBindableArray';
import {destroy} from '../index';
import IndexItems from '../IndexItems';
import BindableArray from '../BindableArray';
import ReadonlyBindableArray from '../ReadonlyBindableArray';
import AbstractMapper from './AbstractMapper';

/**
 * AbstractMapper implementation for arrays.
 * @param T Source collection item type.
 * @param U Target collection item type.
 */
class ArrayMapper<T, U> extends AbstractMapper<T, U> {
	private _targetCreated: boolean;

	/**
	 * Source array.
	 */
	readonly source: ReadonlyBindableArray<T>;

	/**
	 * Target array.
	 */
	readonly target: IBindableArray<U>;

	/**
	 * @param source Source array.
	 * @param create Mapping callback.
	 * @param config Mapper configuration.
	 */
	constructor(source: ReadonlyBindableArray<T>, create: (sourceValue: T) => U, config: ArrayMapper.FullConfig<T, U> = {}) {
		super(source, create, config);
		this._targetCreated = config.target == null;
		this.target = this._targetCreated ? new BindableArray<U>(config.getKey, this.source.silent) : config.target;
		this.target.addAll(this._createItems(this.source.items));
		this.own(source.onSplice.listen(this._onSplice, this));
		this.own(source.onReplace.listen(this._onReplace, this));
		this.own(source.onMove.listen(this._onMove, this));
		this.own(source.onClear.listen(this._onClear, this));
		this.own(source.onReorder.listen(this._onReorder, this));
	}

	/**
	 * @inheritDoc
	 */
	protected destroyObject() {
		this._destroyItems(this.target.clear() || [], this.source.items);
		if (this._targetCreated) {
			this.target.destroy();
		}
		super.destroyObject();
	}

	private _createItems(datas: T[]): U[] {
		var items: U[] = [];
		for (var i = 0, l = datas.length; i < l; ++i) {
			items.push(this._create.call(this._scope, datas[i]));
		}
		return items;
	}

	private _destroyItems(items: U[], datas: T[]) {
		if (this._destroy === undefined) {
			return;
		}
		for (var i = items.length - 1; i >= 0; --i) {
			this._destroy.call(this._scope, items[i], datas[i]);
		}
	}

	private _onSplice(message: IBindableArray.SpliceMessage<T>) {
		var sourceResult = message.spliceResult;
		var addedSegments = sourceResult.addedSegments;
		var segmentsToAdd: IBindableArray.IndexItems<U>[] = [];
		for (var i = 0, l = addedSegments.length; i < l; ++i) {
			var addParams = addedSegments[i];
			segmentsToAdd.push(new IndexItems(
				addParams.index, this._createItems(addParams.items)));
		}
		var targetResult = this.target.trySplice(sourceResult.removeParams, segmentsToAdd);
		var sourceRemovedSegments = sourceResult.removedSegments;
		var targetRemovedSegments = targetResult.removedSegments;
		for (var i = targetRemovedSegments.length - 1; i >= 0; --i) {
			this._destroyItems(targetRemovedSegments[i].items, sourceRemovedSegments[i].items);
		}
	}

	private _onReplace(message: IBindableArray.ReplaceMessage<T>) {
		var newItem = this._create.call(this._scope, message.newItem);
		var oldItem = this.target.trySet(message.index, newItem).value;
		this._destroy.call(this._scope, oldItem, message.oldItem);
	}

	private _onMove(message: IBindableArray.MoveMessage<T>) {
		this.target.tryMove(message.fromIndex, message.toIndex);
	}

	private _onClear(message: IBindableArray.MessageWithItems<T>) {
		this._destroyItems(this.target.clear(), message.items);
	}

	private _onReorder(message: IBindableArray.ReorderMessage<T>) {
		this.target.tryReorder(message.indexArray);
	}
}

export default ArrayMapper;

namespace ArrayMapper {
	/**
	 * ArrayMapper configuration.
	 * @param T Source collection item type.
	 * @param U Target collection item type.
	 */
	export interface FullConfig<T, U> extends AbstractMapper.Config<T, U> {
		/**
		 * Target array.
		 */
		readonly target?: IBindableArray<U>;
	}
}

/**
 * Maps an array and starts synchronization.
 * @param source Source array.
 * @param create Mapping callback.
 * @param config Mapper configuration.
 * @returns Target array.
 */
export function mapArray<T, U>(source: ReadonlyBindableArray<T>, create: (sourceValue: T) => U,
							   config: AbstractMapper.Config<T, U> = {}): DestroyableReadonlyBindableArray<U> {
	if (!source.silent) {
		const target = new BindableArray<U>(config.getKey);
		return target.owning(new ArrayMapper<T, U>(source, create, {
			target,
			destroy: config.destroy,
			scope: config.scope,
			getKey: config.getKey
		}));
	}
	const target = source.map(create, config.scope, config.getKey);
	if (config.destroy === destroy) {
		target.ownItems();
	} else if (config.destroy) {
		const sourceValues = source.items.concat();
		target.own(new Destructor(() => target.backEvery((item, index) => {
			config.destroy.call(config.scope, item, sourceValues[index]);
			return true;
		})));
	}
	return target;
}
