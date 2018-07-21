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
 * Abstract collection item mapper. Builds new collection of the same type, consisting of results of callback function
 * call for each collection item, and starts continuous synchronization.
 * @param T Source collection item type.
 * @param U Target collection item type.
 */
abstract class AbstractMapper<T, U> extends Class {
	/**
	 * @hidden
	 */
	protected _destroy: (item: U, data: T) => void;

	/**
	 * @hidden
	 */
	protected _scope: any;

	/**
	 * Target collection.
	 */
	readonly target: ReadonlyCollection<U>;

	/**
	 * @hidden
	 */
	constructor(readonly source: ReadonlyCollection<T>, protected _create: (data: T) => U,
				config: AbstractMapper.Config<T, U> = {}) {
		super();
		this._destroy = config.destroy;
		this._scope = config.scope || this;
	}

	/**
	 * @inheritDoc
	 */
	protected destroyObject() {
		this._create = null;
		this._destroy = null;
		this._scope = null;
		super.destroyObject();
	}
}

export default AbstractMapper;

namespace AbstractMapper {
	export interface DestroyCallback<T, U> {
		(targetValue: U, sourceValue: T): any;
	}

	/**
	 * AbstractMapper configuration.
	 * @param T Source collection item type.
	 * @param U Target collection item type.
	 */
	export interface Config<T, U> {
		/**
		 * Item destructor. Destroys an item of target collection.
		 */
		readonly destroy?: DestroyCallback<T, U>;

		/**
		 * Call scope of mapper's `create` and `destroy` callbacks. Defaults to synchronizer itself.
		 */
		readonly scope?: any;

		/**
		 * Identifies an item in the auto-created target collection for optimization of some algorithms.
		 */
		readonly getKey?: (item: U) => any;
	}
}
