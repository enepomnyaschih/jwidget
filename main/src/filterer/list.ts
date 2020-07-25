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

import * as ArrayUtils from '../ArrayUtils';
import DestroyableReadonlyList from '../DestroyableReadonlyList';
import Dictionary from '../Dictionary';
import IList from '../IList';
import {def} from '../index';
import IndexCount from '../IndexCount';
import IndexItems from '../IndexItems';
import List from '../List';
import ReadonlyList from '../ReadonlyList';
import AbstractFilterer from './AbstractFilterer';

/**
 * AbstractFilterer implementation for List.
 * @param T Collection item type.
 */
class ListFilterer<T> extends AbstractFilterer<T> {
	private _targetCreated: boolean;
	private _filtered: number[] = [];

	/**
	 * Source list.
	 */
	readonly source: ReadonlyList<T>;

	/**
	 * @inheritDoc
	 */
	readonly target: IList<T>;

	/**
	 * @param source Source list.
	 * @param test Filtering criteria.
	 * @param config Filterer configuration.
	 */
	constructor(source: ReadonlyList<T>, test: (item: T) => any,
				config: ListFilterer.FullConfig<T> = {}) {
		super(source, test, config);
		this._targetCreated = config.target == null;
		this.target = this._targetCreated ? new List<T>(this.source.getKey, this.source.silent) : config.target;
		this._splice([], [new IndexItems(0, this.source.items)]);
		this.own(source.onSplice.listen(this._onSplice, this));
		this.own(source.onReplace.listen(this._onReplace, this));
		this.own(source.onMove.listen(this._onMove, this));
		this.own(source.onClear.listen(this._onClear, this));
		this.own(source.onReorder.listen(this._onReorder, this));
	}

	/**
	 * Changes filterer configuration and refilters target collection.
	 * @param config Options to modify.
	 */
	reconfigure(config: ListFilterer.Reconfig<T>) {
		this._test = def(config.test, this._test);
		this._scope = def(config.scope, this._scope);
		this.refilter();
	}

	/**
	 * Refilters target collection item at specified position in source collection.
	 * Call this method when collection item properties change the way that it must be refiltered.
	 * @param sourceIndex Index of source collection item to refilter.
	 */
	refilterAt(sourceIndex: number) {
		var item = this.source.get(sourceIndex);
		var good = this._test.call(this._scope, item);
		var targetIndex = this._countFiltered(0, sourceIndex);
		if (this._filtered[sourceIndex] === 0) {
			if (good) {
				this._filtered[sourceIndex] = 1;
				this.target.add(item, targetIndex);
			}
		} else {
			if (!good) {
				this._filtered[sourceIndex] = 0;
				this.target.remove(targetIndex);
			}
		}
	}

	/**
	 * Refilters target collection item. Call this method when collection item properties change the way that
	 * it must be refiltered.
	 * @param item Item to refilter.
	 */
	refilterItem(item: T) {
		var index = this.source.indexOf(item);
		if (index !== -1) {
			this.refilterAt(index);
		}
	}

	/**
	 * Refilters target collection. Call this method when collection item properties change the way that
	 * they must be refiltered.
	 */
	refilter() {
		var newFiltered = this.source.items.map((item) => {
			return this._test.call(this._scope, item) ? 1 : 0;
		});

		var removeParams: IndexCount = null;
		var removeParamsList: IList.IndexCount[] = [];

		function flushRemove() {
			if (removeParams !== null) {
				removeParamsList.push(removeParams);
				removeParams = null;
			}
		}

		var targetIndex = 0;
		this.source.every((item, index) => {
			item = item;
			if (this._filtered[index] === 0) {
				return true;
			}
			if (newFiltered[index] === 0) {
				if (removeParams === null) {
					removeParams = new IndexCount(targetIndex, 0);
				}
				++removeParams.count;
				this._filtered[index] = 0;
			} else {
				flushRemove();
			}
			++targetIndex;
			return true;
		});

		flushRemove();

		var addParams: IList.IndexItems<T> = null;
		var addParamsList: IList.IndexItems<T>[] = [];

		function flushAdd() {
			if (addParams !== null) {
				addParamsList.push(addParams);
				addParams = null;
			}
		}

		var targetIndex = 0;
		this.source.every((item, index) => {
			if (this._filtered[index] === 1) {
				flushAdd();
				++targetIndex;
				return true;
			}
			if (newFiltered[index] === 1) {
				if (addParams === null) {
					addParams = new IndexItems<T>(targetIndex, []);
				}
				addParams.items.push(item);
				this._filtered[index] = 1;
				++targetIndex;
			} else {
				flushAdd();
			}
			return true;
		});

		flushAdd();

		this._filtered = newFiltered;
		this.target.trySplice(removeParamsList, addParamsList);
	}

	/**
	 * @inheritDoc
	 */
	protected destroyObject() {
		this.target.clear();
		if (this._targetCreated) {
			this.target.destroy();
		}
		super.destroyObject();
	}

	private _countFiltered(index: number, count: number): number {
		var result = 0;
		for (var i = 0; i < count; ++i) {
			result += this._filtered[index + i];
		}
		return result;
	}

