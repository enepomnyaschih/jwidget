/*
	JW base plugin to canvas components.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
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

JW.Canvas.Plugin = JW.ObservableConfig.extend({
	xtype   : null, // [readonly] String
	target  : null, // [readonly] JW.Canvas.Component to attach plugin to
	
	attach: function(target)
	{
		this.target = target;
		this.initComponent();
	},
	
	destroy: function()
	{
		this.destroyComponent();
		this._super();
	},
	
	// virtual
	initComponent: function()
	{
	},
	
	// virtual
	render: function()
	{
	},
	
	// virtual
	afterAppend: function()
	{
	},
	
	// virtual
	doLayout: function()
	{
	},
	
	// virtual
	destroyComponent: function()
	{
	}
});
