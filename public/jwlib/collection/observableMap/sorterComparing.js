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
 *
 * `<T> extends JW.AbstractMap.SorterComparing<T>`
 *
 * Конвертер оповещающего словаря в массив (сортировщик по компаратору).
 * Подробнее читайте JW.AbstractCollection.SorterComparing.
 *
 * @extends JW.AbstractMap.SorterComparing
 *
 * @constructor
 * Конструирует конвертер. Предпочтительнее использовать метод JW.AbstractCollection#createSorterComparing.
 * @param {JW.ObservableMap} source `<T>` Исходная коллекция.
 * @param {Object} config Конфигурация (см. Config options).
 */
JW.ObservableMap.SorterComparing = function(source, config) {
	JW.ObservableMap.SorterComparing._super.call(this, source, config);
	this._spliceEventAttachment = source.spliceEvent.bind(this._onSplice, this);
	this._clearEventAttachment = source.clearEvent.bind(this._onClear, this);
};

JW.extend(JW.ObservableMap.SorterComparing, JW.AbstractMap.SorterComparing, {
	/*
	JW.EventAttachment _spliceEventAttachment;
	JW.EventAttachment _clearEventAttachment;
	*/
	
	// override
	destroy: function() {
		this._clearEventAttachment.destroy();
		this._spliceEventAttachment.destroy();
		this._super();
	},
	
	_onSplice: function(params) {
		var spliceResult = params.spliceResult;
		this._splice(
			JW.Map.toArray(spliceResult.removedItems),
			JW.Map.toArray(spliceResult.addedItems));
	},
	
	_onClear: function(params) {
		this._splice(JW.Map.toArray(params.items), []);
	}
});
