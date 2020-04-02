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

JW.Unit = {
	run: function(name, ns) {
		var time = new Date().getTime();
		this._testPlan = new JW.Unit.TestPlan({
			__name : name,
			ns     : ns
		});
		console.log(new Date().getTime() - time);
		this._testPlan.run();
		return this._testPlan;
	},
	
	_runAsync: function(fn, success, fail, scope) {
		this._asyncRunner = new JW.Unit.AsyncRunner({
			fn      : fn,
			success : success,
			fail    : fail,
			scope   : scope
		});
		this._asyncRunner.run();
		return this._asyncRunner;
	},
	
	_addHandler: function(name, fn, timeout, callCount) {
		return this._asyncRunner.addHandler(name, fn, timeout, callCount);
	},
	
	_forbidHandler: function(name) {
		return this._asyncRunner.forbidHandler(name);
	},
	
	_sleep: function(delay, fn, scope) {
		this._asyncRunner.sleep(delay, fn, scope);
	},
	
	_addExpectedOutput: function(lines) {
		this._asyncRunner.addExpectedOutput(lines);
	},
	
	_assertOutputFinish: function() {
		this._asyncRunner.assertOutputFinish();
	},
	
	_output: function(line) {
		this._asyncRunner.output(line);
	},
	
	_getStackTrace: function(error) {
		if (JW.UI.Browsers.isGecko || JW.UI.Browsers.isWebKit) {
			return error.stack;
		}
		return "";
	}
};
