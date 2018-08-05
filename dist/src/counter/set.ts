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
import ISet from '../ISet';
import Property from '../Property';
import ReadonlySet from '../ReadonlySet';
import AbstractCounter from './AbstractCounter';

/**
 * AbstractCounter implementation for Set.
 */
export default class SetCounter<T> extends AbstractCounter<T> {
	/**
	 * Source set.
	 */
	readonly source: ReadonlySet<T>;

	/**
	 * @param source Source set.
	 * @param test Filtering criteria.
	 * @param config Counter configuration.
	 */
	constructor(source: ReadonlySet<T>, test: (item: T) => any,
				config?: AbstractCounter.Config) {
		super(source, test, config);
		this.own(source.spliceEvent.listen(this._onSplice, this));
		this.own(source.clearEvent.listen(this._onClear, this));
	}

	private _onSplice(params: ISet.SpliceEventParams<T>) {
		var spliceResult = params.spliceResult;
		this._target.set(this._target.get() -
			ArrayUtils.count(spliceResult.removedItems, this._test, this._scope) +
			ArrayUtils.count(spliceResult.addedItems, this._test, this._scope));
	}

	private _onClear() {
		this._target.set(0);
	}
}

/**
 * Counts matching items in a set and starts synchronization.
 * @param source Source set.
 * @param test Filtering criteria.
 * @param scope Call scope of `test` function.
 * @returns Target property.
 */
export function countSet<T>(source: ReadonlySet<T>, test: (item: T) => any,
                            scope?: any): DestroyableBindable<number> {
	if (source.silent) {
		return new Property(source.count(test, scope), true);
	}
	const target = new Property(0);
	return target.owning(new SetCounter<T>(source, test, {target, scope}));
}
