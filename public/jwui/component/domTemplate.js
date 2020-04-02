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

JW.UI.Component.DomTemplate = function(el) {
	JW.UI.Component.DomTemplate._super.call(this);
	this.el = jQuery(el)[0];
	this.output = null; // JW.UI.Component.TemplateOutput
};

JW.extend(JW.UI.Component.DomTemplate, JW.UI.Component.AbstractTemplate, {
	requiresAfterAppend: true,
	
	createElement: function() {
		if (this.output !== null) {
			return this.output;
		}
		this.groups = {};
		this._compileAttributes(this.el);
		var orderedGroups = {};
		for (var i = 0, l = this.ids.length; i < l; ++i) {
			var id = this.ids[i];
			orderedGroups[id] = this.groups[id];
		}
		this.output = new JW.UI.Component.TemplateOutput(this.el, orderedGroups);
		return this.output;
	},
	
	_addElement: function(id, el, path) {
		this.groups[id] = this.groups[id] || [];
		this.groups[id].push(el);
	}
});
