﻿/*
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
 *
 * `<T>` jWidget object adapter. JW.Class wrapper of arbitrary value.
 *
 * Since some jWidget classes work with JW.Class instances only (for example, JW.AbstractSet),
 * the library provides a simple adapter for any objects and values conversion to JW.Class.
 *
 * If you want to track the value and react on its modification, use JW.Property instead.
 *
 * @extends JW.Class
 *
 * @constructor
 * @param {T} value Object.
 */
JW.Proxy = function(value) {
	JW.Proxy._super.call(this);
	this.value = value;
	this._ownsValue = false;
};

JW.extend(JW.Proxy, JW.Class, {
	/**
	 * @property {T} value Object.
	 * @deprecated
	 */
	// boolean _ownsValue;
	
	destroy: function() {
		if (this._ownsValue && this.value) {
			this.value.destroy();
		}
		this._super();
	},
	
	/**
	 * Returns object.
	 * @returns {V} Object.
	 */
	get: function() {
		return this.value;
	},
	
	/**
	 * Changes object.
	 * @param {V} value
	 */
	set: function(value) {
		var oldValue = this._value;
		if (oldValue === value) {
			return;
		}
		this._value = value;
		if (this._ownsValue && oldValue) {
			oldValue.destroy();
		}
	},
	
	/**
	 * Makes this proxy an owner of its value. It means that the value will
	 * be destroyed automatically on destruction of the proxy.
	 */
	ownValue: function() {
		this._ownsValue = true;
	}
});
