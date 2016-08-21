/*
	JW test runner UI.
	
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

JW.Unit.UI.View = function(config) {
	JW.Unit.UI.View._super.call(this, config);
	this.testPlan = config.testPlan;
	this.unitView = null;
	this.selUnitView = null;
	this.__broadcaster = new JW.Unit.UI.Broadcaster();
};

JW.extend(JW.Unit.UI.View, JW.UI.Component, {
	/*
	Required
	JW.Unit.TestPlan testPlan;
	
	Fields
	JW.Unit.UI.TestUnit unitView;
	JW.Unit.UI.TestUnit selUnitView;
	JW.Unit.UI.Broadcaster __broadcaster;
	*/
	
	afterRender: function() {
		this._super();
		this._initBroadcaster();
		this._subscribe();
	},
	
	_initBroadcaster: function() {
		this.__broadcaster.selectEvent.bind(this._onUnitViewSelect, this);
		this.__broadcaster.startEvent.bind(this._onUnitViewStart, this);
	},
	
	_subscribe: function() {
		this.testPlan.__broadcaster.startEvent.bind(this._onUnitStart, this);
		this.testPlan.__broadcaster.successEvent.bind(this._onUnitSuccess, this);
		this.testPlan.__broadcaster.failEvent.bind(this._onUnitFail, this);
	},
	
	renderTestUnit: function() {
		this.unitView = new JW.Unit.UI.TestUnit({
			__unit        : this.testPlan.testSuit,
			__broadcaster : this.__broadcaster
		});
		return this.unitView;
	},
	
	_onUnitViewSelect: function(params) {
		if (this.selUnitView) {
			this.selUnitView.getElement("header").removeClass("jw-unit-selected");
		}
		this.selUnitView = params.unit;
		params.unit.getElement("header").addClass("jw-unit-selected");
		
		var unit = params.unit.__unit;
		this.getElement("text-name").text(unit.__getFullName());
		this.getElement("status-value").attr("status", unit.__status);
		this.getElement("status-value").text(this._statusText[unit.__status]);
		
		if (unit.__failed) {
			this.getElement("error-value").html('<pre>' + JW.String.htmlEncode(unit.__msg) + '</pre>');
			this.getElement("stack-value").html('<pre>' + JW.String.htmlEncode(JW.Unit._getStackTrace(unit.__error)) + '</pre>');
		} else {
			this.getElement("error-value").text("");
			this.getElement("stack-value").html("");
		}
	},
	
	_onUnitViewStart: function(params) {
		if (this.selUnitView) {
			return;
		}
		var listEl = this.getElement("list");
		if (JW.isDefined(this._lastScroll) && (this._lastScroll != listEl.scrollTop())) {
			return;
		}
		var s = params.unit.el.offset().top - listEl.offset().top - listEl.height() +
			params.unit.getElement("header").height() + listEl.scrollTop();
		this._lastScroll = Math.max(0, s);
		listEl.scrollTop(s);
	},
	
	_onUnitStart: function(params) {
		//console.log("Start: ", unit);
	},
	
	_onUnitSuccess: function(params) {
		//console.log("Success: ", unit);
	},
	
	_onUnitFail: function(params) {
		//console.log("Fail: ", unit, ", Message: ", msg, ", Exception: ", e);
	},
	
	_statusText: {
		"ready"     : "Pending...",
		"start"     : "In Progress...",
		"success"   : "Success",
		"fail"      : "Failed"
	}
});
