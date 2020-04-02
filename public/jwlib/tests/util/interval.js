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
