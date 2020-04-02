﻿/*
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
 * Replaceable child component wrapper in JW.UI.Component.
 * 
 * Returned by JW.UI.Component#addReplaceable method. If you'll destroy this object, replaceables child component
 * will be removed from parent and element will return to its original state.
 *
 * @extends JW.Class
 */
JW.UI.Component.Replaceable = function(parent, component, id) {
	JW.UI.Component.Replaceable._super.call(this);
	this.parent = parent;
	this.id = id;
	JW.Set.add(parent._replaceables, this);
	
	this._switcher = new JW.Switcher([component], {
		init: function(child) {
			this.parent.children.set(child, this.id);
		},
		done: function() {
			this.parent.children.remove(this.id);
		},
		scope: this
	});
};

JW.extend(JW.UI.Component.Replaceable, JW.Class, {
	// JW.UI.Component parent;
	
	// override
	destroyObject: function() {
		this._switcher.destroy();
		this._switcher = null;
		JW.Set.remove(this.parent._replaceables, this);
		this._super();
	}
});
