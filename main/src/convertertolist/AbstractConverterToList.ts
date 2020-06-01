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
