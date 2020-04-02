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
