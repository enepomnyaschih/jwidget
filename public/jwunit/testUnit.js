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

JW.ns("JW.Unit");

JW.Unit.TestUnit = JW.Observable.extend({
	EVENT_START     : "start",      // handler(event)
	EVENT_SUCCESS   : "success",    // handler(event)
	EVENT_FAIL      : "fail",       // handler(event, message, exception)
	EVENT_COMPLETE  : "complete",   // handler(event)
	
	STATUS_READY    : "ready",
	STATUS_START    : "start",
	STATUS_SUCCESS  : "success",
	STATUS_FAIL     : "fail",
	
	__name          : null,         // [required] String
	__broadcaster   : null,         // [required] JW.Unit.Broadcaster
	__parent        : null,         // [optional] JW.Unit.TestUnit
	
	__failed        : false,        // [readonly] Boolean
	__msg           : null,         // [readonly] String
	__error         : null,         // [readonly] Error
	__status        : "ready",      // [readonly] String
	
	init: function(config)
	{
		this._super();
		JW.apply(this, config);
	},
	
	__getFullName: function()
	{
		if (this.__parent)
			return this.__parent.__getFullName() + "." + this.__name;
		else
			return this.__name;
	},
	
	__start: function()
	{
		this.__failed = false;
		this.__status = "start";
		this.trigger("start");
		setTimeout(JW.Function.inScope(this.__onStart, this), 1);
	},
	
	// virtual
	__onStart: function()
	{
	},
	
	__onFail: function(msg, e)
	{
		if (this.__failed)
			return;
		
		this.__failed   = true;
		this.__msg      = msg;
		this.__error    = e;
		this.__status   = "fail";
		
		this.trigger("fail", msg, e);
		
		if (this.__parent)
			this.__parent.__onFail(msg, e);
	},
	
	__onSuccess: function()
	{
		this.__status = "success";
		this.trigger("success");
	},
	
	__onComplete: function()
	{
		if (!this.__failed)
			this.__onSuccess();
		
		this.trigger("complete");
	},
	
	triggerArray: function(eventType, args)
	{
		this._super(eventType, args);
		this.__broadcaster.triggerArray(eventType, [ this ].concat(args));
	}
});
