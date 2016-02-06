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
