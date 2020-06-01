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
