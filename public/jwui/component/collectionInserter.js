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
