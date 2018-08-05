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
import DestroyableBindable from '../DestroyableBindable';
import IList from '../IList';
import Property from '../Property';
import ReadonlyList from '../ReadonlyList';
import AbstractCounter from './AbstractCounter';

/**
 * AbstractCounter implementation for List.
 */
export default class ListCounter<T> extends AbstractCounter<T> {
	/**
	 * Source list.
	 */
	readonly source: ReadonlyList<T>;

	/**
	 * @param source Source list.
	 * @param test Filtering criteria.
	 * @param config Counter configuration.
	 */
	constructor(source: ReadonlyList<T>, test: (item: T) => any, config?: AbstractCounter.Config) {
		super(source, test, config);
		this.own(source.spliceEvent.listen(this._onSplice, this));
		this.own(source.replaceEvent.listen(this._onReplace, this));
		this.own(source.clearEvent.listen(this._onClear, this));
	}

	private _onSplice(params: IList.SpliceEventParams<T>) {
		var spliceResult = params.spliceResult;
		var value = this._target.get();
		spliceResult.removedItemsList.forEach((indexItems) => {
			value -= ArrayUtils.count(indexItems.items, this._test, this._scope);
		});
		spliceResult.addedItemsList.forEach((indexItems) => {
			value += ArrayUtils.count(indexItems.items, this._test, this._scope);
		});
		this._target.set(value);
	}

	private _onReplace(params: IList.ReplaceEventParams<T>) {
		var oldFiltered = this._test.call(this._scope, params.oldItem);
		var newFiltered = this._test.call(this._scope, params.newItem);
		if (oldFiltered && !newFiltered) {
			this._target.set(this._target.get() - 1);
		} else if (!oldFiltered && newFiltered) {
			this._target.set(this._target.get() + 1);
		}
	}

	private _onClear() {
		this._target.set(0);
	}
}

/**
 * Counts matching items in a list and starts synchronization.
 * @param source Source list.
 * @param test Filtering criteria.
 * @param scope Call scope of `test` function.
 * @returns Target property.
 */
export function countList<T>(source: ReadonlyList<T>, test: (item: T) => any,
                             scope?: any): DestroyableBindable<number> {
	if (source.silent) {
		return new Property(source.count(test, scope), true);
	}
	const target = new Property(0);
	return target.owning(new ListCounter<T>(source, test, {target, scope}));
}
