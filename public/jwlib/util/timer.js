/*
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

JW.Timer = function(delay, repeat, sensitive) {
	JW.Timer._super.call(this);
	this.tickEvent = new JW.Event();
	this.delay = delay || 0;
	this.repeat = repeat || false;
	this.sensitive = sensitive || false;
	this._handle = 0;
	this._onTimeout = JW.inScope(this._onTimeout, this);
};

JW.extend(JW.Timer, JW.Class, {
	/*
	Fields
	JW.Event<JW.Timer.EventParams> tickEvent;
	Number delay;
	Boolean repeat;
	Boolean sensitive;
	Integer _handle;
	*/
	
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
		this._handle = runner(this._onTimeout, this.delay);
	},
	
	stop: function() {
		if (!this.isStarted()) {
			return;
		}
		var stopper = this._getStopper();
		stopper(this._handle);
		this._handle = 0;;
	},
	
	restart: function() {
		this.stop();
		this.start();
	},
	
	isStarted: function() {
		return this._handle !== 0;
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

JW.Timer.EventParams = function(sender) {
	JW.Timer.EventParams._super.call(this, sender);
};

JW.extend(JW.Timer.EventParams, JW.EventParams, {
	/*
	Fields
	JW.Timer sender;
	*/
});
