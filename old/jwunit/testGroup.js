/*
	JW test group.
	
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
