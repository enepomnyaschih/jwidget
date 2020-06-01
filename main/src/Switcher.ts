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

import Bindable from './Bindable';
import Class from './Class';

/**
 * Listens source property modification and calls the specified functions.
 */
class Switcher<T> extends Class {
	private _init: Switcher.Callback<T>;
	private _done: Switcher.Callback<T>;
	private _scope: any;
	private _acceptNil: boolean;
	private _value: T;

	/**
	 * @param source Source property.
	 * @param config Configuration.
	 */
	constructor(readonly source: Bindable<T>, config: Switcher.Config<T> = {}) {
		super();
		this._init = config.init;
		this._done = config.done;
		this._scope = config.scope || this;
		this._acceptNil = config.acceptNil || false;
		this._doInit();
		this.own(source.changeEvent.listen(this._update, this));
	}

	protected destroyObject() {
		this._doDone();
		this._init = null;
		this._done = null;
		this._scope = null;
		this._value = null;
		super.destroyObject();
	}

	private _update() {
		this._doDone();
		this._doInit();
	}

	private _doInit() {
		this._value = this.source.get();
		if (this._init && (this._acceptNil || this._value != null)) {
			this._init.call(this._scope, this._value);
		}
	}

	private _doDone() {
		if (this._done && (this._acceptNil || this._value != null)) {
			this._done.call(this._scope, this._value);
		}
		this._value = null;
	}
}

namespace Switcher {
	/**
	 * Switcher callback.
	 */
	export interface Callback<T> {
		(value: T): any;
	}

	/**
	 * Configuration of Switcher.
	 */
	export interface Config<T> {
		/**
		 * Value initialization callback.
		 */
		readonly init?: Callback<T>;

		/**
		 * Value releasing callback.
		 */
		readonly done?: Callback<T>;

		/**
		 * `init` and `done` call scope. Defaults to switcher itself.
		 */
		readonly scope?: any;

		/**
		 * Set to true if you want the callbacks to be called even if one of source values is null.
		 */
		readonly acceptNil?: boolean;
	}
}

export default Switcher;
