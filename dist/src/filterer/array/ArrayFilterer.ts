/*
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

import {def} from '../../Core';
import AbstractCollectionFilterer from '../AbstractCollectionFilterer';
import IArray from '../../IArray';
import IArrayFilterer from './IArrayFilterer';
import IArrayFiltererConfig from './IArrayFiltererConfig';
import IArrayFiltererReconfig from './IArrayFiltererReconfig';
import IIndexCount from '../../IIndexCount';
import IIndexItems from '../../IIndexItems';
import IndexCount from '../../IndexCount';
import IndexItems from '../../IndexItems';
import List from '../../List';
import * as ArrayUtils from '../../ArrayUtils';

/**
 * [[JW.AbstractCollection.Filterer|Filterer]] implementation for [[JW.Array]].
 */
export default class ArrayFilterer<T> extends AbstractCollectionFilterer<T> implements IArrayFilterer<T> {
	private _targetCreated: boolean;

	/**
	 * @hidden
	 */
	protected _filtered: number[] = [];

	/**
	 * @inheritdoc
	 */
	readonly source: IArray<T>;

	/**
	 * @inheritdoc
	 */
	readonly target: IArray<T>;

	/**
	 * @inheritdoc
	 */
	constructor(source: IArray<T>, config: IArrayFiltererConfig<T>) {
		super(source, config);
		this._targetCreated = config.target == null;
		this.target = this._targetCreated ? new List<T>(this.source.silent) : config.target;
		this._splice([], [new IndexItems(0, this.source.getItems())]);
	}

	/**
	 * @inheritdoc
	 */
	protected destroyObject() {
		this.target.tryClear();
		if (this._targetCreated) {
			this.target.destroy();
		}
		super.destroyObject();
	}

	/**
	 * @hidden
	 */
	protected _countFiltered(index: number, count: number): number {
		var result = 0;
		for (var i = 0; i < count; ++i) {
			result += this._filtered[index + i];
		}
		return result;
	}

	/**
	 * @hidden
	 */
	protected _splice(removedItemsList: IIndexItems<T>[], addedItemsList: IIndexItems<T>[]) {
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
				if (this._filterItem.call(this._scope, item) === false) {
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

	/**
	 * Changes filterer configuration and refilters target collection.
	 * @param config Options to modify.
	 */
	reconfigure(config: IArrayFiltererReconfig<T>) {
		this._filterItem = def(config.filterItem, this._filterItem);
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
		var good = this._filterItem.call(this._scope, item) !== false;
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
		var newFiltered = this.source.map((item) => {
			return (this._filterItem.call(this._scope, item) !== false) ? 1 : 0;
		});

		var removeParams: IndexCount = null;
		var removeParamsList: IIndexCount[] = [];

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

		var addParams: IIndexItems<T> = null;
		var addParamsList: IIndexItems<T>[] = [];

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
}
