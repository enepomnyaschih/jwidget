/*
	jWidget Lib tests.
	
	Copyright (C) 2015 Egor Nepomnyaschih
	
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

JW.Tests.Util.TimerTestCase = JW.Unit.TestCase.extend({
	testTimer: function() {
		this.addExpectedOutput(
			"Run timer1",
			"Tick timer1",
			"Run timer2",
			"Tick timer2",
			"Tick timer2",
			"Tick timer2",
			"Finish"
		);
		
		this.timer1 = new JW.Timer(200, false);
		this.timer2 = new JW.Timer(200, true);
		
		this.ticks = 0;
		
		this.timer1.tickEvent.bind(this.async("onTimer1", this._onTimer1, 1500, 1), this);
		this.timer2.tickEvent.bind(this.async("onTimer2", this._onTimer2, 1500, 3), this);
		
		this.output("Run timer1");
		this.timer1.start();
		
		this.sleep(1500, this._onWake, this);
	},
	
	_onTimer1: function() {
		this.output("Tick timer1");
		this.output("Run timer2");
		this.timer2.start();
	},
	
	_onTimer2: function() {
		this.output("Tick timer2");
		if (++this.ticks == 3) {
			this.timer2.stop();
		}
	},
	
	_onWake: function() {
		this.output("Finish");
		this.timer1.destroy();
		this.timer2.destroy();
	}
});
