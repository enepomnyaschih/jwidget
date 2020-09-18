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

import BindableArray from '../BindableArray';
import Class from '../Class';
import IBindableArray from '../IBindableArray';
import IndexItems from '../IndexItems';
import ReadonlyBindableArray from "../ReadonlyBindableArray";

/**
 * Converter to array.
 */
abstract class AbstractConverterToArray<T> extends Class {

	private _targetCreated: boolean;

	protected _target: IBindableArray<T>;

	protected constructor(config: AbstractConverterToArray.Config<T>, silent: boolean) {
		super();
		this._targetCreated = config.target == null;
		this._target = this._targetCreated ? new BindableArray<T>(silent) : config.target;
	}

	protected destroyObject() {
		if (this._targetCreated) {
			this._target.destroy();
		}
		super.destroyObject();
	}

	/**
	 * Target array.
	 */
	get target(): ReadonlyBindableArray<T> {
		return this._target;
	}

	protected _splice(removedValueSet: ReadonlySet<T>, addedValueSet: ReadonlySet<T>) {
		const filteredValues = this.target.native.filter(
			value => !removedValueSet.has(value) || !addedValueSet.has(value));
		const addedValues = [...addedValueSet].filter(value => !removedValueSet.has(value));
		this._target.trySplice(
			this.target.detectFilter(filteredValues) || [],
			[new IndexItems(filteredValues.length, addedValues)]);
	}
}

export default AbstractConverterToArray;

namespace AbstractConverterToArray {
	/**
	 * AbstractConverterToArray configuration.
	 */
	export interface Config<T> {
		/**
		 * Target array. By default, created automatically.
		 */
		readonly target?: IBindableArray<T>;
	}
}
