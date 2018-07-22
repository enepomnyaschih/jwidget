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
import ReadonlyCollection from '../ReadonlyCollection';

/**
 * Abstract collection filterer. Builds a new collection of the same type, consisting of items the callback function
 * returns truthy value for, and starts continuous synchronization. Preserves item order in a list.
 * @param T Collection item type.
 */
abstract class AbstractFilterer<T> extends Class {
	/**
	 * @hidden
	 */
	protected _scope: any;

	/**
	 * Target collection.
	 */
	readonly target: ReadonlyCollection<T>;

	/**
	 * @param source Source collection.
	 * @param _test Filtering criteria.
	 * @param config Filterer configuration.
	 */
	constructor(readonly source: ReadonlyCollection<T>, protected _test: (item: T) => any,
				config: AbstractFilterer.Config = {}) {
		super();
		this._scope = config.scope || this;
	}

	/**
	 * @inheritDoc
	 */
	protected destroyObject() {
		this._test = null;
		this._scope = null;
		super.destroyObject();
	}
}

export default AbstractFilterer;

namespace AbstractFilterer {
	/**
	 * AbstractFilterer configuration.
	 */
	export interface Config {
		/**
		 * Call scope of filterer's `test` callback. Defaults to the synchronizer itself.
		 */
		readonly scope?: any;
	}
}
