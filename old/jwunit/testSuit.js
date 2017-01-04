/*
	JW test suit.
	
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

JW.Unit.TestSuit = function(config) {
	JW.Unit.TestSuit._super.call(this, config);
	this.ns = config.ns;
};

JW.extend(JW.Unit.TestSuit, JW.Unit.TestGroup, {
	/*
	Required
	Object ns;
	*/
	
	// override
	__build: function() {
		this._buildSuits();
		this._buildCases();
	},
	
	_buildSuits: function() {
		for (var name in this.ns) {
			var testSuit = JW.Unit.TestSuit.getSuit({
				__name        : name,
				__broadcaster : this.__broadcaster,
				__parent      : this
			});
			if (!testSuit) {
				continue;
			}
			testSuit.__build();
			if (testSuit.units.isEmpty()) {
				continue;
			}
			this.units.add(testSuit);
		}
	},
	
	_buildCases: function() {
		for (var name in this.ns) {
			var testCase = JW.Unit.TestCase.getCase({
				__name        : name,
				__broadcaster : this.__broadcaster,
				__parent      : this
			});
			if (!testCase) {
				continue;
			}
			testCase.__build();
			if (testCase.units.isEmpty()) {
				continue;
			}
			this.units.add(testCase);
		}
	}
});

JW.Unit.TestSuit.getSuit = function(config) {
	config.ns = config.ns || config.__parent.ns[config.__name];
	if (typeof config.ns !== "object") {
		return null;
	}
	var cls = config.ns.TestSuit || JW.Unit.TestSuit;
	return new cls(config);
};
