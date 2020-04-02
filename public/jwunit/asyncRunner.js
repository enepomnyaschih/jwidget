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
