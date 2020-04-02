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

JW.Unit.TestPlan = function(config) {
	JW.Unit.TestPlan._super.call(this);
	this.__name = config.__name;
	this.ns = config.ns;
	this.__broadcaster = new JW.Unit.Broadcaster();
	this.testSuit = JW.Unit.TestSuit.getSuit({
		__name        : this.__name,
		__broadcaster : this.__broadcaster,
		ns            : this.ns
	});
	this.testSuit.__build();
	this.view = new JW.Unit.UI.View({
		testPlan : this
	});
	this.view.renderTo("body");
};

JW.extend(JW.Unit.TestPlan, JW.Class, {
	/*
	Required
	String __name;
	Object ns;
	
	Fields
	JW.Unit.TestSuit testSuit;
	JW.Unit.Broadcaster __broadcaster;
	JW.Unit.UI.View view;
	*/
	
	run: function() {
		this.testSuit.__start();
	}
});
