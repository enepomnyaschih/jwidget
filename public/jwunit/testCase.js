/*
	JW test case.
	
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

JW.Unit.TestCase = function(config) {
	JW.Unit.TestCase._super.call(this, config);
};

JW.extend(JW.Unit.TestCase, JW.Unit.TestGroup, {
	// override
	__build: function() {
		for (var name in this) {
			var test = JW.Unit.Test.getTest({
				__name        : name,
				__broadcaster : this.__broadcaster,
				__parent      : this
			});
			if (!test) {
				continue;
			}
			this.units.add(test);
		}
	},
	
	async: function(name, fn, timeout, callCount) {
		return JW.Unit._addHandler(name, fn, timeout, callCount);
	},
	
	forbid: function(name) {
		return JW.Unit._forbidHandler(name);
	},
	
	sleep: function(delay, fn, scope) {
		JW.Unit._sleep(delay, fn, scope);
	},
	
	addExpectedOutput: function(/* lines */) {
		this.addExpectedOutputArray(JW.toArray(arguments));
	},
	
	addExpectedOutputArray: function(lines) {
		JW.Unit._addExpectedOutput(lines);
	},
	
	setExpectedOutput: function(/* lines */) {
		this.setExpectedOutputArray(JW.toArray(arguments));
	},
	
	setExpectedOutputArray: function(lines) {
		JW.Unit._assertOutputFinish();
		JW.Unit._addExpectedOutput(lines);
	},
	
	assertOutputFinish: function() {
		JW.Unit._assertOutputFinish();
	},
	
	output: function(line) {
		JW.Unit._output(line);
	},
	
	fail: function(message) {
		throw new Error(message);
	},
	
	assert: function(value, message) {
		if (!value) {
			this.fail(message);
		}
	},
	
	assertTrue: function(value) {
		this.assert(value === true, "true expected.");
	},
	
	assertFalse: function(value) {
		this.assert(value === false, "false expected.");
	},
	
	assertEqual: function(expected, value) {
		if (expected != value) {
			this.fail(this._log(expected) + " expected, " + this._log(value) + " got.");
		}
	},
	
	assertNotEqual: function(forbidden, value) {
		if (forbidden == value) {
			this.fail(this._log(forbidden) + " is forbidden, but equal " + this._log(value) + " got.");
		}
	},
	
	assertStrictEqual: function(expected, value) {
		if (expected !== value) {
			this.fail(this._log(expected) + " strictly expected, " + this._log(value) + " got.");
		}
	},
	
	assertStrictNotEqual: function(forbidden, value) {
		if (forbidden === value) {
			this.fail(this._log(forbidden) + " is forbidden, but strict equal " + this._log(value) + " got.");
		}
	},
	
	assertDefined: function(value) {
		this.assert(JW.isDefined(value), "defined value expected");
	},
	
	assertUndefined: function(value) {
		this.assert(!JW.isDefined(value), "undefined value expected");
	},
	
	assertSet: function(value) {
		this.assert(JW.isSet(value), "set value expected");
	},
	
	assertNotSet: function(value) {
		this.assert(!JW.isSet(value), "not set value expected");
	},
	
	assertEpsEqual: function(expected, value, eps) {
		if (typeof value !== "number") {
			this.fail("Number expected, " + this._log(value) + " (" + (typeof value) + ") got.");
		}
		if (expected - value > eps) {
			this.fail(this._log(expected) + " expected, " + this._log(value) + " got (eps = " + this._log(eps) + ").");
		}
	},
	
	assertPerformance: function(limit, callback) {
		var time = new Date().getTime();
		callback.call(this);
		var duration = new Date().getTime() - time;
		if (duration > limit) {
			this.fail("Performance test failed. Time limit is " + limit +
				"ms, test ran for " + duration + "ms");
		}
	},

	load: function(url, dataType, callback, scope) {
		var onLoadSuccess = function(response) {
			return this._onLoadSuccess(response, callback, scope);
		};
		
		$.ajax({
			url      : url,
			data     : { _dc: new Date().getTime() },
			type     : "GET",
			dataType : dataType,
			success  : this.async("_onLoadSuccess", onLoadSuccess),
			error    : this.forbid("_onLoadError"),
			context  : this
		});
	},
	
	_onLoadSuccess: function(response, callback, scope) {
		callback.call(scope || this, response);
	},
	
	_log: function(value) {
		if ((typeof value === "number") || (typeof value === "boolean")) {
			return value.toString();
		}
		if (typeof value === "string") {
			return JW.String.ellipsis(value, 60);
		}
		if (JW.isArray(value)) {
			return "array";
		}
		return (typeof value);
	}
});

JW.Unit.TestCase.getCase = function(config) {
	if (config.__name.substr(config.__name.length - 8) != "TestCase") {
		return null;
	}
	var cls = config.__parent.ns[config.__name];
	if (typeof cls !== "function") {
		return null;
	}
	return new cls(config);
};
