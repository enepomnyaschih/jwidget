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

JW.Tests.Util.TimeoutTestCase = JW.Unit.TestCase.extend({
	testTimeoutSuccess: function() {
		this.addExpectedOutput(
			"Success",
			"Finish"
		);
		
		var self = this;
		this.timeout = new JW.Timeout(this.async("success", function() {
			self.output("Success");
		}, 600, 1), 500);
		
		this.sleep(1500, this._onWake, this);
	},
	
	testTimeoutDestroy: function() {
		this.addExpectedOutput(
			"Finish"
		);
		
		var self = this;
		this.timeout = new JW.Timeout(this.forbid("success"), 500);
		setTimeout(function() {
			self.timeout.destroy();
		}, 300);
		
		this.sleep(1500, this._onWake, this);
	},
	
	testTimeoutScope: function() {
		this.addExpectedOutput(
			"Success",
			"Finish"
		);
		
		this.timeout = new JW.Timeout(this.async("success", function() {
			this.output("Success");
		}, 600, 1), this, 500);
		
		this.sleep(1500, this._onWake, this);
	},
	
	_onWake: function() {
		this.output("Finish");
	}
});
