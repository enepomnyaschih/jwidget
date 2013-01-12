/*
	JW tests events broadcaster.
	
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

JW.Unit.Broadcaster = JW.Class.extend({
	/*
	Fields
	JW.Event<JW.Unit.Broadcaster.UnitEventParams> startEvent;
	JW.Event<JW.Unit.Broadcaster.UnitEventParams> successEvent;
	JW.Event<JW.Unit.Broadcaster.UnitFailEventParams> failEvent;
	JW.Event<JW.Unit.Broadcaster.UnitEventParams> completeEvent;
	*/
	
	init: function() {
		this._super();
		this.startEvent = new JW.Event();
		this.successEvent = new JW.Event();
		this.failEvent = new JW.Event();
		this.completeEvent = new JW.Event();
	},
	
	destroy: function() {
		this.completeEvent.destroy();
		this.failEvent.destroy();
		this.successEvent.destroy();
		this.startEvent.destroy();
		this._super();
	}
});

JW.Unit.Broadcaster.EventParams = JW.EventParams.extend({
	/*
	Fields
	JW.Unit.Broadcaster sender;
	*/
});

JW.Unit.Broadcaster.UnitEventParams = JW.Unit.Broadcaster.EventParams.extend({
	/*
	Fields
	JW.Unit.TestUnit unit;
	*/
	
	init: function(sender, unit) {
		this._super(sender);
		this.unit = unit;
	}
});

JW.Unit.Broadcaster.UnitFailEventParams = JW.Unit.Broadcaster.UnitEventParams.extend({
	/*
	Fields
	String message;
	Error exception;
	*/
	
	init: function(sender, unit, message, exception) {
		this._super(sender, unit);
		this.message = message;
		this.exception = exception;
	}
});
