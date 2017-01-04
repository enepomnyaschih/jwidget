/*
	JW test.
	
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

JW.Unit.Test = function(config) {
	JW.Unit.Test._super.call(this, config);
	this.fn = config.fn;
};

JW.extend(JW.Unit.Test, JW.Unit.TestUnit, {
	/*
	Required
	Function fn;
	*/
	
	// override
	__onStart: function() {
		JW.Unit._runAsync(this.fn, this._onSuccess, this._onFail, this);
	},
	
	_onSuccess: function() {
		this.__onComplete();
	},
	
	_onFail: function(msg, e) {
		this.__onFail(msg, e);
		this.__onComplete();
	}
});

JW.Unit.Test.getTest = function(config) {
	if (config.__name.substr(0, 4) != "test") {
		return null;
	}
	config.fn = config.__parent[config.__name];
	if (typeof config.fn !== "function") {
		return null;
	}
	config.fn = JW.inScope(config.fn, config.__parent);
	return new JW.Unit.Test(config);
};
