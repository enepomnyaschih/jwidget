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
 * `<T> extends JW.AbstractMap.Observer<T>`
 *
 * See JW.AbstractCollection.Observer for details.
 *
 * @extends JW.AbstractMap.Observer
 *
 * @constructor
 * Creates synchronizer. JW.AbstractCollection#createObserver method is preferrable instead.
 * @param {JW.ObservableMap} source `<T>` Source collection.
 * @param {Object} config Configuration (see Config options).
 */
JW.ObservableMap.Observer = function(source, config) {
	JW.ObservableMap.Observer._super.call(this, source, config);
	this._spliceEventAttachment = source.spliceEvent.bind(this._onSplice, this);
	this._clearEventAttachment = source.clearEvent.bind(this._onClear, this);
	if (this.change) {
		this._changeAttachment = source.changeEvent.bind(this._onChange, this);
	}
};

JW.extend(JW.ObservableMap.Observer, JW.AbstractMap.Observer, {
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
		this._removeItems(JW.Map.toArray(spliceResult.removedItems));
		this._addItems(JW.Map.toArray(spliceResult.addedItems));
	},
	
	_onClear: function(params) {
		this._clearItems(JW.Map.toArray(params.items));
	}
});
