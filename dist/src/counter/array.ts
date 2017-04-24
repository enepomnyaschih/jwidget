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

import AbstractCollectionCounter from './AbstractCollectionCounter';
import IArray from '../IArray';
import Property from '../Property';
import Watchable from '../Watchable';
import * as ArrayUtils from '../ArrayUtils';

/**
 * [[JW.AbstractCollection.Counter|Counter]] implementation for [[JW.Array]].
 */
export default class ArrayCounter<T> extends AbstractCollectionCounter<T> {
	/**
	 * @inheritdoc
	 */
	readonly source: IArray<T>;

	/**
	 * @inheritdoc
	 */
	constructor(source: IArray<T>, config: AbstractCollectionCounter.Config<T>) {
		super(source, config);
		this.own(source.spliceEvent.bind(this._onSplice, this));
		this.own(source.replaceEvent.bind(this._onReplace, this));
		this.own(source.clearEvent.bind(this._onClear, this));
	}

	private _onSplice(params: IArray.SpliceEventParams<T>) {
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

	private _onReplace(params: IArray.ReplaceEventParams<T>) {
		var oldFiltered = this._test.call(this._scope, params.oldItem) !== false;
		var newFiltered = this._test.call(this._scope, params.newItem) !== false;
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

export function countArray<T>(source: IArray<T>, test: (item: T) => boolean, scope?: any): Watchable<number> {
	if (source.silent) {
		return source.$count(test, scope);
	}
	var result = new Property(0);
	result.own(new ArrayCounter<T>(source, {
		target: result,
		test: test,
		scope: scope
	}));
	return result;
}
