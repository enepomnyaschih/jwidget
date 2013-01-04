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

JW.ns("JW.Unit.UI");

JW.Unit.UI.View = JW.UI.Component.extend({
	testPlan        : null, // [required] JW.Unit.TestPlan
	
	unitView        : null, // [readonly] JW.Unit.UI.TestUnit
	selUnitView     : null, // [readonly] JW.Unit.UI.TestUnit
	__broadcaster   : null, // [readonly] JW.Unit.UI.Broadcaster
	
	render: function()
	{
		this._super();
		
		this._initBroadcaster();
		this._renderUnitView();
		this._subscribe();
	},
	
	_initBroadcaster: function()
	{
		this.__broadcaster = new JW.Unit.UI.Broadcaster();
		this.__broadcaster.bind("select", this._onUnitViewSelect, this);
		this.__broadcaster.bind("start",  this._onUnitViewStart,  this);
	},
	
	_renderUnitView: function()
	{
		this.unitView = new JW.Unit.UI.TestUnit({
			__unit          : this.testPlan.testSuit,
			__broadcaster   : this.__broadcaster,
			renderParent    : this,
			renderPosition  : {
				id              : "list",
				insert          : true
			}
		});
	},
	
	_subscribe: function()
	{
		this.testPlan.__broadcaster.bind("start",     this._onUnitStart,      this);
		this.testPlan.__broadcaster.bind("success",   this._onUnitSuccess,    this);
		this.testPlan.__broadcaster.bind("fail",      this._onUnitFail,       this);
	},
	
	_onUnitViewSelect: function(event, unitView)
	{
		if (this.selUnitView)
			this.selUnitView.headerEl.removeClass("jw-unit-selected");
		
		this.selUnitView = unitView;
		unitView.headerEl.addClass("jw-unit-selected");
		
		var unit = unitView.__unit;
		this.textNameEl.text(unit.__getFullName());
		this.statusValueEl.attr("status", unit.__status);
		this.statusValueEl.text(this._statusText[unit.__status]);
		
		if (unit.__failed)
		{
			this.errorValueEl.html('<pre>' + unit.__msg + '</pre>');
			this.stackValueEl.html('<pre>' + JW.Unit._getStackTrace(unit.__error) + '</pre>');
		}
		else
		{
			this.errorValueEl.text("");
			this.stackValueEl.html("");
		}
	},
	
	_onUnitViewStart: function(event, unitView)
	{
		if (this.selUnitView)
			return;
		
		if (JW.isDefined(this._lastScroll) &&
			this._lastScroll != this.listEl.scrollTop())
			return;
		
		var s = unitView.el.offset().top - this.listEl.offset().top - this.listEl.height() + unitView.headerEl.height() + this.listEl.scrollTop();
		this._lastScroll = Math.max(0, s);
		this.listEl.scrollTop(s);
	},
	
	_onUnitStart: function(event, unit)
	{
		//console.log("Start: ", unit);
	},
	
	_onUnitSuccess: function(event, unit)
	{
		//console.log("Success: ", unit);
	},
	
	_onUnitFail: function(event, unit, msg, e)
	{
		//console.log("Fail: ", unit, ", Message: ", msg, ", Exception: ", e);
	},
	
	_statusText: {
		"ready"     : "Pending...",
		"start"     : "In Progress...",
		"success"   : "Success",
		"fail"      : "Failed"
	}
});

JW.UI.template(JW.Unit.UI.View, {
	main:
		'<div jwclass="jw-unit-view"> \
			<div jwid="list" /> \
			<div jwid="text"> \
				<div jwid="text-name">&nbsp;</div> \
				<div jwid="status"> \
					<span jwid="status-label">Status: </span> \
					<span jwid="status-value" /> \
				</div> \
				<div jwid="error"> \
					<span jwid="error-label">Error: </span> \
					<span jwid="error-value" /> \
				</div> \
				<div jwid="stack"> \
					<div jwid="stack-label">Stack trace:</div> \
					<div jwid="stack-value" /> \
				</div> \
			</div> \
		</div>'
});
