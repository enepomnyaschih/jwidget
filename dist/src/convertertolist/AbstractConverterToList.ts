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

import Class from '../Class';
import IList from '../IList';
import IndexItems from '../IndexItems';
import {VidSet} from '../internal';
import List from '../List';
import ReadonlyCollection from '../ReadonlyCollection';
import ReadonlyList from "../ReadonlyList";

/**
 * Converter to list.
 * @param T Collection item type.
 */
abstract class AbstractConverterToList<T> extends Class {
	private _targetCreated: boolean;

	/**
	 * @hidden
	 */
	protected _target: IList<T>;

	/**
	 * @hidden
	 */
	constructor(readonly source: ReadonlyCollection<T>, config: AbstractConverterToList.Config<T> = {}) {
		super();
		this._targetCreated = config.target == null;
		this._target = this._targetCreated ? new List<T>(source.getKey, source.silent) : config.target;
		this._target.addAll(source.asArray());
	}

	/**
	 * Target list.
	 */
	get target(): ReadonlyList<T> {
		return this._target;
	}

	/**
	 * @inheritDoc
	 */
	protected destroyObject() {
		this._target.removeItems(this.source.asArray());
		if (this._targetCreated) {
			this._target.destroy();
		}
		super.destroyObject();
	}

	/**
	 * @hidden
	 */
	protected _splice(removedItemsSet: VidSet<T>, addedItemsSet: VidSet<T>) {
		const filteredItems = this.target.items.filter((item) => {
			return !removedItemsSet.contains(item) || !addedItemsSet.contains(item);
		});
		const addedItems = addedItemsSet.values.filter((item) => {
			return !removedItemsSet.contains(item);
		});
		this._target.trySplice(
			this.target.detectFilter(filteredItems) || [],
			[new IndexItems(filteredItems.length, addedItems)]);
	}
}

export default AbstractConverterToList;

namespace AbstractConverterToList {
	/**
	 * AbstractConverterToList configuration.
	 * @param T Collection item type.
	 */
	export interface Config<T> {
		/**
		 * Target list. By default, created automatically.
		 */
		readonly target?: IList<T>;
	}
}
