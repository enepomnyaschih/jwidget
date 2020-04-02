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

JW.UI.Component.CollectionInserter = function(source, el) {
	JW.UI.Component.CollectionInserter._super.call(this);
	this.el = el; // DOMElement
	this.len = 0; // Number
	this.own(source.createObserver({
		addItem: this._addItem,
		removeItem: this._removeItem,
		scope: this
	}));
};

JW.extend(JW.UI.Component.CollectionInserter, JW.Class, {
	_addItem: function(item) {
		var parent = this.el;
		var anchor = parent.childNodes[this.len];
		var child = item.el[0];
		if (anchor != null) {
			parent.insertBefore(child, anchor);
		} else {
			parent.appendChild(child);
		}
		++this.len;
		item._afterAppend();
	},

	_removeItem: function(item) {
		JW.UI.remove(item.el[0]);
		--this.len;
	}
});
