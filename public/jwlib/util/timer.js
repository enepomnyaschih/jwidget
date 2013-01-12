﻿/*
	JW timer.
	
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

JW.Timer = JW.Class.extend({
	/*
	Fields
	JW.Event<JW.Timer.EventParams> tickEvent;
	Number delay;
	Boolean repeat;
	Boolean sensitive;
	*/
	
	delay     : 0,
	repeat    : false,
	sensitive : false,
	
	init: function(delay, repeat, sensitive) {
		this._super();
		this.tickEvent = new JW.Event();
		this.delay = delay;
		this.repeat = repeat;
		this.sensitive = sensitive;
	},
	
	destroy: function() {
		this.stop();
		this.tickEvent.destroy();
		this._super();
	},
	
	start: function() {
		if (this.isStarted()) {
			return;
		}
		var runner = this._getRunner();
		this._handle = runner(JW.Function.inScope(this._onTimeout, this), this.delay);
	},
	
	stop: function() {
		if (!this.isStarted()) {
			return;
		}
		var stopper = this._getStopper();
		stopper(this._handle);
		delete this._handle;
	},
	
	restart: function() {
		this.stop();
		this.start();
	},
	
	isStarted: function() {
		return !!this._handle;
	},
	
	_getRunner: function() {
		return !this.repeat ? setTimeout : this.sensitive ? JW.setInterval : setInterval;
	},
	
	_getStopper: function() {
		return this.repeat ? clearInterval : clearTimeout;
	},
	
	_onTimeout: function() {
		this.tickEvent.trigger(new JW.Timer.EventParams(this));
	}
});

JW.Timer.EventParams = JW.EventParams.extend({
	/*
	Fields
	JW.Timer sender;
	*/
});
