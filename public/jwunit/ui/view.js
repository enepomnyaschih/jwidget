/*
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
