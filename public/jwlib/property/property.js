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

/**
 * @class
 * `<V>` The observable property. A convenient way to keep one object in sync
 * with another object. Has next helpers:
 *
 * - JW.Copier - keeps one property equal to another property
 * - JW.Updater - watches several properties in order to update something by
 * a callback
 * - JW.Functor - watches several properties in order to reassign target
 * property value to a callback result
 * - JW.Mapper - watches several properties in order to recreate and destroy
 * target property value by callbacks
 * - JW.Switcher - watches a property to initialize and release its value
 *
 * Also, see {@link jQuery jQuery} extension methods.
 *
 * For example, you can use the next algorithm to change localization on fly
 * in your Web application:
 *
 *     var locale = {
 *         en: {
 *             hi: "Hi",
 *             bye: "Bye"
 *         },
 *         ru: {
 *             hi: "Привет",
 *             bye: "Пока"
 *         }
 *     };
 *     var language = new JW.Property("en");
 *     var hi = language.{@link JW.Property#$$mapValue $$mapValue}(function(language) { return locale[language].hi; });
 *     var bye = language.{@link JW.Property#$$mapValue $$mapValue}(function(language) { return locale[language].bye; });
 *     $("#hi").{@link jQuery#jwtext jwtext}(hi);
 *     $("#bye").{@link jQuery#jwtext jwtext}(bye);
 *     // Now you can change localization easily
 *     language.{@link #set}("ru");
 *
 * @extends JW.Class
 *
 * @constructor
 * @param {V} value Initial value.
 */
JW.Property = function(value) {
	JW.Property._super.call(this);
	this._value = JW.defn(value, null);
	this._ownsValue = false;
	this._copier = null;
	this.changeEvent = this.own(new JW.Event());
};

JW.extend(JW.Property, JW.Class, {
	/**
	 * @event changeEvent
	 * Property value is changed. Triggered in result of calling #set method.
	 * @param {JW.ValueChangeEventParams} params `<V>` Parameters.
	 */
	// V _value;
	// boolean _ownsValue;
	// JW.Copier<V> _copier;
	
	destroyObject: function() {
		this.bindTo();
		if (this._ownsValue && JW.isSet(this._value)) {
			this._value.destroy();
		}
		this._value = null;
		this._super();
	},
	
	/**
	 * Returns property value.
	 * @returns {V} Property value.
	 */
	get: function() {
		return this._value;
	},
	
	/**
	 * Changes property value and triggers event #changeEvent.
	 * @param {V} value
	 */
	set: function(value) {
		if (value === undefined) {
			value = null;
		}
		var oldValue = this._value;
		if (oldValue === value) {
			return;
		}
		this._value = value;
		this.changeEvent.trigger(new JW.ValueChangeEventParams(this, value, oldValue));
		if (this._ownsValue && JW.isSet(oldValue)) {
			oldValue.destroy();
		}
	},
	
	/**
	 * Makes this property an owner of its value. It means that the value will
	 * be destroyed automatically on reassignment and on destruction of the
	 * property.
	 * @returns {JW.Property} this
	 */
	ownValue: function() {
		this._ownsValue = true;
		return this;
	},
	
	/**
	 * Binds this property to another property using a JW.Copier.
	 * @param {JW.Property} source `<V>` Source property to bind to.
	 */
	bindTo: function(source) {
		if (this._copier) {
			this._copier.destroy();
			this._copier = null;
		}
		if (source) {
			this._copier = new JW.Copier(source, { target: this });
		}
	},

	/**
	 * `<U>` Maps property value.
	 *
	 * If property value is null, returns null.
	 * Otherwise, returns the result of `f` call with property value in argument.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T): U`
	 *
	 * Mapping function.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {U} Result value.
	 */
	map: function(callback, scope) {
		return (this._value == null) ? null : callback.call(scope || this, this._value);
	},

	/**
	 * `<U>` Maps property value.
	 *
	 * If property value is null, returns null property.
	 * Otherwise, returns a property containing the result of `f` call with property value in argument.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T): U`
	 *
	 * Mapping function.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {JW.Property} `<U>` Result value.
	 */
	$map: function(callback, scope) {
		return new JW.Property(this.map(callback, scope));
	},

	/**
	 * `<U>` Maps property value.
	 *
	 * If property value is null, returns null property.
	 * Otherwise, returns a property containing the result of `f` call with property value in argument.
	 * Starts continuous synchronization, i.e. creates JW.Mapper implicitly.
	 * In comparison to #$$mapObject method, doesn't destroy the previously assigned values.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T): U`
	 *
	 * Mapping function.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {JW.Property} `<U>` Result value.
	 */
	$$mapValue: function(callback, scope) {
		var result = new JW.Property();
		result.own(new JW.Mapper([this], {
			target: result,
			createValue: callback,
			scope: scope || this
		}));
		return result;
	},

	/**
	 * `<U>` Maps property value.
	 *
	 * If property value is null, returns null property.
	 * Otherwise, returns a property containing the result of `f` call with property value in argument.
	 * Starts continuous synchronization, i.e. creates JW.Mapper implicitly.
	 * In comparison to #$$mapValue method, destroys the previously assigned values.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T): U`
	 *
	 * Mapping function.
	 *
	 * @param {Object} [scope] `f` call scope. Defaults to `this`.
	 * @returns {JW.Property} `<U>` Result value.
	 */
	$$mapObject: function(callback, scope) {
		var result = new JW.Property();
		result.own(new JW.Mapper([this], {
			target: result,
			createValue: callback,
			destroyValue: JW.destroy,
			scope: scope || this
		}));
		return result;
	}
});
