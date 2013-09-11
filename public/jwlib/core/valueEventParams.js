/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
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
 * `<V>` Параметры события со значением. Обычно используются в событии изменения значения какой-либо переменной или
 * поля.
 * @extends JW.EventParams
 *
 * @constructor
 * @param {Object} sender Отправитель события.
 * @param {V} value Значение.
 */
JW.ValueEventParams = function(sender, value) {
	JW.ValueEventParams._super.call(this, sender);
	this.value = value;
};

JW.extend(JW.ValueEventParams, JW.EventParams, {
	/**
	 * @property {V} value Значение.
	 */
});
