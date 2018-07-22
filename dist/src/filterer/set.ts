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

import DestroyableReadonlySet from '../DestroyableReadonlySet';
import ISet from '../ISet';
import ReadonlySet from '../ReadonlySet';
import Set from '../Set';
import AbstractFilterer from './AbstractFilterer';

/**
 * AbstractFilterer implementation for Set.
 * @param T Collection item type.
 */
class SetFilterer<T> extends AbstractFilterer<T> {
	private _targetCreated: boolean;

	/**
	 * Source collection.
	 */
	readonly source: ReadonlySet<T>;

	/**
	 * @inheritDoc
	 */
	readonly target: ISet<T>;

	/**
	 * @param source Source collection.
	 * @param test Filtering criteria.
	 * @param config Filterer configuration.
	 */
	constructor(source: ReadonlySet<T>, test: (item: T) => any,
				config: SetFilterer.Config<T> = {}) {
		super(source, test, config);
		this._targetCreated = config.target == null;
		this.target = this._targetCreated ? new Set<T>(source.getKey, this.source.silent) : config.target;
		this.target.tryAddAll(source.toList().items.filter(this._test, this._scope));
		this.own(source.spliceEvent.listen(this._onSplice, this));
		this.own(source.clearEvent.listen(this._onClear, this));
	}

	/**
	 * @inheritDoc
	 */
	protected destroyObject() {
		this.target.tryRemoveAll(this.source.toArray());
		if (this._targetCreated) {
			this.target.destroy();
		}
		super.destroyObject();
	}

	private _onSplice(params: ISet.SpliceEventParams<T>) {
		var spliceResult = params.spliceResult;
		this.target.trySplice(
			spliceResult.removedItems,
			spliceResult.addedItems.filter(this._test, this._scope));
	}

	private _onClear(params: ISet.ItemsEventParams<T>) {
		this.target.tryRemoveAll(params.items);
	}
}

export default SetFilterer;

namespace SetFilterer {
	/**
	 * SetFilterer configuration.
	 * @param T Collection item type.
	 */
	export interface Config<T> extends AbstractFilterer.Config {
		/**
		 * Target collection.
		 */
		readonly target?: ISet<T>;
	}
}

/**
 * Filters a set and starts synchronization.
 * @param source Source collection.
 * @param test Filtering criteria.
 * @param scope Call scope of `test` function.
 * @returns Target collection.
 */
export function filterSet<T>(source: ReadonlySet<T>, test: (item: T) => any,
                             scope?: any): DestroyableReadonlySet<T> {
	if (source.silent) {
		return source.filter(test, scope);
	}
	const target = new Set<T>(source.getKey);
	return target.owning(new SetFilterer<T>(source, test, {target, scope}));
}
