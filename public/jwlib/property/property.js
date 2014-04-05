/*
	jWidget Lib source file.
	
	Copyright (C) 2014 Egor Nepomnyaschih
	
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

/**
 * @class
 * `<V>` The observable property. A convenient way to keep one object in sync
 * with another object. Use next helpers:
 *
 * - JW.Copier - keeps one property equal to another property
 * - JW.Updater - watches several properties in order to update something by
 * a callback
 * - JW.Functor - watches several properties in order to reassign target
 * property value to a callback result
 * - JW.Switcher - watches a property to initialize and release its value
 * - JW.UI.TextUpdater - watches a string property and updates the text in a
 * DOM element
 * - JW.UI.HtmlUpdater - watches a string property and updates the HTML in a
 * DOM element
 * - JW.UI.ValueUpdater - watches a string property and updates the value in a
 * DOM element
 * - JW.UI.AttrUpdater - watches a string property and updates the specified
 * attribute in a DOM element
 * - JW.UI.PropUpdater - watches a boolean property and updates the specified
 * DOM property in a DOM element
 * - JW.UI.CssUpdater - watches a string property and updates the specified
 * CSS style in a DOM element
 * - JW.UI.ClassUpdater - watches a boolean property and updates the specified
 * CSS class presence in a DOM element
 * - JW.UI.ValueListener - watches the value in a DOM element and updates a
 * string property
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
 *     var hiFunctor = new JW.Functor([ language ], function(language) {
 *         return locale[language].hi;
 *     });
 *     var byeFunctor = new JW.Functor([ language ], function(language) {
 *         return locale[language].bye;
 *     });
 *     new JW.UI.TextUpdater($("#hi"), hiFunctor.{@link JW.Functor#property-target target});
 *     new JW.UI.TextUpdater($("#bye"), byeFunctor.{@link JW.Functor#property-target target});
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
	
	destroy: function() {
		this.bindTo();
		if (this._ownsValue && this._value) {
			this._value.destroy();
		}
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
		var oldValue = this._value;
		if (oldValue === value) {
			return;
		}
		this._value = value;
		this.changeEvent.trigger(new JW.ValueChangeEventParams(this, value, oldValue));
		if (this._ownsValue && oldValue) {
			oldValue.destroy();
		}
	},
	
	/**
	 * Makes this property an owner of its value. It means that the value will
	 * be destroyed automatically on reassignment and on destruction of the
	 * property.
	 */
	ownValue: function() {
		this._ownsValue = true;
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
	}
});
