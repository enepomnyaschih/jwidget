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
import IBindableSet from '../IBindableSet';
import BindableSet from '../BindableSet';
import ReadonlyBindableSet from "../ReadonlyBindableSet";

/**
 * Converter to set.
 */
abstract class AbstractConverterToSet<T> extends Class {
	private _targetCreated: boolean;

	/**
	 * @hidden
	 */
	protected _target: IBindableSet<T>;

	/**
	 * @hidden
	 */
	protected constructor(config: AbstractConverterToSet.Config<T>, getKey: (item: T) => any, silent: boolean) {
		super();
		this._targetCreated = config.target == null;
		this._target = this._targetCreated ? new BindableSet<T>(getKey, silent) : config.target;
	}

	/**
	 * Target set.
	 */
	get target(): ReadonlyBindableSet<T> {
		return this._target;
	}

	/**
	 * @inheritDoc
	 */
	protected destroyObject() {
		if (this._targetCreated) {
			this._target.destroy();
		}
		super.destroyObject();
	}
}

export default AbstractConverterToSet;

namespace AbstractConverterToSet {
	/**
	 * AbstractConverterToSet configuration.
	 */
	export interface Config<T> {
		/**
		 * Target set. By default, created automatically.
		 */
		readonly target?: IBindableSet<T>;
	}
}
