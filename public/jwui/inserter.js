/*
	jWidget UI source file.
	
MIT License

Copyright (c) 2020 Egor Nepomnyaschih

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
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
