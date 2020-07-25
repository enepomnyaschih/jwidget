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

import Bindable from "./Bindable";
import Class from "./Class";
import DestroyableBindable from "./DestroyableBindable";
import Dispatcher from "./Dispatcher";
import IDispatcher from "./IDispatcher";
import {destroy} from "./index";
import IProperty from "./IProperty";
import Listenable from "./Listenable";
import {default as Mapper, mapProperties} from "./Mapper";

/**
 * Container for a value. Provides basic data binding functionality.
 */
export default class Property<V> extends Class implements IProperty<V> {
	private _ownsValue = false;

	protected _changeEvent: IDispatcher<Bindable.ChangeEventParams<V>>;

	/**
	 * Constructs a property and sets initial value.
	 * @param value Initial value.
	 * @param silent If true, uses `dummyEvent` implementation for `changeEvent.
	 */
	constructor(protected value: V = null, silent: boolean = false) {
		super();
		this._changeEvent = Dispatcher.make<Bindable.ChangeEventParams<V>>(silent);
	}

	protected destroyObject() {
		if (this._ownsValue) {
			destroy(this.value);
		}
		super.destroyObject();
	}

	/**
	 * Checks if this property never triggers events. This knowledge may help you do certain code optimizations.
	 */
	get silent() {
		return this._changeEvent.dummy;
	}

	/**
	 * Property value is changed. Triggered in result of `set` method call if the value has been changed.
	 */
	get changeEvent(): Listenable<Bindable.ChangeEventParams<V>> {
		return this._changeEvent;
	}

	/**
	 * Returns current property value.
	 * Think twice before calling this method - probably it makes sense to use some kind of binding instead?
	 */
	get(): V {
		return this.value;
	}

	/**
	 * Changes property value and triggers `changeEvent` if the value has been changed.
	 * @param value New value to set.
	 */
	set(value: V) {
		if (value === undefined) {
			value = null;
		}
		const oldValue = this.value;
		if (oldValue === value) {
			return;
		}
		this.value = value;
		this._changeEvent.dispatch({ sender: this, value: value, oldValue: oldValue });
		if (this._ownsValue) {
			destroy(oldValue);
		}
	}

	/**
	 * Makes this property an owner of its value. It means that the value is
	 * destroyed automatically on reassignment or destruction of the
	 * property.
	 */
	ownValue(): this {
		this._ownsValue = true;
		return this;
	}

	/**
	 * Builds a new property containing the result of the callback function called
	 * on this property value. To stop synchronization, destroy the result property.
	 * In comparison to `mapDestroyable` method, doesn't destroy the previously assigned target values.
	 * To map multiple properties, use `Mapper`.
	 *
	 * @param create Mapping function.
	 * @param config Mapping configuration.
	 */
	map<U>(create: (value: V) => U, config?: Mapper.Config<U>): DestroyableBindable<U> {
		return mapProperties([this], create, config);
	}
}
