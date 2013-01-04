/*
	JW test unit UI.
	
	Copyright (C) 2011 Egor Nepomnyaschih
	
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

JW.ns("JW.Unit.UI");

JW.Unit.UI.TestUnit = JW.UI.Component.extend({
	PADDING_PER_DEPTH: 20,
	
	__broadcaster   : null, // [required] JW.Unit.UI.Broadcaster
	__unit          : null, // [required] JW.Unit.TestUnit
	__depth         : 0,    // [required] Integer
	
	children        : null, // [readonly] Array of JW.Unit.UI.TestUnit
	
	childBox        : "list",
	
	render: function()
	{
		this._super();
		
		this._renderElements();
		this._renderChildren();
		
		this._subscribeUnit();
	},
	
	destroyComponent: function()
	{
		this.__unit.purge(this);
		
		this._super();
	},
	
	_renderElements: function()
	{
		if (this.__unit instanceof JW.Unit.Test)
			this.el.attr("unit-type", "test");
		else if (this.__unit instanceof JW.Unit.TestCase)
			this.el.attr("unit-type", "case");
		else
			this.el.attr("unit-type", "suit");
		
		var padding = this.__depth * this.PADDING_PER_DEPTH;
		this.headerEl.css("padding-left", padding);
		this.headerEl.css("width", 380 - padding);
		
		this.headerEl.mousedown(JW.Function.inScope(this._onClick, this));
		
		this.nameEl.text(this.__unit.__name);
	},
	
	_renderChildren: function()
	{
		this.children = [];
		
		var units = this.__unit.units;
		if (!units)
			return;
		
		for (var i = 0; i < units.length; ++i)
			this._renderChild(units[i]);
	},
	
	_renderChild: function(unit)
	{
		var child = new JW.Unit.UI.TestUnit({
			__broadcaster   : this.__broadcaster,
			__unit          : unit,
			__depth         : this.__depth + 1,
			renderParent    : this
		});
		
		this.children.push(child);
	},
	
	_subscribeUnit: function()
	{
		this.__unit.bind("start",     this._onUnitStart,      this);
		this.__unit.bind("success",   this._onUnitSuccess,    this);
		this.__unit.bind("fail",      this._onUnitFail,       this);
	},
	
	_onUnitStart: function(event)
	{
		this.__broadcaster.trigger("start", this);
		this.iconEl.attr("status", "start");
	},
	
	_onUnitSuccess: function(event)
	{
		this.iconEl.attr("status", "success");
	},
	
	_onUnitFail: function(event)
	{
		this.iconEl.attr("status", "fail");
	},
	
	_onClick: function(event)
	{
		this.__broadcaster.trigger("select", this);
	}
});

JW.UI.template(JW.Unit.UI.TestUnit, {
	main:
		'<div jwclass="jw-unit-testunit"> \
			<div jwid="header"> \
				<div jwid="icon" /> \
				<div jwid="name" /> \
			</div> \
			<div jwid="list" /> \
		</div>'
});

