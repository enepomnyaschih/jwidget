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

JW.Tests.Collection.ObservableMap.CounterTestCase = JW.Unit.TestCase.extend({
	testShorthand: function() {
		var source = new JW.ObservableMap({a: 1, b: 2, c: 3, d: 4, e: 5});
		var target = source.$$count(this.countFunc, this);
		var subscription = JW.Tests.Collection.subscribeToProperty(this, target);

		this.assertStrictEqual(3, target.get());

		this.setExpectedOutput("3 > 5");
		source.splice(["d"], {f: 6, a: 7, g: 8, b: 9, h: 10, i: 11}); // {a: 7, b: 9, c: 3, e: 5, f: 6, g: 8, h: 10, i: 11}
		this.assertStrictEqual(5, target.get());

		this.setExpectedOutput();
		subscription.destroy();
		target.destroy();
		source.destroy();
	},

	testCounter: function() {
		var source = new JW.ObservableMap({a: 1, b: 2, c: 3, d: 4, e: 5});
		var target = this.createTarget();

		this.setExpectedOutput("0 > 3");
		var counter = this.createCounter(source, target);
		this.assertStrictEqual(3, target.get());

		this.setExpectedOutput("3 > 5");
		source.splice(["d"], {f: 6, a: 7, g: 8, b: 9, h: 10, i: 11}); // {a: 7, b: 9, c: 3, e: 5, f: 6, g: 8, h: 10, i: 11}
		this.assertStrictEqual(5, target.get());

		this.setExpectedOutput();
		source.reindex({a: "c", b: "a", c: "k", e: "l", f: "b", g: "e", h: "m", i: "n"}); // {a: 9, b: 6, c: 7, e: 8, k: 3, l: 5, m: 10, n: 11}
		this.assertStrictEqual(5, target.get());

		this.setExpectedOutput("5 > 0");
		source.clear();
		this.assertStrictEqual(0, target.get());

		this.setExpectedOutput("0 > 2");
		source.setAll({q: 1, w: 2, e: 3});
		this.assertStrictEqual(2, target.get());

		this.setExpectedOutput("2 > 0");
		counter.destroy();
		this.assertStrictEqual(0, target.get());

		this.setExpectedOutput();
		target.destroy();
		source.destroy();
	},

	// tests that empty source doesn't cause target to trigger "change" on synchronizer initialization
	testEmptyChange: function() {
		var source = new JW.ObservableMap();
		var target = this.createTarget();
		var counter = this.createCounter(source, target);
		counter.destroy();
		target.destroy();
		source.destroy();
	},

	testAutoTarget: function() {
		var source = new JW.ObservableMap({a: 1, b: 2, c: 3});
		var counter = this.createCounter(source);
		this.assertTrue(counter.target instanceof JW.Property);
		this.assertStrictEqual(2, counter.target.get());
		counter.destroy();
		source.destroy();
	},

	testReconfigure: function() {
		var source = new JW.ObservableMap({a: 1, b: 2, c: 3, d: 4, e: 5});
		var target = this.createTarget();

		this.setExpectedOutput("0 > 3");
		var counter = this.createCounter(source, target);
		this.assertStrictEqual(3, target.get());

		this.setExpectedOutput("3 > 2");
		counter.reconfigure({filterItem: function(x) { return x % 2 === 0; }});
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
		return x % 2 === 1;
	}
});
