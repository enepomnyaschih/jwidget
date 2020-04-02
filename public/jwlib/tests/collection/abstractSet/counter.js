/*
	jWidget Lib tests.

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

JW.Tests.Collection.AbstractSet.CounterTestCase = JW.Unit.TestCase.extend({
	setup: function() {
		this.a = new JW.Proxy(1);
		this.b = new JW.Proxy(2);
		this.c = new JW.Proxy(3);
		this.d = new JW.Proxy(4);
		this.e = new JW.Proxy(5);
		this.f = new JW.Proxy(6);
		this.g = new JW.Proxy(7);
	},

	testShorthand: function() {
		var source = new JW.Set([this.a, this.b, this.c, this.d, this.e]);
		var target = source.$$count(this.countFunc, this);
		JW.Tests.Collection.subscribeToProperty(this, target);

		this.assertStrictEqual(3, target.get());

		target.destroy();
		source.destroy();
	},

	testCounter: function() {
		var source = new JW.Set([this.a, this.b, this.c, this.d, this.e]);
		var target = this.createTarget();

		this.setExpectedOutput("0 > 3");
		var counter = this.createCounter(source, target);
		this.assertStrictEqual(3, target.get());

		this.setExpectedOutput("3 > 0");
		counter.destroy();
		this.assertStrictEqual(0, target.get());

		this.setExpectedOutput();
		target.destroy();
		source.destroy();
	},

	// tests that empty array doesn't trigger "change" on initialization
	testEmptyChange: function() {
		var source = new JW.Set();
		var target = this.createTarget();
		var counter = this.createCounter(source, target);
		counter.destroy();
		target.destroy();
		source.destroy();
	},

	testAutoTarget: function() {
		var source = new JW.Set([this.a, this.b, this.c]);
		var counter = this.createCounter(source);
		this.assertTrue(counter.target instanceof JW.Property);
		this.assertStrictEqual(2, counter.target.get());
		counter.destroy();
		source.destroy();
	},

	testRecount: function() {
		var source = new JW.Set([this.a, this.b, this.c, this.d, this.e]);
		var target = this.createTarget();

		this.setExpectedOutput("0 > 3");
		var counter = this.createCounter(source, target);
		this.assertStrictEqual(3, target.get());

		source.remove(this.c);

		this.setExpectedOutput("3 > 2");
		counter.recount();
		this.assertStrictEqual(2, target.get());

		this.setExpectedOutput("2 > 3");
		counter.reconfigure({filterItem: function(x) { return x.value > 1; }});
		this.assertStrictEqual(3, target.get());

		this.setExpectedOutput("3 > 0");
		counter.destroy();
		this.assertStrictEqual(0, target.get());

		this.setExpectedOutput();
		target.destroy();
		source.destroy();
	},

	createTarget: function() {
		var target = new JW.Property(0);
		JW.Tests.Collection.subscribeToProperty(this, target);
		return target;
	},

	createCounter: function(source, target) {
		return source.createCounter({
			target: target,
			filterItem: this.countFunc,
			scope: this
		});
	},

	countFunc: function(x) {
		this.assertTrue(this instanceof JW.Unit.TestCase);
		return x.get() % 2 === 1;
	}
});
