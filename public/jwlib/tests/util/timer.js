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
