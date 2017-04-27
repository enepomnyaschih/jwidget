/*!
	jWidget 2
	Copyright (C) 2017  Egor Nepomnyaschih
	enepomnyaschih@gmail.com
	https://github.com/enepomnyaschih/jwidget

	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU Lesser General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU Lesser General Public License for more details.

	You should have received a copy of the GNU Lesser General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

import {def} from '../index';
import AbstractCollectionFilterer from './AbstractCollectionFilterer';
import Dictionary from '../Dictionary';
import IList from '../IList';
import IndexCount from '../IndexCount';
import IndexItems from '../IndexItems';
import List from '../List';
import * as ArrayUtils from '../ArrayUtils';

/**
 * [[JW.AbstractCollection.Filterer|Filterer]] implementation for [[JW.Array]].
 */
class ListFilterer<T> extends AbstractCollectionFilterer<T> {
	private _targetCreated: boolean;

	/**
	 * @hidden
	 */
	protected _filtered: number[] = [];

	/**
	 * @inheritdoc
	 */
	readonly source: IList<T>;

	/**
	 * @inheritdoc
	 */
	readonly target: IList<T>;

	/**
	 * @inheritdoc
	 */
	constructor(source: IList<T>, config: ListFilterer.Config<T>) {
		super(source, config);
		this._targetCreated = config.target == null;
		this.target = this._targetCreated ? new List<T>(this.source.getKey, this.source.silent) : config.target;
		this._splice([], [new IndexItems(0, this.source.items)]);
		this.own(source.spliceEvent.listen(this._onSplice, this));
		this.own(source.replaceEvent.listen(this._onReplace, this));
		this.own(source.moveEvent.listen(this._onMove, this));
		this.own(source.clearEvent.listen(this._onClear, this));
		this.own(source.reorderEvent.listen(this._onReorder, this));
	}

	/**
	 * Changes filterer configuration and refilters target collection.
	 * @param config Options to modify.
	 */
	reconfigure(config: ListFilterer.Reconfig<T>) {
		this._test = def(config.filterer, this._test);
		this._scope = def(config.scope, this._scope);
		this.refilter();
	}

	/**
	 * Refilters target collection item at specified position in source collection.
	 * Call this method when collection item properties change the way that it must be refiltered.
	 * @param index Index of source collection item to refilter.
	 */
	refilterAt(sourceIndex: number) {
		var item = this.source.get(sourceIndex);
		var good = this._test.call(this._scope, item) !== false;
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
			return (this._test.call(this._scope, item) !== false) ? 1 : 0;
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
	 * @inheritdoc
	 */
	protected destroyObject() {
		this.target.clear();
		if (this._targetCreated) {
			this.target.destroy();
		}
		super.destroyObject();
	}

	/**
	 * @hidden
	 */
	private _countFiltered(index: number, count: number): number {
		var result = 0;
		for (var i = 0; i < count; ++i) {
			result += this._filtered[index + i];
		}
		return result;
	}

	/**
	 * @hidden
	 */
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
				if (this._test.call(this._scope, item) === false) {
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

	private _onSplice(params: IList.SpliceEventParams<T>) {
		var spliceResult = params.spliceResult;
		this._splice(spliceResult.removedItemsList, spliceResult.addedItemsList);
	}

	private _onReplace(params: IList.ReplaceEventParams<T>) {
		var oldFiltered = this._filtered[params.index] !== 0;
		var newFiltered = this._test.call(this._scope, params.newItem) !== false;
		if (!oldFiltered && !newFiltered) {
			return;
		}
		var index = this._countFiltered(0, params.index);
		this._filtered[params.index] = newFiltered ? 1 : 0;
		if (!newFiltered) {
			this.target.tryRemove(index);
		} else if (!oldFiltered) {
			this.target.tryAdd(params.newItem, index);
		} else {
			this.target.trySet(params.newItem, index);
		}
	}

	private _onMove(params: IList.MoveEventParams<T>) {
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

	private _onReorder(params: IList.ReorderEventParams<T>) {
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
	 * @inheritdoc
	 */
	export interface Config<T> extends AbstractCollectionFilterer.Config<T> {
		/**
		 * @inheritdoc
		 */
		readonly target?: IList<T>;
	}

	/**
	 * [[Filterer]]'s [[Filterer.reconfigure|reconfigure]] method options.
	 * All options are optional. If skipped, an option stays the same.
	 *
	 * @param T Collection item type.
	 */
	export interface Reconfig<T> {
		/**
		 * Filtering criteria.
		 */
		readonly filterer?: (item: T) => boolean;

		/**
		 * [[filterItem]] call scope.
		 */
		readonly scope?: any;
	}
}

export function filterList<T>(source: IList<T>, test: (item: T) => boolean, scope?: any): IList<T> {
	if (source.silent) {
		return source.filter(test, scope);
	}
	const result = new List<T>(source.getKey);
	return result.owning(new ListFilterer<T>(source, {
		target: result,
		test: test,
		scope: scope
	}));
}
