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

JW.Tests.Property.SwitcherTestCase = JW.Unit.TestCase.extend({
	testSwitcher: function()
	{
		var source1 = new JW.Property(1);
		var source2 = new JW.Property("a");
		
		this.setExpectedOutput("init 1a");
		var switcher = new JW.Switcher([source1, source2], {
			init: function(x, y) { this.output("init " + x + y); },
			done: function(x, y) { this.output("done " + x + y); },
			scope: this
		});
		
		this.setExpectedOutput("done 1a", "init 2a");
		source1.set(2);
		
		this.setExpectedOutput("done 2a");
		source2.set(null);
		
		this.setExpectedOutput("init 2b");
		source2.set("b");
		
		this.setExpectedOutput("done 2b");
		switcher.destroy();
		
		source1.set(3);
		source2.set("c");
	},
	
	testWatch: function()
	{
		var source = new JW.Property(1);
		var event = new JW.Event();
		var property = new JW.Property("a");
		
		this.setExpectedOutput("init 1");
		var switcher = new JW.Switcher([source], {
			init: function(x) { this.output("init " + x); },
			done: function(x) { this.output("done " + x); },
			scope: this
		});
		
		this.setExpectedOutput();
		switcher.bind(event);
		switcher.watch(property);
		
		this.setExpectedOutput("done 1", "init 2");
		source.set(2);
		
		this.setExpectedOutput("done 2", "init 2");
		event.trigger(new JW.EventParams(this));
		
		this.setExpectedOutput("done 2", "init 2");
		property.set("b");
		
		this.setExpectedOutput("done 2");
		source.set(null);
		
		this.setExpectedOutput();
		event.trigger(new JW.EventParams(this));
		property.set("c");
		
		this.setExpectedOutput("init 3");
		source.set(3);
		
		this.setExpectedOutput("done 3");
		switcher.destroy();
		
		this.setExpectedOutput();
		source.set(4);
		event.trigger(new JW.EventParams(this));
		property.set("d");
	},
	
	testOptional: function()
	{
		var property = new JW.Property(1);
		var switcher = new JW.Switcher([property]);
		switcher.destroy();
	},
	
	testAcceptNull: function()
	{
		var source1 = new JW.Property(1);
		var source2 = new JW.Property("a");
		
		this.setExpectedOutput("Create 1a");
		var switcher = new JW.Switcher([ source1, source2 ], {
			acceptNull: true,
			init: function(a, b) {
				this.output("Create " + a + b);
			},
			done: function(a, b) {
				this.output("Destroy " + a + b);
			},
			scope: this
		});
		
		this.setExpectedOutput("Destroy 1a", "Create 2a");
		source1.set(2);
		
		this.setExpectedOutput("Destroy 2a", "Create 2null");
		source2.set(null)
		
		this.setExpectedOutput("Destroy 2null", "Create 2b");
		source2.set("b");
		
		this.setExpectedOutput("Destroy 2b");
		switcher.destroy();
		
		source1.set(3);
		source2.set("c");
	},
	
	testNull: function()
	{
		var source = new JW.Property();
		var switcher = new JW.Switcher([ source ], {
			init: function() {
				this.fail();
			},
			done: function() {
				this.fail();
			},
			scope: this
		});
		switcher.destroy();
	},
	
	testBlank: function()
	{
		this.setExpectedOutput("Create");
		var switcher = new JW.Switcher([], {
			init: function() {
				this.output("Create");
			},
			done: function() {
				this.output("Destroy");
			},
			scope: this
		});
		
		this.setExpectedOutput("Destroy");
		switcher.destroy();
	}
});
