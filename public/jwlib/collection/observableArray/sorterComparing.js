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
 * `<T> extends JW.AbstractArray.SorterComparing<T>`
 *
 * Конвертер оповещающего массива в массив (сортировщик по компаратору).
 * Подробнее читайте JW.AbstractCollection.SorterComparing.
 *
 * @extends JW.AbstractArray.SorterComparing
 *
 * @constructor
 * Конструирует конвертер. Предпочтительнее использовать метод JW.AbstractCollection#createSorterComparing.
 * @param {JW.ObservableArray} source `<T>` Исходная коллекция.
 * @param {Object} config Конфигурация (см. Config options).
 */
JW.ObservableArray.SorterComparing = function(source, config) {
	JW.ObservableArray.SorterComparing._super.call(this, source, config);
	this._spliceEventAttachment = source.spliceEvent.bind(this._onSplice, this);
	this._replaceEventAttachment = source.replaceEvent.bind(this._onReplace, this);
	this._clearEventAttachment = source.clearEvent.bind(this._onClear, this);
};

JW.extend(JW.ObservableArray.SorterComparing, JW.AbstractArray.SorterComparing, {
	/*
	JW.EventAttachment _spliceEventAttachment;
	JW.EventAttachment _replaceEventAttachment;
	JW.EventAttachment _clearEventAttachment;
	*/
	
	// override
	destroy: function() {
		this._clearEventAttachment.destroy();
		this._replaceEventAttachment.destroy();
		this._spliceEventAttachment.destroy();
		this._super();
	},
	
	_onSplice: function(params) {
		var spliceResult = params.spliceResult;
		this._splice(spliceResult.getRemovedItems(), spliceResult.getAddedItems());
	},
	
	_onReplace: function(params) {
		this._splice([params.oldItem], [params.newItem]);
	},
	
	_onClear: function(params) {
		this._splice(params.items, []);
	}
});
