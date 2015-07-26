/*
	jWidget Lib source file.
	
	Copyright (C) 2015 Egor Nepomnyaschih
	
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
 * `<V> extends JW.ValueEventParams<V>` Value change event params. Provides
 * old value along with new value.
 * @extends JW.ValueEventParams
 *
 * @constructor
 * @param {Object} sender Event sender.
 * @param {V} value New value.
 * @param {V} oldValue Old value.
 */
JW.ValueChangeEventParams = function(sender, value, oldValue) {
	JW.ValueChangeEventParams._super.call(this, sender, value);
	this.oldValue = oldValue;
};

JW.extend(JW.ValueChangeEventParams, JW.ValueEventParams, {
	/**
	 * @property {V} oldValue Old value.
	 */
});
