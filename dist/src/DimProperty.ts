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

import Class from "./Class";
import {destroy} from './Core';
import Destroyable from "./Destroyable";
import dummyEvent from "./dummyEvent";
import Bindable from "./Bindable";
import IProperty from "./IProperty";
import ValueChangeEventParams from "./ValueChangeEventParams";
import Watchable from "./Watchable";

/**
 * Dummy implementation of `IProperty` interface.
 * As opposed to `ObservableProperty`, doesn't really trigger `changeEvent`, just pretends it does that.
 */
export default class DimProperty<V> extends Class implements IProperty<V> {
	private _ownsValue = false;

	/**
	 * Constructs a property and sets initial value.
	 * @param value Initial value.
	 */
	constructor(protected value: V = null) {
		super();
	}

	protected destroyObject() {
		if (this._ownsValue) {
			destroy(this.value);
		}
		super.destroyObject();
	}

	/**
	 * Property value is changed. In `DimProperty`, it never gets triggered - this is `dummyEvent`.
	 */
	get changeEvent(): Bindable<ValueChangeEventParams<V>> {
		return dummyEvent;
	}

	/**
	 * Returns current property value.
	 * Think twice before calling this method - probably it makes sense to use some kind of binding instead?
	 */
	get(): V {
		return this.value;
	}

	/**
	 * Changes property value. In `DimProperty`, it never triggers `changeEvent` - this is `dummyEvent`.
	 * @param value New value to set.
	 */
	set(value: V) {
		if (value === undefined) {
			value = null;
		}
		let oldValue = this.value;
		if (oldValue === value) {
			return;
		}
		this.value = value;
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
	 * @param callback Mapping function.
	 * @param scope `callback` call scope. Defaults to the property itself.
	 */
	map<U>(callback: (value: V) => U, scope?: any): Watchable<U> {
		return new DimProperty(callback.call(scope || this, this.value));
	}

	/**
	 * Builds a new property containing the result of the callback function called
	 * on this property value. To stop synchronization, destroy the result property.
	 * In comparison to `map` method, destroys the previously assigned target values.
	 * To map multiple properties, use `Mapper`.
	 *
	 * @param callback Mapping function.
	 * @param scope `callback` call scope. Defaults to the property itself.
	 */
	mapDestroyable<U extends Destroyable>(callback: (value: V) => U, scope?: any): Watchable<U> {
		return new DimProperty(callback.call(scope || this, this.value)).ownValue();
	}
}
