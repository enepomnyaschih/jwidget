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

JW.Tests.Property.UpdaterTestCase = JW.Unit.TestCase.extend({
	testUpdater: function()
	{
		var source1 = new JW.Property(1);
		var source2 = new JW.Property("a");
		
		this.setExpectedOutput("1a");
		var updater = new JW.Updater([ source1, source2 ], function(a, b) {
			this.output(a + b);
		}, this);
		
		this.setExpectedOutput("2a");
		source1.set(2);
		
		this.setExpectedOutput("2b");
		source2.set("b");
		
		this.setExpectedOutput();
		updater.destroy();
		source1.set(3);
		source2.set("c");
	},
	
	testWatch: function()
	{
		var source1 = new JW.Property(1);
		var source2 = new JW.Property("a");
		var event = new JW.Event();
		var property = new JW.Property();
		
		this.setExpectedOutput("1a");
		var updater = new JW.Updater([ source1, source2 ], function(a, b) {
			this.assertStrictEqual(2, arguments.length);
			this.output(a + b);
		}, this);
		updater.bind(event);
		updater.watch(property);
		
		this.setExpectedOutput("2a");
		source1.set(2);
		
		this.setExpectedOutput("2b");
		source2.set("b");
		
		this.setExpectedOutput("2b");
		event.trigger(new JW.EventParams(this));
		
		this.setExpectedOutput("2b");
		property.set(false);
		
		this.setExpectedOutput();
		updater.destroy();
		source1.set(3);
		source2.set("c");
		event.trigger(new JW.EventParams(this));
		property.set(true);
	}
});
