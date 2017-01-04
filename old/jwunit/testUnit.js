/*
	JW test unit.
	
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

JW.Unit.TestUnit = function(config) {
	JW.Unit.TestUnit._super.call(this);
	this.__name = config.__name;
	this.__broadcaster = config.__broadcaster;
	this.__parent = config.__parent;
	this.startEvent = new JW.Event();
	this.successEvent = new JW.Event();
	this.failEvent = new JW.Event();
	this.completeEvent = new JW.Event();
	this.__failed = false;
	this.__msg = "";
	this.__error = null;
	this.__status = "ready";
	this.__onStart = JW.inScope(this.__onStart, this);
};

JW.extend(JW.Unit.TestUnit, JW.Class, {
	/*
	Required
	String __name;
	JW.Unit.Broadcaster __broadcaster;
	JW.Unit.TestUnit __parent;
	
	Fields
	JW.Event<JW.Unit.TestUnit.EventParams> startEvent;
	JW.Event<JW.Unit.TestUnit.EventParams> successEvent;
	JW.Event<JW.Unit.TestUnit.FailEventParams> failEvent;
	JW.Event<JW.Unit.TestUnit.EventParams> completeEvent;
	Boolean __failed;
	String __msg;
	Error __error;
	String __status;
	*/
	
	STATUS_READY   : "ready",
	STATUS_START   : "start",
	STATUS_SUCCESS : "success",
	STATUS_FAIL    : "fail",
	
	destroy: function() {
		this.completeEvent.destroy();
		this.failEvent.destroy();
		this.successEvent.destroy();
		this.startEvent.destroy();
		this._super();
	},
	
	__getFullName: function() {
		if (this.__parent) {
			return this.__parent.__getFullName() + "." + this.__name;
		} else {
			return this.__name;
		}
	},
	
	__start: function() {
		this.__failed = false;
		this.__status = "start";
		this.startEvent.trigger(new JW.Unit.TestUnit.EventParams(this));
		this.__broadcaster.startEvent.trigger(new JW.Unit.Broadcaster.UnitEventParams(this.__broadcaster, this));
		setTimeout(this.__onStart, 1);
	},
	
	// virtual
	__onStart: function() {},
	
	__onFail: function(msg, e) {
		if (this.__failed) {
			return;
		}
		this.__failed = true;
		this.__msg    = msg;
		this.__error  = e;
		this.__status = "fail";
		
		this.failEvent.trigger(new JW.Unit.TestUnit.FailEventParams(this, msg, e));
		this.__broadcaster.failEvent.trigger(new JW.Unit.Broadcaster.UnitFailEventParams(this.__broadcaster, this, msg, e));
		
		if (this.__parent) {
			this.__parent.__onFail(msg, e);
		}
	},
	
	__onSuccess: function() {
		this.__status = "success";
		this.successEvent.trigger(new JW.Unit.TestUnit.EventParams(this));
		this.__broadcaster.successEvent.trigger(new JW.Unit.Broadcaster.UnitEventParams(this.__broadcaster, this));
	},
	
	__onComplete: function() {
		if (!this.__failed) {
			this.__onSuccess();
		}
		this.completeEvent.trigger(new JW.Unit.TestUnit.EventParams(this));
		this.__broadcaster.completeEvent.trigger(new JW.Unit.Broadcaster.UnitEventParams(this.__broadcaster, this));
	}
});

JW.Unit.TestUnit.EventParams = function(sender) {
	JW.Unit.TestUnit.EventParams._super.call(this, sender);
};

JW.extend(JW.Unit.TestUnit.EventParams, JW.EventParams, {
	/*
	Fields
	JW.Unit.TestUnit sender;
	*/
});

JW.Unit.TestUnit.FailEventParams = function(sender, message, exception) {
	JW.Unit.TestUnit.FailEventParams._super.call(this, sender);
	this.message = message;
	this.exception = exception;
};

JW.extend(JW.Unit.TestUnit.FailEventParams, JW.Unit.TestUnit.EventParams, {
	/*
	Fields
	String message;
	Error exception;
	*/
});
