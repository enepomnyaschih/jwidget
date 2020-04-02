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

JW.Unit.UI.Broadcaster = function() {
	JW.Unit.UI.Broadcaster._super.call(this);
	this.selectEvent = new JW.Event();
	this.startEvent = new JW.Event();
};

JW.extend(JW.Unit.UI.Broadcaster, JW.Class, {
	/*
	Fields
	JW.Event<JW.Unit.UI.Broadcaster.UnitEventParams> selectEvent;
	JW.Event<JW.Unit.UI.Broadcaster.UnitEventParams> startEvent;
	*/
	
	destroy: function() {
		this.startEvent.destroy();
		this.selectEvent.destroy();
		this._super();
	}
});

JW.Unit.UI.Broadcaster.EventParams = function(sender) {
	JW.Unit.UI.Broadcaster.EventParams._super.call(this, sender);
};

JW.extend(JW.Unit.UI.Broadcaster.EventParams, JW.EventParams, {
	/*
	Fields
	JW.Unit.UI.Broadcaster sender;
	*/
});

JW.Unit.UI.Broadcaster.UnitEventParams = function(sender, unit) {
	JW.Unit.UI.Broadcaster.UnitEventParams._super.call(this, sender);
	this.unit = unit;
};

JW.extend(JW.Unit.UI.Broadcaster.UnitEventParams, JW.Unit.UI.Broadcaster.EventParams, {
	/*
	Fields
	JW.Unit.UI.TestUnit unit;
	*/
});
