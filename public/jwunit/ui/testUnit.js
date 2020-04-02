﻿/*
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

JW.Unit.UI.TestUnit = function(config) {
	JW.Unit.UI.TestUnit._super.call(this, config);
	this.__broadcaster = config.__broadcaster;
	this.__unit = config.__unit;
	this.__depth = JW.def(config.__depth, 0);
	this.startEventAttachment = null;
	this.successEventAttachment = null;
	this.failEventAttachment = null;
	this._mapper = null;
	this._onClick = JW.inScope(this._onClick, this);
};

JW.extend(JW.Unit.UI.TestUnit, JW.UI.Component, {
	/*
	Required
	JW.Unit.UI.Broadcaster __broadcaster;
	JW.Unit.TestUnit __unit;
	
	Optional
	Integer __depth;
	
	Fields
	JW.EventAttachment startEventAttachment;
	JW.EventAttachment successEventAttachment;
	JW.EventAttachment failEventAttachment;
	JW.AbstractArray.Mapper _mapper;
	*/
	
	PADDING_PER_DEPTH : 20,
	
	afterRender: function() {
		this._super();
		//console.log("Rendering " + this.__unit.__name);
		this._renderElements();
		this._renderChildren();
		this._subscribeUnit();
	},
	
	unrender: function() {
		this.failEventAttachment.destroy();
		this.successEventAttachment.destroy();
		this.startEventAttachment.destroy();
		this._mapper.destroy();
		//console.log("Destroyed " + this.__unit.__name);
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
		
		var headerEl = this.getElement("header");
		headerEl.css("padding-left", padding);
		headerEl.css("width", 380 - padding);
		headerEl.mousedown(this._onClick);
		
		this.getElement("name").text(this.__unit.__name);
	},
	
	_renderChildren: function() {
		var units = this.__unit.units || new JW.Array();
		this._mapper = units.createMapper({
			createItem  : this._createUnitView,
			destroyItem : function(unitView) { unitView.destroy(); },
			scope       : this
		});
		this.addArray(this._mapper.target, "list");
	},
	
	_subscribeUnit: function() {
		this.startEventAttachment = this.__unit.startEvent.bind(this._onUnitStart, this);
		this.successEventAttachment = this.__unit.successEvent.bind(this._onUnitSuccess, this);
		this.failEventAttachment = this.__unit.failEvent.bind(this._onUnitFail, this);
	},
	
	_onUnitStart: function(params) {
		this.__broadcaster.startEvent.trigger(new JW.Unit.UI.Broadcaster.UnitEventParams(this.__broadcaster, this));
		this.getElement("icon").attr("status", "start");
	},
	
	_onUnitSuccess: function(params) {
		this.getElement("icon").attr("status", "success");
	},
	
	_onUnitFail: function(params) {
		this.getElement("icon").attr("status", "fail");
	},
	
	_onClick: function(event) {
		this.__broadcaster.selectEvent.trigger(new JW.Unit.UI.Broadcaster.UnitEventParams(this.__broadcaster, this));
	},
	
	_createUnitView: function(unit) {
		return new JW.Unit.UI.TestUnit({
			__unit        : unit,
			__broadcaster : this.__broadcaster,
			__depth       : this.__depth + 1
		});
	}
});
