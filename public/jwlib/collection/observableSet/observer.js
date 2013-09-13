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
 * `<T> extends JW.AbstractSet.Observer<T>`
 *
 * Наблюдатель оповещающего множества. Подробнее читайте JW.AbstractCollection.Observer.
 *
 * @extends JW.AbstractSet.Observer
 *
 * @constructor
 * Конструирует синхронизатор. Предпочтительнее использовать метод JW.AbstractCollection#createObserver.
 * @param {JW.ObservableSet} source `<T>` Исходная коллекция.
 * @param {Object} config Конфигурация (см. Config options).
 */
JW.ObservableSet.Observer = function(source, config) {
	JW.ObservableSet.Observer._super.call(this, source, config);
	this._spliceEventAttachment = source.spliceEvent.bind(this._onSplice, this);
	this._clearEventAttachment = source.clearEvent.bind(this._onClear, this);
	if (this.change) {
		this._changeAttachment = source.changeEvent.bind(this._onChange, this);
	}
};

JW.extend(JW.ObservableSet.Observer, JW.AbstractSet.Observer, {
	/*
	JW.EventAttachment _spliceEventAttachment;
	JW.EventAttachment _clearEventAttachment;
	JW.EventAttachment _changeAttachment;
	*/
	
	// override
	destroy: function() {
		if (this._changeAttachment) {
			this._changeAttachment.destroy();
		}
		this._clearEventAttachment.destroy();
		this._spliceEventAttachment.destroy();
		this._super();
	},
	
	_onSplice: function(params) {
		var spliceResult = params.spliceResult;
		this._removeItems(spliceResult.removedItems);
		this._addItems(spliceResult.addedItems);
	},
	
	_onClear: function(params) {
		this._clearItems(params.items);
	}
});
