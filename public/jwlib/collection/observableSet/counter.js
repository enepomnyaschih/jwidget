/*
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
 * `<T extends JW.Class> extends JW.AbstractSet.Counter<T>`
 *
 * See JW.AbstractCollection.Counter for details.
 *
 * @extends JW.AbstractSet.Counter
 *
 * @constructor
 * Creates synchronizer. JW.AbstractCollection#createCounter method is preferrable instead.
 * @param {JW.ObservableSet} source `<T>` Source collection.
 * @param {Object} config Configuration (see Config options).
 */
JW.ObservableSet.Counter = function(source, config) {
	JW.ObservableSet.Counter._super.call(this, source, config);
	this.own(source.spliceEvent.bind(this._onSplice, this));
	this.own(source.clearEvent.bind(this._onClear, this));
};

JW.extend(JW.ObservableSet.Counter, JW.AbstractSet.Counter, {
	_onSplice: function(params) {
		var spliceResult = params.spliceResult;
		this.target.set(this.target.get() -
			JW.Array.count(spliceResult.removedItems, this.filterItem, this.scope) +
			JW.Array.count(spliceResult.addedItems, this.filterItem, this.scope));
	},

	_onClear: function(params) {
		this.target.set(0);
	}
});