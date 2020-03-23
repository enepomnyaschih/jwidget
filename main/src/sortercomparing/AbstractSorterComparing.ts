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

import * as ArrayUtils from '../ArrayUtils';
import Class from '../Class';
import IList from '../IList';
import {cmp} from '../index';
import IndexCount from '../IndexCount';
import IndexItems from '../IndexItems';
import List from '../List';
import ReadonlyCollection from '../ReadonlyCollection';
import ReadonlyList from "../ReadonlyList";

/**
 * Sorter (comparing). Builds a new List containing the items of source collection sorter by comparer.
 * @param T Collection item type.
 */
abstract class AbstractSorterComparing<T> extends Class {
	private _targetCreated: boolean;

	/**
	 * @hidden
	 */
	protected _compare: (x: T, y: T) => number;

	/**
	 * @hidden
	 */
	protected _scope: any;

	/**
	 * @hidden
	 */
	protected _order: number;

	/**
	 * @hidden
	 */
	protected _target: IList<T>;

	/**
	 * @hidden
	 */
	constructor(readonly source: ReadonlyCollection<T>, config: AbstractSorterComparing.FullConfig<T> = {}) {
		super();
		this._compare = config.compare || cmp;
		this._order = config.order || 1;
		this._scope = config.scope || this;
		this._targetCreated = config.target == null;
		this._target = this._targetCreated ? new List<T>(source.getKey, source.silent) : config.target;
		this._splice([], source.asArray());
	}

	get target(): ReadonlyList<T> {
		return this._target;
	}

	/**
	 * @inheritDoc
	 */
	protected destroyObject() {
		this._splice(this.source.asArray(), []);
		if (this._targetCreated) {
			this._target.destroy();
		}
		this._compare = null;
		this._scope = null;
		super.destroyObject();
	}

	/**
	 * Resorts target list forcibly. Call this method on sorting factors modification.
	 */
	resort() {
		this._target.sortComparing(this._compare, this._scope, this._order);
	}

	/**
	 * @hidden
	 */
	protected _splice(removedItems: T[], addedItems: T[]) {
		var removedItemsSorted = ArrayUtils.toSortedComparing(removedItems, this._compare, this._scope, this._order);
		var addedItemsSorted = ArrayUtils.toSortedComparing(addedItems, this._compare, this._scope, this._order);
		removedItems = new Array<T>(removedItems.length);
		addedItems = new Array<T>(addedItems.length);
		var iRemoved = 0;
		var iAdded = 0;
		var jRemoved = 0;
		var jAdded = 0;
		// ignore out the items which are removed and added at the same time
		while ((iRemoved < removedItemsSorted.length) || (iAdded < addedItemsSorted.length)) {
			var removedItem = removedItemsSorted[iRemoved];
			var addedItem = addedItemsSorted[iAdded];
			var c = cmp(removedItem === undefined, addedItem === undefined) ||
				(this._order * this._compare.call(this._scope, removedItem, addedItem));
			if (c < 0) {
				removedItems[jRemoved++] = removedItem;
				++iRemoved;
			} else if (c > 0) {
				addedItems[jAdded++] = addedItem;
				++iAdded;
			} else {
				++iRemoved;
				++iAdded;
			}
		}
		removedItems.splice(jRemoved, removedItems.length - jRemoved);
		addedItems.splice(jAdded, addedItems.length - jAdded);

		var iAdds = 0;
		var addShift = 0;
		var removeParamsList: IList.IndexCount[] = [];
		var addParamsList: IList.IndexItems<T>[] = [];
		var removeParams: IndexCount = null;
		for (var iTarget = 0, lTarget = this.target.length.get(); iTarget < lTarget; ++iTarget) {
			var value = this.target.get(iTarget);
			if (removedItems[ArrayUtils.binarySearch(removedItems, value, this._compare, this._scope, this._order) - 1] === value) {
				if (!removeParams) {
					removeParams = new IndexCount(iTarget, 0);
					removeParamsList.push(removeParams);
				}
				++removeParams.count;
				--addShift;
			} else {
				removeParams = null;
				var addParams = new IndexItems<T>(iTarget + addShift, []);
				while ((iAdds < addedItems.length) && (this._order * this._compare.call(this._scope, addedItems[iAdds], value) < 0)) {
					addParams.items.push(addedItems[iAdds++]);
					++addShift;
				}
				if (addParams.items.length !== 0) {
					addParamsList.push(addParams);
				}
			}
		}
		if (iAdds < addedItems.length) {
			addParamsList.push(new IndexItems<T>(iTarget + addShift, addedItems.slice(iAdds)));
		}
		this._target.trySplice(removeParamsList, addParamsList);
	}
}

export default AbstractSorterComparing;

namespace AbstractSorterComparing {
	/**
	 * AbstractSorterComparing configuration.
	 * @param T Collection item type.
	 */
	export interface Config<T> {
		/**
		 * Item comparing callback.
		 */
		readonly compare?: (x: T, y: T) => number;

		/**
		 * Call scope of `compare` callback. Defaults to synchronizer itself.
		 */
		readonly scope?: any;

		/**
		 * Sorting order. Positive number for ascending sorting, negative for descending sorting. Defaults to 1.
		 */
		readonly order?: number;
	}

	/**
	 * AbstractSorterComparing full configuration.
	 */
	export interface FullConfig<T> extends Config<T> {
		/**
		 * Target list. By default, created automatically.
		 */
		readonly target?: IList<T>;
	}
}
