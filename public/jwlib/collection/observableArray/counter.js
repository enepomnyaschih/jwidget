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
 *
 * `<T> extends JW.AbstractArray.Counter<T>`
 *
 * See JW.AbstractCollection.Counter for details.
 *
 * @extends JW.AbstractArray.Counter
 *
 * @constructor
 * Creates synchronizer. JW.AbstractCollection#createCounter method is preferrable instead.
 * @param {JW.ObservableArray} source `<T>` Source collection.
 * @param {Object} config Configuration (see Config options).
 */
JW.ObservableArray.Counter = function(source, config) {
	JW.ObservableArray.Counter._super.call(this, source, config);
	this.own(source.spliceEvent.bind(this._onSplice, this));
	this.own(source.replaceEvent.bind(this._onReplace, this));
	this.own(source.clearEvent.bind(this._onClear, this));
};

JW.extend(JW.ObservableArray.Counter, JW.AbstractArray.Counter, {
	_onSplice: function(params) {
		var spliceResult = params.spliceResult;
		var value = this.target.get();
		JW.Array.every(spliceResult.removedItemsList, function(indexItems) {
			value -= JW.Array.count(indexItems.items, this.filterItem, this.scope);
		}, this);
		JW.Array.every(spliceResult.addedItemsList, function(indexItems) {
			value += JW.Array.count(indexItems.items, this.filterItem, this.scope);
		}, this);
		this.target.set(value);
	},

	_onReplace: function(params) {
		var oldFiltered = this.filterItem.call(this.scope, params.oldItem) !== false;
		var newFiltered = this.filterItem.call(this.scope, params.newItem) !== false;
		if (oldFiltered && !newFiltered) {
			this.target.set(this.target.get() - 1);
		} else if (!oldFiltered && newFiltered) {
			this.target.set(this.target.get() + 1);
		}
	},

	_onClear: function(params) {
		this.target.set(0);
	}
});
