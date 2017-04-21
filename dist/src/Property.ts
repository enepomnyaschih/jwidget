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

import {destroy} from './Core';
import Class from './Class';
import Copier from './Copier';
import Destroyable from './Destroyable';
import Event from './Event';
import Mapper from './Mapper';

/**
 * The observable property. A convenient way to keep an object in sync with another object.
 * Provides a number of model and view bindings.
 */
export default class Property<V> extends Class {
	private _ownsValue = false;
	private _copier: Copier<V> = null;

	/**
	 * Property value is changed. Triggered in result of `set` method call if the value has been changed.
	 */
	changeEvent = this.own(new Event<PropertyChangeEventParams<V>>());

	/**
	 * @param _value Initial value.
	 */
	constructor(protected _value: V = null) {
		super();
	}

	protected destroyObject() {
		this.bindTo();
		if (this._ownsValue) {
			destroy(this._value);
		}
		super.destroyObject();
	}

	/**
	 * Returns property value.
	 */
	get(): V {
		return this._value;
	}

	/**
	 * Changes property value and triggers `changeEvent` if the value has been changed.
	 */
	set(value: V) {
		if (value === undefined) {
			value = null;
		}
		let oldValue = this._value;
		if (oldValue === value) {
			return;
		}
		this._value = value;
		this.changeEvent.trigger({ sender: this, value: value, oldValue: oldValue });
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
	 * Binds this property to another property using a `Copier`.
	 * Unbinds a previously bound property.
	 *
	 * @param source Source property to bind to. Omit to simply unbind.
	 */
	bindTo<U extends V>(source?: Property<U>) {
		if (this._copier != null) {
			this._copier.destroy();
			this._copier = null;
		}
		if (source != null) {
			this._copier = new Copier<V>(source, { target: this });
		}
	}

	/**
	 * Builds a new property containing the result of the callback function called
	 * on this property value. To stop synchronization, destroy the result property.
	 * In comparison to `mapObject` method, doesn't destroy the previously assigned target values.
	 *
	 * @param callback Mapping function.
	 * @param scope `callback` call scope. Defaults to the property itself.
	 */
	mapValue<U>(callback: (value: V) => U, scope?: any): Property<U> {
		const result = new Property<U>();
		result.own(new Mapper([this], {
			target: result,
			createValue: callback,
			scope: scope || this
		}));
		return result;
	}

	/**
	 * Builds a new property containing the result of the callback function called
	 * on this property value. To stop synchronization, destroy the result property.
	 * In comparison to `mapObject` method, destroys the previously assigned target values.
	 *
	 * @param callback Mapping function.
	 * @param scope `callback` call scope. Defaults to the property itself.
	 */
	mapObject<U extends Destroyable>(callback: (value: V) => U, scope?: any): Property<U> {
		const result = new Property<U>();
		result.own(new Mapper([this], {
			target: result,
			createValue: callback,
			destroyValue: destroy,
			scope: scope || this
		}));
		return result;
	}
}

/**
 * `Property.changeEvent` params.
 */
export interface PropertyChangeEventParams<V> {
	/**
	 * Sender property.
	 */
	sender: Property<V>;

	/**
	 * New value.
	 */
	value: V;

	/**
	 * Old value.
	 */
	oldValue: V;
}
