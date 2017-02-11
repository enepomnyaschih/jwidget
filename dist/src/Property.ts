import {destroy} from './Core';
import Class from './Class';
import Copier from './Copier';
import Destroyable from './Destroyable';
import Event from './Event';
import Mapper from './Mapper';

/**
 * The observable property. A convenient way to keep an object in sync
 * with another object. Has the next helpers:
 *
 * - [[JW.Copier]] - keeps one property equal to another property
 * - [[JW.Updater]] - watches several properties in order to update something by
 * a callback
 * - [[JW.Functor]] - watches several properties in order to reassign target
 * property value to a callback result
 * - [[JW.Mapper]] - watches several properties in order to recreate and destroy
 * target property value by callbacks
 * - [[JW.Switcher]] - watches a property to initialize and release its value
 *
 * Also, see [[JQuery|jQuery extension methods]].
 *
 * For example, you can use the next algorithm to change localization on fly
 * in your Web application:
 *
 *     let locale: any = {
 *         en: {
 *             hi: "Hi",
 *             bye: "Bye"
 *         },
 *         ru: {
 *             hi: "Привет",
 *             bye: "Пока"
 *         }
 *     };
 *     let language = new JW.Property<string>("en");
 *     let hi = language.$$mapValue<string>((language) => { return locale[language].hi; });
 *     let bye = language.$$mapValue<string>((language) => { return locale[language].bye; });
 *     $("#hi").jwtext(hi);
 *     $("#bye").jwtext(bye);
 *     // Now you can change localization easily
 *     language.set("ru");
 *
 * @param V Property value type.
 */
export default class Property<V> extends Class {
	private _ownsValue = false;
	private _copier: Copier<V> = null;

	/**
	 * Property value is changed. Triggered in result of [[set]] method call if the value has been changed.
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
	 * Changes property value and triggers [[changeEvent]] if the value has been changed.
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
	 * @returns this
	 */
	ownValue(): Property<V> {
		this._ownsValue = true;
		return this;
	}

	/**
	 * Binds this property to another property using a [[JW.Copier]].
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
	 * Works the same way as [[$map]] but also starts synchronization.
	 * To stop synchronization, destroy the result property.
	 * In comparison to [[$$mapObject]] method, doesn't destroy previously assigned values.
	 *
	 * @param callback Mapping function.
	 * @param scope **callback** call scope. Defaults to property itself.
	 * @returns Result property.
	 */
	mapValue<U>(callback: (value: V) => U, scope?: any): Property<U> {
		let result = new Property<U>();
		result.own(new Mapper([this], {
			target: result,
			createValue: callback,
			scope: scope || this
		}));
		return result;
	}

	/**
	 * Works the same way as [[$map]] but also starts synchronization.
	 * To stop synchronization, destroy the result property.
	 * In comparison to [[$$mapValue]] method, destroys previously assigned values.
	 *
	 * @param callback Mapping function.
	 * @param scope **callback** call scope. Defaults to property itself.
	 * @returns Result property.
	 */
	mapObject<U extends Destroyable>(callback: (value: V) => U, scope?: any): Property<U> {
		let result = new Property<U>();
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
 * [[JW.Property]]'s [[JW.Property.changeEvent|changeEvent]] params.
 *
 * @param V Property value type.
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
