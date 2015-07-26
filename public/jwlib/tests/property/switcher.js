/*
	jWidget Lib tests.
	
	Copyright (C) 2015 Egor Nepomnyaschih
	
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
		var switcher = new JW.Switcher(property);
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