	private _splice(removedItemsList: IList.IndexItems<T>[], addedItemsList: IList.IndexItems<T>[]) {
		var sourceIndex = 0;
		var targetIndex = 0;
		var removeParamsList = removedItemsList.map((indexItems) => {
			targetIndex += this._countFiltered(sourceIndex, indexItems.index - sourceIndex);
			var count = this._countFiltered(indexItems.index, indexItems.items.length);
			var params = new IndexCount(targetIndex, count);
			sourceIndex = indexItems.index + indexItems.items.length;
			targetIndex += count;
			return params;
		});
		ArrayUtils.trySplice(this._filtered, removedItemsList.map((x) => x.toIndexCount()), []);

		var sourceIndex = 0;
		var targetIndex = 0;
		var addParamsList = addedItemsList.map((indexItems) => {
			targetIndex += this._countFiltered(sourceIndex, indexItems.index - sourceIndex);
			var items: T[] = [];
			var filtered = indexItems.items.map((item) => {
				if (!this._test.call(this._scope, item)) {
					return 0;
				}
				items.push(item);
				return 1;
			});
			var params = new IndexItems(targetIndex, items);
			ArrayUtils.tryAddAll(this._filtered, filtered, indexItems.index);
			sourceIndex = indexItems.index + filtered.length;
			targetIndex += items.length;
			return params;
		});

		this.target.trySplice(removeParamsList, addParamsList);
	}

	private _onSplice(params: IList.SpliceMessage<T>) {
		var spliceResult = params.spliceResult;
		this._splice(spliceResult.removedItemsList, spliceResult.addedItemsList);
	}

	private _onReplace(params: IList.ReplaceMessage<T>) {
		var oldFiltered = this._filtered[params.index] !== 0;
		var newFiltered = this._test.call(this._scope, params.newItem);
		if (!oldFiltered && !newFiltered) {
			return;
		}
		var index = this._countFiltered(0, params.index);
		this._filtered[params.index] = newFiltered ? 1 : 0;
		if (!newFiltered) {
			this.target.remove(index);
		} else if (!oldFiltered) {
			this.target.add(params.newItem, index);
		} else {
			this.target.trySet(index, params.newItem);
		}
	}

	private _onMove(params: IList.MoveMessage<T>) {
		if (this._filtered[params.fromIndex] !== 0) {
			var fromIndex: number, toIndex: number;
			if (params.fromIndex < params.toIndex) {
				fromIndex = this._countFiltered(0, params.fromIndex);
				toIndex = fromIndex + this._countFiltered(params.fromIndex + 1, params.toIndex - params.fromIndex);
			} else {
				toIndex = this._countFiltered(0, params.toIndex);
				fromIndex = toIndex + this._countFiltered(params.toIndex, params.fromIndex - params.toIndex);
			}
			this.target.tryMove(fromIndex, toIndex);
		}
		ArrayUtils.tryMove(this._filtered, params.fromIndex, params.toIndex);
	}

	private _onClear() {
		this.target.clear();
	}

	private _onReorder(params: IList.ReorderMessage<T>) {
		var targetIndex = 0;
		var targetIndexWhichMovesToI: Dictionary<number> = {};
		for (var sourceIndex = 0, l = this._filtered.length; sourceIndex < l; ++sourceIndex) {
			if (this._filtered[sourceIndex] !== 0) {
				targetIndexWhichMovesToI[params.indexArray[sourceIndex]] = targetIndex++;
			}
		}
		ArrayUtils.tryReorder(this._filtered, params.indexArray);

		var targetIndex = 0;
		var indexes = new Array<number>(this.target.length.get());
		for (var sourceIndex = 0, l = this._filtered.length; sourceIndex < l; ++sourceIndex) {
			if (this._filtered[sourceIndex] !== 0) {
				indexes[targetIndexWhichMovesToI[sourceIndex]] = targetIndex++;
			}
		}

		this.target.tryReorder(indexes);
	}
}

export default ListFilterer;

namespace ListFilterer {
	/**
	 * ListFilterer configuration.
	 * @param T Collection item type.
	 */
	export interface FullConfig<T> extends AbstractFilterer.Config {
		/**
		 * Target list.
		 */
		readonly target?: IList<T>;
	}

	/**
	 * ListFilterer.reconfigure method configuration.
	 * All options are optional. If skipped, an option stays the same.
	 * @param T Collection item type.
	 */
	export interface Reconfig<T> {
		/**
		 * New filtering criteria.
		 */
		readonly test?: (item: T) => any;

		/**
		 * New `test` call scope.
		 */
		readonly scope?: any;
	}
}

/**
 * Filters a list and starts synchronization.
 * @param source Source list.
 * @param test Filtering criteria.
 * @param scope Call scope of `test` function.
 * @returns Target list.
 */
export function filterList<T>(source: ReadonlyList<T>, test: (item: T) => any,
                              scope?: any): DestroyableReadonlyList<T> {
	if (source.silent) {
		return source.filter(test, scope);
	}
	const target = new List<T>(source.getKey);
	return target.owning(new ListFilterer<T>(source, test, {target, scope}));
}
