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

JW.Unit.Broadcaster = function() {
	JW.Unit.Broadcaster._super.call(this);
	this.startEvent = new JW.Event();
	this.successEvent = new JW.Event();
	this.failEvent = new JW.Event();
	this.completeEvent = new JW.Event();
};

JW.extend(JW.Unit.Broadcaster, JW.Class, {
	/*
	Fields
	JW.Event<JW.Unit.Broadcaster.UnitEventParams> startEvent;
	JW.Event<JW.Unit.Broadcaster.UnitEventParams> successEvent;
	JW.Event<JW.Unit.Broadcaster.UnitFailEventParams> failEvent;
	JW.Event<JW.Unit.Broadcaster.UnitEventParams> completeEvent;
	*/
	
	destroy: function() {
		this.completeEvent.destroy();
		this.failEvent.destroy();
		this.successEvent.destroy();
		this.startEvent.destroy();
		this._super();
	}
});

JW.Unit.Broadcaster.EventParams = function(sender) {
	JW.Unit.Broadcaster.EventParams._super.call(this, sender);
};

JW.extend(JW.Unit.Broadcaster.EventParams, JW.EventParams, {
	/*
	Fields
	JW.Unit.Broadcaster sender;
	*/
});

JW.Unit.Broadcaster.UnitEventParams = function(sender, unit) {
	JW.Unit.Broadcaster.UnitEventParams._super.call(this, sender);
	this.unit = unit;
};

JW.extend(JW.Unit.Broadcaster.UnitEventParams, JW.Unit.Broadcaster.EventParams, {
	/*
	Fields
	JW.Unit.TestUnit unit;
	*/
});

JW.Unit.Broadcaster.UnitFailEventParams = function(sender, unit, message, exception) {
	JW.Unit.Broadcaster.UnitFailEventParams._super.call(this, sender, unit);
	this.message = message;
	this.exception = exception;
};

JW.extend(JW.Unit.Broadcaster.UnitFailEventParams, JW.Unit.Broadcaster.UnitEventParams, {
	/*
	Fields
	String message;
	Error exception;
	*/
});
