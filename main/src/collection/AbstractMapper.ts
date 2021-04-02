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

/**
 * Binds one collection to another, filling it with results of a function call for each value of the source collection.
 */
abstract class AbstractMapper<T, U> extends Class {

	protected _destroy: (item: U, data: T) => void;

	protected constructor(protected _create: (data: T) => U, config: AbstractMapper.Config<T, U> = {}) {
		super();
		this._destroy = config.destroy;
	}

	protected destroyObject() {
		this._create = null;
		this._destroy = null;
		super.destroyObject();
	}
}

export default AbstractMapper;

namespace AbstractMapper {
	/**
	 * Signature of `AbstractMapper.Config.destroy` callback.
	 */
	export interface DestroyCallback<T, U> {
		(targetValue: U, sourceValue: T): void;
	}

	/**
	 * Configuration of `AbstractMapper`.
	 */
	export interface Config<T, U> {
		/**
		 * Destructor of a mapped value. Destroys a value when it leaves the target collection.
		 */
		readonly destroy?: DestroyCallback<T, U>;
	}
}
