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

JW.Tests.Property.FunctorTestCase = JW.Unit.TestCase.extend({
	testFunctor: function()
	{
		var source1 = new JW.Property(1);
		var source2 = new JW.Property("a");
		var target = new JW.Property();
		
		var functor = new JW.Functor([ source1, source2 ], function(a, b) {
			return a + b;
		}, this, { target: target });
		this.assertStrictEqual("1a", target.get());
		
		source1.set(2);
		this.assertStrictEqual("2a", target.get());
		
		source2.set("b");
		this.assertStrictEqual("2b", target.get());
		
		functor.destroy();
		this.assertStrictEqual("2b", target.get());
		
		source1.set(3);
		source2.set("c");
		this.assertStrictEqual("2b", target.get());
	},
	
	testWatch: function()
	{
		var source1 = new JW.Property(1);
		var source2 = new JW.Property("a");
		var value = 1;
		var event = new JW.Event();
		var property = new JW.Property();
		var target = new JW.Property();
		
		var functor = new JW.Functor([ source1, source2 ], function(a, b) {
			this.assertStrictEqual(2, arguments.length);
			return a + b + value;
		}, this, { target: target });
		functor.bind(event);
		functor.watch(property);
		this.assertStrictEqual("1a1", target.get());
		
		source1.set(2);
		this.assertStrictEqual("2a1", target.get());
		
		source2.set("b");
		this.assertStrictEqual("2b1", target.get());
		
		value = 2;
		this.assertStrictEqual("2b1", target.get());
		
		event.trigger(new JW.EventParams(this));
		this.assertStrictEqual("2b2", target.get());
		
		value = 3;
		property.set(false);
		this.assertStrictEqual("2b3", target.get());
		
		this.setExpectedOutput();
		functor.destroy();
		this.assertStrictEqual("2b3", target.get());
		
		source1.set(3);
		source2.set("c");
		event.trigger(new JW.EventParams(this));
		property.set(true);
		this.assertStrictEqual("2b3", target.get());
	},
	
	testAutoTarget: function()
	{
		var source1 = new JW.Property(1);
		var source2 = new JW.Property("a");
		
		var functor = new JW.Functor([ source1, source2 ], function(a, b) {
			return a + b;
		}, this);
		var target = functor.target;
		this.assertStrictEqual("1a", target.get());
		
		source1.set(2);
		this.assertStrictEqual("2a", target.get());
		
		source2.set("b");
		this.assertStrictEqual("2b", target.get());
		
		functor.destroy();
		source1.set(3);
		source2.set("c");
	}
});
