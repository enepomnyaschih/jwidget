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

JW.UI.Component.Child = function(parent, child) {
	JW.UI.Component.Child._super.call(this);
	this.parent = parent; // JW.UI.Component
	this.child = child; // JW.UI.Component
	this.name = null; // String
	this._el = null; // jQuery
};

JW.extend(JW.UI.Component.Child, JW.Class, {
	attach: function(name) {
		// JW.assertNull(this.name);
		this.name = name;
		this._el = this.parent._elements[name];
		this.parent._initChild(this.child);
		this.parent._elements[name] = this.child.el;
		JW.UI.replace(this._el[0], this.child.el[0], true);
		this.child._afterAppend();
	},
	
	detach: function() {
		// JW.assertString(this.name, JW.isNotBlank);
		if (this.parent._elements[this.name] === this.child.el) {
			this.parent._elements[this.name] = this._el;
		}
		JW.UI.replace(this.child.el[0], this._el[0]);
		this.parent._doneChild(this.child);
		this._el = null;
		this.name = null;
	}
});
