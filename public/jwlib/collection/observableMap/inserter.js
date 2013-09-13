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
 * `<T> extends JW.AbstractMap.Inserter<T>`
 *
 * Синхронизатор представления оповещающего словаря. Подробнее читайте JW.AbstractMap.Inserter.
 *
 * @extends JW.AbstractMap.Inserter
 *
 * @constructor
 * Конструирует синхронизатор. Предпочтительнее использовать метод JW.AbstractMap#createInserter.
 * @param {JW.ObservableMap} source `<T>` Исходный словарь.
 * @param {Object} config Конфигурация (см. Config options).
 */
JW.ObservableMap.Inserter = function(source, config) {
	JW.ObservableMap.Inserter._super.call(this, source, config);
	this._spliceEventAttachment = source.spliceEvent.bind(this._onSplice, this);
	this._reindexEventAttachment = source.reindexEvent.bind(this._onReindex, this);
	this._clearEventAttachment = source.clearEvent.bind(this._onClear, this);
};

JW.extend(JW.ObservableMap.Inserter, JW.AbstractMap.Inserter, {
	/*
	JW.EventAttachment _spliceEventAttachment;
	JW.EventAttachment _reindexEventAttachment;
	JW.EventAttachment _clearEventAttachment;
	*/
	
	// override
	destroy: function() {
		this._clearEventAttachment.destroy();
		this._reindexEventAttachment.destroy();
		this._spliceEventAttachment.destroy();
		this._super();
	},
	
	_onSplice: function(params) {
		var spliceResult = params.spliceResult;
		this._removeItems(spliceResult.removedItems);
		this._addItems(spliceResult.addedItems);
	},
	
	_onReindex: function(params) {
		var keyMap = params.keyMap;
		for (var oldKey in keyMap) {
			var newKey = keyMap[oldKey];
			var item = this.source.get(newKey);
			if (this.removeItem) {
				this.removeItem.call(this.scope, oldKey, item);
			}
			if (this.addItem) {
				this.addItem.call(this.scope, item, newKey);
			}
		}
	},
	
	_onClear: function(params) {
		this._clearItems(params.items);
	}
});
