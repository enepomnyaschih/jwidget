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

JW.Unit.TestGroup = function(config) {
	JW.Unit.TestGroup._super.call(this, config);
	this.units = new JW.Array();
	this.unitIndex = 0;
	this.unitCompleteAttachment = null;
};

JW.extend(JW.Unit.TestGroup, JW.Unit.TestUnit, {
	/*
	Fields
	JW.Array<JW.Unit.TestUnit> units;
	Integer unitIndex;
	JW.EventAttachment unitCompleteAttachment;
	*/
	
	// virtual
	__build: function() {},
	
	// virtual
	setupAll: function() {},
	
	// virtual
	setup: function() {},
	
	// virtual
	teardown: function() {},
	
	// virtual
	teardownAll: function() {},
	
	// override
	__onStart: function() {
		this._setupAll();
	},
	
	_setupAll: function() {
		JW.Unit._runAsync(JW.inScope(this.setupAll, this), this._onSetupAllSuccess, this._onSetupAllFail, this);
	},
	
	_onSetupAllSuccess: function() {
		this.unitIndex = 0;
		this._continue();
	},
	
	_onSetupAllFail: function(msg, e) {
		this.__onFail("Group setup failed: " + msg, e);
		this.__onComplete();
	},
	
	_continue: function() {
		if (this.unitIndex < this.units.getLength()) {
			setTimeout(JW.inScope(this._setup, this), 1);
		} else {
			setTimeout(JW.inScope(this._teardownAll, this), 1);
		}
	},
	
	_setup: function() {
		JW.Unit._runAsync(JW.inScope(this.setup, this), this._onSetupSuccess, this._onSetupFail, this);
	},
	
	_onSetupSuccess: function() {
		setTimeout(JW.inScope(this._startUnit, this), 1);
	},
	
	_onSetupFail: function(msg, e) {
		var unit = this.units.get(this.unitIndex);
		unit.__onFail("Unit setup failed: " + msg, e);
		this._nextUnit();
	},
	
	_startUnit: function() {
		var unit = this.units.get(this.unitIndex);
		this.unitCompleteAttachment = unit.completeEvent.bind(this._onUnitComplete, this);
		unit.__start();
	},
	
	_onUnitComplete: function() {
		var unit = this.units.get(this.unitIndex);
		this.unitCompleteAttachment.destroy();
		this.unitCompleteAttachment = null;
		setTimeout(JW.inScope(this._teardown, this), 1);
	},
	
	_teardown: function() {
		JW.Unit._runAsync(JW.inScope(this.teardown, this), this._onTeardownSuccess, this._onTeardownFail, this);
	},
	
	_onTeardownSuccess: function() {
		this._nextUnit();
	},
	
	_onTeardownFail: function(msg, e) {
		var unit = this.units.get(this.unitIndex);
		unit.__onFail("Unit teardown failed: " + msg, e);
		this._nextUnit();
	},
	
	_nextUnit: function() {
		++this.unitIndex;
		this._continue();
	},
	
	_teardownAll: function() {
		JW.Unit._runAsync(JW.inScope(this.teardownAll, this), this._onTeardownAllSuccess, this._onTeardownAllFail, this);
	},
	
	_onTeardownAllSuccess: function() {
		this.__onComplete();
	},
	
	_onTeardownAllFail: function(msg, e) {
		this.__onFail("Group teardown failed: " + msg, e);
		this.__onComplete();
	}
});
