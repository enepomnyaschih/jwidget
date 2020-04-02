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
