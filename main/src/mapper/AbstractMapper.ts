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
		 * Call scope of mapper's `create` and `destroy` callbacks. Defaults to the synchronizer itself.
		 */
		readonly scope?: any;

		/**
		 * Identifies an item in the auto-created target collection for optimization of some algorithms.
		 */
		readonly getKey?: (item: U) => any;
	}
}
