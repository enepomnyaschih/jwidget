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
