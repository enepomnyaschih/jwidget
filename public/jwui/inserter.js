/*
	jWidget UI source file.
	
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
 * View synchronizer. Synchronizes DOM element children with the source array. Usually used in conjunction with
 * JW.AbstractArray.Mapper.
 *
 *     var data = new JW.ObservableArray(["apple", "banana", "cherry"]);
 *     var elements = data.{@link JW.ObservableArray#createMapper createMapper}({
 *         {@link JW.ObservableArray.Mapper#cfg-createItem createItem}: function(value) { return jQuery('<option />').text(value)[0]; }
 *     }).{@link JW.ObservableArray.Mapper#property-target target};
 *     var inserter = new JW.UI.Inserter(elements, document.getElementById("myselect"));
 *
 * @extends JW.Class
 *
 * @constructor
 * Creates synchronizer.
 * @param {JW.AbstractArray} source `<DOMElement>` Source array.
 * @param {DOMElement} el Parent element.
 */
JW.UI.Inserter = function(source, el) {
	JW.UI.Inserter._super.call(this);
	this.el = el; // DOMElement
	this.own(source.createInserter({
		addItem    : this._addItem,
		removeItem : this._removeItem,
		scope      : this
	}));
};

JW.extend(JW.UI.Inserter, JW.Class, {
	_getElement: function(item) {
		return item;
	},
	
	_addItem: function(item, index) {
		var parent = this.el;
		var anchor = parent.childNodes[index];
		var child = this._getElement(item);
		if (anchor != null) {
			parent.insertBefore(child, anchor);
		} else {
			parent.appendChild(child);
		}
	},
	
	_removeItem: function(item) {
		JW.UI.remove(this._getElement(item));
	}
});
