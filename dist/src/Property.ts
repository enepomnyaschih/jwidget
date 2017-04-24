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
import {destroy} from "./Core";
import Bindable from "./Bindable";
import Destroyable from "./Destroyable";
import Event from "./Event";
import IEvent from "./IEvent";
import IProperty from "./IProperty";
import {mapProperties, mapDestroyableProperties} from "./Mapper";
import ValueChangeEventParams from "./ValueChangeEventParams";
import Watchable from "./Watchable";

/**
 * Container for a value. Provides basic data binding functionality.
 */
export default class Property<V> extends Class implements IProperty<V> {
	private _ownsValue = false;
	private _changeEvent: IEvent<ValueChangeEventParams<V>>;

	/**
	 * Constructs a property and sets initial value.
	 * @param value Initial value.
	 * @param silent If true, uses `dummyEvent` implementation for `changeEvent.
	 */
	constructor(protected value: V = null, silent: boolean = false) {
		super();
		this._changeEvent = Event.make<ValueChangeEventParams<V>>(this, silent);
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
	get changeEvent(): Bindable<ValueChangeEventParams<V>> {
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
		this._changeEvent.trigger({ sender: this, value: value, oldValue: oldValue });
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
		return mapProperties([this], callback, scope || this);
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
		return mapDestroyableProperties([this], callback, scope || this);
	}
}
