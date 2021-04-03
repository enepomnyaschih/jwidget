/*
MIT License

Copyright (c) 2021 Egor Nepomnyaschih

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
import Class from "../Class";
import DestroyableReadonlyBindableArray from '../DestroyableReadonlyBindableArray';
import IBindableArray from "../IBindableArray";
import IBindableSet from '../IBindableSet';
import ReadonlyBindableArray from "../ReadonlyBindableArray";
import ReadonlyBindableSet from '../ReadonlyBindableSet';

/**
 * Binds an array to a set, filling it with values of the set in natural order. This order may differ in different
 * browsers. After initialization, all newly added values get appended to the end of the array.
 */
export default class SetConverterToArray<T> extends Class {

	private _targetCreated: boolean;
	private _target: IBindableArray<T>;

	/**
	 * @param source Source set.
	 * @param config Converter configuration.
	 */
	constructor(readonly source: ReadonlyBindableSet<T>, config: SetConverterToArray.Config<T> = {}) {
		super();
		this._targetCreated = config.target == null;
		this._target = this._targetCreated ? new BindableArray<T>(source.silent) : config.target;
		this._target.addAll([...source]);
		this.own(source.onSplice.listen(this._onSplice, this));
		this.own(source.onClear.listen(this._onClear, this));
	}

	/**
	 * Target array.
	 */
	get target(): ReadonlyBindableArray<T> {
		return this._target;
	}

	protected destroyObject() {
		this._target.removeValues(this.source);
		if (this._targetCreated) {
			this._target.destroy();
		}
		super.destroyObject();
	}

	private _onSplice(spliceResult: IBindableSet.SpliceResult<T>) {
		this._splice(spliceResult.deletedValues, spliceResult.addedValues);
	}

	private _onClear(oldContents: ReadonlySet<T>) {
		this._target.removeValues(oldContents);
	}

	protected _splice(removedValueSet: ReadonlySet<T>, addedValueSet: ReadonlySet<T>) {
		const filteredValues = this.target.native.filter(
			value => !removedValueSet.has(value) || addedValueSet.has(value));
		const addedValues = [...addedValueSet].filter(value => !removedValueSet.has(value));
		this._target.trySplice(
			this.target.detectFilter(filteredValues) || [],
			[<IBindableArray.IndexItems<T>>[filteredValues.length, addedValues]]);
	}
}

namespace SetConverterToArray {
	/**
	 * Configuration of `SetConverterToArray`.
	 */
	export interface Config<T> {
		/**
		 * Target array. By default, created automatically.
		 */
		readonly target?: IBindableArray<T>;
	}
}

/**
 * Creates a new array bound to a set with `SetConverterToArray`.
 * @param source Source set.
 * @returns Target array.
 */
export function startConvertingSetToArray<T>(source: ReadonlyBindableSet<T>): DestroyableReadonlyBindableArray<T> {
	if (source.silent) {
		return new BindableArray(source, true);
	}
	const target = new BindableArray<T>();
	return target.owning(new SetConverterToArray<T>(source, {target}));
}
