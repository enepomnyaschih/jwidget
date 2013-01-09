/*
	JW test unit UI.
	
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

JW.Unit.UI.TestUnit = JW.UI.Component.extend({
	/*
	Required
	JW.Unit.UI.Broadcaster __broadcaster;
	JW.Unit.TestUnit __testUnit;
	
	Optional
	Integer __depth;
	
	Fields
	JW.EventAttachment startEventAttachment;
	JW.EventAttachment successEventAttachment;
	JW.EventAttachment failEventAttachment;
	*/
	
	PADDING_PER_DEPTH : 20,
	__depth           : 0,
	
	render: function() {
		this._super();
		this._renderElements();
		this._renderChildren();
		this._subscribeUnit();
	},
	
	destroyComponent: function() {
		this.failEventAttachment.destroy();
		this.successEventAttachment.destroy();
		this.startEventAttachment.destroy();
		this.mapper.destroy();
		this._super();
	},
	
	_renderElements: function() {
		if (this.__unit instanceof JW.Unit.Test) {
			this.el.attr("unit-type", "test");
		} else if (this.__unit instanceof JW.Unit.TestCase) {
			this.el.attr("unit-type", "case");
		} else {
			this.el.attr("unit-type", "suit");
		}
		
		var padding = this.__depth * this.PADDING_PER_DEPTH;
		this.headerEl.css("padding-left", padding);
		this.headerEl.css("width", 380 - padding);
		this.headerEl.mousedown(JW.Function.inScope(this._onClick, this));
		this.nameEl.text(this.__unit.__name);
	},
	
	_renderChildren: function() {
		var units = new JW.Collection();
		if (this.__unit.units) {
			units.addAll(this.__unit.units);
		}
		
		this.mapper = new JW.Collection.InstanceMapper({
			source    : units,
			provider  : JW.Unit.UI.TestUnit,
			dataField : "__unit",
			extraCfg : {
				__broadcaster : this.__broadcaster,
				__depth       : this.__depth + 1
			}
		});
		
		this.addList(this.mapper.target, this.listEl);
	},
	
	_subscribeUnit: function() {
		this.startEventAttachment = this.__unit.startEvent.bind(this._onUnitStart, this);
		this.successEventAttachment = this.__unit.successEvent.bind(this._onUnitSuccess, this);
		this.failEventAttachment = this.__unit.failEvent.bind(this._onUnitFail, this);
	},
	
	_onUnitStart: function(event) {
		this.__broadcaster.startEvent.trigger(new JW.Unit.UI.Broadcaster.UnitEventParams(this.__broadcaster, this));
		this.iconEl.attr("status", "start");
	},
	
	_onUnitSuccess: function(event) {
		this.iconEl.attr("status", "success");
	},
	
	_onUnitFail: function(event) {
		this.iconEl.attr("status", "fail");
	},
	
	_onClick: function(event) {
		this.__broadcaster.selectEvent.trigger(new JW.Unit.UI.Broadcaster.UnitEventParams(this.__broadcaster, this));
	}
});
