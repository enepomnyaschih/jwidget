/*
	JW tests asynchronous runner object.
	
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

JW.Unit.AsyncRunner = function(config) {
	JW.Unit.AsyncRunner._super.call(this);
	this.fn = config.fn;
	this.success = config.success;
	this.fail = config.fail;
	this.scope = config.scope;
	this.failed = false;
	this.handlers = {};
	this.index = 0;
	this.count = 0;
	this.expectedOutput = [];
	this.outputIndex = 0;
};

JW.extend(JW.Unit.AsyncRunner, JW.Class, {
	/*
	Required
	Function fn;
	Function success();
	Function fail(String message, Error exception);
	
	Optional
	Object scope;
	
	Fields
	Boolean failed;
	Map<Integer> handlers;
	Integer index;
	Integer count;
	Array<String> expectedOutput;
	Integer outputIndex;
	*/
	
	run: function() {
		this.addHandler("root call", this.fn, 1)();
	},
	
	addHandler: function(name, fn, timeout, callCount) {
		var index = ++this.index;
		var runner = this;
		
		++this.count;
		this.handlers[index] = 0;
		
		if (!JW.isSet(timeout)) {
			timeout = 30000;
		}
		callCount = callCount || 1;
		
		function onTick() {
			if (runner.failed) {
				return;
			}
			runner.onFail("Async handler #" + index + " (" + name + ") has exceeded timeout of " + timeout +
				" milliseconds with " + runner.handlers[index] + "/" + callCount + " calls");
		}
		
		var timer = setTimeout(onTick, timeout);
		
		return function() {
			if (runner.failed) {
				return;
			}
			if (runner.handlers[index] >= callCount) {
				clearTimeout(timer);
				runner.onFail("Async handler #" + index + " (" + name + ") has exceeded calls limit of " + callCount);
				return;
			}
			
			var result;
			
			try {
				result = fn.apply(this, arguments);
			} catch(e) {
				clearTimeout(timer);
				runner.onFail(e.message, e);
				return;
			}
			
			if (++runner.handlers[index] >= callCount) {
				clearTimeout(timer);
				runner.trySuccess();
			}
			
			return result;
		}
	},
	
	forbidHandler: function(name) {
		var runner = this;
		return function() {
			runner.onFail("Forbidden async handler (" + name + ") is called");
		}
	},
	
	sleep: function(delay, fn, scope) {
		var runner = this;
		++this.count;
		
		function onTick() {
			if (runner.failed) {
				return;
			}
			try {
				fn.call(scope || this);
			} catch(e) {
				runner.onFail(e.message, e);
				return;
			}
			runner.trySuccess();
		}
		
		setTimeout(onTick, delay);
	},
	
	addExpectedOutput: function(lines) {
		JW.Array.addAll(this.expectedOutput, lines);
	},
	
	assertOutputFinish: function() {
		if (this.expectedOutput.length > this.outputIndex) {
			throw new Error('Output has less lines than expected. Expected: "' + this.expectedOutput[this.outputIndex] + '"');
		}
	},
	
	output: function(line) {
		if (this.outputIndex >= this.expectedOutput.length) {
			throw new Error('Output has more lines than expected. Got: "' + line + '"');
		}
		var expected = this.expectedOutput[this.outputIndex];
		if (line !== expected) {
			throw new Error('Incorrect output: "' + expected + '", "' + line + '" got');
		}
		++this.outputIndex;
	},
	
	trySuccess: function() {
		if (--this.count > 0) {
			return;
		}
		try {
			this.assertOutputFinish();
		} catch(e) {
			this.onFail(e.message, e);
		}
		if (!this.failed) {
			this.success.call(this.scope || this);
		}
	},
	
	onFail: function(msg, e) {
		if (this.failed) {
			return;
		}
		this.failed = true;
		this.fail.call(this.scope || this, msg, e || new Error(msg));
	}
});
