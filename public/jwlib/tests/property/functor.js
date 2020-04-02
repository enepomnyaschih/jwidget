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
