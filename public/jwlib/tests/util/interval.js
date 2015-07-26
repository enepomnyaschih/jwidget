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

JW.Tests.Util.IntervalTestCase = JW.Unit.TestCase.extend({
	testIntervalSuccessAndDestroy: function() {
		this.addExpectedOutput(
			"Success",
			"Success",
			"Finish"
		);
		
		var self = this;
		this.interval = new JW.Interval(this.async("success", function() {
			self.output("Success");
		}, 1100, 2), 500);
		setTimeout(function() {
			self.interval.destroy();
		}, 1100);
		
		this.sleep(2500, this._onWake, this);
	},
	
	testIntervalScope: function() {
		this.addExpectedOutput(
			"Success",
			"Success",
			"Finish"
		);
		
		this.interval = new JW.Interval(this.async("success", function() {
			this.output("Success");
		}, 1100, 2), this, 500);
		
		var self = this;
		setTimeout(function() {
			self.interval.destroy();
		}, 1100);
		
		this.sleep(2500, this._onWake, this);
	},
	
	_onWake: function() {
		this.output("Finish");
	}
});
