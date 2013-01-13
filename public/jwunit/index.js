/*
	jWidget Unit source file.
	
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
