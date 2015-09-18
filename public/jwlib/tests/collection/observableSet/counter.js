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

JW.Tests.Collection.ObservableSet.CounterTestCase = JW.Unit.TestCase.extend({
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
		var source = new JW.ObservableSet([this.a, this.b, this.c, this.d, this.e]);
		var target = source.$$count(this.countFunc, this);
		var subscription = JW.Tests.Collection.subscribeToProperty(this, target);

		this.assertStrictEqual(3, target.get());

		this.setExpectedOutput("3 > 2");
		source.splice([this.a, this.b, this.c], [this.f, this.g]);
		this.assertStrictEqual(2, target.get());

		this.setExpectedOutput();
		subscription.destroy();
		target.destroy();
		source.destroy();
	},

	testCounter: function() {
		var source = new JW.ObservableSet([this.a, this.b, this.c, this.d, this.e]);
		var target = this.createTarget();

		this.setExpectedOutput("0 > 3");
		var counter = this.createCounter(source, target);
		this.assertStrictEqual(3, target.get());

		this.setExpectedOutput("3 > 2");
		source.splice([this.a, this.b, this.c], [this.f, this.g]);
		this.assertStrictEqual(2, target.get());

		this.setExpectedOutput("2 > 0");
		source.clear();
		this.assertStrictEqual(0, target.get());

		this.setExpectedOutput("0 > 2");
		source.addAll([this.a, this.b, this.c]);
		this.assertStrictEqual(2, target.get());

		this.setExpectedOutput("2 > 0");
		counter.destroy();
		this.assertStrictEqual(0, target.get());

		this.setExpectedOutput();
		target.destroy();
		source.destroy();
	},

	// tests that empty array doesn't trigger "change" on initialization
	testEmptyChange: function() {
		var source = new JW.ObservableSet();
		var target = this.createTarget();
		var counter = this.createCounter(source, target);
		counter.destroy();
		target.destroy();
		source.destroy();
	},

	testAutoTarget: function() {
		var source = new JW.ObservableSet([this.a, this.b, this.c]);
		var counter = this.createCounter(source);
		this.assertTrue(counter.target instanceof JW.Property);
		this.assertStrictEqual(2, counter.target.get());
		counter.destroy();
		source.destroy();
	},

	testReconfigure: function() {
		var source = new JW.ObservableSet([this.a, this.b, this.c, this.d, this.e]);
		var target = this.createTarget();

		this.setExpectedOutput("0 > 3");
		var counter = this.createCounter(source, target);
		this.assertStrictEqual(3, target.get());

		this.setExpectedOutput("3 > 2");
		counter.reconfigure({filterItem: function(x) { return x.value % 2 === 0; }});
		this.assertStrictEqual(2, target.get());

		this.setExpectedOutput("2 > 0");
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
