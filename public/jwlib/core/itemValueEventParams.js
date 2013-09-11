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
 * `<T, V> extends JW.ValueEventParams<V>` Параметры события с элементом и значением. Обычно используется в событии изменения значения какого-либо
 * поля какого-либо элемента коллекции.
 * @extends JW.ValueEventParams
 *
 * @constructor
 * @param {Object} sender Отправитель события.
 * @param {T} item Элемент.
 * @param {V} value Значение.
 */
JW.ItemValueEventParams = function(sender, item, value) {
	JW.ItemValueEventParams._super.call(this, sender, value);
	this.item = item;
};

JW.extend(JW.ItemValueEventParams, JW.ValueEventParams, {
	/**
	 * @property {T} item Элемент.
	 */
});
